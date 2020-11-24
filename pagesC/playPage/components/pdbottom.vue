<template>
	<!-- 底部 -->
	<view class="pb_bottom">
		<view class="input">
			<u-input v-model="value" type="textarea" placeholder="欢迎发表你的观点" :custom-style="customStyle" :border="border" :height="height" :auto-height="autoHeight" />
		</view>
		<u-image width="41rpx" height="38rpx" src="https://img11.iqilu.com/29/2020/09/30/9d98a1edfbfbc06aeb09e93c55283639.png"
		 style="margin-left: 39rpx;" @click="handleSubmit"></u-image>
		<u-image width="38rpx" height="38rpx" src="https://img11.iqilu.com/29/2020/09/30/684c31d376c629213e40bcd5d58ae5cf.png"
		 style="margin-left: 50rpx;" @click="handleShare"></u-image>
	</view>
</template>hare

<script>
	export default {
		
		data() {
			return {
				value: '',
				type: 'text',
				border: false,
				height: '100%',
				autoHeight: false,
				customStyle: {
					"padding-left": '20rpx'
				}
			}
		},

		methods: {
			
			// 发表评论
			handleSubmit() {
				this.$emit('handleSubmit',this.value)
				this.value = ''
			},
			
			// 分享
			handleShare(){
				// #ifdef H5
				console.log();
				// #endif
				
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
		// position: absolute;
		// bottom: 0;
		display: flex;
		flex-direction: row;
		align-items: center;

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
			overflow: hidden;
			margin-left: 24rpx;
		}

		& .pb_bottom_wenzi {
			font-size: 18rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
		}
	}
</style>
