// // 测试的
// let BASE_Url,
// 	orgid,
// 	apiUrl,
// 	circle,
// 	comment,
// 	requestComment
// if (process.env.NODE_ENV === 'development') {
// 	BASE_Url = '' // 登录的地址
// 	orgid = 3 // test
// 	apiUrl = 'http://10.0.117.184:71'   // 本地听见测试地址
// 	circle = 'http://10.0.117.248:9998' // 圈子的api地址
// 	comment = '' // 评论的测试地址
// 	requestComment = {
// 		platformKey: 'ec3ef837337542bab1bbb31584be3047',
// 		orgKey: '3'
// 	}
// } else {
// 	BASE_Url = '' // 登录的测试地址
// 	orgid = 3 // test
// 	apiUrl = 'http://10.0.117.248:71' // 听见的测试地址
// 	circle = 'http://10.0.117.248:9998'
// 	comment = 'http://10.0.117.248:8091' // 评论的测试地址
// 	requestComment = {
// 		platformKey: 'ec3ef837337542bab1bbb31584be3047',
// 		orgKey: '3'
// 	}
// }


// 正式的
let BASE_Url,
	orgid,
	apiUrl,
	circle,
	comment,
	requestComment
if (process.env.NODE_ENV === 'development') {
	BASE_Url = '' // 登录的地址
	orgid = 3 // test
	apiUrl = 'http://10.0.117.184:71'   // 本地听见测试地址
	circle = 'http://10.0.117.248:9998' // 圈子的api地址
	comment = '' // 评论的测试地址
	requestComment = {
		platformKey: 'ec3ef837337542bab1bbb31584be3047',
		orgKey: '3'
	}
} else {
	BASE_Url = '' // 登录的测试地址
	orgid = 3 // test
	apiUrl = 'https://xygb.iqilu.com/api' // 听见的测试地址
	circle = 'https://app-community.iqilu.com/community/'
	comment = 'https://app-comment.iqilu.com/api' // 评论的测试地址
	requestComment = {
		platformKey: 'ec3ef837337542bab1bbb31584be3047',
		orgKey: '3'
	}
}


export default {
	BASE_Url,
	orgid,
	apiUrl,
	circle,
	comment,
	requestComment,
}
