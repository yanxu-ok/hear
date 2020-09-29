import {
	tabBarList
} from './data.js'


export default {
	state: {
		tabBarList,
		key: '', // 验证码的key，
		code: '', // 验证码
		phone: '', // 用户登录的手机号
		token: '' // 用户登录的token
	},
	mutations: {
		setPhoneKey(state, value) {
			state.key = value
		},
		setPhoneCode(state, value) {
			state.code = value
		},
		setPhone(state, value) {
			state.phone = value
		},
		setToken(state, value) {
			state.token = value
		},
	},
	actions: {},
}
