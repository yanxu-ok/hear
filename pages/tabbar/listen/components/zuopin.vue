<template>
	<view class="all_and_listen">
		<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" style="height: 100%;">
			<!-- 	// @init="mescrollInit" @down="downCallback" @up="upCallback"为固定值,不可删改(与mescroll-mixins保持一致)
			// :down="downOption" :up="upOption" 绝大部分情况无需配置
			// :top="顶部偏移量" :bottom="底部偏移量" :topbar="状态栏" :safearea="安全区" (常用)
			// 字节跳动小程序 ref="mescrollRef" 必须配置 -->
			<template v-for="(item,index) in dataList">
				<block :key="index">
					<view class="bodan" @click="handleClickHuting(item)">
						<view style="width:129rpx; height:129rpx;line-height: 129rpx;text-align: center;margin-left: 30rpx;">
							<!-- <view style="font-size:32rpx;">{{index+1}}</view> -->
							<u-image :src="item.cover" width="120rpx" height="120rpx" border-radius="10rpx"></u-image>
						</view>
						<view class="bodan_content">
							<view class="bodan_content_title" style="display: flex;justify-content: space-between;">
								{{item.articleTitle | titleFilter(10)}}
								<!-- <view style="font-size:24rpx;font-family:PingFang SC;font-weight:400;">{{item.updateTime.slice(0,10)}}</view> -->
							</view>

							<template>
								<view class="bodan_content_author">
									<view style="width: 19rpx; height: 20rpx;">
										<u-image width="19rpx" height="20rpx" src="https://img11.iqilu.com/29/2020/09/30/224104618812ae11f6484e7303d6d5a1.png"></u-image>
									</view>
									<view class="bodan_content_author_name" style="color: #999999;">{{item.audioReadAmount | numFormat }}播放</view>
									<u-image width="17rpx" height="20rpx" src="https://img11.iqilu.com/29/2020/09/30/e2b6da3e4c665c2c46322fea23f1f1f0.png" style="margin-left: 20rpx;"></u-image>
									<view class="bodan_content_author_count">{{item.audioTime |s_to_hs}}</view>
								</view>
							</template>
							<u-line color="#E6E6E6" margin="30rpx 0 0 0 " style="width: 100%;"></u-line>
						</view>
					</view>
				</block>
			</template>
		</mescroll-uni>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import hutingdiv from '@/components/huting-div/huting-div.vue'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
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
			hutingdiv,
			MescrollUni
		},
		computed: {

			...mapState({
				sortType: state => state.huting.sortType,
				content: state => state.huting.content
			})

		},
		watch: {
			// 监听关键字搜索事件
			content(newValue, oldValue) {
				console.log(newValue, '关键字发生变化了');
				this.downCallback()
			},

			// 监听排序方式发生了变化
			sortType(newValue, oldValue) {
				console.log(newValue, '排序方式发生了变化');
				this.downCallback()
			}

		},
		methods: {
			...mapActions(['get_my_creation_list']),

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
				let result = await this.getAudioList(page)
				console.log(result, '我的作品');
				let curPageData = result.list; //接口返回的当前页数据列表 (数组)
				let curPageLen = result.list.length; //// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
				let totalPage = result.pages; // 接口返回的总页数
				let totalSize = result.total; //  接口返回的总数据量

				//设置列表数据
				if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
				this.dataList = this.dataList.concat(curPageData); //追加新数据
				this.mescroll.endByPage(curPageLen, totalPage);
			},

			// 
			async getAudioList(page) {
				const data = {
					sortType: this.sortType,
					pageNum: page.num,
					pageSize: page.size,
					content: this.content,
					// userId: 1,
				}
				const result = await this.get_my_creation_list(data) // 获取 大家再在读的列表
				return result
			},

			// 列表点击事件
			handleClickHuting(item) {
				uni.navigateTo({
					url: '/pagesC/listen_nei/listen_nei?audioId=' + item.audioId + '&type=audio' + '&authorId=' + item.userId
				})
			}



		}
	}
</script>

<style lang="scss">
	.all_and_listen {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;


		/deep/ & .mescroll-uni {
			bottom: 0rpx;
		}
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
			height: 69rpx;
		}

		& .bodan_content_author {
			display: flex;
			justify-content: flex-start;
			margin-top: 34rpx;

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
