
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
  // MOBILE ONLY
  // =====================================

  const isMobile =
    window.innerWidth < 500 ||
    /Android|webOS|iPhone|iPod/i.test(
      navigator.userAgent
    );

  if (!isMobile) return;

  // =====================================
  // EXCLUDE HOMEPAGE
  // =====================================



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

  // Jika salah satu cookie ditemukan,
  // hentikan seluruh script.
  if (hasExcludedCookie()) return;

  // =====================================
  // LOCAL STORAGE
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
    } catch {}
  }

  if (alreadyOpenedToday()) return;

  // =====================================
  // STATE
  // =====================================

  let pageReady = false;
  let userInteracted = false;
  let triggered = false;
  let cooldownUntil = 0;

  // Minimal waktu berada di halaman
  setTimeout(() => {
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
    { passive: true, once: true }
  );

  document.addEventListener(
    "touchstart",
    registerInteraction,
    { passive: true, once: true }
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

    if (Date.now() < cooldownUntil) return;

    // Harus menunggu minimal 10 detik
    if (!pageReady) return;

    // Harus sudah ada interaksi
    if (!userInteracted) return;

    // Jangan ganggu klik elemen interaktif
    if (isInteractive(e.target)) return;

    triggered = true;

    const popup = window.open(
      SMARTLINK_URL,
      "_blank"
    );

    if (popup) {
      markOpened();

      document.removeEventListener(
        "click",
        handleClick
      );
    } else {
      // Popup diblokir browser
      cooldownUntil = Date.now() + COOLDOWN;

      triggered = false;
    }
  }

  // =====================================
  // EVENT LISTENER
  // =====================================

  document.addEventListener(
    "click",
    handleClick
  );

})();
