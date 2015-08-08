/*
*     Author is Nokey -- 木马人
*/

function H5(opt){
    // Opts
    this.title_txt = opt.title_txt;
    this.thumbnail_src = opt.thumbnail_src;
    this.preload_array = opt.preload_array;
    this.music_ify = opt.music_ify || false;

    // Pre loading...
    this.p_bar = $('.l-progress-bar');
    this.p_txt = $('.l-persent');

    // HTML
    this.title = $('title');
    this.thumbnail = $('#thumbnail');
    this.loading_box = $('#loading_box');
    this.swipe_gesture = $('#swipe_gesture');
    this.music_play_btn = $('#music_play_btn');
    this.bg_music = $('#bg_music')[0];

    // Assume Parametors
    this.pageNumber = 0;
    this.contentList = $("#content");
    this.touchEndX = 0;
    this.touchStartX = 0;
    this.touchEndY = 0;
    this.touchStartY = 0;
    this.pageAll = $('#stage > div').length - 1;
    this.moving = false;
    this.swipeDir = 'top_down';  // this.swipeDir = 'left_right'

    // Event prefix, just test 'webkit'
    this.eventPrefix;
    this.vendors = { Webkit: 'webkit' };
}
H5.prototype.go = function(){
    var _me = this;
    // set Title
    _me.title.text(_me.title_txt);
    // set Thumbnail
    _me.thumbnail.attr('src', _me.thumbnail_src);
    // Forbid document swipe
    _me.contentList.on('touchstart touchmove touchend', function(e){
        e.preventDefault();
        e.stopPropagation();
    });
    // Preload images
    _me.preload();
    // Animation completed control
    _me.movCtrl();
    // Main movie loop
    _me.monitor();

    return _me;
};
H5.prototype.monitor = function(){
    var _me = this;

    // Register finger gesture event
    function startTouch(event){
        if(!event.touches.length){
            return ;
        }else{
            var finger = event.touches[0];
            // X-axis
            _me.touchStartX = finger.pageX;
            _me.touchEndX = 0;
            // Y-axis
            _me.touchStartY = finger.pageY;
            _me.touchEndY = 0;
        }
    }
    function moveTouch(event){
        event.preventDefault();
        if(!event.touches.length){
            return ;
        }else{
            var finger = event.touches[0];
            // X-axis
            _me.touchEndX = finger.pageX;
            // Y-axis
            _me.touchEndY = finger.pageY;
        }
    }
    function endTouch(event){
        // judge to upturning or downturning after Touch ACT
        var startX = _me.touchStartX,
            endX = _me.touchEndX,
            startY = _me.touchStartY,
            endY = _me.touchEndY;
        
        switch(_me.swipeDir){
            case 'left_right':
                // Left-Right-Page-Turn-Event
                if(endX && endX !== startX && endX - startX <= -25){
                    console.log('Rightturning...');
                    // screenForward();
                    _me.movTurn('forward');
                }else if(endX && endX !== startX && endX - startX >= 25){
                    console.log('Leftturning...');
                    // screenBack();
                    _me.movTurn('back');
                }
                break;
            case 'top_down':
                // Top-Down-Page-Turn-Event
                if(endY && endY !== startY && endY - startY <= -25){
                    console.log('Downturning...');
                    // screenForward();
                    _me.movTurn('forward');
                }else if(endY && endY !== startY && endY - startY >= 25){
                    console.log('Topturning...');
                    // screenBack();
                    _me.movTurn('back');
                }
                break;
            default:
                break;
        }
    }
    _me.contentList.on('touchstart', function(e) {
        !_me.moving && startTouch(e);
    });
    _me.contentList.on('touchmove', function(e) {
        !_me.moving && moveTouch(e);
    });
    _me.contentList.on('touchend', function(e) {
        !_me.moving && endTouch(e);
    });
    return _me;
}
H5.prototype.movie = function(){
    var _me = this;
    
    // Just a func...

    return _me;
};
H5.prototype.movTurn = function(sign){
    var _me = this;

    switch(sign){
        case 'forward':
            // Next Page
            if(_me.pageNumber < _me.pageAll){
                ++_me.pageNumber;
                // Gesture
                _me.swipe_gesture.css('display', 'none');
                // Movie Flow
                _me.movClear(_me.pageNumber);
                _me.movHide(_me.pageNumber - 1, 'forward');
                _me.movShow(_me.pageNumber, 'forward');
            }
            break;
        case 'back':
            // Prev Page
            if(_me.pageNumber > 0){
                --_me.pageNumber;
                // Gesture
                _me.pageNumber === 0 ? _me.swipe_gesture.css('display', 'block') : void(0);
                // Movie Flow
                _me.movClear(_me.pageNumber);
                _me.movHide(_me.pageNumber + 1, 'back');
                _me.movShow(_me.pageNumber, 'back');
            }
            break;
        default:
            break;
    }

    return this;
};
H5.prototype.movShow = function(num, dirType){
    var currentPage = $('#p' + num);
    // Page turn animation on the basis of "dirType"
    switch(dirType){
        case 'forward':
            currentPage.addClass(currentPage.data('forward-in-type'));
            break;
        case 'back':
            currentPage.addClass(currentPage.data('back-in-type'));
            break;
    }
    // Page-imgs animation
    currentPage.find('img').forEach(function(e){

    });
};
H5.prototype.movHide = function(num, dirType){
    var currentPage = $('#p' + num);
    // Page turn animation on the basis of "dirType"
    switch(dirType){
        case 'forward':
            currentPage.addClass(currentPage.data('forward-out-type'));
            break;
        case 'back':
            currentPage.addClass(currentPage.data('back-out-type'));
            break;
    }
    // Page-imgs animation
    currentPage.find('img').forEach(function(e){

    });
};
H5.prototype.movClear = function(num){
    $('#p' + num).removeClass();
};
H5.prototype.movCtrl = function(){
    var _me = this,
        startEvent, endEvent,
        Ele = document.createElement('div'),
        normalizeEvent = function(name){
            return _me.eventPrefix ? _me.eventPrefix + name : name.toLowerCase();
        };
    $.each(_me.vendors, function(vendor, event){
        if(Ele.style[vendor + 'TransitionProperty'] !== undefined){
            _me.eventPrefix = event;
            // console.log(_me.eventPrefix);
        }
    });
    startEvent = normalizeEvent('AnimationStart');
    endEvent = normalizeEvent('AnimationEnd');
    $('#stage > div').forEach(function(item){
        $(item).on(startEvent, function(e) {
            _me.moving = true;
            // console.log(_me.moving);
        });
        $(item).on(endEvent, function(e){
            _me.moving = false;
            // console.log(_me.moving);
        });
    });

    return _me;
};
H5.prototype.preload = function(){
    var _me = this;

    _me.preImage(_me.preload_array, function(){
        var mark = 0;

        // Hide loading ele
        _me.loading_box.addClass('fadeOut');
        setTimeout(function(){
            _me.loading_box.css('display', 'none');
        },300);

        // first page aniamtion
        _me.movShow(0, 'forward');

        // if there is a music, play it
        function autoPlay(){
            $('html').on('touchstart', function(event) {
                if(0 == mark){
                    _me.bg_music.play();
                    mark = 1;
                    _me.music_play_btn.addClass('eleCircle');

                    // Register music play btn event
                    _me.music_play_btn.on("click",function(){
                        if(_me.music.paused){
                            _me.music_play_btn.addClass("eleCircle");
                            _me.music.play();
                        }else{
                            _me.music_play_btn.removeClass("eleCircle");
                            _me.music.pause();
                        }
                    });
                }
            });
        }
        _me.music_ify && (_me.bg_music.oncanplay = autoPlay);
        console.log('preload callback end...');
    });
    return _me;
};
H5.prototype.preIndicator = function(current, total){
    var _me = this,
        persent = 0;

    persent = Math.round((current / total) * 100);

    _me.p_bar.css('width', persent + '%');
    _me.p_txt.text(persent + '%');
    console.log(current+':'+total+':'+persent);

    return _me;
}
H5.prototype.preImage = function(img_src_array, callback){
    // Tool func
    var _me = this,
        i_num = img_src_array.length,
        i_array = new Array(img_src_array.length),
        loaded_num = 0;

    i_num !== 0 && (function(){
        console.log('Start Preload...');
        for (var i = 0; i < i_array.length; i++) {
            i_array[i] = new Image();
            i_array[i].src = img_src_array[i];
            i_array[i].onload = function(){
                // console.log('Loaded_Num: '+(loaded_num+1));
                _me.preIndicator(loaded_num + 1, i_num);

                ++loaded_num && loaded_num === i_num && (function(){
                    console.log('End Preload...');
                    callback && callback();
                }());
            };
        };
    }());
};



//            To be continue...           //
