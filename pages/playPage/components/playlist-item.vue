<template>
	<view style="height: 100%;">
		<!-- <scroll-view scroll-y @scrolltolower="onreachBottom" class="play_swiper_scroll"> -->
		<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" class="play_swiper_scroll" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" >
			<template v-for="(item,index) in zhangjieList">
				<view class="jiemu_contain" :key="index" @tap="handleZhangjie(index,item)">
					<u-image width="39rpx" height="40rpx" src="@/static/images/zhibo.png" v-if="currectPlayIndex == index"></u-image>
					<view v-else>{{index+1}}</view>
					<view class="jiemu_content">
						<!-- 标题 -->
						<view class="jiemu_content_title">
							<view class="jiemu_content_title_name" :class="{on : style == index }">{{item.chapterName}}</view>
							<view class="jiemu_content_title_date">{{item.createTime}}</view>
						</view>
						<!-- 播放次数 -->
						<view class="jiemu_content_count">
							<u-image width="17rpx" height="20rpx" src="@/static/images/zhibo.png"></u-image>
							<view style="margin-left: 10rpx;margin-right: 20rpx;">{{item.chapterReadAmount + '次'}}</view>
							<u-image width="20rpx" height="20rpx" src="@/static/images/zhibo.png"></u-image>
							<view style="margin-left: 10px;">{{item.chapterTime}}</view>
						</view>
						<u-line color="#E5E5E5" margin="29rpx 0 0 0" length="600rpx"></u-line>
					</view>
				</view>
			</template>
			<!-- </scroll-view> -->
		</mescroll-uni>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		computed: {
			...mapState({
				zhangjieList: state => state.play.zhangjieList,
				topicId: state => state.play.topicId,
				currectPlayIndex: state => state.play.currectPlayIndex,
			})
		},
		data() {
			return {
				style: null,
				pageNum: 1,
				pageSize: 10,
				// zhangjieList: [],
				listOrder: 1, // 排序方式
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
		async mounted() {
			// let list = await this.getZlist()
			// this.setZhangjieList(list) // 列表存到vuex中  并且请求道得列表都请求到vuex中
			if (this.currectPlayIndex) {

			} else {
				
			}
		},
		methods: {
			...mapActions(['get_chapter_list_by_topic']),
			...mapMutations(['setZhangjieList', 'setCurrectPlayIndex', 'setCurrectPlay']),

			// // scroll-view到底部加载更多
			// async onreachBottom() {
			// 	this.pageNum++
			// 	let zhangjieList = await this.getZlist()
			// 	let newList = [...this.zhangjieList, ...zhangjieList]
			// 	this.setZhangjieList(newList)
			// },

			// 获取章节列表
			async getZlist(page) {
				let data = {
					topicId: this.topicId,
					pageNum: page.num,
					pageSize: page.size,
					listOrder: this.listOrder,
					loginId: 1
				}
				return await this.get_chapter_list_by_topic(data)
			},

			// 点击章节事件 将当前章节保存起来 ，并且播放
			handleZhangjie(index, item) {
				console.log(index, item, '章节点击事件');
				if (this.currectPlayIndex == index) { //  点击的和当前索引一样
					return;
				}
				this.setCurrectPlayIndex(index) // 点击将当前的索引保存起来
				// this.setCurrectPlay(this.zhangjieList[0])
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
				let result = await this.getZlist(page)
				let curPageData = result.list; //接口返回的当前页数据列表 (数组)
				let curPageLen = result.list.length; //// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
				let totalPage = result.pages; // 接口返回的总页数
				let totalSize = result.total; //  接口返回的总数据量

				//设置列表数据
				if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
				this.dataList = this.dataList.concat(curPageData); //追加新数据
				this.setZhangjieList(this.dataList) // 列表存到vuex中  并且请求道得列表都请求到vuex中
				this.setCurrectPlayIndex(0)
				this.mescroll.endByPage(curPageLen, totalPage);
			},
		}
	}
</script>

<style lang="scss">
	.jiemu_contain {
		display: flex;
		margin-top: 30rpx;
		align-items: center;
		padding: 0 24rpx 0 53rpx;

		& .jiemu_content {
			margin-left: 30rpx;
			width: 100%;
		}

		& .jiemu_content_title {
			display: flex;
			align-items: center;
			justify-content: space-between;

			& .jiemu_content_title_name {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}

			& .jiemu_content_title_date {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}
		}

		& .jiemu_content_count {
			display: flex;
			flex-direction: row;
			align-items: end;
			margin-top: 22rpx;
		}
	}

	.on {
		color: yellow;
	}

	.play_swiper_scroll {
		height: 700rpx;
		/* #ifdef MP-WEIXIN */
		height: 660rpx;
		/* #endif */
		// padding-bottom: 119rpx;
	}
</style>
