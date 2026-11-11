(function () {
  const isMobile =
    screen.width < 500 ||
    /Android|webOS|iPhone|iPod/i.test(navigator.userAgent);
  if (!isMobile) return;

  const path = window.location.pathname;
  const isHomePage =
    path === "/" || path === "/index.html" ||
    path === "/index.php" || path === "";
  if (isHomePage) return;

  const storage = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); return true; } catch { return false; } },
  };

  function isPopunderShownToday() {
    const data = storage.get("popunder_shown");
    if (!data) return false;
    try {
      const p = JSON.parse(data);
      const now = new Date(), last = new Date(p.date);
      return now.getFullYear() === last.getFullYear() &&
             now.getMonth() === last.getMonth() &&
             now.getDate() === last.getDate();
    } catch { return false; }
  }

  function markPopunderShown() {
    storage.set("popunder_shown", JSON.stringify({ date: new Date().toISOString() }));
  }

  if (isPopunderShownToday()) return;

  function isInteractive(el) {
    if (!el || typeof el.closest !== "function") return false;
    return el.closest(
      'a, button, input, textarea, select, label, [role="button"], [onclick]'
    );
  }

  let triggered = false;
  let cooldownUntil = 0;

  function handler(e) {
    if (triggered) return;
    if (Date.now() < cooldownUntil) return;
    if (isInteractive(e.target)) return;

    triggered = true;

    const win = window.open(
      "https://hai8g.com/4/12177271", // ganti!
      "_blank"
    );

    if (win) {
      markPopunderShown();
    } else {
      // popup diblokir → cooldown 30 detik, jangan spam
      cooldownUntil = Date.now() + 30000;
      triggered = false;
    }
  }

  const target = document.body || document.documentElement;
  target.addEventListener("click", handler); // TANPA passive:true
})();
