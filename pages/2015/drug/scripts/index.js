/*
*    Author is Nokey -- 木马人
*/

/************    Funcs to prepare    ************/

// Show Elements gradually
function showEle(type){
    // swipe trigger
    switch(pageNumber){
        case 0:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                $('.p0-1').removeClass('hide');
                p0_m1.play();
            }, 600);
            setTimeout(function(){
                $('.p0-1').addClass('hide');
            }, 2000);
            setTimeout(function(){
                $('.p0-2').removeClass('hide');
            }, 2500);
            setTimeout(function(){
                $('.p0-2').addClass('hide');
            }, 4000);
            setTimeout(function(){
                p0_m2.play();
                $('.p0-3').addClass('goShow');
            }, 4500);
            setTimeout(function(){
                can_turn_page = true;
                swipe_up.addClass('swipeMove');
            }, 5200);
            break;
        case 1:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                $('.p1-1').addClass('goShow');
            }, 600);
            setTimeout(function(){
                can_turn_page = true;
                swipe_up.addClass('swipeMove');
            }, 1500);
            break;
        case 2:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                $('.p2-3').addClass('goShow');
            }, 600);
            setTimeout(function(){
                p2_m1.play();
                $('.p2-1').addClass('goShow');
                $('.p2-2').addClass('goShow');
            }, 1500);
            setTimeout(function(){
                can_turn_page = true;
                swipe_up.addClass('swipeMove');
            }, 2300);
            break;
        case 3:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                $('.p3-1').removeClass('hide');
            }, 600);
            setTimeout(function(){
                $('.p3-4').addClass('goShow');
            }, 1200);
            break;
        case 4:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                p4_m1.play();
                $('.p4-1-i').addClass('flash');
            }, 600);
            setTimeout(function(){
                $('.p4-2-i').addClass('flash');
            }, 1000);
            setTimeout(function(){
                can_turn_page = true;
                swipe_up.addClass('swipeMove');
            }, 1800);
            break;
        case 5:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                p5_m1.play();
                $('.p5-1').removeClass('hide');
            }, 600);
            setTimeout(function(){
                $('.p5-1').addClass('hide');
            }, 2000);
            setTimeout(function(){
                p5_m2.play();
                $('.p5-2').addClass('goShow');
            }, 2500);
            setTimeout(function(){
                can_turn_page = true;
                swipe_up.addClass('swipeMove');
            }, 3300);
            break;
        case 6:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                $('.p6-1-i').addClass('flash');
            }, 600);
            setTimeout(function(){
                $('.p6-2-i').addClass('flash');
            }, 1000);
            setTimeout(function(){
                $('.p6-3-i').addClass('flash');
            }, 1500);
            setTimeout(function(){
                can_turn_page = true;
                swipe_up.addClass('swipeMove');
            }, 2300);
            break;
        case 7:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                p7_m1.play();
                $('.p7-2').addClass('goShow');
            }, 600);
            setTimeout(function(){
                $('.p7-1').addClass('goShow');
            }, 1000);
            setTimeout(function(){
                can_turn_page = true;
                swipe_up.addClass('swipeMove');
            }, 1800);
            break;
        case 8:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                $('.p8-4').addClass('goShow');
            }, 600);
            break;
        case 9:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                $('.p9-1').addClass('goShow');
            }, 600);
            setTimeout(function(){
                $('.p9-2').addClass('goShow');
            }, 1000);
            setTimeout(function(){
                $('.p9-4').addClass('goShow-2');
            }, 1500);
            setTimeout(function(){
                $('.p9-5').addClass('flipInX');
                $('.p9-6').addClass('flipInX');
                can_turn_page = true;
            }, 2500);
            break;
        default:
            break;
    }
}

// some event
$('.p3-4').on('touchend', function(event) {
    event.preventDefault();
    $('.p3-1').addClass('hide');
    $('.p3-4').removeClass('goShow');
    p3_m1.play();
    setTimeout(function(){
        $('.p3-2').addClass('goShow');
    }, 500);
    setTimeout(function(){
        $('.p3-2').css({
            'transform': 'scale(1.6)',
            '-webkit-transform': 'scale(1.6)'
        });
        $('.p3-3').addClass('hide');
    }, 1250);
    setTimeout(function(){
        $('.p3-2').css({
            'transform': 'scale(3)',
            '-webkit-transform': 'scale(3)'
        });
        can_turn_page = true;
        swipe_up.addClass('swipeMove');
    }, 1500);
});

