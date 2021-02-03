<template>
	<view class="shouru">
		<u-navbar background="" title-color="#000000" back-icon-color="#000000">
		</u-navbar>
		<view class="shouru_contain">
			<scroll-view scroll-y="true" style="height: 100%;">
				<view class="shouru_contain_text">收支明细</view>
				<template v-for="(item,index) in 10">
					<u-line color="#EFF0F1" margin="37rpx 0 0 0"></u-line>

					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view style="margin-top: 21rpx;">
							<view class="shouru_contain_name">体验会员一天卡</view>
							<view class="shouru_contain_date">2020-07-04 19:24</view>
						</view>
						<view>￥169</view>
					</view>

				</template>
			</scroll-view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.shouru {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
	}

	.shouru_contain {
		width: 690rpx;
		height: 554rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 32rpx 0px rgba(3, 22, 38, 0.04);
		border-radius: 20rpx;
		margin: 0 auto;
		padding: 39rpx 30rpx 28rpx 30rpx;

		& .shouru_contain_text {
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
		}

		& .shouru_contain_name {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
		}

		& .shouru_contain_date {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
		}

	}
</style>
