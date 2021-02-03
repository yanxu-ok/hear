<template>
	<view style="margin-left:20rpx;z-index: 888;" >
		<u-image width="35rpx" height="35rpx"  @click="handleClick" src="https://img11.iqilu.com/29/2020/09/30/b3a901342e01f16eff737f34389afef4.png"></u-image>
	</view>
</template>

<script>
	import icon from '@/components/u-icon/u-icon.vue'
	import {
		isLogin,
		getCurrectStorg,
		isApp
	} from '@/libs/hear-util/index.js'
	export default {
		components: {
			icon
		},
		methods: {
			handleClick() {
				if (!isLogin()) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
				uni.navigateTo({
					url: '/pagesD/category/category'
				})
			}
		}
	}
</script>

<style></style>
</style>
