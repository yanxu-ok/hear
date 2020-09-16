import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import uView from './index.js'
Vue.use(uView);

Vue.config.productionTip = false

// import { WebBridgeApi  } from "ijsbridge"

// console.log(WebBridgeApi);

Vue.filter('titleFilter',function(value,length){
	if(value && value.length > length ){
		return value.slice(0,length) + '...'
	}else{
		return value
	}
})


App.mpType = 'app'

// #ifndef H5
var gaudioctx=uni.getBackgroundAudioManager()
// #endif
// #ifdef H5
var gaudioctx=uni.createInnerAudioContext()
// #endif
Vue.prototype.$audio = gaudioctx


const app = new Vue({
	store,
    ...App
})
app.$mount()
