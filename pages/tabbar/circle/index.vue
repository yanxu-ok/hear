<template>
	<view>
		<view>圈子</view>
		<tabbar :list="tabbarData" height="55px" :mid-button="true" inactive-color="#cbcedd"
		 active-color="#fe9503"></tabbar>
	</view>
</template>

<script>
	import tabbar from '@/components/u-tabbar/u-tabbar.vue'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default{
		components:{
			tabbar
		},
		computed: {
			...mapState({
				tabbarData: state => state.system.tabBarList
			})
		}
	}
</script>

<style>
</style>
