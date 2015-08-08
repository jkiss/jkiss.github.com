/* 
* @Author: apple
* @Date:   2014-12-04 17:22:20
* @Last Modified by:   apple
* @Last Modified time: 2014-12-07 18:46:41
*/

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

// Deg to Rad
function degToRad(deg){
    var pi = Math.PI;
    return ((deg/360)*2*pi);
}

// Show redbars
function showRedbars(){
    var
        bar1 = {
            'ele': $('.p0-redbar-1'),
            'right': '86px',
            'top': '-200px'
        },
        bar2 = {
            'ele': $('.p0-redbar-2'),
            'right': '50px',
            'top': '-8px'
        },
        bar3 = {
            'ele': $('.p0-redbar-3'),
            'right': '0px',
            'bottom': '145px'
        },
        bar4 = {
            'ele': $('.p0-redbar-4'),
            'right': '0px',
            'bottom': '102px'
        },
        start_x = 0,
        start_y = 0,
        screen_w = $(window).width(),
        ele_w = screen_w * 1.5,
        cos25 = Math.cos(degToRad(25)),
        sin25 = Math.sin(degToRad(25)),
        translateStr = '',
        transitionStr = 'all .5s ease-out';

    // init properties
    start_x = Math.round(ele_w * cos25);
    start_y = Math.round(ele_w * sin25);
    console.log(parseInt(bar1['right'])+start_x);

    // move to start position
    bar1.ele.css({
        'right': parseInt(bar1['right'])+start_x+'px',
        'top': parseInt(bar1['top'])+start_y+'px',
        'opacity': 1
    });
    bar2.ele.css({
        'right': parseInt(bar2['right'])+start_x+'px',
        'top': parseInt(bar2['top'])+start_y+'px',
        'opacity': 1
    });
    bar3.ele.css({
        'right': parseInt(bar3['right'])+start_x+'px',
        'bottom': -(start_y-parseInt(bar3['bottom']))+'px',
        'opacity': 1
    });
    bar4.ele.css({
        'right': parseInt(bar4['right'])+start_x+'px',
        'bottom': -(start_y-parseInt(bar4['bottom']))+'px',
        'opacity': 1
    });

    // Animation
    console.log(bar1,bar2,bar3,bar4);
    setTimeout(function(){
        bar1.ele.animate({
            right: bar1['right'],
            top: bar1['top']
        },400,'ease-out');
    }, 300);
    setTimeout(function(){
        bar2.ele.animate({
            right: bar2['right'],
            top: bar2['top']
        },400,'ease-out');
    }, 500);
    setTimeout(function(){
        bar3.ele.animate({
            right: bar3['right'],
            bottom: bar3['bottom']
        },400,'ease-out');
    }, 200);
    setTimeout(function(){
        bar4.ele.animate({
            right: bar4['right'],
            bottom: bar4['bottom']
        },400,'ease-out');
    }, 800);
}

// First screen animations
function p0Ai(){
    setTimeout(function(){
        $('.p0-news').addClass('riseUp');
    }, 1500);
    setTimeout(function(){
        $('.p0-workshop').addClass('riseUp');
    }, 1700);
    setTimeout(function(){
        $('.p0-zhaopin').addClass('riseUp');
    }, 1900);
    setTimeout(function(){
        $('.p0-yangshi').addClass('coinToss');
    }, 2800);
    setTimeout(function(){
        $('.p0-html5').addClass('bubbleShow');
    }, 3200);
    setTimeout(function(){
        $('.p0-ui').addClass('bubbleShow');
    }, 3400);
}

// Page2 aimations
function p2Ai(){
    setTimeout(function(){
        $('.p2-html5').addClass('moveDown');
    }, 50);
    setTimeout(function(){
        $('.p2-black-bar').addClass('moveLeft');
    }, 200);
    setTimeout(function(){
        $('.p2-en').addClass('scaleUp');
    }, 1000);
    setTimeout(function(){
        $('.p2-cn').addClass('scaleDown');
    }, 1000);
    setTimeout(function(){
        $('.p2-req-wrap').addClass('moveLeft');
    }, 1300);
    setTimeout(function(){
        $('.p2-home').addClass('bubbleShow');
    }, 1600);
}

