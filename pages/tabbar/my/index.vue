<template>
	<view class="my_contain">
		<view class="my_img">
			<view :style="{background:'url(' + userInfo.avatar + ') 0 / cover'}" class="my_img_1"></view>
			<view class="my_header">
				<view>
					<view class="my_header_name" @tap="handleAgou">{{userInfo.nickName}}</view>
					<view class="my_header_desc" @tap="handleBiaoqian">{{userInfo.userDescribe | titleFilter(39)}}</view>
					<view class="my_guanzhu">
						<view @tap="handleClick(0)">
							<view class="fensi">{{fensiCount}}</view>
							<view class="fensi_name">粉丝</view>
						</view>
						<view @tap="handleClick(1)">
							<view class="fensi">{{guanzhuCount}}</view>
							<view class="fensi_name">关注</view>
						</view>
						<view @tap="handleClick(2)">
							<view class="fensi">{{zuoPinCount}}</view>
							<view class="fensi_name">作品</view>
						</view>
					</view>
				</view>
				<view style="width: 171rpx;height: 171rpx;">
					<u-image width="171rpx" height="171rpx" :src="userInfo.avatar" shape="circle" style="margin-top: 30rpx;" @click="handleImg"></u-image>
				</view>
			</view>
			<view class="vip" @tap="handleHuiyuan">
				<view>
					<u-image width="95rpx" height="31rpx" src="@/static/my/vip.png"></u-image>
					<view style="font-size:20rpx;
