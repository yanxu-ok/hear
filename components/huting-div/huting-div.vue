<template>
	<view class="all_and_listen_div" @tap="handleClickGendu">
		<view class="all_and_listen_div_img">
			<u-image width="690rpx" height="690rpx" :src="brankGroudImg" border-radius="20rpx"></u-image>
		</view>

		<view class="all_and_listen_div_title">{{title | titleFilter(20)}}</view>

		<view class="all_and_listen_div_author">{{gendu ? '' : "文稿作者:"+ author + '·' | titleFilter(9)}} 阅读量:{{peopleCount | numFormat}}
			·
			{{count | numFormat}}字 预计阅读时间:{{time | dateFormat}}分钟
		</view>

		<view class="all_and_listen_div_gendu">
			<view style="88rpx" height="88rpx">
				<u-image width="88rpx" height="88rpx" shape="circle" :src="avatar" style="margin-left: 27rpx;"></u-image>
			</view>
			<view class="all_and_listen_div_gendu_contain">
				<view class="all_and_listen_div_gendu_name">{{authorDu | titleFilter(5)}}</view>
				<view class="all_and_listen_div_gendu_zuozhe">作者</view>
			</view>
			<view class="gendu_contain">
				<u-image width="24rpx" height="37rpx" src="https://img11.iqilu.com/29/2020/09/30/dd606a58d277898ee81d8943bb95e48b.png"
				 style="margin: 0 auto;"></u-image>
				<view class="gendu_contain_text">{{genduText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: '暂无标题哒哒哒'
			},
			author: {
				type: String,
				default: '暂无作者哒哒哒'
			},
			peopleCount: {
				type: Number,
				default: 0
			},
			count: {
				type: Number,
				default: 10
			},
			item: {
				type: Object,
			},
			brankGroudImg: {
				type: String
			},
			avatar: {
				type: String
			},
			gendu: {
				type: Number,
				default: 0
			},
			authorDu: {
				type: String
			},
			time: {
				type: Number
			}
		},
		data() {
			return {
				key: ''
			}
		},
		computed: {
			genduText() {
				return this.gendu == 0 ? '去跟读' : '我要读'
			}
		},
		methods: {
			handleClickGendu() {
				this.$emit('hutingdiv', this.item)
			}
		}
	}
</script>


<style lang="scss">
	.all_and_listen_div {
		display: flex;
		flex-direction: column;
		position: relative;
		margin-bottom: 24rpx;
		width: 690rpx;
		height: 690rpx;

		& .all_and_listen_div_position {
			// position: absolute;
			// top: 52rpx;
			// left: 34rpx;
			font-size: 46rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			width: 518rpx;
		}

		& .all_and_listen_div_img {
			position: absolute;
			left: 0;
			margin: auto;
			right: 0;
			bottom: 0;
			top: 0;
			z-index: -1;
		}

		& .all_and_listen_div_title {
			font-size: 46rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			display: flex;
			margin: 52rpx 138rpx 0 34rpx;
		}

		& .all_and_listen_div_author {
			// width: 408rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 300;
			color: rgba(255, 255, 255, 1);
			margin: 34rpx auto 0 35rpx;
		}

		& .all_and_listen_div_gendu {
			width: 624rpx;
			height: 135rpx;
			background: rgba(255, 255, 255, 0.7);
			border-radius: 10rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			margin: auto auto 40rpx auto;

			& .all_and_listen_div_gendu_contain {
				margin-left: 33rpx;
				width: 300rpx;
			}

			& .gendu_contain {
				width: 142rpx;
				height: 89rpx;
				background: #f88a1b;
				border-radius: 50rpx;
				display: flex;
				justify-content: center;
				flex-direction: column;
				text-align: center;

				& .gendu_contain_text {
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: rgba(255, 255, 255, 1);
					display: inline-block;
				}
			}
		}
	}
</style>
