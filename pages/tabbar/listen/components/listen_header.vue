<template>
	<view class="listen_header">
		<!-- #ifdef MP-WEIXIN -->

		<view style="width: 400rpx; height: 60rpx;">
			<u-search v-model="content" :show-action="true"  :bg-color="searchColor" action-text="搜索" @custom="handleSearch"
			 @search="handleSearch" :animation="true" class="listen_header_search"></u-search>
		</view>

		<!-- #endif -->
		<!-- #ifdef H5 -->

		<view style="width: 545rpx; height: 60rpx;">
			<u-search v-model="content" @handleIcon="handleSearch" :show-action="true" :bg-color="searchColor" action-text="搜索" @custom="handleSearch" @search="handleSearch"
			 :animation="true" class="listen_header_search"></u-search>
		</view>

		<!-- #endif -->
		<view class="listen_header_chuan" style="margin-left: 10px;" @tap="handleShangchuan">
			<u-image width="35rpx" height="34rpx" src="https://img11.iqilu.com/29/2020/09/30/3237f4a6e1ac61c70d9fc51c4abf8741.png"
			 style="margin: 0 auto;"></u-image>
			<view class="listen_header_text">文稿</view>
		</view>

		<view class="listen_header_chuan" style="margin-left: 10px;" @tap="handleSort">
			<u-image width="35rpx" height="34rpx" src="https://img11.iqilu.com/29/2020/11/19/98868617fc83c801e11477f97bc923fc.png"
			 style="margin: 0 auto;"></u-image>
			<view class="listen_header_text">{{sortTitle}}</view>
		</view>

	</view>
</template>

<script>
	import {
		isLogin
	} from '@/libs/hear-util/index.js'
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				content: '',
				searchColor: 'rgba(242, 242, 242, 0.5)',
			}
		},
		computed: {
			...mapState({
				sortType: state => state.huting.sortType
			}),
			sortTitle() {
				return this.sortType === 1 ? '最新' : '最热'
			}
		},
		methods: {
			...mapMutations(['setContent', 'setSortType']),
			// 搜索时间 将关键词放到 vuex中
			handleSearch() {
				this.setContent(this.content)
			},

			// 改变排序方式事件
			handleSort() {
				this.sortType === 1 ? this.setSortType(2) : this.setSortType(1)
			},

			// 文稿上传
			handleShangchuan() {
				if(!isLogin()){
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
				uni.navigateTo({
					url: '/pagesB/shangchuan/shangchuan?type=article&isAudio=false'
				})
			}

		},
	}
</script>

<style lang="scss">
	.listen_header {
		display: flex;
		align-items: center;
		margin: 35rpx 20rpx 32rpx 30rpx;

		font-size: 18rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);

		& .listen_header_search {
			width: 545rpx;
		}

		& .listen_header_text {
			font-size: $uni_font_18;
		}

	}
</style>
