/*
*    Author is Nokey -- 木马人
*/

/************   START  MOVIE   ************/

// Assume Parametors
var screenHeight = $(window).height(),
    screenWidth = $(window).width(),
    currentDistance = 0,
    contentList = $(".content-list"),
    page_num = 0,
    page_all = 0,
    up_btn = $('.p2-up-i'),
    down_btn = $('.p2-down-i'),
    req_imgs,
    moving = false,
    p_bar = $('.l-progress-bar'),
    p_txt = $('.l-persent'),
    can_turn_page = false,
    DATE = '',
    COUNT = 0,
    isMobile = /\smobile\s/.test($('html').attr('class')),
    desktopRatio = 375 / 603,   // iPhone6 ratio
    tap_event_name = '',
    vendors = { Webkit: 'webkit', Moz: '', O: 'o' },
    testEle = document.createElement('div'),
    normalizeEvent = function(name){
        return eventPrefix ? eventPrefix + name : name.toLowerCase();
    },
    eventPrefix,
    animateStartEvent = '',
    animateEndEvent = '',
    can_back_layer3 = false,
    isPhoneNum = /^\d{11}$/;  // 验证11位数字

// register 'click' or 'touchend' event
isMobile ? tap_event_name = 'touchend' : tap_event_name = 'click';

// adapt pc
if(!isMobile){
    $('.container').css('max-width', screenHeight*desktopRatio+'px');
}

// prefix
$.each(vendors, function(vendor, prefix){
    if(testEle.style[vendor + 'TransitionProperty'] !== undefined){
        eventPrefix = prefix;
    }
});
animateStartEvent = normalizeEvent('AnimationStart');
animateEndEvent = normalizeEvent('AnimationEnd');

$.get('http://54.223.171.90:80/time.php', function(data) {
    DATE = data;
});
$.get('http://54.223.171.90:80/count.php', function(data) {
    COUNT = parseInt(data);
});
// First Screen's Init
function firstScreenMovie(){
    setTimeout(function(){
        $('.p0-bg').removeClass('hide');
    }, 500);
    setTimeout(function(){
        $('.p0-10').addClass('slideInUp');
    }, 800);
    setTimeout(function(){
        $('.p0-6').removeClass('hide');
    }, 1300);
    // body
    setTimeout(function(){
        $('.p0-body').removeClass('hide');
    }, 2300);
    setTimeout(function(){
        $('.p0-9-i').addClass('swing');
    }, 2400);
    setTimeout(function(){
        $('.p0-5-i').addClass('swing2');
    }, 2500);
    setTimeout(function(){
        $('.p0-3-i').removeClass('hide');
    }, 4000);
    setTimeout(function(){
        $('.p0-4-i').removeClass('hide envisible');
    }, 4300);
    setTimeout(function(){
        $('.p0-1-i').addClass('bounceIn');
    }, 5000);
    setTimeout(function(){
        $('.p0-2-i').addClass('bounceIn');
    }, 5300);
}

$('.p0-4-i').on(tap_event_name, function(event) {
    // open position list
    $('.layer-1').css({
        '-webkit-transform': 'scale(1.5) translate3d(0,-8%,0)',
        'transform': 'scale(1.5) translate3d(0,-8%,0)'
    });
    setTimeout(function(){
        $('.p0-5-i').removeClass('swing2');
        $('.p0-3-i, .p0-4-i').addClass('hide envisible');
    }, 200);
    $('.layer-2').removeClass('envisible hide');
    $('.p1-8').removeClass('hide');
    setTimeout(function(){
        $('.p1-1-i').addClass('bounceIn');
    }, 500);
    setTimeout(function(){
        $('.p1-2-i').removeClass('envisible').addClass('bounceIn');
    }, 800);
    setTimeout(function(){
        $('.p1-3-i').removeClass('envisible').addClass('bounceIn');
    }, 1100);
    setTimeout(function(){
        $('.p1-4-i').removeClass('envisible').addClass('bounceIn');
    }, 1400);
    setTimeout(function(){
        $('.p1-5-i').removeClass('envisible').addClass('bounceIn');
    }, 1700);
    setTimeout(function(){
        $('.p1-6-i').removeClass('envisible').addClass('bounceIn');
    }, 2000);
    setTimeout(function(){
        $('.p1-7-i').removeClass('hide');
    }, 2300);
});
$('.layer-2').on(tap_event_name, '.pos-btn', function(event) {
    // console.log(event.target);
    var pos_type = $(event.target).attr('data-pos'),
        form_box = $('.form-box');

    form_box.attr('data-pos-name', $('.'+pos_type).attr('data-des'));
    showPosDes(pos_type);
});

