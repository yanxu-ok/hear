<template>
	<view class="shangchuan">
		<view class="shangchuan_bg">
			<u-navbar background="" title-color="#ffffff" back-icon-color="#ffffff">
			</u-navbar>
			<view class="shangchuan_bg_addtext">添加或选择一张封面吧~</view>
			<view style="display: flex;flex-direction: row;justify-content: center;align-items: center;margin-top: 34rpx;">
				<loadshangchuan @result="handleResult" uploadImgCount="1" imgCount="1" async="async" :url="Imgurl"></loadshangchuan>
				<view style="display: flex;margin-left: 41rpx;">
					<view v-for="(item,index) in imgList" :key="index">
						<view :style="{border: imgIndex == index ? '#F8A11F solid 3rpx' : 'none'}" class="add">
							<image style="width: 100%; height: 100%;border-radius: 10rpx;" :src="item" @click="handleTap(item,index)"></image>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view style="padding: 30rpx;">
			<view>标题:</view>
			<u-input v-model="title" :type="type" :border="border" :disabled="article== 'audio' ? true : false " />

			<u-line color="#EFEFF1" />

			<view style="margin-top: 20rpx;">内容:</view>

			<u-input v-model="artContent" type="textarea" :border="border" :height="height" :auto-height="autoHeight" :disabled="article== 'audio' ? true : false " />

			<u-line color="#EFEFF1" />

			<u-section title="所属类别:" :right="true" :show-line="showLine" @click="handlePicker('leibie')" style="margin-top: 35rpx;">
			</u-section>

			<!-- <u-picker mode="selector" v-model="picker" :default-selector="[0]" :range="selector" :mask-close-able="false"
			 @confirm="handleQUeding" @cancel="handleQuxiao"></u-picker> -->
			<!-- <axbCheckBox ref="radio1" :multi="true" :list="selector" @change="radioChangeStatus1"></axbCheckBox> -->

			<view style="margin-top: 20rpx;">{{article == 'audio' ? audioInfo.labelName : mLeiBie}}</view>

			<u-line color="#EFEFF1" margin="60rpx 0 0 0" />

			<u-section title="所属圈子:" :right="true" :show-line="showLine" @click="handlePicker1('quanzi')" style="margin-top: 35rpx;">
			</u-section>
			<view style="margin-top: 20rpx;">{{quanzi}}</view>
			<u-picker mode="selector" v-model="picker1" :default-selector="[0]" :range="selector1" :mask-close-able="false"
			 @confirm="handleQUeding" @cancel="handleQuxiao"></u-picker>
			<u-line color="#EFEFF1" margin="60rpx 0 0 0" />

			<u-button type="warning" throttle-time="2000" @click="handleSave">保存信息</u-button>

		</view>

		<u-popup v-model="showBiaoqian" mode="bottom" border-radius="20" height="500rpx" :closeable="closeable">

			<view style="text-align: center;margin-top: 50rpx;font-size:36rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);">我的兴趣</view>

			<view style="display: flex;flex-wrap: wrap;padding: 0 50rpx;margin-top: 40rpx;">
				<axbCheckBox ref="radio1" :multi="true" :list="selector" @change="radioChangeStatus1"></axbCheckBox>
			</view>

			<!-- <view class="baocun" @tap="handleSave">保存信息</view> -->

		</u-popup>

	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import loadshangchuan from '@/components/poiuy-uImgUpload/imgUpload.vue'
	import axbCheckBox from '@/components/axb-checkbox/axb-checkbox.vue'
	export default {
		components: {
			loadshangchuan,
			axbCheckBox
		},
		data() {
			return {
				showBiaoqian: false, // 
				async: true, //图片直接上传
				url: '', // 上传图片的url
				show: true,
				showMask: false,
				value: '',
				type: 'text',
				border: false,
				height: 50,
				autoHeight: false,
				showLine: false,
				picker: false, //picker显示的值，
				picker1: false,
				selector: [],
				selectorResult: [],
				selector1: [],
				selector1Result: [],
				quanzi: '', // 圈子
				str: '', //代表的是圈子还是类别,
				imgToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJoZWFyIiwidGltZSI6MTYwMDE3MTcxMiwiZXhwIjoxNjAwMjE0OTEyLCJ1c2VyaWQiOjEsImlhdCI6MTYwMDE3MTcxMiwib3JnaWQiOiIzIn0.zFGo7ShQS_ACkJMeJoJmudui3EFB_JJu_ZUrx95CmEM', // 图片的token
				serverUrl: 'https://img11.iqilu.com/29/2020/09/15/2d06df7459f0c547406f4b3f175301de.jpg', // 服务器的地址
				article: '',
				imgList: ['https://img11.iqilu.com/29/2020/09/15/2d06df7459f0c547406f4b3f175301de.jpg',
					'https://img11.iqilu.com/29/2020/09/15/0fd1a9ff5523dc31fa9b9ad6125614ac.jpg',
					'https://img11.iqilu.com/29/2020/09/15/ee3095b9c2e5572fdac1c9664f40186d.jpg'
				],
				imgIndex: 0,
				artContent: null,
				isAudio: "false",
				title: null,
				closeable: true,
				mLeiBie: '', // 证明是空的
				// disabled: false
				radioPath: ''
			}
		},
		computed: {
			...mapState({
				audioInfo: state => state.huting.audioInfo,
				audioOrActicle: state => state.huting.audioOrActicle,
				voicePath: state => state.huting.voicePath,
				allTime: state => state.huting.allTime,
			}),
			Imgurl() {
				let data = {
					"group": "chuangqi",
					"orgid": "29",
					"pathConfig": "image"
				}
				return "https://appadmin.iqilu.com/cq-app-upload/upload/attach/file?uploadParam=" + encodeURIComponent(JSON.stringify(
					data)) + '&token=' + this.imgToken
			},

		},

		async onLoad(options) {
			this.article = options.type;
			console.log(this.audioInfo,this.article);
			this.isAudio = options.isAudio;
			this.setFlag = false
			if (this.article == 'audio') {
				this.title = this.audioInfo.articleTitle
				this.artContent = this.audioInfo.articleContent
			} else {
				return;
			}
		},
		
		async created() {
			this.imgToken = await this.get_upload_token()
			// 获取token后 需要将 音频临时地址传到 得到服务的地址
			if (this.article == 'audio') { // 如果是音频的话需要上传
				this.getAudioAdress()
			}
		},
		
		methods: {
			...mapMutations(['setFlag']),
			...mapActions(['get_upload_token', 'insert_audio', 'get_article_by_audio_id', 'category', 'insert_article',
				'get_all_category'
			]),

			//picker点击确定
			handleQUeding(options) {
				if (this.str == 'leibie') {
					this.mLeiBie = this.selectorResult[options[0]]
				} else {
					this.quanzi = this.selector1[options[0]]
				}
				console.log(options); //索引
			},

			// 获取音频的服务器地址
			async getAudioAdress() {
				console.log(this.voicePath, '音频临时路径');
				// #ifdef H5
				let blob = new Blob([JSON.stringify(this.voicePath)]);
				let blobUrl = URL.createObjectURL(blob);
				this.radioPath = blobUrl
				console.log('上传的url', this.radioPath);
				// #endif

				let data = {
					"group": "chuangqi",
					"orgid": "29",
					"pathConfig": "video"
				}

				let url = "https://appadmin.iqilu.com/cq-app-upload/upload/attach/file?uploadParam=" + encodeURIComponent(JSON.stringify(
					data)) + '&token=' + this.imgToken

				uni.uploadFile({
					url: url,
					filePath: this.voicePath,
					name: 'file',
					// header: {
					// 	"Content-Type": "multipart/form-data"
					// },
					success: (uploadFileRes) => {
						// console.log(uploadFileRes, '成功回调');
						if (uploadFileRes) {
							let res = JSON.parse(uploadFileRes.data);
							console.log(res)
							if (res.code == 1) {
								uni.showToast({
									title: '音频上传成功',
									icon: 'none'
								})
								this.radioPath = res.data.url
							}
						}
					},
					fail: (e) => {
						console.log(e);
					}
				});

			},

			// 取消做的
			handleQuxiao(options) {
				console.log(options);
			},

			// 点击picker显示的值
			async handlePicker(str) {

				if (this.article == 'audio') {
					return;
				}

				this.showBiaoqian = !this.showBiaoqian
				this.str = str
				let result = await this.get_all_category()

				result.forEach((item, index) => {
					item.name = item.labelName;
					item.value = item.labelId;
					item.checked = 0;
				})
				this.selector = result
				// console.log(result, '214211');
				// result.forEach((item, index) => {
				// 	newPush.push(item.categoryName)
				// })
				// this.selector = newPush
			},

			// 标签选择事件
			radioChangeStatus1({
				val
			}) {
				// console.log(val);
				if (val.length == 0) {
					return;
				}
				this.selectorResult = []
				// console.log(this.selector);
				val.forEach((item, index) => {
					this.selector.forEach((currect, iIndex) => {
						if (item == currect.labelId) {
							this.selectorResult.push({
								labelId: currect.labelId,
								labelName: currect.labelName
							})
						}
					})
				})
				console.log(this.selectorResult, '组合完成之后的');
				let newArr = ''
				this.selectorResult.forEach((item, index) => {
					// newArr.push(item.labelName)
					newArr += item.labelName + ','
				})

				this.mLeiBie = newArr
			},

			async handlePicker1(str) {
				this.picker1 = !this.picker1
				this.str = str
				this.selector1 = ["情感圈子", "小说圈子"]
			},

			// 保存信息页面
			async handleSave() {
				uni.navigateTo({
					url: '/pagesC/haibao/haibao'
				})
				// if (this.article == 'audio') { // 调用上传音频接口
				// 	let result = await this.insert_audio({
				// 		userId: 1,
				// 		articleId: this.audioInfo.articleId,
				// 		audioAddress: this.radioPath,
				// 		audioReadAmount: 0,
				// 		audioTime: this.allTime,
				// 		praiseNum: 0,
				// 		typeId: 1,
				// 		audioSize: 10
				// 	})
				// 	console.log(result.data, '上传音频');
				// 	if (result.data.success) {
				// 		uni.showToast({
				// 			title: '上传成功',
				// 			icon: 'none'
				// 		})
				// 		uni.switchTab({
				// 			url: '/pages/tabbar/listen/index'
				// 		});
				// 	} else {
				// 		uni.showToast({
				// 			title: '上传失败',
				// 			icon: 'none'
				// 		})
				// 	}
				// } else {
				// 	let str = ''
				// 	this.selectorResult.forEach((item, index) => {
				// 		if (index == this.selectorResult.length - 1) {
				// 			str += item.labelId
				// 		} else {
				// 			str += item.labelId + ','
				// 		}
				// 	})

				// 	if (this.serverUrl == '') {
				// 		uni.showToast({
				// 			title: '请选择图片',
				// 			icon: 'none'
				// 		})
				// 		return;
				// 	}

				// 	if (!this.title) {
				// 		uni.showToast({
				// 			title: '请输入标题',
				// 			icon: 'none'
				// 		})
				// 		return;
				// 	}

				// 	if (!this.artContent) {
				// 		uni.showToast({
				// 			title: '请输入内容',
				// 			icon: 'none'
				// 		})
				// 		return;
				// 	}

				// 	if (!str) {
				// 		uni.showToast({
				// 			title: '请选择类别',
				// 			icon: 'none'
				// 		})
				// 		return;
				// 	}

				// 	let result = await this.insert_article({
				// 		userId: 1,
				// 		// articleAuthorName:,
				// 		cover: this.serverUrl,
				// 		articleTitle: this.title,
				// 		articleIntroduction: '简介',
				// 		articleContent: this.artContent,
				// 		articleReadAmount: 0,
				// 		circleId: 1,
				// 		articleType: 2,
				// 		articleWords: this.artContent.length,
				// 		labelIdListStr: str
				// 	})
				// 	console.log(result, '上传文稿');
				// 	if (result.data.success) {
				// 		uni.showToast({
				// 			title: '上传成功',
				// 			icon: 'none'
				// 		})
				// 		setTimeout(() => {
				// 			uni.switchTab({
				// 				url: '/pages/tabbar/listen/index'
				// 			});
				// 		}, 1100)

				// 	} else {
				// 		uni.showToast({
				// 			title: '上传失败',
				// 			icon: 'none'
				// 		})
				// 	}
				// }
			},


			// 上传返回的结果
			handleResult(res) {
				console.log(res.data.url, '图片的服务器地址');
				this.serverUrl = res.data.url
				uni.showToast({
					title: '图片上传成功',
					icon: 'none'
				})
			},

			//点击图片保存 url
			handleTap(item, index) {
				this.serverUrl = item
				this.imgIndex = index
			}

		}
	}
</script>

<style lang="scss">
	.shangchuan {
		display: flex;
		flex-direction: column;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
	}

	.add {
		width: 147rpx;
		height: 147rpx;
		margin-right: 20rpx;
	}

	.shangchuan_bg {
		height: 394rpx;
		width: 100%;
		background: #000000;
		position: relative;

		& .shangchuan_bg_addtext {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			opacity: 0.9;
			margin-left: 30rpx;
		}
	}

	// .baocun {
	// 	width: 690rpx;
	// 	height: 88rpx;
	// 	font-size: 34rpx;
	// 	font-family: PingFang SC;
	// 	font-weight: 500;
	// 	margin-left: 31rpx;
	// 	background: #ffaa00;
	// 	border-radius: 60rpx;
	// 	text-align: center;
	// 	line-height: 88rpx;
	// 	color: rgba(255, 255, 255, 1);
	// 	margin-top: 30rpx;
	// }
</style>
