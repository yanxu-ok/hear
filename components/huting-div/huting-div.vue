<template>
	<view class="all_and_listen_div"  @tap="handleClickGendu">
		<u-image width="690rpx" height="690rpx" :src="brankGroudImg" style="all_and_listen_div_img" border-radius="20rpx"></u-image>
		<view class="all_and_listen_div_title">{{title | titleFilter(10)}}</view>
		<view class="all_and_listen_div_author">作者：{{author}}·{{peopleCount}}人看过·{{count}}字</view>
		<view class="all_and_listen_div_gendu">
			<view style="88rpx" height="88rpx">
			<u-image width="88rpx" height="88rpx" shape="circle" :src="avatar" style="margin-left: 27rpx;"></u-image>
			</view>
			<view class="all_and_listen_div_gendu_contain">
				<view class="all_and_listen_div_gendu_name">{{authorDu | titleFilter(10)}}</view>
				<view class="all_and_listen_div_gendu_zuozhe">作者</view>
			</view>
			<view class="gendu_contain">
				<u-image width="24rpx" height="37rpx" src="@/static/listen/yuyin.png" style="margin: 0 auto;"></u-image>
				<view class="gendu_contain_text">{{genduText}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			title:{
				type:String,
				default:'暂无标题哒哒哒'
			},
			author:{
				type:String,
				default:'暂无作者哒哒哒'
			},
			peopleCount:{
				type:String,
				default:'10'
			},
			count:{
				type:Number,
				default:10
			},
			item:{
				type:Object,
			},
			brankGroudImg:{
				type:String
			},
			avatar:{
				type:String
			},
			gendu:{
				type:Number,
				default:0
			},
			authorDu:{
				type:String
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
		methods:{
			handleClickGendu(){
				this.$emit('hutingdiv',this.item)
			}
		}
	}
</script>


<style lang="scss">
	 .all_and_listen_div {
		display: flex;
		justify-content: center;
		position: relative;
		margin-bottom: 24rpx;

		& .all_and_listen_div_img {
			margin: 0 auto;
		}

		& .all_and_listen_div_title {
			position: absolute;
			top: 52rpx;
			left: 63rpx;
			font-size: 46rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			width: 518rpx;
		}

		& .all_and_listen_div_author {
			width: 408rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 300;
			color: rgba(255, 255, 255, 1);
			position: absolute;
			top: 190rpx;
			left: 63rpx
		}

		& .all_and_listen_div_gendu {
			width: 624rpx;
			height: 135rpx;
			position: absolute;
			background: rgba(216, 214, 214, 0.5);
			bottom: 40rpx;
			left: 63rpx;
			border-radius: 10rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

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
