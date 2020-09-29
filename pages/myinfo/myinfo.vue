<template>
	<view class="container">
		<u-navbar background="" title-color="#000000" back-icon-color="#000000">
		</u-navbar>
		<view class="ui-all">
			<view class="ui-all_my">个人信息</view>
			<u-line color="#EFF0F1" />
			<view class="avatar" @tap="avatarChoose">
				<view class="ui-all_my_font">我的头像</view>
				<view class="imgAvatar">
					<u-image width="100%" height="100%" :src="userInfo.avatar"></u-image>
				</view>
			</view>
			<u-line color="#EFF0F1" />
			<view class="ui-list">
				<view class="ui-all_my_font">我的昵称</view>
				<input type="text" :placeholder="value" v-model=" userInfo.nickName " @input="bindnickName" placeholder-class="place" />
			</view>
			<u-line color="#EFF0F1" />
			<view class="ui-list ">
				<view class="ui-all_my_font">性别</view>
				<!-- <picker @change="bindPickerChange" mode='selector' range-key="name" :value="index" :range="sex"> -->
				<view class="picker">
					<!-- {{ userInfo.userSex == 1 ? '男' : '女' }} -->
					<input type="text" style="flex: 1;" v-model="userInfo.userSex" @input="bindnickName" placeholder-class="place" />
				</view>
				<!-- </picker> -->
			</view>
			<u-line color="#EFF0F1" />
			<view class="ui-list ">
				<view class="ui-all_my_font">地区</view>
				<!-- <picker @change="bindRegionChange" mode='region'> -->
				<!-- <view class="picker"> -->
				<input type="text" style="flex: 1;" v-model="userInfo.userAddress" @input="bindnickName" placeholder-class="place" />
				<!-- {{region[0]}} {{region[1]}} {{region[2]}} -->
				<!-- </view> -->
				<!-- </picker> -->
			</view>
			<u-line color="#EFF0F1" />
			<view class="ui-list ">
				<view class="ui-all_my_font">出生日期</view>
				<picker mode="date" :value="date" @change="bindDateChange">
					<view class="picker">
						{{userInfo.userDate}}
					</view>
				</picker>
			</view>
			<u-line color="#EFF0F1" />
			<view class="ui-list" @tap="hanldeBiaoqian">
				<view class="ui-all_my_font">兴趣</view>
				<scroll-view scroll-x="true" style="flex: 1;white-space: nowrap; overflow: hidden;">
					<view style="display: flex; ">
						<template v-for="(item,index) in selectList">
							<view :key="index" style="margin-right: 10rpx;">{{item}}</view>
						</template>
					</view>
				</scroll-view>
			</view>
			<u-line color="#EFF0F1" />
			<view class="ui-list">
				<view class="ui-all_my_font">签名</view>
				<input :placeholder="value" placeholder-class="place" v-model="userInfo.userSignature" @input="binddescription" />
			</view>
		</view>

		<view style="margin-top: 100rpx;">
			<u-button :custom-style="customStyle" @click="savaInfo" style="margin-top: 100rpx;">保存信息</u-button>
		</view>

		<biaoqian ref="myBiao" :userInfo="userInfo" @handleSuccend="handleSuccend" @getInfo="handleSuccend"></biaoqian>

	</view>
</template>


