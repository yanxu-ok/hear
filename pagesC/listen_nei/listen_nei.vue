<template>
	<view class="listen_nei">
		<image src="https://img11.iqilu.com/29/2020/09/30/86e20119667d3e3bf7a442f038e58360.jpg" class="listen_nei_img"></image>

		<u-navbar background="" :customBack="back" title-color="#FFFFFF" back-icon-color="#FFFFFF" :z-index="zIndex">

		</u-navbar>

		<!-- 标题 -->
		<view class="listen_nei_title">{{audioInfo ? audioInfo.articleTitle : '暂无标题' | titleFilter(10)}}</view>

		<!-- 作者 -->
		<template v-if="audioInfo">
			<view class="listen_nei_author">作者：{{audioInfo.articleUserName || audioInfo.nickName | titleFilter(6) }}{{ audioInfo.audioReadAmount || audioInfo.articleReadAmount | numFormat}}人看过·预计{{audioInfo.audioTime || audioInfo.estimatedTime | dateFormat}}分钟</view>
		</template>

		<!-- 歌词 -->
		<geci @gongdu="handleGongdu"></geci>

		<!-- 底部文章作者 -->
		<listenauthor @handleHuting="handleHuting"></listenauthor>

		<view :style="{display:type == 'audio' ? '' : 'none' }">
			<drawer ref="drawer-right" pos="bottom" standout="32rpx" :height="height" width="750rpx" @overlayClicked="hide"
			 z-index="999999">
				<view class="dr" style="z-index: 9999;">
					<!-- <view style="width: 32rpx;"></view> -->
					<!-- <menu-view></menu-view> -->
					<view style="width: 750rpx; height: 100%;background-color: white;z-index: 9999999;" :style="{visibility:choutiShow? 'visible' : 'hidden' }">
						<hutingplay :audio="audio" @handleBack="handleBack"></hutingplay>
					</view>
				</view>
			</drawer>
		</view>

		<!-- 共读的标识  -->
		<u-popup v-model="gong" mode="bottom" width="100%" height="80%" :mask-close-able="false" :closeable="true" z-index="99999">
			<gongdu></gongdu>
		</u-popup>


	</view>

