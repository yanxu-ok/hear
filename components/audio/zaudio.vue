<template>
	<view class="imt-audio" :class="[`${theme}`]">
		<!-- operation -->
		<view class="audio-wrapper">
			<image src="./static/prev.png" class="prevbtn" @click="step(0)" mode="widthFix" v-if="stepShow"></image>
			<view class="audio-number">{{ current }}</view>
				<!-- 	<slider class="audio-slider" :activeColor="themeColor" block-size="16" :value="current_value" :max="duration_value"
			 @changing="changing" @change="change"></slider> -->
			<myslider style="margin-left: 29rpx;margin-right: 29rpx;width: 100%;" :block-size="36" blockOuterColor="rgba(254,139,22,0.3)"
			 blockColor="#FE8B16" activeColor="#FE8B16" :value="current_value" :max="duration_value" @changed="change"></myslider>
			<view class="audio-number">{{ duration }}</view>
			<image src="./static/next.png" class="nextbtn" @click="step(1)" mode="widthFix" v-if="stepShow"></image>
		</view>
	</view>
</template>

<script>
	import myslider from '@/components/ly-drag-slider/dc-slider.vue'
	export default {
		components: {
			myslider
		},
		data() {
			return {
				current: '00:00', //当前播放时间
				duration: '00:00', //总时长
				current_value: 0, //slider当前进度
				duration_value: 100, //slider总长度
				paused: true, //是否处于暂停状态
				default_cover: 'https://zijing-sz.oss-cn-shenzhen.aliyuncs.com/api_upload/2019-11-06_15_26_32_735247.png', //默认海报
				hassrc: '', //////////////正在播放的音频
				info: {}
			};
		},

		props: {
			oldinfo: Object
				/*************
							info对象 {
								src, 音频地址
								title, 标题
								singer, 作者
								coverImgUrl  海报
							}
						*/
				,
			theme: {
				type: String, // 主题 'music' or 'fm'
				default: 'fm'
			},
			themeColor: {
				type: String,
				default: '#rgb(248, 173, 38)'
			},
			stepShow: {
				//是否显示快进后退按钮
				type: Boolean,
				default: true
			}
		},
		// computed: {
		// 	info() {
		// 		console.log(this.oldinfo,1111);
		// 		return this.oldinfo 
		// 	}
		// },
		watch: {
			oldinfo(newValue, oldValue) {
				if (!newValue) {
					return;
				}
				this.info = newValue // 里面有当前时间
				// this.$audio.src=newValue.src
				// this.$audio.play();
				this.audioPlay() // 将播放的进度传进去
			}
		},

		created() {
			const {
				duration,
				current,
				duration_value,
				current_value,
				src
			} = this.$store.state.app.playinfo;
			this.hassrc = src;
			// console.log(this.info, 1, this.hassrc);

			//对比 新的音频与旧音频 地址  从而渲染 对应进度条
			// console.log(this.info.src , this.hassrc,'新的和旧的');

			if (this.info.src == this.hassrc) {
				this.current = current;
				this.duration_value = duration_value;
				this.duration = duration;
				this.current_value = current_value;
				this.paused = this.$store.state.app.paused;
			} else if (this.hassrc) {
				this.current = current;
				this.duration_value = duration_value;
				this.duration = duration;
				this.current_value = current_value;
				this.paused = this.$store.state.app.paused;
			}

			this.$audio.onCanplay(() => {});
			this.$audio.onPlay(() => {
				// console.log('++++++++++++++++++', 111111111111111111);
				console.log('++++++++++++++++++', this.$audio.currentTime, '开始播放');
				this.paused = false;
				this.saveplay('src', this.info.src);
				this.$store.commit('setpause', false); //记录音频正常停止 false
				this.$store.commit('set_n_pause', false); //标记音频异常中断 为false 用于电话来电中断音频的判断

				// console.log('onplay');
				this.duration = this.format(this.$audio.duration);
				this.duration_value = this.$audio.duration;
				this.saveplay('duration', this.duration);
				this.saveplay('duration_value', this.duration_value);
			});

			this.$audio.onPause(() => {
				this.paused = true;
				this.$store.commit('setpause', true); //记录音频正常停止 true
			});

			this.$audio.onStop(() => {
				this.paused = true;
				this.$store.commit('setpause', true); //记录音频正常停止 true
			});

			this.$audio.onEnded(() => {
				this.paused = true;
				this.$store.commit('setpause', true); //记录音频正常停止 true
				this.$audio.startTime = 0;
				this.current = this.format('0');
				this.current_value = '0';
				this.saveplay('current', this.current);
				this.saveplay('current_value', this.current_value);
				// console.log('音频正常停止');
				uni.$emit('audioEnde',1)
			});

			this.$audio.onTimeUpdate(() => {
				// console.log(1,this.info.src,this.$store.state.app.playinfo.src);
				// if (this.info.src == this.$store.state.app.playinfo.src) {
				this.current = this.format(this.$audio.currentTime);
				this.current_value = this.$audio.currentTime;
				// console.log(this.current, this.current_value,this.duration_value,this.duration);
				this.saveplay('current', this.current);
				this.saveplay('current_value', this.$audio.currentTime);
				this.duration = this.format(this.$audio.duration);
				this.duration_value = this.$audio.duration;
				this.saveplay('duration', this.duration);
				this.saveplay('duration_value', this.duration_value);
				// }
			});
			this.$audio.onError(() => {
				this.paused = true;
				this.$store.commit('setpause', true);
				this.$api.msg('音频播放错误');

				this.$store.commit('setaudio', {
					src: '',
					title: '',
					singer: '',
					coverImgUrl: ''
				});
				this.$store.commit('setplay', {
					current: 0,
					current_value: 0,
					duration: 0,
					duration_value: 0
				});
			});
		},

		methods: {
			saveplay(type, e) {
				//记录播放信息
				this.$store.commit('setplay', {
					[type]: e
				});
			},
			timeupdate() {
				const {
					current,
					current_value
				} = this.$store.state.app.playinfo;
				this.current = current;
				this.current_value = current_value;
			},
			changing(event) {
				this.current_value = event.detail.value;
				console.log(this.current_value);
				this.current = this.format(event.detail.value);
			},

			format(num) {
				try {
					return (
						'0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(Math.floor(
							num % 60)).length) + Math.floor(num % 60)
					);
				} catch (e) {
					return (
						'0'.repeat(3 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(Math.floor(
							num % 60)).length) + Math.floor(num % 60)
					);
				}
			},

			operation() {
				console.log(this.hassrc);
				if (this.hassrc != this.info.src) {
					if (this.paused) {
						const {
							src,
							title,
							singer,
							poster
						} = this.info;
						// console.log(this.info);
						this.$store.commit('setaudio', {
							src: src,
							title: title,
							singer: singer,
							coverImgUrl: poster || this.default_cover
						});
						this.$audio.src = src;
						this.$audio.title = title;
						this.$audio.singer = singer;
						this.$audio.coverImgUrl = poster || this.default_cover;
						this.$audio.play();
						this.$audio.startTime = 0;
						this.$audio.seek(0);
						this.hassrc = src;
						this.paused = false;

					} else {
						this.$audio.pause();
						this.paused = true;
						this.$store.commit('set_n_pause', true); //标记音频异常中断
					}
				} else {
					if (this.paused) {
						const {
							src,
							title,
							singer,
							coverImgUrl
						} = this.$store.state.app.audio;
						this.$audio.src = src;
						this.$audio.title = title;
						this.$audio.singer = singer;
						this.$audio.coverImgUrl = coverImgUrl || this.default_cover;
						this.$audio.play();
						this.$audio.startTime = parseFloat(this.$store.state.app.playinfo.current_value);
						this.$audio.seek(parseFloat(this.$store.state.app.playinfo.current_value));
						this.$store.commit('setaudio', {
							src: src,
							title: title,
							singer: singer,
							coverImgUrl: coverImgUrl || this.default_cover
						});
						this.hassrc = src;
						this.paused = false;
					} else {
						this.$audio.pause();
						this.paused = true;
						this.$store.commit('set_n_pause', true);
					}
				}
			},

			// 音频源切换事件
			audioPlay() {
				if (this.hassrc != this.info.src) {
					console.log('音频不一样');
					const {
						src,
						title,
						singer,
						poster,
						historyDate
					} = this.info;
					this.$store.commit('setaudio', {
						src: src,
						title: title,
						singer: singer,
						coverImgUrl: poster || this.default_cover
					});
					// console.log(this.$store.state.app.audio);
					this.saveplay('src', src);
					this.$audio.src = src;
					this.$audio.title = title;
					this.$audio.singer = singer;
					this.$audio.coverImgUrl = poster || this.default_cover;
					this.$audio.play();
					this.$audio.startTime = historyDate;
					this.$audio.seek(historyDate);
					this.hassrc = src;
					this.paused = false;
					this.$store.commit('setpause', false);
				} else {
					console.log('音频相同');
					const {
						src,
						title,
						singer,
						coverImgUrl
					} = this.$store.state.app.audio;
					this.$audio.src = src;
					this.$audio.title = title;
					this.$audio.singer = singer;
					this.$audio.coverImgUrl = coverImgUrl || this.default_cover;
					this.$audio.play();
					this.$audio.startTime = parseFloat(this.$store.state.app.playinfo.current_value);
					this.$audio.seek(parseFloat(this.$store.state.app.playinfo.current_value));
					this.$store.commit('setaudio', {
						src: src,
						title: title,
						singer: singer,
						coverImgUrl: coverImgUrl || this.default_cover
					});
					this.hassrc = src;
					this.paused = false;
					this.$store.commit('setpause', false);
				}
			},

			// // 音频暂停 
			// audioStop(){
			// 	this.$audio.pause()
			// },

			//完成拖动事件
			change(e) {
				// console.log(e);
				this.$audio.seek(e.value);
			},

			step(type) {
				var pos = !type ? this.current_value - 15 : this.current_value + 15;
				this.$audio.seek(pos);
			},

			// // 播放还是暂停
			// playOrPause(){
			// 	if()
			// 	this.$audio.stop()
			// }

		}
	};