function showPosDes(pos_type){
    var pos = $('.'+pos_type);
    
    req_imgs = pos.find('img');
    page_num = 0;
    page_all = req_imgs.length - 1;
    // hide upper layer
    $('.layer-2').addClass('hide envisible');
    // init layer-3 pos's des(初始化组件)
    $('.layer-3').find('.pos-box').addClass('envisible');
    pos.removeClass('envisible');
    up_btn.addClass('envisible hide');
    down_btn.addClass('envisible hide');
    for (var i = 0; i < req_imgs.length; i++) {
        if(!$(req_imgs[i]).hasClass('hide')){
            page_num = i;
            // console.log('page_num:'+page_num);
        }
    };

    if(page_all > 0){
        // enable click
        up_btn.removeClass('envisible');
        down_btn.removeClass('envisible');
        // show click
        if(page_num === 0){
            up_btn.addClass('hide');
            down_btn.removeClass('hide');
        }else if(page_num === page_all){
            up_btn.removeClass('hide');
            down_btn.addClass('hide');
        }else{
            up_btn.removeClass('hide');
            down_btn.removeClass('hide');
        }
    }
    // show current layer
    $('.layer-3').removeClass('envisible').addClass('bounceIn');
}
down_btn.on(tap_event_name, function(event) {
    page_num++;
    
    if(page_num > page_all){
        page_num = page_all;
    }

    if(page_num > 0){
        up_btn.removeClass('hide');
    }
    if(page_num >= page_all){
        down_btn.addClass('hide');
    }
    $(req_imgs[page_num - 1]).addClass('hide');
    $(req_imgs[page_num]).removeClass('hide');
});
up_btn.on(tap_event_name, function(event) {
    page_num--;
    if(page_num < 0){
        page_num = 0;
    }
    if(page_num < page_all){
        down_btn.removeClass('hide');
    }
    if(page_num === 0){
        up_btn.addClass('hide');
    }
    $(req_imgs[page_num + 1]).addClass('hide');
    $(req_imgs[page_num]).removeClass('hide');
});

// back layer-2
$('.p2-back-i').on(tap_event_name, function(event) {
    // back to position list
    $('.layer-3').addClass('envisible').removeClass('bounceIn');
    // show layer 2
    $('.layer-2').removeClass('hide envisible');
});

// go layer-4
$('.p2-apply-i').on(tap_event_name, function(event) {
    $('.layer-3').addClass('envisible');
    $('.layer-4').find('.waring').addClass('hide');
    $('.layer-4').removeClass('envisible').addClass('bounceIn');
});

$('.layer-4').on(animateStartEvent, function(event) {
    can_back_layer3 = false;
});
$('.layer-4').on(animateEndEvent, function(event) {
    can_back_layer3 = true;
});
// back layer-3
$('.f-back').on(tap_event_name, function(event) {
    if(can_back_layer3){
        $('.layer-3').removeClass('envisible');
        // reset layer-4
        $('.s-loading').addClass('hide');
        $('.s-success').addClass('hide');
        $('.s-loading').text('正在上传哦，稍等片刻...');

        $('.layer-4').addClass('envisible').removeClass('bounceIn');
    }
});

// enable input get the focus.....
$('#name, #phone, #linkedin').on(tap_event_name, function(event) {
    $(this).focus();
});
$('#name, #phone').on('blur input', function(event) {
    var waring = $(this).next();

    $.trim($(this).val()) === '' ? waring.removeClass('hide') : waring.addClass('hide');
});
$('#phone').on('input', function(event) {
    var isNum = /^\d*$/;
    if(isNum.test(this.value)){
        this.value = this.value;
    }else{
        this.value = parseInt(this.value) || '';
    }
});

$('.f-submit').on(tap_event_name, function(event) {
    var name = $('#name').val(),
        pos_name = $('.form-box').attr('data-pos-name'),
        phone = $('#phone').val(),
        date = DATE,
        linkedin = $('#linkedin').val(),
        data,
        can_back_submit = false,
        is_blank = $.trim(name) === '' || $.trim(phone) === '';
    data = {
        name: name,
        position_name: pos_name,
        phone: phone,
        date: date,
        linkedinid: linkedin
    };

    !is_blank &&
    $('#name').next().hasClass('hide') &&
    $('#phone').next().hasClass('hide') &&
    $.ajax({
        type: 'post',
        url: 'http://54.223.171.90:80/register/registerdo.php',
        dataType: 'text',
        data: data,
        beforeSend: function(){
            console.log('beforeSend...');
            $('.submit-result').removeClass('envisible');
            $('.s-loading').removeClass('hide');
        },
        success: function(data, status, xhr){
            console.log('data:'+data);
            if(data === 'success'){
                $('.s-loading').addClass('hide');
                $('#jobseeker_num').text(COUNT);
                $('.s-success').removeClass('hide');
            }else{
                $('.s-loading').text('貌似出了点小错误，再试一次吧！');
            }
            can_back_submit = true;
        },
        error: function(xhr, status, msg){
            console.log('error');
        },
        complete: function(xhr, status){
            console.log('complete');
            $('.submit-result').on(tap_event_name, function(event) {
                if(can_back_submit){
                    $(this).addClass('envisible');
                    can_back_submit = false;
                }
            });
        }
    });
});


/***************    Tools     *****************/

function getImgUrl($ele){ // Get css image's url
    var bg = $ele.css('background-image');
    return bg.split('(')[1].split(')')[0];
}
function preIndicator(current, total){ // Image preload indicator
    var persent = Math.round((current / total) * 100);

    p_bar.css('width', persent + '%');
    p_txt.text(persent + '%');
}
function preImage(img_src_array, callback){ // Preload Imgs
    var i_num = img_src_array.length,
        i_array = new Array(img_src_array.length),
        loaded_num = 0;

    i_num !== 0 && (function(){
        for (var i = 0; i < i_array.length; i++) {
            i_array[i] = new Image();
            i_array[i].src = img_src_array[i];
            i_array[i].onload = function(){
                // Progress Indicator
                preIndicator(loaded_num + 1, i_num);

                ++loaded_num && loaded_num === i_num && (function(){
                    callback && callback();
                }());
            };
        };
    }());
}

// To be continue
