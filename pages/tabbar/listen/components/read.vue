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
					<hutingdiv :gendu="rindex" :authorDu="item.nickName" :title="item.articleTitle" :avatar="item.avatar" :count="item.articleWords"
					 :author="item.articleUserName" :peopleCount="item.audioReadAmount || item.articleReadAmount" :brankGroudImg="item.cover"
					 :item="item" @hutingdiv="handleClickHuting" :time="item.audioTime || item.estimatedTime"></hutingdiv>
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
					toTop: {
						src: null,
						offset: 100,
						duration: 300,
						zIndex: 9990,
						right: 20,
						bottom: 120,
						safearea: false,
						width: 72,
						radius: "50%",
						left: null
					}
				},
				// pageNum: 1,
				// pageSize: 10,
				dataList: [] // 数据
			}
		},
		props: {
			rindex: {
				type: Number,
				default: 0
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
			...mapActions(['get_audio_list', 'get_article_list']),

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

			// 获取大家再看列表list
			async getAudioList(page) {
				if (this.rindex == 0) {
					const data = {
						sortType: this.sortType,
						pageNum: page.num,
						pageSize: page.size,
						content: this.content
					}
					const result = await this.get_audio_list(data) // 获取 大家再在读的列表
					return result
				} else {
					const data = {
						sortType: this.sortType,
						pageNum: page.num,
						pageSize: page.size,
						content: this.content
					}
					const result = await this.get_article_list(data) // 获取 大家再在看的列表
					return result
				}
			},

			// 列表点击事件
			handleClickHuting(item) {
				if (this.rindex == 1) {
					uni.navigateTo({
						url: '/pages/listen_nei/listen_nei?' + '&type=article' + '&authorId=' + item.userId + '&item=' +
							encodeURIComponent(JSON.stringify(item))
					})
				} else {
					uni.navigateTo({
						url: '/pages/listen_nei/listen_nei?audioId=' + item.audioId + '&type=audio' + '&authorId=' + item.userId
					})
				}
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
</style>
