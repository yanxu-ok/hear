<template>
	<view class="play_img">
		<u-image width="421rpx" height="422rpx" :fade="true" duration="1550" :src="zhangjieObj.topicImage" border-radius="20rpx"
		 shaw="true">
		</u-image>
		<view class="play_img_bofang">
			<!-- <view style="width: 17rpx;height: 20rpx;"> -->
				<!-- <u-image width="17rpx" height="20rpx" src="@/static/images/play.png"></u-image> -->
				<image src="@/static/images/play.png" style="width: 17rpx;height: 20rpx;"></image>
			<!-- </view> -->
			<view class="play_img_count">{{zhangjieObj.topicReadAmount | numFormat}}播放</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		computed: {
			...mapState({
				zhangjieObj: state => state.play.zhangjieObj
			})
		},
	}
</script>

<style lang="scss">
	.play_img {
		position: relative;
		margin: 116rpx auto 0 165rpx;
		/* #ifdef MP-WEIXIN */
		display: inline-block;
		/* #endif */

		& .play_img_bofang {
			position: absolute;
			display: flex;
			bottom: 20rpx;
			left: 250rpx;
			align-items: center;
		}

		& .play_img_count {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			margin-left: 10rpx;
		}
	}
</style>
