<template>
	<view class="list_header">
		<view style="width: 142rpx;height: 142rpx;">
			<u-image width="142rpx" height="142rpx" :src="src" border-radius="10rpx"></u-image>
		</view>

		<view style="margin-left: 32rpx;width:370rpx;">
			<view class="title_bodan">{{title | titleFilter(8)}}</view>
			<view style="display: flex;align-items: center;margin-top: 20rpx;margin-bottom: 26rpx;">
				<u-image width="41.8rpx" height="41.8rpx" shape="circle" :src="avatar" @click="handleAvatar"></u-image>
				<view class="author_title_bodan">{{author | titleFilter(8)}}创建</view>
			</view>
			<!-- <view class="desc_title_bodan">{{desc | titleFilter(14)}}</view> -->
		</view>

		<template v-if="buttonIsShow">
			<u-button :custom-style="customStyle" @click="handleShoucang" :hair-line="false" style="margin-left: 0;">{{isCollect}}</u-button>
		</template>
		<!-- 	<button style="width: 120.4rpx;height: 48.5rpx;border-radius: 40rpx;line-height: 48.5rpx;
font-size: 24rpx;">+收藏</button> -->

	</view>
</template>

<script>
	export default {
		props: {
			src: {
				type: String,
				default: ''
			},
			avatar: {
				type: String,
				default: ''
			},
			author: {
				type: String,
				default: 'XXX'
			},
			title: {
				type: String,
				default: '暂无播单标题'
			},
			desc: {
				type: String,
				default: '自己的书单首次这里显示-编辑简介'
			},
			marginLeft: {
				type: String,
				default: '32rpx'
			},
			isShoucang: {
				type: Boolean,
				default: false
			},
			buttonIsShow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				customStyle: {
					width: '114rpx',
					height: '48.5rpx',
					borderRadius: '40rpx',
					fontSize: '24rpx',
					color: 'white',
					backgroundColor: '#f8a500',
					marginLeft: '0'
				}
			}
		},
		computed: {
			
			left() {
				return {
					'margin-left': this.marginLeft,
					width: '370rpx'
				}
			},
			
			//  是否收藏
			isCollect() {
				return this.isShoucang ? '已收藏' : '+收藏'
			}

		},

		methods: {

			handleShoucang() {
				this.$emit("handleShoucang")
			},

			handleAvatar() {
				this.$emit("handleAvatar")
			}

		},

	}
</script>

<style lang="scss">
	.list_header {
		width: 100%;
		// height: 100%;
		display: flex;
		align-items: center;

		& .title_bodan {
			font-size: 36rpx;
			color: #FFFFFF;
		}

		& .author_title_bodan {
			font-size: 24rpx;
			color: #FFFFFF;
			margin-left: 12rpx;
		}

		& .desc_title_bodan {
			font-size: 24rpx;
			color: #FFFFFF;
		}

	}
</style>
