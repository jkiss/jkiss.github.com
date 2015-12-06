/*
*  Zepto.mTimer: Date & Time Selector
*  Dependent on "iScroll.js" & "tap event(zepto.js)" & zepto.js
*/

(function ($) {
    $.fn.mtimer = function(opts){
		var defaults = {
			dateStart : new Date(),
			dateNum : 10,
			timeStart : 9,
			timeNum : 12,
            triggerID: '',
			onOk : null,
			onCancel : null,
		};
		var option = $.extend(defaults, opts);

		var input = $(this),
            input_val = '',
			itemHeight = 48;
		var picker = {
			init : function(){
				var _this = this;

				_this.renderHTML();

				var container = $('#mtimer'),
					mpDate = $('.mt-date', container),
					mpTime = $('.mt-time', container);

                this.mpDate = mpDate;
                this.mpTime = mpTime;
				//初始化date
				var dateStr = '',
					dateStart = option.dateStart,
					sYear = dateStart.getFullYear(),
					sMonth = dateStart.getMonth(),
					sDate = dateStart.getDate();

                // init INPUT value
                input_val += sYear + '-' + (sMonth+1) + '-' + sDate + '  ' + option.timeStart + ':00';
                input.val(input_val);

				for(var i=0; i<option.dateNum; i++){
					var nextDate = new Date(sYear, sMonth, sDate+i),
                        y = nextDate.getFullYear(),
						m = nextDate.getMonth()+1,
						d = nextDate.getDate(),
						da = nextDate.getDay(),
						w = '日一二三四五六'.charAt(da),
						sel = i == 0 ? 'selected' : '';

					dateStr += '<li class="'+sel+'" data-date="'+y+'-'+m+'-'+d+'">'+m+'月'+d+'日&nbsp;星期'+w+'</li>';
				}
				dateStr += '<li></li><li></li>';
				mpDate.find('ul').append(dateStr);

				//初始化time
				var timeStr = '';
				for(var j=0; j<option.timeNum; j++){
					var t = option.timeStart + j,
						sel = j == 0 ? 'selected' : '';
					timeStr += '<li class="'+sel+'" data-time="'+t+':00">'+t+':00</li><li data-time="'+t+':30">'+t+':30</li>';
					if(j==option.timeNum - 1){
						timeStr += '<li data-time="'+(t+1)+':00">'+(t+1)+':00</li>';
					}
				}
				timeStr += '<li></li><li></li>';
				mpTime.find('ul').append(timeStr);

				// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
				//初始化scroll
				var elHeight = itemHeight;
				var dateScroll = new IScroll('.mt-date', {
					snap : 'li',
					probeType : 2,
					tap : true
				});
				dateScroll.on('scroll', function(){
					_this.updateSelected(mpDate, this);
				});
				dateScroll.on('scrollEnd', function(){
					_this.updateSelected(mpDate, this);
				});
				var timeScroll = new IScroll('.mt-time', {
					snap : 'li',
					probeType : 2,
					tap : true
				});
				timeScroll.on('scroll', function(){
					_this.updateSelected(mpTime, this);
				});
				timeScroll.on('scrollEnd', function(){
					_this.updateSelected(mpTime, this);
				});

				this.dateScroll = dateScroll;
				this.timeScroll = timeScroll;

				//初始化点击input事件
				$('#'+option.triggerID).on('tap', function(){
					if(container.hasClass('show')){
						_this.hidePanel();
					}
					else{
						_this.showPanel();
					}
				});

				//初始化点击li
				mpDate.find('li').on('tap', function(){
					_this.checkDate($(this));
				});
				mpTime.find('li').on('tap', function(){
					_this.checkTime($(this));
				});

				//初始化点击事件
				$('.mt_ok', container).on('tap', function(){
					var date = mpDate.find('.selected').data('date');
					var time = mpTime.find('.selected').data('time');

					input.val(date + ' ' + time);
					_this.hidePanel();
					option.onOk && typeof option.onOk=='function' && option.onOk(container);
				});
				$('.mt_cancel', container).on('tap', function(){
					_this.hidePanel();
					option.onCancel && typeof option.onCancel=='function' && option.onCancel(container);
				});
				$('#mt_mask').on('tap', function(){
					_this.hidePanel();
				});

				//初始化原有的数据
				// this.setValue();
			},
			renderHTML : function(){
				var stime = option.timeStart + ':00';
				var etime = option.timeStart + option.timeNum + ':00';
				var html = '<div id="mt_mask" class="mt-mask"></div>'+
                           '<div id="mtimer" class="mt_poppanel">'+
                                '<div class="mt_panel">'+
                                    '<h3 class="mt_title">请选择时间</h3>'+
                                    '<div class="mt-body">'+
                                        '<div class="mt-date">'+
                                            '<ul>'+
                                                '<li class="mt_note">上下滚动选取时间</li>'+
                                                '<li></li>'+
                                            '</ul>'+
                                        '</div>'+
                                        '<div class="mt-time">'+
                                            '<ul>'+
                                                '<li class="mt_note">可选时间：'+stime+'-'+etime+'</li>'+
                                                '<li></li>'+
                                            '</ul>'+
                                        '</div>'+
                                        '<div class="mt_indicate"></div>'+
                                    '</div>'+
                                    '<div class="mt_confirm">'+
                                        '<a href="javascript:void(0);" class="mt_ok">确定</a>'+
                                        '<a href="javascript:void(0);" class="mt_cancel">取消</a>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
				$(document.body).append(html);
			},
			updateSelected : function(container, iscroll){
				var index = (-iscroll.y) / itemHeight + 2;
				var current = container.find('li').eq(index);
				current.addClass('selected').siblings().removeClass('selected');
			},
			showPanel : function(container){
                $('#mt_mask').css('visibility', 'visible');
				$('#mtimer, #mt_mask').addClass('show');
			},
			hidePanel : function(){
				$('#mtimer, #mt_mask').removeClass('show');
                setTimeout(function(){
                    $('#mt_mask').css('visibility', 'hidden');
                }, 500);
			},
			setValue : function(){
				var value = input.val();
				var dateArr = value.split(' '),
					date = dateArr[0],
					time = dateArr[1],
					dateItem = $('.mt_date li[data-date="'+date+'"]'),
					timeItem = $('.mt_time li[data-time="'+time+'"]');
				this.checkDate(dateItem);
				this.checkTime(timeItem);

			},
			checkDate : function(el){
				var _me = this,
                    target = el.prev('li').prev('li');
				this.dateScroll.scrollToElement(target[0], 300);
                setTimeout(function(){
                    _me.updateSelected(_me.mpDate, _me.dateScroll);
                }, 350);
			},
			checkTime : function(el){
				var _me = this,
                    target = el.prev('li').prev('li');
				this.timeScroll.scrollToElement(target[0], 300);
                setTimeout(function(){
                    _me.updateSelected(_me.mpTime, _me.timeScroll);
                }, 350);
			}
		}
		picker.init();
		return picker;
	}

})(Zepto);

