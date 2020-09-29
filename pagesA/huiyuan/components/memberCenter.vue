<template>
	<view style="overflow-x: hidden;position: absolute;left:0; top: 0; right: 0; bottom: 0; flex;flex-direction: column;">
		<view class="bg">
			<u-navbar title="会员开通" background="" title-color="#000000" back-icon-color="#000000">
				<view slot="right" @tap="handleMingxi" style="padding-right: 30rpx;">
					明细
				</view>
			</u-navbar>

			<view class="vip" @tap="handleHuiyuan">
				<u-image width="100rpx" height="99rpx" shape="circle" src=""></u-image>
				<view>
					<view style="font-size:32rpx;
font-family:PingFang SC;
font-weight:500;
color:rgba(255,255,255,1);">
						阿尔法狗
					</view>
					<view style="font-size:24prx;
font-family:PingFang SC;
font-weight:300;
color:rgba(255,255,255,1);
opacity:0.6;">
						尚未开通会员～
					</view>
				</view>
				<view class="vip_xufei">
					未开通
				</view>
			</view>
		</view>

		<view style="position: absolute; top: 360rpx; height: 970rpx;width: 100%;">
			<scroll-view scroll-y style="height: 950rpx;">
				<view class="main-title">
					<text>限时惠 超值优惠还剩九天</text>
				</view>

				<view class="recharge">
					<view class="recharge-item" :class="current == index ? 'recharge-item-active': ''" v-for="(item, index) in rechargeOptions"
					 :key="index" :style="{marginLeft: !index ? '30rpx': ''}" @click="rechargeChange(index)">
						<text class="recharge-item-duration">{{ item.duration }}</text>
						<view class="recharge-item-price">
							<text class="rmb">￥</text>
							<text class="recharge-item-price-text">{{ item.price }}</text>
						</view>
						<view class="recharge-item-price">
							<text class="rmb">￥</text>
							<text class="recharge-item-price-text">{{ item.yprice }}</text>
						</view>
						<text class="recharge-item-des" v-for="(desItem, desIndex) in item.des" :key="desIndex">{{ desItem }}</text>
					</view>
				</view>

				<u-gap height="20" bg-color="#F4F4F4"></u-gap>

				<view class="main-title">
					<text>会员特权</text>
				</view>

				<view class="privilege">
					<view class="privilege-item" v-for="(item, index) in privilegeList" :key="index" hover-class="hover" @click="privilegeClick(index)">
						<image class="privilege-item-pic" src="../../../static/my/pinglun.png" mode=""></image>
						<text class="privilege-item-text">{{ item.text }}</text>
					</view>
				</view>

				<view class="main-title">
					<text>会员优惠</text>
				</view>

				<view class="youhui_content">
					<view class="youhui">
						<view style="display: flex; align-items: center;">
							<u-image width="66.3rpx" height="66.3rpx" src=""></u-image>
							<view>年卡优惠</view>
						</view>
						<view style="color:rgba(230,160,11,1);">年卡累计优惠188</view>

						<view style="width:154rpx;height:38rpx;background:rgba(230,160,11,1);box-shadow:0px 2rpx 9rpx 1rpx rgba(230,160,11,0.5);border-radius:19rpx;margin-top: 32rpx;text-align: center;color: #FFFFFF;">
							立即开通
						</view>
					</view>
					<view class="youhui">
						<view style="display: flex; align-items: center;">
							<u-image width="66.3rpx" height="66.3rpx" src=""></u-image>
							<view>年卡优惠</view>
						</view>
						<view style="color:rgba(230,160,11,1);">年卡累计优惠188</view>
					
						<view style="width:154rpx;height:38rpx;background:rgba(230,160,11,1);box-shadow:0px 2rpx 9rpx 1rpx rgba(230,160,11,0.5);border-radius:19rpx;margin-top: 32rpx;text-align: center;color: #FFFFFF;">
							立即开通
						</view>
					</view>
				</view>
				
				<view class="xieyi">
					<view>我已阅读并同意会员服务协议</view>
					<u-button type="warning" style="margin-top: 34rpx;">立即购买</u-button>
				</view>
				

			</scroll-view>

		</view>
	</view>
