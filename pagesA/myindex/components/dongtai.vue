<template>
	<view class="dongtai">
		<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption" style="flex: 1; ">
			<view v-for="(item,index) in 10" :key="index">
				<view class="dongtai_header">
					<u-image width="85rpx" height="83rpx" src=""></u-image>
					<view style="margin-left: 20rpx;">
						<view>网友8998</view>
						<view>03-19 09:40</view>
					</view>
					<u-image width="27rpx" height="27rpx" src="" style="margin-left: 22rpx;"></u-image>
					<view style="margin-left: 10rpx;">圈子名称</view>
					<u-image width="25rpx" height="5rpx" src="" style="margin-left: 200rpx;"></u-image>
				</view>

				<view style="margin: 30rpx 29rpx;">分享了我的播单</view>

				<view class="fenxiang">
					<view class="fenxaing_div">
						<u-image width="31rpx" height="28rpx" src=""></u-image>
						<view>123</view>
					</view>
					<view class="fenxaing_div">
						<u-image width="33rpx" height="29rpx" src=""></u-image>
						<view>123</view>
					</view>
					<view class="fenxaing_div">
						<u-image width="31rpx" height="29rpx" src=""></u-image>
						<view>123</view>
					</view>
				</view>

				<u-gap height="10" bg-color="#F5F5F5" style="margin-top: 21rpx;"></u-gap>
			</view>
			
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
			MescrollUni
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
			...mapActions(['get_dynamic_by_userid']),
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

			async getList(page) {
				let data = {
					userId: 1,
					otherUserId: this.userId,
					pageNum: page.num,
					pageSize: page.size,
				}
				let result = await this.get_dynamic_by_userid(data)
				return result
			}
			

		},
	}
</script>

<style lang="scss">
	.dongtai {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;

		& .dongtai_header {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 0 30rpx 0 30rpx;
			margin-top: 38rpx;

		}
	}

	.fenxiang {
		display: flex;
		justify-content: space-between;
		padding: 0 75rpx;
	}

	.fenxaing_div {
		display: flex;
	}
</style>
