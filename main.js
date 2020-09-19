import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import uView from './index.js'
Vue.use(uView);

Vue.config.productionTip = false

// import { WebBridgeApi  } from "ijsbridge"

// console.log(WebBridgeApi);

Vue.filter('titleFilter', function(value, length) {
	if (value && value.length > length) {
		return value.slice(0, length) + '...'
	} else {
		return value
	}
})
Vue.filter('s_to_hs', function(s) {
	//计算分钟
	//算法：将秒数除以60，然后下舍入，既得到分钟数
	var h;
	h = Math.floor(s / 60);
	//计算秒
	//算法：取得秒%60的余数，既得到秒数
	s = s % 60;
	//将变量转换为字符串
	h += '';
	s += '';
	//如果只有一位数，前面增加一个0
	h = (h.length == 1) ? '0' + h : h;
	s = (s.length == 1) ? '0' + s : s;
	return h + ':' + s;
})


App.mpType = 'app'

// #ifndef H5
var gaudioctx = uni.getBackgroundAudioManager()
// #endif
// #ifdef H5
var gaudioctx = uni.createInnerAudioContext()
// #endif
Vue.prototype.$audio = gaudioctx


const app = new Vue({
	store,
	...App
})
app.$mount()
