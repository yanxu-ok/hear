(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/audio/zaudio"],{

/***/ 359:
/*!************************************************!*\
  !*** F:/hear/hear/components/audio/zaudio.vue ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _zaudio_vue_vue_type_template_id_1629a830_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zaudio.vue?vue&type=template&id=1629a830&scoped=true& */ 360);
/* harmony import */ var _zaudio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./zaudio.vue?vue&type=script&lang=js& */ 362);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _zaudio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _zaudio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _zaudio_vue_vue_type_style_index_0_id_1629a830_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./zaudio.vue?vue&type=style&index=0&id=1629a830&scoped=true&lang=scss& */ 364);
/* harmony import */ var _D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _zaudio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _zaudio_vue_vue_type_template_id_1629a830_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _zaudio_vue_vue_type_template_id_1629a830_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1629a830",
  null,
  false,
  _zaudio_vue_vue_type_template_id_1629a830_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/audio/zaudio.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 360:
/*!*******************************************************************************************!*\
  !*** F:/hear/hear/components/audio/zaudio.vue?vue&type=template&id=1629a830&scoped=true& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_template_id_1629a830_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./zaudio.vue?vue&type=template&id=1629a830&scoped=true& */ 361);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_template_id_1629a830_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_template_id_1629a830_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_template_id_1629a830_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_template_id_1629a830_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 361:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/hear/hear/components/audio/zaudio.vue?vue&type=template&id=1629a830&scoped=true& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 362:
/*!*************************************************************************!*\
  !*** F:/hear/hear/components/audio/zaudio.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./zaudio.vue?vue&type=script&lang=js& */ 363);
