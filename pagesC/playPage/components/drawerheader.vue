<template>
	<!-- 头部 -->
	<view class="now_header">
		<view style="width: 204rpx; height: 204rpx;">
			<u-image width="204rpx" height="204rpx" :src="zhangjieObj.topicImage" border-radius="10rpx"></u-image>
		</view>
		<view class="now_header_content">
			<view class="now_header_content_text">
				{{zhangjieObj.topicName | titleFilter(22)}}
			</view>
			<view class="now_header_count">
				<view class="ji">共{{zhangjieObj.chapterCount | numFormat}}集</view>
				<u-button :custom-style="customStyle" :hair-line="flag" :ripple="true" ripple-bg-color="#FFE8D1" size="mini" shape="circle"
				 @click="handleClickShoucang">{{isShoucang}}</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		isLogin
	} from '@/libs/hear-util/index.js'
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				customStyle: {
					color: '#ef9836',
					background: "#FFE8D1",
					width: '150rpx',
					height: '60rpx',
					border: '0px',
					marginRight: '0'
				},
				flag: false,
			}
		},
		
		computed: {
			
			...mapState({
				zhangjieObj: state => state.play.zhangjieObj,
				zhangjieList: state => state.play.zhangjieList,
			}),

			// 是否收藏
			isShoucang() {
				if (this.zhangjieList.length != 0) {
					return this.zhangjieList[0].isCollect ? '已收藏' : '+收藏'
				}
			}
		},
		
		methods: {
			...mapMutations(['setZhangjieList']),
			...mapActions(['insert_collect', 'delete_collect']),
			// 收藏专题
			async handleClickShoucang() {
				let isLog = isLogin() // 判断用户是否登录
				if (!isLog) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
				let data = {
					userId: 1,
					topicId: this.zhangjieObj.topicId
				}
				if (this.zhangjieList[0].isCollect) { // 说明已经收藏了
					let result = await this.delete_collect(data)
					if (result.success) { // 遍历 list 将 所有的list 的isCollect 改为 1
						let zhangjieList = this.zhangjieList
						zhangjieList.forEach((item, index) => {
							item.isCollect = 0;
						})
						this.setZhangjieList(zhangjieList)
						console.log(zhangjieList);
						uni.showToast({
							title: '取消成功',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '取消失败',
							icon: 'none'
						})
					}
				} else { // 说明没有收藏
					let result = await this.insert_collect(data)
					if (result.success) { // 遍历 list 将 所有的list 的isCollect 改为 1
						let zhangjieList = this.zhangjieList
						zhangjieList.forEach((item, index) => {
							item.isCollect = 1;
						})
						this.setZhangjieList(zhangjieList)
						console.log(zhangjieList);
						uni.showToast({
							title: '收藏专题成功',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '收藏失败',
							icon: 'none'
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.now_header {
		height: 205rpx;
		// margin: 0 25rpx;
		padding: 0 27rpx 0 25rpx;
		display: flex;

		& .now_header_content {
			margin-left: 15rpx;
			display: flex;
			flex-direction: column;
			flex: 1;
			justify-content: space-between;
			/* #ifdef MP-WEIXIN */
			margin-right: 25rpx;
			/* #endif */


			& .now_header_content_text {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #343434;
			}
		}

		& .now_header_count {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		& .ji {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
		}
	}
</style>
