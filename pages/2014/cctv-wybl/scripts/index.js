/*
*    Author is Nokey -- 木马人
*/

/********   Funcs to prepare   ********/

// Show Elements gradually
function showEles(num, type){
    switch(pageNumber){
        case 0:    // cover
            var currentPage = pageNumber;
            moving = true;
            setTimeout(function(){
                $('.cover-2').addClass(type);
            }, 800);
            setTimeout(function(){
                $('.cover-3').addClass(type);
            }, 1000);
            setTimeout(function(){
                $('.cover-1').addClass('show');
                moving = false;
            }, 1200);
            break;
        case 1:
            var currentPage = pageNumber;
            moving = true;
            setTimeout(function(){
                $('.p0-1').addClass('show');
            }, 800);
            setTimeout(function(){
                $('.p0-2').addClass('show');
                setTimeout(function(){
                    moving = false;
                }, 500);
            }, 1000);
            
            break;
        case 2:
            var currentPage = pageNumber;
            moving = true;
            setTimeout(function(){
                $('.p1-3').addClass(type);
            }, 1000);
            setTimeout(function(){
                $('.p1-5').addClass(type);
            }, 1200);
            setTimeout(function(){
                $('.p1-4').addClass(type);
            }, 1400);
            setTimeout(function(){
                $('.p1-6').addClass(type);
            }, 1600);
            setTimeout(function(){
                $('.p1-2').addClass(type);
                moving = false;
            }, 1900);
            setTimeout(function(){
                movePageBg(1);
                $('.p1-1').addClass('show');
            }, 800);
            
            break;
        case 3:
            var currentPage = pageNumber;
            moving = true;
            setTimeout(function(){
                $('.p2-2').addClass(type);
            }, 1000);
            setTimeout(function(){
                $('.p2-4').addClass(type);
            }, 1200);
            setTimeout(function(){
                $('.p2-5').addClass(type);
            }, 1500);
            setTimeout(function(){
                $('.p2-3').addClass(type);
                moving = false;
            }, 1700);
            setTimeout(function(){
                movePageBg(2);
                $('.p2-1').addClass('show');
            }, 800);
            break;
        case 4:
            var currentPage = pageNumber;
            moving = true;
            setTimeout(function(){
                $('.p3-3').addClass(type);
            }, 1000);
            setTimeout(function(){
                $('.p3-4').addClass(type);
            }, 1200);
            setTimeout(function(){
                $('.p3-2').addClass(type);
                moving = false;
            }, 1400);
            setTimeout(function(){
                movePageBg(3);
                $('.p3-1').addClass('show');
            }, 800);
            break;
        case 5:
            var currentPage = pageNumber;
            moving = true;
            setTimeout(function(){
                $('.p4-2').addClass(type);
            }, 1000);
            setTimeout(function(){
                $('.p4-3').addClass(type);
                moving = false;
            }, 1200);
            setTimeout(function(){
                movePageBg(4);
                $('.p4-1').addClass('show');
            }, 800);
            break;
        case 6:
            var currentPage = pageNumber;
            moving = true;
            setTimeout(function(){
                movePageBg(5);
                $('.p5-1').addClass('show');
            }, 1000);
            setTimeout(function(){
                // $('.p5-2').addClass('show');
                $('.next-1').addClass('show');
                moving = false;
            }, 1200);
            break;
        default:
            break;
    }
}

// Exit animation
function hideEles(num, type){
    switch(num){
        case 0:   // cover
            var currentPage = pageNumber;
            setTimeout(function(){
                $('.cover-3').addClass(type);
            }, 100);
            setTimeout(function(){
                $('.cover-2').addClass(type);
            }, 150);
            setTimeout(function(){
                $('.cover-1').removeClass('show');
            }, 300);
            
            break;
        case 1:
            setTimeout(function(){
                $('.p0-1').removeClass('show');
            }, 100);
            setTimeout(function(){
                $('.p0-2').removeClass('show');
            }, 150);
            break;
        case 2:
            setTimeout(function(){
                $('.p1-3').addClass(type);
            }, 100);
            setTimeout(function(){
                $('.p1-5').addClass(type);
            }, 150);
            setTimeout(function(){
                $('.p1-4').addClass(type);
            }, 200);
            setTimeout(function(){
                $('.p1-6').addClass(type);
            }, 250);
            setTimeout(function(){
                $('.p1-2').addClass(type);
            }, 300);
            setTimeout(function(){
                $('.p1-1').removeClass('show');
            }, 350);
            break;
        case 3:
            setTimeout(function(){
                $('.p2-2').addClass(type);
            }, 100);
            setTimeout(function(){
                $('.p2-4').addClass(type);
            }, 150);
            setTimeout(function(){
                $('.p2-5').addClass(type);
            }, 200);
            setTimeout(function(){
                $('.p2-3').addClass(type);
            }, 250);
            setTimeout(function(){
                $('.p2-1').removeClass('show');
            }, 300);
            break;
        case 4:
            setTimeout(function(){
                $('.p3-3').addClass(type);
            }, 100);
            setTimeout(function(){
                $('.p3-4').addClass(type);
            }, 150);
            setTimeout(function(){
                $('.p3-2').addClass(type);
            }, 200);
            setTimeout(function(){
                $('.p3-1').removeClass('show');
            }, 250);
            break;
        case 5:
            setTimeout(function(){
                $('.p4-2').addClass(type);
            }, 100);
            setTimeout(function(){
                $('.p4-3').addClass(type);
            }, 150);
            setTimeout(function(){
                $('.p4-1').removeClass('show');
            }, 200);
            break;
        case 6:
            setTimeout(function(){
                $('.p5-1').removeClass('show');
            }, 100);
            setTimeout(function(){
                $('.next-1').removeClass('show');
            }, 150);
            break;
        default:
            break;
    }
}

