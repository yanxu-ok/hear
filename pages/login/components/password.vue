<template>
	<view class="login">
		<u-navbar background="" title-color="#333333" back-icon-color="#333333">
		</u-navbar>

		<view class="login-main">
			<view class="login-logo">
				设置密码
			</view>

			<view class="login-list flex border-all">
				<!-- <view>+86</view> -->
				<view class="iconfont icon-shoujihao flex"></view>
				<view class="login-input">
					<input type="password" placeholder="请输入密码" class="is-input1" v-model="passwordOne" />
				</view>
			</view>

			<view class="login-list flex border-all">
				<view class="iconfont icon-yanzhengma flex"></view>
				<view class="login-input">
					<input type="password" placeholder="再次输入密码" class="is-input1" v-model="passwordTwo" />
				</view>
				<!-- 				<view class="code-sx"></view>
				<view class="codeimg" @click.stop="getCode()">{{getCodeText}}</view> -->
			</view>

			<button class="cu-btn login-btn" @tap="doLogin">保存</button>

		</view>
	</view>
</template>


<script>
	import {
		setCurrectStorg
	} from '@/libs/hear-util/index.js'
	import {
		mapState
	} from 'vuex'
	import baseUrl from '@/libs/config/baseUrl.js'
	export default {
		data() {
			return {
				getCodeBtnColor: "#ffffff",
				getCodeisWaiting: false,
				passwordOne: null,
				passwordTwo: null
			}
		},
		onLoad() {
			// this.checkGuide();
		},

		computed: {
			...mapState({
				key: state => state.system.key,
				code: state => state.system.code,
				phone: state => state.system.phone,
				token: state => state.system.token,
			})
		},
		methods: {

			// isLogin() {
			// 	// 判断缓存中是否登录过，直接登录
			// 	try {
			// 		const value = uni.getStorageSync('access_token');
			// 		if (value) {
			// 			//有登录信息
			// 			console.log("已登录用户：", value);
			// 			uni.switchTab({
			// 				url: '/pages/index/index'
			// 			});
			// 		}
			// 	} catch (e) {

			// 	}
			// },
			Timer() {},

			getCode() {

			},

			doLogin() {
				let _this = this;
				// uni.hideKeyboard()
				// // 模板示例部分验证规则
				// if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))) {
				// 	uni.showToast({
				// 		title: '请填写正确手机号码',
				// 		icon: "none"
				// 	});
				// 	return false;
				// }
				if (!this.passwordOne || !this.passwordTwo) {
					uni.showToast({
						title: '密码不能为空'
					})
					return;
				}
				if (this.passwordOne != this.passwordTwo) {
					uni.showToast({
						title: '两次输入密码不同'
					})
					return;
				}

				uni.request({
					url: baseUrl.BASE_Url + '/member/forgot',
					data: {
						'phone': _this.phone,
						'code': _this.code,
						'key': _this.key,
						password: _this.passwordOne,
						rePassword: _this.passwordTwo
					},
					method: 'POST',
					header: {
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},
					success: (res) => {
						console.log(res);
						if (res.data.code) {
							// uni.navigateTo({
							// 	url:'/pages/'
							// })
							console.log(_this.token);
							setCurrectStorg('token', _this.token)
							uni.switchTab({
								url: '/pages/tabbar/my/index'
							})
						} else {
							uni.showToast({
								title: '登录失败',
								icon: 'none'
							})
						}
					},

				});

			},

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.flex {
		display: flex;
	}

	.login {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.login-main {
		flex: 1;
		padding: 0 70rpx;

		.login-logo {
			width: 248rpx;
			padding-bottom: 50rpx;
			margin: 100rpx 0 0 0;
			font-size: 48rpx;
			font-family: PingFang;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);

			image {
				width: 100%;
				height: 100%;
			}
		}

		.logo-tip {
			text-align: center;
			padding-top: 25rpx;
			font-size: 32rpx;
			font-weight: 200;
			color: rgba(51, 51, 51, 1);
			padding-bottom: 50rpx;
		}

		.login-list {
			margin-top: 35rpx;
			height: 100rpx;
			align-items: center;
			padding: 0 30rpx;

			&.border-all {
				&:after {
					border: 1px solid #D0D0D0;
					border-radius: 100rpx;
				}
			}

			.iconfont {
				width: 65rpx;
				font-size: 44rpx;
				align-items: center;

				&:after {
					margin-left: 20rpx;
					content: '';
					width: 2rpx;
					height: 35rpx;
					background: #D0D0D0;
					display: block;
				}
			}

			.login-input {
				flex: 1;

				input {
					font-size: 28rpx;
					color: #333333;
					padding-left: 20rpx;
				}
			}

			.code-sx {
				content: '';
				width: 2rpx;
				height: 25rpx;
				background: #D0D0D0;
				margin-right: 25rpx;
			}

			.codeimg {
				font-size: 24rpx;
				color: #999999;
			}
		}

		.login-btn {
			margin-top: 70rpx;
			height: 96rpx;
			width: 100%;
			background: #f8a624;
			border-radius: 47rpx;
			font-size: 34rpx;
			color: #ffffff;
		}

		.login-tip {
			padding-top: 26rpx;
			font-size: 22rpx;
			color: #666666;
			text-align: center;

			navigator {
				margin-left: 10rpx;
				display: inline-block;
				color: #5055A8;
			}
		}
	}

	.login-footer {
		padding: 0 70rpx;

		.footer-tip {
			align-items: center;
			font-size: 24rpx;
			color: #999999;
			text-align: center;

			&:before {
				flex: 1;
				content: '';
				height: 2rpx;
				background: #D0D0D0;
				margin-right: 30rpx;
			}

			&:after {
				margin-left: 30rpx;
				flex: 1;
				content: '';
				height: 2rpx;
				background: #D0D0D0;
			}

		}

		.footer-other {
			padding: 40rpx 0 100rpx 0;
			justify-content: center;

			.other-list {
				width: 80rpx;
				height: 80rpx;
				margin: 0 75rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
