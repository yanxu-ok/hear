import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import system from './module/system/index'
import user from './module/user/index'
import app from './module/app/index.js'
import huting from './module/huting/index.js'
import index from './module/index/index.js'
import play from './module/play/index.js'
import my from './module/my/index.js'

const store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		system,
		user,
		app,
		huting,
		index,
		play,
		my
	}
})
export default store
