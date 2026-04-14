# -*- coding: utf-8 -*-
from pathlib import Path
import re

p = Path("assets/editor.js")
t = p.read_text(encoding="utf-8")

# Python interprets \u in normal strings as Unicode; written file is UTF-8 JS.
RENDER = """      const dateStr = dt.toLocaleString("ko-KR", { dateStyle: "short", timeStyle: "short" });
      const meta = document.createElement("div");
      meta.className = "work-meta";
      const nameSpan = document.createElement("span");
      nameSpan.className = "work-name";
      nameSpan.textContent = w.name || "\uC791\uC5C5";
      const dateSpan = document.createElement("span");
      dateSpan.className = "work-date";
      dateSpan.textContent = dateStr;
      meta.appendChild(nameSpan);
      meta.appendChild(dateSpan);
      const loadBtn = document.createElement("button");
      loadBtn.type = "button";
      loadBtn.className = "btn-icon-sm";
      loadBtn.title = "\uBD88\uB7EC\uC624\uAE30";
      loadBtn.textContent = "\u2193";
      loadBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        loadWorkEntry(w.id);
      });
      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "btn-icon-sm danger";
      delBtn.title = "\uC0AD\uC81C";
      delBtn.textContent = "\u2715";
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteWorkById(w.id);
      });
      li.appendChild(meta);
      li.appendChild(loadBtn);
      li.appendChild(delBtn);
      ul.appendChild(li);
"""

t, n = re.subn(
    r"      const dateStr = dt\.toLocaleString\(\"ko-KR\".*?\n      ul\.appendChild\(li\);\n",
    RENDER,
    t,
    count=1,
    flags=re.DOTALL,
)
print("renderWorkList", n)

t, n = re.subn(
    r'!confirm\("저장되지[^"]*"\)',
    '!confirm("\uC800\uC7A5\uB418\uC9C0 \uC54A\uC740 \uBCC0\uACBD\uC774 \uC0AC\uB77C\uC9C8 \uC218 \uC788\uC2B5\uB2C8\uB2E4. \uC774 \uC791\uC5C5\uC744 \uBD88\uB7EC\uC62C\uAE4C\uC694?")',
    t,
    count=1,
)
print("load confirm", n)

t, n = re.subn(
    r'if \(!confirm\("이 작업을 목록에서[^"]*"\)\) return;',
    'if (!confirm("\uC774 \uC791\uC5C5\uC744 \uBAA9\uB85D\uC5D0\uC11C \uC0AD\uC81C\uD560\uAE4C\uC694?")) return;',
    t,
    count=1,
)
print("delete confirm", n)

NEWPROJ = """  function newProject() {
    if (
      canvas.getObjects().length > 0 &&
      !confirm(
        "\uCE94\uBC84\uC2A4\uB97C \uBE44\uC6B0\uACE0 \uC0C8 \uD504\uB85C\uC81D\uD2B8\uB97C \uC2DC\uC791\uD560\uAE4C\uC694?"
      )
    )
      return;
    currentWorkId = null;
    document.getElementById("project-name").value = "";
    canvas.clear();
    canvas.backgroundColor = document.getElementById("canvas-bg").value;
    canvas.renderAll();
    resetHistoryFromCanvas();
    updateLayers();
    updateInspector();
    toast("\uC0C8 \uD504\uB85C\uC81D\uD2B8");
  }
"""

t, n = re.subn(
    r"  function newProject\(\) \{.*?^  \}\n",
    NEWPROJ + "\n",
    t,
    count=1,
    flags=re.MULTILINE | re.DOTALL,
)
print("newProject", n)

t, n = re.subn(
    r"    if \(hasObjects && ![^\n]+\n      document\.getElementById\(\"preset-size\"\)\.value = lastPresetId;",
    """    if (
      hasObjects &&
      !confirm(
        "\uCE94\uBC84\uC2A4 \uD06C\uAE30\uB97C \uBC14\uAFB8\uBA74 \uD604\uC7AC \uC791\uC5C5\uC774 \uC9C0\uC6CC\uC9D1\uB2C8\uB2E4. \uACC4\uC18D\uD560\uAE4C\uC694?"
      )
    ) {
      document.getElementById("preset-size").value = lastPresetId;""",
    t,
    count=1,
)
print("applyPreset", n)

t, n = re.subn(
    r'if \(t === "triangle[^\n]*\n',
    'if (t === "triangle") return "\uC0BC\uAC01\uD615";\n',
    t,
    count=1,
)
print("triangle", n)

t, n = re.subn(
    r'if \(t === "path"\)[^\n]+\n',
    'if (t === "path") return "\uD654\uC0B4\uD45C";\n',
    t,
    count=1,
)
print("path", n)

t = t.replace('return t || "\ufffd\uccb4";', 'return t || "\uAC1D\uCCB4";')

t, n = re.subn(
    r'"strokeDashArray",\n \]\)',
    '"strokeDashArray",\n        "frameKind",\n      ])',
    t,
    count=1,
)
print("snapshot frameKind", n)

p.write_text(t, encoding="utf-8")
print("done")
