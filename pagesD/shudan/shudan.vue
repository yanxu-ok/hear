<template>
	<view class="shudan_contain">
		<u-navbar title="" background="" title-color="#333333" back-icon-color="#333333">
		</u-navbar>

		<view class="addshudan" @tap="handleAddshudan">
			<u-image width="110rpx" height="110rpx" src="https://img11.iqilu.com/29/2020/09/30/e93598c3cca6ff11ba00c107b86ff1fa.png"></u-image>
			<view class="addshudan_text">创建播单</view>
		</view>
		<u-line color="#E5E5E5" length="700" margin="25rpx auto"></u-line>

		<scroll-view class="scroll-view_H" scroll-y>
			<!-- 书单 -->
			<view style="padding-left: 25rpx ;padding-right: 50rpx; height: 100%;">
				<template v-for="(item,index) in bodanList">
					<block :key="index">
						<shudan :length="31" bottom="25rpx" :item="item" :image="item.topicImage" @handleClickList="handleClick" :count="item.chapterCount"
						 :title="item.topicName"></shudan>
					</block>
				</template>
			</view>
		</scroll-view>

		<!-- 弹出层  -->
		<u-popup v-model="show" mode="center" border-radius="18" height="249rpx" width="100%">
			<view class="anniu_contain">
				<view class="anniu" @tap="handleSave(false)">取消</view>
				<view class="anniu_title">新建播单</view>
				<view class="anniu" @tap="handleSave(true)">确定</view>
			</view>

			<u-input v-model="value" placeholder="请输入播单名" :trim="true" :focus="focus" :type="type" :border="border" height="40rpx"
			 class="anniu_contain_input" placeholder-style="color:#333333" />
		</u-popup>

	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	import shudan from '@/components/u-shudan/u-shudan.vue'
	export default {
		data() {
			return {
				show: false,
				value: '',
				type: 'text',
				border: false,
				focus: true,
				tirm: true,
				bodanList: [], // 播单的list
				info: null,

			}
		},
		components: {
			shudan
		},
		computed: {
			...mapState({
				zhangjieList: state => state.play.zhangjieList,
				currectPlayIndex: state => state.play.currectPlayIndex,
				audioInfo: state => state.huting.audioInfo,
				topicId: state => state.play.topicId,
			}),
		},
		async onLoad(e) {
			this.info = e
			this.bodanList = await this.getUserBodan(e.userId)
			console.log(this.bodanList);
		},
		methods: {
			...mapActions(['insert_topic', 'get_user_play_single', 'insert_collect_chapter', 'get_chapter_list_by_topic']),
			...mapMutations(['setZhangjieList', 'setAudioInfo']),
			handleAddshudan() {
				this.show = !this.show
			},
			// 点击确定后添加的书单
			async handleSave(flag) {
				if (flag) {
					let data = {
						topicName: this.value,
						topicType: 2,
						topicImage: null,
						topicDescribe: null
					}
					let result = await this.insert_topic(data)
					if (result.success) {
						uni.showToast({
							title: '新建成功',
							icon:'none'
						})
						this.bodanList = await this.getUserBodan(this.info.userId)
						console.log(this.bodanList);
					} else {
						uni.showToast({
							title: '操作失败',
							icon:'none'
						})
					}
				} else {

				}
				this.show = !this.show
			},

			// 获取播单
			async getUserBodan(userId) {
				let data = {
					topicType: 2,
					pageNum: null,
					pageSize: null,
					otherUserId: userId
				}
				let result = await this.get_user_play_single(data)
				console.log(result);
				if(!result || result.length == 0){
					return []
				}
				return result.list
			},

			// 播单点击事件就收藏了 点击收藏 然后返回
			async handleClick(e) {
				console.log(e, this.info);
				let data = {
					userId: 1,
					topicId: e.item.topicId,
					chapterId: this.info.chapterId,
					radioType: this.info.type == 'zj' ? 1 : 2
				}
				let result = await this.insert_collect_chapter(data)
				if (result.success) { // 如果收藏成功 改变 列表对应的值
					if (this.info.type == 'zj') {
						uni.showToast({
							title: '收藏成功',
							icon: 'none'
						})
						let data = {
							topicId: this.topicId,
							pageNum: 1,
							pageSize: 1000,
							listOrder: 1
						}
						let result = await this.get_chapter_list_by_topic(data)
						
						// let newList = this.zhangjieList
						// newList[this.currectPlayIndex].isChapterCollect = 1
						this.setZhangjieList(result.list)

						uni.navigateBack({})
					} else {
						// 如果收藏成功 改变 互听对应的值
						let newList = this.audioInfo
						newList.isCollect = 1
						this.setAudioInfo(newList)
						uni.showToast({
							title: '收藏成功',
							icon: 'none'
						})
						uni.navigateBack({})
					}

				} else {
					uni.showToast({
						title: '收藏失败',
						icon: 'none'
					})
					uni.navigateBack({})
				}

			}
		}
	}
</script>

<style lang="scss">
	.shudan_contain {
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		top: 0;
		display: flex;
		flex-direction: column;

		& .addshudan {
			display: flex;
			flex-direction: row;
			padding-left: 25rpx;
			margin-top: 50rpx;
			align-items: center;
			margin-bottom: 30rpx;
		}

		& .addshudan_text {
			margin-left: 22rpx;
		}


		& .scroll-view_H {
			flex: 1;
		}

		& .anniu_contain {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-top: 31rpx;

			& .anniu_title {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}

			& .anniu {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}
		}
	}

	.anniu_contain_input {
		margin-left: 31rpx;
		margin-top: 60rpx;
	}
</style>
