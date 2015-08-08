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
            setTimeout(function(){
                $('.p0-bg').removeClass('hide');
            }, 500);
            setTimeout(function(){
                $('.p0-1-i').removeClass('scale0');
            }, 1200);
            setTimeout(function(){
                $('.p0-2-1').addClass('zoom');
            }, 2000);
            setTimeout(function(){
                $('.p0-2-2').addClass('zoom');
                can_turn_page = true;
            }, 3000);
            break;
        case 1:
            can_turn_page = false;
            setTimeout(function(){
                moveBg(pageNumber, screenWidth, type);
            }, 500);
            setTimeout(function(){
                $('.p1-1').addClass('show');
            }, 1000);
            setTimeout(function(){
                $('.p1-2').addClass('show');
            }, 2000);
            setTimeout(function(){
                $('.p1-3').addClass('show');
            }, 3000);
            setTimeout(function(){
                $('.p1-4').addClass('show');
                can_turn_page = true;
            }, 4000);
            break;
        case 2:
            can_turn_page = false;
            setTimeout(function(){
                moveBg(pageNumber, screenWidth, type);
            }, 500);
            setTimeout(function(){
                $('.p2-1').addClass('show');
            }, 1000);
            setTimeout(function(){
                $('.p2-2').addClass('show');
            }, 2000);
            setTimeout(function(){
                $('.p2-3').addClass('show');
            }, 3000);
            setTimeout(function(){
                $('.p2-4').addClass('show');
                can_turn_page = true;
            }, 4000);
            break;
        case 3:
            can_turn_page = false;
            setTimeout(function(){
                moveBg(pageNumber, screenWidth, type);
            }, 500);
            setTimeout(function(){
                $('.p3-1').addClass('show');
            }, 1000);
            setTimeout(function(){
                $('.p3-2').addClass('show');
            }, 2000);
            setTimeout(function(){
                $('.p3-3').addClass('show');
            }, 3000);
            setTimeout(function(){
                $('.p3-4').addClass('show');
                can_turn_page = true;
            }, 4000);
            break;
        case 4:
            can_turn_page = false;
            swipe_up.addClass('swipeMove');
            setTimeout(function(){
                moveBg(pageNumber, screenWidth, type);
            }, 500);
            setTimeout(function(){
                $('.p4-1').addClass('show');
            }, 1000);
            setTimeout(function(){
                $('.p4-2').addClass('show');
            }, 2000);
            setTimeout(function(){
                $('.p4-3').addClass('show');
            }, 3000);
            setTimeout(function(){
                can_turn_page = true;
                $('.p4-4').addClass('show');
            }, 4000);
            break;
        case 5:
            can_turn_page = false;
            swipe_up.removeClass('swipeMove');
            setTimeout(function(){
                $('.p5-bg').removeClass('hide');
            }, 500);
            setTimeout(function(){
                $('.p5-1').addClass('show');
            }, 1000);
            setTimeout(function(){
                $('.p5-2').addClass('show');
            }, 2000);
            setTimeout(function(){
                $('.p5-3').addClass('show');
            }, 3000);
            setTimeout(function(){
                $('.p5-4').addClass('show');
                can_turn_page = true;
            }, 4000);
            break;
        default:
            break;
    }
}

function showOnce(eles){
    var randomItem = $(eles[Math.floor(Math.random() * eles.length)]);

    randomItem.removeClass('hide');
    setTimeout(function(){
        randomItem.addClass('hide');
    }, 2000);
}
function moveBg(n, w, type){
    var 
        bg = $('.p'+n+'-bg'),
        bg_w,
        bg_diff;
    if(type === 'f'){
        bg_w = bg.width();
        bg_diff = bg_w - w;
        bg.css({
            '-webkit-transform': 'translate3d(-'+bg_diff+'px, 0, 0)',
            'transform': 'translate3d(-'+bg_diff+'px, 0, 0)'
        });
    }else if(type === 'b'){
        bg.css({
            '-webkit-transform': 'translate3d(0, 0, 0)',
            'transform': 'translate3d(0, 0, 0)'
        });
    }
}

// Remove goMovie before swipe to next screen to show the movie every time...
function removeGomovie(num){
    $('.p'+num+'-1').removeClass('show');
    $('.p'+num+'-2').removeClass('show');
    $('.p'+num+'-3').removeClass('show');
    $('.p'+num+'-4').removeClass('show');
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
    can_turn_page = false,
    p0_txts = $('.p0-txt');

// Every page to adapt screen's height
$(".ctt-li").each(function () {
    $(this).css("height", $(window).height());
});

// First Screen's Init
function firstScreenMovie(){
    // p0 random single text show
    setInterval(function(){
        showOnce(p0_txts);
    }, 3500);
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



