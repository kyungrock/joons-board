from pathlib import Path

main_path = Path("assets/editor.js")
middle_path = Path("scripts/middle_fragment.js")
main = main_path.read_text(encoding="utf-8")
middle = middle_path.read_text(encoding="utf-8")
start = main.index("const WORDART_PRESETS = [")
end = main.index("  function exportPng()")
main_path.write_text(main[:start] + middle + main[end:], encoding="utf-8")
print("spliced", len(middle), "chars")
