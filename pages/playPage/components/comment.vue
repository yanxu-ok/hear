<template>
	<view class="comment_content">
		<view class="comment">
			<!-- header -->
			<view class="comment_header">
				<view class="comment_header_user">
					<u-image width="70rpx" height="70rpx" src="@/static/images/quanzi.png"></u-image>
					<view class="comment_header_name">海边</view>
				</view>
				<u-image width="38rpx" height="38rpx" src="@/static/images/quanzi.png"></u-image>
			</view>

			<view class="comment_text">
				中巴友谊，万古长青。开放包容，复兴繁
				荣。合作共赢，互利互惠，相互尊重光明
				未来，美美与共。
			</view>
			
			<view class="comment_huifu">
				<view class="comment_huifu_date">
					<view class="comment_huifu_date_name">2小时前</view>
					<view class="comment_huifu_date_button">回复</view>
				</view>
				<u-image width="25rpx" height="5rpx" src="@/static/images/three_dian.png"></u-image>
			</view>
			
			<template v-for="(item,index) in 3">
			<view class="comment_chilrden" :key="index">
				<!-- header -->
				<view class="comment_header">
					<view class="comment_header_user">
						<u-image width="47rpx" height="48rpx" src="@/static/images/quanzi.png"></u-image>
						<view class="comment_header_name">海边</view>
					</view>
					<u-image width="28rpx" height="28rpx" src="@/static/images/quanzi.png"></u-image>
				</view>
			
				<view class="comment_text">
					中巴友谊，万古长青。开放包容，复兴繁
					荣。合作共赢，互利互惠，相互尊重光明
					未来，美美与共。
				</view>
				
				<view class="comment_huifu">
					<view class="comment_huifu_date">
						<view class="comment_huifu_date_name">2楼</view>
						<view class="comment_huifu_date_button">2小时前</view>
					</view>
					<u-image width="25rpx" height="5rpx" src="@/static/images/three_dian.png"></u-image>
				</view>
				<u-line color="#E1E4E8" margin="25rpx 39rpx 0 0"></u-line>
			</view>
			
			</template>

		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.comment_content {
		width: 100%;
		height: 100%;
		margin-top: 35rpx;

		& .comment {
			padding: 0 20rpx 0 26rpx;
		}

		& .comment_header {
			display: flex;
			justify-content: space-between;
			margin-top: 38rpx;
			align-items: center;

			& .comment_header_user {
				display: flex;
				align-items: center;
			}

			& .comment_header_name {
				margin-left: 16rpx;
			}
		}

		& .comment_text {
			width: 574rpx;
			height: 137rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 52rpx;
			margin: 0 auto;
		}
		
		& .comment_huifu{
			margin-left: 60rpx;
			margin-right: 26rpx;
			margin-top: 24rpx;
			
			& .comment_huifu_date{
				display: flex;
			}
			
			& .comment_huifu_date_name{
				margin-right: 26rpx;
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(153,153,153,1);
			}
			
			& .comment_huifu_date_button{
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:rgba(51,51,51,1);
			}
		}
	}
	
	
	.comment_chilrden{
		width:612rpx;
		background:rgba(241,243,245,1);
		border-radius:10rpx;
		margin-left: 80rpx;
		padding: 22rpx 24rpx 20rpx 28rpx;
		
		& .comment_huifu_date_name{
			margin-right: 26rpx;
			font-size:24rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(153,153,153,1);
		}
		
		& .comment_text{
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(51,51,51,1);
		}
		
		& .comment_header{
			margin-top: 0;
		}
	}
</style>
