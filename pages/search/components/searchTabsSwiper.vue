<template>
	<view class="search_swiper_contain">
		<tabsSwiper ref="uTabs" :list="categoryList" name="categoryName" :current="current" @change="tabsChange" :is-scroll="true"
		 active-color="#F8A942" swiperWidth="750"></tabsSwiper>
		<swiper class="swiper_item" :current="swiperCurrent" @change="animationfinish">
			<swiper-item v-for="(item, index) in categoryList" :key="index">
				<template v-if="current == index">
					<scroll-view scroll-y class="search_scroll" @scrolltolower="onreachBottom">
						<u-bodan style="margin-left: 30rpx;" :list="list" @handlePlay="handlePlay"></u-bodan>
					</scroll-view>
				</template>
				<template v-else>
					<u-empty mode="search"></u-empty>
				</template>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import tabsSwiper from '@/components/u-tabs-swiper/u-tabs-swiper.vue'
	import {
		mapActions
	} from 'vuex'
	export default {
		props: {
			// resultList: {
			// 	type: Array,
			// 	default: () => []
			// },

			// 搜索的关键字
			keyword: {
				type: String,
				default: ''
			}
		},
		components: {
			tabsSwiper
		},
		data() {
			return {
				list: [],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				categoryList: [], //分类列表
				show: false // 是否为空
			};
		},
		// async created() {

		// },
		async mounted() {
			this.categoryList = await this.get_all_category()
			let res = await this.get_topic_by_categoryid({
				content: this.keyword,
				categoryId: this.categoryList[0].categoryId
			})
			if (res.list.length === 0) {
				this.show = false
			} else {
				this.show = true
			}
			this.list = res.list
		},

		methods: {
			...mapActions(['get_topic_by_categoryid', 'get_all_category']),
			// tabs通知swiper切换
			async tabsChange(index) {
				// console.log(index);
				this.swiperCurrent = index;
				// this.current = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			// transition(e) {
			// 	// let dx = e.detail.dx;
			// 	// console.log(dx);
			// 	// this.$refs.uTabs.setDx(dx);
			// },
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			async animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
				if (this.categoryList.length <= 1) {
					return;
				}
				let result = await this.get_topic_by_categoryid({
					content: this.keyword,
					categoryId: this.categoryList[this.current].categoryId
				})
				this.list = result.list
			},

			// scroll-view到底部加载更多
			async onreachBottom() {
				let result = await this.get_topic_by_categoryid({
					content: this.keyword,
					categoryId: this.categoryList[this.current].categoryId
				})
				this.list = this.list.concat(result.list)
			},

			// 点击专题后进到章节列表

			handlePlay(item) {
				console.log(item);
				// uni.navigateTo({
				// 	url: '/pages/playPage/playPage?topicId=' + item.topicId
				// })

				uni.navigateTo({
					url: '/pages/list_page_zhang/list_page_zhang??name=专题列表&type=zj&topicId=' + item.topicId
				})
			},

			// // 分类接口
			// async getFenlei() {

			// }

		},
		watch: {
			// resultList(newValue, oldValue) {
			// 	// console.log(newValue);
			// 	// 发起请求分类下第一项下面的专题列表
			// 	console.log(newValue, "分类列表数组");
			// 	if (newValue.length != 0) {
			// 		this.categoryList = newValue
			// 		console.log(this.categoryList);
			// 		// this.get_topic_by_categoryid({
			// 		// 	content: this.keyword,
			// 		// 	categoryId: this.categoryList[0].categoryId
			// 		// }).then(res => {
			// 		// 	if (res.length === 0) {
			// 		// 		this.show = false
			// 		// 	} else {
			// 		// 		this.show = true
			// 		// 	}
			// 		// 	this.list = res
			// 		// })
			// 	}
			// }
		},
	};
</script>

<style lang="scss">
	.search_swiper_contain {
		width: 100%;
		height: 100%;
	}

	.search_scroll {
		width: 100%;
		height: 1200rpx;
		display: flex;
		/* #ifdef H5 */
		margin-top: 45rpx;
		/* #endif */
	}

	.swiper_item {
		height: 1200rpx;
	}
</style>