</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		isApp,
		getScreenHeight,
		getStatusBarHeight
	} from '@/libs/hear-util/index.js'
	import gongdu from './components/gongdu.vue'
	import hutingplay from './components/listen_huting.vue'
	import geci from './components/geci.vue'
	import drawer from '@/pagesC/playPage/components/myp-drawer.vue'
	import listenauthor from './components/listen_author.vue'

	export default {

		components: {
			listenauthor,
			geci,
			drawer,
			gongdu,
			hutingplay
		},

		data() {
			return {
				customStyle: {
					width: '70.3rpx',
					height: '28.8rpx',
					fontSize: "14rpx"
				},
				audioId: null, // 传递过来的音频信息
				authorId: null,
				left: 0, // 向左划的一开始的偏移量
				right: 0, // 向右划的一开始的偏移量
				choutiShow: false,
				audio: {}, // 音频信息
				gong: false,
				zIndex: 1, // 顶部导航栏index值
				height: 0
			}
		},

		computed: {
			...mapState({
				audioInfo: state => state.huting.audioInfo,
				audioOrActicle: state => state.huting.audioOrActicle,
				type: state => state.huting.type
			})
		},

		async onLoad(option) {
			// audioId=787a5410f7fe11eaa577005056a8394c&type=audio&authorId=1 需要将音频id和 读的作者存到 vuex中
			this.setAudioOrauthor({
				audioId: option.audioId,
				authorId: option.authorId
			})
			this.setType(option.type)
			this.authorId = option.authorId // 作者的id
			if (this.type == 'audio') {
				this.audioId = option.audioId // 音频的id
				this.setAudioOrActicle(this.audioId)
				let audioinfo = await this.getAudioInfo()
				if (!audioinfo) {
					return;
				}
				this.setAudioInfo(audioinfo) // 音频信息放到vuex中
				this.setAudioType('huting') // 播放的类型是章节
				this.setGloalImg(audioinfo.cover)
				console.log(audioinfo, '音频信息');
				let data = {
					topicId: audioinfo.articleId,
					chapterId: audioinfo.audioId,
					radioType: 2
				}
				let result = await this.insert_history(data)
				console.log(result, '历史进度');
				this.audio = this.startPlay(audioinfo, result.data) // 开始播放音频
			} else {
				const item = JSON.parse(decodeURIComponent(option.item));
				let result = await this.getActicleInfo(item.articleId)
				console.log(result);
				this.setAudioInfo(result) // 音频信息放到vuex中
				await this.increase_read_amount({
					articleId: result.articleId
				})
				// console.log(this.audioInfo); // 进来要调接口 添加阅读量
			}
		},

		created() {
			let height = getScreenHeight()
			const statusHeight = getStatusBarHeight()
			// console.log(statusHeight, '导航栏高度', height);
			this.height = height * 2 + 'rpx'
		},
		
		onShow() {
			this.setFlag(false)
		},


		methods: {

			...mapActions(['get_audio_by_id', 'insert_history', 'increase_read_amount', 'get_article_by_id']),
			...mapMutations(['setAudioInfo', 'setAudioOrActicle', 'setType', 'setAudioType', 'setGloalImg', 'setAudioOrauthor',
				'setFlag'
			]),

			//点击按钮 返回到列表
			back() {

				console.log(1, '返回到列表');
				// uni.redirectTo({
				// 	url: '/pages/tabbar/listen/index'
				// })
				uni.switchTab({
					url: '/pages/tabbar/listen/index'
				})
			},

			// 获取互听音频简介信息
			async getAudioInfo() {
				const data = {
					audioId: this.audioOrActicle,
					loginId: 1,
					userId: this.authorId
				}
				return await this.get_audio_by_id(data)
			},

			// 获取文稿信息
			async getActicleInfo(articleId) {
				const data = {
					articleId
				}
				return await this.get_article_by_id(data)
			},

			// 进来 之后要开始播放
			startPlay(audioinfo, historyValue) {
				return {
					src: audioinfo.audioAddress,
					title: audioinfo.articleTitle,
					singer: audioinfo.nickName,
					coverImgUrl: audioinfo.cover,
					historyDate: historyValue
				}

			},

			//touchmove 监听 向左滑动事件
			touchstart(e) {
				this.left = e.touches[0].pageX
			},

			touchend(e) {
				let pageX = e.changedTouches[0].pageX

				if (this.left - pageX > 40) { // 满足向左滑事件
					console.log('向左划');
					// this.show()
					// this.choutiShow = true
				}
				if (pageX - this.left > 40) {
					console.log('向左划');
					this.hide()
					this.choutiShow = false
				}
			},

			// 点击图标需要在底下上升
			handleHuting() {
				this.zIndex = -1
				this.show()
				this.choutiShow = true
			},

			// 点击图标返回
			handleBack() {
				this.zIndex = 1
				this.hide()
				this.choutiShow = false
			},

			show(duration) {
				this.$refs['drawer-right'].show(duration)
			},


			hide(duration) {
				this.$refs['drawer-right'].hide(duration)
			},


			// 共读点击事件
			handleGongdu() {
				console.log(this.gong);
				this.gong = true
				console.log('点击了攻读');
			}

		},
	}
</script>

<style lang="scss">
	.listen_nei {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		display: flex;
		flex-direction: column;
	}

	.listen_nei_img {
		width: 100%;
		height: 100%;
		position: absolute;
		filter: blur(20rpx);
		z-index: -1;
	}


	.listen_nei_title {
		font-size: 52rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		padding-left: 30rpx;
		margin-top: 40rpx;
		height: 70rpx;
	}

	.listen_nei_author {
		padding-left: 30rpx;
		margin-top: 37rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 300;
		color: rgba(255, 255, 255, 1);
		opacity: 0.5;
	}

	.slot_wrap1 {
		width: 178rpx;
		height: 42rpx;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 21rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
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

	.dr {
		flex-direction: row;
		flex-wrap: nowrap;
		width: 600rpx;
		height: 100%;
	}
</style>
