/*
*    Author is Nokey -- 木马人
*/

/************    Funcs to prepare    ************/

// Show Elements gradually
function showEle(){
    switch(pageNumber){
        case 0:
            setTimeout(function(){
                $('.p0-shuimo3').css('opacity', 0);
            }, 500);
            setTimeout(function(){
                $('.p0-shuimo2').css('opacity', 0);
            }, 1100);
            setTimeout(function(){
                $('.p0-shuimo1').css('opacity', 0);
            }, 1700);
            setTimeout(function(){
                $('.p0-4').addClass('flipInX');
            }, 2200);
            setTimeout(function(){
                $('.p0-2').addClass('pulse');
            }, 3000);
            setTimeout(function(){
                $('.p0-logo').addClass('pulse');
            }, 3500);
            break;
        case 1:
            var currentPage = pageNumber;
            setTimeout(function(){
                $('.p1-6').addClass('goMovie');
            }, 500);
            setTimeout(function(){
                $('.p1-1').addClass('goMovie');
            }, 800);
            setTimeout(function(){
                $('.p1-2').addClass('goMovie');
            }, 1100);
            setTimeout(function(){
                $('.p1-3').addClass('flyDown');
            }, 1500);
            setTimeout(function(){
                $('.p1-5').addClass('goMovie');
            }, 2300);
            setTimeout(function(){
                $('.p1-4').addClass('bounceIn');
            }, 3000);
            break;
        case 2:
            var currentPage = pageNumber;
            setTimeout(function(){
                $('.p2-8').addClass('goMovie');
            }, 500);
            setTimeout(function(){
                $('.p2-2').addClass('goMovie');
            }, 1000);
            setTimeout(function(){
                $('.p2-3').addClass('goMovie');
            }, 1500);
            setTimeout(function(){
                $('.p2-5').addClass('goMovie');
            }, 2000);
            setTimeout(function(){
                $('.p2-4').addClass('flash');
            }, 2100);
            setTimeout(function(){
                $('.p2-6').addClass('flash');
            }, 2200);
            setTimeout(function(){
                $('.p2-7').addClass('flash');
            }, 2300);
            setTimeout(function(){
                $('.p2-1').addClass('bounceIn');
            }, 2800);
            break;
        case 3:
            var currentPage = pageNumber;
            setTimeout(function(){
                $('.p3-3').addClass('goMovie');
            }, 500);
            setTimeout(function(){
                $('.p3-2').addClass('goMovie');
            }, 1000);
            setTimeout(function(){
                $('.p3-1').addClass('bounceIn');
            }, 1500);
            break;
        case 4:
            var currentPage = pageNumber;
            setTimeout(function(){
                $('.p4-4').addClass('flipInX');
            }, 800);
            setTimeout(function(){
                $('.p4-2').addClass('flipInX');
            }, 1200);
            setTimeout(function(){
                $('.p4-3').addClass('flash');
            }, 1800);
            setTimeout(function(){
                $('.p4-1').addClass('bounceIn');
            }, 2300);
            break;
        default:
            break;
    }
}

