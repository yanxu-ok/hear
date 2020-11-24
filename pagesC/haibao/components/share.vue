<template>
	<div class="share">
		<view class="share_title">
			<u-image width="34rpx" height="33rpx" src="https://img11.iqilu.com/29/2020/11/13/7a1fef59d77af94f00b9b5538e71d324.png"></u-image>

			<view style="margin-left: 18rpx;">
				发布成功，分享给好友收听吧！
			</view>

		</view>

		<view style="margin-left: 30rpx;margin-top: 40rpx;display: flex;">
			<template v-for="(item,index) in arr">
				<view class="share_contain" :key="index" @tap="handleClick(index)">
					<view class="share_content">
						<u-image width="60rpx" height="54rpx" :src="item.img" class="share_content_img"></u-image>
					</view>
					<view class="share_name">{{item.name}}</view>
				</view>
			</template>
		</view>

		<!-- <u-line length="750rpx" style="margin-top: 30rpx;"></u-line> -->

	</div>
</template>

<script>
	
	export default {
		data() {
			return {
				arr: [{
						img: 'https://img11.iqilu.com/29/2020/11/13/73a96ee4496acba48645ab8bfe2fa03e.png',
						name: '保存'
					},
					{
						img: 'https://img11.iqilu.com/29/2020/11/13/54ce75273a67b75fd9b4f3cc891519bd.png',
						name: '朋友圈'
					},
					{
						img: 'https://img11.iqilu.com/29/2020/11/13/ce418103460b9b05aa47cd1038e23256.png',
						name: '微信'
					}, {
						img: 'https://img11.iqilu.com/29/2020/11/13/35091f863d11ee7d985610cdf7d9dc8e.png',
						name: '圈子'
					}
				]
			}
		},

		methods: {
			// 点击事件
			handleClick(index) {
				switch (index) {
					case 0:
						console.log('点击了保存');
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
	.share {
		margin-top: 100rpx;

		& .share_title {
			display: flex;
			align-items: center;
			margin-left: 30rpx;
		}
	}

	.share_content {
		width: 111rpx;
		height: 111rpx;
		background: rgba(153, 153, 153, 0.1);
		border-radius: 30rpx;
		position: relative;
		box-sizing: border-box;

		& .share_content_img {
			position: absolute;
			margin: auto;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
		}
	}

	.share_name {
		text-align: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
	}

	.share_contain {
		margin-right: 30rpx;
		box-sizing: border-box;
	}
</style>
