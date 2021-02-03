<template>
	<view class="comment_content">
		
		<u-navbar title="我的评论" background="" title-color="#333333" back-icon-color="#333333">
		</u-navbar>
		<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" style="flex: 1; ">
			<!-- <scroll-view scroll-y="true" style="overflow: auto;height: 100%;margin-bottom: 10rpx;"> -->
			<view class="comment" v-for="(oItem,oIndex) in dataList" :key="oIndex">
				<!-- header -->
				<view class="comment_header">
					<view class="comment_header_user">
						<u-image width="70rpx" height="70rpx" :src="oItem.headImg" border-radius="50%"></u-image>
						<view class="comment_header_name">{{oItem.loginName}}</view>
					</view>
					<view style="display: flex;align-items: center;">
						<u-image width="38rpx" height="38rpx" :src="dianzan(oItem,oIndex)" @click="handleCommentClick(oItem,oIndex)"></u-image>
						<text style="margin-left: 5rpx;">{{oItem.praiseNum}}</text>
					</view>
				</view>

				<view class="comment_text">
					{{oItem.commentContent}}
				</view>

				<view class="comment_huifu">
					<view class="comment_huifu_date_name">{{oItem.createTime}}</view>
					<!-- <view class="comment_huifu_date_button">回复</view> -->
					<!-- <image src="https://img11.iqilu.com/29/2020/09/30/a4d82527745536fed1dfebde940d7341.png" style="width: 28rpx;height: 5rpx;margin-left: auto;"></image> -->
				</view>

				<view style="margin-top: 22rpx;">
					<template v-for="(item,index) in oItem.children">

						<view class="comment_chilrden" :key="index">
							<!-- header -->
							<view class="comment_header">
								<view class="comment_header_user">
									<u-image width="47rpx" height="48rpx" src="https://img11.iqilu.com/29/2020/09/30/9985afda61bd11fa1e69400381518d70.png"></u-image>
									<view class="comment_header_name">{{item.loginName}}</view>
								</view>
								<view style="display: flex;align-items: center;">
									<u-image width="28rpx" height="28rpx" :src="dianzan(item,index)" @click="handleCommentClick(item,index,oIndex)"></u-image>
									<text style="margin-left: 5rpx;">{{item.praiseNum}}</text>
								</view>
							</view>

							<view class="comment_text">
								{{item.commentContent}}
							</view>

							<view class="comment_huifu">
								<view class="comment_huifu_date">
									<view class="comment_huifu_date_name">2楼</view>
									<view class="comment_huifu_date_button">2小时前</view>
								</view>
								<!-- <u-image width="25rpx" height="5rpx" src="https://img11.iqilu.com/29/2020/09/30/dc526a58e0ddf4164070785d7ae60ff0.png"></u-image> -->
							</view>
							<u-line color="#E1E4E8" margin="25rpx 39rpx 0 0"></u-line>
						</view>

					</template>
				</view>

			</view>

		</mescroll-uni>
		<!-- </scroll-view> -->
	</view>
