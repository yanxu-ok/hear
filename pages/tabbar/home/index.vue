<template>
	<view class="all_as_content">
		<!-- 上面的内容 -->
		<view class="top_content">
			<!-- 滑动标签 -->
			<!-- <view class="banner_contain" :style="{ backgroundColor: changeBgcolor.style , transition: changeBgcolor.transtion}" :animation="animationData"></view> -->
			<view class="fixed" :style="{ backgroundColor: changeBgcolor.style}" :animation="animationData">
				<!-- 防止覆盖头部导航栏 -->
				<view class="baoliu"></view>
				<!-- tabs -->
				<view style="display: flex; align-items: center;padding-right: 20rpx;">
					<tabsSwiper ref="uTabs" name="categoryName" :list="tabList" :current="current" :bold="true" @change="tabsChange"
					 :is-scroll="true" swiperWidth="650" style="width:680rpx" font-size="30rpx" :active-color="changeBgcolor.color"
					 :inactive-color="changeBgcolor.color"></tabsSwiper>
					<tags></tags>
				</view>
				<!-- 搜索 -->
				<view class="search_contain">
					<view style="width: 516rpx;">
						<search height="60" input-align="center" :bg-color="changeBgcolor.searchColor" color="#ffffff" placeholder-color="#ffffff"
						 actionText="" @click="handleClickSearch" :disabled="search"></search>
					</view>
					<view class="history" :style="{ backgroundColor: changeBgcolor.searchColor}">
						<view style="position: relative;" @tap="handleNews">
							<u-image width="35rpx" height="33rpx" src="https://img11.iqilu.com/29/2020/09/30/7012921fbaf6ab74f003ae110704a281.png"></u-image>
							<badge :is-dot="true" :show-zero="getNewsRed.isShow" :count="getNewsRed.count" type="error" is-center="true"
							 size="mini"></badge>
						</view>
						<u-image src="https://img11.iqilu.com/29/2020/09/30/af0e82a7f5fefa317a39fe65e654216e.png" width="10rpx" height="52rpx"></u-image>
						<u-image width="34rpx" @click="handleMyClick" height="34rpx" src="https://img11.iqilu.com/29/2020/09/30/d352be1cdc99231236b0b2b7ad3b0b23.png"></u-image>
					</view>
				</view>
			</view>
			<view style="flex:1;flex-direction: column;display: flex;">
				<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="swiper">
					<swiper-item class="swiper-item" v-for="(item, index) in tabList" :key="index">
						<!-- <scroll-view class="scroll" scroll-y="true" @scroll="scroll" show-scrollbar="false" refresher-enabled="true"
						 :refresher-triggered="triggered" :refresher-threshold="50" refresher-default-style="black" refresher-background="none"
						 @refresherrefresh="onRefresh" @refresherrestore="onRestore"> -->
						<scroll-view class="scroll" scroll-y="true" @scroll="scroll" show-scrollbar="false" :refresher-triggered="triggered"
						 :refresher-threshold="50" refresher-default-style="black" refresher-background="none" @refresherrefresh="onRefresh"
						 @refresherrestore="onRestore">
							<template v-if="index == 0">
								<indexContent></indexContent>
							</template>
							<template v-if="current == index && current != 0">
								<category ref="catList" :categoryId="item.categoryId" :categoryCurrect="item"></category>
							</template>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<!-- tabbar -->
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
		setCurrectStorg
	} from '@/libs/hear-util/index.js'
	import tabbar from '@/components/u-tabbar/u-tabbar.vue'
	import category from './components/categoryList.vue'
	import tabsSwiper from '@/components/u-tabs-swiper/u-tabs-swiper.vue'
	import tags from './components/tabs.vue'
	import search from '@/components/u-search/u-search.vue'
	import badge from '@/components/u-badge/u-badge.vue'
	import indexContent from './components/content.vue'
	import config from '@/libs/config/baseUrl.js'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		components: {
			tabbar,
			tabsSwiper,
			tags,
			search,
			badge,
			indexContent,
			category
		},
		computed: {
			...mapState({
				tabbarData: state => state.system.tabBarList,
				bannerList: state => state.app.bannerList
			}),

			changeBgcolor() {
				return {
					style: this.bannerList[this.currectBanner] ? this.bannerList[this.currectBanner].bannerColor : '',
					transtion: 'all 0.2s',
					color: this.tabsColor,
					searchColor: this.sColor
				}
			}
		},

		data() {
			return {
				tabList: [],
				triggered: false,
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				animationData: {},
				scrollTop: 0,
				currectBanner: 0,
				tabsColor: '#ffffff',
				sColor: '#c6c4c8',
				Ani: null,
				search: true,
				token: null,
				getNewsRed: {
					isShow: false,
					count: 0
				}
			}
		},

		async created() {
			let token = getCurrectStorg('token')
			this.token = token
			this.getBanner(1)
		},

		async onShow() {
			let token = getCurrectStorg('token')
			this.token = token
			this.token ? this.getNewsCount() : null

			let list = await this.category() // 获取分类

			list.unshift({
				categoryName: '推荐',
				categoryId: 0
			})

			this.tabList = list
			let stringify = getCurrectStorg('tab')
			let tab
			if (stringify) {
				tab = JSON.parse(stringify)
			}
			if (tab && list.length == tab.length) {} else {
				// console.log(111111111111111, '11111111111111111111111111111111111111111');
				this.swiperCurrent = 0
				this.current = 0
			}

			setCurrectStorg('tab', JSON.stringify(list))
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
								url: config.circle + '/#/?platformKey=ec3ef837337542bab1bbb31584be3047&token=' + getCurrectStorg('token') +
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


			// 获取红点
			async getNewsCount() {
				const count = await this.get_new_msg_count()
				if (count > 0) {
					this.getNewsRed.count = count
					this.getNewsRed.isShow = true
				} else {
					this.getNewsRed.count = 0
					this.getNewsRed.isShow = false
				}
			},

			// 进去消息列表
			handleNews() {
				if (!isLogin()) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
				uni.navigateTo({
					url: '/pagesD/news/news'
				})
			},

			// 历史点击列表
			handleMyClick() {
				if (!isLogin()) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
				uni.navigateTo({
					url: '/pagesD/listpage/listpage?name=' + "播放历史" + '&type=lishi'
				})
			},

			...mapActions(['getBanner', 'category', 'get_new_msg_count']),

			scroll(e) {
				this.scrollTop = e.detail.scrollTop
				if (this.scrollTop >= 23) {
					this.tabsColor = "#333333"
					this.Ani.backgroundColor("white").step({
						duration: 500
					})
					this.animationData = this.Ani.export();
				} else {
					this.tabsColor = "#ffffff"
					let color = this.bannerList[this.currectBanner].bannerColor
					// console.log(color);
					this.Ani.backgroundColor(color).step({
						duration: 500
					})
					this.animationData = this.Ani.export();
				}
			},

			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},

			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},

			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态

			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				// console.log(this.current);

				if (this.current == 0) {
					return;
				}
			},

			onLoad() {
				this.animation()
				// this.deleteEndTabs()
			},

			// 动画
			animation() {
				this.Ani = uni.createAnimation();
				uni.$on('animationfinish', (e) => {
					this.currectBanner = e.detail.current
					let color = this.bannerList[this.currectBanner].bannerColor
					// console.log(color, e.detail.current);
					if (this.scrollTop > 23) {
						return;
					}
					this.Ani.backgroundColor(color).step({
						duration: 1000,
						timingFunction: "ease",
					})
					this.animationData = this.Ani.export();
				})
			},


			hadnleFalse() {
				// return false
			},

			onUnload() {
				// 移除监听事件  
				uni.$off('login');
			},

			// 刷新
			onRefresh() {
				this.triggered = true;
				setTimeout(() => {
					this.triggered = false;
				}, 1500)
			},

			// 复位刷新按钮
			onRestore() {
				// console.log(1);
			},

			// 搜索按钮点击事件
			handleClickSearch(e) {
				console.log(1);
				uni.navigateTo({
					url: '/pagesB/search/search'
				})
			}

		}
	}
