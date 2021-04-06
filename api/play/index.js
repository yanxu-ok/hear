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
	praiseType,
	topicId
}) => {
	return http.post('/user/insert_praise_add', {
		audioId,
		// userId,
		praiseType,
		topicId
	})
}

// 前台-用户对章节/互听取消点赞
// userId	true	number		用户ID
// praiseType	true	number		点赞对象类型 1-章节 2-互听
// audioId	true	string		章节ID/互听ID
export const delete_praise_cancel = ({
	audioId,
	userId,
	praiseType,
	topicId
}) => {
	return http.delete('/user/delete_praise_cancel', {
		audioId,
		// userId,
		praiseType,
		topicId
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

// 获取评论（圈子，用户前台）
// 参数名称	是否必须	数据类型	默认值	描述
// programId	true	number	null	文稿id
// classifyKey	true	string	null	评论的内容所属的栏目分类key
// orgKey	true	string	null	评论的内容所属的机构key
// platformKey	true	string	null	评论的内容所属的平台key
// pageSize	false	number	10	
// offset	false	number	1
export const get_comment_list = (obj) => {
	return http.get(
		'/comment_page/get_comment_list', {
			params: obj
		}
	)
}

// 回复评论/新增评论数据
// 参数名称	是否必须	数据类型	默认值	描述
// programId	true	number	null	文稿id
//commentContent 	false	string	null	评论内容，该字段和下面的图片存储地址最少有一个是必填，前端控制
// atCommentKey	false	string	null	@的评论key，该字段在回复评论时需要传入1楼评论的评论key
// classifyKey	true	string	null	评论的内容所属的栏目分类key
// orgKey	true	string	null	评论的内容所属的机构key
// platformKey	true	string	null	评论的内容所属的平台key
export const save_comment = (obj) => {
	return http.post(
		'/comment_page/save_comment', obj)
}

// 将听见的token转为评论的token
export const get_comment_manager_token = () => {
	return http.get(
		'/common/get_comment_manager_token')
}

// 前台-新增用户消息通知记录
// 新增消息通知类型:
// - 平台通知类：新版本更新(11)、会员充值成功(12)、到期提醒(13)、内容推荐(14)
// - 互动类：点赞(1)、评论章节/回复(2)、谁发了您的互听(3)
// 例子: 
// majorId说明: ID集合[逗号隔开](根据major_id_type指定对应ID)  
// majorIdType说明: 类型ID集合[逗号隔开](1:专题 2:章节 3:互听)
// majorId值: 23,d129aa803d8dg11eaa577005056a83sf
// majorIdType值: 1,2
// majorIdType中1表示专题2表示章节, 那么majorId对应的23为专题ID, d129aa803d8dg11eaa577005056a83sf为章节ID
// (两个字段一一对应关系,逗号隔开)

// userInformId	true	number	参考值: 7108675	待通知的用户ID
// majorIdType	true	string	参考值: "1,2"	类型ID集合[逗号隔开](1:专题 2:章节 3:互听)
// majorId	true	string	参考值: "23,d129aa803d8dg11eaa577005056a83sf"	ID集合[逗号隔开](根据major_id_type指定对应ID)
// msgType	true	number	参考值: 1	类型 1: 点赞 2: 评论章节 3:谁发了您的互听 11:新版本更新 12:会员充值成功 13:到期提醒 14: 内容推荐
// msgClassify	true	number	参考值: 2	消息类型(1:消息通知 2:互动通知)
// msgContent	true	string	参考值: "赞了您的<亚索>-七里香 - 周杰伦"	消息体内容
// topicListenName	false	string	参考值: 专题名	专题或互听文稿昵称
export const insert_message = (obj) => {
	return http.post(
		'/msg/insert_message', obj)
}


// 评论点赞
// 请求参数
// commentKey	true	string	null	评论主键
export const praise = (obj) => {
	return http.post(
		'/comment_page/praise', obj)
}

// 评论取消点赞
// 请求参数
// commentKey	true	string	null	评论主键
export const cancel_praise = (obj) => {
	return http.post(
		'/comment_page/cancel_praise', obj)
}

// 查询用户下的评论列表（查看当前用户所有评论）
// 请求参数
// 参数名称	是否必须	数据类型	默认值	描述
// classifyKey	false	string	null	评论的内容所属的栏目key
// orgKey	true	string	null	评论的内容所属的机构key
// platformKey	true	string	null	评论的内容所属的平台key
export const get_comment_page = (obj) => {
	return http.get(
		'/comment_page/get_mine_comment', {
			params: obj
	})
}

// 查询文章下的所有的评论的数量
export const get_comment_total = (obj) => {
	return http.get(
		'/comment_page/get_comment_total', {
			params: obj
	})
}


