// import {tabBarList} from './data.js'

export default {
	state: {
		tabList: [{
				id: 1,
				name: '待收货'
			}, {
				id: 2,
				name: '待付款'
			}, {
				id: 3,
				name: '待评价'
			},
			{
				id: 4,
				name: '待评价'
			},
			{
				name: '4'
			},
			{
				name: '5'
			},
			{
				name: '6'
			}
		],
		play: false // 全局播放状态
	},
	mutations: {
		// 播放状态修改
		editPlay(state, value) {
			state.play = value
		}
	},
	actions: {},
}
