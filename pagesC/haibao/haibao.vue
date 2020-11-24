<template>
	<view class="haibao">
		<u-navbar background="" title-color="#000000" back-icon-color="#000000">
		</u-navbar>
		<haibao ref="painter" :board="base" custom-style="margin-left:95rpx;margin-top:20px" isRenderImage isH5PathToBase64></haibao>

		<!-- <canvas canvas-id="couponQrcode"></canvas> -->
		<share></share>
	</view>
</template>

<script>
	const qrCode = require('./weapp-qrcode.js')
	import haibao from '@/components/lime-painter/index.vue'
	import share from './components/share.vue'
	export default {
		components: {
			haibao,
			share
		},
		onLoad() {
			// setTimeout(() => {
			// 	this.couponQrCode()
			// }, 50)
		},
		data() {
			return {
				base: {
					width: '561rpx',
					height: '812rpx',
					views: [{
							type: 'view',
							css: {
								background: 'rgba(56,56,56,0.9)',
								left: '0rpx',
								top: '0rpx',
								mode: 'widthFix',
								width: '561rpx',
								height: '812rpx',
								radius: '12rpx'
							}
						},
						{
							type: 'image',
							src: 'https://img11.iqilu.com/29/2020/09/15/2d06df7459f0c547406f4b3f175301de.jpg',
							css: {
								left: '20rpx',
								top: '20rpx',
								mode: 'widthFix',
								width: '520rpx',
								height: '500rpx',
								radius: '15rpx'
							}
						},
						{
							type: 'text',
							text: '我要领读 |',
							css: {
								color: '#ffffff',
								left: '20rpx',
								top: '550rpx',
								bottom: '212rpx',
								fontSize: '30rpx',
								width: '160rpx'
							}
						},
						{
							type: 'text',
							text: '我有一个秘密',
							css: {
								color: '#ffffff',
								left: '160rpx',
								top: '550rpx',
								bottom: '212rpx',
								fontSize: '30rpx',
								width: '187rpx'
							}
						},
						{
							type: 'image',
							src: 'https://img11.iqilu.com/29/2020/09/15/2d06df7459f0c547406f4b3f175301de.jpg',
							css: {
								left: '20rpx',
								top: '605rpx',
								mode: 'widthFix',
								width: '27rpx',
								height: '26rpx',
								radius: '50%'
							}
						},
						{
							type: 'text',
							text: '唐蛋蛋',
							css: {
								color: '#ffffff',
								left: '60rpx',
								top: '605rpx',
								fontSize: '22rpx',
								width: '187rpx'
							}
						},
						{
							type: 'text',
							text: '.................................................................................................',
							css: {
								color: '#ffffff',
								left: '20rpx',
								top: '640rpx',
								fontSize: '22rpx',
								width: '520rpx'
							}
						},
						{
							type: 'text',
							text: '扫码收听我的声音......',
							css: {
								color: '#ffffff',
								left: '20rpx',
								top: '680rpx',
								fontSize: '22rpx',
								width: '520rpx'
							}
						},
						{
							type: 'text',
							text: '阅读阅享',
							css: {
								color: 'rgba(255,255,255,0.2)',
								left: '20rpx',
								top: '740rpx',
								fontSize: '22rpx',
								width: '520rpx'
							}
						},
					]
				}
			}
		},

		methods: {

			// 二维码生成工具
			couponQrCode() {
				let qrcode = new qrCode('couponQrcode', {
					text: "http://www.baidu.com",
					width: 60,
					height: 60,
					colorDark: "#333333",
					colorLight: "#FFFFFF",
					correctLevel: qrCode.CorrectLevel.H,
					callback: (res) => {
						// 接下来就可以直接调用微信小程序的api保存到本地或者将这张二维码直接画在海报上面去，看各自需求
						console.log(res);
						console.log(111111);
					}
				})

			},

			saveImage() {
				this.isShowPopup = false
				uni.saveImageToPhotosAlbum({
					filePath: this.path,
					success(res) {
						uni.showToast({
							title: '已保存到相册',
							icon: 'success',
							duration: 2000
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.haibao {
		display: flex;
		flex-direction: column;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
	}
</style>
