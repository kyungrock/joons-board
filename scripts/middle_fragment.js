  const WORDART_PRESETS = [
    {
      id: "gold",
      title: "Gold foil",
      sub: "Black Han Sans",
      text: "GRAND OPEN",
      build: () => ({
        fontFamily: "Black Han Sans",
        fontSize: 64,
        fill: linearGradientH("#fbbf24", "#b45309"),
        stroke: "#422006",
        strokeWidth: 2,
        fontWeight: "400",
        shadow: new fabric.Shadow({ color: "rgba(0,0,0,.25)", blur: 6, offsetX: 2, offsetY: 3 }),
      }),
    },
    {
      id: "neon",
      title: "Neon sign",
      sub: "Do Hyeon",
      text: "OPEN",
      build: () => ({
        fontFamily: "Do Hyeon",
        fontSize: 86,
        fill: "#5eead4",
        stroke: "#134e4a",
        strokeWidth: 1,
        shadow: new fabric.Shadow({
          color: "rgba(94,234,212,0.9)",
          blur: 28,
          offsetX: 0,
          offsetY: 0,
        }),
      }),
    },
    {
      id: "pastel",
      title: "Pastel bubble",
      sub: "Jua",
      text: "\uc624\ub298\uc758 \ud83c\udf80",
      build: () => ({
        fontFamily: "Jua",
        fontSize: 56,
        fill: "#f472b6",
        stroke: "#ffffff",
        strokeWidth: 3,
        shadow: new fabric.Shadow({ color: "rgba(244,114,182,.35)", blur: 12, offsetX: 0, offsetY: 4 }),
      }),
    },
    {
      id: "pen",
      title: "Hand lettering",
      sub: "Nanum Pen Script",
      text: "Thank you",
      build: () => ({
        fontFamily: "Nanum Pen Script",
        fontSize: 72,
        fill: "#1e3a8a",
        stroke: "#ffffff",
        strokeWidth: 2,
      }),
    },
    {
      id: "serif",
      title: "Classic serif",
      sub: "Gowun Batang",
      text: "The Classic",
      build: () => ({
        fontFamily: "Gowun Batang",
        fontSize: 52,
        fill: "#fef3c7",
        stroke: "#78350f",
        strokeWidth: 1,
        shadow: new fabric.Shadow({ color: "rgba(0,0,0,.4)", blur: 8, offsetX: 2, offsetY: 2 }),
      }),
    },
    {
      id: "sunflower",
      title: "Pop shadow",
      sub: "Sunflower",
      text: "BIG SALE",
      build: () => ({
        fontFamily: "Sunflower",
        fontSize: 68,
        fill: "#fef08a",
        stroke: "#854d0e",
        strokeWidth: 2,
        shadow: new fabric.Shadow({ color: "rgba(127,29,29,.55)", blur: 0, offsetX: 5, offsetY: 5 }),
      }),
    },
    {
      id: "rainbow",
      title: "Rainbow",
      sub: "Noto Sans KR",
      text: "Happy Day!",
      build: () => ({
        fontFamily: "Noto Sans KR",
        fontSize: 54,
        fontWeight: "800",
        fill: new fabric.Gradient({
          type: "linear",
          gradientUnits: "percentage",
          coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
          colorStops: [
            { offset: 0, color: "#ef4444" },
            { offset: 0.35, color: "#eab308" },
            { offset: 0.65, color: "#22c55e" },
            { offset: 1, color: "#3b82f6" },
          ],
        }),
        stroke: "#0f172a",
        strokeWidth: 1,
      }),
    },
    {
      id: "metal",
      title: "Metal silver",
      sub: "Impact",
      text: "METAL",
      build: () => ({
        fontFamily: "Impact, sans-serif",
        fontSize: 72,
        fill: linearGradientH("#e2e8f0", "#64748b"),
        stroke: "#334155",
        strokeWidth: 2,
      }),
    },
    {
      id: "outline",
      title: "Thick outline",
      sub: "Noto Sans KR",
      text: "OUTLINE",
      build: () => ({
        fontFamily: "Noto Sans KR",
        fontSize: 58,
        fontWeight: "800",
        fill: "#ffffff",
        stroke: "#6366f1",
        strokeWidth: 6,
      }),
    },
    {
      id: "soft",
      title: "Soft shadow",
      sub: "Noto Sans KR",
      text: "\uc0c8\ub85c\uc6b4 \uc2dc\uc791",
      build: () => ({
        fontFamily: "Noto Sans KR",
        fontSize: 48,
        fontWeight: "700",
        fill: "#0f172a",
        shadow: new fabric.Shadow({ color: "rgba(15,23,42,.25)", blur: 18, offsetX: 0, offsetY: 8 }),
      }),
    },
  ];

  function addWordArt(presetId) {
    const p = WORDART_PRESETS.find((x) => x.id === presetId);
    if (!p) return;
    const cx = canvas.getWidth() / 2;
    const cy = canvas.getHeight() / 2;
    const props = p.build();
    const t = new fabric.IText(p.text, Object.assign({}, props, {
      left: cx,
      top: cy,
      originX: "center",
      originY: "center",
    }));
    finalizeAdd(t);
    setTool("select");
    toast("\uc2a4\ud0c0\uc77c \ud14d\uc2a4\ud2b8\ub97c \ucd94\uac00\ud588\uc2b5\ub2c8\ub2e4");
  }

  function initWordArtButtons() {
    const root = document.getElementById("wordart-grid");
    if (!root) return;
    WORDART_PRESETS.forEach((p) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "wordart-btn";
      b.innerHTML = `<span>${p.title}</span><small>${p.sub}</small>`;
      b.addEventListener("click", () => addWordArt(p.id));
      root.appendChild(b);
    });
  }

  function clearAndTemplate(fn) {
    if (
      canvas.getObjects().length > 0 &&
      !confirm(
        "\ud15c\ud50c\ub9bf\uc744 \uc801\uc6a9\ud558\uba74 \uce94\ubc84\uc2a4\uac00 \ube44\uc6cc\uc9d1\ub2c8\ub2e4. \uacc4\uc18d\ud560\uae4c\uc694?"
      )
    )
      return;
    canvas.clear();
    canvas.backgroundColor = document.getElementById("canvas-bg").value;
    fn();
    canvas.renderAll();
    resetHistoryFromCanvas();
    updateLayers();
    updateInspector();
    setTool("select");
    toast("\ud15c\ud50c\ub9bf\uc744 \uc801\uc6a9\ud588\uc2b5\ub2c8\ub2e4");
  }

  function tplBrand() {
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const bar = new fabric.Rect({
      left: 0,
      top: h * 0.72,
      width: w,
      height: h * 0.28,
      fill: "#1e293b",
      selectable: true,
    });
    const title = new fabric.IText("\ube0c\ub79c\ub4dc \uc774\ub984", {
      left: w * 0.5,
      top: h * 0.28,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(64, w / 14),
      fill: "#0f172a",
      fontWeight: "700",
    });
    const sub = new fabric.IText("\ud55c \uc904 \uc124\uba85\uc744 \uc785\ub825\ud558\uc138\uc694", {
      left: w * 0.5,
      top: h * 0.4,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(28, w / 28),
      fill: "#64748b",
    });
    canvas.add(bar, title, sub);
  }

  function tplPromo() {
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const grad = new fabric.Gradient({
      type: "linear",
      gradientUnits: "percentage",
      coords: { x1: 0, y1: 0, x2: 1, y2: 1 },
      colorStops: [
        { offset: 0, color: "#4f46e5" },
        { offset: 1, color: "#db2777" },
      ],
    });
    const bg = new fabric.Rect({ left: 0, top: 0, width: w, height: h, fill: grad });
    const t1 = new fabric.IText("\ubd04 \uc2dc\uc98c \uc624\ud508", {
      left: w * 0.5,
      top: h * 0.32,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(52, w / 18),
      fill: "#ffffff",
      fontWeight: "700",
      shadow: new fabric.Shadow({ color: "rgba(0,0,0,.35)", blur: 12, offsetX: 0, offsetY: 4 }),
    });
    const t2 = new fabric.IText("\uc9c0\uae08 \ubc14\ub85c \ud655\uc778\ud558\uae30", {
      left: w * 0.5,
      top: h * 0.48,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(26, w / 32),
      fill: "rgba(255,255,255,.92)",
    });
    canvas.add(bg, t1, t2);
  }

  function tplSale() {
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const bg = new fabric.Rect({ left: 0, top: 0, width: w, height: h, fill: "#dc2626" });
    const t1 = new fabric.IText("SALE", {
      left: w * 0.5,
      top: h * 0.38,
      originX: "center",
      originY: "center",
      fontFamily: "Impact, sans-serif",
      fontSize: Math.min(120, w / 8),
      fill: "#ffffff",
      fontWeight: "400",
    });
    const t2 = new fabric.IText("\ucd5c\ub300 50% \ud560\uc778", {
      left: w * 0.5,
      top: h * 0.58,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(36, w / 22),
      fill: "#fef2f2",
    });
    canvas.add(bg, t1, t2);
  }

  function tplQuote() {
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const bg = new fabric.Rect({ left: 0, top: 0, width: w, height: h, fill: "#0f172a" });
    const t1 = new fabric.IText('"\uc624\ub298 \ud560 \uc218 \uc788\ub294 \uc77c\uc744\n\ub0b4\uc77c\ub85c \ubbf8\ub8e8\uc9c0 \ub9c8\uc138\uc694."', {
      left: w * 0.5,
      top: h * 0.42,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(38, w / 24),
      fill: "#f8fafc",
      fontWeight: "500",
      textAlign: "center",
      lineHeight: 1.35,
    });
    const t2 = new fabric.IText("\u2014 \uc624\ub298\uc758 \ud55c \uc904", {
      left: w * 0.5,
      top: h * 0.68,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(20, w / 40),
      fill: "#94a3b8",
    });
    canvas.add(bg, t1, t2);
  }

  function tplCafe() {
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const bg = new fabric.Rect({ left: 0, top: 0, width: w, height: h, fill: "#faf7f2" });
    const stripe = new fabric.Rect({ left: w * 0.08, top: h * 0.12, width: w * 0.84, height: 4, fill: "#78350f" });
    const t1 = new fabric.IText("CAFE MENU", {
      left: w * 0.5,
      top: h * 0.22,
      originX: "center",
      originY: "center",
      fontFamily: "Do Hyeon",
      fontSize: Math.min(56, w / 16),
      fill: "#422006",
    });
    const t2 = new fabric.IText("\uc74c\ub8cc \ub514\uc800\ud2b8\n\uac00\uaca9\uc740 \ub098\uc911\uc5d0 \uc218\uc815", {
      left: w * 0.5,
      top: h * 0.45,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(26, w / 30),
      fill: "#57534e",
      textAlign: "center",
      lineHeight: 1.45,
    });
    canvas.add(bg, stripe, t1, t2);
  }

  function tplYoutube() {
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const bg = new fabric.Rect({ left: 0, top: 0, width: w, height: h, fill: "#18181b" });
    const bar = new fabric.Rect({ left: 0, top: h * 0.62, width: w, height: h * 0.38, fill: "#27272a" });
    const t1 = new fabric.IText("\uc601\uc0c1 \uc81c\ubaa9 \uc5ec\uae30", {
      left: w * 0.08,
      top: h * 0.72,
      originX: "left",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(44, w / 18),
      fill: "#fafafa",
      fontWeight: "700",
      shadow: new fabric.Shadow({ color: "rgba(0,0,0,.5)", blur: 8, offsetX: 0, offsetY: 2 }),
    });
    const t2 = new fabric.IText("\ubd80\uc81c \xb7 \ud0a4\uc6cc\ub4dc", {
      left: w * 0.08,
      top: h * 0.84,
      originX: "left",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(22, w / 36),
      fill: "#a1a1aa",
    });
    canvas.add(bg, bar, t1, t2);
  }

  function tplMinimal() {
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const bg = new fabric.Rect({ left: 0, top: 0, width: w, height: h, fill: "#ffffff" });
    const line = new fabric.Rect({ left: w * 0.15, top: h * 0.42, width: w * 0.7, height: 2, fill: "#e2e8f0" });
    const t1 = new fabric.IText("PRODUCT", {
      left: w * 0.5,
      top: h * 0.34,
      originX: "center",
      originY: "center",
      fontFamily: "DM Sans",
      fontSize: Math.min(36, w / 22),
      fill: "#0f172a",
      fontWeight: "600",
    });
    const t2 = new fabric.IText("\uc11c\ube0c \ub77c\uc778 \xb7 \uc0c1\ud488\uba85 \uad50\uccb4", {
      left: w * 0.5,
      top: h * 0.52,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(22, w / 34),
      fill: "#64748b",
    });
    canvas.add(bg, line, t1, t2);
  }

  function tplNeon() {
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const bg = new fabric.Rect({ left: 0, top: 0, width: w, height: h, fill: "#020617" });
    const t1 = new fabric.IText("NIGHT", {
      left: w * 0.5,
      top: h * 0.4,
      originX: "center",
      originY: "center",
      fontFamily: "Do Hyeon",
      fontSize: Math.min(96, w / 10),
      fill: "#22d3ee",
      shadow: new fabric.Shadow({ color: "rgba(34,211,238,0.75)", blur: 36, offsetX: 0, offsetY: 0 }),
    });
    const t2 = new fabric.IText("\ucf58\uc11c\ud2b8 \xb7 \uacf5\uc5f0", {
      left: w * 0.5,
      top: h * 0.58,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(24, w / 32),
      fill: "#94a3b8",
    });
    canvas.add(bg, t1, t2);
  }

  function tplMagazine() {
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const bg = new fabric.Rect({ left: 0, top: 0, width: w, height: h, fill: "#fef2f2" });
    const block = new fabric.Rect({ left: w * 0.55, top: 0, width: w * 0.45, height: h, fill: "#fecdd3" });
    const t1 = new fabric.IText("COVER\nSTORY", {
      left: w * 0.12,
      top: h * 0.28,
      originX: "left",
      originY: "center",
      fontFamily: "Black Han Sans",
      fontSize: Math.min(52, w / 14),
      fill: "#9f1239",
      lineHeight: 0.95,
    });
    const t2 = new fabric.IText("2026 SPRING", {
      left: w * 0.12,
      top: h * 0.72,
      originX: "left",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(18, w / 42),
      fill: "#be123c",
    });
    canvas.add(bg, block, t1, t2);
  }

  function tplBanner() {
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const grad = new fabric.Gradient({
      type: "linear",
      gradientUnits: "percentage",
      coords: { x1: 0, y1: 0.5, x2: 1, y2: 0.5 },
      colorStops: [
        { offset: 0, color: "#0ea5e9" },
        { offset: 1, color: "#6366f1" },
      ],
    });
    const bg = new fabric.Rect({ left: 0, top: 0, width: w, height: h, fill: grad });
    const t1 = new fabric.IText("\ud5e4\ub4dc\ub77c\uc778\uc744 \uc5ec\uae30\uc5d0", {
      left: w * 0.5,
      top: h * 0.48,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(48, w / 20),
      fill: "#ffffff",
      fontWeight: "800",
    });
    canvas.add(bg, t1);
  }

  function tplInvite() {
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const bg = new fabric.Rect({ left: 0, top: 0, width: w, height: h, fill: "#fffbeb" });
    const ring = new fabric.Circle({
      radius: Math.min(w, h) * 0.22,
      fill: "transparent",
      stroke: "#d97706",
      strokeWidth: 3,
      left: w * 0.5,
      top: h * 0.3,
      originX: "center",
      originY: "center",
    });
    const t1 = new fabric.IText("You're Invited", {
      left: w * 0.5,
      top: h * 0.3,
      originX: "center",
      originY: "center",
      fontFamily: "Gowun Batang",
      fontSize: Math.min(36, w / 22),
      fill: "#92400e",
    });
    const t2 = new fabric.IText("\uc77c\uc2dc \xb7 \uc7a5\uc18c \xb7 \ubb38\uc758", {
      left: w * 0.5,
      top: h * 0.62,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(22, w / 34),
      fill: "#b45309",
    });
    canvas.add(bg, ring, t1, t2);
  }

  function tplTech() {
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const bg = new fabric.Rect({ left: 0, top: 0, width: w, height: h, fill: "#0f172a" });
    const grid = new fabric.Rect({
      left: w * 0.08,
      top: h * 0.18,
      width: w * 0.84,
      height: h * 0.5,
      fill: "transparent",
      stroke: "#334155",
      strokeWidth: 2,
      strokeDashArray: [10, 8],
      rx: 8,
      ry: 8,
    });
    const t1 = new fabric.IText("TECH TALK", {
      left: w * 0.5,
      top: h * 0.12,
      originX: "center",
      originY: "center",
      fontFamily: "DM Sans",
      fontSize: Math.min(40, w / 22),
      fill: "#38bdf8",
      fontWeight: "700",
    });
    const t2 = new fabric.IText("\ubc1c\ud45c\uc790 \xb7 \uc77c\uc2dc \xb7 \ub9c1\ud06c", {
      left: w * 0.5,
      top: h * 0.78,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(22, w / 34),
      fill: "#94a3b8",
    });
    canvas.add(bg, grid, t1, t2);
  }

  function tplBeauty() {
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const grad = new fabric.Gradient({
      type: "linear",
      gradientUnits: "percentage",
      coords: { x1: 0, y1: 0, x2: 1, y2: 1 },
      colorStops: [
        { offset: 0, color: "#fdf2f8" },
        { offset: 1, color: "#e9d5ff" },
      ],
    });
    const bg = new fabric.Rect({ left: 0, top: 0, width: w, height: h, fill: grad });
    const t1 = new fabric.IText("BEAUTY", {
      left: w * 0.5,
      top: h * 0.38,
      originX: "center",
      originY: "center",
      fontFamily: "Sunflower",
      fontSize: Math.min(64, w / 14),
      fill: "#86198f",
    });
    const t2 = new fabric.IText("\uc2e0\uc81c\ud488 \xb7 \ub9ac\ub274\uc5bc \xb7 \ud504\ub85c\ubaa8\uc158", {
      left: w * 0.5,
      top: h * 0.55,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(24, w / 32),
      fill: "#7e22ce",
    });
    canvas.add(bg, t1, t2);
  }

  function tplFood() {
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const bg = new fabric.Rect({ left: 0, top: 0, width: w, height: h, fill: "#fff7ed" });
    const badge = new fabric.Circle({
      radius: Math.min(w, h) * 0.12,
      fill: "#f97316",
      left: w * 0.82,
      top: h * 0.18,
      originX: "center",
      originY: "center",
    });
    const t1 = new fabric.IText("\uc624\ub298\uc758 \uba54\ub274", {
      left: w * 0.5,
      top: h * 0.28,
      originX: "center",
      originY: "center",
      fontFamily: "Jua",
      fontSize: Math.min(48, w / 18),
      fill: "#9a3412",
    });
    const t2 = new fabric.IText("\ub9db\uc788\ub294 \ud55c \uc904 \uc18c\uac1c", {
      left: w * 0.5,
      top: h * 0.48,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(26, w / 30),
      fill: "#c2410c",
    });
    canvas.add(bg, badge, t1, t2);
  }

  function tplSeason() {
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const bg = new fabric.Rect({ left: 0, top: 0, width: w, height: h, fill: "#ecfccb" });
    const t1 = new fabric.IText("\uc2dc\uc98c \ud55c\uc815", {
      left: w * 0.5,
      top: h * 0.36,
      originX: "center",
      originY: "center",
      fontFamily: "Black Han Sans",
      fontSize: Math.min(72, w / 12),
      fill: "#365314",
    });
    const t2 = new fabric.IText("\uc2e0\uc120\ud55c \uc2dc\uc98c \uba54\uc2dc\uc9c0", {
      left: w * 0.5,
      top: h * 0.56,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: Math.min(26, w / 30),
      fill: "#4d7c0f",
    });
    canvas.add(bg, t1, t2);
  }

  const TEMPLATES = [
    { id: "brand", name: "\ube0c\ub79c\ub4dc \uce74\ub4dc", desc: "\ud558\ub2e8 \ubc14 + \uc81c\ubaa9", fn: tplBrand },
    { id: "promo", name: "\ud504\ub85c\ubaa8\uc158", desc: "\uadf8\ub77c\ub370\uc774\uc158", fn: tplPromo },
    { id: "sale", name: "\uc138\uc77c \ud3ec\uc2a4\ud130", desc: "\uac15\ud55c \ub808\ub4dc", fn: tplSale },
    { id: "quote", name: "\uba85\uc5b8 \uce74\ub4dc", desc: "\ub2e4\ud06c + \uc778\uc6a9", fn: tplQuote },
    { id: "cafe", name: "\uce74\ud398 \uba54\ub274", desc: "\uc2a4\ud2b0\ud2b8 + \ud0c0\uc774\ud3ec", fn: tplCafe },
    { id: "youtube", name: "\uc720\ud29c\ube0c \uc378\ub124\uc77c", desc: "\ub2e4\ud06c \ud558\ub2e8 \ubc14", fn: tplYoutube },
    { id: "minimal", name: "\ubbf8\ub2c8\uba40 \uc0c1\ud488", desc: "\ud654\uc774\ud2b8 + \ub77c\uc778", fn: tplMinimal },
    { id: "neon", name: "\ub124\uc628 \ub098\uc774\ud2b8", desc: "\ub2e4\ud06c + \uae00\ub85c\uc6b0", fn: tplNeon },
    { id: "magazine", name: "\ub9e4\uac70\uc9c4 \ucee4\ubc84", desc: "\ud551\ud06c \ube14\ub85d", fn: tplMagazine },
    { id: "banner", name: "\uc6f9 \ubc30\ub108", desc: "\ube14\ub8e8 \uadf8\ub77c\ub370\uc774\uc158", fn: tplBanner },
    { id: "invite", name: "\ucd08\ub300\uc7a5", desc: "\uc6d0 + \ud14d\uc2a4\ud2b8", fn: tplInvite },
    { id: "tech", name: "\ud14c\ud06c \uc138\ubbf8\ub098", desc: "\uadf8\ub9ac\ub4dc \ud504\ub808\uc784", fn: tplTech },
    { id: "beauty", name: "\ubdf0\ud2f0 \uc18c\uc2dd", desc: "\ud30c\uc2a4\ud154 \uadf8\ub77c\ub370\uc774\uc158", fn: tplBeauty },
    { id: "food", name: "\ud478\ub4dc SNS", desc: "\uc624\ub80c\uc9c0 \ud3ec\uc778\ud2b8", fn: tplFood },
    { id: "season", name: "\uc2dc\uc98c \ud55c\uc815", desc: "\ub77c\uc784 + \ud14d\uc2a4\ud2b8", fn: tplSeason },
  ];