<script>
	import baseUrl from '@/libs/config/baseUrl.js'
	import {
		setCurrectStorg
	} from '@/libs/hear-util/index.js'
	import {
		mapActions,
		mapMutations,
		mapState
	} from 'vuex'
	// import $ from "jquery";
	import biaoqian from './components/mybiaoqian.vue'
	export default {
		components: {
			biaoqian
		},
		data() {
			return {
				value: '请填写',
				sex: [{
					id: 1,
					name: '男'
				}, {
					id: 2,
					name: '女'
				}],
				index: 0,
				region: ['请填写'],
				date: '请填写',
				avater: '',
				description: '',
				url: '',
				nickName: '',
				mobile: '',
				headimg: '',
				customStyle: {
					width: "700rpx",
					height: "88rpx",
					borderRadius: "20rpx",
					background: "#f88f1d",
					color: '#FFFFFF'
				},
				userInfo: null, // 用户信息
				userBiaoqianList: [], // 用户标签数组
				selectList: [], //用户已经选中的兴趣
				userToken: '', // 图片上传的token，
				tempImg: '', // 选择的临时图片路径
				serveUrl: null, // 需要上传的图片url，
				tempImgPath: null // 图片的路径
			}
		},
		computed: {
			// img() {
			// 	let img = this.userInfo ? this.userInfo.avatar : ''
			// 	return img
			// }
		},
		async created() {
			let _this = this
			uni.getStorage({
				key: 'user',
				success(res) {
					let res1 = JSON.parse(res.data)
					res1.userSex == 1 ? res1.userSex = '男' : res1.userSex = '女'
					_this.userInfo = res1;
					_this.getBiaoqian()
				}
			});
		},
		methods: {

			...mapActions(['get_label', 'insert_user_label', 'get_user_count', 'get_upload_token', 'update_user_msg', 'api_img']),

			// 选择标签
			hanldeBiaoqian() {
				this.$refs.myBiao.show = true
				this.$refs.myBiao.getBiaoqian()
			},

			// 保存成功时返回的事件
			handleSuccend(newArr) {
				// this.getBiaoqian()
				this.selectList = newArr
			},

			bindPickerChange(e) {
				this.index = e.detail.value;

			},

			bindRegionChange(e) {
				this.region = e.detail.value;

			},

			bindDateChange(e) {
				this.userInfo.userDate = e.detail.value;

			},

			bindnickName(e) {
				this.nickName = e.detail.value;

			},

			bindmobile(e) {
				this.mobile = e.detail.value;

			},

			binddescription(e) {
				this.description = e.detail.value;

			},

			async avatarChoose() {
				let that = this;
				// 先获取图片token
				// let imgToken = await this.get_upload_token()
				let userToken = uni.getStorageSync('token');
				console.log(userToken, '用户的token');
				that.userToken = userToken
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// tempFilePath可以作为img标签的src属性显示图片
						console.log(res);
						that.tempImgPath = res.tempFilePaths
						that.userInfo.avatar = res.tempFilePaths[0];
					}
				});
			},

			getUserInfo(e) {
				if (e.detail.iv) {
					console.log(e.detail.iv) //传后台解密换取用户信息
					uni.showToast({
						title: '已授权',
						icon: 'none',
						duration: 2000
					})
				}
			},

			getphonenumber(e) {
				if (e.detail.iv) {
					console.log(e.detail.iv) //传后台解密换取手机号
					uni.showToast({
						title: '已授权',
						icon: 'none',
						duration: 2000
					})
				}
			},

			// 保存信息
			async savaInfo() {
				if (!this.tempImgPath) { // 表示直接调用

					if (this.isRequest()) { // 判断是否需要修改信息	
						// console.log(1, this.userInfo.nickname);
						this.saveUserInfo()
					} else {
						uni.request({
							url: baseUrl.BASE_Url + '/member/edit', //仅为示例，并非真实接口地址。
							data: {
								nickname: this.userInfo.nickName
							},
							method: 'POST',
							header: {
								// 'custom-header': 'hello' //自定义请求头信息,
								// 'cookie': this.userToken
							},
							success: (res) => {
								console.log(res);
								this.saveUserInfo()
								// this.text = 'request success';
							}
						});
					}
				} else {
					this.imgUpload(this.tempImgPath);
				}
			},

			// 保存用户信息
			async saveUserInfo() {

				this.userInfo.userSex == '男' ? this.userInfo.userSex = 1 : this.userInfo.userSex = 2

				let data = {
					userSex: this.userInfo.userSex,
					userDate: this.userInfo.userDate,
					userAddress: this.userInfo.userAddress,
					userSignature: this.userInfo.userSignature
				}

				let result = await this.update_user_msg(data)

				if (result.success) {
					uni.showToast({
						title: '保存成功',
						icon: 'none'
					})

					setCurrectStorg('user', JSON.stringify(this.userInfo)) // 重新将用户信息 放入 缓存中

					uni.navigateBack({}) //然后返回
				} else {
					uni.showToast({
						title: '保存失败',
						icon: 'none'
					})
				}
			},

			// 是否请求
			isRequest() {
				const value = uni.getStorageSync('user');
				let result = JSON.parse(value)
				console.log(result, this.userInfo);
				if (result.nickName == this.userInfo.nickName) {
					return true
				} else {
					return false
				}
			},

			isPoneAvailable(poneInput) {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(poneInput)) {
					return false;
				} else {
					return true;
				}
			},

			async updata(datas) {
				//传后台
			},

			async imgUpload(file) {
				let that = this;
				uni.uploadFile({
					header: {
						// 'Cookie': that.userToken
					},
					url: baseUrl.BASE_Url + '/member/avatar', //需传后台图片上传接口
					filePath: file[0],
					name: 'file',
					success: function(res) {

						var data = JSON.parse(res.data);
						console.log(data);
						if (data.code) {
							if (that.isRequest()) { // 则不需要调用修改名字的接口 直接调用保存信息的接口
								that.saveUserInfo()
							} else {
								uni.request({
									url: baseUrl.BASE_Url + '/member/edit', //仅为示例，并非真实接口地址。
									data: {
										nickname: that.userInfo.nickName
									},
									method: 'POST',
									header: {
										// 'custom-header': 'hello' //自定义请求头信息,
										// 'cookie': this.userToken
									},
									success: (res) => {
										that.saveUserInfo()
										// this.text = 'request success';
									}
								});
							}

						}
					},
					fail: function(error) {
						console.log(error);
					}
				});
				// await this.api_img({
				// 	filePath: file[0]
				// })
			},

			// 获取标签
			async getBiaoqian() {
				let result = await this.get_label({
					labelType: 1,
					userId: this.userInfo.userId
				})
				// console.log(result);
				let selectArr = []
				result.forEach((item, index) => {
					item.name = item.labelName;
					item.value = item.labelId;
					if (item.userId) {
						item.checked = 1;
						selectArr.push(item.name)
					} else {
						item.checked = 0;
					}
				})
				this.selectList = selectArr
				this.userBiaoqianList = result
				// console.log(this.selectList, this.userBiaoqianList);
			}

		},
		onLoad() {}
	}
