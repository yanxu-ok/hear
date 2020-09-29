<template>
	<view class="w-100">
		<view class="w-100 flex_wrap">
			<view class="imgs-view" v-for="(v,i) in imgArray" :key="i">
				<image @click="preview(v,i)" :src="v.url"></image>
				<view class="del-btn" @click="delImg(i)">
					<image src="@/static/delete.png"></image>
				</view>
				<view class="uploading flex_xy_center" v-if="!v.upload&&loading&&startUpload">
					<view>
						<image src="@/static/uploading4.png"></image>
						<view class="upload-txt">上传中...</view>
					</view>
				</view>
			</view>
			<view v-if="imgArray.length<imgCount" class="upload-img-view flex_xy_center" @click="upPhoto">
				<image src="@/static/jia.png"></image>
			</view>
		</view>
		<!-- <view v-if="!closeTip&&!prompt" class="tip">* 最多上传{{imgCount}}张图片(<label> {{imgArray.length}} </label>/{{imgCount}})</view>
		<view class="tip" v-show="prompt">*{{prompt}}</view> -->
	</view>
</template>

<script>
	export default {
		name: 'imgUpload',
		props: {
			imgArr: { //图片数组
				type: [Array],
			},
			uploadImgCount: { //一次上传图片数
				type: String,
				default: '3'
			},
			imgCount: { //可上传图片总数
				type: String,
				default: '3'
			},
			imgSize: { //图片大小 单位M
				type: Number,
				default: 2
			},
			imgType: { //如果是小程序，这个值则没用作用
				type: [Array],
				default: function() {
					return ['jpeg', 'png', 'jpg']
				}
			},
			closeTip: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			url: { //上传图片Url
				type: String,
			},
			async: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				imgArray: [],
				canUpCount: '',
				startUpload: false,
				prompt: '',
				asyncArr: []
			}
		},
		created() {
			this.imgArray = this.imgArr || [];
			this.changeImgArr(true);
			this.canUpCount = Number(this.uploadImgCount);
			if (this.url) {
				this.prompt = "";
			} else {
				this.prompt = "你没有传入上传url,请检查传入参数";
			}
		},
		watch: {
			imgArr(n, o) {
				this.imgArray = n || [];
				this.changeImgArr(true);
			},
			imgCount(n, o) {
				this.uploadImgCount = n;
				this.canUpCount = Number(this.uploadImgCount);
			},
			url(n, o) {
				if (n) {
					this.prompt = "";
				} else {
					this.prompt = "你没有传入上传url,请检查传入参数";
				}
			}
		},
		methods: {
			upPhoto() {
				let that = this;
				if (!that.url) {
					that.prompt = "你没有传入上传url,请检查！";
					return;
				}
				if (Number(that.imgCount - that.imgArray.length) < Number(that.uploadImgCount)) {
					that.canUpCount = Number(that.imgCount - that.imgArray.length);
				}
				that.prompt = '';

				// uni.chooseImage({
				// 	count: Number(that.canUpCount),
				// 	sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				// 	sourceType: ['camera'], //从相册选择
				// 	success: function(res) {
				// 		if (res) {
				// 			if (res.tempFiles) {
				// 				for (let item of res.tempFiles) {
				// 					if (item.size > (that.imgSize * 1024 * 1024)) {
				// 						uni.showToast({
				// 							title: `图片不能大于${that.imgSize}M`,
				// 							icon: 'none'
				// 						})
				// 						return false;
				// 					}
				// 					if (item.type) {
				// 						let r = that.imgType.some(v => {
				// 							let type = item.type.split('/');
				// 							if (type.length)
				// 								return (v === type[1]);
				// 						});
				// 						if (!r) {
				// 							uni.showToast({
				// 								title: `只允许上传${that.imgType}的类型`,
				// 								icon: 'none'
				// 							})
				// 							return false;
				// 						}
				// 					}
				// 				}
				// 			}
				// 			that.imgArray = [...that.imgArray, ...res.tempFilePaths];
				// 			that.changeImgArr(false);
				// 			if (that.async) {
				// 				//直接上传
				// 				that.asyncArr = res.tempFilePaths;
				// 				that.asyncUpload();
				// 			}
				// 		}
				// 	}
				// });
				uni.showActionSheet({
					itemList: ['拍照上传', '从相册中选择'],
					success: function(res) {
						if (res.tapIndex == 0) {
							uni.chooseImage({
								count: Number(that.canUpCount),
								sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['camera'], //从相册选择
								success: function(res) {
									if (res) {
										if (res.tempFiles) {
											for (let item of res.tempFiles) {
												// if (item.size > (that.imgSize * 1024 * 1024)) {
												// 	uni.showToast({
												// 		title: `图片不能大于${that.imgSize}M`,
												// 		icon: 'none'
												// 	})
												// 	return false;
												// }
												if (item.type) {
													let r = that.imgType.some(v => {
														let type = item.type.split('/');
														if (type.length)
															return (v === type[1]);
													});
													if (!r) {
														uni.showToast({
															title: `只允许上传${that.imgType}的类型`,
															icon: 'none'
														})
														return false;
													}
												}
											}
										}
										that.imgArray = [...that.imgArray, ...res.tempFilePaths];
										that.changeImgArr(false);
										if (that.async) {
											//直接上传
											that.asyncArr = res.tempFilePaths;
											that.asyncUpload();
										}
									}
								}
							});
						} else if (res.tapIndex == 1) {
							uni.chooseImage({
								count: Number(that.canUpCount),
								sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
								sourceType: ['album'], //从相册选择
								success: function(res) {
									console.log(res, '选择的');
									if (res) {
										if (res.tempFiles) {
											for (let item of res.tempFiles) {
												if (item.size > (that.imgSize * 1024 * 1024)) {
													uni.showToast({
														title: `图片不能大于${that.imgSize}M`,
														icon: 'none'
													})
													return false;
												}
												if (item.type) {
													let r = that.imgType.some(v => {
														let type = item.type.split('/');
														if (type.length)
															return (v === type[1]);
													});
													if (!r) {
														uni.showToast({
															title: `只允许上传${that.imgType}的类型`,
															icon: 'none'
														})
														return false;
													}
												}
											}
										}
										that.imgArray = [...that.imgArray, ...res.tempFilePaths];
										that.changeImgArr(false);
										if (that.async) {
											//直接上传
											that.asyncArr = res.tempFilePaths;
											that.asyncUpload();
										}
									}
								}
							});
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			preview(url, index) {
				// 预览图片
				uni.previewImage({
					urls: [url]
				});
			},

			changeImgArr(type) {
				for (let index in this.imgArray) {
					if (!this.imgArray[index].upload) {
						this.imgArray[index] = {
							upload: type,
							url: this.imgArray[index]
						}
					}
				}
			},

			asyncUpload() {
				const _this = this;
				if (this.asyncArr.length) {
					this.startUpload = true;
					_this.prompt = "";
					for (let item of this.asyncArr) {
						// console.log(item, '图片的路径', _this.url, this.asyncArr);
						uni.uploadFile({
							url: _this.url,
							filePath: item,
							name: 'file',
							// header: {
							// 	"Content-Type": "multipart/form-data"
							// },
							success: (uploadFileRes) => {
								// console.log(uploadFileRes, '成功回调');
								if (uploadFileRes) {
									let res = JSON.parse(uploadFileRes.data);
									_this.$emit("result", res);
									_this.startUpload = false;
								}
							},
							fail: (e) => {
								_this.startUpload = false;
								_this.prompt = "上传失败，请检查！";
								console.log(e);
							}
						});
					}
				}
			},

			delImg(i) {
				const _this = this;
				uni.showModal({
					title: '提示',
					content: '是否删除这张照片？',
					success: function(res) {
						if (res.confirm) {
							_this.imgArray.splice(i, 1);
							if (_this.async) {
								_this.$emit("delImg", i);
							}
						} else if (res.cancel) {}
					}
				});
			},

			upload(callback) {
				const _this = this;
				if (!_this.async) {
					_this.prompt = "";
					if (_this.imgArray.length) {
						this.startUpload = true;
						let successNum = 0;
						let urlArr = [];
						for (let item of _this.imgArray) {
							_this.uploadImg(item, res => {
								if (res.resCode == 0) {
									successNum++;
									urlArr.push(res.fileVo);

								} else {
									urlArr.push(res);
								}
								_this.prompt = "正在上传...(成功" + successNum + "张/" + urlArr.length + "张)";
								if (urlArr.length == _this.imgArray.length) {
									_this.prompt = "已全部上传完成！";
									if (successNum > 0) {
										_this.startUpload = false;
										callback(_this.result(urlArr, successNum));
									} else {
										_this.startUpload = false;
										callback(urlArr); //错误的返回
									}

								}
							});
						}
					} else {
						_this.prompt = '请先选择图片后上传！';
					}
				} else {
					_this.prompt = '在异步模式下无法调用upload方法。';
				}
			},

			result(urlArr, successNum) {
				let result = {
					result: 'success',
					code: 0,
					urlArray: urlArr,
					success: successNum
				}
				return result;
			},

			uploadImg(item, callback) {
				const _this = this;
				uni.uploadFile({
					url: _this.url,
					filePath: item,
					name: 'file',
					success: (uploadFileRes) => {
						if (uploadFileRes) {
							let res = JSON.parse(uploadFileRes.data);
							res.resCode = 0;
							callback(res);
						}
					},
					fail: (e) => {
						callback({
							resCode: 500,
							msg: '图片上传失败',
							localUrl: item,
							reason: e
						});
					}
				});
			}
		}
	}
</script>

<style scoped>
	.w-100 {/* 
		width: 100%; */
	}

	.flex {
		/* 转为弹性盒模型*/
		display: flex;
	}

	.flex_bet {
		/* 两端左右*/
		display: flex;
		justify-content: space-between;
	}

	.flex_wrap {
		/* 转为弹性盒模型并自动换行*/
		display: flex;
		flex-wrap: wrap;
	}

	.flex_xy_center {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.upload-img-view {
		height: 147rpx;
		width: 147rpx;
		border-radius: 10rpx;
		border: 4rpx dotted #F1F1F1;
		/* background-color: #F1F1F1; */
	}

	.upload-img-view>image {
		width: 70rpx;
		height: 70rpx;
	}

	.upload-txt {
		font-size: 24rpx;
		color: #FFFFFF;
	}

	.imgs-view {
		height: 147rpx;
		width: 147rpx;
		border-radius: 10rpx;
		margin-right: 1.8%;
		margin-bottom: 16rpx;
		border: 1rpx solid #F1F1F1;
		box-sizing: border-box;
		position: relative;
	}

	.uploading {
		position: absolute;
		background-color: rgba(0, 0, 0, .5);
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		text-align: center;
		line-height: 100%;
		z-index: 999;
	}

	.uploading image {
		width: 60rpx;
		height: 60rpx;
		z-index: 1000;
		animation: rotation .6s linear infinite;
		-moz-animation: rotation .6s linear infinite;
		-webkit-animation: rotation .6s linear infinite;
		-o-animation: rotation .6s linear infinite;
	}


	@keyframes rotation {
		from {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-o-transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
			-moz-transform: rotate(360deg);
			-o-transform: rotate(360deg);
		}
	}

	.imgs-view>image {
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}

	.tip {
		font-size: 24rpx;
		color: #FF0000;
		margin-top: 12rpx;
	}

	.tip>label {
		color: #009100;
	}

	.del-btn {
		position: absolute;
		top: 0;
		right: 0;
		width: 32rpx;
		height: 32rpx;
		z-index: 999;
	}

	.del-btn>image {
		width: 100%;
		height: 100%;
		display: flex;
	}
</style>
