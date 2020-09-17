<script>
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		data() {
			return {
				timer: null // 历史定时器
			}
		},
		methods: {
			...mapActions(['update_history']),
			// format(num) {
			// 	try {
			// 		return (
			// 			'0'.repeat(2 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(Math.floor(
			// 				num % 60)).length) + Math.floor(num % 60)
			// 		);
			// 	} catch (e) {
			// 		return (
			// 			'0'.repeat(3 - String(Math.floor(num / 60)).length) + Math.floor(num / 60) + ':' + '0'.repeat(2 - String(Math.floor(
			// 				num % 60)).length) + Math.floor(num % 60)
			// 		);
			// 	}
			// }

			//轮询定时器
			startHstoryTimer() {
				this.timer = setInterval(this.history, 4000)
			},

			// 清除定时器
			cleanHstoryTimer() {
				clearInterval(this.timer)
			},
			
			// 定时器
			async history() {
				// console.log(this.zhangjieList,this.currectPlayIndex,this.$audio.currentTime);
				if (this.type == 'zhangjie') { // 如果是章节播放的话 
					let data = {
						topicId: this.zhangjieList[this.currectPlayIndex].topicId,
						chapterId: this.zhangjieList[this.currectPlayIndex].chapterId,
						listenProgress: this.$audio.currentTime
					}
					let reult = await this.update_history(data)
					console.log('记录播放进度', reult);
				} else { // 互听播放
				 console.log(this.audioInfo,'互听、播放');
					let data = {
						topicId: this.audioInfo.articleId,
						chapterId: this.audioInfo.audioId,
						listenProgress: this.$audio.currentTime
					}
					let reult = await this.update_history(data)
					console.log('记录播放进度', reult);
				}
			}
		},
		computed: {
			...mapState({
				currectPlayIndex: state => state.play.currectPlayIndex,
				zhangjieList: state => state.play.zhangjieList,
				paused: state => state.app.paused, // 全局是否暂停,
				type: state => state.app.type, // 音频的状态,
				audioInfo: state => state.huting.audioInfo,
			}),
		},

		watch: {
			//  是否暂停
			paused(newvalue, oldvalue) {
				console.log(newvalue);
				newvalue ? this.cleanHstoryTimer() : this.startHstoryTimer()
			}
		},
		
	}
</script>


<style lang="scss">
	@import './static/iconfont.css';
	@import "./index.scss";
</style>
