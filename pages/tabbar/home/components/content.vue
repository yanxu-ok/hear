<template>
	<view>

		<banner style="margin: 0 auto;"></banner>

		<!-- 近期新增 -->
		<middleContent title="近期新增" :list="jinqiList" type="jinqi" @handleClick="handleContentClick" @prePage="prePage"
		 @quanbu="quanbu"></middleContent>

		<!-- 编辑力荐 -->
		<view class="bianjiHeader">
			<u-section title="编辑力荐" style="width: 100%;" :show-line="false" font-size="36" sub-title="全部" @click="quanbu('编辑力荐')"></u-section>
		</view>

		<!-- 编辑力荐内容 -->
		<bianji :list="bianjiList" @handleBianjiClick="handleContentClick"></bianji>

		<!-- 滑动 swiper -->
		<view class="paihangbang">
			<scroll-view class="homescroll" :scroll-top="scrollTop" scroll-x="true">
				<paihangbang :list="reqiList" @quanbu="quanbu" type="人气" @handleClick="handleContentClick"></paihangbang>
				<paihangbang :list="xiaoliangList" @quanbu="quanbu" type="销量" @handleClick="handleContentClick"></paihangbang>
			</scroll-view>
		</view>

		<!-- 限时免费  -->
		<middleContent title="限时免费" :list="mianfeiList" type="mianfei" @handleClick="handleContentClick" @prePage="prePage"
		 @quanbu="quanbu"></middleContent>

		<view style="background: white;width: 100%;height: 30rpx;"></view>

	</view>
</template>

<script>
	import banner from './banner.vue'
	import newAdd from './newAdd.vue'
	import middleContent from './middleContent.vue'
	import headerTitle from './header.vue'
	import bianji from './bianji.vue'
	import paihangbang from './paihang.vue'
	import {
		mapActions
	} from "vuex"
	export default {
		components: {
			banner,
			newAdd,
			middleContent,
			headerTitle,
			bianji,
			paihangbang
		},
		data() {
			return {
				scrollTop: 0,
				jinqiList: [], // 近期新增 
				jinqiListCurrect: 1, // 近期新增当前页
				pageSize: 6, //请求的总数
				mianfeiListCurrect: 1, // 免费当前页
				mianfeiList: [], // 免费
				bianjiList: [], // 编辑力荐
				reqiList: [], // 人气榜单
				xiaoliangList: [], //销量榜单
			}
		},
		async created() {
			let data = {
				pageNum: 1,
				pageSize: this.pageSize
			}
			let bianjiData = {
				pageNum: 1,
				pageSize: 3
			}
			let jinqiList,
				mianfeiList,
				bianjiList,
				reqiList,
				xiaoliangList;
			jinqiList = await this.get_recently_topic(data)
			this.jinqiList = jinqiList.list
			mianfeiList = await this.get_limited_time_free_topic(data)
			this.mianfeiList = mianfeiList.list
			bianjiList = await this.get_recommend_topic(bianjiData)
			this.bianjiList = bianjiList.list

			let renqiData = {
				billboardType: 1 //人气
			}
			let xiaoliangData = {
				billboardType: 2 //人气
			}
			reqiList = await this.get_billboard_topic(renqiData)
			this.reqiList = reqiList.list
			xiaoliangList = await this.get_billboard_topic(xiaoliangData)
			this.xiaoliangList = xiaoliangList.list

		},
		methods: {
			
			...mapActions(['get_recently_topic', 'get_limited_time_free_topic', 'get_recommend_topic', 'get_billboard_topic']),

			// 点击内容事件
			handleContentClick(item) {
				console.log(item);
				// 暂时先跳到专题列表页

				uni.navigateTo({
					url: '/pagesA/topic-list-page/topic-list-page?topicId=' + item.topicId + '&authorId=' + item.userAuthorId
				})

			},

			// 点击换一批
			async prePage(type) {
				if (type == 'jinqi') {
					this.jinqiListCurrect++;
					let data = {
						pageNum: this.jinqiListCurrect,
						pageSize: this.pageSize
					}
					let result = await this.get_recently_topic(data)
					console.log(result);
					if (result.list.length == 0) {
						this.jinqiListCurrect = 1
						let data = {
							pageNum: this.jinqiListCurrect,
							pageSize: this.pageSize
						}
						result = await this.get_recently_topic(data)
						console.log(result);
					}
					this.jinqiList = result.list

					return;
				} else {
					this.mianfeiListCurrect++;
					let data = {
						pageNum: this.mianfeiListCurrect,
						pageSize: this.pageSize
					}
					let result = await this.get_limited_time_free_topic(data)
					if (result.list.length == 0) {
						this.mianfeiListCurrect = 1
						let data = {
							pageNum: this.mianfeiListCurrect,
							pageSize: this.pageSize
						}
						result = await this.get_limited_time_free_topic(data)
						console.log(result);
					}
					this.mianfeiList = result.list
					return;
				}
				console.log(type, "点击了哪个换一批");
			},

			// 点击全部事件
			quanbu(type) {
				console.log(type);
				uni.navigateTo({
					url: '/pagesD/listpage/listpage?name=' + type
				})
			}
		}
	}
</script>

<style lang="scss">
	.bianjiHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 45rpx 46rpx 23rpx 44rpx;

		& view:nth-child(1) {
			font-size: $uni_font_36;
			color: $uni-tit-33;
			font-weight: 500;
			font-family: PingFang SC;
		}

		& view:nth-child(2) {
			font-family: PingFang SC;
			font-size: $uni_font_30;
			color: $uni-tit-99;
		}
	}

	.paihangbang {
		margin-bottom: 20rpx;
	}

	.homescroll {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
	}
</style>
