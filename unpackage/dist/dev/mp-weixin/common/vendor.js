(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context????????????
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// ??????????????????
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime ??????????????? uni ???????????????????????????????????? uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// ?????? api ???????????????
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue ??? false ???????????????????????????????????????????????????????????????????????????
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// ??????????????????
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// ???????????? key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}????????????????????? key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// ???????????? returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// ??????????????? api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// ?????? api ??????????????????
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// ?????? api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:??????[' + service + ']?????????' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // ?????? Vue.prototype ???????????????
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('?????? Vue ??? data ???????????????????????? data ???????????????????????? data ?????????????????? vm ??????????????????????????????????????????????????????', data);
      }
    }
  } else {
    try {
      // ??? data ?????????
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // ????????????????????? render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // ?????????????????????????????????????????????
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // ??????????????????????????? $slots ??? props??????????????? vueSlots ????????? $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO ???????????? mpvue ??? mp ??????
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for ???????????????????????????', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent ????????????????????? event ??????
  if (isCustom) {// ???????????????
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// ???????????????????????? event ??? detail ??????
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent ?????????????????????
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // ???????????? scoped slots ??????????????????????????????????????????
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('?????????????????????');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // ????????? web-view ?????? dataset ?????????
  if (!eventOpts) {
    return console.warn('?????????????????????');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao ?????????????????? scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // ??????????????????????????????????????????????????????????????????????????????
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// ?????????????????????????????????????????????????????? onShow ??? onLaunch ??????
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// ?????? ???2.2.3 ????????????????????? 2.3.0 ??? nextTick ??????
          console.error('?????????????????????????????????????????? ?????????????????????-??????-????????????-????????????????????? ?????????`2.3.0`??????');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm ???????????? globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // ??????????????? globalData
  appOptions.globalData = vm.$options.globalData || {};
  // ??? methods ?????????????????? getApp() ???
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // ??????????????????(????????????:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // ??????????????????
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail ?????????,value ?????????(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // ?????? multipleSlots ??????????????? bug??????????????????????????? ??? u-list?????????????????????
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // ??????????????????
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // ????????? vue ??????
        this.$vm = new VueComponent(options);

        // ??????$slots,$scopedSlots???????????????????????????$slots???
        initSlots(this.$vm, properties.vueSlots);

        // ???????????? setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // ????????? props ???????????? true????????????????????? false ????????? created,ready ??????, ??? attached ?????????
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // ?????? mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 1000:
/*!*************************************************************************!*\
  !*** F:/hear/hear/node_modules/multi-platform-toolkit/src/Platform1.ts ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];}
  result["default"] = mod;
  return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var wx = __importStar(__webpack_require__(/*! ../node_modules/weixin-js-sdk/index.js */ 14));
var ijsbridge_1 = __webpack_require__(/*! ijsbridge */ 15);
var define_1 = __webpack_require__(/*! ./define */ 1001);
console.log(wx, ijsbridge_1.WebBridgeApi, 11111);
var ua = window.navigator.userAgent.toLowerCase();
var isWeiXin = function isWeiXin() {
  var match = ua.match(/MicroMessenger/i);
  if (match === null) {
    return false;
  }
  if (match.includes('micromessenger')) {
    return true;
  }
  return false;
};
var isApp = function isApp() {
  return ua.indexOf("chuangqi") != -1 ? true : false;
};
var isWeChatApplet = function isWeChatApplet() {
  if (ua.indexOf('micromessenger') == -1) {
    return false;
  } else
  {
    wx.miniProgram.getEnv(function (res) {
      if (res.miniprogram) {
        return true;
      } else
      {
        return false;
      }
    });
    return false;
  }
};
var Platform = function () {
  function Platform() {
    this.env = this.isPlatform();
  }
  Platform.prototype.isPlatform = function () {
    if (isWeiXin()) {
      return define_1.WebToolkitApiConstants.H5;
    } else
    if (isApp()) {
      return define_1.WebToolkitApiConstants.AppH5;
    } else
    if (isWeChatApplet()) {
      return define_1.WebToolkitApiConstants.MpWeixin;
    } else
    {
      return define_1.WebToolkitApiConstants.H5;
    }
  };
  Platform.prototype.getPlatform = function () {
    return this.env;
  };
  return Platform;
}();
exports.default = Platform;

/***/ }),

/***/ 1001:
/*!**********************************************************************!*\
  !*** F:/hear/hear/node_modules/multi-platform-toolkit/src/define.ts ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.TAG = 'multi-platform-toolkit';
var WebToolkitApiConstants;
(function (WebToolkitApiConstants) {
  WebToolkitApiConstants["AppH5"] = "APP-h5";
  WebToolkitApiConstants["H5"] = "H5";
  WebToolkitApiConstants["MpWeixin"] = "MP-WEIXIN";
})(WebToolkitApiConstants = exports.WebToolkitApiConstants || (exports.WebToolkitApiConstants = {}));
var BridgeMode;
(function (BridgeMode) {
  BridgeMode[BridgeMode["Development"] = 1] = "Development";
  BridgeMode[BridgeMode["Production"] = 2] = "Production";
})(BridgeMode = exports.BridgeMode || (exports.BridgeMode = {}));

/***/ }),

/***/ 11:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 110:
/*!***************************************************************!*\
  !*** F:/hear/hear/components/mescroll-uni/mescroll-mixins.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // mescroll-body ??? mescroll-uni ??????

// import MescrollUni from "./mescroll-uni.vue";
// import MescrollBody from "./mescroll-body.vue";

var MescrollMixin = {
  // components: { // ???H5???????????????mixin????????????, ?????????main.js?????????????????????????????????????????????
  // 	MescrollUni,
  // 	MescrollBody
  // },
  data: function data() {
    return {
      mescroll: null //mescroll????????????
    };
  },
  // ????????????????????????????????? (??????down.native???true?????????, ?????????pages??????enablePullDownRefresh:true;????????????mescroll-native?????????)
  onPullDownRefresh: function onPullDownRefresh() {
    this.mescroll && this.mescroll.onPullDownRefresh();
  },
  // ????????????????????????,????????????????????????????????????,???????????????????????????????????????????????? (??????????????????????????????,???????????????????????????, ??????mescroll-body??????)
  onPageScroll: function onPageScroll(e) {
    this.mescroll && this.mescroll.onPageScroll(e);
  },
  // ??????????????????????????????,?????????????????? (??????????????????????????????,???????????????????????????, ??????mescroll-body??????)
  onReachBottom: function onReachBottom() {
    this.mescroll && this.mescroll.onReachBottom();
  },
  methods: {
    // mescroll????????????????????????,????????????mescroll??????
    mescrollInit: function mescrollInit(mescroll) {
      this.mescroll = mescroll;
      this.mescrollInitByRef(); // ???????????????????????????
    },
    // ???ref??????????????????mescroll?????? (???????????????????????????: http://www.mescroll.com/qa.html?v=20200107#q26)
    mescrollInitByRef: function mescrollInitByRef() {
      if (!this.mescroll || !this.mescroll.resetUpScroll) {
        var mescrollRef = this.$refs.mescrollRef;
        if (mescrollRef) this.mescroll = mescrollRef.mescroll;
      }
    },
    // ????????????????????? (mixin??????resetUpScroll)
    downCallback: function downCallback() {var _this = this;
      if (this.mescroll.optUp.use) {
        this.mescroll.resetUpScroll();
      } else {
        setTimeout(function () {
          _this.mescroll.endSuccess();
        }, 500);
      }
    },
    // ?????????????????????
    upCallback: function upCallback() {var _this2 = this;
      // mixin????????????500??????????????????
      setTimeout(function () {
        _this2.mescroll.endErr();
      }, 500);
    } },

  mounted: function mounted() {
    this.mescrollInitByRef(); // ???????????????????????????, ???????????????@init???@init??????????????????ref?????????
  } };var _default =



MescrollMixin;exports.default = _default;

/***/ }),

/***/ 12:
/*!********************************************!*\
  !*** F:/hear/hear/libs/hear-util/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.arrChaji = exports.getStatusBarHeight = exports.getScreenHeight = exports.isLogin = exports.s_to_hs = exports.nowTimeStr = exports.isApp = exports.formatDate = exports.cleanStorg = exports.getCurrectStorg = exports.setCurrectStorg = exports.changeArr = void 0; // ??????????????????    ???????????? ????????????
var changeArr = function changeArr(arr) {
  var newArr = [];

  arr.forEach(function (item, index) {
    item.image = item.bannerImage;
  });
  return arr;
};

// ??? ?????????????????????
exports.changeArr = changeArr;var setCurrectStorg = function setCurrectStorg(key, value) {
  uni.setStorageSync(key, value);
};


// ????????????
exports.setCurrectStorg = setCurrectStorg;var getCurrectStorg = function getCurrectStorg(key) {
  var value = uni.getStorageSync(key);
  return value;
};

// ????????????
exports.getCurrectStorg = getCurrectStorg;var cleanStorg = function cleanStorg() {
  // const value = uni.getStorageSync(key);
  uni.clearStorageSync();
  // return value
};


// ??????????????????
exports.cleanStorg = cleanStorg;var formatDate = function formatDate(key, value) {
  // var _d = new Date("2018/01/01 00:00:00");
  var _d = new Date(key);
  _d = new Date(_d.valueOf() + value * 1000); // ??????????????????1??????
  var _d_year111 = _d.getFullYear(); //???
  var _d_month111 = _d.getMonth() + 1; //???        
  _d_month111 = _d_month111 < 10 ? "0" + _d_month111 : _d_month111;
  var _d_day111 = _d.getDate(); //???
  _d_day111 = _d_day111 < 10 ? "0" + _d_day111 : _d_day111;
  var _d_hours111 = _d.getHours();
  var _d_minutes111 = _d.getMinutes();
  var _d_seconds111 = _d.getSeconds();
  if (_d_hours111 < 10) _d_hours111 = "0" + _d_hours111;
  if (_d_minutes111 < 10) _d_minutes111 = "0" + _d_minutes111;
  if (_d_seconds111 < 10) _d_seconds111 = "0" + _d_seconds111;

  var _data = _d_hours111 + ":" + _d_minutes111 + ":" + _d_seconds111;
  return _data;
};

// ???????????????????????????
exports.formatDate = formatDate;var isApp = function isApp() {
  if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
    return 'weixin';
  } else if (navigator.userAgent.toLowerCase().indexOf("chuangqi") != -1) {
    return 'chuangqi';
  } else {
    return 'web';
  }
};exports.isApp = isApp;

var nowTimeStr = function nowTimeStr() {
  var str, colorhead, colorfoot;

  var yy = objD.getYear();

  if (yy < 1900) yy = yy + 1900;
  var MM = objD.getMonth() + 1;

  if (MM < 10) MM = '0' + MM;
  var dd = objD.getDate();

  if (dd < 10) dd = '0' + dd;
  var hh = objD.getHours();

  if (hh < 10) hh = '0' + hh;
  var mm = objD.getMinutes();

  if (mm < 10) mm = '0' + mm;
  var ss = objD.getSeconds();

  if (ss < 10) ss = '0' + ss;
  var ww = objD.getDay();

  if (ww == 0) colorhead = "";

  if (ww > 0 && ww < 7) colorhead = "";

  str = colorhead + yy + "???" + MM + "???" + dd + "???   " + hh + ":" + mm + ":" + ss + " ";

  return str;
};

/**
    * ??????????????? ???:???
    * s int ??????
    */exports.nowTimeStr = nowTimeStr;
var s_to_hs = function s_to_hs(s) {
  //????????????
  //????????????????????????60???????????????????????????????????????
  var h;
  h = Math.floor(s / 60);
  //?????????
  //??????????????????%60???????????????????????????
  s = s % 60;
  //???????????????????????????
  h += '';
  s += '';
  //??????????????????????????????????????????0
  h = h.length == 1 ? '0' + h : h;
  s = s.length == 1 ? '0' + s : s;
  return h + ':' + s;
};

// ??????????????????
exports.s_to_hs = s_to_hs;var isLogin = function isLogin() {
  var token = uni.getStorageSync('token');
  if (!token) {
    return false;
  } else
  return true;
};

// ??????????????????
exports.isLogin = isLogin;var getScreenHeight = function getScreenHeight() {
  var height = uni.getSystemInfoSync().windowHeight;
  // console.log(height);
  return height;
};

// ?????????????????????????????????
exports.getScreenHeight = getScreenHeight;var getStatusBarHeight = function getStatusBarHeight() {
  var res = uni.getSystemInfoSync();
  // console.log(res);
  var system = res.platform;




  return 88 + res.statusBarHeight;

};

// ??????????????????????????????
exports.getStatusBarHeight = getStatusBarHeight;var arrChaji = function arrChaji(arr2, arr1) {
  var arr3 = [];
  arr1.map(function (item1) {
    arr2.map(function (item2) {
      if (item1.categoryId == item2.categoryId) {
        //???????????????????????????????????????
        item1.isRepeat = true;
      }
    });
  });
  arr1.map(function (item) {
    //????????????????????????
    if (!item.isRepeat) {
      arr3.push(item);
    }
  });
  // console.log(arr3, 'aaa');
  return arr3;
};exports.arrChaji = arrChaji;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!***************************************************************************!*\
  !*** F:/hear/hear/node_modules/multi-platform-toolkit/src/getUserInfo.ts ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {try {step(generator.next(value));} catch (e) {reject(e);}}
    function rejected(value) {try {step(generator["throw"](value));} catch (e) {reject(e);}}
    function step(result) {result.done ? resolve(result.value) : new P(function (resolve) {resolve(result.value);}).then(fulfilled, rejected);}
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = this && this.__generator || function (thisArg, body) {
  var _ = { label: 0, sent: function sent() {if (t[0] & 1) throw t[1];return t[1];}, trys: [], ops: [] },f,y,t,g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {return this;}), g;
  function verb(n) {return function (v) {return step([n, v]);};}
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) {try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:case 1:t = op;break;
          case 4:_.label++;return { value: op[1], done: false };
          case 5:_.label++;y = op[1];op = [0];continue;
          case 7:op = _.ops.pop();_.trys.pop();continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {_ = 0;continue;}
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {_.label = op[1];break;}
            if (op[0] === 6 && _.label < t[1]) {_.label = t[1];t = op;break;}
            if (t && _.label < t[2]) {_.label = t[2];_.ops.push(op);break;}
            if (t[2]) _.ops.pop();
            _.trys.pop();continue;}

        op = body.call(thisArg, _);
      } catch (e) {op = [6, e];y = 0;} finally {f = t = 0;}}
    if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var Platform1_1 = __importDefault(__webpack_require__(/*! ./Platform1 */ 1000));
var ijsbridge_1 = __webpack_require__(/*! ijsbridge */ 15);
var define_1 = __webpack_require__(/*! ./define */ 1001);
var platform = new Platform1_1.default();
var env = platform.getPlatform();
console.log(env, '????????????');
var getUserInfo = function getUserInfo() {return __awaiter(_this, void 0, Promise, function () {
    var responce, result_1;
    var _this = this;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!(env === define_1.WebToolkitApiConstants.H5)) return [3, 2];
          return [4, getAllObjCookie()];
        case 1:
          result_1 = _a.sent();
          return [2, new Promise(function (resolve, reject) {
            if (JSON.stringify(result_1) === '{}') {
              console.log('?????????????????????');
              responce = {
                err: '??????????????????',
                data: null,
                code: 0 };

              resolve(responce);
            } else
            {
              responce = {
                err: '????????????????????????',
                data: result_1,
                code: 1 };

              resolve(responce);
              console.log(result_1, '????????????');
            }
          })];
        case 2:
          if (env === define_1.WebToolkitApiConstants.AppH5) {
            return [2, new Promise(function (resolve, reject) {return __awaiter(_this, void 0, void 0, function () {
                var _a, err, result;
                return __generator(this, function (_b) {
                  switch (_b.label) {
                    case 0:return [4, ijsbridge_1.WebBridgeApi.getUserInfo({})];
                    case 1:
                      _a = _b.sent(), err = _a.err, result = _a.result;
                      console.log(err, result, '????????????');
                      responce = {
                        err: '',
                        data: '',
                        code: 0 };

                      return [2, responce];}

                });
              });})];
          } else
          {
            responce = {
              err: '',
              data: '',
              code: 0 };

            return [2, responce];
          }
          _a.label = 3;
        case 3:return [2];}

    });
  });};
var getAllObjCookie = function getAllObjCookie() {return __awaiter(_this, void 0, Promise, function () {
    var token, orgid;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:return [4, getCookie('TOKEN')];
        case 1:
          token = _a.sent();
          return [4, getCookie('orgid')];
        case 2:
          orgid = _a.sent();
          return [2, Object.assign({}, token, orgid)];}

    });
  });};
var getCookie = function getCookie(name) {
  return new Promise(function (resolve, reject) {
    var obj = {};
    var prefix = name + "=";
    var start = document.cookie.indexOf(prefix);
    if (start == -1) {
      resolve(null);
    }
    var end = document.cookie.indexOf(";", start + prefix.length);
    if (end == -1) {
      end = document.cookie.length;
    }
    var value = document.cookie.substring(start + prefix.length, end);
    obj[name] = unescape(value);
    resolve(obj);
  });
};
exports.default = getUserInfo;

/***/ }),

/***/ 14:
/*!********************************************************************************************!*\
  !*** F:/hear/hear/node_modules/multi-platform-toolkit/node_modules/weixin-js-sdk/index.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}!function (e, n) {
  module.exports = n(e);
}(window, function (o, e) {
  if (!o.jWeixin) {var _w;
    var n,
    c = {
      config: "preVerifyJSAPI",
      onMenuShareTimeline: "menu:share:timeline",
      onMenuShareAppMessage: "menu:share:appmessage",
      onMenuShareQQ: "menu:share:qq",
      onMenuShareWeibo: "menu:share:weiboApp",
      onMenuShareQZone: "menu:share:QZone",
      previewImage: "imagePreview",
      getLocation: "geoLocation",
      openProductSpecificView: "openProductViewWithPid",
      addCard: "batchAddCard",
      openCard: "batchViewCard",
      chooseWXPay: "getBrandWCPayRequest",
      openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
      startSearchBeacons: "startMonitoringBeacons",
      stopSearchBeacons: "stopMonitoringBeacons",
      onSearchBeacons: "onBeaconsInRange",
      consumeAndShareCard: "consumedShareCard",
      openAddress: "editAddress" },

    a = function () {
      var e = {};
      for (var n in c) {e[c[n]] = n;}
      return e;
    }(),
    i = o.document,
    t = i.title,
    r = navigator.userAgent.toLowerCase(),
    s = navigator.platform.toLowerCase(),
    d = !(!s.match("mac") && !s.match("win")),
    u = -1 != r.indexOf("wxdebugger"),
    l = -1 != r.indexOf("micromessenger"),
    p = -1 != r.indexOf("android"),
    f = -1 != r.indexOf("iphone") || -1 != r.indexOf("ipad"),
    m = (n =
    r.match(/micromessenger\/(\d+\.\d+\.\d+)/) ||
    r.match(/micromessenger\/(\d+\.\d+)/)) ?
    n[1] :
    "",
    g = {
      initStartTime: L(),
      initEndTime: 0,
      preVerifyStartTime: 0,
      preVerifyEndTime: 0 },

    h = {
      version: 1,
      appId: "",
      initTime: 0,
      preVerifyTime: 0,
      networkType: "",
      isPreVerifyOk: 1,
      systemType: f ? 1 : p ? 2 : -1,
      clientVersion: m,
      url: encodeURIComponent(location.href) },

    v = {},
    S = { _completes: [] },
    y = { state: 0, data: {} };
    O(function () {
      g.initEndTime = L();
    });
    var I = !1,
    _ = [],
    w = (_w = {
      config: function config(e) {
        B("config", v = e);
        var t = !1 !== v.check;
        O(function () {
          if (t)
          M(
          c.config,
          {
            verifyJsApiList: C(v.jsApiList),
            verifyOpenTagList: C(v.openTagList) },

          function () {
            S._complete = function (e) {
              g.preVerifyEndTime = L(), y.state = 1, y.data = e;
            },
            S.success = function (e) {
              h.isPreVerifyOk = 0;
            },
            S.fail = function (e) {
              S._fail ? S._fail(e) : y.state = -1;
            };
            var t = S._completes;
            return (
              t.push(function () {
                !function () {
                  if (
                  !(
                  d ||
                  u ||
                  v.debug ||
                  m < "6.0.2" ||
                  h.systemType < 0))

                  {
                    var i = new Image();
                    h.appId = v.appId,
                    h.initTime = g.initEndTime - g.initStartTime,
                    h.preVerifyTime =
                    g.preVerifyEndTime - g.preVerifyStartTime,
                    w.getNetworkType({
                      isInnerInvoke: !0,
                      success: function success(e) {
                        h.networkType = e.networkType;
                        var n =
                        "https://open.weixin.qq.com/sdk/report?v=" +
                        h.version +
                        "&o=" +
                        h.isPreVerifyOk +
                        "&s=" +
                        h.systemType +
                        "&c=" +
                        h.clientVersion +
                        "&a=" +
                        h.appId +
                        "&n=" +
                        h.networkType +
                        "&i=" +
                        h.initTime +
                        "&p=" +
                        h.preVerifyTime +
                        "&u=" +
                        h.url;
                        i.src = n;
                      } });

                  }
                }();
              }),
              S.complete = function (e) {
                for (var n = 0, i = t.length; n < i; ++n) {t[n]();}
                S._completes = [];
              },
              S);

          }()),

          g.preVerifyStartTime = L();else
          {
            y.state = 1;
            for (var e = S._completes, n = 0, i = e.length; n < i; ++n) {
              e[n]();}
            S._completes = [];
          }
        }),
        w.invoke || (
        w.invoke = function (e, n, i) {
          o.WeixinJSBridge && WeixinJSBridge.invoke(e, x(n), i);
        },
        w.on = function (e, n) {
          o.WeixinJSBridge && WeixinJSBridge.on(e, n);
        });
      },
      ready: function ready(e) {
        0 != y.state ? e() : (S._completes.push(e), !l && v.debug && e());
      },
      error: function error(e) {
        m < "6.0.2" || (-1 == y.state ? e(y.data) : S._fail = e);
      },
      checkJsApi: function checkJsApi(e) {
        M(
        "checkJsApi",
        { jsApiList: C(e.jsApiList) }, (
        e._complete = function (e) {
          if (p) {
            var n = e.checkResult;
            n && (e.checkResult = JSON.parse(n));
          }
          e = function (e) {
            var n = e.checkResult;
            for (var i in n) {
              var t = a[i];
              t && (n[t] = n[i], delete n[i]);
            }
            return e;
          }(e);
        },
        e));

      },
      onMenuShareTimeline: function onMenuShareTimeline(e) {
        P(
        c.onMenuShareTimeline,
        {
          complete: function complete() {
            M(
            "shareTimeline",
            {
              title: e.title || t,
              desc: e.title || t,
              img_url: e.imgUrl || "",
              link: e.link || location.href,
              type: e.type || "link",
              data_url: e.dataUrl || "" },

            e);

          } },

        e);

      },
      onMenuShareAppMessage: function onMenuShareAppMessage(n) {
        P(
        c.onMenuShareAppMessage,
        {
          complete: function complete(e) {
            "favorite" === e.scene ?
            M("sendAppMessage", {
              title: n.title || t,
              desc: n.desc || "",
              link: n.link || location.href,
              img_url: n.imgUrl || "",
              type: n.type || "link",
              data_url: n.dataUrl || "" }) :

            M(
            "sendAppMessage",
            {
              title: n.title || t,
              desc: n.desc || "",
              link: n.link || location.href,
              img_url: n.imgUrl || "",
              type: n.type || "link",
              data_url: n.dataUrl || "" },

            n);

          } },

        n);

      },
      onMenuShareQQ: function onMenuShareQQ(e) {
        P(
        c.onMenuShareQQ,
        {
          complete: function complete() {
            M(
            "shareQQ",
            {
              title: e.title || t,
              desc: e.desc || "",
              img_url: e.imgUrl || "",
              link: e.link || location.href },

            e);

          } },

        e);

      },
      onMenuShareWeibo: function onMenuShareWeibo(e) {
        P(
        c.onMenuShareWeibo,
        {
          complete: function complete() {
            M(
            "shareWeiboApp",
            {
              title: e.title || t,
              desc: e.desc || "",
              img_url: e.imgUrl || "",
              link: e.link || location.href },

            e);

          } },

        e);

      },
      onMenuShareQZone: function onMenuShareQZone(e) {
        P(
        c.onMenuShareQZone,
        {
          complete: function complete() {
            M(
            "shareQZone",
            {
              title: e.title || t,
              desc: e.desc || "",
              img_url: e.imgUrl || "",
              link: e.link || location.href },

            e);

          } },

        e);

      },
      updateTimelineShareData: function updateTimelineShareData(e) {
        M(
        "updateTimelineShareData",
        { title: e.title, link: e.link, imgUrl: e.imgUrl },
        e);

      },
      updateAppMessageShareData: function updateAppMessageShareData(e) {
        M(
        "updateAppMessageShareData",
        { title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl },
        e);

      },
      startRecord: function startRecord(e) {
        M("startRecord", {}, e);
      },
      stopRecord: function stopRecord(e) {
        M("stopRecord", {}, e);
      },
      onVoiceRecordEnd: function onVoiceRecordEnd(e) {
        P("onVoiceRecordEnd", e);
      },
      playVoice: function playVoice(e) {
        M("playVoice", { localId: e.localId }, e);
      },
      pauseVoice: function pauseVoice(e) {
        M("pauseVoice", { localId: e.localId }, e);
      },
      stopVoice: function stopVoice(e) {
        M("stopVoice", { localId: e.localId }, e);
      },
      onVoicePlayEnd: function onVoicePlayEnd(e) {
        P("onVoicePlayEnd", e);
      },
      uploadVoice: function uploadVoice(e) {
        M(
        "uploadVoice",
        {
          localId: e.localId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 },

        e);

      },
      downloadVoice: function downloadVoice(e) {
        M(
        "downloadVoice",
        {
          serverId: e.serverId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 },

        e);

      },
      translateVoice: function translateVoice(e) {
        M(
        "translateVoice",
        {
          localId: e.localId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 },

        e);

      },
      chooseImage: function chooseImage(e) {
        M(
        "chooseImage",
        {
          scene: "1|2",
          count: e.count || 9,
          sizeType: e.sizeType || ["original", "compressed"],
          sourceType: e.sourceType || ["album", "camera"] }, (

        e._complete = function (e) {
          if (p) {
            var n = e.localIds;
            try {
              n && (e.localIds = JSON.parse(n));
            } catch (e) {}
          }
        },
        e));

      },
      getLocation: function getLocation(e) {},
      previewImage: function previewImage(e) {
        M(c.previewImage, { current: e.current, urls: e.urls }, e);
      },
      uploadImage: function uploadImage(e) {
        M(
        "uploadImage",
        {
          localId: e.localId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 },

        e);

      },
      downloadImage: function downloadImage(e) {
        M(
        "downloadImage",
        {
          serverId: e.serverId,
          isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1 },

        e);

      },
      getLocalImgData: function getLocalImgData(e) {
        !1 === I ? (
        I = !0,
        M(
        "getLocalImgData",
        { localId: e.localId }, (
        e._complete = function (e) {
          if (I = !1, 0 < _.length) {
            var n = _.shift();
            wx.getLocalImgData(n);
          }
        },
        e))) :

        _.push(e);
      },
      getNetworkType: function getNetworkType(e) {
        M(
        "getNetworkType",
        {}, (
        e._complete = function (e) {
          e = function (e) {
            var n = e.errMsg;
            e.errMsg = "getNetworkType:ok";
            var i = e.subtype;
            if (delete e.subtype, i) e.networkType = i;else
            {
              var t = n.indexOf(":"),
              o = n.substring(t + 1);
              switch (o) {
                case "wifi":
                case "edge":
                case "wwan":
                  e.networkType = o;
                  break;
                default:
                  e.errMsg = "getNetworkType:fail";}

            }
            return e;
          }(e);
        },
        e));

      },
      openLocation: function openLocation(e) {
        M(
        "openLocation",
        {
          latitude: e.latitude,
          longitude: e.longitude,
          name: e.name || "",
          address: e.address || "",
          scale: e.scale || 28,
          infoUrl: e.infoUrl || "" },

        e);

      } }, _defineProperty(_w, "getLocation",
    function getLocation(e) {
      M(
      c.getLocation,
      { type: (e = e || {}).type || "wgs84" }, (
      e._complete = function (e) {
        delete e.type;
      },
      e));

    }), _defineProperty(_w, "hideOptionMenu",
    function hideOptionMenu(e) {
      M("hideOptionMenu", {}, e);
    }), _defineProperty(_w, "showOptionMenu",
    function showOptionMenu(e) {
      M("showOptionMenu", {}, e);
    }), _defineProperty(_w, "closeWindow",
    function closeWindow(e) {
      M("closeWindow", {}, e = e || {});
    }), _defineProperty(_w, "hideMenuItems",
    function hideMenuItems(e) {
      M("hideMenuItems", { menuList: e.menuList }, e);
    }), _defineProperty(_w, "showMenuItems",
    function showMenuItems(e) {
      M("showMenuItems", { menuList: e.menuList }, e);
    }), _defineProperty(_w, "hideAllNonBaseMenuItem",
    function hideAllNonBaseMenuItem(e) {
      M("hideAllNonBaseMenuItem", {}, e);
    }), _defineProperty(_w, "showAllNonBaseMenuItem",
    function showAllNonBaseMenuItem(e) {
      M("showAllNonBaseMenuItem", {}, e);
    }), _defineProperty(_w, "scanQRCode",
    function scanQRCode(e) {
      M(
      "scanQRCode",
      {
        needResult: (e = e || {}).needResult || 0,
        scanType: e.scanType || ["qrCode", "barCode"] }, (

      e._complete = function (e) {
        if (f) {
          var n = e.resultStr;
          if (n) {
            var i = JSON.parse(n);
            e.resultStr = i && i.scan_code && i.scan_code.scan_result;
          }
        }
      },
      e));

    }), _defineProperty(_w, "openAddress",
    function openAddress(e) {
      M(
      c.openAddress,
      {}, (
      e._complete = function (e) {
        e = function (e) {
          return (
            e.postalCode = e.addressPostalCode,
            delete e.addressPostalCode,
            e.provinceName = e.proviceFirstStageName,
            delete e.proviceFirstStageName,
            e.cityName = e.addressCitySecondStageName,
            delete e.addressCitySecondStageName,
            e.countryName = e.addressCountiesThirdStageName,
            delete e.addressCountiesThirdStageName,
            e.detailInfo = e.addressDetailInfo,
            delete e.addressDetailInfo,
            e);

        }(e);
      },
      e));

    }), _defineProperty(_w, "openProductSpecificView",
    function openProductSpecificView(e) {
      M(
      c.openProductSpecificView,
      {
        pid: e.productId,
        view_type: e.viewType || 0,
        ext_info: e.extInfo },

      e);

    }), _defineProperty(_w, "addCard",
    function addCard(e) {
      for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {
        var r = n[t],
        a = { card_id: r.cardId, card_ext: r.cardExt };
        i.push(a);
      }
      M(
      c.addCard,
      { card_list: i }, (
      e._complete = function (e) {
        var n = e.card_list;
        if (n) {
          for (var i = 0, t = (n = JSON.parse(n)).length; i < t; ++i) {
            var o = n[i];
            o.cardId = o.card_id,
            o.cardExt = o.card_ext,
            o.isSuccess = !!o.is_succ,
            delete o.card_id,
            delete o.card_ext,
            delete o.is_succ;
          }
          e.cardList = n, delete e.card_list;
        }
      },
      e));

    }), _defineProperty(_w, "chooseCard",
    function chooseCard(e) {
      M(
      "chooseCard",
      {
        app_id: v.appId,
        location_id: e.shopId || "",
        sign_type: e.signType || "SHA1",
        card_id: e.cardId || "",
        card_type: e.cardType || "",
        card_sign: e.cardSign,
        time_stamp: e.timestamp + "",
        nonce_str: e.nonceStr }, (

      e._complete = function (e) {
        e.cardList = e.choose_card_info, delete e.choose_card_info;
      },
      e));

    }), _defineProperty(_w, "openCard",
    function openCard(e) {
      for (var n = e.cardList, i = [], t = 0, o = n.length; t < o; ++t) {
        var r = n[t],
        a = { card_id: r.cardId, code: r.code };
        i.push(a);
      }
      M(c.openCard, { card_list: i }, e);
    }), _defineProperty(_w, "consumeAndShareCard",
    function consumeAndShareCard(e) {
      M(
      c.consumeAndShareCard,
      { consumedCardId: e.cardId, consumedCode: e.code },
      e);

    }), _defineProperty(_w, "chooseWXPay",
    function chooseWXPay(e) {
      M(c.chooseWXPay, V(e), e);
    }), _defineProperty(_w, "openEnterpriseRedPacket",
    function openEnterpriseRedPacket(e) {
      M(c.openEnterpriseRedPacket, V(e), e);
    }), _defineProperty(_w, "startSearchBeacons",
    function startSearchBeacons(e) {
      M(c.startSearchBeacons, { ticket: e.ticket }, e);
    }), _defineProperty(_w, "stopSearchBeacons",
    function stopSearchBeacons(e) {
      M(c.stopSearchBeacons, {}, e);
    }), _defineProperty(_w, "onSearchBeacons",
    function onSearchBeacons(e) {
      P(c.onSearchBeacons, e);
    }), _defineProperty(_w, "openEnterpriseChat",
    function openEnterpriseChat(e) {
      M(
      "openEnterpriseChat",
      { useridlist: e.userIds, chatname: e.groupName },
      e);

    }), _defineProperty(_w, "launchMiniProgram",
    function launchMiniProgram(e) {
      M(
      "launchMiniProgram",
      {
        targetAppId: e.targetAppId,
        path: function (e) {
          if ("string" == typeof e && 0 < e.length) {
            var n = e.split("?")[0],
            i = e.split("?")[1];
            return n += ".html", void 0 !== i ? n + "?" + i : n;
          }
        }(e.path),
        envVersion: e.envVersion },

      e);

    }), _defineProperty(_w, "openBusinessView",
    function openBusinessView(e) {
      M(
      "openBusinessView",
      {
        businessType: e.businessType,
        queryString: e.queryString || "",
        envVersion: e.envVersion }, (

      e._complete = function (n) {
        if (p) {
          var e = n.extraData;
          if (e)
          try {
            n.extraData = JSON.parse(e);
          } catch (e) {
            n.extraData = {};
          }
        }
      },
      e));

    }), _defineProperty(_w, "miniProgram",
    {
      navigateBack: function navigateBack(e) {
        e = e || {},
        O(function () {
          M(
          "invokeMiniProgramAPI",
          { name: "navigateBack", arg: { delta: e.delta || 1 } },
          e);

        });
      },
      navigateTo: function navigateTo(e) {
        O(function () {
          M(
          "invokeMiniProgramAPI",
          { name: "navigateTo", arg: { url: e.url } },
          e);

        });
      },
      redirectTo: function redirectTo(e) {
        O(function () {
          M(
          "invokeMiniProgramAPI",
          { name: "redirectTo", arg: { url: e.url } },
          e);

        });
      },
      switchTab: function switchTab(e) {
        O(function () {
          M(
          "invokeMiniProgramAPI",
          { name: "switchTab", arg: { url: e.url } },
          e);

        });
      },
      reLaunch: function reLaunch(e) {
        O(function () {
          M(
          "invokeMiniProgramAPI",
          { name: "reLaunch", arg: { url: e.url } },
          e);

        });
      },
      postMessage: function postMessage(e) {
        O(function () {
          M(
          "invokeMiniProgramAPI",
          { name: "postMessage", arg: e.data || {} },
          e);

        });
      },
      getEnv: function getEnv(e) {
        O(function () {
          e({ miniprogram: "miniprogram" === o.__wxjs_environment });
        });
      } }), _w),


    T = 1,
    k = {};
    return (
      i.addEventListener(
      "error",
      function (e) {
        if (!p) {
          var n = e.target,
          i = n.tagName,
          t = n.src;
          if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i)
          if (-1 != t.indexOf("wxlocalresource://")) {
            e.preventDefault(), e.stopPropagation();
            var o = n["wx-id"];
            if (o || (o = T++, n["wx-id"] = o), k[o]) return;
            k[o] = !0,
            wx.ready(function () {
              wx.getLocalImgData({
                localId: t,
                success: function success(e) {
                  n.src = e.localData;
                } });

            });
          }
        }
      },
      !0),

      i.addEventListener(
      "load",
      function (e) {
        if (!p) {
          var n = e.target,
          i = n.tagName;
          n.src;
          if ("IMG" == i || "VIDEO" == i || "AUDIO" == i || "SOURCE" == i) {
            var t = n["wx-id"];
            t && (k[t] = !1);
          }
        }
      },
      !0),

      e && (o.wx = o.jWeixin = w),
      w);

  }
  function M(n, e, i) {
    o.WeixinJSBridge ?
    WeixinJSBridge.invoke(n, x(e), function (e) {
      A(n, e, i);
    }) :
    B(n, i);
  }
  function P(n, i, t) {
    o.WeixinJSBridge ?
    WeixinJSBridge.on(n, function (e) {
      t && t.trigger && t.trigger(e), A(n, e, i);
    }) :
    B(n, t || i);
  }
  function x(e) {
    return (
      (e = e || {}).appId = v.appId,
      e.verifyAppId = v.appId,
      e.verifySignType = "sha1",
      e.verifyTimestamp = v.timestamp + "",
      e.verifyNonceStr = v.nonceStr,
      e.verifySignature = v.signature,
      e);

  }
  function V(e) {
    return {
      timeStamp: e.timestamp + "",
      nonceStr: e.nonceStr,
      package: e.package,
      paySign: e.paySign,
      signType: e.signType || "SHA1" };

  }
  function A(e, n, i) {
    "openEnterpriseChat" != e && "openBusinessView" !== e || (
    n.errCode = n.err_code),
    delete n.err_code,
    delete n.err_desc,
    delete n.err_detail;
    var t = n.errMsg;
    t || (
    t = n.err_msg,
    delete n.err_msg,
    t = function (e, n) {
      var i = e,
      t = a[i];
      t && (i = t);
      var o = "ok";
      if (n) {
        var r = n.indexOf(":");
        "confirm" == (o = n.substring(r + 1)) && (o = "ok"),
        "failed" == o && (o = "fail"),
        -1 != o.indexOf("failed_") && (o = o.substring(7)),
        -1 != o.indexOf("fail_") && (o = o.substring(5)),
        "access denied" != (
        o = (o = o.replace(/_/g, " ")).toLowerCase()) &&
        "no permission to execute" != o || (
        o = "permission denied"),
        "config" == i && "function not exist" == o && (o = "ok"),
        "" == o && (o = "fail");
      }
      return n = i + ":" + o;
    }(e, t),
    n.errMsg = t),
    (i = i || {})._complete && (i._complete(n), delete i._complete),
    t = n.errMsg || "",
    v.debug && !i.isInnerInvoke && alert(JSON.stringify(n));
    var o = t.indexOf(":");
    switch (t.substring(o + 1)) {
      case "ok":
        i.success && i.success(n);
        break;
      case "cancel":
        i.cancel && i.cancel(n);
        break;
      default:
        i.fail && i.fail(n);}

    i.complete && i.complete(n);
  }
  function C(e) {
    if (e) {
      for (var n = 0, i = e.length; n < i; ++n) {
        var t = e[n],
        o = c[t];
        o && (e[n] = o);
      }
      return e;
    }
  }
  function B(e, n) {
    if (!(!v.debug || n && n.isInnerInvoke)) {
      var i = a[e];
      i && (e = i),
      n && n._complete && delete n._complete,
      console.log('"' + e + '",', n || "");
    }
  }
  function L() {
    return new Date().getTime();
  }
  function O(e) {
    l && (
    o.WeixinJSBridge ?
    e() :
    i.addEventListener &&
    i.addEventListener("WeixinJSBridgeReady", e, !1));
  }
});

/***/ }),

/***/ 15:
/*!********************************************************!*\
  !*** F:/hear/hear/node_modules/ijsbridge/lib/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 885);Object.defineProperty(exports, "__esModule", { value: !0 }), exports.WebBridgeApi = exports.setDevelopmentMode = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 8)),_asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 886)),_define = __webpack_require__(/*! ./define */ 887),_state = __webpack_require__(/*! ./state */ 888),_native = __webpack_require__(/*! ./native */ 889);__webpack_require__(/*! ./interface */ 894);var _R = function _R(e) {return (0, _state.__log)("result is", e), { err: "", result: e };},_BetaData = { pic: "http://pic136.nipic.com/file/20170725/10673188_152559977000_2.jpg", video: "http://pic136.nipic.com/file/20170725/10673188_152559977000_2.mp4" },setDevelopmentMode = function setDevelopmentMode(e) {(0, _state.__set_mode)(e ? _define.BridgeMode.Development : _define.BridgeMode.Production);};exports.setDevelopmentMode = setDevelopmentMode;var WebBridgeApi = { requestApi: _native.__request, defineApi: _native.__define, ping: function ping(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)("ping", e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", e);case 5:case "end":return r.stop();}}}, r);}))();}, requireVersion: function requireVersion(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.requireVersion, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", e);case 5:case "end":return r.stop();}}}, r);}))();}, sysinfo: function sysinfo() {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function e() {return _regenerator.default.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {e.next = 4;break;}return e.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.sysinfo, {});case 3:return e.abrupt("return", e.sent);case 4:return (0, _state.__log)("sysinfo dev"), e.abrupt("return", _R({ Brand: "??????", SystemName: "????????????", SystemVersion: "????????????", BundleId: "??????", ApplicationName: "APP??????", BuildNumber: "????????????", Version: "??????", ReadableVersion: "????????????", DeviceName: "????????????", UserAgent: "Agent", Carrier: "?????????", NetInfo: "????????????", Config: {} }));case 6:case "end":return e.stop();}}}, e);}))();}, scanCode: function scanCode(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.scanCode, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R("" + new Date().valueOf()));case 5:case "end":return r.stop();}}}, r);}))();}, authorize: function authorize(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.authorize, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R({ avatar: _BetaData.pic, islock: "0", isslient: "0", nickname: "??????", phone: "13000000000", token: "yuUeDo5kaomEebwgnkJZWdNg33XU+ZT2a6KhDLfvdDEV/HoW/v/TBXa1WbK1yc0q" }));case 5:case "end":return r.stop();}}}, r);}))();}, getUserInfo: function getUserInfo(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.getUserInfo, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R({ avatar: _BetaData.pic, islock: "0", isslient: "0", nickname: "??????", phone: "13000000000", token: "yuUeDo5kaomEebwgnkJZWdNg33XU+ZT2a6KhDLfvdDEV/HoW/v/TBXa1WbK1yc0q" }));case 5:case "end":return r.stop();}}}, r);}))();}, fetch: function fetch(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.fetch, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R({ header: {}, body: "hello world" }));case 5:case "end":return r.stop();}}}, r);}))();}, request: function request(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.request, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R({ header: {}, body: "hello world" }));case 5:case "end":return r.stop();}}}, r);}))();}, router: function router(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.router, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, showWebApp: function showWebApp(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.showWebApp, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, showToast: function showToast(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.showToast, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, showDialog: function showDialog(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.showDialog, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(1));case 5:case "end":return r.stop();}}}, r);}))();}, chooseImage: function chooseImage(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.chooseImage, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(_BetaData.pic));case 5:case "end":return r.stop();}}}, r);}))();}, chooseVideo: function chooseVideo(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.chooseVideo, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(_BetaData.video));case 5:case "end":return r.stop();}}}, r);}))();}, showImageViewer: function showImageViewer(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.showImageViewer, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, showFullVideoPlayer: function showFullVideoPlayer(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.showFullVideoPlayer, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, requestFullscreenVideoPlay: function requestFullscreenVideoPlay(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.requestFullscreenVideoPlay, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, checkPermission: function checkPermission(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.checkPermission, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, audioRecord: function audioRecord(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.audioRecord, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, share: function share(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.share, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, openLink: function openLink(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.openLink, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, showPickerMenu: function showPickerMenu(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.showPickerMenu, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, launchWechatProgram: function launchWechatProgram(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.launchWechatProgram, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, getCurrentPosition: function getCurrentPosition(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.getCurrentPosition, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, registerAppEvent: function registerAppEvent(e, r) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function t() {return _regenerator.default.wrap(function (t) {for (;;) {switch (t.prev = t.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {t.next = 3;break;}return (0, _native.__request_callback)(_define.WebBridgeApiConstants.registerAppEvent, e, function () {"function" == typeof r && r.apply(void 0, arguments);}), t.abrupt("return");case 3:"function" == typeof r && r(_R(!0));case 4:case "end":return t.stop();}}}, t);}))();}, unRegisterAppEvent: function unRegisterAppEvent(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.unRegisterAppEvent, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, triggerAppEvent: function triggerAppEvent(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.triggerAppEvent, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, orientation: function orientation(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.orientation, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, connectDlna: function connectDlna(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.connectDlna, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();}, musicControl: function musicControl(e) {return (0, _asyncToGenerator2.default)(_regenerator.default.mark(function r() {return _regenerator.default.wrap(function (r) {for (;;) {switch (r.prev = r.next) {case 0:if ((0, _state.__get_mode)() != _define.BridgeMode.Production) {r.next = 4;break;}return r.next = 3, (0, _native.__request)(_define.WebBridgeApiConstants.musicControl, e);case 3:return r.abrupt("return", r.sent);case 4:return r.abrupt("return", _R(!0));case 5:case "end":return r.stop();}}}, r);}))();} };exports.WebBridgeApi = WebBridgeApi;

/***/ }),

/***/ 18:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 19:
/*!***********************************!*\
  !*** F:/hear/hear/store/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 11));


var _index = _interopRequireDefault(__webpack_require__(/*! ./module/system/index */ 20));
var _index2 = _interopRequireDefault(__webpack_require__(/*! ./module/user/index */ 22));
var _index3 = _interopRequireDefault(__webpack_require__(/*! ./module/app/index.js */ 23));
var _index4 = _interopRequireDefault(__webpack_require__(/*! ./module/huting/index.js */ 24));
var _index5 = _interopRequireDefault(__webpack_require__(/*! ./module/index/index.js */ 41));
var _index6 = _interopRequireDefault(__webpack_require__(/*! ./module/play/index.js */ 43));
var _index7 = _interopRequireDefault(__webpack_require__(/*! ./module/my/index.js */ 46));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    system: _index.default,
    user: _index2.default,
    app: _index3.default,
    huting: _index4.default,
    index: _index5.default,
    play: _index6.default,
    my: _index7.default } });var _default =


store;exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx ????????????????????? plugins ???????????????????????????????????????????????????????????????????????? copyAugment ??????
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // ?????? externalClass ????????????(????????? externalClass ????????????????????????)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx ?????? hack ??? uni-app ???????????? name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//?????? observer ??? setData callback ?????????????????????????????? warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field ????????????
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick ?????? ??? setData ??? setData ??????????????????
    //2.nextTick ???????????? render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // ???????????? vm ?????????????????????
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var rawBindings = vm.__secret_vfa_state__ && vm.__secret_vfa_state__.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }
  
  //TODO ??????????????????????????????????????? list=>l0 ??? list ??????????????????????????????????????????
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //????????? data ???????????????
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']????????????',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js ?????? new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay ???????????? selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO ???????????? string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // ??????????????????????????????????????????
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // ???????????????????????????????????????
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*************************************************!*\
  !*** F:/hear/hear/store/module/system/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _data = __webpack_require__(/*! ./data.js */ 21);var _default =




{
  state: {
    tabBarList: _data.tabBarList,
    key: '', // ????????????key???
    code: '', // ?????????
    phone: '', // ????????????????????????
    token: '' // ???????????????token
  },
  mutations: {
    setPhoneKey: function setPhoneKey(state, value) {
      state.key = value;
    },
    setPhoneCode: function setPhoneCode(state, value) {
      state.code = value;
    },
    setPhone: function setPhone(state, value) {
      state.phone = value;
    },
    setToken: function setToken(state, value) {
      state.token = value;
    } },

  actions: {} };exports.default = _default;

/***/ }),

/***/ 21:
/*!************************************************!*\
  !*** F:/hear/hear/store/module/system/data.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.tabBarList = void 0;var tabBarList = [{
  text: '??????',
  isDot: true,
  customIcon: false,
  iconPath: "/static/tabbar/jia.png",
  selectedIconPath: "/static/tabbar/selectjia.png",
  pagePath: "/pages/tabbar/home/index" },

{
  text: '??????',
  customIcon: true,
  iconPath: "/static/tabbar/huting.png",
  selectedIconPath: "/static/tabbar/selecthuting.png",
  pagePath: '/pages/tabbar/listen/index' },

{
  customIcon: false,
  midButton: true },

{
  text: '??????',
  customIcon: true,
  iconPath: "/static/tabbar/quanzi.png",
  selectedIconPath: "/static/tabbar/selectquanzi.png",
  pagePath: '/pages/tabbar/circle/index' },

{
  text: '??????',
  customIcon: true,
  iconPath: "/static/tabbar/wode.png",
  selectedIconPath: "/static/tabbar/selectwode.png",
  pagePath: '/pages/tabbar/my/index' }];exports.tabBarList = tabBarList;

/***/ }),

/***/ 22:
/*!***********************************************!*\
  !*** F:/hear/hear/store/module/user/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // import {tabBarList} from './data.js'
var _default =
{
  state: {
    tabList: [{
      id: 1,
      name: '?????????' },
    {
      id: 2,
      name: '?????????' },
    {
      id: 3,
      name: '?????????' },

    {
      id: 4,
      name: '?????????' },

    {
      name: '4' },

    {
      name: '5' },

    {
      name: '6' }],


    play: false // ??????????????????
  },
  mutations: {
    // ??????????????????
    editPlay: function editPlay(state, value) {
      state.play = value;
    } },

  actions: {} };exports.default = _default;

/***/ }),

/***/ 23:
/*!**********************************************!*\
  !*** F:/hear/hear/store/module/app/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  state: {
    bannerList: [],
    audio: {
      src: '',
      title: '',
      singer: '',
      coverImgUrl: '' },

    playinfo: {
      current: 0, //????????????
      duration: 0, //?????????
      duration_value: 0, //?????????
      current_value: 0, //????????????
      src: "" },

    paused: true, // ???????????????
    n_pause: false, //??????????????????
    type: 'zhangjie', // ???????????????
    gloalImg: '' // ???????????????
  },
  mutations: {
    setaudio: function setaudio(state, data) {
      state.audio = data;
    },
    setnextaudio: function setnextaudio(state, data) {
      state.nextaudio = data;
    },
    setplay: function setplay(state, data) {
      if (data.current) {
        state.playinfo.current = data.current;
      }
      if (data.duration) {
        state.playinfo.duration = data.duration;
      }
      if (data.duration_value) {
        state.playinfo.duration_value = data.duration_value;
      }
      if (data.current_value) {
        state.playinfo.current_value = data.current_value;
      }
      if (data.current_value) {
        state.playinfo.current_value = data.current_value;
      }
      if (data.src) {
        state.playinfo.src = data.src;
      }
    },
    setpause: function setpause(state, data) {
      state.paused = data;
    },
    set_n_pause: function set_n_pause(state, data) {
      state.n_pause = data;
    },
    setAudioType: function setAudioType(state, data) {
      state.type = data;
    },
    setGloalImg: function setGloalImg(state, data) {
      state.gloalImg = data;
    } },

  actions: {} };exports.default = _default;

/***/ }),

/***/ 237:
/*!**************************************************!*\
  !*** F:/hear/hear/pagesC/haibao/weapp-qrcode.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//Core code comes from https://github.com/davidshimjs/qrcodejs

var QRCode;

(function () {
  /**
                   * Get the type by string length
                   * 
                   * @private
                   * @param {String} sText
                   * @param {Number} nCorrectLevel
                   * @return {Number} type
                   */
  function _getTypeNumber(sText, nCorrectLevel) {
    var nType = 1;
    var length = _getUTF8Length(sText);

    for (var i = 0, len = QRCodeLimitLength.length; i <= len; i++) {
      var nLimit = 0;

      switch (nCorrectLevel) {
        case QRErrorCorrectLevel.L:
          nLimit = QRCodeLimitLength[i][0];
          break;
        case QRErrorCorrectLevel.M:
          nLimit = QRCodeLimitLength[i][1];
          break;
        case QRErrorCorrectLevel.Q:
          nLimit = QRCodeLimitLength[i][2];
          break;
        case QRErrorCorrectLevel.H:
          nLimit = QRCodeLimitLength[i][3];
          break;}


      if (length <= nLimit) {
        break;
      } else {
        nType++;
      }
    }

    if (nType > QRCodeLimitLength.length) {
      throw new Error("Too long data");
    }

    return nType;
  }

  function _getUTF8Length(sText) {
    var replacedText = encodeURI(sText).toString().replace(/\%[0-9a-fA-F]{2}/g, 'a');
    return replacedText.length + (replacedText.length != sText ? 3 : 0);
  }

  function QR8bitByte(data) {
    this.mode = QRMode.MODE_8BIT_BYTE;
    this.data = data;
    this.parsedData = [];

    // Added to support UTF-8 Characters
    for (var i = 0, l = this.data.length; i < l; i++) {
      var byteArray = [];
      var code = this.data.charCodeAt(i);

      if (code > 0x10000) {
        byteArray[0] = 0xF0 | (code & 0x1C0000) >>> 18;
        byteArray[1] = 0x80 | (code & 0x3F000) >>> 12;
        byteArray[2] = 0x80 | (code & 0xFC0) >>> 6;
        byteArray[3] = 0x80 | code & 0x3F;
      } else if (code > 0x800) {
        byteArray[0] = 0xE0 | (code & 0xF000) >>> 12;
        byteArray[1] = 0x80 | (code & 0xFC0) >>> 6;
        byteArray[2] = 0x80 | code & 0x3F;
      } else if (code > 0x80) {
        byteArray[0] = 0xC0 | (code & 0x7C0) >>> 6;
        byteArray[1] = 0x80 | code & 0x3F;
      } else {
        byteArray[0] = code;
      }

      this.parsedData.push(byteArray);
    }

    this.parsedData = Array.prototype.concat.apply([], this.parsedData);

    if (this.parsedData.length != this.data.length) {
      this.parsedData.unshift(191);
      this.parsedData.unshift(187);
      this.parsedData.unshift(239);
    }
  }

  QR8bitByte.prototype = {
    getLength: function getLength(buffer) {
      return this.parsedData.length;
    },
    write: function write(buffer) {
      for (var i = 0, l = this.parsedData.length; i < l; i++) {
        buffer.put(this.parsedData[i], 8);
      }
    } };



  // QRCodeModel
  function QRCodeModel(typeNumber, errorCorrectLevel) {
    this.typeNumber = typeNumber;
    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null;
    this.moduleCount = 0;
    this.dataCache = null;
    this.dataList = [];
  }
  QRCodeModel.prototype = {
    addData: function addData(data) {var newData = new QR8bitByte(data);this.dataList.push(newData);this.dataCache = null;}, isDark: function isDark(row, col) {
      if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {throw new Error(row + "," + col);}
      return this.modules[row][col];
    }, getModuleCount: function getModuleCount() {return this.moduleCount;}, make: function make() {this.makeImpl(false, this.getBestMaskPattern());}, makeImpl: function makeImpl(test, maskPattern) {
      this.moduleCount = this.typeNumber * 4 + 17;this.modules = new Array(this.moduleCount);for (var row = 0; row < this.moduleCount; row++) {this.modules[row] = new Array(this.moduleCount);for (var col = 0; col < this.moduleCount; col++) {this.modules[row][col] = null;}}
      this.setupPositionProbePattern(0, 0);this.setupPositionProbePattern(this.moduleCount - 7, 0);this.setupPositionProbePattern(0, this.moduleCount - 7);this.setupPositionAdjustPattern();this.setupTimingPattern();this.setupTypeInfo(test, maskPattern);if (this.typeNumber >= 7) {this.setupTypeNumber(test);}
      if (this.dataCache == null) {this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);}
      this.mapData(this.dataCache, maskPattern);
    }, setupPositionProbePattern: function setupPositionProbePattern(row, col) {for (var r = -1; r <= 7; r++) {if (row + r <= -1 || this.moduleCount <= row + r) continue;for (var c = -1; c <= 7; c++) {if (col + c <= -1 || this.moduleCount <= col + c) continue;if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {this.modules[row + r][col + c] = true;} else {this.modules[row + r][col + c] = false;}}}}, getBestMaskPattern: function getBestMaskPattern() {
      var minLostPoint = 0;var pattern = 0;for (var i = 0; i < 8; i++) {this.makeImpl(true, i);var lostPoint = QRUtil.getLostPoint(this);if (i == 0 || minLostPoint > lostPoint) {minLostPoint = lostPoint;pattern = i;}}
      return pattern;
    }, createMovieClip: function createMovieClip(target_mc, instance_name, depth) {
      var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);var cs = 1;this.make();for (var row = 0; row < this.modules.length; row++) {var y = row * cs;for (var col = 0; col < this.modules[row].length; col++) {var x = col * cs;var dark = this.modules[row][col];if (dark) {qr_mc.beginFill(0, 100);qr_mc.moveTo(x, y);qr_mc.lineTo(x + cs, y);qr_mc.lineTo(x + cs, y + cs);qr_mc.lineTo(x, y + cs);qr_mc.endFill();}}}
      return qr_mc;
    }, setupTimingPattern: function setupTimingPattern() {
      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {continue;}
        this.modules[r][6] = r % 2 == 0;
      }
      for (var c = 8; c < this.moduleCount - 8; c++) {
        if (this.modules[6][c] != null) {continue;}
        this.modules[6][c] = c % 2 == 0;
      }
    }, setupPositionAdjustPattern: function setupPositionAdjustPattern() {
      var pos = QRUtil.getPatternPosition(this.typeNumber);for (var i = 0; i < pos.length; i++) {
        for (var j = 0; j < pos.length; j++) {
          var row = pos[i];var col = pos[j];if (this.modules[row][col] != null) {continue;}
          for (var r = -2; r <= 2; r++) {for (var c = -2; c <= 2; c++) {if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {this.modules[row + r][col + c] = true;} else {this.modules[row + r][col + c] = false;}}}
        }
      }
    }, setupTypeNumber: function setupTypeNumber(test) {
      var bits = QRUtil.getBCHTypeNumber(this.typeNumber);for (var i = 0; i < 18; i++) {var mod = !test && (bits >> i & 1) == 1;this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;}
      for (var i = 0; i < 18; i++) {var mod = !test && (bits >> i & 1) == 1;this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;}
    }, setupTypeInfo: function setupTypeInfo(test, maskPattern) {
      var data = this.errorCorrectLevel << 3 | maskPattern;var bits = QRUtil.getBCHTypeInfo(data);for (var i = 0; i < 15; i++) {var mod = !test && (bits >> i & 1) == 1;if (i < 6) {this.modules[i][8] = mod;} else if (i < 8) {this.modules[i + 1][8] = mod;} else {this.modules[this.moduleCount - 15 + i][8] = mod;}}
      for (var i = 0; i < 15; i++) {var mod = !test && (bits >> i & 1) == 1;if (i < 8) {this.modules[8][this.moduleCount - i - 1] = mod;} else if (i < 9) {this.modules[8][15 - i - 1 + 1] = mod;} else {this.modules[8][15 - i - 1] = mod;}}
      this.modules[this.moduleCount - 8][8] = !test;
    }, mapData: function mapData(data, maskPattern) {
      var inc = -1;var row = this.moduleCount - 1;var bitIndex = 7;var byteIndex = 0;for (var col = this.moduleCount - 1; col > 0; col -= 2) {
        if (col == 6) col--;while (true) {
          for (var c = 0; c < 2; c++) {
            if (this.modules[row][col - c] == null) {
              var dark = false;if (byteIndex < data.length) {dark = (data[byteIndex] >>> bitIndex & 1) == 1;}
              var mask = QRUtil.getMask(maskPattern, row, col - c);if (mask) {dark = !dark;}
              this.modules[row][col - c] = dark;bitIndex--;if (bitIndex == -1) {byteIndex++;bitIndex = 7;}
            }
          }
          row += inc;if (row < 0 || this.moduleCount <= row) {row -= inc;inc = -inc;break;}
        }
      }
    } };

  QRCodeModel.PAD0 = 0xEC;
  QRCodeModel.PAD1 = 0x11;
  QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) {
    var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);var buffer = new QRBitBuffer();for (var i = 0; i < dataList.length; i++) {var data = dataList[i];buffer.put(data.mode, 4);buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));data.write(buffer);}
    var totalDataCount = 0;for (var i = 0; i < rsBlocks.length; i++) {totalDataCount += rsBlocks[i].dataCount;}
    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw new Error("code length overflow. (" +
      buffer.getLengthInBits() +
      ">" +
      totalDataCount * 8 +
      ")");
    }
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {buffer.put(0, 4);}
    while (buffer.getLengthInBits() % 8 != 0) {buffer.putBit(false);}
    while (true) {
      if (buffer.getLengthInBits() >= totalDataCount * 8) {break;}
      buffer.put(QRCodeModel.PAD0, 8);if (buffer.getLengthInBits() >= totalDataCount * 8) {break;}
      buffer.put(QRCodeModel.PAD1, 8);
    }
    return QRCodeModel.createBytes(buffer, rsBlocks);
  };
  QRCodeModel.createBytes = function (buffer, rsBlocks) {
    var offset = 0;var maxDcCount = 0;var maxEcCount = 0;var dcdata = new Array(rsBlocks.length);var ecdata = new Array(rsBlocks.length);for (var r = 0; r < rsBlocks.length; r++) {
      var dcCount = rsBlocks[r].dataCount;var ecCount = rsBlocks[r].totalCount - dcCount;maxDcCount = Math.max(maxDcCount, dcCount);maxEcCount = Math.max(maxEcCount, ecCount);dcdata[r] = new Array(dcCount);for (var i = 0; i < dcdata[r].length; i++) {dcdata[r][i] = 0xff & buffer.buffer[i + offset];}
      offset += dcCount;var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);var modPoly = rawPoly.mod(rsPoly);ecdata[r] = new Array(rsPoly.getLength() - 1);for (var i = 0; i < ecdata[r].length; i++) {var modIndex = i + modPoly.getLength() - ecdata[r].length;ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;}
    }
    var totalCodeCount = 0;for (var i = 0; i < rsBlocks.length; i++) {totalCodeCount += rsBlocks[i].totalCount;}
    var data = new Array(totalCodeCount);var index = 0;for (var i = 0; i < maxDcCount; i++) {for (var r = 0; r < rsBlocks.length; r++) {if (i < dcdata[r].length) {data[index++] = dcdata[r][i];}}}
    for (var i = 0; i < maxEcCount; i++) {for (var r = 0; r < rsBlocks.length; r++) {if (i < ecdata[r].length) {data[index++] = ecdata[r][i];}}}
    return data;
  };
  var QRMode = { MODE_NUMBER: 1 << 0, MODE_ALPHA_NUM: 1 << 1, MODE_8BIT_BYTE: 1 << 2, MODE_KANJI: 1 << 3 };
  var QRErrorCorrectLevel = { L: 1, M: 0, Q: 3, H: 2 };
  var QRMaskPattern = { PATTERN000: 0, PATTERN001: 1, PATTERN010: 2, PATTERN011: 3, PATTERN100: 4, PATTERN101: 5, PATTERN110: 6, PATTERN111: 7 };
  var QRUtil = {
    PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0, G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0, G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1, getBCHTypeInfo: function getBCHTypeInfo(data) {
      var d = data << 10;while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);}
      return (data << 10 | d) ^ QRUtil.G15_MASK;
    }, getBCHTypeNumber: function getBCHTypeNumber(data) {
      var d = data << 12;while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);}
      return data << 12 | d;
    }, getBCHDigit: function getBCHDigit(data) {
      var digit = 0;while (data != 0) {digit++;data >>>= 1;}
      return digit;
    }, getPatternPosition: function getPatternPosition(typeNumber) {return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];}, getMask: function getMask(maskPattern, i, j) {switch (maskPattern) {case QRMaskPattern.PATTERN000:return (i + j) % 2 == 0;case QRMaskPattern.PATTERN001:return i % 2 == 0;case QRMaskPattern.PATTERN010:return j % 3 == 0;case QRMaskPattern.PATTERN011:return (i + j) % 3 == 0;case QRMaskPattern.PATTERN100:return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;case QRMaskPattern.PATTERN101:return i * j % 2 + i * j % 3 == 0;case QRMaskPattern.PATTERN110:return (i * j % 2 + i * j % 3) % 2 == 0;case QRMaskPattern.PATTERN111:return (i * j % 3 + (i + j) % 2) % 2 == 0;default:throw new Error("bad maskPattern:" + maskPattern);}}, getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
      var a = new QRPolynomial([1], 0);for (var i = 0; i < errorCorrectLength; i++) {a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));}
      return a;
    }, getLengthInBits: function getLengthInBits(mode, type) {if (1 <= type && type < 10) {switch (mode) {case QRMode.MODE_NUMBER:return 10;case QRMode.MODE_ALPHA_NUM:return 9;case QRMode.MODE_8BIT_BYTE:return 8;case QRMode.MODE_KANJI:return 8;default:throw new Error("mode:" + mode);}} else if (type < 27) {switch (mode) {case QRMode.MODE_NUMBER:return 12;case QRMode.MODE_ALPHA_NUM:return 11;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 10;default:throw new Error("mode:" + mode);}} else if (type < 41) {switch (mode) {case QRMode.MODE_NUMBER:return 14;case QRMode.MODE_ALPHA_NUM:return 13;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 12;default:throw new Error("mode:" + mode);}} else {throw new Error("type:" + type);}}, getLostPoint: function getLostPoint(qrCode) {
      var moduleCount = qrCode.getModuleCount();var lostPoint = 0;for (var row = 0; row < moduleCount; row++) {
        for (var col = 0; col < moduleCount; col++) {
          var sameCount = 0;var dark = qrCode.isDark(row, col);for (var r = -1; r <= 1; r++) {
            if (row + r < 0 || moduleCount <= row + r) {continue;}
            for (var c = -1; c <= 1; c++) {
              if (col + c < 0 || moduleCount <= col + c) {continue;}
              if (r == 0 && c == 0) {continue;}
              if (dark == qrCode.isDark(row + r, col + c)) {sameCount++;}
            }
          }
          if (sameCount > 5) {lostPoint += 3 + sameCount - 5;}
        }
      }
      for (var row = 0; row < moduleCount - 1; row++) {for (var col = 0; col < moduleCount - 1; col++) {var count = 0;if (qrCode.isDark(row, col)) count++;if (qrCode.isDark(row + 1, col)) count++;if (qrCode.isDark(row, col + 1)) count++;if (qrCode.isDark(row + 1, col + 1)) count++;if (count == 0 || count == 4) {lostPoint += 3;}}}
      for (var row = 0; row < moduleCount; row++) {for (var col = 0; col < moduleCount - 6; col++) {if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {lostPoint += 40;}}}
      for (var col = 0; col < moduleCount; col++) {for (var row = 0; row < moduleCount - 6; row++) {if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {lostPoint += 40;}}}
      var darkCount = 0;for (var col = 0; col < moduleCount; col++) {for (var row = 0; row < moduleCount; row++) {if (qrCode.isDark(row, col)) {darkCount++;}}}
      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;lostPoint += ratio * 10;return lostPoint;
    } };

  var QRMath = {
    glog: function glog(n) {
      if (n < 1) {throw new Error("glog(" + n + ")");}
      return QRMath.LOG_TABLE[n];
    }, gexp: function gexp(n) {
      while (n < 0) {n += 255;}
      while (n >= 256) {n -= 255;}
      return QRMath.EXP_TABLE[n];
    }, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256) };
  for (var i = 0; i < 8; i++) {QRMath.EXP_TABLE[i] = 1 << i;}
  for (var i = 8; i < 256; i++) {QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];}
  for (var i = 0; i < 255; i++) {QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;}
  function QRPolynomial(num, shift) {
    if (num.length == undefined) {throw new Error(num.length + "/" + shift);}
    var offset = 0;while (offset < num.length && num[offset] == 0) {offset++;}
    this.num = new Array(num.length - offset + shift);for (var i = 0; i < num.length - offset; i++) {this.num[i] = num[i + offset];}
  }
  QRPolynomial.prototype = {
    get: function get(index) {return this.num[index];}, getLength: function getLength() {return this.num.length;}, multiply: function multiply(e) {
      var num = new Array(this.getLength() + e.getLength() - 1);for (var i = 0; i < this.getLength(); i++) {for (var j = 0; j < e.getLength(); j++) {num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));}}
      return new QRPolynomial(num, 0);
    }, mod: function mod(e) {
      if (this.getLength() - e.getLength() < 0) {return this;}
      var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));var num = new Array(this.getLength());for (var i = 0; i < this.getLength(); i++) {num[i] = this.get(i);}
      for (var i = 0; i < e.getLength(); i++) {num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);}
      return new QRPolynomial(num, 0).mod(e);
    } };

  function QRRSBlock(totalCount, dataCount) {this.totalCount = totalCount;this.dataCount = dataCount;}
  QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
  QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
    var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);if (rsBlock == undefined) {throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);}
    var length = rsBlock.length / 3;var list = [];for (var i = 0; i < length; i++) {var count = rsBlock[i * 3 + 0];var totalCount = rsBlock[i * 3 + 1];var dataCount = rsBlock[i * 3 + 2];for (var j = 0; j < count; j++) {list.push(new QRRSBlock(totalCount, dataCount));}}
    return list;
  };
  QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {switch (errorCorrectLevel) {case QRErrorCorrectLevel.L:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];case QRErrorCorrectLevel.M:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];case QRErrorCorrectLevel.Q:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];case QRErrorCorrectLevel.H:return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];default:return undefined;}};
  function QRBitBuffer() {this.buffer = [];this.length = 0;}
  QRBitBuffer.prototype = {
    get: function get(index) {var bufIndex = Math.floor(index / 8);return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;}, put: function put(num, length) {for (var i = 0; i < length; i++) {this.putBit((num >>> length - i - 1 & 1) == 1);}}, getLengthInBits: function getLengthInBits() {return this.length;}, putBit: function putBit(bit) {
      var bufIndex = Math.floor(this.length / 8);if (this.buffer.length <= bufIndex) {this.buffer.push(0);}
      if (bit) {this.buffer[bufIndex] |= 0x80 >>> this.length % 8;}
      this.length++;
    } };

  var QRCodeLimitLength = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]];

  // QRCode object
  QRCode = function QRCode(canvasId, vOption) {
    this._htOption = {
      width: 256,
      height: 256,
      typeNumber: 4,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRErrorCorrectLevel.H };


    if (typeof vOption === 'string') {
      vOption = {
        text: vOption };

    }

    // Overwrites options
    if (vOption) {
      for (var i in vOption) {
        this._htOption[i] = vOption[i];
      }
    }

    this._oQRCode = null;
    this.canvasId = canvasId;

    if (this._htOption.text && this.canvasId) {
      this.makeCode(this._htOption.text);
    }
  };

  QRCode.prototype.makeCode = function (sText) {
    this._oQRCode = new QRCodeModel(_getTypeNumber(sText, this._htOption.correctLevel), this._htOption.correctLevel);
    this._oQRCode.addData(sText);
    this._oQRCode.make();
    this.makeImage();
  };

  QRCode.prototype.makeImage = function () {
    var _oContext;
    if (this._htOption.usingIn) {
      _oContext = wx.createCanvasContext(this.canvasId, this._htOption.usingIn);
    } else
    {
      _oContext = wx.createCanvasContext(this.canvasId);
    }
    var _htOption = this._htOption;
    var oQRCode = this._oQRCode;

    var nCount = oQRCode.getModuleCount();
    var nWidth = _htOption.width / nCount;
    var nHeight = _htOption.height / nCount;
    var nRoundedWidth = Math.round(nWidth);
    var nRoundedHeight = Math.round(nHeight);

    if (_htOption.image && _htOption.image != '') {
      _oContext.drawImage(_htOption.image, 0, 0, _htOption.width, _htOption.height);
    }

    for (var row = 0; row < nCount; row++) {
      for (var col = 0; col < nCount; col++) {
        var bIsDark = oQRCode.isDark(row, col);
        var nLeft = col * nWidth;
        var nTop = row * nHeight;
        _oContext.setStrokeStyle(bIsDark ? _htOption.colorDark : _htOption.colorLight);
        // _oContext.setStrokeStyle('yellow')
        _oContext.setLineWidth(1);
        _oContext.setFillStyle(bIsDark ? _htOption.colorDark : _htOption.colorLight);
        // _oContext.setFillStyle('red')
        // if (bIsDark) {
        _oContext.fillRect(nLeft, nTop, nWidth, nHeight);
        // }

        // ?????? ???????????? ?????? ??????
        // if (bIsDark) {
        _oContext.strokeRect(
        Math.floor(nLeft) + 0.5,
        Math.floor(nTop) + 0.5,
        nRoundedWidth,
        nRoundedHeight);


        _oContext.strokeRect(
        Math.ceil(nLeft) - 0.5,
        Math.ceil(nTop) - 0.5,
        nRoundedWidth,
        nRoundedHeight);

        // }
        // _oContext.fillRect(
        //     Math.floor(nLeft) + 0.5,
        //     Math.floor(nTop) + 0.5,
        //     nRoundedWidth,
        //     nRoundedHeight
        // );
        // _oContext.fillRect(
        //     Math.ceil(nLeft) - 0.5,
        //     Math.ceil(nTop) - 0.5,
        //     nRoundedWidth,
        //     nRoundedHeight
        // );
        // _oContext.clearRect(
        //     Math.floor(nLeft) + 0.5,
        //     Math.floor(nTop) + 0.5,
        //     nRoundedWidth,
        //     nRoundedHeight
        // );
        // _oContext.clearRect(
        //     Math.ceil(nLeft) - 0.5,
        //     Math.ceil(nTop) - 0.5,
        //     nRoundedWidth,
        //     nRoundedHeight
        // );
      }
    }

    _oContext.draw();
  };

  // ?????????????????????????????????????????????
  QRCode.prototype.exportImage = function (callback) {
    if (!callback) {
      return;
    }
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: this._htOption.width,
      height: this._htOption.height,
      destWidth: this._htOption.width,
      destHeight: this._htOption.height,
      canvasId: this.canvasId,
      success: function success(res) {
        console.log(res.tempFilePath);
        callback(res.tempFilePath);
      } });

  };

  QRCode.CorrectLevel = QRErrorCorrectLevel;
})();

module.exports = QRCode;

/***/ }),

/***/ 24:
/*!*************************************************!*\
  !*** F:/hear/hear/store/module/huting/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _index = __webpack_require__(/*! @/api/huting/index.js */ 25);var _default =













{
  state: {
    sortType: 1, // ?????????????????????
    content: '', // ????????????????????????
    audioInfo: {}, // ??????????????????
    audioOrActicle: null, // 
    type: null, // ??????????????? ????????????
    voicePath: '', // ??????????????? 
    localId: null, // ????????????????????????id
    flag: false, // ?????????????????????
    audioOrauthor: null, // ??????????????????id???????????????
    allTime: 0 // ????????????????????????
  },
  getter: {
    getFlag: function getFlag(state) {
      return state.flag;
    } },

  mutations: {
    // ?????????????????????
    setSortType: function setSortType(state, value) {
      state.sortType = value;
    },

    //???????????????
    setContent: function setContent(state, value) {
      state.content = value;
    },

    // ??????audioInfo
    setAudioInfo: function setAudioInfo(state, value) {
      state.audioInfo = value;
    },

    // 
    setAudioOrActicle: function setAudioOrActicle(state, value) {
      state.audioOrActicle = value;
    },

    //  ????????????
    setType: function setType(state, value) {
      state.type = value;
    },

    //   ??????????????? 
    setVoicePath: function setVoicePath(state, value) {
      state.voicePath = value;
    },

    //????????????????????????id
    setLocalId: function setLocalId(state, value) {
      state.localId = value;
    },

    // ?????? flag
    setFlag: function setFlag(state, value) {
      state.flag = value;
    },

    // ?????????????????????id
    setAudioOrauthor: function setAudioOrauthor(state, value) {
      state.audioOrauthor = value;
    },

    setallTime: function setallTime(state, value) {
      state.allTime = value;
    } },

  actions: {
    // ??????-????????????????????????
    get_audio_list: function get_audio_list(_ref,



    obj) {var state = _ref.state,commit = _ref.commit,rootState = _ref.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_audio_list)(obj).then(function (res) {
          // console.log(res.data.data, "??????-????????????????????????");
          resolve(res.data.data);
        });
      });
    },

    //??????-????????????????????????
    get_article_list: function get_article_list(_ref2,



    obj) {var state = _ref2.state,commit = _ref2.commit,rootState = _ref2.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_article_list)(obj).then(function (res) {
          // console.log(res.data.data, "??????-????????????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ??????id????????????????????????
    get_audio_by_id: function get_audio_by_id(_ref3,



    obj) {var state = _ref3.state,commit = _ref3.commit,rootState = _ref3.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_audio_by_id)(obj).then(function (res) {
          // console.log(res.data, "??????id????????????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ??????-????????????
    get_reading_together: function get_reading_together(_ref4,



    obj) {var state = _ref4.state,commit = _ref4.commit,rootState = _ref4.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_reading_together)(obj).then(function (res) {
          console.log(res.data, "??????-????????????");
          resolve(res.data.data);
        });
      });
    },

    // ??????-??????????????????
    get_article_by_audio_id: function get_article_by_audio_id(_ref5,



    obj) {var state = _ref5.state,commit = _ref5.commit,rootState = _ref5.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_article_by_audio_id)(obj).then(function (res) {
          // console.log(res.data, "??????-??????????????????");
          resolve(res.data);
        });
      });
    },

    // ???????????????js sdk config json
    getWeinConfig: function getWeinConfig(_ref6,



    obj) {var state = _ref6.state,commit = _ref6.commit,rootState = _ref6.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.getWeinConfig)(obj).then(function (res) {
          // console.log(res, "???????????????js sdk config json");
          resolve(res);
        });
      });
    },

    // ??????????????????
    insert_audio: function insert_audio(_ref7,



    obj) {var state = _ref7.state,commit = _ref7.commit,rootState = _ref7.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.insert_audio)(obj).then(function (res) {
          // console.log(res, "??????????????????");
          resolve(res);
        });
      });
    },

    // ??????????????????
    insert_article: function insert_article(_ref8,



    obj) {var state = _ref8.state,commit = _ref8.commit,rootState = _ref8.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.insert_article)(obj).then(function (res) {
          // console.log(res, "??????????????????");
          resolve(res);
        });
      });
    },

    // ????????????
    get_all_category: function get_all_category(_ref9)



    {var state = _ref9.state,commit = _ref9.commit,rootState = _ref9.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_all_category)().then(function (res) {
          // console.log(res.data, "????????????");
          resolve(res.data.data);
        });
      });
    },

    // ????????????????????????
    increase_read_amount: function increase_read_amount(_ref10,



    obj) {var state = _ref10.state,commit = _ref10.commit,rootState = _ref10.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.increase_read_amount)(obj).then(function (res) {
          // console.log(res, "????????????????????????");
          resolve(res);
        });
      });
    },

    // ?????? ??????id ??????????????????
    get_article_by_id: function get_article_by_id(_ref11,



    obj) {var state = _ref11.state,commit = _ref11.commit,rootState = _ref11.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_article_by_id)(obj).then(function (res) {
          // console.log(res, "?????? ??????id ??????????????????");
          resolve(res.data.data);
        });
      });
    } } };exports.default = _default;

/***/ }),

/***/ 25:
/*!****************************************!*\
  !*** F:/hear/hear/api/huting/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.increase_read_amount = exports.get_all_category = exports.insert_article = exports.insert_audio = exports.getWeinConfig = exports.get_article_by_audio_id = exports.get_reading_together = exports.get_article_by_id = exports.get_audio_by_id = exports.get_article_list = exports.get_audio_list = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! ../index.js */ 26));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var http = _index.default.http;

var http1 = _index.default.http1;

// ??????-????????????????????????
// sortType	false	number	null	???????????? 1-???????????? 2-????????????
var get_audio_list = function get_audio_list(_ref)




{var sortType = _ref.sortType,pageNum = _ref.pageNum,pageSize = _ref.pageSize,content = _ref.content;
  return http.get('/listen/get_audio_list', {
    params: {
      sortType: sortType,
      pageNum: pageNum,
      pageSize: pageSize,
      content: content } });


};

// ??????-????????????????????????
// sortType	false	number	null	???????????? 1-???????????? 2-????????????
exports.get_audio_list = get_audio_list;var get_article_list = function get_article_list(_ref2)




{var sortType = _ref2.sortType,pageNum = _ref2.pageNum,pageSize = _ref2.pageSize,content = _ref2.content;
  return http.get('/article/get_article_list', {
    params: {
      sortType: sortType,
      pageNum: pageNum,
      pageSize: pageSize,
      content: content } });


};

// ??????id????????????????????????
// audioId	true	string		??????id
// userId????????????????????????id
// loginId??????????????????id
exports.get_article_list = get_article_list;var get_audio_by_id = function get_audio_by_id(_ref3)



{var audioId = _ref3.audioId,userId = _ref3.userId,loginId = _ref3.loginId;
  return http.get('/listen/get_audio_by_id', {
    params: {
      audioId: audioId,
      userId: userId
      // loginId
    } });

};

// ????????????id??????????????????
// articleId	true	number		??????ID
exports.get_audio_by_id = get_audio_by_id;var get_article_by_id = function get_article_by_id(_ref4)

{var articleId = _ref4.articleId;
  return http.get('article/get_article_by_id', {
    params: {
      articleId: articleId } });


};

// ??????-????????????
// audioId	true	string		??????id
exports.get_article_by_id = get_article_by_id;var get_reading_together = function get_reading_together(_ref5)



{var articleId = _ref5.articleId,pageNum = _ref5.pageNum,pageSize = _ref5.pageSize;
  return http.get('/listen/get_reading_together', {
    params: {
      articleId: articleId,
      pageNum: pageNum,
      pageSize: pageSize } });


};

// ??????-??????????????????
// audioId	true	string		??????id
exports.get_reading_together = get_reading_together;var get_article_by_audio_id = function get_article_by_audio_id(_ref6)

{var audioId = _ref6.audioId;
  return http.get('/article/get_article_by_audio_id', {
    params: {
      audioId: audioId } });


};

// ???????????????js sdk config json
exports.get_article_by_audio_id = get_article_by_audio_id;var getWeinConfig = function getWeinConfig() {
  return http.get('http://wechat.iqilu.com/api/jsSdkVue');
};

// ??????-????????????
// userId	true	number		??????id
// articleId	true	number		??????id
// audioAddress	true	string		????????????
// audioReadAmount	true	number		?????????
// audioTime	true	number		????????????
// praiseNum	true	number		?????????
// typeId	true	number		??????id
exports.getWeinConfig = getWeinConfig;var insert_audio = function insert_audio(_ref7)








{var userId = _ref7.userId,articleId = _ref7.articleId,audioAddress = _ref7.audioAddress,audioReadAmount = _ref7.audioReadAmount,audioTime = _ref7.audioTime,praiseNum = _ref7.praiseNum,typeId = _ref7.typeId,audioSize = _ref7.audioSize;
  return http.post('/listen/insert_audio', {
    // userId,
    articleId: articleId,
    audioAddress: audioAddress,
    audioReadAmount: 0,
    audioTime: audioTime,
    praiseNum: 0,
    typeId: 1,
    audioSize: audioSize });

};


// ??????-????????????
// userId	true	number	null	????????????ID
// articleAuthorName	true	string	null	????????????(???????????? + ?????????)
// cover	true	string	null	??????
// articleTitle	true	string	null	???/*  */?????????
// articleIntroduction	true	string	null	????????????
// articleContent	true	string	null	????????????
// articleReadAmount	true	number	null	?????????????????????
// circleId	true	number	null	??????id/*\ */
// articleType	true	number	null	???????????????1-???????????????2-???????????????
exports.insert_audio = insert_audio;var insert_article = function insert_article(_ref8)











{var userId = _ref8.userId,cover = _ref8.cover,articleTitle = _ref8.articleTitle,articleIntroduction = _ref8.articleIntroduction,articleContent = _ref8.articleContent,articleReadAmount = _ref8.articleReadAmount,circleId = _ref8.circleId,articleType = _ref8.articleType,labelIdListStr = _ref8.labelIdListStr,articleWords = _ref8.articleWords;
  return http.post('/article/insert_article', {
    // userId,
    // articleAuthorName,
    cover: cover,
    articleTitle: articleTitle,
    articleIntroduction: '????????????',
    articleContent: articleContent,
    articleReadAmount: 0,
    circleId: 1,
    articleType: 2,
    labelIdListStr: labelIdListStr,
    articleWords: articleWords });

};


// ????????????
exports.insert_article = insert_article;var get_all_category = function get_all_category() {
  return http.get('/category/get_all_category');
};


// ????????????????????????
// articleId	true	number		??????id
exports.get_all_category = get_all_category;var increase_read_amount = function increase_read_amount(_ref9)

{var articleId = _ref9.articleId;
  return http.get('/article/increase_read_amount', {
    params: {
      articleId: articleId } });


};exports.increase_read_amount = increase_read_amount;

/***/ }),

/***/ 26:
/*!*********************************!*\
  !*** F:/hear/hear/api/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! @/libs/luch-request/index.js */ 27));
var _baseUrl = _interopRequireDefault(__webpack_require__(/*! @/libs/config/baseUrl.js */ 40));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
// console.log(api.apiUrl);
var baseURL1 = _baseUrl.default.comment; //?????? ???????????????
var baseURL = _baseUrl.default.apiUrl; //?????????

var http = new _index.default({
  baseURL: baseURL,
  timeout: 30000 });



http.interceptors.request.use(function (config) {// ?????????async await ???????????????
  if (config.url.indexOf('comment_page') != -1) {
    console.log(config);
    config.baseURL = _baseUrl.default.comment;
    // console.log(config);
    var _token = uni.getStorageSync('commentToken');
    config.url += "?token=".concat(_token);
    config.header = {
      "Content-Type": 'application/x-www-form-urlencoded' };

    return config;
  }
  var token = uni.getStorageSync('token');
  if (token) {
    config.header = {
      token: token };

  } else {
    config.header = {};
  }
  return config;
}, function (config) {// ?????????async await ???????????????
  return Promise.reject(config);
});

var http1 = new _index.default({
  baseURL1: baseURL1,
  timeout: 30000 });



http1.interceptors.request.use(function (config) {// ?????????async await ???????????????
  var token = uni.getStorageSync('token');
  if (token) {
    config.header = {
      token: token };

  } else {
    config.header = {};
  }
  return config;
}, function (config) {// ?????????async await ???????????????
  return Promise.reject(config);
});var _default =

{
  http: http,
  http1: http1 };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 27:
/*!***********************************************!*\
  !*** F:/hear/hear/libs/luch-request/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _Request = _interopRequireDefault(__webpack_require__(/*! ./core/Request */ 28));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =
_Request.default;exports.default = _default;

/***/ }),

/***/ 28:
/*!******************************************************!*\
  !*** F:/hear/hear/libs/luch-request/core/Request.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













var _dispatchRequest = _interopRequireDefault(__webpack_require__(/*! ./dispatchRequest */ 29));
var _InterceptorManager = _interopRequireDefault(__webpack_require__(/*! ./InterceptorManager */ 37));
var _mergeConfig = _interopRequireDefault(__webpack_require__(/*! ./mergeConfig */ 38));
var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults */ 39));
var _utils = __webpack_require__(/*! ../utils */ 32);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var

Request = /*#__PURE__*/function () {
  /**
                                     * @param {Object} arg - ????????????
                                     * @param {String} arg.baseURL - ???????????????
                                     * @param {Object} arg.header - ??????header
                                     * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - ????????????????????????
                                     * @param {String} arg.dataType = [json] - ???????????????dataType
                                     * @param {String} arg.responseType = [text|arraybuffer] - ???????????????responseType???App??????????????????????????????
                                     * @param {Object} arg.custom - ??????????????????????????????
                                     * @param {Number} arg.timeout - ???????????????????????????????????? ms?????????30000????????????????????????2.10.0??????????????????????????????
                                     * @param {Boolean} arg.sslVerify - ??????????????????????????? ssl ???????????????true.???App??????????????????HBuilderX 2.3.3+???
                                     * @param {Boolean} arg.withCredentials - ???????????????????????????????????????????????????cookies????????????false??????H5?????????HBuilderX 2.6.15+???
                                     * @param {Boolean} arg.firstIpv4 - ???DNS?????????????????????ipv4?????????false?????? App-Android ?????? (HBuilderX 2.8.0+)
                                     * @param {Function(statusCode):Boolean} arg.validateStatus - ??????????????????????????????????????????statusCode >= 200 && statusCode < 300
                                     */
  function Request() {var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, Request);
    if (!(0, _utils.isPlainObject)(arg)) {
      arg = {};
      console.warn('????????????????????????????????????Object');
    }
    this.config = _objectSpread(_objectSpread({}, _defaults.default), arg);
    this.interceptors = {
      request: new _InterceptorManager.default(),
      response: new _InterceptorManager.default() };

  }

  /**
     * @Function
     * @param {Request~setConfigCallback} f - ????????????????????????
     */_createClass(Request, [{ key: "setConfig", value: function setConfig(
    f) {
      this.config = f(this.config);
    } }, { key: "middleware", value: function middleware(

    config) {
      config = (0, _mergeConfig.default)(this.config, config);
      var chain = [_dispatchRequest.default, undefined];
      var promise = Promise.resolve(config);

      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });

      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });

      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }

      return promise;
    }

    /**
       * @Function
       * @param {Object} config - ???????????????
       * @prop {String} options.url - ????????????
       * @prop {Object} options.data - ????????????
       * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - ?????????????????????
       * @prop {Object} [options.dataType = config.dataType] - ???????????? json??????????????????????????????????????? JSON.parse
       * @prop {Object} [options.header = config.header] - ??????header
       * @prop {Object} [options.method = config.method] - ????????????
       * @returns {Promise<unknown>}
       */ }, { key: "request", value: function request()
    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.middleware(config);
    } }, { key: "get", value: function get(

    url) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.middleware(_objectSpread({
        url: url,
        method: 'GET' },
      options));

    } }, { key: "post", value: function post(

    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'POST' },
      options));

    } }, { key: "put", value: function put(


    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'PUT' },
      options));

    } }, { key: "delete", value: function _delete(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE' },
      options));

    } }, { key: "connect", value: function connect(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT' },
      options));

    } }, { key: "head", value: function head(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD' },
      options));

    } }, { key: "options", value: function options(




    url, data) {var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS' },
      _options));

    } }, { key: "trace", value: function trace(




    url, data) {var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE' },
      options));

    } }, { key: "upload", value: function upload(



    url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'UPLOAD';
      return this.middleware(config);
    } }, { key: "download", value: function download(

    url) {var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'DOWNLOAD';
      return this.middleware(config);
    } }]);return Request;}();



/**
                               * setConfig??????
                               * @return {Object} - ??????????????????config
                               * @callback Request~setConfigCallback
                               * @param {Object} config - ????????????config
                               */exports.default = Request;

/***/ }),

/***/ 29:
/*!**************************************************************!*\
  !*** F:/hear/hear/libs/luch-request/core/dispatchRequest.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! ../adapters/index */ 30));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =


function _default(config) {
  return (0, _index.default)(config);
};exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!********************************************************!*\
  !*** F:/hear/hear/libs/luch-request/adapters/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _buildURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/buildURL */ 31));
var _buildFullPath = _interopRequireDefault(__webpack_require__(/*! ../core/buildFullPath */ 33));
var _settle = _interopRequireDefault(__webpack_require__(/*! ../core/settle */ 36));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * ??????????????????????????????
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param {Array} keys - ???????????????
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param {Object} config2 - ??????
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @return {{}} - ??????????????????
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */
var mergeKeys = function mergeKeys(keys, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });
  return config;
};var _default =
function _default(config) {
  return new Promise(function (resolve, reject) {
    var _config = {
      url: (0, _buildURL.default)((0, _buildFullPath.default)(config.baseURL, config.url), config.params),
      header: config.header,
      complete: function complete(response) {
        response.config = config;
        try {
          // ????????????????????????json ???????????????
          if (typeof response.data === 'string') {
            response.data = JSON.parse(response.data);
          }
          // eslint-disable-next-line no-empty
        } catch (e) {
        }
        (0, _settle.default)(resolve, reject, response);
      } };

    var requestTask;
    if (config.method === 'UPLOAD') {
      delete _config.header['content-type'];
      delete _config.header['Content-Type'];
      var otherConfig = {



        filePath: config.filePath,
        name: config.name };

      var optionalKeys = [






      'formData'];

      requestTask = uni.uploadFile(_objectSpread(_objectSpread(_objectSpread({}, _config), otherConfig), mergeKeys(optionalKeys, config)));
    } else if (config.method === 'DOWNLOAD') {
      requestTask = uni.downloadFile(_config);
    } else {
      var _optionalKeys = [
      'data',
      'method',

      'timeout',

      'dataType',

      'responseType'];











      requestTask = uni.request(_objectSpread(_objectSpread({}, _config), mergeKeys(_optionalKeys, config)));
    }
    if (config.getTask) {
      config.getTask(requestTask, config);
    }
  });
};exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 31:
/*!**********************************************************!*\
  !*** F:/hear/hear/libs/luch-request/helpers/buildURL.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildURL;

var utils = _interopRequireWildcard(__webpack_require__(/*! ./../utils */ 32));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

function encode(val) {
  return encodeURIComponent(val).
  replace(/%40/gi, '@').
  replace(/%3A/gi, ':').
  replace(/%24/g, '$').
  replace(/%2C/gi, ',').
  replace(/%20/g, '+').
  replace(/%5B/gi, '[').
  replace(/%5D/gi, ']');
}

/**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
function buildURL(url, params) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

/***/ }),

/***/ 32:
/*!***********************************************!*\
  !*** F:/hear/hear/libs/luch-request/utils.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// utils is a library of generic helper functions non-specific to axios
Object.defineProperty(exports, "__esModule", { value: true });exports.isArray = isArray;exports.isObject = isObject;exports.isDate = isDate;exports.isURLSearchParams = isURLSearchParams;exports.forEach = forEach;exports.isBoolean = isBoolean;exports.isPlainObject = isPlainObject;exports.deepMerge = deepMerge;
var toString = Object.prototype.toString;

/**
                                           * Determine if a value is an Array
                                           *
                                           * @param {Object} val The value to test
                                           * @returns {boolean} True if value is an Array, otherwise false
                                           */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}


/**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}


/**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
   * ?????????boolean ???
   * @param val
   * @returns {boolean}
   */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/**
   * ????????????????????????{} new Object
   * @param {any} obj - ???????????????
   * @returns {boolean}
   */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}



/**
   * Function equal to merge with the difference being that no reference
   * to original objects is kept.
   *
   * @see merge
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
function deepMerge() /* obj1, obj2, obj3, ... */{
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/***/ }),

/***/ 33:
/*!************************************************************!*\
  !*** F:/hear/hear/libs/luch-request/core/buildFullPath.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = buildFullPath;

var _isAbsoluteURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/isAbsoluteURL */ 34));
var _combineURLs = _interopRequireDefault(__webpack_require__(/*! ../helpers/combineURLs */ 35));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                            * Creates a new URL by combining the baseURL with the requestedURL,
                                                                                                                                                                            * only when the requestedURL is not already an absolute URL.
                                                                                                                                                                            * If the requestURL is absolute, this function returns the requestedURL untouched.
                                                                                                                                                                            *
                                                                                                                                                                            * @param {string} baseURL The base URL
                                                                                                                                                                            * @param {string} requestedURL Absolute or relative URL to combine
                                                                                                                                                                            * @returns {string} The combined full path
                                                                                                                                                                            */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0, _isAbsoluteURL.default)(requestedURL)) {
    return (0, _combineURLs.default)(baseURL, requestedURL);
  }
  return requestedURL;
}

/***/ }),

/***/ 34:
/*!***************************************************************!*\
  !*** F:/hear/hear/libs/luch-request/helpers/isAbsoluteURL.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Determines whether the specified URL is absolute
               *
               * @param {string} url The URL to test
               * @returns {boolean} True if the specified URL is absolute, otherwise false
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = isAbsoluteURL;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/***/ }),

/***/ 35:
/*!*************************************************************!*\
  !*** F:/hear/hear/libs/luch-request/helpers/combineURLs.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
               * Creates a new URL by combining the specified URLs
               *
               * @param {string} baseURL The base URL
               * @param {string} relativeURL The relative URL
               * @returns {string} The combined URL
               */Object.defineProperty(exports, "__esModule", { value: true });exports.default = combineURLs;
function combineURLs(baseURL, relativeURL) {
  return relativeURL ?
  baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
  baseURL;
}

/***/ }),

/***/ 36:
/*!*****************************************************!*\
  !*** F:/hear/hear/libs/luch-request/core/settle.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = settle; /**
                                                                                                      * Resolve or reject a Promise based on response status.
                                                                                                      *
                                                                                                      * @param {Function} resolve A function that resolves the promise.
                                                                                                      * @param {Function} reject A function that rejects the promise.
                                                                                                      * @param {object} response The response.
                                                                                                      */
function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  var status = response.statusCode;
  if (status && (!validateStatus || validateStatus(status))) {
    resolve(response);
  } else {
    reject(response);
  }
}

/***/ }),

/***/ 37:
/*!*****************************************************************!*\
  !*** F:/hear/hear/libs/luch-request/core/InterceptorManager.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;


function InterceptorManager() {
  this.handlers = [];
}

/**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected });

  return this.handlers.length - 1;
};

/**
    * Remove an interceptor from the stack
    *
    * @param {Number} id The ID that was returned by `use`
    */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
    * Iterate over all the registered interceptors
    *
    * This method is particularly useful for skipping over any
    * interceptors that may have become `null` calling `eject`.
    *
    * @param {Function} fn The function to call for each interceptor
    */
InterceptorManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach(function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};var _default =

InterceptorManager;exports.default = _default;

/***/ }),

/***/ 38:
/*!**********************************************************!*\
  !*** F:/hear/hear/libs/luch-request/core/mergeConfig.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _utils = __webpack_require__(/*! ../utils */ 32);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Array} keys - ?????????
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} globalsConfig - ?????????????????????
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @param {Object} config2 - ????????????
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * @return {{}}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */
var mergeKeys = function mergeKeys(keys, globalsConfig, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof globalsConfig[prop] !== 'undefined') {
      config[prop] = globalsConfig[prop];
    }
  });
  return config;
};
/**
    *
    * @param globalsConfig - ???????????????????????????
    * @param config2 - ?????????????????????
    * @return - ??????????????????
    */var _default =
function _default(globalsConfig) {var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = config2.method || globalsConfig.method || 'GET';
  var config = {
    baseURL: globalsConfig.baseURL || '',
    method: method,
    url: config2.url || '',
    params: config2.params || {},
    custom: _objectSpread(_objectSpread({}, globalsConfig.custom || {}), config2.custom || {}),
    header: (0, _utils.deepMerge)(globalsConfig.header || {}, config2.header || {}) };

  var defaultToConfig2Keys = ['getTask', 'validateStatus'];
  config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultToConfig2Keys, globalsConfig, config2));

  // eslint-disable-next-line no-empty
  if (method === 'DOWNLOAD') {

  } else if (method === 'UPLOAD') {
    delete config.header['content-type'];
    delete config.header['Content-Type'];
    var uploadKeys = [









    'filePath',
    'name',
    'formData'];

    uploadKeys.forEach(function (prop) {
      if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      }
    });
  } else {
    var defaultsKeys = [
    'data',

    'timeout',

    'dataType',

    'responseType'];











    config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultsKeys, globalsConfig, config2));
  }

  return config;
};exports.default = _default;

/***/ }),

/***/ 385:
/*!************************************************************!*\
  !*** F:/hear/hear/components/mescroll-uni/mescroll-uni.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = MeScroll; /* mescroll
                                                                                                        * version 1.3.2
                                                                                                        * 2020-08-05 wenju
                                                                                                        * http://www.mescroll.com
                                                                                                        */

function MeScroll(options, isScrollBody) {
  var me = this;
  me.version = '1.3.2'; // mescroll?????????
  me.options = options || {}; // ??????
  me.isScrollBody = isScrollBody || false; // ???????????????????????????????????????; ?????????scroll-view

  me.isDownScrolling = false; // ????????????????????????????????????
  me.isUpScrolling = false; // ????????????????????????????????????
  var hasDownCallback = me.options.down && me.options.down.callback; // ???????????????down???callback

  // ?????????????????????
  me.initDownScroll();
  // ?????????????????????,????????????
  me.initUpScroll();

  // ????????????
  setTimeout(function () {// ?????????????????????????????????,??????new MeScroll????????????,?????????????????????mescroll?????????
    // ???????????????????????? (???????????????down???callback???????????????????????????)
    if ((me.optDown.use || me.optDown.native) && me.optDown.auto && hasDownCallback) {
      if (me.optDown.autoShowLoading) {
        me.triggerDownScroll(); // ??????????????????,??????????????????
      } else {
        me.optDown.callback && me.optDown.callback(me); // ?????????????????????,????????????????????????
      }
    }
    // ????????????????????????
    if (!me.isUpAutoLoad) {// ???????????????(???????????????)emit?????????, ?????????isUpAutoLoad????????????, ????????????????????????down???callback,?????????up???callback
      setTimeout(function () {
        me.optUp.use && me.optUp.auto && !me.isUpAutoLoad && me.triggerUpScroll();
      }, 100);
    }
  }, 30); // ??????me.optDown.inited???me.optUp.inited?????????
}

/* ????????????:???????????? */
MeScroll.prototype.extendDownScroll = function (optDown) {
  // ?????????????????????
  MeScroll.extend(optDown, {
    use: true, // ????????????????????????; ??????true
    auto: true, // ???????????????????????????????????????????????????????????????; ??????true
    native: false, // ???????????????????????????????????????; ??????false; ???mescroll-body?????? (??????true???,?????????pages??????enablePullDownRefresh:true;????????????mescroll-native?????????)
    autoShowLoading: false, // ????????????auto=true(?????????????????????????????????????????????????????????),???????????????????????????????????????; ??????false
    isLock: false, // ????????????????????????,??????false;
    offset: 80, // ???????????????,????????????80px,???????????????????????????????????????
    startTop: 100, // scroll-view????????????????????????,?????????scroll-top????????????0, ?????????????????????????????????
    inOffsetRate: 1, // ???????????????,?????????????????????offset???,??????????????????????????????;?????????1????????????0,??????????????????,???????????????????????????
    outOffsetRate: 0.2, // ???????????????,?????????????????????offset???,??????????????????????????????;?????????1????????????0,??????????????????,???????????????????????????
    bottomOffset: 20, // ?????????touchmove???????????????body??????20px????????????????????????????????????,??????Webview????????????touchend???????????????
    minAngle: 45, // ?????????????????????????????????,????????????  [0,90];??????45???,??????????????????????????????45??????????????????;?????????45???,??????????????????,?????????????????????????????????????????????;
    textInOffset: '????????????', // ??????????????????offset????????????????????????
    textOutOffset: '????????????', // ?????????????????????offset?????????????????????
    textLoading: '????????? ...', // ????????????????????????
    bgColor: "transparent", // ???????????? (?????????pages.json??????????????????backgroundColorTop)
    textColor: "gray", // ???????????? (???bgColor???????????????,???textColor????????????,???textColor??????????????????)
    inited: null, // ????????????????????????????????????
    inOffset: null, // ?????????????????????offset???????????????????????????
    outOffset: null, // ?????????????????????offset??????????????????
    onMoving: null, // ????????????????????????,???????????????????????????; rate????????????????????????????????????????????????(inOffset: rate<1; outOffset: rate>=1); downHight???????????????????????????
    beforeLoading: null, // ?????????????????????????????????: ??????return true,????????????showLoading???callback??????; ????????????????????????????????????, ????????????????????? v6.8.0???
    showLoading: null, // ?????????????????????????????????
    afterLoading: null, // ???????????????????????????????????????,???????????????????????? (???: ???wxs?????????)
    beforeEndDownScroll: null, // ???????????????????????????. ???????????????????????????????????????,??????0ms; ?????????????????????????????????????????????????????????,?????????????????????????????????, ???????????????dotJump???
    endDownScroll: null, // ???????????????????????????
    afterEndDownScroll: null, // ???????????????????????????,???????????????????????? (???: ???wxs?????????)
    callback: function callback(mescroll) {
      // ?????????????????????;??????????????????????????????????????????
      mescroll.resetUpScroll();
    } });

};

/* ????????????:???????????? */
MeScroll.prototype.extendUpScroll = function (optUp) {
  // ?????????????????????
  MeScroll.extend(optUp, {
    use: true, // ????????????????????????; ??????true
    auto: true, // ???????????????????????????????????????????????????????????????; ??????true
    isLock: false, // ????????????????????????,??????false;
    isBoth: true, // ???????????????,???????????????????????????????????????????????????????????????;??????true,?????????????????????;
    callback: null, // ?????????????????????;function(page,mescroll){ }
    page: {
      num: 0, // ????????????,??????0,??????????????????1,???callback(page)??????1??????
      size: 10, // ?????????????????????
      time: null // ?????????????????????????????????????????????; ?????????????????????,??????????????????????????????????????????????????????;
    },
    noMoreSize: 5, // ????????????????????????,??????????????????????????????????????????5???????????????????????????;????????????????????????(????????????????????????),?????????????????????????????????
    offset: 80, // ??????????????????,??????upCallback
    textLoading: '????????? ...', // ????????????????????????
    textNoMore: '-- END --', // ?????????????????????????????????
    bgColor: "transparent", // ???????????? (?????????pages.json??????????????????backgroundColorBottom)
    textColor: "gray", // ???????????? (???bgColor???????????????,???textColor????????????,???textColor??????????????????)
    inited: null, // ????????????????????????
    showLoading: null, // ????????????????????????
    showNoMore: null, // ??????????????????????????????
    hideUpScroll: null, // ???????????????????????????
    errDistance: 60, // endErr????????????????????????????????????,?????????????????????????????????onReachBottom,???mescroll-body??????
    toTop: {
      // ??????????????????,?????????src?????????
      src: null, // ????????????,??????null (????????????????????????)
      offset: 1000, // ???????????????????????????????????????????????????,??????1000
      duration: 300, // ???????????????????????????,??????300ms (?????????0???300?????????????????????????????????,?????????; ??????????????????step??????,??????????????????????????????,??????????????????????????????????????????)
      btnClick: null, // ?????????????????????
      onShow: null, // ?????????????????????
      zIndex: 9990, // fixed??????z-index???
      left: null, // ??????????????????, ??????null. ???????????????,right?????????. (??????20, "20rpx", "20px", "20%"????????????, ??????????????????????????????rpx)
      right: 20, // ??????????????????, ??????20 (??????20, "20rpx", "20px", "20%"????????????, ??????????????????????????????rpx)
      bottom: 120, // ??????????????????, ??????120 (??????20, "20rpx", "20px", "20%"????????????, ??????????????????????????????rpx)
      safearea: false, // bottom????????????????????????????????????????????????, ??????false, ????????????iPhoneX????????? (????????????????????????????????????,?????????vue???safearea???)
      width: 72, // ???????????????????????????, ??????72 (??????20, "20rpx", "20px", "20%"????????????, ??????????????????????????????rpx)
      radius: "50%" // ??????, ??????"50%" (??????20, "20rpx", "20px", "20%"????????????, ??????????????????????????????rpx)
    },
    empty: {
      use: true, // ?????????????????????
      icon: null, // ????????????
      tip: '~ ?????????????????? ~', // ??????
      btnText: '', // ??????
      btnClick: null, // ?????????????????????
      onShow: null, // ?????????????????????
      fixed: false, // ????????????fixed??????,??????false; ??????fixed???true,?????????top???zIndex????????? (transform??????fixed??????,??????????????????absolute)
      top: "100rpx", // fixed?????????top??? (??????????????????,??? "10%"; "100rpx")
      zIndex: 99 // fixed??????z-index???
    },
    onScroll: false // ????????????????????????
  });
};

/* ???????????? */
MeScroll.extend = function (userOption, defaultOption) {
  if (!userOption) return defaultOption;
  for (var key in defaultOption) {
    if (userOption[key] == null) {
      var def = defaultOption[key];
      if (def != null && typeof def === 'object') {
        userOption[key] = MeScroll.extend({}, def); // ????????????
      } else {
        userOption[key] = def;
      }
    } else if (typeof userOption[key] === 'object') {
      MeScroll.extend(userOption[key], defaultOption[key]); // ????????????
    }
  }
  return userOption;
};

/* ????????????????????????????????? (?????????,?????????) */
MeScroll.prototype.hasColor = function (color) {
  if (!color) return false;
  var c = color.toLowerCase();
  return c != "#fff" && c != "#ffffff" && c != "transparent" && c != "white";
};

/* -------?????????????????????------- */
MeScroll.prototype.initDownScroll = function () {
  var me = this;
  // ????????????
  me.optDown = me.options.down || {};
  if (!me.optDown.textColor && me.hasColor(me.optDown.bgColor)) me.optDown.textColor = "#fff"; // ???bgColor?????????textColor?????????,???textColor????????????
  me.extendDownScroll(me.optDown);

  // ?????????mescroll-body????????????native,?????????????????????????????????
  if (me.isScrollBody && me.optDown.native) {
    me.optDown.use = false;
  } else {
    me.optDown.native = false; // ???mescroll-body??????,mescroll-uni?????????
  }

  me.downHight = 0; // ?????????????????????

  // ??????????????????????????????
  if (me.optDown.use && me.optDown.inited) {
    // ????????????????????????
    setTimeout(function () {// ?????????????????????????????????,??????new MeScroll????????????,?????????????????????mescroll?????????
      me.optDown.inited(me);
    }, 0);
  }
};

/* ??????touchstart?????? */
MeScroll.prototype.touchstartEvent = function (e) {
  if (!this.optDown.use) return;

  this.startPoint = this.getPoint(e); // ????????????
  this.startTop = this.getScrollTop(); // ??????????????????????????????
  this.startAngle = 0; // ????????????
  this.lastPoint = this.startPoint; // ????????????move??????
  this.maxTouchmoveY = this.getBodyHeight() - this.optDown.bottomOffset; // ???????????????????????????(??????touchstart??????body???????????????0?????????)
  this.inTouchend = false; // ????????????touchend
};

/* ??????touchmove?????? */
MeScroll.prototype.touchmoveEvent = function (e) {
  if (!this.optDown.use) return;
  var me = this;

  var scrollTop = me.getScrollTop(); // ????????????????????????
  var curPoint = me.getPoint(e); // ?????????

  var moveY = curPoint.y - me.startPoint.y; // ????????????,???????????????,??????0?????????,??????0?????????

  // ????????? && ?????????
  // mescroll-body,???????????????????????????
  // scroll-view????????????????????????touchmove,?????????/???/???/??????,????????????touchmove
  // scroll-view??????????????????,scrollTop????????????0,??????????????????0; ???iOS???APP???scrollTop???????????????,????????????startTop??????
  if (moveY > 0 && (
  me.isScrollBody && scrollTop <= 0 ||

  !me.isScrollBody && (scrollTop <= 0 || scrollTop <= me.optDown.startTop && scrollTop === me.startTop)))
  {
    // ??????????????????
    if (!me.inTouchend && !me.isDownScrolling && !me.optDown.isLock && (!me.isUpScrolling || me.isUpScrolling &&
    me.optUp.isBoth)) {

      // ????????????????????????????????????????????????
      if (!me.startAngle) me.startAngle = me.getAngle(me.lastPoint, curPoint); // ?????????????????????,?????? [0,90]
      if (me.startAngle < me.optDown.minAngle) return; // ???????????????????????????,??????????????????????????????

      // ??????????????????????????????????????????,?????????????????????,??????Webview????????????touchend????????????
      if (me.maxTouchmoveY > 0 && curPoint.y >= me.maxTouchmoveY) {
        me.inTouchend = true; // ????????????touchend
        me.touchendEvent(); // ????????????touchend
        return;
      }

      me.preventDefault(e); // ??????????????????

      var diff = curPoint.y - me.lastPoint.y; // ????????????,??????????????? (??????0??????,??????0??????)

      // ????????????  < ????????????
      if (me.downHight < me.optDown.offset) {
        if (me.movetype !== 1) {
          me.movetype = 1; // ????????????,?????????????????????
          me.optDown.inOffset && me.optDown.inOffset(me); // ?????????????????????????????????????????????,???????????????
          me.isMoveDown = true; // ??????????????????????????????,???touchend????????????
        }
        me.downHight += diff * me.optDown.inOffsetRate; // ?????????,??????????????????

        // ????????????  <= ????????????
      } else {
        if (me.movetype !== 2) {
          me.movetype = 2; // ????????????,?????????????????????
          me.optDown.outOffset && me.optDown.outOffset(me); // ??????????????????????????????????????????,???????????????
          me.isMoveDown = true; // ??????????????????????????????,???touchend????????????
        }
        if (diff > 0) {// ?????????
          me.downHight += diff * me.optDown.outOffsetRate; // ?????????,??????????????????
        } else {// ?????????
          me.downHight += diff; // ??????????????????,?????????????????????????????????
        }
      }

      me.downHight = Math.round(me.downHight); // ??????
      var rate = me.downHight / me.optDown.offset; // ????????????????????????????????????????????????
      me.optDown.onMoving && me.optDown.onMoving(me, rate, me.downHight); // ????????????????????????,???????????????
    }
  }

  me.lastPoint = curPoint; // ????????????????????????
};

/* ??????touchend?????? */
MeScroll.prototype.touchendEvent = function (e) {
  if (!this.optDown.use) return;
  // ?????????????????????????????????,??????????????????
  if (this.isMoveDown) {
    if (this.downHight >= this.optDown.offset) {
      // ???????????????????????????
      this.triggerDownScroll();
    } else {
      // ??????????????? ?????????
      this.downHight = 0;
      this.endDownScrollCall(this);
    }
    this.movetype = 0;
    this.isMoveDown = false;
  } else if (!this.isScrollBody && this.getScrollTop() === this.startTop) {// scroll-view??????/???/???/??????????????????
    var isScrollUp = this.getPoint(e).y - this.startPoint.y < 0; // ????????????,???????????????,??????0?????????,??????0?????????
    // ??????
    if (isScrollUp) {
      // ????????????????????????
      var angle = this.getAngle(this.getPoint(e), this.startPoint); // ?????????????????????,?????? [0,90]
      if (angle > 80) {
        // ?????????????????????
        this.triggerUpScroll(true);
      }
    }
  }
};

/* ?????????????????????????????????????????????????????? */
MeScroll.prototype.getPoint = function (e) {
  if (!e) {
    return {
      x: 0,
      y: 0 };

  }
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY };

  } else if (e.changedTouches && e.changedTouches[0]) {
    return {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY };

  } else {
    return {
      x: e.clientX,
      y: e.clientY };

  }
};

/* ???????????????????????????: ?????? [0,90]*/
MeScroll.prototype.getAngle = function (p1, p2) {
  var x = Math.abs(p1.x - p2.x);
  var y = Math.abs(p1.y - p2.y);
  var z = Math.sqrt(x * x + y * y);
  var angle = 0;
  if (z !== 0) {
    angle = Math.asin(y / z) / Math.PI * 180;
  }
  return angle;
};

/* ?????????????????? */
MeScroll.prototype.triggerDownScroll = function () {
  if (this.optDown.beforeLoading && this.optDown.beforeLoading(this)) {
    //return true??????????????????????????????
  } else {
    this.showDownScroll(); // ???????????????...
    !this.optDown.native && this.optDown.callback && this.optDown.callback(this); // ????????????,??????????????????
  }
};

/* ???????????????????????? */
MeScroll.prototype.showDownScroll = function () {
  this.isDownScrolling = true; // ???????????????
  if (this.optDown.native) {
    uni.startPullDownRefresh(); // ???????????????????????????
    this.showDownLoadingCall(0); // ?????????showLoading,????????????????????????
  } else {
    this.downHight = this.optDown.offset; // ????????????????????????
    this.showDownLoadingCall(this.downHight); // ???????????????...
  }
};

MeScroll.prototype.showDownLoadingCall = function (downHight) {
  this.optDown.showLoading && this.optDown.showLoading(this, downHight); // ???????????????...
  this.optDown.afterLoading && this.optDown.afterLoading(this, downHight); // ???????????????...????????????????????????????????????
};

/* ????????????????????????????????????????????????????????? */
MeScroll.prototype.onPullDownRefresh = function () {
  this.isDownScrolling = true; // ???????????????
  this.showDownLoadingCall(0); // ?????????showLoading,????????????????????????
  this.optDown.callback && this.optDown.callback(this); // ????????????,??????????????????
};

/* ?????????????????? */
MeScroll.prototype.endDownScroll = function () {
  if (this.optDown.native) {// ????????????????????????
    this.isDownScrolling = false;
    this.endDownScrollCall(this);
    uni.stopPullDownRefresh();
    return;
  }
  var me = this;
  // ???????????????????????????
  var endScroll = function endScroll() {
    me.downHight = 0;
    me.isDownScrolling = false;
    me.endDownScrollCall(me);
    if (!me.isScrollBody) {
      me.setScrollHeight(0); // scroll-view??????????????????,?????????????????????????????????????????????
      me.scrollTo(0, 0); // scroll-view???????????????????????????,??????startTop??????0???,????????????????????????
    }
  };
  // ??????????????????????????????
  var delay = 0;
  if (me.optDown.beforeEndDownScroll) delay = me.optDown.beforeEndDownScroll(me); // ???????????????????????????,??????ms
  if (typeof delay === 'number' && delay > 0) {
    setTimeout(endScroll, delay);
  } else {
    endScroll();
  }
};

MeScroll.prototype.endDownScrollCall = function () {
  this.optDown.endDownScroll && this.optDown.endDownScroll(this);
  this.optDown.afterEndDownScroll && this.optDown.afterEndDownScroll(this);
};

/* ??????????????????:isLock=ture,null??????;isLock=false?????? */
MeScroll.prototype.lockDownScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optDown.isLock = isLock;
};

/* ??????????????????:isLock=ture,null??????;isLock=false?????? */
MeScroll.prototype.lockUpScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optUp.isLock = isLock;
};

/* -------?????????????????????------- */
MeScroll.prototype.initUpScroll = function () {
  var me = this;
  // ????????????
  me.optUp = me.options.up || { use: false };
  if (!me.optUp.textColor && me.hasColor(me.optUp.bgColor)) me.optUp.textColor = "#fff"; // ???bgColor?????????textColor?????????,???textColor????????????
  me.extendUpScroll(me.optUp);

  if (me.optUp.use === false) return; // ??????????????????????????????,???????????????????????????
  me.optUp.hasNext = true; // ??????????????????,?????????????????????
  me.startNum = me.optUp.page.num + 1; // ??????page???????????????

  // ????????????????????????
  if (me.optUp.inited) {
    setTimeout(function () {// ?????????????????????????????????,??????new MeScroll????????????,?????????????????????mescroll?????????
      me.optUp.inited(me);
    }, 0);
  }
};

/*???????????????????????? (???mescroll-body??????)*/
MeScroll.prototype.onReachBottom = function () {
  if (this.isScrollBody && !this.isUpScrolling) {// ???????????????????????????????????????????????????????????????,??????????????????????????????????????????????????????onReachBottom
    if (!this.optUp.isLock && this.optUp.hasNext) {
      this.triggerUpScroll();
    }
  }
};

/*?????????????????? (???mescroll-body??????)*/
MeScroll.prototype.onPageScroll = function (e) {
  if (!this.isScrollBody) return;

  // ???????????????????????? (?????????????????????????????????,????????????????????????)
  this.setScrollTop(e.scrollTop);

  // ???????????????????????????
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }
};

/*??????????????????*/
MeScroll.prototype.scroll = function (e, onScroll) {
  // ????????????????????????
  this.setScrollTop(e.scrollTop);
  // ????????????????????????
  this.setScrollHeight(e.scrollHeight);

  // ???????????????????????????
  if (this.preScrollY == null) this.preScrollY = 0;
  this.isScrollUp = e.scrollTop - this.preScrollY > 0;
  this.preScrollY = e.scrollTop;

  // ?????? && ?????????????????????
  this.isScrollUp && this.triggerUpScroll(true);

  // ???????????????????????????
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }

  // ????????????
  this.optUp.onScroll && onScroll && onScroll();
};

/* ?????????????????? */
MeScroll.prototype.triggerUpScroll = function (isCheck) {
  if (!this.isUpScrolling && this.optUp.use && this.optUp.callback) {
    // ?????????????????????; ???????????????
    if (isCheck === true) {
      var canUp = false;
      // ??????????????? && ???????????? && ???????????????
      if (this.optUp.hasNext && !this.optUp.isLock && !this.isDownScrolling) {
        if (this.getScrollBottom() <= this.optUp.offset) {// ?????????
          canUp = true; // ???????????????
        }
      }
      if (canUp === false) return;
    }
    this.showUpScroll(); // ???????????????...
    this.optUp.page.num++; // ???????????????,?????????????????????
    this.isUpAutoLoad = true; // ?????????????????????????????????,??????????????????????????????????????????
    this.num = this.optUp.page.num; // ???????????????????????????mescroll???,?????????page?????????
    this.size = this.optUp.page.size; // ???????????????????????????mescroll???,?????????page?????????
    this.time = this.optUp.page.time; // ???????????????????????????mescroll???,?????????page?????????
    this.optUp.callback(this); // ????????????,??????????????????
  }
};

/* ????????????????????? */
MeScroll.prototype.showUpScroll = function () {
  this.isUpScrolling = true; // ?????????????????????
  this.optUp.showLoading && this.optUp.showLoading(this); // ??????
};

/* ??????????????????????????? */
MeScroll.prototype.showNoMore = function () {
  this.optUp.hasNext = false; // ?????????????????????
  this.optUp.showNoMore && this.optUp.showNoMore(this); // ??????
};

/* ??????????????????**/
MeScroll.prototype.hideUpScroll = function () {
  this.optUp.hideUpScroll && this.optUp.hideUpScroll(this); // ??????
};

/* ?????????????????? */
MeScroll.prototype.endUpScroll = function (isShowNoMore) {
  if (isShowNoMore != null) {// isShowNoMore=null,?????????????????????,???????????????????????????
    if (isShowNoMore) {
      this.showNoMore(); // isShowNoMore=true,?????????????????????
    } else {
      this.hideUpScroll(); // isShowNoMore=false,??????????????????
    }
  }
  this.isUpScrolling = false; // ????????????????????????
};

/* ????????????????????????????????????
    *isShowLoading ????????????????????????;
    * 1.??????null,?????????,????????????????????????????????????
    * 2.??????true, ????????????????????????????????????
    * 3.??????false,???????????????????????????????????? (?????????????????????????????????)
    */
MeScroll.prototype.resetUpScroll = function (isShowLoading) {
  if (this.optUp && this.optUp.use) {
    var page = this.optUp.page;
    this.prePageNum = page.num; // ????????????????????????,?????????????????????
    this.prePageTime = page.time; // ????????????????????????,?????????????????????
    page.num = this.startNum; // ??????????????????
    page.time = null; // ??????????????????
    if (!this.isDownScrolling && isShowLoading !== false) {// ?????????????????????????????????resetUpScroll?????????????????????????????????,???????????????;
      if (isShowLoading == null) {
        this.removeEmpty(); // ???????????????
        this.showUpScroll(); // ?????????,???????????????????????????????????????
      } else {
        this.showDownScroll(); // ???true,?????????????????????????????????,???????????????
      }
    }
    this.isUpAutoLoad = true; // ?????????????????????????????????,??????????????????????????????????????????
    this.num = page.num; // ???????????????????????????mescroll???,?????????page?????????
    this.size = page.size; // ???????????????????????????mescroll???,?????????page?????????
    this.time = page.time; // ???????????????????????????mescroll???,?????????page?????????
    this.optUp.callback && this.optUp.callback(this); // ??????????????????
  }
};

/* ??????page.num?????? */
MeScroll.prototype.setPageNum = function (num) {
  this.optUp.page.num = num - 1;
};

/* ??????page.size?????? */
MeScroll.prototype.setPageSize = function (size) {
  this.optUp.page.size = size;
};

/* ??????????????????,?????????????????????????????????
    * dataSize: ?????????????????????(??????)
    * totalPage: ?????????(??????)
    * systime: ??????????????? (??????)
    */
MeScroll.prototype.endByPage = function (dataSize, totalPage, systime) {
  var hasNext;
  if (this.optUp.use && totalPage != null) hasNext = this.optUp.page.num < totalPage; // ?????????????????????
  this.endSuccess(dataSize, hasNext, systime);
};

/* ??????????????????,?????????????????????????????????
    * dataSize: ?????????????????????(??????)
    * totalSize: ???????????????????????????(??????)
    * systime: ??????????????? (??????)
    */
MeScroll.prototype.endBySize = function (dataSize, totalSize, systime) {
  var hasNext;
  if (this.optUp.use && totalSize != null) {
    var loadSize = (this.optUp.page.num - 1) * this.optUp.page.size + dataSize; // ????????????????????????
    hasNext = loadSize < totalSize; // ?????????????????????
  }
  this.endSuccess(dataSize, hasNext, systime);
};

/* ??????????????????,?????????????????????????????????
    * dataSize: ????????????????????????(??????????????????????????????),?????????????????????????????????????????????.????????????,???????????????????????????
    * hasNext: ?????????????????????,????????????;???????????????????????????:??????????????????20?????????,????????????10???,???2???.???????????????dataSize??????,????????????????????????????????????????????????,????????????hasNext,?????????????????????????????????????????????.
    * systime: ???????????????(??????);???????????????????????????:????????????????????????,??????????????????????????????,??????????????????,?????????????????????????????????????????????;???????????????systime,??????upCallback???page.time????????????,???page.time???????????????,??????????????????????????????????????????
    */
MeScroll.prototype.endSuccess = function (dataSize, hasNext, systime) {
  var me = this;
  // ??????????????????
  if (me.isDownScrolling) me.endDownScroll();

  // ??????????????????
  if (me.optUp.use) {
    var isShowNoMore; // ????????????????????????
    if (dataSize != null) {
      var pageNum = me.optUp.page.num; // ????????????
      var pageSize = me.optUp.page.size; // ????????????
      // ??????????????????
      if (pageNum === 1) {
        if (systime) me.optUp.page.time = systime; // ??????????????????????????????????????????
      }
      if (dataSize < pageSize || hasNext === false) {
        // ??????????????????????????????,???????????????????????????
        me.optUp.hasNext = false;
        if (dataSize === 0 && pageNum === 1) {
          // ???????????????????????????????????????????????????
          isShowNoMore = false;
          me.showEmpty();
        } else {
          // ?????????????????????????????????,???????????????????????????
          var allDataSize = (pageNum - 1) * pageSize + dataSize;
          if (allDataSize < me.optUp.noMoreSize) {
            isShowNoMore = false;
          } else {
            isShowNoMore = true;
          }
          me.removeEmpty(); // ???????????????
        }
      } else {
        // ???????????????
        isShowNoMore = false;
        me.optUp.hasNext = true;
        me.removeEmpty(); // ???????????????
      }
    }

    // ????????????
    me.endUpScroll(isShowNoMore);
  }
};

/* ????????????,????????????????????????????????? */
MeScroll.prototype.endErr = function (errDistance) {
  // ????????????,?????????????????????????????????????????????
  if (this.isDownScrolling) {
    var page = this.optUp.page;
    if (page && this.prePageNum) {
      page.num = this.prePageNum;
      page.time = this.prePageTime;
    }
    this.endDownScroll();
  }
  // ????????????,????????????????????????????????????
  if (this.isUpScrolling) {
    this.optUp.page.num--;
    this.endUpScroll(false);
    // ?????????mescroll-body,???????????????????????????
    if (this.isScrollBody && errDistance !== 0) {// ?????????0
      if (!errDistance) errDistance = this.optUp.errDistance; // ??????,????????????
      this.scrollTo(this.getScrollTop() - errDistance, 0); // ?????????????????????
    }
  }
};

/* ??????????????? */
MeScroll.prototype.showEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(true);
};

/* ??????????????? */
MeScroll.prototype.removeEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(false);
};

/* ??????????????????????????? */
MeScroll.prototype.showTopBtn = function () {
  if (!this.topBtnShow) {
    this.topBtnShow = true;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(true);
  }
};

/* ??????????????????????????? */
MeScroll.prototype.hideTopBtn = function () {
  if (this.topBtnShow) {
    this.topBtnShow = false;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(false);
  }
};

/* ???????????????????????? */
MeScroll.prototype.getScrollTop = function () {
  return this.scrollTop || 0;
};

/* ???????????????????????? */
MeScroll.prototype.setScrollTop = function (y) {
  this.scrollTop = y;
};

/* ????????????????????? */
MeScroll.prototype.scrollTo = function (y, t) {
  this.myScrollTo && this.myScrollTo(y, t); // scrollview??????????????????????????????
};

/* ?????????scrollTo */
MeScroll.prototype.resetScrollTo = function (myScrollTo) {
  this.myScrollTo = myScrollTo;
};

/* ??????????????????????????? */
MeScroll.prototype.getScrollBottom = function () {
  return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
};

/* ?????????
    star: ?????????
    end: ?????????
    callback(step,timer): ??????step???,?????????timer,???????????????window.clearInterval(timer)???????????????;
    t: ????????????,???0???????????????end???;???????????????300ms
    rate: ??????;???????????????30ms????????????
    * */
MeScroll.prototype.getStep = function (star, end, callback, t, rate) {
  var diff = end - star; // ??????
  if (t === 0 || diff === 0) {
    callback && callback(end);
    return;
  }
  t = t || 300; // ?????? 300ms
  rate = rate || 30; // ?????? 30ms
  var count = t / rate; // ??????
  var step = diff / count; // ??????
  var i = 0; // ??????
  var timer = setInterval(function () {
    if (i < count - 1) {
      star += step;
      callback && callback(star, timer);
      i++;
    } else {
      callback && callback(end, timer); // ????????????????????????end,??????????????????
      clearInterval(timer);
    }
  }, rate);
};

/* ????????????????????? */
MeScroll.prototype.getClientHeight = function (isReal) {
  var h = this.clientHeight || 0;
  if (h === 0 && isReal !== true) {// ???????????????????????????,????????????body????????? (??????????????????)
    h = this.getBodyHeight();
  }
  return h;
};
MeScroll.prototype.setClientHeight = function (h) {
  this.clientHeight = h;
};

/* ????????????????????? */
MeScroll.prototype.getScrollHeight = function () {
  return this.scrollHeight || 0;
};
MeScroll.prototype.setScrollHeight = function (h) {
  this.scrollHeight = h;
};

/* body????????? */
MeScroll.prototype.getBodyHeight = function () {
  return this.bodyHeight || 0;
};
MeScroll.prototype.setBodyHeight = function (h) {
  this.bodyHeight = h;
};

/* ????????????????????????????????? */
MeScroll.prototype.preventDefault = function (e) {
  // ??????????????????e.preventDefault, ??????wxs?????????
  // app???bounce??????????????????pages.json???style.app-plus.bounce???"none"?????????, ?????????renderjs??????
  // cancelable:?????????????????????; defaultPrevented:?????????????????????
  if (e && e.cancelable && !e.defaultPrevented) e.preventDefault();
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 386:
/*!*******************************************************************!*\
  !*** F:/hear/hear/components/mescroll-uni/mescroll-uni-option.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // ????????????
// mescroll-body ??? mescroll-uni ??????
var GlobalOption = {
  down: {
    // ??????down???????????????????????????,?????????????????????????????????:
    textInOffset: '????????????', // ??????????????????offset????????????????????????
    textOutOffset: '????????????', // ?????????????????????offset?????????????????????
    textLoading: '????????? ...', // ????????????????????????
    offset: 80, // ???????????????,????????????80px,???????????????????????????????????????
    native: false // ???????????????????????????????????????; ??????false; ??????mescroll-body?????? (??????true???,?????????pages??????enablePullDownRefresh:true;????????????mescroll-native?????????)
  },
  up: {
    // ??????up???????????????????????????,?????????????????????????????????:
    textLoading: '????????? ...', // ????????????????????????
    textNoMore: '-- END --', // ?????????????????????????????????
    offset: 80, // ??????????????????,??????upCallback
    toTop: {
      // ??????????????????,?????????src?????????
      src: "http://www.mescroll.com/img/mescroll-totop.png?v=1", // ???????????? (????????????static??????, ??? /static/img/mescroll-totop.png )
      offset: 1000, // ???????????????????????????????????????????????????,??????1000px
      right: 20, // ??????????????????, ??????20 (??????"20rpx", "20px", "20%"????????????, ????????????????????????rpx)
      bottom: 120, // ??????????????????, ??????120 (??????"20rpx", "20px", "20%"????????????, ????????????????????????rpx)
      width: 72 // ???????????????????????????, ??????72 (??????"20rpx", "20px", "20%"????????????, ????????????????????????rpx)
    },
    empty: {
      use: true, // ?????????????????????
      icon: "http://www.mescroll.com/img/mescroll-empty.png?v=1", // ???????????? (????????????static??????, ??? /static/img/mescroll-empty.png )
      tip: '~ ???????????? ~' // ??????
    } } };var _default =



GlobalOption;exports.default = _default;

/***/ }),

/***/ 387:
/*!**********************************************************!*\
  !*** F:/hear/hear/components/mescroll-uni/wxs/mixins.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // ?????????wxs (???renderjs) ???????????????????????????, ????????????????????????
var WxsMixin = {
  data: function data() {
    return {
      // ??????wxs?????????????????? (?????????)
      wxsProp: {
        optDown: {}, // ?????????????????????
        scrollTop: 0, // ??????????????????
        bodyHeight: 0, // body?????????
        isDownScrolling: false, // ???????????????????????????
        isUpScrolling: false, // ???????????????????????????
        isScrollBody: true, // ?????????mescroll-body??????
        isUpBoth: true, // ???????????????,??????????????????????????????
        t: 0 // ????????????????????? (?????????????????????,????????????wxs???Observer)
      },

      // ????????????wxs??????????????????
      callProp: {
        callType: '', // ?????????
        t: 0 // ????????????????????? (?????????????????????,????????????wxs???Observer)
      },

      // ??????wxs????????????????????????wxsBiz??????,??????wxs????????? (??????????????????APP?????????wxsBiz?????????./wxs/wxs.wxs)



















      // ??????renderjs????????????????????????renderBiz??????,??????renderjs????????? (app ??? h5 ?????????renderBiz?????????./wxs/renderjs.js)

      renderBiz: {
        propObserver: function propObserver() {} // ??????renderjs?????????
      } };


  },
  methods: {
    // wxs?????????????????????????????????
    wxsCall: function wxsCall(msg) {
      if (msg.type === 'setWxsProp') {
        // ??????wxsProp?????? (????????????????????????)
        this.wxsProp = {
          optDown: this.mescroll.optDown,
          scrollTop: this.mescroll.getScrollTop(),
          bodyHeight: this.mescroll.getBodyHeight(),
          isDownScrolling: this.mescroll.isDownScrolling,
          isUpScrolling: this.mescroll.isUpScrolling,
          isUpBoth: this.mescroll.optUp.isBoth,
          isScrollBody: this.mescroll.isScrollBody,
          t: Date.now() };

      } else if (msg.type === 'setLoadType') {
        // ??????inOffset,outOffset?????????
        this.downLoadType = msg.downLoadType;
      } else if (msg.type === 'triggerDownScroll') {
        // ????????????????????????
        this.mescroll.triggerDownScroll();
      } else if (msg.type === 'endDownScroll') {
        // ??????????????????
        this.mescroll.endDownScroll();
      } else if (msg.type === 'triggerUpScroll') {
        // ????????????????????????
        this.mescroll.triggerUpScroll(true);
      }
    } },

  mounted: function mounted() {var _this = this;

    // ??????????????????wxs???????????????????????????
    this.mescroll.optDown.afterLoading = function () {
      _this.callProp = { callType: "showLoading", t: Date.now() }; // ??????wxs????????? (????????????????????????)
    };
    // ??????????????????wxs???????????????????????????
    this.mescroll.optDown.afterEndDownScroll = function () {
      _this.callProp = { callType: "endDownScroll", t: Date.now() }; // ??????wxs????????? (????????????????????????)
      setTimeout(function () {
        if (_this.downLoadType === 4 || _this.downLoadType === 0) {
          _this.callProp = { callType: "clearTransform", t: Date.now() }; // ??????wxs????????? (????????????????????????)
        }
      }, 320);
    };
    // ?????????wxs?????????
    this.wxsCall({ type: 'setWxsProp' });

  } };var _default =


WxsMixin;exports.default = _default;

/***/ }),

/***/ 39:
/*!*******************************************************!*\
  !*** F:/hear/hear/libs/luch-request/core/defaults.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * ?????????????????????
                                                                                                      */var _default =


{
  baseURL: '',
  header: {},
  method: 'GET',
  dataType: 'json',

  responseType: 'text',

  custom: {},

  timeout: 30000,










  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  } };exports.default = _default;

/***/ }),

/***/ 4:
/*!*******************************!*\
  !*** F:/hear/hear/pages.json ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!*******************************************!*\
  !*** F:/hear/hear/libs/config/baseUrl.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var BASE_Url,
orgid,
apiUrl,
circle,
comment,
requestComment;
if (true) {
  BASE_Url = ''; // ???????????????
  orgid = 3; // test
  apiUrl = 'http://10.0.117.184:71'; // ????????????????????????
  circle = 'http://10.0.117.248:9998'; // ?????????api??????
  comment = ''; // ?????????????????????
  requestComment = {
    platformKey: 'ec3ef837337542bab1bbb31584be3047',
    orgKey: '3' };

} else {}var _default =

{
  BASE_Url: BASE_Url,
  orgid: orgid,
  apiUrl: apiUrl,
  circle: circle,
  comment: comment,
  requestComment: requestComment };exports.default = _default;

/***/ }),

/***/ 41:
/*!************************************************!*\
  !*** F:/hear/hear/store/module/index/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _index = __webpack_require__(/*! @/api/index/index.js */ 42);

















var _index2 = __webpack_require__(/*! @/libs/hear-util/index.js */ 12);var _default =



{
  state: {},
  mutations: {},
  actions: {
    // ????????????banner
    getBanner: function getBanner(_ref,



    bannerType) {var state = _ref.state,commit = _ref.commit,rootState = _ref.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.banner)(bannerType).then(function (res) {
          // console.log(res.data.data, "banner");
          var bannerList = res.data.data;
          (0, _index2.changeArr)(bannerList);
          rootState.app.bannerList = bannerList;
          // commit('setBannerList',bannerList)
          // resolve(bannerList)
        }).catch(function (err) {
          reject(err);
        });
      });
    },
    // ?????????????????????
    category: function category(_ref2)



    {var state = _ref2.state,commit = _ref2.commit,rootState = _ref2.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.category)().then(function (res) {
          // console.log(res.data.data, "category");
          resolve(res.data.data);
        });
      });
    },

    // ????????????
    get_recently_topic: function get_recently_topic(_ref3,



    data) {var state = _ref3.state,commit = _ref3.commit,rootState = _ref3.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_recently_topic)(data).then(function (res) {
          // console.log(res.data.data, "????????????");
          resolve(res.data.data);
        });
      });
    },

    // ????????????
    get_limited_time_free_topic: function get_limited_time_free_topic(_ref4,



    data) {var state = _ref4.state,commit = _ref4.commit,rootState = _ref4.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_limited_time_free_topic)(data).then(function (res) {
          // console.log(res.data.data, "????????????");
          resolve(res.data.data);
        });
      });
    },

    // ????????????
    get_recommend_topic: function get_recommend_topic(_ref5,



    data) {var state = _ref5.state,commit = _ref5.commit,rootState = _ref5.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_recommend_topic)(data).then(function (res) {
          // console.log(res.data.data, "????????????");
          resolve(res.data.data);
        });
      });
    },

    // ?????????????????????
    get_billboard_topic: function get_billboard_topic(_ref6,



    data) {var state = _ref6.state,commit = _ref6.commit,rootState = _ref6.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_billboard_topic)(data).then(function (res) {
          // console.log(res.data, "???????????????");
          resolve(res.data.data);
        });
      });
    },

    // ???????????????
    get_search_rank: function get_search_rank(_ref7)



    {var state = _ref7.state,commit = _ref7.commit,rootState = _ref7.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_search_rank)().then(function (res) {
          // console.log(res.data, "???????????????");
          resolve(res.data.data);
        });
      });
    },

    // ??????????????????
    get_search_category: function get_search_category(_ref8,



    content) {var state = _ref8.state,commit = _ref8.commit,rootState = _ref8.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_search_category)(content).then(function (res) {
          // console.log(res, "??????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ??????????????????
    get_topic_by_categoryid: function get_topic_by_categoryid(_ref9,



    obj) {var state = _ref9.state,commit = _ref9.commit,rootState = _ref9.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_topic_by_categoryid)(obj).then(function (res) {
          // console.log(res, "??????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ????????????
    get_user_play_history: function get_user_play_history(_ref10,



    obj) {var state = _ref10.state,commit = _ref10.commit,rootState = _ref10.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_user_play_history)(obj).then(function (res) {
          resolve(res.data.data);
        });
      });
    },

    // ?????????????????????????????????????????????
    get_topic_list_by_type: function get_topic_list_by_type(_ref11,



    obj) {var state = _ref11.state,commit = _ref11.commit,rootState = _ref11.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_topic_list_by_type)(obj).then(function (res) {
          // console.log(res, "??????????????????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ??????-????????????????????????
    get_new_msg_count: function get_new_msg_count(_ref12,



    obj) {var state = _ref12.state,commit = _ref12.commit,rootState = _ref12.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_new_msg_count)(obj).then(function (res) {
          // console.log(res, "??????-????????????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ??????-??????????????????????????????
    get_user_message: function get_user_message(_ref13,



    obj) {var state = _ref13.state,commit = _ref13.commit,rootState = _ref13.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_user_message)(obj).then(function (res) {
          // console.log(res, "??????-??????????????????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ??????-??????????????????????????????
    update_message_read: function update_message_read(_ref14,



    obj) {var state = _ref14.state,commit = _ref14.commit,rootState = _ref14.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.update_message_read)(obj).then(function (res) {
          // console.log(res, "??????-??????????????????????????????");
          resolve(res.data);
        });
      });
    },

    // ??????-?????????????????????????????????
    update_category_status: function update_category_status(_ref15,



    obj) {var state = _ref15.state,commit = _ref15.commit,rootState = _ref15.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.update_category_status)(obj).then(function (res) {
          // console.log(res, "??????-??????????????????????????????");
          resolve(res.data);
        });
      });
    } } };exports.default = _default;

/***/ }),

/***/ 42:
/*!***************************************!*\
  !*** F:/hear/hear/api/index/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.update_category_status = exports.update_message_read = exports.get_user_message = exports.get_new_msg_count = exports.get_topic_list_by_type = exports.get_user_play_history = exports.get_topic_by_categoryid = exports.get_search_category = exports.get_search_rank = exports.get_billboard_topic = exports.get_recommend_topic = exports.get_limited_time_free_topic = exports.get_recently_topic = exports.category = exports.banner = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! ../index.js */ 26));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var http = _index.default.http;

var http1 = _index.default.http1;

// ????????????
// bannerType	true	number	null	???????????? 1-??????banner
var banner = function banner(bannerType) {
  return http.get('/banner/get_banner_by_type', {
    params: {
      bannerType: bannerType } });


};

// ?????????????????????
// loginId	truestring	null	??????id?????????????????????token?????????
exports.banner = banner;var category = function category(loginId) {
  return http.get('/category/get_all_main_category', {
    params: {} });



};

// ??????-???????????????????????????????????????????????????????????????
// sortType	false	number	null	???????????? 1-???????????? 2-????????????
// pageNum false
// pageSize false
exports.category = category;var get_recently_topic = function get_recently_topic(data) {
  return http.get('/topic/get_recently_topic', {
    params: data });

};

// ??????-???????????????????????????????????????????????????????????????
// sortType	false	number	null	???????????? 1-???????????? 2-????????????
// pageNum false
// pageSize false
exports.get_recently_topic = get_recently_topic;var get_limited_time_free_topic = function get_limited_time_free_topic(data) {
  return http.get('/topic/get_limited_time_free_topic', {
    params: data });

};

// ??????-???????????????????????????????????????????????????????????????
// sortType	false	number	null	???????????? 1-???????????? 2-????????????
// pageNum false
// pageSize false
exports.get_limited_time_free_topic = get_limited_time_free_topic;var get_recommend_topic = function get_recommend_topic(data) {
  return http.get('/topic/get_recommend_topic', {
    params: data });

};

// ??????-???????????????????????????????????????????????????????????????
// billboardType	true	number	null	???????????? 1-?????? 2-??????
// pageNum false
// pageSize false
exports.get_recommend_topic = get_recommend_topic;var get_billboard_topic = function get_billboard_topic(data) {
  return http.get('/topic/get_billboard_topic', {
    params: data });

};

// ??????-???????????????????????????
exports.get_billboard_topic = get_billboard_topic;var get_search_rank = function get_search_rank(data) {
  return http.get('/search/get_search_rank');
};

// ??????-??????????????????
// content	true	string		????????????(????????????)
exports.get_search_rank = get_search_rank;var get_search_category = function get_search_category(content) {
  return http.get('/search/get_search_category', {
    params: {
      content: content } });


};

// ??????-????????????????????????
// ????????????	????????????	????????????	?????????	??????
// categoryId	true	number		??????ID
// content	true	string		????????????(????????????)
exports.get_search_category = get_search_category;var get_topic_by_categoryid = function get_topic_by_categoryid(_ref)


{var categoryId = _ref.categoryId,content = _ref.content;
  return http.get('/search/get_topic_by_categoryid', {
    params: {
      categoryId: categoryId,
      content: content } });


};


// ??????-????????????????????????
// ????????????	????????????	????????????	?????????	??????
// userId	true	number		??????ID(????????????Token)
// content	false	string		??????????????????
// pageNum	false	number	1	?????????
// pageSize	false	number	10	???????????????
exports.get_topic_by_categoryid = get_topic_by_categoryid;var get_user_play_history = function get_user_play_history(_ref2)



{var pageNum = _ref2.pageNum,pageSize = _ref2.pageSize,content = _ref2.content;
  return http.get('/history/get_user_play_history', {
    params: {
      // userId: 1,
      pageNum: pageNum,
      pageSize: pageSize,
      content: content } });


};

// ?????????????????????????????????????????????
// sortType	true	number		???????????? 1-???????????? 2-????????????
// categoryId	true	string		????????????id
exports.get_user_play_history = get_user_play_history;var get_topic_list_by_type = function get_topic_list_by_type(_ref3)




{var pageNum = _ref3.pageNum,pageSize = _ref3.pageSize,sortType = _ref3.sortType,categoryId = _ref3.categoryId;
  return http.get('/topic/get_topic_list_by_type', {
    params: {
      pageNum: pageNum,
      pageSize: pageSize,
      sortType: sortType,
      categoryId: categoryId } });


};


// ??????-????????????????????????
exports.get_topic_list_by_type = get_topic_list_by_type;var get_new_msg_count = function get_new_msg_count() {
  return http.get('/msg/get_new_msg_count');
};

// ??????-??????????????????????????????
exports.get_new_msg_count = get_new_msg_count;var get_user_message = function get_user_message(data) {
  return http.get('/msg/get_user_message', {
    params: data });

};

// ??????-??????????????????????????????
exports.get_user_message = get_user_message;var update_message_read = function update_message_read() {
  return http.put('/msg/update_message_read');
};

// ??????-?????????????????????????????????
// loginId	true	string	null	??????id??????????????????token?????????
// categoryIdListStr	true	string	null	???????????????id?????????
// allCategoryIdListStr	true	string	null	????????????id?????????
exports.update_message_read = update_message_read;var update_category_status = function update_category_status(obj) {
  return http.put('/category/update_category_status', obj);
};exports.update_category_status = update_category_status;

/***/ }),

/***/ 43:
/*!***********************************************!*\
  !*** F:/hear/hear/store/module/play/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _index = __webpack_require__(/*! @/api/play/index.js */ 44);




















var _index2 = __webpack_require__(/*! @/api/my/index.js */ 45);var _default =



{
  state: {
    zhangjieList: [],
    topicId: null, // ???????????????????????????id
    zhangjieObj: {}, //????????????
    currectPlayIndex: null, //???????????????????????????
    currectPlay: {}, // ?????????????????????item
    play: false, //  ????????????
    chapterId: null // ????????????????????????????????????????????????????????????????????? 
  },
  mutations: {

    // ????????????
    setTopicId: function setTopicId(state, value) {
      state.topicId = value;
    },

    // ??????lsit
    setZhangjieList: function setZhangjieList(state, value) {
      state.zhangjieList = value;
    },

    setZhangjieObj: function setZhangjieObj(state, value) {
      state.zhangjieObj = value;
    },

    setCurrectPlayIndex: function setCurrectPlayIndex(state, value) {
      state.currectPlayIndex = value;
    },
    setCurrectPlay: function setCurrectPlay(state, value) {
      state.currectPlay = value;
    },
    setPlay: function setPlay(state, value) {
      state.play = value;
    },
    setChapterId: function setChapterId(state, value) {
      state.chapterId = value;
    } },

  actions: {

    // ??????????????????
    get_chapter_list_by_topic: function get_chapter_list_by_topic(_ref,



    obj) {var state = _ref.state,commit = _ref.commit,rootState = _ref.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_chapter_list_by_topic)(obj).then(function (res) {
          // console.log(res.data.data, "????????????");
          // commit("setZhangjieList",res.data.data.list)
          resolve(res.data.data);
        });
      });
    },

    // ????????????
    get_introduction_by_topic_id: function get_introduction_by_topic_id(_ref2,



    id) {var state = _ref2.state,commit = _ref2.commit,rootState = _ref2.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_introduction_by_topic_id)(id).then(function (res) {
          // console.log(res.data.data, "????????????");
          commit("setZhangjieObj", res.data.data);
          resolve(res.data.data);
        });
      });
    },

    // ??????-???????????????/????????????
    insert_praise_add: function insert_praise_add(_ref3,



    obj) {var state = _ref3.state,commit = _ref3.commit,rootState = _ref3.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.insert_praise_add)(obj).then(function (res) {
          // console.log(res.data, "??????-???????????????/????????????");
          resolve(res.data);
        });
      });
    },

    ///??????-???????????????/??????????????????
    delete_praise_cancel: function delete_praise_cancel(_ref4,



    obj) {var state = _ref4.state,commit = _ref4.commit,rootState = _ref4.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.delete_praise_cancel)(obj).then(function (res) {
          // console.log(res.data, "??????-???????????????/??????????????????");
          resolve(res.data);
        });
      });
    },

    // ??????-????????????????????????????????????
    insert_collect_chapter: function insert_collect_chapter(_ref5,



    obj) {var state = _ref5.state,commit = _ref5.commit,rootState = _ref5.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.insert_collect_chapter)(obj).then(function (res) {
          console.log(res.data, "??????-????????????????????????????????????");
          resolve(res.data);
        });
      });
    },

    //??????-??????????????????
    insert_collect: function insert_collect(_ref6,



    obj) {var state = _ref6.state,commit = _ref6.commit,rootState = _ref6.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.insert_collect)(obj).then(function (res) {
          console.log(res.data, "??????-??????????????????");
          resolve(res.data);
        });
      });
    },

    // ??????????????????
    delete_collect: function delete_collect(_ref7,



    obj) {var state = _ref7.state,commit = _ref7.commit,rootState = _ref7.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.delete_collect)(obj).then(function (res) {
          console.log(res.data, "??????????????????");
          resolve(res.data);
        });
      });
    },

    // ?????? ?????????????????????
    delete_collect_chapter: function delete_collect_chapter(_ref8,



    obj) {var state = _ref8.state,commit = _ref8.commit,rootState = _ref8.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.delete_collect_chapter)(obj).then(function (res) {
          console.log(res.data, "?????? ?????????????????????");
          resolve(res.data);
        });
      });
    },

    // ??????????????????
    insert_history: function insert_history(_ref9,



    obj) {var state = _ref9.state,commit = _ref9.commit,rootState = _ref9.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.insert_history)(obj).then(function (res) {
          // console.log(res.data, "??????????????????");
          resolve(res.data);
        });
      });
    },

    //??????????????????
    update_history: function update_history(_ref10,



    obj) {var state = _ref10.state,commit = _ref10.commit,rootState = _ref10.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.update_history)(obj).then(function (res) {
          // console.log(res.data, "??????????????????");
          resolve(res.data);
        });
      });
    },

    // ??????????????????
    get_comment_list: function get_comment_list(_ref11,



    obj) {var state = _ref11.state,commit = _ref11.commit,rootState = _ref11.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_comment_list)(obj).then(function (res) {
          // console.log(res, "??????????????????");
          resolve(res.data);
        });
      });
    },

    // ????????????
    save_comment: function save_comment(_ref12,



    obj) {var state = _ref12.state,commit = _ref12.commit,rootState = _ref12.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.save_comment)(obj).then(function (res) {
          // console.log(res, "??????????????????");
          resolve(res.data);
        });
      });
    },

    // ??????????????????token
    get_comment_manager_token: function get_comment_manager_token(_ref13)



    {var state = _ref13.state,commit = _ref13.commit,rootState = _ref13.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_comment_manager_token)().then(function (res) {
          // console.log(res, "??????????????????token");
          resolve(res.data.data);
        });
      });
    },

    // ??????-??????????????????????????????
    insert_message: function insert_message(_ref14,



    obj) {var state = _ref14.state,commit = _ref14.commit,rootState = _ref14.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.insert_message)(obj).then(function (res) {
          console.log(res, "??????-??????????????????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ????????????
    praise: function praise(_ref15,



    obj) {var state = _ref15.state,commit = _ref15.commit,rootState = _ref15.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.praise)(obj).then(function (res) {
          console.log(res, "????????????");
          resolve(res.data);
        });
      });
    },

    // ????????????
    cancel_praise: function cancel_praise(_ref16,



    obj) {var state = _ref16.state,commit = _ref16.commit,rootState = _ref16.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.cancel_praise)(obj).then(function (res) {
          console.log(res, "????????????");
          resolve(res.data);
        });
      });
    },

    // ??????????????????????????????????????????????????????
    get_comment_page: function get_comment_page(_ref17,



    obj) {var state = _ref17.state,commit = _ref17.commit,rootState = _ref17.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_comment_page)(obj).then(function (res) {
          // console.log(res, "??????????????????????????????????????????????????????");
          resolve(res.data);
        });
      });
    },

    // ??????????????????
    get_comment_total: function get_comment_total(_ref18,



    obj) {var state = _ref18.state,commit = _ref18.commit,rootState = _ref18.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_comment_total)(obj).then(function (res) {
          console.log(res, "??????????????????");
          resolve(res.data.data);
        });
      });
    } } };exports.default = _default;

/***/ }),

/***/ 44:
/*!**************************************!*\
  !*** F:/hear/hear/api/play/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.get_comment_total = exports.get_comment_page = exports.cancel_praise = exports.praise = exports.insert_message = exports.get_comment_manager_token = exports.save_comment = exports.get_comment_list = exports.update_history = exports.insert_history = exports.delete_collect_chapter = exports.delete_collect = exports.insert_collect = exports.insert_collect_chapter = exports.delete_praise_cancel = exports.insert_praise_add = exports.get_introduction_by_topic_id = exports.get_chapter_list_by_topic = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! ../index.js */ 26));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var http = _index.default.http;

var http1 = _index.default.http1;


// ??????-?????????????????????????????????????????????
// topicId	true	number	null	??????id
var get_chapter_list_by_topic = function get_chapter_list_by_topic(_ref)





{var topicId = _ref.topicId,pageNum = _ref.pageNum,pageSize = _ref.pageSize,listOrder = _ref.listOrder,loginId = _ref.loginId;
  return http.get('/chapter/get_chapter_list_by_topic', {
    params: {
      topicId: topicId,
      pageNum: pageNum,
      pageSize: pageSize,
      listOrder: listOrder
      // loginId
    } });

};


// ??????-????????????id??????????????????
// topicId	true	string		??????id
//userId????????????????????????id
// loginId??????????????????id
exports.get_chapter_list_by_topic = get_chapter_list_by_topic;var get_introduction_by_topic_id = function get_introduction_by_topic_id(_ref2)


{var topicId = _ref2.topicId,userId = _ref2.userId;
  return http.get('/topic/get_introduction_by_topic_id', {
    params: {
      topicId: topicId,
      userId: userId } });


};

// ??????-???????????????/????????????
// userId	true	number		??????ID
// audioId	true	number		?????????ID/?????????ID(uuid)
// praiseType	true	number		?????????????????? 1-?????? 2-??????
exports.get_introduction_by_topic_id = get_introduction_by_topic_id;var insert_praise_add = function insert_praise_add(_ref3)



{var audioId = _ref3.audioId,userId = _ref3.userId,praiseType = _ref3.praiseType;
  return http.post('/user/insert_praise_add', {
    audioId: audioId,
    // userId,
    praiseType: praiseType });

};

// ??????-???????????????/??????????????????
// userId	true	number		??????ID
// praiseType	true	number		?????????????????? 1-?????? 2-??????
// audioId	true	string		??????ID/??????ID
exports.insert_praise_add = insert_praise_add;var delete_praise_cancel = function delete_praise_cancel(_ref4)



{var audioId = _ref4.audioId,userId = _ref4.userId,praiseType = _ref4.praiseType;
  return http.delete('/user/delete_praise_cancel', {
    audioId: audioId,
    // userId,
    praiseType: praiseType });

};

// ??????-????????????????????????????????????
// userId	true	number		??????ID
// praiseType	true	number		?????????????????? 1-?????? 2-??????
// audioId	true	string		??????ID/??????ID
exports.delete_praise_cancel = delete_praise_cancel;var insert_collect_chapter = function insert_collect_chapter(_ref5)




{var radioType = _ref5.radioType,chapterId = _ref5.chapterId,userId = _ref5.userId,topicId = _ref5.topicId;
  return http.post('/chapter/insert_collect_chapter', {
    // userId,
    chapterId: chapterId,
    radioType: radioType,
    topicId: topicId });

};

// ??????-??????????????????
// loginId	true	number		??????id
// topicId	true	number		??????id
exports.insert_collect_chapter = insert_collect_chapter;var insert_collect = function insert_collect(_ref6)


{var userId = _ref6.userId,topicId = _ref6.topicId;
  return http.post('/collect/insert_collect', {
    // userId,
    topicId: topicId });

};

// ??????????????????
// loginId	true	number		??????id
// topicId	true	number		??????id
exports.insert_collect = insert_collect;var delete_collect = function delete_collect(_ref7)


{var userId = _ref7.userId,topicId = _ref7.topicId;
  return http.delete('/collect/delete_collect', {
    // userId,
    topicId: topicId });

};

// ?????? ?????????????????????
// loginId	true	number		??????id
// topicId	true	number		??????id
exports.delete_collect = delete_collect;var delete_collect_chapter = function delete_collect_chapter(_ref8)

{var collectChapterId = _ref8.collectChapterId;
  return http.delete('/chapter/delete_collect_chapter', {
    collectChapterId: collectChapterId });

};

// ??????????????????   topicId  ??????id
// chapterId  ??????id
// radioType  ????????????  1-?????? 2-??????
// listenProgress  ???????????? ???
exports.delete_collect_chapter = delete_collect_chapter;var insert_history = function insert_history(_ref9)



{var topicId = _ref9.topicId,chapterId = _ref9.chapterId,radioType = _ref9.radioType;
  return http.post('/history/insert_history', {
    topicId: topicId,
    chapterId: chapterId,
    radioType: radioType });

};

// ??????????????????    listenProgress  ????????????  topicId??????id   chapterId  ??????id
exports.insert_history = insert_history;var update_history = function update_history(_ref10)



{var topicId = _ref10.topicId,chapterId = _ref10.chapterId,listenProgress = _ref10.listenProgress;
  return http.put('/history/update_history', {
    topicId: topicId,
    chapterId: chapterId,
    listenProgress: listenProgress });

};

// ???????????????????????????????????????
// ????????????	????????????	????????????	?????????	??????
// programId	true	number	null	??????id
// classifyKey	true	string	null	????????????????????????????????????key
// orgKey	true	string	null	??????????????????????????????key
// platformKey	true	string	null	??????????????????????????????key
// pageSize	false	number	10	
// offset	false	number	1
exports.update_history = update_history;var get_comment_list = function get_comment_list(obj) {
  return http.get(
  '/comment_page/get_comment_list', {
    params: obj });


};

// ????????????/??????????????????
// ????????????	????????????	????????????	?????????	??????
// programId	true	number	null	??????id
//commentContent 	false	string	null	?????????????????????????????????????????????????????????????????????????????????????????????
// atCommentKey	false	string	null	@?????????key??????????????????????????????????????????1??????????????????key
// classifyKey	true	string	null	????????????????????????????????????key
// orgKey	true	string	null	??????????????????????????????key
// platformKey	true	string	null	??????????????????????????????key
exports.get_comment_list = get_comment_list;var save_comment = function save_comment(obj) {
  return http.post(
  '/comment_page/save_comment', obj);
};

// ????????????token???????????????token
exports.save_comment = save_comment;var get_comment_manager_token = function get_comment_manager_token() {
  return http.get(
  '/common/get_comment_manager_token');
};

// ??????-??????????????????????????????
// ????????????????????????:
// - ?????????????????????????????????(11)?????????????????????(12)???????????????(13)???????????????(14)
// - ??????????????????(1)???????????????/??????(2)????????????????????????(3)
// ??????: 
// majorId??????: ID??????[????????????](??????major_id_type????????????ID)  
// majorIdType??????: ??????ID??????[????????????](1:?????? 2:?????? 3:??????)
// majorId???: 23,d129aa803d8dg11eaa577005056a83sf
// majorIdType???: 1,2
// majorIdType???1????????????2????????????, ??????majorId?????????23?????????ID, d129aa803d8dg11eaa577005056a83sf?????????ID
// (??????????????????????????????,????????????)

// userInformId	true	number	?????????: 7108675	??????????????????ID
// majorIdType	true	string	?????????: "1,2"	??????ID??????[????????????](1:?????? 2:?????? 3:??????)
// majorId	true	string	?????????: "23,d129aa803d8dg11eaa577005056a83sf"	ID??????[????????????](??????major_id_type????????????ID)
// msgType	true	number	?????????: 1	?????? 1: ?????? 2: ???????????? 3:????????????????????? 11:??????????????? 12:?????????????????? 13:???????????? 14: ????????????
// msgClassify	true	number	?????????: 2	????????????(1:???????????? 2:????????????)
// msgContent	true	string	?????????: "????????????<??????>-????????? - ?????????"	???????????????
// topicListenName	false	string	?????????: ?????????	???????????????????????????
exports.get_comment_manager_token = get_comment_manager_token;var insert_message = function insert_message(obj) {
  return http.post(
  '/msg/insert_message', obj);
};


// ????????????
// ????????????
// commentKey	true	string	null	????????????
exports.insert_message = insert_message;var praise = function praise(obj) {
  return http.post(
  '/comment_page/praise', obj);
};

// ??????????????????
// ????????????
// commentKey	true	string	null	????????????
exports.praise = praise;var cancel_praise = function cancel_praise(obj) {
  return http.post(
  '/comment_page/cancel_praise', obj);
};

// ??????????????????????????????????????????????????????????????????
// ????????????
// ????????????	????????????	????????????	?????????	??????
// classifyKey	false	string	null	??????????????????????????????key
// orgKey	true	string	null	??????????????????????????????key
// platformKey	true	string	null	??????????????????????????????key
exports.cancel_praise = cancel_praise;var get_comment_page = function get_comment_page(obj) {
  return http.get(
  '/comment_page/get_mine_comment', {
    params: obj });

};

// ??????????????????????????????????????????
exports.get_comment_page = get_comment_page;var get_comment_total = function get_comment_total(obj) {
  return http.get(
  '/comment_page/get_comment_total', {
    params: obj });

};exports.get_comment_total = get_comment_total;

/***/ }),

/***/ 45:
/*!************************************!*\
  !*** F:/hear/hear/api/my/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.c_get_user_msg = exports.api_img = exports.get_dynamic_by_userid = exports.get_org_topic = exports.get_org_anchor = exports.get_my_creation_list = exports.get_chapter_list_by_topic_single = exports.insert_topic = exports.delete_focus = exports.insert_focus = exports.get_user_focus = exports.get_user_fans = exports.get_user_collect = exports.get_user_play_single = exports.get_user_topic_listen_count = exports.is_focus = exports.get_focus_or_fans_count = exports.get_upload_token = exports.insert_user_label = exports.get_label = exports.update_user_msg = exports.get_user_msg = exports.get_user_count = void 0;var _index = _interopRequireDefault(__webpack_require__(/*! ../index.js */ 26));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var http = _index.default.http;

var http1 = _index.default.http1;

// ??????-?????????????????????????????????
//userId	true	number		??????ID(????????????Token)
var get_user_count = function get_user_count(
userId)
{
  return http.get('/user/get_user_count', {
    params: {
      // userId: 1
    } });

};

// ??????-??????????????????
//userId	true	number		??????ID(????????????Token)
exports.get_user_count = get_user_count;var get_user_msg = function get_user_msg(_ref)


{var userId = _ref.userId,otherUserId = _ref.otherUserId;
  return http.get('/user/get_user_msg', {
    params: {
      // userId,
      otherUserId: otherUserId } });


};


// ??????-??????????????????
//userId	true	number		??????ID
// avatar	false	string		????????????(??????????????????)
// userSex	false	number		????????????
// userDate	false	string		??????????????????
// userAddress	false	string		????????????
// userSignature	false	string		????????????
exports.get_user_msg = get_user_msg;var update_user_msg = function update_user_msg(_ref2)




{var userDate = _ref2.userDate,userAddress = _ref2.userAddress,userSignature = _ref2.userSignature,userSex = _ref2.userSex;
  return http.put('/user/update_user_msg', {
    // userId: 1,
    userDate: userDate,
    userAddress: userAddress,
    userSignature: userSignature,
    userSex: userSex });

};

// ??????-????????????
//labelType	false	number	null	???????????????(1: ?????? 2: ?????? 3: ??????) - ????????????????????????
// userId	true	number		??????ID(????????????Token)
exports.update_user_msg = update_user_msg;var get_label = function get_label(_ref3)


{var labelType = _ref3.labelType,userId = _ref3.userId;
  // let data{
  // 	labelType
  // }
  return http.get('/label/get_label', {
    params: {
      userId: userId,
      labelType: labelType } });


};

// ??????-??????????????????
// labelRelaType	true	array[object]		????????????(1: ????????? 2: ????????? 3: ?????????)
// labelId	true	array[object]		??????ID
// typeId	true	array[object]		??????ID |??????ID | ??????ID
exports.get_label = get_label;var insert_user_label = function insert_user_label(
data)
{
  return http.post('/labelRela/insert_user_label',
  data);

};

// ????????????Token
// userId	true	number		??????ID(????????????Token)
exports.insert_user_label = insert_user_label;var get_upload_token = function get_upload_token() {
  return http.get('/common/get_upload_token', {
    params: {
      // userId: 1
    } });

};

// ??????-????????????/????????????
//type	true	number		??????: 1?????? 2: ??????
// userId	true	number		??????ID(????????????Token)
exports.get_upload_token = get_upload_token;var get_focus_or_fans_count = function get_focus_or_fans_count(_ref4)



{var type = _ref4.type,userId = _ref4.userId,otherUserId = _ref4.otherUserId;
  return http.get('/user/get_focus_or_fans_count', {
    params: {
      // userId,
      type: type,
      otherUserId: otherUserId } });


};

// ?????????????????????
// userId	true	number		????????????ID(????????????Token)
// userFocusId	true	number		????????????ID
exports.get_focus_or_fans_count = get_focus_or_fans_count;var is_focus = function is_focus(_ref5)


{var userFocusId = _ref5.userFocusId,userId = _ref5.userId;
  return http.get('/user/is_focus', {
    params: {
      // userId,
      userFocusId: userFocusId } });


};

//??????-????????????(??????)?????????????????????
//type	true	number		??????: 1?????? 2: ??????
// userId	true	number		??????ID(????????????Token)
exports.is_focus = is_focus;var get_user_topic_listen_count = function get_user_topic_listen_count() {
  return http.get('/user/get_user_topic_listen_count', {
    params: {
      // userId: 1
    } });

};

//??????-????????????(??????/??????)??????/??????
// userAuthorId	true	string		??????ID(????????????Token)
// topicType	true	string		??????(1: ?????? 2:??????)
// pageNum	false	number	1	?????????
// pageSize	false	number	10	???????????????
exports.get_user_topic_listen_count = get_user_topic_listen_count;var get_user_play_single = function get_user_play_single(_ref6)





{var userAuthorId = _ref6.userAuthorId,topicType = _ref6.topicType,pageNum = _ref6.pageNum,pageSize = _ref6.pageSize,otherUserId = _ref6.otherUserId;
  return http.get('/user/get_user_play_single', {
    params: {
      // userAuthorId,
      topicType: topicType,
      pageNum: pageNum,
      pageSize: pageSize,
      otherUserId: otherUserId } });


};

//??????-???????????????????????????
// userId	true	number		??????ID(????????????Token)
exports.get_user_play_single = get_user_play_single;var get_user_collect = function get_user_collect(_ref7)




{var userId = _ref7.userId,otherUserId = _ref7.otherUserId,pageNum = _ref7.pageNum,pageSize = _ref7.pageSize;
  return http.get('/collect/get_user_collect', {
    params: {
      // userId,
      otherUserId: otherUserId,
      pageNum: pageNum,
      pageSize: pageSize } });


};


//??????-????????????????????????
// userId	true	number		??????ID(????????????Token)
// pageNum	false	number	1	?????????
// pageSize	false	number	10	???????????????
exports.get_user_collect = get_user_collect;var get_user_fans = function get_user_fans(_ref8)



{var userId = _ref8.userId,pageNum = _ref8.pageNum,pageSize = _ref8.pageSize;
  return http.get('/user/get_user_fans', {
    params: {
      // userId,
      pageNum: pageNum,
      pageSize: pageSize } });


};

//??????-????????????????????????
// userId	true	number		??????ID(????????????Token)
// pageNum	false	number	1	?????????
// pageSize	false	number	10	???????????????
exports.get_user_fans = get_user_fans;var get_user_focus = function get_user_focus(_ref9)



{var userId = _ref9.userId,pageNum = _ref9.pageNum,pageSize = _ref9.pageSize;
  return http.get('/user/get_user_focus', {
    params: {
      // userId,
      pageNum: pageNum,
      pageSize: pageSize } });


};

//??????-??????????????????
// userId	true	number		????????????ID(????????????Token)
// userFocusId	true	number		???????????????ID
exports.get_user_focus = get_user_focus;var insert_focus = function insert_focus(userFocusId) {
  return http.post('/user/insert_focus', {
    // userId: 1,
    userFocusId: userFocusId });

};

//??????-??????????????????
// userId	true	number		????????????ID(????????????Token)
// userFocusId	true	number		???????????????ID
exports.insert_focus = insert_focus;var delete_focus = function delete_focus(fansId) {
  return http.delete('/user/delete_focus', {
    fansId: fansId });

};

//??????-????????????/??????
// userAuthorId	true	number		???????????????ID(????????????)(????????????Token)
// topicAuthorName	true	string		????????????(???????????? + ?????????)
// topicName	true	string		????????????
// topicDescribe	true	string		????????????
// topicType	true	number		????????????(1: ???????????? 2: ????????????)
// topicImage	true	string		??????????????????
exports.delete_focus = delete_focus;var insert_topic = function insert_topic(_ref10)





{var topicName = _ref10.topicName,topicDescribe = _ref10.topicDescribe,topicType = _ref10.topicType,topicImage = _ref10.topicImage;
  return http.post('/topic/insert_topic', {
    // userAuthorId: 1,
    // topicAuthorName,
    topicName: topicName,
    topicDescribe: topicDescribe,
    topicType: topicType,
    topicImage: topicImage });

};

//??????-????????????ID??????????????????????????????
// userAuthorId	true	number		???????????????ID(????????????)(????????????Token)
// topicAuthorName	true	string		????????????(???????????? + ?????????)
// topicName	true	string		????????????
// topicDescribe	true	string		????????????
// topicType	true	number		????????????(1: ???????????? 2: ????????????)
// topicImage	true	string		??????????????????
exports.insert_topic = insert_topic;var get_chapter_list_by_topic_single = function get_chapter_list_by_topic_single(_ref11)


{var userId = _ref11.userId,topicId = _ref11.topicId;
  return http.get('/chapter/get_chapter_list_by_topic_single', {
    params: {
      // userId,
      topicId: topicId } });


};

//??????-????????????????????????
// /userId	true	number		??????id
// sortType	true	number		???????????? 1-???????????? 2-????????????
exports.get_chapter_list_by_topic_single = get_chapter_list_by_topic_single;var get_my_creation_list = function get_my_creation_list(_ref12)





{var userId = _ref12.userId,content = _ref12.content,sortType = _ref12.sortType,pageNum = _ref12.pageNum,pageSize = _ref12.pageSize;
  return http.get('/listen/get_my_creation_list', {
    params: {
      // userId,
      content: content,
      sortType: sortType,
      pageNum: pageNum,
      pageSize: pageSize } });


};

//??????-????????????????????????
// orgUserId	true	number		??????ID(????????????ID,????????????Token )
// pageNum	false	number	1	?????????
// pageSize	false	number	10	???????????????
// otherUserId	false	number	null	???????????????ID ??????????????????????????????
exports.get_my_creation_list = get_my_creation_list;var get_org_anchor = function get_org_anchor(_ref13)




{var orgUserId = _ref13.orgUserId,pageNum = _ref13.pageNum,pageSize = _ref13.pageSize,otherUserId = _ref13.otherUserId;
  return http.get('/user/get_org_anchor', {
    params: {
      orgUserId: orgUserId,
      pageNum: pageNum,
      pageSize: pageSize,
      otherUserId: otherUserId } });


};

//??????-??????????????????????????????/??????
// orgUserId	true	number		??????ID(??????ID,????????????Token)
// otherUserId	false	number	null	???????????????ID ???????????????????????????
exports.get_org_anchor = get_org_anchor;var get_org_topic = function get_org_topic(_ref14)




{var orgUserId = _ref14.orgUserId,pageNum = _ref14.pageNum,pageSize = _ref14.pageSize,otherUserId = _ref14.otherUserId;
  return http.get('/topic/get_org_topic', {
    params: {
      orgUserId: orgUserId,
      pageNum: pageNum,
      pageSize: pageSize,
      otherUserId: otherUserId } });


};

//??????-?????????????????????????????????
// userId	true	number		??????ID(????????????Token)
// pageNum	false	number	1	?????????
// pageSize	false	string	10	???????????????
// otherUserId	false	number	null	???????????????ID ???????????????????????????
exports.get_org_topic = get_org_topic;var get_dynamic_by_userid = function get_dynamic_by_userid(_ref15)




{var otherUserId = _ref15.otherUserId,pageNum = _ref15.pageNum,pageSize = _ref15.pageSize,userId = _ref15.userId;
  return http.get('/user/get_dynamic_by_userid', {
    params: {
      otherUserId: otherUserId,
      pageNum: pageNum,
      pageSize: pageSize
      // userId
    } });

};

//????????????
// api/upload/img
exports.get_dynamic_by_userid = get_dynamic_by_userid;var api_img = function api_img(_ref16)

{var filePath = _ref16.filePath;
  return http.upload('https://app-auth.iqilu.com/member/avatar', {
    params: {},
    /* ?????????url??? */






    filePath: filePath, // ?????????????????????????????????
    name: 'file', // ??????????????? key , ???????????????????????????????????? key ????????????????????????????????????
    header: {
      // 'cookie': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE2Iiwib3JnaWQiOiIyOSIsIm5pY2tuYW1lIjoiXHU0ZjYwXHU1OTdkIiwiYXZhdGFyIjoiaHR0cHM6XC9cL2ltZzExLmlxaWx1LmNvbVwvMjAyMFwvMDZcLzA3XC8xMjJjYjNhOGZkZjc3ZDZiZTYxZjBiZWViYTdhZDhmNC5wbmcifQ.zBZk4iHTU35Zbh8dbmzWJ5Awc2-nsiVM_qm5PSvTg5A'
    } });


};


//??????token
// userId	true	number		??????ID(????????????Token)
exports.api_img = api_img;var c_get_user_msg = function c_get_user_msg() {
  return http.get('/common/get_user_msg', {
    params: {} });

};exports.c_get_user_msg = c_get_user_msg;

/***/ }),

/***/ 46:
/*!*********************************************!*\
  !*** F:/hear/hear/store/module/my/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _index = __webpack_require__(/*! @/api/my/index.js */ 45);var _default =

























{
  state: {
    count: null, // ?????????????????????,
    userInfo: null //????????????
  },
  mutations: {
    setCount: function setCount(state, value) {
      state.count = value;
    },
    setUserInfo: function setUserInfo(state, value) {
      state.userInfo = value;
    } },

  actions: {

    // ????????????????????????
    get_user_count: function get_user_count(_ref)



    {var state = _ref.state,commit = _ref.commit,rootState = _ref.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_user_count)().then(function (res) {
          // console.log(res.data.data, "????????????????????????");
          commit('setCount', res.data.data);
          resolve(res.data.data);
        });
      });
    },

    // ??????????????????
    get_user_msg: function get_user_msg(_ref2,



    obj) {var state = _ref2.state,commit = _ref2.commit,rootState = _ref2.rootState;
      // console.log(otherUserId);
      return new Promise(function (resolve, reject) {
        (0, _index.get_user_msg)(obj).then(function (res) {
          // console.log(res.data.data.list, "????????????");
          commit('setUserInfo', res.data.data.list[0]);
          resolve(res.data.data.list[0]);
        });
      });
    },

    // ????????????
    get_label: function get_label(_ref3,



    obj) {var state = _ref3.state,commit = _ref3.commit,rootState = _ref3.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_label)(obj).then(function (res) {
          // console.log(res.data.data, "????????????");
          resolve(res.data.data);
        });
      });
    },

    // ????????????
    insert_user_label: function insert_user_label(_ref4,



    obj) {var state = _ref4.state,commit = _ref4.commit,rootState = _ref4.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.insert_user_label)(obj).then(function (res) {
          // console.log(res.data, "????????????");
          resolve(res.data);
        });
      });
    },

    // ??????????????????token
    get_upload_token: function get_upload_token(_ref5)



    {var state = _ref5.state,commit = _ref5.commit,rootState = _ref5.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_upload_token)().then(function (res) {
          // console.log(res.data.data, "??????token");
          resolve(res.data.data);
        });
      });
    },

    // ??????????????????
    update_user_msg: function update_user_msg(_ref6,



    obj) {var state = _ref6.state,commit = _ref6.commit,rootState = _ref6.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.update_user_msg)(obj).then(function (res) {
          // console.log(res.data, "????????????");
          resolve(res.data);
        });
      });
    },

    // ????????????????????????????????????
    get_focus_or_fans_count: function get_focus_or_fans_count(_ref7,



    obj) {var state = _ref7.state,commit = _ref7.commit,rootState = _ref7.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_focus_or_fans_count)(obj).then(function (res) {
          // console.log(res.data, "?????????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ??????????????????
    is_focus: function is_focus(_ref8,



    obj) {var state = _ref8.state,commit = _ref8.commit,rootState = _ref8.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.is_focus)(obj).then(function (res) {
          // console.log(res.data, "??????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ?????????????????????
    get_user_topic_listen_count: function get_user_topic_listen_count(_ref9)



    {var state = _ref9.state,commit = _ref9.commit,rootState = _ref9.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_user_topic_listen_count)().then(function (res) {
          // console.log(res.data, "?????????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ??????-????????????(??????/??????)??????/??????
    get_user_play_single: function get_user_play_single(_ref10,



    type) {var state = _ref10.state,commit = _ref10.commit,rootState = _ref10.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_user_play_single)(type).then(function (res) {
          // console.log(res.data, "??????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ?????????????????????
    get_user_collect: function get_user_collect(_ref11,



    obj) {var state = _ref11.state,commit = _ref11.commit,rootState = _ref11.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_user_collect)(obj).then(function (res) {
          // console.log(res.data, "?????????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ?????????????????????
    get_user_fans: function get_user_fans(_ref12,



    obj) {var state = _ref12.state,commit = _ref12.commit,rootState = _ref12.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_user_fans)(obj).then(function (res) {
          // console.log(res.data, "??????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ??????????????????
    get_user_focus: function get_user_focus(_ref13,



    obj) {var state = _ref13.state,commit = _ref13.commit,rootState = _ref13.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_user_focus)(obj).then(function (res) {
          // console.log(res.data, "??????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ??????????????????
    insert_focus: function insert_focus(_ref14,



    id) {var state = _ref14.state,commit = _ref14.commit,rootState = _ref14.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.insert_focus)(id).then(function (res) {
          console.log(res.data, "??????????????????");
          resolve(res.data);
        });
      });
    },

    // ??????????????????
    delete_focus: function delete_focus(_ref15,



    fansId) {var state = _ref15.state,commit = _ref15.commit,rootState = _ref15.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.delete_focus)(fansId).then(function (res) {
          console.log(res.data, "??????????????????");
          resolve(res.data);
        });
      });
    },

    // ????????????
    insert_topic: function insert_topic(_ref16,



    obj) {var state = _ref16.state,commit = _ref16.commit,rootState = _ref16.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.insert_topic)(obj).then(function (res) {
          // console.log(res.data, "????????????");
          resolve(res.data);
        });
      });
    },

    // ??????-????????????ID??????????????????????????????
    get_chapter_list_by_topic_single: function get_chapter_list_by_topic_single(_ref17,



    obj) {var state = _ref17.state,commit = _ref17.commit,rootState = _ref17.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_chapter_list_by_topic_single)(obj).then(function (res) {
          // console.log(res.data, "??????????????????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ??????-????????????????????????
    get_my_creation_list: function get_my_creation_list(_ref18,



    obj) {var state = _ref18.state,commit = _ref18.commit,rootState = _ref18.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_my_creation_list)(obj).then(function (res) {
          // console.log(res.data, "??????-????????????????????????");
          resolve(res.data.data);
        });
      });
    },

    // ??????-????????????????????????
    get_org_anchor: function get_org_anchor(_ref19,



    obj) {var state = _ref19.state,commit = _ref19.commit,rootState = _ref19.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_org_anchor)(obj).then(function (res) {
          console.log(res.data, "??????-????????????????????????");
          resolve(res.data.data);
        });
      });
    },

    //??????-??????????????????????????????/??????
    get_org_topic: function get_org_topic(_ref20,



    obj) {var state = _ref20.state,commit = _ref20.commit,rootState = _ref20.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_org_topic)(obj).then(function (res) {
          console.log(res.data, "??????-??????????????????????????????/??????");
          resolve(res.data.data);
        });
      });
    },

    //??????-?????????????????????????????????
    get_dynamic_by_userid: function get_dynamic_by_userid(_ref21,



    obj) {var state = _ref21.state,commit = _ref21.commit,rootState = _ref21.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.get_dynamic_by_userid)(obj).then(function (res) {
          console.log(res.data, "??????-?????????????????????????????????");
          resolve(res.data.data);
        });
      });
    },

    //  ????????????
    api_img: function api_img(_ref22,



    obj) {var state = _ref22.state,commit = _ref22.commit,rootState = _ref22.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.api_img)(obj).then(function (res) {
          console.log(res, "????????????");
          resolve(res);
        });
      });
    },

    //????????????token
    c_get_user_msg: function c_get_user_msg(_ref23)



    {var state = _ref23.state,commit = _ref23.commit,rootState = _ref23.rootState;
      return new Promise(function (resolve, reject) {
        (0, _index.c_get_user_msg)().then(function (res) {
          console.log(res, "????????????token");
          resolve(res);
        });
      });
    } } };exports.default = _default;

/***/ }),

/***/ 47:
/*!*****************************!*\
  !*** F:/hear/hear/index.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 48));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 49));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 53));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 54));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 55));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 56));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 57));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 58));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 59));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 60));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 61));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 51));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 50));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 62));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 52));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 63));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 64));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 65));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 66));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 67));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 68);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 69));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 70));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 71));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 72));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // ????????????mixin
// ??????????????????mixin??????????????????????????????
// import wxshare from './libs/mixin/mpShare.js'
// ??????????????????http????????????????????????
function wranning(str) {// ??????????????????????????????,???????????????????????????
  // ?????????????????????????????????????????????,??????hx????????????????????????????????????,??????:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // ???????????????????????????/store????????????$u.mixin.js????????????uView?????????????????????????????????vuex???state??????
// HX2.6.11??????,??????try???,????????????????????????,????????????????????????
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post????????????????????????get??????url??????
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // ??????date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get, post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView????????????????????????????????????
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // ???????????????????????????????????????date???timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // ???????????????????????????????????????????????????
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;

/***/ }),

/***/ 472:
/*!***********************************************!*\
  !*** F:/hear/hear/pagesC/playPage/element.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.getElSize = getElSize;exports.getTouchPoint = getTouchPoint;function getElSize(name, ins) {
  return new Promise(function (res, rej) {

    var el = uni.createSelectorQuery().in(ins).select('#' + name);
    el.fields({
      size: true,
      rect: true },
    function (data) {
      if (data) {
        res(data);
      } else {
        rej({});
      }
    }).exec();














  });
}

function getTouchPoint(e) {
  if (!e) {
    return {
      x: 0,
      y: 0 };

  }
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY };

  } else if (e.changedTouches && e.changedTouches[0]) {
    return {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY };

  } else {
    return {
      x: e.clientX,
      y: e.clientY };

  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 473:
/*!**********************************************!*\
  !*** F:/hear/hear/pagesC/playPage/system.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.initSystemInfo = initSystemInfo;exports.getPlatform = getPlatform;exports.getNavbarHeight = getNavbarHeight;exports.getWindowHeight = getWindowHeight;exports.getScreenHeight = getScreenHeight;exports.getStatusBarHeight = getStatusBarHeight;exports.getXBarHeight = getXBarHeight;exports.getPx = getPx;exports.getHeight = getHeight;function _getSystemInfo() {
  var info = uni.getSystemInfoSync();
  var app = getApp({
    allowDefault: true });


  app.globalData.screenHeight = info.screenHeight;
  app.globalData.statusBarHeight = info.statusBarHeight || 0;

  if (info.safeAreaInsets) {
    app.globalData.safeTop = info.safeAreaInsets.top;
    app.globalData.safeBottom = info.safeAreaInsets.bottom;
  } else {
    if (info.safeArea) {
      app.globalData.safeTop = info.safeArea.top;
      app.globalData.safeBottom = info.screenHeight - info.safeArea.bottom;
    } else {
      app.globalData.safeTop = 0;
      app.globalData.safeBottom = 0;
    }
  }
  if (app.globalData.safeTop > 0 && app.globalData.statusBarHeight === 0) {
    app.globalData.statusBarHeight = app.globalData.safeTop;
  }
  // ??????:??????uni???tabbar??????????????????bottom????????????????????????
  var tabHeight = app.globalData.tabHeight || 50;
  if (app.globalData.safeBottom === 0 || app.globalData.safeBottom - tabHeight > 0) {
    var extra = info.screenHeight - info.windowHeight;
    if (extra > 0) {
      // tabHeight ???????????? safeBottom ?????????
      if (extra - tabHeight > 0) {
        app.globalData.safeBottom = extra - tabHeight;
      } else {
        app.globalData.safeBottom = extra;
      }
    }
  }

  app.globalData.platform = info.platform;
  app.globalData.brand = info.brand;
  app.globalData.model = info.model;
}

function initSystemInfo() {
  try {
    _getSystemInfo();
  } catch (e) {
    _getSystemInfo();
  }
}

function getPlatform() {
  var app = getApp({
    allowDefault: true });

  if (app.globalData.platform) {
    return app.globalData.platform;
  }
  initSystemInfo();
  return app.globalData.platform;
}

function getNavbarHeight() {
  var app = getApp({
    allowDefault: true });

  if (app.globalData.navHeight) {
    return app.globalData.navHeight;
  }
  app.globalData.navHeight = 44;
  return app.globalData.navHeight;
}

function getWindowHeight() {
  try {
    return uni.getSystemInfoSync().windowHeight;
  } catch (e) {
    try {
      return uni.getSystemInfoSync().windowHeight;
    } catch (e) {
      return 0;
    }
  }
}

function getScreenHeight() {
  var app = getApp({
    allowDefault: true });

  if (app.globalData.screenHeight) {
    return app.globalData.screenHeight;
  }
  initSystemInfo();
  return app.globalData.screenHeight;
}

function getStatusBarHeight() {
  var app = getApp({
    allowDefault: true });

  if (app.globalData.statusBarHeight) {
    return app.globalData.statusBarHeight;
  }
  if (!app.globalData.platform || app.globalData.platform.length === 0) {
    initSystemInfo();
  }
  return app.globalData.statusBarHeight;
}

function getXBarHeight() {
  var app = getApp({
    allowDefault: true });

  if (app.globalData.safeBottom) {
    return app.globalData.safeBottom;
  }
  if (!app.globalData.platform || app.globalData.platform.length === 0) {
    initSystemInfo();
  }
  return app.globalData.safeBottom;
}

function getPx(val) {
  if (typeof val === 'number') {
    return uni.upx2px(val);
  }
  var a = parseInt(val);
  if (val.indexOf('rpx') >= 0) {
    // return uni.upx2px(a)
    return a / 2;
  }
  if (val.indexOf('upx') >= 0) {
    return uni.upx2px(a);
  }
  if (val.indexOf('px') >= 0) {
    return a;
  }
  return uni.upx2px(a);
}

function getHeight(val) {
  if (val === 'screen') {
    return getScreenHeight();
  }
  if (val === 'status') {
    return getStatusBarHeight();
  }
  if (val === 'nav') {
    return getNavbarHeight();
  }
  if (val === 'status-nav' || val === 'nav-status') {
    return getStatusBarHeight() + getNavbarHeight();
  }
  if (val === 'x') {
    return getXBarHeight();
  }
  if (typeof val === 'string') {
    var arr = val.split('-');
    var h = 0;
    for (var i in arr) {
      var t = arr[i];
      var factor = 1;
      if (t.startsWith('!')) {
        factor = -1;
      }
      if (t === 'screen' || t === '!screen') {
        h += factor * getScreenHeight();
      } else if (t === 'status' || t === '!status') {
        h += factor * getStatusBarHeight();
      } else if (t === 'nav' || t === '!nav') {
        h += factor * getNavbarHeight();
      } else if (t === 'x' || t === '!x') {
        h += factor * getXBarHeight();
      } else {
        if (t.startsWith('!')) {
          h -= getPx(t.substring(1));
        } else {
          h += getPx(t);
        }
      }
    }
    return h;
  }
  return getPx(val);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 48:
/*!****************************************!*\
  !*** F:/hear/hear/libs/mixin/mixin.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect?????????$u?????????????????????????????????in(this)?????????????????????????????????????????????????????????
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // ??????????????????
    // ?????????????????????????????????????????????????????????????????????????????????????????????bug(2020-07-21)
    // ???????????????????????????????????????????????????????????????view??????
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 49:
/*!******************************************!*\
  !*** F:/hear/hear/libs/request/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 50));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 52));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // ????????????????????????
    value: function setConfig(customConfig) {
      // ????????????????????????????????????????????????????????????
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // ??????????????????
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // ??????????????????
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorReuest = this.interceptor.request(options);
        if (interceptorReuest === false) {
          // ??????????????????pending????????????Promise???????????????promise???????????????then()??????
          return new Promise(function () {});
        }
        this.options = interceptorReuest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign(this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // ????????????????????????loading(?????????????????????????????????????????????loading)
          uni.hideLoading();
          // ???????????????????????????????????????????????????loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // ???????????????????????????????????????????????????originalData???true????????????????????????(response)??????????????????????????????response.data
          if (_this.config.originalData) {
            // ???????????????????????????
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // ????????????????????????false????????????????????????????????????this.$u.post???then??????
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // ?????????????????????false??????????????????????????????????????????????????????????????????catch??????
                reject(response);
              }
            } else {
              // ????????????????????????????????????????????????????????????????????????????????????
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // ??????????????????????????????(originalData=false)??????????????????????????????????????????????????????then??????
                resolve(response.data);
              }
            } else {
              // ????????????????????????????????????????????????????????????200???modal????????????
              if (response.errMsg) {
                uni.showModal({
                  title: response.errMsg });

              }
              reject(response);
            }
          }
        };

        // ?????????????????????URL??????/??????,????????????,??????/??????????????????uView???test.js????????????url()??????
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // ????????????loading
        // ?????????????????????timer?????????????????????????????????????????????????????????????????????????????????????????????id
        // ?????????????????????????????????????????????????????????????????????loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// ????????????reject()??????????????????this.$u.post().then().catch()?????????catct()
      // 	// ???????????????????????????????????????catch()???????????????????????????catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // ??????????????????
      // ??????????????????
      header: {},
      method: 'POST',
      // ?????????json????????????uni.request????????????????????????JSON.parse
      dataType: 'json',
      // ??????????????????????????????5+??????????????????????????????????????????text??????
      responseType: 'text',
      showLoading: true, // ????????????????????????loading
      loadingText: '?????????...',
      loadingTime: 800, // ??????????????????????????????????????????????????????????????????????????????ms
      timer: null, // ?????????
      originalData: false, // ?????????????????????????????????????????????????????????????????????
      loadingMask: true // ??????loading???????????????????????????????????????????????????????????????
    };

    // ?????????
    this.interceptor = {
      // ??????????????????
      request: null,
      // ??????????????????
      response: null };


    // get??????
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post??????
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put????????????????????????????????????(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete?????????????????????????????????????????????(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 50:
/*!***********************************************!*\
  !*** F:/hear/hear/libs/function/deepMerge.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 51));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS??????????????????
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 51:
/*!***********************************************!*\
  !*** F:/hear/hear/libs/function/deepClone.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // ??????arr????????????????????????????????????bool???
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// ????????????
function deepClone(obj) {
  // ????????????????????????????????????????????????
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //????????????????????????
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 52:
/*!******************************************!*\
  !*** F:/hear/hear/libs/function/test.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * ????????????????????????
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * ??????????????????
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * ??????URL??????
   */
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.
  test(value);
}

/**
   * ??????????????????
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * ??????ISO?????????????????????
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * ?????????????????????
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * ????????????
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * ?????????????????????
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * ???????????????
   */
function carNo(value) {
  // ???????????????
  var xreg = /^[???????????????????????????????????????????????????????????????????????????????????????????????????A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // ?????????
  var creg = /^[???????????????????????????????????????????????????????????????????????????????????????????????????A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9???????????????]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * ??????,?????????2?????????
   */
function amount(value) {
  //????????????????????????????????????
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * ??????
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * ??????????????????
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * ???????????????????????????
   */
function enOrNum(value) {
  //??????????????????
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * ???????????????????????????
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * ?????????????????????[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * ????????????????????????[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * ??????????????????
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * ??????????????????
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * ??????json?????????
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * ????????????
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}


/**
   * ????????????
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array };exports.default = _default;

/***/ }),

/***/ 523:
/*!*****************************************!*\
  !*** F:/hear/hear/libs/util/emitter.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * ???????????? call ??????this??????
                                                                                                      * @param componentName // ???????????????????????????
                                                                                                      * @param eventName // ????????????
                                                                                                      * @param params // ?????????????????????
                                                                                                      */
function _broadcast(componentName, eventName, params) {
  // ????????????????????????????????????????????? ?????? ?????? ???????????????
  this.$children.map(function (child) {
    if (componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}var _default =
{
  methods: {
    /**
              * ?????? (????????????) (??????)
              * @param componentName // ???????????????????????????
              * @param eventName // ????????????
              * @param params // ?????????????????????
              */
    dispatch: function dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root; //$parent ???????????????????????? $root ?????????
      var name = parent.$options.name; // ???????????????????????????name
      // ????????????????????? && ??????????????? ??? ??????????????????????????????????????????????????????????????????????????????
      // ?????????????????????????????????????????????
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.name;
        }
      }
      // ??????????????????????????????name???????????????
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    /**
        * ?????? (????????????) (????????????)
        * @param componentName // ???????????????????????????
        * @param eventName // ????????????
        * @param params // ?????????????????????
        */
    broadcast: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    } } };exports.default = _default;

/***/ }),

/***/ 53:
/*!*************************************************!*\
  !*** F:/hear/hear/libs/function/queryParams.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * ?????????url??????
                                                                                                      * @param {*} data,??????
                                                                                                      * @param {*} isPrefix,??????????????????"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // ?????????????????????
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // ?????????????????????????????????
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // ??????: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // ??????: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // ??????: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // ??????: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 538:
/*!******************************************!*\
  !*** F:/hear/hear/libs/util/province.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var provinceData = [{
  "label": "?????????",
  "value": "11" },

{
  "label": "?????????",
  "value": "12" },

{
  "label": "?????????",
  "value": "13" },

{
  "label": "?????????",
  "value": "14" },

{
  "label": "??????????????????",
  "value": "15" },

{
  "label": "?????????",
  "value": "21" },

{
  "label": "?????????",
  "value": "22" },

{
  "label": "????????????",
  "value": "23" },

{
  "label": "?????????",
  "value": "31" },

{
  "label": "?????????",
  "value": "32" },

{
  "label": "?????????",
  "value": "33" },

{
  "label": "?????????",
  "value": "34" },

{
  "label": "?????????",
  "value": "35" },

{
  "label": "?????????",
  "value": "36" },

{
  "label": "?????????",
  "value": "37" },

{
  "label": "?????????",
  "value": "41" },

{
  "label": "?????????",
  "value": "42" },

{
  "label": "?????????",
  "value": "43" },

{
  "label": "?????????",
  "value": "44" },

{
  "label": "?????????????????????",
  "value": "45" },

{
  "label": "?????????",
  "value": "46" },

{
  "label": "?????????",
  "value": "50" },

{
  "label": "?????????",
  "value": "51" },

{
  "label": "?????????",
  "value": "52" },

{
  "label": "?????????",
  "value": "53" },

{
  "label": "???????????????",
  "value": "54" },

{
  "label": "?????????",
  "value": "61" },

{
  "label": "?????????",
  "value": "62" },

{
  "label": "?????????",
  "value": "63" },

{
  "label": "?????????????????????",
  "value": "64" },

{
  "label": "????????????????????????",
  "value": "65" },

{
  "label": "??????",
  "value": "66" },

{
  "label": "??????",
  "value": "67" },

{
  "label": "??????",
  "value": "68" }];var _default =


provinceData;exports.default = _default;

/***/ }),

/***/ 539:
/*!**************************************!*\
  !*** F:/hear/hear/libs/util/city.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var cityData = [
[{
  "label": "?????????",
  "value": "1101" }],

[{
  "label": "?????????",
  "value": "1201" }],

[{
  "label": "????????????",
  "value": "1301" },

{
  "label": "?????????",
  "value": "1302" },

{
  "label": "????????????",
  "value": "1303" },

{
  "label": "?????????",
  "value": "1304" },

{
  "label": "?????????",
  "value": "1305" },

{
  "label": "?????????",
  "value": "1306" },

{
  "label": "????????????",
  "value": "1307" },

{
  "label": "?????????",
  "value": "1308" },

{
  "label": "?????????",
  "value": "1309" },

{
  "label": "?????????",
  "value": "1310" },

{
  "label": "?????????",
  "value": "1311" }],


[{
  "label": "?????????",
  "value": "1401" },

{
  "label": "?????????",
  "value": "1402" },

{
  "label": "?????????",
  "value": "1403" },

{
  "label": "?????????",
  "value": "1404" },

{
  "label": "?????????",
  "value": "1405" },

{
  "label": "?????????",
  "value": "1406" },

{
  "label": "?????????",
  "value": "1407" },

{
  "label": "?????????",
  "value": "1408" },

{
  "label": "?????????",
  "value": "1409" },

{
  "label": "?????????",
  "value": "1410" },

{
  "label": "?????????",
  "value": "1411" }],


[{
  "label": "???????????????",
  "value": "1501" },

{
  "label": "?????????",
  "value": "1502" },

{
  "label": "?????????",
  "value": "1503" },

{
  "label": "?????????",
  "value": "1504" },

{
  "label": "?????????",
  "value": "1505" },

{
  "label": "???????????????",
  "value": "1506" },

{
  "label": "???????????????",
  "value": "1507" },

{
  "label": "???????????????",
  "value": "1508" },

{
  "label": "???????????????",
  "value": "1509" },

{
  "label": "?????????",
  "value": "1522" },

{
  "label": "???????????????",
  "value": "1525" },

{
  "label": "????????????",
  "value": "1529" }],


[{
  "label": "?????????",
  "value": "2101" },

{
  "label": "?????????",
  "value": "2102" },

{
  "label": "?????????",
  "value": "2103" },

{
  "label": "?????????",
  "value": "2104" },

{
  "label": "?????????",
  "value": "2105" },

{
  "label": "?????????",
  "value": "2106" },

{
  "label": "?????????",
  "value": "2107" },

{
  "label": "?????????",
  "value": "2108" },

{
  "label": "?????????",
  "value": "2109" },

{
  "label": "?????????",
  "value": "2110" },

{
  "label": "?????????",
  "value": "2111" },

{
  "label": "?????????",
  "value": "2112" },

{
  "label": "?????????",
  "value": "2113" },

{
  "label": "????????????",
  "value": "2114" }],


[{
  "label": "?????????",
  "value": "2201" },

{
  "label": "?????????",
  "value": "2202" },

{
  "label": "?????????",
  "value": "2203" },

{
  "label": "?????????",
  "value": "2204" },

{
  "label": "?????????",
  "value": "2205" },

{
  "label": "?????????",
  "value": "2206" },

{
  "label": "?????????",
  "value": "2207" },

{
  "label": "?????????",
  "value": "2208" },

{
  "label": "????????????????????????",
  "value": "2224" }],


[{
  "label": "????????????",
  "value": "2301" },

{
  "label": "???????????????",
  "value": "2302" },

{
  "label": "?????????",
  "value": "2303" },

{
  "label": "?????????",
  "value": "2304" },

{
  "label": "????????????",
  "value": "2305" },

{
  "label": "?????????",
  "value": "2306" },

{
  "label": "?????????",
  "value": "2307" },

{
  "label": "????????????",
  "value": "2308" },

{
  "label": "????????????",
  "value": "2309" },

{
  "label": "????????????",
  "value": "2310" },

{
  "label": "?????????",
  "value": "2311" },

{
  "label": "?????????",
  "value": "2312" },

{
  "label": "??????????????????",
  "value": "2327" }],


[{
  "label": "?????????",
  "value": "3101" }],

[{
  "label": "?????????",
  "value": "3201" },

{
  "label": "?????????",
  "value": "3202" },

{
  "label": "?????????",
  "value": "3203" },

{
  "label": "?????????",
  "value": "3204" },

{
  "label": "?????????",
  "value": "3205" },

{
  "label": "?????????",
  "value": "3206" },

{
  "label": "????????????",
  "value": "3207" },

{
  "label": "?????????",
  "value": "3208" },

{
  "label": "?????????",
  "value": "3209" },

{
  "label": "?????????",
  "value": "3210" },

{
  "label": "?????????",
  "value": "3211" },

{
  "label": "?????????",
  "value": "3212" },

{
  "label": "?????????",
  "value": "3213" }],


[{
  "label": "?????????",
  "value": "3301" },

{
  "label": "?????????",
  "value": "3302" },

{
  "label": "?????????",
  "value": "3303" },

{
  "label": "?????????",
  "value": "3304" },

{
  "label": "?????????",
  "value": "3305" },

{
  "label": "?????????",
  "value": "3306" },

{
  "label": "?????????",
  "value": "3307" },

{
  "label": "?????????",
  "value": "3308" },

{
  "label": "?????????",
  "value": "3309" },

{
  "label": "?????????",
  "value": "3310" },

{
  "label": "?????????",
  "value": "3311" }],


[{
  "label": "?????????",
  "value": "3401" },

{
  "label": "?????????",
  "value": "3402" },

{
  "label": "?????????",
  "value": "3403" },

{
  "label": "?????????",
  "value": "3404" },

{
  "label": "????????????",
  "value": "3405" },

{
  "label": "?????????",
  "value": "3406" },

{
  "label": "?????????",
  "value": "3407" },

{
  "label": "?????????",
  "value": "3408" },

{
  "label": "?????????",
  "value": "3410" },

{
  "label": "?????????",
  "value": "3411" },

{
  "label": "?????????",
  "value": "3412" },

{
  "label": "?????????",
  "value": "3413" },

{
  "label": "?????????",
  "value": "3415" },

{
  "label": "?????????",
  "value": "3416" },

{
  "label": "?????????",
  "value": "3417" },

{
  "label": "?????????",
  "value": "3418" }],


[{
  "label": "?????????",
  "value": "3501" },

{
  "label": "?????????",
  "value": "3502" },

{
  "label": "?????????",
  "value": "3503" },

{
  "label": "?????????",
  "value": "3504" },

{
  "label": "?????????",
  "value": "3505" },

{
  "label": "?????????",
  "value": "3506" },

{
  "label": "?????????",
  "value": "3507" },

{
  "label": "?????????",
  "value": "3508" },

{
  "label": "?????????",
  "value": "3509" }],


[{
  "label": "?????????",
  "value": "3601" },

{
  "label": "????????????",
  "value": "3602" },

{
  "label": "?????????",
  "value": "3603" },

{
  "label": "?????????",
  "value": "3604" },

{
  "label": "?????????",
  "value": "3605" },

{
  "label": "?????????",
  "value": "3606" },

{
  "label": "?????????",
  "value": "3607" },

{
  "label": "?????????",
  "value": "3608" },

{
  "label": "?????????",
  "value": "3609" },

{
  "label": "?????????",
  "value": "3610" },

{
  "label": "?????????",
  "value": "3611" }],


[{
  "label": "?????????",
  "value": "3701" },

{
  "label": "?????????",
  "value": "3702" },

{
  "label": "?????????",
  "value": "3703" },

{
  "label": "?????????",
  "value": "3704" },

{
  "label": "?????????",
  "value": "3705" },

{
  "label": "?????????",
  "value": "3706" },

{
  "label": "?????????",
  "value": "3707" },

{
  "label": "?????????",
  "value": "3708" },

{
  "label": "?????????",
  "value": "3709" },

{
  "label": "?????????",
  "value": "3710" },

{
  "label": "?????????",
  "value": "3711" },

{
  "label": "?????????",
  "value": "3712" },

{
  "label": "?????????",
  "value": "3713" },

{
  "label": "?????????",
  "value": "3714" },

{
  "label": "?????????",
  "value": "3715" },

{
  "label": "?????????",
  "value": "3716" },

{
  "label": "?????????",
  "value": "3717" }],


[{
  "label": "?????????",
  "value": "4101" },

{
  "label": "?????????",
  "value": "4102" },

{
  "label": "?????????",
  "value": "4103" },

{
  "label": "????????????",
  "value": "4104" },

{
  "label": "?????????",
  "value": "4105" },

{
  "label": "?????????",
  "value": "4106" },

{
  "label": "?????????",
  "value": "4107" },

{
  "label": "?????????",
  "value": "4108" },

{
  "label": "?????????",
  "value": "4109" },

{
  "label": "?????????",
  "value": "4110" },

{
  "label": "?????????",
  "value": "4111" },

{
  "label": "????????????",
  "value": "4112" },

{
  "label": "?????????",
  "value": "4113" },

{
  "label": "?????????",
  "value": "4114" },

{
  "label": "?????????",
  "value": "4115" },

{
  "label": "?????????",
  "value": "4116" },

{
  "label": "????????????",
  "value": "4117" },

{
  "label": "???????????????????????????",
  "value": "4190" }],


[{
  "label": "?????????",
  "value": "4201" },

{
  "label": "?????????",
  "value": "4202" },

{
  "label": "?????????",
  "value": "4203" },

{
  "label": "?????????",
  "value": "4205" },

{
  "label": "?????????",
  "value": "4206" },

{
  "label": "?????????",
  "value": "4207" },

{
  "label": "?????????",
  "value": "4208" },

{
  "label": "?????????",
  "value": "4209" },

{
  "label": "?????????",
  "value": "4210" },

{
  "label": "?????????",
  "value": "4211" },

{
  "label": "?????????",
  "value": "4212" },

{
  "label": "?????????",
  "value": "4213" },

{
  "label": "??????????????????????????????",
  "value": "4228" },

{
  "label": "???????????????????????????",
  "value": "4290" }],


[{
  "label": "?????????",
  "value": "4301" },

{
  "label": "?????????",
  "value": "4302" },

{
  "label": "?????????",
  "value": "4303" },

{
  "label": "?????????",
  "value": "4304" },

{
  "label": "?????????",
  "value": "4305" },

{
  "label": "?????????",
  "value": "4306" },

{
  "label": "?????????",
  "value": "4307" },

{
  "label": "????????????",
  "value": "4308" },

{
  "label": "?????????",
  "value": "4309" },

{
  "label": "?????????",
  "value": "4310" },

{
  "label": "?????????",
  "value": "4311" },

{
  "label": "?????????",
  "value": "4312" },

{
  "label": "?????????",
  "value": "4313" },

{
  "label": "??????????????????????????????",
  "value": "4331" }],


[{
  "label": "?????????",
  "value": "4401" },

{
  "label": "?????????",
  "value": "4402" },

{
  "label": "?????????",
  "value": "4403" },

{
  "label": "?????????",
  "value": "4404" },

{
  "label": "?????????",
  "value": "4405" },

{
  "label": "?????????",
  "value": "4406" },

{
  "label": "?????????",
  "value": "4407" },

{
  "label": "?????????",
  "value": "4408" },

{
  "label": "?????????",
  "value": "4409" },

{
  "label": "?????????",
  "value": "4412" },

{
  "label": "?????????",
  "value": "4413" },

{
  "label": "?????????",
  "value": "4414" },

{
  "label": "?????????",
  "value": "4415" },

{
  "label": "?????????",
  "value": "4416" },

{
  "label": "?????????",
  "value": "4417" },

{
  "label": "?????????",
  "value": "4418" },

{
  "label": "?????????",
  "value": "4419" },

{
  "label": "?????????",
  "value": "4420" },

{
  "label": "?????????",
  "value": "4451" },

{
  "label": "?????????",
  "value": "4452" },

{
  "label": "?????????",
  "value": "4453" }],


[{
  "label": "?????????",
  "value": "4501" },

{
  "label": "?????????",
  "value": "4502" },

{
  "label": "?????????",
  "value": "4503" },

{
  "label": "?????????",
  "value": "4504" },

{
  "label": "?????????",
  "value": "4505" },

{
  "label": "????????????",
  "value": "4506" },

{
  "label": "?????????",
  "value": "4507" },

{
  "label": "?????????",
  "value": "4508" },

{
  "label": "?????????",
  "value": "4509" },

{
  "label": "?????????",
  "value": "4510" },

{
  "label": "?????????",
  "value": "4511" },

{
  "label": "?????????",
  "value": "4512" },

{
  "label": "?????????",
  "value": "4513" },

{
  "label": "?????????",
  "value": "4514" }],


[{
  "label": "?????????",
  "value": "4601" },

{
  "label": "?????????",
  "value": "4602" },

{
  "label": "?????????",
  "value": "4603" },

{
  "label": "?????????",
  "value": "4604" },

{
  "label": "???????????????????????????",
  "value": "4690" }],


[{
  "label": "?????????",
  "value": "5001" },

{
  "label": "???",
  "value": "5002" }],


[{
  "label": "?????????",
  "value": "5101" },

{
  "label": "?????????",
  "value": "5103" },

{
  "label": "????????????",
  "value": "5104" },

{
  "label": "?????????",
  "value": "5105" },

{
  "label": "?????????",
  "value": "5106" },

{
  "label": "?????????",
  "value": "5107" },

{
  "label": "?????????",
  "value": "5108" },

{
  "label": "?????????",
  "value": "5109" },

{
  "label": "?????????",
  "value": "5110" },

{
  "label": "?????????",
  "value": "5111" },

{
  "label": "?????????",
  "value": "5113" },

{
  "label": "?????????",
  "value": "5114" },

{
  "label": "?????????",
  "value": "5115" },

{
  "label": "?????????",
  "value": "5116" },

{
  "label": "?????????",
  "value": "5117" },

{
  "label": "?????????",
  "value": "5118" },

{
  "label": "?????????",
  "value": "5119" },

{
  "label": "?????????",
  "value": "5120" },

{
  "label": "???????????????????????????",
  "value": "5132" },

{
  "label": "?????????????????????",
  "value": "5133" },

{
  "label": "?????????????????????",
  "value": "5134" }],


[{
  "label": "?????????",
  "value": "5201" },

{
  "label": "????????????",
  "value": "5202" },

{
  "label": "?????????",
  "value": "5203" },

{
  "label": "?????????",
  "value": "5204" },

{
  "label": "?????????",
  "value": "5205" },

{
  "label": "?????????",
  "value": "5206" },

{
  "label": "?????????????????????????????????",
  "value": "5223" },

{
  "label": "??????????????????????????????",
  "value": "5226" },

{
  "label": "??????????????????????????????",
  "value": "5227" }],


[{
  "label": "?????????",
  "value": "5301" },

{
  "label": "?????????",
  "value": "5303" },

{
  "label": "?????????",
  "value": "5304" },

{
  "label": "?????????",
  "value": "5305" },

{
  "label": "?????????",
  "value": "5306" },

{
  "label": "?????????",
  "value": "5307" },

{
  "label": "?????????",
  "value": "5308" },

{
  "label": "?????????",
  "value": "5309" },

{
  "label": "?????????????????????",
  "value": "5323" },

{
  "label": "??????????????????????????????",
  "value": "5325" },

{
  "label": "???????????????????????????",
  "value": "5326" },

{
  "label": "???????????????????????????",
  "value": "5328" },

{
  "label": "?????????????????????",
  "value": "5329" },

{
  "label": "??????????????????????????????",
  "value": "5331" },

{
  "label": "????????????????????????",
  "value": "5333" },

{
  "label": "?????????????????????",
  "value": "5334" }],


[{
  "label": "?????????",
  "value": "5401" },

{
  "label": "????????????",
  "value": "5402" },

{
  "label": "?????????",
  "value": "5403" },

{
  "label": "?????????",
  "value": "5404" },

{
  "label": "?????????",
  "value": "5405" },

{
  "label": "????????????",
  "value": "5424" },

{
  "label": "????????????",
  "value": "5425" }],


[{
  "label": "?????????",
  "value": "6101" },

{
  "label": "?????????",
  "value": "6102" },

{
  "label": "?????????",
  "value": "6103" },

{
  "label": "?????????",
  "value": "6104" },

{
  "label": "?????????",
  "value": "6105" },

{
  "label": "?????????",
  "value": "6106" },

{
  "label": "?????????",
  "value": "6107" },

{
  "label": "?????????",
  "value": "6108" },

{
  "label": "?????????",
  "value": "6109" },

{
  "label": "?????????",
  "value": "6110" }],


[{
  "label": "?????????",
  "value": "6201" },

{
  "label": "????????????",
  "value": "6202" },

{
  "label": "?????????",
  "value": "6203" },

{
  "label": "?????????",
  "value": "6204" },

{
  "label": "?????????",
  "value": "6205" },

{
  "label": "?????????",
  "value": "6206" },

{
  "label": "?????????",
  "value": "6207" },

{
  "label": "?????????",
  "value": "6208" },

{
  "label": "?????????",
  "value": "6209" },

{
  "label": "?????????",
  "value": "6210" },

{
  "label": "?????????",
  "value": "6211" },

{
  "label": "?????????",
  "value": "6212" },

{
  "label": "?????????????????????",
  "value": "6229" },

{
  "label": "?????????????????????",
  "value": "6230" }],


[{
  "label": "?????????",
  "value": "6301" },

{
  "label": "?????????",
  "value": "6302" },

{
  "label": "?????????????????????",
  "value": "6322" },

{
  "label": "?????????????????????",
  "value": "6323" },

{
  "label": "?????????????????????",
  "value": "6325" },

{
  "label": "?????????????????????",
  "value": "6326" },

{
  "label": "?????????????????????",
  "value": "6327" },

{
  "label": "??????????????????????????????",
  "value": "6328" }],


[{
  "label": "?????????",
  "value": "6401" },

{
  "label": "????????????",
  "value": "6402" },

{
  "label": "?????????",
  "value": "6403" },

{
  "label": "?????????",
  "value": "6404" },

{
  "label": "?????????",
  "value": "6405" }],


[{
  "label": "???????????????",
  "value": "6501" },

{
  "label": "???????????????",
  "value": "6502" },

{
  "label": "????????????",
  "value": "6504" },

{
  "label": "?????????",
  "value": "6505" },

{
  "label": "?????????????????????",
  "value": "6523" },

{
  "label": "???????????????????????????",
  "value": "6527" },

{
  "label": "???????????????????????????",
  "value": "6528" },

{
  "label": "???????????????",
  "value": "6529" },

{
  "label": "?????????????????????????????????",
  "value": "6530" },

{
  "label": "????????????",
  "value": "6531" },

{
  "label": "????????????",
  "value": "6532" },

{
  "label": "????????????????????????",
  "value": "6540" },

{
  "label": "????????????",
  "value": "6542" },

{
  "label": "???????????????",
  "value": "6543" },

{
  "label": "?????????????????????????????????",
  "value": "6590" }],


[{
  "label": "??????",
  "value": "6601" },

{
  "label": "??????",
  "value": "6602" },

{
  "label": "??????",
  "value": "6603" },

{
  "label": "??????",
  "value": "6604" },

{
  "label": "??????",
  "value": "6605" },

{
  "label": "??????",
  "value": "6606" },

{
  "label": "??????",
  "value": "6607" },

{
  "label": "??????",
  "value": "6608" },

{
  "label": "??????",
  "value": "6609" },

{
  "label": "??????",
  "value": "6610" },

{
  "label": "??????",
  "value": "6611" },

{
  "label": "??????",
  "value": "6612" },

{
  "label": "??????",
  "value": "6613" },

{
  "label": "??????",
  "value": "6614" },

{
  "label": "??????",
  "value": "6615" },

{
  "label": "??????",
  "value": "6616" },

{
  "label": "??????",
  "value": "6617" }],


[{
  "label": "?????????",
  "value": "6701" },

{
  "label": "??????",
  "value": "6702" },

{
  "label": "??????",
  "value": "6703" }],


[{
  "label": "????????????",
  "value": "6801" },

{
  "label": "?????????",
  "value": "6802" },

{
  "label": "?????????",
  "value": "6803" },

{
  "label": "?????????",
  "value": "6804" }]];var _default =



cityData;exports.default = _default;

/***/ }),

/***/ 54:
/*!*******************************************!*\
  !*** F:/hear/hear/libs/function/route.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _queryParams = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/queryParams.js */ 53));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
/**
                                                                                                                                                                                                                                                                                            * ????????????
                                                                                                                                                                                                                                                                                            * ??????:???????????????????????????????????????????????????
                                                                                                                                                                                                                                                                                            */
function route() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var config = {
    type: 'navigateTo',
    url: '',
    delta: 1, // navigateBack???????????????,???????????????
    params: {}, // ???????????????
    animationType: 'pop-in', // ????????????,??????APP??????
    animationDuration: 300 // ????????????????????????,????????????,??????APP??????
  };
  config = Object.assign(config, options);
  // ??????url??????"/"???????????????????????????uni?????????????????????"/"??????
  if (config.url[0] != '/') config.url = '/' + config.url;
  // ????????????????????????????????????,Object.keys???????????????????????????,switchTab???????????????????????????
  if (Object.keys(config.params).length && config.type != 'switchTab') {
    // ?????????????????????url????????????????????????
    // ???????????????????????????????????????????????????"/","?","="????????????/page/index/index?name=mary"
    // ?????????url??????get??????????????????????????????"?"
    var query = '';
    if (/.*\/.*\?.*=.*/.test(config.url)) {
      // object????????????get???????????????
      query = (0, _queryParams.default)(config.params, false);
      // ????????????get??????,???????????????????????????????????????"&"??????
      config.url += "&" + query;
    } else {
      query = (0, _queryParams.default)(config.params);
      config.url += query;
    }
  }
  // ??????????????????url?????????????????????
  if (typeof options === 'string' && typeof params == 'object') {
    var _query = '';
    if (/.*\/.*\?.*=.*/.test(options)) {
      // object????????????get???????????????
      _query = (0, _queryParams.default)(params, false);
      // ????????????get??????,???????????????????????????????????????"&"??????
      options += "&" + _query;
    } else {
      _query = (0, _queryParams.default)(params);
      options += _query;
    }
  }
  // ??????????????????????????????????????????????????????(?????????)
  // ??????????????????????????????????????????????????????????????????
  if (typeof options === 'string') {
    if (options[0] != '/') options = '/' + options;
    return uni.navigateTo({
      url: options });

  }
  // navigateTo???????????????
  if (config.type == 'navigateTo' || config.type == 'to') {
    return uni.navigateTo({
      url: config.url,
      animationType: config.animationType,
      animationDuration: config.animationDuration });

  }
  if (config.type == 'redirectTo' || config.type == 'redirect') {
    return uni.redirectTo({
      url: config.url });

  }
  if (config.type == 'switchTab' || config.type == 'tab') {
    return uni.switchTab({
      url: config.url });

  }
  if (config.type == 'reLaunch') {
    return uni.reLaunch({
      url: config.url });

  }
  if (config.type == 'navigateBack' || config.type == 'back') {
    return uni.navigateBack({
      delta: parseInt(config.delta ? config.delta : this.delta) });

  }
}var _default =

route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 540:
/*!**************************************!*\
  !*** F:/hear/hear/libs/util/area.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var areaData = [
[
[{
  "label": "?????????",
  "value": "110101" },

{
  "label": "?????????",
  "value": "110102" },

{
  "label": "?????????",
  "value": "110105" },

{
  "label": "?????????",
  "value": "110106" },

{
  "label": "????????????",
  "value": "110107" },

{
  "label": "?????????",
  "value": "110108" },

{
  "label": "????????????",
  "value": "110109" },

{
  "label": "?????????",
  "value": "110111" },

{
  "label": "?????????",
  "value": "110112" },

{
  "label": "?????????",
  "value": "110113" },

{
  "label": "?????????",
  "value": "110114" },

{
  "label": "?????????",
  "value": "110115" },

{
  "label": "?????????",
  "value": "110116" },

{
  "label": "?????????",
  "value": "110117" },

{
  "label": "?????????",
  "value": "110118" },

{
  "label": "?????????",
  "value": "110119" }]],



[
[{
  "label": "?????????",
  "value": "120101" },

{
  "label": "?????????",
  "value": "120102" },

{
  "label": "?????????",
  "value": "120103" },

{
  "label": "?????????",
  "value": "120104" },

{
  "label": "?????????",
  "value": "120105" },

{
  "label": "?????????",
  "value": "120106" },

{
  "label": "?????????",
  "value": "120110" },

{
  "label": "?????????",
  "value": "120111" },

{
  "label": "?????????",
  "value": "120112" },

{
  "label": "?????????",
  "value": "120113" },

{
  "label": "?????????",
  "value": "120114" },

{
  "label": "?????????",
  "value": "120115" },

{
  "label": "????????????",
  "value": "120116" },

{
  "label": "?????????",
  "value": "120117" },

{
  "label": "?????????",
  "value": "120118" },

{
  "label": "?????????",
  "value": "120119" }]],



[
[{
  "label": "?????????",
  "value": "130102" },

{
  "label": "?????????",
  "value": "130104" },

{
  "label": "?????????",
  "value": "130105" },

{
  "label": "????????????",
  "value": "130107" },

{
  "label": "?????????",
  "value": "130108" },

{
  "label": "?????????",
  "value": "130109" },

{
  "label": "?????????",
  "value": "130110" },

{
  "label": "?????????",
  "value": "130111" },

{
  "label": "?????????",
  "value": "130121" },

{
  "label": "?????????",
  "value": "130123" },

{
  "label": "?????????",
  "value": "130125" },

{
  "label": "?????????",
  "value": "130126" },

{
  "label": "?????????",
  "value": "130127" },

{
  "label": "?????????",
  "value": "130128" },

{
  "label": "?????????",
  "value": "130129" },

{
  "label": "?????????",
  "value": "130130" },

{
  "label": "?????????",
  "value": "130131" },

{
  "label": "?????????",
  "value": "130132" },

{
  "label": "??????",
  "value": "130133" },

{
  "label": "????????????????????????????????????",
  "value": "130171" },

{
  "label": "???????????????????????????",
  "value": "130172" },

{
  "label": "?????????",
  "value": "130181" },

{
  "label": "?????????",
  "value": "130183" },

{
  "label": "?????????",
  "value": "130184" }],


[{
  "label": "?????????",
  "value": "130202" },

{
  "label": "?????????",
  "value": "130203" },

{
  "label": "?????????",
  "value": "130204" },

{
  "label": "?????????",
  "value": "130205" },

{
  "label": "?????????",
  "value": "130207" },

{
  "label": "?????????",
  "value": "130208" },

{
  "label": "????????????",
  "value": "130209" },

{
  "label": "??????",
  "value": "130223" },

{
  "label": "?????????",
  "value": "130224" },

{
  "label": "?????????",
  "value": "130225" },

{
  "label": "?????????",
  "value": "130227" },

{
  "label": "?????????",
  "value": "130229" },

{
  "label": "????????????????????????????????????",
  "value": "130271" },

{
  "label": "????????????????????????",
  "value": "130272" },

{
  "label": "?????????????????????????????????",
  "value": "130273" },

{
  "label": "?????????????????????????????????",
  "value": "130274" },

{
  "label": "?????????",
  "value": "130281" },

{
  "label": "?????????",
  "value": "130283" }],


[{
  "label": "?????????",
  "value": "130302" },

{
  "label": "????????????",
  "value": "130303" },

{
  "label": "????????????",
  "value": "130304" },

{
  "label": "?????????",
  "value": "130306" },

{
  "label": "?????????????????????",
  "value": "130321" },

{
  "label": "?????????",
  "value": "130322" },

{
  "label": "?????????",
  "value": "130324" },

{
  "label": "?????????????????????????????????",
  "value": "130371" },

{
  "label": "???????????????",
  "value": "130372" }],


[{
  "label": "?????????",
  "value": "130402" },

{
  "label": "?????????",
  "value": "130403" },

{
  "label": "?????????",
  "value": "130404" },

{
  "label": "????????????",
  "value": "130406" },

{
  "label": "?????????",
  "value": "130407" },

{
  "label": "?????????",
  "value": "130408" },

{
  "label": "?????????",
  "value": "130423" },

{
  "label": "?????????",
  "value": "130424" },

{
  "label": "?????????",
  "value": "130425" },

{
  "label": "??????",
  "value": "130426" },

{
  "label": "??????",
  "value": "130427" },

{
  "label": "??????",
  "value": "130430" },

{
  "label": "?????????",
  "value": "130431" },

{
  "label": "?????????",
  "value": "130432" },

{
  "label": "?????????",
  "value": "130433" },

{
  "label": "??????",
  "value": "130434" },

{
  "label": "?????????",
  "value": "130435" },

{
  "label": "???????????????????????????",
  "value": "130471" },

{
  "label": "??????????????????",
  "value": "130473" },

{
  "label": "?????????",
  "value": "130481" }],


[{
  "label": "?????????",
  "value": "130502" },

{
  "label": "?????????",
  "value": "130503" },

{
  "label": "?????????",
  "value": "130521" },

{
  "label": "?????????",
  "value": "130522" },

{
  "label": "?????????",
  "value": "130523" },

{
  "label": "?????????",
  "value": "130524" },

{
  "label": "?????????",
  "value": "130525" },

{
  "label": "??????",
  "value": "130526" },

{
  "label": "?????????",
  "value": "130527" },

{
  "label": "?????????",
  "value": "130528" },

{
  "label": "?????????",
  "value": "130529" },

{
  "label": "?????????",
  "value": "130530" },

{
  "label": "?????????",
  "value": "130531" },

{
  "label": "?????????",
  "value": "130532" },

{
  "label": "??????",
  "value": "130533" },

{
  "label": "?????????",
  "value": "130534" },

{
  "label": "?????????",
  "value": "130535" },

{
  "label": "???????????????????????????",
  "value": "130571" },

{
  "label": "?????????",
  "value": "130581" },

{
  "label": "?????????",
  "value": "130582" }],


[{
  "label": "?????????",
  "value": "130602" },

{
  "label": "?????????",
  "value": "130606" },

{
  "label": "?????????",
  "value": "130607" },

{
  "label": "?????????",
  "value": "130608" },

{
  "label": "?????????",
  "value": "130609" },

{
  "label": "?????????",
  "value": "130623" },

{
  "label": "?????????",
  "value": "130624" },

{
  "label": "?????????",
  "value": "130626" },

{
  "label": "??????",
  "value": "130627" },

{
  "label": "?????????",
  "value": "130628" },

{
  "label": "?????????",
  "value": "130629" },

{
  "label": "?????????",
  "value": "130630" },

{
  "label": "?????????",
  "value": "130631" },

{
  "label": "?????????",
  "value": "130632" },

{
  "label": "??????",
  "value": "130633" },

{
  "label": "?????????",
  "value": "130634" },

{
  "label": "??????",
  "value": "130635" },

{
  "label": "?????????",
  "value": "130636" },

{
  "label": "?????????",
  "value": "130637" },

{
  "label": "??????",
  "value": "130638" },

{
  "label": "?????????????????????????????????",
  "value": "130671" },

{
  "label": "??????????????????",
  "value": "130672" },

{
  "label": "?????????",
  "value": "130681" },

{
  "label": "?????????",
  "value": "130682" },

{
  "label": "?????????",
  "value": "130683" },

{
  "label": "????????????",
  "value": "130684" }],


[{
  "label": "?????????",
  "value": "130702" },

{
  "label": "?????????",
  "value": "130703" },

{
  "label": "?????????",
  "value": "130705" },

{
  "label": "????????????",
  "value": "130706" },

{
  "label": "?????????",
  "value": "130708" },

{
  "label": "?????????",
  "value": "130709" },

{
  "label": "?????????",
  "value": "130722" },

{
  "label": "?????????",
  "value": "130723" },

{
  "label": "?????????",
  "value": "130724" },

{
  "label": "?????????",
  "value": "130725" },

{
  "label": "??????",
  "value": "130726" },

{
  "label": "?????????",
  "value": "130727" },

{
  "label": "?????????",
  "value": "130728" },

{
  "label": "?????????",
  "value": "130730" },

{
  "label": "?????????",
  "value": "130731" },

{
  "label": "?????????",
  "value": "130732" },

{
  "label": "???????????????????????????????????????",
  "value": "130771" },

{
  "label": "???????????????????????????",
  "value": "130772" },

{
  "label": "???????????????????????????",
  "value": "130773" }],


[{
  "label": "?????????",
  "value": "130802" },

{
  "label": "?????????",
  "value": "130803" },

{
  "label": "??????????????????",
  "value": "130804" },

{
  "label": "?????????",
  "value": "130821" },

{
  "label": "?????????",
  "value": "130822" },

{
  "label": "?????????",
  "value": "130824" },

{
  "label": "?????????",
  "value": "130825" },

{
  "label": "?????????????????????",
  "value": "130826" },

{
  "label": "?????????????????????",
  "value": "130827" },

{
  "label": "??????????????????????????????",
  "value": "130828" },

{
  "label": "?????????????????????????????????",
  "value": "130871" },

{
  "label": "?????????",
  "value": "130881" }],


[{
  "label": "?????????",
  "value": "130902" },

{
  "label": "?????????",
  "value": "130903" },

{
  "label": "??????",
  "value": "130921" },

{
  "label": "??????",
  "value": "130922" },

{
  "label": "?????????",
  "value": "130923" },

{
  "label": "?????????",
  "value": "130924" },

{
  "label": "?????????",
  "value": "130925" },

{
  "label": "?????????",
  "value": "130926" },

{
  "label": "?????????",
  "value": "130927" },

{
  "label": "?????????",
  "value": "130928" },

{
  "label": "??????",
  "value": "130929" },

{
  "label": "?????????????????????",
  "value": "130930" },

{
  "label": "???????????????????????????",
  "value": "130971" },

{
  "label": "?????????????????????????????????",
  "value": "130972" },

{
  "label": "??????????????????",
  "value": "130973" },

{
  "label": "?????????",
  "value": "130981" },

{
  "label": "?????????",
  "value": "130982" },

{
  "label": "?????????",
  "value": "130983" },

{
  "label": "?????????",
  "value": "130984" }],


[{
  "label": "?????????",
  "value": "131002" },

{
  "label": "?????????",
  "value": "131003" },

{
  "label": "?????????",
  "value": "131022" },

{
  "label": "?????????",
  "value": "131023" },

{
  "label": "?????????",
  "value": "131024" },

{
  "label": "?????????",
  "value": "131025" },

{
  "label": "?????????",
  "value": "131026" },

{
  "label": "?????????????????????",
  "value": "131028" },

{
  "label": "???????????????????????????",
  "value": "131071" },

{
  "label": "?????????",
  "value": "131081" },

{
  "label": "?????????",
  "value": "131082" }],


[{
  "label": "?????????",
  "value": "131102" },

{
  "label": "?????????",
  "value": "131103" },

{
  "label": "?????????",
  "value": "131121" },

{
  "label": "?????????",
  "value": "131122" },

{
  "label": "?????????",
  "value": "131123" },

{
  "label": "?????????",
  "value": "131124" },

{
  "label": "?????????",
  "value": "131125" },

{
  "label": "?????????",
  "value": "131126" },

{
  "label": "??????",
  "value": "131127" },

{
  "label": "?????????",
  "value": "131128" },

{
  "label": "???????????????????????????",
  "value": "131171" },

{
  "label": "??????????????????",
  "value": "131172" },

{
  "label": "?????????",
  "value": "131182" }]],



[
[{
  "label": "?????????",
  "value": "140105" },

{
  "label": "?????????",
  "value": "140106" },

{
  "label": "????????????",
  "value": "140107" },

{
  "label": "????????????",
  "value": "140108" },

{
  "label": "????????????",
  "value": "140109" },

{
  "label": "?????????",
  "value": "140110" },

{
  "label": "?????????",
  "value": "140121" },

{
  "label": "?????????",
  "value": "140122" },

{
  "label": "?????????",
  "value": "140123" },

{
  "label": "?????????????????????????????????",
  "value": "140171" },

{
  "label": "?????????",
  "value": "140181" }],


[{
  "label": "??????",
  "value": "140202" },

{
  "label": "??????",
  "value": "140203" },

{
  "label": "?????????",
  "value": "140211" },

{
  "label": "?????????",
  "value": "140212" },

{
  "label": "?????????",
  "value": "140221" },

{
  "label": "?????????",
  "value": "140222" },

{
  "label": "?????????",
  "value": "140223" },

{
  "label": "?????????",
  "value": "140224" },

{
  "label": "?????????",
  "value": "140225" },

{
  "label": "?????????",
  "value": "140226" },

{
  "label": "?????????",
  "value": "140227" },

{
  "label": "???????????????????????????",
  "value": "140271" }],


[{
  "label": "??????",
  "value": "140302" },

{
  "label": "??????",
  "value": "140303" },

{
  "label": "??????",
  "value": "140311" },

{
  "label": "?????????",
  "value": "140321" },

{
  "label": "??????",
  "value": "140322" },

{
  "label": "???????????????????????????",
  "value": "140371" }],


[{
  "label": "??????",
  "value": "140402" },

{
  "label": "??????",
  "value": "140411" },

{
  "label": "?????????",
  "value": "140421" },

{
  "label": "?????????",
  "value": "140423" },

{
  "label": "?????????",
  "value": "140424" },

{
  "label": "?????????",
  "value": "140425" },

{
  "label": "?????????",
  "value": "140426" },

{
  "label": "?????????",
  "value": "140427" },

{
  "label": "?????????",
  "value": "140428" },

{
  "label": "?????????",
  "value": "140429" },

{
  "label": "??????",
  "value": "140430" },

{
  "label": "?????????",
  "value": "140431" },

{
  "label": "????????????????????????????????????",
  "value": "140471" },

{
  "label": "?????????",
  "value": "140481" }],


[{
  "label": "??????",
  "value": "140502" },

{
  "label": "?????????",
  "value": "140521" },

{
  "label": "?????????",
  "value": "140522" },

{
  "label": "?????????",
  "value": "140524" },

{
  "label": "?????????",
  "value": "140525" },

{
  "label": "?????????",
  "value": "140581" }],


[{
  "label": "?????????",
  "value": "140602" },

{
  "label": "?????????",
  "value": "140603" },

{
  "label": "?????????",
  "value": "140621" },

{
  "label": "??????",
  "value": "140622" },

{
  "label": "?????????",
  "value": "140623" },

{
  "label": "?????????",
  "value": "140624" },

{
  "label": "???????????????????????????",
  "value": "140671" }],


[{
  "label": "?????????",
  "value": "140702" },

{
  "label": "?????????",
  "value": "140721" },

{
  "label": "?????????",
  "value": "140722" },

{
  "label": "?????????",
  "value": "140723" },

{
  "label": "?????????",
  "value": "140724" },

{
  "label": "?????????",
  "value": "140725" },

{
  "label": "?????????",
  "value": "140726" },

{
  "label": "??????",
  "value": "140727" },

{
  "label": "?????????",
  "value": "140728" },

{
  "label": "?????????",
  "value": "140729" },

{
  "label": "?????????",
  "value": "140781" }],


[{
  "label": "?????????",
  "value": "140802" },

{
  "label": "?????????",
  "value": "140821" },

{
  "label": "?????????",
  "value": "140822" },

{
  "label": "?????????",
  "value": "140823" },

{
  "label": "?????????",
  "value": "140824" },

{
  "label": "?????????",
  "value": "140825" },

{
  "label": "??????",
  "value": "140826" },

{
  "label": "?????????",
  "value": "140827" },

{
  "label": "??????",
  "value": "140828" },

{
  "label": "?????????",
  "value": "140829" },

{
  "label": "?????????",
  "value": "140830" },

{
  "label": "?????????",
  "value": "140881" },

{
  "label": "?????????",
  "value": "140882" }],


[{
  "label": "?????????",
  "value": "140902" },

{
  "label": "?????????",
  "value": "140921" },

{
  "label": "?????????",
  "value": "140922" },

{
  "label": "??????",
  "value": "140923" },

{
  "label": "?????????",
  "value": "140924" },

{
  "label": "?????????",
  "value": "140925" },

{
  "label": "?????????",
  "value": "140926" },

{
  "label": "?????????",
  "value": "140927" },

{
  "label": "?????????",
  "value": "140928" },

{
  "label": "?????????",
  "value": "140929" },

{
  "label": "?????????",
  "value": "140930" },

{
  "label": "?????????",
  "value": "140931" },

{
  "label": "?????????",
  "value": "140932" },

{
  "label": "????????????????????????",
  "value": "140971" },

{
  "label": "?????????",
  "value": "140981" }],


[{
  "label": "?????????",
  "value": "141002" },

{
  "label": "?????????",
  "value": "141021" },

{
  "label": "?????????",
  "value": "141022" },

{
  "label": "?????????",
  "value": "141023" },

{
  "label": "?????????",
  "value": "141024" },

{
  "label": "??????",
  "value": "141025" },

{
  "label": "?????????",
  "value": "141026" },

{
  "label": "?????????",
  "value": "141027" },

{
  "label": "??????",
  "value": "141028" },

{
  "label": "?????????",
  "value": "141029" },

{
  "label": "?????????",
  "value": "141030" },

{
  "label": "??????",
  "value": "141031" },

{
  "label": "?????????",
  "value": "141032" },

{
  "label": "??????",
  "value": "141033" },

{
  "label": "?????????",
  "value": "141034" },

{
  "label": "?????????",
  "value": "141081" },

{
  "label": "?????????",
  "value": "141082" }],


[{
  "label": "?????????",
  "value": "141102" },

{
  "label": "?????????",
  "value": "141121" },

{
  "label": "?????????",
  "value": "141122" },

{
  "label": "??????",
  "value": "141123" },

{
  "label": "??????",
  "value": "141124" },

{
  "label": "?????????",
  "value": "141125" },

{
  "label": "?????????",
  "value": "141126" },

{
  "label": "??????",
  "value": "141127" },

{
  "label": "?????????",
  "value": "141128" },

{
  "label": "?????????",
  "value": "141129" },

{
  "label": "?????????",
  "value": "141130" },

{
  "label": "?????????",
  "value": "141181" },

{
  "label": "?????????",
  "value": "141182" }]],



[
[{
  "label": "?????????",
  "value": "150102" },

{
  "label": "?????????",
  "value": "150103" },

{
  "label": "?????????",
  "value": "150104" },

{
  "label": "?????????",
  "value": "150105" },

{
  "label": "???????????????",
  "value": "150121" },

{
  "label": "????????????",
  "value": "150122" },

{
  "label": "???????????????",
  "value": "150123" },

{
  "label": "????????????",
  "value": "150124" },

{
  "label": "?????????",
  "value": "150125" },

{
  "label": "??????????????????????????????",
  "value": "150171" },

{
  "label": "?????????????????????????????????",
  "value": "150172" }],


[{
  "label": "?????????",
  "value": "150202" },

{
  "label": "????????????",
  "value": "150203" },

{
  "label": "?????????",
  "value": "150204" },

{
  "label": "?????????",
  "value": "150205" },

{
  "label": "??????????????????",
  "value": "150206" },

{
  "label": "?????????",
  "value": "150207" },

{
  "label": "???????????????",
  "value": "150221" },

{
  "label": "?????????",
  "value": "150222" },

{
  "label": "???????????????????????????",
  "value": "150223" },

{
  "label": "???????????????????????????????????????",
  "value": "150271" }],


[{
  "label": "????????????",
  "value": "150302" },

{
  "label": "?????????",
  "value": "150303" },

{
  "label": "?????????",
  "value": "150304" }],


[{
  "label": "?????????",
  "value": "150402" },

{
  "label": "????????????",
  "value": "150403" },

{
  "label": "?????????",
  "value": "150404" },

{
  "label": "??????????????????",
  "value": "150421" },

{
  "label": "????????????",
  "value": "150422" },

{
  "label": "????????????",
  "value": "150423" },

{
  "label": "?????????",
  "value": "150424" },

{
  "label": "???????????????",
  "value": "150425" },

{
  "label": "????????????",
  "value": "150426" },

{
  "label": "????????????",
  "value": "150428" },

{
  "label": "?????????",
  "value": "150429" },

{
  "label": "?????????",
  "value": "150430" }],


[{
  "label": "????????????",
  "value": "150502" },

{
  "label": "?????????????????????",
  "value": "150521" },

{
  "label": "?????????????????????",
  "value": "150522" },

{
  "label": "?????????",
  "value": "150523" },

{
  "label": "?????????",
  "value": "150524" },

{
  "label": "?????????",
  "value": "150525" },

{
  "label": "????????????",
  "value": "150526" },

{
  "label": "???????????????????????????",
  "value": "150571" },

{
  "label": "???????????????",
  "value": "150581" }],


[{
  "label": "?????????",
  "value": "150602" },

{
  "label": "????????????",
  "value": "150603" },

{
  "label": "????????????",
  "value": "150621" },

{
  "label": "????????????",
  "value": "150622" },

{
  "label": "???????????????",
  "value": "150623" },

{
  "label": "????????????",
  "value": "150624" },

{
  "label": "?????????",
  "value": "150625" },

{
  "label": "?????????",
  "value": "150626" },

{
  "label": "???????????????",
  "value": "150627" }],


[{
  "label": "????????????",
  "value": "150702" },

{
  "label": "???????????????",
  "value": "150703" },

{
  "label": "?????????",
  "value": "150721" },

{
  "label": "?????????????????????????????????",
  "value": "150722" },

{
  "label": "??????????????????",
  "value": "150723" },

{
  "label": "?????????????????????",
  "value": "150724" },

{
  "label": "???????????????",
  "value": "150725" },

{
  "label": "??????????????????",
  "value": "150726" },

{
  "label": "??????????????????",
  "value": "150727" },

{
  "label": "????????????",
  "value": "150781" },

{
  "label": "????????????",
  "value": "150782" },

{
  "label": "????????????",
  "value": "150783" },

{
  "label": "???????????????",
  "value": "150784" },

{
  "label": "?????????",
  "value": "150785" }],


[{
  "label": "?????????",
  "value": "150802" },

{
  "label": "?????????",
  "value": "150821" },

{
  "label": "?????????",
  "value": "150822" },

{
  "label": "???????????????",
  "value": "150823" },

{
  "label": "???????????????",
  "value": "150824" },

{
  "label": "???????????????",
  "value": "150825" },

{
  "label": "????????????",
  "value": "150826" }],


[{
  "label": "?????????",
  "value": "150902" },

{
  "label": "?????????",
  "value": "150921" },

{
  "label": "?????????",
  "value": "150922" },

{
  "label": "?????????",
  "value": "150923" },

{
  "label": "?????????",
  "value": "150924" },

{
  "label": "?????????",
  "value": "150925" },

{
  "label": "?????????????????????",
  "value": "150926" },

{
  "label": "?????????????????????",
  "value": "150927" },

{
  "label": "?????????????????????",
  "value": "150928" },

{
  "label": "????????????",
  "value": "150929" },

{
  "label": "?????????",
  "value": "150981" }],


[{
  "label": "???????????????",
  "value": "152201" },

{
  "label": "????????????",
  "value": "152202" },

{
  "label": "?????????????????????",
  "value": "152221" },

{
  "label": "?????????????????????",
  "value": "152222" },

{
  "label": "????????????",
  "value": "152223" },

{
  "label": "?????????",
  "value": "152224" }],


[{
  "label": "???????????????",
  "value": "152501" },

{
  "label": "???????????????",
  "value": "152502" },

{
  "label": "????????????",
  "value": "152522" },

{
  "label": "???????????????",
  "value": "152523" },

{
  "label": "???????????????",
  "value": "152524" },

{
  "label": "??????????????????",
  "value": "152525" },

{
  "label": "??????????????????",
  "value": "152526" },

{
  "label": "????????????",
  "value": "152527" },

{
  "label": "?????????",
  "value": "152528" },

{
  "label": "????????????",
  "value": "152529" },

{
  "label": "?????????",
  "value": "152530" },

{
  "label": "?????????",
  "value": "152531" },

{
  "label": "??????????????????",
  "value": "152571" }],


[{
  "label": "???????????????",
  "value": "152921" },

{
  "label": "???????????????",
  "value": "152922" },

{
  "label": "????????????",
  "value": "152923" },

{
  "label": "?????????????????????????????????",
  "value": "152971" }]],



[
[{
  "label": "?????????",
  "value": "210102" },

{
  "label": "?????????",
  "value": "210103" },

{
  "label": "?????????",
  "value": "210104" },

{
  "label": "?????????",
  "value": "210105" },

{
  "label": "?????????",
  "value": "210106" },

{
  "label": "????????????",
  "value": "210111" },

{
  "label": "?????????",
  "value": "210112" },

{
  "label": "????????????",
  "value": "210113" },

{
  "label": "?????????",
  "value": "210114" },

{
  "label": "?????????",
  "value": "210115" },

{
  "label": "?????????",
  "value": "210123" },

{
  "label": "?????????",
  "value": "210124" },

{
  "label": "?????????",
  "value": "210181" }],


[{
  "label": "?????????",
  "value": "210202" },

{
  "label": "?????????",
  "value": "210203" },

{
  "label": "????????????",
  "value": "210204" },

{
  "label": "????????????",
  "value": "210211" },

{
  "label": "????????????",
  "value": "210212" },

{
  "label": "?????????",
  "value": "210213" },

{
  "label": "????????????",
  "value": "210214" },

{
  "label": "?????????",
  "value": "210224" },

{
  "label": "????????????",
  "value": "210281" },

{
  "label": "?????????",
  "value": "210283" }],


[{
  "label": "?????????",
  "value": "210302" },

{
  "label": "?????????",
  "value": "210303" },

{
  "label": "?????????",
  "value": "210304" },

{
  "label": "?????????",
  "value": "210311" },

{
  "label": "?????????",
  "value": "210321" },

{
  "label": "?????????????????????",
  "value": "210323" },

{
  "label": "?????????",
  "value": "210381" }],


[{
  "label": "?????????",
  "value": "210402" },

{
  "label": "?????????",
  "value": "210403" },

{
  "label": "?????????",
  "value": "210404" },

{
  "label": "?????????",
  "value": "210411" },

{
  "label": "?????????",
  "value": "210421" },

{
  "label": "?????????????????????",
  "value": "210422" },

{
  "label": "?????????????????????",
  "value": "210423" }],


[{
  "label": "?????????",
  "value": "210502" },

{
  "label": "?????????",
  "value": "210503" },

{
  "label": "?????????",
  "value": "210504" },

{
  "label": "?????????",
  "value": "210505" },

{
  "label": "?????????????????????",
  "value": "210521" },

{
  "label": "?????????????????????",
  "value": "210522" }],


[{
  "label": "?????????",
  "value": "210602" },

{
  "label": "?????????",
  "value": "210603" },

{
  "label": "?????????",
  "value": "210604" },

{
  "label": "?????????????????????",
  "value": "210624" },

{
  "label": "?????????",
  "value": "210681" },

{
  "label": "?????????",
  "value": "210682" }],


[{
  "label": "?????????",
  "value": "210702" },

{
  "label": "?????????",
  "value": "210703" },

{
  "label": "?????????",
  "value": "210711" },

{
  "label": "?????????",
  "value": "210726" },

{
  "label": "??????",
  "value": "210727" },

{
  "label": "?????????",
  "value": "210781" },

{
  "label": "?????????",
  "value": "210782" }],


[{
  "label": "?????????",
  "value": "210802" },

{
  "label": "?????????",
  "value": "210803" },

{
  "label": "????????????",
  "value": "210804" },

{
  "label": "?????????",
  "value": "210811" },

{
  "label": "?????????",
  "value": "210881" },

{
  "label": "????????????",
  "value": "210882" }],


[{
  "label": "?????????",
  "value": "210902" },

{
  "label": "?????????",
  "value": "210903" },

{
  "label": "?????????",
  "value": "210904" },

{
  "label": "????????????",
  "value": "210905" },

{
  "label": "?????????",
  "value": "210911" },

{
  "label": "????????????????????????",
  "value": "210921" },

{
  "label": "?????????",
  "value": "210922" }],


[{
  "label": "?????????",
  "value": "211002" },

{
  "label": "?????????",
  "value": "211003" },

{
  "label": "?????????",
  "value": "211004" },

{
  "label": "????????????",
  "value": "211005" },

{
  "label": "????????????",
  "value": "211011" },

{
  "label": "?????????",
  "value": "211021" },

{
  "label": "?????????",
  "value": "211081" }],


[{
  "label": "????????????",
  "value": "211102" },

{
  "label": "????????????",
  "value": "211103" },

{
  "label": "?????????",
  "value": "211104" },

{
  "label": "?????????",
  "value": "211122" }],


[{
  "label": "?????????",
  "value": "211202" },

{
  "label": "?????????",
  "value": "211204" },

{
  "label": "?????????",
  "value": "211221" },

{
  "label": "?????????",
  "value": "211223" },

{
  "label": "?????????",
  "value": "211224" },

{
  "label": "????????????",
  "value": "211281" },

{
  "label": "?????????",
  "value": "211282" }],


[{
  "label": "?????????",
  "value": "211302" },

{
  "label": "?????????",
  "value": "211303" },

{
  "label": "?????????",
  "value": "211321" },

{
  "label": "?????????",
  "value": "211322" },

{
  "label": "?????????????????????????????????",
  "value": "211324" },

{
  "label": "?????????",
  "value": "211381" },

{
  "label": "?????????",
  "value": "211382" }],


[{
  "label": "?????????",
  "value": "211402" },

{
  "label": "?????????",
  "value": "211403" },

{
  "label": "?????????",
  "value": "211404" },

{
  "label": "?????????",
  "value": "211421" },

{
  "label": "?????????",
  "value": "211422" },

{
  "label": "?????????",
  "value": "211481" }]],



[
[{
  "label": "?????????",
  "value": "220102" },

{
  "label": "?????????",
  "value": "220103" },

{
  "label": "?????????",
  "value": "220104" },

{
  "label": "?????????",
  "value": "220105" },

{
  "label": "?????????",
  "value": "220106" },

{
  "label": "?????????",
  "value": "220112" },

{
  "label": "?????????",
  "value": "220113" },

{
  "label": "?????????",
  "value": "220122" },

{
  "label": "???????????????????????????",
  "value": "220171" },

{
  "label": "???????????????????????????????????????",
  "value": "220172" },

{
  "label": "?????????????????????????????????",
  "value": "220173" },

{
  "label": "?????????????????????????????????",
  "value": "220174" },

{
  "label": "?????????",
  "value": "220182" },

{
  "label": "?????????",
  "value": "220183" }],


[{
  "label": "?????????",
  "value": "220202" },

{
  "label": "?????????",
  "value": "220203" },

{
  "label": "?????????",
  "value": "220204" },

{
  "label": "?????????",
  "value": "220211" },

{
  "label": "?????????",
  "value": "220221" },

{
  "label": "?????????????????????",
  "value": "220271" },

{
  "label": "?????????????????????????????????",
  "value": "220272" },

{
  "label": "??????????????????????????????",
  "value": "220273" },

{
  "label": "?????????",
  "value": "220281" },

{
  "label": "?????????",
  "value": "220282" },

{
  "label": "?????????",
  "value": "220283" },

{
  "label": "?????????",
  "value": "220284" }],


[{
  "label": "?????????",
  "value": "220302" },

{
  "label": "?????????",
  "value": "220303" },

{
  "label": "?????????",
  "value": "220322" },

{
  "label": "?????????????????????",
  "value": "220323" },

{
  "label": "????????????",
  "value": "220381" },

{
  "label": "?????????",
  "value": "220382" }],


[{
  "label": "?????????",
  "value": "220402" },

{
  "label": "?????????",
  "value": "220403" },

{
  "label": "?????????",
  "value": "220421" },

{
  "label": "?????????",
  "value": "220422" }],


[{
  "label": "?????????",
  "value": "220502" },

{
  "label": "????????????",
  "value": "220503" },

{
  "label": "?????????",
  "value": "220521" },

{
  "label": "?????????",
  "value": "220523" },

{
  "label": "?????????",
  "value": "220524" },

{
  "label": "????????????",
  "value": "220581" },

{
  "label": "?????????",
  "value": "220582" }],


[{
  "label": "?????????",
  "value": "220602" },

{
  "label": "?????????",
  "value": "220605" },

{
  "label": "?????????",
  "value": "220621" },

{
  "label": "?????????",
  "value": "220622" },

{
  "label": "????????????????????????",
  "value": "220623" },

{
  "label": "?????????",
  "value": "220681" }],


[{
  "label": "?????????",
  "value": "220702" },

{
  "label": "?????????????????????????????????",
  "value": "220721" },

{
  "label": "?????????",
  "value": "220722" },

{
  "label": "?????????",
  "value": "220723" },

{
  "label": "???????????????????????????",
  "value": "220771" },

{
  "label": "?????????",
  "value": "220781" }],


[{
  "label": "?????????",
  "value": "220802" },

{
  "label": "?????????",
  "value": "220821" },

{
  "label": "?????????",
  "value": "220822" },

{
  "label": "???????????????????????????",
  "value": "220871" },

{
  "label": "?????????",
  "value": "220881" },

{
  "label": "?????????",
  "value": "220882" }],


[{
  "label": "?????????",
  "value": "222401" },

{
  "label": "?????????",
  "value": "222402" },

{
  "label": "?????????",
  "value": "222403" },

{
  "label": "?????????",
  "value": "222404" },

{
  "label": "?????????",
  "value": "222405" },

{
  "label": "?????????",
  "value": "222406" },

{
  "label": "?????????",
  "value": "222424" },

{
  "label": "?????????",
  "value": "222426" }]],



[
[{
  "label": "?????????",
  "value": "230102" },

{
  "label": "?????????",
  "value": "230103" },

{
  "label": "?????????",
  "value": "230104" },

{
  "label": "?????????",
  "value": "230108" },

{
  "label": "?????????",
  "value": "230109" },

{
  "label": "?????????",
  "value": "230110" },

{
  "label": "?????????",
  "value": "230111" },

{
  "label": "?????????",
  "value": "230112" },

{
  "label": "?????????",
  "value": "230113" },

{
  "label": "?????????",
  "value": "230123" },

{
  "label": "?????????",
  "value": "230124" },

{
  "label": "??????",
  "value": "230125" },

{
  "label": "?????????",
  "value": "230126" },

{
  "label": "?????????",
  "value": "230127" },

{
  "label": "?????????",
  "value": "230128" },

{
  "label": "?????????",
  "value": "230129" },

{
  "label": "?????????",
  "value": "230183" },

{
  "label": "?????????",
  "value": "230184" }],


[{
  "label": "?????????",
  "value": "230202" },

{
  "label": "?????????",
  "value": "230203" },

{
  "label": "?????????",
  "value": "230204" },

{
  "label": "????????????",
  "value": "230205" },

{
  "label": "???????????????",
  "value": "230206" },

{
  "label": "????????????",
  "value": "230207" },

{
  "label": "????????????????????????",
  "value": "230208" },

{
  "label": "?????????",
  "value": "230221" },

{
  "label": "?????????",
  "value": "230223" },

{
  "label": "?????????",
  "value": "230224" },

{
  "label": "?????????",
  "value": "230225" },

{
  "label": "?????????",
  "value": "230227" },

{
  "label": "?????????",
  "value": "230229" },

{
  "label": "?????????",
  "value": "230230" },

{
  "label": "?????????",
  "value": "230231" },

{
  "label": "?????????",
  "value": "230281" }],


[{
  "label": "?????????",
  "value": "230302" },

{
  "label": "?????????",
  "value": "230303" },

{
  "label": "?????????",
  "value": "230304" },

{
  "label": "?????????",
  "value": "230305" },

{
  "label": "????????????",
  "value": "230306" },

{
  "label": "?????????",
  "value": "230307" },

{
  "label": "?????????",
  "value": "230321" },

{
  "label": "?????????",
  "value": "230381" },

{
  "label": "?????????",
  "value": "230382" }],


[{
  "label": "?????????",
  "value": "230402" },

{
  "label": "?????????",
  "value": "230403" },

{
  "label": "?????????",
  "value": "230404" },

{
  "label": "?????????",
  "value": "230405" },

{
  "label": "?????????",
  "value": "230406" },

{
  "label": "?????????",
  "value": "230407" },

{
  "label": "?????????",
  "value": "230421" },

{
  "label": "?????????",
  "value": "230422" }],


[{
  "label": "?????????",
  "value": "230502" },

{
  "label": "?????????",
  "value": "230503" },

{
  "label": "????????????",
  "value": "230505" },

{
  "label": "?????????",
  "value": "230506" },

{
  "label": "?????????",
  "value": "230521" },

{
  "label": "?????????",
  "value": "230522" },

{
  "label": "?????????",
  "value": "230523" },

{
  "label": "?????????",
  "value": "230524" }],


[{
  "label": "????????????",
  "value": "230602" },

{
  "label": "?????????",
  "value": "230603" },

{
  "label": "????????????",
  "value": "230604" },

{
  "label": "?????????",
  "value": "230605" },

{
  "label": "?????????",
  "value": "230606" },

{
  "label": "?????????",
  "value": "230621" },

{
  "label": "?????????",
  "value": "230622" },

{
  "label": "?????????",
  "value": "230623" },

{
  "label": "??????????????????????????????",
  "value": "230624" },

{
  "label": "?????????????????????????????????",
  "value": "230671" }],


[{
  "label": "?????????",
  "value": "230702" },

{
  "label": "?????????",
  "value": "230703" },

{
  "label": "?????????",
  "value": "230704" },

{
  "label": "?????????",
  "value": "230705" },

{
  "label": "?????????",
  "value": "230706" },

{
  "label": "?????????",
  "value": "230707" },

{
  "label": "?????????",
  "value": "230708" },

{
  "label": "????????????",
  "value": "230709" },

{
  "label": "?????????",
  "value": "230710" },

{
  "label": "????????????",
  "value": "230711" },

{
  "label": "????????????",
  "value": "230712" },

{
  "label": "?????????",
  "value": "230713" },

{
  "label": "????????????",
  "value": "230714" },

{
  "label": "?????????",
  "value": "230715" },

{
  "label": "????????????",
  "value": "230716" },

{
  "label": "?????????",
  "value": "230722" },

{
  "label": "?????????",
  "value": "230781" }],


[{
  "label": "?????????",
  "value": "230803" },

{
  "label": "?????????",
  "value": "230804" },

{
  "label": "?????????",
  "value": "230805" },

{
  "label": "??????",
  "value": "230811" },

{
  "label": "?????????",
  "value": "230822" },

{
  "label": "?????????",
  "value": "230826" },

{
  "label": "?????????",
  "value": "230828" },

{
  "label": "?????????",
  "value": "230881" },

{
  "label": "?????????",
  "value": "230882" },

{
  "label": "?????????",
  "value": "230883" }],


[{
  "label": "?????????",
  "value": "230902" },

{
  "label": "?????????",
  "value": "230903" },

{
  "label": "????????????",
  "value": "230904" },

{
  "label": "?????????",
  "value": "230921" }],


[{
  "label": "?????????",
  "value": "231002" },

{
  "label": "?????????",
  "value": "231003" },

{
  "label": "?????????",
  "value": "231004" },

{
  "label": "?????????",
  "value": "231005" },

{
  "label": "?????????",
  "value": "231025" },

{
  "label": "??????????????????????????????",
  "value": "231071" },

{
  "label": "????????????",
  "value": "231081" },

{
  "label": "?????????",
  "value": "231083" },

{
  "label": "?????????",
  "value": "231084" },

{
  "label": "?????????",
  "value": "231085" },

{
  "label": "?????????",
  "value": "231086" }],


[{
  "label": "?????????",
  "value": "231102" },

{
  "label": "?????????",
  "value": "231121" },

{
  "label": "?????????",
  "value": "231123" },

{
  "label": "?????????",
  "value": "231124" },

{
  "label": "?????????",
  "value": "231181" },

{
  "label": "???????????????",
  "value": "231182" }],


[{
  "label": "?????????",
  "value": "231202" },

{
  "label": "?????????",
  "value": "231221" },

{
  "label": "?????????",
  "value": "231222" },

{
  "label": "?????????",
  "value": "231223" },

{
  "label": "?????????",
  "value": "231224" },

{
  "label": "?????????",
  "value": "231225" },

{
  "label": "?????????",
  "value": "231226" },

{
  "label": "?????????",
  "value": "231281" },

{
  "label": "?????????",
  "value": "231282" },

{
  "label": "?????????",
  "value": "231283" }],


[{
  "label": "???????????????",
  "value": "232701" },

{
  "label": "?????????",
  "value": "232702" },

{
  "label": "?????????",
  "value": "232703" },

{
  "label": "?????????",
  "value": "232704" },

{
  "label": "?????????",
  "value": "232721" },

{
  "label": "?????????",
  "value": "232722" },

{
  "label": "?????????",
  "value": "232723" }]],



[
[{
  "label": "?????????",
  "value": "310101" },

{
  "label": "?????????",
  "value": "310104" },

{
  "label": "?????????",
  "value": "310105" },

{
  "label": "?????????",
  "value": "310106" },

{
  "label": "?????????",
  "value": "310107" },

{
  "label": "?????????",
  "value": "310109" },

{
  "label": "?????????",
  "value": "310110" },

{
  "label": "?????????",
  "value": "310112" },

{
  "label": "?????????",
  "value": "310113" },

{
  "label": "?????????",
  "value": "310114" },

{
  "label": "????????????",
  "value": "310115" },

{
  "label": "?????????",
  "value": "310116" },

{
  "label": "?????????",
  "value": "310117" },

{
  "label": "?????????",
  "value": "310118" },

{
  "label": "?????????",
  "value": "310120" },

{
  "label": "?????????",
  "value": "310151" }]],



[
[{
  "label": "?????????",
  "value": "320102" },

{
  "label": "?????????",
  "value": "320104" },

{
  "label": "?????????",
  "value": "320105" },

{
  "label": "?????????",
  "value": "320106" },

{
  "label": "?????????",
  "value": "320111" },

{
  "label": "?????????",
  "value": "320113" },

{
  "label": "????????????",
  "value": "320114" },

{
  "label": "?????????",
  "value": "320115" },

{
  "label": "?????????",
  "value": "320116" },

{
  "label": "?????????",
  "value": "320117" },

{
  "label": "?????????",
  "value": "320118" }],


[{
  "label": "?????????",
  "value": "320205" },

{
  "label": "?????????",
  "value": "320206" },

{
  "label": "?????????",
  "value": "320211" },

{
  "label": "?????????",
  "value": "320213" },

{
  "label": "?????????",
  "value": "320214" },

{
  "label": "?????????",
  "value": "320281" },

{
  "label": "?????????",
  "value": "320282" }],


[{
  "label": "?????????",
  "value": "320302" },

{
  "label": "?????????",
  "value": "320303" },

{
  "label": "?????????",
  "value": "320305" },

{
  "label": "?????????",
  "value": "320311" },

{
  "label": "?????????",
  "value": "320312" },

{
  "label": "??????",
  "value": "320321" },

{
  "label": "??????",
  "value": "320322" },

{
  "label": "?????????",
  "value": "320324" },

{
  "label": "???????????????????????????",
  "value": "320371" },

{
  "label": "?????????",
  "value": "320381" },

{
  "label": "?????????",
  "value": "320382" }],


[{
  "label": "?????????",
  "value": "320402" },

{
  "label": "?????????",
  "value": "320404" },

{
  "label": "?????????",
  "value": "320411" },

{
  "label": "?????????",
  "value": "320412" },

{
  "label": "?????????",
  "value": "320413" },

{
  "label": "?????????",
  "value": "320481" }],


[{
  "label": "?????????",
  "value": "320505" },

{
  "label": "?????????",
  "value": "320506" },

{
  "label": "?????????",
  "value": "320507" },

{
  "label": "?????????",
  "value": "320508" },

{
  "label": "?????????",
  "value": "320509" },

{
  "label": "??????????????????",
  "value": "320571" },

{
  "label": "?????????",
  "value": "320581" },

{
  "label": "????????????",
  "value": "320582" },

{
  "label": "?????????",
  "value": "320583" },

{
  "label": "?????????",
  "value": "320585" }],


[{
  "label": "?????????",
  "value": "320602" },

{
  "label": "?????????",
  "value": "320611" },

{
  "label": "?????????",
  "value": "320612" },

{
  "label": "?????????",
  "value": "320621" },

{
  "label": "?????????",
  "value": "320623" },

{
  "label": "???????????????????????????",
  "value": "320671" },

{
  "label": "?????????",
  "value": "320681" },

{
  "label": "?????????",
  "value": "320682" },

{
  "label": "?????????",
  "value": "320684" }],


[{
  "label": "?????????",
  "value": "320703" },

{
  "label": "?????????",
  "value": "320706" },

{
  "label": "?????????",
  "value": "320707" },

{
  "label": "?????????",
  "value": "320722" },

{
  "label": "?????????",
  "value": "320723" },

{
  "label": "?????????",
  "value": "320724" },

{
  "label": "??????????????????????????????",
  "value": "320771" },

{
  "label": "????????????????????????????????????",
  "value": "320772" }],


[{
  "label": "?????????",
  "value": "320803" },

{
  "label": "?????????",
  "value": "320804" },

{
  "label": "????????????",
  "value": "320812" },

{
  "label": "?????????",
  "value": "320813" },

{
  "label": "?????????",
  "value": "320826" },

{
  "label": "?????????",
  "value": "320830" },

{
  "label": "?????????",
  "value": "320831" },

{
  "label": "???????????????????????????",
  "value": "320871" }],


[{
  "label": "?????????",
  "value": "320902" },

{
  "label": "?????????",
  "value": "320903" },

{
  "label": "?????????",
  "value": "320904" },

{
  "label": "?????????",
  "value": "320921" },

{
  "label": "?????????",
  "value": "320922" },

{
  "label": "?????????",
  "value": "320923" },

{
  "label": "?????????",
  "value": "320924" },

{
  "label": "?????????",
  "value": "320925" },

{
  "label": "???????????????????????????",
  "value": "320971" },

{
  "label": "?????????",
  "value": "320981" }],


[{
  "label": "?????????",
  "value": "321002" },

{
  "label": "?????????",
  "value": "321003" },

{
  "label": "?????????",
  "value": "321012" },

{
  "label": "?????????",
  "value": "321023" },

{
  "label": "???????????????????????????",
  "value": "321071" },

{
  "label": "?????????",
  "value": "321081" },

{
  "label": "?????????",
  "value": "321084" }],


[{
  "label": "?????????",
  "value": "321102" },

{
  "label": "?????????",
  "value": "321111" },

{
  "label": "?????????",
  "value": "321112" },

{
  "label": "????????????",
  "value": "321171" },

{
  "label": "?????????",
  "value": "321181" },

{
  "label": "?????????",
  "value": "321182" },

{
  "label": "?????????",
  "value": "321183" }],


[{
  "label": "?????????",
  "value": "321202" },

{
  "label": "?????????",
  "value": "321203" },

{
  "label": "?????????",
  "value": "321204" },

{
  "label": "???????????????????????????????????????",
  "value": "321271" },

{
  "label": "?????????",
  "value": "321281" },

{
  "label": "?????????",
  "value": "321282" },

{
  "label": "?????????",
  "value": "321283" }],


[{
  "label": "?????????",
  "value": "321302" },

{
  "label": "?????????",
  "value": "321311" },

{
  "label": "?????????",
  "value": "321322" },

{
  "label": "?????????",
  "value": "321323" },

{
  "label": "?????????",
  "value": "321324" },

{
  "label": "???????????????????????????",
  "value": "321371" }]],



[
[{
  "label": "?????????",
  "value": "330102" },

{
  "label": "?????????",
  "value": "330103" },

{
  "label": "?????????",
  "value": "330104" },

{
  "label": "?????????",
  "value": "330105" },

{
  "label": "?????????",
  "value": "330106" },

{
  "label": "?????????",
  "value": "330108" },

{
  "label": "?????????",
  "value": "330109" },

{
  "label": "?????????",
  "value": "330110" },

{
  "label": "?????????",
  "value": "330111" },

{
  "label": "?????????",
  "value": "330112" },

{
  "label": "?????????",
  "value": "330122" },

{
  "label": "?????????",
  "value": "330127" },

{
  "label": "?????????",
  "value": "330182" }],


[{
  "label": "?????????",
  "value": "330203" },

{
  "label": "?????????",
  "value": "330205" },

{
  "label": "?????????",
  "value": "330206" },

{
  "label": "?????????",
  "value": "330211" },

{
  "label": "?????????",
  "value": "330212" },

{
  "label": "?????????",
  "value": "330213" },

{
  "label": "?????????",
  "value": "330225" },

{
  "label": "?????????",
  "value": "330226" },

{
  "label": "?????????",
  "value": "330281" },

{
  "label": "?????????",
  "value": "330282" }],


[{
  "label": "?????????",
  "value": "330302" },

{
  "label": "?????????",
  "value": "330303" },

{
  "label": "?????????",
  "value": "330304" },

{
  "label": "?????????",
  "value": "330305" },

{
  "label": "?????????",
  "value": "330324" },

{
  "label": "?????????",
  "value": "330326" },

{
  "label": "?????????",
  "value": "330327" },

{
  "label": "?????????",
  "value": "330328" },

{
  "label": "?????????",
  "value": "330329" },

{
  "label": "???????????????????????????",
  "value": "330371" },

{
  "label": "?????????",
  "value": "330381" },

{
  "label": "?????????",
  "value": "330382" }],


[{
  "label": "?????????",
  "value": "330402" },

{
  "label": "?????????",
  "value": "330411" },

{
  "label": "?????????",
  "value": "330421" },

{
  "label": "?????????",
  "value": "330424" },

{
  "label": "?????????",
  "value": "330481" },

{
  "label": "?????????",
  "value": "330482" },

{
  "label": "?????????",
  "value": "330483" }],


[{
  "label": "?????????",
  "value": "330502" },

{
  "label": "?????????",
  "value": "330503" },

{
  "label": "?????????",
  "value": "330521" },

{
  "label": "?????????",
  "value": "330522" },

{
  "label": "?????????",
  "value": "330523" }],


[{
  "label": "?????????",
  "value": "330602" },

{
  "label": "?????????",
  "value": "330603" },

{
  "label": "?????????",
  "value": "330604" },

{
  "label": "?????????",
  "value": "330624" },

{
  "label": "?????????",
  "value": "330681" },

{
  "label": "?????????",
  "value": "330683" }],


[{
  "label": "?????????",
  "value": "330702" },

{
  "label": "?????????",
  "value": "330703" },

{
  "label": "?????????",
  "value": "330723" },

{
  "label": "?????????",
  "value": "330726" },

{
  "label": "?????????",
  "value": "330727" },

{
  "label": "?????????",
  "value": "330781" },

{
  "label": "?????????",
  "value": "330782" },

{
  "label": "?????????",
  "value": "330783" },

{
  "label": "?????????",
  "value": "330784" }],


[{
  "label": "?????????",
  "value": "330802" },

{
  "label": "?????????",
  "value": "330803" },

{
  "label": "?????????",
  "value": "330822" },

{
  "label": "?????????",
  "value": "330824" },

{
  "label": "?????????",
  "value": "330825" },

{
  "label": "?????????",
  "value": "330881" }],


[{
  "label": "?????????",
  "value": "330902" },

{
  "label": "?????????",
  "value": "330903" },

{
  "label": "?????????",
  "value": "330921" },

{
  "label": "?????????",
  "value": "330922" }],


[{
  "label": "?????????",
  "value": "331002" },

{
  "label": "?????????",
  "value": "331003" },

{
  "label": "?????????",
  "value": "331004" },

{
  "label": "?????????",
  "value": "331022" },

{
  "label": "?????????",
  "value": "331023" },

{
  "label": "?????????",
  "value": "331024" },

{
  "label": "?????????",
  "value": "331081" },

{
  "label": "?????????",
  "value": "331082" },

{
  "label": "?????????",
  "value": "331083" }],


[{
  "label": "?????????",
  "value": "331102" },

{
  "label": "?????????",
  "value": "331121" },

{
  "label": "?????????",
  "value": "331122" },

{
  "label": "?????????",
  "value": "331123" },

{
  "label": "?????????",
  "value": "331124" },

{
  "label": "?????????",
  "value": "331125" },

{
  "label": "?????????",
  "value": "331126" },

{
  "label": "?????????????????????",
  "value": "331127" },

{
  "label": "?????????",
  "value": "331181" }]],



[
[{
  "label": "?????????",
  "value": "340102" },

{
  "label": "?????????",
  "value": "340103" },

{
  "label": "?????????",
  "value": "340104" },

{
  "label": "?????????",
  "value": "340111" },

{
  "label": "?????????",
  "value": "340121" },

{
  "label": "?????????",
  "value": "340122" },

{
  "label": "?????????",
  "value": "340123" },

{
  "label": "?????????",
  "value": "340124" },

{
  "label": "?????????????????????????????????",
  "value": "340171" },

{
  "label": "???????????????????????????",
  "value": "340172" },

{
  "label": "???????????????????????????????????????",
  "value": "340173" },

{
  "label": "?????????",
  "value": "340181" }],


[{
  "label": "?????????",
  "value": "340202" },

{
  "label": "?????????",
  "value": "340203" },

{
  "label": "?????????",
  "value": "340207" },

{
  "label": "?????????",
  "value": "340208" },

{
  "label": "?????????",
  "value": "340221" },

{
  "label": "?????????",
  "value": "340222" },

{
  "label": "?????????",
  "value": "340223" },

{
  "label": "?????????",
  "value": "340225" },

{
  "label": "???????????????????????????",
  "value": "340271" },

{
  "label": "???????????????????????????????????????",
  "value": "340272" }],


[{
  "label": "????????????",
  "value": "340302" },

{
  "label": "?????????",
  "value": "340303" },

{
  "label": "?????????",
  "value": "340304" },

{
  "label": "?????????",
  "value": "340311" },

{
  "label": "?????????",
  "value": "340321" },

{
  "label": "?????????",
  "value": "340322" },

{
  "label": "?????????",
  "value": "340323" },

{
  "label": "??????????????????????????????",
  "value": "340371" },

{
  "label": "????????????????????????",
  "value": "340372" }],


[{
  "label": "?????????",
  "value": "340402" },

{
  "label": "????????????",
  "value": "340403" },

{
  "label": "????????????",
  "value": "340404" },

{
  "label": "????????????",
  "value": "340405" },

{
  "label": "?????????",
  "value": "340406" },

{
  "label": "?????????",
  "value": "340421" },

{
  "label": "??????",
  "value": "340422" }],


[{
  "label": "?????????",
  "value": "340503" },

{
  "label": "?????????",
  "value": "340504" },

{
  "label": "?????????",
  "value": "340506" },

{
  "label": "?????????",
  "value": "340521" },

{
  "label": "?????????",
  "value": "340522" },

{
  "label": "??????",
  "value": "340523" }],


[{
  "label": "?????????",
  "value": "340602" },

{
  "label": "?????????",
  "value": "340603" },

{
  "label": "?????????",
  "value": "340604" },

{
  "label": "?????????",
  "value": "340621" }],


[{
  "label": "?????????",
  "value": "340705" },

{
  "label": "?????????",
  "value": "340706" },

{
  "label": "??????",
  "value": "340711" },

{
  "label": "?????????",
  "value": "340722" }],


[{
  "label": "?????????",
  "value": "340802" },

{
  "label": "?????????",
  "value": "340803" },

{
  "label": "?????????",
  "value": "340811" },

{
  "label": "?????????",
  "value": "340822" },

{
  "label": "?????????",
  "value": "340824" },

{
  "label": "?????????",
  "value": "340825" },

{
  "label": "?????????",
  "value": "340826" },

{
  "label": "?????????",
  "value": "340827" },

{
  "label": "?????????",
  "value": "340828" },

{
  "label": "???????????????????????????",
  "value": "340871" },

{
  "label": "?????????",
  "value": "340881" }],


[{
  "label": "?????????",
  "value": "341002" },

{
  "label": "?????????",
  "value": "341003" },

{
  "label": "?????????",
  "value": "341004" },

{
  "label": "??????",
  "value": "341021" },

{
  "label": "?????????",
  "value": "341022" },

{
  "label": "??????",
  "value": "341023" },

{
  "label": "?????????",
  "value": "341024" }],


[{
  "label": "?????????",
  "value": "341102" },

{
  "label": "?????????",
  "value": "341103" },

{
  "label": "?????????",
  "value": "341122" },

{
  "label": "?????????",
  "value": "341124" },

{
  "label": "?????????",
  "value": "341125" },

{
  "label": "?????????",
  "value": "341126" },

{
  "label": "?????????????????????",
  "value": "341171" },

{
  "label": "???????????????????????????",
  "value": "341172" },

{
  "label": "?????????",
  "value": "341181" },

{
  "label": "?????????",
  "value": "341182" }],


[{
  "label": "?????????",
  "value": "341202" },

{
  "label": "?????????",
  "value": "341203" },

{
  "label": "?????????",
  "value": "341204" },

{
  "label": "?????????",
  "value": "341221" },

{
  "label": "?????????",
  "value": "341222" },

{
  "label": "?????????",
  "value": "341225" },

{
  "label": "?????????",
  "value": "341226" },

{
  "label": "??????????????????????????????",
  "value": "341271" },

{
  "label": "???????????????????????????",
  "value": "341272" },

{
  "label": "?????????",
  "value": "341282" }],


[{
  "label": "?????????",
  "value": "341302" },

{
  "label": "?????????",
  "value": "341321" },

{
  "label": "??????",
  "value": "341322" },

{
  "label": "?????????",
  "value": "341323" },

{
  "label": "??????",
  "value": "341324" },

{
  "label": "?????????????????????????????????",
  "value": "341371" },

{
  "label": "???????????????????????????",
  "value": "341372" }],


[{
  "label": "?????????",
  "value": "341502" },

{
  "label": "?????????",
  "value": "341503" },

{
  "label": "?????????",
  "value": "341504" },

{
  "label": "?????????",
  "value": "341522" },

{
  "label": "?????????",
  "value": "341523" },

{
  "label": "?????????",
  "value": "341524" },

{
  "label": "?????????",
  "value": "341525" }],


[{
  "label": "?????????",
  "value": "341602" },

{
  "label": "?????????",
  "value": "341621" },

{
  "label": "?????????",
  "value": "341622" },

{
  "label": "?????????",
  "value": "341623" }],


[{
  "label": "?????????",
  "value": "341702" },

{
  "label": "?????????",
  "value": "341721" },

{
  "label": "?????????",
  "value": "341722" },

{
  "label": "?????????",
  "value": "341723" }],


[{
  "label": "?????????",
  "value": "341802" },

{
  "label": "?????????",
  "value": "341821" },

{
  "label": "?????????",
  "value": "341822" },

{
  "label": "??????",
  "value": "341823" },

{
  "label": "?????????",
  "value": "341824" },

{
  "label": "?????????",
  "value": "341825" },

{
  "label": "????????????????????????",
  "value": "341871" },

{
  "label": "?????????",
  "value": "341881" }]],



[
[{
  "label": "?????????",
  "value": "350102" },

{
  "label": "?????????",
  "value": "350103" },

{
  "label": "?????????",
  "value": "350104" },

{
  "label": "?????????",
  "value": "350105" },

{
  "label": "?????????",
  "value": "350111" },

{
  "label": "?????????",
  "value": "350121" },

{
  "label": "?????????",
  "value": "350122" },

{
  "label": "?????????",
  "value": "350123" },

{
  "label": "?????????",
  "value": "350124" },

{
  "label": "?????????",
  "value": "350125" },

{
  "label": "?????????",
  "value": "350128" },

{
  "label": "?????????",
  "value": "350181" },

{
  "label": "?????????",
  "value": "350182" }],


[{
  "label": "?????????",
  "value": "350203" },

{
  "label": "?????????",
  "value": "350205" },

{
  "label": "?????????",
  "value": "350206" },

{
  "label": "?????????",
  "value": "350211" },

{
  "label": "?????????",
  "value": "350212" },

{
  "label": "?????????",
  "value": "350213" }],


[{
  "label": "?????????",
  "value": "350302" },

{
  "label": "?????????",
  "value": "350303" },

{
  "label": "?????????",
  "value": "350304" },

{
  "label": "?????????",
  "value": "350305" },

{
  "label": "?????????",
  "value": "350322" }],


[{
  "label": "?????????",
  "value": "350402" },

{
  "label": "?????????",
  "value": "350403" },

{
  "label": "?????????",
  "value": "350421" },

{
  "label": "?????????",
  "value": "350423" },

{
  "label": "?????????",
  "value": "350424" },

{
  "label": "?????????",
  "value": "350425" },

{
  "label": "?????????",
  "value": "350426" },

{
  "label": "??????",
  "value": "350427" },

{
  "label": "?????????",
  "value": "350428" },

{
  "label": "?????????",
  "value": "350429" },

{
  "label": "?????????",
  "value": "350430" },

{
  "label": "?????????",
  "value": "350481" }],


[{
  "label": "?????????",
  "value": "350502" },

{
  "label": "?????????",
  "value": "350503" },

{
  "label": "?????????",
  "value": "350504" },

{
  "label": "?????????",
  "value": "350505" },

{
  "label": "?????????",
  "value": "350521" },

{
  "label": "?????????",
  "value": "350524" },

{
  "label": "?????????",
  "value": "350525" },

{
  "label": "?????????",
  "value": "350526" },

{
  "label": "?????????",
  "value": "350527" },

{
  "label": "?????????",
  "value": "350581" },

{
  "label": "?????????",
  "value": "350582" },

{
  "label": "?????????",
  "value": "350583" }],


[{
  "label": "?????????",
  "value": "350602" },

{
  "label": "?????????",
  "value": "350603" },

{
  "label": "?????????",
  "value": "350622" },

{
  "label": "?????????",
  "value": "350623" },

{
  "label": "?????????",
  "value": "350624" },

{
  "label": "?????????",
  "value": "350625" },

{
  "label": "?????????",
  "value": "350626" },

{
  "label": "?????????",
  "value": "350627" },

{
  "label": "?????????",
  "value": "350628" },

{
  "label": "?????????",
  "value": "350629" },

{
  "label": "?????????",
  "value": "350681" }],


[{
  "label": "?????????",
  "value": "350702" },

{
  "label": "?????????",
  "value": "350703" },

{
  "label": "?????????",
  "value": "350721" },

{
  "label": "?????????",
  "value": "350722" },

{
  "label": "?????????",
  "value": "350723" },

{
  "label": "?????????",
  "value": "350724" },

{
  "label": "?????????",
  "value": "350725" },

{
  "label": "?????????",
  "value": "350781" },

{
  "label": "????????????",
  "value": "350782" },

{
  "label": "?????????",
  "value": "350783" }],


[{
  "label": "?????????",
  "value": "350802" },

{
  "label": "?????????",
  "value": "350803" },

{
  "label": "?????????",
  "value": "350821" },

{
  "label": "?????????",
  "value": "350823" },

{
  "label": "?????????",
  "value": "350824" },

{
  "label": "?????????",
  "value": "350825" },

{
  "label": "?????????",
  "value": "350881" }],


[{
  "label": "?????????",
  "value": "350902" },

{
  "label": "?????????",
  "value": "350921" },

{
  "label": "?????????",
  "value": "350922" },

{
  "label": "?????????",
  "value": "350923" },

{
  "label": "?????????",
  "value": "350924" },

{
  "label": "?????????",
  "value": "350925" },

{
  "label": "?????????",
  "value": "350926" },

{
  "label": "?????????",
  "value": "350981" },

{
  "label": "?????????",
  "value": "350982" }]],



[
[{
  "label": "?????????",
  "value": "360102" },

{
  "label": "?????????",
  "value": "360103" },

{
  "label": "????????????",
  "value": "360104" },

{
  "label": "?????????",
  "value": "360105" },

{
  "label": "????????????",
  "value": "360111" },

{
  "label": "?????????",
  "value": "360112" },

{
  "label": "?????????",
  "value": "360121" },

{
  "label": "?????????",
  "value": "360123" },

{
  "label": "?????????",
  "value": "360124" }],


[{
  "label": "?????????",
  "value": "360202" },

{
  "label": "?????????",
  "value": "360203" },

{
  "label": "?????????",
  "value": "360222" },

{
  "label": "?????????",
  "value": "360281" }],


[{
  "label": "?????????",
  "value": "360302" },

{
  "label": "?????????",
  "value": "360313" },

{
  "label": "?????????",
  "value": "360321" },

{
  "label": "?????????",
  "value": "360322" },

{
  "label": "?????????",
  "value": "360323" }],


[{
  "label": "?????????",
  "value": "360402" },

{
  "label": "?????????",
  "value": "360403" },

{
  "label": "?????????",
  "value": "360404" },

{
  "label": "?????????",
  "value": "360423" },

{
  "label": "?????????",
  "value": "360424" },

{
  "label": "?????????",
  "value": "360425" },

{
  "label": "?????????",
  "value": "360426" },

{
  "label": "?????????",
  "value": "360428" },

{
  "label": "?????????",
  "value": "360429" },

{
  "label": "?????????",
  "value": "360430" },

{
  "label": "?????????",
  "value": "360481" },

{
  "label": "????????????",
  "value": "360482" },

{
  "label": "?????????",
  "value": "360483" }],


[{
  "label": "?????????",
  "value": "360502" },

{
  "label": "?????????",
  "value": "360521" }],


[{
  "label": "?????????",
  "value": "360602" },

{
  "label": "?????????",
  "value": "360622" },

{
  "label": "?????????",
  "value": "360681" }],


[{
  "label": "?????????",
  "value": "360702" },

{
  "label": "?????????",
  "value": "360703" },

{
  "label": "?????????",
  "value": "360704" },

{
  "label": "?????????",
  "value": "360722" },

{
  "label": "?????????",
  "value": "360723" },

{
  "label": "?????????",
  "value": "360724" },

{
  "label": "?????????",
  "value": "360725" },

{
  "label": "?????????",
  "value": "360726" },

{
  "label": "?????????",
  "value": "360727" },

{
  "label": "?????????",
  "value": "360728" },

{
  "label": "?????????",
  "value": "360729" },

{
  "label": "?????????",
  "value": "360730" },

{
  "label": "?????????",
  "value": "360731" },

{
  "label": "?????????",
  "value": "360732" },

{
  "label": "?????????",
  "value": "360733" },

{
  "label": "?????????",
  "value": "360734" },

{
  "label": "?????????",
  "value": "360735" },

{
  "label": "?????????",
  "value": "360781" }],


[{
  "label": "?????????",
  "value": "360802" },

{
  "label": "?????????",
  "value": "360803" },

{
  "label": "?????????",
  "value": "360821" },

{
  "label": "?????????",
  "value": "360822" },

{
  "label": "?????????",
  "value": "360823" },

{
  "label": "?????????",
  "value": "360824" },

{
  "label": "?????????",
  "value": "360825" },

{
  "label": "?????????",
  "value": "360826" },

{
  "label": "?????????",
  "value": "360827" },

{
  "label": "?????????",
  "value": "360828" },

{
  "label": "?????????",
  "value": "360829" },

{
  "label": "?????????",
  "value": "360830" },

{
  "label": "????????????",
  "value": "360881" }],


[{
  "label": "?????????",
  "value": "360902" },

{
  "label": "?????????",
  "value": "360921" },

{
  "label": "?????????",
  "value": "360922" },

{
  "label": "?????????",
  "value": "360923" },

{
  "label": "?????????",
  "value": "360924" },

{
  "label": "?????????",
  "value": "360925" },

{
  "label": "?????????",
  "value": "360926" },

{
  "label": "?????????",
  "value": "360981" },

{
  "label": "?????????",
  "value": "360982" },

{
  "label": "?????????",
  "value": "360983" }],


[{
  "label": "?????????",
  "value": "361002" },

{
  "label": "?????????",
  "value": "361003" },

{
  "label": "?????????",
  "value": "361021" },

{
  "label": "?????????",
  "value": "361022" },

{
  "label": "?????????",
  "value": "361023" },

{
  "label": "?????????",
  "value": "361024" },

{
  "label": "?????????",
  "value": "361025" },

{
  "label": "?????????",
  "value": "361026" },

{
  "label": "?????????",
  "value": "361027" },

{
  "label": "?????????",
  "value": "361028" },

{
  "label": "?????????",
  "value": "361030" }],


[{
  "label": "?????????",
  "value": "361102" },

{
  "label": "?????????",
  "value": "361103" },

{
  "label": "?????????",
  "value": "361121" },

{
  "label": "?????????",
  "value": "361123" },

{
  "label": "?????????",
  "value": "361124" },

{
  "label": "?????????",
  "value": "361125" },

{
  "label": "?????????",
  "value": "361126" },

{
  "label": "?????????",
  "value": "361127" },

{
  "label": "?????????",
  "value": "361128" },

{
  "label": "?????????",
  "value": "361129" },

{
  "label": "?????????",
  "value": "361130" },

{
  "label": "?????????",
  "value": "361181" }]],



[
[{
  "label": "?????????",
  "value": "370102" },

{
  "label": "?????????",
  "value": "370103" },

{
  "label": "?????????",
  "value": "370104" },

{
  "label": "?????????",
  "value": "370105" },

{
  "label": "?????????",
  "value": "370112" },

{
  "label": "?????????",
  "value": "370113" },

{
  "label": "?????????",
  "value": "370114" },

{
  "label": "?????????",
  "value": "370124" },

{
  "label": "?????????",
  "value": "370125" },

{
  "label": "?????????",
  "value": "370126" },

{
  "label": "?????????????????????????????????",
  "value": "370171" }],


[{
  "label": "?????????",
  "value": "370202" },

{
  "label": "?????????",
  "value": "370203" },

{
  "label": "?????????",
  "value": "370211" },

{
  "label": "?????????",
  "value": "370212" },

{
  "label": "?????????",
  "value": "370213" },

{
  "label": "?????????",
  "value": "370214" },

{
  "label": "?????????",
  "value": "370215" },

{
  "label": "?????????????????????????????????",
  "value": "370271" },

{
  "label": "?????????",
  "value": "370281" },

{
  "label": "?????????",
  "value": "370283" },

{
  "label": "?????????",
  "value": "370285" }],


[{
  "label": "?????????",
  "value": "370302" },

{
  "label": "?????????",
  "value": "370303" },

{
  "label": "?????????",
  "value": "370304" },

{
  "label": "?????????",
  "value": "370305" },

{
  "label": "?????????",
  "value": "370306" },

{
  "label": "?????????",
  "value": "370321" },

{
  "label": "?????????",
  "value": "370322" },

{
  "label": "?????????",
  "value": "370323" }],


[{
  "label": "?????????",
  "value": "370402" },

{
  "label": "?????????",
  "value": "370403" },

{
  "label": "?????????",
  "value": "370404" },

{
  "label": "????????????",
  "value": "370405" },

{
  "label": "?????????",
  "value": "370406" },

{
  "label": "?????????",
  "value": "370481" }],


[{
  "label": "?????????",
  "value": "370502" },

{
  "label": "?????????",
  "value": "370503" },

{
  "label": "?????????",
  "value": "370505" },

{
  "label": "?????????",
  "value": "370522" },

{
  "label": "?????????",
  "value": "370523" },

{
  "label": "???????????????????????????",
  "value": "370571" },

{
  "label": "????????????????????????",
  "value": "370572" }],


[{
  "label": "?????????",
  "value": "370602" },

{
  "label": "?????????",
  "value": "370611" },

{
  "label": "?????????",
  "value": "370612" },

{
  "label": "?????????",
  "value": "370613" },

{
  "label": "?????????",
  "value": "370634" },

{
  "label": "?????????????????????????????????",
  "value": "370671" },

{
  "label": "???????????????????????????",
  "value": "370672" },

{
  "label": "?????????",
  "value": "370681" },

{
  "label": "?????????",
  "value": "370682" },

{
  "label": "?????????",
  "value": "370683" },

{
  "label": "?????????",
  "value": "370684" },

{
  "label": "?????????",
  "value": "370685" },

{
  "label": "?????????",
  "value": "370686" },

{
  "label": "?????????",
  "value": "370687" }],


[{
  "label": "?????????",
  "value": "370702" },

{
  "label": "?????????",
  "value": "370703" },

{
  "label": "?????????",
  "value": "370704" },

{
  "label": "?????????",
  "value": "370705" },

{
  "label": "?????????",
  "value": "370724" },

{
  "label": "?????????",
  "value": "370725" },

{
  "label": "?????????????????????????????????",
  "value": "370772" },

{
  "label": "?????????",
  "value": "370781" },

{
  "label": "?????????",
  "value": "370782" },

{
  "label": "?????????",
  "value": "370783" },

{
  "label": "?????????",
  "value": "370784" },

{
  "label": "?????????",
  "value": "370785" },

{
  "label": "?????????",
  "value": "370786" }],


[{
  "label": "?????????",
  "value": "370811" },

{
  "label": "?????????",
  "value": "370812" },

{
  "label": "?????????",
  "value": "370826" },

{
  "label": "?????????",
  "value": "370827" },

{
  "label": "?????????",
  "value": "370828" },

{
  "label": "?????????",
  "value": "370829" },

{
  "label": "?????????",
  "value": "370830" },

{
  "label": "?????????",
  "value": "370831" },

{
  "label": "?????????",
  "value": "370832" },

{
  "label": "?????????????????????????????????",
  "value": "370871" },

{
  "label": "?????????",
  "value": "370881" },

{
  "label": "?????????",
  "value": "370883" }],


[{
  "label": "?????????",
  "value": "370902" },

{
  "label": "?????????",
  "value": "370911" },

{
  "label": "?????????",
  "value": "370921" },

{
  "label": "?????????",
  "value": "370923" },

{
  "label": "?????????",
  "value": "370982" },

{
  "label": "?????????",
  "value": "370983" }],


[{
  "label": "?????????",
  "value": "371002" },

{
  "label": "?????????",
  "value": "371003" },

{
  "label": "????????????????????????????????????",
  "value": "371071" },

{
  "label": "???????????????????????????",
  "value": "371072" },

{
  "label": "?????????????????????????????????",
  "value": "371073" },

{
  "label": "?????????",
  "value": "371082" },

{
  "label": "?????????",
  "value": "371083" }],


[{
  "label": "?????????",
  "value": "371102" },

{
  "label": "?????????",
  "value": "371103" },

{
  "label": "?????????",
  "value": "371121" },

{
  "label": "??????",
  "value": "371122" },

{
  "label": "???????????????????????????",
  "value": "371171" },

{
  "label": "?????????????????????",
  "value": "371172" }],


[{
  "label": "?????????",
  "value": "371202" },

{
  "label": "?????????",
  "value": "371203" }],


[{
  "label": "?????????",
  "value": "371302" },

{
  "label": "?????????",
  "value": "371311" },

{
  "label": "?????????",
  "value": "371312" },

{
  "label": "?????????",
  "value": "371321" },

{
  "label": "?????????",
  "value": "371322" },

{
  "label": "?????????",
  "value": "371323" },

{
  "label": "?????????",
  "value": "371324" },

{
  "label": "??????",
  "value": "371325" },

{
  "label": "?????????",
  "value": "371326" },

{
  "label": "?????????",
  "value": "371327" },

{
  "label": "?????????",
  "value": "371328" },

{
  "label": "?????????",
  "value": "371329" },

{
  "label": "?????????????????????????????????",
  "value": "371371" },

{
  "label": "???????????????????????????",
  "value": "371372" },

{
  "label": "???????????????????????????",
  "value": "371373" }],


[{
  "label": "?????????",
  "value": "371402" },

{
  "label": "?????????",
  "value": "371403" },

{
  "label": "?????????",
  "value": "371422" },

{
  "label": "?????????",
  "value": "371423" },

{
  "label": "?????????",
  "value": "371424" },

{
  "label": "?????????",
  "value": "371425" },

{
  "label": "?????????",
  "value": "371426" },

{
  "label": "?????????",
  "value": "371427" },

{
  "label": "?????????",
  "value": "371428" },

{
  "label": "???????????????????????????",
  "value": "371471" },

{
  "label": "???????????????????????????",
  "value": "371472" },

{
  "label": "?????????",
  "value": "371481" },

{
  "label": "?????????",
  "value": "371482" }],


[{
  "label": "????????????",
  "value": "371502" },

{
  "label": "?????????",
  "value": "371521" },

{
  "label": "??????",
  "value": "371522" },

{
  "label": "?????????",
  "value": "371523" },

{
  "label": "?????????",
  "value": "371524" },

{
  "label": "??????",
  "value": "371525" },

{
  "label": "?????????",
  "value": "371526" },

{
  "label": "?????????",
  "value": "371581" }],


[{
  "label": "?????????",
  "value": "371602" },

{
  "label": "?????????",
  "value": "371603" },

{
  "label": "?????????",
  "value": "371621" },

{
  "label": "?????????",
  "value": "371622" },

{
  "label": "?????????",
  "value": "371623" },

{
  "label": "?????????",
  "value": "371625" },

{
  "label": "?????????",
  "value": "371626" }],


[{
  "label": "?????????",
  "value": "371702" },

{
  "label": "?????????",
  "value": "371703" },

{
  "label": "??????",
  "value": "371721" },

{
  "label": "??????",
  "value": "371722" },

{
  "label": "?????????",
  "value": "371723" },

{
  "label": "?????????",
  "value": "371724" },

{
  "label": "?????????",
  "value": "371725" },

{
  "label": "?????????",
  "value": "371726" },

{
  "label": "?????????",
  "value": "371728" },

{
  "label": "???????????????????????????",
  "value": "371771" },

{
  "label": "???????????????????????????",
  "value": "371772" }]],



[
[{
  "label": "?????????",
  "value": "410102" },

{
  "label": "?????????",
  "value": "410103" },

{
  "label": "???????????????",
  "value": "410104" },

{
  "label": "?????????",
  "value": "410105" },

{
  "label": "?????????",
  "value": "410106" },

{
  "label": "?????????",
  "value": "410108" },

{
  "label": "?????????",
  "value": "410122" },

{
  "label": "???????????????????????????",
  "value": "410171" },

{
  "label": "?????????????????????????????????",
  "value": "410172" },

{
  "label": "????????????????????????????????????",
  "value": "410173" },

{
  "label": "?????????",
  "value": "410181" },

{
  "label": "?????????",
  "value": "410182" },

{
  "label": "?????????",
  "value": "410183" },

{
  "label": "?????????",
  "value": "410184" },

{
  "label": "?????????",
  "value": "410185" }],


[{
  "label": "?????????",
  "value": "410202" },

{
  "label": "???????????????",
  "value": "410203" },

{
  "label": "?????????",
  "value": "410204" },

{
  "label": "????????????",
  "value": "410205" },

{
  "label": "?????????",
  "value": "410212" },

{
  "label": "??????",
  "value": "410221" },

{
  "label": "?????????",
  "value": "410222" },

{
  "label": "?????????",
  "value": "410223" },

{
  "label": "?????????",
  "value": "410225" }],


[{
  "label": "?????????",
  "value": "410302" },

{
  "label": "?????????",
  "value": "410303" },

{
  "label": "???????????????",
  "value": "410304" },

{
  "label": "?????????",
  "value": "410305" },

{
  "label": "?????????",
  "value": "410306" },

{
  "label": "?????????",
  "value": "410311" },

{
  "label": "?????????",
  "value": "410322" },

{
  "label": "?????????",
  "value": "410323" },

{
  "label": "?????????",
  "value": "410324" },

{
  "label": "??????",
  "value": "410325" },

{
  "label": "?????????",
  "value": "410326" },

{
  "label": "?????????",
  "value": "410327" },

{
  "label": "?????????",
  "value": "410328" },

{
  "label": "?????????",
  "value": "410329" },

{
  "label": "?????????????????????????????????",
  "value": "410371" },

{
  "label": "?????????",
  "value": "410381" }],


[{
  "label": "?????????",
  "value": "410402" },

{
  "label": "?????????",
  "value": "410403" },

{
  "label": "?????????",
  "value": "410404" },

{
  "label": "?????????",
  "value": "410411" },

{
  "label": "?????????",
  "value": "410421" },

{
  "label": "??????",
  "value": "410422" },

{
  "label": "?????????",
  "value": "410423" },

{
  "label": "??????",
  "value": "410425" },

{
  "label": "????????????????????????????????????",
  "value": "410471" },

{
  "label": "?????????????????????",
  "value": "410472" },

{
  "label": "?????????",
  "value": "410481" },

{
  "label": "?????????",
  "value": "410482" }],


[{
  "label": "?????????",
  "value": "410502" },

{
  "label": "?????????",
  "value": "410503" },

{
  "label": "?????????",
  "value": "410505" },

{
  "label": "?????????",
  "value": "410506" },

{
  "label": "?????????",
  "value": "410522" },

{
  "label": "?????????",
  "value": "410523" },

{
  "label": "??????",
  "value": "410526" },

{
  "label": "?????????",
  "value": "410527" },

{
  "label": "?????????????????????????????????",
  "value": "410571" },

{
  "label": "?????????",
  "value": "410581" }],


[{
  "label": "?????????",
  "value": "410602" },

{
  "label": "?????????",
  "value": "410603" },

{
  "label": "?????????",
  "value": "410611" },

{
  "label": "??????",
  "value": "410621" },

{
  "label": "??????",
  "value": "410622" },

{
  "label": "???????????????????????????",
  "value": "410671" }],


[{
  "label": "?????????",
  "value": "410702" },

{
  "label": "?????????",
  "value": "410703" },

{
  "label": "?????????",
  "value": "410704" },

{
  "label": "?????????",
  "value": "410711" },

{
  "label": "?????????",
  "value": "410721" },

{
  "label": "?????????",
  "value": "410724" },

{
  "label": "?????????",
  "value": "410725" },

{
  "label": "?????????",
  "value": "410726" },

{
  "label": "?????????",
  "value": "410727" },

{
  "label": "?????????",
  "value": "410728" },

{
  "label": "?????????????????????????????????",
  "value": "410771" },

{
  "label": "???????????????????????????",
  "value": "410772" },

{
  "label": "???????????????????????????????????????",
  "value": "410773" },

{
  "label": "?????????",
  "value": "410781" },

{
  "label": "?????????",
  "value": "410782" }],


[{
  "label": "?????????",
  "value": "410802" },

{
  "label": "?????????",
  "value": "410803" },

{
  "label": "?????????",
  "value": "410804" },

{
  "label": "?????????",
  "value": "410811" },

{
  "label": "?????????",
  "value": "410821" },

{
  "label": "?????????",
  "value": "410822" },

{
  "label": "?????????",
  "value": "410823" },

{
  "label": "??????",
  "value": "410825" },

{
  "label": "??????????????????????????????",
  "value": "410871" },

{
  "label": "?????????",
  "value": "410882" },

{
  "label": "?????????",
  "value": "410883" }],


[{
  "label": "?????????",
  "value": "410902" },

{
  "label": "?????????",
  "value": "410922" },

{
  "label": "?????????",
  "value": "410923" },

{
  "label": "??????",
  "value": "410926" },

{
  "label": "?????????",
  "value": "410927" },

{
  "label": "?????????",
  "value": "410928" },

{
  "label": "????????????????????????",
  "value": "410971" },

{
  "label": "???????????????????????????",
  "value": "410972" }],


[{
  "label": "?????????",
  "value": "411002" },

{
  "label": "?????????",
  "value": "411003" },

{
  "label": "?????????",
  "value": "411024" },

{
  "label": "?????????",
  "value": "411025" },

{
  "label": "???????????????????????????",
  "value": "411071" },

{
  "label": "?????????",
  "value": "411081" },

{
  "label": "?????????",
  "value": "411082" }],


[{
  "label": "?????????",
  "value": "411102" },

{
  "label": "?????????",
  "value": "411103" },

{
  "label": "?????????",
  "value": "411104" },

{
  "label": "?????????",
  "value": "411121" },

{
  "label": "?????????",
  "value": "411122" },

{
  "label": "???????????????????????????",
  "value": "411171" }],


[{
  "label": "?????????",
  "value": "411202" },

{
  "label": "?????????",
  "value": "411203" },

{
  "label": "?????????",
  "value": "411221" },

{
  "label": "?????????",
  "value": "411224" },

{
  "label": "??????????????????????????????",
  "value": "411271" },

{
  "label": "?????????",
  "value": "411281" },

{
  "label": "?????????",
  "value": "411282" }],


[{
  "label": "?????????",
  "value": "411302" },

{
  "label": "?????????",
  "value": "411303" },

{
  "label": "?????????",
  "value": "411321" },

{
  "label": "?????????",
  "value": "411322" },

{
  "label": "?????????",
  "value": "411323" },

{
  "label": "?????????",
  "value": "411324" },

{
  "label": "?????????",
  "value": "411325" },

{
  "label": "?????????",
  "value": "411326" },

{
  "label": "?????????",
  "value": "411327" },

{
  "label": "?????????",
  "value": "411328" },

{
  "label": "?????????",
  "value": "411329" },

{
  "label": "?????????",
  "value": "411330" },

{
  "label": "?????????????????????????????????",
  "value": "411371" },

{
  "label": "?????????????????????????????????",
  "value": "411372" },

{
  "label": "?????????",
  "value": "411381" }],


[{
  "label": "?????????",
  "value": "411402" },

{
  "label": "?????????",
  "value": "411403" },

{
  "label": "?????????",
  "value": "411421" },

{
  "label": "??????",
  "value": "411422" },

{
  "label": "?????????",
  "value": "411423" },

{
  "label": "?????????",
  "value": "411424" },

{
  "label": "?????????",
  "value": "411425" },

{
  "label": "?????????",
  "value": "411426" },

{
  "label": "?????????????????????????????????",
  "value": "411471" },

{
  "label": "???????????????????????????",
  "value": "411472" },

{
  "label": "?????????",
  "value": "411481" }],


[{
  "label": "?????????",
  "value": "411502" },

{
  "label": "?????????",
  "value": "411503" },

{
  "label": "?????????",
  "value": "411521" },

{
  "label": "?????????",
  "value": "411522" },

{
  "label": "??????",
  "value": "411523" },

{
  "label": "?????????",
  "value": "411524" },

{
  "label": "?????????",
  "value": "411525" },

{
  "label": "?????????",
  "value": "411526" },

{
  "label": "?????????",
  "value": "411527" },

{
  "label": "??????",
  "value": "411528" },

{
  "label": "?????????????????????????????????",
  "value": "411571" }],


[{
  "label": "?????????",
  "value": "411602" },

{
  "label": "?????????",
  "value": "411621" },

{
  "label": "?????????",
  "value": "411622" },

{
  "label": "?????????",
  "value": "411623" },

{
  "label": "?????????",
  "value": "411624" },

{
  "label": "?????????",
  "value": "411625" },

{
  "label": "?????????",
  "value": "411626" },

{
  "label": "?????????",
  "value": "411627" },

{
  "label": "?????????",
  "value": "411628" },

{
  "label": "???????????????????????????",
  "value": "411671" },

{
  "label": "?????????",
  "value": "411681" }],


[{
  "label": "?????????",
  "value": "411702" },

{
  "label": "?????????",
  "value": "411721" },

{
  "label": "?????????",
  "value": "411722" },

{
  "label": "?????????",
  "value": "411723" },

{
  "label": "?????????",
  "value": "411724" },

{
  "label": "?????????",
  "value": "411725" },

{
  "label": "?????????",
  "value": "411726" },

{
  "label": "?????????",
  "value": "411727" },

{
  "label": "?????????",
  "value": "411728" },

{
  "label": "?????????",
  "value": "411729" },

{
  "label": "??????????????????????????????",
  "value": "411771" }],


[{
  "label": "?????????",
  "value": "419001" }]],


[
[{
  "label": "?????????",
  "value": "420102" },

{
  "label": "?????????",
  "value": "420103" },

{
  "label": "?????????",
  "value": "420104" },

{
  "label": "?????????",
  "value": "420105" },

{
  "label": "?????????",
  "value": "420106" },

{
  "label": "?????????",
  "value": "420107" },

{
  "label": "?????????",
  "value": "420111" },

{
  "label": "????????????",
  "value": "420112" },

{
  "label": "?????????",
  "value": "420113" },

{
  "label": "?????????",
  "value": "420114" },

{
  "label": "?????????",
  "value": "420115" },

{
  "label": "?????????",
  "value": "420116" },

{
  "label": "?????????",
  "value": "420117" }],


[{
  "label": "????????????",
  "value": "420202" },

{
  "label": "????????????",
  "value": "420203" },

{
  "label": "?????????",
  "value": "420204" },

{
  "label": "?????????",
  "value": "420205" },

{
  "label": "?????????",
  "value": "420222" },

{
  "label": "?????????",
  "value": "420281" }],


[{
  "label": "?????????",
  "value": "420302" },

{
  "label": "?????????",
  "value": "420303" },

{
  "label": "?????????",
  "value": "420304" },

{
  "label": "?????????",
  "value": "420322" },

{
  "label": "?????????",
  "value": "420323" },

{
  "label": "?????????",
  "value": "420324" },

{
  "label": "??????",
  "value": "420325" },

{
  "label": "????????????",
  "value": "420381" }],


[{
  "label": "?????????",
  "value": "420502" },

{
  "label": "????????????",
  "value": "420503" },

{
  "label": "?????????",
  "value": "420504" },

{
  "label": "?????????",
  "value": "420505" },

{
  "label": "?????????",
  "value": "420506" },

{
  "label": "?????????",
  "value": "420525" },

{
  "label": "?????????",
  "value": "420526" },

{
  "label": "?????????",
  "value": "420527" },

{
  "label": "????????????????????????",
  "value": "420528" },

{
  "label": "????????????????????????",
  "value": "420529" },

{
  "label": "?????????",
  "value": "420581" },

{
  "label": "?????????",
  "value": "420582" },

{
  "label": "?????????",
  "value": "420583" }],


[{
  "label": "?????????",
  "value": "420602" },

{
  "label": "?????????",
  "value": "420606" },

{
  "label": "?????????",
  "value": "420607" },

{
  "label": "?????????",
  "value": "420624" },

{
  "label": "?????????",
  "value": "420625" },

{
  "label": "?????????",
  "value": "420626" },

{
  "label": "????????????",
  "value": "420682" },

{
  "label": "?????????",
  "value": "420683" },

{
  "label": "?????????",
  "value": "420684" }],


[{
  "label": "????????????",
  "value": "420702" },

{
  "label": "?????????",
  "value": "420703" },

{
  "label": "?????????",
  "value": "420704" }],


[{
  "label": "?????????",
  "value": "420802" },

{
  "label": "?????????",
  "value": "420804" },

{
  "label": "?????????",
  "value": "420821" },

{
  "label": "?????????",
  "value": "420822" },

{
  "label": "?????????",
  "value": "420881" }],


[{
  "label": "?????????",
  "value": "420902" },

{
  "label": "?????????",
  "value": "420921" },

{
  "label": "?????????",
  "value": "420922" },

{
  "label": "?????????",
  "value": "420923" },

{
  "label": "?????????",
  "value": "420981" },

{
  "label": "?????????",
  "value": "420982" },

{
  "label": "?????????",
  "value": "420984" }],


[{
  "label": "?????????",
  "value": "421002" },

{
  "label": "?????????",
  "value": "421003" },

{
  "label": "?????????",
  "value": "421022" },

{
  "label": "?????????",
  "value": "421023" },

{
  "label": "?????????",
  "value": "421024" },

{
  "label": "???????????????????????????",
  "value": "421071" },

{
  "label": "?????????",
  "value": "421081" },

{
  "label": "?????????",
  "value": "421083" },

{
  "label": "?????????",
  "value": "421087" }],


[{
  "label": "?????????",
  "value": "421102" },

{
  "label": "?????????",
  "value": "421121" },

{
  "label": "?????????",
  "value": "421122" },

{
  "label": "?????????",
  "value": "421123" },

{
  "label": "?????????",
  "value": "421124" },

{
  "label": "?????????",
  "value": "421125" },

{
  "label": "?????????",
  "value": "421126" },

{
  "label": "?????????",
  "value": "421127" },

{
  "label": "??????????????????",
  "value": "421171" },

{
  "label": "?????????",
  "value": "421181" },

{
  "label": "?????????",
  "value": "421182" }],


[{
  "label": "?????????",
  "value": "421202" },

{
  "label": "?????????",
  "value": "421221" },

{
  "label": "?????????",
  "value": "421222" },

{
  "label": "?????????",
  "value": "421223" },

{
  "label": "?????????",
  "value": "421224" },

{
  "label": "?????????",
  "value": "421281" }],


[{
  "label": "?????????",
  "value": "421303" },

{
  "label": "??????",
  "value": "421321" },

{
  "label": "?????????",
  "value": "421381" }],


[{
  "label": "?????????",
  "value": "422801" },

{
  "label": "?????????",
  "value": "422802" },

{
  "label": "?????????",
  "value": "422822" },

{
  "label": "?????????",
  "value": "422823" },

{
  "label": "?????????",
  "value": "422825" },

{
  "label": "?????????",
  "value": "422826" },

{
  "label": "?????????",
  "value": "422827" },

{
  "label": "?????????",
  "value": "422828" }],


[{
  "label": "?????????",
  "value": "429004" },

{
  "label": "?????????",
  "value": "429005" },

{
  "label": "?????????",
  "value": "429006" },

{
  "label": "???????????????",
  "value": "429021" }]],



[
[{
  "label": "?????????",
  "value": "430102" },

{
  "label": "?????????",
  "value": "430103" },

{
  "label": "?????????",
  "value": "430104" },

{
  "label": "?????????",
  "value": "430105" },

{
  "label": "?????????",
  "value": "430111" },

{
  "label": "?????????",
  "value": "430112" },

{
  "label": "?????????",
  "value": "430121" },

{
  "label": "?????????",
  "value": "430181" },

{
  "label": "?????????",
  "value": "430182" }],


[{
  "label": "?????????",
  "value": "430202" },

{
  "label": "?????????",
  "value": "430203" },

{
  "label": "?????????",
  "value": "430204" },

{
  "label": "?????????",
  "value": "430211" },

{
  "label": "?????????",
  "value": "430221" },

{
  "label": "??????",
  "value": "430223" },

{
  "label": "?????????",
  "value": "430224" },

{
  "label": "?????????",
  "value": "430225" },

{
  "label": "???????????????",
  "value": "430271" },

{
  "label": "?????????",
  "value": "430281" }],


[{
  "label": "?????????",
  "value": "430302" },

{
  "label": "?????????",
  "value": "430304" },

{
  "label": "?????????",
  "value": "430321" },

{
  "label": "????????????????????????????????????",
  "value": "430371" },

{
  "label": "?????????????????????",
  "value": "430372" },

{
  "label": "?????????????????????",
  "value": "430373" },

{
  "label": "?????????",
  "value": "430381" },

{
  "label": "?????????",
  "value": "430382" }],


[{
  "label": "?????????",
  "value": "430405" },

{
  "label": "?????????",
  "value": "430406" },

{
  "label": "?????????",
  "value": "430407" },

{
  "label": "?????????",
  "value": "430408" },

{
  "label": "?????????",
  "value": "430412" },

{
  "label": "?????????",
  "value": "430421" },

{
  "label": "?????????",
  "value": "430422" },

{
  "label": "?????????",
  "value": "430423" },

{
  "label": "?????????",
  "value": "430424" },

{
  "label": "?????????",
  "value": "430426" },

{
  "label": "?????????????????????",
  "value": "430471" },

{
  "label": "????????????????????????????????????",
  "value": "430472" },

{
  "label": "?????????????????????????????????",
  "value": "430473" },

{
  "label": "?????????",
  "value": "430481" },

{
  "label": "?????????",
  "value": "430482" }],


[{
  "label": "?????????",
  "value": "430502" },

{
  "label": "?????????",
  "value": "430503" },

{
  "label": "?????????",
  "value": "430511" },

{
  "label": "?????????",
  "value": "430521" },

{
  "label": "?????????",
  "value": "430522" },

{
  "label": "?????????",
  "value": "430523" },

{
  "label": "?????????",
  "value": "430524" },

{
  "label": "?????????",
  "value": "430525" },

{
  "label": "?????????",
  "value": "430527" },

{
  "label": "?????????",
  "value": "430528" },

{
  "label": "?????????????????????",
  "value": "430529" },

{
  "label": "?????????",
  "value": "430581" }],


[{
  "label": "????????????",
  "value": "430602" },

{
  "label": "?????????",
  "value": "430603" },

{
  "label": "?????????",
  "value": "430611" },

{
  "label": "?????????",
  "value": "430621" },

{
  "label": "?????????",
  "value": "430623" },

{
  "label": "?????????",
  "value": "430624" },

{
  "label": "?????????",
  "value": "430626" },

{
  "label": "????????????????????????",
  "value": "430671" },

{
  "label": "?????????",
  "value": "430681" },

{
  "label": "?????????",
  "value": "430682" }],


[{
  "label": "?????????",
  "value": "430702" },

{
  "label": "?????????",
  "value": "430703" },

{
  "label": "?????????",
  "value": "430721" },

{
  "label": "?????????",
  "value": "430722" },

{
  "label": "??????",
  "value": "430723" },

{
  "label": "?????????",
  "value": "430724" },

{
  "label": "?????????",
  "value": "430725" },

{
  "label": "?????????",
  "value": "430726" },

{
  "label": "???????????????????????????",
  "value": "430771" },

{
  "label": "?????????",
  "value": "430781" }],


[{
  "label": "?????????",
  "value": "430802" },

{
  "label": "????????????",
  "value": "430811" },

{
  "label": "?????????",
  "value": "430821" },

{
  "label": "?????????",
  "value": "430822" }],


[{
  "label": "?????????",
  "value": "430902" },

{
  "label": "?????????",
  "value": "430903" },

{
  "label": "??????",
  "value": "430921" },

{
  "label": "?????????",
  "value": "430922" },

{
  "label": "?????????",
  "value": "430923" },

{
  "label": "???????????????????????????",
  "value": "430971" },

{
  "label": "????????????????????????????????????",
  "value": "430972" },

{
  "label": "?????????",
  "value": "430981" }],


[{
  "label": "?????????",
  "value": "431002" },

{
  "label": "?????????",
  "value": "431003" },

{
  "label": "?????????",
  "value": "431021" },

{
  "label": "?????????",
  "value": "431022" },

{
  "label": "?????????",
  "value": "431023" },

{
  "label": "?????????",
  "value": "431024" },

{
  "label": "?????????",
  "value": "431025" },

{
  "label": "?????????",
  "value": "431026" },

{
  "label": "?????????",
  "value": "431027" },

{
  "label": "?????????",
  "value": "431028" },

{
  "label": "?????????",
  "value": "431081" }],


[{
  "label": "?????????",
  "value": "431102" },

{
  "label": "????????????",
  "value": "431103" },

{
  "label": "?????????",
  "value": "431121" },

{
  "label": "?????????",
  "value": "431122" },

{
  "label": "?????????",
  "value": "431123" },

{
  "label": "??????",
  "value": "431124" },

{
  "label": "?????????",
  "value": "431125" },

{
  "label": "?????????",
  "value": "431126" },

{
  "label": "?????????",
  "value": "431127" },

{
  "label": "?????????",
  "value": "431128" },

{
  "label": "?????????????????????",
  "value": "431129" },

{
  "label": "???????????????????????????",
  "value": "431171" },

{
  "label": "????????????????????????",
  "value": "431172" },

{
  "label": "???????????????????????????",
  "value": "431173" }],


[{
  "label": "?????????",
  "value": "431202" },

{
  "label": "?????????",
  "value": "431221" },

{
  "label": "?????????",
  "value": "431222" },

{
  "label": "?????????",
  "value": "431223" },

{
  "label": "?????????",
  "value": "431224" },

{
  "label": "?????????",
  "value": "431225" },

{
  "label": "?????????????????????",
  "value": "431226" },

{
  "label": "?????????????????????",
  "value": "431227" },

{
  "label": "?????????????????????",
  "value": "431228" },

{
  "label": "???????????????????????????",
  "value": "431229" },

{
  "label": "?????????????????????",
  "value": "431230" },

{
  "label": "????????????????????????",
  "value": "431271" },

{
  "label": "?????????",
  "value": "431281" }],


[{
  "label": "?????????",
  "value": "431302" },

{
  "label": "?????????",
  "value": "431321" },

{
  "label": "?????????",
  "value": "431322" },

{
  "label": "????????????",
  "value": "431381" },

{
  "label": "?????????",
  "value": "431382" }],


[{
  "label": "?????????",
  "value": "433101" },

{
  "label": "?????????",
  "value": "433122" },

{
  "label": "?????????",
  "value": "433123" },

{
  "label": "?????????",
  "value": "433124" },

{
  "label": "?????????",
  "value": "433125" },

{
  "label": "?????????",
  "value": "433126" },

{
  "label": "?????????",
  "value": "433127" },

{
  "label": "?????????",
  "value": "433130" },

{
  "label": "???????????????????????????",
  "value": "433172" },

{
  "label": "???????????????????????????",
  "value": "433173" }]],



[
[{
  "label": "?????????",
  "value": "440103" },

{
  "label": "?????????",
  "value": "440104" },

{
  "label": "?????????",
  "value": "440105" },

{
  "label": "?????????",
  "value": "440106" },

{
  "label": "?????????",
  "value": "440111" },

{
  "label": "?????????",
  "value": "440112" },

{
  "label": "?????????",
  "value": "440113" },

{
  "label": "?????????",
  "value": "440114" },

{
  "label": "?????????",
  "value": "440115" },

{
  "label": "?????????",
  "value": "440117" },

{
  "label": "?????????",
  "value": "440118" }],


[{
  "label": "?????????",
  "value": "440203" },

{
  "label": "?????????",
  "value": "440204" },

{
  "label": "?????????",
  "value": "440205" },

{
  "label": "?????????",
  "value": "440222" },

{
  "label": "?????????",
  "value": "440224" },

{
  "label": "?????????",
  "value": "440229" },

{
  "label": "?????????????????????",
  "value": "440232" },

{
  "label": "?????????",
  "value": "440233" },

{
  "label": "?????????",
  "value": "440281" },

{
  "label": "?????????",
  "value": "440282" }],


[{
  "label": "?????????",
  "value": "440303" },

{
  "label": "?????????",
  "value": "440304" },

{
  "label": "?????????",
  "value": "440305" },

{
  "label": "?????????",
  "value": "440306" },

{
  "label": "?????????",
  "value": "440307" },

{
  "label": "?????????",
  "value": "440308" },

{
  "label": "?????????",
  "value": "440309" },

{
  "label": "?????????",
  "value": "440310" }],


[{
  "label": "?????????",
  "value": "440402" },

{
  "label": "?????????",
  "value": "440403" },

{
  "label": "?????????",
  "value": "440404" }],


[{
  "label": "?????????",
  "value": "440507" },

{
  "label": "?????????",
  "value": "440511" },

{
  "label": "?????????",
  "value": "440512" },

{
  "label": "?????????",
  "value": "440513" },

{
  "label": "?????????",
  "value": "440514" },

{
  "label": "?????????",
  "value": "440515" },

{
  "label": "?????????",
  "value": "440523" }],


[{
  "label": "?????????",
  "value": "440604" },

{
  "label": "?????????",
  "value": "440605" },

{
  "label": "?????????",
  "value": "440606" },

{
  "label": "?????????",
  "value": "440607" },

{
  "label": "?????????",
  "value": "440608" }],


[{
  "label": "?????????",
  "value": "440703" },

{
  "label": "?????????",
  "value": "440704" },

{
  "label": "?????????",
  "value": "440705" },

{
  "label": "?????????",
  "value": "440781" },

{
  "label": "?????????",
  "value": "440783" },

{
  "label": "?????????",
  "value": "440784" },

{
  "label": "?????????",
  "value": "440785" }],


[{
  "label": "?????????",
  "value": "440802" },

{
  "label": "?????????",
  "value": "440803" },

{
  "label": "?????????",
  "value": "440804" },

{
  "label": "?????????",
  "value": "440811" },

{
  "label": "?????????",
  "value": "440823" },

{
  "label": "?????????",
  "value": "440825" },

{
  "label": "?????????",
  "value": "440881" },

{
  "label": "?????????",
  "value": "440882" },

{
  "label": "?????????",
  "value": "440883" }],


[{
  "label": "?????????",
  "value": "440902" },

{
  "label": "?????????",
  "value": "440904" },

{
  "label": "?????????",
  "value": "440981" },

{
  "label": "?????????",
  "value": "440982" },

{
  "label": "?????????",
  "value": "440983" }],


[{
  "label": "?????????",
  "value": "441202" },

{
  "label": "?????????",
  "value": "441203" },

{
  "label": "?????????",
  "value": "441204" },

{
  "label": "?????????",
  "value": "441223" },

{
  "label": "?????????",
  "value": "441224" },

{
  "label": "?????????",
  "value": "441225" },

{
  "label": "?????????",
  "value": "441226" },

{
  "label": "?????????",
  "value": "441284" }],


[{
  "label": "?????????",
  "value": "441302" },

{
  "label": "?????????",
  "value": "441303" },

{
  "label": "?????????",
  "value": "441322" },

{
  "label": "?????????",
  "value": "441323" },

{
  "label": "?????????",
  "value": "441324" }],


[{
  "label": "?????????",
  "value": "441402" },

{
  "label": "?????????",
  "value": "441403" },

{
  "label": "?????????",
  "value": "441422" },

{
  "label": "?????????",
  "value": "441423" },

{
  "label": "?????????",
  "value": "441424" },

{
  "label": "?????????",
  "value": "441426" },

{
  "label": "?????????",
  "value": "441427" },

{
  "label": "?????????",
  "value": "441481" }],


[{
  "label": "??????",
  "value": "441502" },

{
  "label": "?????????",
  "value": "441521" },

{
  "label": "?????????",
  "value": "441523" },

{
  "label": "?????????",
  "value": "441581" }],


[{
  "label": "?????????",
  "value": "441602" },

{
  "label": "?????????",
  "value": "441621" },

{
  "label": "?????????",
  "value": "441622" },

{
  "label": "?????????",
  "value": "441623" },

{
  "label": "?????????",
  "value": "441624" },

{
  "label": "?????????",
  "value": "441625" }],


[{
  "label": "?????????",
  "value": "441702" },

{
  "label": "?????????",
  "value": "441704" },

{
  "label": "?????????",
  "value": "441721" },

{
  "label": "?????????",
  "value": "441781" }],


[{
  "label": "?????????",
  "value": "441802" },

{
  "label": "?????????",
  "value": "441803" },

{
  "label": "?????????",
  "value": "441821" },

{
  "label": "?????????",
  "value": "441823" },

{
  "label": "???????????????????????????",
  "value": "441825" },

{
  "label": "?????????????????????",
  "value": "441826" },

{
  "label": "?????????",
  "value": "441881" },

{
  "label": "?????????",
  "value": "441882" }],


[{
  "label": "?????????",
  "value": "441900" }],

[{
  "label": "?????????",
  "value": "442000" }],

[{
  "label": "?????????",
  "value": "445102" },

{
  "label": "?????????",
  "value": "445103" },

{
  "label": "?????????",
  "value": "445122" }],


[{
  "label": "?????????",
  "value": "445202" },

{
  "label": "?????????",
  "value": "445203" },

{
  "label": "?????????",
  "value": "445222" },

{
  "label": "?????????",
  "value": "445224" },

{
  "label": "?????????",
  "value": "445281" }],


[{
  "label": "?????????",
  "value": "445302" },

{
  "label": "?????????",
  "value": "445303" },

{
  "label": "?????????",
  "value": "445321" },

{
  "label": "?????????",
  "value": "445322" },

{
  "label": "?????????",
  "value": "445381" }]],



[
[{
  "label": "?????????",
  "value": "450102" },

{
  "label": "?????????",
  "value": "450103" },

{
  "label": "?????????",
  "value": "450105" },

{
  "label": "????????????",
  "value": "450107" },

{
  "label": "?????????",
  "value": "450108" },

{
  "label": "?????????",
  "value": "450109" },

{
  "label": "?????????",
  "value": "450110" },

{
  "label": "?????????",
  "value": "450123" },

{
  "label": "?????????",
  "value": "450124" },

{
  "label": "?????????",
  "value": "450125" },

{
  "label": "?????????",
  "value": "450126" },

{
  "label": "??????",
  "value": "450127" }],


[{
  "label": "?????????",
  "value": "450202" },

{
  "label": "?????????",
  "value": "450203" },

{
  "label": "?????????",
  "value": "450204" },

{
  "label": "?????????",
  "value": "450205" },

{
  "label": "?????????",
  "value": "450206" },

{
  "label": "?????????",
  "value": "450222" },

{
  "label": "?????????",
  "value": "450223" },

{
  "label": "?????????",
  "value": "450224" },

{
  "label": "?????????????????????",
  "value": "450225" },

{
  "label": "?????????????????????",
  "value": "450226" }],


[{
  "label": "?????????",
  "value": "450302" },

{
  "label": "?????????",
  "value": "450303" },

{
  "label": "?????????",
  "value": "450304" },

{
  "label": "?????????",
  "value": "450305" },

{
  "label": "?????????",
  "value": "450311" },

{
  "label": "?????????",
  "value": "450312" },

{
  "label": "?????????",
  "value": "450321" },

{
  "label": "?????????",
  "value": "450323" },

{
  "label": "?????????",
  "value": "450324" },

{
  "label": "?????????",
  "value": "450325" },

{
  "label": "?????????",
  "value": "450326" },

{
  "label": "?????????",
  "value": "450327" },

{
  "label": "?????????????????????",
  "value": "450328" },

{
  "label": "?????????",
  "value": "450329" },

{
  "label": "?????????",
  "value": "450330" },

{
  "label": "?????????",
  "value": "450331" },

{
  "label": "?????????????????????",
  "value": "450332" }],


[{
  "label": "?????????",
  "value": "450403" },

{
  "label": "?????????",
  "value": "450405" },

{
  "label": "?????????",
  "value": "450406" },

{
  "label": "?????????",
  "value": "450421" },

{
  "label": "??????",
  "value": "450422" },

{
  "label": "?????????",
  "value": "450423" },

{
  "label": "?????????",
  "value": "450481" }],


[{
  "label": "?????????",
  "value": "450502" },

{
  "label": "?????????",
  "value": "450503" },

{
  "label": "????????????",
  "value": "450512" },

{
  "label": "?????????",
  "value": "450521" }],


[{
  "label": "?????????",
  "value": "450602" },

{
  "label": "?????????",
  "value": "450603" },

{
  "label": "?????????",
  "value": "450621" },

{
  "label": "?????????",
  "value": "450681" }],


[{
  "label": "?????????",
  "value": "450702" },

{
  "label": "?????????",
  "value": "450703" },

{
  "label": "?????????",
  "value": "450721" },

{
  "label": "?????????",
  "value": "450722" }],


[{
  "label": "?????????",
  "value": "450802" },

{
  "label": "?????????",
  "value": "450803" },

{
  "label": "?????????",
  "value": "450804" },

{
  "label": "?????????",
  "value": "450821" },

{
  "label": "?????????",
  "value": "450881" }],


[{
  "label": "?????????",
  "value": "450902" },

{
  "label": "?????????",
  "value": "450903" },

{
  "label": "??????",
  "value": "450921" },

{
  "label": "?????????",
  "value": "450922" },

{
  "label": "?????????",
  "value": "450923" },

{
  "label": "?????????",
  "value": "450924" },

{
  "label": "?????????",
  "value": "450981" }],


[{
  "label": "?????????",
  "value": "451002" },

{
  "label": "?????????",
  "value": "451021" },

{
  "label": "?????????",
  "value": "451022" },

{
  "label": "?????????",
  "value": "451023" },

{
  "label": "?????????",
  "value": "451024" },

{
  "label": "?????????",
  "value": "451026" },

{
  "label": "?????????",
  "value": "451027" },

{
  "label": "?????????",
  "value": "451028" },

{
  "label": "?????????",
  "value": "451029" },

{
  "label": "?????????",
  "value": "451030" },

{
  "label": "?????????????????????",
  "value": "451031" },

{
  "label": "?????????",
  "value": "451081" }],


[{
  "label": "?????????",
  "value": "451102" },

{
  "label": "?????????",
  "value": "451103" },

{
  "label": "?????????",
  "value": "451121" },

{
  "label": "?????????",
  "value": "451122" },

{
  "label": "?????????????????????",
  "value": "451123" }],


[{
  "label": "????????????",
  "value": "451202" },

{
  "label": "?????????",
  "value": "451203" },

{
  "label": "?????????",
  "value": "451221" },

{
  "label": "?????????",
  "value": "451222" },

{
  "label": "?????????",
  "value": "451223" },

{
  "label": "?????????",
  "value": "451224" },

{
  "label": "????????????????????????",
  "value": "451225" },

{
  "label": "????????????????????????",
  "value": "451226" },

{
  "label": "?????????????????????",
  "value": "451227" },

{
  "label": "?????????????????????",
  "value": "451228" },

{
  "label": "?????????????????????",
  "value": "451229" }],


[{
  "label": "?????????",
  "value": "451302" },

{
  "label": "?????????",
  "value": "451321" },

{
  "label": "?????????",
  "value": "451322" },

{
  "label": "?????????",
  "value": "451323" },

{
  "label": "?????????????????????",
  "value": "451324" },

{
  "label": "?????????",
  "value": "451381" }],


[{
  "label": "?????????",
  "value": "451402" },

{
  "label": "?????????",
  "value": "451421" },

{
  "label": "?????????",
  "value": "451422" },

{
  "label": "?????????",
  "value": "451423" },

{
  "label": "?????????",
  "value": "451424" },

{
  "label": "?????????",
  "value": "451425" },

{
  "label": "?????????",
  "value": "451481" }]],



[
[{
  "label": "?????????",
  "value": "460105" },

{
  "label": "?????????",
  "value": "460106" },

{
  "label": "?????????",
  "value": "460107" },

{
  "label": "?????????",
  "value": "460108" }],


[{
  "label": "?????????",
  "value": "460202" },

{
  "label": "?????????",
  "value": "460203" },

{
  "label": "?????????",
  "value": "460204" },

{
  "label": "?????????",
  "value": "460205" }],


[{
  "label": "????????????",
  "value": "460321" },

{
  "label": "????????????",
  "value": "460322" },

{
  "label": "?????????????????????????????????",
  "value": "460323" }],


[{
  "label": "?????????",
  "value": "460400" }],

[{
  "label": "????????????",
  "value": "469001" },

{
  "label": "?????????",
  "value": "469002" },

{
  "label": "?????????",
  "value": "469005" },

{
  "label": "?????????",
  "value": "469006" },

{
  "label": "?????????",
  "value": "469007" },

{
  "label": "?????????",
  "value": "469021" },

{
  "label": "?????????",
  "value": "469022" },

{
  "label": "?????????",
  "value": "469023" },

{
  "label": "?????????",
  "value": "469024" },

{
  "label": "?????????????????????",
  "value": "469025" },

{
  "label": "?????????????????????",
  "value": "469026" },

{
  "label": "?????????????????????",
  "value": "469027" },

{
  "label": "?????????????????????",
  "value": "469028" },

{
  "label": "???????????????????????????",
  "value": "469029" },

{
  "label": "???????????????????????????",
  "value": "469030" }]],



[
[{
  "label": "?????????",
  "value": "500101" },

{
  "label": "?????????",
  "value": "500102" },

{
  "label": "?????????",
  "value": "500103" },

{
  "label": "????????????",
  "value": "500104" },

{
  "label": "?????????",
  "value": "500105" },

{
  "label": "????????????",
  "value": "500106" },

{
  "label": "????????????",
  "value": "500107" },

{
  "label": "?????????",
  "value": "500108" },

{
  "label": "?????????",
  "value": "500109" },

{
  "label": "?????????",
  "value": "500110" },

{
  "label": "?????????",
  "value": "500111" },

{
  "label": "?????????",
  "value": "500112" },

{
  "label": "?????????",
  "value": "500113" },

{
  "label": "?????????",
  "value": "500114" },

{
  "label": "?????????",
  "value": "500115" },

{
  "label": "?????????",
  "value": "500116" },

{
  "label": "?????????",
  "value": "500117" },

{
  "label": "?????????",
  "value": "500118" },

{
  "label": "?????????",
  "value": "500119" },

{
  "label": "?????????",
  "value": "500120" },

{
  "label": "?????????",
  "value": "500151" },

{
  "label": "?????????",
  "value": "500152" },

{
  "label": "?????????",
  "value": "500153" },

{
  "label": "?????????",
  "value": "500154" },

{
  "label": "?????????",
  "value": "500155" },

{
  "label": "?????????",
  "value": "500156" }],


[{
  "label": "?????????",
  "value": "500229" },

{
  "label": "?????????",
  "value": "500230" },

{
  "label": "?????????",
  "value": "500231" },

{
  "label": "??????",
  "value": "500233" },

{
  "label": "?????????",
  "value": "500235" },

{
  "label": "?????????",
  "value": "500236" },

{
  "label": "?????????",
  "value": "500237" },

{
  "label": "?????????",
  "value": "500238" },

{
  "label": "????????????????????????",
  "value": "500240" },

{
  "label": "??????????????????????????????",
  "value": "500241" },

{
  "label": "??????????????????????????????",
  "value": "500242" },

{
  "label": "??????????????????????????????",
  "value": "500243" }]],



[
[{
  "label": "?????????",
  "value": "510104" },

{
  "label": "?????????",
  "value": "510105" },

{
  "label": "?????????",
  "value": "510106" },

{
  "label": "?????????",
  "value": "510107" },

{
  "label": "?????????",
  "value": "510108" },

{
  "label": "????????????",
  "value": "510112" },

{
  "label": "????????????",
  "value": "510113" },

{
  "label": "?????????",
  "value": "510114" },

{
  "label": "?????????",
  "value": "510115" },

{
  "label": "?????????",
  "value": "510116" },

{
  "label": "?????????",
  "value": "510117" },

{
  "label": "?????????",
  "value": "510121" },

{
  "label": "?????????",
  "value": "510129" },

{
  "label": "?????????",
  "value": "510131" },

{
  "label": "?????????",
  "value": "510132" },

{
  "label": "????????????",
  "value": "510181" },

{
  "label": "?????????",
  "value": "510182" },

{
  "label": "?????????",
  "value": "510183" },

{
  "label": "?????????",
  "value": "510184" },

{
  "label": "?????????",
  "value": "510185" }],


[{
  "label": "????????????",
  "value": "510302" },

{
  "label": "?????????",
  "value": "510303" },

{
  "label": "?????????",
  "value": "510304" },

{
  "label": "?????????",
  "value": "510311" },

{
  "label": "??????",
  "value": "510321" },

{
  "label": "?????????",
  "value": "510322" }],


[{
  "label": "??????",
  "value": "510402" },

{
  "label": "??????",
  "value": "510403" },

{
  "label": "?????????",
  "value": "510411" },

{
  "label": "?????????",
  "value": "510421" },

{
  "label": "?????????",
  "value": "510422" }],


[{
  "label": "?????????",
  "value": "510502" },

{
  "label": "?????????",
  "value": "510503" },

{
  "label": "????????????",
  "value": "510504" },

{
  "label": "??????",
  "value": "510521" },

{
  "label": "?????????",
  "value": "510522" },

{
  "label": "?????????",
  "value": "510524" },

{
  "label": "?????????",
  "value": "510525" }],


[{
  "label": "?????????",
  "value": "510603" },

{
  "label": "?????????",
  "value": "510604" },

{
  "label": "?????????",
  "value": "510623" },

{
  "label": "?????????",
  "value": "510681" },

{
  "label": "?????????",
  "value": "510682" },

{
  "label": "?????????",
  "value": "510683" }],


[{
  "label": "?????????",
  "value": "510703" },

{
  "label": "?????????",
  "value": "510704" },

{
  "label": "?????????",
  "value": "510705" },

{
  "label": "?????????",
  "value": "510722" },

{
  "label": "?????????",
  "value": "510723" },

{
  "label": "?????????",
  "value": "510725" },

{
  "label": "?????????????????????",
  "value": "510726" },

{
  "label": "?????????",
  "value": "510727" },

{
  "label": "?????????",
  "value": "510781" }],


[{
  "label": "?????????",
  "value": "510802" },

{
  "label": "?????????",
  "value": "510811" },

{
  "label": "?????????",
  "value": "510812" },

{
  "label": "?????????",
  "value": "510821" },

{
  "label": "?????????",
  "value": "510822" },

{
  "label": "?????????",
  "value": "510823" },

{
  "label": "?????????",
  "value": "510824" }],


[{
  "label": "?????????",
  "value": "510903" },

{
  "label": "?????????",
  "value": "510904" },

{
  "label": "?????????",
  "value": "510921" },

{
  "label": "?????????",
  "value": "510922" },

{
  "label": "?????????",
  "value": "510923" }],


[{
  "label": "?????????",
  "value": "511002" },

{
  "label": "?????????",
  "value": "511011" },

{
  "label": "?????????",
  "value": "511024" },

{
  "label": "?????????",
  "value": "511025" },

{
  "label": "?????????????????????",
  "value": "511071" },

{
  "label": "?????????",
  "value": "511083" }],


[{
  "label": "?????????",
  "value": "511102" },

{
  "label": "?????????",
  "value": "511111" },

{
  "label": "????????????",
  "value": "511112" },

{
  "label": "????????????",
  "value": "511113" },

{
  "label": "?????????",
  "value": "511123" },

{
  "label": "?????????",
  "value": "511124" },

{
  "label": "?????????",
  "value": "511126" },

{
  "label": "?????????",
  "value": "511129" },

{
  "label": "?????????????????????",
  "value": "511132" },

{
  "label": "?????????????????????",
  "value": "511133" },

{
  "label": "????????????",
  "value": "511181" }],


[{
  "label": "?????????",
  "value": "511302" },

{
  "label": "?????????",
  "value": "511303" },

{
  "label": "?????????",
  "value": "511304" },

{
  "label": "?????????",
  "value": "511321" },

{
  "label": "?????????",
  "value": "511322" },

{
  "label": "?????????",
  "value": "511323" },

{
  "label": "?????????",
  "value": "511324" },

{
  "label": "?????????",
  "value": "511325" },

{
  "label": "?????????",
  "value": "511381" }],


[{
  "label": "?????????",
  "value": "511402" },

{
  "label": "?????????",
  "value": "511403" },

{
  "label": "?????????",
  "value": "511421" },

{
  "label": "?????????",
  "value": "511423" },

{
  "label": "?????????",
  "value": "511424" },

{
  "label": "?????????",
  "value": "511425" }],


[{
  "label": "?????????",
  "value": "511502" },

{
  "label": "?????????",
  "value": "511503" },

{
  "label": "?????????",
  "value": "511521" },

{
  "label": "?????????",
  "value": "511523" },

{
  "label": "?????????",
  "value": "511524" },

{
  "label": "??????",
  "value": "511525" },

{
  "label": "??????",
  "value": "511526" },

{
  "label": "?????????",
  "value": "511527" },

{
  "label": "?????????",
  "value": "511528" },

{
  "label": "?????????",
  "value": "511529" }],


[{
  "label": "?????????",
  "value": "511602" },

{
  "label": "?????????",
  "value": "511603" },

{
  "label": "?????????",
  "value": "511621" },

{
  "label": "?????????",
  "value": "511622" },

{
  "label": "?????????",
  "value": "511623" },

{
  "label": "?????????",
  "value": "511681" }],


[{
  "label": "?????????",
  "value": "511702" },

{
  "label": "?????????",
  "value": "511703" },

{
  "label": "?????????",
  "value": "511722" },

{
  "label": "?????????",
  "value": "511723" },

{
  "label": "?????????",
  "value": "511724" },

{
  "label": "??????",
  "value": "511725" },

{
  "label": "?????????????????????",
  "value": "511771" },

{
  "label": "?????????",
  "value": "511781" }],


[{
  "label": "?????????",
  "value": "511802" },

{
  "label": "?????????",
  "value": "511803" },

{
  "label": "?????????",
  "value": "511822" },

{
  "label": "?????????",
  "value": "511823" },

{
  "label": "?????????",
  "value": "511824" },

{
  "label": "?????????",
  "value": "511825" },

{
  "label": "?????????",
  "value": "511826" },

{
  "label": "?????????",
  "value": "511827" }],


[{
  "label": "?????????",
  "value": "511902" },

{
  "label": "?????????",
  "value": "511903" },

{
  "label": "?????????",
  "value": "511921" },

{
  "label": "?????????",
  "value": "511922" },

{
  "label": "?????????",
  "value": "511923" },

{
  "label": "?????????????????????",
  "value": "511971" }],


[{
  "label": "?????????",
  "value": "512002" },

{
  "label": "?????????",
  "value": "512021" },

{
  "label": "?????????",
  "value": "512022" }],


[{
  "label": "????????????",
  "value": "513201" },

{
  "label": "?????????",
  "value": "513221" },

{
  "label": "??????",
  "value": "513222" },

{
  "label": "??????",
  "value": "513223" },

{
  "label": "?????????",
  "value": "513224" },

{
  "label": "????????????",
  "value": "513225" },

{
  "label": "?????????",
  "value": "513226" },

{
  "label": "?????????",
  "value": "513227" },

{
  "label": "?????????",
  "value": "513228" },

{
  "label": "?????????",
  "value": "513230" },

{
  "label": "?????????",
  "value": "513231" },

{
  "label": "????????????",
  "value": "513232" },

{
  "label": "?????????",
  "value": "513233" }],


[{
  "label": "?????????",
  "value": "513301" },

{
  "label": "?????????",
  "value": "513322" },

{
  "label": "?????????",
  "value": "513323" },

{
  "label": "?????????",
  "value": "513324" },

{
  "label": "?????????",
  "value": "513325" },

{
  "label": "?????????",
  "value": "513326" },

{
  "label": "?????????",
  "value": "513327" },

{
  "label": "?????????",
  "value": "513328" },

{
  "label": "?????????",
  "value": "513329" },

{
  "label": "?????????",
  "value": "513330" },

{
  "label": "?????????",
  "value": "513331" },

{
  "label": "?????????",
  "value": "513332" },

{
  "label": "?????????",
  "value": "513333" },

{
  "label": "?????????",
  "value": "513334" },

{
  "label": "?????????",
  "value": "513335" },

{
  "label": "?????????",
  "value": "513336" },

{
  "label": "?????????",
  "value": "513337" },

{
  "label": "?????????",
  "value": "513338" }],


[{
  "label": "?????????",
  "value": "513401" },

{
  "label": "?????????????????????",
  "value": "513422" },

{
  "label": "?????????",
  "value": "513423" },

{
  "label": "?????????",
  "value": "513424" },

{
  "label": "?????????",
  "value": "513425" },

{
  "label": "?????????",
  "value": "513426" },

{
  "label": "?????????",
  "value": "513427" },

{
  "label": "?????????",
  "value": "513428" },

{
  "label": "?????????",
  "value": "513429" },

{
  "label": "?????????",
  "value": "513430" },

{
  "label": "?????????",
  "value": "513431" },

{
  "label": "?????????",
  "value": "513432" },

{
  "label": "?????????",
  "value": "513433" },

{
  "label": "?????????",
  "value": "513434" },

{
  "label": "?????????",
  "value": "513435" },

{
  "label": "?????????",
  "value": "513436" },

{
  "label": "?????????",
  "value": "513437" }]],



[
[{
  "label": "?????????",
  "value": "520102" },

{
  "label": "?????????",
  "value": "520103" },

{
  "label": "?????????",
  "value": "520111" },

{
  "label": "?????????",
  "value": "520112" },

{
  "label": "?????????",
  "value": "520113" },

{
  "label": "????????????",
  "value": "520115" },

{
  "label": "?????????",
  "value": "520121" },

{
  "label": "?????????",
  "value": "520122" },

{
  "label": "?????????",
  "value": "520123" },

{
  "label": "?????????",
  "value": "520181" }],


[{
  "label": "?????????",
  "value": "520201" },

{
  "label": "????????????",
  "value": "520203" },

{
  "label": "?????????",
  "value": "520221" },

{
  "label": "?????????",
  "value": "520281" }],


[{
  "label": "????????????",
  "value": "520302" },

{
  "label": "?????????",
  "value": "520303" },

{
  "label": "?????????",
  "value": "520304" },

{
  "label": "?????????",
  "value": "520322" },

{
  "label": "?????????",
  "value": "520323" },

{
  "label": "?????????",
  "value": "520324" },

{
  "label": "??????????????????????????????",
  "value": "520325" },

{
  "label": "??????????????????????????????",
  "value": "520326" },

{
  "label": "?????????",
  "value": "520327" },

{
  "label": "?????????",
  "value": "520328" },

{
  "label": "?????????",
  "value": "520329" },

{
  "label": "?????????",
  "value": "520330" },

{
  "label": "?????????",
  "value": "520381" },

{
  "label": "?????????",
  "value": "520382" }],


[{
  "label": "?????????",
  "value": "520402" },

{
  "label": "?????????",
  "value": "520403" },

{
  "label": "?????????",
  "value": "520422" },

{
  "label": "??????????????????????????????",
  "value": "520423" },

{
  "label": "??????????????????????????????",
  "value": "520424" },

{
  "label": "??????????????????????????????",
  "value": "520425" }],


[{
  "label": "????????????",
  "value": "520502" },

{
  "label": "?????????",
  "value": "520521" },

{
  "label": "?????????",
  "value": "520522" },

{
  "label": "?????????",
  "value": "520523" },

{
  "label": "?????????",
  "value": "520524" },

{
  "label": "?????????",
  "value": "520525" },

{
  "label": "?????????????????????????????????",
  "value": "520526" },

{
  "label": "?????????",
  "value": "520527" }],


[{
  "label": "?????????",
  "value": "520602" },

{
  "label": "?????????",
  "value": "520603" },

{
  "label": "?????????",
  "value": "520621" },

{
  "label": "?????????????????????",
  "value": "520622" },

{
  "label": "?????????",
  "value": "520623" },

{
  "label": "?????????",
  "value": "520624" },

{
  "label": "??????????????????????????????",
  "value": "520625" },

{
  "label": "?????????",
  "value": "520626" },

{
  "label": "????????????????????????",
  "value": "520627" },

{
  "label": "?????????????????????",
  "value": "520628" }],


[{
  "label": "?????????",
  "value": "522301" },

{
  "label": "?????????",
  "value": "522322" },

{
  "label": "?????????",
  "value": "522323" },

{
  "label": "?????????",
  "value": "522324" },

{
  "label": "?????????",
  "value": "522325" },

{
  "label": "?????????",
  "value": "522326" },

{
  "label": "?????????",
  "value": "522327" },

{
  "label": "?????????",
  "value": "522328" }],


[{
  "label": "?????????",
  "value": "522601" },

{
  "label": "?????????",
  "value": "522622" },

{
  "label": "?????????",
  "value": "522623" },

{
  "label": "?????????",
  "value": "522624" },

{
  "label": "?????????",
  "value": "522625" },

{
  "label": "?????????",
  "value": "522626" },

{
  "label": "?????????",
  "value": "522627" },

{
  "label": "?????????",
  "value": "522628" },

{
  "label": "?????????",
  "value": "522629" },

{
  "label": "?????????",
  "value": "522630" },

{
  "label": "?????????",
  "value": "522631" },

{
  "label": "?????????",
  "value": "522632" },

{
  "label": "?????????",
  "value": "522633" },

{
  "label": "?????????",
  "value": "522634" },

{
  "label": "?????????",
  "value": "522635" },

{
  "label": "?????????",
  "value": "522636" }],


[{
  "label": "?????????",
  "value": "522701" },

{
  "label": "?????????",
  "value": "522702" },

{
  "label": "?????????",
  "value": "522722" },

{
  "label": "?????????",
  "value": "522723" },

{
  "label": "?????????",
  "value": "522725" },

{
  "label": "?????????",
  "value": "522726" },

{
  "label": "?????????",
  "value": "522727" },

{
  "label": "?????????",
  "value": "522728" },

{
  "label": "?????????",
  "value": "522729" },

{
  "label": "?????????",
  "value": "522730" },

{
  "label": "?????????",
  "value": "522731" },

{
  "label": "?????????????????????",
  "value": "522732" }]],



[
[{
  "label": "?????????",
  "value": "530102" },

{
  "label": "?????????",
  "value": "530103" },

{
  "label": "?????????",
  "value": "530111" },

{
  "label": "?????????",
  "value": "530112" },

{
  "label": "?????????",
  "value": "530113" },

{
  "label": "?????????",
  "value": "530114" },

{
  "label": "?????????",
  "value": "530115" },

{
  "label": "?????????",
  "value": "530124" },

{
  "label": "?????????",
  "value": "530125" },

{
  "label": "?????????????????????",
  "value": "530126" },

{
  "label": "?????????",
  "value": "530127" },

{
  "label": "???????????????????????????",
  "value": "530128" },

{
  "label": "???????????????????????????",
  "value": "530129" },

{
  "label": "?????????",
  "value": "530181" }],


[{
  "label": "?????????",
  "value": "530302" },

{
  "label": "?????????",
  "value": "530303" },

{
  "label": "?????????",
  "value": "530321" },

{
  "label": "?????????",
  "value": "530322" },

{
  "label": "?????????",
  "value": "530323" },

{
  "label": "?????????",
  "value": "530324" },

{
  "label": "?????????",
  "value": "530325" },

{
  "label": "?????????",
  "value": "530326" },

{
  "label": "?????????",
  "value": "530381" }],


[{
  "label": "?????????",
  "value": "530402" },

{
  "label": "?????????",
  "value": "530403" },

{
  "label": "?????????",
  "value": "530422" },

{
  "label": "?????????",
  "value": "530423" },

{
  "label": "?????????",
  "value": "530424" },

{
  "label": "?????????",
  "value": "530425" },

{
  "label": "?????????????????????",
  "value": "530426" },

{
  "label": "???????????????????????????",
  "value": "530427" },

{
  "label": "????????????????????????????????????",
  "value": "530428" }],


[{
  "label": "?????????",
  "value": "530502" },

{
  "label": "?????????",
  "value": "530521" },

{
  "label": "?????????",
  "value": "530523" },

{
  "label": "?????????",
  "value": "530524" },

{
  "label": "?????????",
  "value": "530581" }],


[{
  "label": "?????????",
  "value": "530602" },

{
  "label": "?????????",
  "value": "530621" },

{
  "label": "?????????",
  "value": "530622" },

{
  "label": "?????????",
  "value": "530623" },

{
  "label": "?????????",
  "value": "530624" },

{
  "label": "?????????",
  "value": "530625" },

{
  "label": "?????????",
  "value": "530626" },

{
  "label": "?????????",
  "value": "530627" },

{
  "label": "?????????",
  "value": "530628" },

{
  "label": "?????????",
  "value": "530629" },

{
  "label": "?????????",
  "value": "530630" }],


[{
  "label": "?????????",
  "value": "530702" },

{
  "label": "????????????????????????",
  "value": "530721" },

{
  "label": "?????????",
  "value": "530722" },

{
  "label": "?????????",
  "value": "530723" },

{
  "label": "?????????????????????",
  "value": "530724" }],


[{
  "label": "?????????",
  "value": "530802" },

{
  "label": "??????????????????????????????",
  "value": "530821" },

{
  "label": "????????????????????????",
  "value": "530822" },

{
  "label": "?????????????????????",
  "value": "530823" },

{
  "label": "???????????????????????????",
  "value": "530824" },

{
  "label": "???????????????????????????????????????",
  "value": "530825" },

{
  "label": "??????????????????????????????",
  "value": "530826" },

{
  "label": "????????????????????????????????????",
  "value": "530827" },

{
  "label": "????????????????????????",
  "value": "530828" },

{
  "label": "?????????????????????",
  "value": "530829" }],


[{
  "label": "?????????",
  "value": "530902" },

{
  "label": "?????????",
  "value": "530921" },

{
  "label": "??????",
  "value": "530922" },

{
  "label": "?????????",
  "value": "530923" },

{
  "label": "?????????",
  "value": "530924" },

{
  "label": "?????????????????????????????????????????????",
  "value": "530925" },

{
  "label": "???????????????????????????",
  "value": "530926" },

{
  "label": "?????????????????????",
  "value": "530927" }],


[{
  "label": "?????????",
  "value": "532301" },

{
  "label": "?????????",
  "value": "532322" },

{
  "label": "?????????",
  "value": "532323" },

{
  "label": "?????????",
  "value": "532324" },

{
  "label": "?????????",
  "value": "532325" },

{
  "label": "?????????",
  "value": "532326" },

{
  "label": "?????????",
  "value": "532327" },

{
  "label": "?????????",
  "value": "532328" },

{
  "label": "?????????",
  "value": "532329" },

{
  "label": "?????????",
  "value": "532331" }],


[{
  "label": "?????????",
  "value": "532501" },

{
  "label": "?????????",
  "value": "532502" },

{
  "label": "?????????",
  "value": "532503" },

{
  "label": "?????????",
  "value": "532504" },

{
  "label": "?????????????????????",
  "value": "532523" },

{
  "label": "?????????",
  "value": "532524" },

{
  "label": "?????????",
  "value": "532525" },

{
  "label": "?????????",
  "value": "532527" },

{
  "label": "?????????",
  "value": "532528" },

{
  "label": "?????????",
  "value": "532529" },

{
  "label": "?????????????????????????????????",
  "value": "532530" },

{
  "label": "?????????",
  "value": "532531" },

{
  "label": "?????????????????????",
  "value": "532532" }],


[{
  "label": "?????????",
  "value": "532601" },

{
  "label": "?????????",
  "value": "532622" },

{
  "label": "?????????",
  "value": "532623" },

{
  "label": "????????????",
  "value": "532624" },

{
  "label": "?????????",
  "value": "532625" },

{
  "label": "?????????",
  "value": "532626" },

{
  "label": "?????????",
  "value": "532627" },

{
  "label": "?????????",
  "value": "532628" }],


[{
  "label": "?????????",
  "value": "532801" },

{
  "label": "?????????",
  "value": "532822" },

{
  "label": "?????????",
  "value": "532823" }],


[{
  "label": "?????????",
  "value": "532901" },

{
  "label": "?????????????????????",
  "value": "532922" },

{
  "label": "?????????",
  "value": "532923" },

{
  "label": "?????????",
  "value": "532924" },

{
  "label": "?????????",
  "value": "532925" },

{
  "label": "?????????????????????",
  "value": "532926" },

{
  "label": "???????????????????????????",
  "value": "532927" },

{
  "label": "?????????",
  "value": "532928" },

{
  "label": "?????????",
  "value": "532929" },

{
  "label": "?????????",
  "value": "532930" },

{
  "label": "?????????",
  "value": "532931" },

{
  "label": "?????????",
  "value": "532932" }],


[{
  "label": "?????????",
  "value": "533102" },

{
  "label": "??????",
  "value": "533103" },

{
  "label": "?????????",
  "value": "533122" },

{
  "label": "?????????",
  "value": "533123" },

{
  "label": "?????????",
  "value": "533124" }],


[{
  "label": "?????????",
  "value": "533301" },

{
  "label": "?????????",
  "value": "533323" },

{
  "label": "??????????????????????????????",
  "value": "533324" },

{
  "label": "??????????????????????????????",
  "value": "533325" }],


[{
  "label": "???????????????",
  "value": "533401" },

{
  "label": "?????????",
  "value": "533422" },

{
  "label": "????????????????????????",
  "value": "533423" }]],



[
[{
  "label": "?????????",
  "value": "540102" },

{
  "label": "???????????????",
  "value": "540103" },

{
  "label": "?????????",
  "value": "540121" },

{
  "label": "?????????",
  "value": "540122" },

{
  "label": "?????????",
  "value": "540123" },

{
  "label": "?????????",
  "value": "540124" },

{
  "label": "?????????",
  "value": "540126" },

{
  "label": "???????????????",
  "value": "540127" },

{
  "label": "???????????????????????????",
  "value": "540171" },

{
  "label": "???????????????????????????",
  "value": "540172" },

{
  "label": "??????????????????????????????",
  "value": "540173" },

{
  "label": "??????????????????",
  "value": "540174" }],


[{
  "label": "????????????",
  "value": "540202" },

{
  "label": "????????????",
  "value": "540221" },

{
  "label": "?????????",
  "value": "540222" },

{
  "label": "?????????",
  "value": "540223" },

{
  "label": "?????????",
  "value": "540224" },

{
  "label": "?????????",
  "value": "540225" },

{
  "label": "?????????",
  "value": "540226" },

{
  "label": "????????????",
  "value": "540227" },

{
  "label": "?????????",
  "value": "540228" },

{
  "label": "?????????",
  "value": "540229" },

{
  "label": "?????????",
  "value": "540230" },

{
  "label": "?????????",
  "value": "540231" },

{
  "label": "?????????",
  "value": "540232" },

{
  "label": "?????????",
  "value": "540233" },

{
  "label": "?????????",
  "value": "540234" },

{
  "label": "????????????",
  "value": "540235" },

{
  "label": "?????????",
  "value": "540236" },

{
  "label": "?????????",
  "value": "540237" }],


[{
  "label": "?????????",
  "value": "540302" },

{
  "label": "?????????",
  "value": "540321" },

{
  "label": "?????????",
  "value": "540322" },

{
  "label": "????????????",
  "value": "540323" },

{
  "label": "?????????",
  "value": "540324" },

{
  "label": "?????????",
  "value": "540325" },

{
  "label": "?????????",
  "value": "540326" },

{
  "label": "?????????",
  "value": "540327" },

{
  "label": "?????????",
  "value": "540328" },

{
  "label": "?????????",
  "value": "540329" },

{
  "label": "?????????",
  "value": "540330" }],


[{
  "label": "?????????",
  "value": "540402" },

{
  "label": "???????????????",
  "value": "540421" },

{
  "label": "?????????",
  "value": "540422" },

{
  "label": "?????????",
  "value": "540423" },

{
  "label": "?????????",
  "value": "540424" },

{
  "label": "?????????",
  "value": "540425" },

{
  "label": "??????",
  "value": "540426" }],


[{
  "label": "?????????",
  "value": "540502" },

{
  "label": "?????????",
  "value": "540521" },

{
  "label": "?????????",
  "value": "540522" },

{
  "label": "?????????",
  "value": "540523" },

{
  "label": "?????????",
  "value": "540524" },

{
  "label": "?????????",
  "value": "540525" },

{
  "label": "?????????",
  "value": "540526" },

{
  "label": "?????????",
  "value": "540527" },

{
  "label": "?????????",
  "value": "540528" },

{
  "label": "?????????",
  "value": "540529" },

{
  "label": "?????????",
  "value": "540530" },

{
  "label": "????????????",
  "value": "540531" }],


[{
  "label": "?????????",
  "value": "542421" },

{
  "label": "?????????",
  "value": "542422" },

{
  "label": "?????????",
  "value": "542423" },

{
  "label": "?????????",
  "value": "542424" },

{
  "label": "?????????",
  "value": "542425" },

{
  "label": "?????????",
  "value": "542426" },

{
  "label": "??????",
  "value": "542427" },

{
  "label": "?????????",
  "value": "542428" },

{
  "label": "?????????",
  "value": "542429" },

{
  "label": "?????????",
  "value": "542430" },

{
  "label": "?????????",
  "value": "542431" }],


[{
  "label": "?????????",
  "value": "542521" },

{
  "label": "?????????",
  "value": "542522" },

{
  "label": "?????????",
  "value": "542523" },

{
  "label": "?????????",
  "value": "542524" },

{
  "label": "?????????",
  "value": "542525" },

{
  "label": "?????????",
  "value": "542526" },

{
  "label": "?????????",
  "value": "542527" }]],



[
[{
  "label": "?????????",
  "value": "610102" },

{
  "label": "?????????",
  "value": "610103" },

{
  "label": "?????????",
  "value": "610104" },

{
  "label": "?????????",
  "value": "610111" },

{
  "label": "?????????",
  "value": "610112" },

{
  "label": "?????????",
  "value": "610113" },

{
  "label": "?????????",
  "value": "610114" },

{
  "label": "?????????",
  "value": "610115" },

{
  "label": "?????????",
  "value": "610116" },

{
  "label": "?????????",
  "value": "610117" },

{
  "label": "?????????",
  "value": "610118" },

{
  "label": "?????????",
  "value": "610122" },

{
  "label": "?????????",
  "value": "610124" }],


[{
  "label": "?????????",
  "value": "610202" },

{
  "label": "?????????",
  "value": "610203" },

{
  "label": "?????????",
  "value": "610204" },

{
  "label": "?????????",
  "value": "610222" }],


[{
  "label": "?????????",
  "value": "610302" },

{
  "label": "?????????",
  "value": "610303" },

{
  "label": "?????????",
  "value": "610304" },

{
  "label": "?????????",
  "value": "610322" },

{
  "label": "?????????",
  "value": "610323" },

{
  "label": "?????????",
  "value": "610324" },

{
  "label": "??????",
  "value": "610326" },

{
  "label": "??????",
  "value": "610327" },

{
  "label": "?????????",
  "value": "610328" },

{
  "label": "?????????",
  "value": "610329" },

{
  "label": "??????",
  "value": "610330" },

{
  "label": "?????????",
  "value": "610331" }],


[{
  "label": "?????????",
  "value": "610402" },

{
  "label": "?????????",
  "value": "610403" },

{
  "label": "?????????",
  "value": "610404" },

{
  "label": "?????????",
  "value": "610422" },

{
  "label": "?????????",
  "value": "610423" },

{
  "label": "??????",
  "value": "610424" },

{
  "label": "?????????",
  "value": "610425" },

{
  "label": "?????????",
  "value": "610426" },

{
  "label": "??????",
  "value": "610427" },

{
  "label": "?????????",
  "value": "610428" },

{
  "label": "?????????",
  "value": "610429" },

{
  "label": "?????????",
  "value": "610430" },

{
  "label": "?????????",
  "value": "610431" },

{
  "label": "?????????",
  "value": "610481" }],


[{
  "label": "?????????",
  "value": "610502" },

{
  "label": "?????????",
  "value": "610503" },

{
  "label": "?????????",
  "value": "610522" },

{
  "label": "?????????",
  "value": "610523" },

{
  "label": "?????????",
  "value": "610524" },

{
  "label": "?????????",
  "value": "610525" },

{
  "label": "?????????",
  "value": "610526" },

{
  "label": "?????????",
  "value": "610527" },

{
  "label": "?????????",
  "value": "610528" },

{
  "label": "?????????",
  "value": "610581" },

{
  "label": "?????????",
  "value": "610582" }],


[{
  "label": "?????????",
  "value": "610602" },

{
  "label": "?????????",
  "value": "610603" },

{
  "label": "?????????",
  "value": "610621" },

{
  "label": "?????????",
  "value": "610622" },

{
  "label": "?????????",
  "value": "610623" },

{
  "label": "?????????",
  "value": "610625" },

{
  "label": "?????????",
  "value": "610626" },

{
  "label": "?????????",
  "value": "610627" },

{
  "label": "??????",
  "value": "610628" },

{
  "label": "?????????",
  "value": "610629" },

{
  "label": "?????????",
  "value": "610630" },

{
  "label": "?????????",
  "value": "610631" },

{
  "label": "?????????",
  "value": "610632" }],


[{
  "label": "?????????",
  "value": "610702" },

{
  "label": "?????????",
  "value": "610703" },

{
  "label": "?????????",
  "value": "610722" },

{
  "label": "??????",
  "value": "610723" },

{
  "label": "?????????",
  "value": "610724" },

{
  "label": "??????",
  "value": "610725" },

{
  "label": "?????????",
  "value": "610726" },

{
  "label": "?????????",
  "value": "610727" },

{
  "label": "?????????",
  "value": "610728" },

{
  "label": "?????????",
  "value": "610729" },

{
  "label": "?????????",
  "value": "610730" }],


[{
  "label": "?????????",
  "value": "610802" },

{
  "label": "?????????",
  "value": "610803" },

{
  "label": "?????????",
  "value": "610822" },

{
  "label": "?????????",
  "value": "610824" },

{
  "label": "?????????",
  "value": "610825" },

{
  "label": "?????????",
  "value": "610826" },

{
  "label": "?????????",
  "value": "610827" },

{
  "label": "??????",
  "value": "610828" },

{
  "label": "?????????",
  "value": "610829" },

{
  "label": "?????????",
  "value": "610830" },

{
  "label": "?????????",
  "value": "610831" },

{
  "label": "?????????",
  "value": "610881" }],


[{
  "label": "?????????",
  "value": "610902" },

{
  "label": "?????????",
  "value": "610921" },

{
  "label": "?????????",
  "value": "610922" },

{
  "label": "?????????",
  "value": "610923" },

{
  "label": "?????????",
  "value": "610924" },

{
  "label": "?????????",
  "value": "610925" },

{
  "label": "?????????",
  "value": "610926" },

{
  "label": "?????????",
  "value": "610927" },

{
  "label": "?????????",
  "value": "610928" },

{
  "label": "?????????",
  "value": "610929" }],


[{
  "label": "?????????",
  "value": "611002" },

{
  "label": "?????????",
  "value": "611021" },

{
  "label": "?????????",
  "value": "611022" },

{
  "label": "?????????",
  "value": "611023" },

{
  "label": "?????????",
  "value": "611024" },

{
  "label": "?????????",
  "value": "611025" },

{
  "label": "?????????",
  "value": "611026" }]],



[
[{
  "label": "?????????",
  "value": "620102" },

{
  "label": "????????????",
  "value": "620103" },

{
  "label": "?????????",
  "value": "620104" },

{
  "label": "?????????",
  "value": "620105" },

{
  "label": "?????????",
  "value": "620111" },

{
  "label": "?????????",
  "value": "620121" },

{
  "label": "?????????",
  "value": "620122" },

{
  "label": "?????????",
  "value": "620123" },

{
  "label": "????????????",
  "value": "620171" }],


[{
  "label": "????????????",
  "value": "620201" }],

[{
  "label": "?????????",
  "value": "620302" },

{
  "label": "?????????",
  "value": "620321" }],


[{
  "label": "?????????",
  "value": "620402" },

{
  "label": "?????????",
  "value": "620403" },

{
  "label": "?????????",
  "value": "620421" },

{
  "label": "?????????",
  "value": "620422" },

{
  "label": "?????????",
  "value": "620423" }],


[{
  "label": "?????????",
  "value": "620502" },

{
  "label": "?????????",
  "value": "620503" },

{
  "label": "?????????",
  "value": "620521" },

{
  "label": "?????????",
  "value": "620522" },

{
  "label": "?????????",
  "value": "620523" },

{
  "label": "?????????",
  "value": "620524" },

{
  "label": "????????????????????????",
  "value": "620525" }],


[{
  "label": "?????????",
  "value": "620602" },

{
  "label": "?????????",
  "value": "620621" },

{
  "label": "?????????",
  "value": "620622" },

{
  "label": "?????????????????????",
  "value": "620623" }],


[{
  "label": "?????????",
  "value": "620702" },

{
  "label": "????????????????????????",
  "value": "620721" },

{
  "label": "?????????",
  "value": "620722" },

{
  "label": "?????????",
  "value": "620723" },

{
  "label": "?????????",
  "value": "620724" },

{
  "label": "?????????",
  "value": "620725" }],


[{
  "label": "?????????",
  "value": "620802" },

{
  "label": "?????????",
  "value": "620821" },

{
  "label": "?????????",
  "value": "620822" },

{
  "label": "?????????",
  "value": "620823" },

{
  "label": "?????????",
  "value": "620824" },

{
  "label": "?????????",
  "value": "620825" },

{
  "label": "?????????",
  "value": "620826" },

{
  "label": "??????????????????",
  "value": "620871" }],


[{
  "label": "?????????",
  "value": "620902" },

{
  "label": "?????????",
  "value": "620921" },

{
  "label": "?????????",
  "value": "620922" },

{
  "label": "????????????????????????",
  "value": "620923" },

{
  "label": "??????????????????????????????",
  "value": "620924" },

{
  "label": "?????????",
  "value": "620981" },

{
  "label": "?????????",
  "value": "620982" }],


[{
  "label": "?????????",
  "value": "621002" },

{
  "label": "?????????",
  "value": "621021" },

{
  "label": "??????",
  "value": "621022" },

{
  "label": "?????????",
  "value": "621023" },

{
  "label": "?????????",
  "value": "621024" },

{
  "label": "?????????",
  "value": "621025" },

{
  "label": "??????",
  "value": "621026" },

{
  "label": "?????????",
  "value": "621027" }],


[{
  "label": "?????????",
  "value": "621102" },

{
  "label": "?????????",
  "value": "621121" },

{
  "label": "?????????",
  "value": "621122" },

{
  "label": "?????????",
  "value": "621123" },

{
  "label": "?????????",
  "value": "621124" },

{
  "label": "??????",
  "value": "621125" },

{
  "label": "??????",
  "value": "621126" }],


[{
  "label": "?????????",
  "value": "621202" },

{
  "label": "??????",
  "value": "621221" },

{
  "label": "??????",
  "value": "621222" },

{
  "label": "?????????",
  "value": "621223" },

{
  "label": "??????",
  "value": "621224" },

{
  "label": "?????????",
  "value": "621225" },

{
  "label": "??????",
  "value": "621226" },

{
  "label": "??????",
  "value": "621227" },

{
  "label": "?????????",
  "value": "621228" }],


[{
  "label": "?????????",
  "value": "622901" },

{
  "label": "?????????",
  "value": "622921" },

{
  "label": "?????????",
  "value": "622922" },

{
  "label": "?????????",
  "value": "622923" },

{
  "label": "?????????",
  "value": "622924" },

{
  "label": "?????????",
  "value": "622925" },

{
  "label": "??????????????????",
  "value": "622926" },

{
  "label": "?????????????????????????????????????????????",
  "value": "622927" }],


[{
  "label": "?????????",
  "value": "623001" },

{
  "label": "?????????",
  "value": "623021" },

{
  "label": "?????????",
  "value": "623022" },

{
  "label": "?????????",
  "value": "623023" },

{
  "label": "?????????",
  "value": "623024" },

{
  "label": "?????????",
  "value": "623025" },

{
  "label": "?????????",
  "value": "623026" },

{
  "label": "?????????",
  "value": "623027" }]],



[
[{
  "label": "?????????",
  "value": "630102" },

{
  "label": "?????????",
  "value": "630103" },

{
  "label": "?????????",
  "value": "630104" },

{
  "label": "?????????",
  "value": "630105" },

{
  "label": "???????????????????????????",
  "value": "630121" },

{
  "label": "?????????",
  "value": "630122" },

{
  "label": "?????????",
  "value": "630123" }],


[{
  "label": "?????????",
  "value": "630202" },

{
  "label": "?????????",
  "value": "630203" },

{
  "label": "???????????????????????????",
  "value": "630222" },

{
  "label": "?????????????????????",
  "value": "630223" },

{
  "label": "?????????????????????",
  "value": "630224" },

{
  "label": "????????????????????????",
  "value": "630225" }],


[{
  "label": "?????????????????????",
  "value": "632221" },

{
  "label": "?????????",
  "value": "632222" },

{
  "label": "?????????",
  "value": "632223" },

{
  "label": "?????????",
  "value": "632224" }],


[{
  "label": "?????????",
  "value": "632321" },

{
  "label": "?????????",
  "value": "632322" },

{
  "label": "?????????",
  "value": "632323" },

{
  "label": "????????????????????????",
  "value": "632324" }],


[{
  "label": "?????????",
  "value": "632521" },

{
  "label": "?????????",
  "value": "632522" },

{
  "label": "?????????",
  "value": "632523" },

{
  "label": "?????????",
  "value": "632524" },

{
  "label": "?????????",
  "value": "632525" }],


[{
  "label": "?????????",
  "value": "632621" },

{
  "label": "?????????",
  "value": "632622" },

{
  "label": "?????????",
  "value": "632623" },

{
  "label": "?????????",
  "value": "632624" },

{
  "label": "?????????",
  "value": "632625" },

{
  "label": "?????????",
  "value": "632626" }],


[{
  "label": "?????????",
  "value": "632701" },

{
  "label": "?????????",
  "value": "632722" },

{
  "label": "?????????",
  "value": "632723" },

{
  "label": "?????????",
  "value": "632724" },

{
  "label": "?????????",
  "value": "632725" },

{
  "label": "????????????",
  "value": "632726" }],


[{
  "label": "????????????",
  "value": "632801" },

{
  "label": "????????????",
  "value": "632802" },

{
  "label": "?????????",
  "value": "632821" },

{
  "label": "?????????",
  "value": "632822" },

{
  "label": "?????????",
  "value": "632823" },

{
  "label": "????????????????????????",
  "value": "632857" },

{
  "label": "?????????????????????",
  "value": "632858" },

{
  "label": "?????????????????????",
  "value": "632859" }]],



[
[{
  "label": "?????????",
  "value": "640104" },

{
  "label": "?????????",
  "value": "640105" },

{
  "label": "?????????",
  "value": "640106" },

{
  "label": "?????????",
  "value": "640121" },

{
  "label": "?????????",
  "value": "640122" },

{
  "label": "?????????",
  "value": "640181" }],


[{
  "label": "????????????",
  "value": "640202" },

{
  "label": "?????????",
  "value": "640205" },

{
  "label": "?????????",
  "value": "640221" }],


[{
  "label": "?????????",
  "value": "640302" },

{
  "label": "????????????",
  "value": "640303" },

{
  "label": "?????????",
  "value": "640323" },

{
  "label": "?????????",
  "value": "640324" },

{
  "label": "????????????",
  "value": "640381" }],


[{
  "label": "?????????",
  "value": "640402" },

{
  "label": "?????????",
  "value": "640422" },

{
  "label": "?????????",
  "value": "640423" },

{
  "label": "?????????",
  "value": "640424" },

{
  "label": "?????????",
  "value": "640425" }],


[{
  "label": "????????????",
  "value": "640502" },

{
  "label": "?????????",
  "value": "640521" },

{
  "label": "?????????",
  "value": "640522" }]],



[
[{
  "label": "?????????",
  "value": "650102" },

{
  "label": "???????????????",
  "value": "650103" },

{
  "label": "?????????",
  "value": "650104" },

{
  "label": "????????????",
  "value": "650105" },

{
  "label": "????????????",
  "value": "650106" },

{
  "label": "????????????",
  "value": "650107" },

{
  "label": "?????????",
  "value": "650109" },

{
  "label": "???????????????",
  "value": "650121" },

{
  "label": "?????????????????????????????????",
  "value": "650171" },

{
  "label": "???????????????????????????????????????",
  "value": "650172" }],


[{
  "label": "????????????",
  "value": "650202" },

{
  "label": "???????????????",
  "value": "650203" },

{
  "label": "????????????",
  "value": "650204" },

{
  "label": "????????????",
  "value": "650205" }],


[{
  "label": "?????????",
  "value": "650402" },

{
  "label": "?????????",
  "value": "650421" },

{
  "label": "????????????",
  "value": "650422" }],


[{
  "label": "?????????",
  "value": "650502" },

{
  "label": "???????????????????????????",
  "value": "650521" },

{
  "label": "?????????",
  "value": "650522" }],


[{
  "label": "?????????",
  "value": "652301" },

{
  "label": "?????????",
  "value": "652302" },

{
  "label": "????????????",
  "value": "652323" },

{
  "label": "????????????",
  "value": "652324" },

{
  "label": "?????????",
  "value": "652325" },

{
  "label": "???????????????",
  "value": "652327" },

{
  "label": "????????????????????????",
  "value": "652328" }],


[{
  "label": "?????????",
  "value": "652701" },

{
  "label": "???????????????",
  "value": "652702" },

{
  "label": "?????????",
  "value": "652722" },

{
  "label": "?????????",
  "value": "652723" }],


[{
  "label": "????????????",
  "value": "652801" },

{
  "label": "?????????",
  "value": "652822" },

{
  "label": "?????????",
  "value": "652823" },

{
  "label": "?????????",
  "value": "652824" },

{
  "label": "?????????",
  "value": "652825" },

{
  "label": "?????????????????????",
  "value": "652826" },

{
  "label": "?????????",
  "value": "652827" },

{
  "label": "?????????",
  "value": "652828" },

{
  "label": "?????????",
  "value": "652829" },

{
  "label": "??????????????????????????????",
  "value": "652871" }],


[{
  "label": "????????????",
  "value": "652901" },

{
  "label": "?????????",
  "value": "652922" },

{
  "label": "?????????",
  "value": "652923" },

{
  "label": "?????????",
  "value": "652924" },

{
  "label": "?????????",
  "value": "652925" },

{
  "label": "?????????",
  "value": "652926" },

{
  "label": "?????????",
  "value": "652927" },

{
  "label": "????????????",
  "value": "652928" },

{
  "label": "?????????",
  "value": "652929" }],


[{
  "label": "????????????",
  "value": "653001" },

{
  "label": "????????????",
  "value": "653022" },

{
  "label": "????????????",
  "value": "653023" },

{
  "label": "?????????",
  "value": "653024" }],


[{
  "label": "?????????",
  "value": "653101" },

{
  "label": "?????????",
  "value": "653121" },

{
  "label": "?????????",
  "value": "653122" },

{
  "label": "????????????",
  "value": "653123" },

{
  "label": "?????????",
  "value": "653124" },

{
  "label": "?????????",
  "value": "653125" },

{
  "label": "?????????",
  "value": "653126" },

{
  "label": "????????????",
  "value": "653127" },

{
  "label": "????????????",
  "value": "653128" },

{
  "label": "?????????",
  "value": "653129" },

{
  "label": "?????????",
  "value": "653130" },

{
  "label": "?????????????????????????????????",
  "value": "653131" }],


[{
  "label": "?????????",
  "value": "653201" },

{
  "label": "?????????",
  "value": "653221" },

{
  "label": "?????????",
  "value": "653222" },

{
  "label": "?????????",
  "value": "653223" },

{
  "label": "?????????",
  "value": "653224" },

{
  "label": "?????????",
  "value": "653225" },

{
  "label": "?????????",
  "value": "653226" },

{
  "label": "?????????",
  "value": "653227" }],


[{
  "label": "?????????",
  "value": "654002" },

{
  "label": "?????????",
  "value": "654003" },

{
  "label": "???????????????",
  "value": "654004" },

{
  "label": "?????????",
  "value": "654021" },

{
  "label": "???????????????????????????",
  "value": "654022" },

{
  "label": "?????????",
  "value": "654023" },

{
  "label": "?????????",
  "value": "654024" },

{
  "label": "?????????",
  "value": "654025" },

{
  "label": "?????????",
  "value": "654026" },

{
  "label": "????????????",
  "value": "654027" },

{
  "label": "????????????",
  "value": "654028" }],


[{
  "label": "?????????",
  "value": "654201" },

{
  "label": "?????????",
  "value": "654202" },

{
  "label": "?????????",
  "value": "654221" },

{
  "label": "?????????",
  "value": "654223" },

{
  "label": "?????????",
  "value": "654224" },

{
  "label": "?????????",
  "value": "654225" },

{
  "label": "??????????????????????????????",
  "value": "654226" }],


[{
  "label": "????????????",
  "value": "654301" },

{
  "label": "????????????",
  "value": "654321" },

{
  "label": "?????????",
  "value": "654322" },

{
  "label": "?????????",
  "value": "654323" },

{
  "label": "????????????",
  "value": "654324" },

{
  "label": "?????????",
  "value": "654325" },

{
  "label": "????????????",
  "value": "654326" }],


[{
  "label": "????????????",
  "value": "659001" },

{
  "label": "????????????",
  "value": "659002" },

{
  "label": "???????????????",
  "value": "659003" },

{
  "label": "????????????",
  "value": "659004" },

{
  "label": "????????????",
  "value": "659006" }]],



[
[{
  "label": "??????",
  "value": "660101" }],

[{
  "label": "??????",
  "value": "660201" }],

[{
  "label": "??????",
  "value": "660301" }],

[{
  "label": "??????",
  "value": "660401" }],

[{
  "label": "??????",
  "value": "660501" }],

[{
  "label": "??????",
  "value": "660601" }],

[{
  "label": "??????",
  "value": "660701" }],

[{
  "label": "??????",
  "value": "660801" }],

[{
  "label": "??????",
  "value": "660901" }],

[{
  "label": "??????",
  "value": "661001" }],

[{
  "label": "??????",
  "value": "661101" }],

[{
  "label": "??????",
  "value": "661201" }],

[{
  "label": "??????",
  "value": "661301" }],

[{
  "label": "??????",
  "value": "661401" }],

[{
  "label": "??????",
  "value": "661501" }],

[{
  "label": "??????",
  "value": "661601" }],

[{
  "label": "??????",
  "value": "661701" }]],


[
[{
  "label": "?????????",
  "value": "670101" }],

[{
  "label": "??????",
  "value": "670201" }],

[{
  "label": "??????",
  "value": "670301" }]],


[
[{
  "label": "????????????",
  "value": "680101" }],

[{
  "label": "?????????",
  "value": "680201" }],

[{
  "label": "?????????",
  "value": "680301" }],

[{
  "label": "?????????",
  "value": "680401" }]]];var _default =



areaData;exports.default = _default;

/***/ }),

/***/ 55:
/*!************************************************!*\
  !*** F:/hear/hear/libs/function/timeFormat.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart ??? polyfill????????????????????????????????????????????????es7???padStart????????????????????????????????????
// ???????????????????????????polyfill???????????????
if (!String.prototype.padStart) {
  // ???????????????????????? fillString ??????ES6 ?????????????????????????????????
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // ?????? String(str) ????????????????????????????????????????????????????????????????????????????????????
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

function timeFormat() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // ?????????????????????????????????:
  // yyyy:mm:dd|yyyy:mm|yyyy???mm???dd???|yyyy???mm???dd??? hh???MM??????,??????????????????
  timestamp = parseInt(timestamp);
  // ?????????null,????????????????????????
  if (!timestamp) timestamp = Number(new Date());
  // ????????????????????????????????????????????????,????????????js???????????????????????????(13???),????????????????????????(10???)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var date = new Date(timestamp);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // ???
    "m+": (date.getMonth() + 1).toString(), // ???
    "d+": date.getDate().toString(), // ???
    "h+": date.getHours().toString(), // ???
    "M+": date.getMinutes().toString(), // ???
    "s+": date.getSeconds().toString() // ???
    // ???????????????????????????????????????????????????????????????????????????
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 56:
/*!**********************************************!*\
  !*** F:/hear/hear/libs/function/timeFrom.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 55));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * ???????????????????????????
                                                                                                                                                                                                                                                                                          * @param String timestamp ?????????
                                                                                                                                                                                                                                                                                          * @param String | Boolean format ??????????????????????????????????????????????????????????????????????????????????????????
                                                                                                                                                                                                                                                                                          * ??????????????????false??????????????????????????????????????????????????????
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // ????????????????????????????????????????????????,????????????js???????????????????????????(13???),????????????????????????(10???)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // ????????????5??????,?????????"??????",??????????????????
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '??????';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '?????????';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '?????????';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '??????';
      break;
    default:
      // ??????format???false???????????????????????????????????????xx??????
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '?????????';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '??????';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 57:
/*!***************************************************!*\
  !*** F:/hear/hear/libs/function/colorGradient.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * ?????????????????????????????????
                                                                                                      * @param {string} startColor ???????????????
                                                                                                      * @param {string} endColor ???????????????
                                                                                                      * @param {number} step ?????????????????????
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //?????????rgb????????????
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //?????????
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //??????????????????hex??? 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// ???hex?????????????????????rgb????????????(????????????rgb????????????)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //????????????????????????
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// ???rgb?????????????????????hex????????????
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // ????????????rgb?????????2???
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex };exports.default = _default;

/***/ }),

/***/ 58:
/*!******************************************!*\
  !*** F:/hear/hear/libs/function/guid.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * ????????????????????????????????????????????????https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * ????????????????????????uuid???Globally Unique Identifier???,????????? uuid(Universally Unique IDentifier) 
                                                                                                      * ??????????????????????????????,??????????????????????????????,??????v-for???????????????,?????????????????????index???????????????????????????????????????
                                                                                                      * ?????????????????????????????????item????????????????????????"?????????"?????????????????????,?????????????????????????????????????????????
                                                                                                      * v-for?????????,???????????????????????????id??????????????????index
                                                                                                      * @param {Number} len uuid?????????
                                                                                                      * @param {Boolean} firstU ???????????????????????????"u"
                                                                                                      * @param {Nubmer} radix ??????uuid?????????(?????????????????????????????????????????????),2-?????????,8-?????????,10-?????????,16-????????????
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // ????????????uuid??????,????????????????????????,0|x????????????,?????????x????????????,???????????????
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122?????????????????????uuid???,???????????????????????????
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // ?????????????????????,??????u??????,?????????????????????????????????,???guuid????????????id??????class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 583:
/*!*****************************************************!*\
  !*** F:/hear/hear/components/lime-painter/utils.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.isNumber = isNumber;exports.toPx = toPx;exports.compareVersion = compareVersion;exports.base64ToPath = base64ToPath;exports.pathToBase64 = pathToBase64;exports.CHAR_WIDTH_SCALE_MAP = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}var screen = uni.getSystemInfoSync().windowWidth / 750;
function isNumber(value) {
  return /^-?\d+(\.\d+)?$/.test(value);
}
function toPx(value, baseSize) {
  // ???????????????
  if (typeof value === 'number') {
    return value;
  }
  // ????????????????????????
  if (isNumber(value)) {
    return value * 1;
  }
  // ???????????????
  if (typeof value === 'string') {
    var reg = /^-?[0-9]+([.]{1}[0-9]+){0,1}(rpx|px|%)$/g;
    var results = reg.exec(value);
    if (!value || !results) {
      return 0;
    }
    var unit = results[2];
    value = parseFloat(value);
    var res = 0;
    if (unit === 'rpx') {
      res = Math.floor(value * (screen || 0.5) * 1);
    } else if (unit === 'px') {
      res = Math.floor(value * 1);
    } else if (unit === '%') {
      res = Math.floor(value * toPx(baseSize) / 100);
    }
    return res;
  }
}

// ????????????
function compareVersion(v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  var len = Math.max(v1.length, v2.length);
  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }
  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i], 10);
    var num2 = parseInt(v2[i], 10);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }
  return 0;
}

/** ??? 0x20 ????????? 0x80 ????????????????????? */
var CHAR_WIDTH_SCALE_MAP = [0.296, 0.313, 0.436, 0.638, 0.586, 0.89, 0.87, 0.256, 0.334, 0.334, 0.455, 0.742,
0.241, 0.433, 0.241, 0.427, 0.586, 0.586, 0.586, 0.586, 0.586, 0.586, 0.586, 0.586, 0.586, 0.586, 0.241, 0.241, 0.742,
0.742, 0.742, 0.483, 1.031, 0.704, 0.627, 0.669, 0.762, 0.55, 0.531, 0.744, 0.773, 0.294, 0.396, 0.635, 0.513, 0.977,
0.813, 0.815, 0.612, 0.815, 0.653, 0.577, 0.573, 0.747, 0.676, 1.018, 0.645, 0.604, 0.62, 0.334, 0.416, 0.334, 0.742,
0.448, 0.295, 0.553, 0.639, 0.501, 0.64, 0.567, 0.347, 0.64, 0.616, 0.266, 0.267, 0.544, 0.266, 0.937, 0.616, 0.636,
0.639, 0.64, 0.382, 0.463, 0.373, 0.616, 0.525, 0.79, 0.507, 0.529, 0.492, 0.334, 0.269, 0.334, 0.742, 0.296];exports.CHAR_WIDTH_SCALE_MAP = CHAR_WIDTH_SCALE_MAP;


var prefix = function prefix() {




  return wx;













};

var base64ToArrayBuffer = function base64ToArrayBuffer(data) {
  /**
                                                               * base64ToArrayBuffer
                                                               * Base64Binary.decode(base64_string);  
                                                               * Base64Binary.decodeArrayBuffer(base64_string); 
                                                               */
  var Base64Binary = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    /* will return a  Uint8Array type */
    decodeArrayBuffer: function decodeArrayBuffer(input) {
      var bytes = input.length / 4 * 3;
      var ab = new ArrayBuffer(bytes);
      this.decode(input, ab);
      return ab;
    },

    removePaddingChars: function removePaddingChars(input) {
      var lkey = this._keyStr.indexOf(input.charAt(input.length - 1));
      if (lkey == 64) {
        return input.substring(0, input.length - 1);
      }
      return input;
    },

    decode: function decode(input, arrayBuffer) {
      //get last chars to see if are valid
      input = this.removePaddingChars(input);
      input = this.removePaddingChars(input);

      var bytes = parseInt(input.length / 4 * 3, 10);

      var uarray;
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      var j = 0;

      if (arrayBuffer)
      uarray = new Uint8Array(arrayBuffer);else

      uarray = new Uint8Array(bytes);

      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

      for (i = 0; i < bytes; i += 3) {
        //get the 3 octects in 4 ascii chars
        enc1 = this._keyStr.indexOf(input.charAt(j++));
        enc2 = this._keyStr.indexOf(input.charAt(j++));
        enc3 = this._keyStr.indexOf(input.charAt(j++));
        enc4 = this._keyStr.indexOf(input.charAt(j++));

        chr1 = enc1 << 2 | enc2 >> 4;
        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
        chr3 = (enc3 & 3) << 6 | enc4;

        uarray[i] = chr1;
        if (enc3 != 64) uarray[i + 1] = chr2;
        if (enc4 != 64) uarray[i + 2] = chr3;
      }
      return uarray;
    } };

  return uni.base64ToArrayBuffer && uni.base64ToArrayBuffer(data) || Base64Binary.decodeArrayBuffer(data);
};


/**
    * base64?????????
    * @param {Object} base64
    */
function base64ToPath(base64) {var _ref =
  /data:image\/(\w+);base64,(.*)/.exec(base64) || [],_ref2 = _slicedToArray(_ref, 3),format = _ref2[1],bodyData = _ref2[2];

  return new Promise(function (resolve, reject) {

    var fs = uni.getFileSystemManager();

    //??????????????????
    if (!format) {
      console.error('ERROR_BASE64SRC_PARSE');
      reject(new Error('ERROR_BASE64SRC_PARSE'));
    }
    var time = new Date().getTime();
    var pre = prefix();
    var filePath = "".concat(pre.env.USER_DATA_PATH, "/").concat(time, ".").concat(format);
    var buffer = base64ToArrayBuffer(bodyData);
    fs.writeFile({
      filePath: filePath,
      data: buffer,
      encoding: 'binary',
      success: function success() {
        resolve(filePath);
      },
      fail: function fail(err) {
        console.error('??????base64????????????', JSON.stringify(err));
        reject(err);
      } });














































  });
}

function pathToBase64(path) {
  return new Promise(function (resolve, reject) {








































































    if (uni.canIUse('getFileSystemManager')) {
      uni.getFileSystemManager().readFile({
        filePath: path,
        encoding: 'base64',
        success: function success(res) {
          resolve('data:image/png;base64,' + res.data);
        },
        fail: function fail(error) {
          console.error('urlToBase64 error:', JSON.stringify(error));
          reject(error);
        } });

    }























  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 584:
/*!****************************************************!*\
  !*** F:/hear/hear/components/lime-painter/draw.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.Draw = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 8));var _utils = __webpack_require__(/*! ./utils */ 583);
var _gradient = __webpack_require__(/*! ./gradient */ 585);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e2) {throw _e2;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e3) {didErr = true;err = _e3;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}
var id = 0;
var cache = {};var
Draw = /*#__PURE__*/function () {
  function Draw(context, canvas) {var use2dCanvas = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;var isH5PathToBase64 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;_classCallCheck(this, Draw);
    this.ctx = context;
    this.canvas = canvas || null;
    this.use2dCanvas = use2dCanvas;
    this.isH5PathToBase64 = isH5PathToBase64;
  }_createClass(Draw, [{ key: "roundRect", value: function roundRect(
    x, y, w, h, r) {var fill = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;var stroke = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      if (r < 0) return;
      var ctx = this.ctx;
      ctx.beginPath();
      if (!r) {
        ctx.rect(x, y, w, h);
      } else if (typeof r === 'number' && [0, 1, -1].includes(w - r * 2) && [0, 1, -1].includes(h - r * 2)) {
        ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 2);
      } else {var _ref2;var _ref =





        r || (_ref2 = { r: r }, _defineProperty(_ref2, "r", r), _defineProperty(_ref2, "r", r), _defineProperty(_ref2, "r", r), _ref2),_ref$borderTopLeftRad = _ref.borderTopLeftRadius,tl = _ref$borderTopLeftRad === void 0 ? r || 0 : _ref$borderTopLeftRad,_ref$borderTopRightRa = _ref.borderTopRightRadius,tr = _ref$borderTopRightRa === void 0 ? r || 0 : _ref$borderTopRightRa,_ref$borderBottomRigh = _ref.borderBottomRightRadius,br = _ref$borderBottomRigh === void 0 ? r || 0 : _ref$borderBottomRigh,_ref$borderBottomLeft = _ref.borderBottomLeftRadius,bl = _ref$borderBottomLeft === void 0 ? r || 0 : _ref$borderBottomLeft;
        ctx.beginPath();
        // ?????????
        ctx.arc(x + w - br, y + h - br, br, 0, Math.PI * 0.5);
        ctx.lineTo(x + bl, y + h);
        // ?????????
        ctx.arc(x + bl, y + h - bl, bl, Math.PI * 0.5, Math.PI);
        ctx.lineTo(x, y + tl);
        // ?????????
        ctx.arc(x + tl, y + tl, tl, Math.PI, Math.PI * 1.5);
        ctx.lineTo(x + w - tr, y);
        // ?????????
        ctx.arc(x + w - tr, y + tr, tr, Math.PI * 1.5, Math.PI * 2);
        ctx.lineTo(x + w, y - br);

      }
      ctx.closePath();
      if (stroke) ctx.stroke();
      if (fill) ctx.fill();
    } }, { key: "measureText", value: function measureText(
    text, fontSize) {
      var ctx = this.ctx;

      return ctx.measureText(text).width;









    } }, { key: "setFont", value: function setFont(_ref3)
    {var _ref3$fontFamily = _ref3.fontFamily,fontFamily = _ref3$fontFamily === void 0 ? 'sans-serif' : _ref3$fontFamily,_ref3$fontSize = _ref3.fontSize,fontSize = _ref3$fontSize === void 0 ? 14 : _ref3$fontSize,_ref3$fontWeight = _ref3.fontWeight,fontWeight = _ref3$fontWeight === void 0 ? 'normal' : _ref3$fontWeight,_ref3$textStyle = _ref3.textStyle,textStyle = _ref3$textStyle === void 0 ? 'normal' : _ref3$textStyle;
      var ctx = this.ctx;
      // ????????????

      // fontWeight = fontWeight == 'bold' ? 'bold' : 'normal'
      // textStyle = textStyle == 'italic' ? 'italic' : 'normal'





      fontSize = (0, _utils.toPx)(fontSize);
      ctx.font = "".concat(textStyle, " ").concat(fontWeight, " ").concat(fontSize, "px ").concat(fontFamily);
    } }, { key: "setTransform", value: function setTransform(
    box, _ref4) {var transform = _ref4.transform;
      var ctx = this.ctx;var _ref5 =








      transform || {},_ref5$scaleX = _ref5.scaleX,scaleX = _ref5$scaleX === void 0 ? 1 : _ref5$scaleX,_ref5$scaleY = _ref5.scaleY,scaleY = _ref5$scaleY === void 0 ? 1 : _ref5$scaleY,_ref5$translateX = _ref5.translateX,translateX = _ref5$translateX === void 0 ? 0 : _ref5$translateX,_ref5$translateY = _ref5.translateY,translateY = _ref5$translateY === void 0 ? 0 : _ref5$translateY,_ref5$rotate = _ref5.rotate,rotate = _ref5$rotate === void 0 ? 0 : _ref5$rotate,_ref5$skewX = _ref5.skewX,skewX = _ref5$skewX === void 0 ? 0 : _ref5$skewX,_ref5$skewY = _ref5.skewY,skewY = _ref5$skewY === void 0 ? 0 : _ref5$skewY;var

      x =



      box.left,y = box.top,w = box.width,h = box.height;

      ctx.scale(scaleX, scaleY);
      //  transform(scaleX, 0, 0, scaleY, 0, 0)
      ctx.translate(
      w * (scaleX > 0 ? 1 : -1) / 2 + (x + translateX) / scaleX,
      h * (scaleY > 0 ? 1 : -1) / 2 + (y + translateY) / scaleY);

      if (rotate) {
        ctx.rotate(rotate * Math.PI / 180);
        // ctx.transform( Math.cos(a), Math.sin(a), -Math.sin(a),  Math.cos(a), 0, 0);
      }
      if (skewX || skewY) {
        ctx.transform(1, Math.tan(skewY * Math.PI / 180), Math.tan(skewX * Math.PI / 180), 1, 0, 0);
        // ctx.transform(1, tanx, tany, 1, 0, 0);
      }
    } }, { key: "setBackground", value: function setBackground(
    bd, w, h) {
      var ctx = this.ctx;
      if (!bd) {

        ctx.setFillStyle('transparent');




      } else if (_gradient.GD.isGradient(bd)) {
        _gradient.GD.doGradient(bd, w, h, ctx);
      } else {
        ctx.setFillStyle(bd);
      }
    } }, { key: "setShadow", value: function setShadow(_ref6)
    {var _ref6$boxShadow = _ref6.boxShadow,boxShadow = _ref6$boxShadow === void 0 ? [] : _ref6$boxShadow;
      var ctx = this.ctx;
      if (boxShadow.length) {var _boxShadow = _slicedToArray(
        boxShadow, 4),x = _boxShadow[0],y = _boxShadow[1],b = _boxShadow[2],c = _boxShadow[3];
        ctx.setShadow(x, y, b, c);
      }
    } }, { key: "setBorder", value: function setBorder(
    box, style) {var _ref13,_this = this;
      var ctx = this.ctx;var

      x =



      box.left,y = box.top,w = box.width,h = box.height;var
      border = style.border,borderBottom = style.borderBottom,borderTop = style.borderTop,borderRight = style.borderRight,borderLeft = style.borderLeft,r = style.borderRadius;var _ref7 =




      border || {},_ref7$borderWidth = _ref7.borderWidth,bw = _ref7$borderWidth === void 0 ? 0 : _ref7$borderWidth,bs = _ref7.borderStyle,bc = _ref7.borderColor;var _ref8 =




      borderBottom || {},_ref8$borderBottomWid = _ref8.borderBottomWidth,bbw = _ref8$borderBottomWid === void 0 ? bw : _ref8$borderBottomWid,_ref8$borderBottomSty = _ref8.borderBottomStyle,bbs = _ref8$borderBottomSty === void 0 ? bs : _ref8$borderBottomSty,_ref8$borderBottomCol = _ref8.borderBottomColor,bbc = _ref8$borderBottomCol === void 0 ? bc : _ref8$borderBottomCol;var _ref9 =




      borderTop || {},_ref9$borderTopWidth = _ref9.borderTopWidth,btw = _ref9$borderTopWidth === void 0 ? bw : _ref9$borderTopWidth,_ref9$borderTopStyle = _ref9.borderTopStyle,bts = _ref9$borderTopStyle === void 0 ? bs : _ref9$borderTopStyle,_ref9$borderTopColor = _ref9.borderTopColor,btc = _ref9$borderTopColor === void 0 ? bc : _ref9$borderTopColor;var _ref10 =




      borderRight || {},_ref10$borderRightWid = _ref10.borderRightWidth,brw = _ref10$borderRightWid === void 0 ? bw : _ref10$borderRightWid,_ref10$borderRightSty = _ref10.borderRightStyle,brs = _ref10$borderRightSty === void 0 ? bs : _ref10$borderRightSty,_ref10$borderRightCol = _ref10.borderRightColor,brc = _ref10$borderRightCol === void 0 ? bc : _ref10$borderRightCol;var _ref11 =




      borderLeft || {},_ref11$borderLeftWidt = _ref11.borderLeftWidth,blw = _ref11$borderLeftWidt === void 0 ? bw : _ref11$borderLeftWidt,_ref11$borderLeftStyl = _ref11.borderLeftStyle,bls = _ref11$borderLeftStyl === void 0 ? bs : _ref11$borderLeftStyl,_ref11$borderLeftColo = _ref11.borderLeftColor,blc = _ref11$borderLeftColo === void 0 ? bc : _ref11$borderLeftColo;var _ref12 =






      r || (_ref13 = { r: r }, _defineProperty(_ref13, "r", r), _defineProperty(_ref13, "r", r), _defineProperty(_ref13, "r", r), _ref13),_ref12$borderTopLeftR = _ref12.borderTopLeftRadius,tl = _ref12$borderTopLeftR === void 0 ? r || 0 : _ref12$borderTopLeftR,_ref12$borderTopRight = _ref12.borderTopRightRadius,tr = _ref12$borderTopRight === void 0 ? r || 0 : _ref12$borderTopRight,_ref12$borderBottomRi = _ref12.borderBottomRightRadius,br = _ref12$borderBottomRi === void 0 ? r || 0 : _ref12$borderBottomRi,_ref12$borderBottomLe = _ref12.borderBottomLeftRadius,bl = _ref12$borderBottomLe === void 0 ? r || 0 : _ref12$borderBottomLe;
      if (!borderBottom && !borderLeft && !borderTop && !borderRight && !border) return;
      var _borderType = function _borderType(w, s, c) {
        if (s == 'dashed') {

          ctx.setLineDash([Math.ceil(w * 4 / 3), Math.ceil(w * 4 / 3)]);




        } else if (s == 'dotted') {
          ctx.setLineDash([w, w]);
        }
        ctx.setStrokeStyle(c);
      };
      var _setBorder = function _setBorder(x1, y1, x2, y2, x3, y3, r1, r2, p1, p2, p3, bw, bs, bc) {
        ctx.save();
        _this.setTransform(box, style);
        ctx.lineWidth = bw;
        _borderType(bw, bs, bc);
        ctx.beginPath();
        ctx.arc(x1, y1, r1, Math.PI * p1, Math.PI * p2);
        ctx.lineTo(x2, y2);
        ctx.arc(x3, y3, r2, Math.PI * p2, Math.PI * p3);
        ctx.stroke();
        ctx.restore();
      };

      if (border) {
        ctx.save();
        this.setTransform(box, style);
        _borderType(bw, bs, bc);
        this.roundRect(-w / 2, -h / 2, w, h, r, false, bc ? true : false);
        ctx.restore();
      }
      x = -w / 2;
      y = -h / 2;
      if (borderBottom) {
        _setBorder(x + w - br, y + h - br, x + bl, y + h, x + bl, y + h - bl, br, bl, 0.25, 0.5, 0.75, bbw, bbs, bbc);
      }
      if (borderLeft) {
        // ?????????
        _setBorder(x + bl, y + h - bl, x, y + tl, x + tl, y + tl, bl, tl, 0.75, 1, 1.25, blw, bls, blc);
      }
      if (borderTop) {
        // ?????????
        _setBorder(x + tl, y + tl, x + w - tr, y, x + w - tr, y + tr, tl, tr, 1.25, 1.5, 1.75, btw, bts, btc);
      }
      if (borderRight) {
        // ?????????
        _setBorder(x + w - tr, y + tr, x + w, y + h - br, x + w - br, y + h - br, tr, br, 1.75, 2, 0.25, btw, bts, btc);
      }

    } }, { key: "drawView", value: function drawView(
    box, style) {
      var ctx = this.ctx;var

      x =



      box.left,y = box.top,w = box.width,h = box.height;var _ref14 =











      style || {},_ref14$borderRadius = _ref14.borderRadius,borderRadius = _ref14$borderRadius === void 0 ? 0 : _ref14$borderRadius,border = _ref14.border,borderTop = _ref14.borderTop,borderBottom = _ref14.borderBottom,borderLeft = _ref14.borderLeft,borderRight = _ref14.borderRight,_ref14$color = _ref14.color,color = _ref14$color === void 0 ? '#000000' : _ref14$color,bg = _ref14.backgroundColor,rotate = _ref14.rotate,shadow = _ref14.shadow;
      ctx.save();
      this.setTransform(box, style);
      this.setShadow(style);
      this.setBackground(bg, w, h);
      this.roundRect(-w / 2, -h / 2, w, h, borderRadius, true, false);
      ctx.restore();
      this.setBorder(box, style);
    } }, { key: "drawImage", value: function () {var _drawImage2 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee2(
      img, box, style) {var _this2 = this;return _regenerator.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                  new Promise( /*#__PURE__*/function () {var _ref15 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(resolve, reject) {var ctx, canvas, _style$borderRadius, borderRadius, mode, bg, x, y, w, h, _modeImage, _drawImage, _restore;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                              ctx = _this2.ctx;
                              canvas = _this2.canvas;_style$borderRadius =




                              style.borderRadius, borderRadius = _style$borderRadius === void 0 ? 0 : _style$borderRadius, mode = style.mode, bg = style.backgroundColor;

                              x =



                              box.left, y = box.top, w = box.width, h = box.height;
                              ctx.save();
                              _this2.setTransform(box, style);
                              _this2.setBackground(bg, w, h);
                              _this2.setShadow(style);
                              x = -w / 2;
                              y = -h / 2;
                              _this2.roundRect(x, y, w, h, borderRadius, true, false);
                              ctx.clip();
                              _modeImage = function _modeImage(img) {
                                // ????????????????????????
                                var rWidth = img.width;
                                var rHeight = img.height;
                                var startX = 0;
                                var startY = 0;
                                // ??????????????????
                                var cp = w / h;
                                // ????????????
                                var op = rWidth / rHeight;
                                if (cp >= op) {
                                  rHeight = rWidth / cp;
                                  // startY = Math.round((h - rHeight) / 2)
                                } else {
                                  rWidth = rHeight * cp;
                                  startX = Math.round(((img.width || w) - rWidth) / 2);
                                }
                                if (mode === 'scaleToFill' || !img.width) {
                                  ctx.drawImage(img.src, x, y, w, h);
                                } else {
                                  // ??????????????? ???????????? ??????????????? ??????????????????




                                  ctx.drawImage(img.src, startX, startY, rWidth, rHeight, x, y, w, h);

                                }
                              };
                              _drawImage = function _drawImage(img) {
                                if (_this2.use2dCanvas) {
                                  var Image = canvas.createImage();
                                  Image.onload = function () {
                                    img.src = Image;
                                    _modeImage(img);
                                    _restore();
                                  };
                                  Image.onerror = function () {
                                    console.error("createImage fail: ".concat(img));
                                    reject(new Error("createImage fail: ".concat(img)));
                                  };
                                  Image.src = img.src;
                                } else {
                                  _modeImage(img);
                                  _restore();
                                }
                              };
                              _restore = function _restore() {
                                ctx.restore();
                                _this2.setBorder(box, style);
                                setTimeout(function () {
                                  resolve(true);
                                }, 1000 / 30);

                              };
                              _drawImage(img);case 16:case "end":return _context.stop();}}}, _callee);}));return function (_x4, _x5) {return _ref15.apply(this, arguments);};}()));case 2:case "end":return _context2.stop();}}}, _callee2);}));function drawImage(_x, _x2, _x3) {return _drawImage2.apply(this, arguments);}return drawImage;}() }, { key: "drawText", value: function drawText(


    text, box, style) {
      var ctx = this.ctx;var

      x =



      box.left,y = box.top,w = box.width,h = box.height;var _style$color =












      style.color,color = _style$color === void 0 ? '#000000' : _style$color,_style$lineHeight = style.lineHeight,lineHeight = _style$lineHeight === void 0 ? '1.4em' : _style$lineHeight,_style$fontSize = style.fontSize,fontSize = _style$fontSize === void 0 ? 14 : _style$fontSize,fontWeight = style.fontWeight,fontFamily = style.fontFamily,textStyle = style.textStyle,_style$textAlign = style.textAlign,textAlign = _style$textAlign === void 0 ? 'left' : _style$textAlign,_style$verticalAlign = style.verticalAlign,va = _style$verticalAlign === void 0 ? 'top' : _style$verticalAlign,bg = style.backgroundColor,maxLines = style.maxLines,td = style.textDecoration;
      if (typeof lineHeight === 'string') {
        lineHeight = Math.ceil(parseFloat(lineHeight.replace('em')) * fontSize);
      }
      if (!text) return;
      ctx.save();
      this.setTransform(box, style);
      x = -w / 2;
      y = -h / 2;
      ctx.setTextBaseline(va);
      this.setFont({ fontFamily: fontFamily, fontSize: fontSize, fontWeight: fontWeight, textStyle: textStyle });
      ctx.setTextAlign(textAlign);
      if (bg) {
        this.setBackground(bg, w, h);
        this.roundRect(x, y, w, h, 1, bg);
      }
      this.setShadow(style);
      ctx.setFillStyle(color);
      // ????????????
      switch (textAlign) {
        case 'left':
          break;
        case 'center':
          x += 0.5 * w;
          break;
        case 'right':
          x += w;
          break;
        default:
          break;}

      var textWidth = this.measureText(text, fontSize);
      var actualHeight = Math.ceil(textWidth / w) * lineHeight;
      var paddingTop = Math.ceil((h - actualHeight) / 2);
      if (paddingTop < 0) paddingTop = 0;
      // ????????????
      switch (va) {
        case 'top':
          break;
        case 'middle':
          y += fontSize / 2;
          break;
        case 'bottom':

          y += fontSize;
          break;
        default:
          break;}

      // ??????
      var _drawLine = function _drawLine(x, y, textWidth) {var _uni$getSystemInfoSyn =
        uni.getSystemInfoSync(),system = _uni$getSystemInfoSyn.system;
        if (/win|mac/.test(system)) {
          y += fontSize / 3;
        }
        // ????????????
        switch (va) {
          case 'top':
            break;
          case 'middle':
            y -= fontSize / 2;
            break;
          case 'bottom':
            y -= fontSize;
            break;
          default:
            break;}

        var to = x;
        switch (textAlign) {
          case 'left':
            x = x;
            to += textWidth;
            break;
          case 'center':
            x = x - textWidth / 2;
            to = x + textWidth;
            break;
          case 'right':
            to = x;
            x = x - textWidth;
            break;
          default:
            break;}


        if (td) {
          ctx.setLineWidth(fontSize / 13);
          ctx.beginPath();

          if (/\bunderline\b/.test(td)) {
            y -= inlinePaddingTop * 0.8;
            ctx.moveTo(x, y);
            ctx.lineTo(to, y);
          }

          if (/\boverline\b/.test(td)) {
            y += inlinePaddingTop;
            ctx.moveTo(x, y - lineHeight);
            ctx.lineTo(to, y - lineHeight);
          }
          if (/\bline-through\b/.test(td)) {
            ctx.moveTo(x, y - lineHeight / 2);
            ctx.lineTo(to, y - lineHeight / 2);
          }
          ctx.closePath();
          ctx.setStrokeStyle(color);
          ctx.stroke();
        }
      };

      var inlinePaddingTop = Math.ceil((lineHeight - fontSize) / 2);
      // ???????????????
      if (textWidth <= w && !text.includes('\n')) {
        ctx.fillText(text, x, y + inlinePaddingTop);
        y += lineHeight;
        _drawLine(x, y, textWidth);
        ctx.restore();
        return;
      }
      // ????????????
      var chars = text.split('');
      var _y = y;
      // ????????????
      var line = '';
      var lineIndex = 0;
      var textArray = [];
      for (var index = 0; index <= chars.length; index++) {
        var ch = chars[index];
        var isLine = ch === '\n';
        var isRight = index === chars.length - 1;
        ch = isLine ? '' : ch;
        var testLine = line + ch;
        var testWidth = this.measureText(testLine, fontSize);
        // ??????????????????????????????????????????????????????
        if (lineIndex >= maxLines) {
          break;
        }
        if (testWidth > w || isLine || isRight) {
          lineIndex++;
          line = isRight && testWidth <= w ? testLine : line;
          if (lineIndex === maxLines && testWidth > w) {
            while (this.measureText("".concat(line, "..."), fontSize) > w) {
              if (line.length <= 1) {
                // ????????????????????????????????????????????????
                break;
              }
              line = line.substring(0, line.length - 1);
            }
            line += '...';
          }
          textArray.push(line);
          ctx.fillText(line, x, y + inlinePaddingTop);
          y += lineHeight;
          _drawLine(x, y, testWidth);
          line = ch;
          if (y + lineHeight > _y + h) break;
        } else {
          line = testLine;
        }
      }
      ctx.restore();
    } }, { key: "findNode", value: function () {var _findNode = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee3(
      element) {var parent,index,siblings,source,computedStyle,attributes,node,_computedStyle$left,left,_computedStyle$top,top,_computedStyle$width,width,_computedStyle$height,height,childrens,i,v,_args3 = arguments;return _regenerator.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:parent = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};index = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 0;siblings = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : [];source = _args3.length > 4 ? _args3[4] : undefined;
                computedStyle = Object.assign({}, this.getComputedStyle(element, parent, index));_context3.next = 7;return (
                  this.getAttributes(element));case 7:attributes = _context3.sent;
                node = {
                  id: id++,
                  parent: parent,
                  computedStyle: computedStyle,
                  attributes: Object.assign({}, attributes),
                  name: (element === null || element === void 0 ? void 0 : element.type) || 'view' };

                if (JSON.stringify(parent) === '{}') {_computedStyle$left =
                  computedStyle.left, left = _computedStyle$left === void 0 ? 0 : _computedStyle$left, _computedStyle$top = computedStyle.top, top = _computedStyle$top === void 0 ? 0 : _computedStyle$top, _computedStyle$width = computedStyle.width, width = _computedStyle$width === void 0 ? 0 : _computedStyle$width, _computedStyle$height = computedStyle.height, height = _computedStyle$height === void 0 ? 0 : _computedStyle$height;
                  node.layoutBox = { left: left, top: top, width: width, height: height };
                } else {
                  node.layoutBox = Object.assign({ left: 0, top: 0 }, this.getLayoutBox(node, parent, index, siblings, source));
                }if (!(

                element === null || element === void 0 ? void 0 : element.views)) {_context3.next = 25;break;}
                childrens = [];
                node.children = [];
                i = 0;case 14:if (!(i < element.views.length)) {_context3.next = 24;break;}
                v = element.views[i];_context3.t0 =
                childrens;_context3.next = 19;return this.findNode(v, node, i, childrens, element);case 19:_context3.t1 = _context3.sent;_context3.t0.push.call(_context3.t0, _context3.t1);case 21:i++;_context3.next = 14;break;case 24:

                node.children = childrens;case 25:return _context3.abrupt("return",

                node);case 26:case "end":return _context3.stop();}}}, _callee3, this);}));function findNode(_x6) {return _findNode.apply(this, arguments);}return findNode;}() }, { key: "getComputedStyle", value: function getComputedStyle(

    element) {var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var style = {};
      if (parent.computedStyle) {
        for (var _i2 = 0, _Object$keys = Object.keys(parent.computedStyle); _i2 < _Object$keys.length; _i2++) {var value = _Object$keys[_i2];
          var item = parent.computedStyle[value];
          if (['color', 'fontSize', 'lineHeight', 'verticalAlign', 'fontWeight', 'textAlign'].includes(value)) {
            style[value] = /px$/.test(item) ? (0, _utils.toPx)(item) : item;
          }
        }
      }
      var node = JSON.stringify(parent) == '{}' ? element : element.css;
      if (!node) return style;var _loop = function _loop() {
        var value = _Object$keys2[_i3];
        var item = node[value];
        if (value == 'views') {
          return "continue";
        }
        if (['boxShadow', 'shadow'].includes(value)) {
          var shadows = item.split(' ').map(function (v) {return /^\d/.test(v) ? (0, _utils.toPx)(v) : v;});
          style.boxShadow = shadows;
          return "continue";
        }
        if (value.includes('border') && !value.includes('adius')) {
          var prefix = value.match(/^border([BTRLa-z]+)?/)[0];
          var type = value.match(/[W|S|C][a-z]+/);
          var v = item.split(' ').map(function (v) {return /^\d/.test(v) ? (0, _utils.toPx)(v) : v;});

          if (v.length > 1) {var _style$prefix;
            style[prefix] = (_style$prefix = {}, _defineProperty(_style$prefix,
            prefix + 'Width', v[0] || 1), _defineProperty(_style$prefix,
            prefix + 'Style', v[1] || 'solid'), _defineProperty(_style$prefix,
            prefix + 'Color', v[2] || 'black'), _style$prefix);

          } else {var _style$prefix2;
            style[prefix] = (_style$prefix2 = {}, _defineProperty(_style$prefix2,
            prefix + 'Width', 1), _defineProperty(_style$prefix2,
            prefix + 'Style', 'solid'), _defineProperty(_style$prefix2,
            prefix + 'Color', 'black'), _style$prefix2);

            style[prefix][prefix + type[0]] = v[0];
          }
          return "continue";
        }
        if (['background', 'backgroundColor'].includes(value)) {
          style['backgroundColor'] = item;
          return "continue";
        }
        if (value.includes('padding') || value.includes('margin') || value.includes('adius')) {
          var isRadius = value.includes('adius');
          var _prefix = isRadius ? 'borderRadius' : value.match(/[a-z]+/)[0];
          var pre = [0, 0, 0, 0].map(function (item, i) {return isRadius ? ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'][i] : [_prefix + 'Top', _prefix + 'Right', _prefix + 'Bottom', _prefix + 'Left'][i];});
          if (value === 'padding' || value === 'margin' || value === 'radius' || value === 'borderRadius') {
            var _v = (item === null || item === void 0 ? void 0 : item.split(' ').map(function (item) {return /^\d/.test(item) && (0, _utils.toPx)(item, node['width']);}, [])) || [0];
            var _type = isRadius ? 'borderRadius' : value;
            if (_v.length == 1) {
              style[_type] = _v[0];
            } else {var _style$_type;var _v2 = _slicedToArray(
              _v, 4),t = _v2[0],r = _v2[1],b = _v2[2],l = _v2[3];
              style[_type] = (_style$_type = {}, _defineProperty(_style$_type,
              pre[0], t), _defineProperty(_style$_type,
              pre[1], (0, _utils.isNumber)(r) ? r : t), _defineProperty(_style$_type,
              pre[2], (0, _utils.isNumber)(b) ? b : t), _defineProperty(_style$_type,
              pre[3], (0, _utils.isNumber)(l) ? l : r), _style$_type);

            }
          } else {
            if (typeof style[_prefix] === 'object') {
              style[_prefix][value] = (0, _utils.toPx)(item, node['width']);
            } else {var _style$_prefix;
              style[_prefix] = (_style$_prefix = {}, _defineProperty(_style$_prefix,
              pre[0], style[_prefix] || 0), _defineProperty(_style$_prefix,
              pre[1], style[_prefix] || 0), _defineProperty(_style$_prefix,
              pre[2], style[_prefix] || 0), _defineProperty(_style$_prefix,
              pre[3], style[_prefix] || 0), _style$_prefix);

              style[_prefix][value] = (0, _utils.toPx)(item, node['width']);
            }
          }
          return "continue";
        }
        if (value.includes('width') || value.includes('height')) {
          if (/%$/.test(item)) {
            style[value] = (0, _utils.toPx)(item, parent.layoutBox[value]);
          } else {
            style[value] = /px|rpx$/.test(item) ? (0, _utils.toPx)(item) : item;
          }
          return "continue";
        }
        if (value.includes('transform')) {
          style[value] = {};
          item.replace(/([a-zA-Z]+)\(([0-9,-\.%rpxdeg\s]+)\)/g, function (g1, g2, g3) {
            var v = g3.split(',').map(function (k) {return k.replace(/(^\s*)|(\s*$)/g, '');});
            var transform = function transform(v, r) {
              return v.includes('deg') ? v * 1 : (0, _utils.toPx)(v, r);
            };
            if (g2.includes('matrix')) {
              style[value][g2] = v.map(function (v) {return v * 1;});
            } else if (g2.includes('rotate')) {
              style[value][g2] = g3.match(/\d+/)[0] * 1;
            } else if (/[X, Y]/.test(g2)) {
              style[value][g2] = /[X]/.test(g2) ? transform(v[0], node['width']) : transform(v[0], node['height']);
            } else {
              style[value][g2 + 'X'] = transform(v[0], node['width']);
              style[value][g2 + 'Y'] = transform(v[1] || v[0], node['height']);
            }
          });
          return "continue";
        }
        style[value] = /%|px|rpx$/.test(item) ? (0, _utils.toPx)(item, node['width']) : item;};for (var _i3 = 0, _Object$keys2 = Object.keys(node); _i3 < _Object$keys2.length; _i3++) {var _ret = _loop();if (_ret === "continue") continue;
      }
      if ((element.name == 'image' || element.type == 'image') && !style.mode) {
        style.mode = 'aspectFill';
        if ((!node.width || node.width == 'auto') && (!node.height || node.width == 'auto')) {
          style.mode = '';
        }
      }
      return style;
    } }, { key: "getLayoutBox", value: function getLayoutBox(
    element) {var _this3 = this;var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;var siblings = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var source = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      var box = {};var _ref16 =
      element || {},name = _ref16.name,cstyle = _ref16.computedStyle,layoutBox = _ref16.layoutBox,attributes = _ref16.attributes;
      if (!name) return box;
      var isText = name === 'text';
      var isImage = name === 'image';
      var isPText = parent.name === 'text';
      var ctx = this.ctx;
      var pbox = parent.layoutBox;
      var pstyle = parent.computedStyle;var
      va = cstyle.verticalAlign;
      // ??????left
      var _ref17 = cstyle.padding || {},_ref17$paddingTop = _ref17.paddingTop,pt = _ref17$paddingTop === void 0 ? 0 : _ref17$paddingTop,_ref17$paddingRight = _ref17.paddingRight,pr = _ref17$paddingRight === void 0 ? 0 : _ref17$paddingRight,_ref17$paddingBottom = _ref17.paddingBottom,pb = _ref17$paddingBottom === void 0 ? 0 : _ref17$paddingBottom,_ref17$paddingLeft = _ref17.paddingLeft,pl = _ref17$paddingLeft === void 0 ? 0 : _ref17$paddingLeft;var _ref18 =
      cstyle.margin || {},_ref18$marginTop = _ref18.marginTop,mt = _ref18$marginTop === void 0 ? 0 : _ref18$marginTop,_ref18$marginRight = _ref18.marginRight,mr = _ref18$marginRight === void 0 ? 0 : _ref18$marginRight,_ref18$marginBottom = _ref18.marginBottom,mb = _ref18$marginBottom === void 0 ? 0 : _ref18$marginBottom,_ref18$marginLeft = _ref18.marginLeft,ml = _ref18$marginLeft === void 0 ? 0 : _ref18$marginLeft;
      var getNodeLeft = function getNodeLeft() {
        if (typeof cstyle.left === 'number') {
          return cstyle.left + pl + ml;
        }
        // ??????????????????
        if (!isText) {
          return ((pbox === null || pbox === void 0 ? void 0 : pbox.left) || 0) + pl + ml;
        }
        // ????????????1?????????
        var isLeft = index == 0;
        if (isLeft) {
          // ?????????????????????
          if (isPText) {
            return ((pbox === null || pbox === void 0 ? void 0 : pbox.left) || 0) + ((pbox === null || pbox === void 0 ? void 0 : pbox.width) || 0) + pl + ml;
          } else {
            return ((pbox === null || pbox === void 0 ? void 0 : pbox.left) || 0) + pl + ml;
          }
        } else {var _ls$padding, _ls$margin;7;var _siblings =
          siblings[index - 1],lbox = _siblings.layoutBox,ls = _siblings.computedStyle;
          return lbox.left + lbox.width + pl + ml + ((ls === null || ls === void 0 ? void 0 : (_ls$padding = ls.padding) === null || _ls$padding === void 0 ? void 0 : _ls$padding.paddingRight) || 0) + ((ls === null || ls === void 0 ? void 0 : (_ls$margin = ls.margin) === null || _ls$margin === void 0 ? void 0 : _ls$margin.marginRight) || 0);
        }
      };

      var lastLeft = 0;
      var lastTop = 0;
      // ????????????
      var getNodeWidth = function getNodeWidth() {
        if (typeof cstyle.width === 'number') {
          return cstyle.width - pl - pr;
        }
        if (isImage) {
          return (pbox === null || pbox === void 0 ? void 0 : pbox.width) - pl - pr;
        }
        if (!isText || isText && cstyle.textAlign && cstyle.textAlign !== 'left') {
          return (pbox === null || pbox === void 0 ? void 0 : pbox.width) - pl - pr;
        }
        if (isText) {var _ref19 =






          cstyle || {},_ref19$fontSize = _ref19.fontSize,fontSize = _ref19$fontSize === void 0 ? 14 : _ref19$fontSize,_ref19$lineHeight = _ref19.lineHeight,lineHeight = _ref19$lineHeight === void 0 ? '1.4em' : _ref19$lineHeight,fontWeight = _ref19.fontWeight,fontFamily = _ref19.fontFamily,textStyle = _ref19.textStyle;
          _this3.setFont({ fontFamily: fontFamily, fontSize: fontSize, fontWeight: fontWeight, textStyle: textStyle });
          var width = _this3.measureText(attributes.text, fontSize);
          if (!isPText) {
            if (width < ((pbox === null || pbox === void 0 ? void 0 : pbox.width) || 0)) {
              return width;
            } else {
              return (pbox === null || pbox === void 0 ? void 0 : pbox.width) || 0;
            }
          } else {var _this3$getParent =
            _this3.getParent(parent, 'view'),_pb = _this3$getParent.layoutBox;
            var maxWidth = _pb.width + _pb.left - box.left;
            return maxWidth > width ? width : maxWidth;
          }
        }
      };
      // ????????????
      var getNodeHeight = function getNodeHeight() {var
        height = cstyle.height;
        if (typeof cstyle.height === 'number') {
          return cstyle.height;
        }
        if (isImage) {var
          rWidth = attributes.width,rHeight = attributes.height;
          return box.width * rHeight / rWidth; // pbox?.height - pl - pr
        }
        if (!isText) {
          return 0;
        }

        // ?????????????????????
        if (pbox.height == pstyle.height && pstyle.height != 0 && va != 'bottom' && va != 'middle') {
          return pbox.height;
        }
        // ????????????????????????
        else {var _ref20 =



            cstyle || {},_ref20$fontSize = _ref20.fontSize,fontSize = _ref20$fontSize === void 0 ? 14 : _ref20$fontSize,_ref20$lineHeight = _ref20.lineHeight,lineHeight = _ref20$lineHeight === void 0 ? '1.4em' : _ref20$lineHeight;
            if (typeof lineHeight === 'string') {// 1.4em
              lineHeight = Math.ceil(parseFloat(lineHeight.replace('em')) * fontSize);
            }
            var width = _this3.measureText(attributes.text, fontSize);
            if (pbox.width < width) {
              lineHeight = Math.ceil(width / pbox.width) * lineHeight;
            }
            pbox.height = pbox.height > lineHeight ? pbox.height : lineHeight;
            return lineHeight;
          }
      };

      // ??????top
      var getNodeTop = function getNodeTop() {
        if (cstyle.top) {
          return cstyle.top + pt + mt;
        }
        if (va === 'bottom') {
          return (pbox === null || pbox === void 0 ? void 0 : pbox.top) + ((pbox === null || pbox === void 0 ? void 0 : pbox.height) - box.height || 0) + pt + mt;
        }
        if (va === 'middle') {
          return (pbox === null || pbox === void 0 ? void 0 : pbox.top) + ((pbox === null || pbox === void 0 ? void 0 : pbox.height) - box.height || 0) / 2 + pt + mt;
        }
        return ((pbox === null || pbox === void 0 ? void 0 : pbox.top) || 0) + pt + mt;
      };
      box.left = getNodeLeft();

      ctx.save();
      box.width = getNodeWidth();
      box.height = getNodeHeight();
      // ??????top
      box.top = getNodeTop();

      ctx.restore();
      return box;
    } }, { key: "getImageInfo", value: function getImageInfo(
    img) {
      return new Promise( /*#__PURE__*/function () {var _ref21 = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee4(resolve, reject) {var base64Reg, localReg, networkReg, imgName;return _regenerator.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                  base64Reg = /^data:image\/(\w+);base64/;
                  localReg = /^\.|^\/(?=[^\/])/;
                  networkReg = /^(http|\/\/)/;if (!







                  base64Reg.test(img)) {_context4.next = 13;break;}if (
                  cache[img]) {_context4.next = 12;break;}
                  imgName = img;_context4.next = 8;return (
                    (0, _utils.base64ToPath)(img));case 8:img = _context4.sent;
                  cache[imgName] = img;_context4.next = 13;break;case 12:

                  img = cache[img];case 13:



                  if (cache[img] && cache[img].errMsg) {
                    resolve(cache[img]);
                  } else {
                    uni.getImageInfo({
                      src: img,
                      success: function success(image) {

                        image.path = localReg.test(img) ? "/".concat(image.path) : image.path;

                        // image.path = /^(http|\/\/|\/|wxfile|data:image\/(\w+);base64|file|bdfile|ttfile|blob)/.test(image.path) ? image.path : `/${image.path}`;
                        cache[img] = image;
                        resolve(cache[img]);
                      },
                      fail: function fail(err) {
                        resolve({ path: img });
                        console.error("getImageInfo:fail ".concat(img, " failed ").concat(JSON.stringify(err)));
                      } });

                  }case 14:case "end":return _context4.stop();}}}, _callee4);}));return function (_x7, _x8) {return _ref21.apply(this, arguments);};}());



    } }, { key: "getParent", value: function getParent(
    element, name) {
      if (element.name === name) {
        return element;
      } else if (element.parent) {
        return this.getParent(element.parent, name);
      }
    } }, { key: "getAttributes", value: function () {var _getAttributes = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee5(
      element) {var arr, _ref22, _ref22$width, width, _ref22$height, height, src;return _regenerator.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                arr = {};if (!(
                (element === null || element === void 0 ? void 0 : element.url) || (element === null || element === void 0 ? void 0 : element.src))) {_context5.next = 15;break;}
                arr.src = element.url || (element === null || element === void 0 ? void 0 : element.src);_context5.next = 5;return (
                  this.getImageInfo(arr.src));case 5:_context5.t0 = _context5.sent;if (_context5.t0) {_context5.next = 8;break;}_context5.t0 = {};case 8:_ref22 = _context5.t0;_ref22$width = _ref22.width;width = _ref22$width === void 0 ? 0 : _ref22$width;_ref22$height = _ref22.height;height = _ref22$height === void 0 ? 0 : _ref22$height;src = _ref22.path;
                arr = Object.assign({}, arr, { width: width, height: height, src: src });case 15:

                if (element === null || element === void 0 ? void 0 : element.text) {
                  arr.text = element.text;
                }return _context5.abrupt("return",
                arr);case 17:case "end":return _context5.stop();}}}, _callee5, this);}));function getAttributes(_x9) {return _getAttributes.apply(this, arguments);}return getAttributes;}() }, { key: "drawBoard", value: function () {var _drawBoard = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee6(

      element) {var node;return _regenerator.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
                  this.findNode(element));case 2:node = _context6.sent;return _context6.abrupt("return",
                this.drawNode(node));case 4:case "end":return _context6.stop();}}}, _callee6, this);}));function drawBoard(_x10) {return _drawBoard.apply(this, arguments);}return drawBoard;}() }, { key: "drawNode", value: function () {var _drawNode = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee7(

      element) {var layoutBox, computedStyle, name, _element$attributes, src, text, childs, _iterator, _step, child;return _regenerator.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:

                layoutBox =


                element.layoutBox, computedStyle = element.computedStyle, name = element.name;_element$attributes =



                element.attributes, src = _element$attributes.src, text = _element$attributes.text;if (!(
                name === 'view')) {_context7.next = 6;break;}
                this.drawView(layoutBox, computedStyle);_context7.next = 12;break;case 6:if (!(
                name === 'image' && src)) {_context7.next = 11;break;}_context7.next = 9;return (
                  this.drawImage(element.attributes, layoutBox, computedStyle));case 9:_context7.next = 12;break;case 11:
                if (name === 'text') {
                  this.drawText(text, layoutBox, computedStyle);
                }case 12:if (
                element.children) {_context7.next = 14;break;}return _context7.abrupt("return");case 14:
                childs = Object.values ? Object.values(element.children) : Object.keys(element.children).map(function (key) {return element.children[key];});_iterator = _createForOfIteratorHelper(
                childs);_context7.prev = 16;_iterator.s();case 18:if ((_step = _iterator.n()).done) {_context7.next = 24;break;}child = _step.value;_context7.next = 22;return (
                  this.drawNode(child));case 22:_context7.next = 18;break;case 24:_context7.next = 29;break;case 26:_context7.prev = 26;_context7.t0 = _context7["catch"](16);_iterator.e(_context7.t0);case 29:_context7.prev = 29;_iterator.f();return _context7.finish(29);case 32:case "end":return _context7.stop();}}}, _callee7, this, [[16, 26, 29, 32]]);}));function drawNode(_x11) {return _drawNode.apply(this, arguments);}return drawNode;}() }]);return Draw;}();exports.Draw = Draw;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 585:
/*!********************************************************!*\
  !*** F:/hear/hear/components/lime-painter/gradient.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.GD = void 0;function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;} /* eslint-disable */

var GD = {
  isGradient: function isGradient(bg) {
    if (bg && (bg.startsWith('linear') || bg.startsWith('radial'))) {
      return true;
    }
    return false;
  },
  doGradient: function doGradient(bg, width, height, ctx) {
    if (bg.startsWith('linear')) {
      linearEffect(width, height, bg, ctx);
    } else if (bg.startsWith('radial')) {
      radialEffect(width, height, bg, ctx);
    }
  } };exports.GD = GD;


function analizeGrad(string) {
  var colorPercents = string.substring(0, string.length - 1).split("%,");
  var colors = [];
  var percents = [];var _iterator = _createForOfIteratorHelper(
  colorPercents),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var colorPercent = _step.value;
      colors.push(colorPercent.substring(0, colorPercent.lastIndexOf(" ")).trim());
      percents.push(colorPercent.substring(colorPercent.lastIndexOf(" "), colorPercent.length) / 100);
    }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
  return {
    colors: colors,
    percents: percents };

}

function radialEffect(width, height, bg, ctx) {
  var colorPer = analizeGrad(bg.match(/radial-gradient\((.+)\)/)[1]);
  var grd = ctx.createCircularGradient(0, 0, width < height ? height / 2 : width / 2);
  for (var i = 0; i < colorPer.colors.length; i++) {
    grd.addColorStop(colorPer.percents[i], colorPer.colors[i]);
  }
  ctx.setFillStyle(grd);
}

function analizeLinear(bg, width, height) {
  var direction = bg.match(/([-]?\d{1,3})deg/);
  var dir = direction && direction[1] ? parseFloat(direction[1]) : 0;
  var coordinate;
  switch (dir) {
    case 0:
      coordinate = [0, -height / 2, 0, height / 2];
      break;
    case 90:
      coordinate = [width / 2, 0, -width / 2, 0];
      break;
    case -90:
      coordinate = [-width / 2, 0, width / 2, 0];
      break;
    case 180:
      coordinate = [0, height / 2, 0, -height / 2];
      break;
    case -180:
      coordinate = [0, -height / 2, 0, height / 2];
      break;
    default:
      var x1 = 0;
      var y1 = 0;
      var x2 = 0;
      var y2 = 0;
      if (direction[1] > 0 && direction[1] < 90) {
        x1 = width / 2 - (width / 2 * Math.tan((90 - direction[1]) * Math.PI * 2 / 360) - height / 2) * Math.sin(2 * (
        90 - direction[1]) * Math.PI * 2 / 360) / 2;
        y2 = Math.tan((90 - direction[1]) * Math.PI * 2 / 360) * x1;
        x2 = -x1;
        y1 = -y2;
      } else if (direction[1] > -180 && direction[1] < -90) {
        x1 = -(width / 2) + (width / 2 * Math.tan((90 - direction[1]) * Math.PI * 2 / 360) - height / 2) * Math.sin(2 * (
        90 - direction[1]) * Math.PI * 2 / 360) / 2;
        y2 = Math.tan((90 - direction[1]) * Math.PI * 2 / 360) * x1;
        x2 = -x1;
        y1 = -y2;
      } else if (direction[1] > 90 && direction[1] < 180) {
        x1 = width / 2 + (-(width / 2) * Math.tan((90 - direction[1]) * Math.PI * 2 / 360) - height / 2) * Math.sin(2 * (
        90 - direction[1]) * Math.PI * 2 / 360) / 2;
        y2 = Math.tan((90 - direction[1]) * Math.PI * 2 / 360) * x1;
        x2 = -x1;
        y1 = -y2;
      } else {
        x1 = -(width / 2) - (-(width / 2) * Math.tan((90 - direction[1]) * Math.PI * 2 / 360) - height / 2) * Math.sin(2 * (
        90 - direction[1]) * Math.PI * 2 / 360) / 2;
        y2 = Math.tan((90 - direction[1]) * Math.PI * 2 / 360) * x1;
        x2 = -x1;
        y1 = -y2;
      }
      coordinate = [x1, y1, x2, y2];
      break;}

  return coordinate;
}

function linearEffect(width, height, bg, ctx) {
  var param = analizeLinear(bg, width, height);
  var grd = ctx.createLinearGradient(param[0], param[1], param[2], param[3]);
  var content = bg.match(/linear-gradient\((.+)\)/)[1];
  var colorPer = analizeGrad(content.substring(content.indexOf(',') + 1));
  for (var i = 0; i < colorPer.colors.length; i++) {
    grd.addColorStop(colorPer.percents[i], colorPer.colors[i]);
  }
  ctx.setFillStyle(grd);
}

/***/ }),

/***/ 586:
/*!******************************************************!*\
  !*** F:/hear/hear/components/lime-painter/canvas.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.adaptor = adaptor;function adaptor(ctx) {
  // @ts-ignore
  return Object.assign(ctx, {
    setStrokeStyle: function setStrokeStyle(val) {
      ctx.strokeStyle = val;
    },
    setLineWidth: function setLineWidth(val) {
      ctx.lineWidth = val;
    },
    setLineCap: function setLineCap(val) {
      ctx.lineCap = val;
    },
    setFillStyle: function setFillStyle(val) {
      ctx.fillStyle = val;
    },
    setFontSize: function setFontSize(val) {
      ctx.font = String(val);
    },
    setGlobalAlpha: function setGlobalAlpha(val) {
      ctx.globalAlpha = val;
    },
    setLineJoin: function setLineJoin(val) {
      ctx.lineJoin = val;
    },
    setTextAlign: function setTextAlign(val) {
      ctx.textAlign = val;
    },
    setMiterLimit: function setMiterLimit(val) {
      ctx.miterLimit = val;
    },
    setShadow: function setShadow(offsetX, offsetY, blur, color) {
      ctx.shadowOffsetX = offsetX;
      ctx.shadowOffsetY = offsetY;
      ctx.shadowBlur = blur;
      ctx.shadowColor = color;
    },
    setTextBaseline: function setTextBaseline(val) {
      ctx.textBaseline = val;
    },
    createCircularGradient: function createCircularGradient() {},
    draw: function draw() {} });

}

/***/ }),

/***/ 59:
/*!*******************************************!*\
  !*** F:/hear/hear/libs/function/color.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // ?????????????????????????????????????????????????????????????????????????????????css??????
// ????????????????????????????????????????????????????????????????????????(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 60:
/*!***********************************************!*\
  !*** F:/hear/hear/libs/function/type2icon.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * ????????????type???,?????????????????????
                                                                                                      * @param String type ????????????,primary|info|error|warning|success
                                                                                                      * @param String fill ????????????fill?????????????????????  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // ??????????????????,?????????success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // ??????(2019-12-12),info???primary?????????????????????
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // ?????????????????????,??????-fill,???icon????????????,???????????????????????????-fill???
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 61:
/*!*************************************************!*\
  !*** F:/hear/hear/libs/function/randomArray.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // ????????????
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // ?????????sort??????,Math.random()??????0<= x < 1????????????,?????????x-0.05??????????????????0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 62:
/*!*********************************************!*\
  !*** F:/hear/hear/libs/function/addUnit.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 52));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// ????????????????????????rpx???%???px???????????????????????????auto??????????????????????????????rpx????????????
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // ???uView????????????????????????number?????????????????????
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 63:
/*!********************************************!*\
  !*** F:/hear/hear/libs/function/random.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 64:
/*!******************************************!*\
  !*** F:/hear/hear/libs/function/trim.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 65:
/*!*******************************************!*\
  !*** F:/hear/hear/libs/function/toast.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 66:
/*!***********************************************!*\
  !*** F:/hear/hear/libs/function/getParent.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // ????????????????????????????????????????????????????????????provide/inject?????????
// this.$parent??????H5????????????????????????????????????????????????H5??????????????????this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // ??????while??????????????????????????????H5???????????????????????????
  while (parent) {
    // ?????????
    if (parent.$options.name !== name) {
      // ???????????????name?????????????????????????????????
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // ??????keys??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // ??????????????????????????????
          for (var i in keys) {
            // ???????????????????????????????????????????????????????????????
            // ????????????????????????????????????????????????????????????????????????????????????
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // ????????????????????????????????????false?????????????????????????????????????????????????????????????????????
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 67:
/*!*********************************************!*\
  !*** F:/hear/hear/libs/function/$parent.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // ????????????????????????????????????????????????????????????provide/inject?????????
// this.$parent??????H5????????????????????????????????????????????????H5??????????????????this.$parent.$parent.xxx
// ?????????????????????undefined???????????????????????????????????????(??????)???$parent??????undefined??????????????????name
// ???(?????????undefined)???????????????????????????$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // ??????while??????????????????????????????H5???????????????????????????
  while (parent) {
    // ?????????
    if (parent.$options && parent.$options.name !== name) {
      // ???????????????name?????????????????????????????????
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 68:
/*!*****************************************!*\
  !*** F:/hear/hear/libs/function/sys.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 69:
/*!**********************************************!*\
  !*** F:/hear/hear/libs/function/debounce.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * ??????????????????????????????????????????????????????????????????wait????????????????????????
                                                                                                                         * 
                                                                                                                         * @param {Function} func ???????????????????????? 
                                                                                                                         * @param {Number} wait ???????????????
                                                                                                                         * @param {Boolean} immediate ?????????????????? 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // ???????????????
  if (timeout !== null) clearTimeout(timeout);
  // ??????????????????????????????????????????
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // ?????????????????????????????????????????????timeout????????????????????????????????????wait???????????????func????????????
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 70:
/*!**********************************************!*\
  !*** F:/hear/hear/libs/function/throttle.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * ??????????????????????????????????????????????????????
                                                                                                                      * 
                                                                                                                      * @param {Function} func ???????????????????????? 
                                                                                                                      * @param {Number} wait ???????????????
                                                                                                                      * @param {Boolean} immediate ??????????????????
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // ??????????????????????????????wait????????????????????????
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // ?????????????????????????????????wait???????????????????????????
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 71:
/*!******************************************!*\
  !*** F:/hear/hear/libs/config/config.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // ??????????????????2020-08-06
var version = '1.6.0';var _default =

{
  v: version,
  version: version,
  // ????????????
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 72:
/*!******************************************!*\
  !*** F:/hear/hear/libs/config/zIndex.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp???H5??????API???z-index????????????

/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup??????popup???actionsheet???keyboard???picker??????
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 73:
/*!*****************************************!*\
  !*** F:/hear/hear/libs/filter/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.filter = void 0; // import Vue from 'vue'

var filter = function filter(Vue) {
  Vue.filter('titleFilter', function (value, length) {
    if (value && value.length > length) {
      return value.slice(0, length) + '...';
    } else {
      return value;
    }
  });

  Vue.filter('s_to_hs', function (s) {
    //????????????
    //????????????????????????60???????????????????????????????????????
    var h;
    h = Math.floor(s / 60);
    //?????????
    //??????????????????%60???????????????????????????
    s = s % 60;
    //???????????????????????????
    h += '';
    s += '';
    //??????????????????????????????????????????0
    h = h.length == 1 ? '0' + h : h;
    s = s.length == 1 ? '0' + s : s;
    return h + ':' + s;
  });

  Vue.filter('dateFormat', function (s) {
    if (s == 0) {
      return s + 1;
    }
    //????????????
    //????????????????????????60???????????????????????????????????????
    //?????????
    //??????????????????%60???????????????????????????
    s = s / 60;
    // console.log(s);
    s++;
    s = s + '';
    //???????????????????????????
    s = s.substring(0, s.indexOf(".") + 0);

    return s;
  });


  Vue.filter('numFormat', function (value) {
    var newValue = ['', '', ''];
    var fr = 1000;
    var ad = 1;
    var num = 3;
    var fm = 1;
    while (value / fr >= 1) {
      fr *= 10;
      num += 1;
      // console.log('??????', value / fr, 'num:', num);
    }
    if (num <= 4) {// ???
      newValue[1] = '???';
      newValue[0] = parseInt(value / 1000) + '';
    } else if (num <= 8) {// ???

      var text1 = parseInt(num - 4) / 3 > 1 ? '??????' : '???';
      // tslint:disable-next-line:no-shadowed-variable
      var _fm = '???' === text1 ? 10000 : 10000000;
      newValue[1] = text1;
      newValue[0] = value / _fm + '';
      // console.log();
      newValue[0] = newValue[0].substring(0, newValue[0].indexOf(".") + 2);
    } else if (num <= 16) {// ???
      var _text = (num - 8) / 3 > 1 ? '??????' : '???';
      _text = (num - 8) / 4 > 1 ? '??????' : _text;
      _text = (num - 8) / 7 > 1 ? '?????????' : _text;
      // tslint:disable-next-line:no-shadowed-variable
      var _fm2 = 1;
      if ('???' === _text) {
        _fm2 = 100000000;
      } else if ('??????' === _text) {
        _fm2 = 100000000000;
      } else if ('??????' === _text) {
        _fm2 = 1000000000000;
      } else if ('?????????' === _text) {
        _fm2 = 1000000000000000;
      }
      newValue[1] = _text;
      newValue[0] = parseInt(value / _fm2) + '';
    }
    if (value < 1000) {
      newValue[1] = '';
      newValue[0] = value + '';
    }
    return newValue.join('');
  });

};exports.filter = filter;

/***/ }),

/***/ 8:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 9);

/***/ }),

/***/ 812:
/*!********************************************************!*\
  !*** F:/hear/hear/components/chunLei-modal/tabMask.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.TabMask = void 0;function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var TabMask = /*#__PURE__*/function () {
  function TabMask(option) {_classCallCheck(this, TabMask);
    this.navList = [];
    this.tabbarList = [];

    option = option || {};

    var tabbarHeight = !option.tabbarHeight && option.tabbarHeight != 0 ? 50 : option.tabbarHeight;

    var navHeight = !option.navHeight && option.navHeight != 0 ? uni.getSystemInfoSync().statusBarHeight + 44 : option.navHeight;
    var opacity = option.opacity || 0;
    var fn = function fn() {};
    this.fn = option.fn || fn;




  }_createClass(TabMask, [{ key: "creatPlusMask", value: function creatPlusMask(
    navHeight, tabbarHeight, opacity) {
      var opa = 1 - Math.pow(1 - opacity, 1 / 10);

      for (var i = 1; i <= 10; i++) {

        var navView = this.creatView({ height: "".concat(navHeight, "px"), top: 0 }, opa);
        var tabbarView = this.creatView({ height: "".concat(tabbarHeight, "px"), bottom: 0 }, opa);

        this.navList.push(navView);
        this.tabbarList.push(tabbarView);
      }
    }
    //?????? opacity view
  }, { key: "creatView", value: function creatView(style, opa) {var _this = this;
      style = _objectSpread({
        left: '0px',
        width: '100%' },
      style);

      var view = new plus.nativeObj.View('view', style);
      view.draw([
      { tag: 'rect', id: 'rect', color: "rgba(0,0,0,".concat(opa, ")"), position: { top: '0px', left: '0px', width: '100%', height: '100%' } }]);

      view.addEventListener("click", function (e) {
        _this.fn();
        _this.hide();
      }, false);
      return view;
    } }, { key: "show", value: function show()
    {var _this2 = this;var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;

      var i = 0;
      this.timer = setInterval(function () {
        if (i == 10) {
          clearInterval(_this2.timer);
        } else {
          if (_this2.navList[i]) _this2.navList[i].show();
          if (_this2.tabbarList[i]) _this2.tabbarList[i].show();
          i++;
        }
      }, time / 10);
    } }, { key: "hide", value: function hide()
    {

      clearInterval(this.timer);var _iterator = _createForOfIteratorHelper(
      this.navList),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var item = _step.value;
          item.hide();
        }} catch (err) {_iterator.e(err);} finally {_iterator.f();}var _iterator2 = _createForOfIteratorHelper(
      this.tabbarList),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _item = _step2.value;
          _item.hide();
        }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
    } }]);return TabMask;}();exports.TabMask = TabMask;var _default =


TabMask;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 885:
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj };

}

module.exports = _interopRequireDefault;

/***/ }),

/***/ 886:
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
    args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),

/***/ 887:
/*!*********************************************************!*\
  !*** F:/hear/hear/node_modules/ijsbridge/lib/define.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }), exports.SupportRouters = exports.BridgeMode = exports.WebBridgeApiConstants = exports.TAG = void 0;var WebBridgeApiConstants,BridgeMode,SupportRouters,TAG = "ijsbridge";exports.TAG = TAG, exports.WebBridgeApiConstants = WebBridgeApiConstants, function (e) {e.requireVersion = "requireVersion", e.sysinfo = "sysinfo", e.scanCode = "scanCode", e.authorize = "authorize", e.getUserInfo = "getUserInfo", e.fetch = "fetch", e.router = "router", e.showWebApp = "showWebApp", e.showToast = "showToast", e.showDialog = "showDialog", e.chooseImage = "chooseImage", e.chooseVideo = "chooseVideo", e.showImageViewer = "showImageViewer", e.showFullVideoPlayer = "showFullVideoPlayer", e.requestFullscreenVideoPlay = "requestFullscreenVideoPlay", e.checkPermission = "checkPermission", e.audioRecord = "audioRecord", e.share = "share", e.openLink = "openLink", e.showPickerMenu = "showPickerMenu", e.launchWechatProgram = "launchWechatProgram", e.getCurrentPosition = "getCurrentPosition", e.request = "request", e.registerAppEvent = "registerAppEvent", e.unRegisterAppEvent = "unRegisterAppEvent", e.triggerAppEvent = "triggerAppEvent", e.orientation = "orientation", e.connectDlna = "connectDlna", e.musicControl = "musicControl";}(WebBridgeApiConstants || (exports.WebBridgeApiConstants = WebBridgeApiConstants = {})), exports.BridgeMode = BridgeMode, function (e) {e[e.Development = 1] = "Development", e[e.Production = 2] = "Production";}(BridgeMode || (exports.BridgeMode = BridgeMode = {})), exports.SupportRouters = SupportRouters, function (e) {e.ad = "url", e.article = "detail", e.articlecate = "news_cate", e.articlecates = "news_tabs", e.govask = "govask_detail", e.live = "live_detail", e.liveindex = "live_index", e.news = "detail", e.ospsdetail = "govask_cate", e.ospsindex = "osps_index", e.radio = "radio", e.tv = "tv", e.url = "url", e.web = "url", e.zhengwuindex = "zhengwu_index", e.zw = "detail", e.newsclue = "newsclue", e.newscluedetail = "newscluedetail", e.snapshot = "snapshot", e.snapshotdetail = "snapshotdetail", e.yellow = "yellow";}(SupportRouters || (exports.SupportRouters = SupportRouters = {}));

/***/ }),

/***/ 888:
/*!********************************************************!*\
  !*** F:/hear/hear/node_modules/ijsbridge/lib/state.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }), exports.__get_mode = exports.__set_mode = exports.__log = void 0;var _define = __webpack_require__(/*! ./define */ 887),__Sate__ = { mode: _define.BridgeMode.Production },__log = function __log() {var e;if (__Sate__.mode != _define.BridgeMode.Production) {for (var _ = arguments.length, o = new Array(_), t = 0; t < _; t++) {o[t] = arguments[t];}o.unshift("[IJSBridge]"), (e = console).log.apply(e, o);}};exports.__log = __log;var __set_mode = function __set_mode(e) {__Sate__.mode = e;};exports.__set_mode = __set_mode;var __get_mode = function __get_mode() {return __Sate__.mode;};exports.__get_mode = __get_mode;

/***/ }),

/***/ 889:
/*!*********************************************************!*\
  !*** F:/hear/hear/node_modules/ijsbridge/lib/native.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 885);Object.defineProperty(exports, "__esModule", { value: !0 }), exports.__define = exports.__request_callback = exports.__request = void 0;var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 890)),_regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 8)),_asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 886)),_state = __webpack_require__(/*! ./state */ 888),_bridge = _interopRequireDefault(__webpack_require__(/*! ./bridge */ 891));__webpack_require__(/*! ./interface */ 894);var __waitingForBridgeReady = function () {var e = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function e() {return _regenerator.default.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return (0, _state.__log)("bridge ready", window.__DEV__), e.next = 3, new Promise(function (e, r) {(0, _bridge.default)()(function (r, t) {e({ req: r, def: t });});});case 3:return e.abrupt("return", e.sent);case 4:case "end":return e.stop();}}}, e);}));return function () {return e.apply(this, arguments);};}(),__function_callbacks = { callbacks: {}, offset: 1, invoke: function invoke(e, r) {__function_callbacks.callbacks[e] && __function_callbacks.callbacks[e].apply(null, r);}, trigger: function trigger(e, r) {__function_callbacks.invoke(e, r), delete __function_callbacks.callbacks[e];}, filter: function filter(e) {if (window.ijsbridge_callbacks || (window.ijsbridge_callbacks = __function_callbacks), Array.isArray(e)) {for (var r in e) {e[r] = __function_callbacks.filter(e[r]);}return e;}if (e && "object" == (0, _typeof2.default)(e)) {for (var t in e) {e[t] = __function_callbacks.filter(e[t]);}return e;}return "function" == typeof e && (__function_callbacks.offset++, __function_callbacks.callbacks[__function_callbacks.offset] = e, e = __function_callbacks.offset), e;} },__request = function () {var e = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function e(r, t) {return _regenerator.default.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return (0, _state.__log)((0, _state.__get_mode)(), " call native __request", r, t), e.next = 3, new Promise(function (e, n) {__request_callback(r, t, function (r) {var t = r.err,n = r.result;e({ err: t, result: n });});});case 3:return e.abrupt("return", e.sent);case 4:case "end":return e.stop();}}}, e);}));return function (r, t) {return e.apply(this, arguments);};}();exports.__request = __request;var __request_callback = function () {var e = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function e(r, t, n) {var a;return _regenerator.default.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return (0, _state.__log)((0, _state.__get_mode)(), " call native __request_callback", r, t), e.next = 3, __waitingForBridgeReady();case 3:a = e.sent, t = __function_callbacks.filter(t), a.req(r, t, function (e, r) {(0, _state.__log)((0, _state.__get_mode)(), " native __request result", e, r), n({ err: e, result: r });});case 6:case "end":return e.stop();}}}, e);}));return function (r, t, n) {return e.apply(this, arguments);};}();exports.__request_callback = __request_callback;var __define = function () {var e = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function e(r, t) {return _regenerator.default.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return (0, _state.__log)((0, _state.__get_mode)(), " call native __define", r), e.next = 3, __waitingForBridgeReady();case 3:return e.sent.def(r, function () {var e = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function e(r, n) {var a, _;return _regenerator.default.wrap(function (e) {for (;;) {switch (e.prev = e.next) {case 0:return (0, _state.__log)((0, _state.__get_mode)(), " call native __define", r), e.prev = 1, e.next = 4, Promise.resolve(t(r));case 4:(a = e.sent) && "object" == (0, _typeof2.default)(a) && void 0 !== a.error ? (_ = a.error, delete a.error, n(_, a.result ? a.result : a)) : n(!1 === a ? "??????" : null, a), e.next = 11;break;case 8:e.prev = 8, e.t0 = e.catch(1), n("" + e.t0.message, null);case 11:case "end":return e.stop();}}}, e, null, [[1, 8]]);}));return function (r, t) {return e.apply(this, arguments);};}()), e.abrupt("return", !0);case 6:case "end":return e.stop();}}}, e);}));return function (r, t) {return e.apply(this, arguments);};}();exports.__define = __define;

/***/ }),

/***/ 890:
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ 891:
/*!*********************************************************!*\
  !*** F:/hear/hear/node_modules/ijsbridge/lib/bridge.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 885);Object.defineProperty(exports, "__esModule", { value: !0 }), exports.default = createBridge;var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 890)),_classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 892)),_defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 893)),msgOffset = 1,msgCache = [],msgCallbacks = {},bridges = {},Message = function e() {(0, _classCallCheck2.default)(this, e), (0, _defineProperty2.default)(this, "index", msgOffset++), (0, _defineProperty2.default)(this, "params", null), (0, _defineProperty2.default)(this, "data", null), (0, _defineProperty2.default)(this, "api", null), (0, _defineProperty2.default)(this, "callback", null);},_post_message = function _post_message(e) {var r = window.ReactNativeWebView;r && r.postMessage(JSON.stringify(e));},_bridge_flush = function _bridge_flush() {if (0 != msgCache.length) {var e = [].concat(msgCache);msgCache.length = 0;for (var r = [], a = 0; a < e.length; a++) {var i = e[a],t = null;i instanceof Message ? (t = { api: i.api, data: i.data, index: i.index }, msgCallbacks[i.index] = i) : t = i, r.push(t);}_post_message(r);}},_bridge_request = function _bridge_request(e, r, a) {e = "c2s_" + e, "function" == typeof r && (a = r, r = null);var i = {};if (r && "object" == (0, _typeof2.default)(r)) for (var t in r) {"_" == t.substr(0, 1) && (i[t.substr(1)] = r[t], delete r[t]);}var n = new Message();return n.data = r, n.api = e, n.params = i, a && (n.callback = a), msgCache.push(n), _bridge_flush(), n;},_bridge_on = function _bridge_on(e, r) {bridges[e = "s2c_" + e] || (bridges[e] = []), bridges[e].push(r);},_receiveMessageHandle_define = function _receiveMessageHandle_define(e) {if (!e.api || !bridges[e.api]) return !1;for (var r in bridges[e.api]) {bridges[e.api][r](e, function (r, a) {e.useApi = e.api, delete e.api, e.result = a, e.error = r, msgCache.push(e), _bridge_flush();});}},_receiveMessageHandle_request_callback = function _receiveMessageHandle_request_callback(e) {if (!e.index || !msgCallbacks[e.index]) return !1;var r = msgCallbacks[e.index];return e.keepAlive || delete msgCallbacks[e.index], r.callback && r.callback(e), !0;},receiveMessageHandle = function receiveMessageHandle(e) {var r;try {r = JSON.parse(e.data);} catch (e) {return;}if (Array.isArray(r)) for (var a in r) {var i = r[a];_receiveMessageHandle_request_callback(i) || _receiveMessageHandle_define(i);}};function createBridge() {window.addEventListener("message", receiveMessageHandle), document.addEventListener("message", receiveMessageHandle);return _bridge_request("ready", "v2", function (e) {}), function (e) {e(function (e, r, a) {return "function" == typeof r && (a = r, r = null), _bridge_request(e, r, function (e) {"function" == typeof a && a(e.error ? e.error : null, e.result);});}, function (e, r) {_bridge_on(e, function (e, a) {r(e.data, function (e, r) {"function" == typeof a && a(e, r);});});});};}

/***/ }),

/***/ 892:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ 893:
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true });

  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ 894:
/*!************************************************************!*\
  !*** F:/hear/hear/node_modules/ijsbridge/lib/interface.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 9:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 10);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map