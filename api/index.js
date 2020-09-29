import Request from '@/libs/luch-request/index.js'
let baseURL1 = 'http://10.0.117.182:71' //李琛
let baseURL = 'http://10.0.117.184:71' //张宜成

const http = new Request({
	baseURL,
	timeout: 30000,
})

http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	const token = uni.getStorageSync('token');
	// console.log(config);
	if (token) {
		config.header = {
			// token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6IuWtn-WHoeW5syIsImlkIjoiMSIsImF2YXRhciI6Imh0dHBzOi8vaW1nMTEuaXFpbHUuY29tLzIwMjAvMDcvMjIvNjU2MjZjOTZhZjY2ZjIzMWE4NTY4ZTU4N2VkMzUwZTQucG5nIiwiaWF0IjoxNTk5NzMxMDU1LCJvcmdpZCI6IjI5In0.giDy7TF5qtCu5mgLm8P5-Su-m5-dMTaOLQl8FLhn9rI'
			// token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE2Iiwib3JnaWQiOiIyOSIsIm5pY2tuYW1lIjoiXHU0ZjYwXHU1OTdkIiwiYXZhdGFyIjoiaHR0cHM6XC9cL2ltZzExLmlxaWx1LmNvbVwvMjAyMFwvMDZcLzA3XC8xMjJjYjNhOGZkZjc3ZDZiZTYxZjBiZWViYTdhZDhmNC5wbmcifQ.zBZk4iHTU35Zbh8dbmzWJ5Awc2-nsiVM_qm5PSvTg5A'
			// eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6IuW8oOWunOaIkOWViiIsImlkIjoiNDE3ODk3MSIsImF2YXRhciI6Imh0dHBzOi8vZHNzMC5iZHN0YXRpYy5jb20vNzBjRnZIU2hfUTFZbnhHa3BvV0sxSEY2aGh5L2l0L3U9Mjg1Njg0Njg3OSwzODkyNzkxMTUmZm09MjYmZ3A9MC5qcGciLCJpYXQiOjE2MDA3MzczNzcsIm9yZ2lkIjoiMTYifQ.LsYSu3jrF1q26NNR5ixEONiuLyTUZgbs8c2DGoSrtxc // 主播token
			// token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE2Iiwib3JnaWQiOiIyOSIsIm5pY2tuYW1lIjoiXHU0ZjYwXHU1OTdkIiwiYXZhdGFyIjoiaHR0cHM6XC9cL2ltZzExLmlxaWx1LmNvbVwvMjAyMFwvMDZcLzA3XC8xMjJjYjNhOGZkZjc3ZDZiZTYxZjBiZWViYTdhZDhmNC5wbmcifQ.zBZk4iHTU35Zbh8dbmzWJ5Awc2-nsiVM_qm5PSvTg5A' // 测试用的头像
			token
		}
	} else {
		config.header = {
			// 	// token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6IuWtn-WHoeW5syIsImlkIjoiMSIsImF2YXRhciI6Imh0dHBzOi8vaW1nMTEuaXFpbHUuY29tLzIwMjAvMDcvMjIvNjU2MjZjOTZhZjY2ZjIzMWE4NTY4ZTU4N2VkMzUwZTQucG5nIiwiaWF0IjoxNTk5NzMxMDU1LCJvcmdpZCI6IjI5In0.giDy7TF5qtCu5mgLm8P5-Su-m5-dMTaOLQl8FLhn9rI'
			// 	// token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE2Iiwib3JnaWQiOiIyOSIsIm5pY2tuYW1lIjoiXHU0ZjYwXHU1OTdkIiwiYXZhdGFyIjoiaHR0cHM6XC9cL2ltZzExLmlxaWx1LmNvbVwvMjAyMFwvMDZcLzA3XC8xMjJjYjNhOGZkZjc3ZDZiZTYxZjBiZWViYTdhZDhmNC5wbmcifQ.zBZk4iHTU35Zbh8dbmzWJ5Awc2-nsiVM_qm5PSvTg5A'
			// 	// token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE2Iiwib3JnaWQiOiIyOSIsIm5pY2tuYW1lIjoiXHU0ZjYwXHU1OTdkIiwiYXZhdGFyIjoiaHR0cHM6XC9cL2ltZzExLmlxaWx1LmNvbVwvMjAyMFwvMDZcLzA3XC8xMjJjYjNhOGZkZjc3ZDZiZTYxZjBiZWViYTdhZDhmNC5wbmcifQ.zBZk4iHTU35Zbh8dbmzWJ5Awc2-nsiVM_qm5PSvTg5A'
		}
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
	config.header = {
		token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE2Iiwib3JnaWQiOiIyOSIsIm5pY2tuYW1lIjoiXHU0ZjYwXHU1OTdkIiwiYXZhdGFyIjoiaHR0cHM6XC9cL2ltZzExLmlxaWx1LmNvbVwvMjAyMFwvMDZcLzA3XC8xMjJjYjNhOGZkZjc3ZDZiZTYxZjBiZWViYTdhZDhmNC5wbmcifQ.zBZk4iHTU35Zbh8dbmzWJ5Awc2-nsiVM_qm5PSvTg5A'

		// token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6IuWtn-WHoeW5syIsImlkIjoiMSIsImF2YXRhciI6Imh0dHBzOi8vaW1nMTEuaXFpbHUuY29tLzIwMjAvMDcvMjIvNjU2MjZjOTZhZjY2ZjIzMWE4NTY4ZTU4N2VkMzUwZTQucG5nIiwiaWF0IjoxNTk5NzMxMDU1LCJvcmdpZCI6IjI5In0.giDy7TF5qtCu5mgLm8P5-Su-m5-dMTaOLQl8FLhn9rI'
	}
	// console.log(config);

	return config
}, config => { // 可使用async await 做异步操作
	return Promise.reject(config)
})

export default {
	http,
	http1
}
