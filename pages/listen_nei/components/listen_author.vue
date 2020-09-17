<template>
	<view>
		<view class="wenzhang_contain">
			<view style="width: 88rpx;height: 90rpx;">
				<u-image width="88rpx" height="90rpx" :src="audioInfo ? audioInfo.avatar : '' " shape="circle" class="play_contain_right"></u-image>
			</view>
			<view style="margin-left: 21rpx;">
				<view class="wenzhang_contain_author">
					<view class="wenzhang_contain_author_name" @tap="handleGuanzhu">{{audioInfo ? audioInfo.nickName : '暂无作者名字'}}</view>
					<!-- <u-button :custom-style="customStyle" @tap="handleGuanzhu" type="error">{{isGuanzhu}}</u-button> -->
				</view>
				<view class="wenzhang_contain_author_text">文章作者</view>
			</view>
			<view style="margin-left: 90rpx;position: relative;" @tap="handleLuyin">
				<u-image width="196rpx" height="100rpx" src="@/static/listen/gendu.png">
				</u-image>
				<view style="display: flex; align-items: center;">
					<u-image width="27rpx" height="41rpx" src="@/static/listen/yuyin.png" style="position: absolute;bottom: 15px;left: 36rpx;"></u-image>
					<view class="wenzhang_contain_img">去跟读</view>
				</view>
			</view>
		</view>

		<!-- 	<view style="display: flex;">
			<u-image width="88rpx" shape="circle" height="90rpx" src="" class="play_contain_right" style="margin: 0 auto;"
			 @click="handleHuting"></u-image>
		</view> -->

		<!-- <u-popup v-model="luyin"  mode="bottom" border-radius="40" height="500rpx" :closeable="true" :mask='false' :mask-close-able="false">
			<luzhi></luzhi>
		</u-popup> -->

		<!-- <drawer ref="drawer-bottom" pos="bottom" standout="250rpx" width="750rpx" height="x-1200rpx" @overlayClicked="hide"> -->
		<drawer ref="drawer-bottom" pos="bottom" :standout="height" width="750rpx" height="x-500rpx" @overlayClicked="hide"
		 style="z-index: 10;">
			<view class="pb-body" style="z-index: 10000000;">
				<view class="pb-title">
					<view class="pb-title_header" style="z-index: 10000000;" @tap="hide"></view>
				</view>
				<luzhi></luzhi>
			</view>
		</drawer>


		<view>
			<!-- 模态框 -->
			<chunLei-modal  v-model="Shangchuan" :maskEnable="false" :mData="content" @onConfirm="handleConfirm" @cancel="handleQuxiao" navMask>
			</chunLei-modal>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations,
		mapGetters
	} from 'vuex'
	import {
		isApp
	} from '@/libs/hear-util/index.js'
	import drawer from '@/pages/playPage/components/myp-drawer.vue'
	import luzhi from './luzhi.vue'
	export default {
		components: {
			luzhi,
			drawer
		},
		data() {
			return {
				content: {
					title: '提示',
					content: '确定上传吗',
					cancelText: '取消',
					confirmColor: '#3CC51F'
				},
				customStyle: {
					width: '100rpx',
					height: '28.8rpx',
					fontSize: "14rpx",
					padding: '25rpx'
				},
				show: false,
				text: 'uni-app',
				max: 15,
				min: 1,
				mask: false,
				height: '0rpx',
				luyin: false,
				Shangchuan:false
			}
		},
		computed: {
			...mapState({
				audioInfo: state => state.huting.audioInfo,
				flag: state => state.huting.flag
			}),
			// ...mapGetters(['getFlag']),
			isGuanzhu() {
				return this.audioInfo.isFocus ? '已关注' : '关注'
			}
		},
		watch: {
			flag(newValue, oldValue) {
				this.Shangchuan = newValue
			}
		},
		created() {
			// #ifdef MP-WEIXIN
			uni.getSetting({
				success(res) {
					console.log(res)
				}
			})
			uni.authorize({
				scope: 'scope.record',
				success() {
					console.log(1, '获取用户授权成功');
				},

				fail() {
					console.log(2, "失败");
				}
			})
			// #endif

		},
		methods: {
			// handleHuting() {
			// 	uni.navigateTo({
			// 		url: '/pages/listen_nei/components/listen_huting'
			// 	})
			// },
			...mapMutations(['setAudioInfo', 'setAudioOrActicle', 'setType','setFlag','setVoicePath', 'setLocalId']),
			...mapActions(['insert_focus', 'delete_focus']),

			handleLuyin() {
				// #ifndef MP-WEIXIN
				// if (isApp() == 'web') {
					uni.showToast({
						title: 'h5暂时无法录制,请到小程序或微信中录制',
						icon: 'none'
					})
					// return;
				// }
				// #endif
				this.height = '500rpx'
				// this.luyin = true
			},

			hide() {
				this.height = '0rpx'
			},

			// 点击上传时触发
			handleConfirm() {
				let _this = this
				// #ifdef H5
				// if (isApp() == "weixin") {
				// 	uni.navigateTo({
				// 		url: '/pages/shangchuan/shangchuan?type=audio&isAudio=true'
				// 	})
				// } else {
				uni.navigateTo({
					url: '/pages/shangchuan/shangchuan?type=audio&isAudio=true'
				})
				// }
				// #endif

				// #ifdef MP-WEIXIN
				uni.navigateTo({
					url: '/pages/shangchuan/shangchuan?type=audio&isAudio=true'
				})
				// #endif
			},

			//点击取消之后做的
			handleQuxiao() {
				this.setVoicePath('') // 将录制的路径取消掉
				this.setLocalId(null)
				// console.log();
				this.setFlag(false)
			},


			// 关注
			async handleGuanzhu() {
				if (this.audioInfo.isFocus) { // 已关注 需要取消
					let result = await this.delete_focus(this.audioInfo.fansId)
					if (result.success) {
						let newObj = this.audioInfo
						newObj.isFocus = 0
						this.setAudioInfo(newObj)
						uni.showToast({
							title: "取消成功",
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: result.errmsg,
							icon: 'none'
						})
					}
				} else { // 需要关注
					let result = await this.insert_focus(this.audioInfo.userId)
					if (result.success) {
						let newObj = this.audioInfo
						newObj.isFocus = 1
						this.setAudioInfo(newObj)
						uni.showToast({
							title: "关注成功",
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: result.errmsg,
							icon: 'none'
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.wenzhang_contain {
		display: flex;
		align-items: center;
		padding: 0 34rpx 0 29rpx;
		margin-top: 30rpx;

		& .wenzhang_contain_author {
			display: flex;
			align-items: center;

			& .wenzhang_contain_author_name {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: rgba(255, 255, 255, 1);
				margin-right: 20rpx;
				width: 140rpx;
			}
		}

		& .wenzhang_contain_author_text {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
		}

		& .wenzhang_contain_img {
			position: absolute;
			bottom: 15px;
			right: 36rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}
	}

	.pb {
		&-title {
			width: 750rpx;
			height: 70rpx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			border-bottom-width: 1px;
			border-bottom-color: $myp-border-color-light;
			background-color: #FFFFFF;
			border-top-left-radius: 24rpx;
			border-top-right-radius: 24rpx;
		}

		&-body {
			width: 750rpx;
			height: 100%;
			background-color: #FFFFFF;
			flex-direction: column;
			align-items: center;
			position: relative;
		}
	}

	.pb-title_header {
		width: 72rpx;
		height: 8rpx;
		background: rgba(188, 186, 186, 1);
		border-radius: 4rpx;
	}
</style>
