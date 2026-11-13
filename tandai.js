(function () {
  "use strict";

  const STORAGE_KEY = "smartlink_new_visitor";

  try {
    if (localStorage.getItem(STORAGE_KEY) === null) {
      localStorage.setItem(STORAGE_KEY, "1");
    }
  } catch (e) {
    // LocalStorage tidak tersedia
  }

})();
