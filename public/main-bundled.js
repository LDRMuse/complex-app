!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";function n(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}a.r(t);var r=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.injectHTML(),this.headerSearchIcon=document.querySelector(".header-search-icon"),this.overlay=document.querySelector(".search-overlay"),this.closeIcon=document.querySelector(".close-live-search"),this.inputField=document.querySelector("#live-search-field"),this.resultsArea=document.querySelector("#live-search-results"),this.loaderIcon=document.querySelector(".circle-loader"),this.typingWaitTimer,this.previousValue="",this.events()}var t,a,r;return t=e,(a=[{key:"events",value:function(){var e=this;this.inputField.addEventListener("keyup",(function(){return e.keyPressHandler()})),this.closeIcon.addEventListener("click",(function(){return e.closeOverlay()})),this.headerSearchIcon.addEventListener("click",(function(t){t.preventDefault(),e.openOverlay()}))}},{key:"keyPressHandler",value:function(){var e=this,t=this.inputField.value;""!=t&&t!=this.previousValue&&(clearTimeout(this.typingWaitTimer),this.showLoaderIcon(),this.typingWaitTimer=setTimeout((function(){return e.sendRequest()}),3e3)),this.previousValue=t}},{key:"sendRequest",value:function(){alert("send request method just ran!!!")}},{key:"showLoaderIcon",value:function(){this.loaderIcon.classList.add("circle-loader--visible")}},{key:"openOverlay",value:function(){var e=this;this.overlay.classList.add("search-overlay--visible"),setTimeout((function(){return e.inputField.focus()}),50)}},{key:"closeOverlay",value:function(){this.overlay.classList.remove("search-overlay--visible")}},{key:"injectHTML",value:function(){document.body.insertAdjacentHTML("beforeend",' <div class="search-overlay">\n    <div class="search-overlay-top shadow-sm">\n      <div class="container container--narrow">\n        <label for="live-search-field" class="search-overlay-icon"><i class="fas fa-search"></i></label>\n        <input type="text" id="live-search-field" class="live-search-field" placeholder="What are you interested in?">\n        <span class="close-live-search"><i class="fas fa-times-circle"></i></span>\n      </div>\n    </div>\n\n    <div class="search-overlay-bottom">\n      <div class="container container--narrow py-3">\n        <div class="circle-loader"></div>\n        <div class="live-search-results">\n          <div class="list-group shadow-sm">\n            <div class="list-group-item active"><strong>Search Results</strong> (4 items found)</div>\n\n            <a href="#" class="list-group-item list-group-item-action">\n              <img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"> <strong>Example Post #1</strong>\n              <span class="text-muted small">by barksalot on 0/14/2019</span>\n            </a>\n            <a href="#" class="list-group-item list-group-item-action">\n              <img class="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"> <strong>Example Post #2</strong>\n              <span class="text-muted small">by brad on 0/12/2019</span>\n            </a>\n            <a href="#" class="list-group-item list-group-item-action">\n              <img class="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128"> <strong>Example Post #3</strong>\n              <span class="text-muted small">by barksalot on 0/14/2019</span>\n            </a>\n            <a href="#" class="list-group-item list-group-item-action">\n              <img class="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"> <strong>Example Post #4</strong>\n              <span class="text-muted small">by brad on 0/12/2019</span>\n            </a>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>')}}])&&n(t.prototype,a),r&&n(t,r),e}();document.querySelector(".header-search-icon")&&new r}]);