font-family:PingFang SC;
font-weight:300;
color:rgba(255,255,255,1);">开通会员享受全场尽情阅读！</view>
				</view>
				<view class="vip_xufei">
					续费
				</view>
			</view>
		</view>


		<view class="my_caozuo">
			<view class="my_caozuo_div" @tap="handleMyClick(0)">
				<u-image width="40rpx" height="39rpx" src="@/static/my/zhuye.png"></u-image>
				<view class="my_caozuo_text">个人主页</view>
			</view>
			<view class="my_caozuo_div" @tap="handleMyClick(1)">
				<u-image width="38rpx" height="39rpx" src="@/static/my/lishi.png"></u-image>
				<view class="my_caozuo_text">历史记录</view>
			</view>
			<view class="my_caozuo_div" @tap="handleMyClick(2)">
				<u-image width="41rpx" height="38rpx" src="@/static/my/pinglun.png"></u-image>
				<view class="my_caozuo_text">评论</view>
			</view>
			<view class="my_caozuo_div" @tap="handleMyClick(3)">
				<u-image width="41rpx" height="40rpx" src="@/static/my/shezhi.png"></u-image>
				<view class="my_caozuo_text">设置</view>
			</view>
		</view>

		<view style="display: flex;">
			<view class="my_shoucang" :class="{on:shudanIndex==index}" v-for="(item,index) in shudanList" :key="index" @tap="handle(index)">{{item}}</view>
		</view>

		<view class="shudan_content" v-if="showShudan">
			<template v-for="(item,index) in bodanList">
				<block :key="index">
					<shudan :titleWidth="width" :size="size" type="bodan" :length="9" :count="item.chapterCount" :title="item.topicName"
					 :item="item" :image="item.topicImage" @handleClickList="handleClickList"></shudan>
				</block>
			</template>
			<view class="addshudan" @tap="handleAddshudan">
				<u-image width="120rpx" height="120rpx" src=""></u-image>
				<view class="addshudan_text">创建播单</view>
			</view>
		</view>

		<view class="shudan_content" v-else>
			<template v-for="(item,index) in zhuantiList">
				<block :key="index">
					<shudan :titleWidth="width" :size="size" :length="9" type="zhuanti" :count="item.chapterCount" :item="item" :title="item.topicName"
					 :image="item.topicImage" @handleClickList="handleClickList"></shudan>
				</block>
			</template>
		</view>

		<biaoqian ref="biaoqian"></biaoqian>

		<tabbar :list="tabbarData" height="55px" :mid-button="true" inactive-color="#cbcedd" active-color="#fe9503"></tabbar>

	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	import biaoqian from './components/biaoqian.vue'
	import shudan from '@/components/u-shudan/u-shudan.vue'
	import tabbar from '@/components/u-tabbar/u-tabbar.vue'
	export default {
		components: {
			tabbar,
			shudan,
			biaoqian
		},
		data() {
			return {
				width: "165rpx",
				size: "28rpx",
				show: true,
				closeable: true,
				user: {},
				userInfo: [],
				fensiCount: 0, // 粉丝的数量
				guanzhuCount: 0, // 关注的数量
				zuoPinCount: 0, //作品的数量
				shudanList: ['创建播单', '收藏专题'],
				shudanIndex: 0,
				showShudan: true, // 书单控制,
				bodanList: [], // 播单
				zhuantiList: [] // 专题list
			}
		},
		onLoad() {
			this.get_user_msg({
				userId: 1,
				otherUserId: null
			}).then(res => {
				this.userInfo = res
				uni.setStorage({
					key: 'user',
					data: JSON.stringify(res),
					success: function() {
						// console.log('success');
					}
				});
				this.$refs.biaoqian.getBiaoqian()
				this.init() // 获取作品啥的
				this.getBodanList()
				this.getZhuanTiList()
			})
		},
		computed: {
			...mapState({
				tabbarData: state => state.system.tabBarList,
				// userInfo: state => state.my.userInfo
			})
		},
		methods: {
			...mapActions(['get_user_msg', 'get_focus_or_fans_count', 'get_user_topic_listen_count', 'get_user_play_single',
				'get_user_collect'
			]),
			async init() {
				let guanzhuCount = await this.get_focus_or_fans_count({
					type: 1,
					userId: 1,
					otherUserId: null
				})
				this.guanzhuCount = guanzhuCount
				let fensiCount = await this.get_focus_or_fans_count({
					type: 2,
					userId: 1,
					otherUserId: null
				})
				this.fensiCount = fensiCount
				let zuoPinCount = await this.get_user_topic_listen_count()
				this.zuoPinCount = zuoPinCount
			},

			// 获取播单
			async getBodanList() {
				let data = {
					userAuthorId: this.userInfo.userId,
					topicType: 2,
					pageNum: null,
					pageSize: null,
					otherUserId: null
				}
				let result = await this.get_user_play_single(data)
				this.bodanList = result.list
			},

			// 获取专题
			async getZhuanTiList() {
				let data = {
					userId: 1,
					otherUserId: null
				}
				let result = await this.get_user_collect(data)
				this.zhuantiList = result.list
			},

			// 增加书单
			handleAddshudan() {
				uni.navigateTo({
					url: '/pages/shudan/shudan?userId=' + this.userInfo.userId
				})
			},

			// 点击播单/专题之后的事件
			handleClickList(item) {
				console.log(item);
				let str = item.type
				if (str == 'bodan') {
					uni.navigateTo({
						url: '/pages/listpage/listpage?name=播单列表&type=zj&topicId=' + item.item.topicId
					})
				} else {
					uni.navigateTo({
						url: '/pages/listpage/listpage?name=专题列表&type=zj&topicId=' + item.item.topicId
					})
				}
			},

			// 点击变色
			handle(index) {
				this.showShudan = !this.showShudan
				this.shudanIndex = index
			},

			handleClick(index) {
				if (index == 0) {
					uni.navigateTo({
						url: '/pagesA/guanzhu/guanzhu?index=' + index
					})
				} else if (index == 1) {
					uni.navigateTo({
						url: '/pagesA/guanzhu/guanzhu?index=' + index
					})
				} else {
					// console.log(1);
					uni.navigateTo({
						url: '/pagesA/zuopin/zuopin?name=' + "我的作品"
					})
				}
			},
			
			handleMyClick(index) {
				console.log(this.userInfo);
				if (index == 0) {
					uni.navigateTo({
						url: '/pagesA/myindex/myindex?priv=' + this.userInfo.userRole + '&userId=' + this.userInfo.userId
					})
				} else if (index == 1) {
					uni.navigateTo({
						url: '/pages/listpage/listpage?name=' + "播放历史" + '&type=lishi'
					})
				} else if (index == 2) {

				} else if (index == 3) {

				}
			},

			handleImg() {
				uni.navigateTo({
					url: '/pages/myinfo/myinfo'
				})
			},

			handleHuiyuan() {
				uni.navigateTo({
					url: '/pagesA/huiyuan/huiyuan'
				})
			},

			handleAgou() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>
<style lang="scss">
	.baoliu {
		height: var(--status-bar-height);
		z-index: 999;
	}

	.my_contain {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;

		& .my_img {
			height: 500rpx;
			// background-color: #eff3f6;
			padding-top: 70rpx;
			position: relative;
		}

		& .my_img_1 {
			content: '';
			z-index: -1;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			filter: blur(40rpx);
			margin: -10px;
		}
	}

	.my_header {
		display: flex;
		justify-content: space-between;
		margin: 0 45rpx;

		& .my_header_img {
			width: 100%;
		}

		& .my_header_name {
			font-size: 42rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}

		& .my_header_desc {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			margin-top: 27rpx;
			color: #EEEEEE;
		}

		& .my_guanzhu {
			display: flex;
			margin-top: 50rpx;
			justify-content: space-between;
			text-align: center;
		}

		& .fensi {
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}

		& .fensi_name {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #EEEEEE;
		}
	}

	.vip {
		position: absolute;
		bottom: 0;
		width: 663rpx;
		height: 137rpx;
		margin: 0 auto;
		background: black;
		left: 44rpx;
		border-radius: 20px 20px 0px 0px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 44rpx;
		padding-right: 38rpx;

		& .vip_xufei {
			width: 157rpx;
			height: 57rpx;
			background: #fe8c01;
			border-radius: 30rpx;
			text-align: center;
			line-height: 57rpx;
		}
	}

	.my_caozuo {
		display: flex;
		padding: 0 79rpx 0 55rpx;
		margin-top: 84rpx;
		justify-content: space-between;

		& .my_caozuo_div {
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		& .my_caozuo_text {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			margin-top: 10rpx;
		}
	}

	.my_shoucang {
		margin-left: 45rpx;
		margin-top: 30rpx;
		font-size: 36rpx;
		font-family: PingFang SC;
	}

	.on {
		color: rgba(51, 51, 51, 1);
		font-weight: bold;
	}

	.shudan_content {
		display: flex;
		flex-wrap: wrap;
		margin-top: 20rpx;

		& .addshudan {
			display: flex;
			align-items: center;
			margin-left: 30rpx;

			& .addshudan_text {
				margin-left: 19rpx;
			}
		}
	}
</style>
