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
function showEle(type){
    // swipe trigger
    switch(pageNumber){
        case 0:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                $('.p0-4').addClass('show');
            }, 500);
            setTimeout(function(){
                $('.p0-5').addClass('show');
            }, 1000);
            setTimeout(function(){
                $('.p0-2').addClass('show');
                can_turn_page = true;
                swipe_up.addClass('swipeMove');
            }, 2000);
            break;
        case 1:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                $('.p1-2').addClass('show');
            }, 500);
            setTimeout(function(){
                $('.p1-1-i').addClass('fadeLeft');
            }, 1000);
            setTimeout(function(){
                $('.p1-3-i').addClass('fadeRight');
                can_turn_page = true;
                swipe_up.addClass('swipeMove');
            }, 1500);
            break;
        case 2:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                $('.p2-2').addClass('show');
            }, 500);
            setTimeout(function(){
                $('.p2-1-i').addClass('fadeLeft');
            }, 1000);
            setTimeout(function(){
                $('.p2-3-i').addClass('fadeRight');
                can_turn_page = true;
                swipe_up.addClass('swipeMove');
            }, 1500);
            break;
        case 3:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                $('.p3-1-i').addClass('fadeLeft');
            }, 500);
            setTimeout(function(){
                $('.p3-2-i').addClass('fadeRight');
                can_turn_page = true;
                swipe_up.addClass('swipeMove');
            }, 1000);
            break;
        case 4:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                $('.p4-2').addClass('show');
            }, 500);
            setTimeout(function(){
                $('.p4-2').removeClass('show');
                $('.p4-3').addClass('show');
            }, 1800);
            setTimeout(function(){
                $('.p4-1').addClass('show');
                can_turn_page = true;
                swipe_up.addClass('swipeMove');
            }, 2500);
            break;
        case 5:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                $('.p5-2').addClass('show');
            }, 500);
            setTimeout(function(){
                $('.p5-1').addClass('fadeLeft');
            }, 1000);
            setTimeout(function(){
                $('.p5-6').addClass('fadeTop');
            }, 1500);
            setTimeout(function(){
                $('.p5-3-i').addClass('fadeLeft');
            }, 1800);
            setTimeout(function(){
                $('.p5-4-i').addClass('fadeLeft');
                can_turn_page = true;
                swipe_up.addClass('swipeMove');
            }, 2300);
            break;
        case 6:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                $('.p6-2').addClass('show');
            }, 500);
            setTimeout(function(){
                $('.p6-1').addClass('fadeLeft');
            }, 1000);
            setTimeout(function(){
                $('.p6-5').addClass('fadeTop');
            }, 1500);
            setTimeout(function(){
                $('.p6-3-i').addClass('fadeRight');
            }, 1800);
            setTimeout(function(){
                can_turn_page = true;
                $('.p6-4-i').addClass('fadeRight');
            }, 2300);
            break;
        case 7:
            goRandomBall();
            break;
        default:
            break;
    }
}

// Remove goMovie before swipe to next screen to show the movie every time...
function removeGomovie(num){
    switch(pageNumber){
        case 0:
            $('.p0-4').removeClass('show');
            $('.p0-5').removeClass('show');
            $('.p0-2').removeClass('show');
            break;
        case 1:
            $('.p1-2').removeClass('show');
            $('.p1-1-i').removeClass('fadeLeft');
            $('.p1-3-i').removeClass('fadeRight');
            break;
        case 2:
            $('.p2-2').removeClass('show');
            $('.p2-1-i').removeClass('fadeLeft');
            $('.p2-3-i').removeClass('fadeRight');
            break;
        case 3:
            $('.p3-1-i').removeClass('fadeLeft');
            $('.p3-2-i').removeClass('fadeRight');
            break;
        case 4:
            $('.p4-3').removeClass('show');
            $('.p4-1').removeClass('show');
            break;
        case 5:
            $('.p5-2').removeClass('show');
            $('.p5-1').removeClass('fadeLeft');
            $('.p5-6').removeClass('fadeTop');
            $('.p5-3-i').removeClass('fadeLeft');
            $('.p5-4-i').removeClass('fadeLeft');
            break;
        case 6:
            $('.p6-2').removeClass('show');
            $('.p6-1').removeClass('fadeLeft');
            $('.p6-5').removeClass('fadeTop');
            $('.p6-3-i').removeClass('fadeRight');
            $('.p6-4-i').removeClass('fadeRight');
            stopRandomBall();
            break;
        case 7:
            stopRandomBall();
            break;
        default:
            break;
    }
}

