<template>
	<view class="quanzi_contain">
		<view class="quanzi_contain_xiangguan">
			<u-image width="28rpx" height="29rpx" src="https://img11.iqilu.com/29/2020/09/30/9985afda61bd11fa1e69400381518d70.png"></u-image>
			<view class="quanzi_text">#共探虫谷</view>
		</view>

		<view class="quanzi_contain_dianzan">
			<u-image width="40rpx" height="40rpx" :src="shoucang" style="margin-right: 40rpx;" @click="handleShoucang"></u-image>
			<u-image width="40rpx" height="40rpx" :src="dianzan" @click="handleParse"></u-image>
		</view>
	</view>
</template>

<script>
	import {
		isLogin
	} from '@/libs/hear-util/index.js'
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				key: ''
			}
		},
		computed: {
			...mapState({
				topicId: state => state.play.topicId,
				zhangjieObj: state => state.play.zhangjieObj,
				zhangjieList: state => state.play.zhangjieList,
				currectPlayIndex: state => state.play.currectPlayIndex,
			}),

			// 收藏
			shoucang() {
				// console.log(this.zhangjieList[this.currectPlayIndex],'是否收藏 、当前的列表');
				if (this.zhangjieList[this.currectPlayIndex]) {
					let result = this.zhangjieList[this.currectPlayIndex].isChapterCollect ?
						'https://img11.iqilu.com/29/2020/09/30/3c501766c3527e4344245aa4bf13a96e.png' :
						'https://img11.iqilu.com/29/2020/09/30/f6ae8efba9638d7679465f7f43a30dd2.png'
					return result
				}
			},

			// 点赞
			dianzan() {
				// console.log(this.zhangjieList[this.currectPlayIndex], '是否点赞 、当前的列表');
				if (this.zhangjieList[this.currectPlayIndex]) {
					let result = this.zhangjieList[this.currectPlayIndex].isPraise ?
						'https://img11.iqilu.com/29/2020/09/30/52dd0b42935d1212161bcd55b17b8741.png' :
						'https://img11.iqilu.com/29/2020/09/30/399df563e7d7a0648ee003c81ff4cba5.png'
					return result
				}
			}

		},
		methods: {
			...mapMutations(['setZhangjieList']),
			...mapActions(['insert_praise_add', 'delete_praise_cancel', 'insert_collect_chapter', 'delete_collect_chapter',
				'insert_message'
			]),

			// 是否点赞
			async handleParse() {
				let isLog = isLogin() // 判断用户是否登录
				if (!isLog) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
				let currectPlay = this.zhangjieList[this.currectPlayIndex]
				if (currectPlay.isPraise) { // 说明已经点赞，需要取消点赞
					let result = await this.delete_praise_cancel({
						userId: 1,
						audioId: currectPlay.chapterId,
						praiseType: 1,
						topicId:currectPlay.topicId
					})
					if (result.success) { // 如果点赞成功 改变 列表对应的值
						let newList = this.zhangjieList
						newList[this.currectPlayIndex].isPraise = 0
						this.setZhangjieList(newList)
					}
				} else { //需要关注调用接口
					console.log(currectPlay, '当前播放的章节')
					let result = await this.insert_praise_add({
						userId: 1,
						audioId: currectPlay.chapterId,
						praiseType: 1,
						topicId:currectPlay.topicId
					})
					if (result.success) { // 如果点赞成功 改变 列表对应的值 并且调用插入信息接口
						let newList = this.zhangjieList
						newList[this.currectPlayIndex].isPraise = 1
						this.setZhangjieList(newList)
						uni.showToast({
							title: '点赞成功',
							icon: 'none'
						})
						const msgRequest = {
							userInformId: this.zhangjieObj.userId,
							majorId: this.zhangjieList[this.currectPlayIndex].chapterId,
							majorIdType: '2',
							msgType: 1,
							msgClassify: 2,
							msgContent: `赞了您的<${this.zhangjieObj.topicName}>-${this.zhangjieList[this.currectPlayIndex].chapterName}`
						}
						await this.insert_message(msgRequest)

					}
				}
			},

			// 是否收藏
			async handleShoucang() {
				let isLog = isLogin() // 判断用户是否登录
				if (!isLog) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}

				let currectPlay = this.zhangjieList[this.currectPlayIndex]
				if (currectPlay.isChapterCollect) { // 说明已经收藏，需要取消收藏
					let result = await this.delete_collect_chapter({
						collectChapterId: currectPlay.collectChapterId
					})
					if (result.success) { // 如果收藏成功 改变 列表对应的值
						let newList = this.zhangjieList
						newList[this.currectPlayIndex].isChapterCollect = 0
						this.setZhangjieList(newList)
					}
				} else { //需要收藏调用接口	
					const user = JSON.parse(uni.getStorageSync('user'))
					console.log(currectPlay, '当前播放的章节', user)
					uni.navigateTo({
						url: '/pagesD/shudan/shudan?userId=' + user.userId + '&type=zj&chapterId=' + currectPlay.chapterId
					})

				}
			}

		},
	}
</script>

<style lang="scss">
	.quanzi_contain {
		margin-top: 74rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 0 26rpx 0 25rpx;

		& .quanzi_contain_xiangguan {
			width: 180rpx;
			height: 45rpx;
			background: rgba(255, 255, 255, 0.06);
			justify-content: center;
			align-items: center;
			border-radius: 21px;
			display: flex;
		}

		& .quanzi_contain_dianzan {
			display: flex;
		}

		& .quanzi_text {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(255, 255, 255, 1);
			margin-left: 6rpx;
		}
	}
</style>
