<template>
	<view class="quanzi">
		<web-view :webview-styles="webviewStyles" :style="webViewHeight" :src="url" @message="message"></web-view>
		<tabbar :list="tabbarData" :border-top="true" :before-switch="beforeSwitch" height="55px" :mid-button="true"
		 inactive-color="#cbcedd" active-color="#fe9503"></tabbar>
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
		isApp,
		getScreenHeight
	} from '@/libs/hear-util/index.js'
	import config from '@/libs/config/baseUrl.js'
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
				console.log(config.circle,this.token,'圈子地址和token');
				return config.circle + '/#/?platformKey=ec3ef837337542bab1bbb31584be3047&token=' + this.token +
					'&hearEnv=ok&orgId=' + config.orgid
			},
			
			// 计算webview 的高度
			webViewHeight() {
				return {
					height: 2 * (getScreenHeight() - 80) + 'rpx'
				}
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
						// color: '#FF3333',
						width: '100%'
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
								url: config.circle + '/#/?platformKey=ec3ef837337542bab1bbb31584be3047&token=' + this.token +
									'&hearEnv=ok&orgId=' + config.orgid
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
