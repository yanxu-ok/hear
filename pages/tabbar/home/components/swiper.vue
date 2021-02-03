<template>
	<view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" class="swiper">
			<swiper-item class="swiper-item" v-for="(item, index) in tabList" :key="index">
				<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="onreachBottom">
					1321
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default{
		computed: {
			...mapState({
				tabList: state=> state.user.tabList,
				swiperCurrent : state=>state.user.swiperCurrent
			})
		},
		data(){
			return{
				
			}
		},
		methods:{
			...mapMutations(['currectQiehuan','tabsQiehuan']),
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				console.log(e);
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				console.log(e);
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				// this.swiperCurrent = current;
				this.tabsQiehuan(current)
				// this.current = current;
				this.currectQiehuan(current)
			},
			// scroll-view到底部加载更多
			onreachBottom() {
			
			}
		}
	}
</script>

<style>
</style>
