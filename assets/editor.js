(function () {
  "use strict";

  const THEME_KEY = "canvaskit_theme";
  const WORK_KEY = "canvaskit_my_work_v1";
  const WORK_FOLDER_KEY = "canvaskit_my_work_folders_v1";
  const MY_FILE_KEY = "joons_my_files_v1";
  const MY_FILE_FOLDER_KEY = "joons_my_file_folders_v1";
  const CLOUD_CFG_KEY = "joons_cloud_cfg_v1";
  const DEFAULT_FOLDER_ID = "folder-all";
  const EMPTY_THUMB =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360"><rect width="360" height="360" fill="#f8fafc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#94a3b8" font-size="20" font-family="sans-serif">미리보기 준비 중</text></svg>'
    );
  const ICON_FALLBACK = [
    "mdi:car",
    "mdi:car-sports",
    "mdi:bus",
    "mdi:train",
    "mdi:subway",
    "mdi:airplane",
    "mdi:helicopter",
    "mdi:ferry",
    "mdi:truck-fast",
    "mdi:motorbike",
    "mdi:bicycle",
    "mdi:rocket-launch",
    "mdi:map-marker",
    "mdi:camera",
    "mdi:food",
    "mdi:home-city",
    "mdi:arrow-up-bold",
    "mdi:arrow-down-bold",
    "mdi:arrow-left-bold",
    "mdi:arrow-right-bold",
    "mdi:arrow-top-right-bold-box",
    "mdi:arrow-bottom-left-bold-box",
    "mdi:arrow-decision",
    "mdi:arrow-u-left-top-bold",
    "mdi:arrow-u-right-top-bold",
    "mdi:navigation-variant",
    "mdi:compass",
    "mdi:directions",
    "mdi:circle-outline",
    "mdi:circle-slice-8",
    "mdi:square-outline",
    "mdi:square-rounded-outline",
    "mdi:triangle-outline",
    "mdi:triangle",
    "mdi:shape-outline",
    "mdi:shape-plus",
  ];
  const ICON_COLOR_POOL = [
    "twemoji:automobile",
    "twemoji:airplane",
    "twemoji:bus",
    "twemoji:tram",
    "twemoji:ship",
    "twemoji:rocket",
    "twemoji:camera",
    "twemoji:house",
    "twemoji:world-map",
    "twemoji:airplane-departure",
    "twemoji:taxi",
    "twemoji:delivery-truck",
    "noto:automobile",
    "noto:airplane",
    "noto:station",
    "noto:world-map",
    "noto:camera",
    "noto:rocket",
    "fluent-emoji-flat:airplane",
    "fluent-emoji-flat:automobile",
    "fluent-emoji-flat:bus",
    "fluent-emoji-flat:taxi",
    "fluent-emoji-flat:locomotive",
    "fluent-emoji-flat:delivery-truck",
    "fluent-emoji-flat:helicopter",
    "fluent-emoji-flat:camera",
    "fluent-emoji-flat:map",
    "fluent-emoji-flat:house",
    "fluent-emoji-flat:satellite",
    "fluent-emoji-flat:red-triangle-pointed-up",
    "fluent-emoji-flat:left-arrow",
    "fluent-emoji-flat:right-arrow",
    "fluent-emoji-flat:up-arrow",
    "fluent-emoji-flat:down-arrow",
    "twemoji:right-arrow",
    "twemoji:left-arrow",
    "twemoji:up-arrow",
    "twemoji:down-arrow",
    "twemoji:right-arrow-curving-up",
    "twemoji:right-arrow-curving-down",
    "twemoji:left-right-arrow",
    "twemoji:up-down-arrow",
    "noto:right-arrow",
    "noto:left-arrow",
    "noto:up-arrow",
    "noto:down-arrow",
    "noto:twisted-rightwards-arrows",
    "fluent-emoji-flat:blue-circle",
    "fluent-emoji-flat:red-circle",
    "fluent-emoji-flat:yellow-circle",
    "fluent-emoji-flat:orange-square",
    "fluent-emoji-flat:blue-square",
    "fluent-emoji-flat:red-square",
    "fluent-emoji-flat:red-triangle-pointed-up",
    "twemoji:red-circle",
    "twemoji:blue-circle",
    "twemoji:yellow-circle",
    "twemoji:red-square",
    "twemoji:blue-square",
    "twemoji:orange-square",
    "twemoji:red-triangle-pointed-up",
    "noto:large-red-circle",
    "noto:large-blue-circle",
    "noto:large-orange-diamond",
    "noto:large-red-square",
    "noto:large-blue-square",
    "noto:up-pointing-red-triangle",
  ];
  const ICON_KR_QUERY_MAP = {
    자동차: ["car", "automobile", "vehicle", "taxi", "truck"],
    차량: ["car", "vehicle", "truck", "sedan"],
    비행기: ["airplane", "plane", "flight", "airport"],
    항공: ["airplane", "flight", "airport", "aviation"],
    버스: ["bus", "coach", "transit"],
    기차: ["train", "rail", "subway", "tram"],
    지하철: ["subway", "metro", "train"],
    오토바이: ["motorcycle", "scooter", "bike"],
    자전거: ["bicycle", "bike"],
    배: ["ship", "boat", "ferry"],
    선박: ["ship", "ferry", "boat"],
    지도: ["map", "location", "navigation", "marker"],
    카메라: ["camera", "photo", "image"],
    음식: ["food", "restaurant", "meal"],
    집: ["home", "house", "building"],
    건물: ["building", "office", "apartment"],
    병원: ["hospital", "medical", "clinic"],
    학교: ["school", "education", "graduation"],
    축구: ["football", "soccer", "sport"],
    농구: ["basketball", "sport"],
    음악: ["music", "audio", "note"],
    쇼핑: ["shopping", "cart", "store", "bag"],
    날씨: ["weather", "sun", "cloud", "rain"],
    동물: ["animal", "pet", "cat", "dog"],
    화살표: ["arrow", "direction", "right arrow", "left arrow", "up arrow", "down arrow", "navigate"],
    방향: ["arrow", "direction", "navigation", "compass"],
    아이콘: ["icon", "symbol", "emoji", "pictogram"],
    원: ["circle", "round", "dot", "disc", "ellipse"],
    동그라미: ["circle", "round", "dot", "disc"],
    사각형: ["square", "rectangle", "box", "tile"],
    네모: ["square", "rectangle", "box"],
    삼각형: ["triangle", "delta", "polygon"],
    도형: ["shape", "circle", "square", "triangle", "polygon"],
  };

  let canvas;
  let logicalW = 1080;
  let logicalH = 1080;
  let displayScale = 1;
  let currentTool = "select";
  let lastPresetId = "ig";
  let currentWorkId = null;
  let currentFolderId = DEFAULT_FOLDER_ID;
  let browserFolderId = DEFAULT_FOLDER_ID;
  let myFileFolderId = DEFAULT_FOLDER_ID;
  let cloudClient = null;
  let cloudUser = null;
  let slides = [];
  let currentSlideIndex = 0;
  const thumbGenerating = new Set();
  let slideThumbTimer = null;
  let restoring = false;
  const history = [];
  let historyStep = -1;
  const MAX_HISTORY = 35;
  let historyTimer = null;

  const PRESETS = [
    { id: "ig", w: 1080, h: 1080, label: "인스타 · 정사각 1080" },
    { id: "story", w: 1080, h: 1920, label: "스토리 · 1080×1920" },
    { id: "hd", w: 1920, h: 1080, label: "와이드 · 1920×1080" },
    { id: "thumb", w: 1200, h: 630, label: "링크 썸네일 1200×630" },
    { id: "a4", w: 794, h: 1123, label: "A4 세로 (웹용)" },
    { id: "pin", w: 1000, h: 1500, label: "핀터레스트 · 1000×1500" },
  ];

  const FONTS = [
    { v: "Noto Sans KR", l: "Noto Sans KR" },
    { v: "Noto Serif KR", l: "Noto Serif KR" },
    { v: "IBM Plex Sans KR", l: "IBM Plex Sans KR" },
    { v: "DM Sans", l: "DM Sans" },
    { v: "Inter", l: "Inter" },
    { v: "Poppins", l: "Poppins" },
    { v: "Montserrat", l: "Montserrat" },
    { v: "Lato", l: "Lato" },
    { v: "Nunito", l: "Nunito" },
    { v: "Rubik", l: "Rubik" },
    { v: "Fira Sans", l: "Fira Sans" },
    { v: "Roboto Slab", l: "Roboto Slab" },
    { v: "Playfair Display", l: "Playfair Display" },
    { v: "Merriweather", l: "Merriweather" },
    { v: "Oswald", l: "Oswald" },
    { v: "Bebas Neue", l: "Bebas Neue" },
    { v: "Anton", l: "Anton" },
    { v: "Abril Fatface", l: "Abril Fatface" },
    { v: "Pacifico", l: "Pacifico" },
    { v: "Caveat", l: "Caveat" },
    { v: "Bangers", l: "Bangers" },
    { v: "Black Han Sans", l: "Black Han Sans" },
    { v: "Do Hyeon", l: "Do Hyeon" },
    { v: "Jua", l: "Jua" },
    { v: "Nanum Gothic", l: "Nanum Gothic" },
    { v: "Nanum Myeongjo", l: "Nanum Myeongjo" },
    { v: "Nanum Pen Script", l: "Nanum Pen Script" },
    { v: "Gowun Batang", l: "Gowun Batang" },
    { v: "Sunflower", l: "Sunflower" },
    { v: "Hahmlet", l: "Hahmlet" },
    { v: "Gaegu", l: "Gaegu" },
    { v: "Hi Melody", l: "Hi Melody" },
    { v: "Poor Story", l: "Poor Story" },
    { v: "Gamja Flower", l: "Gamja Flower" },
    { v: "Gugi", l: "Gugi" },
    { v: "Single Day", l: "Single Day" },
    { v: "Dongle", l: "Dongle" },
    { v: "Black And White Picture", l: "Black And White Picture" },
    { v: "Georgia, serif", l: "Georgia" },
    { v: "Impact, sans-serif", l: "Impact" },
    { v: "Times New Roman, serif", l: "Times New Roman" },
    { v: "Trebuchet MS, sans-serif", l: "Trebuchet MS" },
    { v: "Arial, sans-serif", l: "Arial" },
    { v: "Verdana, sans-serif", l: "Verdana" },
    { v: "Tahoma, sans-serif", l: "Tahoma" },
    { v: "Courier New, monospace", l: "Courier New" },
    { v: "ui-monospace, monospace", l: "고정폭" },
  ];

  function toast(msg) {
    const el = document.getElementById("toast");
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      el.hidden = true;
    }, 2200);
  }

  function getWorks() {
    try {
      const raw = localStorage.getItem(WORK_KEY);
      const a = raw ? JSON.parse(raw) : [];
      return Array.isArray(a) ? a : [];
    } catch {
      return [];
    }
  }

  function setWorks(arr) {
    localStorage.setItem(WORK_KEY, JSON.stringify(arr));
  }

  function getMyFileFolders() {
    try {
      const raw = localStorage.getItem(MY_FILE_FOLDER_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      const list = Array.isArray(arr) ? arr : [];
      if (!list.some((x) => x && x.id === DEFAULT_FOLDER_ID)) {
        list.unshift({ id: DEFAULT_FOLDER_ID, name: "전체" });
      }
      return list
        .filter((x) => x && x.id && x.name)
        .map((x) => ({ id: String(x.id), name: String(x.name) }));
    } catch {
      return [{ id: DEFAULT_FOLDER_ID, name: "전체" }];
    }
  }

  function setMyFileFolders(arr) {
    localStorage.setItem(MY_FILE_FOLDER_KEY, JSON.stringify(arr));
  }

  function getMyFiles() {
    try {
      const raw = localStorage.getItem(MY_FILE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  function setMyFiles(arr) {
    localStorage.setItem(MY_FILE_KEY, JSON.stringify(arr));
  }

  function renderMyFileFolders() {
    const root = document.getElementById("my-folder-row");
    if (!root) return;
    const folders = getMyFileFolders();
    if (!folders.some((f) => f.id === myFileFolderId)) myFileFolderId = DEFAULT_FOLDER_ID;
    root.innerHTML = "";
    folders.forEach((f) => {
      const count = f.id === DEFAULT_FOLDER_ID
        ? getMyFiles().length
        : getMyFiles().filter((x) => x.folderId === f.id).length;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "my-folder-btn" + (myFileFolderId === f.id ? " active" : "");
      b.textContent = `${f.name} ${count}`;
      b.addEventListener("click", () => {
        myFileFolderId = f.id;
        renderMyFileFolders();
        renderMyFiles();
      });
      root.appendChild(b);
    });
  }

  function addMyFileToCanvas(src) {
    if (!src) return;
    fabric.Image.fromURL(src, (img) => {
      if (!img) return;
      const maxW = Math.min(logicalW * 0.7, 680);
      if (img.width > maxW) img.scaleToWidth(maxW);
      img.set({
        left: logicalW / 2,
        top: logicalH / 2,
        originX: "center",
        originY: "center",
      });
      finalizeAdd(img);
      setTool("select");
    });
  }

  function renderMyFiles() {
    const root = document.getElementById("my-file-grid");
    if (!root) return;
    root.innerHTML = "";
    const all = getMyFiles().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    const rows =
      myFileFolderId === DEFAULT_FOLDER_ID ? all : all.filter((x) => x.folderId === myFileFolderId);
    if (!rows.length) {
      root.innerHTML = `<div class="icon-status">업로드된 파일이 없습니다</div>`;
      return;
    }
    rows.slice(0, 240).forEach((f) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "my-file-item";
      card.innerHTML = `<img src="${f.dataUrl}" alt="${f.name || "file"}" loading="lazy" /><span>${f.name || "파일"}</span>`;
      card.addEventListener("click", () => addMyFileToCanvas(f.dataUrl));
      root.appendChild(card);
    });
  }

  function createMyFileFolder() {
    const raw = prompt("새 폴더 이름");
    if (raw == null) return;
    const name = raw.trim();
    if (!name) {
      toast("폴더 이름을 입력해주세요");
      return;
    }
    const folders = getMyFileFolders();
    if (folders.some((f) => f.name === name)) {
      toast("같은 폴더 이름이 이미 있습니다");
      return;
    }
    const id = "myf-" + Date.now() + "-" + Math.random().toString(16).slice(2, 6);
    folders.push({ id, name });
    setMyFileFolders(folders);
    myFileFolderId = id;
    renderMyFileFolders();
    renderMyFiles();
    toast("새 폴더를 만들었습니다");
  }

  function handleMyFileUpload(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    const current = getMyFiles();
    let pending = files.length;
    files.forEach((file) => {
      if (!file.type || !file.type.startsWith("image/")) {
        pending--;
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        current.push({
          id:
            typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : "mf-" + Date.now() + "-" + Math.random().toString(16).slice(2),
          folderId: myFileFolderId || DEFAULT_FOLDER_ID,
          name: file.name || "image",
          dataUrl: String(reader.result || ""),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        pending--;
        if (pending <= 0) {
          setMyFiles(current);
          renderMyFileFolders();
          renderMyFiles();
          toast("내 파일에 업로드했습니다");
        }
      };
      reader.onerror = () => {
        pending--;
        if (pending <= 0) {
          setMyFiles(current);
          renderMyFileFolders();
          renderMyFiles();
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function initMyFilesPanel() {
    const up = document.getElementById("my-file-upload");
    const addFolderBtn = document.getElementById("my-file-new-folder");
    if (up) {
      up.addEventListener("change", (e) => {
        handleMyFileUpload(e.target.files);
        e.target.value = "";
      });
    }
    if (addFolderBtn) addFolderBtn.addEventListener("click", createMyFileFolder);
    renderMyFileFolders();
    renderMyFiles();
  }

  function getCloudCfg() {
    try {
      const raw = localStorage.getItem(CLOUD_CFG_KEY);
      const cfg = raw ? JSON.parse(raw) : {};
      return {
        url: cfg && cfg.url ? String(cfg.url) : "",
        anon: cfg && cfg.anon ? String(cfg.anon) : "",
      };
    } catch {
      return { url: "", anon: "" };
    }
  }

  function setCloudCfg(cfg) {
    localStorage.setItem(CLOUD_CFG_KEY, JSON.stringify({ url: cfg.url || "", anon: cfg.anon || "" }));
  }

  function setCloudStatus(msg) {
    const el = document.getElementById("cloud-status");
    if (el) el.textContent = msg;
  }

  function getCloudEmailPass() {
    return {
      email: (document.getElementById("cloud-email").value || "").trim(),
      password: document.getElementById("cloud-password").value || "",
    };
  }

  function getPayloadFromCurrentState() {
    const nameInput = document.getElementById("project-name");
    const folderSel = document.getElementById("project-folder");
    const selectedFolder =
      folderSel && folderSel.value ? folderSel.value : currentFolderId || DEFAULT_FOLDER_ID;
    const name =
      (nameInput.value || "").trim() ||
      "작업 " + new Date().toLocaleString("ko-KR", { dateStyle: "short", timeStyle: "short" });
    const id =
      currentWorkId ||
      (typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : "w-" + Date.now() + "-" + Math.random().toString(16).slice(2));
    return {
      id,
      name,
      updatedAt: Date.now(),
      presetId: lastPresetId,
      canvasW: logicalW,
      canvasH: logicalH,
      bg: document.getElementById("canvas-bg").value,
      folderId: selectedFolder,
      thumb: buildWorkThumbnail(),
      json: snapshotJson(),
      slides: slides.map((s) => Object.assign({}, s)),
      currentSlideIndex: currentSlideIndex,
    };
  }

  function mergeLocalWork(payload) {
    let list = getWorks();
    const idx = list.findIndex((x) => x.id === payload.id);
    if (idx >= 0) list[idx] = payload;
    else list.push(payload);
    setWorks(list);
    currentWorkId = payload.id;
    document.getElementById("project-name").value = payload.name || "";
    renderFolderSelect();
    renderWorkList();
    renderWorkBrowser();
  }

  function initCloudClient() {
    const cfg = getCloudCfg();
    if (!cfg.url || !cfg.anon || !window.supabase || !window.supabase.createClient) return null;
    cloudClient = window.supabase.createClient(cfg.url, cfg.anon);
    return cloudClient;
  }

  async function refreshCloudSession() {
    if (!cloudClient) return;
    try {
      const { data } = await cloudClient.auth.getSession();
      cloudUser = data && data.session ? data.session.user : null;
      setCloudStatus(cloudUser ? `로그인됨: ${cloudUser.email || cloudUser.id}` : "클라우드 연결됨 (로그인 필요)");
    } catch {
      setCloudStatus("클라우드 세션 확인 실패");
    }
  }

  async function connectCloud() {
    const url = (document.getElementById("cloud-url").value || "").trim();
    const anon = (document.getElementById("cloud-anon").value || "").trim();
    if (!url || !anon) {
      toast("Supabase URL/Key를 입력해주세요");
      return;
    }
    setCloudCfg({ url, anon });
    initCloudClient();
    if (!cloudClient) {
      toast("Supabase 클라이언트 초기화 실패");
      return;
    }
    await refreshCloudSession();
    toast("클라우드 연결 설정을 저장했습니다");
  }

  async function cloudSignUp() {
    if (!cloudClient) {
      toast("먼저 클라우드 연결을 해주세요");
      return;
    }
    const { email, password } = getCloudEmailPass();
    if (!email || !password) {
      toast("이메일/비밀번호를 입력해주세요");
      return;
    }
    const { error } = await cloudClient.auth.signUp({ email, password });
    if (error) {
      const msg = String(error.message || "").toLowerCase();
      if (msg.includes("rate limit")) {
        const loginTry = await cloudClient.auth.signInWithPassword({ email, password });
        if (!loginTry.error) {
          await refreshCloudSession();
          toast("가입 제한으로 로그인으로 전환했습니다");
          return;
        }
        toast("가입 요청 제한 상태입니다. 잠시 후 다시 시도하거나 로그인 버튼을 눌러보세요");
        return;
      }
      toast("회원가입 실패: " + error.message);
      return;
    }
    await refreshCloudSession();
    toast("회원가입 요청 완료 (이메일 인증 필요할 수 있음)");
  }

  async function cloudLogin() {
    if (!cloudClient) {
      toast("먼저 클라우드 연결을 해주세요");
      return;
    }
    const { email, password } = getCloudEmailPass();
    if (!email || !password) {
      toast("이메일/비밀번호를 입력해주세요");
      return;
    }
    const { error } = await cloudClient.auth.signInWithPassword({ email, password });
    if (error) {
      toast("로그인 실패: " + error.message);
      return;
    }
    await refreshCloudSession();
    toast("로그인했습니다");
  }

  async function cloudLogout() {
    if (!cloudClient) return;
    await cloudClient.auth.signOut();
    cloudUser = null;
    setCloudStatus("클라우드 연결됨 (로그인 필요)");
    toast("로그아웃했습니다");
  }

  async function cloudSavePayload(payload, silent) {
    if (!cloudClient || !cloudUser) {
      if (!silent) toast("클라우드 로그인 후 저장 가능합니다");
      return;
    }
    const row = {
      user_id: cloudUser.id,
      project_id: payload.id,
      name: payload.name,
      folder_id: payload.folderId || DEFAULT_FOLDER_ID,
      payload_json: payload,
      updated_at: new Date().toISOString(),
    };
    const { error: selErr, data: found } = await cloudClient
      .from("joons_projects")
      .select("id")
      .eq("user_id", cloudUser.id)
      .eq("project_id", payload.id)
      .limit(1);
    if (selErr) {
      if (!silent) toast("클라우드 저장 실패: 테이블/권한 설정 확인");
      return;
    }
    let err = null;
    if (found && found.length) {
      const { error } = await cloudClient.from("joons_projects").update(row).eq("id", found[0].id);
      err = error;
    } else {
      const { error } = await cloudClient.from("joons_projects").insert(row);
      err = error;
    }
    if (err) {
      if (!silent) toast("클라우드 저장 실패: " + err.message);
      return;
    }
    if (!silent) toast("클라우드에 저장했습니다");
  }

  async function cloudSaveMyFiles(silent) {
    if (!cloudClient || !cloudUser) {
      if (!silent) toast("클라우드 로그인 후 파일 동기화 가능합니다");
      return;
    }
    const folders = getMyFileFolders();
    const files = getMyFiles();
    const folderRows = folders.map((f) => ({
      user_id: cloudUser.id,
      folder_id: f.id,
      name: f.name,
      updated_at: new Date().toISOString(),
    }));
    const assetRows = files.map((x) => ({
      user_id: cloudUser.id,
      asset_id: x.id,
      folder_id: x.folderId || DEFAULT_FOLDER_ID,
      name: x.name || "image",
      data_url: x.dataUrl || "",
      created_at: new Date(x.createdAt || Date.now()).toISOString(),
      updated_at: new Date(x.updatedAt || x.createdAt || Date.now()).toISOString(),
    }));

    if (folderRows.length) {
      const { error } = await cloudClient
        .from("joons_asset_folders")
        .upsert(folderRows, { onConflict: "user_id,folder_id" });
      if (error) {
        if (!silent) toast("파일 폴더 동기화 실패: " + error.message);
        return;
      }
    }
    if (assetRows.length) {
      const { error } = await cloudClient
        .from("joons_assets")
        .upsert(assetRows, { onConflict: "user_id,asset_id" });
      if (error) {
        if (!silent) toast("업로드 파일 동기화 실패: " + error.message);
        return;
      }
    }
    if (!silent) toast("내 파일을 클라우드에 동기화했습니다");
  }

  async function cloudPullMyFiles(silent) {
    if (!cloudClient || !cloudUser) {
      if (!silent) toast("클라우드 로그인 후 파일 불러오기 가능합니다");
      return;
    }
    const [folderRes, assetRes] = await Promise.all([
      cloudClient
        .from("joons_asset_folders")
        .select("folder_id,name,updated_at")
        .eq("user_id", cloudUser.id)
        .order("updated_at", { ascending: false })
        .limit(500),
      cloudClient
        .from("joons_assets")
        .select("asset_id,folder_id,name,data_url,created_at,updated_at")
        .eq("user_id", cloudUser.id)
        .order("updated_at", { ascending: false })
        .limit(2000),
    ]);
    if (folderRes.error) {
      if (!silent) toast("클라우드 폴더 불러오기 실패: " + folderRes.error.message);
      return;
    }
    if (assetRes.error) {
      if (!silent) toast("클라우드 파일 불러오기 실패: " + assetRes.error.message);
      return;
    }

    const localFolders = getMyFileFolders();
    const folderMap = new Map(localFolders.map((f) => [f.id, f]));
    (folderRes.data || []).forEach((f) => {
      if (!f || !f.folder_id) return;
      folderMap.set(String(f.folder_id), {
        id: String(f.folder_id),
        name: String(f.name || "폴더"),
      });
    });
    if (!folderMap.has(DEFAULT_FOLDER_ID)) {
      folderMap.set(DEFAULT_FOLDER_ID, { id: DEFAULT_FOLDER_ID, name: "전체" });
    }
    setMyFileFolders(Array.from(folderMap.values()));

    const localFiles = getMyFiles();
    const fileMap = new Map(localFiles.map((f) => [f.id, f]));
    (assetRes.data || []).forEach((x) => {
      if (!x || !x.asset_id || !x.data_url) return;
      fileMap.set(String(x.asset_id), {
        id: String(x.asset_id),
        folderId: String(x.folder_id || DEFAULT_FOLDER_ID),
        name: String(x.name || "image"),
        dataUrl: String(x.data_url),
        createdAt: x.created_at ? Date.parse(x.created_at) : Date.now(),
        updatedAt: x.updated_at ? Date.parse(x.updated_at) : Date.now(),
      });
    });
    setMyFiles(Array.from(fileMap.values()));
    renderMyFileFolders();
    renderMyFiles();
    if (!silent) toast(`클라우드 파일 ${(assetRes.data || []).length}개를 반영했습니다`);
  }

  async function cloudSaveCurrent() {
    syncCurrentSlideState();
    const payload = getPayloadFromCurrentState();
    mergeLocalWork(payload);
    await cloudSavePayload(payload, false);
    await cloudSaveMyFiles(true);
  }

  async function cloudPullAll() {
    if (!cloudClient || !cloudUser) {
      toast("클라우드 로그인 후 불러올 수 있습니다");
      return;
    }
    const { data, error } = await cloudClient
      .from("joons_projects")
      .select("payload_json, updated_at")
      .eq("user_id", cloudUser.id)
      .order("updated_at", { ascending: false })
      .limit(500);
    if (error) {
      toast("클라우드 불러오기 실패: " + error.message);
      return;
    }
    const list = getWorks();
    const byId = new Map(list.map((x) => [x.id, x]));
    (data || []).forEach((row) => {
      const p = row && row.payload_json ? row.payload_json : null;
      if (!p || !p.id) return;
      byId.set(p.id, p);
    });
    setWorks(Array.from(byId.values()));
    renderWorkList();
    renderWorkBrowser();
    toast(`클라우드에서 ${(data || []).length}개 작업을 반영했습니다`);
    await cloudPullMyFiles(true);
  }

  function getFolders() {
    try {
      const raw = localStorage.getItem(WORK_FOLDER_KEY);
      const a = raw ? JSON.parse(raw) : [];
      const list = Array.isArray(a) ? a : [];
      if (!list.some((x) => x && x.id === DEFAULT_FOLDER_ID)) {
        list.unshift({ id: DEFAULT_FOLDER_ID, name: "전체" });
      }
      return list
        .filter((x) => x && x.id && x.name)
        .map((x) => ({ id: String(x.id), name: String(x.name) }));
    } catch {
      return [{ id: DEFAULT_FOLDER_ID, name: "전체" }];
    }
  }

  function setFolders(arr) {
    localStorage.setItem(WORK_FOLDER_KEY, JSON.stringify(arr));
  }

  function ensureFolders() {
    const existing = getFolders();
    if (existing.some((x) => x.id === DEFAULT_FOLDER_ID)) {
      return existing;
    }
    const next = [{ id: DEFAULT_FOLDER_ID, name: "전체" }, ...existing];
    setFolders(next);
    return next;
  }

  function getFilteredWorks(folderId) {
    const works = getWorks().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    if (!folderId || folderId === DEFAULT_FOLDER_ID) return works;
    return works.filter((w) => w.folderId === folderId);
  }

  function snapshotJsonOf(targetCanvas = canvas) {
    return JSON.stringify(
      targetCanvas.toJSON([
        "selectable",
        "evented",
        "editable",
        "backgroundColor",
        "gradientAngle",
        "gradientCoords",
        "gradientTransform",
        "gradientUnits",
        "rx",
        "ry",
        "clipPath",
        "strokeDashArray",
        "frameKind",
        "isPhotoFrame",
        "photoFrameType",
        "flipX",
        "flipY",
      ])
    );
  }

  function makeSlideFromCanvas() {
    return {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : "s-" + Date.now() + "-" + Math.random().toString(16).slice(2),
      canvasW: logicalW,
      canvasH: logicalH,
      bg: document.getElementById("canvas-bg").value,
      presetId: lastPresetId,
      json: snapshotJsonOf(canvas),
      thumb: "",
    };
  }

  function buildSlideThumbnailFromData(slide, onDone) {
    try {
      const sw = Math.max(200, slide.canvasW || 1080);
      const sh = Math.max(200, slide.canvasH || 1080);
      const scale = Math.min(1, 360 / sw);
      const sc = new fabric.StaticCanvas(null, {
        width: sw,
        height: sh,
        enableRetinaScaling: false,
        backgroundColor: slide.bg || "#ffffff",
      });
      sc.loadFromJSON(JSON.parse(slide.json || "{}"), () => {
        try {
          sc.renderAll();
          const url = sc.toDataURL({
            format: "jpeg",
            quality: 0.74,
            multiplier: scale,
            enableRetinaScaling: false,
          });
          sc.dispose();
          onDone(url);
        } catch {
          sc.dispose();
          onDone(EMPTY_THUMB);
        }
      });
    } catch {
      onDone(EMPTY_THUMB);
    }
  }

  function renderSlideList() {
    const root = document.getElementById("slide-list");
    if (!root) return;
    root.innerHTML = "";
    slides.forEach((s, idx) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "slide-item" + (idx === currentSlideIndex ? " active" : "");
      const thumb = s.thumb || EMPTY_THUMB;
      card.innerHTML = `
        <img class="slide-thumb" src="${thumb}" alt="슬라이드 ${idx + 1}" />
        <div class="slide-item-meta">
          <strong>${idx + 1}</strong>
          <span>${Math.round(s.canvasW || 0)} × ${Math.round(s.canvasH || 0)}</span>
        </div>`;
      card.addEventListener("click", () => {
        syncCurrentSlideState();
        loadSlideAt(idx);
      });
      root.appendChild(card);
    });
  }

  function queueCurrentSlideThumbRefresh() {
    clearTimeout(slideThumbTimer);
    slideThumbTimer = setTimeout(() => {
      const s = slides[currentSlideIndex];
      if (!s) return;
      const sid = s.id;
      buildSlideThumbnailFromData(s, (url) => {
        const i = slides.findIndex((x) => x.id === sid);
        if (i < 0) return;
        slides[i] = Object.assign({}, slides[i], { thumb: url || EMPTY_THUMB });
        renderSlideList();
      });
    }, 120);
  }

  function updateSlideUi() {
    const label = document.getElementById("slide-label");
    if (label) {
      label.textContent = `슬라이드 ${currentSlideIndex + 1} / ${Math.max(1, slides.length)}`;
    }
    const wInput = document.getElementById("slide-width");
    const hInput = document.getElementById("slide-height");
    if (wInput) wInput.value = String(Math.round(logicalW));
    if (hInput) hInput.value = String(Math.round(logicalH));
    const canDelete = slides.length > 1;
    const delBtn = document.getElementById("btn-slide-del");
    if (delBtn) delBtn.disabled = !canDelete;
    renderSlideList();
  }

  function syncCurrentSlideState() {
    if (!slides.length || !canvas) return;
    slides[currentSlideIndex] = Object.assign({}, slides[currentSlideIndex], {
      canvasW: logicalW,
      canvasH: logicalH,
      bg: document.getElementById("canvas-bg").value,
      presetId: lastPresetId,
      json: snapshotJsonOf(canvas),
      thumb: slides[currentSlideIndex].thumb || "",
    });
    queueCurrentSlideThumbRefresh();
  }

  function loadSlideAt(index) {
    if (index < 0 || index >= slides.length) return;
    const s = slides[index];
    restoring = true;
    currentSlideIndex = index;
    logicalW = s.canvasW || 1080;
    logicalH = s.canvasH || 1080;
    lastPresetId = s.presetId || matchPresetIdForSize(logicalW, logicalH);
    canvas.setWidth(logicalW);
    canvas.setHeight(logicalH);
    canvas.clear();
    canvas.backgroundColor = s.bg || "#ffffff";
    const sel = document.getElementById("preset-size");
    if (sel && PRESETS.some((p) => p.id === lastPresetId)) sel.value = lastPresetId;
    document.getElementById("canvas-bg").value = s.bg || "#ffffff";
    canvas.loadFromJSON(JSON.parse(s.json || "{}"), () => {
      restoring = false;
      canvas.renderAll();
      syncBgInput();
      resetHistoryFromCanvas();
      updateLayers();
      updateInspector();
      fitZoom();
      setTool("select");
      updateSlideUi();
      queueCurrentSlideThumbRefresh();
    });
  }

  function addSlide(blank) {
    syncCurrentSlideState();
    const base = blank
      ? {
          id:
            typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : "s-" + Date.now() + "-" + Math.random().toString(16).slice(2),
          canvasW: logicalW,
          canvasH: logicalH,
          bg: "#ffffff",
          presetId: lastPresetId,
          json: JSON.stringify({ objects: [], background: "#ffffff" }),
          thumb: "",
        }
      : Object.assign({}, slides[currentSlideIndex], {
          id:
            typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : "s-" + Date.now() + "-" + Math.random().toString(16).slice(2),
        });
    slides.splice(currentSlideIndex + 1, 0, base);
    loadSlideAt(currentSlideIndex + 1);
    queueCurrentSlideThumbRefresh();
  }

  function deleteSlide() {
    if (slides.length <= 1) {
      toast("슬라이드는 최소 1개 필요합니다");
      return;
    }
    slides.splice(currentSlideIndex, 1);
    if (currentSlideIndex >= slides.length) currentSlideIndex = slides.length - 1;
    loadSlideAt(currentSlideIndex);
    queueCurrentSlideThumbRefresh();
    toast("슬라이드를 지웠습니다");
  }

  function moveSlideOrder(dir) {
    syncCurrentSlideState();
    const next = currentSlideIndex + dir;
    if (next < 0 || next >= slides.length) return;
    const tmp = slides[currentSlideIndex];
    slides[currentSlideIndex] = slides[next];
    slides[next] = tmp;
    currentSlideIndex = next;
    updateSlideUi();
    renderSlideList();
    toast(dir < 0 ? "이전 순서로 이동했습니다" : "다음 순서로 이동했습니다");
  }

  function applyCustomSlideSize() {
    const w = parseInt(document.getElementById("slide-width").value, 10);
    const h = parseInt(document.getElementById("slide-height").value, 10);
    if (!Number.isFinite(w) || !Number.isFinite(h) || w < 64 || h < 64) {
      toast("너비/높이를 64 이상으로 입력하세요");
      return;
    }
    logicalW = w;
    logicalH = h;
    canvas.setWidth(w);
    canvas.setHeight(h);
    canvas.requestRenderAll();
    fitZoom();
    flushHistory();
    syncCurrentSlideState();
    updateSlideUi();
    queueCurrentSlideThumbRefresh();
    toast("슬라이드 크기를 변경했습니다");
  }

  function matchPresetIdForSize(w, h) {
    const p = PRESETS.find((x) => x.w === w && x.h === h);
    return p ? p.id : lastPresetId;
  }

  function renderWorkList() {
    const ul = document.getElementById("work-list");
    if (!ul) return;
    ul.innerHTML = "";
    const works = getFilteredWorks(currentFolderId).slice(0, 8);
    works.forEach((w) => {
      const li = document.createElement("li");
      li.className = "work-item";
      const dt = new Date(w.updatedAt || Date.now());
      const dateStr = dt.toLocaleString("ko-KR", { dateStyle: "short", timeStyle: "short" });
      const meta = document.createElement("div");
      meta.className = "work-meta";
      const nameSpan = document.createElement("span");
      nameSpan.className = "work-name";
      nameSpan.textContent = w.name || "작업";
      const dateSpan = document.createElement("span");
      dateSpan.className = "work-date";
      dateSpan.textContent = dateStr;
      meta.appendChild(nameSpan);
      meta.appendChild(dateSpan);
      const loadBtn = document.createElement("button");
      loadBtn.type = "button";
      loadBtn.className = "btn-icon-sm";
      loadBtn.title = "불러오기";
      loadBtn.textContent = "↓";
      loadBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        loadWorkEntry(w.id);
      });
      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "btn-icon-sm danger";
      delBtn.title = "삭제";
      delBtn.textContent = "✕";
      delBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteWorkById(w.id);
      });
      li.appendChild(meta);
      li.appendChild(loadBtn);
      li.appendChild(delBtn);
      ul.appendChild(li);
    });
  }

  function renderFolderSelect() {
    const sel = document.getElementById("project-folder");
    if (!sel) return;
    const folders = ensureFolders();
    sel.innerHTML = "";
    folders.forEach((f) => {
      const o = document.createElement("option");
      o.value = f.id;
      o.textContent = f.name;
      sel.appendChild(o);
    });
    if (!folders.some((f) => f.id === currentFolderId)) {
      currentFolderId = DEFAULT_FOLDER_ID;
    }
    sel.value = currentFolderId;
  }

  function renderWorkBrowser() {
    const row = document.getElementById("work-folder-row");
    const grid = document.getElementById("work-grid");
    const countPill = document.getElementById("work-count-pill");
    if (!row || !grid || !countPill) return;

    const folders = ensureFolders();
    const works = getWorks().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    if (!folders.some((f) => f.id === browserFolderId)) {
      browserFolderId = DEFAULT_FOLDER_ID;
    }

    countPill.textContent = String(works.length);
    row.innerHTML = "";
    folders.forEach((f) => {
      const count = f.id === DEFAULT_FOLDER_ID
        ? works.length
        : works.filter((w) => w.folderId === f.id).length;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "work-folder-chip" + (browserFolderId === f.id ? " active" : "");
      btn.innerHTML = `<span>${f.name}</span><span class="mini-count">${count}</span>`;
      btn.addEventListener("click", () => {
        browserFolderId = f.id;
        renderWorkBrowser();
      });
      if (f.id !== DEFAULT_FOLDER_ID) {
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "work-folder-del";
        delBtn.title = "폴더 삭제";
        delBtn.textContent = "✕";
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          deleteWorkFolder(f.id);
        });
        btn.appendChild(delBtn);
      }
      row.appendChild(btn);
    });

    const addFolderBtn = document.createElement("button");
    addFolderBtn.type = "button";
    addFolderBtn.className = "work-folder-chip work-folder-new";
    addFolderBtn.textContent = "+ 새 폴더";
    addFolderBtn.addEventListener("click", createWorkFolder);
    row.appendChild(addFolderBtn);

    grid.innerHTML = "";
    const createTile = document.createElement("button");
    createTile.type = "button";
    createTile.className = "work-card work-card-create";
    createTile.innerHTML = `<span class="plus">+</span><strong>새 템플릿 만들기</strong>`;
    createTile.addEventListener("click", () => {
      closeWorkBrowser();
      newProject();
    });
    grid.appendChild(createTile);

    const filtered = browserFolderId === DEFAULT_FOLDER_ID
      ? works
      : works.filter((w) => w.folderId === browserFolderId);
    if (!filtered.length) {
      const empty = document.createElement("div");
      empty.className = "work-card-empty";
      empty.textContent = "이 폴더에는 아직 작업물이 없습니다. 저장하거나 새 템플릿을 만들어보세요.";
      grid.appendChild(empty);
      return;
    }

    filtered.forEach((w) => {
      const card = document.createElement("article");
      card.className = "work-card";
      const dt = new Date(w.updatedAt || Date.now());
      const dateStr = dt.toLocaleString("ko-KR", { dateStyle: "short", timeStyle: "short" });
      const thumb = w.thumb || EMPTY_THUMB;
      card.innerHTML = `
        <img class="work-card-cover" src="${thumb}" alt="작업 미리보기" />
        <div class="work-card-body">
          <h3 class="work-card-name"></h3>
          <div class="work-card-date">${dateStr}</div>
          <div class="work-card-actions">
            <button type="button" class="btn btn-sm">불러오기</button>
            <button type="button" class="btn btn-sm btn-danger">삭제</button>
          </div>
        </div>`;
      card.querySelector(".work-card-name").textContent = w.name || "작업";
      if (!w.thumb) {
        rebuildThumbForWork(w, (nextThumb) => {
          if (!nextThumb) return;
          const cover = card.querySelector(".work-card-cover");
          if (cover) cover.src = nextThumb;
        });
      }
      const actions = card.querySelectorAll(".work-card-actions button");
      actions[0].addEventListener("click", () => {
        closeWorkBrowser();
        loadWorkEntry(w.id);
      });
      actions[1].addEventListener("click", () => {
        deleteWorkById(w.id);
        renderWorkBrowser();
      });
      card.querySelector(".work-card-cover").addEventListener("click", () => {
        closeWorkBrowser();
        loadWorkEntry(w.id);
      });
      grid.appendChild(card);
    });
  }

  function openWorkBrowser() {
    const panel = document.getElementById("work-browser");
    if (!panel) return;
    browserFolderId = currentFolderId;
    panel.hidden = false;
    renderWorkBrowser();
  }

  function closeWorkBrowser() {
    const panel = document.getElementById("work-browser");
    if (!panel) return;
    panel.hidden = true;
  }

  function createWorkFolder() {
    const raw = prompt("새 폴더 이름을 입력하세요");
    if (raw == null) return;
    const name = raw.trim();
    if (!name) {
      toast("폴더 이름을 입력해주세요");
      return;
    }
    const folders = ensureFolders();
    if (folders.some((f) => f.name === name)) {
      toast("같은 이름의 폴더가 이미 있습니다");
      return;
    }
    const id = "folder-" + Date.now() + "-" + Math.random().toString(16).slice(2, 7);
    const next = [...folders, { id, name }];
    setFolders(next);
    currentFolderId = id;
    browserFolderId = id;
    renderFolderSelect();
    renderWorkList();
    renderWorkBrowser();
    toast("새 폴더를 만들었습니다");
  }

  function deleteWorkFolder(folderId) {
    if (!folderId || folderId === DEFAULT_FOLDER_ID) return;
    const folders = ensureFolders();
    const target = folders.find((f) => f.id === folderId);
    if (!target) return;
    if (!confirm(`"${target.name}" 폴더를 삭제할까요?\n작업물은 전체 폴더로 이동됩니다.`)) {
      return;
    }
    const nextFolders = folders.filter((f) => f.id !== folderId);
    setFolders(nextFolders);
    const nextWorks = getWorks().map((w) =>
      w.folderId === folderId ? Object.assign({}, w, { folderId: DEFAULT_FOLDER_ID }) : w
    );
    setWorks(nextWorks);
    if (currentFolderId === folderId) currentFolderId = DEFAULT_FOLDER_ID;
    if (browserFolderId === folderId) browserFolderId = DEFAULT_FOLDER_ID;
    renderFolderSelect();
    renderWorkList();
    renderWorkBrowser();
    toast("폴더를 삭제했습니다");
  }

  function buildWorkThumbnail() {
    try {
      return canvas.toDataURL({
        format: "jpeg",
        quality: 0.7,
        multiplier: 0.18,
        enableRetinaScaling: false,
      });
    } catch {
      return "";
    }
  }

  function rebuildThumbForWork(work, onDone) {
    if (!work || !work.id || !work.json) {
      onDone("");
      return;
    }
    if (thumbGenerating.has(work.id)) return;
    thumbGenerating.add(work.id);
    try {
      const baseW = Math.max(200, work.canvasW || 1080);
      const baseH = Math.max(200, work.canvasH || 1080);
      const scale = Math.min(1, 360 / baseW);
      const sc = new fabric.StaticCanvas(null, {
        width: baseW,
        height: baseH,
        enableRetinaScaling: false,
      });
      sc.backgroundColor = work.bg || "#ffffff";
      sc.loadFromJSON(JSON.parse(work.json || "{}"), () => {
        try {
          sc.renderAll();
          const thumb = sc.toDataURL({
            format: "jpeg",
            quality: 0.74,
            multiplier: scale,
            enableRetinaScaling: false,
          });
          sc.dispose();
          const list = getWorks();
          const idx = list.findIndex((x) => x.id === work.id);
          if (idx >= 0) {
            list[idx] = Object.assign({}, list[idx], { thumb: thumb });
            setWorks(list);
          }
          thumbGenerating.delete(work.id);
          onDone(thumb);
        } catch {
          sc.dispose();
          thumbGenerating.delete(work.id);
          onDone("");
        }
      });
    } catch {
      thumbGenerating.delete(work.id);
      onDone("");
    }
  }

  function saveCurrentProject() {
    syncCurrentSlideState();
    const payload = getPayloadFromCurrentState();
    currentFolderId = payload.folderId || currentFolderId;
    mergeLocalWork(payload);
    cloudSavePayload(payload, true);
    toast("나의 작업에 저장했습니다");
  }

  function loadWorkEntry(id) {
    const w = getWorks().find((x) => x.id === id);
    if (!w) return;
    if (
      canvas.getObjects().length > 0 &&
      !confirm("저장되지 않은 변경이 사라질 수 있습니다. 이 작업을 불러올까요?")
    )
      return;
    currentWorkId = w.id;
    currentFolderId = w.folderId || DEFAULT_FOLDER_ID;
    document.getElementById("project-name").value = w.name || "";
    renderFolderSelect();
    const folderSel = document.getElementById("project-folder");
    if (folderSel) folderSel.value = currentFolderId;
    const normalizedSlides =
      Array.isArray(w.slides) && w.slides.length
        ? w.slides.map((s, idx) => ({
            id: s.id || "s-" + idx + "-" + Date.now(),
            canvasW: s.canvasW || w.canvasW || 1080,
            canvasH: s.canvasH || w.canvasH || 1080,
            bg: s.bg || w.bg || "#ffffff",
            presetId: s.presetId || w.presetId || matchPresetIdForSize(s.canvasW || w.canvasW || 1080, s.canvasH || w.canvasH || 1080),
            json: s.json || w.json || "{}",
            thumb: s.thumb || "",
          }))
        : [
            {
              id: "s-legacy-" + (w.id || Date.now()),
              canvasW: w.canvasW || 1080,
              canvasH: w.canvasH || 1080,
              bg: w.bg || "#ffffff",
              presetId: w.presetId || matchPresetIdForSize(w.canvasW, w.canvasH),
              json: w.json || "{}",
              thumb: "",
            },
          ];
    slides = normalizedSlides;
    currentSlideIndex = Math.max(
      0,
      Math.min(normalizedSlides.length - 1, Number.isInteger(w.currentSlideIndex) ? w.currentSlideIndex : 0)
    );
    loadSlideAt(currentSlideIndex);
    renderWorkList();
    toast("작업을 불러왔습니다");
  }

  function deleteWorkById(id) {
    if (!confirm("이 작업을 목록에서 삭제할까요?")) return;
    const list = getWorks().filter((x) => x.id !== id);
    setWorks(list);
    if (currentWorkId === id) currentWorkId = null;
    renderWorkList();
    renderWorkBrowser();
    toast("삭제했습니다");
  }

  function newProject() {
    if (
      canvas.getObjects().length > 0 &&
      !confirm(
        "캔버스를 비우고 새 프로젝트를 시작할까요?"
      )
    )
      return;
    currentWorkId = null;
    document.getElementById("project-name").value = "";
    const bg = document.getElementById("canvas-bg").value || "#ffffff";
    slides = [
      {
        id:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : "s-" + Date.now() + "-" + Math.random().toString(16).slice(2),
        canvasW: logicalW,
        canvasH: logicalH,
        bg: bg,
        presetId: lastPresetId,
        json: JSON.stringify({ objects: [], background: bg }),
        thumb: "",
      },
    ];
    currentSlideIndex = 0;
    loadSlideAt(0);
    toast("새 프로젝트");
  }


  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const dark =
      saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.toggleAttribute("data-theme", dark);
  }

  function toggleTheme() {
    const on = document.documentElement.toggleAttribute("data-theme");
    localStorage.setItem(THEME_KEY, on ? "dark" : "light");
  }

  function snapshotJson() {
    return snapshotJsonOf(canvas);
  }

  function pushHistory() {
    if (restoring) return;
    const json = snapshotJson();
    if (historyStep >= 0 && history[historyStep] === json) return;
    history.splice(historyStep + 1);
    history.push(json);
    historyStep = history.length - 1;
    while (history.length > MAX_HISTORY) {
      history.shift();
      historyStep--;
    }
    updateUndoRedoButtons();
    if (slides.length) syncCurrentSlideState();
  }

  function scheduleHistory() {
    clearTimeout(historyTimer);
    historyTimer = setTimeout(() => {
      pushHistory();
      historyTimer = null;
    }, 180);
  }

  function flushHistory() {
    clearTimeout(historyTimer);
    historyTimer = null;
    pushHistory();
  }

  function undo() {
    if (historyStep <= 0) return;
    historyStep--;
    loadFromHistory();
  }

  function redo() {
    if (historyStep >= history.length - 1) return;
    historyStep++;
    loadFromHistory();
  }

  function loadFromHistory() {
    restoring = true;
    canvas.loadFromJSON(JSON.parse(history[historyStep]), () => {
      canvas.renderAll();
      restoring = false;
      syncBgInput();
      updateUndoRedoButtons();
      updateLayers();
      updateInspector();
    });
  }

  function updateUndoRedoButtons() {
    document.getElementById("btn-undo").disabled = historyStep <= 0;
    document.getElementById("btn-redo").disabled = historyStep >= history.length - 1;
  }

  function applyDisplayZoom(scale) {
    displayScale = Math.min(2.2, Math.max(0.12, scale));
    const card = document.getElementById("canvas-card");
    card.style.transform = `scale(${displayScale})`;
    card.style.transformOrigin = "center center";
    document.getElementById("zoom-label").textContent = Math.round(displayScale * 100) + "%";
    requestAnimationFrame(() => canvas.calcOffset());
  }

  function fitZoom() {
    const zone = document.getElementById("viewport");
    const pad = 80;
    const sw = Math.max(100, zone.clientWidth - pad);
    const sh = Math.max(100, zone.clientHeight - pad);
    const s = Math.min(sw / logicalW, sh / logicalH, 1.15);
    applyDisplayZoom(Math.max(0.15, s * 0.92));
  }

  function setLogicalSize(w, h, clearContent) {
    logicalW = w;
    logicalH = h;
    canvas.setWidth(w);
    canvas.setHeight(h);
    if (clearContent) {
      canvas.clear();
      canvas.backgroundColor = document.getElementById("canvas-bg").value;
    }
    canvas.renderAll();
    fitZoom();
  }

  function syncBgInput() {
    const c = canvas.backgroundColor || "#ffffff";
    const hex =
      typeof c === "string" && c.startsWith("#")
        ? c.slice(0, 7)
        : typeof c === "string" && c.startsWith("rgb")
          ? rgbToHex(c)
          : "#ffffff";
    document.getElementById("canvas-bg").value = hex.length === 7 ? hex : "#ffffff";
  }

  function rgbToHex(rgb) {
    const m = rgb.match(/\d+/g);
    if (!m || m.length < 3) return "#ffffff";
    const to = (n) => ("0" + parseInt(n, 10).toString(16)).slice(-2);
    return "#" + to(m[0]) + to(m[1]) + to(m[2]);
  }

  function resetHistoryFromCanvas() {
    history.length = 0;
    historyStep = -1;
    pushHistory();
  }

  function applyPreset(id) {
    const p = PRESETS.find((x) => x.id === id);
    if (!p) return;
    const hasObjects = canvas.getObjects().length > 0;
    if (
      hasObjects &&
      !confirm(
        "캔버스 크기를 바꾸면 현재 작업이 지워집니다. 계속할까요?"
      )
    ) {
      document.getElementById("preset-size").value = lastPresetId;
      return;
    }
    lastPresetId = id;
    setLogicalSize(p.w, p.h, true);
    resetHistoryFromCanvas();
    updateSlideUi();
  }

  function starPoints(outerR, innerR, spikes) {
    const n = spikes * 2;
    const pts = [];
    for (let i = 0; i < n; i++) {
      const r = i % 2 === 0 ? outerR : innerR;
      const a = (Math.PI * i) / spikes - Math.PI / 2;
      pts.push({ x: r * Math.cos(a), y: r * Math.sin(a) });
    }
    return pts;
  }

  function layerLabel(obj) {
    const t = obj.type;
    if (t === "i-text" || t === "text" || t === "textbox") {
      const s = (obj.text || "").replace(/\s+/g, " ").trim().slice(0, 22);
      return s || "텍스트";
    }
    if (t === "image") return "이미지";
    if (t === "rect") return obj.frameKind || obj.isPhotoFrame ? "프레임" : "사각형";
    if (t === "circle") return "원";
    if (t === "ellipse") return "타원";
    if (t === "triangle") return "삼각형";
    if (t === "polygon") return "별";
    if (t === "line") return "선";
    if (t === "path") return "화살표";
    if (t === "group") return obj.isPhotoFrame ? "프레임" : "그룹";
    return t || "객체";
  }

  function updateLayers() {
    const ul = document.getElementById("layer-list");
    ul.innerHTML = "";
    const objs = canvas.getObjects().slice().reverse();
    const active = canvas.getActiveObject();
    const activeSet =
      active && active.type === "activeSelection" ? active.getObjects() : active ? [active] : [];

    objs.forEach((obj) => {
      const li = document.createElement("li");
      li.className = "layer-item";
      if (activeSet.includes(obj)) li.classList.add("active");
      li.innerHTML = `<span class="layer-ic">◇</span><span class="layer-name"></span>`;
      li.querySelector(".layer-name").textContent = layerLabel(obj);
      li.addEventListener("click", () => {
        canvas.setActiveObject(obj);
        canvas.requestRenderAll();
        updateInspector();
        updateLayers();
      });
      ul.appendChild(li);
    });
  }

  function getActiveTarget() {
    const o = canvas.getActiveObject();
    if (!o || o.type === "activeSelection") return null;
    return o;
  }

  function fillToHex(fill, fallback) {
    if (typeof fill === "string" && fill.startsWith("#")) return fill.slice(0, 7);
    if (typeof fill === "string" && fill.startsWith("rgb")) return rgbToHex(fill);
    return fallback;
  }

  function updateInspector() {
    const o = getActiveTarget();
    const empty = document.getElementById("inspector-empty");
    const panel = document.getElementById("inspector-panel");
    if (!o) {
      empty.hidden = false;
      panel.hidden = true;
      return;
    }
    empty.hidden = true;
    panel.hidden = false;

    const isText = o.type === "i-text" || o.type === "text" || o.type === "textbox";
    const isLine = o.type === "line";
    const isImage = o.type === "image";

    document.getElementById("ins-text-wrap").hidden = !isText;
    document.getElementById("ins-font-wrap").hidden = !isText;
    document.getElementById("ins-size-wrap").hidden = !isText;
    document.getElementById("ins-stroke-wrap").hidden = isImage;
    document.getElementById("ins-stroke-w-wrap").hidden = isImage;

    if (isText) {
      document.getElementById("ins-text").value = o.text || "";
      document.getElementById("ins-font").value = o.fontFamily || FONTS[0].v;
      const fs = Math.round(o.fontSize || 48);
      document.getElementById("ins-font-size").value = String(fs);
      document.getElementById("ins-size-val").textContent = fs + "px";
      const q = (document.getElementById("ins-font-search").value || "").trim();
      renderFontPreviewList(q);
    }

    const fill = o.fill;
    const fillHex = isLine
      ? "#000000"
      : fillToHex(fill, isText ? "#6366f1" : "#6366f1");
    document.getElementById("ins-fill").value = fillHex.length === 7 ? fillHex : "#1e293b";

    const stroke = o.stroke || "#000000";
    document.getElementById("ins-stroke").value =
      typeof stroke === "string" && stroke.startsWith("#") && stroke.length >= 7
        ? stroke.slice(0, 7)
        : "#000000";
    document.getElementById("ins-stroke-width").value = String(
      o.strokeWidth != null ? o.strokeWidth : isLine ? 4 : 0
    );

    const op = Math.round((o.opacity != null ? o.opacity : 1) * 100);
    document.getElementById("ins-opacity").value = String(op);
    const sw = Math.max(1, Math.round(o.getScaledWidth ? o.getScaledWidth() : o.width || 1));
    const sh = Math.max(1, Math.round(o.getScaledHeight ? o.getScaledHeight() : o.height || 1));
    document.getElementById("ins-width").value = String(sw);
    document.getElementById("ins-height").value = String(sh);
  }

  function renderFontPreviewList(query) {
    const root = document.getElementById("ins-font-preview");
    if (!root) return;
    const q = String(query || "").trim().toLowerCase();
    const o = getActiveTarget();
    const activeFont =
      o && (o.type === "i-text" || o.type === "text" || o.type === "textbox")
        ? o.fontFamily || ""
        : "";
    root.innerHTML = "";
    FONTS.filter((f) => {
      if (!q) return true;
      return f.l.toLowerCase().includes(q) || f.v.toLowerCase().includes(q);
    }).forEach((f) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "font-preview-item" + (activeFont === f.v ? " active" : "");
      btn.innerHTML =
        `<span class="font-preview-name">${f.l}</span>` +
        `<span class="font-preview-sample" style="font-family:${f.v};">가나다 ABC 123</span>`;
      btn.addEventListener("click", () => {
        const target = getActiveTarget();
        if (!target || !(target.type === "i-text" || target.type === "text" || target.type === "textbox")) {
          toast("텍스트를 먼저 선택해주세요");
          return;
        }
        target.set("fontFamily", f.v);
        document.getElementById("ins-font").value = f.v;
        canvas.requestRenderAll();
        flushHistory();
        renderFontPreviewList(document.getElementById("ins-font-search").value || "");
      });
      root.appendChild(btn);
    });
  }

  function setObjectSizeByBox(nextW, nextH) {
    const o = getActiveTarget();
    if (!o) return;
    const curW = Math.max(1, o.getScaledWidth ? o.getScaledWidth() : o.width || 1);
    const curH = Math.max(1, o.getScaledHeight ? o.getScaledHeight() : o.height || 1);
    const targetW = Math.max(1, Number(nextW) || curW);
    const targetH = Math.max(1, Number(nextH) || curH);
    const rx = targetW / curW;
    const ry = targetH / curH;
    o.set({
      scaleX: (o.scaleX || 1) * rx,
      scaleY: (o.scaleY || 1) * ry,
    });
    o.setCoords();
    canvas.requestRenderAll();
    flushHistory();
    if (o.type === "image" && o.clipPath) tryClipImageToFrame(o);
    updateInspector();
    updateLayers();
  }

  function iconSvgUrl(name) {
    return `https://api.iconify.design/${encodeURIComponent(name)}.svg`;
  }

  function addIconToCanvas(iconName) {
    const url = iconSvgUrl(iconName);
    fabric.loadSVGFromURL(url, (objects, options) => {
      if (!objects || !objects.length) {
        toast("아이콘을 불러오지 못했습니다");
        return;
      }
      const icon = fabric.util.groupSVGElements(objects, options || {});
      const maxW = Math.min(130, logicalW * 0.22);
      if (icon.width && icon.width > maxW) icon.scaleToWidth(maxW);
      icon.set({
        left: logicalW / 2,
        top: logicalH / 2,
        originX: "center",
        originY: "center",
      });
      finalizeAdd(icon);
      setTool("select");
    });
  }

  function renderIconResults(iconNames) {
    const root = document.getElementById("icon-grid");
    if (!root) return;
    root.innerHTML = "";
    const uniq = Array.from(new Set((iconNames || []).filter(Boolean)));
    if (!uniq.length) {
      root.innerHTML = `<div class="icon-status">검색 결과가 없습니다</div>`;
      return;
    }
    uniq.slice(0, 120).forEach((name) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "icon-item";
      btn.title = name;
      btn.innerHTML = `<img src="${iconSvgUrl(name)}" alt="${name}" loading="lazy" />`;
      btn.addEventListener("click", () => addIconToCanvas(name));
      root.appendChild(btn);
    });
  }

  function extractSearchTerms(raw) {
    const q = String(raw || "").trim();
    if (!q) return [];
    const terms = [q];
    Object.keys(ICON_KR_QUERY_MAP).forEach((k) => {
      if (q.includes(k)) terms.push(...ICON_KR_QUERY_MAP[k]);
    });
    if (/^[가-힣\s]+$/.test(q) && terms.length === 1) {
      terms.push("icon", "symbol");
    }
    return Array.from(new Set(terms.map((x) => x.trim()).filter(Boolean)));
  }

  function pickColorPool(terms) {
    const t = terms.join(" ").toLowerCase();
    if (
      t.includes("circle") ||
      t.includes("square") ||
      t.includes("triangle") ||
      t.includes("shape") ||
      t.includes("원") ||
      t.includes("동그라미") ||
      t.includes("사각형") ||
      t.includes("네모") ||
      t.includes("삼각형") ||
      t.includes("도형")
    ) {
      return [
        "fluent-emoji-flat:blue-circle",
        "fluent-emoji-flat:red-circle",
        "fluent-emoji-flat:yellow-circle",
        "fluent-emoji-flat:orange-square",
        "fluent-emoji-flat:blue-square",
        "fluent-emoji-flat:red-square",
        "fluent-emoji-flat:red-triangle-pointed-up",
        "twemoji:red-circle",
        "twemoji:blue-circle",
        "twemoji:yellow-circle",
        "twemoji:red-square",
        "twemoji:blue-square",
        "twemoji:orange-square",
        "twemoji:red-triangle-pointed-up",
        "mdi:circle-outline",
        "mdi:circle-slice-8",
        "mdi:square-outline",
        "mdi:square-rounded-outline",
        "mdi:triangle-outline",
        "mdi:triangle",
        "mdi:shape-outline",
      ];
    }
    if (
      t.includes("arrow") ||
      t.includes("direction") ||
      t.includes("navigate") ||
      t.includes("화살표") ||
      t.includes("방향")
    ) {
      const arrowPool = [
        "fluent-emoji-flat:left-arrow",
        "fluent-emoji-flat:right-arrow",
        "fluent-emoji-flat:up-arrow",
        "fluent-emoji-flat:down-arrow",
        "twemoji:right-arrow",
        "twemoji:left-arrow",
        "twemoji:up-arrow",
        "twemoji:down-arrow",
        "twemoji:right-arrow-curving-up",
        "twemoji:right-arrow-curving-down",
        "twemoji:left-right-arrow",
        "twemoji:up-down-arrow",
        "noto:right-arrow",
        "noto:left-arrow",
        "noto:up-arrow",
        "noto:down-arrow",
        "mdi:arrow-up-bold",
        "mdi:arrow-down-bold",
        "mdi:arrow-left-bold",
        "mdi:arrow-right-bold",
        "mdi:arrow-top-right-bold-box",
        "mdi:arrow-bottom-left-bold-box",
        "mdi:navigation-variant",
        "mdi:compass",
      ];
      return arrowPool;
    }
    const byCategory = ICON_COLOR_POOL.filter((x) => {
      if (t.includes("car") || t.includes("vehicle") || t.includes("자동차") || t.includes("차")) {
        return x.includes("car") || x.includes("taxi") || x.includes("truck") || x.includes("automobile");
      }
      if (t.includes("air") || t.includes("flight") || t.includes("비행")) {
        return x.includes("airplane") || x.includes("helicopter") || x.includes("rocket");
      }
      if (t.includes("train") || t.includes("bus") || t.includes("기차") || t.includes("버스")) {
        return x.includes("bus") || x.includes("train") || x.includes("tram") || x.includes("locomotive");
      }
      return true;
    });
    return byCategory.length ? byCategory : ICON_COLOR_POOL;
  }

  async function searchIcons(query) {
    const q = (query || "").trim();
    const root = document.getElementById("icon-grid");
    if (root) root.innerHTML = `<div class="icon-status">검색중...</div>`;
    if (!q) {
      renderIconResults([...ICON_COLOR_POOL, ...ICON_FALLBACK]);
      return;
    }
    const terms = extractSearchTerms(q);
    const reqs = terms.slice(0, 4).map((term) =>
      fetch(`https://api.iconify.design/search?query=${encodeURIComponent(term)}&limit=80`)
        .then((r) => (r.ok ? r.json() : { icons: [] }))
        .catch(() => ({ icons: [] }))
    );
    try {
      const packs = await Promise.all(reqs);
      const icons = packs.flatMap((p) => (Array.isArray(p.icons) ? p.icons : []));
      const colorful = pickColorPool(terms);
      const merged = [...icons, ...colorful, ...ICON_FALLBACK];
      if (!icons.length) {
        renderIconResults(merged);
        toast("검색 결과가 적어서 컬러 아이콘을 함께 보여줍니다");
        return;
      }
      renderIconResults(merged);
    } catch {
      renderIconResults([...pickColorPool(terms), ...ICON_FALLBACK]);
      toast("서버 연결이 느려 기본/컬러 아이콘을 우선 표시합니다");
    }
  }

  function initIconSearch() {
    const input = document.getElementById("icon-query");
    const btn = document.getElementById("icon-search-btn");
    if (!input || !btn) return;
    btn.addEventListener("click", () => searchIcons(input.value));
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        searchIcons(input.value);
      }
    });
    renderIconResults([...ICON_COLOR_POOL, ...ICON_FALLBACK]);
  }

  function slugifyName(s) {
    return String(s || "template")
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "template";
  }

  function normalizeImportedSlide(raw) {
    const base = raw && raw.slide ? raw.slide : raw || {};
    return {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : "s-" + Date.now() + "-" + Math.random().toString(16).slice(2),
      canvasW: base.canvasW || base.width || 1080,
      canvasH: base.canvasH || base.height || 1080,
      bg: base.bg || "#ffffff",
      presetId: base.presetId || matchPresetIdForSize(base.canvasW || base.width || 1080, base.canvasH || base.height || 1080),
      json:
        typeof base.json === "string"
          ? base.json
          : typeof base.json === "object"
            ? JSON.stringify(base.json)
            : JSON.stringify({ objects: [], background: base.bg || "#ffffff" }),
      thumb: base.thumb || "",
    };
  }

  function importTemplateObject(data) {
    try {
      const slide = normalizeImportedSlide(data);
      syncCurrentSlideState();
      slides.splice(currentSlideIndex + 1, 0, slide);
      loadSlideAt(currentSlideIndex + 1);
      toast("외부 템플릿을 슬라이드로 가져왔습니다");
    } catch {
      toast("템플릿 형식이 올바르지 않습니다");
    }
  }

  async function importTemplateFromUrl() {
    const url = (document.getElementById("ext-template-url").value || "").trim();
    if (!url) {
      toast("템플릿 URL을 입력해주세요");
      return;
    }
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();
      importTemplateObject(data);
    } catch {
      toast("외부 템플릿 URL을 읽지 못했습니다");
    }
  }

  function exportCurrentSlideTemplate() {
    syncCurrentSlideState();
    const s = slides[currentSlideIndex];
    if (!s) return;
    const payload = {
      version: 1,
      name: `slide-${currentSlideIndex + 1}`,
      slide: {
        canvasW: s.canvasW,
        canvasH: s.canvasH,
        bg: s.bg,
        presetId: s.presetId,
        json: s.json,
        thumb: s.thumb || "",
      },
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
    downloadBlob(blob, `${slugifyName(payload.name)}.template.json`);
    toast("현재 슬라이드를 템플릿 파일로 저장했습니다");
  }

  function renderExternalImageResults(list) {
    const root = document.getElementById("ext-img-grid");
    if (!root) return;
    root.innerHTML = "";
    const safe = Array.isArray(list) ? list : [];
    if (!safe.length) {
      root.innerHTML = `<div class="icon-status">결과가 없습니다</div>`;
      return;
    }
    safe.slice(0, 45).forEach((item) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "ext-item";
      const thumb = item.thumbnail || item.url || "";
      const src = item.url || item.thumbnail || "";
      card.innerHTML = `<img src="${thumb}" alt="외부 이미지" loading="lazy"/><span>${item.title || "이미지"}</span>`;
      card.addEventListener("click", async () => {
        const img = await loadExternalImageAsFabric(src);
        if (!img) {
          toast("이미지를 가져오지 못했습니다. 다른 이미지를 선택해보세요");
          return;
        }
        const maxW = Math.min(logicalW * 0.72, 680);
        if (img.width > maxW) img.scaleToWidth(maxW);
        img.set({
          left: logicalW / 2,
          top: logicalH / 2,
          originX: "center",
          originY: "center",
        });
        finalizeAdd(img);
        setTool("select");
      });
      root.appendChild(card);
    });
  }

  function toWeservUrl(url) {
    if (!url) return "";
    const clean = String(url).replace(/^https?:\/\//i, "");
    return `https://images.weserv.nl/?url=${encodeURIComponent(clean)}&w=1800&h=1800&fit=inside`;
  }

  function loadHtmlImage(url) {
    return new Promise((resolve, reject) => {
      const el = new Image();
      el.crossOrigin = "anonymous";
      el.referrerPolicy = "no-referrer";
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("load fail"));
      el.src = url;
    });
  }

  async function loadExternalImageAsFabric(src) {
    const candidates = [src, toWeservUrl(src)].filter(Boolean);
    for (const url of candidates) {
      try {
        const el = await loadHtmlImage(url);
        return new fabric.Image(el);
      } catch {
        // try next candidate
      }
    }
    return null;
  }

  async function searchExternalImages(query) {
    const q = (query || "").trim();
    const root = document.getElementById("ext-img-grid");
    if (root) root.innerHTML = `<div class="icon-status">검색중...</div>`;
    if (!q) {
      if (root) root.innerHTML = `<div class="icon-status">검색어를 입력하세요</div>`;
      return;
    }
    try {
      const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&source=wikimedia&page_size=45`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("openverse failed");
      const data = await res.json();
      const list = (data.results || []).map((x) => ({
        title: x.title || x.creator || "image",
        thumbnail: x.thumbnail || x.url,
        url: x.url || x.thumbnail,
      }));
      if (list.length) {
        renderExternalImageResults(list);
        return;
      }
      throw new Error("empty result");
    } catch {
      const backup = Array.from({ length: 36 }).map((_, i) => {
        const src = `https://source.unsplash.com/640x480/?${encodeURIComponent(q)}&sig=${i + 1}`;
        return {
          title: `${q} ${i + 1}`,
          thumbnail: src,
          url: src,
        };
      });
      renderExternalImageResults(backup);
      toast("외부 API가 불안정해 백업 이미지 소스로 표시합니다");
    }
  }

  function initExternalAssetSearch() {
    const q = document.getElementById("ext-img-query");
    const btn = document.getElementById("ext-img-search-btn");
    const tUrlBtn = document.getElementById("ext-template-url-btn");
    const tFile = document.getElementById("ext-template-file");
    const tExport = document.getElementById("ext-template-export-btn");
    if (q && btn) {
      btn.addEventListener("click", () => searchExternalImages(q.value));
      q.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          searchExternalImages(q.value);
        }
      });
    }
    if (tUrlBtn) tUrlBtn.addEventListener("click", importTemplateFromUrl);
    if (tFile) {
      tFile.addEventListener("change", async (e) => {
        const f = e.target.files && e.target.files[0];
        if (!f) return;
        try {
          const text = await f.text();
          const data = JSON.parse(text);
          importTemplateObject(data);
        } catch {
          toast("템플릿 파일을 읽지 못했습니다");
        }
        e.target.value = "";
      });
    }
    if (tExport) tExport.addEventListener("click", exportCurrentSlideTemplate);
  }

  function setTool(tool) {
    currentTool = tool;
    document.querySelectorAll(".tool-btn[data-tool]").forEach((b) => {
      b.classList.toggle("active", b.dataset.tool === tool);
    });
    const placing = tool !== "select";
    canvas.defaultCursor = placing ? "crosshair" : "default";
    canvas.selection = !placing;
    canvas.forEachObject((o) => {
      o.selectable = !placing;
      o.evented = true;
    });
    canvas.requestRenderAll();
  }

  function finalizeAdd(obj) {
    canvas.add(obj);
    canvas.setActiveObject(obj);
    canvas.requestRenderAll();
    flushHistory();
    updateLayers();
    updateInspector();
  }

  function addIText(x, y) {
    const t = new fabric.IText("텍스트를 입력하세요", {
      left: x,
      top: y,
      originX: "center",
      originY: "center",
      fontFamily: "Noto Sans KR",
      fontSize: 42,
      fill: "#0f172a",
      fontWeight: "600",
    });
    finalizeAdd(t);
  }

  function addRect(x, y) {
    const r = new fabric.Rect({
      width: 280,
      height: 180,
      fill: "#c7d2fe",
      stroke: "#4f46e5",
      strokeWidth: 2,
      rx: 12,
      ry: 12,
      left: x,
      top: y,
      originX: "center",
      originY: "center",
    });
    finalizeAdd(r);
  }

  function addCircle(x, y) {
    const c = new fabric.Circle({
      radius: 100,
      fill: "#fce7f3",
      stroke: "#db2777",
      strokeWidth: 3,
      left: x,
      top: y,
      originX: "center",
      originY: "center",
    });
    finalizeAdd(c);
  }

  function addEllipse(x, y) {
    const e = new fabric.Ellipse({
      rx: 130,
      ry: 85,
      fill: "#bbf7d0",
      stroke: "#15803d",
      strokeWidth: 2,
      left: x,
      top: y,
      originX: "center",
      originY: "center",
    });
    finalizeAdd(e);
  }

  function addTriangle(x, y) {
    const tr = new fabric.Triangle({
      width: 200,
      height: 200,
      fill: "#fef08a",
      stroke: "#ca8a04",
      strokeWidth: 2,
      left: x,
      top: y,
      originX: "center",
      originY: "center",
    });
    finalizeAdd(tr);
  }

  function addDiamond(x, y) {
    const d = new fabric.Rect({
      width: 150,
      height: 150,
      angle: 45,
      fill: "#a5f3fc",
      stroke: "#0e7490",
      strokeWidth: 2,
      left: x,
      top: y,
      originX: "center",
      originY: "center",
    });
    finalizeAdd(d);
  }

  function addStar(x, y) {
    const st = new fabric.Polygon(starPoints(72, 30, 5), {
      fill: "#fde047",
      stroke: "#a16207",
      strokeWidth: 2,
      left: x,
      top: y,
      originX: "center",
      originY: "center",
    });
    finalizeAdd(st);
  }

  function addLine(x, y, dashed) {
    const line = new fabric.Line([x - 120, y, x + 120, y], {
      stroke: "#0f172a",
      strokeWidth: 5,
      strokeLineCap: "round",
      strokeDashArray: dashed ? [14, 10] : null,
    });
    finalizeAdd(line);
  }

  function addArrowPath(x, y) {
    const path = new fabric.Path("M -90 0 L 50 0 L 35 -22 L 90 0 L 35 22 L 50 0 Z", {
      fill: "#0f172a",
      left: x,
      top: y,
      originX: "center",
      originY: "center",
    });
    finalizeAdd(path);
  }

  function addFrame(kind) {
    const w = canvas.getWidth();
    const h = canvas.getHeight();
    const cx = w / 2;
    const cy = h / 2;
    const fw = Math.min(w, h) * 0.52;
    const fh = fw * 0.72;

    const addRectFrame = (type, opts) => {
      const r = new fabric.Rect(
        Object.assign(
          {
            width: fw,
            height: fh,
            fill: "transparent",
            stroke: "#334155",
            strokeWidth: Math.max(6, fw * 0.02),
            rx: 8,
            ry: 8,
            left: cx,
            top: cy,
            originX: "center",
            originY: "center",
            frameKind: true,
            isPhotoFrame: true,
            photoFrameType: type,
          },
          opts || {}
        )
      );
      finalizeAdd(r);
    };

    const addMattedFrame = (type, outerOpt, innerOpt) => {
      const outer = new fabric.Rect(
        Object.assign(
          {
            width: fw + 28,
            height: fh + 28,
            fill: "transparent",
            stroke: "#1e293b",
            strokeWidth: 4,
            rx: 8,
            ry: 8,
            left: cx,
            top: cy,
            originX: "center",
            originY: "center",
          },
          outerOpt || {}
        )
      );
      const inner = new fabric.Rect(
        Object.assign(
          {
            width: fw,
            height: fh,
            fill: "rgba(226,232,240,0.5)",
            stroke: "#94a3b8",
            strokeWidth: 2,
            rx: 6,
            ry: 6,
            left: cx,
            top: cy,
            originX: "center",
            originY: "center",
          },
          innerOpt || {}
        )
      );
      const g = new fabric.Group([outer, inner], {
        left: cx,
        top: cy,
        originX: "center",
        originY: "center",
        isPhotoFrame: true,
        photoFrameType: type,
      });
      finalizeAdd(g);
    };

    if (kind === "simple") return addRectFrame("simple", { rx: 4, ry: 4 });
    if (kind === "round") return addRectFrame("round", { fill: "rgba(248,250,252,0.35)", stroke: "#64748b", strokeWidth: 10, rx: 36, ry: 36 });
    if (kind === "square") return addRectFrame("square", { width: fw * 0.86, height: fw * 0.86, rx: 8, ry: 8, stroke: "#334155", strokeWidth: 8 });
    if (kind === "portrait") return addRectFrame("portrait", { width: fw * 0.72, height: fw * 1.08, rx: 10, ry: 10, stroke: "#475569", strokeWidth: 7 });
    if (kind === "landscape") return addRectFrame("landscape", { width: fw * 1.1, height: fh * 0.78, rx: 10, ry: 10, stroke: "#334155", strokeWidth: 7 });
    if (kind === "capsule") return addRectFrame("capsule", { width: fw * 1.05, height: fh * 0.74, rx: 80, ry: 80, stroke: "#475569", strokeWidth: 8 });
    if (kind === "soft") return addRectFrame("soft", { fill: "rgba(241,245,249,.38)", stroke: "#94a3b8", strokeWidth: 9, rx: 26, ry: 26 });
    if (kind === "bold") return addRectFrame("bold", { stroke: "#0f172a", strokeWidth: 14, rx: 12, ry: 12 });
    if (kind === "vintage") return addRectFrame("vintage", { fill: "rgba(254,243,199,.38)", stroke: "#92400e", strokeWidth: 10, rx: 10, ry: 10 });
    if (kind === "ticket") return addRectFrame("ticket", { stroke: "#334155", strokeWidth: 7, strokeDashArray: [16, 8], rx: 12, ry: 12 });
    if (kind === "double") return addMattedFrame("double");
    if (kind === "matte-dark") return addMattedFrame("matte-dark", { stroke: "#111827", strokeWidth: 7, fill: "#111827" }, { fill: "rgba(248,250,252,0.18)", stroke: "#475569", strokeWidth: 2 });
    if (kind === "gold") return addMattedFrame("gold", { stroke: "#b45309", strokeWidth: 8, fill: "rgba(251,191,36,.08)" }, { fill: "rgba(255,255,255,.65)", stroke: "#f59e0b", strokeWidth: 2 });
    if (kind === "polaroid") {
      const W = Math.min(fw, 320);
      const H = W * 1.22;
      const bottom = 52;
      const pad = 16;
      const innerH = H - pad * 2 - bottom;
      const bg = new fabric.Rect({
        width: W,
        height: H,
        fill: "#ffffff",
        stroke: "#cbd5e1",
        strokeWidth: 2,
        rx: 3,
        ry: 3,
        left: 0,
        top: 0,
        originX: "center",
        originY: "center",
      });
      const hole = new fabric.Rect({
        width: W - pad * 2,
        height: innerH,
        fill: "#e2e8f0",
        stroke: "#94a3b8",
        strokeWidth: 1,
        left: 0,
        top: -(bottom / 2),
        originX: "center",
        originY: "center",
      });
      const g = new fabric.Group([bg, hole], {
        left: cx,
        top: cy,
        originX: "center",
        originY: "center",
        isPhotoFrame: true,
        photoFrameType: "polaroid",
      });
      finalizeAdd(g);
      return;
    }
    addRectFrame("simple");
  }

  function getFrameClipSpec(frame) {
    if (!frame || !frame.isPhotoFrame) return null;
    frame.setCoords();
    if (frame.type === "rect") {
      const br = frame.getBoundingRect(true);
      const inset =
        ((frame.strokeWidth || 0) / 2) *
        Math.max(Math.abs(frame.scaleX || 1), Math.abs(frame.scaleY || 1));
      return {
        left: br.left + inset,
        top: br.top + inset,
        width: Math.max(4, br.width - 2 * inset),
        height: Math.max(4, br.height - 2 * inset),
        rx: (frame.rx || 0) * Math.abs(frame.scaleX || 1),
        ry: (frame.ry || 0) * Math.abs(frame.scaleY || 1),
        angle: frame.angle || 0,
      };
    }
    if (frame.type === "group" && frame._objects && frame._objects[1]) {
      const inner = frame._objects[1];
      inner.setCoords();
      frame.setCoords();
      const br = inner.getBoundingRect(true);
      if (!br || br.width < 2) return null;
      return {
        left: br.left,
        top: br.top,
        width: br.width,
        height: br.height,
        rx: (inner.rx || 0) * Math.abs(inner.scaleX || 1) * Math.abs(frame.scaleX || 1),
        ry: (inner.ry || 0) * Math.abs(inner.scaleY || 1) * Math.abs(frame.scaleY || 1),
        angle: frame.angle || 0,
      };
    }
    return null;
  }

  function pointInClipSpec(pt, spec) {
    if (!spec) return false;
    if (spec.angle) {
      const cx = spec.left + spec.width / 2;
      const cy = spec.top + spec.height / 2;
      const rad = (-(spec.angle || 0) * Math.PI) / 180;
      const dx = pt.x - cx;
      const dy = pt.y - cy;
      const rx = dx * Math.cos(rad) - dy * Math.sin(rad);
      const ry = dx * Math.sin(rad) + dy * Math.cos(rad);
      return (
        Math.abs(rx) <= spec.width / 2 + 1 && Math.abs(ry) <= spec.height / 2 + 1
      );
    }
    return (
      pt.x >= spec.left &&
      pt.x <= spec.left + spec.width &&
      pt.y >= spec.top &&
      pt.y <= spec.top + spec.height
    );
  }

  function overlapRatio(img, spec) {
    const ib = img.getBoundingRect(true);
    const ax1 = Math.max(ib.left, spec.left);
    const ay1 = Math.max(ib.top, spec.top);
    const ax2 = Math.min(ib.left + ib.width, spec.left + spec.width);
    const ay2 = Math.min(ib.top + ib.height, spec.top + spec.height);
    const inter = Math.max(0, ax2 - ax1) * Math.max(0, ay2 - ay1);
    const ia = ib.width * ib.height;
    return ia > 0 ? inter / ia : 0;
  }

  function placeImageBehindFrame(img, frame) {
    const fi = canvas.getObjects().indexOf(frame);
    if (fi < 0) return;
    while (canvas.getObjects().indexOf(img) > fi) {
      canvas.sendBackwards(img);
    }
  }

  function tryClipImageToFrame(img) {
    if (!img || img.type !== "image") return false;
    img.setCoords();
    const center = img.getCenterPoint();
    let best = null;
    let bestMetric = Infinity;
    canvas.getObjects().forEach((f) => {
      if (!f.isPhotoFrame || f === img) return;
      const spec = getFrameClipSpec(f);
      if (!spec) return;
      const inside = pointInClipSpec(center, spec);
      const ov = overlapRatio(img, spec);
      if (!inside && ov < 0.2) return;
      const metric = spec.width * spec.height;
      if (metric < bestMetric) {
        bestMetric = metric;
        best = { frame: f, spec: spec };
      }
    });
    if (!best) {
      img.set("clipPath", null);
      return false;
    }
    const { spec, frame } = best;
    const clip = new fabric.Rect({
      left: spec.left + spec.width / 2,
      top: spec.top + spec.height / 2,
      originX: "center",
      originY: "center",
      width: spec.width,
      height: spec.height,
      rx: spec.rx || 0,
      ry: spec.ry || 0,
      angle: spec.angle || 0,
      absolutePositioned: true,
    });
    img.set("clipPath", clip);
    const cover = Math.max(spec.width / img.width, spec.height / img.height);
    const fx = img.flipX ? -1 : 1;
    const fy = img.flipY ? -1 : 1;
    img.set({
      scaleX: cover * fx,
      scaleY: cover * fy,
      left: spec.left + spec.width / 2,
      top: spec.top + spec.height / 2,
      originX: "center",
      originY: "center",
    });
    img.setCoords();
    placeImageBehindFrame(img, frame);
    canvas.requestRenderAll();
    return true;
  }

  function alignObjectToCanvas(which) {
    const o = getActiveTarget();
    if (!o) return;
    o.setCoords();
    const br = o.getBoundingRect(true);
    const pad = 0;
    const curCx = br.left + br.width / 2;
    const curCy = br.top + br.height / 2;
    let targetCx = curCx;
    let targetCy = curCy;
    if (which === "left") targetCx = pad + br.width / 2;
    if (which === "hcenter") targetCx = logicalW / 2;
    if (which === "right") targetCx = logicalW - pad - br.width / 2;
    if (which === "top") targetCy = pad + br.height / 2;
    if (which === "vcenter") targetCy = logicalH / 2;
    if (which === "bottom") targetCy = logicalH - pad - br.height / 2;
    const dx = targetCx - curCx;
    const dy = targetCy - curCy;
    o.set({ left: (o.left || 0) + dx, top: (o.top || 0) + dy });
    o.setCoords();
    canvas.requestRenderAll();
    flushHistory();
    if (o.type === "image") tryClipImageToFrame(o);
  }

  function stackObject(which) {
    const o = getActiveTarget();
    if (!o) return;
    if (which === "tofront") canvas.bringToFront(o);
    else if (which === "forward") canvas.bringForward(o);
    else if (which === "backward") canvas.sendBackwards(o);
    else if (which === "toback") canvas.sendToBack(o);
    canvas.requestRenderAll();
    flushHistory();
    updateLayers();
  }

  function flipObject(axis) {
    const o = getActiveTarget();
    if (!o) return;
    if (axis === "x") o.set("flipX", !o.flipX);
    if (axis === "y") o.set("flipY", !o.flipY);
    o.setCoords();
    canvas.requestRenderAll();
    flushHistory();
    if (o.type === "image") tryClipImageToFrame(o);
  }

  function linearGradientH(c1, c2) {
    return new fabric.Gradient({
      type: "linear",
      gradientUnits: "percentage",
      coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
      colorStops: [
        { offset: 0, color: c1 },
        { offset: 1, color: c2 },
      ],
    });
  }

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

  WORDART_PRESETS.push(
    {
      id: "retro-red",
      title: "Retro red",
      sub: "Bebas Neue",
      text: "HOT DEAL",
      build: () => ({
        fontFamily: "Bebas Neue",
        fontSize: 84,
        fill: "#ef4444",
        stroke: "#111827",
        strokeWidth: 2,
        shadow: new fabric.Shadow({ color: "rgba(17,24,39,.35)", blur: 2, offsetX: 4, offsetY: 4 }),
      }),
    },
    {
      id: "mint-pop",
      title: "Mint pop",
      sub: "Poppins",
      text: "Fresh",
      build: () => ({
        fontFamily: "Poppins",
        fontSize: 66,
        fontWeight: "800",
        fill: "#10b981",
        stroke: "#064e3b",
        strokeWidth: 2,
      }),
    },
    {
      id: "violet-glow",
      title: "Violet glow",
      sub: "Montserrat",
      text: "NEW",
      build: () => ({
        fontFamily: "Montserrat",
        fontSize: 78,
        fontWeight: "800",
        fill: "#a78bfa",
        stroke: "#4c1d95",
        strokeWidth: 1,
        shadow: new fabric.Shadow({ color: "rgba(167,139,250,.65)", blur: 24, offsetX: 0, offsetY: 0 }),
      }),
    },
    {
      id: "ink-brush",
      title: "Ink brush",
      sub: "Caveat",
      text: "Limited",
      build: () => ({
        fontFamily: "Caveat",
        fontSize: 88,
        fontWeight: "700",
        fill: "#1f2937",
      }),
    },
    {
      id: "ice-blue",
      title: "Ice blue",
      sub: "Noto Sans KR",
      text: "\uaca8\uc6b8 \uc774\ubca4\ud2b8",
      build: () => ({
        fontFamily: "Noto Sans KR",
        fontSize: 56,
        fontWeight: "800",
        fill: linearGradientH("#e0f2fe", "#38bdf8"),
        stroke: "#0c4a6e",
        strokeWidth: 2,
      }),
    },
    {
      id: "sunset",
      title: "Sunset",
      sub: "Do Hyeon",
      text: "SUMMER",
      build: () => ({
        fontFamily: "Do Hyeon",
        fontSize: 74,
        fill: linearGradientH("#f97316", "#db2777"),
        stroke: "#7c2d12",
        strokeWidth: 1,
      }),
    },
    {
      id: "mono-tech",
      title: "Mono tech",
      sub: "ui-monospace",
      text: "v2.0",
      build: () => ({
        fontFamily: "ui-monospace, monospace",
        fontSize: 62,
        fill: "#e2e8f0",
        stroke: "#334155",
        strokeWidth: 2,
      }),
    },
    {
      id: "rose-note",
      title: "Rose note",
      sub: "Nanum Pen Script",
      text: "\uace0\ub9c8\uc6cc\uc694",
      build: () => ({
        fontFamily: "Nanum Pen Script",
        fontSize: 90,
        fill: "#f43f5e",
        shadow: new fabric.Shadow({ color: "rgba(244,63,94,.3)", blur: 10, offsetX: 0, offsetY: 5 }),
      }),
    },
    {
      id: "lime-bold",
      title: "Lime bold",
      sub: "Black Han Sans",
      text: "GO!",
      build: () => ({
        fontFamily: "Black Han Sans",
        fontSize: 88,
        fill: "#bef264",
        stroke: "#365314",
        strokeWidth: 3,
      }),
    },
    {
      id: "poster-white",
      title: "Poster white",
      sub: "Anton",
      text: "EVENT",
      build: () => ({
        fontFamily: "Anton",
        fontSize: 82,
        fill: "#ffffff",
        stroke: "#111827",
        strokeWidth: 4,
      }),
    },
    {
      id: "serif-gold",
      title: "Serif gold",
      sub: "Playfair Display",
      text: "Premium",
      build: () => ({
        fontFamily: "Playfair Display",
        fontSize: 58,
        fontWeight: "700",
        fill: linearGradientH("#fde68a", "#ca8a04"),
        stroke: "#78350f",
        strokeWidth: 1,
      }),
    },
    {
      id: "daily-kor",
      title: "Daily korea",
      sub: "IBM Plex Sans KR",
      text: "\uc624\ub298\uc758 \ud560\uc778",
      build: () => ({
        fontFamily: "IBM Plex Sans KR",
        fontSize: 52,
        fontWeight: "700",
        fill: "#1d4ed8",
      }),
    },
    {
      id: "label-box",
      title: "Label box",
      sub: "Rubik",
      text: "SALE 30%",
      build: () => ({
        fontFamily: "Rubik",
        fontSize: 56,
        fontWeight: "800",
        fill: "#111827",
        backgroundColor: "#fef08a",
      }),
    },
    {
      id: "street",
      title: "Street",
      sub: "Bangers",
      text: "WOW",
      build: () => ({
        fontFamily: "Bangers",
        fontSize: 80,
        fill: "#facc15",
        stroke: "#1f2937",
        strokeWidth: 2,
      }),
    },
    {
      id: "soft-note",
      title: "Soft note",
      sub: "Hahmlet",
      text: "\ud3ec\uadfc\ud55c \uacf5\uc9c0",
      build: () => ({
        fontFamily: "Hahmlet",
        fontSize: 48,
        fontWeight: "600",
        fill: "#7c3aed",
      }),
    },
    {
      id: "cute-gaegu",
      title: "Cute gaegu",
      sub: "Gaegu",
      text: "\uc548\ub155!",
      build: () => ({
        fontFamily: "Gaegu",
        fontSize: 78,
        fontWeight: "700",
        fill: "#ec4899",
      }),
    },
    {
      id: "clean-min",
      title: "Clean minimal",
      sub: "Inter",
      text: "Simple is best",
      build: () => ({
        fontFamily: "Inter",
        fontSize: 44,
        fontWeight: "700",
        fill: "#0f172a",
      }),
    },
    {
      id: "thick-kor",
      title: "Thick korean",
      sub: "Dongle",
      text: "\uc9c0\uae08 \ud655\uc778",
      build: () => ({
        fontFamily: "Dongle",
        fontSize: 96,
        fontWeight: "700",
        fill: "#0ea5e9",
        stroke: "#0c4a6e",
        strokeWidth: 1,
      }),
    }
  );

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

  function buildWordArtPreview(preset) {
    try {
      const pc = new fabric.StaticCanvas(null, {
        width: 620,
        height: 280,
        backgroundColor: "#f8fafc",
        enableRetinaScaling: false,
      });
      const bg = new fabric.Rect({
        left: 0,
        top: 0,
        width: 620,
        height: 280,
        fill: new fabric.Gradient({
          type: "linear",
          gradientUnits: "percentage",
          coords: { x1: 0, y1: 0, x2: 1, y2: 1 },
          colorStops: [
            { offset: 0, color: "#ffffff" },
            { offset: 1, color: "#eef2ff" },
          ],
        }),
        selectable: false,
      });
      pc.add(bg);
      const props = preset.build();
      const txt = new fabric.Textbox(preset.text, Object.assign({}, props, {
        left: pc.getWidth() / 2,
        top: pc.getHeight() / 2,
        originX: "center",
        originY: "center",
        editable: false,
        selectable: false,
        width: 540,
        textAlign: "center",
      }));
      if ((txt.fontSize || 40) > 76) {
        txt.set("fontSize", 76);
      }
      pc.add(txt);
      pc.renderAll();
      const url = pc.toDataURL({
        format: "jpeg",
        quality: 0.74,
        multiplier: 0.4,
        enableRetinaScaling: false,
      });
      pc.dispose();
      return url;
    } catch {
      return EMPTY_THUMB;
    }
  }

  function initWordArtButtons() {
    const root = document.getElementById("wordart-grid");
    if (!root) return;
    WORDART_PRESETS.forEach((p) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "wordart-btn";
      const preview = buildWordArtPreview(p);
      b.innerHTML = `
        <img class="wordart-thumb" src="${preview}" alt="${p.title} 미리보기" />
        <span class="wordart-meta">
          <span>${p.title}</span>
          <small>${p.sub}</small>
        </span>`;
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

  function tplBrand(targetCanvas = canvas) {
    const w = targetCanvas.getWidth();
    const h = targetCanvas.getHeight();
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
    targetCanvas.add(bar, title, sub);
  }

  function tplPromo(targetCanvas = canvas) {
    const w = targetCanvas.getWidth();
    const h = targetCanvas.getHeight();
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
    targetCanvas.add(bg, t1, t2);
  }

  function tplSale(targetCanvas = canvas) {
    const w = targetCanvas.getWidth();
    const h = targetCanvas.getHeight();
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
    targetCanvas.add(bg, t1, t2);
  }

  function tplQuote(targetCanvas = canvas) {
    const w = targetCanvas.getWidth();
    const h = targetCanvas.getHeight();
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
    targetCanvas.add(bg, t1, t2);
  }

  function tplCafe(targetCanvas = canvas) {
    const w = targetCanvas.getWidth();
    const h = targetCanvas.getHeight();
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
    targetCanvas.add(bg, stripe, t1, t2);
  }

  function tplYoutube(targetCanvas = canvas) {
    const w = targetCanvas.getWidth();
    const h = targetCanvas.getHeight();
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
    targetCanvas.add(bg, bar, t1, t2);
  }

  function tplMinimal(targetCanvas = canvas) {
    const w = targetCanvas.getWidth();
    const h = targetCanvas.getHeight();
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
    targetCanvas.add(bg, line, t1, t2);
  }

  function tplNeon(targetCanvas = canvas) {
    const w = targetCanvas.getWidth();
    const h = targetCanvas.getHeight();
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
    targetCanvas.add(bg, t1, t2);
  }

  function tplMagazine(targetCanvas = canvas) {
    const w = targetCanvas.getWidth();
    const h = targetCanvas.getHeight();
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
    targetCanvas.add(bg, block, t1, t2);
  }

  function tplBanner(targetCanvas = canvas) {
    const w = targetCanvas.getWidth();
    const h = targetCanvas.getHeight();
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
    targetCanvas.add(bg, t1);
  }

  function tplInvite(targetCanvas = canvas) {
    const w = targetCanvas.getWidth();
    const h = targetCanvas.getHeight();
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
    targetCanvas.add(bg, ring, t1, t2);
  }

  function tplTech(targetCanvas = canvas) {
    const w = targetCanvas.getWidth();
    const h = targetCanvas.getHeight();
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
    targetCanvas.add(bg, grid, t1, t2);
  }

  function tplBeauty(targetCanvas = canvas) {
    const w = targetCanvas.getWidth();
    const h = targetCanvas.getHeight();
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
    targetCanvas.add(bg, t1, t2);
  }

  function tplFood(targetCanvas = canvas) {
    const w = targetCanvas.getWidth();
    const h = targetCanvas.getHeight();
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
    targetCanvas.add(bg, badge, t1, t2);
  }

  function tplSeason(targetCanvas = canvas) {
    const w = targetCanvas.getWidth();
    const h = targetCanvas.getHeight();
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
    targetCanvas.add(bg, t1, t2);
  }

  function makeAutoTemplate(spec) {
    return function (targetCanvas = canvas) {
      const w = targetCanvas.getWidth();
      const h = targetCanvas.getHeight();
      const bgFill = spec.grad
        ? new fabric.Gradient({
            type: "linear",
            gradientUnits: "percentage",
            coords: spec.grad.coords || { x1: 0, y1: 0, x2: 1, y2: 1 },
            colorStops: spec.grad.stops,
          })
        : spec.bg || "#ffffff";
      const bg = new fabric.Rect({ left: 0, top: 0, width: w, height: h, fill: bgFill });
      targetCanvas.add(bg);

      if (spec.band) {
        targetCanvas.add(
          new fabric.Rect({
            left: w * (spec.band.x || 0),
            top: h * (spec.band.y || 0),
            width: w * (spec.band.w || 1),
            height: h * (spec.band.h || 0.2),
            fill: spec.band.fill || "rgba(0,0,0,.2)",
          })
        );
      }
      if (spec.badge) {
        targetCanvas.add(
          new fabric.Circle({
            radius: Math.min(w, h) * (spec.badge.r || 0.09),
            fill: spec.badge.fill || "#f59e0b",
            left: w * (spec.badge.x || 0.82),
            top: h * (spec.badge.y || 0.2),
            originX: "center",
            originY: "center",
          })
        );
      }

      const title = new fabric.IText(spec.titleText || "TITLE", {
        left: w * (spec.titleX || 0.5),
        top: h * (spec.titleY || 0.38),
        originX: spec.titleAlign === "left" ? "left" : "center",
        originY: "center",
        fontFamily: spec.titleFont || "Noto Sans KR",
        fontSize: Math.min(spec.titleMax || 72, w / (spec.titleDiv || 14)),
        fill: spec.titleColor || "#ffffff",
        fontWeight: spec.titleWeight || "800",
        textAlign: spec.titleAlign || "center",
        shadow: spec.titleShadow
          ? new fabric.Shadow(spec.titleShadow)
          : new fabric.Shadow({ color: "rgba(0,0,0,.25)", blur: 8, offsetX: 0, offsetY: 2 }),
      });
      targetCanvas.add(title);

      const sub = new fabric.IText(spec.subText || "SUB TITLE", {
        left: w * (spec.subX || 0.5),
        top: h * (spec.subY || 0.58),
        originX: spec.subAlign === "left" ? "left" : "center",
        originY: "center",
        fontFamily: spec.subFont || "Noto Sans KR",
        fontSize: Math.min(spec.subMax || 28, w / (spec.subDiv || 30)),
        fill: spec.subColor || "rgba(255,255,255,.92)",
        textAlign: spec.subAlign || "center",
      });
      targetCanvas.add(sub);

      if (spec.accentLine) {
        targetCanvas.add(
          new fabric.Rect({
            left: w * spec.accentLine.x,
            top: h * spec.accentLine.y,
            width: w * spec.accentLine.w,
            height: spec.accentLine.h || 3,
            fill: spec.accentLine.fill || "#ffffff",
          })
        );
      }
    };
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

  const EXTRA_TEMPLATE_SPECS = [
    { id: "clinic", name: "\ubcd1\uc6d0 \uc548\ub0b4", desc: "\ud074\ub9b0 \ube14\ub8e8", bg: "#eff6ff", titleText: "\uc9c4\ub8cc \uc548\ub0b4", titleColor: "#1d4ed8", subText: "\uc9c4\ub8cc\uc2dc\uac04 \xb7 \uc608\uc57d\ubb38\uc758", subColor: "#1e40af", band: { y: 0.74, h: 0.26, fill: "#dbeafe" } },
    { id: "realestate", name: "\ubd80\ub3d9\uc0b0 \ud64d\ubcf4", desc: "\ub124\uc774\ube44 \uce74\ub4dc", bg: "#111827", titleText: "OPEN HOUSE", titleColor: "#f9fafb", subText: "\uc704\uce58 \xb7 \uac00\uaca9 \xb7 \ubb38\uc758", subColor: "#d1d5db", accentLine: { x: 0.12, y: 0.66, w: 0.76, fill: "#f59e0b" } },
    { id: "fitness", name: "\ud53c\ud2b8\ub2c8\uc2a4", desc: "\ub2e4\ud06c \ub124\uc628", bg: "#020617", titleText: "BODY UP", titleColor: "#22d3ee", subText: "\uc624\ub298 \uc6b4\ub3d9 \ud50c\ub79c", subColor: "#94a3b8", badge: { x: 0.82, y: 0.22, fill: "#06b6d4" } },
    { id: "kids", name: "\ud0a4\uc988 \ud074\ub798\uc2a4", desc: "\ubc1d\uc740 \uc0c9\uc0c1", bg: "#fef9c3", titleText: "KIDS CLASS", titleColor: "#ca8a04", subText: "\ubbf8\uc220 \xb7 \uc601\uc5b4 \xb7 \ucf54\ub529", subColor: "#a16207", badge: { x: 0.85, y: 0.2, fill: "#f97316" } },
    { id: "pet", name: "\ubc18\ub824\ub3d9\ubb3c \uc18c\uc2dd", desc: "\ud30c\uc2a4\ud154 \ud551\ud06c", bg: "#fdf2f8", titleText: "PET CARE", titleColor: "#be185d", subText: "\uac74\uac15\uac80\uc9c4 \xb7 \ubbf8\uc6a9 \xb7 \ud638\ud154", subColor: "#9d174d" },
    { id: "wedding", name: "\uc6e8\ub529 \ucd08\ub300", desc: "\ub85c\ub9e8\ud2f1 \ud06c\ub9bc", bg: "#fff7ed", titleText: "WEDDING DAY", titleFont: "Playfair Display", titleColor: "#7c2d12", subText: "2026.09.20 \xb7 12:00 PM", subColor: "#9a3412" },
    { id: "travel", name: "\uc5ec\ud589 \ud328\ud0a4\uc9c0", desc: "\ube14\ub8e8 \uadf8\ub77c", grad: { stops: [{ offset: 0, color: "#38bdf8" }, { offset: 1, color: "#0ea5e9" }] }, titleText: "TRAVEL NOW", titleColor: "#ffffff", subText: "\ud56d\uacf5 \xb7 \uc219\ubc15 \xb7 \ud22c\uc5b4", subColor: "#e0f2fe" },
    { id: "job", name: "\ucc44\uc6a9 \uacf5\uace0", desc: "\uc2ec\ud50c \ub77c\uc778", bg: "#ffffff", titleText: "\ucc44\uc6a9 \uc911", titleColor: "#111827", subText: "\ud504\ub860\ud2b8 \xb7 \ub514\uc790\uc778 \xb7 \uc601\uc5c5", subColor: "#475569", accentLine: { x: 0.1, y: 0.47, w: 0.8, fill: "#2563eb" } },
    { id: "lecture", name: "\uac15\uc5f0 \uc548\ub0b4", desc: "\ud37c\ud50c \ud14c\ub9c8", grad: { stops: [{ offset: 0, color: "#7c3aed" }, { offset: 1, color: "#4c1d95" }] }, titleText: "SPECIAL TALK", titleColor: "#f5f3ff", subText: "\uc5f0\uc0ac \xb7 \uc77c\uc2dc \xb7 \uc7a5\uc18c", subColor: "#ddd6fe" },
    { id: "book", name: "\ucc45 \ud64d\ubcf4", desc: "\ubcc0\ud615 \ubc34\ub4dc", bg: "#fafaf9", titleText: "NEW BOOK", titleFont: "Merriweather", titleColor: "#1c1917", subText: "\uc2e0\uac04 \uc18c\uc2dd \xb7 \uc608\uc57d \uc911", subColor: "#57534e", band: { y: 0.7, h: 0.3, fill: "#e7e5e4" } },
    { id: "event-night", name: "\ub098\uc774\ud2b8 \uc774\ubca4\ud2b8", desc: "\ub124\uc628 \ubc34\ub4dc", bg: "#030712", titleText: "MIDNIGHT", titleColor: "#67e8f9", subText: "LIVE DJ PARTY", subColor: "#a5f3fc", band: { y: 0.68, h: 0.26, fill: "rgba(8,145,178,.2)" } },
    { id: "coffee", name: "\ucee4\ud53c \ud560\uc778", desc: "\ube0c\ub77c\uc6b4 \uce74\ud398", bg: "#f5f5f4", titleText: "COFFEE TIME", titleFont: "Do Hyeon", titleColor: "#78350f", subText: "AM 8:00 - PM 10:00", subColor: "#92400e" },
    { id: "campus", name: "\ub3d9\uc544\ub9ac \ubaa8\uc9d1", desc: "\ucea0\ud37c\uc2a4 \ud3ec\uc2a4\ud130", bg: "#ecfeff", titleText: "CAMPUS CLUB", titleColor: "#155e75", subText: "\uc2e0\uc785 \ubaa8\uc9d1 \uc911", subColor: "#0e7490", badge: { x: 0.18, y: 0.2, fill: "#06b6d4" } },
    { id: "delivery", name: "\ubc30\ub2ec \uc571 \ud64d\ubcf4", desc: "\uc624\ub80c\uc9c0 \ud398\uc774\uc9c0", bg: "#fff7ed", titleText: "DELIVERY", titleColor: "#c2410c", subText: "\ubb34\ub8cc\ubc30\ub2ec \xb7 \ud560\uc778\ucf54\ub4dc", subColor: "#ea580c", band: { y: 0.72, h: 0.22, fill: "#fed7aa" } },
    { id: "finance", name: "\uae08\uc735 \uc548\ub0b4", desc: "\uc2e0\ub8b0\ud615 \ube14\ub8e8", bg: "#eff6ff", titleText: "SMART FINANCE", titleColor: "#1e3a8a", subText: "\ub300\ucd9c \xb7 \uc801\uae08 \xb7 \uc0c1\ub2f4", subColor: "#1d4ed8" },
    { id: "yoga", name: "\uc694\uac00 \ud074\ub798\uc2a4", desc: "\ud3b8\uc548\ud55c \uadf8\ub9b0", bg: "#f0fdf4", titleText: "YOGA", titleColor: "#166534", subText: "\ub9c8\uc74c\uc758 \ud3c9\uc628", subColor: "#16a34a" },
    { id: "cleaning", name: "\ud074\ub9ac\ub2dd \uc11c\ube44\uc2a4", desc: "\ube14\ub8e8 \ud654\uc774\ud2b8", bg: "#f8fafc", titleText: "\ud074\ub9ac\ub2dd \uc11c\ube44\uc2a4", titleColor: "#0369a1", subText: "\uc785\uc8fc\uccad\uc18c \xb7 \uc0ac\ubb34\uc2e4", subColor: "#0284c7" },
    { id: "school", name: "\ud559\uc6d0 \ud64d\ubcf4", desc: "\uad50\uc721 \ud14c\ub9c8", grad: { stops: [{ offset: 0, color: "#2563eb" }, { offset: 1, color: "#1d4ed8" }] }, titleText: "\uc131\uc801 \ud5a5\uc0c1 \ud504\ub85c\uadf8\ub7a8", titleColor: "#ffffff", subText: "\uc218\ud559 \xb7 \uc601\uc5b4 \xb7 \uacfc\ud559", subColor: "#dbeafe" },
    { id: "market", name: "\ub9c8\ucf13 \uc774\ubca4\ud2b8", desc: "\uc0c9\uc0c1 \ubc30\uc9c0", bg: "#fef2f2", titleText: "WEEKEND MARKET", titleColor: "#b91c1c", subText: "\ud1a0\uc694\uc77c \xb7 \uc77c\uc694\uc77c", subColor: "#dc2626", badge: { x: 0.84, y: 0.2, fill: "#ef4444" } },
    { id: "festival", name: "\ucd95\uc81c \ud3ec\uc2a4\ud130", desc: "\ubc1d\uc740 \uadf8\ub77c\ub370", grad: { stops: [{ offset: 0, color: "#f59e0b" }, { offset: 1, color: "#ef4444" }] }, titleText: "SUMMER FESTIVAL", titleColor: "#ffffff", subText: "MUSIC \xb7 FOOD \xb7 ART", subColor: "#fffbeb" },
    { id: "run", name: "\ub7f0\ub2dd \ubaa8\uc784", desc: "\uc5d0\ub108\uc9c0 \ub808\ub4dc", bg: "#7f1d1d", titleText: "RUN CLUB", titleColor: "#fef2f2", subText: "\ub9e4\uc8fc \ud1a0\uc694\uc77c \uc624\uc804 7\uc2dc", subColor: "#fecaca" },
    { id: "music", name: "\uc74c\uc545 \ubc1c\ud45c", desc: "\uc5d8\ubc94 \ucee4\ubc84", bg: "#111827", titleText: "NEW TRACK", titleColor: "#e5e7eb", subText: "\uc9c0\uae08 \uc2a4\ud2b8\ub9ac\ubc0d \uc624\ud508", subColor: "#9ca3af", accentLine: { x: 0.15, y: 0.64, w: 0.7, fill: "#ec4899" } },
    { id: "hotel", name: "\ud638\ud154 \ud328\ud0a4\uc9c0", desc: "\uace0\uae09\uc9c4 \ube14\ub799", bg: "#0f172a", titleText: "STAY PACKAGE", titleColor: "#f8fafc", subText: "\uc870\uc2dd \ud3ec\ud568 \xb7 \ub808\uc774\ud2b8 \uccb4\ud06c\uc544\uc6c3", subColor: "#cbd5e1" },
    { id: "spring", name: "\ubd04 \ud14c\ub9c8", desc: "\ud654\uc0ac\ud55c \ud551\ud06c", bg: "#fdf2f8", titleText: "SPRING SALE", titleColor: "#db2777", subText: "\ubcf8\uc2dc\uc98c \uc2e0\uc0c1 \uc785\uace0", subColor: "#be185d" },
    { id: "winter", name: "\uaca8\uc6b8 \ud14c\ub9c8", desc: "\uc544\uc774\uc2a4 \ube14\ub8e8", bg: "#eff6ff", titleText: "WINTER DEAL", titleColor: "#1e40af", subText: "\ub530\ub73b\ud55c \uc2dc\uc98c \ud61c\ud0dd", subColor: "#1d4ed8" },
    { id: "blackfriday", name: "\ube14\ub799\ud504\ub77c\uc774\ub370\uc774", desc: "\ucd5c\ub300 \ud560\uc778", bg: "#111827", titleText: "BLACK FRIDAY", titleColor: "#facc15", subText: "\uc624\ub298\ub9cc \ud2b9\uac00", subColor: "#fde68a", band: { y: 0.7, h: 0.22, fill: "rgba(250,204,21,.15)" } },
    { id: "medical", name: "\uac74\uac15 \ucea0\ud398\uc778", desc: "\ud5ec\uc2a4 \uadf8\ub9b0", bg: "#ecfdf5", titleText: "HEALTH CHECK", titleColor: "#166534", subText: "\ubb34\ub8cc \uac80\uc9c4 \uc8fc\uac04", subColor: "#15803d" },
    { id: "app", name: "\uc571 \uc5c5\ub370\uc774\ud2b8", desc: "\ud14d\ud06c \uce74\ub4dc", grad: { stops: [{ offset: 0, color: "#1e293b" }, { offset: 1, color: "#0f172a" }] }, titleText: "APP UPDATE", titleColor: "#f8fafc", subText: "\uc2e0\uae30\ub2a5 \ucd94\uac00 \uc644\ub8cc", subColor: "#94a3b8" },
    { id: "studio", name: "\uc0ac\uc9c4\uad00 \ud64d\ubcf4", desc: "\ubd80\ub4dc\ub7ec\uc6b4 \ubd84\uc704\uae30", bg: "#faf5ff", titleText: "PHOTO STUDIO", titleColor: "#6b21a8", subText: "\uc99d\uba85\uc0ac\uc9c4 \xb7 \ud504\ub85c\ud544 \xb7 \ucee4\ud50c", subColor: "#7e22ce" },
    { id: "delivery2", name: "\ubc30\ub2ec \uc571 \uc774\ubca4\ud2b8", desc: "\ud560\uc778 \ucf54\ub4dc", bg: "#fff7ed", titleText: "COUPON DAY", titleColor: "#9a3412", subText: "\uc8fc\ubb38\uc2dc \ubc14\ub85c \uc801\uc6a9", subColor: "#c2410c", badge: { x: 0.2, y: 0.2, fill: "#fb923c" } },
    { id: "beauty2", name: "\ubdf0\ud2f0 \ucf58\ud150\uce20", desc: "\ud30c\uc2a4\ud154 \ud14c\ub9c8", grad: { stops: [{ offset: 0, color: "#fce7f3" }, { offset: 1, color: "#e9d5ff" }] }, titleText: "BEAUTY PICK", titleColor: "#9d174d", subText: "\uc8fc\uac04 \ucd94\ucc9c \ud15c", subColor: "#a21caf" },
    { id: "course", name: "\uac15\uc758 \uc2e0\uccad", desc: "\ube14\ub8e8 \ubc34\ub4dc", bg: "#eff6ff", titleText: "ONLINE COURSE", titleColor: "#1d4ed8", subText: "\ucd08\ubcf4 \xb7 \uc2ec\ud654 \xb7 \uc2e4\uc804", subColor: "#1e40af", band: { y: 0.72, h: 0.2, fill: "#bfdbfe" } }
  ];

  TEMPLATES.push(
    ...EXTRA_TEMPLATE_SPECS.map((s) => ({
      id: s.id,
      name: s.name,
      desc: s.desc,
      fn: makeAutoTemplate(s),
    }))
  );

  function buildTemplatePreview(tpl) {
    try {
      const previewCanvas = new fabric.StaticCanvas(null, {
        width: 1080,
        height: 1080,
        enableRetinaScaling: false,
        backgroundColor: "#ffffff",
      });
      tpl.fn(previewCanvas);
      previewCanvas.renderAll();
      const url = previewCanvas.toDataURL({
        format: "jpeg",
        quality: 0.72,
        multiplier: 0.22,
        enableRetinaScaling: false,
      });
      previewCanvas.dispose();
      return url;
    } catch {
      return EMPTY_THUMB;
    }
  }

  function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
  }

  function dataUrlToBlob(dataUrl) {
    return fetch(dataUrl).then((r) => r.blob());
  }

  function parseCustomRange(spec, max) {
    const out = new Set();
    const parts = String(spec || "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
    parts.forEach((p) => {
      if (p.includes("-")) {
        const [a, b] = p.split("-").map((x) => parseInt(x, 10));
        if (!Number.isFinite(a) || !Number.isFinite(b)) return;
        const start = Math.max(1, Math.min(a, b));
        const end = Math.min(max, Math.max(a, b));
        for (let i = start; i <= end; i++) out.add(i - 1);
      } else {
        const n = parseInt(p, 10);
        if (Number.isFinite(n) && n >= 1 && n <= max) out.add(n - 1);
      }
    });
    return Array.from(out).sort((x, y) => x - y);
  }

  function getDownloadIndexes() {
    const range = document.getElementById("download-range").value;
    if (range === "current") return [currentSlideIndex];
    if (range === "all") return slides.map((_, i) => i);
    const custom = document.getElementById("download-custom").value;
    return parseCustomRange(custom, slides.length);
  }

  function renderSlideDataUrl(slide, format, quality) {
    return new Promise((resolve) => {
      try {
        const sc = new fabric.StaticCanvas(null, {
          width: slide.canvasW || 1080,
          height: slide.canvasH || 1080,
          enableRetinaScaling: false,
          backgroundColor: slide.bg || "#ffffff",
        });
        sc.loadFromJSON(JSON.parse(slide.json || "{}"), () => {
          try {
            sc.renderAll();
            const data = sc.toDataURL({
              format: format === "jpg" ? "jpeg" : format,
              quality: quality || 0.9,
              multiplier: 1,
              enableRetinaScaling: false,
            });
            sc.dispose();
            resolve(data);
          } catch {
            sc.dispose();
            resolve("");
          }
        });
      } catch {
        resolve("");
      }
    });
  }

  async function exportRaster(format, indexes) {
    const ext = format === "jpg" ? "jpg" : "png";
    const urls = [];
    for (const idx of indexes) {
      const data = await renderSlideDataUrl(slides[idx], format, 0.92);
      if (data) urls.push({ idx, data });
    }
    if (!urls.length) {
      toast("다운로드할 슬라이드가 없습니다");
      return;
    }
    if (urls.length === 1) {
      const blob = await dataUrlToBlob(urls[0].data);
      downloadBlob(blob, `slide-${urls[0].idx + 1}.${ext}`);
      toast(`${ext.toUpperCase()} 다운로드 완료`);
      return;
    }
    const zip = new JSZip();
    urls.forEach((x) => {
      zip.file(`slide-${x.idx + 1}.${ext}`, x.data.split(",")[1], { base64: true });
    });
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, `slides-${Date.now()}.zip`);
    toast("여러 슬라이드를 ZIP으로 저장했습니다");
  }

  async function exportPdf(indexes) {
    const jspdfNS = window.jspdf;
    if (!jspdfNS || !jspdfNS.jsPDF) {
      toast("PDF 라이브러리를 불러오지 못했습니다");
      return;
    }
    let pdf = null;
    for (let i = 0; i < indexes.length; i++) {
      const idx = indexes[i];
      const s = slides[idx];
      const data = await renderSlideDataUrl(s, "png", 0.92);
      if (!data) continue;
      const w = s.canvasW || 1080;
      const h = s.canvasH || 1080;
      if (!pdf) {
        pdf = new jspdfNS.jsPDF({
          orientation: w >= h ? "landscape" : "portrait",
          unit: "pt",
          format: [w, h],
        });
      } else {
        pdf.addPage([w, h], w >= h ? "landscape" : "portrait");
      }
      pdf.addImage(data, "PNG", 0, 0, w, h);
    }
    if (!pdf) {
      toast("PDF 생성에 실패했습니다");
      return;
    }
    pdf.save(`slides-${Date.now()}.pdf`);
    toast("PDF 다운로드 완료");
  }

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  async function exportGifLike(indexes, fileBase) {
    if (!window.gifshot || typeof gifshot.createGIF !== "function") {
      toast("GIF 라이브러리를 불러오지 못했습니다");
      return;
    }
    const frames = [];
    for (const idx of indexes) {
      const data = await renderSlideDataUrl(slides[idx], "png", 0.92);
      if (data) frames.push(data);
    }
    if (!frames.length) {
      toast("GIF로 만들 슬라이드가 없습니다");
      return;
    }
    gifshot.createGIF(
      {
        images: frames,
        interval: 1.2,
        gifWidth: Math.min(960, slides[indexes[0]].canvasW || 960),
        gifHeight: Math.min(960, slides[indexes[0]].canvasH || 960),
      },
      async (obj) => {
        if (!obj || obj.error) {
          toast("GIF 생성에 실패했습니다");
          return;
        }
        const blob = await dataUrlToBlob(obj.image);
        downloadBlob(blob, `${fileBase}-${Date.now()}.gif`);
        toast("GIF 다운로드 완료");
      }
    );
  }

  async function exportVideo(indexes) {
    if (!window.MediaRecorder) {
      toast("이 브라우저는 동영상 내보내기를 지원하지 않습니다");
      return;
    }
    const urls = [];
    for (const idx of indexes) {
      const data = await renderSlideDataUrl(slides[idx], "png", 0.92);
      if (data) urls.push(data);
    }
    if (!urls.length) {
      toast("동영상으로 만들 슬라이드가 없습니다");
      return;
    }
    const first = slides[indexes[0]];
    const w = Math.min(1280, first.canvasW || 960);
    const h = Math.round(w * ((first.canvasH || 540) / (first.canvasW || 960)));
    const cv = document.createElement("canvas");
    cv.width = w;
    cv.height = h;
    const ctx = cv.getContext("2d");
    const stream = cv.captureStream(30);
    const chunks = [];
    let rec;
    try {
      rec = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
    } catch {
      rec = new MediaRecorder(stream);
    }
    rec.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };
    const done = new Promise((resolve) => {
      rec.onstop = () => resolve();
    });
    rec.start();
    for (const u of urls) {
      const img = await loadImage(u);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      await new Promise((r) => setTimeout(r, 1200));
    }
    rec.stop();
    await done;
    const blob = new Blob(chunks, { type: "video/webm" });
    downloadBlob(blob, `slides-${Date.now()}.webm`);
    toast("브라우저 제한으로 WEBM 형식으로 저장했습니다");
  }

  function openDownloadModal() {
    document.getElementById("download-modal").hidden = false;
  }

  function closeDownloadModal() {
    document.getElementById("download-modal").hidden = true;
  }

  async function runDownload() {
    syncCurrentSlideState();
    const format = document.getElementById("download-format").value;
    const indexes = getDownloadIndexes();
    if (!indexes.length) {
      toast("다운로드 범위를 확인해주세요");
      return;
    }
    const runBtn = document.getElementById("download-run");
    runBtn.disabled = true;
    try {
      if (format === "png" || format === "jpg") await exportRaster(format, indexes);
      else if (format === "pdf") await exportPdf(indexes);
      else if (format === "gif") await exportGifLike(indexes, "slides");
      else if (format === "loop") await exportGifLike(indexes, "loop-image");
      else if (format === "mp4") await exportVideo(indexes);
      closeDownloadModal();
    } finally {
      runBtn.disabled = false;
    }
  }

  function bindInspector() {
    const insText = document.getElementById("ins-text");
    insText.addEventListener("input", () => {
      const o = getActiveTarget();
      if (o && (o.type === "i-text" || o.type === "text")) {
        o.set("text", insText.value);
        canvas.requestRenderAll();
        scheduleHistory();
        updateLayers();
      }
    });

    document.getElementById("ins-font").addEventListener("change", (e) => {
      const o = getActiveTarget();
      if (o && (o.type === "i-text" || o.type === "text" || o.type === "textbox")) {
        o.set("fontFamily", e.target.value);
        canvas.requestRenderAll();
        flushHistory();
        renderFontPreviewList(document.getElementById("ins-font-search").value || "");
      }
    });
    document.getElementById("ins-font-search").addEventListener("input", (e) => {
      renderFontPreviewList(e.target.value || "");
    });

    document.getElementById("ins-font-size").addEventListener("input", (e) => {
      const o = getActiveTarget();
      if (o && o.type === "i-text") {
        const v = parseInt(e.target.value, 10) || 8;
        o.set("fontSize", v);
        document.getElementById("ins-size-val").textContent = v + "px";
        canvas.requestRenderAll();
        scheduleHistory();
      }
    });

    document.getElementById("ins-fill").addEventListener("input", (e) => {
      const o = getActiveTarget();
      if (!o) return;
      if (o.type === "line") o.set("stroke", e.target.value);
      else o.set("fill", e.target.value);
      canvas.requestRenderAll();
      scheduleHistory();
    });

    document.getElementById("ins-stroke").addEventListener("input", (e) => {
      const o = getActiveTarget();
      if (!o || o.type === "image") return;
      o.set("stroke", e.target.value);
      canvas.requestRenderAll();
      scheduleHistory();
    });

    document.getElementById("ins-stroke-width").addEventListener("input", (e) => {
      const o = getActiveTarget();
      if (!o || o.type === "image") return;
      o.set("strokeWidth", parseFloat(e.target.value) || 0);
      canvas.requestRenderAll();
      scheduleHistory();
    });

    document.getElementById("ins-opacity").addEventListener("input", (e) => {
      const o = getActiveTarget();
      if (!o) return;
      o.set("opacity", (parseInt(e.target.value, 10) || 0) / 100);
      canvas.requestRenderAll();
      scheduleHistory();
    });

    document.getElementById("ins-width").addEventListener("change", (e) => {
      const h = parseFloat(document.getElementById("ins-height").value) || 1;
      setObjectSizeByBox(parseFloat(e.target.value) || 1, h);
    });
    document.getElementById("ins-height").addEventListener("change", (e) => {
      const w = parseFloat(document.getElementById("ins-width").value) || 1;
      setObjectSizeByBox(w, parseFloat(e.target.value) || 1);
    });

    document.getElementById("ins-delete").addEventListener("click", () => {
      const o = canvas.getActiveObject();
      if (!o) return;
      if (o.type === "activeSelection") {
        o.getObjects().forEach((x) => canvas.remove(x));
        canvas.discardActiveObject();
      } else canvas.remove(o);
      canvas.requestRenderAll();
      flushHistory();
      updateLayers();
      updateInspector();
    });

    document.getElementById("ins-duplicate").addEventListener("click", () => {
      const o = canvas.getActiveObject();
      if (!o) return;
      if (o.type === "activeSelection") {
        toast("복제는 객체를 하나만 선택할 때 사용할 수 있어요");
        return;
      }
      fabric.util.object.clone(o, (c) => {
        c.set({ left: (c.left || 0) + 24, top: (c.top || 0) + 24 });
        canvas.add(c);
        canvas.setActiveObject(c);
        canvas.requestRenderAll();
        flushHistory();
        updateLayers();
        updateInspector();
      });
    });

    document.querySelectorAll("[data-arr]").forEach((btn) => {
      btn.addEventListener("click", () => alignObjectToCanvas(btn.getAttribute("data-arr")));
    });
    document.querySelectorAll("[data-stack]").forEach((btn) => {
      btn.addEventListener("click", () => stackObject(btn.getAttribute("data-stack")));
    });
    document.querySelectorAll("[data-flip]").forEach((btn) => {
      btn.addEventListener("click", () => flipObject(btn.getAttribute("data-flip")));
    });
  }

  function handlePlacementClick(p) {
    if (currentTool === "text") addIText(p.x, p.y);
    else if (currentTool === "rect") addRect(p.x, p.y);
    else if (currentTool === "circle") addCircle(p.x, p.y);
    else if (currentTool === "ellipse") addEllipse(p.x, p.y);
    else if (currentTool === "triangle") addTriangle(p.x, p.y);
    else if (currentTool === "diamond") addDiamond(p.x, p.y);
    else if (currentTool === "star") addStar(p.x, p.y);
    else if (currentTool === "line") addLine(p.x, p.y, false);
    else if (currentTool === "line-dash") addLine(p.x, p.y, true);
    else if (currentTool === "arrow") addArrowPath(p.x, p.y);
  }

  function init() {
    initTheme();
    document.getElementById("btn-theme").addEventListener("click", toggleTheme);
    const cloudCfg = getCloudCfg();
    document.getElementById("cloud-url").value = cloudCfg.url || "";
    document.getElementById("cloud-anon").value = cloudCfg.anon || "";
    initCloudClient();
    if (cloudClient) {
      refreshCloudSession();
      cloudClient.auth.onAuthStateChange(() => {
        refreshCloudSession();
      });
    }
    else setCloudStatus("클라우드 미연결");

    canvas = new fabric.Canvas("design-canvas", {
      preserveObjectStacking: true,
      selection: true,
      backgroundColor: "#ffffff",
    });

    const sel = document.getElementById("preset-size");
    PRESETS.forEach((p) => {
      const o = document.createElement("option");
      o.value = p.id;
      o.textContent = p.label;
      sel.appendChild(o);
    });
    sel.value = "ig";

    sel.addEventListener("change", () => applyPreset(sel.value));

    document.getElementById("canvas-bg").addEventListener("input", (e) => {
      canvas.backgroundColor = e.target.value;
      canvas.requestRenderAll();
      scheduleHistory();
    });

    setLogicalSize(logicalW, logicalH, false);
    canvas.backgroundColor = document.getElementById("canvas-bg").value;
    canvas.renderAll();

    history.length = 0;
    historyStep = -1;
    pushHistory();

    document.getElementById("zoom-out").addEventListener("click", () => applyDisplayZoom(displayScale / 1.12));
    document.getElementById("zoom-in").addEventListener("click", () => applyDisplayZoom(displayScale * 1.12));
    document.getElementById("zoom-fit").addEventListener("click", () => fitZoom());
    window.addEventListener("resize", () => {
      clearTimeout(window._fitZ);
      window._fitZ = setTimeout(fitZoom, 150);
    });

    document.getElementById("btn-undo").addEventListener("click", undo);
    document.getElementById("btn-redo").addEventListener("click", redo);
    document.getElementById("btn-export-png").addEventListener("click", openDownloadModal);
    document.getElementById("download-close").addEventListener("click", closeDownloadModal);
    document.getElementById("download-x").addEventListener("click", closeDownloadModal);
    document.getElementById("download-cancel").addEventListener("click", closeDownloadModal);
    document.getElementById("download-run").addEventListener("click", runDownload);
    document.getElementById("download-range").addEventListener("change", (e) => {
      document.getElementById("download-custom").hidden = e.target.value !== "custom";
    });

    document.getElementById("btn-save-project").addEventListener("click", saveCurrentProject);
    document.getElementById("btn-new-project").addEventListener("click", newProject);
    document.getElementById("btn-slide-add").addEventListener("click", () => addSlide(true));
    document.getElementById("btn-slide-dup").addEventListener("click", () => addSlide(false));
    document.getElementById("btn-slide-del").addEventListener("click", deleteSlide);
    document.getElementById("btn-slide-move-prev").addEventListener("click", () => moveSlideOrder(-1));
    document.getElementById("btn-slide-move-next").addEventListener("click", () => moveSlideOrder(1));
    document.getElementById("btn-apply-slide-size").addEventListener("click", applyCustomSlideSize);
    document.getElementById("cloud-connect").addEventListener("click", connectCloud);
    document.getElementById("cloud-signup").addEventListener("click", cloudSignUp);
    document.getElementById("cloud-login").addEventListener("click", cloudLogin);
    document.getElementById("cloud-logout").addEventListener("click", cloudLogout);
    document.getElementById("cloud-save-now").addEventListener("click", cloudSaveCurrent);
    document.getElementById("cloud-pull").addEventListener("click", cloudPullAll);
    document.getElementById("btn-open-work-browser").addEventListener("click", openWorkBrowser);
    document.getElementById("work-title-click").addEventListener("click", openWorkBrowser);
    document.getElementById("work-browser-close").addEventListener("click", closeWorkBrowser);
    document.getElementById("work-browser-x").addEventListener("click", closeWorkBrowser);
    document.getElementById("project-folder").addEventListener("change", (e) => {
      currentFolderId = e.target.value || DEFAULT_FOLDER_ID;
      renderWorkList();
    });

    document.querySelectorAll(".tool-btn[data-tool]").forEach((btn) => {
      btn.addEventListener("click", () => setTool(btn.dataset.tool));
    });

    document.querySelectorAll("[data-frame]").forEach((btn) => {
      btn.addEventListener("click", () => {
        addFrame(btn.getAttribute("data-frame"));
        setTool("select");
        toast("프레임을 추가했습니다");
      });
    });

    initWordArtButtons();
    initIconSearch();
    initMyFilesPanel();
    ensureFolders();
    renderFolderSelect();
    renderWorkList();
    slides = [makeSlideFromCanvas()];
    currentSlideIndex = 0;
    updateSlideUi();
    queueCurrentSlideThumbRefresh();

    document.getElementById("img-upload").addEventListener("change", (e) => {
      const f = e.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        fabric.Image.fromURL(r.result, (img) => {
          const maxW = Math.min(480, logicalW * 0.65);
          if (img.width > maxW) img.scaleToWidth(maxW);
          img.set({
            left: logicalW / 2,
            top: logicalH / 2,
            originX: "center",
            originY: "center",
          });
          canvas.add(img);
          canvas.setActiveObject(img);
          if (tryClipImageToFrame(img)) {
            toast("프레임에 맞췄습니다");
          }
          canvas.requestRenderAll();
          flushHistory();
          updateLayers();
          updateInspector();
          setTool("select");
        });
      };
      r.readAsDataURL(f);
      e.target.value = "";
    });

    const tplRoot = document.getElementById("template-list");
    TEMPLATES.forEach((tpl) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "tpl-btn";
      const thumb = buildTemplatePreview(tpl);
      b.innerHTML = `
        <img class="tpl-thumb" src="${thumb}" alt="${tpl.name} 미리보기" />
        <span class="tpl-meta">
          <strong>${tpl.name}</strong>
          <small>${tpl.desc}</small>
        </span>`;
      b.addEventListener("click", () => clearAndTemplate(tpl.fn));
      tplRoot.appendChild(b);
    });

    const fontSel = document.getElementById("ins-font");
    FONTS.forEach((f) => {
      const o = document.createElement("option");
      o.value = f.v;
      o.textContent = f.l;
      fontSel.appendChild(o);
    });

    bindInspector();

    canvas.on("selection:created", () => {
      updateInspector();
      updateLayers();
    });
    canvas.on("selection:updated", () => {
      updateInspector();
      updateLayers();
    });
    canvas.on("selection:cleared", () => {
      updateInspector();
      updateLayers();
    });
    canvas.on("object:modified", (e) => {
      if (e.target && e.target.type === "image") {
        tryClipImageToFrame(e.target);
      }
      scheduleHistory();
      updateLayers();
      updateInspector();
    });
    canvas.on("object:moving", () => updateLayers());
    canvas.on("text:changed", () => {
      updateLayers();
      scheduleHistory();
    });

    canvas.on("mouse:down", (opt) => {
      if (currentTool === "select") return;
      if (opt.target) {
        setTool("select");
        canvas.setActiveObject(opt.target);
        canvas.requestRenderAll();
        updateInspector();
        updateLayers();
        return;
      }
      const p = canvas.getPointer(opt.e);
      handlePlacementClick(p);
      setTool("select");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeWorkBrowser();
        closeDownloadModal();
      }
      if (e.ctrlKey && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if (e.ctrlKey && (e.key.toLowerCase() === "y" || (e.shiftKey && e.key.toLowerCase() === "z"))) {
        e.preventDefault();
        redo();
      }
      const tag = (e.target && e.target.tagName) || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "Delete" || e.key === "Backspace") {
        const o = canvas.getActiveObject();
        if (!o) return;
        if (o.type === "i-text" && o.isEditing) return;
        if (o.type === "activeSelection") {
          o.getObjects().forEach((x) => canvas.remove(x));
          canvas.discardActiveObject();
        } else canvas.remove(o);
        canvas.requestRenderAll();
        flushHistory();
        updateLayers();
        updateInspector();
      }
      if (e.key === "v" || e.key === "V") setTool("select");
      if (e.key === "t" || e.key === "T") setTool("text");
    });

    setTool("select");
    fitZoom();
    updateLayers();
    updateInspector();
    updateUndoRedoButtons();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
