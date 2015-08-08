/*
*    Author is Nokey -- 木马人
*/

/************    Funcs to prepare    ************/

// Show Elements gradually
function showEle(){
    // swipe trigger
    switch(pageNumber){
        case 0:
            setTimeout(function(){
                $('.p0-bg-1-i').addClass('zoomIn');
            }, 550);
            setTimeout(function(){
                $('.p0-bg').addClass('show');
            }, 800);
            setTimeout(function(){
                $('.p0-leaf-1').addClass('show leafSwing1');
            }, 1500);
            setTimeout(function(){
                $('.p0-leaf-2').addClass('show leafSwing2');
            }, 1800);
            setTimeout(function(){
                $('.p0-bg-2-i').addClass('moveInRight');
            }, 2200);
            setTimeout(function(){
                $('.p0-subpage-box').addClass('show');
            }, 2700);
            setTimeout(function(){
                $('.p0-bg-4-i').addClass('flipInX');
                can_turn_page = true;
                swipe_up.removeClass('envisible');
            }, 3500);
            break;
        case 1:
            setTimeout(function(){
                $('.p1-leaf').addClass('show');
            }, 600);
            setTimeout(function(){
                $('.p1-3-i').addClass('bounceIn');
            }, 1200);
            setTimeout(function(){
                $('.p1-5-i').addClass('show rorate-360');
            }, 1700);
            setTimeout(function(){
                $('.p1-2-i').addClass('bounceIn');
            }, 2200);
            setTimeout(function(){
                $('.p1-4-i').addClass('show rorate360');
            }, 3200);
            setTimeout(function(){
                $('.p1-1-i').addClass('bounceIn');
                can_turn_page = true;
                swipe_up.removeClass('envisible');
            }, 3700);
            break;
        case 2:
            setTimeout(function(){
                $('.p2-1-i').addClass('show');
            }, 550);
            setTimeout(function(){
                $('.p2-2-i').addClass('show');
                can_turn_page = true;
                swipe_up.removeClass('envisible');
            }, 1200);
            break;
        case 3:
            setTimeout(function(){
                $('.p3-1-i').addClass('show');
            }, 550);
            setTimeout(function(){
                $('.p3-2-i').addClass('bounceIn');
            }, 1000);
            setTimeout(function(){
                $('.p3-3-i').addClass('bounceIn');
            }, 1500);
            setTimeout(function(){
                $('.p3-4-i').addClass('bounceIn');
            }, 2000);
            setTimeout(function(){
                $('.p3-5-i').addClass('bounceIn');
            }, 2500);
            setTimeout(function(){
                $('.p3-6-i').addClass('bounceIn');
                can_turn_page = true;
            }, 3000);
            break;
        default:
            break;
    }
}

// Remove goMovie before swipe to next screen to show the movie every time...
function removeGomovie(num){
    switch(num){
        case 0:
            $('.p0-bg-1-i').removeClass('zoomIn');
            break;
        case 1:
            $('.p1-3-i').removeClass('bounceIn');
            $('.p1-5-i').removeClass('show rorate-360');
            $('.p1-2-i').removeClass('bounceIn');
            $('.p1-4-i').removeClass('show rorate360');
            $('.p1-1-i').removeClass('bounceIn');
            break;
        case 2:
            $('.p2-1-i').removeClass('show');
            $('.p2-2-i').removeClass('show');
            break;
        case 3:
            $('.p3-1-i').removeClass('show');
            $('.p3-2-i').removeClass('bounceIn');
            $('.p3-3-i').removeClass('bounceIn');
            $('.p3-4-i').removeClass('bounceIn');
            $('.p3-5-i').removeClass('bounceIn');
            $('.p3-6-i').removeClass('bounceIn');
            break;
        default:
            break;
    }
}

// Next Page
function screenForward(){
    if(p0_subpageNumber < 3){
        p0_subpageNumber++;
        log(p0_subpageNumber);
        p0_currentDis = screenHeight * p0_subpageNumber;
        p0_subpage.css({
            '-webkit-transform': translateStr.replace(/{Y}/g, p0_currentDis),
            'transform': translateStr.replace(/{Y}/g, p0_currentDis),
            '-webkit-transition': p0_transitionStr,
            'transition': p0_transitionStr
        });
    }else{
        can_turn_page = false;
        swipe_up.addClass('envisible');
        var num = ++pageNumber;
        removeGomovie(num);

        if(pageNumber > pageAll){
            pageNumber = pageAll;
            can_turn_page = true;
            // log(pageNumber);
        }else{
            // log(pageNumber);
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
    }
}
// Prev Page
function screenBack(){
    if(pageNumber === 0 && p0_subpageNumber > 0){
        p0_subpageNumber--;
        log(p0_subpageNumber);
        p0_currentDis = screenHeight * p0_subpageNumber;
        p0_subpage.css({
            '-webkit-transform': translateStr.replace(/{Y}/g, p0_currentDis),
            'transform': translateStr.replace(/{Y}/g, p0_currentDis),
            '-webkit-transition': p0_transitionStr,
            'transition': p0_transitionStr
        });
    }else{
        can_turn_page = false;
        swipe_up.addClass('envisible');
        var num = --pageNumber;
        removeGomovie(num);

        if(pageNumber < 0){
            pageNumber = 0;
            can_turn_page = true;
            swipe_up.removeClass('envisible');
            // log(pageNumber);
        }else{
            // log(pageNumber);
            if(pageNumber === 0){
                swipe_up.removeClass('envisible');
                can_turn_page = true;
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
    }
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
        console.log('Downturning...');
        screenForward();
    }else if(endY && endY !== startY && endY - startY >= 50){
        console.log('Upturning...');
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
    transitionStr = 'all .5s ease',
    pageAll = $('.ctt-li').length - 1,
    moving = false,
    p_bar = $('.l-progress-bar'),
    p_txt = $('.l-persent'),
    swipe_up = $('.swipe-up'),
    can_turn_page = false,
    p0_currentDis = 0,
    p0_transitionStr = 'all .4s ease',
    p0_subpage = $('.p0-subpage-box'),
    p0_subpageNumber = 0,
    p0_subpageAll = $('.p0-subpage').length - 1;
log(p0_subpageAll);
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
    can_turn_page && startTouch(e);
});
contentList.on('touchmove', function(e) {
    can_turn_page && moveTouch(e);
});
contentList.on('touchend', function(e) {
    can_turn_page && endTouch(e);
});

/***************    Tools     *****************/
function log(m){
    console && console.log('Log: ' + m);
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



