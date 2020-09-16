<template>
	<view class="list_page_content">
		<u-navbar :title="title" background="" title-color="#333333" back-icon-color="#333333">
			<view slot="right" @tap="handlePaixu">
				<image src="../../static/listen/paixu.png" style="width: 30rpx;height: 30rpx;padding-right: 20rpx;" v-if="leixing !== 'lishi'  "></image>
				<view v-else></view>
			</view>
		</u-navbar>

		<view style="height: 150rpx;"  v-if="leixing === 'lishi' " >
			<u-search placeholder="" v-model="content" class="search_c" margin="35rpx auto 0 auto" @search="custom"></u-search>
		</view>
		<!-- <scroll-view scroll-y class="list_search_scroll" refresher-enabled="true" :refresher-triggered="shuaxin"
		 @refresherrefresh="refresherrefresh" @scrolltolower="scrolltolower">
			<u-bodan style="margin-left: 30rpx;" :length="15" :desc="40" :list="list" ref="list_bodanPage" :leixing="leixing"
			 @handlePlay="handlePlay"></u-bodan>
		</scroll-view> -->
		<view style="flex: 1; overflow: hidden;">
			<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
			 :up="upOption" style="flex: 1; ">
				<u-bodan style="margin-left: 30rpx;" :length="15" :desc="40" :list="dataList" ref="list_bodanPage" :leixing="leixing"
				 @handlePlay="handlePlay"></u-bodan>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	const LiShi = '播放历史',
		JinQi = '近期新增',
		MianFei = '限时免费',
		BianJi = '编辑力荐',
		RenQi = '人气',
		XiaoLiang = '销量',
		BoDan = '播单列表',
		ZhuanTi = '专题列表';
	const LiShi_actions = 'get_user_play_history',
		JinQi_actions = 'get_recently_topic',
		MianFei_actions = 'get_limited_time_free_topic',
		BianJi_actions = 'get_recommend_topic',
		RenQi_actions = 'get_billboard_topic'
	import {
		mapActions
	} from 'vuex'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				title: '',
				content: '',
				list: [],
				leixing: 'zhubo',
				// pageNum: 1,
				// pageSize: 10,
				shuaxin: false, //下拉刷新控制
				biaoji: 1, // 人气或者销量的标记
				sortType: 1, // 排序方式 默认时间排序
				categoryId: 0, // 分类ID
				topicId: 0, // 专题ID
				downOption: {

				},
				// 上拉加载的配置(可选)
				upOption: {

				},
				// pageNum: 1,
				// pageSize: 10,
				dataList: [] // 数据
			}
		},

		components: {
			MescrollUni
		},

		async onLoad(e) {
			console.log(e);
			this.title = e.name
			this.categoryId = e.categoryId
			this.topicId = e.topicId
			this.leixing = e.type
			// if (e.type) {		
			// 	// 如果是历史 调用接口
			// 	this.list = await this.getList()
			// 	return;
			// } else {
			// 	this.list = await this.getList()
			// 	return;
			// }
		},

		methods: {
			...mapActions(['get_user_play_history', 'get_recently_topic', 'get_limited_time_free_topic', 'get_recommend_topic',
				'get_topic_list_by_type',
				'get_billboard_topic',
				'get_chapter_list_by_topic',
				'get_chapter_list_by_topic_single'
			]),

			// 点击之后排序
			async handlePaixu() {
				if (this.sortType == 2) {
					this.sortType = 1
					this.downCallback()
				} else {
					this.sortType = 2
					this.downCallback()
				}
			},

			// 获取历史列表
			// async getHistory() {
			// 	let data = {
			// 		content: this.content,
			// 		pageNum: this.pageNum,
			// 		pageSize: this.pageSize
			// 	}
			// 	this.list = await this.get_user_play_history(data)
			// },

			// 播单点击事件
			handlePlay(item) {
				console.log(item, this.title);
				if (this.title == BoDan) {
					if (!item.radioType || item.radioType == 1) {
						uni.navigateTo({
							url: '/pages/playPage/playPage?topicId=' + item.topicId + '&authorId=' + item.userId
						})
					} else {
						uni.navigateTo({
							url: '/pages/listen_nei/listen_nei?audioId=' + item.chapterId + '&type=audio' + '&authorId=' + item.userId
						})
					}
				} else {
					uni.navigateTo({
						url: '/pages/playPage/playPage?topicId=' + item.topicId + '&authorId=' + item.userId
					})
				}
			},

			// 判断的函数
			async ifType(page) {
				let data
				switch (this.title) {
					case JinQi:
						data = {
							pageNum: page.num,
							pageSize: page.size,
							sortType: this.sortType
						}
						return await this.get_recently_topic(data)
						break;
					case MianFei:
						data = {
							pageNum: page.num,
							pageSize: page.size,
							sortType: this.sortType
						}
						return await this.get_limited_time_free_topic(data)
						break;
					case BianJi:
						data = {
							pageNum: page.num,
							pageSize: page.size,
							sortType: this.sortType
						}
						return await this.get_recommend_topic(data)
						break;
					case RenQi:
						data = {
							pageNum: page.num,
							pageSize: page.size,
							billboardType: this.biaoji
						}
						return await this.get_billboard_topic(data)
						break;
					case XiaoLiang:
						this.biaoji = 2
						data = {
							pageNum: page.num,
							pageSize: page.size,
							billboardType: this.biaoji
						}
						return await this.get_billboard_topic(data)
						break;
					case LiShi:
						data = {
							content: this.content,
							pageNum: page.num,
							pageSize: page.size,
						}
						return await this.get_user_play_history(data)
						break;
					case BoDan:
						data = {
							userId: 1,
							topicId: this.topicId,
							pageNum: page.num,
							pageSize: page.size,
						}
						return await this.get_chapter_list_by_topic_single(data)
						break;
					case ZhuanTi:
						data = {
							topicId: this.topicId,
							pageNum: page.num,
							pageSize: page.size,
						}
						return await this.get_chapter_list_by_topic(data)
						console.log(this.list);
						break;
					default: // 剩下的就是分类列表
						data = {
							categoryId: this.categoryId,
							pageNum: page.num,
							pageSize: page.size,
							sortType: this.biaoji
						}
						return await this.get_topic_list_by_type(data)
						break;
				}
			},

			// 除历史之外的列表
			async getList() {
				return await this.ifType()
			},

			// // 下拉被触发
			// async refresherrefresh() {
			// 	this.pageNum = 1
			// 	this.shuaxin = true
			// 	this.list = await this.ifType()
			// 	this.shuaxin = false // 请求完之后取消刷新
			// },

			/*下拉刷新的回调*/
			async downCallback() {
				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				// this.mescroll.endSuccess()
			},

			/*上拉加载的回调*/
			async upCallback(page) {
				// let pageNum = page.num; // 页码, 默认从1开始
				// let pageSize = page.size; // 页长, 默认每页10条
				let result = await this.ifType(page)
				let curPageData = result.list; //接口返回的当前页数据列表 (数组)
				let curPageLen = result.list.length; //// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
				let totalPage = result.pages; // 接口返回的总页数
				let totalSize = result.total; //  接口返回的总数据量

				//设置列表数据
				if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
				this.dataList = this.dataList.concat(curPageData); //追加新数据
				this.mescroll.endByPage(curPageLen, totalPage);
			},

			// // 滚动到底部 分页请求
			// async scrolltolower() {
			// 	this.pageNum++;
			// 	let result = await this.ifType();
			// 	this.list = this.list.concat(result)
			// },

			// 搜索按钮点击时
			async custom(value) {
				// this.list = await this.ifType();
				this.downCallback()
			}

		}
	}
</script>

<style lang="scss">
	.list_page_content {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		display: flex;
		flex-direction: column;

		& .search_c {
			width: 700rpx;
		}
	}

	.list_search_scroll {
		/* #ifdef H5 */
		height: 1100rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		height: 1050rpx;
		/* #endif */
		margin-top: 48rpx;
	}
</style>
