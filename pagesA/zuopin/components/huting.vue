<template>
	<view style="width: 100%;height: 100%;">
		<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" style="height: 100%; ">
			<template v-for="(item,index) in dataList">
				<block :key="index">
					<view class="bodan" @click="handlePlay(item)">
						<view style="width:129rpx; height:129rpx;line-height: 129rpx;text-align: center;">
							<view style="font-size:32rpx;">{{index+1}}</view>
						</view>
						<view class="bodan_content">
							<view class="bodan_content_title" style="display: flex;justify-content: space-between;">
								{{item.articleTitle}}
								<view style="font-size:24rpx;font-family:PingFang SC;font-weight:400;">{{item.updateTime}}</view>
							</view>

							<template>
								<view class="bodan_content_author">
									<view style="width: 19rpx; height: 20rpx;">
										<u-image width="19rpx" height="20rpx" src="@/static/logo.png"></u-image>
									</view>
									<view class="bodan_content_author_name" style="color: #999999;">{{item.audioReadAmount + '播放'}}</view>
									<u-image width="17rpx" height="20rpx" src="@/static/logo.png" style="margin-left: 20rpx;"></u-image>
									<view class="bodan_content_author_count">{{item.audioTime}}</view>
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
		mapActions,
		mapState
	} from 'vuex'
	import shudan from '@/components/u-shudan/u-shudan.vue'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			MescrollUni,
			shudan
		},
		data() {
			return {
				downOption: {

				},
				// 上拉加载的配置(可选)
				upOption: {

				},
				// pageNum: 1,
				// pageSize: 10,
				dataList: [], // 数据
			}
		},
		created() {
			// let _this = this
			// let result = uni.getStorageSync('user');
			// result = JSON.parse(result)
			// // console.log(result,'用户信息');
			// this.userInfo = result
		},
		methods: {
			...mapActions(['get_topic_by_categoryid', 'get_user_play_single', 'get_my_creation_list']),

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

			async ifType(page) {
				let data = {
					userId: 1,
					sortType: 1,
					pageNum: page.num,
					pageSize: page.size,
				}
				let result = await this.get_my_creation_list(data)
				return result
			},

			// 互听作品点击
			handlePlay(item) {
				uni.navigateTo({
					url: '/pages/listen_nei/listen_nei?audioId=' + item.audioId + '&type=audio&authorId=' + item.userId
				})
			}

		},
	}
</script>

<style lang="scss">
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
