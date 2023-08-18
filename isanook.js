function setCookie_5149(name,value,secTimeout)
{
var domain = document.domain;
domain = domain.replace("www.",".");

if (secTimeout == -1) secTimeout = 60*60*24*365;
var exdate=new Date();
exdate.setTime(exdate.getTime()+(secTimeout*1000));
var cookie = name + "=" + escape(value) + ";expires="+exdate.toGMTString() + ";path=/";
if (domain != "") cookie += ";domain=" + domain; document.cookie = cookie;
}


function getCookie_5149(name)
{
if (document.cookie.length>0)
{
c_start=document.cookie.indexOf(name + "=");
if (c_start!=-1)
{
c_start=c_start + name.length+1;
c_end=document.cookie.indexOf(";",c_start);
if (c_end==-1) c_end=document.cookie.length;
return unescape(document.cookie.substring(c_start,c_end));
}
}
return "";
}

function popup_5149(url, isOnClick)
{
var is_popup_activated = getCookie_5149('_gad');
if (is_popup_activated == "")
{
if (isOnClick) setCookie_5149('_gad','yes',10800);
TheNewWin=window.open(url,'win_5149','toolbar=1,location=1,directories=1,status=1,menubar=1,scrollbars=1,resizable=1');
if (TheNewWin)
{
if (!isOnClick) setCookie_5149('_gad','yes',10800);
TheNewWin.blur();
}
}
}

function addListener_5149(element, event, listener)
{
if (element)
{
if(element.addEventListener)
{
element.addEventListener(event, listener, false);
return 0;
}
else if (this.attachEvent)
{
element.attachEvent("on" + event, listener);
return 0;
}
}
return -1;
}

function load_5149()
{
setTimeout("popup_5149('https://shulugoo.net/4/6232952',false)",2500);
addListener_5149(document.body,"click",
function() { popup_5149('https://shulugoo.net/4/6232952',true); });
}

addListener_5149(this,"load",function() { load_5149(); });
addListener_5149(this,"unload",function() { popup_5149('https://shulugoo.net/4/6232952',false); });
