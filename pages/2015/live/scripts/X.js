/*
* @Author: Nokey-木马人
*/
'use strict';

$(function(){
// Detect disqus load
    var disqus_moniter = setInterval(function(){
        if($('#disqus_thread').outerHeight() > 150){
            $('.disqus-mask').removeClass('hide');
            $('.disqus-mask-2').removeClass('hide');
            clearInterval(disqus_moniter);
        }
    }, 50);
// Setup jwplayer
    var hls_player = jwplayer('myHLS');
    hls_player.setup({
        file: 'http://live.cctvnews.cn/manifest.m3u8',
        image: 'http://op.cctvnews.cn/2015/live/images/tv.jpg',
        skin: 'five',
        stretching: 'fill',
        width: '100%',
        aspectratio: '16:9',
        androidhls: true,
        primary: 'html5',
        autostart: true
    });


// Wechat icon btn
    $('#icon_wx').click(function(event) {
        event.stopPropagation();
        var _me = $(this),
            _icon = _me.find('.cv-wechat'),
            moving = false;

        if(_me.data('status') == 'close' && !moving){
            moving = true;
            _icon
                .css('visibility', 'visible')
                .velocity({
                    'opacity': 1,
                    'top': '20px'
                }, 300, function(){
                    moving = false;
                    _me.data('status', 'open');
                });
        }else if(_me.data('status') == 'open' && !moving){
            moving = true;
            _icon
                .velocity({
                    'opacity': 0,
                    'top': '15px'
                }, 300, function(){
                    moving = false;
                    _me.data('status', 'close');
                    _icon.css('visibility', 'hidden');
                });
        }
    });

// Func Tools
    function randomNum(min, max){
        return min + Math.floor(Math.random()*(max - min + 1));
    }

});
