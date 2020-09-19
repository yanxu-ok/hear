<template>
	<view>

		<banner style="margin: 0 auto;"></banner>

		<!-- 编辑力荐 -->
		<view class="bianjiHeader">
			<u-section :arrow="false" :title="categoryCurrect ? categoryCurrect.categoryName : '分类标题为空' " :show-line="false" font-size="36"
			 :sub-title="sortType == 1 ?  '最热' : '最新' " @click="quanbu" ></u-section>
		</view>

		<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" style="flex: 1; ">
			<!-- 编辑力荐内容 -->
			<bianji :list="dataList" @handleBianjiClick="handleContentClick"></bianji>
		</mescroll-uni>

	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import banner from './banner.vue'
	import bianji from './bianji.vue'
	import {
		mapActions
	} from "vuex"
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			banner,
			bianji,
			MescrollUni
		},
		data() {
			return {
				scrollTop: 0,
				downOption: {

				},
				// 上拉加载的配置(可选)
				upOption: {

				},
				// pageNum: 1,
				// pageSize: 10,
				dataList: [], // 数据,
				sortType: 1 // 排序
			}
		},
		props: {
			categoryId: {
				type: Number
			},
			categoryCurrect: {
				type: Object
			}
		},
		methods: {
			...mapActions(['get_recently_topic', 'get_topic_list_by_type']),

			// 点击内容事件
			handleContentClick(item) {
				console.log(item);
				uni.navigateTo({
					url: '/pages/playPage/playPage?topicId=' + item.topicId + '&authorId=' + item.userAuthorId
				})
			},

			// 点击全部事件
			quanbu() {
				this.sortType = this.sortType == 1 ? 2 : 1
				this.downCallback()
			},

			/*下拉刷新的回调*/
			async downCallback() {
				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				// this.mescroll.endSuccess()
			},

			/*上拉加载的回调*/
			async upCallback(page) {
				let pageNum = page.num; // 页码, 默认从1开始
				let pageSize = page.size; // 页长, 默认每页10条
				let data = {
					categoryId: this.categoryId,
					pageNum,
					pageSize,
					sortType: this.sortType
				}

				let result = await this.get_topic_list_by_type(data)
				console.log(result, '分类的列表');
				let curPageData = result.list; //接口返回的当前页数据列表 (数组)
				let curPageLen = result.list.length; //// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
				let totalPage = result.pages; // 接口返回的总页数
				let totalSize = result.total; //  接口返回的总数据量
				//设置列表数据
				if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
				this.dataList = this.dataList.concat(curPageData); //追加新数据
				this.mescroll.endByPage(curPageLen, totalPage);
			},

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
			font-size: $uni-font-size-36;
			color: $uni-tit-33;
			font-weight: 500;
			font-family: PingFang SC;
		}

		& view:nth-child(2) {
			font-family: PingFang SC;
			font-size: $uni-font-size-sm;
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
