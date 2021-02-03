<template>
	<view class="new_news">
		<!-- 防止覆盖头部导航栏 -->
		<view class="baoliu"></view>
		<!-- 消息列表 -->
		<u-navbar background="" title="消息通知"></u-navbar>

		<view style="flex: 1; overflow: hidden;">
			<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
			 :up="upOption" style="height: 100%;">
				<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in dataList" :key="index" @click="click"
				 @open="open" :options="options">
					<view class="item u-border-bottom">
						<image mode="aspectFill" :src="item.avatar" />
						<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
						<view class="title-wrap">
							<view class="title_header">
								<view class="title_header_style title_header_01">{{ item.nickName ? item.nickName : '官方小助手' }}</view>
								<view class="title_header_01">{{item.createTime}}</view>
								<!-- <view>{{item.title}}</view> -->
							</view>
							<view class="title_content">{{ item.msgContent }}</view>
						</view>
					</view>
				</u-swipe-action>
			</mescroll-uni>
		</view>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				disabled: false,
				btnWidth: 180,
				show: false,
				options: [{
						text: '标记',
						style: {
							backgroundColor: '#007aff'
						}
					},
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				],
				downOption: {

				},
				// 上拉加载的配置(可选)
				upOption: {

				},
				// pageNum: 1,
				// pageSize: 10,
				dataList: [] // // 播单的list
			};
		},

		components: {
			MescrollUni
		},

		//进来之后先调用 
		onLoad() {
			this.init()
		},

		methods: {

			// 将消息通知标为已读
			async init() {
				await this.update_message_read()
			},

			click(index, index1) {
				if (index1 == 1) {
					this.dataList.splice(index, 1);
					this.$u.toast(`删除了第${index}个cell`);
				} else {
					this.dataList[index].show = false;
					this.$u.toast(`收藏成功`);
				}
			},

			...mapActions(['get_user_message', 'update_message_read']),

			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				this.dataList[index].show = true;
				this.dataList.map((val, idx) => {
					if (index != idx) this.dataList[idx].show = false;
				})
			},

			// 获取列表
			async getList(page) {
				let data = {
					pageNum: page.num,
					pageSize: page.size,
				}
				let result = await this.get_user_message(data)
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
				let result = await this.getList(page)
				let curPageData = result.list; //接口返回的当前页数据列表 (数组)
				let curPageLen = result.list.length; //// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
				let totalPage = result.pages; // 接口返回的总页数
				let totalSize = result.total; //  接口返回的总数据量

				//设置列表数据
				if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
				this.dataList = this.dataList.concat(curPageData); //追加新数据
				// for (let index = 0; index < result.list.length; index++) {
				// 	const element = result.list[index];
				// 	element.show = false
				// 	if (element.userOptId === 0) {
				// 		result.list.splice(index, 1)
				// 		result.list.unshift(element)
				// 	}
				// }
				this.mescroll.endByPage(curPageLen, totalPage);
			},
		}
	}
</script>

<style lang="scss">
	.baoliu {
		height: var(--status-bar-height);
		z-index: 999;
	}

	.item {
		display: flex;
		padding: 20rpx;
		align-items: center;
	}

	.new_news {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		display: flex;
		flex-direction: column;
	}

	image {
		width: 100rpx;
		flex: 0 0 100rpx;
		height: 100rpx;
		margin-right: 20rpx;
		border-radius: 50%;
	}

	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}

	.title-wrap {
		width: 100%;
	}

	.title_header {
		display: flex;
		justify-content: space-between;

		& .title_header_style {
			color: rgba(16, 16, 16, 100);
			font-size: 32rpx;
		}
	}

	.title_header_01 {
		color: rgba(140, 140, 140, 100);
		font-size: 24rpx;
	}

	.title_content {
		color: rgba(140, 140, 140, 100);
		font-size: 24rpx;
		margin-top: 10rpx;
	}
</style>
