<template>
	<view class="drawer">
		<!-- #ifdef MP-WEIXIN -->
		<drawer ref="drawer-bottom" pos="bottom" standout="250rpx" width="750rpx" height="x-1200rpx" @overlayClicked="hide">
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<drawer ref="drawer-bottom" pos="bottom" standout="300rpx" width="750rpx" height="x-1200rpx" @overlayClicked="hide">
				<!-- #endif -->


				<!-- 主体部分 -->
				<view class="pb-body">
					<!-- 横线 -->
					
					<view class="pb-title" @tap="hide">
						<view class="pb-title_header"></view>
					</view>
					
					<!-- 头部 -->
					<drawerheader></drawerheader>

					<u-line color="#E5E5E5" margin="24rpx 0 0 24rpx" length="700rpx"></u-line>

					<!-- tabswiper -->
					<playlist></playlist>

					<!-- 底部 -->
					<pdbottom></pdbottom>

				</view>

			</drawer>
	</view>
</template>

<script>
	import pdbottom from './pdbottom.vue'
	import playlist from './playlist.vue'
	import drawerheader from './drawerheader.vue'
	import drawer from './myp-drawer.vue'
	export default {
		components: {
			drawer,
			drawerheader,
			playlist,
			pdbottom
		},
		data() {
			return {}
		},
		methods: {
			hide(duration) {
				this.$refs['drawer-bottom'].hide(duration)
			},
			show(duration) {
				this.$refs['drawer-bottom'].show(duration)
			},

		}
	}
</script>

<style lang="scss">
	.drawer {
		z-index: 999;
	}

	.pb {
		&-title {
			width: 750rpx;
			height: 70rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			border-bottom-width: 1px;
			border-bottom-color: $myp-border-color-light;
			background-color: #FFFFFF;
			border-top-left-radius: 24rpx;
			border-top-right-radius: 24rpx;
		}

		&-body {
			width: 750rpx;
			height: 100%;
			background-color: #FFFFFF;
			flex-direction: column;
			align-items: center;
			position: relative;
		}
	}

	.pb-title_header {
		width: 72rpx;
		height: 8rpx;
		background: rgba(188, 186, 186, 1);
		border-radius: 4rpx;
	}
</style>
