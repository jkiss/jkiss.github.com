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
    var _win = $(win),
        _win_height = _win.height(),
        _win_width = _win.width(),
        _ua = win.navigator.userAgent.toLowerCase();
        _isMac = /macintosh|mac os x/.test(_ua),
        _isMobile = /mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(_ua),
        tap_event_name = _isMobile ? 'touchend' : 'click',

        center_bg_imgs = $('.center-bg-image');

// Response Parameters
    $(win).resize(function(){
        _win_height = _win.height();
        _win_width = _win.width();

        // Page 2
        resizeP2Grid();

        // Page 3
        resizePage3(p3_ratio);
        resizePhotoOne(photo_one_ratio);

        // Center image
        centerImage(center_images);

        // Center Bg images
        centerBgImage(center_bg_imgs);
    }).scroll(function(event) {
        scrollMonitor(scenes);
    });

    $('#loading_wrap').on('touchmove', function(event) {
        event.preventDefault();
        event.stopPropagation();
    });

// IScroll
    if(!_isMobile){
        var proj_scroll = new IScroll('#iscroll_wrap', {
            scrollbars: true,
    		mouseWheel: true,
    		interactiveScrollbars: true,
    		shrinkScrollbars: 'scale',
    		fadeScrollbars: true
        });
    }else{
        $('.proj-txt').css('height', 'auto');
    }

// Slider
    var unslider = $('.info-map').unslider({
        speed: 500,               //  The speed to animate each slide (in milliseconds)
    	delay: 3000,              //  The delay between slide animations (in milliseconds)
    	complete: function() {},  //  A function that gets called after every slide animation
    	keys: true,               //  Enable keyboard (left, right) arrow shortcuts
    	dots: true,               //  Display dot navigation
    	fluid: false              //  Support responsive design. May break non-responsive designs
    });
    // Arrows
    $('.unslider-arrow').click(function() {
        var fn = this.className.split(' ')[1];

        //  Either do unslider.data('unslider').next() or .prev() depending on the className
        unslider.data('unslider')[fn]();
    });
    // Swipe
    $('.info-map').on('swipeleft', function(e){
        unslider.next();
    })
    .on('swiperight', function(e){
        unslider.prev();
    });

// Init
    var
        l_persent = $('#l_persent');
        loading_wrap = $('#loading_wrap');
    function init(){
        var files = [
            {
                "type": "IMAGE",
                "source": "images/p1-1@2x.png",
                "size": 8040
            },
            {
                "type": "IMAGE",
                "source": "images/p1-2@2x.png",
                "size": 29579
            },
            {
                "type": "IMAGE",
                "source": "images/p1-3@2x.png",
                "size": 6889
            },
            {
                "type": "IMAGE",
                "source": "images/p1-title@2x.png",
                "size": 142000
            },
            {
                "type": "IMAGE",
                "source": "images/p2-11@2x.jpg",
                "size": 92000
            },
            {
                "type": "IMAGE",
                "source": "images/p2-12@2x.jpg",
                "size": 60000
            },
            {
                "type": "IMAGE",
                "source": "images/p2-21@2x.png",
                "size": 100323
            },
            {
                "type": "IMAGE",
                "source": "images/p2-22@2x.png",
                "size": 107387
            },
            {
                "type": "IMAGE",
                "source": "images/p2-31@2x.jpg",
                "size": 100000
            },
            {
                "type": "IMAGE",
                "source": "images/p2-32@2x.jpg",
                "size": 86000
            },
            {
                "type": "IMAGE",
                "source": "images/p2-41@2x.png",
                "size": 100000
            },
            {
                "type": "IMAGE",
                "source": "images/p2-42@2x.png",
                "size": 110000
            },
            {
                "type": "IMAGE",
                "source": "images/p2-51@2x.jpg",
                "size": 74000
            },
            {
                "type": "IMAGE",
                "source": "images/p2-52@2x.jpg",
                "size": 51000
            },
            {
                "type": "IMAGE",
                "source": "images/p2-61@2x.jpg",
                "size": 77000
            },
            {
                "type": "IMAGE",
                "source": "images/p2-62@2x.jpg",
                "size": 76000
            },
            {
                "type": "IMAGE",
                "source": "images/p2-s1@2x.png",
                "size": 11000
            },
            {
                "type": "IMAGE",
                "source": "images/p2-s2@2x.png",
                "size": 9000
            },
            {
                "type": "IMAGE",
                "source": "images/p2-s3@2x.png",
                "size": 14000
            },
            {
                "type": "IMAGE",
                "source": "images/p3-bg@2x.jpg",
                "size": 296876
            }
        ];
        $.html5Loader({
              filesToLoad: { 'files': files },
              onBeforeLoad: function() {},
              onComplete: function() {
                  console.log('Loading complete...');
                  loading_wrap.velocity({
                      'opacity': 0
                  }, 1000, function(){
                      loading_wrap.addClass('none');
                  });

                  // Center image
                  centerImage(center_images);

                  // Center Bg images
                  centerBgImage(center_bg_imgs);
              },
              onElementLoaded: function(obj, elm) {},
              onUpdate: function(percentage) {
                  console.log(percentage);
                  l_persent.text(percentage);
              }
        });

    }
    init();