// Next Page
function screenForward(){
    var num = ++pageNumber;
    removeGomovie(num);

    if(pageNumber > pageAll){
        pageNumber = pageAll;
    }

    currentDistance = screenHeight * pageNumber;

    contentList.css({
        '-webkit-transform': translateStr.replace(/{Y}/g, currentDistance),
        'transform': translateStr.replace(/{Y}/g, currentDistance),
        '-webkit-transition': transitionStr,
        'transition': transitionStr
    });

    // Start animation of every page
    showEle('f');
}
// Prev Page
function screenBack(){
    var num = --pageNumber;
    removeGomovie(num);

    if(pageNumber < 0){
        pageNumber = 0;
    }

    currentDistance = screenHeight * pageNumber;

    contentList.css({
        '-webkit-transform': translateStr.replace(/{Y}/g, currentDistance),
        'transform': translateStr.replace(/{Y}/g, currentDistance),
        '-webkit-transition': transitionStr,
        'transition': transitionStr
    });

    // Start animation of every page
    showEle('b');
}

function startTouch(event){
    if(!event.touches.length){
        return ;
    }else{
        var finger = event.touches[0];
        touchStartY = finger.pageY;
        touchEndY = 0;
    }
}
function moveTouch(event){
    event.preventDefault();
    if(!event.touches.length){
        return ;
    }else{
        var finger = event.touches[0];
        touchEndY = finger.pageY;
    }
}
function endTouch(event){  // judge to upturning or downturning after Touch ACT
    var startY = touchStartY,
        endY = touchEndY;
    if(endY && endY !== startY && endY - startY <= -50){
        // console.log('Downturning...');
        screenForward();
    }else if(endY && endY !== startY && endY - startY >= 50){
        // console.log('Upturning...');
        screenBack();
    }
}

/************   START  MOVIE   ************/

// Assume Parametors
var screenHeight = $(window).height(),
    screenWidth = $(window).width(),
    pageNumber = 0,
    currentDistance = 0,
    contentList = $(".content-list"),
    touchEndY,touchStartY,
    translateStr = 'translate3d(0, -{Y}px, 0)',
    transitionStr = 'all .5s ease',
    pageAll = $('.ctt-li').length - 1,
    moving = false,
    p_bar = $('.l-progress-bar'),
    p_txt = $('.l-persent'),
    swipe_up = $('.swipe-up'),
    can_turn_page = false;

// Every page to adapt screen's height
$(".ctt-li").each(function () {
    $(this).css("height", $(window).height());
});

// First Screen's Init
function firstScreenMovie(){
    // p0 random single text show
    showEle();
}

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

// stop html swipe
$(document).on('touchmove', function(e){
    e.preventDefault();
});

// Bind page turning
contentList.on('touchstart', function(e) {
    can_turn_page && startTouch(e);
});
contentList.on('touchmove', function(e) {
    can_turn_page && moveTouch(e);
});
contentList.on('touchend', function(e) {
    can_turn_page && endTouch(e);
});


/***************    Tools     *****************/

// center image box
function centerImage(img_boxs){
    // use 'background-image' to improve aniamtion performance
    img_boxs.each(function(i) {
        var box = $(this),
            box_w = box.width(),
            box_h = box.height(),
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

// Get css image's url
function getImgUrl($ele){
    var bg = $ele.css('background-image');
    return bg.split('(')[1].split(')')[0];
}
// Image preload indicator
function preIndicator(current, total){
    var persent = 0;

    persent = Math.round((current / total) * 100);

    p_bar.css('width', persent + '%');
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

// Random balls movement
var move_balls = $('.balls-box').find('img'),
    ball = {
        w: 0,
        h: 0,
        vx: 0,
        vy: 0,
        ele: undefined
    },
    balls = [],
    rAF_id;

function init(){
    move_balls.each(function(index, el) {
        var _me = $(el);

        var ball = {
            w: _me.width(),
            h: _me.height(),
            vx: Math.floor(Math.random() * 10 - 5),
            vy: Math.floor(Math.random() * 10 - 5),
            ele: _me
        }
        balls.push(ball);
    });
    // console.log(balls);
}

function render(){
    for (var i = 0; i < balls.length; i++) {
        var ball = balls[i],
            top = parseInt(ball.ele.css('top')) + ball.vy,
            left = parseInt(ball.ele.css('left')) + ball.vx;

        balls[i].ele.css({
            top: top + 'px',
            left: left + 'px'
        });

        if(crashX(ball)){
            ball.vx = -ball.vx;
        }
        if(crashY(ball)){
            ball.vy = -ball.vy;
        }

    };
}

function crashX(ball){
    var left = parseInt(ball.ele.css('left'));

    return left < -5 || left > (screenWidth - ball.w);
}
function crashY(ball){
    var top = parseInt(ball.ele.css('top'));

    return top < -5 || top > (screenHeight - ball.h);
}

function goRandomBall(){
    render();
    rAF_id = requestAnimationFrame(goRandomBall);
}
function stopRandomBall(){
    cancelAnimationFrame(rAF_id);
}



