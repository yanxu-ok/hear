<template>
	<view>
		<u-popup v-model="show" mode="bottom" border-radius="20" height="1100rpx" :closeable="closeable">
			<view style="text-align: center;margin-top: 50rpx;font-size:36rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);">选择性别</view>

			<view style="display: flex;justify-content: center;margin-top: 45rpx;">
				<view style="margin-right: 30rpx;" @tap="handlenan(item.labelId,index)" v-for="(item,index) in sexList" :key="index">
					<u-image width="100rpx" height="100rpx" :src="item.image"></u-image>
					<view style="text-align: center;" :class="{on: index == sexIndex}">{{item.labelName}}</view>
				</view>
			</view>

			<view style="text-align: center;margin-top: 50rpx;font-size:36rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);">我的兴趣</view>

			<view style="display: flex;flex-wrap: wrap;padding: 0 50rpx;margin-top: 40rpx;">
				<axbCheckBox ref="radio1" :multi="true" :list="listDatas" @change="radioChangeStatus"></axbCheckBox>
			</view>

			<view style="text-align: center;margin-top: 50rpx;font-size:36rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(51,51,51,1);">出生日期</view>

			<view style="display: flex;flex-wrap: wrap;padding: 0 50rpx;margin-top: 40rpx;">
				<axbCheckBox ref="radio1" :multi="false" :list="listDatas1" @change="radioChangeStatus1"></axbCheckBox>
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
				listDatas: [],
				listDatas1: [],
				sexList: [], // 性别标签
				sexIndex: 0, // 性别标签,
				subSexList: [], //提交的性别标签
				subAgeList: [], //提交的年龄标签
				subXingquList: [], // 提交的兴趣标签
				count: null
			}
		},

		components: {
			axbCheckBox
		},

		computed: {
			...mapState({
				userInfo: state => state.my.userInfo
			})
		},


		methods: {
			...mapActions(['get_label', 'insert_user_label', 'get_user_count','update_user_msg']),
			radioChangeStatus1({
				val
			}) {
				console.log(val);
				this.subAgeList = []
				if (!val) {
					return;
				}
				this.subAgeList.push({
					"labelRelaType": "3",
					"labelId": val,
					"typeId": this.userInfo.userId
				})
			},
			
			radioChangeStatus({
				val
			}) {
				console.log(val);
				this.subXingquList = []
				if (val.length == 0) {
					return;
				}
				val.forEach((item, index) => {
					this.subXingquList.push({
						"labelRelaType": "3",
						"labelId": item,
						"typeId": this.userInfo.userId
					})
				})
			},
			
			// 点击保存触发  组合在一块
			async handleSave() {
				let data = [...this.subSexList, ...this.subAgeList, ...this.subXingquList]
				console.log(data,this.subSexList);
				if(this.subSexList[0].labelId == 1){}
				let updata = {
					userSex: this.subSexList[0].labelId,
				}
				
				let upresult = await this.update_user_msg(updata)
				console.log(upresult);
				// 先调用 获取更新用户的信息的接口
				let result = await this.insert_user_label(data)
				this.show = false;
				if (result.success) {
					uni.showToast({
						title: '保存成功',
						icon:'none'
					})
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
					labelType: null
				})

				let arr = ['https://img11.iqilu.com/29/2020/09/30/1e266a1092304bd344bce70005e89a06.png',
					'https://img11.iqilu.com/29/2020/09/30/4dbc7d76feaff25651cb261091070f03.png'
				]
				
				result.slice(0, 2).forEach((item, index) => {
					item.image = arr[index]
				})

				this.subSexList.push({
					"labelRelaType": "3",
					"labelId": result[0].labelId,
					"typeId": this.userInfo.userId
				})

				this.sexList = result.slice(0, 2)
				result.slice(2, 8).forEach((item, index) => {
					item.name = item.labelName;
					item.value = item.labelId;
					item.checked = 0;
				})
				
				this.listDatas = result.slice(2, 8)
				result.slice(8, 14).forEach((item, index) => {
					item.name = item.labelName;
					item.value = item.labelId;
					item.checked = 0;
				})
				
				this.listDatas1 = result.slice(8, 13)
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