</script>

<style lang="scss">
	/* 非H5端，手机顶部状态栏区域会被页面内容覆盖。
	这是因为窗体是沉浸式的原因，即全屏可写内容。
	uni-app提供了状态栏高度的css变量--status-bar-height，如果需要把状态栏的位置从前景部分让出来，可写一个占位div，
	高度设为css变量。 */
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.all_as_content {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		display: flex;
		flex-direction: column;

		& .top_content {
			flex: 1;
			display: flex;
			flex-direction: column;
		}
	}

	.baoliu {
		height: var(--status-bar-height);
		z-index: 999;
	}

	.banner_contain {
		width: 100%;
		height: 458rpx;
		background-color: #2e53ac;
		position: fixed;
		filter: blur(50rpx);
	}

	.history {
		width: 167rpx;
		height: 60rpx;
		border-radius: 30rpx;
		display: flex;
		padding: 0 29rpx;
		justify-content: space-between;
		align-items: center;
	}

	.search_contain {
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		margin-top: 14rpx;
	}

	.swiper {
		/* #ifdef MP-WEIXIN */
		margin-top: 240rpx;
		/* #endif */
		// top: 200rpx;
		width: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		/* #ifdef H5 */
		margin-top: 200rpx;
		/* #endif */

	}

	.scroll {
		height: 100%;
		width: 100%;
	}

	.fixed {
		position: fixed;
		// top: var(--status-bar-height) + 0;
		background-color: #2e53ac;
		width: 100%;
		height: 458rpx;

		&::after {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 1;
			bottom: 0;
			left: 0;
			height: 65%;
			background-image: linear-gradient(to bottom, transparent, #FFF);
		}
	}
</style>
