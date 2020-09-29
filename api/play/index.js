import request from '../index.js'

let http = request.http

let http1 = request.http1

// 前端-根据专题获取章节列表（带分页）
// topicId	true	number	null	话题id
export const get_chapter_list_by_topic = ({
	topicId,
	pageNum,
	pageSize,
	listOrder,
	loginId
}) => {
	return http.get('/chapter/get_chapter_list_by_topic', {
		params: {
			topicId,
			pageNum,
			pageSize,
			listOrder,
			// loginId
		}
	})
}


// 前端-根据专题id获取专题简介
// topicId	true	string		专题id
//userId传查看的专题作者id
// loginId传登录的用户id
export const get_introduction_by_topic_id = ({
	topicId,
	userId
}) => {
	return http.get('/topic/get_introduction_by_topic_id', {
		params: {
			topicId,
			userId
		}
	})
}

// 前台-用户对章节/互听点赞
// userId	true	number		用户ID
// audioId	true	number		章节表ID/互听表ID(uuid)
// praiseType	true	number		点赞对象类型 1-章节 2-互听
export const insert_praise_add = ({
	audioId,
	userId,
	praiseType
}) => {
	return http.post('/user/insert_praise_add', {
		audioId,
		// userId,
		praiseType
	})
}

// 前台-用户对章节/互听取消点赞
// userId	true	number		用户ID
// praiseType	true	number		点赞对象类型 1-章节 2-互听
// audioId	true	string		章节ID/互听ID
export const delete_praise_cancel = ({
	audioId,
	userId,
	praiseType
}) => {
	return http.delete('/user/delete_praise_cancel', {
		audioId,
		// userId,
		praiseType
	})
}

// 前端-用户将章节收藏至个人播单
// userId	true	number		用户ID
// praiseType	true	number		点赞对象类型 1-章节 2-互听
// audioId	true	string		章节ID/互听ID
export const insert_collect_chapter = ({
	radioType,
	chapterId,
	userId,
	topicId
}) => {
	return http.post('/chapter/insert_collect_chapter', {
		// userId,
		chapterId,
		radioType,
		topicId
	})
}

// 前端-用户收藏专题
// loginId	true	number		用户id
// topicId	true	number		专题id
export const insert_collect = ({
	userId,
	topicId
}) => {
	return http.post('/collect/insert_collect', {
		// userId,
		topicId
	})
}

// 取消收藏专题
// loginId	true	number		用户id
// topicId	true	number		专题id
export const delete_collect = ({
	userId,
	topicId
}) => {
	return http.delete('/collect/delete_collect', {
		// userId,
		topicId
	})
}

// 删除 用户收藏的章节
// loginId	true	number		用户id
// topicId	true	number		专题id
export const delete_collect_chapter = ({
	collectChapterId
}) => {
	return http.delete('/chapter/delete_collect_chapter', {
		collectChapterId
	})
}

// 新增历史数据   topicId  专题id
// chapterId  章节id
// radioType  音频类型  1-章节 2-互听
// listenProgress  收听进度 秒
export const insert_history = ({
	topicId,
	chapterId,
	radioType
}) => {
	return http.post('/history/insert_history', {
		topicId,
		chapterId,
		radioType
	})
}

// 更新历史数据    listenProgress  收听进度  topicId专题id   chapterId  章节id
export const update_history = ({
	topicId,
	chapterId,
	listenProgress,
}) => {
	return http.put('/history/update_history', {
		topicId,
		chapterId,
		listenProgress
	})
}
