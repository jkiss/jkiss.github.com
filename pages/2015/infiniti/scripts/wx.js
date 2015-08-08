function initWeixin() {
    // 通过api.php跨域调用接口，$redirect是api.php的相对路径
    // 接口地址是下面urls参数；post的参数在other参数里面，json //格式。
    var url = $redirect + "api.php";
    $.post(
        url,
        {
            //第三方接口地址
            urls: 'http://wechat.cnautoshows.com/index.php/api/getAccessToken/getSignPackage',
            //請求第三方接口方式 post get
            method: 'post',
            //code参数为json串,串内参数都需要加密
            code: '',
            //其他无需加密参数,参数为json串,串内参数不加密
            other: '{"url":"' + window.location.href + '","tk":"JJkmJ-vjIGvh5WRY5KzgmyCuIWV"}',
            keytype: 2
        },
        function(data){
            var $data = eval("(" + data + ")");
            //微信认证config
            wx.config({
                debug: false,
                appId: $data.appId,
                timestamp: $data.timestamp,
                nonceStr: $data.nonceStr,
                signature: $data.signature,
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ]
            });
            wx.ready(function() {
                var abs_url = '',  // 这个是项目文件夹所在的当前目录
                    share_data = {
                        title: '支持绿色科技 共同爱护地球',
                        link: abs_url + 'infiniti/index.html',
                        imgUrl: abs_url + 'infiniti/images/icon.png',
                        desc: '纪念"世界地球日"，英菲尼迪带你了解日常生活中的环保节能技术',
                        success: function(){
                            // 分享成功
                        },
                        cancel: function(){
                            // 取消分享
                        }
                    };
                //分享到朋友圈
                wx.onMenuShareTimeline({
                    title: share_data.title,
                    link: share_data.link,
                    imgUrl: share_data.imgUrl,
                    success: share_data.success,
                    cancel: share_data.cancel
                });
                //分享给朋友
                wx.onMenuShareAppMessage({
                    title: share_data.title,
                    desc: share_data.desc,
                    link: share_data.link,
                    imgUrl: share_data.imgUrl,
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: share_data.success,
                    cancel: share_data.cancel
                });
            });
        }
    );
}
// 注： 需要在页面添加微信js引用
// <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