/*
*  Zepto.iSelect: Single Selector
*  Dependent on "iScroll.js" & "tap event(zepto.js)" & zepto.js
*/

(function($){
    $.fn.iSelect = function(opts){
        var defaults = {
            items: [''],
            id: '',
            triggerID: '',
            onOk: null,
            onCancel: null
        }

        var option = $.extend(defaults, opts);

        var input = $(this),
            input_val = '',
            itemHeight = 48;

        var picker = {
                init: function(){

                    var _me = this;

                    _me.renderHTML();

                    var container = $('#iselect_'+option.id),
                        mt_select = $('.mt-select', container);

                    this.selectEle = mt_select;

                    // initialize items
                    var itemStr = '<li></li><li></li>',
                        items = option.items;

                    for (var i = 0; i < items.length; i++) {
                        var sel = i == 0 ? 'selected' : '';
                        itemStr += '<li class="'+ sel +'" data-item="'+ items[i] +'">'+ items[i] +'</li>';
                    }
                    itemStr += '<li></li><li></li>';
                    mt_select.find('ul').append(itemStr);

                    // initialize INPUT value
                    input_val = option.items[0];
                    input.val(input_val);

                    // document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

                    // initialize IScroll
                    var elHeight = itemHeight;
    				var itemScroll = new IScroll('#iselect_scroll_'+option.id, {
    					snap : 'li',
    					probeType : 2,
    					tap : true
    				});
    				itemScroll.on('scroll', function(){
    					_me.updateSelected(mt_select, this);
    				});
    				itemScroll.on('scrollEnd', function(){
    					_me.updateSelected(mt_select, this);
    				});
                    this.itemScroll = itemScroll;

                    // initialize INPUT event
                    $('#'+option.triggerID).on('tap', function(){
    					if(container.hasClass('show')){
    						_me.hidePanel();
    					}
    					else{
    						_me.showPanel();
    					}
    				});

                    // initialize Li "tap" event
                    mt_select.find('li').on('tap', function(event) {
                        _me.checkItem($(this));
                    });

                    // initialize 'OK' & 'Cancle' event
    				$('.mt_ok', container).on('tap', function(){
    					var item = mt_select.find('.selected').data('item');
    					input.val(item);
    					_me.hidePanel();
    					option.onOk && typeof option.onOk=='function' && option.onOk(container);
    				});
    				$('.mt_cancel', container).on('tap', function(){
    					_me.hidePanel();
    					option.onCancel && typeof option.onCancel=='function' && option.onCancel(container);
    				});
    				$('#iselect_mask_'+option.id).on('tap', function(){
    					_me.hidePanel();
    				});

                },
                renderHTML: function(){
                    var html = '<div id="iselect_mask_'+option.id+'" class="mt-mask"></div>'+
                               '<div id="iselect_'+option.id+'" class="mt_poppanel">'+
                                    '<div class="mt_panel">'+
                                        '<div class="mt-body">'+
                                            '<div class="mt-select" id="iselect_scroll_'+option.id+'">'+
                                                '<ul></ul>'+
                                            '</div>'+
                                            '<div class="mt_indicate"></div>'+
                                        '</div>'+
                                        '<div class="mt_confirm">'+
                                            '<a href="javascript:void(0);" class="mt_ok">确 定</a>'+
                                            '<a href="javascript:void(0);" class="mt_cancel">取 消</a>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>';
    				$(document.body).append(html);
                },
                updateSelected: function(container, iscroll){
                    var index = (-iscroll.y)/itemHeight + 2;
                    var current = container.find('li').eq(index);
                    current.addClass('selected').siblings().removeClass('selected');
                },
                hidePanel: function(){
                    $('#iselect_'+option.id+', #iselect_mask_'+option.id).removeClass('show');
                    setTimeout(function(){
                        $('#iselect_mask_'+option.id).css('visibility', 'hidden');
                    }, 500);
                },
                showPanel: function(){
                    $('#iselect_mask_'+option.id).css('visibility', 'visible');
                    $('#iselect_'+option.id+', #iselect_mask_'+option.id).addClass('show');
                },
                checkItem: function(el){
                    var _me = this,
                        target = el.prev('li').prev('li');
                    this.itemScroll.scrollToElement(target[0], 300);
                    setTimeout(function(){
                        _me.updateSelected(_me.selectEle, _me.itemScroll);
                    }, 350);
                }
        };

        picker.init();
		return picker;
    }
})(Zepto);

/***  END Plugins  ***/

function centerImage(){
	$(".center-image").each(function(i){
        var container = $(this),
            img = $("img", this),
    	    containerRatio = container.width() / container.height(),
		    imgRatio = img.width() / img.height();

		if (imgRatio >= containerRatio){
			img.css({"width":"auto","height":"105%"});
		} else {
			img.css({"width":"105%","height":"auto"});
		}

		img.css({
			"position":"absolute",
			"top":"50%",
			"left":"50%",
			"margin-top": -1 * img.height() * 0.5 +"px",
			"margin-left": -1 * img.width() * 0.5 +"px"
		});

	});
}
