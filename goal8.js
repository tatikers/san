
(function () {
  "use strict";

  // =====================================
  // CONFIGURATION
  // =====================================

   const SMARTLINK_URL = "https://hai8g.com/4/12177271";

  const MIN_TIME = 10000; // 10 detik
  const COOLDOWN = 30000; // 30 detik

  const STORAGE_KEY = "smartlink_opened_date";

  // Cookie yang menyebabkan popunder tidak aktif
  const EXCLUDED_COOKIES = [
    "utablexh_utable",
    "utablexh_type",
    "utablexh_idx",
    "utablexh_secret"
  ];

  // =====================================
  // PREVENT DOUBLE INITIALIZATION
  // =====================================

  const SCRIPT_KEY = "__smartlink_popunder_v3__";

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
  // LOCAL DATE
  // =====================================

  function today() {
    const d = new Date();

    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  }

  // =====================================
  // STORAGE
  // =====================================

  function alreadyOpenedToday() {
    try {
      return (
        localStorage.getItem(STORAGE_KEY) === today()
      );
    } catch {
      return false;
    }
  }

  function markOpened() {
    try {
      localStorage.setItem(STORAGE_KEY, today());
      return true;
    } catch {
      return false;
    }
  }

  if (alreadyOpenedToday()) return;

  // =====================================
  // STATE
  // =====================================

  let pageReady = false;
  let userInteracted = false;
  let triggered = false;

  // Tunggu minimal 10 detik
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

    return target.closest(
      "a, button, input, textarea, select, label, " +
      "[role='button'], [onclick]"
    );
  }

  // =====================================
  // SMARTLINK HANDLER
  // =====================================

  function handleClick(e) {

    if (triggered) return;

    if (!pageReady) return;

    if (!userInteracted) return;

    if (isInteractive(e.target)) return;

    // Tandai agar tidak dipanggil berkali-kali
    triggered = true;

    // Simpan sebelum membuka smartlink
    markOpened();

    // Buka smartlink
    window.open(
      SMARTLINK_URL,
      "_blank"
    );

    // Hapus event listener
    document.removeEventListener(
      "click",
      handleClick
    );
  }

  // =====================================
  // EVENT LISTENER
  // =====================================

  document.addEventListener(
    "click",
    handleClick
  );

})();
