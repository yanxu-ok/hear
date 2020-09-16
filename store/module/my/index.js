import {
	get_user_count,
	get_user_msg,
	get_label,
	insert_user_label,
	get_upload_token,
	update_user_msg,
	get_focus_or_fans_count,
	get_user_topic_listen_count,
	get_user_play_single,
	get_user_collect,
	get_user_fans,
	get_user_focus,
	insert_focus,
	delete_focus,
	insert_topic,
	is_focus,
	get_chapter_list_by_topic_single,
	get_my_creation_list,
	get_org_anchor,
	get_org_topic,
	get_dynamic_by_userid
} from '@/api/my/index.js'

export default {
	state: {
		count: null ,// 用户登录的次数,
		userInfo:null, //用户信息
	},
	mutations: {
		setCount(state, value) {
			state.count = value
		},
		setUserInfo(state, value) {
			state.userInfo = value
		}
	},
	actions: {
		// 获取用户登录次数
		get_user_count({
			state,
			commit,
			rootState
		}) {
			return new Promise((resolve, reject) => {
				get_user_count().then(res => {
					// console.log(res.data.data, "用户是否首次登陆");
					commit('setCount', res.data.data)
					resolve(res.data.data)
				})
			})
		},
		
		// 查询用户信息
		get_user_msg({
			state,
			commit,
			rootState
		},obj) {
			// console.log(otherUserId);
			return new Promise((resolve, reject) => {
				get_user_msg(obj).then(res => {
					// console.log(res.data.data.list, "用户信息");
					commit('setUserInfo', res.data.data.list[0])
					resolve(res.data.data.list[0])
				})
			})
		},
		
		// 获取标签
		get_label({
			state,
			commit,
			rootState
		},obj) {
			return new Promise((resolve, reject) => {
				get_label(obj).then(res => {
					// console.log(res.data.data, "获取标签");
					resolve(res.data.data)
				})
			})
		},
		
		// 修改标签
		insert_user_label({
			state,
			commit,
			rootState
		},obj) {
			return new Promise((resolve, reject) => {
				insert_user_label(obj).then(res => {
					// console.log(res.data, "修改标签");
					resolve(res.data)
				})
			})
		},
		
		// 获取上传图片token
		get_upload_token({
			state,
			commit,
			rootState
		}) {
			return new Promise((resolve, reject) => {
				get_upload_token().then(res => {
					// console.log(res.data.data, "上传token");
					resolve(res.data.data)
				})
			})
		},
		
		// 更新用户信息
		update_user_msg({
			state,
			commit,
			rootState
		},obj) {
			return new Promise((resolve, reject) => {
				update_user_msg(obj).then(res => {
					// console.log(res.data, "更新信息");
					resolve(res.data)
				})
			})
		},
		
		// 获取用户的粉丝和关注数量
		get_focus_or_fans_count({
			state,
			commit,
			rootState
		},obj) {
			return new Promise((resolve, reject) => {
				get_focus_or_fans_count(obj).then(res => {
					// console.log(res.data, "用户粉丝和关注");
					resolve(res.data.data)
				})
			})
		},
		
		// 是否已经关注
		is_focus({
			state,
			commit,
			rootState
		},obj) {
			return new Promise((resolve, reject) => {
				is_focus(obj).then(res => {
					// console.log(res.data, "是否已经关注");
					resolve(res.data.data)
				})
			})
		},
		
		// 获取用户的作品
		get_user_topic_listen_count({
			state,
			commit,
			rootState
		}) {
			return new Promise((resolve, reject) => {
				get_user_topic_listen_count().then(res => {
					// console.log(res.data, "获取用户的作品");
					resolve(res.data.data)
				})
			})
		},
		
		// 前台-获取个人(用户/主播)播单/专题
		get_user_play_single({
			state,
			commit,
			rootState
		},type) {
			return new Promise((resolve, reject) => {
				get_user_play_single(type).then(res => {
					// console.log(res.data, "播单或者专题");
					resolve(res.data.data)
				})
			})
		},
		
		// 获取用户的专题
		get_user_collect({
			state,
			commit,
			rootState
		},obj) {
			return new Promise((resolve, reject) => {
				get_user_collect(obj).then(res => {
					// console.log(res.data, "获取用户的专题");
					resolve(res.data.data)
				})
			})
		},
		
		// 获取用户粉丝的
		get_user_fans({
			state,
			commit,
			rootState
		},obj) {
			return new Promise((resolve, reject) => {
				get_user_fans(obj).then(res => {
					// console.log(res.data, "获取用户粉丝");
					resolve(res.data.data)
				})
			})
		},
		
		// 用户关注列表
		get_user_focus({
			state,
			commit,
			rootState
		},obj) {
			return new Promise((resolve, reject) => {
				get_user_focus(obj).then(res => {
					// console.log(res.data, "用户关注列表");
					resolve(res.data.data)
				})
			})
		},
		
		// 用户添加关注
		insert_focus({
			state,
			commit,
			rootState
		},id) {
			return new Promise((resolve, reject) => {
				insert_focus(id).then(res => {
					console.log(res.data, "用户添加关注");
					resolve(res.data)
				})
			})
		},
		
		// 用户取消关注
		delete_focus({
			state,
			commit,
			rootState
		},fansId) {
			return new Promise((resolve, reject) => {
				delete_focus(fansId).then(res => {
					console.log(res.data, "用户取消关注");
					resolve(res.data)
				})
			})
		},
		
		// 新增播单
		insert_topic({
			state,
			commit,
			rootState
		},obj) {
			return new Promise((resolve, reject) => {
				insert_topic(obj).then(res => {
					// console.log(res.data, "新增播单");
					resolve(res.data)
				})
			})
		},
		
		// 前台-根据播单ID获取我的播单章节列表
		get_chapter_list_by_topic_single({
			state,
			commit,
			rootState
		},obj) {
			return new Promise((resolve, reject) => {
				get_chapter_list_by_topic_single(obj).then(res => {
					// console.log(res.data, "获取我的播单章节列表");
					resolve(res.data.data)
				})
			})
		},
		
		// 前端-获取我的作品列表
		get_my_creation_list({
			state,
			commit,
			rootState
		},obj) {
			return new Promise((resolve, reject) => {
				get_my_creation_list(obj).then(res => {
					// console.log(res.data, "前端-获取我的作品列表");
					resolve(res.data.data)
				})
			})
		},
		
		// 前台-查询机构下的主播
		get_org_anchor({
			state,
			commit,
			rootState
		},obj) {
			return new Promise((resolve, reject) => {
				get_org_anchor(obj).then(res => {
					console.log(res.data, "前台-查询机构下的主播");
					resolve(res.data.data)
				})
			})
		},
		
		//前台-查询所属机构下的播单/专题
		get_org_topic({
			state,
			commit,
			rootState
		},obj) {
			return new Promise((resolve, reject) => {
				get_org_anchor(obj).then(res => {
					console.log(res.data, "前台-查询所属机构下的播单/专题");
					resolve(res.data.data)
				})
			})
		},
		
		//前台-查询用户发布的圈子动态
		get_dynamic_by_userid({
			state,
			commit,
			rootState
		},obj) {
			return new Promise((resolve, reject) => {
				get_dynamic_by_userid(obj).then(res => {
					console.log(res.data, "前台-查询用户发布的圈子动态");
					resolve(res.data.data)
				})
			})
		},
	},
}
