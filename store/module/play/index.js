import {
	get_chapter_list_by_topic,
	get_introduction_by_topic_id,
	insert_praise_add,
	delete_praise_cancel,
	insert_collect_chapter,
	insert_collect,
	delete_collect,
	delete_collect_chapter,
	insert_history,
	update_history
} from '@/api/play/index.js'

import {
	insert_topic
} from '@/api/my/index.js'

export default {
	state: {
		zhangjieList: [],
		topicId: null, // 当前播放章节的专题id
		zhangjieObj: {} ,//章节简介
		currectPlayIndex:null, //当前正在播放的索引
		currectPlay:{}, // 当前正在播放的item
		play:false //  是否播放
	},
	mutations: {
		// 修改专题
		setTopicId(state, value) {
			state.topicId = value
		},
		// 章节lsit
		setZhangjieList(state, value) {
			state.zhangjieList = value
		},
		setZhangjieObj(state, value) {
			state.zhangjieObj = value
		},
			
		setCurrectPlayIndex(state,value){
			state.currectPlayIndex = value
		},
		setCurrectPlay(state,value){
			state.currectPlay = value
		},
		setPlay(state,value){
			state.play = value
		}
	},
	actions: {

		// 获取章节列表
		get_chapter_list_by_topic({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				get_chapter_list_by_topic(obj).then(res => {
					// console.log(res.data.data, "章节列表");
					// commit("setZhangjieList",res.data.data.list)
					resolve(res.data.data)
				})
			})
		},

		// 获取简介
		get_introduction_by_topic_id({
			state,
			commit,
			rootState
		}, id) {
			return new Promise((resolve, reject) => {
				get_introduction_by_topic_id(id).then(res => {
					// console.log(res.data.data, "获取简介");
					commit("setZhangjieObj", res.data.data)
					resolve(res.data.data)
				})
			})
		},
		
		// 前台-用户对章节/互听点赞
		insert_praise_add({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				insert_praise_add(obj).then(res => {
					console.log(res.data, "前台-用户对章节/互听点赞");
					resolve(res.data)
				})
			})
		},
		
		///前台-用户对章节/互听取消点赞
		delete_praise_cancel({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				delete_praise_cancel(obj).then(res => {
					// console.log(res.data, "前台-用户对章节/互听取消点赞");
					resolve(res.data)
				})
			})
		},
		
		// 前端-用户将章节收藏至个人播单
		insert_collect_chapter({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				insert_collect_chapter(obj).then(res => {
					console.log(res.data, "前端-用户将章节收藏至个人播单");
					resolve(res.data)
				})
			})
		},
		
		//前端-用户收藏专题
		insert_collect({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				insert_collect(obj).then(res => {
					console.log(res.data, "前端-用户收藏专题");
					resolve(res.data)
				})
			})
		},
		
		// 取消收藏专题
		delete_collect({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				delete_collect(obj).then(res => {
					console.log(res.data, "取消收藏专题");
					resolve(res.data)
				})
			})
		},
		
		// 删除 用户收藏的章节
		delete_collect_chapter({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				delete_collect_chapter(obj).then(res => {
					console.log(res.data, "删除 用户收藏的章节");
					resolve(res.data)
				})
			})
		},
		
		// 新增历史数据
		insert_history({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				insert_history(obj).then(res => {
					// console.log(res.data, "新增历史数据");
					resolve(res.data)
				})
			})
		},
		
		//更新历史数据
		update_history({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				update_history(obj).then(res => {
					console.log(res.data, "更新历史数据");
					resolve(res.data)
				})
			})
		},
		
	},
}
