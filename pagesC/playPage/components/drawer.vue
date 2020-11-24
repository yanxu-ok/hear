<template>
	<view class="drawer">
		<!-- #ifdef MP-WEIXIN -->
		<drawer ref="drawer-bottom" pos="bottom" :standout="drawerTop" width="750rpx" :height="height" @overlayClicked="hide">
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<drawer ref="drawer-bottom" pos="bottom" :standout="drawerTop" width="750rpx" :height="height" @overlayClicked="hide">
				<!-- #endif -->

				<!-- 主体部分 -->
				<view class="pb-body">
					<!-- 横线 -->

					<view class="pb-title" @tap="hide">
						<view class="pb-title_header"></view>
					</view>

					<!-- 头部 -->
					<drawerheader></drawerheader>

					<!-- <u-line color="#E5E5E5" margin="24rpx 0 0 24rpx"></u-line> -->

					<!-- tabswiper -->
					<playlist style="flex: 1;display: flex;flex-direction: column;"></playlist>

				</view>

			</drawer>
	</view>
</template>

<script>
	import pdbottom from './pdbottom.vue'
	import playlist from './playlist.vue'
	import drawerheader from './drawerheader.vue'
	import drawer from './myp-drawer.vue'
	import {
		getScreenHeight,
		getStatusBarHeight
	} from '@/libs/hear-util/index.js'
	export default {
		components: {
			drawer,
			drawerheader,
			playlist,
			pdbottom
		},
		data() {
			return {
				height: 0
			}
		},
		props: {
			drawerTop: {
				type: String
			}
		},
		methods: {
			hide(duration) {
				this.$refs['drawer-bottom'].hide(duration)
			},
			show(duration) {
				this.$refs['drawer-bottom'].show(duration)
			}
		},
		created() {
			let height = getScreenHeight()
			const statusHeight = getStatusBarHeight()
			// console.log(statusHeight, '导航栏高度', height);
			this.height = height * 2 - statusHeight + 'rpx';
			// this.height = `x-${height * 2}rpx`
		}
	}
</script>

<style lang="scss">
	.drawer {
		z-index: 999;
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.pb-title {
		width: 750rpx;
		height: 70rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
	}

	.pb-body {
		width: 750rpx;
		height: 100%;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.pb-title_header {
		width: 72rpx;
		height: 8rpx;
		background: rgba(188, 186, 186, 1);
		border-radius: 4rpx;
	}
</style>
