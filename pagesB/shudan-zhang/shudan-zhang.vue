<template>
	<view class="shudan_contain">
		<u-navbar title="列表" background="" title-color="#333333" back-icon-color="#333333">
		</u-navbar>

		<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" style="flex: 1; ">

			<view style="padding-left: 25rpx;">
			<!-- 书单 -->
			<template v-for="(item,index) in dataList">
				<block :key="index">
					<shudan bottom="25rpx" :image="item.topicImage" :length="10" :count="item.chapterCount" :title="item.topicName" :item="item"
					 @handleClickList="handleClickList"></shudan>
				</block>
			</template>
			</view>

		</mescroll-uni>

	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import shudan from '@/components/u-shudan/u-shudan.vue'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		data() {
			return {
				show: false,
				value: '',
				type: 'text',
				border: false,
				focus: true,
				tirm: true,
				list: [], // 播单的list
				userId: null, //传递过来的用户的id
				type: null, // 列表的类型
				pageNum: 1,
				pageSize: 10,
				downOption: {

				},
				// 上拉加载的配置(可选)
				upOption: {

				},
				// pageNum: 1,
				// pageSize: 10,
				dataList: [] // // 播单的list
			}
		},
		components: {
			shudan,
			MescrollUni
		},
		async onLoad(e) {
			console.log(e, '传递过来的用户的id');
			this.userId = e.userId // 别人的id或者是自己的id
			this.type = e.type
		},
		methods: {
			...mapActions(['get_user_play_single', 'get_user_collect']),

			// 获取列表
			async getList(page) {
				if (this.type == 'bodan') {
					let data = {
						userAuthorId: 1,
						topicType: 2,
						pageNum: page.num,
						pageSize: page.size,
						otherUserId: this.userId
					}
					let result = await this.get_user_play_single(data)
					return result
				} else if (this.type == 'zhuanti') {
					let data = {
						userId: 1,
						pageNum: page.num,
						pageSize: page.size,
						otherUserId: this.userId
					}
					let result = await this.get_user_collect(data)
					return result
				} else if (this.type == 'zhubo') {
					let data = {
						userId: 1,
						pageNum: page.num,
						pageSize: page.size,
						otherUserId: this.userId
					}
					let result = await this.get_user_play_single(data)
					return result
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
				let result = await this.getList(page)
				let curPageData = result.list; //接口返回的当前页数据列表 (数组)
				let curPageLen = result.list.length; //// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
				let totalPage = result.pages; // 接口返回的总页数
				let totalSize = result.total; //  接口返回的总数据量

				//设置列表数据
				if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
				this.dataList = this.dataList.concat(curPageData); //追加新数据
				this.mescroll.endByPage(curPageLen, totalPage);
			},

			//列表点击事件
			handleClickList(item) {
				console.log(item, '点击单行显示');
				if (this.type == 'bodan') { // 播单要跳的页
					uni.navigateTo({
						url: '/pagesD/list_page_zhang/list_page_zhang?name=播单列表&type=zj&topicId=' + item.item.topicId
					})
				} else {
					uni.navigateTo({
						url: '/pagesA/topic-list-page/topic-list-page?topicId=' + item.item.topicId + '&authorId=' + item.item.userAuthorId
					})
				}
			},

			// 滚动
			// async scrolltolower() {
			// 	this.pageNum++
			// 	let list = await this.getList()
			// 	this.list = this.list.concat(list)
			// }
		}
	}
</script>

<style lang="scss">
	.shudan_contain {
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		top: 0;
		display: flex;
		flex-direction: column;

		& .addshudan {
			display: flex;
			flex-direction: row;
			padding-left: 25rpx;
			margin-top: 50rpx;
			align-items: center;
		}

		& .addshudan_text {
			margin-left: 22rpx;
		}


		& .scroll-view_H {
			height: 1200rpx;
		}

		& .anniu_contain {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-top: 31rpx;

			& .anniu_title {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}

			& .anniu {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
			}
		}
	}

	.anniu_contain_input {
		margin-left: 31rpx;
		margin-top: 60rpx;
	}
</style>