</template>

<script>
	const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
	export default {
		data() {
			return {
				statusBarHeight,
				current: 0,
				rechargeOptions: [{
						duration: '一年',
						price: 118,
						des: [
							'到期自动续费'
						],
						showTag: true,
						yprice: 388
					},
					{
						duration: '1个月',
						price: 88,
						des: [
							'联合月卡'
						],
						showTag: false,
						yprice: 113
					},
					{
						duration: '连续包月',
						price: 30,
						des: [
							'立省60元'
						],
						showTag: false,
						yprice: 100
					}
				],
				privilegeList: [{
						pic: '/static/coin.png',
						text: '安全保障'
					},
					{
						pic: '/static/quan.png',
						text: '内容畅听'
					},
					{
						pic: '/static/red-bag.png',
						text: '免声音广告'
					},
					{
						pic: '/static/goods.png',
						text: '专属客服'
					},
					{
						pic: '/static/goods.png',
						text: '付费优惠'
					},
					{
						pic: '/static/goods.png',
						text: '独特标识'
					}
				]
			}
		},
		methods: {
			rechargeChange(index) {
				this.current = index
			},
			updateNow() {
				uni.showToast({
					icon: "none",
					title: `选择了「${this.rechargeOptions[this.current].duration}」`
				})
			},
			privilegeClick(index) {
				uni.showToast({
					icon: "none",
					title: `点击了「${this.privilegeList[index].text}」`
				})
			},
			handleMingxi(){
				uni.navigateTo({
					url:'/pages/huiyuan/components/shouru'
				})
			}
		}
	}
</script>

