<template>
	<view class="list_page_content">

		<view class="bodan_beijing">
			<image :src="bodanObj.topicImage" style="width: 100%;height: 100%;position: absolute;top: 0; filter: blur(40rpx);z-index: -1;margin:-46rpx; "></image>
			<u-navbar :title="navTitle" background="" title-color="#ffffff" back-icon-color="#ffffff">

			</u-navbar>

			<listheader :src="bodanObj ?bodanObj.topicImage : ''" :author="bodanObj ?bodanObj.nickName : ''" :avatar="bodanObj ?bodanObj.avatar : ''"
			 :title="bodanObj ?bodanObj.topicName : '' " style="margin-top: 39rpx;" @handleAvatar="handleAvatar"></listheader>

		</view>

		<view style="flex: 1; overflow: hidden;margin-top: -30rpx;background: white;border-top-left-radius: 30rpx;border-top-right-radius: 30rpx;padding: 0 30rpx; padding-top: 40rpx;">
			<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
			 :up="upOption" style="height: 100%; ">
				<bodan :length="12" :desc="40" :list="dataList" ref="list_bodanPage" :leixing="leixing" @handlePlay="handlePlay"></bodan>
			</mescroll-uni>
		</view>

	</view>

</template>

<script>
	const BoDan = '播单列表',
		ZhuanTi = '专题列表';
	const LiShi_actions = 'get_user_play_history',
		JinQi_actions = 'get_recently_topic',
		MianFei_actions = 'get_limited_time_free_topic',
		BianJi_actions = 'get_recommend_topic',
		RenQi_actions = 'get_billboard_topic'
	import {
		mapActions
	} from 'vuex'
	import bodan from './components/list_zhang.vue'
	import listheader from '@/components/list-header/list-header.vue'
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
				dataList: [], // 数据
				bodanObj: {
					topicImage: ''
				}
			}
		},

		components: {
			MescrollUni,
			bodan,
			listheader
		},

		async onLoad(e) {
			console.log(e);
			this.title = e.name
			this.categoryId = e.categoryId
			this.topicId = e.topicId
			this.leixing = e.type
			//获取播单的信息
			let result = await this.getBodanJianjie()
			this.bodanObj = result
			console.log(result);
		},

		computed: {
			navTitle() {
				return this.title == BoDan ? '个人播单' : ''
			}
		},

		methods: {
			...mapActions(['get_user_play_history', 'get_recently_topic', 'get_limited_time_free_topic', 'get_recommend_topic',
				'get_topic_list_by_type',
				'get_billboard_topic',
				'get_chapter_list_by_topic',
				'get_chapter_list_by_topic_single',
				'get_introduction_by_topic_id'
			]),

			// 点击头像事件
			handleAvatar() {
				uni.navigateTo({
					url: '/pagesA/myindex/myindex?priv=1&userId=' + this.bodanObj.userId
				})
			},

			// 播单点击事件
			handlePlay(item) {
				console.log(item, this.title);
				if (this.title == BoDan) {
					if (!item.radioType || item.radioType == 1) {
						uni.navigateTo({
							url: '/pages/playPage/playPage?topicId=' + item.topicId + '&authorId=' + item.userId + '&chapterId=' + item.chapterId
						})
					} else {
						uni.navigateTo({
							url: '/pages/listen_nei/listen_nei?audioId=' + item.chapterId + '&type=audio' + '&authorId=' + item.userId
						})
					}
				} else if (this.title == 'LiShi') { // 如果是历史的话 需要判断是否是互听还是音频
					let url = item.radioType == 1 ? '/pages/playPage/playPage?topicId=' + item.topicId + '&authorId=' + item.userId +
						'&chapterId=' + item.chapterId :
						'/pages/listen_nei/listen_nei?audioId=' + item.chapterId + '&type=audio&authorId=' + item.userId
					uni.navigateTo({
						url
					})
				}
				// else if (this.title == ZhuanTi) {
				// 	uni.navigateTo({
				// 		url: '/pages/playPage/playPage?topicId=' + item.topicId + '&authorId=' + item.userId + '&chapterId=' + item.chapterId
				// 	})
				// } 
				else {
					uni.navigateTo({
						url: '/pages/playPage/playPage?topicId=' + item.topicId + '&authorId=' + item.userId + '&chapterId=' + item.chapterId
					})
				}


			},

			// 判断的函数
			async ifType(page) {
				let data
				switch (this.title) {
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

			// 搜索按钮点击时
			async custom(value) {
				// this.list = await this.ifType();
				this.downCallback()
			},

			// 获取播单简介
			async getBodanJianjie() {
				let data = {
					topicId: this.topicId,
					// userId:
				}
				let result = await this.get_introduction_by_topic_id(data)
				return result
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

		& .bodan_beijing {
			width: 100%;
			height: 350rpx;
			padding-left: 48rpx;
			position: relative;
			// filter: blur(40rpx);
			// z-index: -1;
		}

		// & .bodan_beijing::before {
		// 	content: '';
		// 	position: absolute;
		// 	top: 0;
		// 	left: 0;
		// 	right: 0;
		// 	bottom: 0;
		// 	filter: blur(40rpx);
		// 	margin: -10px;
		// }

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
