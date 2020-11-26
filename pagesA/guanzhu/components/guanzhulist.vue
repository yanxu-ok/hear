<template>
	<view class="guanzhu" style="overflow: hidden;flex: 1;">
		<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" style="height: 100%; ">
			<template v-for="(item,index) in dataList">
				<block :key="index">
					<guanzhu @handleAvatar="handleAvatar" :item="item" :rindex="index" @handleGuanzhu="handleGuanzhu"></guanzhu>
				</block>
			</template>
		</mescroll-uni>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import guanzhu from '@/components/u-guanzhu/u-guanzhu.vue'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			guanzhu,
			MescrollUni
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
				dataList: [] // 数据
			}
		},
		props: {
			type: {
				type: String,
				default: 'fensi'
			},
			list: {
				type: Array,
				default: () => []
			},
			rindex: {
				type: Number
			}
		},
		async mounted() {
			// console.log(this.$refs.guanzhulist);
			// this.fensiList = await this.getFensiList()
		},
		methods: {
			...mapActions(['get_user_fans', 'get_user_focus', 'insert_focus', 'delete_focus']),

			async getFensiList(page) {
				if (this.rindex == 0) {
					let data = {
						pageNum: page.num,
						pageSize: page.size,
						userId: 1
					}
					return await this.get_user_fans(data)
				} else {
					let data = {
						pageNum: page.num,
						pageSize: page.size,
						userId: 1
					}
					return await this.get_user_focus(data)
				}
			},

			//点击头像要做的事情
			handleAvatar(item) {
				// console.log(item);
				uni.navigateTo({
					url: '/pagesA/myindex/myindex?priv=' + item.userRole + '&userId=' + item.userId
				})
			},

			// //点击关注的事件
			async handleGuanzhu(item) {
				console.log(item, '关注的当前项');
				
				if (item.flag == 1) { // 说明是没有关注他  要调用关注接口
					let result = await this.insert_focus(item.userId)
					if (result.success) {
						// this.fensiList = await this.getFensiList()
						this.downCallback()
						uni.showToast({
							title: '关注成功',
							icon: 'none'
						})
					}
				} else {
					const index = this.getCurrectIndex(this.dataList, item.fansId)
					let result = await this.delete_focus(item.fansId)
					if (result.success) {
						// this.fensiList = await this.getFensiList()
						this.dataList[index].flag = 1
						uni.showToast({
							title: '取消成功',
							icon: 'none'
						})
					}
				}
				
			},

			// 获取当前已经取消的索引
			getCurrectIndex(arr, fansId) {
				return arr.findIndex((item, index) => {
					return item.fansId == fansId
				})
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
				let result = await this.getFensiList(page)
				let curPageData = result.list; //接口返回的当前页数据列表 (数组)
				let curPageLen = result.list.length; //// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
				let totalPage = result.pages; // 接口返回的总页数
				let totalSize = result.total; //  接口返回的总数据量

				//设置列表数据
				if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
				this.dataList = this.dataList.concat(curPageData); //追加新数据
				this.mescroll.endByPage(curPageLen, totalPage);
			},

		}
	}
</script>

<style lang="scss">
	.guanzhu {
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		top: 0;
		display: flex;
		flex-direction: column;
	}
</style>
