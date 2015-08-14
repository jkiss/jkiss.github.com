'use strict';
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
    var
        screen_w = $(window).outerWidth(),
        screen_h = $(window).outerHeight(),
        body = $('body'),
        html = $('html'),

        video = $('#dollar'),
        video_w = video.data('width'),
        video_h = video.data('height'),
        video_mask = $('.video-mask'),
        video_bg = $('.video-bg'),
        play_btn = $('#play_btn'),
        pause_btn = $('#pause_btn'),
        btn_moving = false,

        logos = $('.logos');

// Video JS
    video.on('ended', function(event) {
        event.preventDefault();
        /* Act on the event */
    });
    video.on('timeupdate', function(event) {
        event.preventDefault();
    });
    video.on('canplay', function(event) {
        console.log('canplay...');
        video_bg.velocity({
            opacity: 1
        }, 500);

        showLogos();
    });

    video_mask.on('click', function(e) {
        console.log(e.target);
        var _target = $(e.target);

        if(_target.attr('id') === 'play_btn'){
            _target.css('visibility', 'hidden');
            pause_btn.css('visibility', 'visible');
        }else if(_target.attr('id') === 'pause_btn'){
            _target.css('visibility', 'hidden');
            play_btn.css('visibility', 'visible');
        }
    });

    play_btn.on('click', function(event) {
        video.get(0).play();
    });
    pause_btn.on('click', function(event) {
        video.get(0).pause();
    });

    setTimeout(function(){
        pause_btn.css('visibility', 'visible').velocity({
            opacity: 1
        }, "ease");
    }, 5000);

    function showLogos(){
        console.log(getBCR(logos.get(0), 'top'));
        if(getBCR(logos.get(0), 'top') < (screen_h-50)){
            console.log(getBCR(logos.get(0), 'top'));

            logos.velocity({
                opacity: 1
            }, 800);

            $('.blast').velocity('fadeIn',{
                delay: 1000,
                stagger: 100,
                drag: true
            });
        }
    }
    $(window).on('scroll', function(event) {
        console.log('scroll');
    });

// Video END

// Blast txt effect
    $('.con-top p').blast({
        delimiter: 'character',
        customClass: 'hide'
    });
// Blast END

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

// Tool Funcs
    function getBCR(ele, type){
        if(type !== undefined){
            return ele.getBoundingClientRect()[type];
        }else{
            return ele.getBoundingClientRect();
        }
    }

}(jQuery, window));



// To be continue