<style lang="scss">
	.youhui_content {
		display: flex;
		margin: 30rpx 26rpx;

		& .youhui {
			width: 335rpx;
			height: 189rpx;
			background: rgba(251, 245, 229, 1);
			border-radius: 5rpx;
			margin-right: 17rpx;
			padding-left: 15rpx;
		}
	}
	
	.xieyi{
		height: 246rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 32rpx 0px rgba(3,22,38,0.08);
		padding-top: 30rpx;
		padding-left: 26rpx;
		padding-right: 34rpx;
	}

	.vip {
		position: absolute;
		bottom: 0;
		width: 663rpx;
		height: 210rpx;
		margin: 0 auto;
		background: black;
		left: 44rpx;
		border-radius: 20px 20px 0px 0px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 44rpx;
		padding-right: 38rpx;

		& .vip_xufei {
			width: 157rpx;
			height: 57rpx;
			background: #767788;
			border-radius: 30rpx;
			text-align: center;
			line-height: 57rpx;
			color: #FFFFFF;
		}

	}

	.main-title {
		margin-top: 43rpx;
		font-size: 34rpx;
		color: #1C1C1C;
		margin-left: 20rpx;
	}

	.tip {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #A5A3A2;
	}

	.rmb {
		font-size: 26rpx;
		color: #E3BE83;
	}

	.bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 363rpx;
		background: #ece7f2;

	}

	.hover {
		opacity: 0.7;
	}

	.nav {
		position: fixed;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: 44px;
		padding: 0 30rpx;
		// background-image: url('~@/static/nav-bg.png');
		background-size: 100%;
		z-index: 99;

		&-back {
			width: 20rpx;
			height: 40rpx;
		}

		&-title {
			color: #FFFFFF;
			font-size: 42rpx;
		}

		&-space {
			width: 70rpx;
			height: 40rpx;
		}
	}

	.info {
		position: relative;
		padding: 0 15rpx;
		width: 730rpx;
		height: 360rpx;

		&-bg {
			position: absolute;
			width: 730rpx;
			height: 360rpx;
			z-index: -1;
		}

		&-content {
			padding: 70rpx 50rpx 0 50rpx;
			margin-bottom: 50rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
		}

		&-avatar {
			margin-right: 30rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: 85rpx;
			height: 85rpx;
			background-color: #fff;
			padding: 1rpx;
			border-radius: 50%;

			&-pic {
				width: 83rpx;
				height: 83rpx;
			}
		}

		&-name {
			display: flex;
			flex-direction: column;
			color: #FFFFFF;
			font-size: 35rpx;
		}

		&-level {
			margin-top: 15rpx;
			font-size: 24rpx;
		}

		&-asset {
			padding: 0 50rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			&-item {
				display: flex;
				flex-direction: column;
			}
		}
	}

	.iai {
		&-title {
			margin-bottom: 20rpx;
			margin-right: 100rpx;
			font-size: 24rpx;
			color: #CFB386;
		}

		&-value {
			font-size: 35rpx;
			color: #FFFFFF;
		}
	}

	.recharge {
		position: relative;
		margin-bottom: 35rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 47rpx;

		&-tag {
			position: absolute;
			top: -2rpx;
			left: -2rpx;
			width: 170rpx;
			height: 36rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			// background-image: url('~@/static/tag.png');
			background-size: 100%;

			&-text {
				font-size: 20rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}

		&-item {
			position: relative;
			padding: 10rpx 0;
			margin-left: 15rpx;
			width: 210rpx;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			border: solid 2rpx #F2F2F3;
			border-radius: 12rpx;

			&-active {
				border-color: #EDD2A9;
				background-color: #FBF1E5;
			}

			&-duration {
				margin-bottom: 30rpx;
				font-size: 26rpx;
				color: #1C1C1C;
			}

			&-price {
				margin-bottom: 20rpx;
				display: flex;
				flex-direction: row;
				align-items: baseline;

				&-text {
					font-size: 48rpx;
					color: #E3BE83;
				}
			}

			&-des {
				font-size: 22rpx;
				color: #A5A3A2;
			}
		}
	}

	.button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 85rpx;
		border-radius: 50rpx;
		// background-image: linear-gradient(#EFCF9E, #E4BF85);

		&-text {
			font-size: 30rpx;
			color: #1C1C1C;
		}
	}

	.update {
		margin: 35rpx 30rpx 20rpx 30rpx;
	}

	.privilege {
		padding: 0 30rpx;
		margin-bottom: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		flex-wrap: wrap;
		margin-top: 40rpx;

		&-item {
			margin: 0 40rpx;
			margin-bottom: 25rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			&-pic {
				width: 80rpx;
				height: 80rpx;
				margin-bottom: 20rpx;
			}

			&-text {
				font-size: 24rpx;
				color: #383738;
			}
		}
	}

	.level {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 466rpx;
		// background-image: url('~@/static/vip-bg.png');
		background-size: 100%;

		&-rate {
			position: absolute;
			top: 43rpx;
			left: 33rpx;
			display: flex;
			flex-direction: row;
			align-items: center;

			&-text1 {
				margin-right: 20rpx;
				color: #1C1C1C;
				font-size: 34rpx;
			}

			&-text2 {
				font-size: 34rpx;
				color: #C07C07;
			}
		}

		&-info {
			// position: absolute;
			// top: 188rpx;
			// left: 350rpx;
			margin-top: 70rpx;
			display: flex;
			flex-direction: column;
			align-items: center;

			&-icon {
				margin-bottom: 20rpx;
				width: 48rpx;
				height: 38rpx;
			}

			&-text {
				margin-bottom: 20rpx;
				font-size: 26rpx;
				color: #292929;
			}

			&-integral {
				font-size: 40rpx;
				color: #C07C07;
			}
		}

		&-distance {
			position: absolute;
			left: 30rpx;
			right: 30rpx;
			bottom: 35rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;

			&-text {
				font-size: 26rpx;
				color: #292929;
			}

			&-button {
				padding: 0 30rpx;
				height: 60rpx;
			}
		}
	}
</style>
