(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pagesD-list_page_zhang-list_page_zhang"],{"0020":function(t,e,n){"use strict";n.r(e);var r=n("bfa2"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},"068f":function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.bodan[data-v-9cd806d4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;margin-bottom:%?30?%}.bodan .bodan_content_desc[data-v-9cd806d4]{margin-top:%?23?%;font-size:%?27?%;font-family:PingFang SC;font-weight:400;color:#999;width:%?550?%}.bodan .bodan_content_title[data-v-9cd806d4]{font-size:%?32?%;font-family:PingFang SC;font-weight:500;height:%?80?%;color:#333}.bodan .bodan_content_author[data-v-9cd806d4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;margin-top:%?10?%}.bodan .bodan_content_author .bodan_content_author_name[data-v-9cd806d4]{margin-left:%?10?%;color:#fac882}.bodan .bodan_content_author .bodan_content_author_count[data-v-9cd806d4]{margin-left:%?10?%;color:#999}.bodan_content[data-v-9cd806d4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:start;-webkit-justify-content:flex-start;justify-content:flex-start;margin-left:%?20?%;width:100%;margin-right:%?10?%}',""]),t.exports=e},1269:function(t,e,n){"use strict";n.r(e);var r=n("9af1"),i=n("e2db");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("8553");var o,s=n("f0c5"),u=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,"9cd806d4",null,!1,r["a"],o);e["default"]=u.exports},1974:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={props:{src:{type:String,default:""},avatar:{type:String,default:""},author:{type:String,default:"XXX"},title:{type:String,default:"暂无播单标题"},desc:{type:String,default:"自己的书单首次这里显示-编辑简介"},marginLeft:{type:String,default:"32rpx"},isShoucang:{type:Boolean,default:!1},buttonIsShow:{type:Boolean,default:!1}},data:function(){return{customStyle:{width:"114rpx",height:"48.5rpx",borderRadius:"40rpx",fontSize:"24rpx",color:"white",backgroundColor:"#f8a500",marginLeft:"0"}}},computed:{left:function(){return{"margin-left":this.marginLeft,width:"370rpx"}},isCollect:function(){return this.isShoucang?"已收藏":"+收藏"}},methods:{handleShoucang:function(){this.$emit("handleShoucang")},handleAvatar:function(){this.$emit("handleAvatar")}}};e.default=r},"232e":function(t,e,n){"use strict";n.r(e);var r=n("51ce"),i=n("511c");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("49cb");var o,s=n("f0c5"),u=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,"25bbd864",null,!1,r["a"],o);e["default"]=u.exports},26137:function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={data:function(){return{}},props:{list:{type:Array,default:function(){return[]}},leixing:{type:String,default:"zhubo"},length:{type:Number,default:10},desc:{type:Number,default:15}},methods:{handlePlay:function(t){this.$emit("handlePlay",t)}}};e.default=r},"2dc5":function(t,e,n){"use strict";n.r(e);var r=n("f621"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},"2f52":function(t,e,n){var r=n("6fc5");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("4f06").default;i("84d72660",r,!0,{sourceMap:!1,shadowMode:!1})},"36cb":function(t,e,n){"use strict";n.r(e);var r=n("fafc"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},"37f9":function(t,e,n){"use strict";var r=n("876e"),i=n.n(r);i.a},"40cb":function(t,e,n){var r=n("6510");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("4f06").default;i("a666a012",r,!0,{sourceMap:!1,shadowMode:!1})},"49cb":function(t,e,n){"use strict";var r=n("40cb"),i=n.n(r);i.a},"4ee7":function(t,e,n){"use strict";var r=n("f589"),i=n.n(r);i.a},"511c":function(t,e,n){"use strict";n.r(e);var r=n("1974"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},"51ce":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var r={uImage:n("8388").default,uButton:n("68ed").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"list_header"},[n("v-uni-view",{staticStyle:{width:"142rpx",height:"142rpx"}},[n("u-image",{attrs:{width:"142rpx",height:"142rpx",src:t.src,"border-radius":"10rpx"}})],1),n("v-uni-view",{staticStyle:{"margin-left":"32rpx",width:"370rpx"}},[n("v-uni-view",{staticClass:"title_bodan"},[t._v(t._s(t._f("titleFilter")(t.title,8)))]),n("v-uni-view",{staticStyle:{display:"flex","align-items":"center","margin-top":"20rpx","margin-bottom":"26rpx"}},[n("u-image",{attrs:{width:"41.8rpx",height:"41.8rpx",shape:"circle",src:t.avatar},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleAvatar.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"author_title_bodan"},[t._v(t._s(t._f("titleFilter")(t.author,8))+"创建")])],1)],1),t.buttonIsShow?[n("u-button",{staticStyle:{"margin-left":"0"},attrs:{"custom-style":t.customStyle,"hair-line":!1},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleShoucang.apply(void 0,arguments)}}},[t._v(t._s(t.isCollect))])]:t._e()],2)},a=[]},5502:function(t,e,n){"use strict";n.r(e);var r=n("d922"),i=n("2dc5");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("c431");var o,s=n("f0c5"),u=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,"bcb4a750",null,!1,r["a"],o);e["default"]=u.exports},"59d2":function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.list_page_content[data-v-19aaa252]{position:absolute;left:0;right:0;bottom:0;top:0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.list_page_content .search_c[data-v-19aaa252]{width:%?700?%}.list_page_content .bodan_beijing[data-v-19aaa252]{width:100%;height:%?350?%;padding-left:%?48?%;position:relative}.list_search_scroll[data-v-19aaa252]{height:%?1100?%;margin-top:%?48?%}',""]),t.exports=e},6510:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.list_header[data-v-25bbd864]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.list_header .title_bodan[data-v-25bbd864]{font-size:%?36?%;color:#fff}.list_header .author_title_bodan[data-v-25bbd864]{font-size:%?24?%;color:#fff;margin-left:%?12?%}.list_header .desc_title_bodan[data-v-25bbd864]{font-size:%?24?%;color:#fff}',""]),t.exports=e},6638:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var r={uIcon:n("81c8").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-image",style:[t.wrapStyle,t.backgroundStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClick.apply(void 0,arguments)}}},[t.isError?t._e():n("v-uni-image",{staticClass:"u-image__image",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.borderRadius),boxShadow:1==t.shaw?"0px 0px 32px 0px rgba(3,22,38,0.08)":"none"},attrs:{src:t.src,mode:t.mode,"lazy-load":t.lazyLoad},on:{error:function(e){arguments[0]=e=t.$handleEvent(e),t.onErrorHandler.apply(void 0,arguments)},load:function(e){arguments[0]=e=t.$handleEvent(e),t.onLoadHandler.apply(void 0,arguments)}}}),t.showLoading&&t.loading?n("v-uni-view",{staticClass:"u-image__loading",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.borderRadius),backgroundColor:this.bgColor}},[t.$slots.loading?t._t("loading"):n("u-icon",{attrs:{name:t.loadingIcon,width:t.width,height:t.height}})],2):t._e(),t.showError&&t.isError&&!t.loading?n("v-uni-view",{staticClass:"u-image__error",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.borderRadius)}},[t.$slots.error?t._t("error"):n("u-icon",{attrs:{name:t.errorIcon,width:t.width,height:t.height}})],2):t._e()],1)},a=[]},"6fc5":function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-line[data-v-bcb4a750]{vertical-align:middle}',""]),t.exports=e},7030:function(t,e,n){"use strict";n.r(e);var r=n("ac55"),i=n("36cb");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("37f9");var o,s=n("f0c5"),u=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,"19aaa252",null,!1,r["a"],o);e["default"]=u.exports},"7c5e":function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-image[data-v-591b7e10]{position:relative;-webkit-transition:opacity .5s ease-in-out;transition:opacity .5s ease-in-out}.u-image__image[data-v-591b7e10]{width:100%;height:100%}.u-image__loading[data-v-591b7e10], .u-image__error[data-v-591b7e10]{position:absolute;top:0;left:0;width:100%;height:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;background-color:#f3f4f6;color:#909399;font-size:%?46?%}',""]),t.exports=e},8388:function(t,e,n){"use strict";n.r(e);var r=n("6638"),i=n("0020");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("4ee7");var o,s=n("f0c5"),u=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,"591b7e10",null,!1,r["a"],o);e["default"]=u.exports},8553:function(t,e,n){"use strict";var r=n("b714"),i=n.n(r);i.a},"876e":function(t,e,n){var r=n("59d2");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("4f06").default;i("90f1cc3a",r,!0,{sourceMap:!1,shadowMode:!1})},"9af1":function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var r={uImage:n("8388").default,uLine:n("5502").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"bodan_flex"},[t._l(t.list,(function(e,r){return[[n("v-uni-view",{key:r+"_0",staticClass:"bodan",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.handlePlay(e)}}},[n("v-uni-view",{staticStyle:{width:"129rpx",height:"129rpx","line-height":"129rpx","text-align":"center"}},[n("u-image",{attrs:{width:"129rpx",height:"129rpx",src:e.chapterListenImage,"border-radius":"10rpx"}})],1),n("v-uni-view",{staticClass:"bodan_content"},["zj"==t.leixing?n("v-uni-view",{staticClass:"bodan_content_title",staticStyle:{display:"flex","justify-content":"space-between"}},[n("v-uni-view",[t._v(t._s(t._f("titleFilter")(e.chapterName,t.length)))]),n("v-uni-view",{staticStyle:{"font-size":"24rpx","font-family":"PingFang SC","font-weight":"400"}},[t._v(t._s(e.createTime.slice(0,7)))])],1):t._e(),"zj"==t.leixing?[n("v-uni-view",{staticClass:"bodan_content_author"},[n("v-uni-view",{staticStyle:{width:"19rpx",height:"20rpx"}},[n("u-image",{attrs:{width:"19rpx",height:"20rpx",src:"https://img11.iqilu.com/29/2020/09/30/224104618812ae11f6484e7303d6d5a1.png"}})],1),n("v-uni-view",{staticClass:"bodan_content_author_name",staticStyle:{color:"#999999"}},[t._v(t._s(t._f("numFormat")(e.chapterReadAmount))+"播放")]),n("u-image",{staticStyle:{"margin-left":"20rpx"},attrs:{width:"17rpx",height:"20rpx",src:"https://img11.iqilu.com/29/2020/09/30/e2b6da3e4c665c2c46322fea23f1f1f0.png"}}),n("v-uni-view",{staticClass:"bodan_content_author_count"},[t._v(t._s(t._f("s_to_hs")(e.chapterTime)))]),n("v-uni-view",{staticStyle:{color:"#F8A11F","margin-left":"auto"}},[t._v(t._s(2==e.radioType?"互听":"章节"))])],1)]:t._e(),n("u-line",{staticStyle:{width:"100%"},attrs:{color:"#E6E6E6",margin:"30rpx 0 0 0 "}})],2)],1)]]}))],2)},a=[]},ac55:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var r={uNavbar:n("98d7").default,mescrollUni:n("6722").default},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"list_page_content"},[n("v-uni-view",{staticClass:"bodan_beijing"},[n("v-uni-image",{staticStyle:{width:"100%",height:"100%",position:"absolute",top:"0",filter:"blur(40rpx)","z-index":"-1",margin:"-46rpx"},attrs:{src:t.bodanObj.topicImage}}),n("u-navbar",{attrs:{title:t.navTitle,background:"","title-color":"#ffffff","back-icon-color":"#ffffff"}}),n("listheader",{staticStyle:{"margin-top":"39rpx"},attrs:{src:t.bodanObj?t.bodanObj.topicImage:"",author:t.bodanObj?t.bodanObj.nickName:"",avatar:t.bodanObj?t.bodanObj.avatar:"",title:t.bodanObj?t.bodanObj.topicName:""},on:{handleAvatar:function(e){arguments[0]=e=t.$handleEvent(e),t.handleAvatar.apply(void 0,arguments)}}})],1),n("v-uni-view",{staticStyle:{flex:"1",overflow:"hidden","margin-top":"-30rpx",background:"white","border-top-left-radius":"30rpx","border-top-right-radius":"30rpx",padding:"0 30rpx","padding-top":"40rpx"}},[n("mescroll-uni",{ref:"mescrollRef",staticStyle:{height:"100%"},attrs:{fixed:!1,down:t.downOption,up:t.upOption},on:{init:function(e){arguments[0]=e=t.$handleEvent(e),t.mescrollInit.apply(void 0,arguments)},down:function(e){arguments[0]=e=t.$handleEvent(e),t.downCallback.apply(void 0,arguments)},up:function(e){arguments[0]=e=t.$handleEvent(e),t.upCallback.apply(void 0,arguments)}}},[n("bodan",{ref:"list_bodanPage",attrs:{length:12,desc:40,list:t.dataList,leixing:t.leixing},on:{handlePlay:function(e){arguments[0]=e=t.$handleEvent(e),t.handlePlay.apply(void 0,arguments)}}})],1)],1)],1)},a=[]},b714:function(t,e,n){var r=n("068f");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("4f06").default;i("ac1236e8",r,!0,{sourceMap:!1,shadowMode:!1})},bfa2:function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={name:"u-image",props:{src:{type:String,default:""},shaw:{type:String,default:""},mode:{type:String,default:"aspectFill"},width:{type:[String,Number],default:"100%"},height:{type:[String,Number],default:"auto"},shape:{type:String,default:"square"},borderRadius:{type:[String,Number],default:0},lazyLoad:{type:Boolean,default:!0},showMenuByLongpress:{type:Boolean,default:!0},loadingIcon:{type:String,default:"photo"},errorIcon:{type:String,default:"error-circle"},showLoading:{type:Boolean,default:!0},showError:{type:Boolean,default:!0},fade:{type:Boolean,default:!0},webp:{type:Boolean,default:!1},duration:{type:[String,Number],default:500},bgColor:{type:String,default:"#f3f4f6"}},data:function(){return{isError:!1,loading:!0,opacity:1,durationTime:this.duration,backgroundStyle:{}}},watch:{src:function(t){this.isError=!t}},computed:{wrapStyle:function(){var t={};return t.width=this.$u.addUnit(this.width),t.height=this.$u.addUnit(this.height),t.borderRadius="circle"==this.shape?"50%":this.$u.addUnit(this.borderRadius),t.overflow=this.borderRadius>0?"hidden":"visible",this.fade&&(t.opacity=this.opacity,t.transition="opacity ".concat(Number(this.durationTime)/1e3,"s ease-in-out")),t}},methods:{onClick:function(){this.$emit("click")},onErrorHandler:function(){this.loading=!1,this.isError=!0,this.$emit("error")},onLoadHandler:function(){var t=this;if(this.loading=!1,this.isError=!1,this.$emit("load"),!this.fade)return this.removeBgColor();this.opacity=0,this.durationTime=0,setTimeout((function(){t.durationTime=t.duration,t.opacity=1,setTimeout((function(){t.removeBgColor()}),t.durationTime)}),50)},removeBgColor:function(){this.backgroundStyle={backgroundColor:"transparent"}}}};e.default=r},c431:function(t,e,n){"use strict";var r=n("2f52"),i=n.n(r);i.a},d922:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-line",style:[t.lineStyle]})},a=[]},e2db:function(t,e,n){"use strict";n.r(e);var r=n("26137"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a},f589:function(t,e,n){var r=n("7c5e");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("4f06").default;i("012b7c3f",r,!0,{sourceMap:!1,shadowMode:!1})},f621:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={name:"u-line",props:{color:{type:String,default:"#e4e7ed"},length:{type:String,default:"100%"},direction:{type:String,default:"row"},hairLine:{type:Boolean,default:!0},margin:{type:String,default:"0"},borderStyle:{type:String,default:"solid"}},computed:{lineStyle:function(){var t={};return t.margin=this.margin,"row"==this.direction?(t.borderBottomWidth="1px",t.borderBottomStyle=this.borderStyle,t.width=this.$u.addUnit(this.length),this.hairLine&&(t.transform="scaleY(0.5)")):(t.borderLeftWidth="1px",t.borderLeftStyle=this.borderStyle,t.height=this.$u.addUnit(this.length),this.hairLine&&(t.transform="scaleX(0.5)")),t.borderColor=this.color,t}}};e.default=r},fafc:function(t,e,n){"use strict";var r=n("4ea4");n("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("5530"));n("96cf");var a=r(n("1da1")),o=n("2f62"),s=r(n("1269")),u=r(n("232e")),c=r(n("f53e")),d=r(n("6722")),l="播单列表",f="专题列表",p={mixins:[c.default],data:function(){return{title:"",content:"",list:[],leixing:"zhubo",shuaxin:!1,sortType:1,categoryId:0,topicId:0,downOption:{},upOption:{},dataList:[],bodanObj:{topicImage:""}}},components:{MescrollUni:d.default,bodan:s.default,listheader:u.default},onLoad:function(t){var e=this;return(0,a.default)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return console.log(t),e.title=t.name,e.categoryId=t.categoryId,e.topicId=t.topicId,e.leixing=t.type,n.next=7,e.getBodanJianjie();case 7:r=n.sent,e.bodanObj=r,console.log(r);case 10:case"end":return n.stop()}}),n)})))()},computed:{navTitle:function(){return this.title==l?"个人播单":""}},methods:(0,i.default)((0,i.default)({},(0,o.mapActions)(["get_user_play_history","get_recently_topic","get_limited_time_free_topic","get_recommend_topic","get_topic_list_by_type","get_billboard_topic","get_chapter_list_by_topic","get_chapter_list_by_topic_single","get_introduction_by_topic_id"])),{},{handleAvatar:function(){uni.navigateTo({url:"/pagesA/myindex/myindex?priv=1&userId="+this.bodanObj.userId})},handlePlay:function(t){if(console.log(t,this.title),this.title==l)t.radioType&&1!=t.radioType?uni.navigateTo({url:"/pagesC/listen_nei/listen_nei?audioId="+t.chapterId+"&type=audio&authorId="+t.userId}):uni.navigateTo({url:"/pagesC/playPage/playPage?topicId="+t.topicId+"&authorId="+t.userId+"&chapterId="+t.chapterId});else if("LiShi"==this.title){var e=1==t.radioType?"/pagesC/playPage/playPage?topicId="+t.topicId+"&authorId="+t.userId+"&chapterId="+t.chapterId:"/pagesC/listen_nei/listen_nei?audioId="+t.chapterId+"&type=audio&authorId="+t.userId;uni.navigateTo({url:e})}else uni.navigateTo({url:"/pagesC/playPage/playPage?topicId="+t.topicId+"&authorId="+t.userId+"&chapterId="+t.chapterId})},ifType:function(t){var e=this;return(0,a.default)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:n.t0=e.title,n.next=n.t0===l?3:n.t0===f?8:14;break;case 3:return r={userId:1,topicId:e.topicId,pageNum:t.num,pageSize:t.size},n.next=6,e.get_chapter_list_by_topic_single(r);case 6:return n.abrupt("return",n.sent);case 8:return r={topicId:e.topicId,pageNum:t.num,pageSize:t.size},n.next=11,e.get_chapter_list_by_topic(r);case 11:return n.abrupt("return",n.sent);case 14:return r={categoryId:e.categoryId,pageNum:t.num,pageSize:t.size,sortType:e.biaoji},n.next=17,e.get_topic_list_by_type(r);case 17:return n.abrupt("return",n.sent);case 19:case"end":return n.stop()}}),n)})))()},downCallback:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.mescroll.resetUpScroll();case 1:case"end":return e.stop()}}),e)})))()},upCallback:function(t){var e=this;return(0,a.default)(regeneratorRuntime.mark((function n(){var r,i,a,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.ifType(t);case 2:r=n.sent,i=r.list,a=r.list.length,o=r.pages,r.total,1==t.num&&(e.dataList=[]),e.dataList=e.dataList.concat(i),e.mescroll.endByPage(a,o);case 10:case"end":return n.stop()}}),n)})))()},custom:function(t){var e=this;return(0,a.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.downCallback();case 1:case"end":return t.stop()}}),t)})))()},getBodanJianjie:function(){var t=this;return(0,a.default)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n={topicId:t.topicId},e.next=3,t.get_introduction_by_topic_id(n);case 3:return r=e.sent,e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})))()}})};e.default=p}}]);