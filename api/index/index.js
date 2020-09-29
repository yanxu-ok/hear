import request from '../index.js'

let http = request.http

let http1 = request.http1



// 首页标签
// bannerType	true	number	null	广告类型 1-首页banner
export const banner = (bannerType) => {
	return http.get('/banner/get_banner_by_type', {
		params: {
			bannerType: bannerType,
		}
	})
}

// 获取所有主分类
// loginId	truestring	null	用户id，后期替换为从token中获取
export const category = (loginId) => {
	return http.get('/category/get_all_main_category', {
		params: {
			
		}
	})
}

// 前端-获取近期新增专题（推荐页面和全部，带分页）
// sortType	false	number	null	排序方式 1-时间排序 2-热度排序
// pageNum false
// pageSize false
export const get_recently_topic = (data) => {
	return http.get('/topic/get_recently_topic', {
		params: data
	})
}

// 前端-获取限时免费专题（推荐页面和全部，带分页）
// sortType	false	number	null	排序方式 1-时间排序 2-热度排序
// pageNum false
// pageSize false
export const get_limited_time_free_topic = (data) => {
	return http.get('/topic/get_limited_time_free_topic', {
		params: data
	})
}

// 前端-获取编辑力荐专题（推荐页面和全部，带分页）
// sortType	false	number	null	排序方式 1-时间排序 2-热度排序
// pageNum false
// pageSize false
export const get_recommend_topic = (data) => {
	return http.get('/topic/get_recommend_topic', {
		params: data
	})
}

// 前端-获取编辑力荐专题（推荐页面和全部，带分页）
// billboardType	true	number	null	榜单类型 1-人气 2-销量
// pageNum false
// pageSize false
export const get_billboard_topic = (data) => {
	return http.get('/topic/get_billboard_topic', {
		params: data
	})
}

// 前台-获取搜索排行热度榜
export const get_search_rank = (data) => {
	return http.get('/search/get_search_rank')
}

// 前台-获取搜索分类
// content	true	string		搜索内容(模糊搜索)
export const get_search_category = (content) => {
	return http.get('/search/get_search_category', {
		params: {
			content
		}
	})
}

// 前台-搜索分类下的专题
// 参数名称	是否必须	数据类型	默认值	描述
// categoryId	true	number		分类ID
// content	true	string		搜索内容(模糊搜索)
export const get_topic_by_categoryid = ({
	categoryId,
	content
}) => {
	return http.get('/search/get_topic_by_categoryid', {
		params: {
			categoryId,
			content
		}
	})
}


// 前台-查询用户播放历史
// 参数名称	是否必须	数据类型	默认值	描述
// userId	true	number		用户ID(后期改为Token)
// content	false	string		用户模糊搜索
// pageNum	false	number	1	当前页
// pageSize	false	number	10	每页的数量
export const get_user_play_history = ({
	pageNum,
	pageSize,
	content
}) => {
	return http.get('/history/get_user_play_history', {
		params: {
			// userId: 1,
			pageNum,
			pageSize,
			content,
		}
	})
}

// 根据分类获取专题列表（带分页）
// sortType	true	number		排序方式 1-时间排序 2-热度排序
// categoryId	true	string		专题分类id
export const get_topic_list_by_type = ({
	pageNum,
	pageSize,
	sortType,
	categoryId
}) => {
	return http.get('/topic/get_topic_list_by_type', {
		params: {
			// userId: 1,
			pageNum,
			pageSize,
			sortType,
			categoryId
		}
	})
}
