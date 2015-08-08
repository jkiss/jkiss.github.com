/*
*    Author is Nokey -- 木马人
*/

// Funcs to prepare

// Show Elements gradually
function showEle(){
    switch(pageNumber){
        case 0:
            setTimeout(function(){
                $('.p5-1').addClass('goMovie');
            }, 800);
            setTimeout(function(){
                $('.p5-text-1').addClass('goMovie');
            },1300);
            setTimeout(function(){
                $('.p5-text-2').addClass('goMovie');
            },1600);
            setTimeout(function(){
                $('.p5-hr').addClass('goMovie');
            },1900);
            setTimeout(function(){
                $('.p5-text-3').addClass('goMovie');
            },2200);
            setTimeout(function(){
                $('.p5-text-4').addClass('goMovie');
            },2500);
            setTimeout(function(){
                $('.p5-2').addClass('goMovie');
            },2800);
            setTimeout(function(){
                $('.p5-3').addClass('goMovie');
            },3200);
            break;
        case 1:
            var currentPage = pageNumber;
            setTimeout(function(){
                $('.p0-1').addClass('goMovie');
            }, 800);
            setTimeout(function(){
                $('.p0-3').addClass('goMovie');
            }, 1100);
            setTimeout(function(){
                $('.p0-2').addClass('goMovie');
            }, 1500);
            setTimeout(function(){
                $('.p0-text').addClass('goMovie');
            }, 1800);
            break;
        case 2:
            var currentPage = pageNumber;
            setTimeout(function(){
                $('.p1-2').addClass('goMovie');
            }, 800);
            setTimeout(function(){
                $('.p1-1').addClass('goMovie');
            }, 1000);
            setTimeout(function(){
                $('.p1-text p').each(function(index, el) {
                    var _me = this;
                    setTimeout(function(){
                        $(_me).addClass('goMovie');
                    }, index*300);
                });
            }, 1500);
            break;
        case 3:
            var currentPage = pageNumber;
            setTimeout(function(){
                $('.p6-text p').each(function(index, el) {
                    var _me = this;
                    setTimeout(function(){
                        $(_me).addClass('goMovie');
                    }, index*300);
                });
            }, 1700);
            setTimeout(function(){
                $('.p6-2').addClass('goMovie');
            }, 800);
            setTimeout(function(){
                $('.p6-1').addClass('goMovie');
            }, 1200);
            break;
        case 4:
            var currentPage = pageNumber;
            setTimeout(function(){
                $('.p2-2').addClass('goMovie');
            }, 800);
            setTimeout(function(){
                $('.p2-title').addClass('goMovie');
            }, 1300);
            setTimeout(function(){
                $('.p2-text p').each(function(index, el) {
                    var _me = this;
                    setTimeout(function(){
                        $(_me).addClass('goMovie');
                    }, index*300);
                });
            }, 1600);
            setTimeout(function(){
                $('.p2-1').addClass('goMovie');
            }, 2200);
            break;
        case 5:
            var currentPage = pageNumber;
            setTimeout(function(){
                $('.p3-text p').each(function(index, el) {
                    var _me = this;
                    setTimeout(function(){
                        $(_me).addClass('goMovie');
                    }, index*400);
                });
            }, 800);
            setTimeout(function(){
                $('.p3-1').addClass('goMovie');
            }, 2000);
            break;
        case 6:
            var currentPage = pageNumber;
            setTimeout(function(){
                $('.p4-text p').each(function(index, el) {
                    var _me = this;
                    setTimeout(function(){
                        $(_me).addClass('goMovie');
                    }, index*400);
                });
            }, 800);
            setTimeout(function(){
                $('.p4-1').addClass('goMovie');
            }, 2000);
            break;
        case 7:
            setTimeout(function(){
                $('.p7-3').addClass('goMovie');
            },800);
            setTimeout(function(){
                $('.p7-1').addClass('goMovie');
            },1200);
            setTimeout(function(){
                $('.p7-2').addClass('goMovie');
            },1600);
            setTimeout(function(){
                $('.p7-title').addClass('goMovie');
            },2000);
            break;
        default:
            break;
    }
}