// Remove goMovie before swipe to next screen to show the movie every time...
function removeGomovie(num){
    switch(num){
        case 0:
            $('.p0-3').removeClass('goShow');
            break;
        case 1:
            $('.p1-1').removeClass('goShow');
            break;
        case 2:
            $('.p2-1').removeClass('goShow');
            $('.p2-2').removeClass('goShow');
            $('.p2-3').removeClass('goShow');
            break;
        case 3:
            $('.p3-2').removeClass('goShow');
            $('.p3-2').css({
                'transform': 'scale(1)',
                '-webkit-transform': 'scale(1)'
            });
            $('.p3-3').removeClass('hide');
            break;
        case 4:
            break;
        case 5:
            $('.p5-2').removeClass('goShow');
            break;
        case 6:
            break;
        case 7:
            $('.p7-1').removeClass('goShow');
            $('.p7-2').removeClass('goShow');
            break;
        case 8:
            $('.p8-4').removeClass('goShow');
            $('#mask').removeClass('hide envisible');
            $('.p8-1').removeClass('hide');
            $('.p8-5-i').removeClass('goShow');
            drawMask(ctx, draw_img);
            break;
        case 9:
            $('.p9-1').removeClass('goShow');
            $('.p9-2').removeClass('goShow');
            $('.p9-4').removeClass('goShow-2');
            $('.p9-5').removeClass('flipInX');
            $('.p9-6').removeClass('flipInX');
            break;
    }
}

// Next Page
function screenForward(){
    !music_off && bg_music.play();
    var num = ++pageNumber;
    removeGomovie(num);

    if(pageNumber > pageAll){
        pageNumber = pageAll;
        return ;
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
    !music_off && bg_music.play();
    var num = --pageNumber;
    removeGomovie(num);

    if(pageNumber < 0){
        pageNumber = 0;
        return ;
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
    can_turn_page = false,
    music_off = false;
    p0_txts = $('.p0-txt');

// Effect sounds
var bg_music = $('#bg_music')[0];
    p0_m1 = $('#p0_m1').get(0),
    p0_m2 = $('#p0_m2').get(0),
    p2_m1 = $('#p2_m1').get(0),
    p3_m1 = $('#p3_m1').get(0),
    p4_m1 = $('#p4_m1').get(0),
    p5_m1 = $('#p5_m1').get(0),
    p5_m2 = $('#p5_m2').get(0),
    p7_m1 = $('#p7_m1').get(0);

// Every page to adapt screen's height
$(".ctt-li").each(function () {
    $(this).css("height", $(window).height());
});

// First Screen's Init
function firstScreenMovie(){
    showEle();
}

// Voice control event
$(".music-play-btn").on("touchend",function(){
    var audio = $('#bg_music')[0];
    if(audio.paused){
        $('.music-play-btn').addClass("eleCircle");
        audio.play();
        music_off = false;
    }else{
        $('.music-play-btn').removeClass("eleCircle");
        audio.pause();
        music_off = true;
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

// Canvas - blur
var canvas = $('#mask').get(0),
    $canvas = $('#mask'),
    ctx = canvas.getContext('2d'),
    draw_img = $('.p8-3').get(0),
    $draw_img = $('.p8-3'),
    draw_h = $draw_img.height(),
    draw_w = $draw_img.width(),
    isMouseDown = false;

function drawMask(ctx, img){
    // take care of the context properties...
    ctx.globalCompositeOperation = 'source-over';

    ctx.clearRect(0, 0, draw_w, draw_h);
    ctx.drawImage(img, 0, 0, draw_w, draw_h);
    console.log('Draw img...');
}

function resetMask(){
    draw_h = $draw_img.height();
    draw_w = $draw_img.width();
    $canvas.css({
        width: draw_w + 'px',
        height: draw_h + 'px'
    });
    $canvas.attr({
        width: draw_w,
        height: draw_h
    });
}

canvas.addEventListener('touchstart', function(e){
    isMouseDown = true;
});
canvas.addEventListener('touchend', function(e){
    isMouseDown = false;
    setTimeout(function(){
        $('#mask').addClass('hide');
        $('.p8-1').addClass('hide');
    }, 300);
    setTimeout(function(){
        $('#mask').addClass('envisible');
        $('.p8-5-i').addClass('goShow');
    }, 1000);
    setTimeout(function(){
        can_turn_page = true;
        swipe_up.addClass('swipeMove');
    }, 1500);
});
canvas.addEventListener('touchmove', function(e){
    e.preventDefault();
    e.stopPropagation();
    // console.log(e);
    var finger = e.touches[0];
    if(isMouseDown){
        var x = finger.pageX - getBCR(canvas, 'left'),
            y = finger.pageY - getBCR(canvas, 'top');
        // console.log('x: '+x+'  y: '+y);
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = '#fff';
        ctx.shadowBlur = 15;
      
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, Math.PI*2, false);
        ctx.closePath();
        ctx.fill();
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

function getBCR(ele, type){
    if(type !== undefined){
        return ele.getBoundingClientRect()[type];
    }else{
        return ele.getBoundingClientRect();
    }
}



