<template>
	<view class="play_contain">
		<view :style="{background:'url(' + zhangjieObj.topicImage + ') 0 / cover'}" class="play_contain_img_img"></view>

		<u-navbar :title="zhangjieObj.topicName" :customBack="back" background="" title-color="#FFFFFF" back-icon-color="#FFFFFF">
			<view slot="right" class="slot_wrap">
				<!-- <image src="https://img11.iqilu.com/29/2020/09/30/dc526a58e0ddf4164070785d7ae60ff0.png" style="width: 30rpx;height: 7rpx;"></image> -->
				<!-- <u-image width="30rpx" height="7rpx" src="@/static/images/three_dian.png" class="play_contain_right"></u-image> -->
			</view>
		</u-navbar>

		<!-- 播放界面滑动 -->
		<!-- <scroll-view :scroll-y="true" zoom="true" class="play_scroll"> -->

		<!-- 图片 -->
		<playimg></playimg>

		<!-- 圈子 -->
		<quanzi></quanzi>

		<!-- 进度条 -->
		<!-- <view class="jindutiao"> -->
		<!-- <view class="now_date">00:01</view> -->
		<template v-if="audiolist">
			<zaudio :oldinfo="audiolist" v-if="audiolist" :stepShow="show" themeColor="" style="margin-top: 42rpx;padding: 0 25rpx;"
			 ref="audio"></zaudio>
		</template>
		<!-- <view class="all_date">20:36</view> -->
		<!-- </view> -->

		<!-- 播放按钮 -->
		<!-- <playbutton></playbutton> -->
		<view class="play_button_contain">
			<u-image width="32rpx" height="36rpx" src="https://img11.iqilu.com/29/2020/09/30/575c5d579b43015f2bed559a314c8735.png"
			 style="margin-right: 118rpx;" @tap="handleNext"></u-image>
			<u-image width="59rpx" height="67rpx" :fade="true" duration="1550" :src="playimg" @tap="handleBofang"></u-image>
			<u-image width="32rpx" height="35rpx" src="https://img11.iqilu.com/29/2020/09/30/39d25a229e4f1f2b82e131a760f03f6c.png"
			 style="margin-left: 118rpx;" @tap="handlePrev"></u-image>
		</view>

		<!-- </scroll-view> -->

		<!-- 上拉 可滑动章节列表 -->
		<indexdrawer :drawerTop="drawerTop"></indexdrawer>

	</view>

</template>

