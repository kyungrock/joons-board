from pathlib import Path

p = Path("assets/editor.js")
lines = p.read_text(encoding="utf-8").splitlines()

lines[23] = '    { id: "thumb", w: 1200, h: 630, label: "\uB9C1\uD06C \uC378\uB124\uC77C 1200×630" },'
lines[24] = '    { id: "a4", w: 794, h: 1123, label: "A4 \uC138\uB85C (\uC6F9\uC6A9)" },'
lines[25] = '    { id: "pin", w: 1000, h: 1500, label: "\uD540\uD130\uB808\uC2A4\uD2B8 · 1000×1500" },'
lines[40] = '    { v: "ui-monospace, monospace", l: "\uACE0\uC815\uD3F4" },'
lines[178] = '      toast("\uC791\uC5C5\uC744 \uBD88\uB7EC\uC654\uC2B5\uB2C8\uB2E4");'
lines[188] = '    toast("\uC0AD\uC81C\uD588\uC2B5\uB2C8\uB2E4");'
lines[388] = '      return s || "\uD14D\uC2A4\uD2B8";'
lines[399] = '    return t || "\uAC1D\uCCB4";'
lines[512] = '    const t = new fabric.IText("\uD14D\uC2A4\uD2B8\uB97C \uC785\uB825\uD558\uC138\uC694", {'

p.write_text("\n".join(lines) + "\n", encoding="utf-8")
print("ok")
