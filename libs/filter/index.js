// import Vue from 'vue'

export const filter = (Vue) => {
	Vue.filter('titleFilter', function(value, length) {
		if (value && value.length > length) {
			return value.slice(0, length) + '...'
		} else {
			return value
		}
	})

	Vue.filter('s_to_hs', function(s) {
		//计算分钟
		//算法：将秒数除以60，然后下舍入，既得到分钟数
		var h;
		h = Math.floor(s / 60);
		//计算秒
		//算法：取得秒%60的余数，既得到秒数
		s = s % 60;
		//将变量转换为字符串
		h += '';
		s += '';
		//如果只有一位数，前面增加一个0
		h = (h.length == 1) ? '0' + h : h;
		s = (s.length == 1) ? '0' + s : s;
		return h + ':' + s;
	})

	Vue.filter('dateFormat', function(s) {
		if (s == 0) {
			return s + 1
		}
		//计算分钟
		//算法：将秒数除以60，然后下舍入，既得到分钟数
		//计算秒
		//算法：取得秒%60的余数，既得到秒数
		s = s / 60;
		// console.log(s);
		s++
		s = s + ''
		//将变量转换为字符串
		s = s.substring(0, s.indexOf(".") + 0)

		return s
	})


	Vue.filter('numFormat', function(value) {
		let newValue = ['', '', ''];
		let fr = 1000;
		const ad = 1;
		let num = 3;
		const fm = 1;
		while (value / fr >= 1) {
			fr *= 10;
			num += 1;
			// console.log('数字', value / fr, 'num:', num);
		}
		if (num <= 4) { // 千
			newValue[1] = '千';
			newValue[0] = parseInt(value / 1000) + '';
		} else if (num <= 8) { // 万

			const text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万';
			// tslint:disable-next-line:no-shadowed-variable
			const fm = '万' === text1 ? 10000 : 10000000;
			newValue[1] = text1;
			newValue[0] = (value / fm) + '';
			// console.log();
			newValue[0] = newValue[0].substring(0, newValue[0].indexOf(".") + 2)
		} else if (num <= 16) { // 亿
			let text1 = (num - 8) / 3 > 1 ? '千亿' : '亿';
			text1 = (num - 8) / 4 > 1 ? '万亿' : text1;
			text1 = (num - 8) / 7 > 1 ? '千万亿' : text1;
			// tslint:disable-next-line:no-shadowed-variable
			let fm = 1;
			if ('亿' === text1) {
				fm = 100000000;
			} else if ('千亿' === text1) {
				fm = 100000000000;
			} else if ('万亿' === text1) {
				fm = 1000000000000;
			} else if ('千万亿' === text1) {
				fm = 1000000000000000;
			}
			newValue[1] = text1;
			newValue[0] = parseInt(value / fm) + '';
		}
		if (value < 1000) {
			newValue[1] = '';
			newValue[0] = value + '';
		}
		return newValue.join('');
	})

}
