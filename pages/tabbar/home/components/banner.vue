<template>
	<view style="width: 710rpx;margin: 0 auto;">
		<!-- <scroll-view scroll-y style="height: 1000rpx;width: 100%;" @scrolltolower="onreachBottom"> -->
		<u-swiper :list="bannerList" height="327rpx" mode="round" indicator-pos="bottomLeft" @transition="transition"
		 @animationfinish="animationfinish"></u-swiper>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState({
				bannerList: state => state.app.bannerList
			})
		},
		methods: {
			transition(e) {
				uni.$emit('transtion', e);
			},
			animationfinish(e) {
				uni.$emit('animationfinish',e);
			}
		}
	}
</script>

<style>
</style>
