if (
  screen.width < 500 ||
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPod/i)
) {
  // Fungsi cek apakah popunder sudah muncul hari ini
  function isPopunderShownToday() {
    const data = localStorage.getItem("popunder_shown");
    if (!data) return false;

    try {
      const parsed = JSON.parse(data);
      const now = new Date();
      const lastShown = new Date(parsed.date);
      return (
        now.getFullYear() === lastShown.getFullYear() &&
        now.getMonth() === lastShown.getMonth() &&
        now.getDate() === lastShown.getDate()
      );
    } catch (e) {
      return false;
    }
  }

  // Tandai bahwa popunder sudah ditampilkan
  function markPopunderShown() {
    const now = new Date();
    localStorage.setItem("popunder_shown", JSON.stringify({ date: now.toISOString() }));
  }

  // Flag untuk mencegah klik berulang
  let alreadyClicked = false;

  if (!isPopunderShownToday()) {
    document.body.addEventListener("click", function () {
      if (alreadyClicked) return;
      alreadyClicked = true;

      markPopunderShown();
      window.open("https://obqj2.com/4/7242003", "_blank");
    });
  }
}
