<template>
	<view class="playlist_contain">
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" active-color="#F8A942" :current="current" @change="tabsChange" :is-scroll="false"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<view class="jiange"></view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="play_swiper_list">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<playlistitem v-if="item.name == '节目' " class="display_play"></playlistitem>
				<jianjie v-if="item.name == '简介' " class="display_play"></jianjie>
				<comment v-if="index == 2" class="display_play"></comment>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 底部 -->
		<pdbottom></pdbottom>
	</view>
</template>

<script>
	import pdbottom from './pdbottom.vue'
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	import playlistitem from './playlist-item.vue'
	import jianjie from './jianjie.vue'
	import comment from './comment.vue'
	export default {
		components: {
			playlistitem,
			jianjie,
			comment,
			pdbottom
		},
		data() {
			return {
				list: [{
					name: '节目'
				}, {
					name: '简介'
				}, {
					name: '评论(99+)'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			}
		},
		computed: {
			...mapState({
				// zhangjieList: state => state.play.zhangjieList,
				topicId: state => state.play.topicId
			})
		},
		methods: {
			...mapActions(['get_chapter_list_by_topic']),
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
