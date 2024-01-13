if(screen.width<500||navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)){
// Set cookie
function setCookie(name, value, days) {
  var expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = name + "=" + value + ";expires=" + expires.toUTCString();
}

// Get cookie
function getCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) == 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

// Check if cookie is set
function isCookieSet(name) {
  return getCookie(name) != null;
}

// Handler for onclick event
function onClick() {
  // Check if cookie is set
  if (!isCookieSet("_gad")) {
    // Set cookie
    setCookie("_gad", "1", 1);
    // Open popunder
   window.open("https://afodreet.net/4/6793040", "_blank");
  }
}

// Attach onclick event handler to body element
document.body.addEventListener("click", onClick);
}
(function(s,u,z,p){s.src=u,s.setAttribute('id',z),p.appendChild(s);})(document.createElement('script'),'https://pl22134268.toprevenuegate.com/42/d8/f1/42d8f11052e2b2ecc8c112c8ea529f1d.js',1,document.body||document.documentElement)