<script>
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	import indexdrawer from './components/drawer.vue'
	import playimg from './components/playimg.vue'
	import quanzi from './components/quanzi.vue'
	import zaudio from '@/components/audio/zaudio';

	import {
		setCurrectStorg,
		getScreenHeight,
		getStatusBarHeight
	} from '@/libs/hear-util/index.js'

	export default {

		components: {
			quanzi,
			playimg,
			indexdrawer,
			zaudio
		},

		// 接受 专题id
		onLoad(e) {

			if (!e.topicId) {
				return;
			}

			// 音频播放完毕,将当前音频的历史记录进度为零，并且自动播放下一首
			uni.$on('audioEnde', async (res) => {
				console.log('音频播放完毕');
				let data = {
					topicId: this.zhangjieList[this.currectPlayIndex].topicId,
					chapterId: this.zhangjieList[this.currectPlayIndex].chapterId,
					listenProgress: 0
				}
				let reult = await this.update_history(data)
				console.log('将音频置为零成功');
				// 最后调用
				this.handlePrev()
			})

			//  需要将topicId存到缓存中
			this.setTopicId(e.topicId)
			setCurrectStorg('topicId', e.topicId) // 将专题id 放到缓存中
			setCurrectStorg('chapterId', e.chapterId) // 将章节id 放到缓存中
			e.chapterId ? this.setChapterId(e.chapterId) : null // 将章节id 放到vuex中
			this.getJianJie(this.topicId, e.authorId)

		},

		computed: {

			...mapState({
				topicId: state => state.play.topicId,
				zhangjieObj: state => state.play.zhangjieObj,
				currectPlayIndex: state => state.play.currectPlayIndex,
				// play: state => state.play.play,
				zhangjieList: state => state.play.zhangjieList,
				paused: state => state.app.paused // 全局是否暂停
			}),

			playimg() { // 真的表示暂停 否则 播放
				return this.paused ? 'https://img11.iqilu.com/29/2020/09/30/c917c5fef687d3d1f5b5d6fe51be2b5e.png' :
					'https://img11.iqilu.com/29/2020/09/30/3efdd9fcd0ed34b3988fe7af5435dcd3.png'
			}
		},

		mounted() {
			const query = uni.createSelectorQuery().in(this); //获得实例
			let height = getScreenHeight()
			query.select('.play_button_contain').boundingClientRect(data => {
				console.log("节点离页面顶部的距离为:", data, height); // 获取到实例到顶部的距离
				this.drawerTop = height - data.top - data.height - 15
				this.drawerTop = this.drawerTop * 2 + 'rpx'
				console.log(this.drawerTop);
			}).exec();
		},

		data() {
			return {
				audiolist: {}, // 音频的信息
				show: false,
				drawerTop: '300rpx' // 上拉的距离 
			}
		},
		watch: {
			async currectPlayIndex(newValue, oldValue) {
				console.log(newValue,'2222222222');
				if (this.zhangjieList.length != 0) {
					console.log(this.zhangjieList[newValue], newValue, '索引一遍音频播放');
					let data = {
						topicId: this.zhangjieList[newValue].topicId,
						chapterId: this.zhangjieList[newValue].chapterId,
						radioType: 1
					}
					let result = await this.insert_history(data) // 插入历史记录 并且判断返回的是否有进度，在当前进度播放
					this.setAudioType('zhangjie') // 播放的类型是章节
					this.zuhe(newValue, result.data)
				}
			},

			// 监听 全局的
		},
		methods: {
			back() {
				uni.navigateBack({

				})
			},

			...mapMutations(['setTopicId', 'setCurrectPlayIndex', 'setPlay', 'setCurrectPlay', 'setAudioType', 'setGloalImg',
				'setChapterId'
			]),
			...mapActions(['get_introduction_by_topic_id', 'insert_history', 'update_history']),

			// 改变播放状态
			handleBofang() {
				if (this.paused) { // 点击了暂停
					this.$audio.play()
					console.log('继续播放');
				} else {
					this.$audio.pause()
					console.log('点击了暂停');
				}
			},


			// 组合数组
			zuhe(index, historyDate) {
				// console.log(1);
				if (this.zhangjieList.length != 0) {
					this.audiolist = {
						src: this.zhangjieList[index].chapterAudio,
						title: this.zhangjieList[index].chapterName,
						singer: this.zhangjieList[index].nickName,
						coverImgUrl: this.zhangjieList[index].avatar,
						historyDate,
					}
					// console.log(this.audiolist, '组合后的音频');
				}
			},

			// 根据id 获取简介
			async getJianJie(topicId, authorId) {
				let result = await this.get_introduction_by_topic_id({
					topicId,
					userId: authorId
				})
				this.setGloalImg(result.topicImage)
			},

			//下一首
			handlePrev() {
				let currectIndex = this.currectPlayIndex
				currectIndex++
				console.log(currectIndex, '当前索引');
				if (currectIndex >= this.zhangjieList.length) {
					currectIndex = 0
				}
				this.setCurrectPlayIndex(currectIndex)
				this.setCurrectPlay(this.zhangjieList[currectIndex])
			},

			// 上一首
			handleNext() {
				let currectIndex = this.currectPlayIndex
				currectIndex--
				console.log(currectIndex, '当前索引');
				if (currectIndex < 0) {
					return;
				} else {
					this.setCurrectPlayIndex(currectIndex)
					this.setCurrectPlay(this.zhangjieList[currectIndex])
				}
			}

		},
	}
</script>

<style lang="scss">
	// 由于下面有个上拉框 把这里设成绝对定位就不动了
	// 充满全屏
	.play_contain {
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		// background: #728490;
		// filter: blur(40rpx);
		transition: all 1s;
		background-repeat: no-repeat;
		background-size: cover;
		// z-index: -99;
		// background-image: linear-gradient(to bottom ,transparent, #adadad);	

		& .right {
			padding: 0 30rpx;
		}

		& .slot_wrap {
			padding: 0 30rpx;
		}
	}

	.play_contain_img_img {
		content: '';
		z-index: -1;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		filter: blur(40rpx);
		margin: -10px;
	}

	.play_scroll {
		/* #ifdef MP-WEIXIN */
		height: 886rpx;
		/* #endif */
		/* #ifdef H5 */
		height: 948rpx;
		/* #endif */
	}

	.play_button_contain {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 72rpx;
	}

	.jindutiao {
		display: flex;
		margin-top: 50rpx;
		justify-content: center;

		& .now_date {
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			opacity: 0.8;
			margin-right: 38rpx;
		}

		& .all_date {
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			opacity: 0.8;
			margin-left: 18rpx;
		}
	}

	.img_search {
		height: 100vh;
		width: 100%
	}
</style>
