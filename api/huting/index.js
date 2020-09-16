import request from '../index.js'

let http = request.http

let http1 = request.http1

// 前端-获取大家在读列表
// sortType	false	number	null	排序方式 1-时间排序 2-热度排序
export const get_audio_list = ({
	sortType,
	pageNum,
	pageSize,
	content
}) => {
	return http.get('/listen/get_audio_list', {
		params: {
			sortType,
			pageNum,
			pageSize,
			content
		}
	})
}

// 前端-获取大家在看列表
// sortType	false	number	null	排序方式 1-时间排序 2-热度排序
export const get_article_list = ({
	sortType,
	pageNum,
	pageSize,
	content
}) => {
	return http.get('/article/get_article_list', {
		params: {
			sortType,
			pageNum,
			pageSize,
			content
		}
	})
}

// 根据id获取互听音频信息
// audioId	true	string		音频id
// userId传查看的专题作者id
// loginId传登录的用户id
export const get_audio_by_id = ({
	audioId,
	userId,
	loginId
}) => {
	return http.get('/listen/get_audio_by_id', {
		params: {
			audioId,
			userId,
			loginId
		}
	})
}

// 前端-共同在读
// audioId	true	string		音频id
export const get_reading_together = ({
	articleId
}) => {
	return http.get('/listen/get_reading_together', {
		params: {
			articleId
		}
	})
}

// 前端-获取对应文稿
// audioId	true	string		音频id
export const get_article_by_audio_id = ({
	audioId
}) => {
	return http.get('/article/get_article_by_audio_id', {
		params: {
			audioId
		}
	})
}

// 获取微信的js sdk config json
export const getWeinConfig = () => {
	return http.get('http://wechat.iqilu.com/api/jsSdkVue')
}

// 前端-上传音频
// userId	true	number		用户id
// articleId	true	number		文稿id
// audioAddress	true	string		音频地址
// audioReadAmount	true	number		阅读量
// audioTime	true	number		音频时长
// praiseNum	true	number		点赞数
// typeId	true	number		类型id
export const insert_audio = ({
	userId,
	articleId,
	audioAddress,
	audioReadAmount,
	audioTime,
	praiseNum,
	typeId
}) => {
	return http.post('/listen/insert_audio', {
		userId,
		articleId,
		audioAddress,
		audioReadAmount: 0,
		audioTime,
		praiseNum: 0,
		typeId: 1
	})
}


// 前端-上传文稿
// userId	true	number	null	作者用户ID
// articleAuthorName	true	string	null	文稿作者(一县一端 + 第三方)
// cover	true	string	null	封面
// articleTitle	true	string	null	文/*  */稿标题
// articleIntroduction	true	string	null	文稿简介
// articleContent	true	string	null	文稿内容
// articleReadAmount	true	number	null	文稿被阅读次数
// circleId	true	number	null	圈子id/*\ */
// articleType	true	number	null	文稿类型（1-听书文稿，2-互听文稿）
export const insert_article = ({
	userId,
	// articleAuthorName,
	cover,
	articleTitle,
	articleIntroduction,
	articleContent,
	articleReadAmount,
	circleId,
	articleType,
	labelIdListStr,
	articleWords
}) => {
	return http.post('/article/insert_article', {
		userId,
		// articleAuthorName,
		cover,
		articleTitle,
		articleIntroduction: '文稿简介',
		articleContent,
		articleReadAmount: 0,
		circleId: 1,
		articleType: 2,
		labelIdListStr,
		articleWords
	})
}


// 获取标签
export const get_all_category = () => {
	return http.get('/category/get_all_category')
}
