<template>
	<view class="myindex">
		<view class="myindex_img">
			<u-navbar background="" title-color="#ffffff" back-icon-color="#ffffff">
			</u-navbar>

			<view class="shudan">
				<view class="shudan_list">
					<u-image width="120rpx" height="120rpx" :src="userInfo.avatar" shape="circle"></u-image>
					<view class="shudan_list_title">
						<view style="display: flex;">
							<view class="pd">
								{{userInfo.nickName}}
							</view>
							<!-- <u-image height="10rpx" width="10rpx" :src="userInfo.avatar"></u-image> -->
						</view>

						<view class="count" v-if="priv ==1 || priv ==2 ">关注:{{guanzhuCount}} 粉丝: {{fensiCount}} </view>
						<!-- <view class="count">关注:{{guanzhuCount}} 粉丝: {{fensiCount}} </view> -->
					</view>
					<u-button type="error" size="mini" :custom-style="customStyle" :style="{ display: lei || priv != 3? 'none':'block' }"
					 v-if="!guanzhu" @tap="handleGuanzhu(userInfo)">+关注</u-button>
					<u-button type="error" size="mini" :custom-style="customStyle" :style="{ display: lei || priv != 3? 'none':'block' }"
					 v-else @tap="handleGuanzhu(userInfo)">已关注</u-button>
				</view>
			</view>

			<view class="myindex_desc">{{userInfo.userSignature | titleFilter(80)}}</view>

			<!-- 弹层 -->
			<!-- <u-popup v-model="show" mode="bottom"  border-radius="30" width="100%" height="950rpx" :mask-close-able="zhezhao" :mask="showzhezhao"> -->
			<drawer ref="drawer-bottom" pos="bottom" standout="930rpx" width="750rpx" height="x-900rpx" @overlayClicked="hide">
				<!-- 主体部分 -->
				<view class="pb-body">
					<view class="pb-title" >
						<view class="pb-title_header">
							<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false"></u-tabs-swiper>
						</view>
					</view>
					<u-gap height="8" bg-color="rgba(230,230,230,0.3)"></u-gap>
					<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" style="height: 850rpx;width: 100%;">
						<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
							<!-- 首页 -->
							<mytabs v-if=" item.name == '首页' " :priv="priv" :userId="userId"></mytabs>
							<ruzhuzhubo v-if=" item.name == '入驻主播' " :priv="priv" :userId="userId"></ruzhuzhubo>
							<dongtai v-if=" item.name == '动态' " :priv="priv" :userId="userId"></dongtai>
							<jigoubodan v-if=" item.name == '拥有播单' " :priv="priv" :userId="userId"></jigoubodan>
						</swiper-item>
					</swiper>
				</view>

			</drawer>
			<!-- </u-popup> -->
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	import jigoubodan from './components/jigoubodan.vue'
	import dongtai from './components/dongtai.vue'
	import ruzhuzhubo from './components/ruzhuzhubo.vue'
	import mytabs from './components/mytabs.vue'
	import drawer from '@/pages/playPage/components/myp-drawer.vue'
	import guanzhu from '@/components/u-guanzhu/u-guanzhu.vue'
	export default {
		components: {
			guanzhu,
			mytabs,
			drawer,
			dongtai,
			ruzhuzhubo,
			jigoubodan
		},
		data() {
			return {
				noline: false,
				zhezhao: false,
				showzhezhao: false,
				list: [],
				current: 0,
				swiperCurrent: 0,
				priv: 0,
				userId: null, // 传递过来的用户ID
				userInfo: {}, // 传递过来的用户信息
				customStyle: {
					width: '113rpx',
					height: '48rpx'
				},
				guanzhuCount: null,
				fensiCount: null,
				guanzhu: false,
				lei: false
			}
		},
		async onLoad(e) {
			// console.log(e);
			this.priv = parseInt(e.priv)
			// this.priv = 3
			this.userId = parseInt(e.userId)
			this.init(this.priv) // 赋值tabs
			this.ifCurrectUser(e.userId)
			if (this.priv != 3) {
				this.getCount(e.userId) //获取 粉丝的数量
			} else {
				// 获取 入住主播和拥有播单
			}

		},
		methods: {
			...mapActions(['get_user_msg', 'get_focus_or_fans_count', 'is_focus', 'get_user_play_single']),
			hide(duration) {
				this.$refs['drawer-bottom'].hide(duration)
			},
			show(duration) {
				this.$refs['drawer-bottom'].show(duration)
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
			},
			init(priv) {
				if (priv == 1 || priv == 2) { // 说明是主播或者用户
					this.list = [{
						name: '首页'
					}, {
						name: '动态'
					}]
				} else { //说明是机构
					this.list = [{
						name: '入驻主播'
					}, {
						name: '拥有播单'
					}]
				}
			},
			// 判断是否是当前用户
			async ifCurrectUser(userId) {
				let _this = this
				uni.getStorage({
					key: 'user',
					success(res) {
						let res1 = JSON.parse(res.data)
						if (userId == res1.userId) { // 如果相等的话 就用获取的用户信息
							// 判断是否关注
							_this.userInfo = res1
							console.log(_this.userInfo);
							if (_this.isPublic(_this.userInfo)) {
								// _this.getBodan()
							} else {
								uni.showToast({
									title: '主页不可见'
								})
							}
							_this.lei = true
						} else {
							// _this.lei = false	
							_this.is_focus({
								userId: res1.userId,
								userFocusId: userId
							}).then(res => {
								_this.guanzhu = res
							})

							// 利用传过来的Id 重新获取用户信息
							_this.get_user_msg({
								userId: 1,
								otherUserId: _this.userId
							}).then(res => {
								_this.userInfo = res
								if (_this.isPublic(_this.userInfo)) {
									// _this.getBodan()
								} else {
									uni.showToast({
										title: '主页不可见'
									})
								}
							})
						}
					}
				});
			},
			// 是否可见
			isPublic(userInfo) {
				if (userInfo.isPublic == 1) {
					return true
				} else {
					return false
				}
			},
			// 点击关注后发生的事情
			handleGuanzhu(userInfo) {
				console.log(this.userInfo);
			},
			// 获取用户的数量
			async getCount(userId) {
				let guanzhuCount = await this.get_focus_or_fans_count({
					type: 1,
					userId: 1,
					otherUserId: userId
				})
				this.guanzhuCount = guanzhuCount
				let fensiCount = await this.get_focus_or_fans_count({
					type: 2,
					userId: 1,
					otherUserId: userId
				})
				this.fensiCount = fensiCount
			}
		}
	}
</script>

<style lang="scss">
	.myindex {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;

		& .myindex_img {
			width: 100%;
			height: 429rpx;
			background: #000000;
		}
	}


	.myindex_desc {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 300;
		color: rgba(229, 244, 255, 1);
		margin-left: 50rpx;
		/* #ifdef H5 */
		margin-top: 34rpx;
		/* #endif */
	}

	.pb {
		&-title {
			width: 750rpx;
			height: 70rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			border-bottom-width: 1px;
			border-bottom-color: $myp-border-color-light;
			background-color: #FFFFFF;
			border-top-left-radius: 24rpx;
			border-top-right-radius: 24rpx;
		}

		&-body {
			width: 750rpx;
			height: 100%;
			background-color: #FFFFFF;
			flex-direction: column;
			align-items: center;
			position: relative;
		}
	}

	.shudan_list {
		display: flex;
		align-items: center;
		margin-bottom: 25rpx;

		& .shudan_list_title {
			margin-left: 23rpx;
			display: block;
			flex-direction: column;

			& .pd {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: white;
			}

			& .count {
				font-size: 21rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #E5E5E5;
				margin-top: 17rpx;
			}
		}
	}

	.ifshow {
		display: block;
	}
</style>
