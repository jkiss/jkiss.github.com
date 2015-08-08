/*
*    Author is Nokey -- 木马人
*/

/************    Funcs to prepare    ************/

// Show Elements gradually
function showEle(click_in){
    // swipe trigger
    switch(pageNumber){
        case 0:
            if(click_in){
                p0_once = true;
                click_in = false;
            }
            if(p0_once){
                $('.swipe-up').addClass('envisible');
                // hide 1
                // $('.p0-1-i').removeClass('show');
                $('.p0-hand-i').addClass('hide');
                // show 2
                setTimeout(function(){
                    $('.p0-4-i').addClass('show');
                }, 300);
                setTimeout(function(){
                    $('.p0-2').addClass('show');
                }, 800);
                setTimeout(function(){
                    $('.p0-3').addClass('show');
                }, 1500);
                setTimeout(function(){
                    $('.p0-5').addClass('show');
                    $('.swipe-up').removeClass('envisible');
                    can_turn_page = true;
                }, 2000);
            }else{
                setTimeout(function(){
                    $('.p0-1-i').addClass('show');
                }, 500);
                setTimeout(function(){
                    $('.p0-hand-i').removeClass('hide');
                    $('.p0-1-trigger').removeClass('envisible');
                }, 1000);
            }
            break;
        case 1:
            if(click_in){
                p1_once = true;
                click_in = false;
            }
            if(p1_once){
                $('.swipe-up').addClass('envisible');
                // hide 1
                $('.p1-2-i').removeClass('show');
                $('.p1-hand-i').addClass('hide');
                // show 2
                setTimeout(function(){
                    $('.p1-4').addClass('show');
                }, 300);
                setTimeout(function(){
                    $('.p1-5').addClass('show');
                }, 1000);
                setTimeout(function(){
                    $('.p1-3').addClass('show');
                    $('.swipe-up').removeClass('envisible');
                    can_turn_page = true;
                }, 1500);
            }else{
                can_turn_page = false;
                $('.swipe-up').addClass('envisible');
                setTimeout(function(){
                    $('.p1-1').addClass('show');
                }, 500);
                setTimeout(function(){
                    $('.p1-2-i').addClass('show');
                }, 1300);
                setTimeout(function(){
                    $('.p1-hand-i').removeClass('hide');
                    $('.p1-2-trigger').removeClass('envisible');
                }, 1700);
            }
            break;
        case 2:
            if(click_in){
                p2_once = true;
                click_in = false;
            }
            if(p2_once){
                $('.swipe-up').addClass('envisible');
                // hide 1
                $('.p2-1').removeClass('show');
                $('.p2-hand-i').addClass('hide');
                $('.p2-1-trigger').addClass('envisible');
                // show 2
                setTimeout(function(){
                    $('.p2-2').addClass('show');
                }, 200);
                setTimeout(function(){
                    $('.p2-3').addClass('show');
                    $('.swipe-up').removeClass('envisible');
                    can_turn_page = true;
                }, 1200);
            }else{
                can_turn_page = false;
                $('.swipe-up').addClass('envisible');
                setTimeout(function(){
                    $('.p2-1').addClass('show');
                }, 500);
                setTimeout(function(){
                    $('.p2-hand-i').removeClass('hide');
                    $('.p2-1-trigger').removeClass('envisible');
                }, 1000);
            }
            break;
        case 3:
            if(click_in){
                p3_once = true;
                click_in = false;
            }
            if(p3_once){
                $('.swipe-up').addClass('envisible');
                // hide 1
                $('.p3-1').removeClass('show');
                $('.p3-hand-i').addClass('hide');
                $('.p3-1-trigger').addClass('envisible');
                // show 2
                setTimeout(function(){
                    $('.p3-3').addClass('flash');
                }, 500);
                setTimeout(function(){
                    $('.p3-2').addClass('show');
                }, 1300);
                setTimeout(function(){
                    $('.p3-4').addClass('show');
                    $('.swipe-up').removeClass('envisible');
                    can_turn_page = true;
                }, 1800);
            }else{
                can_turn_page = false;
                $('.swipe-up').addClass('envisible');
                setTimeout(function(){
                    $('.p3-1').addClass('show');
                }, 500);
                setTimeout(function(){
                    $('.p3-hand-i').removeClass('hide');
                    $('.p3-1-trigger').removeClass('envisible');
                }, 1000);
            }
            break;
        case 4:
            can_turn_page = false;
            moving = true;
            $('.swipe-up').addClass('envisible');
            setTimeout(function(){
                $('.p4-5').addClass('show');
            }, 500);
            setTimeout(function(){
                $('.p4-6').addClass('show');
            }, 1200);
            setTimeout(function(){
                $('.p4-3').addClass('show');
            }, 2000);
            setTimeout(function(){
                $('.p4-4').addClass('show');
            }, 2700);
            setTimeout(function(){
                $('.p4-1').addClass('show');
            }, 3400);
            setTimeout(function(){
                $('.p4-2').addClass('show');
                can_turn_page = true;
                $('.swipe-up').removeClass('envisible');
                moving = false;
            }, 4000);
            break;
        case 5:
            can_turn_page = false;
            moving = true;
            $('.swipe-up').addClass('envisible');
            setTimeout(function(){
                $('.p5-1').addClass('show');
            }, 800);
            setTimeout(function(){
                $('.p5-2').addClass('show');
                can_turn_page = true;
                moving = false;
                // $('.swipe-up').removeClass('envisible');
            }, 1700);
            break;
        default:
            break;
    }
}

