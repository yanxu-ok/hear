<template>
	<view @tap="imgClick" style="margin-top: 20rpx;">
		<u-circle-progress active-color="#fe7e00" :percent="30" duration="0" width="90" border-width="6">
			<!-- <u-image src="@/static/images/video.png" class="cover" :class="{ on: !pause }" width="76" height="76" shape="circle"></u-image> -->
			<image src="@/static/images/video.png" mode="aspectFill" class="cover" :class="{ on: !paused }"></image>
		</u-circle-progress>
	</view>
</template>

<script>
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
				paused: state => state.app.paused // 全局是否暂停
			}),

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
				// 			url: '/pages/playPage/playPage?topicId=' + topicId
				// 		})
				// 	}
				// 	else{
				// 		uni.navigateTo({
				// 			url: '/pages/playPage/playPage?topicId=23'
				// 		})
				// 	}
				// } catch (e) {
				// 	console.log(value);
				// }
				console.log(this.topicId);
				if (this.topicId) {  // 判断vuex中有没有topicId
					uni.navigateTo({
						url: '/pages/playPage/playPage?topicId=' + this.topicId
					})
				}
				else{
					uni.navigateTo({
						url: '/pages/playPage/playPage?topicId=23'
					})
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
