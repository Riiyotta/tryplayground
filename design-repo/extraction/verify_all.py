#!/usr/bin/env python3
"""Self-containment + schema + structural + maxWords + drift checks, all in
one script. Repo root always derived from this file's own location.

Run standalone: python3 extraction/verify_all.py
"""
import json
import os
import re
import sys

REPO_ROOT = os.path.dirname(os.path.abspath(__file__))
DESIGN_REPO_ROOT = os.path.dirname(REPO_ROOT)
sys.path.insert(0, os.path.join(DESIGN_REPO_ROOT, "schema"))

FAILURES = []
PASSES = []


def check(name, condition, detail=""):
    if condition:
        PASSES.append(name)
    else:
        FAILURES.append(f"{name}: {detail}")


def load_json(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def allowlist_parity():
    allowlist = load_json(os.path.join(DESIGN_REPO_ROOT, "tokens", "llm", "component-allowlist.json"))
    primitives_dir = os.path.join(DESIGN_REPO_ROOT, "primitives")
    components_dir = os.path.join(DESIGN_REPO_ROOT, "components")
    sections_dir = os.path.join(DESIGN_REPO_ROOT, "sections")

    real_primitives = {f[:-5] for f in os.listdir(primitives_dir) if f.endswith(".json")}
    real_components = {f[:-5] for f in os.listdir(components_dir) if f.endswith(".json")}
    real_sections = {f[:-5] for f in os.listdir(sections_dir) if f.endswith(".json")}

    listed_primitives = set(allowlist["primitives"])
    listed_components = set(allowlist["components"])
    listed_sections = set(allowlist["sections"])

    phantom_primitives = listed_primitives - real_primitives
    orphan_primitives = real_primitives - listed_primitives
    phantom_components = listed_components - real_components
    orphan_components = real_components - listed_components
    phantom_sections = listed_sections - real_sections
    orphan_sections = real_sections - listed_sections

    all_phantoms = phantom_primitives | phantom_components | phantom_sections
    all_orphans = orphan_primitives | orphan_components | orphan_sections

    check(
        "ALLOWLIST_PARITY: no phantom entries, no orphan contract files",
        not all_phantoms and not all_orphans,
        f"phantoms={all_phantoms} orphans={all_orphans}",
    )
    return not all_phantoms and not all_orphans


def citation_validity():
    """Resolve every measuredFrom/citation path:line[-line] against the real
    file it names, inside DESIGN_REPO_ROOT's own tree (sections/*.json cite
    tailwind.config.js etc via relative-looking strings inside 'citation'
    fields; these are prose citations to the sibling project, checked here
    only when the sibling tree is present - degrades gracefully otherwise)."""
    project_root = os.path.dirname(DESIGN_REPO_ROOT)
    pattern = re.compile(r"^([\w./\-]+\.(?:js|jsx|json|md)):(\d+)(?:-(\d+))?")

    citations = load_json(os.path.join(REPO_ROOT, "measured-values.json"))["citations"]
    bad = []
    checked = 0
    sibling_tree_present = os.path.isdir(project_root) and os.path.isfile(os.path.join(project_root, "package.json"))

    if not sibling_tree_present:
        check("CITATION_VALIDITY: sibling project tree not present, skipped gracefully (warn, not fail)", True)
        return True

    for c in citations:
        src = c["source"]
        m = pattern.match(src.replace("../", ""))
        if not m:
            continue
        rel_path, start, end = m.group(1), int(m.group(2)), m.group(3)
        end = int(end) if end else start
        abs_path = os.path.join(project_root, rel_path)
        checked += 1
        if not os.path.isfile(abs_path):
            bad.append(f"{src} -> file not found: {abs_path}")
            continue
        with open(abs_path, encoding="utf-8") as f:
            line_count = sum(1 for _ in f)
        if end > line_count:
            bad.append(f"{src} -> range end {end} exceeds real file length {line_count}")

    check(f"CITATION_VALIDITY: {checked} citations resolved, all in-range", not bad, "; ".join(bad))
    return not bad


def manifest_counts_recompute():
    manifest = load_json(os.path.join(DESIGN_REPO_ROOT, "registry.manifest.json"))
    templates = load_json(os.path.join(DESIGN_REPO_ROOT, "templates", "templates.json"))["templates"]
    sections_dir = os.path.join(DESIGN_REPO_ROOT, "sections")

    real_template_count = len(templates)
    real_section_count = len([f for f in os.listdir(sections_dir) if f.endswith(".json")])
    real_route_count = len({r for t in templates for r in t["routes"]})

    claimed = manifest["counts"]
    ok = (
        claimed["templates"] == real_template_count
        and claimed["sections"] == real_section_count
        and claimed["routes"] == real_route_count
    )
    check(
        "MANIFEST_COUNTS_RECOMPUTE: manifest counts match real files on disk",
        ok,
        f"claimed={claimed} real=templates:{real_template_count},sections:{real_section_count},routes:{real_route_count}",
    )
    return ok


def no_absolute_paths():
    """Flags a real macOS absolute path (/Users/<name>/...), not this
    check's own source line that names the pattern it looks for."""
    self_path = os.path.abspath(__file__)
    abs_path_re = re.compile(r"/Users/[\w.\-]+/")
    bad = []
    for dirpath, _, filenames in os.walk(DESIGN_REPO_ROOT):
        if os.path.basename(dirpath) == "__pycache__":
            continue
        for fname in filenames:
            if fname.endswith((".json", ".py", ".md")):
                full = os.path.join(dirpath, fname)
                if os.path.abspath(full) == self_path:
                    continue
                try:
                    with open(full, encoding="utf-8") as f:
                        content = f.read()
                except UnicodeDecodeError:
                    continue
                if abs_path_re.search(content):
                    bad.append(full)
    check("NO_ABSOLUTE_PATHS: no real /Users/<name>/ path anywhere in design-repo/", not bad, str(bad))
    return not bad


def entrypoints_self_contained():
    manifest = load_json(os.path.join(DESIGN_REPO_ROOT, "registry.manifest.json"))
    bad = [e for e in manifest.get("entryPoints", []) if e.startswith("..") or e.startswith("/")]
    check("ENTRYPOINTS_SELF_CONTAINED: no ../ or absolute entryPoints", not bad, str(bad))
    return not bad


def allowlist_version_parity():
    manifest = load_json(os.path.join(DESIGN_REPO_ROOT, "registry.manifest.json"))
    allowlist = load_json(os.path.join(DESIGN_REPO_ROOT, "tokens", "llm", "component-allowlist.json"))
    ok = manifest["allowlistVersion"] == allowlist["version"]
    check("ALLOWLIST_VERSION_PARITY: manifest.allowlistVersion matches component-allowlist.json version", ok, f"manifest={manifest['allowlistVersion']} allowlist={allowlist['version']}")
    return ok


def run_adversarial_suite():
    result = os.system(f'"{sys.executable}" "{os.path.join(DESIGN_REPO_ROOT, "schema", "tests", "adversarial_test.py")}" > /dev/null 2>&1')
    check("ADVERSARIAL_SUITE: schema/tests/adversarial_test.py exits 0", result == 0, f"exit code {result}")
    return result == 0


def schema_validates_example():
    try:
        from jsonschema import Draft7Validator
    except ImportError:
        check("SCHEMA_VALIDATES_EXAMPLE", False, "jsonschema not installed")
        return False
    schema = load_json(os.path.join(DESIGN_REPO_ROOT, "schema", "pagespec.schema.json"))
    instance = load_json(os.path.join(DESIGN_REPO_ROOT, "schema", "example.pagespec.json"))
    errors = list(Draft7Validator(schema).iter_errors(instance))
    check("SCHEMA_VALIDATES_EXAMPLE: zero draft-07 errors on example.pagespec.json", not errors, [e.message for e in errors])
    return not errors


def main():
    schema_validates_example()
    run_adversarial_suite()
    allowlist_parity()
    citation_validity()
    manifest_counts_recompute()
    no_absolute_paths()
    entrypoints_self_contained()
    allowlist_version_parity()

    print(f"{len(PASSES)} passed, {len(FAILURES)} failed\n")
    for p in PASSES:
        print(f"  PASS: {p}")
    if FAILURES:
        print()
        for f in FAILURES:
            print(f"  FAIL: {f}")
        sys.exit(1)


if __name__ == "__main__":
    main()
