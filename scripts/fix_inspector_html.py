from pathlib import Path

new_block = (
    "          <div class=\"inspector-row\" id=\"ins-arrange-wrap\">\n"
    "            <label class=\"ins-label\">\uce94\ubc84\uc2a4 \uc815\ub82c</label>\n"
    "            <div class=\"ins-btn-grid ins-btn-grid-3\">\n"
    "              <button type=\"button\" class=\"btn btn-sm\" data-arr=\"left\" title=\"\uc67c\ucabd \ub9de\ucda4\">\uc67c\ucabd</button>\n"
    "              <button type=\"button\" class=\"btn btn-sm\" data-arr=\"hcenter\" title=\"\uac00\ub85c \uac00\uc6b4\ub370\">\uac00\uc6b4\ub370\u2194</button>\n"
    "              <button type=\"button\" class=\"btn btn-sm\" data-arr=\"right\" title=\"\uc624\ub978\ucabd \ub9de\ucda4\">\uc624\ub978\ucabd</button>\n"
    "              <button type=\"button\" class=\"btn btn-sm\" data-arr=\"top\" title=\"\uc704 \ub9de\ucda4\">\uc704</button>\n"
    "              <button type=\"button\" class=\"btn btn-sm\" data-arr=\"vcenter\" title=\"\uc138\ub85c \uac00\uc6b4\ub370\">\uac00\uc6b4\ub370\u2195</button>\n"
    "              <button type=\"button\" class=\"btn btn-sm\" data-arr=\"bottom\" title=\"\uc544\ub798 \ub9de\ucda4\">\uc544\ub798</button>\n"
    "            </div>\n"
    "          </div>\n"
    "          <div class=\"inspector-row\" id=\"ins-stack-wrap\">\n"
    "            <label class=\"ins-label\">\uc55e\ub4a4 \uc21c\uc11c</label>\n"
    "            <div class=\"ins-btn-grid ins-btn-grid-2\">\n"
    "              <button type=\"button\" class=\"btn btn-sm\" data-stack=\"tofront\" title=\"\ub9e8 \uc55e\uc73c\ub85c\">\ub9e8 \uc55e</button>\n"
    "              <button type=\"button\" class=\"btn btn-sm\" data-stack=\"forward\" title=\"\ud55c \uce78 \uc55e\uc73c\ub85c\">\ud55c \uce78 \u2191</button>\n"
    "              <button type=\"button\" class=\"btn btn-sm\" data-stack=\"backward\" title=\"\ud55c \uce78 \ub4a4\ub85c\">\ud55c \uce78 \u2193</button>\n"
    "              <button type=\"button\" class=\"btn btn-sm\" data-stack=\"toback\" title=\"\ub9e8 \ub4a4\ub85c\">\ub9e8 \ub4a4</button>\n"
    "            </div>\n"
    "          </div>\n"
    "          <div class=\"inspector-row\" id=\"ins-flip-wrap\">\n"
    "            <label class=\"ins-label\">\ub4a4\uc9d1\uae30</label>\n"
    "            <div class=\"ins-btn-grid ins-btn-grid-2\">\n"
    "              <button type=\"button\" class=\"btn btn-sm\" data-flip=\"x\" title=\"\uc88c\uc6b0 \ub4a4\uc9d1\uae30\">\uc88c\uc6b0</button>\n"
    "              <button type=\"button\" class=\"btn btn-sm\" data-flip=\"y\" title=\"\uc0c1\ud558 \ub4a4\uc9d1\uae30\">\uc0c1\ud558</button>\n"
    "            </div>\n"
    "          </div>\n"
)

p = Path("index.html")
t = p.read_text(encoding="utf-8")
start = t.find('<div class="inspector-row" id="ins-arrange-wrap">')
idx_hidden = t.find('<div class="inspector-row stack-btns" hidden>', start)
if start == -1 or idx_hidden == -1:
    raise SystemExit("markers not found")
end_block = t.find("</div>", t.find('id="ins-back"', idx_hidden)) + len("</div>")
while end_block < len(t) and t[end_block] in "\r\n":
    end_block += 1

p.write_text(t[:start] + new_block + t[end_block:], encoding="utf-8")
print("ok")
