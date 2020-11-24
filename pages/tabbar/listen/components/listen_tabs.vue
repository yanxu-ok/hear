<template>
	<view class="tabs_listen">

		<view style="width: 550rpx;">
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false" active-color="#F8A942"></u-tabs-swiper>
		</view>

		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="listen_swiper">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<read v-if="current == index && current == 0" :rindex="index"></read>
				<read v-if="current == index && current == 1" :rindex="index"></read>
				<zuopin v-if="current == index && current == 2 "></zuopin>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import {
		isLogin
	} from '@/libs/hear-util/index.js'
	import zuopin from './zuopin.vue'
	import read from './read.vue'
	export default {
		components: {
			read,
			zuopin
		},
		data() {
			return {
				list: [{
					name: '大家在读'
				}, {
					name: '大家在看'
				}, {
					name: '我的在读'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			};
		},
		methods: {
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
				if(e.detail.current == 2){
					if(!isLogin()){
						uni.navigateTo({
							url: '/pages/login/login'
						})
						return;
					}
				}
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				console.log(this.current);
			}
		}
	};
</script>

<style lang="scss">
	.tabs_listen {
		width: 100%;
		flex: 1;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.listen_swiper {
		margin-top: 0.2rem;
		flex: 1;
	}

	.tabs_listen_scroll {
		height: 1000rpx;
		width: 100%;
		margin-top: 27rpx;
	}
</style>
