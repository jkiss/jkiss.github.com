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

/************    Funcs to prepare    ************/

// Show Elements gradually

// Next Page
function slideLeft(){
    if(!moving){
        moving = true;
        BLASTS.velocity({
            'opacity': 0
        }, 100);
        weapon_detail.velocity({
            'opacity': 0
        }, 100);
        weapon_txts.removeClass('open-txt');
        for (var i = 0; i < weapons.length; i++) {
            var _pos = parseInt(weapons[i].data('pos'));
            _pos = ++_pos > 5 ? 0 : _pos;
            weapons[i].data('pos', _pos);
            weapons[i].velocity({
                'width': weapon_slide_pos[_pos].width,
                'top': weapon_slide_pos[_pos].top,
                'left': weapon_slide_pos[_pos].left,
                'opacity': weapon_slide_pos[_pos].opacity
            }, 500, 'ease-out', function(){
                var _me = $(this);
                if(_me.data('pos') == 0){
                    var weapon_txt = $('#'+_me.data('txtid'));
                    weapon_txt.addClass('open-txt');
                    weapon_txt.find('.blast').velocity('fadeIn',{
                        delay: 500,
                        stagger: 180,
                        drag: true
                    });
                    setTimeout(function(){
                        weapon_txt.find('.weapon-detail').velocity({
                            'opacity': 1
                        }, 500, function(){
                            moving = false;
                        });
                    }, 1800);
                }
            });
        }

    }
}
// Prev Page
function slideRight(){
    if(!moving){
        moving = true;
        BLASTS.velocity({
            'opacity': 0
        }, 100);
        weapon_detail.velocity({
            'opacity': 0
        }, 100);
        weapon_txts.removeClass('open-txt');
        for (var i = 0; i < weapons.length; i++) {
            var _pos = parseInt(weapons[i].data('pos'));
            _pos = --_pos < 0 ? 5 : _pos;
            weapons[i].data('pos', _pos);
            weapons[i].velocity({
                'width': weapon_slide_pos[_pos].width,
                'top': weapon_slide_pos[_pos].top,
                'left': weapon_slide_pos[_pos].left,
                'opacity': weapon_slide_pos[_pos].opacity
            }, 500, 'ease-out', function(){
                var _me = $(this);
                if(_me.data('pos') == 0){
                    var weapon_txt = $('#'+_me.data('txtid'));
                    weapon_txt.addClass('open-txt');
                    weapon_txt.find('.blast').velocity('fadeIn',{
                        delay: 500,
                        stagger: 180,
                        drag: true
                    });
                    setTimeout(function(){
                        weapon_txt.find('.weapon-detail').velocity({
                            'opacity': 1
                        }, 500, function(){
                            moving = false;
                        });
                    }, 1800);
                }
            });
        }

    }
}

function startTouch(event){
    if(!event.touches.length){
        return ;
    }else{
        var finger = event.touches[0];
        touchStartX = finger.pageX;
        touchEndX = 0;
    }
}
function moveTouch(event){
    event.preventDefault();
    if(!event.touches.length){
        return ;
    }else{
        var finger = event.touches[0];
        touchEndX = finger.pageX;
    }
}
function endTouch(event){
    // judge to upturning or downturning after Touch ACT
    var startX = touchStartX,
        endX = touchEndX;
    if(endX && endX !== startX && endX - startX <= -25){
        console.log('Left...');
        slideLeft();
    }else if(endX && endX !== startX && endX - startX >= 25){
        console.log('Right...');
        slideRight();
    }
}

/************   START  MOVIE   ************/

// Assume Parametors
var screenHeight = $(window).height(),
    screenWidth = $(window).width(),
    pageNumber = 0,
    currentDistance = 0,
    contentList = $(".content-list"),
    touchEndX,touchStartX,
    translateStr = 'translate3d(0, -{Y}px, 0)',
    transitionStr = 'all .5s ease',
    pageAll = $('.ctt-li').length - 1,
    moving = false,
    p_txt = $('#l_persent'),
    can_turn_page = false,

    loading_box = $('#loading_box'),
    l_3d_box = $('.l-3d-box'),
    l_progress = $('.l-progress'),

    BLASTS,
    weapon_detail = $('.weapon-detail');
    weapons = [
        $('.weapon1'),
        $('.weapon2'),
        $('.weapon3'),
        $('.weapon4'),
        $('.weapon5'),
        $('.weapon6')
    ],
    weapon_txts = $('.weapon-txt'),
    weapon_slide_pos = [{
        width: '80%',
        left: '13%',
        top: '38%',
        opacity: '1'
    },{
        width: '25%',
        left: '-5%',
        top: '30%',
        opacity: '.8'
    },{
        width: '20%',
        left: '14%',
        top: '20%',
        opacity: '.6'
    },{
        width: '20%',
        left: '42%',
        top: '12%',
        opacity: '.4'
    },{
        width: '20%',
        left: '67%',
        top: '20%',
        opacity: '.6'
    },{
        width: '20%',
        left: '86%',
        top: '30%',
        opacity: '.8'
    }],

    qr_wrap = $('.qr-wrap'),
    qr_btn_click = $('.qr-btn-click')
    ;

