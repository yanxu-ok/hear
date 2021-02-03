<template>
	<view class="my_contain">
		<view class="my_contain_beijing">
			<view class="baoliu"></view>
			<view class="my_contain_touxiang">
				<view style="display: flex;flex-direction: column;width: 490rpx;">
					<view class="my_header_name">{{userInfo ? userInfo.nickName : ''}}</view>
					<view class="my_header_desc">{{userInfo ? userInfo.userSignature  : '' | titleFilter(39)}}</view>
				</view>
				<view style="width: 171rpx;height: 171rpx;position: relative">
					<u-image width="171rpx" height="171rpx" :src="userInfo ? userInfo.avatar : '' " shape="circle" @click="handleImg"
					 style="box-shadow:0 0 3px #AAA;"></u-image>
					<image src="https://img11.iqilu.com/29/2020/09/30/8ecaa8cc16e40e34b802a141c70581fc.png" class="my_contain_touxiang_edit"></image>
				</view>
			</view>
			<view class="my_guanzhu">
				<view @tap="handleClick(0)">
					<view class="fensi">{{fensiCount | numFormat}}</view>
					<view class="fensi_name">粉丝</view>
				</view>
				<view @tap="handleClick(1)" style="margin-left: 100rpx;">
					<view class="fensi">{{guanzhuCount | numFormat}}</view>
					<view class="fensi_name">关注</view>
				</view>
				<view @tap="handleClick(2)" v-if="userInfo && userInfo.userRole != 3" style="margin-left: 100rpx;">
					<view class="fensi">{{zuoPinCount | numFormat}}</view>
					<view class="fensi_name">作品</view>
				</view>
			</view>
			<view class="vip" @tap="handleHuiyuan">
				<view>
					<u-image width="95rpx" height="31rpx" src="https://img11.iqilu.com/29/2020/09/30/6ed81101591c4737a6fa9749c754e956.png"></u-image>
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
				<u-image width="40rpx" height="39rpx" src="https://img11.iqilu.com/29/2020/09/30/165d14daecc7887c34d6ef5d7d5a8bf9.png"></u-image>
				<view class="my_caozuo_text">{{userInfo && userInfo.userRole != 3 ? '个人主页' : '机构主页' }}</view>
			</view>
			<view class="my_caozuo_div" @tap="handleMyClick(1)">
				<u-image width="38rpx" height="39rpx" src="https://img11.iqilu.com/29/2020/09/30/8d10cc5cb304942b01bd0295313a2375.png"></u-image>
				<view class="my_caozuo_text">历史记录</view>
			</view>
			<view class="my_caozuo_div" @tap="handleMyClick(2)">
				<u-image width="41rpx" height="38rpx" src="https://img11.iqilu.com/29/2020/09/30/864cbcbf21bb19aaf789d6027ae2f0af.png"></u-image>
				<view class="my_caozuo_text">评论</view>
			</view>
			<view class="my_caozuo_div" @tap="handleMyClick(3)">
				<u-image width="41rpx" height="40rpx" src="https://img11.iqilu.com/29/2020/09/30/7caf8e1683c7c5921563db2aa4006046.png"></u-image>
				<view class="my_caozuo_text">设置</view>
			</view>
		</view>

		<view style="height: 900rpx;display: flex;flex-direction: column;">

			<view style="display: flex;margin-top: 84rpx;">
				<view class="my_shoucang" :class="{on:shudanIndex==index}" v-for="(item,index) in shudanList" :key="index" @tap="handle(index)">{{item}}</view>
			</view>

			<!-- <scroll-view scroll-y="true" style="flex: 1;margin-top: 34rpx;overflow: hidden;"> -->
			<mescroll-uni ref="mescrollRef" :fixed="false" @init="mescrollInit" :bottombar="true" @down="downCallback" @up="upCallback"
			 :down="downOption" :up="upOption" style="flex: 1;margin-top: 34rpx; overflow: auto;">
				<view class="shudan_content" v-if="showShudan">
					<template v-for="(item,index) in dataList">
						<block :key="index">
							<shudan width="165rpx" :titleWidth="width" :size="size" type="bodan" :length="9" :count="item.chapterCount"
							 :title="item.topicName" :item="item" bottom="30rpx" :image="item.topicImage" @handleClickList="handleClickList"></shudan>
						</block>
					</template>
					<view class="addshudan" @tap="handleAddshudan">
						<u-image width="110rpx" height="110rpx" src="https://img11.iqilu.com/29/2020/09/30/e93598c3cca6ff11ba00c107b86ff1fa.png"
						 border-radius="10rpx"></u-image>
						<view class="addshudan_text">创建播单</view>
					</view>
				</view>

				<view class="shudan_content" v-else>
					<template v-for="(item,index) in dataList">
						<block :key="index">
							<shudan width="165rpx" :titleWidth="width" :size="size" :length="9" type="zhuanti" :count="item.chapterCount"
							 :item="item" :title="item.topicName" bottom="35rpx" :image="item.topicImage" @handleClickList="handleClickList"></shudan>
						</block>
					</template>
				</view>
				<!-- </scroll-view> -->
			</mescroll-uni>

		</view>

		<biaoqian ref="biaoqian"></biaoqian>

		<tabbar :list="tabbarData" height="55px" :before-switch="beforeSwitch" :mid-button="true" inactive-color="#cbcedd"
		 active-color="#fe9503" :border-top="true"></tabbar>

	</view>
