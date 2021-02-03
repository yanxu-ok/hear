<template>
	<!-- 头部 -->
	<view class="now_header">
		<view style="width: 204rpx; height: 204rpx;">
			<u-image width="204rpx" height="204rpx" :src="topicImg" border-radius="10rpx"></u-image>
		</view>
		<view class="now_header_content">
			<view class="now_header_content_text">
				{{topicName | titleFilter(22)}}
			</view>
			<view class="now_header_count">
				<view class="ji">共{{count | numFormat}}集</view>
				<u-button v-if="show" :custom-style="customStyle" :hair-line="flag" :ripple="true" ripple-bg-color="#FFE8D1" size="mini"
				 shape="circle" @click="handleClickShoucang">{{isCollect}}</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isShoucang: {
				type: Boolean,
				default: false
			},
			count: {
				type: Number,
				default: 10
			},
			topicName: {
				type: String,
				default: ''
			},
			topicImg: {
				type: String,
				default: ''
			},
			show: {
				type: Boolean,
				default: false
			}
		},

		data() {
			return {
				customStyle: {
					color: '#ef9836',
					background: "#FFE8D1",
					width: '150rpx',
					height: '60rpx',
					border: '0px',
					marginRight: '0'
				},
				flag: false,
			}
		},

		computed: {
			// 是否收藏
			isCollect() {
				return this.isShoucang ? '已收藏' : '+收藏'
			}
		},

		methods: {
			// 重录
			handleClickShoucang() {
				this.$emit('handleClickShoucang')
			}
		}
	}
</script>

<style lang="scss">
	.now_header {
		height: 205rpx;
		// margin: 0 25rpx;
		padding: 0 27rpx 0 25rpx;
		display: flex;

		& .now_header_content {
			margin-left: 15rpx;
			display: flex;
			flex-direction: column;
			flex: 1;
			justify-content: space-between;
			/* #ifdef MP-WEIXIN */
			margin-right: 25rpx;
			/* #endif */


			& .now_header_content_text {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #343434;
			}
		}

		& .now_header_count {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		& .ji {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
		}
	}
</style>
