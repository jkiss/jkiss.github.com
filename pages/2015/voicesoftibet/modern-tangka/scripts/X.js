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

    }).scroll(function(event) {

    });


// Preload
    var
        l_persent = $('#l_persent'),
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
            "source": "images/slider1-1@2x.jpg",
            "size": 222000
        },
        {
            "type": "IMAGE",
            "source": "images/slider1-2@2x.jpg",
            "size": 202000
        },
        {
            "type": "IMAGE",
            "source": "images/slider1-3@2x.jpg",
            "size": 298000
        },
        {
            "type": "IMAGE",
            "source": "images/slider2-1@2x.jpg",
            "size": 238000
        },
        {
            "type": "IMAGE",
            "source": "images/slider2-2@2x.jpg",
            "size": 220000
        },
        {
            "type": "IMAGE",
            "source": "images/slider2-3@2x.jpg",
            "size": 244000
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

          // Sliders
              var unslider1 = $('.m-slider-1').unslider({
                  speed: 500,               //  The speed to animate each slide (in milliseconds)
                  delay: 2800,              //  The delay between slide animations (in milliseconds)
                  complete: function() {},  //  A function that gets called after every slide animation
                  keys: true,               //  Enable keyboard (left, right) arrow shortcuts
                  dots: true,               //  Display dot navigation
                  fluid: false              //  Support responsive design. May break non-responsive designs
              });
              // Arrows
              $('.unslider-arrow-1').click(function() {
                  var fn = this.className.split(' ')[2];

                  unslider1.data('unslider')[fn]();
              });

              var
                  m_slider_2_title = $('#m_slider_2_title'),
                  slider_titles = [
                      '“There is a temple in my hometown, I hope one day my painting could find a place on the wall there,” Dela, 20, study in the Tanba Ramdan Tangka Arts school.',
                      '“The first requirement of Tangka painting is to sit still for a long time, then is the understanding of culture,” Norbu Sithar, 50, Head of Tibet Academy of Thangka Painting.',
                      '“It was a taboo to commercialize Tangka art, but now you can find Tangka studios everywhere in Barkhor Street. Profits from sales are very good,” Tashi, 38, a Tibetan journalist.'
                  ],
                  slider_panel = $('.m-slider-2').find('ul'),
                  unslider2 = $('.m-slider-2').unslider({
                  speed: 500,               //  The speed to animate each slide (in milliseconds)
                  delay: 2800,              //  The delay between slide animations (in milliseconds)
                  complete: function() {
                      var _left = slider_panel.attr('style');;

                      if(_left.indexOf('left: 0%') != -1){
                          m_slider_2_title.text(slider_titles[0]);
                      }else if(_left.indexOf('left: -100%') != -1){
                          m_slider_2_title.text(slider_titles[1]);
                      }else if(_left.indexOf('left: -200%') != -1){
                          m_slider_2_title.text(slider_titles[2]);
                      }

                      console.log(_left);
                  },
                  keys: true,               //  Enable keyboard (left, right) arrow shortcuts
                  dots: true,               //  Display dot navigation
                  fluid: false              //  Support responsive design. May break non-responsive designs
              });
              // Arrows
              $('.unslider-arrow-2').click(function() {
                  var fn = this.className.split(' ')[2];

                  unslider2.data('unslider')[fn]();
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
