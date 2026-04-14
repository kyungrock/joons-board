# -*- coding: utf-8 -*-
"""Fix corrupted Korean strings in assets/editor.js."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
path = ROOT / "assets" / "editor.js"
text = path.read_text(encoding="utf-8")

GROUP_LINE = (
    '    if (t === "group") return obj.isPhotoFrame ? '
    '"\ud504\ub808\uc784" : "\uadf8\ub8f9";'
)
TOAST = '            toast("\ud504\ub808\uc784\uc5d0 \ub9de\ucdc4\uc2b5\ub2c8\ub2e4");'

text, n1 = re.subn(
    r'^[ \t]+if \(t === "group"\) return obj\.isPhotoFrame \? "프레임" : "[^"]+";',
    GROUP_LINE,
    text,
    count=1,
    flags=re.M,
)
text, n2 = re.subn(
    r'          if \(tryClipImageToFrame\(img\)\) \{\n            toast\("[^"]*"\);\n          \}',
    '          if (tryClipImageToFrame(img)) {\n' + TOAST + "\n          }",
    text,
    count=1,
)

path.write_text(text, encoding="utf-8")
print("group line:", n1, "toast:", n2)
