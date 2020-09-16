<template>
	<view class="search_flex">
		<u-navbar title="搜索" background="" title-color="#000000" back-icon-color="#000000">
		</u-navbar>
		<scroll-view style="height: 1200rpx;" scroll-y>
			<view class="s_contain">
				<view class="search-box" style="margin-left: 30rpx;">
					<!-- 原样式 如果使用原样式，恢复下方注销代码 -->
					<!-- 		<view class="input-box">
				<input type="text" :adjust-position="true" :placeholder="defaultKeyword" @input="inputChange" v-model="keyword" @confirm="doSearch(false)"
				 placeholder-class="placeholder-class" confirm-type="search">
			</view>
			<view class="search-btn" @tap="doSearch(false)">搜索</view> -->
					<search :show-action="false" height="68" v-model="keyword" :animation="true"></search>
				</view>
				<view class="search-btn" v-if="!isShowKeywordList" @tap="doSearch(keyword)">搜索</view>
				<view class="search-btn" v-if="isShowKeywordList" @tap="doSearch()">取消</view>
			</view>
			<!--  -->
			<view class="search-keyword">
				<!-- 搜索结果 -->
				<searchTabsSwiper :keyword="keyword" :resultList="resultList" v-if="isShowKeywordList"></searchTabsSwiper>
				<scroll-view class="keyword-box" v-if="!isShowKeywordList" scroll-y>

					<view class="keyword-block" v-if="oldKeywordList.length>0">
						<view class="keyword-list-header">
							<view>历史搜索</view>
							<view>
								<u-image @tap="oldDelete" src=""></u-image>
							</view>
						</view>
						<view class="keyword">
							<view v-for="(keyword,index) in oldKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword | titleFilter(4)}}</view>
						</view>
					</view>

					<view class="keyword-block">
						<view class="keyword-list-header">
							<view>热门搜索</view>
							<view>
								<u-image @tap="hotToggle" src=""></u-image>
							</view>
						</view>
						<view class="keyword-hot" v-if="forbid==''">
							<view v-for="(keyword,index) in hotKeywordList" :key="index" @tap="doSearch(keyword.searchContent)" class="keyword_hot_view">
								<view class="keyword_hot_view_index">{{index+1}}.</view>
								<view style="margin-left: 40rpx;">{{keyword.searchContent | titleFilter(20) }}</view>
							</view>
						</view>
						<view class="hide-hot-tis" v-else>
							<view>当前搜热门搜索已隐藏</view>
						</view>
					</view>

				</scroll-view>
			</view>

		</scroll-view>
	</view>
</template>

<script>
	//引用mSearch组件，如不需要删除即可
	import search from '@/components/u-search/u-search.vue'
	import searchTabsSwiper from './components/searchTabsSwiper.vue'
	import {
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				defaultKeyword: "",
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				keywordList: [],
				forbid: '',
				isShowKeywordList: false,
				resultList: [] // 查询后的分类
			}
		},
		onLoad() {
			this.init();
		},
		components: {
			search,
			searchTabsSwiper
		},
		methods: {
			...mapActions(['get_search_rank', 'get_search_category','category']),
			async init() {
				this.loadDefaultKeyword();
				this.loadOldKeyword();
				this.loadHotKeyword();
			},
			blur() {
				uni.hideKeyboard()
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				this.defaultKeyword = "默认关键字";
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},
			//加载热门搜索
			async loadHotKeyword() {
				//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
				let result = await this.get_search_rank()
				this.hotKeywordList = result
			},
			//监听输入
			inputChange(event) {
				//兼容引入组件时传入参数情况
				var keyword = event.detail ? event.detail.value : event;
				if (!keyword) {
					this.keywordList = [];
					this.isShowKeywordList = false;
					return;
				}
				this.isShowKeywordList = true;
				//以下示例截取淘宝的关键字，请替换成你的接口
				uni.request({
					url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + keyword, //仅为示例
					success: (res) => {
						this.keywordList = [];
						this.keywordList = this.drawCorrelativeKeyword(res.data.result, keyword);
					}
				});
			},
			//高亮关键字
			drawCorrelativeKeyword(keywords, keyword) {
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i];
					//定义高亮#9f9f9f
					var html = row[0].replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row[0],
						htmlStr: html
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//顶置关键字
			setKeyword(index) {
				this.keyword = this.keywordList[index].keyword;
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},

			//执行搜索
			async doSearch(keyword) {
				if (this.isShowKeywordList) { // 点击取消
					this.isShowKeywordList = !this.isShowKeywordList
					return;
				}
				this.isShowKeywordList = !this.isShowKeywordList
				this.keyword = keyword
				// 调用模糊搜索
				this.resultList = await this.category()
				this.saveKeyword(keyword); //保存为历史 		
				// keyword = keyword.searchContent === false ? this.keyword : keyword.searchContent;

				//  else { // 跳到专题下面的playpage页面
				// 	this.keyword = keyword.searchContent;
				// 	this.saveKeyword(keyword); //保存为历史 	
				// }
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				if(!keyword){
					return;
				}
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			},
		}
	}
</script>
<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.s_contain {
		display: flex;
		align-items: center;
		margin-top: 27rpx;
	}

	.search-box {
		width: 586rpx;
	}

	.search-box .input-box {
		width: 85%;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.s_contain .search-btn {
		font-size: 32rpx;
		margin-left: 39rpx;
		color: #f8a11f;
	}


	.keyword-list-box {
		height: calc(100vh - 110rpx);
		padding-top: 10rpx;
		border-radius: 20rpx 20rpx 0 0;
		background-color: #fff;
	}

	.keyword-entry {
		width: 94%;
		height: 80rpx;
		margin: 0 3%;
		font-size: 30rpx;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1rpx #e7e7e7;
	}

	.keyword-entry image {
		width: 60rpx;
		height: 60rpx;
	}

	.keyword-entry .keyword-text,
	.keyword-entry .keyword-img {
		height: 80rpx;
		display: flex;
		align-items: center;
	}

	.keyword-entry .keyword-text {
		width: 90%;
	}

	.keyword-entry .keyword-img {
		width: 10%;
		justify-content: center;
	}

	.keyword-box {
		/* #ifdef H5 */
		margin-top: 60rpx;
		/* #endif */
		height: 1200rpx;
	}

	.keyword-box .keyword-block {
		padding: 10rpx 0;
	}

	.keyword-box .keyword-block .keyword-list-header {
		width: 94%;
		padding: 10rpx 3%;
		display: flex;
		justify-content: space-between;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: rgba(153, 153, 153, 1);
		opacity: 0.7;
	}

	.keyword-box .keyword-block .keyword-list-header image {
		width: 27rpx;
		height: 29rpx;
	}

	.keyword-box .keyword-block .keyword {
		width: 94%;
		padding: 3rpx 3%;
		display: flex;
		flex-flow: wrap;
		justify-content: flex-start;
	}

	.keyword-box .keyword-block .hide-hot-tis {
		display: flex;
		justify-content: center;
		font-size: 28rpx;
		color: #6b6b6b;
	}

	.keyword-box .keyword-block .keyword>view {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 16rpx;
		padding: 17rpx 20rpx;
		margin: 10rpx 20rpx 10rpx 0;
		height: 60rpx;
		font-size: 30rpx;
		background-color: rgb(242, 242, 242);
		color: #333333;
	}

	.keyword_hot_view {
		display: flex;
		padding: 3rpx 3%;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-bottom: 30rpx;
	}

	.keyword_hot_view_index {
		color: #999999;
	}
</style>
