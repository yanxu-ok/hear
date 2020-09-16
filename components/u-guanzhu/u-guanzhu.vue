<template>
	
	<view class="shudan">
		<view class="shudan_list">
			<u-image width="120rpx" height="120rpx" :src="item.avatar" shape="circle"></u-image>
			<view class="shudan_list_title">
				<view style="display: flex;">
					<view class="pd" :style="{width:titleWidth, fontSize:size, color: color  }" v-if="type =='zhubo' ">
						{{item.nickName}}
					</view>
					<view class="pd" :style="{width:titleWidth, fontSize:size, color: color  }" v-else>
						{{item.nickName}}
					</view>
					<u-image height="10rpx" width="10rpx" :src="item.avatar"></u-image>
				</view>

				<view class="count" :style="{desccolor: desccolor  }">用一句话介绍一下你自己吧～</view>
			</view>
			<u-button type="error" size="mini" :custom-style="customStyle" style="margin-left: 109rpx;" v-if="item.flag == 1" @tap="handleGuanzhu(item)">+关注</u-button>
			<u-button type="error" size="mini" :custom-style="customStyle" style="margin-left: 109rpx;" v-else @tap="handleGuanzhu(item)">已关注</u-button>
		</view>
		<u-line color="#E6E6E6" style="margin-left: 178rpx;" v-if="noline" />
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
			noline: {
				type: Boolean,
				default: true,
			},
			color: {
				type: String,
				default: "rgba(51, 51, 51, 1)",
			},
			desccolor: {
				type: String,
				default: "rgba(153, 153, 153, 1)",
			},
			type:{
				type: String,
				default: "zhubo",
			},
			item:{
				type: Object
			},
			rindex:{
				type:Number
			}
		},
		data() {
			return {
				customStyle: {
					width: '113rpx',
					height: '48rpx'
				},
				show:true
			}
		},
		methods:{
			handleGuanzhu(item){	
				this.$emit('handleGuanzhu',item)
			}
		}
	}
</script>

<style lang="scss">
	.shudan_list {
		margin-left: 25rpx;
		display: flex;
		align-items: center;
		/* #ifdef H5 */
		margin-bottom: 20rpx;
		/* #endif */

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
