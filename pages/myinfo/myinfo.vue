<template>
	<view class="container">
		<u-navbar background="" title-color="#000000" back-icon-color="#000000">
		</u-navbar>
		<view class="ui-all">
			<view class="avatar" @tap="avatarChoose">
				<view class="imgAvatar">
					<u-image width="100%" height="100%" :src="userInfo.avatar"></u-image>
					<!-- <view class="iavatar" :style="'background: url('+avater+') no-repeat center/cover #eeeeee;'"></view> -->
				</view>
				<text v-if="avater">修改头像</text>
				<button v-if="!avater" open-type="getUserInfo" @getuserinfo="getUserInfo" class="getInfo"></button>
			</view>
			<view class="ui-list">
				<text>昵称</text>
				<input type="text" :placeholder="value" :value="userInfo.nickName" @input="bindnickName" placeholder-class="place" />
			</view>
			<view class="ui-list ">
				<text>性别</text>
				<!-- <picker @change="bindPickerChange" mode='selector' range-key="name" :value="index" :range="sex"> -->
				<view class="picker">
					{{userInfo.userSex}}
				</view>
				<!-- </picker> -->
			</view>
			<view class="ui-list ">
				<text>地区</text>
				<!-- <picker @change="bindRegionChange" mode='region'> -->
				<view class="picker">
					<input type="text" v-model="userInfo.userAddress" @input="bindnickName" placeholder-class="place" />
					<!-- {{region[0]}} {{region[1]}} {{region[2]}} -->
				</view>
				<!-- </picker> -->
			</view>
			<view class="ui-list ">
				<text>出生日期</text>
				<picker mode="date" :value="date" @change="bindDateChange">
					<view class="picker">
						{{userInfo.userDate}}
					</view>
				</picker>
			</view>
			<view class="ui-list" @tap="hanldeBiaoqian">
				<text>兴趣</text>
				<template v-for="(item,index) in selectList">
					<text :key="index">{{item}}</text>
				</template>
			</view>
			<view class="ui-list">
				<text>签名</text>
				<input :placeholder="value" placeholder-class="place" v-model="userInfo.userSignature" @input="binddescription" />
			</view>
		</view>

		<u-button :custom-style="customStyle" @click="savaInfo">保存信息</u-button>

		<biaoqian ref="myBiao" :userInfo="userInfo" @handleSuccend="handleSuccend"></biaoqian>
	</view>
</template>

