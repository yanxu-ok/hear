<template>
	<view class="huting">
		<image src="@/static/listen/listennei.jpg" class="listen_nei_img" style="z-index: 0;"></image>
		<view class="baoliu"></view>

		<view class="author_name title" style="margin-top: 80rpx;">{{audioInfo.articleTitle}}</view>
		<view class="author_name author">读者:{{audioInfo.nickName}}</view>

		<view class="wenzhang_img">
			<u-image width="559rpx" height="560rpx" :src="audioInfo.cover" class="play_contain_right"></u-image>
			<view class="play_img_bofang">
				<u-image width="22rpx" height="26rpx" :src="audioInfo.cover"></u-image>
				<view class="play_img_count">{{audioInfo.audioReadAmount}}播放</view>
			</view>
		</view>

		<view class="slot_wrap1">
			<view style="display: flex;flex-direction: row;width: 200rpx;">
				<image src="@/static/images/quanzi.png"></image>
				<view class="slot_wrap_text">#情感电台</view>
			</view>
			<u-image width="41rpx" height="40rpx" :src="shoucang" @tap="handleShoucang"></u-image>
		</view>

		<view class="setting">
			<!-- <u-image width="50rpx" height="48rpx" src="@/static/listen/listen_dianzan.png"></u-image> -->
			<!-- <u-image width="39rpx" height="40rpx" src="@/static/listen/wenben.png"></u-image> -->

			<!-- <u-image width="30rpx" height="40rpx" src="@/static/listen/luyin.png"></u-image> -->
			<!-- <u-image width="8rpx" height="37rpx" src="@/static/listen/listen_gengduo.png"></u-image> -->
		</view>

		<zaudio :oldinfo="audio" v-if="true" :stepShow="show" themeColor="" ref="audio"></zaudio>

		<view class="play_button_contain">
			<u-image width="32rpx" height="36rpx" src="@/static/images/shang.png" style="margin-right: 118rpx;"></u-image>
			<u-image width="49rpx" height="63rpx" :fade="true" duration="1550" :src="playimg" @tap="handleBofang"></u-image>
			<u-image width="32rpx" height="35rpx" src="@/static/images/xia.png" style="margin-left: 118rpx;"></u-image>
		</view>

	</view>

</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import zaudio from '@/components/audio/zaudio';
	export default {
		components: {
			zaudio
		},
		props: {
			audio: {
				type: Object
			},
		},
		data() {
			return {
				show: false
			}
		},
		computed: {
			...mapState({
				audioInfo: state => state.huting.audioInfo,
				paused: state => state.app.paused // 全局是否暂停
			}),
			playimg() { // 真的表示暂停 否则 播放
				return this.paused ? require('@/static/listen/zanting.png') : require('@/static/images/bofang.png')
			},
			shoucang() {
				// console.log(this.zhangjieList[this.currectPlayIndex],'是否收藏 、当前的列表');
				if (this.audioInfo) {
					let result = this.audioInfo.isCollect ? require(
						'@/static/listen/yishoucang.png') : require(
						'@/static/images/shoucang.png');
					return result
				}
			},
		},
		methods: {
			...mapActions(['delete_collect_chapter', 'setAudioInfo']),
			handleBofang() {
				if (this.paused) { // 点击了暂停
					this.$audio.play()
					console.log('继续播放');
				} else {
					this.$audio.pause()
					console.log('点击了暂停');
				}
			},
			async handleShoucang() {
				let currectPlay = this.audioInfo
				if (currectPlay.isCollect) { // 说明已经收藏，需要取消收藏
					let data = {
						collectChapterId:currectPlay.collectChapterId
					}
					let result = await this.delete_collect_chapter(data)
					if (result.success) { // 如果收藏成功 改变 列表对应的值
						let newList = this.audioInfo
						newList.isCollect = 0
						this.setAudioInfo(newList)
						uni.showToast({
							title: '取消成功',
							icon: 'none'
						})
					}
				} else { //需要收藏调用接口

					uni.navigateTo({
						url: '/pages/shudan/shudan?userId=1&type=huting&chapterId=' + currectPlay.audioId
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	.huting {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
	}

	.listen_nei_img {
		width: 100%;
		height: 100%;
		position: absolute;
		filter: blur(40rpx);
	}

	.author_name {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		text-shadow: 0px 0px 6rpx rgba(3, 22, 38, 0.3);
	}

	.author {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 300;
		color: rgba(255, 255, 255, 1);
		opacity: 0.9;
	}

	.wenzhang_img {
		display: flex;
		justify-content: center;
		position: relative;
		margin-top: 110rpx;

		& .play_img_bofang {
			display: flex;
			position: absolute;
			bottom: 24rpx;
			right: 25%;
			align-items: center;

			& .play_img_count {
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
			}
		}
	}

	.slot_wrap1 {
		height: 42rpx;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 21rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		margin-left: 101rpx;
		margin-top: 41rpx;

		& image {
			width: 28rpx;
			height: 29rpx;
		}

		& .slot_wrap_text {
			opacity: 0.9;
		}
	}

	.setting {
		display: flex;
		justify-content: space-around;
		padding: 0 70rpx;
		margin-top: 70rpx;
	}

	.play_button_contain {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30rpx;
	}

	.baoliu {
		height: var(--status-bar-height);
		z-index: 999;
	}
</style>