// Remove goMovie before swipe to next screen to show the movie every time...
function removeGomovie(num){
    switch(num){
        case 0:
            $('.p5-1').removeClass('goMovie');
            $('.p5-text-1').removeClass('goMovie');
            $('.p5-text-2').removeClass('goMovie');
            $('.p5-hr').removeClass('goMovie');
            $('.p5-text-3').removeClass('goMovie');
            $('.p5-text-4').removeClass('goMovie');
            $('.p5-2').removeClass('goMovie');
            $('.p5-3').removeClass('goMovie');
            break;
        case 1:
            $('.p0-1').removeClass('goMovie');
            $('.p0-3').removeClass('goMovie');
            $('.p0-2').removeClass('goMovie');
            $('.p0-text').removeClass('goMovie');
            break;
        case 2:
            $('.p1-2').removeClass('goMovie');
            $('.p1-1').removeClass('goMovie');
            $('.p1-text p').each(function(index, el) {
                $(this).removeClass('goMovie');
            });
            break;
        case 3:
            $('.p6-text p').each(function(index, el) {
                $(this).removeClass('goMovie');
            });
            $('.p6-2').removeClass('goMovie');
            $('.p6-1').removeClass('goMovie');
            break;
        case 4:
            $('.p2-2').removeClass('goMovie');
            $('.p2-title').removeClass('goMovie');
            $('.p2-text p').each(function(index, el) {
                $(this).removeClass('goMovie');
            });
            $('.p2-1').removeClass('goMovie');
            break;
        case 5:
            $('.p3-text p').each(function(index, el) {
                $(this).removeClass('goMovie');
            });
            $('.p3-1').removeClass('goMovie');
            break;
        case 6:
            $('.p4-text p').each(function(index, el) {
                $(this).removeClass('goMovie');
            });
            $('.p4-1').removeClass('goMovie');
            break;
        case 7:
            $('.p7-3').removeClass('goMovie');
            $('.p7-1').removeClass('goMovie');
            $('.p7-2').removeClass('goMovie');
            $('.p7-title').removeClass('goMovie');
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

    if(pageNumber > 7){
        pageNumber = 7;
    }
    if(pageNumber !== 7){
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
// function deviceOrientation(callback){
//     if(window.DeviceOrientationEvent){
//         $(window).on('deviceorientation', function(event) {
//             var 
//                 // alpha: rotation around z-axis
//                 z = event.alpha,
//                 // gamma: rotation around y-axis(left to right)
//                 y = event.gamma,
//                 // beta: rotation around x-axis(front back motion)
//                 x = event.beta;

//             callback && callback(y);
//         });
//     }
// }

// START  MOVIE

// Assume Parametors
var screenHeight = $(window).height(),
    pageNumber = 0,
    currentDistance = 0,
    contentList = $(".content-list"),
    touchEndY,touchStartY,
    translateStr = 'translate3d(0, -{Y}px, 0)',
    transitionStr = 'all .5s ease-in';

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
    // var g_ele = $('.p5-1'),
    //     rotate_y = -30,
    //     diff = 30,
    //     part = diff/90;
    // deviceOrientation(function(y){
    //     var angle = Math.round(part*y + rotate_y);
    //     g_ele.css({
    //         '-webkit-transform': 'scaleZ(3) rotateY('+angle+'deg)',
    //         'transform': 'scaleZ(3) rotateY('+angle+'deg)'
    //     });
    // });

    setTimeout(function(){
        $('.p5-1').addClass('goMovie');
    }, 800);
    setTimeout(function(){
        $('.p5-text-1').addClass('goMovie');
    },1100);
    setTimeout(function(){
        $('.p5-text-2').addClass('goMovie');
    },1400);
    setTimeout(function(){
        $('.p5-hr').addClass('goMovie');
    },1700);
    setTimeout(function(){
        $('.p5-text-3').addClass('goMovie');
    },2000);
    setTimeout(function(){
        $('.p5-text-4').addClass('goMovie');
    },2300);
    setTimeout(function(){
        $('.p5-2').addClass('goMovie');
    },2600);
    setTimeout(function(){
        $('.p5-3').addClass('goMovie');
    },3000);
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