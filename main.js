import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import uView from './index.js'
Vue.use(uView);

import config from '@/libs/config/baseUrl'
Vue.prototype.$config = config
Vue.config.productionTip = false

// 自定义的过滤器
import {
	filter
} from '@/libs/filter/index.js'

filter(Vue)

App.mpType = 'app'

// #ifndef H5
var gaudioctx = uni.getBackgroundAudioManager()
// #endif
// #ifdef H5

var gaudioctx = uni.createInnerAudioContext()
// import axios from 'axios'
// Vue.prototype.$axios = axios;
// axios.defaults.withCredentials = true

// #endif
Vue.prototype.$audio = gaudioctx


const app = new Vue({
	store,
	...App
})
app.$mount()
