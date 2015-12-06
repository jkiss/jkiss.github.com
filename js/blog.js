$(function($){
    /***  Remove all <br> tags created by Markdown  ***/
    $('br').remove();

    /***  Remove all empty <p> tags created by Markdown  ***/
    $('p').each(function(index, el) {
        el.innerHTML === '' && el.parentNode.removeChild(el);
    });

    /*******   Lazyload img with optimize　size   *******/
    var imgs = $('img'),
        window_w = $(window).width();

    imgs.each(function(index, el) {
        var _me = $(this),
            url = _me.attr('data-url'),
            url_640 = _me.attr('data-url-640'),
            url_320 = _me.attr('data-url-320');

        if(window_w <= 320){
            _me.attr('src', url_320);
        }else if(window_w > 320 && window_w <=640){
            _me.attr('src', url_640);
        }else{
            _me.attr('src', url);
        }
    });

    /*******    A Slider plugin's object    ********/
    function Slider(opt){
        this.time = opt.time;
        this.autoplay = opt.autoplay;
        this.panel = opt.panel;
        this.wrapper = opt.wrapper;
        this.one_w = opt.one_w;
        this.num = opt.num;
        this.h_div_w = opt.h_div_w;
        this.first_pos = '-'+ opt.one_w*2 +'px';
        this.last_pos = '-'+ opt.one_w*(opt.num+1) +'px';
        this.left_btn = opt.left_btn;
        this.right_btn = opt.right_btn;
        this.ing = false;
        this.timer;
    };
    Slider.prototype.toLeft = function(){
        var _me = this;

        _me.wrapper.animate({
            'left': '-='+_me.one_w+'px'
        },
            _me.time, function() {
            if(_me.isAfterLast()){        // move to the first img in the moment
                _me.wrapper.css('left', _me.first_pos);
            }
        });
    };
    Slider.prototype.toRight = function(){
        var _me = this;

        _me.wrapper.animate({
            'left': '+='+_me.one_w+'px'
        },
            _me.time, function() {
            if(_me.isBeforeFirst()){        // move to the first img in the moment
                _me.wrapper.css('left', _me.last_pos);
            }
        });
    };
    Slider.prototype.isAfterLast = function(){
        return parseInt(this.wrapper.css('left')) < parseInt(this.last_pos);
    };
    Slider.prototype.isBeforeFirst = function(){
        return parseInt(this.wrapper.css('left')) > parseInt(this.first_pos);
    };
    Slider.prototype.start = function(){
        var _me = this;
        // init first position
        _me.wrapper.css('left', _me.first_pos);
        // Bind ctrl btn
        _me.left_btn.on('click', function(event) {
            _me.toRight();
        });
        _me.right_btn.on('click', function(event) {
            _me.toLeft();
        });
        _me.panel.on('mouseenter mouseleave', function(event) {
            if(event.type === 'mouseenter'){
                clearTimeout(_me.timer);
            }else if(event.type === 'mouseleave'){
                _me.timer = setInterval(function(){
                    _me.toLeft();
                }, 4000);
            }
        });

        if(_me.autoplay){
            _me.timer = setInterval(function(){
                _me.toLeft();
            }, 4000);
        }
    };
    Slider.prototype.adapt = function(){
        var _me = this,
            slide_panel = $('#cb_index').find('.slide-panel'),
            panel_w = slide_panel.width(),
            panel_h = 0,
            ones = $('#cb_index').find('.one');

        if(panel_w < 800){
            _me.one_w = panel_w;
            _me.first_pos = '-'+ panel_w*2 +'px';
            _me.last_pos = '-'+ panel_w*(_me.num+1) +'px';
            panel_h = panel_w * _me.h_div_w;
            slide_panel.css('height', panel_h+'px');
            ones.css({
                'height': panel_h+'px',
                'width': panel_w+'px',
                'padding': 0
            });
            // init first position
            _me.wrapper.css('left', _me.first_pos);
        }else{
            _me.one_w = panel_w;
            _me.first_pos = '-'+ panel_w*2 +'px';
            _me.last_pos = '-'+ panel_w*(_me.num+1) +'px';
            panel_h = panel_w * _me.h_div_w;
            slide_panel.css('height', panel_h+'px');
            ones.css({
                'height': panel_h+'px',
                'width': panel_w+'px',
                'padding': '0 10px'
            });
            // init first position
            _me.wrapper.css('left', _me.first_pos);
        }

        return this;
    }

    /******    A Wheel Object without scroll bar     ******/
    function Wheel(opt){
        this.has_w_h = 0;
        this.ing = false;
        this.w_dis = opt.w_dis;
        this.w_panel = opt.w_panel;
        this.able_w_h = opt.able_w_h;
        this.time = opt.time;
        this.origin_top = opt.origin_top;
    };
    Wheel.prototype.wheelDown = function(){
        var _me = this;

        if(_me.has_w_h < _me.able_w_h && !_me.ing){
            _me.ing = true;
            var diff = _me.able_w_h - _me.has_w_h;
            if(diff < _me.w_dis){
                _me.has_w_h += diff;
            }else{
                _me.has_w_h += _me.w_dis;
            }
            _me.w_panel.animate({
                'top': -_me.has_w_h + _me.origin_top + 'px'
                },
                _me.time, 'linear', function() {
                _me.ing = false;
            });
        }
    };
    Wheel.prototype.wheelUp = function(){
        var _me = this;

        if(_me.has_w_h > 0 && !_me.ing){
            _me.ing = true;
            if(_me.has_w_h < _me.w_dis){
                _me.has_w_h -= _me.has_w_h;
            }else{
                _me.has_w_h -= _me.w_dis;
            }
            _me.w_panel.animate({
                'top': -_me.has_w_h + _me.origin_top + 'px'
                },
                _me.time, 'linear', function() {
                _me.ing = false;
            });
        }
    };
    Wheel.prototype.wheelBottom = function(){
        var _me = this;

        if(_me.able_w_h > 0){   // 自动滚动
            var auto_dis = _me.able_w_h - _me.has_w_h;
            if(auto_dis > 0 && !_me.ing){
                _me.has_w_h += auto_dis;
                _me.ing = true;
                _me.w_panel.animate({
                    'top': -_me.has_w_h + _me.origin_top + 'px'
                },
                    _me.time, function() {
                    _me.ing = false;
                });
            }
        }
    };
    Wheel.prototype.wheelTop = function(){
        var _me = this;

        if(!_me.ing){
            _me.ing = ture;
            _me.has_w_h = 0;
            _me.w_panel.animate({
                'top': 0 + _me.origin_top + 'px'
            },
                _me.time, function() {
                _me.ing = false;
            });
        }
    };

    /******     addWheelEvent      *****/
    $.fn.addWheelEvent = function(user_opts){
        var opts = $.extend({}, $.fn.addWheelEvent.default_opts, user_opts);
        
        return this.each(function(index, el) {
            var down = true,
                isFirefox = /firefox/.test(navigator.userAgent.toLowerCase()),
                wheelFn = function(event){
                    var ev = event || window.event;
                    down = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
                    opts.handler && opts.handler(down, ev);

                    if(opts.preventDefault){
                        ev.returnValue = false;
                        ev.preventDefault && ev.preventDefault();
                    }
                    if(opts.stopPropagation){
                        ev.cancelBubble = true;
                        ev.stopPropagation && ev.stopPropagation();
                    }
                    return false;
                };
            if(isFirefox){
                this.addEventListener('DOMMouseScroll', wheelFn, false);
            }else{
                // addEvent(ele, 'mousewheel', wheelFn);
                this.onmousewheel = wheelFn;
            }
        });
    };
    $.fn.addWheelEvent.default_opts = {     
        handler: null,
        preventDefault: true,
        stopPropagation: true
    };

    /*************      Fly Image Object     **************/
    function FlyImg(opt){
        this.airplane = $('<div id="airplane"></div>').appendTo('body');
        this.target_rect = opt.target.getBoundingClientRect();
        this.ing = false;
    }
    FlyImg.prototype.fly = function(callback){
        if(!this.ing){
            this.ing = true;
            var _me = this;
            _me.airplane.animate({
                    'left': _me.target_rect.left + 'px',
                    'top': _me.target_rect.top + 'px',
                    'width': '30px',
                    'height': '20px',
                    'opacity': 0
                },
                500, function() {
                    _me.airplane.css({
                        'display': 'none',
                        'opacity': 1
                    });
                    if(callback){
                        callback();
                    }
                    _me.ing = false;
                }
            );
        }
    };
    FlyImg.prototype.boarding = function(passenger){
        if(!this.ing){
            var p_rect = passenger.getBoundingClientRect();

            this.airplane.css({
                'left': p_rect.left + 'px',
                'top': p_rect.top + 'px',
                'width': passenger.width + 'px',
                'height': passenger.height + 'px',
                'background-image': 'url(' + passenger.src + ')',
                'display': 'block'
            });
        }

        return this;
    }

    /***********      Pagination Ajax Object     ***********/
    function Pagination(opt){
        this.url = opt.url;                                          // 分页请求接口
        this.max_page = opt.max_page;                                // 总页数
        this.paged = 1;                                              // 当前页码
        this.range = opt.range;                                      // 超出显示的最大范围
        this.updateContent = opt.updateContent;
        this.beforeSend = opt.beforeSend;
        this.sendComplete = opt.sendComplete;
        this.wrap = opt.wrap;

        // 上一页的 HTML
        this.prevHTML = {
            'able': '<span class="prev"><i class="icon-dir-left"></i>上一页</span>',
            'disable': '<span class="prev disable"><i class="icon-dir-left"></i>上一页</span>'
        };

        // 下一页的 HTML
        this.nextHTML = {
            'able': '<span class="next">下一页<i class="icon-dir-right"></i></span>',
            'disable': '<span class="next disable">下一页<i class="icon-dir-right"></i></span>'
        };

        // 页码的 HTML
        this.numHTML = '<li data-page="{{num}}">{{num}}</li>';
        // 省略号的 HTML
        this.dotHTML = '<i class="dots">&hellip;</i>';
    };
    Pagination.prototype.xhrPage = function(num, page_panel, extra_data){
        /*** 请求第 num 页的内容 ***/
        this.beforeSend();
        // 进行 Ajax 请求
        var data = {
                page: num
            },
            _me = this;
        data = $.extend({}, data, extra_data);
        $.ajax({
            url: _me.url,
            type: 'GET',
            dataType: 'json',
            data: data,
            async: true,
            success: function(data, status, xhr){
                // console.log(data.data);
                _me.updateContent(data, page_panel);
                // change total_page
                _me.max_page = data.total_page;
                $('.page-num').attr('data-total-page', data.total_page);
            },
            error: function(xhr, status, errorMsg){
                // 请求出错后的提示信息
                console.log(errorMsg);
            },
            complete: function(xhr, status){
                _me.updateNum(num, _me.wrap);
                _me.sendComplete();
            }
        });
    };
    Pagination.prototype.updateNum = function(paged){     // 更新页码显示
        this.paged = paged;
        var updateHTML = '',
            start = 0,           // 页码起始数
            _me = this;
        if(this.max_page <= this.range){
            start = 1;
            for (var i = start; i <= this.max_page; i++) {
                // updateHTML += '<li class="p-num" data-page="' + i +'">' + i + '</li>';
                // 用模板代替 HTML 字符串
                updateHTML += _me.numHTML.replace(/{{num}}/g, i);
            };
        }else{
            // 前一页按钮
            this.paged <= 1
                ? updateHTML += _me.prevHTML.disable
                : updateHTML += _me.prevHTML.able;

            if(this.paged <= Math.ceil(this.range / 2)){
                start = 1;
                // 中间 Range 的页码
                for (var i = start; i <= this.range; i++) {
                    updateHTML += _me.numHTML.replace(/{{num}}/g, i);
                };
                // 后省略号
                updateHTML += _me.dotHTML;
                // The last page num
                updateHTML += _me.numHTML.replace(/{{num}}/g, this.max_page);
            }else if(this.paged >= (this.max_page - Math.floor(this.range / 2))){
                start = this.max_page - this.range + 1;
                // The first page num
                updateHTML += _me.numHTML.replace(/{{num}}/g, 1);
                // 前省略号
                updateHTML += _me.dotHTML;
                // 中间 Range 的页码
                for (var i = start; i <= this.max_page; i++) {
                    updateHTML += _me.numHTML.replace(/{{num}}/g, i);
                };
            }else{
                start = this.paged - Math.floor(this.range / 2);
                // The first page num
                updateHTML += _me.numHTML.replace(/{{num}}/g, 1);
                // 前省略号
                updateHTML += _me.dotHTML;
                // 中间 Range 的页码
                for (var i = start; i < (this.range + start); i++) {
                    updateHTML += _me.numHTML.replace(/{{num}}/g, i);
                };
                // 后省略号
                updateHTML += _me.dotHTML;
                // The last page num
                updateHTML += _me.numHTML.replace(/{{num}}/g, this.max_page);
            }

            // 后一页按钮
            this.paged >= this.max_page
                ? updateHTML += _me.nextHTML.disable
                : updateHTML += _me.nextHTML.able;
        }
        _me.wrap === '' ? void(0) : function(){
            _me.wrap.html(updateHTML).find('li').each(function(index, el) {
                if(parseInt(this.getAttribute('data-page')) === _me.paged){
                    $(this).addClass('current');
                }
            });
        }();
    };
    Pagination.prototype.init = function(callback){    // first page init
        callback();
    };

    /********     Nokey's console autograph     *********/
    $.log = function(msg){
        console.log('%c' + msg, 'font-family: "courier new"; color:#000; font-size:30px; font-weight:bold; text-shadow:0 0 6px #22ff22;');
    };
    $.log('Nokey');

    // (function(){
    //     // console.log(arguments.callee);
    //     $.get('http://www.w3ctech.com/topic/631', function(data) {
    //         console.log('OK');
    //     });
    //     setTimeout(arguments.callee, 100);
    // }());

    /*******    Must keep the follow code at the end     *******/
    var iH_opts = {
            'win_w': window_w,
            'Slider': Slider,
            'Wheel': Wheel,
            'FlyImg': FlyImg,
            'Pagination': Pagination
        };
    typeof invokeHere === 'function' ? invokeHere(iH_opts) : void(0);

    console.log('END');
}(jQuery));