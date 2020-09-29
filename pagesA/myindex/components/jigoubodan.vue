<template>
	<view class="jigoubodan">
		<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" style="flex: 1; ">
			<bodan :list="dataList" style="margin-top: 30rpx;padding-left: 20rpx;" @handlePlay="handlePlay"></bodan>
			<!-- 	<view class="bodan_flex">
				<template v-for="(item,index) in dataList">
					<block :key="index">
						<view class="bodan" @tap="handlePlay(item)">
							<view style="width:129rpx; height:129rpx;line-height: 129rpx;text-align: center;">
								<u-image width="129rpx" height="129rpx" :src="item.avatar" border-radius="10rpx"></u-image>
							</view>
							<view class="bodan_content">
								<view class="bodan_content_title">{{item.topicName | titleFilter(10)}}</view>
								<view class="bodan_content_desc">
									{{item.topicDescribe | titleFilter(10)}}
								</view> -->
			<!-- <view class="bodan_content_desc" v-else>
								</view> -->
			<!-- 	<template>
									<view class="bodan_content_author">
										<u-image width="19rpx" height="20rpx" src="@/static/images/author.png"></u-image>
										<view class="bodan_content_author_name">{{item.nickName}}</view>
										<u-image width="17rpx" height="20rpx" src="@/static/images/play.png" style="margin-left: 20rpx;"></u-image>
										<view class="bodan_content_author_count">{{item.topicReadAmount}}次播放</view>
									</view>
								</template> -->
			<!-- 只有播单显示的列表 -->
			<!-- 				<view class="bodan_content_author_count">200本</view>
								<u-line color="#E6E6E6" margin="30rpx 0 0 0 " style="width: 100%;"></u-line>
							</view>
						</view>
					</block>
				</template>
			</view> -->
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import {
		mapActions,
		mapState
	} from 'vuex'
	import bodan from '@/components/u-bodan/u-bodan.vue'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			bodan
		},
		data() {
			return {
				downOption: {

				},
				// 上拉加载的配置(可选)
				upOption: {

				},
				dataList: [] // 数据
			}
		},
		props: {
			priv: {
				type: Number,
				default: 1
			},
			userId: {
				type: Number
			}
		},
		methods: {
			...mapActions(['get_org_topic']),
			// 获取拥有的主播
			async getOrgbodan(page) {
				let data = {
					orgUserId: null,
					pageNum: page.num,
					pageSize: page.size,
					otherUserId: this.userId
				}
				return await this.get_org_topic(data)
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
				let result = await this.getOrgbodan(page)
				let curPageData = result.list; //接口返回的当前页数据列表 (数组)
				let curPageLen = result.list.length; //// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
				let totalPage = result.pages; // 接口返回的总页数
				let totalSize = result.total; //  接口返回的总数据量

				//设置列表数据
				if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
				this.dataList = this.dataList.concat(curPageData); //追加新数据
				this.mescroll.endByPage(curPageLen, totalPage);
			},

			// 专题点击时

			handlePlay(item) {
				console.log(item);
				uni.navigateTo({
					url: '/pagesA/topic-list-page/topic-list-page?topicId=' + item.topicId + '&authorId=' + item.userAuthorId
				})
			}

		},
	}
</script>

<style lang="scss">
	.jigoubodan {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		display: flex;
		flex-direction: column;
	}

	.bodan {
		display: flex;
		justify-content: flex-start;
		margin-bottom: 30rpx;
		/* #ifdef MP-WEIXIN */
		margin-left: 30rpx;
		/* #endif */

		& .bodan_content_desc {
			margin-top: 23rpx;
			font-size: 27rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			width: 550rpx;
		}

		& .bodan_content_title {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
		}

		& .bodan_content_author {
			display: flex;
			justify-content: flex-start;
			margin-top: 10rpx;
			width: 400rpx;

			& .bodan_content_author_name {
				margin-left: 10rpx;
				color: #fac882;
			}

			& .bodan_content_author_count {
				margin-left: 10rpx;
				color: rgba(153, 153, 153, 1);
			}

		}
	}

	.bodan_content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin-left: 20rpx;
		width: 100%;
		margin-right: 10rpx;
	}
</style>