// Remove goMovie before swipe to next screen to show the movie every time...
function removeGomovie(num){
    switch(num){
        case 0:
            $('.p0-4-i').removeClass('show');
            $('.p0-2').removeClass('show');
            $('.p0-3').removeClass('show');
            $('.p0-5').removeClass('show');
            break;
        case 1:
            $('.p1-4').removeClass('show');
            $('.p1-5').removeClass('show');
            $('.p1-3').removeClass('show');
            break;
        case 2:
            $('.p2-2').removeClass('show');
            $('.p2-3').removeClass('show');
            break;
        case 3:
            $('.p3-3').removeClass('flash');
            $('.p3-2').removeClass('show');
            $('.p3-4').removeClass('show');
            break;
        case 4:
            $('.p4-5').removeClass('show');
            $('.p4-6').removeClass('show');
            $('.p4-3').removeClass('show');
            $('.p4-4').removeClass('show');
            $('.p4-1').removeClass('show');
            $('.p4-2').removeClass('show');
            break;
        case 5:
            $('.p5-1').removeClass('show');
            $('.p5-2').removeClass('show');
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
    showEle();
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
    pageNumber = 0,
    currentDistance = 0,
    contentList = $(".content-list"),
    touchEndY,touchStartY,
    translateStr = 'translate3d(0, -{Y}px, 0)',
    transitionStr = 'all .5s ease-in',
    pageAll = $('.ctt-li').length - 1,
    moving = false,
    p_bar = $('.l-progress-bar'),
    p_txt = $('.l-persent'),
    swipe_up = $('.swipe-up'),
    can_turn_page = false,
    click_in = false,
    p0_once = p1_once = p2_once = p3_once = p4_once = p5_once = false;

// Every page to adapt screen's height
$(".ctt-li").each(function () {
    $(this).css("height", $(window).height());
});

// First Screen's Init
function firstScreenMovie(){
    // Show page-0 animation
    setTimeout(function(){
        $('.p0-1-i').addClass('show');
    }, 500);
    setTimeout(function(){
        $('.p0-hand-i').removeClass('hide');
        $('.p0-1-trigger').removeClass('envisible');
    }, 1000);
}

// Register click trigger
$('.p0-1-trigger, .p1-2-trigger, .p3-1-trigger').on('click', function(e){
    click_in = true;
    showEle(click_in);
});
var p2_1_trigger_X = 0, p2_1_end_X = 0;
$('.p2-1-trigger').on('touchstart', function(e){
    if(!e.touches.length){
        return ;
    }else{
        var finger = e.touches[0];
        p2_1_trigger_X = finger.pageX;
        console.log('start_X:'+finger.pageX);
    }
});
$('.p2-1-trigger').on('touchmove', function(e){
    if(!e.touches.length){
        return;
    }else{
        var finger = e.touches[0];
        p2_1_end_X = finger.pageX;
        console.log('move_X:'+finger.pageX);
    }
});
$('.p2-1-trigger').on('touchend', function(e){
    if(Math.abs(p2_1_end_X - p2_1_trigger_X) >= 25){
        click_in = true;
        showEle(click_in);
    }
    console.log('end_X:'+Math.abs(p2_1_end_X - p2_1_trigger_X));
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



