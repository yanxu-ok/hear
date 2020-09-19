export const tabBarList = [{
		text: '首页',
		isDot: true,
		customIcon: false,
		iconPath: "/static/tabbar/jia.png",
		selectedIconPath: "/static/tabbar/selectjia.png",
		pagePath: "/pages/tabbar/home/index"
	},
	{
		text: '互听',
		customIcon: true,
		iconPath: "/static/tabbar/huting.png",
		selectedIconPath: "/static/tabbar/selecthuting.png",
		pagePath: '/pages/tabbar/listen/index'
	},
	{
		customIcon: false,
		midButton: true
	},
	{
		text: '圈子',
		customIcon: true,
		iconPath: "/static/tabbar/quanzi.png",
		selectedIconPath: "/static/tabbar/selectquanzi.png",
		pagePath: '/pages/tabbar/circle/index'
	},
	{
		text: '我的',
		customIcon: true,
		iconPath: "/static/tabbar/wode.png",
		selectedIconPath: "/static/tabbar/selectwode.png",
		pagePath: '/pages/tabbar/my/index'
	}
]
