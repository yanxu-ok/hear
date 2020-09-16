<template>
	<view class="bodan_flex">
		<template v-for="(item,index) in list">
			<block :key="index">
				<view class="bodan" @tap="handlePlay(item)">
					<view style="width:129rpx; height:129rpx;line-height: 129rpx;text-align: center;">
						<u-image width="129rpx" height="129rpx" :src="item.topicImage" v-if="leixing != 'zj'"></u-image>
						<view v-else style="font-size:32rpx;">{{index+1}}</view>
					</view>
					<view class="bodan_content">
						<view class="bodan_content_title">{{item.topicName | titleFilter(length)}}</view>
						<view class="bodan_content_title" v-if="leixing == 'zj'" style="display: flex;justify-content: space-between;">
							<view> {{item.chapterName | titleFilter(length)}}</view>
							<view style="font-size:24rpx;font-family:PingFang SC;font-weight:400;">{{item.createTime}}</view>
						</view>
						<view class="bodan_content_desc" v-if="leixing == 'lishi'">
							{{item.chapterName | titleFilter(length)}}
						</view>
						<view class="bodan_content_desc" v-if="leixing == 'zhubo'">
							{{item.topicDescribe | titleFilter(desc)}}
						</view>
						<!-- <view class="bodan_content_desc" v-else>
						</view> -->
						<template v-if=" leixing == 'zhubo' || leixing ==''  ">
							<view class="bodan_content_author" v-if=" leixing == 'zhubo' || leixing ==''  ">
								<u-image width="19rpx" height="20rpx" src="@/static/images/author.png"></u-image>
								<view class="bodan_content_author_name">{{item.nickName}}</view>
								<u-image width="17rpx" height="20rpx" src="@/static/images/play.png" style="margin-left: 20rpx;"></u-image>
								<view class="bodan_content_author_count">{{item.topicReadAmount}}次播放</view>
							</view>
						</template>
						<template v-if=" leixing == 'lishi' ">
							<view class="bodan_content_author">
								<u-image width="19rpx" height="20rpx" src="@/static/images/shijian.png"></u-image>
								<view class="bodan_content_author_name">{{item.chapterTime}}</view>
								<u-image width="17rpx" height="20rpx" src="@/static/images/shijian.png" style="margin-left: 20rpx;"></u-image>
								<view class="bodan_content_author_count">已播:{{item.percent}}</view>
							</view>
						</template>
						<template v-if=" leixing == 'zj' ">
							<view class="bodan_content_author">
								<view style="width: 19rpx; height: 20rpx;">
									<u-image width="19rpx" height="20rpx" src="@/static/images/play.png"></u-image>
								</view>
								<view class="bodan_content_author_name" style="color: #999999;">{{item.chapterReadAmount + '播放'}}</view>
								<u-image width="17rpx" height="20rpx" src="@/static/images/shijian.png" style="margin-left: 20rpx;"></u-image>
								<view class="bodan_content_author_count">{{item.chapterTime}}</view>
								<view style="color: #F8A11F;margin-left:auto;">{{item.radioType==2? '互听':'章节'}}</view>
							</view>
						</template>
						<!-- 只有播单显示的列表 -->
						<view class="bodan_content_author_count" v-if="leixing == 'bodan'">200本</view>
						<u-line color="#E6E6E6" margin="30rpx 0 0 0 " style="width: 100%;"></u-line>
					</view>
				</view>
			</block>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			list: {
				type: Array,
				default: () => []
			},
			leixing: {
				type: String,
				default: 'zhubo'
			},
			length: {
				type: Number,
				default: 10
			},
			desc: {
				type: Number,
				default: 15
			}
		},
		methods: {
			handlePlay(item) {
				this.$emit('handlePlay', item)
			}
		}
	}
</script>

<style lang="scss">
	.bodan {
		display: flex;
		justify-content: flex-start;
		margin-bottom: 30rpx;
		/* #ifdef MP-WEIXIN */
		margin-left: 30rpx;
		/* #endif */

		& .bodan_content_desc {
			margin-top: 23rpx;
			font-size: 27rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			width: 550rpx;
		}

		& .bodan_content_title {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
		}

		& .bodan_content_author {
			display: flex;
			justify-content: flex-start;
			margin-top: 10rpx;
			width: 400rpx;

			& .bodan_content_author_name {
				margin-left: 10rpx;
				color: #fac882;
			}

			& .bodan_content_author_count {
				margin-left: 10rpx;
				color: rgba(153, 153, 153, 1);
			}

		}
	}

	.bodan_content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-left: 20rpx;
		width: 100%;
		margin-right: 10rpx;
	}
</style>
