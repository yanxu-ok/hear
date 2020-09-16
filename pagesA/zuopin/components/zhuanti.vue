<template>
	<view style="width: 100%;height: 100%;">
		<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" style="height: 100%; ">
			<template v-for="(item,zhuantiIndex) in dataList">
				<block :key="zhuantiIndex">
					<shudan :image="item.topicImage" :item="item" :count="item.chapterCount" @handleClickList="handlePlay" :title="item.topicName"></shudan>
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
				userInfo: {}, // 用户信息,
			}
		},
		created() {
			let _this = this
			let result = uni.getStorageSync('user');
			result = JSON.parse(result)
			// console.log(result,'用户信息');
			this.userInfo = result
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
				// if (this.current == 0) {
				let data = {
					userAuthorId: this.userInfo.userId,
					topicType: 1,
					pageNum: page.num,
					pageSize: page.size,
					otherUserId: null
				}
				let result = await this.get_user_play_single(data)
				return result
				// } else {
				// 	let data = {
				// 		userId: 1,
				// 		sortType: 1,
				// 		pageNum: page.num,
				// 		pageSize: page.size,
				// 	}
				// 	let result = await this.get_my_creation_list(data)
				// 	console.log(result);
				// 	return result
				// }
			},

			// 互听作品点击
			handlePlay(e) {
				console.log(e.item);
				uni.navigateTo({
					url: '/pages/listpage/listpage?name=专题列表&type=zj&topicId=' + e.item.topicId
				})
			}

		},
	}
</script>

<style>
</style>
