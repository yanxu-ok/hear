import Request from '@/libs/luch-request/index.js'
let baseURL1 = 'http://10.0.117.182:71' //李琛
let baseURL = 'http://10.0.117.184:71' //张宜成

const http = new Request({
	baseURL,
	timeout: 30000,
})

http.interceptors.request.use((config) => { // 可使用async await 做异步操作
  config.header = {
	token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6IuWtn-WHoeW5syIsImlkIjoiMSIsImF2YXRhciI6Imh0dHBzOi8vaW1nMTEuaXFpbHUuY29tLzIwMjAvMDcvMjIvNjU2MjZjOTZhZjY2ZjIzMWE4NTY4ZTU4N2VkMzUwZTQucG5nIiwiaWF0IjoxNTk5NzMxMDU1LCJvcmdpZCI6IjI5In0.giDy7TF5qtCu5mgLm8P5-Su-m5-dMTaOLQl8FLhn9rI'
  }
   console.log(config);

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
	token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuaWNrbmFtZSI6IuWtn-WHoeW5syIsImlkIjoiMSIsImF2YXRhciI6Imh0dHBzOi8vaW1nMTEuaXFpbHUuY29tLzIwMjAvMDcvMjIvNjU2MjZjOTZhZjY2ZjIzMWE4NTY4ZTU4N2VkMzUwZTQucG5nIiwiaWF0IjoxNTk5NzMxMDU1LCJvcmdpZCI6IjI5In0.giDy7TF5qtCu5mgLm8P5-Su-m5-dMTaOLQl8FLhn9rI'
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
