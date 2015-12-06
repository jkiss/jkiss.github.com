/*
*    Author is Nokey -- 木马人
*/

(function($, win){
// Some Eles Parameters
    var _win = $(win),
        _ua = win.navigator.userAgent.toLowerCase();
        _isMac = /macintosh|mac os x/.test(_ua),
        _isMobile = /mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(_ua),
        center_img_boxs = $('.center-image'),
        preload_img_srcs = [],
        auto_play_videos = $('.trigger-play');

// Response Parameters
    $(win).resize(function(){
        centerImage(center_img_boxs);
    }).scroll(function(event) {
        playVideo(auto_play_videos);
    });;

// Scroll smoothly
    function smoothScroll(){
        console.log('smooth scroll...');
        _win.on('mousewheel DOMMouseScroll', function(e) {
            e.preventDefault();
            e = e.originalEvent.wheelDelta / 120 || -e.originalEvent.detail / 3;
            e = _win.scrollTop() - parseInt(220 * e);
            TweenMax.to(_win, 1.1, {
                scrollTo: {y: e, autoKill: !0},
                ease: Power1.easeOut,
                overwrite: 5
            });
        });
    }
    !_isMac && !_isMobile && smoothScroll();

// Load image && Center images: background-image
    center_img_boxs.each(function(i) {
        preload_img_srcs.push(getImgUrl($(this)));
    });
    preImage(preload_img_srcs, function(){
        centerImage(center_img_boxs);
    });

// play video
    function playVideo(videos){
        videos.each(function(index, el) {
            $(el).hasClass('no-play') && getBCR(el, 'top') < _win.height()/4 && el.play();
        });
        console.log('video play...');
    }
    function videoControl(videos){
        // TODO: 视频播放控制
        $(document).on('click', '.ctrl-btn', function(event) {
            // console.log('replay...');
            var _me = $(this),
                video = _me.prev().get(0);

            video.pause();
            video.currentTime = 0;
            video.play();
            _me.addClass('none');
        });
        videos.each(function(index, el) {
            var ctrl_btn = $(this).next();

            el.onended = function(){
                ctrl_btn.removeClass('none');
            };
        });
    }
    videoControl(auto_play_videos);

// Func Tolls
    function centerImage(img_boxs){
        // use 'background-image' to improve aniamtion performance
        img_boxs.each(function(i) {
            var box = $(this),
                box_w = box.outerWidth(),
                box_h = box.outerHeight(),
                img_w = parseInt(box.attr('data-img-w')),
                img_h = parseInt(box.attr('data-img-h')),
                box_ratio = box_w / box_h,
                img_ratio = img_w / img_h;

            img_ratio > box_ratio ?
                box.css({
                    'background-size': 'auto 105%'
                }) :
                box.css({
                    'background-size': '105% auto'
                }) ;

        });
    }

    function getImgUrl($ele){
        var bg = $ele.css('background-image');
        return bg.split('(')[1].split(')')[0];
    }

    function preImage(img_src_array, callback){
        var i_num = img_src_array.length,
            i_array = new Array(img_src_array.length),
            loaded_num = 0;
        // console.log(i_num);
        i_num !== 0 && (function(){
            console.log('Start Preload...');
            for (var i = 0; i < i_array.length; i++) {
                i_array[i] = new Image();
                i_array[i].src = img_src_array[i];
                i_array[i].onload = function(){
                    console.log('Loaded_Num: '+(loaded_num+1));

                    ++loaded_num && loaded_num === i_num && (function(){
                        console.log('End Preload...');
                        callback && callback();
                    }());
                };
            };
        }());
    }

    function getBCR(ele, type){
        if(type !== undefined){
            return ele.getBoundingClientRect()[type];
        }else{
            return ele.getBoundingClientRect();
        }
    }
}(jQuery, window));


// end
