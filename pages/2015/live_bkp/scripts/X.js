/*
* @Author: Nokey-木马人
*/
'use strict';

$(function(){
// Detect disqus load
    var disqus_moniter = setInterval(function(){
        if($('#disqus_thread').outerHeight() > 150){
            $('.disqus-mask').removeClass('hide');
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

// Setup danmu
    var _myHLS = $('#myHLS'),
        nk_danmu_open = false;

// Setup wilddog
    var ref = new Wilddog("https://live.wilddogio.com/danmu");
    // console.log(ref);
    $("#danmu_send").click(function() {
        if(nk_danmu_open){
            console.log('add danmu...');
    		var text = $("#danmu_txt").val();
    		ref.push(text);
    		$("#danmu_txt").val('');
        }
	});
    $("#danmu_txt").keypress(function(event) {
		if(event.keyCode == "13") {
			$("#danmu_send").trigger('click');
		}
	});
    $('.danmu-switch-btn').click(function(event) {
        var _me = $(this),
            flag = _me.data('switch');
        if(flag == 'close'){
            _me.velocity({
                left: '15px'
            }, 200, function(){
                nk_danmu_open = true;
                _me.data('switch', 'open');
            });
        }else{
            _me.velocity({
                left: '-5px'
            }, 200, function(){
                nk_danmu_open = false;
                _me.data('switch', 'close');
            });
        }
    });

    ref.on('child_added', function(snapshot) {
        if(nk_danmu_open){
            console.log('new danmu...'+snapshot.val());
    		var text = snapshot.val();
            var _myHLS = $('#myHLS');

            $('<p class="nokey-danmu-msg">')
                .text(text)
                .css({
                    'left': _myHLS.outerWidth() + 'px',
                    'top': randomNum(0, _myHLS.outerHeight() - 30) + 'px'
                })
                .appendTo('#myHLS')
                .velocity({'left': '-200px'}, 8000, 'ease-in－out', function(){
                    $(this).remove();
                });
        }
	});

// Like Num btn click
    $('#icon_zan').click(function(){
        var _me = $(this);

        console.log(_me.data('status'));
    });

// Func Tools
    function randomNum(min, max){
        return min + Math.floor(Math.random()*(max - min + 1));
    }

});
