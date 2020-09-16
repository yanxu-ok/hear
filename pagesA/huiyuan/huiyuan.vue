<template>
	<view class="huiyuan">
		<memberCenter></memberCenter>
	</view>
</template>

<script>
	import memberCenter from './components/memberCenter.vue'
	export default{
		components:{
			memberCenter
		}
	}
</script>

<style lang="scss">
	.huiyuan{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
	}
</style>
