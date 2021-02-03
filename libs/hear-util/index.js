// 传进一个数组    返回一个 新的数组
export const changeArr = (arr) => {
	let newArr = []

	arr.forEach((item, index) => {
		item.image = item.bannerImage
	})
	return arr
}

// 将 数据放入缓存中
export const setCurrectStorg = (key, value) => {
	uni.setStorageSync(key, value);
}


// 获取缓存
export const getCurrectStorg = (key) => {
	const value = uni.getStorageSync(key);
	return value
	// return new Promise((resolve,reject)=>{
	// 	uni.getStorage({
	// 	    key,
	// 	    success: function (res) {
	// 	        console.log(res.data);
	// 					resolve(res.data)
	// 	    }
	// 	});
	// })
}

export const getCurrect = (key) => {
	// const value = uni.getStorageSync(key);
	return new Promise((resolve,reject)=>{
		uni.getStorage({
		    key,
		    success: function (res) {
		        console.log(res.data);
						resolve(res.data)
		    }
		});
	})
}

// 清楚缓存
export const cleanStorg = () => {
	// const value = uni.getStorageSync(key);
	uni.clearStorageSync();
	// return value
}


// 格式化年月日
export const formatDate = (key, value) => {
	// var _d = new Date("2018/01/01 00:00:00");
	var _d = new Date(key);
	_d = new Date(_d.valueOf() + value * 1000); // 当前时间加上1分钟
	var _d_year111 = _d.getFullYear(); //年
	var _d_month111 = _d.getMonth() + 1; //月        
	_d_month111 = (_d_month111 < 10 ? "0" + _d_month111 : _d_month111);
	var _d_day111 = _d.getDate(); //日
	_d_day111 = (_d_day111 < 10 ? "0" + _d_day111 : _d_day111);
	var _d_hours111 = _d.getHours();
	var _d_minutes111 = _d.getMinutes();
	var _d_seconds111 = _d.getSeconds();
	if (_d_hours111 < 10) _d_hours111 = "0" + _d_hours111;
	if (_d_minutes111 < 10) _d_minutes111 = "0" + _d_minutes111;
	if (_d_seconds111 < 10) _d_seconds111 = "0" + _d_seconds111;

	var _data = _d_hours111 + ":" + _d_minutes111 + ":" + _d_seconds111;
	return _data
}

// 判断是否是在创奇中
export const isApp = () => {
	if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
		return 'weixin'
	} else if (navigator.userAgent.toLowerCase().indexOf("chuangqi") != -1) {
		return 'chuangqi'
	} else {
		return 'web'
	}
}

export const nowTimeStr = () => {
	var str, colorhead, colorfoot;

	var yy = objD.getYear();

	if (yy < 1900) yy = yy + 1900;
	var MM = objD.getMonth() + 1;

	if (MM < 10) MM = '0' + MM;
	var dd = objD.getDate();

	if (dd < 10) dd = '0' + dd;
	var hh = objD.getHours();

	if (hh < 10) hh = '0' + hh;
	var mm = objD.getMinutes();

	if (mm < 10) mm = '0' + mm;
	var ss = objD.getSeconds();

	if (ss < 10) ss = '0' + ss;
	var ww = objD.getDay();

	if (ww == 0) colorhead = "";

	if (ww > 0 && ww < 7) colorhead = "";

	str = colorhead + yy + "年" + MM + "月" + dd + "日   " + hh + ":" + mm + ":" + ss + " ";

	return (str);
}

/**
 * 将秒转换为 分:秒
 * s int 秒数
 */
export const s_to_hs = (s) => {
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
}

// 判断是否登录
export const isLogin = () => {
	const token = uni.getStorageSync('token');
	if (!token) {
		return false
	} else
		return true
}

// 获取设备高度
export const getScreenHeight = () => {
	let height = uni.getSystemInfoSync().windowHeight
	// console.log(height);
	return height
}

// 获取状态栏和导航栏高度
export const getStatusBarHeight = () => {
	const res = uni.getSystemInfoSync()
	// console.log(res);
	const system = res.platform
	// #ifdef H5
	return 88
	// #endif
	// #ifdef MP-WEIXIN
	return 88 + res.statusBarHeight
	// #endif
}

// 两个数组取差集和交集
export const arrChaji = (arr2, arr1) => {
	let arr3 = []
	arr1.map((item1) => {
		arr2.map((item2) => {
			if (item1.categoryId == item2.categoryId) {
				//添加属性用来标记相同的对象
				item1.isRepeat = true;
			}
		})
	});
	arr1.map((item) => {
		//通过标记筛选对象
		if (!item.isRepeat) {
			arr3.push(item);
		}
	});
	// console.log(arr3, 'aaa');
	return arr3
}
