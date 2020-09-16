<template>
	<!-- 内容 -->
	<view class="content_contain">
		<template v-for="(item,index) in list">
			<block :key="index">
				<view class="content_contain_view">
					<u-image width="204rpx" height="204rpx" :src="item.topicImage" border-radius="10rpx" @click="handleClick(item)"></u-image>
					<view class="content_contain_view_text" @tap="handleClick(item)">
						{{item.topicName | titleFilter(6)}}
					</view>
				</view>
			</block>
		</template>
	</view>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default:()=>[]
			}
		},
		methods:{
			handleClick(item){
				this.$emit('handleClick',item)
			}
		}
	}
</script>

<style lang="scss">
	.content_contain {
		margin-top: 45rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		& .content_contain_view {
			width: 204rpx;
			margin-bottom: 32rpx;

			& .content_contain_view_text {
				margin-top: 20rpx;
				text-align: center;
			}
		}
	}
</style>
