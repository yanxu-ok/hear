<template>
	<view>
		<view class="chongxin">
			<view class="regiestLu" @tap="handleChonglu">
				重录
			</view>
			<!-- <u-count-down :show-days="false" ref="uCountDown" :timestamp="shijian" :autoplay="false" style="margin-left: 180rpx;"></u-count-down> -->
			<!-- <jishi :mode="1"></jishi> -->
			<!-- {{time}} -->
			<clock @clockend="clockend" ref="myClock">
			</clock>
		</view>
		<!-- {{shijian}} -->


		<!-- #ifdef H5 -->
		<view style="margin-top: 100rpx;display: flex; justify-content: space-around;padding: 0 107rpx;">
			<u-image width="126.4rpx" shape="circle" height="126.4rpx" src="@/static/listen/quxiao.png" @click="endRecord"></u-image>
			<!-- <u-image width="126.4rpx" shape="circle" height="126.4rpx" src="" @click="handleStartClick"></u-image> -->
			<view style="position: relative;margin: 0 20rpx;" >
				<u-image width="126.4rpx" shape="circle" height="126.4rpx" src="@/static/listen/zhongxin.png"></u-image>
				<image :src="luzhiImg" @click="handleStartClick" style="position: absolute;left: 0; margin: auto;bottom: 0; top: 0; right: 0;width: 37rpx;height: 57rpx;"></image>
			</view>
			<u-image width="126.4rpx" shape="circle" height="126.4rpx" src="@/static/listen/wancheng.png" @click="handleRecord"></u-image>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->

		<view style="margin-top: 100rpx;display: flex; justify-content: space-around;padding: 0 107rpx;">
			<u-image width="126.4rpx" shape="circle" height="126.4rpx" src="@/static/listen/quxiao.png" @click="endRecord"></u-image>
			<view style="position: relative;">
				<u-image width="126.4rpx" shape="circle" height="126.4rpx" src="@/static/listen/zhongxin.png"></u-image>
				<image :src="luzhiImg"  @click="startRecord" style="position: absolute;left: 0; margin: auto;bottom: 0; top: 0; right: 0;width: 37rpx;height: 57rpx;"></image>
			</view>
			<u-image width="126.4rpx" shape="circle" height="126.4rpx" src="@/static/listen/wancheng.png" @click="handleRecord"></u-image>
		</view>

		<!-- #endif -->
		<view style="text-align: center;">{{luzhi? "停止录制":"开始录制"}}</view>

	</view>

</template>

