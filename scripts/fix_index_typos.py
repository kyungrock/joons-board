# -*- coding: utf-8 -*-
from pathlib import Path

p = Path(__file__).resolve().parent.parent / "index.html"
s = p.read_text(encoding="utf-8")
s = s.replace("��한 프레임", "���근 프레임")
s = s.replace("�����형", "�����형")
s = s.replace("에�� 패��", "에�� 패��")
p.write_text(s, encoding="utf-8")
