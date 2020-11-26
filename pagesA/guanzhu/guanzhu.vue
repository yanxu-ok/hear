<template>
	<view class="guanzhu">
		<u-navbar :title="userInfo.nickName" background="" title-color="#333333" back-icon-color="#333333">
		</u-navbar>

		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" style="flex: 1;">
			<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
				<guanzhulist v-if="item.name == '粉丝' && index == current " :rindex="index" type="fensi" :list="fensiList" @handleGuanzhu="handleGuanzhu"></guanzhulist>
				<guanzhulist v-if="item.name == '关注' && index == current " :rindex="index" type="guanzhu" :list="fensiList" @handleGuanzhu="handleGuanzhu"></guanzhulist>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	import guanzhulist from './components/guanzhulist.vue'
	export default {
		components: {
			guanzhulist
		},
		data() {
			return {
				list: [{
					name: '粉丝'
				}, {
					name: '关注'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				userInfo: {},
				pageNum: 1,
				pageSize: 10,
				fensiList: [] // 粉丝的数组
			};
		},
		onLoad(e) {
			this.current = e.index
			this.swiperCurrent = e.index
			let _this = this
			uni.getStorage({
				key: 'user',
				success(res) {
					let res1 = JSON.parse(res.data)
					_this.userInfo = res1;
				}
			});
		},

		methods: {
			...mapActions(['get_user_fans', 'get_user_focus', 'insert_focus', 'delete_focus']),
			// 获取粉丝关注的list

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
				// let result =  await this.getFensiList()
				// this.fensiList = result
			}
		}
	};
</script>

<style lang="scss">
	.guanzhu {
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		top: 0;
		display: flex;
		flex-direction: column;
	}
</style>
