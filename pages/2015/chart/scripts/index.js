/*
*    Author is Nokey -- 木马人
*/

/************    Funcs to prepare    ************/

// Show Elements gradually
function showEle(){
    switch(pageNumber){
        case 0:

            break;
        case 1:
            var currentPage = pageNumber;
            
            break;
        case 2:
            var currentPage = pageNumber;
            
            break;
        case 3:
            var currentPage = pageNumber;
            
            break;
        case 4:
            var currentPage = pageNumber;
            
            break;
        default:
            break;
    }
}

// Remove goMovie before swipe to next screen to show the movie every time...
function removeGomovie(num){
    switch(num){
        case 0:
            
            break;
        case 1:
            
            break;
        case 2:
            
            break;
        case 3:
            
            break;
        case 4:
            
            break;
        default:
            break;
    }
}

// Next Page
function screenForward(){
    $('.swipe-up').css('display', 'none');
    var num = ++pageNumber;
    removeGomovie(num);

    if(pageNumber > pageAll){
        pageNumber = pageAll;
    }
    if(pageNumber !== pageAll){
        setTimeout(function(){
            $('.swipe-up').css('display', 'block');
        }, 800);
    }

    currentDistance = screenHeight * pageNumber;

    contentList.css({
        '-webkit-transform': translateStr.replace(/{Y}/g, currentDistance),
        'transform': translateStr.replace(/{Y}/g, currentDistance),
        '-webkit-transition': transitionStr,
        'transition': transitionStr
    });

    // Start animation of every page
    showEle();
}
// Prev Page
function screenBack(){
    $('.swipe-up').css('display', 'none');
    var num = --pageNumber;
    removeGomovie(num);

    setTimeout(function(){
        $('.swipe-up').css('display', 'block');
    }, 800);

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
    showEle();
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
    if(endY && endY !== startY && endY - startY <= -25){
        console.log('Downturning...');
        screenForward();
    }else if(endY && endY !== startY && endY - startY >= 25){
        console.log('Upturning...');
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

/************   START  MOVIE   ************/

// Assume Parametors
var screenHeight = $(window).height(),
    pageNumber = 0,
    currentDistance = 0,
    contentList = $(".content-list"),
    touchEndY,touchStartY,
    translateStr = 'translate3d(0, -{Y}px, 0)',
    transitionStr = 'all .5s ease-in',
    pageAll = $('.ctt-li').length - 1,
    gameing = false;

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
    // Show page-0 animation
    showEle();
}

// stop html swipe
$(document).on('touchmove', function(e){
    e.preventDefault();
});

// Bind page turning
contentList.on('touchstart', function(e) {
    if(!gameing){
        startTouch(e);
    }
});
contentList.on('touchmove', function(e) {
    if(!gameing){
        moveTouch(e);
    }
});
contentList.on('touchend', function(e) {
    if(!gameing){
        endTouch(e);
    }
});


/***************    Tools     *****************/

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



