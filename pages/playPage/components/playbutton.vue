<template>
	<!-- <playbutton></playbutton> -->
	<view class="play_button_contain">
		<u-image width="32rpx" height="36rpx" src="@/static/images/shang.png" style="margin-right: 118rpx;"></u-image>
		<u-image width="49rpx" height="63rpx" src="@/static/images/bofang.png" @tap="handleBofang"></u-image>
		<u-image width="32rpx" height="35rpx" src="@/static/images/xia.png" style="margin-left: 118rpx;"></u-image>
	</view>
</template>

<script>
		
	export default{
		}
</script>

<style>
	.play_button_contain{
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 72rpx;
	}
</style>
