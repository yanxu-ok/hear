<template>
	<view style="width: 100%;height: 100%;">
		<view style="margin-top: 70rpx;display: flex;justify-content: center;align-items: center;margin-bottom: 34rpx;">
			<u-image width="41rpx" height="62rpx" src="https://img11.iqilu.com/29/2020/09/30/a61910071ea561944b5f8e8ed7d69049.png"></u-image>
			<view style="margin-left: 17rpx;">共同在读</view>
		</view>
		<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
		 :up="upOption">
			<template v-for="(item,index) in dataList">
				<block :key="index">
					<guanzhu :item="item" @handleGuanzhu="handleGuanzhu" @handleAvatar="handleAvatar"></guanzhu>
				</block>
			</template>
		</mescroll-uni>
	</view>
</template>

<script>
	import guanzhu from '@/components/u-guanzhu/u-guanzhu.vue'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			MescrollUni,
			guanzhu
		},
		data() {
			return {
				mescroll: null,
				downOption: {

				},
				// 上拉加载的配置(可选)
				upOption: {

				},
				dataList: [] // 数据
			}
		},

		computed: {
			...mapState({
				audioInfo: state => state.huting.audioInfo
			})
		},

		mounted() {
			console.log(this.audioInfo, '当前文稿信息');
		},
		methods: {
			...mapActions(['get_reading_together', 'insert_focus', 'delete_focus']),

			mescrollInit(mescroll) {
				this.mescroll = mescroll;
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
				let result = await this.getAudioList(page)
				let curPageData = result.list; //接口返回的当前页数据列表 (数组)
				let curPageLen = result.list.length; //// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
				let totalPage = result.pages; // 接口返回的总页数
				let totalSize = result.total; //  接口返回的总数据量

				//设置列表数据
				if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
				this.dataList = this.dataList.concat(curPageData); //追加新数据
				this.mescroll.endByPage(curPageLen, totalPage);
			},

			async getAudioList(page) {
				let data = {
					articleId: this.audioInfo.articleId,
					pageNum: page.num,
					pageSize: page.size
				}
				let result = await this.get_reading_together(data)
				console.log(result);
				return result
			},

			// 关注点击事件
			async handleGuanzhu(item) {
				console.log(item, '关注的当前项');
				if (item.isFocus == 0) { // 说明是没有关注他  要调用关注接口
					let result = await this.insert_focus(item.userId)
					if (result.success) {
						// this.fensiList = await this.getFensiList()
						this.downCallback()
						uni.showToast({
							title: '关注成功',
							icon: 'none'
						})
					}
				} else { // 说明已经关注 要调用取消关注接口
					let result = await this.delete_focus(item.fansId)
					if (result.success) {
						// this.fensiList = await this.getFensiList()
						this.downCallback()
						uni.showToast({
							title: '取消成功',
							icon: 'none'
						})
					}
				}
			},

			// 头像点击事件
			handleAvatar(item) {
				console.log(item);
				uni.navigateTo({
					url: '/pagesC/listen_nei/listen_nei?audioId=' + item.audioId + '&type=audio&authorId=' + item.userId
				})
			}


		},
	}
</script>

<style>
</style>
