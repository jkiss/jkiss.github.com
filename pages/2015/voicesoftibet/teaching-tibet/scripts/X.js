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
        _isMobile = /mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(_ua);

// Response Parameters
    $(win).resize(function(){
        _win_height = _win.height();
        _win_width = _win.width();

        // Center image
        centerImage(center_images);

        // Center Bg images
        centerBgImage(center_bg_imgs);

        // Center eles
        centerEle(center_eles);

    }).scroll(function(event) {

    });


// Preload
    var
        l_persent = $('#l_persent');
        loading_wrap = $('#loading_wrap');
    var files = [
        {
            "type": "IMAGE",
            "source": "images/sub-title@2x.png",
            "size": 51000
        },
        {
            "type": "IMAGE",
            "source": "images/title-bg@2x.jpg",
            "size": 226000
        },
        {
            "type": "IMAGE",
            "source": "images/p1-1@2x.jpg",
            "size": 96000
        },
        {
            "type": "IMAGE",
            "source": "images/slider-1@2x.jpg",
            "size": 222000
        },
        {
            "type": "IMAGE",
            "source": "images/slider-2@2x.jpg",
            "size": 202000
        },
        {
            "type": "IMAGE",
            "source": "images/slider-3@2x.jpg",
            "size": 298000
        },
        {
            "type": "IMAGE",
            "source": "images/slider-4@2x.jpg",
            "size": 238000
        },
        {
            "type": "IMAGE",
            "source": "images/slider-5@2x.jpg",
            "size": 220000
        },
        {
            "type": "IMAGE",
            "source": "images/slider-6@2x.jpg",
            "size": 244000
        },
        {
            "type": "IMAGE",
            "source": "images/slider-13@2x.jpg",
            "size": 229000
        }
    ];
    $.html5Loader({
          filesToLoad: { 'files': files },
          onBeforeLoad: function() {},
          onComplete: function() {
              loading_wrap.animate({
                  'opacity': 0
              }, 1000, function(){
                  loading_wrap.addClass('none');
              });

              // Center image
              centerImage(center_images);

              // Center Bg images
              centerBgImage(center_bg_imgs);

              // Center eles
              centerEle(center_eles);

          // Slider 4
              var unslider = $('.m-slider').unslider({
                  speed: 500,               //  The speed to animate each slide (in milliseconds)
                  delay: 2800,              //  The delay between slide animations (in milliseconds)
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

          },
          onElementLoaded: function(obj, elm) {},
          onUpdate: function(percentage) {
            //   console.log(percentage);
            l_persent.text(percentage);
          }
    });

// Footer: Page - 4   ************************************ /
    var p4_wechat = $('#p4_wechat'),
        cctv_qr = $('#cctv_qr');

    p4_wechat.click(function(e){
        cctv_qr.hasClass('hide') ? cctv_qr.removeClass('hide') : cctv_qr.addClass('hide');
    });

// Scroll smoothly
    var
        _rAF = window.requestAnimationFrame,
        _cAF = window.cancelAnimationFrame,
        _AF = undefined,
        _scroll_distance = 280,
        _scroll_time = 1000;
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

    var center_eles = $(".center-ele");
    function centerEle(ele_boxs){
    	ele_boxs.each(function(i){
            var container = $(this),
                ele = container.find('.center-this'),
        	    containerRatio = container.outerWidth() / container.outerHeight(),
    		    eleRatio = ele.data('width') / ele.data('height');

            container.css('position', 'relative');
    		if (eleRatio >= containerRatio){
    			ele.css({"width":"auto","height":"100%"});
    		} else {
    			ele.css({"width":"100%","height":"auto"});
    		}

    		ele.css({
    			"position":"absolute",
    			"top":"50%",
    			"left":"50%",
    			"margin-top": -1 * ele.height() * 0.5 +"px",
    			"margin-left": -1 * ele.width() * 0.5 +"px"
    		});

    	});
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
    			img.css({"width":"auto","height":"100%"});
    		} else {
    			img.css({"width":"100%","height":"auto"});
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

    var center_bg_imgs = $('.center-bg-image');
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
