(function () {
  "use strict";

  // =====================================
  // CONFIGURATION
  // =====================================

  const SMARTLINK_URL = "https://hai8g.com/4/12177271";

  const MIN_TIME = 10000; // 10 detik

  const STORAGE_KEY = "smartlink_new_visitor";

  // Cookie yang membuat smartlink tidak aktif
  const EXCLUDED_COOKIES = [
  "utablexh_utable",
    "utablexh_type",
    "utablexh_idx",
    "utablexh_secret"
  ];


  // =====================================
  // PREVENT DOUBLE INITIALIZATION
  // =====================================

  const SCRIPT_KEY = "__smartlink_popunder_v4__";

  if (window[SCRIPT_KEY]) return;

  window[SCRIPT_KEY] = true;


  // =====================================
  // MOBILE ONLY
  // =====================================

  const isMobile =
    window.innerWidth < 500 ||
    /Android|webOS|iPhone|iPod/i.test(
      navigator.userAgent
    );

  if (!isMobile) return;


  // =====================================
  // COOKIE CHECK
  // =====================================

  function hasExcludedCookie() {
    const cookies = document.cookie
      .split(";")
      .map(cookie =>
        cookie.trim().split("=")[0]
      );

    return EXCLUDED_COOKIES.some(name =>
      cookies.includes(name)
    );
  }

  if (hasExcludedCookie()) return;


  // =====================================
  // NEW VISITOR CHECK
  // =====================================

  function hasVisitedBefore() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  }

  function markVisitor() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
  }


  // Kalau sudah pernah datang, jangan aktifkan
  if (hasVisitedBefore()) return;


  // Tandai sejak awal kunjungan
  markVisitor();


  // =====================================
  // STATE
  // =====================================

  let pageReady = false;
  let userInteracted = false;
  let triggered = false;


  // =====================================
  // WAIT 10 SECONDS
  // =====================================

  setTimeout(function () {
    pageReady = true;
  }, MIN_TIME);


  // =====================================
  // USER INTERACTION
  // =====================================

  function registerInteraction() {
    userInteracted = true;
  }

  document.addEventListener(
    "scroll",
    registerInteraction,
    {
      passive: true,
      once: true
    }
  );

  document.addEventListener(
    "touchstart",
    registerInteraction,
    {
      passive: true,
      once: true
    }
  );


  // =====================================
  // INTERACTIVE ELEMENT CHECK
  // =====================================

  function isInteractive(target) {

    if (
      !target ||
      typeof target.closest !== "function"
    ) {
      return false;
    }

    return !!target.closest(
      [
        "a",
        "button",
        "input",
        "textarea",
        "select",
        "label",
        "summary",
        "iframe",
        "video",
        "audio",
        "[role='button']",
        "[onclick]",
        "[tabindex]",
        "[contenteditable='true']"
      ].join(",")
    );
  }


  // =====================================
  // SMARTLINK HANDLER
  // =====================================

  function handleClick(e) {

    // Sudah pernah dipicu
    if (triggered) return;

    // Belum 10 detik
    if (!pageReady) return;

    // Belum ada interaksi pengguna
    if (!userInteracted) return;

    // Jangan ganggu link/button/form
    if (isInteractive(e.target)) return;


    // ===================================
    // TRIGGER
    // ===================================

    triggered = true;


    // Buka smartlink
    window.open(
      SMARTLINK_URL,
      "_blank"
    );


    // Jangan proses klik berikutnya
    document.removeEventListener(
      "click",
      handleClick
    );
  }


  // =====================================
  // CLICK LISTENER
  // =====================================

  document.addEventListener(
    "click",
    handleClick
  );

})();
