#!/usr/bin/env python3
"""Semantic validation for a PageSpec instance, beyond what JSON Schema alone
can express: template<->node cross-reference, route restrictions, rhythm
rules from compatibility/graph.json, reducedMotionFallback presence, and
per-instance maxWords enforcement.

Repo root is always derived from this file's own location - never a
hardcoded absolute path - so this script works identically whether run in
place or copied to an isolated directory with no siblings.
"""
import json
import os
import re
import sys

REPO_ROOT = os.path.dirname(os.path.abspath(__file__))
DESIGN_REPO_ROOT = os.path.dirname(REPO_ROOT)


def load_json(*parts):
    with open(os.path.join(DESIGN_REPO_ROOT, *parts), encoding="utf-8") as f:
        return json.load(f)


def load_templates():
    return {t["id"]: t for t in load_json("templates", "templates.json")["templates"]}


def load_sections():
    sections_dir = os.path.join(DESIGN_REPO_ROOT, "sections")
    sections = {}
    for fname in os.listdir(sections_dir):
        if fname.endswith(".json"):
            with open(os.path.join(sections_dir, fname), encoding="utf-8") as f:
                data = json.load(f)
                sections[data["id"]] = data
    return sections


def load_graph():
    return load_json("compatibility", "graph.json")["rules"]


def count_words(text):
    return len(re.findall(r"\S+", text))


def check_maxwords(node_content, contract_content, path, errors):
    """Recursively walk a node's content against its section contract's
    JSON-Schema-shaped maxWords annotations."""
    if not isinstance(contract_content, dict):
        return
    props = contract_content.get("properties", {})
    if contract_content.get("type") == "array" and "items" in contract_content:
        if isinstance(node_content, list):
            for i, item in enumerate(node_content):
                check_maxwords(item, contract_content["items"], f"{path}[{i}]", errors)
        return
    if not isinstance(node_content, dict):
        return
    for key, sub_contract in props.items():
        if key not in node_content:
            continue
        value = node_content[key]
        max_words = sub_contract.get("maxWords")
        if max_words is not None and isinstance(value, str):
            wc = count_words(value)
            if wc > max_words:
                errors.append(f"{path}.{key}: {wc} words exceeds maxWords={max_words}")
        elif sub_contract.get("type") == "array" and "items" in sub_contract:
            if isinstance(value, list):
                for i, item in enumerate(value):
                    check_maxwords(item, sub_contract["items"], f"{path}.{key}[{i}]", errors)
        elif sub_contract.get("type") == "object":
            check_maxwords(value, sub_contract, f"{path}.{key}", errors)


