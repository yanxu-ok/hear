<template>
	<!-- 底部 -->
	<view class="pb_bottom">
		<view class="input">欢迎发表你的观点</view>
		<view style="margin-left: 39rpx;">
			<u-image width="41rpx" height="38rpx" src="@/static/images/comment.png"></u-image>
			<view class="pb_bottom_wenzi">590</view>
		</view>
		<u-image width="38rpx" height="38rpx" src="@/static/images/zhuanfa.png" style="margin-left: 50rpx;"></u-image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				type: 'text',
				border: true,
			}
		}
	}
</script>

<style lang="scss">
	.pb_bottom {
		width: 100%;
		height: 90rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 32rpx 0px rgba(2, 22, 38, 0.08);
		position: absolute;
		bottom: 0;
		padding-top: 10rpx;
		display: flex;
		flex-direction: row;

		& .input {
			width: 510.3rpx;
			height: 65rpx;
			background: rgba(241, 243, 245, 1);
			border-radius: 32rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			text-align: center;
			line-height: 65rpx;
			margin-left: 24rpx;
		}
		
		& .pb_bottom_wenzi{
			font-size:18rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
		}
	}
</style>
