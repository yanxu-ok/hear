<template>
	<view class="geci_contain">
		<ci :lyrics="list" :lyricStyle="ciStyle" :areaStyle="ciBackground" style="margin-left: 60rpx;"></ci>
		<view class="geci_contain_right">
			<view class="geci_contain_right_img" v-if="type == 'audio' ">
				<u-image width="69rpx" height="68rpx" :src="dianzan" @click="handleDianzan"></u-image>
				<view class="geci_contain_right_count">{{audioInfo ? audioInfo.praiseNum : '暂无点赞数'}}</view>
			</view>
			<view class="geci_contain_right_img" v-if="type == 'audio' ">
				<u-image width="55rpx" height="54rpx" src="https://img11.iqilu.com/29/2020/09/30/f8c28b095fce7e5c7b3b1355b9a3c4a8.png"></u-image>
				<view class="geci_contain_right_count">0</view>
			</view>
			<view class="geci_contain_right_img">
				<u-image width="52rpx" height="47rpx" src="https://img11.iqilu.com/29/2020/09/30/ca1a61949f6ead0fef6402ba123620e6.png"></u-image>
				<view class="geci_contain_right_count">分享</view>
			</view>
			<view class="geci_contain_right_img">
				<u-image width="55rpx" height="57rpx" src="https://img11.iqilu.com/29/2020/09/30/35b9db61f10da6666022d6f1597adc32.png"
				 @click="handleGongdu"></u-image>
				<view class="geci_contain_right_count">共读</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		isLogin
	} from '@/libs/hear-util/index.js'
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import {
		formatDate
	} from '@/libs/hear-util/index.js'
	import ci from '@/components/bing-lyric/bing-lyric.vue'
	export default {
		components: {
			ci
		},
		computed: {
			...mapState({
				audioInfo: state => state.huting.audioInfo,
				audioOrActicle: state => state.huting.audioOrActicle,
				type: state => state.huting.type,
			}),
			dianzan() {
				// console.log(this.zhangjieList[this.currectPlayIndex], '是否点赞 、当前的列表');
				if (this.audioInfo) {
					let result = this.audioInfo.isPraise ?
						'https://img11.iqilu.com/29/2020/09/30/52dd0b42935d1212161bcd55b17b8741.png' :
						'https://img11.iqilu.com/29/2020/09/30/399df563e7d7a0648ee003c81ff4cba5.png'
					return result
				}
			},
		},
		data() {
			return {
				list: [],
				ciStyle: {
					color: '#FFFFFF',
					activeColor: '#ffffff',
					fontSize: '30rpx',
					lineHeight: '80rpx',
					activeFontSize: '36rpx'
				},
				ciBackground: {
					background: 'none',
					width: '400rpx',
					height: '700rpx'
				}
			}
		},

		watch: {
			async audioInfo(newValue, oldValue) {
				let content;
				if (this.type == 'audio') {
					content = await this.getGeci() // 获取歌词		
					this.list = this.zuhe(content)
				} else {
					// console.log(newValue,this.type);
					content = newValue
					this.list = this.zuhe(content)
				}
			}
		},


		methods: {
			...mapActions(['insert_praise_add', 'delete_praise_cancel', 'get_article_by_audio_id', 'insert_message']),
			...mapMutations(['setAudioInfo']),

			// 点赞 取消点赞
			async handleDianzan() {

				let isLog = isLogin() // 判断用户是否登录
				if (!isLog) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
				console.log(this.audioInfo);
				let obj = {
					userId: 1,
					audioId: this.audioInfo.audioId,
					praiseType: 2
				}
				if (this.audioInfo.isPraise) { // 取消点赞
					let result = await this.delete_praise_cancel(obj)
					if (result.success) {
						let audioInfo = this.audioInfo
						audioInfo.isPraise = 0
						audioInfo.praiseNum--
						this.setAudioInfo(audioInfo)
						uni.showToast({
							title: '取消成功',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '点赞失败',
							icon: 'none'
						})
					}
				} else { // 点赞
					let result = await this.insert_praise_add(obj)
					if (result.success) {
						let audioInfo = this.audioInfo
						audioInfo.isPraise = 1
						audioInfo.praiseNum++
						this.setAudioInfo(audioInfo)
						uni.showToast({
							title: '点赞成功',
							icon: 'none'
						})
						const msgRequest = {
							userInformId: this.audioInfo.userId,
							majorId: this.audioInfo.audioId,
							majorIdType: '3',
							msgType: 1,
							msgClassify: 2,
							msgContent: `赞了您的<${this.audioInfo.articleTitle}>-${this.audioInfo.articleUserName}`
						}
						await this.insert_message(msgRequest)
					} else {
						uni.showToast({
							title: '点赞失败',
							icon: 'none'
						})
					}
				}
			},

			// 共读点击
			handleGongdu() {
				this.$emit('gongdu')
			},

			// 获取歌词
			async getGeci() {
				let data = {
					audioId: this.audioOrActicle
				}
				const result = await this.get_article_by_audio_id(data)
				return result.data
			},

			// 组合歌词
			zuhe(content) {
				console.log();
				let newArr = []
				if (!content) {
					return;
				}
				// console.log(content);
				// 分秒相加 7秒
				// let str 
				if (content.articleContent.length >= 1) {
					for (let i = 0; i < content.articleContent.length / 12; i++) {
						let me = i * 7
						let str = formatDate("2018/01/01 00:00:00", me)
						str = `[${str}]`
						newArr.push(str + content.articleContent.slice(i * 12, 12 * (i + 1)))
						// console.log(newArr, content.articleContent);
					}
				}
				// console.log(newArr, '组合后的歌词', content.articleContent, '原始的歌词');
				return newArr
			}

		},
	}
</script>

<style lang="scss">
	.geci_contain {
		display: flex;
		justify-content: space-between;
		margin-right: 30rpx;
		flex: 1;

		& .geci_contain_right {
			display: flex;
			flex-direction: column;
			justify-content: flex-end;

			& .geci_contain_right_img {
				margin-bottom: 60rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				height: 100rpx;
			}

			& .geci_contain_right_count {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
			}
		}
	}
</style>
