<template>
	<view class="all_as_content">
		<u-popup v-model="show" close-icon-pos="top-left" mode="right" :height="height" :mask-close-able="false" @close="handleClose"
		 :closeable="closeable">

			<view style="text-align: center;margin-top: 25rpx;font-size:36rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);">类别筛选</view>


			<view class="category_old">已选分类</view>

			<view style="display: flex;flex-wrap: wrap;padding: 0 50rpx;margin-top: 40rpx;">
				<axbCheckBox ref="radio1" :multi="true" :list="listDatas" @change="radioChangeStatus"></axbCheckBox>
			</view>

			<view class="category_old">可选分类</view>

			<view style="display: flex;flex-wrap: wrap;padding: 0 50rpx;margin-top: 40rpx;">
				<axbCheckBox ref="radio1" :multi="true" :list="chajiList" @change="radioChangeStatus1"></axbCheckBox>
			</view>
			
		</u-popup>
	</view>
</template>

<script>
	import {
		getScreenHeight,
		arrChaji
	} from '@/libs/hear-util/index.js'

	import axbCheckBox from '@/components/axb-checkbox/axb-checkbox.vue'

	import {
		mapActions,
		mapMutations,
		mapState
	} from 'vuex'

	export default {

		components: {
			axbCheckBox
		},

		data() {
			return {
				show: true,
				closeable: true,
				listDatas: [], // 已选的分类
				allListDatas: [], // 所有的分类
				chajiList: [], // 差集分类list
				height: getScreenHeight() * 2 + 'rpx',
				endCurrectObj: null //最后一项的obj最后数组要和这项做判断 如果没有该项则 将tabs的索引减一
			}
		},

		onLoad() {
			this.getBiaoqian() // 获取所有的标签
		},

		methods: {
			...mapActions(['get_label', 'get_all_category', 'category', 'update_category_status']),

			// 选择标签时请求 应该在数组中减去当前项，并且在新增分类中添加新选项
			radioChangeStatus({
				val,
				index
			}) {
				// console.log(val, index);
				if (val.length == 0) {
					return;
				}
				this.listDatas[index].checked = 0 // 并且将状态改为未选中的
				this.chajiList.push(this.listDatas[index])
				this.listDatas.splice(index, 1)
			},

			// 新增分类的方法
			radioChangeStatus1({
				val,
				index
			}) {
				if (val.length == 0) {
					return;
				}
				this.chajiList[index].checked = 1 // 并且将状态改为选中的
				this.listDatas.push(this.chajiList[index])
				this.chajiList.splice(index, 1)
			},

			// 弹出层关闭时 开始请求
			async handleClose() {
				let categoryIdListStr = '',
					allCategoryIdListStr = ''

				if (this.listDatas.length != 0) {
					this.listDatas.forEach((element, index) => {
						if (index == this.listDatas.length - 1) {
							categoryIdListStr = categoryIdListStr + element.categoryId;
						} else {
							categoryIdListStr = categoryIdListStr + element.categoryId + ",";
						}
					});
				}

				this.allListDatas.forEach((item, index) => {
					if (index == this.allListDatas.length - 1) {
						allCategoryIdListStr = allCategoryIdListStr + item.categoryId;
					} else {
						allCategoryIdListStr = allCategoryIdListStr + item.categoryId + ",";
					}
				});

				const request = {
					categoryIdListStr,
					allCategoryIdListStr
				}

				await this.update_category_status(request)
				

				// // 判断是否是删的最后一项
				// let index = this.listDatas.findIndex((item, index) => {
				// 	return item.categoryName == this.endCurrectObj.categoryName
				// })
				

				// if (index == -1) {
				// 	uni.$emit('categoryChange')
				// }

				uni.navigateBack({

				})
			},

			// 获取标签
			async getBiaoqian() {
				// 获取已选的标签
				let result = await this.category()
				result.forEach((item, index) => {
					item.name = item.categoryName;
					item.value = item.categoryId;
					item.checked = 1;
				})
				this.listDatas = result

				this.endCurrectObj = this.listDatas[this.listDatas.length - 1]

				// 获取所有的标签
				let result1 = await this.get_all_category()

				this.allListDatas = result1

				// 然后取差集

				// console.log(result, result1, '已选的和所有的');
				this.chajiList = arrChaji(result, result1)
				if (this.chajiList.length != 0) {
					this.chajiList.forEach((item, index) => {
						item.name = item.categoryName;
						item.value = item.categoryId;
						item.checked = 0;
					})
				}
				// console.log(this.chajiList, '差集list');

			},

		}
	}
</script>

<style lang="scss">
	.all_as_content {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		display: flex;
		flex-direction: column;
	}

	.content {
		height: 100%;
	}

	.category_title {
		margin-top: 25rpx;
		text-align: center;
		font-size: 32rpx;
		color: rgb(0, 0, 0);
	}

	.category_old {
		margin-top: 50rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		margin-left: 50rpx;
	}
</style>
