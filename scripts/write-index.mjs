import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const h = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="\uBE0C\uB77C\uC6B0\uC800\uC5D0\uC11C \uD3EC\uC2A4\uD130\u00B7SNS \uC774\uBBF8\uC9C0\u00B7\uC378\uB124\uC77C\uC744 \uB9CC\uB4DC\uB294 \uCE94\uBC84\uC2A4 \uB514\uC790\uC778 \uB3C4\uAD6C" />
  <title>Canvas Kit \u2014 \uB514\uC790\uC778 \uBCF4\uB4DC</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Do+Hyeon&family=Gowun+Batang:wght@400;700&family=Jua&family=Nanum+Gothic:wght@400;700;800&family=Nanum+Pen+Script&family=Noto+Sans+KR:wght@400;500;600;700;800&family=Sunflower:wght@300;500;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="assets/style.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js"></script>
  <script src="assets/editor.js" defer></script>
</head>
<body class="editor-body">
  <a class="skip-link" href="#viewport">\uCE94\uBC84\uC2A4 \uC601\uC5ED\uC73C\uB85C</a>
  <div class="editor-app" id="editor-app">
    <header class="editor-topbar">
      <div class="topbar-left">
        <div class="logo">
          <span class="logo-icon" aria-hidden="true">\u25A3</span>
          <div>
            <strong>Canvas Kit</strong>
            <span class="logo-tag">\uB9DD\uACE0\uBCF4\uB4DC \uC2A4\uD0C0\uC77C \uBCF4\uB4DC</span>
          </div>
        </div>
        <label class="field-inline">
          <span class="sr-only">\uCE94\uBC84\uC2A4 \uD06C\uAE30</span>
          <select id="preset-size" class="select compact" title="\uCE94\uBC84\uC2A4 \uD06C\uAE30"></select>
        </label>
        <label class="field-inline color-field">
          <span>\uBC30\uACBD</span>
          <input type="color" id="canvas-bg" value="#ffffff" title="\uCE94\uBC84\uC2A4 \uBC30\uACBD\uC0C9" />
        </label>
      </div>
      <div class="topbar-center">
        <div class="zoom-control">
          <button type="button" class="btn-icon" id="zoom-out" title="\uCD95\uC18C">\u2212</button>
          <span id="zoom-label" class="zoom-label">100%</span>
          <button type="button" class="btn-icon" id="zoom-in" title="\uD655\uB300">+</button>
          <button type="button" class="btn-text" id="zoom-fit" title="\uD654\uBA74\uC5D0 \uB9DE\uCDA4">\uB9DE\uCDA4</button>
        </div>
      </div>
      <div class="topbar-right">
        <button type="button" class="btn btn-ghost" id="btn-undo" title="\uC2E4\uD589 \uCDE8\uC18C (Ctrl+Z)">\u21B6 \uC2E4\uD589 \uCDE8\uC18C</button>
        <button type="button" class="btn btn-ghost" id="btn-redo" title="\uB2E4\uC2DC \uC2E4\uD589 (Ctrl+Y)">\u21B7 \uB2E4\uC2DC \uC2E4\uD589</button>
        <button type="button" class="btn btn-ghost" id="btn-theme" title="\uD14C\uB9C8"><span class="icon-theme" aria-hidden="true"></span></button>
        <button type="button" class="btn btn-primary" id="btn-export-png">PNG \uBCF4\uB0B4\uAE30</button>
      </div>
    </header>
    <div class="editor-body-row">
      <aside class="editor-rail" aria-label="\uB3C4\uAD6C \uBC0F \uD15C\uD50C\uB9BF, \uB098\uC758 \uC791\uC5C5">
        <div class="rail-scroll">
          <div class="rail-section rail-section-work">
            <h2 class="rail-title">\uB098\uC758 \uC791\uC5C5</h2>
            <p class="rail-hint">\uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uC800\uC7A5\uB429\uB2C8\uB2E4. \uC774\uB984\uC744 \uC815\uD558\uACE0 \uC800\uC7A5\uD558\uC138\uC694.</p>
            <input type="text" id="project-name" class="input input-compact" placeholder="\uC791\uC5C5 \uC774\uB984" maxlength="80" autocomplete="off" />
            <div class="work-actions">
              <button type="button" class="btn btn-sm" id="btn-new-project" title="\uC0C8 \uCE94\uBC84\uC2A4">\uC0C8 \uD504\uB85C\uC81D\uD2B8</button>
              <button type="button" class="btn btn-sm btn-primary" id="btn-save-project">\uC800\uC7A5</button>
            </div>
            <ul class="work-list" id="work-list" aria-label="\uC800\uC7A5\uB41C \uC791\uC5C5 \uBAA9\uB85D"></ul>
          </div>
          <div class="rail-section">
            <h2 class="rail-title">\uAE30\uBCF8 \uB3C4\uAD6C</h2>
            <div class="tool-grid tool-grid-basic" id="tool-grid-basic">
              <button type="button" class="tool-btn active" data-tool="select" title="\uC120\uD0DD (V)"><span class="tool-ic">\u2196</span><span>\uC120\uD0DD</span></button>
              <button type="button" class="tool-btn" data-tool="text" title="\uD14D\uC2A4\uD2B8 (T)"><span class="tool-ic">T</span><span>\uD14D\uC2A4\uD2B8</span></button>
              <label class="tool-btn tool-file" title="\uC774\uBBF8\uC9C0 \uC5C5\uB85C\uB4DC">
                <input type="file" id="img-upload" accept="image/*" hidden />
                <span class="tool-ic">\uD83D\uDDBC</span><span>\uC774\uBBF8\uC9C0</span>
              </label>
            </div>
          </div>
          <details class="rail-details" open>
            <summary class="rail-details-summary">\uB3C4\uD615 \u00B7 \uC120</summary>
            <p class="rail-hint rail-hint-tight">\uB3C4\uAD6C\uB97C \uACE0\uB978 \uD6C4 \uCE94\uBC84\uC2A4\uB97C \uD074\uB9AD\uD569\uB2C8\uB2E4.</p>
            <div class="tool-grid" id="tool-grid-shapes">
              <button type="button" class="tool-btn" data-tool="rect" title="\uC0AC\uAC01\uD615"><span class="tool-ic">\u25AD</span><span>\uC0AC\uAC01\uD615</span></button>
              <button type="button" class="tool-btn" data-tool="circle" title="\uC6D0"><span class="tool-ic">\u25CB</span><span>\uC6D0</span></button>
              <button type="button" class="tool-btn" data-tool="ellipse" title="\uD0C0\uC6D0"><span class="tool-ic">\u2B2D</span><span>\uD0C0\uC6D0</span></button>
              <button type="button" class="tool-btn" data-tool="triangle" title="\uC0BC\uAC01\uD615"><span class="tool-ic">\u25B3</span><span>\uC0BC\uAC01\uD615</span></button>
              <button type="button" class="tool-btn" data-tool="diamond" title="\uB2E4\uC774\uC544\uBAB0\uB4DC"><span class="tool-ic">\u25C7</span><span>\uB2E4\uC774\uC544\uBAB0\uB4DC</span></button>
              <button type="button" class="tool-btn" data-tool="star" title="\uBCC4"><span class="tool-ic">\u2605</span><span>\uBCC4</span></button>
              <button type="button" class="tool-btn" data-tool="line" title="\uC9C1\uC120"><span class="tool-ic">\u2571</span><span>\uC9C1\uC120</span></button>
              <button type="button" class="tool-btn" data-tool="line-dash" title="\uC810\uC120"><span class="tool-ic">\u22EF</span><span>\uC810\uC120</span></button>
              <button type="button" class="tool-btn" data-tool="arrow" title="\uD654\uC0B4\uD45C"><span class="tool-ic">\u27A4</span><span>\uD654\uC0B4\uD45C</span></button>
            </div>
          </details>
          <details class="rail-details" open>
            <summary class="rail-details-summary">\uD14D\uC2A4\uD2B8 \u00B7 \uC6CC\uB4DC\uC544\uD2B8</summary>
            <p class="rail-hint rail-hint-tight">\uBC84\uD2BC\uC744 \uB204\uB974\uBA74 \uCE94\uBC84\uC2A4 \uC911\uC559\uC5D0 \uC2A4\uD0C0\uC77C \uD14D\uC2A4\uD2B8\uAC00 \uCD94\uAC00\uB429\uB2C8\uB2E4.</p>
            <div class="wordart-grid" id="wordart-grid"></div>
          </details>
          <details class="rail-details">
            <summary class="rail-details-summary">\uD504\uB808\uC784 \u00B7 \uC0AC\uC9C4 \uC601\uC5ED</summary>
            <p class="rail-hint rail-hint-tight">\uD504\uB808\uC784 \uC704\uC5D0 \uC774\uBBF8\uC9C0\uB97C \uC62C\uB824 \uB193\uAC70\uB098 \uC774\uBBF8\uC9C0\uB97C \uBD88\uB7EC\uC640 \uD06C\uAE30\uB97C \uB9DE\uCDA5\uB2C8\uB2E4.</p>
            <div class="frame-btns">
              <button type="button" class="btn-tile" data-frame="simple">\uC2AC\uB9BC \uD14C\uB450\uB9AC</button>
              <button type="button" class="btn-tile" data-frame="round">\uB6F0\uAD81\uD55C \uD504\uB808\uC784</button>
              <button type="button" class="btn-tile" data-frame="polaroid">\uD3F4\uB77C\uB85C\uC774\uB4DC</button>
              <button type="button" class="btn-tile" data-frame="double">\uC774\uC911 \uD14C\uB450\uB9AC</button>
            </div>
          </details>
          <div class="rail-section rail-section-templates">
            <h2 class="rail-title">\uD15C\uD50C\uB9BF</h2>
            <p class="rail-hint">\uD074\uB9AD\uD558\uBA74 \uCE94\uBC84\uC2A4\uAC00 \uBE44\uC6CC\uC9C0\uACE0 \uB808\uC774\uC544\uC6C3\uC774 \uCC44\uC6CC\uC9D1\uB2C8\uB2E4.</p>
            <div class="template-list" id="template-list"></div>
          </div>
          <div class="rail-section rail-section-layers">
            <h2 class="rail-title">\uB808\uC774\uC5B4</h2>
            <ul class="layer-list" id="layer-list" aria-live="polite"></ul>
          </div>
        </div>
      </aside>
      <div class="editor-canvas-zone" id="viewport" tabindex="-1">
        <div class="canvas-viewport-inner" id="viewport-inner">
          <div class="canvas-card" id="canvas-card">
            <canvas id="design-canvas" width="1080" height="1080"></canvas>
          </div>
        </div>
      </div>
      <aside class="editor-inspector" aria-label="\uC18D\uC131">
        <h2 class="rail-title">\uC18D\uC131</h2>
        <div id="inspector-empty" class="inspector-empty">
          <p>\uAC1D\uCCB4\uB97C \uC120\uD0DD\uD558\uBA74 \uAE00\uAF34\u00B7\uC0C9\u00B7\uD14C\uB450\uB9AC\uB97C \uBC14\uAFC0 \uC218 \uC788\uC5B4\uC694.</p>
        </div>
        <div id="inspector-panel" class="inspector-panel" hidden>
          <div class="inspector-actions">
            <button type="button" class="btn btn-sm" id="ins-duplicate">\uBCF5\uC81C</button>
            <button type="button" class="btn btn-sm btn-danger" id="ins-delete">\uC0AD\uC81C</button>
          </div>
          <div class="inspector-row" id="ins-text-wrap" hidden>
            <label class="ins-label">\uB0B4\uC6A9</label>
            <textarea id="ins-text" class="input textarea-sm" rows="3"></textarea>
          </div>
          <div class="inspector-row" id="ins-font-wrap" hidden>
            <label class="ins-label">\uAE00\uAF34</label>
            <select id="ins-font" class="select"></select>
          </div>
          <div class="inspector-row" id="ins-size-wrap" hidden>
            <label class="ins-label">\uD06C\uAE30 <span id="ins-size-val" class="val-pill"></span></label>
            <input type="range" id="ins-font-size" min="8" max="200" value="48" />
          </div>
          <div class="inspector-row">
            <label class="ins-label">\uCC44\uC6B0\uAE30</label>
            <input type="color" id="ins-fill" value="#1e293b" />
          </div>
          <div class="inspector-row" id="ins-stroke-wrap" hidden>
            <label class="ins-label">\uD14C\uB450\uB9AC \uC0C9</label>
            <input type="color" id="ins-stroke" value="#000000" />
          </div>
          <div class="inspector-row" id="ins-stroke-w-wrap" hidden>
            <label class="ins-label">\uD14C\uB450\uB9AC \uB450\uAED8</label>
            <input type="range" id="ins-stroke-width" min="0" max="40" value="2" />
          </div>
          <div class="inspector-row">
            <label class="ins-label">\uBD88\uD22C\uBA85\uB3C4</label>
            <input type="range" id="ins-opacity" min="0" max="100" value="100" />
          </div>
          <div class="inspector-row stack-btns">
            <button type="button" class="btn btn-sm" id="ins-front">\uC55E\uC73C\uB85C</button>
            <button type="button" class="btn btn-sm" id="ins-back">\uB4A4\uB85C</button>
          </div>
        </div>
      </aside>
    </div>
  </div>
  <div class="toast" id="toast" role="status" aria-live="polite" hidden></div>
</body>
</html>
`;

fs.writeFileSync(path.join(root, "index.html"), h, "utf8");
console.log("wrote index.html");
