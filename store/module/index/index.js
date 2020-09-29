import {
	banner,
	category,
	get_recently_topic,
	get_limited_time_free_topic,
	get_recommend_topic,
	get_billboard_topic,
	get_search_rank,
	get_search_category,
	get_topic_by_categoryid,
	get_user_play_history,
	get_topic_list_by_type
} from '@/api/index/index.js'

import {
	changeArr
} from '@/libs/hear-util/index.js'

export default {
	state: {},
	mutations: {},
	actions: {
		// 获取首页banner
		getBanner({
			state,
			commit,
			rootState
		}, bannerType) {
			return new Promise((resolve, reject) => {
				banner(bannerType).then(res => {
					// console.log(res.data.data, "banner");
					let bannerList = res.data.data
					changeArr(bannerList)
					rootState.app.bannerList = bannerList
					// commit('setBannerList',bannerList)
					// resolve(bannerList)
				}).catch(err => {
					reject(err)
				})
			})
		},
		// 获取所有主分类
		category({
			state,
			commit,
			rootState
		}) {
			return new Promise((resolve, reject) => {
				category().then(res => {
					// console.log(res.data.data, "category");
					resolve(res.data.data)
				})
			})
		},

		// 近期新增
		get_recently_topic({
			state,
			commit,
			rootState
		}, data) {
			return new Promise((resolve, reject) => {
				get_recently_topic(data).then(res => {
					// console.log(res.data.data, "近期新增");
					resolve(res.data.data)
				})
			})
		},

		// 限时免费
		get_limited_time_free_topic({
			state,
			commit,
			rootState
		}, data) {
			return new Promise((resolve, reject) => {
				get_limited_time_free_topic(data).then(res => {
					// console.log(res.data.data, "限时免费");
					resolve(res.data.data)
				})
			})
		},

		// 编辑力荐
		get_recommend_topic({
			state,
			commit,
			rootState
		}, data) {
			return new Promise((resolve, reject) => {
				get_recommend_topic(data).then(res => {
					// console.log(res.data.data, "编辑力荐");
					resolve(res.data.data)
				})
			})
		},

		// 各种排行榜信息
		get_billboard_topic({
			state,
			commit,
			rootState
		}, data) {
			return new Promise((resolve, reject) => {
				get_billboard_topic(data).then(res => {
					// console.log(res.data, "各种排行榜");
					resolve(res.data.data)
				})
			})
		},

		// 热门的搜索
		get_search_rank({
			state,
			commit,
			rootState
		}) {
			return new Promise((resolve, reject) => {
				get_search_rank().then(res => {
					// console.log(res.data, "热门的搜索");
					resolve(res.data.data)
				})
			})
		},

		// 搜索下的分类
		get_search_category({
			state,
			commit,
			rootState
		}, content) {
			return new Promise((resolve, reject) => {
				get_search_category(content).then(res => {
					// console.log(res, "搜索下的分类");
					resolve(res.data.data)
				})
			})
		},
		
		// 分类下的专题
		get_topic_by_categoryid({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				get_topic_by_categoryid(obj).then(res => {
					console.log(res, "搜索下的专题");
					resolve(res.data.data)
				})
			})
		},
		
		// 播放历史
		get_user_play_history({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				get_user_play_history(obj).then(res => {
					console.log(res, "播放历史");
					resolve(res.data.data)
				})
			})
		},
		
		// 根据分类获取专题列表（带分页）
		get_topic_list_by_type({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				get_topic_list_by_type(obj).then(res => {
					console.log(res, "根据分类获取专题列表");
					resolve(res.data.data)
				})
			})
		},
		
		
	}
}