</template>

<script>
	// #ifdef H5
	import {
		WebBridgeApi
	} from "ijsbridge"
	// #endif
	import {
		isLogin,
		getCurrectStorg,
		isApp
	} from '@/libs/hear-util/index.js'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	import config from '@/libs/config/baseUrl.js'
	import {
		mapActions,
		mapState
	} from 'vuex'
	import biaoqian from './components/biaoqian.vue'
	import shudan from '@/components/u-shudan/u-shudan.vue'
	import tabbar from '@/components/u-tabbar/u-tabbar.vue'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		components: {
			tabbar,
			shudan,
			biaoqian,
			MescrollUni
		},
		data() {
			return {
				width: "165rpx",
				size: "28rpx",
				show: true,
				closeable: true,
				user: {},
				userInfo: null,
				fensiCount: 0, // 粉丝的数量
				guanzhuCount: 0, // 关注的数量
				zuoPinCount: 0, //作品的数量
				shudanList: ['个人播单', '收藏专题'],
				shudanIndex: 0,
				showShudan: true, // 书单控制,
				bodanList: [], // 播单
				zhuantiList: [], // 专题list，
				downOption: {
					auto: false
				},
				// 上拉加载的配置(可选)
				upOption: {
					auto: false
				},
				// pageNum: 1,
				// pageSize: 10,
				dataList: [], // 数据,
				canReset: false,
				token: ''
			}
		},

		computed: {
			...mapState({
				tabbarData: state => state.system.tabBarList,
				// userInfo: state => state.my.userInfo
			})
		},
		
		onLoad() {
			// 判断用户是否登录
			if(!isLogin()){
				uni.switchTab({
					url:'/pages/tabbar/home/index'
				})
				return;
			}
		},
		
		async onShow() {
		
			// console.11
			// 判断用户是否是第一次登录
			let count = await this.get_user_count()

			let res = await this.get_user_msg({
				otherUserId: null
			})

			this.userInfo = res
			uni.setStorageSync('user', JSON.stringify(res));

			console.log(count, '用户登录的次数');
			
			if (count == 0) {
				this.$refs.biaoqian.show = true
				this.$refs.biaoqian.getBiaoqian() // tan
			} else {
				// return;
			}

			this.init() // 获取作品啥的
			this.downCallback()
			// this.getZhuanTiList()
			this.canReset && this.downCallback()
			this.canReset = true
		},

		methods: {

			beforeSwitch(index) {
				let isLog = isLogin() // 判断用户是否登录
				if (index == 3) {
					if (!isLog) {
						console.log(1);
						uni.navigateTo({
							url: '/pages/login/login'
						})
						return false;
					}
					// #ifdef H5
					if (isApp() == 'chuangqi') {
						WebBridgeApi.router({
							route: 'webapp',
							params: {
								url: config.circle + '/#/?platformKey=ec3ef837337542bab1bbb31584be3047&token=' + getCurrectStorg('token') +
									'&hearEnv=ok&orgId=' + config.orgid
							}
						})
						// .then(({
						// 	err,
						// 	result
						// }) => {
						// 	console.log("测试桥返回结果authorize", result, err);
						// });
						return false;
					}
					// #endif
					else {
						return true
					}
				} else if (index == 4) {
					if (!isLog) {
						console.log(1);
						uni.navigateTo({
							url: '/pages/login/login'
						})
						return false;
					} else {
						return true
					}
				} else {
					return true
				}
			},

			...mapActions(['get_user_msg', 'get_focus_or_fans_count', 'get_user_topic_listen_count', 'get_user_play_single',
				'get_user_collect', 'get_user_count', 'c_get_user_msg'
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
					// userAuthorId: this.userInfo.userId,
					topicType: 2,
					pageNum: null,
					pageSize: null,
					otherUserId: this.userInfo.userId
				}
				let result = await this.get_user_play_single(data)
				this.bodanList = result
			},

			// 获取专题
			async getZhuanTiList() {
				let data = {
					// userId: 1,
					otherUserId: this.userInfo.userId
				}
				let result = await this.get_user_collect(data)
				this.zhuantiList = result.list
			},

			/*下拉刷新的回调*/
			async downCallback() {

				// if (!this.userInfo) {
				// 	this.mescroll.endSuccess()
				// }
				this.mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				// 下拉刷新什么也不处理, 可直接调用或者延时一会调用 mescroll.endSuccess() 结束即可

			},

			/*上拉加载的回调*/
			async upCallback(page) {
				// let pageNum = page.num; // 页码, 默认从1开始
				// let pageSize = page.size; // 页长, 默认每页10条
				let result = await this.ifType(page)
				let curPageData = result.list; //接口返回的当前页数据列表 (数组)
				let curPageLen = result.list.length; //// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
				let totalPage = result.pages; // 接口返回的总页数
				let totalSize = result.total; //  接口返回的总数据量

				//设置列表数据
				if (page.num == 1) this.dataList = []; //如果是第一页需手动置空列表
				this.dataList = this.dataList.concat(curPageData); //追加新数据
				this.mescroll.endByPage(curPageLen, totalPage);
			},

			async ifType(page) {
				if (this.shudanIndex == 0) {
					let data = {
						topicType: 2,
						pageNum: page.num,
						pageSize: page.size,
						otherUserId: this.userInfo.userId
					}
					let result = await this.get_user_play_single(data)
					return result
				} else {
					let data = {
						// userId: 1,
						otherUserId: this.userInfo.userId
					}
					let result = await this.get_user_collect(data)
					return result
				}
			},

			// 增加书单
			handleAddshudan() {
				let isLog = isLogin()
				if (!isLog) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
				uni.navigateTo({
					url: '/pagesD/shudan/shudan?userId=' + this.userInfo.userId
				})
			},

			// 点击播单/专题之后的事件 
			handleClickList(item) {
				let isLog = isLogin()
				if (!isLog) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
				let str = item.type
				if (str == 'bodan') {
					if (item.item.chapterCount == 0) {
						uni.showToast({
							title: '下面没有内容哦',
							icon: 'none'
						})
						return;
					}
					uni.navigateTo({
						url: '/pagesD/list_page_zhang/list_page_zhang?name=播单列表&type=zj&topicId=' + item.item.topicId
					})
				} else {
					uni.navigateTo({
						url: '/pagesA/topic-list-page/topic-list-page?topicId=' + item.item.topicId + '&authorId=' + item.item.userAuthorId
					})
				}
			},

			// 点击变色
			handle(index) {
				let isLog = isLogin()
				if (!isLog) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
				this.showShudan = !this.showShudan
				this.shudanIndex = index

				this.downCallback()
			},

			handleClick(index) {
				let isLog = isLogin()
				if (!isLog) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
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
				let isLog = isLogin()
				if (!isLog) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
				if (index == 0) {
					uni.navigateTo({
						url: '/pagesA/myindex/myindex?priv=' + this.userInfo.userRole + '&userId=' + this.userInfo.userId
					})
				} else if (index == 1) {
					uni.navigateTo({
						url: '/pagesD/listpage/listpage?name=' + "播放历史" + '&type=lishi'
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: '/pagesC/my_comment/my_comment'
					})

				} else if (index == 3) {
					uni.navigateTo({
						url: '/pagesB/setup/setup'
					})
				}
			},

			handleImg() {
				let isLog = isLogin()
				if (!isLog) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
				uni.navigateTo({
					url: '/pagesB/myinfo/myinfo'
				})
			},

			handleHuiyuan() {
				let isLog = isLogin()
				if (!isLog) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return;
				}
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
		display: flex;
		flex-direction: column;

		& .my_contain_beijing {
			height: 579rpx;
			background: url('https://img11.iqilu.com/29/2020/09/30/5d25e1c2058bc20cf458c93e3b136ee4.png');
			position: relative;
			width: 100%;
		}

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

	.my_contain_touxiang {
		display: flex;
		margin-top: 90rpx;
		padding: 0 46rpx 0 45rpx;

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
			color: #9A9A9A;
			margin-top: 27rpx;
		}

		& .my_contain_touxiang_edit {
			width: 53rpx;
			height: 53rpx;
			position: absolute;
			right: 0;
			bottom: 0;
		}
	}

	.my_guanzhu {
		display: flex;
		margin-top: 12rpx;
		justify-content: flex-start;
		text-align: center;
		width: 400rpx;
		margin-left: 45rpx;

		& .fensi {
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #343434;
		}

		& .fensi_name {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #9A9A9A;
			margin-top: 4rpx;
		}
	}

	.my_header {
		display: flex;
		justify-content: space-between;
		margin: 0 45rpx;

		& .my_header_img {
			width: 100%;
		}
	}

	.vip {
		width: 663rpx;
		height: 137rpx;
		background: black;
		border-radius: 20px 20px 0px 0px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 40rpx 38rpx 30rpx 43px;
		margin-top: 83rpx;
		margin: 83rpx auto 0 auto;

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
		margin-top: 84rpx;
		justify-content: space-between;
		padding: 0 79rpx 0 55rpx;
		height: 82rpx;

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
		font-size: 36rpx;
		font-family: PingFang SC;
		color: #9A9A9A;
	}

	.on {
		color: #343434;
		font-weight: bold;
	}

	.shudan_content {
		display: flex;
		flex-wrap: wrap;
		padding: 0 0 0 44rpx;
		// height: 100%;

		& .addshudan {
			display: flex;
			align-items: center;
			margin-bottom: 30rpx;

			& .addshudan_text {
				margin-left: 19rpx;
			}
		}
	}

	.baoliu {
		height: var(--status-bar-height);
	}
</style>
