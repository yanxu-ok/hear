<template>
	<view class="listen_header">
		<!-- #ifdef MP-WEIXIN -->
		<view style="width: 400rpx; height: 60rpx;">
			<u-search v-model="content" :show-action="true"  action-text="搜索" @custom="handleSearch" @search="handleSearch" :animation="true" class="listen_header_search"></u-search>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view style="width: 545rpx; height: 60rpx;">
			<u-search v-model="content" :show-action="true"  action-text="搜索" @custom="handleSearch" @search="handleSearch" :animation="true" class="listen_header_search"></u-search>
		</view>
		<!-- #endif -->
		<view class="listen_header_chuan" style="margin-left: 10px;" @tap="handleShangchuan">
			<u-image width="35rpx" height="34rpx" src="@/static/listen/wengao.png" style="margin: 0 auto;"></u-image>
			<view>上传</view>
		</view>
		<view class="listen_header_chuan" style="margin-left: 10px;" @tap="handleSort">
			<u-image width="35rpx" height="34rpx" src="@/static/listen/wengao.png" style="margin: 0 auto;"></u-image>
			<view>{{sortTitle}}</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default{
		data() {
			return {
				content: ''
			}
		},
		computed: {
			...mapState({
				sortType: state => state.huting.sortType
			}),
			sortTitle(){
				return this.sortType === 1 ? '最新' : '最热'
			}
		},
		methods: {
			...mapMutations(['setContent','setSortType']),
			// 搜索时间 将关键词放到 vuex中
			handleSearch() {
				this.setContent(this.content)
			},
			
			// 改变排序方式事件
			handleSort(){
				this.sortType === 1 ? this.setSortType(2) : this.setSortType(1)
			},
			
			// 文稿上传
			handleShangchuan(){
				uni.navigateTo({
					url: '/pages/shangchuan/shangchuan?type=article&isAudio=false'
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
		
		font-size:18rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
	
		& .listen_header_search {
			width: 545rpx;
		}

	}
</style>
