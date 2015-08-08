var weixin={
	config:function(){
		var url=window.location.href.split("#")[0];
//		alert(url);
		$.get("http://www.vincentcto.com/infinite/jssdk/jssdk.php",{"url":url},function(s){
//			alert(1);
			var s=eval("("+s+")");
//			alert(s.signature);
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: s.appId, // 必填，公众号的唯一标识
				timestamp: s.timestamp, // 必填，生成签名的时间戳
				nonceStr: s.nonceStr, // 必填，生成签名的随机串
				signature: s.signature,// 必填，签名，见附录1
				jsApiList: [
				 	'onMenuShareTimeline',
				 	'onMenuShareAppMessage'
				] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		})
	},
	share:function(){
//		alert(title);
		var data = {
			    title: '感受一种稀缺的美', // 分享标题
			    link: 'http://www.vincentcto.com/infinite/index.html', // 分享链接
			    imgUrl: 'http://www.vincentcto.com/infinite/jssdk/logo.jpg', // 分享图标
			    desc: '力量释放·艺术匠心——英菲尼迪"冲突美学"', // 分享描述,
			    success:function(){
			    	//分享成功
			    	//alert(page);
					share();
			    },
			    cancel:function(){}
		};
 		wx.onMenuShareTimeline({
		    title: data.title, // 分享标题
		    link: data.link, // 分享链接
		    imgUrl: data.imgUrl, // 分享图标
		    success: data.success,
		    cancel: data.cancel
		});
		wx.onMenuShareAppMessage({
		    title: data.title, // 分享标题
		    desc: data.desc, // 分享描述
		    link: data.link, // 分享链接
		    imgUrl: data.imgUrl, // 分享图标
		    type: '', // 分享类型,music、video或link，不填默认为link
		    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		    success: data.success,
		    cancel: data.cancel
		});
	}
}
$(window).load(function(){
	weixin.config();
	
	wx.ready(function(){
		weixin.share();
	});
})
