<template>
	<view @tap="imgClick" style="margin-top: 20rpx;">
		<u-circle-progress active-color="#fe7e00" :percent="currect" duration="0" width="90" border-width="4">
			<!-- <u-image src="@/static/images/video.png" class="cover" :class="{ on: !pause }" width="76" height="76" shape="circle"></u-image> -->
			<image :src="playImg" mode="aspectFill" class="cover" :class="{ on: !paused }"></image>
			<image :src="iszanting" style="width: 26rpx;height: 28rpx;position: absolute;left: 10rpx;right: 0;bottom: 0;top: 0;margin: auto;"></image>
		</u-circle-progress>
	</view>
</template>

<script>
	import {
		setCurrectStorg,
		getCurrectStorg
	} from '@/libs/hear-util/index.js'
	import {
		mapMutations,
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				animationData: {},
				timer: null,
				animation: null
			}
		},
		computed: {
			...mapState({
				play: state => state.play.play,
				topicId: state => state.play.topicId,
				paused: state => state.app.paused, // 全局是否暂停
				playinfo: state => state.app.playinfo, // 音频的当前值,
				audioInfo: state => state.huting.audioInfo,
				currectPlayIndex: state => state.play.currectPlayIndex,
				zhangjieList: state => state.play.zhangjieList,
				type: state => state.app.type, // 音频的类型,
				gloalImg: state => state.app.gloalImg, // 音频的类型,
				audioOrauthor: state => state.huting.audioOrauthor, //互听音频id
				chapterId: state => state.play.chapterId,
				currectPlay: state => state.play.currectPlay,
			}),

			// 进度值
			currect() {
				if (this.playinfo.duration_value == 0) {
					return 0
				} else {
					// console.log(Math.floor(this.playinfo.current_value * 100 / this.playinfo.duration_value),'进度值');
					return Math.floor(this.playinfo.current_value * 100 / this.playinfo.duration_value)
				}
			},

			// 播放的图片
			playImg() {
				// console.log(this.gloalImg);
				const user = uni.getStorageSync('user');
				if (user) {
					let result = this.gloalImg
					return result
				} else {
					return 'https://img11.iqilu.com/29/2020/09/30/c129d718fffac63651e9294410e60140.png'
				}
			},

			//是否暂停
			iszanting() {
				let result = this.paused ? 'https://img11.iqilu.com/29/2020/09/30/9d0c6571f86a186bb8455da737e311ff.png' :
					'https://img11.iqilu.com/29/2020/09/30/f00747596d9c6cb734b0219a594bd87b.png'
				return result
			}

		},
		created() {
			// this.animation = uni.createAnimation({
			// 	timingFunction: 'linear'
			// })
		},
		mounted() {

		},
		methods: {
			...mapMutations(['editPlay']),
			imgClick() {
				// 先判断用户之前是否播放来，有播放则在本地中拿topicId，没有播放则随机设置一个有的topicId来播放
				// try {
				// 	const topicId = uni.getStorageSync('topicId');
				// 	if (this.paused) { // 现在是暂停状态  则开始播放
				// 		this.$audio.play()
				// 	}
				// 	if (topicId) {
				// 		uni.navigateTo({
				// 			url: '/pagesC/playPage/playPage?topicId=' + topicId
				// 		})
				// 	}
				// 	else{
				// 		uni.navigateTo({
				// 			url: '/pagesC/playPage/playPage?topicId=23'
				// 		})
				// 	}
				// } catch (e) {
				// 	console.log(value);
				// }

				let play = getCurrectStorg('play') // 本地缓存中获取值

				console.log(this.topicId, this.chapterId);
				if (this.type == 'zhangjie') {
					if (play) { // 判断vuex中有没有topicId
						uni.navigateTo({
							// url: '/pagesC/playPage/playPage?topicId=' + this.topicId,
							url: '/pagesC/playPage/playPage?topicId=' + play.topicId + '&authorId=' + play.userId + '&chapterId=' + play.chapterId
						})
					} else {
						uni.navigateTo({
							url: '/pagesC/playPage/playPage?topicId=23' + '&authorId=' + 1 + '&chapterId=' +
								'hd129aa803d8dg11eaa577005056584'
						})
					}
				} else {
					// audioId=787a5410f7fe11eaa577005056a8394c&type=audio&authorId=1
					if (this.audioOrauthor) { // 
						uni.navigateTo({
							url: '/pagesC/listen_nei/listen_nei?audioId=' + this.audioOrauthor.audioId + '&type=audio&authorId=' + this.audioOrauthor
								.authorId
						})
					} else {
						uni.navigateTo({
							url: '/pagesC/listen_nei/listen_nei?audioId=' + '787a5410f7fe11eaa577005056a8394c' + '&type=audio&authorId=' +
								1
						})
					}
				}
				if (this.paused) { // 现在是暂停状态  则开始播放
					this.$audio.play()
				}
			}
		}
	}
</script>

<style lang="scss">
	/* 	@-webkit-keyframes rotation {
		from {
			-webkit-transform: rotate(0deg);
		}

		to {
			-webkit-transform: rotate(360deg);
		}
	}

	.rotation {
		-webkit-transform: rotate(360deg);
		animation: rotation 20s linear infinite;
	} */

	/* .play {
    animation: mymove 5s infinite ease;
  }
  .restart {
    animation: mymove1 5s infinite ease;
  } */
	/* .pause {
		animation-play-state: paused;
	} */

	.cover {
		width: 76rpx;
		height: 76rpx;
		border-radius: 50%;
	}

	.cover.on {
		-webkit-animation: 10s rowup linear infinite normal;
		animation: 10s rowup linear infinite normal;
	}

	@keyframes rowup {
		0% {
			-webkit-transform: rotate(0deg);
			transform-origin: center center;
		}

		100% {
			-webkit-transform: rotate(360deg);
			transform-origin: center center;
		}
	}
</style>