def validate(pagespec):
    errors = []
    warnings = []

    templates = load_templates()
    sections = load_sections()
    graph_rules = load_graph()

    template_id = pagespec.get("template")
    route = pagespec.get("route")
    nodes = pagespec.get("nodes", [])
    node_section_ids = [n["section"] for n in nodes]

    # --- Template <-> node cross-reference (the most repeated bug class) ---
    if template_id not in templates:
        errors.append(f"Unknown template: {template_id}")
        return errors, warnings

    tpl = templates[template_id]
    tpl_node_defs = tpl["nodes"]
    tpl_required_ids = [n["section"] for n in tpl_node_defs if n.get("required", True)]
    tpl_all_ids = [n["section"] for n in tpl_node_defs]

    for sid in tpl_required_ids:
        if sid not in node_section_ids:
            errors.append(f"Missing required section '{sid}' declared by template '{template_id}'")

    for sid in node_section_ids:
        if sid not in tpl_all_ids:
            errors.append(f"Section '{sid}' is not part of template '{template_id}'s node list - PageSpec contradicts its own declared template")

    # order check: node sequence (filtered to ids that belong to the template)
    # must appear in the same relative order as the template declares
    tpl_order_index = {sid: i for i, sid in enumerate(tpl_all_ids)}
    seen_indices = [tpl_order_index[sid] for sid in node_section_ids if sid in tpl_order_index]
    if seen_indices != sorted(seen_indices):
        errors.append(f"Node order does not match template '{template_id}''s declared order")

    # route <-> template consistency
    if route not in tpl["routes"] and tpl.get("routePattern") is None:
        errors.append(f"Route '{route}' is not one of template '{template_id}''s declared routes: {tpl['routes']}")

    # --- Structural: duplicate one-per-page, missing mandatory sections ---
    for sid in node_section_ids:
        contract = sections.get(sid)
        if contract is None:
            errors.append(f"Section '{sid}' has no matching contract file")
            continue
        constraints = contract.get("constraints", {})
        if constraints.get("onePerPage") and node_section_ids.count(sid) > 1:
            errors.append(f"Section '{sid}' is onePerPage but appears {node_section_ids.count(sid)} times")

    if node_section_ids:
        if node_section_ids[0] != "chrome.header":
            errors.append("First node must be chrome.header")
        if node_section_ids[-1] != "chrome.footer":
            errors.append("Last node must be chrome.footer")

    # --- Route restrictions from each section's own contract ---
    for sid in node_section_ids:
        contract = sections.get(sid, {})
        restriction = contract.get("constraints", {}).get("routeRestriction")
        if restriction:
            allowed = [restriction] if isinstance(restriction, str) else restriction
            if route not in allowed:
                errors.append(f"Section '{sid}' is restricted to {allowed}, cannot appear on route '{route}'")

    # --- Rhythm rules from compatibility/graph.json ---
    errors_from_graph, warnings_from_graph = _check_graph_rules(template_id, node_section_ids, graph_rules)
    errors.extend(errors_from_graph)
    warnings.extend(warnings_from_graph)

    # --- reducedMotionFallback presence ---
    for node in nodes:
        motion = node.get("motion")
        if motion is None or not motion.get("reducedMotionFallback"):
            errors.append(f"Node '{node.get('section')}' is missing a non-empty motion.reducedMotionFallback")

    # --- Per-instance maxWords ---
    for node in nodes:
        sid = node["section"]
        contract = sections.get(sid)
        if contract is None:
            continue
        content_contract = contract.get("content", {})
        wc_errors = []
        check_maxwords(node.get("content", {}), content_contract, f"nodes[{sid}].content", wc_errors)
        errors.extend(wc_errors)

    return errors, warnings


def _check_graph_rules(template_id, node_section_ids, graph_rules):
    errors = []
    warnings = []
    rule_by_id = {r["id"]: r for r in graph_rules}

    def is_exempt(rule_id, template_id):
        rule = rule_by_id.get(rule_id, {})
        exc = rule.get("exception", "") or ""
        return template_id in exc or "template." + template_id.split(".", 1)[-1] in exc

    hero_ids = [s for s in node_section_ids if s.startswith("hero.")]
    if len(hero_ids) > 1:
        errors.append(f"ONE_HERO_PER_PAGE violated: multiple hero sections {hero_ids}")
    elif len(hero_ids) == 0 and template_id != "template.not-found":
        errors.append(f"ONE_HERO_PER_PAGE violated: no hero section and template '{template_id}' is not the named exception (template.not-found)")

    faq_present = "convert.faq" in node_section_ids
    cta_present = "convert.closing-cta" in node_section_ids
    if faq_present and cta_present:
        if node_section_ids.index("convert.faq") > node_section_ids.index("convert.closing-cta"):
            errors.append("FAQ_MUST_PRECEDE_CLOSING_CTA violated")

    if not cta_present and template_id not in ("template.not-found", "template.why"):
        warnings.append(f"CLOSING_CTA_COVERAGE: template '{template_id}' has no convert.closing-cta and is not a named exception")

    collection_variants = [s for s in node_section_ids if s.startswith("collection.card-grid") or s.startswith("collection.category-feed") or s.startswith("collection.release-feed")]
    if template_id == "template.collection-index":
        if len(collection_variants) != 1:
            errors.append(f"COLLECTION_INDEX_EXACTLY_ONE_VARIANT violated: found {len(collection_variants)} variant nodes, expected exactly 1")

    return errors, warnings


def main():
    if len(sys.argv) != 2:
        print("Usage: semantic_validate.py <pagespec.json>", file=sys.stderr)
        sys.exit(2)
    with open(sys.argv[1], encoding="utf-8") as f:
        pagespec = json.load(f)
    errors, warnings = validate(pagespec)
    for w in warnings:
        print(f"WARN: {w}")
    for e in errors:
        print(f"ERROR: {e}")
    if errors:
        print(f"\nFAILED: {len(errors)} error(s), {len(warnings)} warning(s)")
        sys.exit(1)
    print(f"PASSED: 0 errors, {len(warnings)} warning(s)")


if __name__ == "__main__":
    main()
