(function(s,u,z,p){s.src=u,s.setAttribute('crossorigin',z),p.appendChild(s);})(document.createElement('script'),'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6961031237754826','anonymous',document.head||document.documentElement)
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
   window.open("https://obqj2.com/4/5331671", "_blank");
  }
}

// Attach onclick event handler to body element
document.body.addEventListener("click", onClick);
}
