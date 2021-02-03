

插件安装
	
图片上传组件 将组件放在自己的组件库里导入即可

### 注意

1.组件自带的图片路径可能会不对，注意修改(可以放在static里)！

2.最好在回调结果后使用debugger看一下结果！ 

	
#### 导入：  
> import imgUpload from '@/components/my-components/uImgUpload.vue';

-------------------------------------   

#### 属性 attribute

| 属性名            | 类型     | 介绍          | 默认值              |
|----------------|--------|-------------|------------------|
| imgArr         | Array  | 图片展示列表      | \[\]             |
| uploadImgCount | Number | 一次可选多少张图片   | 3                |
| imgCount       | Number | 一共可以上传多少张图片 | 3                |
| imgSize        | Number | 上传图片的大小     | 2 \(M\)          |
| imgType        | Array  | 能上传图片的类型(注：小程序下不兼容)    | \["jepg","png"\] |
| closeTip        | Boolean  | 是否关闭提示    | false |
| ~~closeLoading~~        | Boolean  | 是否关闭加载动画(已弃用)    | true |
| loading        | Boolean  | 是否关闭加载动画    | false |
| url        | String  | 上传图片的url    | "" |
| async        | Boolean  | 是否选择图片后直接上传    | false |

------------------------------------- 

#### 方法 method

>当**async**为**true**的时候
>存在两个方法

| 方法名    | 介绍                     |
|--------|------------------------|
| result | 上传后的返回结果\(成功对象\)       |
| delImg | 删除图片返回下标\(传入的图片数组的下标\) |


>开始上传图片 在父页面中调用该方法（当async为false,也就是默认值的时候使用）
> *注意* 一定要给组件 **ref="imgUpload"**
```
      this.$refs.imgUpload.upload(res=>{
			  if(res.code==0){
			   	//0为正常返回，将回调的线上图片数组 赋值给需要提交的表单里
				//res.urlArray 线上路径图片数组
				//TODO
				
				}else{
				//用户没有上传图片的返回 code码为400
				
				}
	});

```

-------------------------------------

####示范代码

```
<template>
<imgUpload :imgArr="imgArray" loading async url="xxx(上传图片的url)" @result="resultUrl" @delImg="delImg"></imgUpload>
<img-upload :imgArr="imgArray" imgCount="9" ref="imgUpload" url="xxx(上传图片的url)"></img-upload>
<button type="default" @click="submit">提交</button>
</template>

<script>
	import imgUpload from '@/components/my-components/imgUpload.vue';
	export default {
		components: {
			imgUpload
		},
		data() {
			return {
				imgArray:[]
			}
		},
		methods: {
		  submit(){
			 //开始上传图片
           this.$refs.imgUpload.upload(res=>{
			   if(res.code==0){
			   		//0为正常返回，将回调的线上图片数组 赋值给需要提交的表单里
					//res.urlArray 线上路径图片数组对象
					//TODO
				}else{
					//用户没有上传图片的返回 code码为400
				}

				//可以在下面继续写提交代码
		   });
	},
	resultUrl(e){
		if(e){
			this.imgArr.push(e.fileVo.fileUrl); //e为返回的对象
		}
		
	},
	delImg(e){
		this.imgArr.splice(e,1) //为删除图片数组的下标
	}
}
</script>

```

 
	



	