// First Screen's Init
function firstScreenMovie(){
    moving = true;
    // Let weapon Txt can show
    $('.weapon-txt').css('visibility', 'visible');
    BLASTS = $('.blast');

    l_3d_box.velocity({
        'top': '83%',
        'left': '86%',
        'scale': '.5'
    }, 1000, [ 0.59, -0.82, 0.25, 1.33 ], function(){
    // Animation after Loading
        $('.bg-grid').velocity({
            'opacity': 1
        }, 1000);
        $('.logo-70').velocity({
            'opacity': 1
        }, 1000);

        $('.weapon').velocity('fadeIn', {
            delay: 500,
            stagger: 300,
            drag: true
        });


        $('.weapon').each(function(i, e){
            var _me = $(e);

            if(_me.data('pos') == 0){
                var weapon_txt = $('#'+_me.data('txtid'));
                weapon_txt.addClass('open-txt');
                weapon_txt.find('.blast').velocity('fadeIn',{
                    delay: 2800,
                    stagger: 180,
                    drag: true
                });
                setTimeout(function(){
                    weapon_txt.find('.weapon-detail').velocity({
                        'opacity': 1
                    }, 500, function(){
                        moving = false;
                    });
                }, 3800);
            }
        });

        qr_btn_click.css('visibility', 'visible');
    });

    l_progress.velocity({
        'opacity': 0
    }, 300, function(){
        $(this).css('display', 'none');
    });
}

// stop html swipe
$(document).on('touchmove', function(e){
    e.preventDefault();
});

// Bind page turning
loading_box.on('touchstart', function(e) {
    // console.log('start...');
    startTouch(e);
});
loading_box.on('touchmove', function(e) {
    moveTouch(e);
});
loading_box.on('touchend', function(e) {
    endTouch(e);
});

// Voice control event
$(".music-play-btn").on("click",function(){
    var audio = $('#bg_music')[0];
    if(audio.paused){
        $('.music-play-btn').addClass("eleCircle");
        audio.play();
    }else{
        $('.music-play-btn').removeClass("eleCircle");
        audio.pause();
    }
});

// QR model
qr_btn_click.on('touchend', function(event) {
    event.preventDefault();
    var _me = $(this);
    if(_me.data('state') == 'close' && !moving){
        moving = true;
        $('.weapon, .open-txt').velocity('transition.swoopOut');
        qr_wrap.css('display', 'block').velocity({
            'opacity': 1
        }, 1000, function(){
            _me.data('state', 'open')
            moving = false;
        });
    }else if(_me.data('state') == 'open' && !moving){
        moving = true;
        $('.weapon, .open-txt').velocity('transition.swoopIn');
        qr_wrap.velocity({
            'opacity': 0
        }, 1000, function(){
            qr_wrap.css('display', 'none');
            _me.data('state', 'close');
            moving = false;
        });
    }
});

/***************    Tools     *****************/

// Get css image's url
function getImgUrl($ele){
    var bg = $ele.css('background-image');
    return bg.split('(')[1].split(')')[0];
}
// Image preload indicator
function preIndicator(current, total){
    var persent = 0;

    persent = Math.round((current / total) * 100);

    p_txt.text(persent + '%');
    // console.log(current+':'+total+':'+persent);
}
// Preload Imgs
function preImage(img_src_array, callback){
    var i_num = img_src_array.length,
        i_array = new Array(img_src_array.length),
        loaded_num = 0;
    // console.log(i_num);
    i_num !== 0 && (function(){
        // console.log('Start Preload...');
        for (var i = 0; i < i_array.length; i++) {
            i_array[i] = new Image();
            i_array[i].src = img_src_array[i];
            i_array[i].onload = function(){
                // console.log('Loaded_Num: '+(loaded_num+1));
                preIndicator(loaded_num + 1, i_num);

                ++loaded_num && loaded_num === i_num && (function(){
                    // console.log('End Preload...');
                    callback && callback();
                }());
            };
        };
    }());
}