// Scroll Monitor
    var scenes = [
        {
            ele: $('#s_img_left'),
            trigger: $('#page2'),
            duration: _win_height - 30,
            delay: 0,
            did: false,
            className: 'symbol-img-show'
        },
        {
            ele: $('#s_img_center'),
            trigger: $('#page2'),
            duration: _win_height - 30,
            delay: 300,
            did: false,
            className: 'symbol-img-show'
        },
        {
            ele: $('#s_img_right'),
            trigger: $('#page2'),
            duration: _win_height - 30,
            delay: 100,
            did: false,
            className: 'symbol-img-show'
        }
    ];
    function scrollMonitor(scenes){
        scenes.forEach(function(obj){
            if(getBCR(obj.trigger.get(0), 'top') < obj.duration && !obj.did){
                obj.did = true;
                setTimeout(function(){
                    obj.ele.addClass(obj.className);
                }, obj.delay);
            }else if(getBCR(obj.trigger.get(0), 'top') > obj.duration && obj.did == true){
                obj.did = false;
                setTimeout(function(){
                    obj.ele.removeClass(obj.className);
                }, obj.delay);
            }
        });
    }

// Page - 2: 3d rotate
    var prow_inners = $('.prow-inner');
    if(!_isMobile){
        prow_inners.hover(function() {
            var _me = $(this),
                p2_title = _me.find('.p2-title'),
                color_img = _me.find('.p2-color-img'),
                gray_img = _me.find('.p2-gray-img');

            _me.addClass('rotate-on');
            // color_img.removeClass('hide');
            gray_img.addClass('hide');
            p2_title.removeClass('hide');

        }, function() {
            var _me = $(this),
                p2_title = _me.find('.p2-title'),
                color_img = _me.find('.p2-color-img'),
                gray_img = _me.find('.p2-gray-img');

            _me.removeClass('rotate-on');
            // color_img.addClass('hide');
            gray_img.removeClass('hide');
            p2_title.addClass('hide');
        });
    }
    var six_story = $('#six_story');
    function resizeP2Grid(){
        if(_win_width <= 960 && !_isMobile){
            six_story.removeClass('three').addClass('two');
            prow_inners.find('.p2-title').removeClass('rotate-right rotate-left');
            prow_inners.find('.p2-color-img').removeClass('rotate-right rotate-left');
            prow_inners.find('.p2-gray-img').addClass('none');
        }else if(_isMobile){
            six_story.removeClass('three').addClass('one');
            prow_inners.find('.p2-title').removeClass('rotate-right rotate-left hide');
            prow_inners.find('.p2-color-img').removeClass('rotate-right rotate-left');
            prow_inners.find('.p2-gray-img').addClass('none');
        }
    }
    resizeP2Grid();

