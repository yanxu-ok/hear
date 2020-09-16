<script>
	import {
		mapActions,
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// this.$audio.onTimeUpdate(() => {
			// 	// console.log('-->', this.info.src == this.$store.state.app.playinfo.src);
			// 	console.log('正在将当前进度存到当前的vuex中','互听保存当前的进度');
			// 	// if (this.info.src == this.$store.state.app.playinfo.src) {
			// 		// this.current = this.format(this.$audio.currentTime);
			// 		// this.current_value = this.$audio.currentTime;
			// 		this.saveplay('current', this.format(this.$audio.currentTime));
			// 		this.saveplay('current_value', this.$audio.currentTime);
			// 		// this.duration = this.format(this.$audio.duration);
			// 		// this.duration_value = this.$audio.duration;
			// 		this.saveplay('duration', this.format(this.$audio.duration));
			// 		this.saveplay('duration_value', this.$audio.duratio);
			// 	// }
			// });
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
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
			// },
			// saveplay(type, e) {
			// 	//记录播放信息
			// 	this.$store.commit('setplay', {
			// 		[type]: e
			// 	});
			// },
		},
	}
</script>


<style lang="scss">
	@import './static/iconfont.css';
	@import "./index.scss";
</style>
