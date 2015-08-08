/*
*    Author is Nokey -- 木马人
*/
// rAF poilyfill
(function() {
    var lastTime = 0,
        vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime(),
                timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

(function($, win){
// Some Eles Parameters
    var nav_1 = $('.nav-1'),
        nav_2 = $('.nav-2'),
        scroll_start = 0,
        scroll_end = 0,
        screen_w = $(window).outerWidth(),
        screen_h = $(window).outerHeight(),
        body = $('body'),
        html = $('html'),
        tap_event = '',
        nav_fix_box = $('.nav-fix-box'),
        side_menu = $('#side_menu_box'),
        n2_hide_list = $('.n2-hide-list'),
        center_img_boxs = $('.center-image'),
        preload_img_srcs = [],
        pages = $('.page'),
        parallax_ratio = 0.5;

// TODO: 监测浏览器是否支持transform，如果支持，那么视差滚动的位移操作都交给translate3d来做
    var el = document.createElement('div'),
        style = el.style,
        domPrefs = 'Webkit Moz O ms Khtml'.split(' ');

    function testProps(props){
    // testProps(['transform', 'WebkitTransform']);
        for(var i in props){
            if(style[props[i]] !== undefined){
                return true;
            }
        }
        return false;
    }

    function testAll(prop){
    // testAll('transform');
        var camel = prop.charAt(0).toUpperCase() + prop.substr(1),
            props = (prop + ' ' + domPrefs.join(camel + ' ') + camel).split(' ');

        return !!testProps(props);
    }
// Dectect css3 properties
    var canTransform = testAll('transform');
    
    function translateY(ele, y){
        if(canTransform){
            ele.css({
                '-webkit-transform': 'translate3d(0,'+y+'px,0)',
                '-ms-transform': 'translate3d(0,'+y+'px,0)',
                'transform': 'translate3d(0,'+ y +'px,0)'
            });
        }else{
            ele.css('top', y + 'px');
        }
    }

// browser type & version
    var ua = win.navigator.userAgent.toLowerCase(),
        isMobile = /mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(ua),
        isMac = /macintosh|mac os x/.test(ua);

// smooth scroll
// TODO: windows下的平滑滚动问题
    var _win = $(window),
        _rAF = window.requestAnimationFrame,
        _cAF = window.cancelAnimationFrame,
        _af,
        _scroll_time = 1000,
        _scroll_distance = 280;

    function smoothScroll(){
        _win.on('mousewheel DOMMouseScroll', function(e){
            e.preventDefault();
            // console.log(e);
            e = e.originalEvent.wheelDelta / 120 || -e.originalEvent.detail / 3;
            e = -parseInt(_scroll_distance * e);

            scrollToAnimation(_win, _scroll_time, {
                distance: e,
                ease: 'easeOut'
            });
       });
    }
    !isMac && !isMobile && smoothScroll();

    function scrollToAnimation(o, time, opt){
        var st = o.scrollTop(),
            dis = opt.distance,
            start = (new Date()).getTime();
       
        time ? void(0) : time = 500;

        _cAF(_af) || animate();

        function animate(){
            var now = (new Date()).getTime(),
                elapsed = now - start,
                fraction = elapsed / time;
             
            if(fraction < 1){
                var final = st + dis*Math.sin(fraction*Math.PI/2);
                o.scrollTop(final);
                // setTimeout(animate, Math.min(25, time - elapsed));
                _af = _rAF(animate);
            }else{
                console.log('Complete Scroll...');
            }
        }
    }

// Response Parameters
    $(win).resize(function(event) {
        screen_w = $(document).outerWidth();
        screen_h = $(document).outerHeight();

        centerImage(center_img_boxs);

        setPageHeight();
    }).scroll(function(event) {
        // TODO: 实时监测视差滚动的窗口
        // parallax();
    });

    function parallax(){
        pages.each(function(i) {
            var _me = $(this),
                parallax_box = $('.parallax-box', this),
                _top = getBCR(this, 'top'),
                page_h = _me.attr('data-height');

            if(!_me.hasClass('no-parallax') && _top < 0 && Math.abs(_top) < page_h){
                console.log('translate...');
                translateY(parallax_box, Math.abs(_top) * parallax_ratio);
            }else if(_top > 0){
                translateY(parallax_box, 0);
            }
        });
        !isMobile && requestAnimationFrame(parallax);
    }
    function noParallax(){
        pages.each(function(index, el) {
            var _me = $(this);
            if(!_me.hasClass('no-parallax')){
                _me.addClass('no-parallax');
            }
        });
    }
    !isMobile && requestAnimationFrame(parallax);
    // TODO: 移动端touchmove视差动画
    isMobile && noParallax();

// Menu Switch
    setInterval(function(){
        scroll_end = getScrollTop();
        if((scroll_end - scroll_start) > 10){  // scroll Down
            nav_1.css('opacity', 0);
            nav_2.css('top', 0);
        }else if((scroll_end - scroll_start) < -10){
            nav_1.css('opacity', 1);
            nav_2.css('top', '-70px');
        }
        scroll_start = scroll_end;
    }, 100);

    $('.n2-light, .n2-read, .n2-app').hover(function() {
        var _me = $(this);
        !_me.hasClass('active') && _me.find('.n2-hr')
            .velocity('stop')
            .velocity({width: '100%'}, 200);
    }, function() {
        var _me = $(this);
        !_me.hasClass('active') && _me.find('.n2-hr')
            .velocity('stop')
            .velocity({width: '0%'}, 200);
    });

// Side Menu
    isMobile ? tap_event = 'touchend' : tap_event = 'click';
    // console.log(tap_event);
    $('#side_menu').on(tap_event, function(event) {
        var r = parseInt(side_menu.css('right'));
        if(r !== 0){
            html.css({
                width: screen_w + 'px',
                height: screen_h + 'px',
                overflow: 'hidden'
            });
            side_menu.velocity({
                right: '0'
            }, {
                duration: 200
            });
            // console.log('side_menu open...');
        }else{
            side_menu.velocity({
                right: '-150px'
            }, {
                duration: 200,
                complete: function(){
                    html.removeAttr('style');
                }
            });
            // console.log('side_menu close...');
        }
    });

// n2 nav list
    $('#n2_menu').on(tap_event, function(event) {
        var btm = parseInt(n2_hide_list.css('bottom'));
        if(btm === 0){
            n2_hide_list.velocity({
                bottom: '-80px'
            }, {
                duration: 300,
                easing: 'ease-out'
            });
        }else{
            n2_hide_list.velocity({
                bottom: '0px'
            }, 300, 'ease-out');
        }
    });

// Center images: background-image
    center_img_boxs.each(function(i) {
        preload_img_srcs.push(getImgUrl($(this)));
    });
    preImage(preload_img_srcs, function(){
        centerImage(center_img_boxs);
    });
    win.onload = function(){
        centerImage(center_img_boxs);
    };

// Func Tolls
    function getScrollTop(){
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    }

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

    function setPageHeight(){
        pages.each(function(i) {
            var _me = $(this);
            _me.attr('data-height', _me.outerHeight());
        });
    }
    setPageHeight();

    function getImgUrl($ele){
        var bg = $ele.css('background-image');
        return bg.split('(')[1].split(')')[0];
    }

    function preImage(img_src_array, callback){
        // console.log('Start Preload...');
        var i_num = img_src_array.length,
            i_array = new Array(img_src_array.length),
            loaded_num = 0;
        // console.log(i_num);
        i_num !== 0 && (function(){
            // console.log('Start Preload...');
            for (var i = 0; i < i_array.length; i++) {
                i_array[i] = new Image();
                
                console.log(i_array[i].complete);
                if(i_array[i].complete){
                    console.log('End Preload...');
                    callback && callback();
                }else{
                    i_array[i].onload = function(){
                        console.log('Loaded_Num: '+(loaded_num+1));

                        ++loaded_num && loaded_num === i_num && (function(){
                            console.log('End Preload...');
                            callback && callback();
                        }());
                    };
                }
                i_array[i].src = img_src_array[i];
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



// To be continue
