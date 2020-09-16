export const tabBarList = [{
		text: '首页',
		isDot: true,
		customIcon: false,
		iconPath: "home-fill",
		selectedIconPath: "home-fill",
		pagePath: "/pages/tabbar/home/index"
	},
	{
		text: '互听',
		customIcon: true,
		iconPath: "tingshu",
		selectedIconPath: "tingshu",
		pagePath: '/pages/tabbar/listen/index'
	},
	{
		customIcon: false,
		midButton: true
	},
	{
		text: '圈子',
		customIcon: true,
		iconPath: "quanzi",
		selectedIconPath: "quanzi",
		pagePath: '/pages/tabbar/circle/index'
	},
	{
		text: '我的',
		customIcon: true,
		iconPath: "wode",
		selectedIconPath: "wode",
		pagePath: '/pages/tabbar/my/index'
	}
]
