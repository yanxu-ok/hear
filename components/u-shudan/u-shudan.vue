<template>
	<view class="shudan_list" :style="{marginLeft:left,	marginBottom: bottom}" @tap="handle(item)">
		<view style="width: 120rpx; height: 120rpx;">
			<u-image width="120rpx" height="120rpx" :src="image"></u-image>
		</view>
		<view class="shudan_list_title">
			<view class="pd" :style="{width:titleWidth, fontSize:size }">{{title | titleFilter(length) }}</view>
			<view class="count">{{count}}本</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			width: {
				type: String,
				default: "120rpx"
			},
			height: {
				type: String,
				default: "120rpx"
			},
			titleWidth: {
				type: String,
				default: "100%"
			},
			size: {
				type: String,
				default: '32rpx'
			},
			left: {
				type: String,
				default: '0'
			},
			title: {
				type: String,
				default: ''
			},
			image: {
				type: String,
				default: ''
			},
			count: {
				type: Number,
				default: 0
			},
			item: {
				type: Object
			},
			type: {
				type: String,
				default: ''
			},
			length: {
				type: Number,
				default: 10
			},
			bottom: {
				type: String,
				default: '0'
			}
		},
		methods: {
			handle(item) {
				this.$emit('handleClickList', {
					item,
					type: this.type
				})
			}
		}
	}
</script>

<style lang="scss">
	.shudan_list {
		display: flex;
		align-items: center;

		& .shudan_list_title {
			margin-left: 23rpx;
			display: block;
			flex-direction: column;

			& .pd {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}

			& .count {
				font-size: 21rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
				margin-top: 17rpx;
			}
		}
	}
</style>