<script>
	import {
		mapActions,
		mapMutations,
		mapState
	} from 'vuex'
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
				userInfo: {}, // 用户信息
				userBiaoqianList: [], // 用户标签数组
				selectList: [], //用户已经选中的兴趣
				imgToken: '' // 图片上传的token
			}
		},
		async mounted() {
			let _this = this
			uni.getStorage({
				key: 'user',
				success(res) {
					let res1 = JSON.parse(res.data)
					_this.userInfo = res1;
					_this.getBiaoqian()
				}
			});
		},
		methods: {
			...mapActions(['get_label', 'insert_user_label', 'get_user_count', 'get_upload_token', 'update_user_msg']),
			// 选择标签
			hanldeBiaoqian() {
				this.$refs.myBiao.show = true
				this.$refs.myBiao.getBiaoqian()
			},

			// 保存成功时返回的事件
			handleSuccend() {
				this.getBiaoqian()
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
				let imgToken = await this.get_upload_token()
				that.imgToken = imgToken
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						console.log(res);
						// tempFilePath可以作为img标签的src属性显示图片
						console.log(res);
						that.imgUpload(res.tempFiles);
						// const tempFilePaths = res.tempFilePaths;
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
				let data = {
					userDate: this.userInfo.userDate,
					userAddress: this.userInfo.userAddress,
					userSignature: this.userInfo.userSignature
				}
				let result = await this.update_user_msg(data)
				if (result.success) {
					uni.showToast({
						title: '保存成功'
					})
				} else {
					uni.showToast({
						title: '保存失败'
					})
				}
				// let that = this;
				// let nickname = that.nickName;
				// let headimg = that.headimg;
				// let gender = that.index + 1;
				// let mobile = that.mobile;
				// let region = that.region;
				// let birthday = that.date;
				// let description = that.description;
				// let updata = {};
				// if (!nickname) {
				// 	uni.showToast({
				// 		title: '请填写昵称',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// 	return;
				// }
				// updata.nickname = nickname;
				// if (!headimg) {
				// 	headimg = that.avater;
				// }
				// updata.headimg = headimg;
				// updata.gender = gender;
				// if (that.isPoneAvailable(mobile)) {
				// 	updata.mobile = mobile;
				// } else {
				// 	uni.showToast({
				// 		title: '手机号码有误，请重填',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// 	return;
				// }
				// if (region.length == 1) {
				// 	uni.showToast({
				// 		title: '请选择常住地',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// 	return;
				// } else {
				// 	updata.province = region[0];
				// 	updata.city = region[1];
				// 	updata.area = region[2];
				// }
				// if (birthday == "0000-00-00") {
				// 	uni.showToast({
				// 		title: '请选择生日',
				// 		icon: 'none',
				// 		duration: 2000
				// 	});
				// 	return;
				// }
				// updata.birthday = birthday;
				// updata.description = description;
				// that.updata(updata);
				// uni.navigateBack({

				// })
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
			imgUpload(file) {
				let that = this;
				uni.uploadFile({
					header: {
						Authorization: {
							token: that.imgToken
						}
					},
					url: '/api/upload/image', //需传后台图片上传接口
					filePath: file[0],
					name: 'file',
					formData: {
						type: 'user_headimg'
					},
					success: function(res) {
						var data = JSON.parse(res.data);
						data = data.data;
						that.avater = that.url + data.img;

						that.headimg = that.url + data.img;

					},
					fail: function(error) {
						console.log(error);
					}
				});
			},
			// 获取标签
			async getBiaoqian() {
				let result = await this.get_label({
					labelType: 1
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
			}
		},
		onLoad() {}
	}
</script>

<style lang="less">
	.container {
		display: block;
	}

	.ui-all {
		padding: 20rpx 40rpx;
		width: 700rpx;
		height: 931rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 32rpx 0px rgba(3, 22, 38, 0.08);
		border-radius: 20rpx;
		margin: 0 auto;

		.avatar {
			width: 100%;
			text-align: left;
			padding: 20rpx 0;
			border-bottom: solid 1px #f2f2f2;
			position: relative;

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

			text {
				display: inline-block;
				vertical-align: middle;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 40rpx;
			}

			&:after {
				content: ' ';
				width: 20rpx;
				height: 20rpx;
				border-top: solid 1px #030303;
				border-right: solid 1px #030303;
				transform: rotate(45deg);
				-ms-transform: rotate(45deg);
				/* IE 9 */
				-moz-transform: rotate(45deg);
				/* Firefox */
				-webkit-transform: rotate(45deg);
				/* Safari 和 Chrome */
				-o-transform: rotate(45deg);
				position: absolute;
				top: 85rpx;
				right: 0;
			}
		}

		.ui-list {
			width: 100%;
			text-align: left;
			padding: 20rpx 0;
			border-bottom: solid 1px #f2f2f2;
			position: relative;

			text {
				color: #4a4a4a;
				font-size: 28rpx;
				display: inline-block;
				vertical-align: middle;
				min-width: 150rpx;
			}

			input {
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
			}

			button {
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

			picker {
				width: 90%;
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
				position: absolute;
				top: 30rpx;
				left: 150rpx;
			}

			textarea {
				color: #030303;
				font-size: 30rpx;
				vertical-align: middle;
				height: 150rpx;
				width: 100%;
				margin-top: 50rpx;
			}

			.place {
				color: #999999;
				font-size: 28rpx;
			}
		}

		.right:after {
			content: ' ';
			width: 20rpx;
			height: 20rpx;
			border-top: solid 1px #030303;
			border-right: solid 1px #030303;
			transform: rotate(45deg);
			-ms-transform: rotate(45deg);
			/* IE 9 */
			-moz-transform: rotate(45deg);
			/* Firefox */
			-webkit-transform: rotate(45deg);
			/* Safari 和 Chrome */
			-o-transform: rotate(45deg);
			position: absolute;
			top: 40rpx;
			right: 0;
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
