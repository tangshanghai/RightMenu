!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("RightMenu",[],t):"object"==typeof exports?exports.RightMenu=t():e.RightMenu=t()}("undefined"!=typeof self?self:this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(1),a=function(e){return e&&e.__esModule?e:{default:e}}(i);n(2);var s=function(){function e(){var t=this;r(this,e),this.itemClickHandler=function(e){var n=e.currentTarget,r=n.guid,o=n.layerIndex;n.isChildren?t.showUL(n,r,o,2):(t.callback&&t.callback(n.mark),t.destroy())},this.itemOverHandler=function(e){var n=e.currentTarget,r=n.guid,o=n.layerIndex;t.showUL(n,r,o,t.delayTimer)},this.contextmenuHandler=function(e){e.preventDefault(),e.stopPropagation(),console.log("右键点击事件右键点击事件右键点击事件")},this.mousedownHandler=function(e){function n(e){var t=e.dom;if(t==o||t.contains(o))return void(i=!0);for(var r=0;r<e.lis.length;r++){var a=e.lis[r];a.ulObj&&n(a.ulObj)}}var r=e||window.event,o=r.target,i=!1;n(t.mainMenu),i||t.destroy()},console.log("==============RightMenu 0.0.1================="),this.mainMenu=null,this.callback=null,this.timer=null,this.delayTimer=500}return o(e,[{key:"show",value:function(e,t){this.mainMenu&&this.destroy(),document.addEventListener("mousedown",this.mousedownHandler),this.callback=t,this.createMenu(e)}},{key:"createMenu",value:function(e){var t=e.menus;this.mainMenu=this.createMenuUl(t,1,"");var n=this.mainMenu.dom;document.body.appendChild(n),n.style.zIndex=a.default.getMaxZindex();var r=n.offsetWidth,o=n.offsetHeight,i=document.body.clientWidth,s=document.body.clientHeight,l=e.event.clientX,u=e.event.clientY;l+r>i&&(l=Math.min(l-r,i-r)),u+o>s&&(u=Math.min(u-o,s-o)),n.style.left=l+"px",n.style.top=u+"px"}},{key:"createMenuUl",value:function(e,t,n){var r={type:"ul",dom:document.createElement("ul"),lis:[]},o=r.dom;o.classList.add("right-menu-tsh");for(var i=0;i<e.length;i++){var a=this.createMenuItem(e[i],t,n);o.appendChild(a.dom),r.lis.push(a)}return r}},{key:"createMenuItem",value:function(e,t,n){var r={type:"li",dom:document.createElement("li"),ulObj:null,guid:a.default.GUID(),parentGuid:n,layerIndex:t},o=r.dom;if(o.classList.add("rm-menuitem"),o.guid=r.guid,o.layerIndex=r.layerIndex,o.mark=e.mark,e.divider)return o.classList.add("divider"),r;var i=e.shortKey||"";e.menus&&e.menus.length>0&&(i='<span class="arrow"></span>',o.isChildren=!0,r.ulObj=this.createMenuUl(e.menus,t+1,r.guid));var s="<label>"+e.title+'</label><span class="icon">'+i+"</span>";return o.innerHTML=s,e.disabled&&o.classList.add("disabled"),o.addEventListener("click",this.itemClickHandler),o.addEventListener("mouseover",this.itemOverHandler),o.addEventListener("contextmenu",this.contextmenuHandler),r}},{key:"showUL",value:function(e,t,n,r){function o(e,t,r){for(var i=0;i<e.length;i++){var a=e[i];a.guid===t?(s=a,l=r):a.layerIndex===n?u.push(a):a.ulObj&&o(a.ulObj.lis,t,a)}}function i(e){for(var t=0;t<e.length;t++){var n=e[t];n.dom.className.indexOf("selected")>-1&&n.dom.classList.remove("selected"),n.ulObj&&i(n.ulObj.lis)}}var a=this,s=null,l=null,u=[];o(this.mainMenu.lis,t,null),l&&-1===l.dom.className.indexOf("selected")&&l.dom.classList.add("selected"),i(u),clearTimeout(this.timer),this.timer=setTimeout(function(){a.delayShowUL(e,s,l,u)},r)}},{key:"delayShowUL",value:function(e,t,n,r){function o(e){for(var t=0;t<e.length;t++){var n=e[t];n.ulObj&&(n.ulObj.dom.parentNode&&n.ulObj.dom.parentNode.removeChild(n.ulObj.dom),o(n.ulObj.lis))}}if(o(r),t.ulObj){t.ulObj.lis.length>0&&o(t.ulObj.lis);var i=e.offsetWidth,s=document.body.clientWidth,l=document.body.clientHeight,u=e.getBoundingClientRect(),c=i+u.left,d=u.top;c+i>s&&(c-=2*i);var f=t.ulObj.dom;document.body.appendChild(f),f.style.zIndex=a.default.getMaxZindex();var h=f.offsetHeight;d+h>l&&(d=Math.min(d,l-h)),f.style.left=c+"px",f.style.top=d+"px"}}},{key:"destroy",value:function(){function e(n){var r=n.dom;r.parentNode&&r.parentNode.removeChild(r);for(var o=0;o<n.lis.length;o++){var i=n.lis[o];i.dom.removeEventListener("click",t.itemClickHandler),i.dom.removeEventListener("mouseover",t.itemOverHandler),i.dom.addEventListener("contextmenu",t.contextmenuHandler),i.ulObj&&e(i.ulObj)}}document.removeEventListener("mousedown",this.mousedownHandler);var t=this;e(this.mainMenu)}}]),e}();t.default=s},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=function(){function e(){r(this,e)}return o(e,[{key:"GUID",value:function(){var e=(new Date).getTime();return"xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var n=(e+16*Math.random())%16|0;return e=Math.floor(e/16),("x"==t?n:3&n|8).toString(16)})}},{key:"getMaxZindex",value:function(){for(var e=document.body,t=e.children||e.childNodes,n=0,r=0;r<t.length;r++){var o=t[r],i=parseInt(this.getClass(o,"z-index")),a=parseInt(o.style.zIndex),s=a||i;isNaN(s)||s>n&&(n=s)}return n+=10}},{key:"getClass",value:function(e,t){return e.currentStyle?e.currentStyle[t]:getComputedStyle(e,!1)[t]}}]),e}();t.default=new i},function(e,t,n){var r=n(3);"string"==typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0};o.transform=void 0;n(5)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){t=e.exports=n(4)(!1),t.push([e.i,".right-menu-tsh *{box-sizing:border-box;pointer-events:all}.right-menu-tsh{list-style:none;width:260px;padding:3px 0;background-color:#fff;border:1px solid #bababa;box-shadow:0 0 15px -3px #000;position:fixed;left:0;top:0;pointer-events:none}.right-menu-tsh li{width:100%;height:24px;line-height:24px;display:flex;justify-content:space-between;color:#000;cursor:default;padding:0 20px}.right-menu-tsh li label{max-width:150px;overflow:hidden;text-overflow:ellipsis}.right-menu-tsh li .icon{color:#a1a192;max-width:60px;overflow:hidden;text-overflow:ellipsis}.right-menu-tsh li .icon .arrow{display:inline-block;width:10px;height:10px;border:2px solid #a1a192;border-top:none;border-left:none;transform:rotate(-45deg);margin-right:3px}.right-menu-tsh li.selected,.right-menu-tsh li.selected .icon,.right-menu-tsh li:hover,.right-menu-tsh li:hover .icon{color:#fff;background-color:#3999ff}.right-menu-tsh li.selected .arrow,.right-menu-tsh li:hover .arrow{border-color:#fff}.right-menu-tsh li.divider{color:#a1a192;height:0;border:none;border-top:1px solid #f2f2f2;margin:4px 0}.right-menu-tsh li.disabled{color:#a1a192;pointer-events:none}.right-menu-tsh li *{pointer-events:none}",""])},function(e,t){function n(e,t){var n=e[1]||"",o=e[3];if(!o)return n;if(t&&"function"==typeof btoa){var i=r(o);return[n].concat(o.sources.map(function(e){return"/*# sourceURL="+o.sourceRoot+e+" */"})).concat([i]).join("\n")}return[n].join("\n")}function r(e){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(e))))+" */"}e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var r=n(t,e);return t[2]?"@media "+t[2]+"{"+r+"}":r}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=p[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(c(r.parts[i],t))}else{for(var a=[],i=0;i<r.parts.length;i++)a.push(c(r.parts[i],t));p[r.id]={id:r.id,refs:1,parts:a}}}}function o(e,t){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],a=t.base?i[0]+t.base:i[0],s=i[1],l=i[2],u=i[3],c={css:s,media:l,sourceMap:u};r[a]?r[a].parts.push(c):n.push(r[a]={id:a,parts:[c]})}return n}function i(e,t){var n=v(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=y[y.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),y.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var o=v(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,o)}}function a(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=y.indexOf(e);t>=0&&y.splice(t,1)}function s(e){var t=document.createElement("style");return e.attrs.type="text/css",u(t,e.attrs),i(e,t),t}function l(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",u(t,e.attrs),i(e,t),t}function u(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function c(e,t){var n,r,o,i;if(t.transform&&e.css){if(!(i=t.transform(e.css)))return function(){};e.css=i}if(t.singleton){var u=x++;n=b||(b=s(t)),r=d.bind(null,n,u,!1),o=d.bind(null,n,u,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=l(t),r=h.bind(null,n,t),o=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(t),r=f.bind(null,n),o=function(){a(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}function d(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=w(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function f(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function h(e,t,n){var r=n.css,o=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||i)&&(r=g(r)),o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}var p={},m=function(e){var t;return function(){return void 0===t&&(t=e.apply(this,arguments)),t}}(function(){return window&&document&&document.all&&!window.atob}),v=function(e){var t={};return function(n){if(void 0===t[n]){var r=e.call(this,n);if(r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[n]=r}return t[n]}}(function(e){return document.querySelector(e)}),b=null,x=0,y=[],g=n(6);e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");t=t||{},t.attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=m()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=o(e,t);return r(n,t),function(e){for(var i=[],a=0;a<n.length;a++){var s=n[a],l=p[s.id];l.refs--,i.push(l)}if(e){r(o(e,t),t)}for(var a=0;a<i.length;a++){var l=i[a];if(0===l.refs){for(var u=0;u<l.parts.length;u++)l.parts[u]();delete p[l.id]}}}};var w=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(o))return e;var i;return i=0===o.indexOf("//")?o:0===o.indexOf("/")?n+o:r+o.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}}]).default});