</template>
<script>
	import {
		setCurrectStorg,
		getCurrectStorg
	} from '@/libs/hear-util/index.js'
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				key: 'value',
				downOption: {
					// auto: false
				},
				// 上拉加载的配置(可选)
				upOption: {
					// auto: false
				},
				// pageNum: 1,
				// pageSize: 10,
				dataList: [], // 数据
				userInfo: null, // 缓存中的用户信息
			}
		},
		components: {
			MescrollUni
		},
		computed: {
			...mapState({
				zhangjieList: state => state.play.zhangjieList,
				topicId: state => state.play.topicId,
				currectPlayIndex: state => state.play.currectPlayIndex,
				chapterId: state => state.play.chapterId,
			}),
		},
		onLoad() {
			const userInfo = JSON.parse(getCurrectStorg('user'))
			// console.log(userInfo);
			this.userInfo = userInfo
		},
		methods: {
			...mapActions(['get_comment_list', 'get_comment_manager_token', 'praise', 'cancel_praise','get_comment_page']),

			/*下拉刷新的回调*/
			async downCallback() {

				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可
				// this.mescroll.endSuccess()
			},

			// 先调用connent转化token 获取评论列表
			async getCommentList(page) {
				const token = await this.get_comment_manager_token() // 评论的token
				setCurrectStorg('commentToken', token)
				let data = {
					offset: page.num,
					pageSize: page.size,
					classifyKey: 'hear',
					orgKey: this.$config.requestComment.orgKey,
					loginId: this.userInfo.userId,
					platformKey: this.$config.requestComment.platformKey
				}
				let result = await this.get_comment_page(data)
				return result
			},

			/*上拉加载的回调*/
			async upCallback(page) {
				// let pageNum = page.num; // 页码, 默认从1开始
				// let pageSize = page.size; // 页长, 默认每页10条
				let result = await this.getCommentList(page)
				// console.log(result, '评论的列表');
				let curPageData = result.data ? result.data : []; //接口返回的当前页数据列表 (数组)
				let curPageLen = result.data ? result.data.length : 0; //// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
				let totalPage = result.totalPage; // 接口返回的总页数
				let totalSize = result.totalCount; //  接口返回的总数据量

				//设置列表数据
				if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
				this.dataList = this.dataList.concat(curPageData); //追加新数据

				this.mescroll.endByPage(curPageLen, totalPage);
			},

			// 点赞
			dianzan(item, index) {
				let result = item.isPraise ?
					'https://img11.iqilu.com/29/2020/09/30/52dd0b42935d1212161bcd55b17b8741.png' :
					'https://img11.iqilu.com/29/2020/09/30/d776d6abe9f64946ce0229c184cb6db4.png'
				return result
			},

			// // 点赞成功
			// async handleCommentClick(item, index, oIndex) {

			// 	if (item.isPraise == 0) {
			// 		const result = await this.praise({
			// 			commentKey: item.commentKey
			// 		})
			// 		if (result.ok) {
			// 			uni.showToast({
			// 				title: '点赞成功',
			// 				icon: 'none'
			// 			})

			// 			if (!oIndex) {
			// 				this.dataList[index].isPraise = 1
			// 			} else {
			// 				this.dataList[oIndex].children[index].isPraise = 1
			// 			}
			// 		}
			// 	} else {
			// 		const result = await this.cancel_praise({
			// 			commentKey: item.commentKey
			// 		})
			// 		if (result.ok) {
			// 			uni.showToast({
			// 				title: '取消成功',
			// 				icon: 'none'
			// 			})
			// 			if (!oIndex) {
			// 				this.dataList[index].isPraise = 0
			// 			} else {
			// 				this.dataList[oIndex].children[index].isPraise = 0
			// 			}
			// 		}
			// 	}
			// }
		}
	}
</script>

<style lang="scss">
	.comment_content {
		position: absolute;
		left:0;
		right:0;
		bottom: 0;
		top: 0;
		display: flex;
		flex-direction: column;

		& .comment {
			padding: 0 20rpx 0 26rpx;
			height: 100%;
		}

		& .comment_header {
			display: flex;
			justify-content: space-between;
			margin-top: 38rpx;
			align-items: center;

			& .comment_header_user {
				display: flex;
				align-items: center;
			}

			& .comment_header_name {
				margin-left: 16rpx;
				color: #FE9D40;

				font-size: 30rpx;
			}
		}

		& .comment_text {
			width: 574rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			margin: 0 auto;
			line-height: 52rpx;
		}

		& .comment_huifu {
			margin-top: 24rpx;
			display: flex;
			width: 100%;
			align-items: center;
			padding-left: 64rpx;

			& .comment_huifu_date {
				display: flex;
			}

			& .comment_huifu_date_name {
				margin-right: 26rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(153, 153, 153, 1);
			}

			& .comment_huifu_date_button {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #9A9A9A;
			}
		}
	}


	.comment_chilrden {
		width: 612rpx;
		background: rgba(241, 243, 245, 1);
		border-radius: 10rpx;
		margin-left: 58rpx;
		padding: 22rpx 24rpx 20rpx 28rpx;

		& .comment_huifu_date_name {
			margin-right: 26rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
		}

		& .comment_text {
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
		}

		& .comment_header {
			margin-top: 0;
		}
	}
</style>
