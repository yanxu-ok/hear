(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],[
/*!*******************************!*\
  !*** F:/test/1312312/main.js ***!
  \*******************************/
/*! no static exports found */function(e,t,n){"use strict";(function(e,t){n(/*! uni-pages */4);var r=c(n(/*! vue */2)),o=c(n(/*! ./App */5)),u=c(n(/*! ./store/index.js */12)),i=c(n(/*! ./index.js */40));function c(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}r.default.use(i.default),r.default.config.productionTip=!1,r.default.filter("titleFilter",(function(e,t){return e&&e.length>t?e.slice(0,t)+"...":e})),o.default.mpType="app";var s=e.getBackgroundAudioManager();r.default.prototype.$audio=s;var p=new r.default(f({store:u.default},o.default));t(p).$mount()}).call(this,n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["default"],n(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */1)["createApp"])},,,,
/*!*******************************!*\
  !*** F:/test/1312312/App.vue ***!
  \*******************************/
/*! no static exports found */,function(e,t,n){"use strict";n.r(t);var r=n(/*! ./App.vue?vue&type=script&lang=js& */6);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);n(/*! ./App.vue?vue&type=style&index=0&lang=scss& */9);var u,i,c,a,f=n(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */11),l=Object(f["default"])(r["default"],u,i,!1,null,null,null,!1,c,a);l.options.__file="App.vue",t["default"]=l.exports},
/*!********************************************************!*\
  !*** F:/test/1312312/App.vue?vue&type=script&lang=js& ***!
  \********************************************************/
/*! no static exports found */function(e,t,n){"use strict";n.r(t);var r=n(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=script&lang=js& */7),o=n.n(r);for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);t["default"]=o.a},
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test/1312312/App.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(n(/*! ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator */72)),o=n(/*! vuex */8);function u(e){return e&&e.__esModule?e:{default:e}}function i(e,t,n,r,o,u,i){try{var c=e[u](i),a=c.value}catch(f){return void n(f)}c.done?t(a):Promise.resolve(a).then(r,o)}function c(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var u=e.apply(t,n);function c(e){i(u,r,o,c,a,"next",e)}function a(e){i(u,r,o,c,a,"throw",e)}c(void 0)}))}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var s={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")},data:function(){return{timer:null}},methods:f({},(0,o.mapActions)(["update_history"]),{startHstoryTimer:function(){this.timer=setInterval(this.history,4e3)},cleanHstoryTimer:function(){clearInterval(this.timer)},history:function(){var e=this;return c(r.default.mark((function t(){var n,o,u,i;return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if("zhangjie"!=e.type){t.next=8;break}return n={topicId:e.zhangjieList[e.currectPlayIndex].topicId,chapterId:e.zhangjieList[e.currectPlayIndex].chapterId,listenProgress:e.$audio.currentTime},t.next=4,e.update_history(n);case 4:o=t.sent,console.log("记录播放进度",o),t.next=14;break;case 8:return console.log(e.audioInfo,"互听、播放"),u={topicId:e.audioInfo.articleId,chapterId:e.audioInfo.audioId,listenProgress:e.$audio.currentTime},t.next=12,e.update_history(u);case 12:i=t.sent,console.log("记录播放进度",i);case 14:case"end":return t.stop()}}),t)})))()}}),computed:f({},(0,o.mapState)({currectPlayIndex:function(e){return e.play.currectPlayIndex},zhangjieList:function(e){return e.play.zhangjieList},paused:function(e){return e.app.paused},type:function(e){return e.app.type},audioInfo:function(e){return e.huting.audioInfo}})),watch:{paused:function(e,t){console.log(e),e?this.cleanHstoryTimer():this.startHstoryTimer()}}};t.default=s},
/*!*****************************************************************!*\
  !*** F:/test/1312312/App.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************/
/*! no static exports found */,function(e,t,n){"use strict";n.r(t);var r=n(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./App.vue?vue&type=style&index=0&lang=scss& */10),o=n.n(r);for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);t["default"]=o.a},
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/test/1312312/App.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */function(e,t,n){}],[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map