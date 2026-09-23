#!/usr/bin/env python3
"""Adversarial test suite: every rule must reject a real mutation, and every
control case (the bundled example, every real template) must pass with zero
errors. Run standalone: python3 schema/tests/adversarial_test.py
"""
import copy
import json
import os
import sys

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DESIGN_REPO_ROOT = os.path.dirname(REPO_ROOT)
sys.path.insert(0, REPO_ROOT)

from semantic_validate import validate, load_templates, load_sections  # noqa: E402

try:
    from jsonschema import Draft7Validator
except ImportError:
    Draft7Validator = None


def load_example():
    with open(os.path.join(REPO_ROOT, "example.pagespec.json"), encoding="utf-8") as f:
        return json.load(f)


def load_schema():
    with open(os.path.join(REPO_ROOT, "pagespec.schema.json"), encoding="utf-8") as f:
        return json.load(f)


PASS = []
FAIL = []


def expect_semantic_errors(name, pagespec, should_fail=True):
    errors, warnings = validate(pagespec)
    ok = (len(errors) > 0) == should_fail
    (PASS if ok else FAIL).append((name, errors))


def expect_schema_errors(name, instance, should_fail=True):
    if Draft7Validator is None:
        FAIL.append((name, ["jsonschema not installed"]))
        return
    schema = load_schema()
    errors = list(Draft7Validator(schema).iter_errors(instance))
    ok = (len(errors) > 0) == should_fail
    (PASS if ok else FAIL).append((name, [e.message for e in errors]))


