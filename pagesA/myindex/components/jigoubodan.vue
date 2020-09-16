<template>
	<view class="jigoubodan">
		<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" style="flex: 1; ">
			<bodan :list="dataList" style="margin-top: 30rpx;padding-left: 20rpx;"></bodan>
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
</style>
