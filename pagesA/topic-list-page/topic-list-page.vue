<template>
	<view class="zhaunti_list_page">
		<u-navbar title="专题列表" background="" title-color="#000000" back-icon-color="#000000">
		</u-navbar>

		<!-- 头部的信息 -->
		<zhuantiheader :count="ztJianjie ? ztJianjie.chapterCount : 0 " :topicName="ztJianjie ? ztJianjie.topicName : '' "
		 :topicImg="ztJianjie ? ztJianjie.topicImage : '' " style="margin-top: 30rpx;"></zhuantiheader>

		<u-tabs-swiper ref="uTabs" :list="list" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>

		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish" style="flex: 1;">
			<swiper-item class="swiper-item" v-for="(currect, currectIndex) in list" :key="currectIndex">
				<template v-if="currectIndex == 0">
					<view style="display: flex;flex-direction: column;height: 100%;">
						<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" class="play_swiper_scroll" @down="downCallback"
						 @up="upCallback" :down="downOption" :up="upOption">
							<template v-for="(item,index) in dataList">
								<view class="jiemu_contain" :key="index" @tap="handleZhangjie(index,item)">

									<view style="width: 55rpx;height: 25rpx;font-size: 33rpx;color: #9A9A9A;">{{index+1}}</view>
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
				<template v-if="currectIndex == 1">
					<view class="jianjie_contain">
						<view class="zhubo">主播介绍</view>
						<!--  -->
						<view class="xilie">

							<view style="width: 88.5rpx; height: 88.5rpx;">
								<u-image width="88.5rpx" height="88.5rpx" :src="ztJianjie ? ztJianjie.avatar : '' " border-radius="50%" @click="handleZhubo(ztJianjie)"></u-image>
							</view>

							<view class="xilie_content">
								<view>{{ztJianjie ?  ztJianjie.nickName : '' | titleFilter(5)}}</view>
								<view>{{ztJianjie ? ztJianjie.userDescribe : '' | titleFilter(8)}}</view>
							</view>

						</view>


						<!-- 间隔槽 -->
						<u-gap height="18" bg-color="#F7F7F7" margin-top="35" margin-bottom="35"></u-gap>

						<!-- 专辑简介 -->
						<view class="zhubo">专辑简介</view>

						<scroll-view scroll-y="true" style="overflow-y:auto;margin-top: 38rpx;">
							<view style="padding: 0 30rpx;">{{ztJianjie ? ztJianjie.topicDescribe : ''}}</view>
						</scroll-view>
					</view>
				</template>
			</swiper-item>
		</swiper>
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
	import zhuantiheader from '@/components/zhuanti-header/zhuanti-header.vue'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			zhuantiheader,
			MescrollUni
		},
		// 
		async onLoad(e) {
			this.topicId = e.topicId
			//获取专题的简介
			this.ztJianjie = await this.getJianJie(this.topicId, e.authorId)
		},

		data() {
			return {
				style: null,
				list: [{
					name: '节目'
				}, {
					name: '简介'
				}],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的,
				listOrder: 1, // 排序方式
				downOption: {

				},
				// 上拉加载的配置(可选)
				upOption: {

				},
				// pageNum: 1,
				// pageSize: 10,
				dataList: [], // 数据,
				topicId: null, // 传递过来的topicId
				currectPlayIndex: 0,
				ztJianjie: null // 专题的简介
			}
		},

		methods: {
			...mapActions(['get_chapter_list_by_topic', 'get_introduction_by_topic_id']),

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
				this.currectPlayIndex = index
				uni.navigateTo({
					url: '/pagesC/playPage/playPage?topicId=' + item.topicId + '&authorId=' + item.userId +
						'&chapterId=' + item.chapterId
				})
			},

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
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},

			// 根据id 获取简介
			async getJianJie(topicId, authorId) {
				let result = await this.get_introduction_by_topic_id({
					topicId,
					userId: authorId
				})
				console.log(result);
				return result
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
				this.mescroll.endByPage(curPageLen, totalPage);
			},

			// 跳转到主播页
			handleZhubo(ztJianjie) {
				uni.navigateTo({
					url: '/pagesA/myindex/myindex?userId=' +
						ztJianjie.userAuthorId + '&priv=2'
				})
			}

		}
	}
</script>

<style lang="scss">
	.zhaunti_list_page {
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		top: 0;
		display: flex;
		flex-direction: column;
	}

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
		height: 100%;
	}

	.jianjie_contain {
		height: 100%;
		display: flex;
		flex-direction: column;

		& .zhubo {
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			padding-left: 25rpx;
			margin-top: 35rpx;
		}

		& .xilie {
			display: flex;
			justify-content: flex-start;
			padding: 0 26rpx 0 26rpx;
			margin-top: 27rpx;
		}

		& .xilie_content {
			display: flex;
			margin-left: 24rpx;
			width: 250rpx;
			/* #ifdef MP-WEIXIN */
			// margin-left: -70rpx;
			/* #endif */
			flex-direction: column;
		}

		// & .xilie_desc {
		// 	width: 700rpx;
		// 	height: 135rpx;
		// 	font-size: 28rpx;
		// 	font-family: PingFang SC;
		// 	font-weight: 400;
		// 	color: rgba(85, 85, 85, 1);
		// 	line-height: 36rpx;
		// 	margin: 25rpx auto 0 auto;
		// 	// background: rgba(241, 243, 245, 1);
		// 	opacity: 0.6;
		// 	border-radius: 10rpx;
		// 	padding: 36rpx 34rpx 36rpx 25rpx;
		// }
	}
</style>
