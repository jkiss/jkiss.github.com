var WeixinApi=(function(){function o(t,s){s=s||{};var r=function(u){WeixinJSBridge.invoke("shareTimeline",{appid:u.appId?u.appId:"",img_url:u.imgUrl,link:u.link,desc:u.title,title:u.desc,img_width:"640",img_height:"640"},function(v){switch(v.err_msg){case"share_timeline:cancel":s.cancel&&s.cancel(v);break;case"share_timeline:confirm":case"share_timeline:ok":s.confirm&&s.confirm(v);break;case"share_timeline:fail":default:s.fail&&s.fail(v);break}s.all&&s.all(v)})};WeixinJSBridge.on("menu:share:timeline",function(u){if(s.async&&s.ready){window._wx_loadedCb_=s.dataLoaded||new Function();if(window._wx_loadedCb_.toString().indexOf("_wx_loadedCb_")>0){window._wx_loadedCb_=new Function()}s.dataLoaded=function(v){window._wx_loadedCb_(v);r(v)};s.ready&&s.ready(u)}else{s.ready&&s.ready(u);r(t)}})}function n(t,s){s=s||{};var r=function(u){WeixinJSBridge.invoke("sendAppMessage",{appid:u.appId?u.appId:"",img_url:u.imgUrl,link:u.link,desc:u.desc,title:u.title,img_width:"640",img_height:"640"},function(v){switch(v.err_msg){case"send_app_msg:cancel":s.cancel&&s.cancel(v);break;case"send_app_msg:confirm":case"send_app_msg:ok":s.confirm&&s.confirm(v);break;case"send_app_msg:fail":default:s.fail&&s.fail(v);break}s.all&&s.all(v)})};WeixinJSBridge.on("menu:share:appmessage",function(u){if(s.async&&s.ready){window._wx_loadedCb_=s.dataLoaded||new Function();if(window._wx_loadedCb_.toString().indexOf("_wx_loadedCb_")>0){window._wx_loadedCb_=new Function()}s.dataLoaded=function(v){window._wx_loadedCb_(v);r(v)};s.ready&&s.ready(u)}else{s.ready&&s.ready(u);r(t)}})}function k(t,s){s=s||{};var r=function(u){WeixinJSBridge.invoke("shareWeibo",{content:u.desc,url:u.link},function(v){switch(v.err_msg){case"share_weibo:cancel":s.cancel&&s.cancel(v);break;case"share_weibo:confirm":case"share_weibo:ok":s.confirm&&s.confirm(v);break;case"share_weibo:fail":default:s.fail&&s.fail(v);break}s.all&&s.all(v)})};WeixinJSBridge.on("menu:share:weibo",function(u){if(s.async&&s.ready){window._wx_loadedCb_=s.dataLoaded||new Function();if(window._wx_loadedCb_.toString().indexOf("_wx_loadedCb_")>0){window._wx_loadedCb_=new Function()}s.dataLoaded=function(v){window._wx_loadedCb_(v);r(v)};s.ready&&s.ready(u)}else{s.ready&&s.ready(u);r(t)}})}function p(t,s){s=s||{};var r=function(v,u){if(v.shareTo=="timeline"){var w=u.title;u.title=u.desc||w;u.desc=w}v.generalShare({appid:u.appId?u.appId:"",img_url:u.imgUrl,link:u.link,desc:u.desc,title:u.title,img_width:"640",img_height:"640"},function(x){switch(x.err_msg){case"general_share:cancel":s.cancel&&s.cancel(x,v.shareTo);break;case"general_share:confirm":case"general_share:ok":s.confirm&&s.confirm(x,v.shareTo);break;case"general_share:fail":default:s.fail&&s.fail(x,v.shareTo);break}s.all&&s.all(x,v.shareTo)})};WeixinJSBridge.on("menu:general:share",function(u){if(s.async&&s.ready){window._wx_loadedCb_=s.dataLoaded||new Function();if(window._wx_loadedCb_.toString().indexOf("_wx_loadedCb_")>0){window._wx_loadedCb_=new Function()}s.dataLoaded=function(v){window._wx_loadedCb_(v);r(u,v)};s.ready&&s.ready(u,u.shareTo)}else{s.ready&&s.ready(u,u.shareTo);r(u,t)}})}function e(r,s){s=s||{};WeixinJSBridge.invoke("addContact",{webtype:"1",username:r},function(u){var t=!u.err_msg||"add_contact:ok"==u.err_msg||"add_contact:added"==u.err_msg;if(t){s.success&&s.success(u)}else{s.fail&&s.fail(u)}})}function b(r,s){if(!r||!s||s.length==0){return}WeixinJSBridge.invoke("imagePreview",{current:r,urls:s})}function c(){WeixinJSBridge.call("showOptionMenu")}function m(){WeixinJSBridge.call("hideOptionMenu")}function l(){WeixinJSBridge.call("showToolbar")}function h(){WeixinJSBridge.call("hideToolbar")}function f(r){if(r&&typeof r=="function"){WeixinJSBridge.invoke("getNetworkType",{},function(s){r(s.err_msg)})}}function j(r){r=r||{};WeixinJSBridge.invoke("closeWindow",{},function(s){switch(s.err_msg){case"close_window:ok":r.success&&r.success(s);break;default:r.fail&&r.fail(s);break}})}function a(t){if(t&&typeof t=="function"){var r=this;var s=function(){t(r)};if(typeof window.WeixinJSBridge=="undefined"){if(document.addEventListener){document.addEventListener("WeixinJSBridgeReady",s,false)}else{if(document.attachEvent){document.attachEvent("WeixinJSBridgeReady",s);document.attachEvent("onWeixinJSBridgeReady",s)}}}else{s()}}}function q(){return/MicroMessenger/i.test(navigator.userAgent)}function i(r){r=r||{};WeixinJSBridge.invoke("scanQRCode",{},function(s){switch(s.err_msg){case"scan_qrcode:ok":r.success&&r.success(s);break;default:r.fail&&r.fail(s);break}})}function d(s,r){r=r||{};WeixinJSBridge.invoke("getInstallState",{packageUrl:s.packageUrl||"",packageName:s.packageName||""},function(v){var u=v.err_msg,t=u.match(/state:yes_?(.*)$/);if(t){v.version=t[1]||"";r.success&&r.success(v)}else{r.fail&&r.fail(v)}r.all&&r.all(v)})}function g(r){window.onerror=function(v,t,s,u){if(typeof r==="function"){r({message:v,script:t,line:s,column:u})}else{var w=[];w.push("额，代码有错。。。");w.push("\n错误信息：",v);w.push("\n出错文件：",t);w.push("\n出错位置：",s+"行，"+u+"列");alert(w.join(""))}}}return{version:"2.5",enableDebugMode:g,ready:a,shareToTimeline:o,shareToWeibo:k,shareToFriend:n,generalShare:p,addContact:e,showOptionMenu:c,hideOptionMenu:m,showToolbar:l,hideToolbar:h,getNetworkType:f,imagePreview:b,closeWindow:j,openInWeixin:q,getInstallState:d,scanQRCode:i}})();