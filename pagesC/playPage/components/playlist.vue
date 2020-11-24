<template>
	<view class="playlist_contain">

		<view>
			<u-tabs-swiper ref="uTabs" :list="list" active-color="#F8A942" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>

		<view class="jiange"></view>

		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="play_swiper_list">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<playlistitem v-if="current == index && current == 0" class="display_play"></playlistitem>
				<jianjie v-if="current == index && current == 1" class="display_play"></jianjie>
				<comment v-if="current == index && current == 2" class="display_play" ref="comment"></comment>
				</scroll-view>
			</swiper-item>
		</swiper>

		<!-- 底部 -->
		<pdbottom @handleSubmit='handleSubmit'></pdbottom>

	</view>
</template>

<script>
	import {
		setCurrectStorg
	} from '@/libs/hear-util/index.js'
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	import playlistitem from './playlist-item.vue'
	import jianjie from './jianjie.vue'
	import comment from './comment.vue'
	import pdbottom from './pdbottom.vue'
	export default {
		components: {
			playlistitem,
			jianjie,
			comment,
			pdbottom
		},
		data() {
			return {
				commentCount: 0, //评论数量
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			}
		},
		computed: {
			...mapState({
				zhangjieList: state => state.play.zhangjieList,
				topicId: state => state.play.topicId,
				currectPlayIndex: state => state.play.currectPlayIndex,
				chapterId: state => state.play.chapterId,
				zhangjieObj: state => state.play.zhangjieObj,
			}),

			list() {
				this.commentCount > 99 ? this.commentCount = "99+" : this.commentCount
				return [{
					name: '节目'
				}, {
					name: '简介'
				}, {
					name: `评论(${this.commentCount})`
				}]
			}
		},

		watch: {

			// 监听当前章节 请求当前章节的评论数量
			async currectPlayIndex(newValue, oldValue) {
				const obj = {
					classifyKey: 'hear',
					orgKey: this.$config.requestComment.orgKey,
					platformKey: this.$config.requestComment.platformKey,
					programId: this.zhangjieList[newValue].chapterId
				}
				const count = await this.get_comment_total(obj)
				this.commentCount = count
			}

		},

		methods: {

			...mapActions(['get_chapter_list_by_topic', 'save_comment', 'get_comment_manager_token', 'insert_message',
				'get_comment_total'
			]),

			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},

			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},

			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},

			// 发表评论的回调 然后调用发表评论的接口
			async handleSubmit(value) {
				const token = await this.get_comment_manager_token() // 评论的token
				setCurrectStorg('commentToken', token)
				const data = {
					programId: this.zhangjieList[this.currectPlayIndex].chapterId,
					commentContent: value,
					classifyKey: 'hear',
					orgKey: this.$config.requestComment.orgKey,
					platformKey: this.$config.requestComment.platformKey
				}
				let result = await this.save_comment(data)
				if (result.ok) { // 发表成功 然后调用插入信息的接口
					if (this.current != 2) {
						this.current = 2
						this.swiperCurrent = 2
					} else {
						this.$refs.comment[0].downCallback()
					}
					const msgRequest = {
						userInformId: this.zhangjieObj.userId,
						majorId: this.zhangjieList[this.currectPlayIndex].chapterId,
						majorIdType: '2',
						msgType: 2,
						msgClassify: 2,
						msgContent: `评论了您的<${this.zhangjieObj.topicName}>-${this.zhangjieObj.chapterName}`
					}
					await this.insert_message(msgRequest)
				} else {
					uni.showToast({
						title: '发表失败',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.play_swiper_list {
		flex: 1;

		// position: relative;
		& .swiper-item {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
		}
	}

	.display_play {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.playlist_contain {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.jiange {
		height: 18rpx;
		background: rgba(247, 247, 247, 1);
	}
</style>
