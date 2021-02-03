<template>
	<view class="jianjie_contain">
		<view class="zhubo">主播介绍</view>
		<!--  -->
		<view class="xilie">
			<view style="width: 88.5rpx; height: 88.5rpx;">
				<u-image width="88.5rpx" height="88.5rpx" :src="zhangjieObj.avatar" border-radius="50%" @click="handleZhubo(zhangjieObj)"></u-image>
			</view>
			<view class="xilie_content">
				<view>{{zhangjieObj.nickName | titleFilter(5)}}</view>
				<view>{{zhangjieObj.userDescribe | titleFilter(8)}}</view>
			</view>
			<!-- #ifdef H5 -->
			<u-button type="error" :custom-style="customStyle" shape="circle" :hair-line="flag" style="margin-right: 0;" @click="handleGuanzhu">{{isFocus}}</u-button>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<u-button type="error" :custom-style="customStyle" shape="circle" :hair-line="flag" style="margin-left: auto;"
			 @click="handleGuanzhu">{{isFocus}}</u-button>
			<!-- #endif -->

		</view>

		<!-- desc -->
		<view class="xilie_desc">
			<!-- 悬疑玄幻都市言情在这里有最好的平台足好听等我的广告合作热线：82837486） -->
			</view>

		<!-- 间隔槽 -->
		<u-gap height="18" bg-color="#F7F7F7" margin-top="35" margin-bottom="35"></u-gap>

		<!-- 专辑简介 -->
		<view class="zhubo">专辑简介</view>

		<!-- <u-read-more :toggle="true" show-height="200">
			<rich-text :nodes="zhangjieObj.topicDescribe"></rich-text>
		</u-read-more> -->
		<scroll-view scroll-y="true" style="overflow-y:auto;margin-top: 38rpx;">
			<view style="padding: 0 30rpx;">{{zhangjieObj.topicDescribe}}</view>
		</scroll-view>

	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		isLogin
	} from '@/libs/hear-util/index.js'
	export default {
		data() {
			return {
				customStyle: {
					background: '#f17673',
					color: 'white',
					width: '113.4rpx',
					height: '48.5rpx',
					border: '0px solid',
					padding: '0 60rpx'
				},
				flag: false
			}
		},
		computed: {
			...mapState({
				zhangjieObj: state => state.play.zhangjieObj
			}),
			isFocus() {
				if (this.zhangjieObj) {
					return this.zhangjieObj.isFocus ? '已关注' : '+关注'
				}
			}
		},
		methods: {
			...mapMutations(['setZhangjieObj']),
			...mapActions(['insert_focus', 'delete_focus']),
			// 关注作者
			async handleGuanzhu() {
			
				let isLog = isLogin() // 判断用户是否登录
				if (!isLog) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}

				if (this.zhangjieObj.isFocus) { // 说明已经关注了 需要取消关注

					let result = await this.delete_focus(this.zhangjieObj.fansId)
					if (result.success) {
						let newObj = this.zhangjieObj
						newObj.isFocus = 0
						this.setZhangjieObj(newObj)
						uni.showToast({
							title: "取消成功",
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: result.errmsg,
							icon: 'none'
						})
					}

				} else { // 需要关注
					let result = await this.insert_focus(this.zhangjieObj.userAuthorId)
					if (result.success) {
						let newObj = this.zhangjieObj
						newObj.isFocus = 1
						this.setZhangjieObj(newObj)
						uni.showToast({
							title: "关注成功",
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: result.errmsg,
							icon: 'none'
						})
					}
				}
			},

			// 跳转到主播页
			handleZhubo(zhangjieObj) {
				console.log(zhangjieObj);
				uni.navigateTo({
					url: '/pagesA/myindex/myindex?userId=' +
						zhangjieObj.userAuthorId + '&priv=2'
				})
			}

		}
	}
</script>

<style lang="scss">
	.jianjie_contain {
		height: 100%;
		display: flex;
		flex-direction: column;

		& .zhubo {
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			padding-left: 25rpx;
			margin-top: 35rpx;
		}

		& .xilie {
			display: flex;
			justify-content: flex-start;
			padding: 0 26rpx 0 26rpx;
			margin-top: 27rpx;
		}

		& .xilie_content {
			display: flex;
			margin-left: 24rpx;
			width: 250rpx;
			/* #ifdef MP-WEIXIN */
			// margin-left: -70rpx;
			/* #endif */
			flex-direction: column;
		}

		& .xilie_desc {
			width: 700rpx;
			height: 135rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(85, 85, 85, 1);
			line-height: 36rpx;
			margin: 25rpx auto 0 auto;
			// background: rgba(241, 243, 245, 1);
			opacity: 0.6;
			border-radius: 10rpx;
			padding: 36rpx 34rpx 36rpx 25rpx;
		}
	}
</style>