// Page-3
    var page3 = $('#page3'),
        photo_wall = $('#photo_wall'),
        p3_ratio = 0.6313;   // h/w
    function resizePage3(ratio){
        if(_win_width > 960){
            var w = page3.outerWidth();
            page3.css('height', w*ratio + 'px');
        }else if(_win_width < 500){
            photo_wall.removeClass('five').addClass('three');
            page3.css('height', '700px');
        }
    }
    resizePage3(p3_ratio);

    var photo_ones = $('.photo-one'),
        photo_one_ratio = 0.66;
    function resizePhotoOne(ratio){
        photo_ones.each(function(i, e){
            var _me = $(e),
                w = _me.outerWidth();

            _me.css('height', w*ratio + 'px');
        });
    }
    resizePhotoOne(photo_one_ratio);
    if(!_isMobile){
        photo_ones.hover(function() {
            var _me = $(this);

            _me.find('.p3-color-img').removeClass('none');
            _me.find('.p3-gray-img').addClass('none');
        }, function() {
            var _me = $(this);

            _me.find('.p3-color-img').addClass('none');
            _me.find('.p3-gray-img').removeClass('none');
        });
    }
    // Full Image Broswer
    var links = photo_wall.find('a');
    photo_wall.on('click', '.photo-one', function(event) {
        event.preventDefault();
        var _me = $(this),
            link = parseInt(_me.find('a').data('index')),
            options = {
                index: link,
                event: event
            };
        console.log(link);
        blueimp.Gallery(links, options);
    });

// Footer: Page - 4
    var p4_wechat = $('#p4_wechat'),
        cctv_qr = $('#cctv_qr');

    p4_wechat.click(function(e){
        cctv_qr.hasClass('hide') ? cctv_qr.removeClass('hide') : cctv_qr.addClass('hide');
    });

// Scroll smoothly
    var _scroll_time = 1000;
    function scrollToAnimation(o, time, opt) {
        var st = o.scrollTop(),
            dis = opt.distance,
            start = (new Date()).getTime();

        time ? void(0) : time = 500;
        _cAF(_AF);
        animate();

        function animate() {
            var now = (new Date()).getTime(),
                elapsed = now - start,
                fraction = elapsed / time;

            if (fraction < 1) {
                var final = st + dis * Math.sin(fraction * Math.PI / 2);
                o.scrollTop(final);
                // setTimeout(animate, Math.min(25, time - elapsed));
                _AF = _rAF(animate);
            } else {
                // console.log('Complete Scroll...');
            }
        }
    }
    function smoothScroll() {
        _win.on('mousewheel DOMMouseScroll', function(e) {
            e.preventDefault();
            // console.log(e);
            e = e.originalEvent.wheelDelta / 120 || -e.originalEvent.detail / 3;

            e = -parseInt(_scroll_distance * e);
            log(e);

            scrollToAnimation(_win, _scroll_time, {
                distance: e
            });
        });
    }
    !_isMac && !_isMobile && smoothScroll();

// Func Tolls
    function getBCR(ele, type){
        if(type !== undefined){
            return ele.getBoundingClientRect()[type];
        }else{
            return ele.getBoundingClientRect();
        }
    }

    var center_images = $(".center-image");
    function centerImage(image_boxs){
    	image_boxs.each(function(i){
            var container = $(this),
                img = $("img", this),
        	    containerRatio = container.outerWidth() / container.outerHeight(),
    		    imgRatio = img.width() / img.height();

            container.css('position', 'relative');
    		if (imgRatio >= containerRatio){
    			img.css({"width":"auto","height":"105%"});
    		} else {
    			img.css({"width":"105%","height":"auto"});
    		}

    		img.css({
    			"position":"absolute",
    			"top":"50%",
    			"left":"50%",
    			"margin-top": -1 * img.height() * 0.5 +"px",
    			"margin-left": -1 * img.width() * 0.5 +"px"
    		});

    	});
    }

    function centerBgImage(img_boxs){
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
                    'background-size': 'auto 105%',
                    'background-position': '50% 50%'
                }) :
                box.css({
                    'background-size': '105% auto',
                    'background-position': '50% 50%'
                }) ;

        });
    }
}(jQuery, window));


// end
