<template>
	<view class="myhome">
		<scroll-view scroll-y="true" style="flex: 1;overflow-y: auto;">
			<u-section :title="my" sub-title="全部" :show-line="shu" font-size="34" @click="handleQuanbu(priv)"></u-section>

			<view style="display: flex;flex-wrap: wrap;justify-content: space-between;margin-top: 35rpx;">
				<template v-for="(item,index) in bodanList">
					<block :key="index">
						<shudan bottom="34rpx" titleWidth="193rpx" left="0" :type="priv == 1 ? 'bodan' : 'zhuanti' " :item="item" :image="item.topicImage"
						 :title="item.topicName" :count="item.chapterCount" @handleClickList="handleClickList"></shudan>
					</block>
				</template>
			</view>

			<view style="display: flex;justify-content: space-between;">
				<view class="my_shoucang" :class="{on:shudanIndex==index}" v-for="(item,index) in show" :key="index" @tap="handle(index)">{{item}}</view>
				<view @tap="handleQuanbu1(shudanIndex)">
					<view style="font-size: 24rpx;color: rgb(144, 147, 153);">
						全部 >
					</view>
				</view>
			</view>

			<!-- 
		<u-section title="订阅播单" sub-title="全部" :show-line="shu" font-size="34"></u-section>
		<u-section title="订阅播单" sub-title="全部" :show-line="shu" font-size="34"></u-section> -->

			<view style="display: flex;flex-wrap: wrap;justify-content: space-between;margin-top: 35rpx;">
				<template v-for="(item,index) in zhuantiList">
					<block :key="index">
						<shudan bottom="34rpx" titleWidth="193rpx" :type="type" left="0" :item="item" :image="item.topicImage" :title="item.topicName"
						 @handleClickList="handleClickList" :count="item.chapterCount"></shudan>

						<!-- 1
						 11 -->
					</block>
				</template>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	import shudan from '@/components/u-shudan/u-shudan.vue'
	export default {
		data() {
			return {
				shu: false,
				shudanIndex: 0,
				titleTop: '',
				data: {},
				bodanList: [], // 
				zhuantiList: [] //
			};
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
		async mounted() {
			// this.init()
			// 获取主页播单
			if (this.priv == 1) {
				this.bodanList = await this.getBodan(2)
				this.zhuantiList = await this.getZhuanti()
			} else if (this.priv == 2) { // 主播
				this.zhuantiList = await this.getBodan(2)
				this.bodanList = await this.getBodan(1)
				console.log(this.zhuantiList, this.bodanList);
			} else { // 机构的时候

			}

		},
		computed: {
			
			show() {
				if (this.priv == 1) {
					return ['收藏专题']
				} else if (this.priv == 2) {
					return ['个人播单', '收藏专题']
				}
			},
			
			my() {
				if (this.priv == 2) {
					return '发布内容'
				} else if (this.priv == 1) {
					return '个人播单'
				}
			},

			type() {
				if (this.priv == 1) {
					return 'zhuanti'
				} else if (this.priv == 2 && this.shudanIndex == 0) {
					return 'bodan'
				} else {
					return 'zhuanti'
				}
			}
		},
		methods: {
			...mapActions(['get_user_play_single', 'get_user_collect']),
			async handle(index) {
				this.shudanIndex = index

				if (index == 0) {
					this.zhuantiList = await this.getBodan(2)
				} else {
					this.zhuantiList = await this.getZhuanti()
				}

			},

			// 获取 播单/ // 或者专题
			async getBodan(topicType) {
				let data = {
					userAuthorId: 1,
					topicType,
					pageNum: 1,
					pageSize: 6,
					otherUserId: this.userId
				}
				let result = await this.get_user_play_single(data)
				return result.list
			},

			// 获取专题
			async getZhuanti() {
				let data = {
					userId: 1,
					pageNum: 1,
					pageSize: 4,
					otherUserId: this.userId
				}
				let result = await this.get_user_collect(data)
				return result.list
			},

			// 跳转全部
			handleQuanbu(priv) {
				if (priv == 2) {
					uni.navigateTo({
						url: '/pages/shudan-zhang/shudan-zhang?userId=' + this.userId + '&type=zhubo' // 代表的是主播发布的内容
					})
				} else {
					uni.navigateTo({
						url: '/pages/shudan-zhang/shudan-zhang?userId=' + this.userId + '&type=bodan' // 代表的是播单
					})
				}
			},

			handleQuanbu1(index) {
				if (this.priv == 1 && index == 0) {
					uni.navigateTo({
						url: '/pages/shudan-zhang/shudan-zhang?userId=' + this.userId + '&type=zhuanti' // 代表的是播单
					})
				} else if (this.priv == 2 && index == 0) {
					uni.navigateTo({
						url: '/pages/shudan-zhang/shudan-zhang?userId=' + this.userId + '&type=bodan' // 代表的是播单
					})
				} else if (this.priv == 2 && index == 1) {
					uni.navigateTo({
						url: '/pages/shudan-zhang/shudan-zhang?userId=' + this.userId + '&type=zhuanti' // 代表的是播单
					})
				}
			},

			// 播单点击列表
			handleClickList(item) {
				console.log(item, 'dianji');
				if (item.type == 'bodan') { // 播单要跳的页
					uni.navigateTo({
						url: '/pages/list_page_zhang/list_page_zhang?name=播单列表&type=zj&topicId=' + item.item.topicId
					})
				} else {
					uni.navigateTo({
						url: '/pagesA/topic-list-page/topic-list-page?topicId=' + item.item.topicId + '&authorId=' + item.item.userAuthorId
					})
				}
			}

		},
		components: {
			shudan
		}
	};
</script>

<style lang="scss">
	.myhome {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		margin-top: 37rpx;
		padding: 0 30rpx 10rpx 30rpx;
	}

	.on {
		color: rgba(51, 51, 51, 1);
		font-weight: bold;
	}

	.my_shoucang {
		font-size: 34rpx;
	}
</style>