// Page1 animation
function p1Ai(){
    setTimeout(function(){
        $('.p1-ui').addClass('moveDown');
    }, 50);
    setTimeout(function(){
        $('.p1-black-bar').addClass('moveLeft');
    }, 200);
    setTimeout(function(){
        $('.p1-en').addClass('scaleUp');
    }, 1000);
    setTimeout(function(){
        $('.p1-cn').addClass('scaleDown');
    }, 1000);
    setTimeout(function(){
        $('.p1-require-1').addClass('riseUp');
    }, 1300);
    setTimeout(function(){
        $('.p1-home').addClass('bubbleShow');
    }, 1600);
}

// Binding p0 btns events
function pageBtn(){
    // In HTML5 AD
    $('.p0-html5').on('click', function(event){
        var is_first = true;
        
        $('.html5-ad')
            .css('display', 'block')
            .animate({
                opacity: 1
            }, 500, 'ease-out', function(){
                if(is_first){
                    // play a movie
                    p2Ai();
                    is_first = false;
                }
            });
    });

    // In UI AD
    $('.p0-ui').on('click', function(event) {
        var is_first = true;

        $('.ps-ad')
            .css('display', 'block')
            .animate({
                opacity: 1
            }, 500, 'ease-out', function(){
                if(is_first){
                    // play a movie
                    p1Ai();
                    is_first = false;
                }
            });
    });

    // Return Home
    $('.p2-home').on('click', function(event) {
        if($(event.target).is('.p2-home')){
            $('.page2')
            .animate({
                opacity: 0
            }, 500, 'ease-out', function(){
                $(this).css('display', 'none');
            });
        }
    });
    $('.p1-home').on('click', function(event) {
        $('.page1')
            .animate({
                opacity: 0
            }, 500, 'ease-out', function(){
                $(this).css('display', 'none');
            });
    });
}

// Page2 Switch
function p2SwipeLeft(){
    if(whichReq === 1){
        $('.p2-require-1').animate({
            left: '-320px'
        }, 300, 'ease-in-out', function(){
            $('.p2-to-right').removeClass('icon-arrow-circle-left swipeLeft').addClass('icon-arrow-circle-right swipeRight');
        });
        $('.p2-require-2').animate({
            left: '0'
        }, 400, 'ease-in-out', function(){
            whichReq = 2;
        });
    }
}
function p2SwipeRight(){
    if(whichReq === 2){
        $('.p2-require-2').animate({
            left: '320px'
        }, 300, 'ease-in-out', function(){
            $('.p2-to-right').removeClass('icon-arrow-circle-right swipeRight').addClass('icon-arrow-circle-left swipeLeft');
        });
        $('.p2-require-1').animate({
            left: '0'
        }, 400, 'ease-in-out', function(){
            whichReq = 1;
        });
    }
}

// Touch Swipe Event
function startTouch(event) {
    if (!event.touches.length) {
        return;
    }
    tmpEndX = 0;
    var touch = event.touches[0];
    tmpStartX = touch.pageX;
}

function moveTouch(event) {
    event.preventDefault();
    if (!event.touches.length) {
        return;
    }
    var touch = event.touches[0];
    tmpEndX = touch.pageX;
}

// 触摸结束时判断执行左滑或者右滑？
function endTouch() {
    var endX = tmpEndX;
    var startX = tmpStartX;
    if (endX && endX !== startX && endX-startX<=-25) {
        // Swipe Left
        p2SwipeLeft();
    }else if(endX && endX !== startX && endX-startX>=25){
        // Swipe Right
        p2SwipeRight();
    }
}

var 
    page2 = $('.page2'),
    whichReq = 1,
    tmpEndX,
    tmpStartX,
    screen_w = $(window).width();

page2.on('touchstart', function(e){
    startTouch(e);
});
page2.on('touchmove', function(e){
    moveTouch(e);
});
page2.on('touchend', function(e){
    endTouch(e);
});











