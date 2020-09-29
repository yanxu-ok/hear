<template>
	
	<!-- 排行榜元素-->
	<view class="paihang_contain">
		<!-- 头部 -->
		<view class="paihang_contain_header">
			<view class="paihang_contain_title_contain">
				<u-image width="29rpx" height="39rpx" src="@/static/images/hot.png"></u-image>
				<view class="paihang_contain_title">{{type}}榜单</view>
			</view>
			<view class="paihang_contain_header_right" @tap="quanbu(type)">
				<view>全部</view>
				<view class="u-section__right-info__icon-arrow u-flex" style="margin-left: 6rpx;">
					<u-icon name="arrow-right" size="24" color="#909399"></u-icon>
				</view>
			</view>
		</view>

		<!-- 描述 -->
		<view class="paihang_contain_desc">
			<!-- 万本好书包月听，更实惠 -->
			</view>

		<!-- 线条 -->
		<u-line color="#E5E5E5" margin="0 0 19rpx 0"></u-line>

		<!-- 主题内容 -->
		<view class="paihang_contain_content">
			<template v-for="(item,index) in list.slice(0,5)">
				<block :key="index">
					<view class="paihang_contain_content_div" @tap="handleClick(item)">
						<view v-if=" index + 1 == 1 " :class="{ textColor : index + 1 == 1   }">{{ index +1 }}.</view>
						<view v-if=" index + 1 == 2 " :class="{titleColor: index + 1 == 2  }">{{ index +1 }}.</view>
						<view v-if=" index + 1 == 3 " :class="{ threeColor: index + 1 == 3  }">{{ index +1 }}.</view>
						<view v-if=" index + 1 == 4 || index + 1 == 5 ">{{ index +1 }}.</view>
						<view class="paihang_contain_content_div_title">
							{{item.topicName | titleFilter(10)}}
						</view>
					</view>
				</block>
			</template>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},
			type: {
				type: String,
				default: ''
			}
		},
		methods: {
			quanbu(type) {
				this.$emit('quanbu', type)
			},
			handleClick(item) {
				this.$emit('handleClick', item)
			}
		}
	}
</script>

<style lang="scss">
	.paihang_contain {
		display: inline-block;
		width: 516rpx;
		height: 510rpx;
		box-shadow: 0px 0px 32rpx 0px rgba(3, 22, 38, 0.08);
		border-radius: 10rpx;
		margin-right: 27rpx;
		padding: 30rpx 20rpx 45rpx 22rpx;
		margin-bottom: 10rpx;

		& .paihang_contain_header {
			display: flex;
			align-items: center;
			justify-content: space-between;

			& .paihang_contain_title_contain {
				display: flex;
				align-items: center;

				& .paihang_contain_title {
					font-size: 36rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					margin-left: 7rpx;
				}
			}

			& .paihang_contain_header_right {
				display: flex;
				align-items: center;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}
		}

		& .paihang_contain_desc {
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 300;
			color: #999999;
			margin-top: 14rpx;
			margin-bottom: 15rpx;
			height: 10rpx;
		}

	}

	.paihangbang {
		margin-left: 20rpx;
	}

	.paihang_contain_content {
		display: flex;
		flex-direction: column;

		& .paihang_contain_content_div {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;

			& .paihang_contain_content_div_title {
				margin-left: 35rpx;
			}
		}
	}

	.textColor {
		color: #FF411C;
	}

	.titleColor {
		color: #FF892A;
	}

	.threeColor {
		color: #FFD025
	}
</style>
