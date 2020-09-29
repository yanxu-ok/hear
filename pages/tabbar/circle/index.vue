<template>
	<view class="quanzi">
		<template v-if="isLogin">
			<!-- <view>圈子</view> -->
			<web-view :webview-styles="webviewStyles" :src="url" @message="message"></web-view>
		</template>
		<tabbar :list="tabbarData" :before-switch="beforeSwitch" height="55px" :mid-button="true" inactive-color="#cbcedd"
		 active-color="#fe9503"></tabbar>
	</view>
</template>

<script>
	// #ifdef H5
	import {
		WebBridgeApi
	} from "ijsbridge"
	// #endif
	import {
		isLogin,
		getCurrectStorg,
		isApp
	} from '@/libs/hear-util/index.js'
	import tabbar from '@/components/u-tabbar/u-tabbar.vue'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		components: {
			tabbar
		},
		computed: {
			...mapState({
				tabbarData: state => state.system.tabBarList
			}),
			url() {
				// return 'http://10.0.117.156:8080/#/?platformKey=ec3ef837337542bab1bbb31584be3047&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjE2Iiwib3JnaWQiOiIyOSIsIm5pY2tuYW1lIjoiXHU0ZjYwXHU1OTdkIiwiYXZhdGFyIjoiaHR0cHM6XC9cL2ltZzExLmlxaWx1LmNvbVwvMjAyMFwvMDZcLzA3XC8xMjJjYjNhOGZkZjc3ZDZiZTYxZjBiZWViYTdhZDhmNC5wbmcifQ.zBZk4iHTU35Zbh8dbmzWJ5Awc2-nsiVM_qm5PSvTg5A'
				// return 'http://10.0.117.248:9998/#/?platformKey=ec3ef837337542bab1bbb31584be3047&token=' + this.token
				return 'http://10.0.117.248:9998/#/?platformKey=ec3ef837337542bab1bbb31584be3047&token=' + this.token +
					'&hearEnv=ok'
			}
		},
		onLoad() {
			let token = getCurrectStorg('token')
			if (!token) {
				this.isLogin = false
				return;
			}
			this.token = token
			this.isLogin = true
		},
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333',
						width: '100%',
						height: '100%'
					}
				},
				isLogin: false,
				token: ''
			}
		},
		methods: {

			beforeSwitch(index) {
				let isLog = isLogin() // 判断用户是否登录
				if (index == 3) {
					if (!isLog) {
						console.log(1);
						uni.navigateTo({
							url: '/pages/login/login'
						})
						return false;
					}
					// #ifdef H5
					if (isApp() == 'chuangqi') {
						WebBridgeApi.router({
							route: 'webapp',
							params: {
								url: 'http://10.0.117.248:9998/#/?platformKey=ec3ef837337542bab1bbb31584be3047&token=' + this.token +
									'&hearEnv=ok'
							}
						})
						return false;
					}
					// #endif
					else {
						return true
					}
				} else if (index == 4) {
					if (!isLog) {
						console.log(1);
						uni.navigateTo({
							url: '/pages/login/login'
						})
						return false;
					} else {
						return true
					}
				} else {
					return true
				}
			},

			message(event) {
				console.log(event.detail.data);
			},

			change(index) {
				console.log(index);
			}

		},
	}
</script>

<style lang="scss">
	// /deep/::-webkit-scrollbar {
	// display: none;
	// width: 0 !important;
	// height: 0 !important;
	// -webkit-appearance: none;
	// background: transparent;
	// }
	.quanzi {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;

		/deep/ & .list-container {
			height: 100%;
			overflow-x: none;
		}
	}
</style>
