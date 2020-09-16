<template>
	<view class="bianji_content">
		<template v-for="(item,index) in list">
			<block :key="index">
				<view class="bianji_content_div" @tap="handleClick(item)">
					<view style="width: 204rpx;height: 204rpx;">
						<u-image width="204rpx" height="204rpx" border-radius="10rpx" :src="item.topicImage"></u-image>
					</view>
					<view class="bianji_content_div_neirong">
						<view class="bianji_content_div_neirong_title">{{item.topicName | titleFilter(10)}}</view>
						<view style="margin-top: 23rpx;margin-bottom: 23rpx;">
							<view class="bianji_content_div_neirong_desc">{{item.topicDescribe | titleFilter(20)}}</view>
						</view>
						<view class="bianji_content_author">
							<view class="bianji_content_author_color">
								<image style="width:19rpx; height:20rpx" src="@/static/images/author.png"></image>
								<view style="margin-left: 20rpx;">{{item.topicAuthorName}}</view>
							</view>
							<view class="bianji_content_author_color">
								<image style="width:17rpx; height:20rpx" src="@/static/images/play.png"></image>
								<!-- <u-image width="17rpx" height="20rpx" src="@/static/images/play.png"></u-image> -->
								<view style="margin-left: 20rpx;">{{item.topicReadAmount}}播放</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</template>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},
		},
		methods: {

			handleClick(item) {
				this.$emit('handleBianjiClick', item)
			}
		}
	}
</script>

<style lang="scss">
	.bianji_content {
		width: 100%;
		padding: 0 20rpx;
		display: flex;
		flex-direction: column;

		& .bianji_content_div {
			// width: 710rpx;
			height: 250rpx;
			box-shadow: 0px 0px 32rpx 0px rgba(3, 22, 38, 0.08);
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			padding: 22rpx 48rpx 24rpx 24rpx;
			margin-bottom: 30rpx;

			& .bianji_content_div_neirong {
				width: 445rpx;
				margin-left: 19rpx;

				& .bianji_content_div_neirong_title {
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					line-height: 48rpx;
				}

				& .bianji_content_div_neirong_desc {
					font-size: 27rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 36rpx;
				}
			}

			& .bianji_content_author {
				display: flex;
				flex-direction: row;
				margin-bottom: 30rpx;

				& .bianji_content_author_color {
					display: flex;
					flex-direction: row;
					align-items: center;
					margin-right: 30rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					line-height: 37rpx;
				}
			}
		}
	}
</style>
