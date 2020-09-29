import request from '../index.js'

let http = request.http

let http1 = request.http1

// 前台-验证用户是否为首次登录
//userId	true	number		用户ID(后期改为Token)
export const get_user_count = (
	userId
) => {
	return http.get('/user/get_user_count', {
		params: {
			// userId: 1
		}
	})
}

// 前台-查询用户信息
//userId	true	number		用户ID(后期换为Token)
export const get_user_msg = ({
	userId,
	otherUserId
}) => {
	return http.get('/user/get_user_msg', {
		params: {
			// userId,
			otherUserId
		}
	})
}


// 前台-更新用户信息
//userId	true	number		用户ID
// avatar	false	string		用户头像(来自一县一端)
// userSex	false	number		用户性别
// userDate	false	string		用户出生日期
// userAddress	false	string		用户地址
// userSignature	false	string		用户签名
export const update_user_msg = ({
	userDate,
	userAddress,
	userSignature,
	userSex
}) => {
	return http.put('/user/update_user_msg', {
		// userId: 1,
		userDate,
		userAddress,
		userSignature,
		userSex
	})
}

// 前台-获取标签
//labelType	false	number	null	标签库类型(1: 分类 2: 性别 3: 年龄) - 为空查询全部类型
// userId	true	number		用户ID(后期换为Token)
export const get_label = ({
	labelType,
	userId
}) => {
	// let data{
	// 	labelType
	// }
	return http.get('/label/get_label', {
		params: {
			userId,
			labelType
		}
	})
}

// 前台-用户关联标签
// labelRelaType	true	array[object]		标签类型(1: 属分类 2: 属专题 3: 属用户)
// labelId	true	array[object]		标签ID
// typeId	true	array[object]		分类ID |专题ID | 用户ID
export const insert_user_label = (
	data
) => {
	return http.post('/labelRela/insert_user_label',
		data
	)
}

// 获取上传Token
// userId	true	number		用户ID(后期改为Token)
export const get_upload_token = () => {
	return http.get('/common/get_upload_token', {
		params: {
			// userId: 1
		},
	})
}

// 前台-用户关注/粉丝总数
//type	true	number		类型: 1关注 2: 粉丝
// userId	true	number		用户ID(后期改为Token)
export const get_focus_or_fans_count = ({
	type,
	userId,
	otherUserId
}) => {
	return http.get('/user/get_focus_or_fans_count', {
		params: {
			// userId,
			type,
			otherUserId
		},
	})
}

// 是否关注该用户
// userId	true	number		当前用户ID(后期改为Token)
// userFocusId	true	number		主页用户ID
export const is_focus = ({
	userFocusId,
	userId
}) => {
	return http.get('/user/is_focus', {
		params: {
			// userId,
			userFocusId
		},
	})
}

//前台-查询用户(我的)互听作品总和数
//type	true	number		类型: 1关注 2: 粉丝
// userId	true	number		用户ID(后期改为Token)
export const get_user_topic_listen_count = () => {
	return http.get('/user/get_user_topic_listen_count', {
		params: {
			// userId: 1
		},
	})
}

//前台-获取个人(用户/主播)播单/专题
// userAuthorId	true	string		用户ID(后期改为Token)
// topicType	true	string		类型(1: 专题 2:播单)
// pageNum	false	number	1	当前页
// pageSize	false	number	10	每页的数量
export const get_user_play_single = ({
	userAuthorId,
	topicType,
	pageNum,
	pageSize,
	otherUserId
}) => {
	return http.get('/user/get_user_play_single', {
		params: {
			// userAuthorId,
			topicType,
			pageNum,
			pageSize,
			otherUserId
		},
	})
}

//前台-获取用户收藏的专题
// userId	true	number		用户ID(后期改为Token)
export const get_user_collect = ({
	userId,
	otherUserId,
	pageNum,
	pageSize,
}) => {
	return http.get('/collect/get_user_collect', {
		params: {
			// userId,
			otherUserId,
			pageNum,
			pageSize,
		},
	})
}


//前台-查询用户粉丝列表
// userId	true	number		用户ID(后期改为Token)
// pageNum	false	number	1	当前页
// pageSize	false	number	10	每页的数量
export const get_user_fans = ({
	userId,
	pageNum,
	pageSize
}) => {
	return http.get('/user/get_user_fans', {
		params: {
			// userId,
			pageNum,
			pageSize
		},
	})
}

//前台-查询用户关注列表
// userId	true	number		用户ID(后期改为Token)
// pageNum	false	number	1	当前页
// pageSize	false	number	10	每页的数量
export const get_user_focus = ({
	userId,
	pageNum,
	pageSize
}) => {
	return http.get('/user/get_user_focus', {
		params: {
			// userId,
			pageNum,
			pageSize
		},
	})
}

//前台-用户添加关注
// userId	true	number		当前用户ID(后期改为Token)
// userFocusId	true	number		关注的用户ID
export const insert_focus = (userFocusId) => {
	return http.post('/user/insert_focus', {
		// userId: 1,
		userFocusId
	})
}