<script>
	import clock from '@/components/tanluzhe-clock/clock.vue'
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		isApp,
		nowTimeStr
	} from '@/libs/hear-util/index.js'
	import jishi from '@/components/mehaotian-numled/mehaotian-numled.vue'
	// #ifdef H5
	import {
		WebBridgeApi
	} from "ijsbridge"
	import wx from 'weixin-js-sdk';
	// console.log(WebBridgeApi);

	// #endif

	// #ifdef MP-WEIXIN
	const recorderManager = uni.getRecorderManager();
	const innerAudioContext = uni.createInnerAudioContext();
	// innerAudioContext.autoplay = true;
	// #endif
	export default {
		data() {
			return {
				text: 'uni-app',
				luzhi: false,
				showquxiao: true, //显示取消的按钮
				options: {
					duration: 600000, //指定录音的时长，单位 ms
					sampleRate: 16000, //采样率
					numberOfChannels: 1, //录音通道数
					encodeBitRate: 96000, //编码码率
					format: 'mp3', //音频格式，有效值 aac/mp3
					frameSize: 50, //指定帧大小，单位 KB
				},
				time: '00.00.00',
				isLuzhi: false, // 是否录制
				weixinConfig: null, // 微信配置文件
				localId: null, // 本地音频的id
				timer: null // 定时器
			}
		},

		components: {
			jishi,
			// chunLeiModal
			clock
		},

		computed: {
			...mapState({
				audioInfo: state => state.huting.audioInfo,
				audioOrActicle: state => state.huting.audioOrActicle,
				voicePath: state => state.huting.voicePath
			}),
			shijian() {
				// #ifdef H5
				if (isApp() == "weixin") {
					return 60
				} else {
					return 600
				}
				// #endif
			},
			// 录制的图片
			luzhiImg() {
				let result = this.luzhi ? require('@/static/listen/tingzhi.png') : require('@/static/listen/jixuluzhi.png')
				return result
			}
		},

		async mounted() {
			// #ifdef H5
			if (isApp() == "weixin") { // 调用微信的config的接口
				let _this = this

				wx.ready(function() {
					console.log(1, '已初始化好')
					// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
				});

				let weixinConfig = await this.getWeixin()

				// console.log(weixinConfig);
				this.weixinConfig = weixinConfig

				wx.config(this.weixinConfig);
				// wx.error(function(res) {
				// 	// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				// });

				// wx.config({
				// 	debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				// 	appId: weixinConfig.appId, // 必填，公众号的唯一标识
				// 	timestamp: weixinConfig.timestamp, // 必填，生成签名的时间戳
				// 	nonceStr: weixinConfig.nonceStr, // 必填，生成签名的随机串
				// 	signature: weixinConfig.signature, // 必填，签名
				// 	jsApiList: weixinConfig.jsApiList // 必填，需要使用的JS接口列表
				// });

				wx.onVoiceRecordEnd({
					// 录音时间超过一分钟没有停止的时候会执行 complete 回调
					complete: function(res) {
						_this.localId = res.localId;
					}
				});

			} else {}
			// #endif
			// #ifdef MP-WEIXIN
			recorderManager.onStop((res) => {
				console.log('recorder stop' + res.tempFilePath + '已结束');
				this.setVoicePath(res.tempFilePath)
				this.time = 600
				this.luzhi = false
				this.endTime()
				this.shoattishi()
				this.setFlag(true)
				this.$refs.myClock.end(); // 结束计时
			})
			
			recorderManager.onStart((res) => {
				console.log('recorder onStart');
				this.luzhi = true
				this.startTime()
				this.shoattishi()
				this.$refs.myClock.start(); // 开始计时
			})
			
			recorderManager.onPause((res) => {
				console.log('已暂停');
			})
			// #endif
		},
		methods: {
			
			// 计时器回调
			clockend(res) {
				console.log(res)
				this.setallTime(res) // 将总时长存到vuex中
			},
			
			startTime() {
				this.timer = setInterval(() => {
					this.time = this.nowTimeStr()
				}, 1000);
				// nowTimeStr()
			},

			endTime() {
				clearInterval(this.timer)
				this.time = '00:00:00'
			},

			nowTimeStr() {
				var date = new Date("January 12,2006 00:00:00");
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var h = date.getHours();
				var m = date.getMinutes();
				var s = date.getSeconds();
				var isnDay = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日");
				// var timestr = year + "年" + month + "月" + day + "日 " + h + ":" + m + ":" + s + " " + isnDay[date.getDay()];
				var timestr = h + ":" + m + ":" + s + " ";

				//TopCurrentTime是一个div块
				// document.getElementById("TopCurrentTime").innerHTML = timestr;
				return timestr
			},
			
			...mapMutations(['setVoicePath', 'setLocalId', 'setFlag', 'setallTime']),
			// ...mapActions(['getWeinConfig']),
			
			handleHuting() {
				uni.navigateTo({
					url: '/pages/listen_nei/components/listen_huting'
				})
			},
			
			// 微信
			async getWeixin() {
				let _this = this
				let [error, res] = await uni.request({
					url: 'http://wechat.iqilu.com/api/jsSdkVue' //仅为示例，并非真实接口地址。
				});
				return res.data.data
			},
			
			handleLuyin() {
				this.show = !this.show
			},
			
			// #ifdef MP-WEIXIN
			
			startRecord() {
				if (this.luzhi) {
					recorderManager.stop()
					// this.$refs.myClock.end(); // 结束计时
				} else {
					console.log('开始录音');
					recorderManager.start(this.options);
					// this.$refs.myClock.start(); // 开始计时
					// this.startTime()
				}
			},
			
			endRecord() {
				this.luzhi = false
				console.log('录音结束');
				recorderManager.stop();
				this.setVoicePath('')
			},
			
			playVoice() {
				console.log('播放录音');
				if (this.voicePath) {
					innerAudioContext.src = this.voicePath;
					innerAudioContext.play();
				}
			},
			// #endif
			// #ifdef H5
			endRecord() {
				this.luzhi = false
				console.log('录音结束');
				if (isApp() == "weixin") {
					wx.stopRecord({
						success: function(res) {
							_this.shoattishi()
							_this.setLocalId(null)
						}
					});
				} else { // 
					// 一县一端
					WebBridgeApi.audioRecord({
						start: false
					}).then(({
						err,
						result
					}) => {
						_this.luzhi = false
					});
				}
			},
			
			handleStartClick() {
				let _this = this
				if (this.luzhi) {
					if (isApp() == "weixin") {
						wx.stopRecord({
							success: function(res) {
								_this.setLocalId(null)
								_this.luzhi = false
								_this.shoattishi()
							}
						});
					} else {
						WebBridgeApi.audioRecord({
							start: false
						}).then(({
							err,
							result
						}) => {
							_this.luzhi = true
							// this.$refs.myClock.end();
							console.log(err, result);
						});
					}
				} else {
					if (isApp() == "weixin") { // 微信中浏览器录音 开始录音\
						wx.startRecord({
							success: function() {
								_this.luzhi = true
								_this.shoattishi()
							},
							fail: function(res) {
								uni.showToast({
									title: JSON.stringify(res),
									icon: 'none'
								})
							},
							cancel: function() {
								uni.showToast({
									title: '您拒绝了授权录音',
									icon: 'none'
								})
							}
						})
					} else { // 一县一端中开始录音
						// console.log(1);
						_this.luzhi = true
						this.$refs.myClock.start();
						WebBridgeApi.audioRecord({
							start: true,
							time: 600
						}).then(({
							err,
							result
						}) => {
							_this.luzhi = false
							console.log(err, result);
							_this.setVoicePath(result.audio.data.audioFileURL)
							// _this.setVoicePath(result.audio.f)
							_this.setFlag(true)
							_this.shoattishi()
							_this.$refs.myClock.end();
						});
					}
				}


			},
			// #endif

			handleChonglu() {
				let _this = this
				this.luzhi = false;
				// #ifdef MP-WEIXIN
				recorderManager.stop()
				this.setVoicePath('')
				// recorderManager.start(this.options)
				// #endif
				// #ifdef H5
				if (isApp() == "weixin") {
					wx.stopRecord({
						success: function(res) {
							_this.setLocalId(null)
							_this.shoattishi()
							_this.luzhi = false
						}
					});
				} else {
					// 一县一端
					WebBridgeApi.audioRecord({
						start: true,
						time: 600
					}).then(({
						err,
						result
					}) => {
						_this.luzhi = false
						_this.shoattishi()
						console.log(err, result);
						_this.setVoicePath(result.audio.data.audioFileURL)
						// _this.setVoicePath(result.audio.f)
					});
				}
				// #endif
			},

			// 提示
			shoattishi() {

				if (this.luzhi) {
					uni.showToast({
						title: '开始录音',
						icon: 'none'
					})
				} else {
					uni.showToast({
						title: '停止录音',
						icon: 'none'
					})
				}

			},


			// 确定事件 上传
			handleRecord() {
				let _this = this
				this.setFlag(true)
				this.luzhi = false;
				// #ifdef MP-WEIXIN
				recorderManager.stop()
				// #endif
				// #ifdef H5
				if (isApp() == "weixin") {
					wx.stopRecord({
						success: function(res) {
							_this.luzhi = false
							_this.shoattishi()
							_this.setLocalId(null)
						}
					});
				} else {
					WebBridgeApi.audioRecord({
						start: false
					}).then(({
						err,
						result
					}) => {

					});
				}
				// #endif

			},
		},
	}
</script>

<style lang="scss">
	.chongxin {

		display: flex;
		justify-content: flex-start;
		align-items: center;

		.regiestLu {
			width: 105rpx;
			height: 42rpx;
			border: 2rpx solid rgba(153, 153, 153, 1);
			margin-left: 28rpx;
			margin-top: 30rpx;
			text-align: center;
			border-radius: 21rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(153, 153, 153, 1);
			margin-top: 11rpx;
			margin-right: 200rpx;
		}
	}
</style>
