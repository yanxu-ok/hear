<template>
	<view class="header">
		<view>{{title}}</view>
		<view @tap="quanbu(title)">全部></view>
	</view>
</template>

<script>
	export default{
		props:{
			title:{
				type:String,
				default:"title"
			}
		},
		methods:{
			quanbu(title){
				this.$emit('quanbu',title)
			}
		}
	}
</script>

<style lang="scss">
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;

		& view:nth-child(1) {
			font-size: $uni-font-size-36;
			color: $uni-tit-33;
			font-weight: 500;
			font-family: PingFang SC;
		}

		& view:nth-child(2) {
			font-family: PingFang SC;
			font-size: $uni-font-size-sm;
			color: $uni-tit-99;
		}
	}
</style>
