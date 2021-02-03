<template>
	<view class="zuopin">
		<u-navbar title="我的作品" background="" title-color="#333333" back-icon-color="#333333">
		</u-navbar>

		<view>
			<u-tabs-swiper ref="uTabs" :list="categoryList" name="categoryName" :current="current" @change="tabsChange"
			 :is-scroll="false" active-color="#F8A942" gutter="10rpx" swiperWidth="750"></u-tabs-swiper>
		</view>

		<swiper class="swiper_item" :current="swiperCurrent" @transition="transition" @change="animationfinish">
			<swiper-item v-for="(item, categoryIndex) in categoryList" :key="categoryIndex">
				<zhuanti v-if="categoryIndex == 0 "></zhuanti>
				<huting v-if="categoryIndex == 1 "></huting>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import zhuanti from './components/zhuanti.vue'
	import huting from './components/huting.vue'
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				categoryList: [{
						name: '我的专题'
					},
					{
						name: '互听作品'
					}
				], //分类列表
				show: false, // 是否为空,
				userInfo: {}, // 用户信息,
			};
		},
		components: {
			zhuanti,
			huting
		},
		methods: {

			// tabs通知swiper切换
			async tabsChange(index) {
				this.swiperCurrent = index;
				this.current = index
			},

			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},

			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			async animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},

		}
	};
</script>

<style lang="scss">
	.zuopin {
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		top: 0;
		display: flex;
		flex-direction: column;
	}

	.search_swiper_contain {
		width: 100%;
		height: 100%;
	}

	.search_scroll {
		width: 100%;
		height: 100%;
		display: flex;
		/* #ifdef H5 */
		margin-top: 45rpx;
		/* #endif */
	}

	.swiper_item {
		height: 1150rpx;
	}

	
</style>
