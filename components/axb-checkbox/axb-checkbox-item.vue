<template>
	<view class="radio" :class="{'radio-width-default':widthDefault}" :style="checked?activeStyle :itemStyle" @click="handleChange">
		{{name}}
	</view>
</template>

<script>
	/**
	 * 防抖
	 * @param {*} fun 
	 * @param {*} delay 
	 * @param {*} immediate 
	 */
	const debounce = function(fun, delay, immediate) {
		var timer, lasttime, context, arg
		var later = function() {
			var now = new Date().getTime(),
				l = now - lasttime
			if (l < delay && l >= 0) {
				clearTimeout(timer)
				timer = setTimeout(later, delay - l)
			} else {
				clearTimeout(timer)
				timer = null
				if (!immediate) {
					fun.apply(context, arg)
					if (!timer) context = arg = null
				}
			}
		}
		return function() {
			context = this
			arg = arguments
			lasttime = new Date().getTime()
			var callNow = immediate && !timer
			if (!timer) timer = setTimeout(later, delay)
			if (callNow) {
				fun.apply(context, arg)
				context = arg = null
			}
		}
	}
	export default {
		props: {
			name: {
				type: String,
				default: ''
			},
			value: {
				default: null,
			},
			index: {
				default: null,
			},
			checked: {
				type: [Boolean, Number],
				default: false
			},
		},
		computed: {
			widthDefault() {
				return this.name.length <= 3
			},
			activeStyle() {
				return `background: #ffaa00;color: #ffffff;border-color: #c8c8c2;`
			},
			itemStyle() {
				return `background: #ffffff;color: #7d7d7d;`
			}
		},
		data() {
			return {

			};
		},
		methods: {
			handleChange: debounce(handleChange, 200, true)
		}
	}

	function handleChange() {
		this.$emit('change', {
			value: this.value,
			index: this.index
		})
	}
</script>

<style>
	.radio {
		display: inline-block;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 22rpx;
		border-radius: 10rpx;
		font-size: 26rpx;
		box-sizing: border-box;
		border: 1px solid #c3c3c3;
		margin-right: 25rpx;
		margin-bottom: 24rpx;
	}

	.radio:not(:last-child) {
		margin: 0 20rpx 30rpx 0;
	}


	.radio-width-default {
		width: 120rpx;
		text-align: center;
		padding: 0;
	}
</style>