/* harmony import */ var _D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 363:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/hear/hear/components/audio/zaudio.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} //
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default =
{
  data: function data() {
    return {
      current: '00:00', //当前播放时间
      duration: '00:00', //总时长
      current_value: 0, //slider当前进度
      duration_value: 100, //slider总长度
      paused: true, //是否处于暂停状态
      default_cover: 'https://zijing-sz.oss-cn-shenzhen.aliyuncs.com/api_upload/2019-11-06_15_26_32_735247.png', //默认海报
      hassrc: '', //////////////正在播放的音频
      info: {} };

  },

  props: {
    oldinfo: Object
    /*************
                    			info对象 {
                    				src, 音频地址
                    				title, 标题
                    				singer, 作者
                    				coverImgUrl  海报
                    			}
                    		*/,

    theme: {
      type: String, // 主题 'music' or 'fm'
      default: 'fm' },

    themeColor: {
      type: String,
      default: '#42b983' },

    stepShow: {
      //是否显示快进后退按钮
      type: Boolean,
      default: true } },


  // computed: {
  // 	info() {
  // 		console.log(this.oldinfo,1111);
  // 		return this.oldinfo 
  // 	}
  // },
  watch: {
    oldinfo: function oldinfo(newValue, oldValue) {
      if (!newValue) {
        return;
      }
      this.info = newValue; // 里面有当前时间
      // this.$audio.src=newValue.src
      // this.$audio.play();
      this.audioPlay(); // 将播放的进度传进去
    } },


  created: function created() {var _this = this;var _this$$store$state$ap =






    this.$store.state.app.playinfo,duration = _this$$store$state$ap.duration,current = _this$$store$state$ap.current,duration_value = _this$$store$state$ap.duration_value,current_value = _this$$store$state$ap.current_value,src = _this$$store$state$ap.src;
    this.hassrc = src;
    // console.log(this.info, 1, this.hassrc);

    //对比 新的音频与旧音频 地址  从而渲染 对应进度条
    // console.log(this.info.src , this.hassrc,'新的和旧的');

    if (this.info.src == this.hassrc) {
      this.current = current;
      this.duration_value = duration_value;
      this.duration = duration;
      this.current_value = current_value;
      this.paused = this.$store.state.app.paused;
    } else if (this.hassrc) {
      this.current = current;
      this.duration_value = duration_value;
      this.duration = duration;
      this.current_value = current_value;
      this.paused = this.$store.state.app.paused;
    }

    this.$audio.onCanplay(function () {});
    this.$audio.onPlay(function () {
      // console.log('++++++++++++++++++', 111111111111111111);
      console.log('++++++++++++++++++', _this.$audio.currentTime, '开始播放');
      _this.paused = false;
      _this.saveplay('src', _this.info.src);
      _this.$store.commit('setpause', false); //记录音频正常停止 false
      _this.$store.commit('set_n_pause', false); //标记音频异常中断 为false 用于电话来电中断音频的判断

      // console.log('onplay');
      _this.duration = _this.format(_this.$audio.duration);
      _this.duration_value = _this.$audio.duration;
      _this.saveplay('duration', _this.duration);
      _this.saveplay('duration_value', _this.duration_value);
    });

    this.$audio.onPause(function () {
      _this.paused = true;
      _this.$store.commit('setpause', true); //记录音频正常停止 true
    });

    this.$audio.onStop(function () {
      _this.paused = true;
      _this.$store.commit('setpause', true); //记录音频正常停止 true
    });

    this.$audio.onEnded(function () {
      _this.paused = true;
      _this.$store.commit('setpause', true); //记录音频正常停止 true
      _this.$audio.startTime = 0;
      _this.current = _this.format('0');
      _this.current_value = '0';
      _this.saveplay('current', _this.current);
      _this.saveplay('current_value', _this.current_value);
    });

    this.$audio.onTimeUpdate(function () {

      // console.log(1,this.info.src,this.$store.state.app.playinfo.src);
      // if (this.info.src == this.$store.state.app.playinfo.src) {
      _this.current = _this.format(_this.$audio.currentTime);
      _this.current_value = _this.$audio.currentTime;
      // console.log(this.current, this.current_value,this.duration_value,this.duration);
      _this.saveplay('current', _this.current);
      _this.saveplay('current_value', _this.$audio.currentTime);
      _this.duration = _this.format(_this.$audio.duration);
      _this.duration_value = _this.$audio.duration;
      _this.saveplay('duration', _this.duration);
      _this.saveplay('duration_value', _this.duration_value);
      // }
    });
    this.$audio.onError(function () {
      _this.paused = true;
      _this.$store.commit('setpause', true);
      _this.$api.msg('音频播放错误');

      _this.$store.commit('setaudio', {
        src: '',
        title: '',
        singer: '',
        coverImgUrl: '' });

      _this.$store.commit('setplay', {
        current: 0,
        current_value: 0,
        duration: 0,
        duration_value: 0 });

    });
  },

  methods: {
    saveplay: function saveplay(type, e) {
      //记录播放信息
      this.$store.commit('setplay', _defineProperty({},
      type, e));

    },
    timeupdate: function timeupdate() {var _this$$store$state$ap2 =



      this.$store.state.app.playinfo,current = _this$$store$state$ap2.current,current_value = _this$$store$state$ap2.current_value;
      this.current = current;
      this.current_value = current_value;
    },
    changing: function changing(event) {
      this.current_value = event.detail.value;
      console.log(this.current_value);
      this.current = this.format(event.detail.value);
    },

    format: function format(num) {
      try {
        return (
          '0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(Math.floor(
          num % 60)).length) + Math.floor(num % 60));

      } catch (e) {
        return (
          '0'.repeat(3 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(Math.floor(
          num % 60)).length) + Math.floor(num % 60));

      }
    },

    operation: function operation() {
      console.log(this.hassrc);
      if (this.hassrc != this.info.src) {
        if (this.paused) {var _this$info =





          this.info,src = _this$info.src,title = _this$info.title,singer = _this$info.singer,poster = _this$info.poster;
          // console.log(this.info);
          this.$store.commit('setaudio', {
            src: src,
            title: title,
            singer: singer,
            coverImgUrl: poster || this.default_cover });

          this.$audio.src = src;
          this.$audio.title = title;
          this.$audio.singer = singer;
          this.$audio.coverImgUrl = poster || this.default_cover;
          this.$audio.play();
          this.$audio.startTime = 0;
          this.$audio.seek(0);
          this.hassrc = src;
          this.paused = false;

        } else {
          this.$audio.pause();
          this.paused = true;
          this.$store.commit('set_n_pause', true); //标记音频异常中断
        }
      } else {
        if (this.paused) {var _this$$store$state$ap3 =





          this.$store.state.app.audio,_src = _this$$store$state$ap3.src,_title = _this$$store$state$ap3.title,_singer = _this$$store$state$ap3.singer,coverImgUrl = _this$$store$state$ap3.coverImgUrl;
          this.$audio.src = _src;
          this.$audio.title = _title;
          this.$audio.singer = _singer;
          this.$audio.coverImgUrl = coverImgUrl || this.default_cover;
          this.$audio.play();
          this.$audio.startTime = parseFloat(this.$store.state.app.playinfo.current_value);
          this.$audio.seek(parseFloat(this.$store.state.app.playinfo.current_value));
          this.$store.commit('setaudio', {
            src: _src,
            title: _title,
            singer: _singer,
            coverImgUrl: coverImgUrl || this.default_cover });

          this.hassrc = _src;
          this.paused = false;
        } else {
          this.$audio.pause();
          this.paused = true;
          this.$store.commit('set_n_pause', true);
        }
      }
    },

    // 音频源切换事件
    audioPlay: function audioPlay() {
      if (this.hassrc != this.info.src) {
        console.log('音频不一样');var _this$info2 =






        this.info,src = _this$info2.src,title = _this$info2.title,singer = _this$info2.singer,poster = _this$info2.poster,historyDate = _this$info2.historyDate;
        this.$store.commit('setaudio', {
          src: src,
          title: title,
          singer: singer,
          coverImgUrl: poster || this.default_cover });

        // console.log(this.$store.state.app.audio);
        this.saveplay('src', src);
        this.$audio.src = src;
        this.$audio.title = title;
        this.$audio.singer = singer;
        this.$audio.coverImgUrl = poster || this.default_cover;
        this.$audio.play();
        this.$audio.startTime = historyDate;
        this.$audio.seek(historyDate);
        this.hassrc = src;
        this.paused = false;
        this.$store.commit('setpause', false);
      } else {
        console.log('音频相同');
        // const {
        // 	src,
        // 	title,
        // 	singer,
        // 	coverImgUrl
        // } = this.$store.state.app.audio;
        // this.$audio.src = src;
        // this.$audio.title = title;
        // this.$audio.singer = singer;
        // this.$audio.coverImgUrl = coverImgUrl || this.default_cover;
        // this.$audio.play();
        // this.$audio.startTime = parseFloat(this.$store.state.app.playinfo.current_value);
        // this.$audio.seek(parseFloat(this.$store.state.app.playinfo.current_value));
        // this.$store.commit('setaudio', {
        // 	src: src,
        // 	title: title,
        // 	singer: singer,
        // 	coverImgUrl: coverImgUrl || this.default_cover
        // });
        // this.hassrc = src;
        this.paused = false;
        this.$store.commit('setpause', false);
      }
    },

    // // 音频暂停 
    // audioStop(){
    // 	this.$audio.pause()
    // },

    //完成拖动事件
    change: function change(e) {
      this.$audio.seek(e.detail.value);
    },

    step: function step(type) {
      var pos = !type ? this.current_value - 15 : this.current_value + 15;
      this.$audio.seek(pos);
    }

    // // 播放还是暂停
    // playOrPause(){
    // 	if()
    // 	this.$audio.stop()
    // }
  } };exports.default = _default;

/***/ }),

/***/ 364:
/*!**********************************************************************************************************!*\
  !*** F:/hear/hear/components/audio/zaudio.vue?vue&type=style&index=0&id=1629a830&scoped=true&lang=scss& ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_style_index_0_id_1629a830_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./zaudio.vue?vue&type=style&index=0&id=1629a830&scoped=true&lang=scss& */ 365);
/* harmony import */ var _D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_style_index_0_id_1629a830_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_style_index_0_id_1629a830_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_style_index_0_id_1629a830_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_style_index_0_id_1629a830_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_2_8_11_20200907_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_zaudio_vue_vue_type_style_index_0_id_1629a830_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 365:
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!F:/hear/hear/components/audio/zaudio.vue?vue&type=style&index=0&id=1629a830&scoped=true&lang=scss& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/audio/zaudio.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/audio/zaudio-create-component',
    {
        'components/audio/zaudio-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(359))
        })
    },
    [['components/audio/zaudio-create-component']]
]);