//前台-用户取消关注
// userId	true	number		当前用户ID(后期改为Token)
// userFocusId	true	number		关注的用户ID
export const delete_focus = (fansId) => {
	return http.delete('/user/delete_focus', {
		fansId
	})
}

//前台-新增播单/专题
// userAuthorId	true	number		创建者用户ID(一县一端)(后期改为Token)
// topicAuthorName	true	string		专题作者(一县一端 + 第三方)
// topicName	true	string		专题名称
// topicDescribe	true	string		专题描述
// topicType	true	number		专题类型(1: 系统默认 2: 用户播单)
// topicImage	true	string		专题图片地址
export const insert_topic = ({
	// topicAuthorName,
	topicName,
	topicDescribe,
	topicType,
	topicImage
}) => {
	return http.post('/topic/insert_topic', {
		// userAuthorId: 1,
		// topicAuthorName,
		topicName,
		topicDescribe,
		topicType,
		topicImage
	})
}

//前台-根据播单ID获取我的播单章节列表
// userAuthorId	true	number		创建者用户ID(一县一端)(后期改为Token)
// topicAuthorName	true	string		专题作者(一县一端 + 第三方)
// topicName	true	string		专题名称
// topicDescribe	true	string		专题描述
// topicType	true	number		专题类型(1: 系统默认 2: 用户播单)
// topicImage	true	string		专题图片地址
export const get_chapter_list_by_topic_single = ({
	userId,
	topicId
}) => {
	return http.get('/chapter/get_chapter_list_by_topic_single', {
		params: {
			// userId,
			topicId
		},
	})
}

//前端-获取我的作品列表
// /userId	true	number		用户id
// sortType	true	number		排序方式 1-时间排序 2-热度排序
export const get_my_creation_list = ({
	userId,
	content,
	sortType,
	pageNum,
	pageSize
}) => {
	return http.get('/listen/get_my_creation_list', {
		params: {
			// userId,
			content,
			sortType,
			pageNum,
			pageSize
		},
	})
}

//前台-查询机构下的主播
// orgUserId	true	number		机构ID(也是用户ID,后期改为Token )
// pageNum	false	number	1	当前页
// pageSize	false	number	10	每页的数量
// otherUserId	false	number	null	非当前机构ID 查询其他机构信息时用
export const get_org_anchor = ({
	orgUserId,
	pageNum,
	pageSize,
	otherUserId
}) => {
	return http.get('/user/get_org_anchor', {
		params: {
			orgUserId,
			pageNum,
			pageSize,
			otherUserId
		},
	})
}

//前台-查询所属机构下的播单/专题
// orgUserId	true	number		机构ID(用户ID,后期改为Token)
// otherUserId	false	number	null	非当前用户ID 查询其他人信息时用
export const get_org_topic = ({
	orgUserId,
	pageNum,
	pageSize,
	otherUserId
}) => {
	return http.get('/topic/get_org_topic', {
		params: {
			orgUserId,
			pageNum,
			pageSize,
			otherUserId
		},
	})
}

//前台-查询用户发布的圈子动态
// userId	true	number		用户ID(后期改为Token)
// pageNum	false	number	1	当前页
// pageSize	false	string	10	每页的数量
// otherUserId	false	number	null	非当前用户ID 查询其他人信息时用
export const get_dynamic_by_userid = ({
	otherUserId,
	pageNum,
	pageSize,
	userId
}) => {
	return http.get('/user/get_dynamic_by_userid', {
		params: {
			otherUserId,
			pageNum,
			pageSize,
			// userId
		},
	})
}

//修改头像
// api/upload/img
export const api_img = ({
	filePath
}) => {
	return http.upload('https://app-auth.iqilu.com/member/avatar', {
		params: {},
		/* 会加在url上 */
		// #ifdef APP-PLUS || H5
		// files: [], // 需要上传的文件列表。使用 files 时，filePath 和 name 不生效。App、H5（ 2.6.15+）
		// #endif
		// #ifdef MP-ALIPAY
		fileType: 'image/video/audio', // 仅支付宝小程序，且必填。
		// #endif
		filePath, // 要上传文件资源的路径。
		name: 'file', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
		header: {
			// 'cookie': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE2Iiwib3JnaWQiOiIyOSIsIm5pY2tuYW1lIjoiXHU0ZjYwXHU1OTdkIiwiYXZhdGFyIjoiaHR0cHM6XC9cL2ltZzExLmlxaWx1LmNvbVwvMjAyMFwvMDZcLzA3XC8xMjJjYjNhOGZkZjc3ZDZiZTYxZjBiZWViYTdhZDhmNC5wbmcifQ.zBZk4iHTU35Zbh8dbmzWJ5Awc2-nsiVM_qm5PSvTg5A'
		},

	})
}


//解析token
// userId	true	number		用户ID(后期改为Token)
export const c_get_user_msg = () => {
	return http.get('/common/get_user_msg', {
		params: {},
	})
}
