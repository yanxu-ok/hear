<template>
	<view>
		<u-popup v-model="show" mode="bottom" border-radius="20" height="500rpx" :mask-close-able="false" @close="handleClose"
		 :closeable="closeable">

			<view style="text-align: center;margin-top: 50rpx;font-size:36rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);">我的兴趣</view>

			<view style="display: flex;flex-wrap: wrap;padding: 0 50rpx;margin-top: 40rpx;">
				<axbCheckBox ref="radio1" :multi="true" :list="listDatas" @change="radioChangeStatus"></axbCheckBox>
			</view>

			<view class="baocun" @tap="handleSave">保存信息</view>

		</u-popup>
	</view>
</template>

<script>
	import {
		mapActions,
		mapMutations,
		mapState
	} from 'vuex'
	import axbCheckBox from '@/components/axb-checkbox/axb-checkbox.vue'
	export default {
		data() {
			return {
				show: false,
				closeable: true,
				listDatas: [], // 用户标签
				subXingquList: [], // 提交的兴趣标签
				count: null,
				newArr: [] // 需要显示的用户标签
			}
		},

		components: {
			axbCheckBox
		},

		props: {
			list: {
				type: Array,
				default: () => []
			},
			userInfo: {
				type: Object
			}
		},

		computed: {
			...mapState({
				// userInfo: state => state.my.userInfo
			})
		},

		created() {

		},

		methods: {
			...mapActions(['get_label', 'insert_user_label', 'get_user_count']),
			// radioChangeStatus1(val) {
			// 	console.log(val);
			// 	this.subAgeList = []
			// 	if (!val) {
			// 		return;
			// 	}
			// 	this.subAgeList.push({
			// 		"labelRelaType": "3",
			// 		"labelId": val,
			// 		"typeId": this.userInfo.userId
			// 	})
			// },
			// 弹出层关闭时 开始请求
			async handleClose() {
				if (this.subXingquList.legnth == 0) {
					return;
				} else {
					console.log('弹出层关闭时', this.subXingquList);
					let result = await this.insert_user_label(this.subXingquList)
					if (result.success) {
						uni.showToast({
							title: '保存成功',
							icon: 'none'
						})
						// this.getBiaoqian()
						this.$emit('getInfo',this.newArr)
					}
				}

			},
			// 选择标签时请求
			radioChangeStatus({
				val
			}) {
				console.log(val);
				this.subXingquList = []
				this.newArr = []
				if (val.length == 0) {
					return;
				}
				val.forEach((item, index) => {
					this.subXingquList.push({
						"labelRelaType": "3",
						"labelId": item,
						"typeId": this.userInfo.userId
					})
					this.listDatas.forEach((currect, a) => {
						if (item == currect.labelId) {
							this.newArr.push(currect.name)
						}
					})
				})
				console.log(this.subXingquList, '选择的兴趣标签',this.newArr);
			},
			// 点击保存触发  组合在一块
			async handleSave() {
				let data = this.subXingquList
				let result = await this.insert_user_label(data)
				this.show = false;
				if (result.success) {
					uni.showToast({
						title: '保存成功'
					})
					this.$emit('handleSuccend')
				}
			},

			// 点击变色
			handlenan(id, index) {
				this.sexIndex = index,
					console.log(id, '选中的用户id');
				this.subSexList = []
				this.subSexList.push({
					"labelRelaType": "3",
					"labelId": id,
					"typeId": this.userInfo.userId
				})
			},
			// 获取标签
			async getBiaoqian() {
				let result = await this.get_label({
					labelType: 1
				})
				// console.log(result);
				result.forEach((item, index) => {
					item.name = item.labelName;
					item.value = item.labelId;
					if (item.userId) {
						item.checked = 1;
					} else {
						item.checked = 0;
					}
				})
				console.log(result);
				this.listDatas = result
			}
		}
	}
</script>

<style lang="scss">
	.baocun {
		width: 690rpx;
		height: 88rpx;
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: 500;
		margin-left: 31rpx;
		background: #ffaa00;
		border-radius: 60rpx;
		text-align: center;
		line-height: 88rpx;
		color: rgba(255, 255, 255, 1);
		margin-top: 30rpx;
	}

	.on {
		color: #ffaa00;
	}
</style>
