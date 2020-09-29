<template>
		<view class="new_contain">
			
			<!-- 更多 -->	
			<!-- <headerTitle :title="title" @quanbu="quanbu"></headerTitle> -->
			<u-section :title="title" :show-line="false"  font-size="36" sub-title="全部" @click="quanbu"></u-section>
			
			<!-- 中间 -->
			<smallContent :list="list" @handleClick="handleClick"></smallContent>
			
			<!-- 底部刷新 -->
			<view class="refsh"  @tap="handlePrecurrect(type)">
				<u-image width="27rpx" height="27rpx" src="@/static/images/shuaxin.png"></u-image>
				<view class="refsh_text">换一批</view>
			</view>
			
		</view>
</template>

<script>
	import smallContent from './smallContent.vue'
	import headerTitle from './header.vue'
	export default{
		components:{
			smallContent,
			headerTitle
		},
		props:{
			title:{
				type:String,
				default:"title"
			},
			list:{
				type:Array,
				default:()=>[]
			},
			type:{
				type:String,
				default:''
			}
		},
		methods:{
			handleClick(item){
				this.$emit('handleClick',item)
			},
			handlePrecurrect(type){
				this.$emit('prePage',type)
			},
			quanbu(title){
				this.$emit('quanbu',this.title)
			}
		}
	}
</script>

<style lang="scss">
	.new_contain {
		width: 710rpx;
		// height: 816rpx;
		margin: 30rpx auto 30rpx auto;
		border-radius: 10rpx;
		box-shadow: 0px 0px 32rpx 0px rgba(3, 22, 38, 0.08);
		padding: 30rpx 26rpx 30rpx 24rpx;
		
		& .refsh{
			display: flex;
			justify-content: center;
			align-items: center;
			& view{
				margin-right: 20rpx;
			}
			& .refsh_text{
				font-size:26rpx;
				font-family:PingFang SC;
				font-weight:400;
				color:#666666;
			}
		}
	}
	
</style>