</script>

<style scoped lang="scss">
	.imt-audio.music {
		padding: 0 30rpx 30rpx 0;
		background: #fff;
		
		.top {
			&>view:nth-child(2) {
				.title {
					font-weight: bold;
					font-size: 34rpx;
					margin-top: 24rpx;
					text-align: center;
				}

				.singer {
					color: #999;
					font-size: 26rpx;
					margin-top: 10rpx;
					text-align: center;
					margin-bottom: 18rpx;
				}
			}
		}

		.audio-slider {
			flex: 1;
			margin: 0 30rpx 0 10rpx;
		}

		.audio-control-wrapper {
			margin: 100rpx auto;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;

		}

		.cover {
			width: 280rpx;
			height: 280rpx;
			box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.13);
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 50%;
			border: 2px solid #fff
		}

		.cover.on {
			-webkit-animation: 10s rowup linear infinite normal;
			animation: 10s rowup linear infinite normal;
		}

		.play {
			width: 130rpx;
			height: 130rpx;
			z-index: 99;
			background: rgba(0, 0, 0, .4);
			border-radius: 50%
		}

		.prevbtn {
			width: 48rpx;
			height: 48rpx;
			margin-right: 40rpx;
		}

		.nextbtn {
			width: 48rpx;
			height: 48rpx;
			margin-left: 40rpx;
		}
	}

	.audio-number {
		font-size: 22rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		z-index: 1;
	}

	.audio-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}


	.imt-audio.fm {
		// background: #fff;
		// border: 1px solid #cecece;
		width: 96%;
		margin: 0 auto;
		border-radius: 10px;
		// box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		overflow: hidden;

		.top {
			background: #f5f5f5;
			display: flex;
			align-items: center;

			&>view:nth-child(2) {
				flex: 1;
				margin-left: 30rpx;

				.title {
					font-weight: bold;
					font-size: 34rpx;
					margin-top: 24rpx;
					text-align: left;
				}

				.singer {
					color: #999;
					font-size: 26rpx;
					margin-top: 10rpx;
					text-align: left;
					margin-bottom: 18rpx;
				}
			}
		}

		.audio-wrapper {
			display: flex;
			align-items: center;
		}

		.audio-slider {
			flex: 1;
			margin: 0 30rpx 0 30rpx;
		}

		.audio-control-wrapper {
			margin: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			padding: 30rpx 20rpx;

		}

		.cover {
			width: 180rpx;
			height: 180rpx;
			box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 50%;
			border: 2px solid #fff
		}

		.cover.on {
			-webkit-animation: 10s rowup linear infinite normal;
			animation: 10s rowup linear infinite normal;
		}

		.play {
			width: 80rpx;
			height: 80rpx;
			z-index: 99;
			background: rgba(0, 0, 0, .4);
			border-radius: 50%
		}

		.prevbtn {
			width: 48rpx;
			height: 48rpx;
			margin-right: 40rpx;
		}

		.nextbtn {
			width: 48rpx;
			height: 48rpx;
			margin-left: 40rpx;
		}
	}

	@keyframes rowup {
		0% {
			-webkit-transform: translate(-50%, -50%) rotate(0deg);
			transform-origin: center center;
		}

		100% {
			-webkit-transform: translate(-50%, -50%) rotate(360deg);
			transform-origin: center center;
		}
	}
</style>
