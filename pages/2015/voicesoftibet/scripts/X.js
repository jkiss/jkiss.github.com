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
        _isIpad = /ipad/.test(_ua),
        _isMobile = /mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(_ua),
        tap_event_name = _isMobile ? 'touchend' : 'click',

        center_eles = $(".center-ele"),
        center_bg_imgs = $('.center-bg-image');

// Response Parameters
    $(win).resize(function(){
        _win_height = _win.height();
        _win_width = _win.width();

        // Set Page1 height
        setPage1Height();

        // Page 2
        resizeP2Grid();

        // Page 3
        resizePage3(p3_ratio);
        resizePhotoOne(photo_one_ratio);

        // Center image
        centerImage(center_images);

        // Center Bg images
        centerBgImage(center_bg_imgs);

        centerEle(center_eles);

        setPageHeight();

        // Tibet Map
        tibet_map.init(_win_width).updatePoints();
    }).scroll(function(event) {
        // scrollMonitor(scenes);
        scroll_monitor.monitor();
    });

    $('#loading_wrap').on('touchmove', function(event) {
        event.preventDefault();
        event.stopPropagation();
    });

    function setPage1Height(){
        $('#page1').css('height', _win_height + 'px');
    }
    setPage1Height();

//＊＊＊＊＊＊ 视差滚动 ＊＊＊＊＊＊//
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
        }
        // else{
        //     ele.css('top', y + 'px');
        // }
    }
    var parallax_pages = $('.parallax-page'),
        parallax_ratio = 0.8;
    function setPageHeight(){
        parallax_pages.each(function(i) {
            var _me = $(this);
            _me.attr('data-height', _me.outerHeight());
        });
    }
    function parallax(){
        parallax_pages.each(function(i) {
            var _me = $(this),
                parallax_box = _me.find('.parallax-box'),
                _top = getBCR(this, 'top'),
                page_h = _me.attr('data-height');

            if(!_me.hasClass('no-parallax') && _top < 0 && Math.abs(_top) < page_h){
                translateY(parallax_box, Math.abs(_top) * parallax_ratio);
            }else if(_top >= 0){
                translateY(parallax_box, 0);
            }
        });
        !_isMobile && requestAnimationFrame(parallax);
    }
    function noParallax(){
        parallax_pages.each(function(index, el) {
            var _me = $(this);
            if(!_me.hasClass('no-parallax')){
                _me.addClass('no-parallax');
            }
        });
    }
    !_isMobile && requestAnimationFrame(parallax);
    // When you scroll web page(touchmove event is triggered) ALL aniamtion will
    // stop immediately, and I think there should be less effect on Mobile Device
    // to make a better Read experience!
    _isMobile && noParallax();

//＊＊＊＊＊＊ BLAST TEXT ＊＊＊＊＊＊//
    $("#page1 h1").blast({
        delimiter: "character",
        search: false,
        tag: "span",
        customClass: "just-hide",
        generateIndexID: false,
        generateValueClass: false,
        stripHTMLTags: false,
        returnGenerated: true,
        aria: true
    });

//＊＊＊＊＊＊   Slider   ＊＊＊＊＊＊//
    var unslider_50years = $('.info-map').unslider({
        keys: true,
        arrows: false,
        nav: false,
        autoplay: true
    });
    // Arrows
    $('.info-map-unslider').click(function() {
        var fn = this.className.split(' ')[2];

        unslider_50years.data('unslider')[fn]();
    });
    // Swipe
    $('.info-map').on('swipeleft', function(e){
        unslider_50years.next();
    })
    .on('swiperight', function(e){
        unslider_50years.prev();
    });

