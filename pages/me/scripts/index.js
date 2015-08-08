/*
*    Author is Nokey -- 木马人
*/

// Founcs to prepare

// Show Elements gradually
function showEle(){
    switch(pageNumber){
        case 1:
            var currentPage = pageNumber;
            if(theSteps[currentPage] === 2){
                setTimeout(function(){
                    $('.p'+ currentPage +'-bg').addClass('bgMoveLeft');
                }, 500);
                setTimeout(function(){
                    $('.p'+ currentPage +'-words1').addClass('p'+ currentPage +'-words1-show');
                }, 1500);
            }
            break;
        case 2:
            var currentPage = pageNumber;
            if(theSteps[currentPage] === 2){
                setTimeout(function(){
                    $('.p'+ currentPage +'-bg').addClass('bgMoveLeft');
                }, 500);
                setTimeout(function(){
                    $('.p'+ currentPage +'-words1').addClass('p'+ currentPage +'-words1-show');
                }, 1500);
            }
            break;
        case 3:
            var currentPage = pageNumber;
            if(theSteps[currentPage] === 2){
                setTimeout(function(){
                    $('.p'+ currentPage +'-bg').addClass('bgMoveLeft');
                }, 500);
                setTimeout(function(){
                    $('.p'+ currentPage +'-words1').addClass('p'+ currentPage +'-words1-show');
                }, 1500);
                setTimeout(function(){
                    $('.p'+ currentPage +'-words2').addClass('p'+ currentPage +'-words2-show');
                }, 2000);
            }
            break;
        case 4:
            var currentPage = pageNumber;
            setTimeout(function(){
                $('.p'+ currentPage +'-location').addClass('fadeIn');
            }, 500);
            setTimeout(function(){
                $('.p'+ currentPage +'-city').addClass('p4-riseUp');
            }, 800);
            setTimeout(function(){
                $('.p'+ currentPage +'-author').css({
                    'right': '20px',
                    'opacity': '1'
                });
            }, 1200);
            break;
        default:
            break;
    }
}

// Show Desc
function showDesc(){
    var $desc = $('.p'+ pageNumber +'-desc');

    if(theSteps[pageNumber] === 2){
        $desc.addClass('p'+ pageNumber +'-desc-show');

        theSteps[pageNumber] = 1;
    }else{
        $desc.removeClass('p'+ pageNumber +'-desc-show');

        theSteps[pageNumber] = 2;
    }
}

// Next Page
function screenForward(){
    $('.swipe-up').css('display', 'none');
    pageNumber++;

    if(pageNumber > 4){
        pageNumber = 4;
    }
    if(pageNumber !== 4){
        setTimeout(function(){
            $('.swipe-up').css('display', 'block');
        }, 800);
    }

    currentDistance = screenHeight * pageNumber;
    console.log(translateStr.replace(/{Y}/g, currentDistance));
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
    setTimeout(function(){
        $('.swipe-up').css('display', 'block');
    }, 800);
    pageNumber--;

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
        if(theSteps[pageNumber] <= 1){
            screenForward();
        }else{
            showDesc();
        }

    }else if(endY && endY !== startY && endY - startY >= 25){
        console.log('Upturning...');
        if(theSteps[pageNumber] === 2){
            screenBack();
        }else{
            showDesc();
        }

    }
}

// START  MOVIE

// Assume Parametors
var screenHeight = $(window).height(),
    pageNumber = 0,
    currentDistance = 0,
    contentList = $(".content-list"),
    touchEndY,touchStartY,
    translateStr = 'translate3d(0, -{Y}px, 0)',
    transitionStr = 'all .5s ease-in',
    theSteps = [0,2,2,2],
    showTheLast = 0;

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

// First Screen's Animation
function firstScreenMovie(){
    setTimeout(function(){
        $('.p0-avatar').addClass('coinToss');
    }, 500);
    setTimeout(function(){
        $('.p0-t1').addClass('getUp');
    }, 800);
    setTimeout(function(){
        $('.p0-t2').addClass('getUp');
    }, 1000);
    setTimeout(function(){
        $('.p0-t3').addClass('getUp');
    }, 1200);
    setTimeout(function(){
        // Show swipe up guide
        $('.swipe-up').addClass('swipeMove');
    }, 1000);
}

// Bind page turning
contentList.on('touchstart', function(e) {
    startTouch(e);
});
contentList.on('touchmove', function(e) {
    moveTouch(e);
});
contentList.on('touchend', function(e) {
    endTouch(e);
});

// Voice control event
$(".speaker").on("click",function(){
    var audio = document.getElementById('audio');
    if(audio.paused){
        $('.speaker').addClass("eleCircle");
        audio.play();
    }else{
        $('.speaker').removeClass("eleCircle");
        audio.pause();
    }
});

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

                loaded_num++ && loaded_num === i_num && (function(){
                    console.log('End Preload...');
                    callback && callback();
                }());
            };
        };
    }());
    // var preImg = new Image();
    // preImg.src = src;
    // return preImg;
}


