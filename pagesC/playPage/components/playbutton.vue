<template>
	<!-- <playbutton></playbutton> -->
	<view class="play_button_contain">
		<u-image width="32rpx" height="36rpx" src="https://img11.iqilu.com/29/2020/09/30/575c5d579b43015f2bed559a314c8735.png" style="margin-right: 118rpx;"></u-image>
		<u-image width="49rpx" height="63rpx" src="https://img11.iqilu.com/29/2020/09/30/3efdd9fcd0ed34b3988fe7af5435dcd3.png" @tap="handleBofang"></u-image>
		<u-image width="32rpx" height="35rpx" src="https://img11.iqilu.com/29/2020/09/30/39d25a229e4f1f2b82e131a760f03f6c.png" style="margin-left: 118rpx;"></u-image>
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