def main():
    example = load_example()

    # ---- Control cases: must pass with zero errors ----
    expect_semantic_errors("CONTROL: bundled example passes semantic validation", example, should_fail=False)
    expect_schema_errors("CONTROL: bundled example passes schema validation", example, should_fail=False)

    templates = load_templates()
    sections = load_sections()
    for tid, tpl in templates.items():
        # Build a minimal synthetic instance for each template: every
        # required node present, minimal-but-valid content, to prove the
        # graph/validator rules don't reject a genuinely correct structure.
        nodes = []
        for node_def in tpl["nodes"]:
            if not node_def.get("required", True):
                continue
            sid = node_def["section"]
            nodes.append({
                "section": sid,
                "type": "section",
                "content": _minimal_content(sections.get(sid, {}).get("content", {})),
                "motion": {"pattern": "none", "reducedMotionFallback": "n/a - synthetic control case"},
            })
        route = tpl["routes"][0]
        if tid == "template.collection-index":
            # exactly one of the three optional collection.* variants must be
            # present, matching the real per-route shape (COLLECTION_INDEX_EXACTLY_ONE_VARIANT)
            variant_sid = "collection.card-grid"
            nodes.insert(3, {
                "section": variant_sid,
                "type": "section",
                "content": _minimal_content(sections.get(variant_sid, {}).get("content", {})),
                "motion": {"pattern": "none", "reducedMotionFallback": "n/a - synthetic control case"},
            })
        synthetic = {"template": tid, "route": route, "nodes": nodes}
        expect_semantic_errors(f"CONTROL: synthetic minimal instance of {tid} passes", synthetic, should_fail=False)

    # ---- Schema-layer adversarial mutations ----
    m = copy.deepcopy(example)
    m["template"] = "template.does-not-exist"
    expect_schema_errors("ADV: invented template enum value is rejected", m, should_fail=True)

    m = copy.deepcopy(example)
    del m["route"]
    expect_schema_errors("ADV: missing required 'route' field is rejected", m, should_fail=True)

    m = copy.deepcopy(example)
    m["nodes"][0]["section"] = "invented.section.type"
    expect_schema_errors("ADV: invented section enum value is rejected", m, should_fail=True)

    m = copy.deepcopy(example)
    del m["nodes"][0]["motion"]["reducedMotionFallback"]
    expect_schema_errors("ADV: missing reducedMotionFallback is rejected by schema", m, should_fail=True)

    m = copy.deepcopy(example)
    m["nodes"][0]["motion"]["inventedField"] = "smuggled"
    expect_schema_errors("ADV: invented motion field is rejected (additionalProperties:false)", m, should_fail=True)

    # ---- Structural adversarial mutations (semantic layer) ----
    m = copy.deepcopy(example)
    m["nodes"].append(copy.deepcopy(m["nodes"][0]))  # duplicate chrome.header
    expect_semantic_errors("ADV: duplicate onePerPage section (chrome.header x2) is rejected", m, should_fail=True)

    m = copy.deepcopy(example)
    m["nodes"] = [n for n in m["nodes"] if n["section"] != "chrome.footer"]  # remove mandatory
    expect_semantic_errors("ADV: removed mandatory section (chrome.footer) is rejected", m, should_fail=True)

    m = copy.deepcopy(example)
    m["nodes"][0], m["nodes"][1] = m["nodes"][1], m["nodes"][0]  # header no longer first
    expect_semantic_errors("ADV: chrome.header not first is rejected", m, should_fail=True)

    m = copy.deepcopy(example)
    m["template"] = "template.solution-flagship"  # template/node-sequence mismatch
    expect_semantic_errors("ADV: template/node-sequence mismatch is rejected", m, should_fail=True)

    m = copy.deepcopy(example)
    intruder = {"section": "convert.savings-club", "type": "section", "content": {"headline": "x", "body": "x", "linkLabel": "x", "image": "x"}, "motion": {"pattern": "none", "reducedMotionFallback": "n/a"}}
    m["nodes"].insert(4, intruder)
    expect_semantic_errors("ADV: route-restricted section on wrong route is rejected (savings-club on /for/centers)", m, should_fail=True)

    # ---- Runtime: maxWords overflow ----
    m = copy.deepcopy(example)
    for node in m["nodes"]:
        if node["section"] == "convert.closing-cta":
            node["content"]["heading"] = "This heading has been deliberately padded with many extra words to overflow the ten word budget"
    expect_semantic_errors("ADV: maxWords overflow on convert.closing-cta.heading is rejected", m, should_fail=True)

    # ---- Rhythm rule: ONE_HERO_PER_PAGE ----
    m = copy.deepcopy(example)
    extra_hero = {"section": "hero.centered", "type": "section", "content": {"headline": "x"}, "motion": {"pattern": "none", "reducedMotionFallback": "n/a"}}
    m["nodes"].insert(2, extra_hero)
    expect_semantic_errors("ADV: two hero sections on one page violates ONE_HERO_PER_PAGE", m, should_fail=True)

    # ---- Control: template.not-found's real hero-less structure must NOT trip ONE_HERO_PER_PAGE ----
    nf_tpl = templates["template.not-found"]
    nf_nodes = [{"section": n["section"], "type": "section", "content": _minimal_content(sections.get(n["section"], {}).get("content", {})), "motion": {"pattern": "none", "reducedMotionFallback": "n/a"}} for n in nf_tpl["nodes"]]
    nf_instance = {"template": "template.not-found", "route": "/*", "nodes": nf_nodes}
    expect_semantic_errors("CONTROL: template.not-found's real hero-less structure is accepted (named exception)", nf_instance, should_fail=False)

    # ---- Report ----
    print(f"{len(PASS)} passed, {len(FAIL)} failed\n")
    for name, _ in PASS:
        print(f"  PASS: {name}")
    if FAIL:
        print()
        for name, errors in FAIL:
            print(f"  FAIL: {name}")
            for e in errors:
                print(f"        {e}")
        sys.exit(1)


def _minimal_content(content_contract):
    """Produce a minimal but schema-plausible content object for a section's
    contract, used only to build synthetic control-case instances."""
    if not isinstance(content_contract, dict):
        return {}
    result = {}
    props = content_contract.get("properties", {})
    required = content_contract.get("required", [])
    for key in required:
        sub = props.get(key, {})
        result[key] = _minimal_value(sub)
    return result


def _minimal_value(sub_contract):
    t = sub_contract.get("type")
    if "const" in sub_contract:
        return sub_contract["const"]
    if "enum" in sub_contract:
        return sub_contract["enum"][0]
    if t == "array":
        min_items = sub_contract.get("minItems", 1)
        items = sub_contract.get("items", {})
        return [_minimal_value(items) for _ in range(max(min_items, 1))]
    if t == "object":
        return _minimal_content(sub_contract)
    if t == "boolean":
        return False
    if t == "integer" or t == "number":
        return sub_contract.get("minimum", 1)
    return "x"


if __name__ == "__main__":
    main()
