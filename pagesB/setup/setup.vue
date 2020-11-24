<template>
	<view class="width_height">
		<u-navbar background="" title-color="#333333" back-icon-color="#333333">
		</u-navbar>
		<view class="setup_contain">
			<view class="setup_contain_title">设置</view>
			<u-line margin="37rpx 0 37rpx 0"></u-line>
			<view class="flex_space_between" @click="handleLoginOut">
				<view class="setup_contain_item">退出登录</view>
				<u-icon name="arrow-right" color="#999999" size="28"></u-icon>
			</view>
		</view>


		<!-- <backH></backH> -->
	</view>
</template>

<script>
	// import backH from './springBack.vue'
	import {
		cleanStorg
	} from '@/libs/hear-util/index.js'
	export default {
		methods: {
			handleLoginOut() {
				uni.showModal({
				    title: '退出',
				    content: '确定要退出?',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
							cleanStorg()
							
							// 跳转到 首页
							uni.switchTab({
								url: '/pages/tabbar/home/index'
							})
							
				        } else if (res.cancel) {
				            // console.log('用户点击取消');
				        }
				    }
				});
				
			}
		},
		components: {
			// backH
		}
	}
</script>

<style lang="scss">
	.setup_contain {
		width: 690rpx;
		height: 250rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 32rpx 0rpx rgba(3, 22, 38, 0.08);
		border-radius: 20rpx;
		margin: 35rpx auto;
		padding: 40rpx 29rpx 39rpx 30rpx;

		& .setup_contain_title {
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}

		& .setup_contain_item {
			font-size: $uni_font_32;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}

	}
</style>