</script>

<style lang="scss">
	.container {
		display: block;
	}

	.ui-all {
		padding: 0 30rpx;
		width: 700rpx;
		height: 931rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 32rpx 0px rgba(3, 22, 38, 0.08);
		border-radius: 20rpx;
		margin: 0 auto;

		& .ui-all_my_font {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #9A9A9A;
			width: 128rpx;
			margin-right: 40rpx;
		}

		& .ui-all_my {
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #343434;
			padding: 40rpx 0 38rpx 0;
		}

		& .avatar {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 17rpx 0 19rpx 0;

			.imgAvatar {
				width: 112rpx;
				height: 111rpx;

				border-radius: 50%;
				display: inline-block;
				vertical-align: middle;
				overflow: hidden;

				.iavatar {
					width: 100%;
					height: 100%;
					display: block;
				}
			}

		}

		.ui-list {
			width: 100%;
			display: flex;
			align-items: center;
			padding: 32rpx 0;

			& input {
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
			}

			& button {
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
				background: none;
				margin: 0;
				padding: 0;

				&::after {
					display: none;
				}
			}

			& textarea {
				color: #030303;
				font-size: 30rpx;
				vertical-align: middle;
				height: 150rpx;
				width: 100%;
				margin-top: 50rpx;
			}

			& .place {
				color: #999999;
				font-size: 28rpx;
			}
		}

		.save {
			background: #030303;
			border: none;
			color: #ffffff;
			margin-top: 40rpx;
			font-size: 28rpx;
		}
	}
</style>
