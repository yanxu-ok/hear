import Request from '@/libs/luch-request/index.js'
import api from '@/libs/config/baseUrl.js'
// console.log(api.apiUrl);
let baseURL1 = api.comment //李琛 评论的接口
let baseURL = api.apiUrl //张宜成


const http = new Request({
	baseURL,
	timeout: 30000,
})


http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	if (config.url.indexOf('comment_page') != -1) {
		console.log(config);
		config.baseURL = api.comment
		// console.log(config);
		const token = uni.getStorageSync('commentToken');
		config.url += `?token=${token}`
		config.header = {
			"Content-Type": 'application/x-www-form-urlencoded'
		}
		return config
	}
	const token = uni.getStorageSync('token');
	if (token) {
		config.header = {
			token
		}
	} else {
		config.header = {}
	}
	return config
}, config => { // 可使用async await 做异步操作
	return Promise.reject(config)
})

const http1 = new Request({
	baseURL1,
	timeout: 30000,
})


http1.interceptors.request.use((config) => { // 可使用async await 做异步操作
	const token = uni.getStorageSync('token');
	if (token) {
		config.header = {
			token
		}
	} else {
		config.header = {}
	}
	return config
}, config => { // 可使用async await 做异步操作
	return Promise.reject(config)
})

export default {
	http,
	http1
}
