window.onload=function(){var o=Math.round(+new Date/1e3);if(console.log("T."+localStorage.puTS+"/"+o),void 0===localStorage.puTS||parseInt(localStorage.puTS)<=o-3600)for(var t=document.getElementsByTagName("a"),e=0,a=t.length;e<a;e++)t[e].onclick=function(t){var e=this.getAttribute("href"),a=this.getAttribute("target");"#"!==e&&"javascript:void(0)"!==e&&(t.preventDefault(),"_blank"==a&&window.open(window.location.href),window.open("https://grunoaph.net/4/5322855"),window.location.href=e,localStorage.puTS=o)}};