// Remove goMovie before swipe to next screen to show the movie every time...
function removeGomovie(num){
    switch(num){
        case 0:
            $('.p0-shuimo3').css('opacity', 1);
            $('.p0-shuimo2').css('opacity', 1);
            $('.p0-shuimo1').css('opacity', 1);
            $('.p0-4').removeClass('flipInX');
            $('.p0-2').removeClass('pulse');
            $('.p0-logo').removeClass('pulse');
            break;
        case 1:
            $('.p1-6').removeClass('goMovie');
            $('.p1-1').removeClass('goMovie');
            $('.p1-2').removeClass('goMovie');
            $('.p1-3').removeClass('flyDown');
            $('.p1-5').removeClass('goMovie');
            $('.p1-4').removeClass('bounceIn');
            break;
        case 2:
            $('.p2-8').removeClass('goMovie');
            $('.p2-2').removeClass('goMovie');
            $('.p2-3').removeClass('goMovie');
            $('.p2-5').removeClass('goMovie');
            $('.p2-4').removeClass('flash');
            $('.p2-6').removeClass('flash');
            $('.p2-7').removeClass('flash');
            $('.p2-1').removeClass('bounceIn');
            break;
        case 3:
            $('.p3-3').removeClass('goMovie');
            $('.p3-2').removeClass('goMovie');
            $('.p3-1').removeClass('bounceIn');
            break;
        case 4:
            $('.p4-4').removeClass('flipInX');
            $('.p4-2').removeClass('flipInX');
            $('.p4-3').removeClass('flash');
            $('.p4-1').removeClass('bounceIn');
            $('.p4-game-win').css({
                opacity: 0,
                width: 0,
                height: 0
            });
            $('.p5-share').css({
                opacity: 0,
                left: '100%',
                top: '100%'
            });
            $('.game-2').removeClass('bounceIn');
            $('.p5-5').css('opacity', 0);
            yang_game.reset();
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

/***************      Game Frame     **************/

function YangGame(){
    // 四只小羊
    this.yang_lt = {
        'yang': $('.p5-y3'),
        'appear': false,
        'stay_timer': null
    };
    this.yang_rt = {
        'yang': $('.p5-y4'),
        'appear': false,
        'stay_timer': null
    };
    this.yang_lb = {
        'yang': $('.p5-y2'),
        'appear': false,
        'stay_timer': null
    };
    this.yang_rb = {
        'yang': $('.p5-y1'),
        'appear': false,
        'stay_timer': null
    };

    // 四只小羊的监测器
    this.yang_lt_control = $('.p5-lt');
    this.yang_rt_control = $('.p5-rt');
    this.yang_lb_control = $('.p5-lb');
    this.yang_rb_control = $('.p5-rb');

    // 四只小羊的控制器
    this.yang_lt_timer = null;
    this.yang_rt_timer = null;
    this.yang_lb_timer = null;
    this.yang_rb_timer = null;

    // 计分板2个
    this.realtime_scored = $('.p5-scored');
    this.share_scored = $('.p5-share-scored');

    // 总分数
    this.score = 0;

    // 游戏时间
    this.time = 30;

    // 游戏计时器
    this.timer = null;

    // 每只羊出现后停留的时间
    this.stay_time = [200, 1000];

    // 每只羊的轮播时间
    this.interval_time = [1500, 4000];

    // 分享页
    this.share_page = $('.p5-share');

    // 再玩一局按钮
    this.replay_btn = $('.p5-8');

    // 点中的音乐
    this.tap_music = $('#game_tap')[0];

    // 游戏倒计时
    this.count_down = $('.game-count-down');

    // Html-Title标签：用于分享结果标题
    this.html_title = $('title');

}
YangGame.prototype.init = function(){
    var _me = this;

    // 初始化分数
    _me.score = 0;
    _me.realtime_scored.text(_me.score);

    // 初始化时间
    _me.time = 30;

    // 绑定“再玩一局”按钮事件
    _me.replay_btn.on('touchend', function(event) {
        // 阻止滑动行为
        gameing = true;

        // 隐藏分享页
        _me.share_page.css({
            'opacity': 0,
            'left': '100%',
            'top': '100%'
        });

        // 开始倒计时，进入下一场游戏
        _me.reset();
        _me.countDown();
    });

    console.log('Game Init....');
    return _me;
}
YangGame.prototype.countDown = function(){
    var _me = this,
        count = 3,
        timer = null;

    _me.count_down.text(count);
    _me.count_down.css('display', 'block');
    timer = setInterval(function(){
        _me.count_down.text(--count);
        if(count === 1){
            _me.start();
        }
        if(count === 0){
            clearInterval(timer);
            _me.count_down.css('display', 'none');
        }
        console.log('Game count_down: '+count);
    }, 1000);
}
YangGame.prototype.reset = function(){
    var _me = this;

    // 初始化分数
    _me.score = 0;
    _me.realtime_scored.text(_me.score);

    // 初始化时间
    _me.time = 30;

    // 清除计时器
    clearInterval(_me.timer);
    clearInterval(_me.yang_lt_timer);
    clearInterval(_me.yang_rt_timer);
    clearInterval(_me.yang_lb_timer);
    clearInterval(_me.yang_rb_timer);

    // 清除检测器
    _me.yang_lt_control.off('touchend');
    _me.yang_rt_control.off('touchend');
    _me.yang_lb_control.off('touchend');
    _me.yang_rb_control.off('touchend');

    // 初始化四只羊对象的状态
    _me.yang_lt.yang.css('opacity', 0);
    _me.yang_lt.appear = false;
    clearTimeout(_me.yang_lt.stay_timer);
    _me.yang_rt.yang.css('opacity', 0);
    _me.yang_rt.appear = false;
    clearTimeout(_me.yang_rt.stay_timer);
    _me.yang_lb.yang.css('opacity', 0);
    _me.yang_lb.appear = false;
    clearTimeout(_me.yang_lb.stay_timer);
    _me.yang_rb.yang.css('opacity', 0);
    _me.yang_rb.appear = false;
    clearTimeout(_me.yang_rb.stay_timer);

    return _me;
}
YangGame.prototype.showScene = function(){
    $('.p4-game-win').css({
        opacity: 1,
        width: '100%',
        height: '100%'
    });
    setTimeout(function(){
        $('.game-2').addClass('bounceIn');
    }, 300);
    setTimeout(function(){
        $('.p5-5').css('opacity', 1);
    }, 800);
}
YangGame.prototype.randomStayTime = function(){
    var _me = this;
    return _me.stay_time[0] + Math.floor(Math.random() * (_me.stay_time[1] - _me.stay_time[0] + 1));
}
YangGame.prototype.randomIntervalTime = function(){
    var _me = this;
    return _me.interval_time[0] + Math.floor(Math.random() * (_me.interval_time[1] - _me.interval_time[0] + 1));
}
YangGame.prototype.start = function(){
    var _me = this;
    console.log('Game Start...');
    
    /*********    直接启动动画装置！发射！    *********/
    // 四个检测器
    _me.yang_lt_control.on('touchend', function(event){
        if(_me.yang_lt.appear){
            // 点中了，加一分！
            _me.score++;
            _me.realtime_scored.text(_me.score);
            _me.tap_music.play();
            // 初始化被点中的羊
            _me.yang_lt.yang.css('opacity', 0);
            _me.yang_lt.appear = false;
            clearTimeout(_me.yang_lt.stay_timer);
        }
    });
    _me.yang_lb_control.on('touchend', function(event){
        if(_me.yang_lb.appear){
            // 点中了，加一分！
            _me.score++;
            _me.realtime_scored.text(_me.score);
            _me.tap_music.play();
            // 初始化被点中的羊
            _me.yang_lb.yang.css('opacity', 0);
            _me.yang_lb.appear = false;
            clearTimeout(_me.yang_lb.stay_timer);
        }
    });
    _me.yang_rt_control.on('touchend', function(event){
        if(_me.yang_rt.appear){
            // 点中了，加一分！
            _me.score++;
            _me.realtime_scored.text(_me.score);
            _me.tap_music.play();
            // 初始化被点中的羊
            _me.yang_rt.yang.css('opacity', 0);
            _me.yang_rt.appear = false;
            clearTimeout(_me.yang_rt.stay_timer);
        }
    });
    _me.yang_rb_control.on('touchend', function(event){
        if(_me.yang_rb.appear){
            // 点中了，加一分！
            _me.score++;
            _me.realtime_scored.text(_me.score);
            _me.tap_music.play();
            // 初始化被点中的羊
            _me.yang_rb.yang.css('opacity', 0);
            _me.yang_rb.appear = false;
            clearTimeout(_me.yang_rb.stay_timer);
        }
    });

    // 四个动画计时器
    _me.yang_lt_timer = setInterval(function(){
        _me.yang_lt.yang.css('opacity', 1);
        _me.yang_lt.appear = true;
        _me.yang_lt.stay_timer = setTimeout(function(){
                                    _me.yang_lt.yang.css('opacity', 0);
                                    _me.yang_lt.appear = false;
                                }, _me.randomStayTime());
        // console.log(_me.randomStayTime);
    }, _me.randomIntervalTime());
    // ===============
    _me.yang_rt_timer = setInterval(function(){
        _me.yang_lb.yang.css('opacity', 1);
        _me.yang_lb.appear = true;
        _me.yang_lb.stay_timer = setTimeout(function(){
                                    _me.yang_lb.yang.css('opacity', 0);
                                    _me.yang_lb.appear = false;
                                }, _me.randomStayTime());
    }, _me.randomIntervalTime());
    // ===============
    _me.yang_lb_timer = setInterval(function(){
        _me.yang_rt.yang.css('opacity', 1);
        _me.yang_rt.appear = true;
        _me.yang_rt.stay_timer = setTimeout(function(){
                                    _me.yang_rt.yang.css('opacity', 0);
                                    _me.yang_rt.appear = false;
                                }, _me.randomStayTime());
    }, _me.randomIntervalTime());
    // ===============
    _me.yang_rb_timer = setInterval(function(){
        _me.yang_rb.yang.css('opacity', 1);
        _me.yang_rb.appear = true;
        _me.yang_rb.stay_timer = setTimeout(function(){
                                    _me.yang_rb.yang.css('opacity', 0);
                                    _me.yang_rb.appear = false;
                                }, _me.randomStayTime());
    }, _me.randomIntervalTime());

    // 游戏计时器
    _me.timer = setInterval(function(){
        if(_me.time !== 0){
            // 时间减少了1秒，时间如白驹过隙，转瞬即逝
            _me.time--;
        }else{
            _me.over();
        }
    }, 1000);
}
YangGame.prototype.over = function(){
    var _me = this;

    // 设置分享页分数
    _me.share_scored.text(_me.score);

    // 设置Title里面的分数
    _me.html_title.text('Wow, '+_me.score+' golden sheep! '+_me.range(_me.score));

    // 重置游戏
    _me.reset();

    // 显示分享页
    _me.share_page.css({
        'opacity': 1,
        'left': 0,
        'top': 0
    });

    // 恢复滑动
    setTimeout(function(){
        gameing = false;
    }, 1000);
}
YangGame.prototype.range = function(score){
    // 游戏中能显示最多80只羊
    var show_txt = 'You beat the {n}% players!';
    if(score >=0 && score <=10){
        return show_txt.replace(/{n}/g, 10);
    }else if(score >10 && score <=20){
        return show_txt.replace(/{n}/g, 20);
    }else if(score >20 && score <=30){
        return show_txt.replace(/{n}/g, 40);
    }else if(score >30 && score <=40){
        return show_txt.replace(/{n}/g, 60);
    }else if(score >40 && score <=60){
        return show_txt.replace(/{n}/g, 80);
    }else if(score >60){
        return show_txt.replace(/{n}/g, 99);
    }
}

var yang_game = new YangGame();
// console.log(yang_game);
yang_game.init();
// show game scene  这个是引入游戏的外部按钮，想想还是放在了对象外面
$('.p4-1').on('touchend', function(event) {
    // 阻止滑动行为
    gameing = true;
    yang_game.reset();
    yang_game.showScene();

    yang_game.countDown();

});