// Exit animation
function removeMovieClass(num){
    switch(num){
        case 0:   // cover
            $('.cover-2, .cover-3').removeClass('bounceInRight bounceInLeft bounceOutLeft bounceOutRight');
            break;
        case 1:
            $('.p0-1, .p0-1').removeClass('show');
            break;
        case 2:
            $('.p1-2, .p1-3, .p1-4, .p1-5, .p1-6').removeClass('bounceInRight bounceInLeft bounceOutLeft bounceOutRight');
            break;
        case 3:
            $('.p2-2, .p2-3, .p2-4, .p2-5').removeClass('bounceInRight bounceInLeft bounceOutLeft bounceOutRight');
            break;
        case 4:
            $('.p3-2, .p3-3, .p3-4').removeClass('bounceInRight bounceInLeft bounceOutLeft bounceOutRight');
            break;
        case 5:
            $('.p4-2, .p4-3').removeClass('bounceInRight bounceInLeft bounceOutLeft bounceOutRight');
            break;
        case 6:
            $('.p5-1, .next-1').removeClass('show');
            break;
        default:
            break;
    }
}

// Next Page
function screenForward(){
    if(pageNumber < pageAll){
        ++pageNumber;

        $('.swipe-gesture').css('display', 'none');

        hideEles(pageNumber - 1, 'bounceOutLeft');
        removeMovieClass(pageNumber);

        // Start animation of every page
        showEles(pageNumber, 'bounceInRight');
    }
}

// Prev Page
function screenBack(){
    if(pageNumber > 0){
        --pageNumber;

        hideEles(pageNumber + 1, 'bounceOutRight');
        removeMovieClass(pageNumber);

        if(pageNumber === 0){
            $('.swipe-gesture').css('display', 'block');
        }

        // Start animation of every page
        showEles(pageNumber, 'bounceInLeft');
    }
}

// Register finger gesture event
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
function endTouch(event){  // judge to upturning or downturning after Touch ACT
    var startX = touchStartX,
        endX = touchEndX;
    if(endX && endX !== startX && endX - startX <= -25){
        console.log('Rightturning...');
        screenForward();
    }else if(endX && endX !== startX && endX - startX >= 25){
        console.log('Leftturning...');
        screenBack();
    }
}

// Register DeviceOrientationEvent...
function deviceOrientation(callback){
    if(window.DeviceOrientationEvent){
        $(window).on('deviceorientation', function(event) {
            var 
                // alpha: rotation around z-axis
                z = event.alpha,
                // gamma: rotation around y-axis(left to right)
                y = event.gamma,
                // beta: rotation around x-axis(front back motion)
                x = event.beta;

            callback && callback(y);
        });
    }
}

// START  MOVIE

// Assume Parametors
var screenHeight = $(window).height(),
    screenWidth = $(window).width(),
    pageNumber = 0,
    contentList = $(".content-list"),
    touchEndX,touchStartX,
    pageAll = $('.single-page').length - 1,
    page_bg = $('.page-bg'),
    move_page = 5,
    bg_posCSS = '-{X}px 0',
    moving = false;

// Get Move Page_bg Width
function movePageBg(num){
    var bg_per_w,
        bg_h,
        bg_w;

    bg_h = screenHeight;
    bg_w = Math.floor(1.448 * bg_h);
    bg_per_w = Math.floor((bg_w - screenWidth) / move_page);

    page_bg.css({
        'background-position': bg_posCSS.replace(/{X}/g, bg_per_w*num)
    });

    console.log('Bg move...');
}

// Judge if is Adroid System
var UA = navigator.userAgent.toLowerCase(),
    isAndroid = UA.match(/android/i) == "android";

// Judge if is a short screen phone
var isShort;
if($(window).height()<=416){
    isShort = true;
}

// Every page to adapt screen's height
$(".ctt-li").each(function () {
    $(this).css("height", $(window).height());
});

// First Screen's Init
function firstScreenMovie(){
    setTimeout(function(){
        $('.cover-1').addClass('show');
    }, 800);
    setTimeout(function(){
        $('.cover-2').addClass('bounceInRight');
    }, 1000);
    setTimeout(function(){
        $('.cover-3').addClass('bounceInRight');
    }, 1200);
}

// stop html swipe
$(document).on('touchmove', function(e){
    e.preventDefault();
});

// Bind page turning
contentList.on('touchstart', function(e) {
    moving ? void(0) : startTouch(e);
});
contentList.on('touchmove', function(e) {
    moving ? void(0) : moveTouch(e);
});
contentList.on('touchend', function(e) {
    moving ? void(0) : endTouch(e);
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

// Get css image's url
function getImgUrl($ele){
    var bg = $ele.css('background-image');
    return bg.split('(')[1].split(')')[0];
}
// Preload Imgs
function preImage(img_src_array, callback){
    var i_num = img_src_array.length,
        i_array = new Array(img_src_array.length),
        loaded_num = 0;
    console.log(i_num);
    i_num !== 0 && (function(){
        console.log('Start Preload...');
        for (var i = 0; i < i_array.length; i++) {
            i_array[i] = new Image();
            i_array[i].src = img_src_array[i];
            i_array[i].onload = function(){
                console.log('Loaded_Num: '+(loaded_num+1));

                ++loaded_num && loaded_num === i_num && (function(){
                    console.log('End Preload...');
                    callback && callback();
                }());
            };
        };
    }());
}

// debug
// function debug(info){
//     var _ = $('.debug');
//     _.text(info);
// }
// debug($(document).height());