// ＊＊＊＊＊＊    Pre-Loder    ＊＊＊＊＊＊//
    var
        l_persent = $('#l_persent'),
        triangle_down = $('#triangle_down'),
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
            },
            {
                "type": "IMAGE",
                "source": "images/map/map-bg@2x.png",
                "size": 451407
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

                      // After Home page show
                      $('#page1 h1').find('.blast').velocity('transition.flipBounceXIn', {
                          delay: 100,
                          stagger: 80,
                          drag: true
                      });
                      $('#page1 .zangwen').velocity('transition.whirlIn', {
                          delay: 1200
                      });
                      setTimeout(function(){
                          triangle_down.removeClass('just-hide').addClass('swipeDown');
                      }, 1800);
                  });

                  // Center image
                  centerImage(center_images);

                  // Center Bg images
                  centerBgImage(center_bg_imgs);

                  centerEle(center_eles);

                  setPageHeight();

                  // Tibet Map
                  tibet_map.init(_win_width).updatePoints();
              },
              onElementLoaded: function(obj, elm) {},
              onUpdate: function(percentage) {
                  console.log(percentage);
                  l_persent.text(percentage);
              }
        });

    }
    init();

// ＊＊＊＊＊＊＊   Scroll Monitor    ＊＊＊＊＊＊＊//
    function ScrollMonitor(scenes){
        this.scenes = scenes || [];
    }
    ScrollMonitor.prototype.monitor = function(){
        var _me = this;

        _me.scenes.forEach(function(obj){
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

        return _me;
    };
    ScrollMonitor.prototype.addScene = function(scene){
        var _me = this;

        _me.scenes.push(scene);

        return _me;
    };
    var
        scenes = [
            {
                ele: $('#s_img_left'),
                trigger: $('#page2'),
                duration: _win_height - 10,
                delay: 0,
                did: false,
                className: 'symbol-img-show'
            },
            {
                ele: $('#s_img_center'),
                trigger: $('#page2'),
                duration: _win_height - 10,
                delay: 300,
                did: false,
                className: 'symbol-img-show'
            },
            {
                ele: $('#s_img_right'),
                trigger: $('#page2'),
                duration: _win_height - 10,
                delay: 100,
                did: false,
                className: 'symbol-img-show'
            }
        ],
        scroll_monitor = new ScrollMonitor(scenes);

// ＊＊＊＊＊＊＊   Page - 2: 3d rotate    ＊＊＊＊＊＊＊//
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
        if(!_isMobile){
            if(_win_width <= 960){
                six_story.removeClass('three').addClass('two');
                prow_inners.find('.p2-title').removeClass('rotate-right rotate-left');
                prow_inners.find('.p2-color-img').removeClass('rotate-right rotate-left');
                prow_inners.find('.p2-gray-img').addClass('none');
            }else{
                six_story.removeClass('two').addClass('three');
                $.each($.merge(prow_inners.find('.p2-title'), prow_inners.find('.p2-color-img')), function(index, el) {
                    index % 2 === 0 ? $(el).addClass('rotate-left') : $(el).addClass('rotate-right');
                });
                prow_inners.find('.p2-gray-img').removeClass('none');
            }
        }else{
            six_story.removeClass('three').addClass('one');
            prow_inners.find('.p2-title').removeClass('rotate-right rotate-left hide');
            prow_inners.find('.p2-color-img').removeClass('rotate-right rotate-left');
            prow_inners.find('.p2-gray-img').addClass('none');
        }
    }
    resizeP2Grid();

// ＊＊＊＊＊＊＊   Tibet Map    ＊＊＊＊＊＊＊//
function TibetMap(opts){
    this.ref_w = opts.ref_w;
    this.ref_h = opts.ref_h;
    this.m_ref_w = opts.m_ref_w;
    this.m_ref_h = opts.m_ref_h;
    this.now_w = 0;
    this.now_h = 0;
    this.zoom_ratio = 0;
    this.points = [];
    this.map_box = opts.map_box;
    this.map_bg = opts.map_bg;
    this.po_lines = opts.po_lines;
    this.isM = false;
}
TibetMap.prototype.init = function(win_w){
    var _me = this;

    // Change images urls for Response
    if(win_w <= 750){
        _me.isM = true;
        _me.map_bg.attr('src', _me.map_bg.data('mobile-src'));
        _me.po_lines.each(function(index, el) {
            var line_img = $(this);
            line_img.attr('src', line_img.data('mobile-src'));
        });
    }else{
        _me.isM = false;
        _me.map_bg.attr('src', _me.map_bg.data('pc-src'));
        _me.po_lines.each(function(index, el) {
            var line_img = $(this);
            line_img.attr('src', line_img.data('pc-src'));
        });
    }

    // compute map-bg's width & height
    _me.now_w = _me.map_bg.width();
    _me.now_h = _me.map_bg.height();

    // init map zoom ratio
    if(_me.isM){
        _me.zoom_ratio = _me.now_w / _me.m_ref_w;
    }else{
        _me.zoom_ratio = _me.now_w / _me.ref_w;
    }

    return this;
};
TibetMap.prototype.updatePoints = function(){
    var _me = this;

    $.each(_me.points, function(index, el) {
        try{
            el.updateSelf(_me.zoom_ratio, _me.isM);
        }catch(e){
            console.log(e.name+': '+e.message);
        }
    });

    return this;
};
TibetMap.prototype.addPoints = function(ps){
    var _me = this;

    $.each(ps, function(index, el) {
        _me.points.push(el);
    });

    return this;
};
// Point
function Point(opts) {
    this.ref_x = opts.ref_x;
    this.ref_y = opts.ref_y;
    this.m_ref_x = opts.m_ref_x;
    this.m_ref_y = opts.m_ref_y;
    this.point_box = opts.point_box;
}
Point.prototype.init = function(delay){
    var _me = this;

    // Animation of instance point
    if(!!delay){
        setTimeout(function(){
            // _me.point_box.find('.dot-1').velocity({
            //     scale: 1.1
            // },{
            //     duration: 1000,
            //     loop: true
            // });
            _me.point_box.find('.dot-1').addClass('animate-pulse');
        }, delay);
    }
    _me.point_box.hover(function() {
        _me.point_box.find('.po-logo').velocity('stop').velocity('transition.slideRightIn');
    }, function() {

    });

    return this;
};
Point.prototype.updateSelf = function(ratio, isM){
    var _me = this;

    if(isM){
        _me.point_box.css({
            'left': _me.m_ref_x * ratio + 'px',
            'top': _me.m_ref_y * ratio + 'px'
        });
    }else{
        _me.point_box.css({
            'left': _me.ref_x * ratio + 'px',
            'top': _me.ref_y * ratio + 'px'
        });
    }

    return this;
};
Point.prototype.addClick = function(fn, ctx){
    var _me = this;

    _me.point_box.on(tap_event_name, function(event) {
        fn.call(ctx, _me.point_box.attr('id'));
    });

    return this;
};

var
    point_1 = new Point({
        'ref_x': 651,
        'ref_y': 340,
        'm_ref_x': 156,
        'm_ref_y': 351,
        'point_box': $('#point_1')
    }),
    point_2 = new Point({
        'ref_x': 1018,
        'ref_y': 245,
        'm_ref_x': 542,
        'm_ref_y': 250,
        'point_box': $('#point_2')
    }),
    point_3 = new Point({
        'ref_x': 1205,
        'ref_y': 513,
        'm_ref_x': 731,
        'm_ref_y': 537,
        'point_box': $('#point_3')
    }),
    point_4 = new Point({
        'ref_x': 1195,
        'ref_y': 650,
        'm_ref_x': 727,
        'm_ref_y': 677,
        'point_box': $('#point_4')
    }),
    point_5 = new Point({
        'ref_x': 1135,
        'ref_y': 760,
        'm_ref_x': 641,
        'm_ref_y': 795,
        'point_box': $('#point_5')
    });

var
    tibet_map_opts = {
        ref_w: 1920,
        ref_h: 854,
        m_ref_w: 1080,
        m_ref_h: 891,
        map_box: $('#tibet_map'),
        map_bg: $('#map_bg'),
        po_lines: $('#tibet_map').find('.po-line')
    },
    tibet_map = new TibetMap(tibet_map_opts);

    tibet_map.addPoints([point_1.init(900), point_2.init(200), point_3.init(600), point_4.init(400), point_5.init(700)]);


// Point content
var point_content_data = {
    'point_1': {
        'txt': [
            'Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. Meggings cred before they sold out messenger bag, ugh fashion axe Pitchfork tousled freegan asymmetrical literally twee Thundercats. Whatever Blue Bottle Neutra irony 8-bit. Kogi ethnic ugh fashion axe bicycle rights.',
            'Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. Meggings cred before they sold out messenger bag, ugh fashion axe Pitchfork tousled freegan asymmetrical literally twee Thundercats. Whatever Blue Bottle Neutra irony 8-bit. Kogi ethnic ugh fashion axe bicycle rights.',
            'Portland ugh fashion axe Helvetica, YOLO Echo Park Austin gastropub roof party. Meggings cred before they sold out messenger bag, ugh fashion axe Pitchfork tousled freegan asymmetrical literally twee Thundercats. Whatever Blue Bottle Neutra irony 8-bit. Kogi ethnic ugh fashion axe bicycle rights.'],
        'video': {
            file: 'http://content.jwplatform.com/videos/fVRB9fjI-OysY4Uvp.mp4',
            image: 'http://content.jwplatform.com/thumbs/fVRB9fjI-1280.jpg',
            mediaid: 'fVRB9fjI'
        }
    },
    'point_2':{
        'title': 'Not just British, Tibetans are also fans of tea with milk',
        'txt': [
            'A day in Tibet starts only when people finish their sweet milk tea, and teahouses can be found everywhere there, especially Lhasa.',
            'On the streets of Lhasa, the digital revolution is easy to see. Still, in remote towns, the latest news is spread via the teahouses, rather than social media.',
            'Decorated simply in Tibetan style and resting on street corners, the teahouses are popular but can be hard to notice for non-locals. However, once inside, the smell of sweet milk tea and Tibetan snacks make for a compelling atmosphere.',
            'The most popular breakfast set is a bowl of Tibetan noodles with a bottle of sweet milk tea. In some places, customers bring their own tea bottles to be filled.',
            'Different from the famous yak-butter tea, sweet milk tea did not originate from Tibet. There are various legends about the prevalence of teahouse in Tibet. One common idea is that when the British briefly invaded in 1903, their fancy for tea with milk influenced the locals to try it themselves.'
        ],
        'pics': [{
            src: 'images/map/po-content/2/a.jpg',
            w: 1200,
            h: 800
        }, {
            src: 'images/map/po-content/2/c.jpg',
            w: 1200,
            h: 800
        }, {
            src: 'images/map/po-content/2/e.jpg',
            w: 1200,
            h: 800
        }, {
            src: 'images/map/po-content/2/g.jpg',
            w: 1200,
            h: 800
        }, {
            src: 'images/map/po-content/2/h.jpg',
            w: 1200,
            h: 800
        }, {
            src: 'images/map/po-content/2/i.jpg',
            w: 1200,
            h: 800
        }, {
            src: 'images/map/po-content/2/j.jpg',
            w: 1200,
            h: 800
        }]
    },
    'point_3':{
        'title': 'Guarding history',
        'txt': [
            'Before morning breaks in the Valley of the Kings (Tombs of Tibetan Kings), Tenzin Phuntsok’s day begins around the ancient tombs. The 25-year-old monk, together with 68-year-old Jampa Choesang, are guardians of the biggest mausoleum found in Tibet, located at the southern bank of the Yarlung Zangbo River in Shannan Prefecture.',
            'From dawn to dusk, their lives echo the illuminated ghee lamps of the temple.',
            'Check our full reportage on the story of the prairie here: <a href="./tomb-watcher/">Tomb Watcher</a>'
        ],
        'pics': [{
            src: 'images/map/po-content/3/a.jpg',
            w: 1200,
            h: 675
        }, {
            src: 'images/map/po-content/3/b.jpg',
            w: 1200,
            h: 800
        }, {
            src: 'images/map/po-content/3/c.jpg',
            w: 1200,
            h: 800
        }]
    },
    'point_4': {
        'title': 'Life on the prairie',
        'txt': [
            'When it comes to sheep, there is no place like Tibet that can provide a better atmosphere and habitat to live. In Tibetan culture, sheep are highly regarded as sacred figures and pasturing is still an important lifestyle in the region. While for sheepherders, life on grassland demands the strongest ability to endure loneliness and deal with the ever-changing weather patterns.',
            'CCTVNEWS tagged along with Ga Tsering, a 49-year-old sheepherder who lives in the Chegu Prairie, as he shared his experiences of living half his life on the grasslands of an altitude of 4.7 km.',
            'Check our full reportage on the story of the prairie here: <a href="./days-with-sheep/">Days With Sheep</a>'
        ],
        'pics': [{
            src: 'images/map/po-content/4/1.jpg',
            w: 1200,
            h: 800
        }, {
            src: 'images/map/po-content/4/3.jpg',
            w: 1200,
            h: 797
        }, {
            src: 'images/map/po-content/4/7.jpg',
            w: 1200,
            h: 797
        }, {
            src: 'images/map/po-content/4/8.jpg',
            w: 1200,
            h: 800
        }, {
            src: 'images/map/po-content/4/10.jpg',
            w: 1200,
            h: 800
        }]
    }
};
function PointContent(opts){
    // the content of every points
    this.points_content = opts.points_content;

    /**
     * the point's video will be insert to here: [url]
     *     <script src="//content.jwplatform.com/players/***.js"></script>
     */
    this.video_wrap = opts.video_wrap;
    this.video_box = opts.video_box;

    /**
     * the point's pictures will be insert to here: [url, url, ...]
     *    <li>
     *        <img src="images/url">
     *    <li>
     */
    this.pics_wrap = opts.pics_wrap;
    this.pics_box = opts.pics_box;

    /**
     * the point's text description: ['txt', 'txt', ...]
     *      <p>
     *          some text
     *      </p>
     */
    this.txts_wrap = opts.txts_wrap;

    /**
     * judge the content is Video or Images?
     */
    this.isVideo = false;

    /**
     * Unslider
     */
    this.po_unslider = null;
    this.po_unslider_first_init = true;

    /**
     * jwplayer
     */
     this.playerInstance = null;
     this.playerInstance_first_init = true;

     /**
      * IScroll
      */
     this.po_txt_scroll = null;
     this.po_txt_scroll_first_init = true;
     this.po_content_scroll = null;
     this.po_content_scroll_first_init = true;

     /**
      * Register CloseBtn Event flag
      */
     this.close_btn_registed = false;

     this.moving = false;
     this.closeDone = false;
}
PointContent.prototype.init = function(po_id){
    /**
     * @param {po_id}: 'po1'
     * @param {p_content}: '{}'
     */
    var _me = this,
        p_content = _me.points_content[po_id];

    !!p_content['pics'] ? _me.isVideo = false : _me.isVideo = true;

    $('#point_content_wrap').removeClass('none');

    /**
     * 这里其实就涉及到了流程，涉及简单的异步操作。首先要先清理模版里面上次填充的
     * 内容，然后添加新的内容，接着进行出场动画，并异步请求图片和视频。
     */
     // Clear existent content

    /**
     * Txt HTML string
     */
    var txtHTML = '', mediaHTML = '';
    if(p_content['title']){
        txtHTML += '<h2>'+ p_content['title'] +'</h2>';
    }
    $.each(p_content['txt'], function(index, el) {
        txtHTML += '<p>'+ el +'</p>';
    });
    _me.txts_wrap.empty().append(txtHTML);

    // Something to care about is: IScroll will go wrong when init Element which's
    // 'display' is 'none'.
    if(_me.po_txt_scroll_first_init && _win_width > 750){
        _me.po_txt_scroll = new IScroll('#po_txt_iscroll', {
            scrollbars: true,
		    mouseWheel: true,
		    interactiveScrollbars: true,
		    shrinkScrollbars: 'scale',
		    fadeScrollbars: true
        });
        _me.po_txt_scroll_first_init = false;
    }else if(!_me.po_txt_scroll_first_init && _win_width > 750){
        _me.po_txt_scroll.refresh();
    }

    // media HTML String
    if(!_me.isVideo){
        // content are pictures
        _me.video_box.addClass('none');
        _me.pics_box.removeClass('none');

        if(_win_width <= 750){
            $('#po_media_wrap').css('height', (_win_width * 10 / 16) + 'px');
        }

        var load_files = [];

        $.each(p_content['pics'], function(index, el) {
            mediaHTML += '<li class="center-ele"><img class="center-this" data-width="'+ el.w +'" data-height="'+ el.h +'" src="' + el.src +'" alt="png"></li>';

            load_files.push({
                'type': 'IMAGE',
                'source': el.src,
                'size': 1000
            });
        });

        _me.pics_wrap.empty().append(mediaHTML);

        // Start img slider, it should be init just once, unslider has a method
        // named 'calculateSlides()', if slide gets added or removed(that's mean
        // slide's content will be changed),you should call this otherwise things'll
        // probably break.
        if(_me.po_unslider_first_init){
            _me.po_unslider = $('#po_unslider').unslider({
                nav: false,
                autoplay: true,
                arrows: false
            });
            // console.log(_me.po_unslider.data('unslider').calculateSlides);
            $('.po-unslider-btn').on(tap_event_name ,function() {
                var fn = this.className.split(' ')[2];

                _me.po_unslider.data('unslider')[fn]();
            });

            _me.po_unslider_first_init = false;
        }else{
            // TODO: unslider don't have a useful method to reset the slider!
            // var total = p_content['pics'].length;
            //
            // _me.po_unslider.find('ul').css('width', (total * 100) + '%');
            // _me.po_unslider.find('li').css('width', (100 / total) + '%');
            _me.po_unslider.data('unslider').calculateSlides();
            // console.log(_me.po_unslider.data('unslider'));
        }

        // Center images
        $.html5Loader({
            filesToLoad: { 'files': load_files },
            onComplete: function(){
                var new_imgs = $('#po_piture_box').find('.center-ele');
                // just center once...
                centerEle(new_imgs);
            },
        });
    }else{
        // Content is video
        // mediaHTML = '<script type="application/javascript" src="'+ p_content['video'] +'"></script>';

        _me.video_box.removeClass('none');
        _me.pics_box.addClass('none');

        _me.video_box.css('height', _me.video_box.width()/16*9 + 'px');

        if(_me.playerInstance_first_init){
            _me.playerInstance = jwplayer('po_jwplayer_wrap');

            _me.playerInstance.setup({
                file: p_content['video'].file,
                image: p_content['video'].image,
                width: '100%',
                mediaid: p_content['video'].mediaid
            });

            _me.playerInstance_first_init = false;
        }else{
            _me.playerInstance.setup({
                file: p_content['video'].file,
                image: p_content['video'].image,
                width: '100%',
                mediaid: p_content['video'].mediaid
            });
        }
    }

    // Init IScroll Content
    if(_me.po_content_scroll_first_init && _win_width <= 750){
        _me.po_content_scroll = new IScroll('#po_content_wrap', {
            scrollbars: true,
		    mouseWheel: true,
		    interactiveScrollbars: true,
		    shrinkScrollbars: 'scale',
		    fadeScrollbars: true
        });

        _me.po_content_scroll_first_init = false;
    }else if(!_me.po_content_scroll_first_init && _win_width <= 750){
        _me.po_content_scroll.refresh();
    }

    /*
     * Start opening animation
     */
    _me.openAnimation(po_id);

    return this;
};
PointContent.prototype.resetContent = function(point_id, point_content){

};
PointContent.prototype.openAnimation = function(po_id){
    /***********************************************
     *             Start opening animation         *
     ***********************************************/
    var
        _me = this,
        point_content_wrap = $('#point_content_wrap'),
        point_content_bg = $('#point_content_bg'),
        po_media_wrap = $('#po_media_wrap'),
        po_txt_box = $('#po_txt_box'),
        po_close_btn = $('#po_close_btn'),
        diagonal_line = 0,
        scale_val = 0,
        point = $('#' + po_id);

    _me.moving = true;

    /**
     * // point_content_wrap.removeClass('none');
     * 此语句提前，因为 IScroll 插件初始化 display: none 的元素会出错，不能计算出高度
     */

    if(_win_width <= 750){
        var point_bcr = getBCR(point.get(0));

        point_content_bg.css({
            left: point_bcr.left + 'px',
            top: point_bcr.top + 'px'
        });
    }else{
        point_content_bg.css({
            left: point.css('left'),
            top: point.css('top')
        });
    }

    /**
     * Calculate Scale-Ratio according to diagonal line length
     */
    diagonal_line = Math.sqrt(Math.pow(point_content_wrap.width(), 2) + Math.pow(point_content_wrap.height(), 2));
    // point content bg will scale to this val
    scale_val = parseInt(diagonal_line) / 10;
    // console.log(scale_val);

    /**
     * Aniamte point content frame: 首先根元素 visible，组件display: block，然后进行
     * 背景、左侧内容、右侧内容和关闭按钮的动画
     */

    // point_content_bg.velocity({
    //     scaleX: scale_val,
    //     scaleY: scale_val
    //     // width: diagonal_line*2 + 'px',
    //     // height: diagonal_line*2 + 'px',
    //     // 'margin-left': -1 * diagonal_line + 'px',
    //     // 'margin-top' : -1 * diagonal_line + 'px'
    // },{
    //     duration: 500
    // });
    point_content_bg.css({
        '-webkit-transform': 'scale('+scale_val+')',
        'transform': 'scale('+scale_val+')',
        '-webkit-transition': 'all .8s ease',
        'transition': 'all .8s ease'
    });

    // Media animation
    po_media_wrap.velocity({
        opacity: 1
    },{
        duration: 500,
        delay: 500
    });

    // Text animation
    po_txt_box.velocity('transition.slideLeftIn', {
        duration: 500,
        delay: 1000,
        complete: function(){
            _me.moving = false;
        }
    });

    // Close btn
    po_close_btn.removeClass('just-hide');
    if(!_me.close_btn_registed){
        po_close_btn.on('click', function(event) {
            _me.close({
                'point_content_wrap': point_content_wrap,
                'point_content_bg': point_content_bg,
                'po_media_wrap': po_media_wrap,
                'po_txt_box': po_txt_box,
                'po_close_btn': po_close_btn,
            });
        });

        _me.close_btn_registed = true;
    }

    return this;
};
PointContent.prototype.close = function(obj){
    var _me = this;

    if(!_me.moving){
        // obj['point_content_wrap'].velocity({
        //     opacity: 0
        // },{
        //     duration: 300,
        //     complete: function(){
        //
        //     }
        // });
        obj['point_content_wrap'].addClass('hide');
        setTimeout(function(){
            obj['point_content_wrap'].addClass('none').removeClass('hide');

            obj['point_content_bg'].attr('style', '');
            obj['po_media_wrap'].attr('style', '');
            obj['po_txt_box'].attr('style', '');

            $('body').css('overflow', 'auto');
        }, 300);

        if(_me.isVideo){
            // TODO: When to empty the Media Content, video will continue playing
            // when user close "point content" if video has been played!
            _me.playerInstance.stop();
        }
    }

    return this;
};

var
    point_content_opts = {
        points_content: point_content_data,
        video_wrap: $('#po_jwplayer_wrap'),
        pics_wrap: $('#po_unslider').find('ul'),
        video_box: $('#po_video_box'),
        pics_box: $('#po_piture_box'),
        txts_wrap: $('#po_txt_wrap').find('.iscroll-box')
    },
    point_content = new PointContent(point_content_opts);
    console.log(point_content_opts.points_content);

point_1.addClick(point_content.init, point_content);
point_2.addClick(point_content.init, point_content);
point_3.addClick(point_content.init, point_content);
point_4.addClick(point_content.init, point_content);


// ＊＊＊＊＊＊＊   Page-3    ＊＊＊＊＊＊＊//
    var page3 = $('#page3'),
        photo_wall = $('#photo_wall'),
        p3_ratio = 0.6313;   // h/w
    function resizePage3(ratio){
        if(_win_width >= 500){
            var w = page3.outerWidth();

            _win_width > 960 ? page3.css('height', w*ratio + 'px') : page3.css('height', '600px');
            photo_wall.removeClass('three').addClass('five');
        }else if(_win_width < 500){
            photo_wall.removeClass('five').addClass('three');
            _win_width > 400 ? page3.css('height', '800px') : page3.css('height', '700px');
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
    var p3_color_imgs = $('.p3-color-img'),
        p3_gray_img = $('.p3-gray-img');
    if(!_isMobile){
        photo_ones.hover(function() {
            var _me = $(this);

            _me.find('.p3-color-img').removeClass('envisible');
            _me.find('.p3-gray-img').addClass('envisible');
        }, function() {
            var _me = $(this);

            _me.find('.p3-color-img').addClass('envisible');
            _me.find('.p3-gray-img').removeClass('envisible');
        });
    }else{
        p3_color_imgs.removeClass('envisible');
        p3_gray_img.addClass('envisible');
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
        // console.log(link);
        blueimp.Gallery(links, options);
    });

// ＊＊＊＊＊＊＊    Footer: Page - 4    ＊＊＊＊＊＊＊//
    var p4_wechat = $('#p4_wechat'),
        cctv_qr = $('#cctv_qr');

    p4_wechat.click(function(e){
        cctv_qr.hasClass('hide') ? cctv_qr.removeClass('hide') : cctv_qr.addClass('hide');
    });

// ＊＊＊＊＊＊＊    Scroll smoothly    ＊＊＊＊＊＊＊//
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

/********************************
 *         Func Tolls           *
 ********************************/
    function getBCR(ele, type){
        if(type !== undefined){
            return ele.getBoundingClientRect()[type];
        }else{
            return ele.getBoundingClientRect();
        }
    }

    function centerEle(ele_boxs){
    	ele_boxs.each(function(i, e){
            var
                container = $(this),
                eles = container.find('.center-this'),
        	    containerRatio = container.outerWidth() / container.outerHeight();

            // nested center box
            container.hasClass('center-this') ? void(0) : container.css('position', 'relative');

            eles.each(function(index, el) {
                var
                    ele = $(this),
                    eleRatio = ele.data('width') / ele.data('height');

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
    	});
    }

    var center_images = $(".center-image");
    function centerImage(image_boxs){
    	image_boxs.each(function(i){
            var container = $(this),
                img = $("img", this),
        	    containerRatio = container.outerWidth() / container.outerHeight(),
    		    imgRatio = img.width() / img.height();

            // make sure img wrap's position is relative
            container.css('position', 'relative');

    		if (imgRatio >= containerRatio){
    			img.css({"width":"auto","height":"105%"});
    		} else {
    			img.css({"width":"105%","height":"auto"});
    		}
            console.log(imgRatio);
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
