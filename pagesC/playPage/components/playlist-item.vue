<template>
	<view style="display: flex;flex-direction: column;">
		<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" class="play_swiper_scroll" @down="downCallback"
		 @up="upCallback" :down="downOption" :up="upOption">
			<template v-for="(item,index) in dataList">
				<view class="jiemu_contain" :key="index" @tap="handleZhangjie(index,item)">
					<view style="width: 55rpx;height: 25rpx;" v-if="currectPlayIndex == index">
						<u-image width="39rpx" height="40rpx" src="https://img11.iqilu.com/29/2020/09/30/5c525b0ef16cc7560303f62952b237f5.png"></u-image>
					</view>
					<view v-else style="width: 55rpx;height: 25rpx;font-size: 33rpx;color: #9A9A9A;">{{index+1}}</view>
					<view class="jiemu_content">
						<!-- 标题 -->
						<view class="jiemu_content_title">
							<view class="jiemu_content_title_name" :class="{on : style == index }">{{item.chapterName | titleFilter(10)}}</view>
							<view class="jiemu_content_title_date">{{item.createTime.slice(0,7)}}</view>
						</view>
						<!-- 播放次数 -->
						<view class="jiemu_content_count">
							<u-image width="17rpx" height="20rpx" src="https://img11.iqilu.com/29/2020/09/30/224104618812ae11f6484e7303d6d5a1.png"></u-image>
							<view class="jiemu_content_count_img">{{item.chapterReadAmount | numFormat }}次播放</view>
							<u-image width="20rpx" height="20rpx" src="https://img11.iqilu.com/29/2020/09/30/e2b6da3e4c665c2c46322fea23f1f1f0.png"></u-image>
							<view style="margin-left: 12rpx; color: #9A9A9A;
font-size: 24rpx;">{{item.chapterTime | s_to_hs}}</view>
						</view>
						<u-line color="#E5E5E5" margin="29rpx 0 0 0" length="600rpx"></u-line>
					</view>
				</view>
			</template>
		</mescroll-uni>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	import {
		setCurrectStorg
	} from '@/libs/hear-util/index.js'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		computed: {
			...mapState({
				zhangjieList: state => state.play.zhangjieList,
				topicId: state => state.play.topicId,
				currectPlayIndex: state => state.play.currectPlayIndex,
				chapterId: state => state.play.chapterId,
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
				dataList: [], // 数据,
				isFirst: true // 用来标识是否是第一次进入 ，是则把第一个索引放入vuex中
			}
		},
		components: {
			MescrollUni
		},
		mounted() {
			// this.setZhangjieList(result.list) // 列表存到vuex中  并且请求道得列表都请求到vuex中
			// this.setCurrectPlayIndex(0)
			// if (this.currectPlayIndex) {

			// } else {

			// }
		},
		methods: {
			...mapActions(['get_chapter_list_by_topic']),
			...mapMutations(['setZhangjieList', 'setCurrectPlayIndex', 'setCurrectPlay']),


			// 获取章节列表
			async getZlist(page) {
				let data = {
					topicId: this.topicId,
					pageNum: page.num,
					pageSize: 1000,
					listOrder: this.listOrder
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
				setCurrectStorg('play', this.zhangjieList[index])
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

				// console.log(this.chapterId);
				console.log(this.chapterId, '章节的id');
				let isChil = this.chapterId
				if (isChil) { //	如果不为空 根据传过来的定位到当前的章节id	返回当前的索引
					// this.isFirst = false

					let chapterIndex = this.positionchapter() // 章节索引
					this.setCurrectPlayIndex(chapterIndex)
					this.setCurrectPlay(this.zhangjieList[chapterIndex])
					// console.log(this.zhangjieList[chapterIndex]);
					setCurrectStorg('play', this.zhangjieList[chapterIndex])
				} else {
					this.setCurrectPlayIndex(0) //如果是空的 是第一次进入 设置索引为0
					this.setCurrectPlay(this.zhangjieList[0])
					// console.log(this.zhangjieList[chapterIndex]);
					setCurrectStorg('play', this.zhangjieList[0])
				}

				this.mescroll.endByPage(curPageLen, totalPage);

			},

			// 获取索引
			positionchapter() {
				let result = this.dataList.findIndex((item, index) => {
					return this.chapterId == item.chapterId
				})
				// let result = this.dataList.indexOf(this.chapterId)
				// console.log(result, '获取索引');
				return result
			}

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

			& .jiemu_content_count_img {
				margin-left: 10rpx;
				margin-right: 20rpx;
				width: 170rpx;
				font-size: 24rpx;
				color: #9A9A9A;
			}
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
