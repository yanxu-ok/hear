<template>
	<view class="listen">
		<view class="baoliu"></view>

		<!-- 头部组件 -->
		<listenheader></listenheader>

		<!-- swiper -->
		<listentabs style="flex: 1;"></listentabs>

		<tabbar :list="tabbarData" height="55px" :mid-button="true" inactive-color="#cbcedd" active-color="#fe9503"></tabbar>
		
	</view>
</template>

<script>
	import tabbar from '@/components/u-tabbar/u-tabbar.vue'
	import listenheader from './components/listen_header.vue'
	import listentabs from './components/listen_tabs.vue'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		components: {
			tabbar,
			listenheader,
			listentabs
		},
		computed: {
			...mapState({
				tabbarData: state => state.system.tabBarList
			})
		},
		data() {
			return {
				list: [{
					name: '十年'
				}, {
					name: '青春'
				}, {
					name: '之约'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			};
		},
	}
</script>

<style lang="scss">
	.listen {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
	}

	.baoliu {
		height: var(--status-bar-height);
		z-index: 999;
	}
</style>
