import {
	get_audio_list,
	get_article_list,
	get_audio_by_id,
	get_reading_together,
	get_article_by_audio_id,
	getWeinConfig,
	insert_audio,
	insert_article,
	get_all_category
} from '@/api/huting/index.js'

export default {
	state: {
		sortType: 1, // 默认的排序方式
		content: '', // 模糊搜索的关键字
		audioInfo: {}, // 互听音频信息
		audioOrActicle: null, // 
		type: null, // 当前是音频 还是文稿
		voicePath: '', // 录制的音频 
		localId: null, // 微信录制完的音频id
		flag: false, // 录制上传的音频
		audioOrauthor: null // 全局保存音频id和读的作者
	},
	getter: {
		getFlag(state) {
			return state.flag
		}
	},
	mutations: {
		// 设置排序的方式
		setSortType(state, value) {
			state.sortType = value
		},

		//设置关键字
		setContent(state, value) {
			state.content = value
		},

		// 设置audioInfo
		setAudioInfo(state, value) {
			state.audioInfo = value
		},

		// 
		setAudioOrActicle(state, value) {
			state.audioOrActicle = value
		},

		//  设置类型
		setType(state, value) {
			state.type = value
		},

		//   录制的音频 
		setVoicePath(state, value) {
			state.voicePath = value
		},

		//微信录制完的音频id
		setLocalId(state, value) {
			state.localId = value
		},

		// 设置 flag
		setFlag(state, value) {
			state.flag = value
		},

		// 全局设置音频的id
		setAudioOrauthor(state, value) {
			state.audioOrauthor = value
		}
	},
	actions: {
		// 前端-获取大家在读列表
		get_audio_list({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				get_audio_list(obj).then(res => {
					// console.log(res.data.data, "前端-获取大家在读列表");
					resolve(res.data.data)
				})
			})
		},

		//前端-获取大家在看列表
		get_article_list({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				get_article_list(obj).then(res => {
					// console.log(res.data.data, "前端-获取大家在看列表");
					resolve(res.data.data)
				})
			})
		},

		// 根据id获取互听音频信息
		get_audio_by_id({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				get_audio_by_id(obj).then(res => {
					// console.log(res.data, "根据id获取互听音频信息");
					resolve(res.data.data)
				})
			})
		},

		// 前端-共同在读
		get_reading_together({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				get_reading_together(obj).then(res => {
					console.log(res.data, "前端-共同在读");
					resolve(res.data.data)
				})
			})
		},

		// 前端-获取对应文稿
		get_article_by_audio_id({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				get_article_by_audio_id(obj).then(res => {
					// console.log(res.data, "前端-获取对应文稿");
					resolve(res.data)
				})
			})
		},

		// 获取微信的js sdk config json
		getWeinConfig({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				getWeinConfig(obj).then(res => {
					// console.log(res, "获取微信的js sdk config json");
					resolve(res)
				})
			})
		},

		// 前端上传音频
		insert_audio({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				insert_audio(obj).then(res => {
					// console.log(res, "前端上传音频");
					resolve(res)
				})
			})
		},

		// 前端上传文稿
		insert_article({
			state,
			commit,
			rootState
		}, obj) {
			return new Promise((resolve, reject) => {
				insert_article(obj).then(res => {
					// console.log(res, "前端上传文稿");
					resolve(res)
				})
			})
		},

		// 获取标签
		get_all_category({
			state,
			commit,
			rootState
		}) {
			return new Promise((resolve, reject) => {
				get_all_category().then(res => {
					console.log(res.data, "获取标签");
					resolve(res.data.data)
				})
			})
		}



	}
}
