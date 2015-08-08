/* DELL严正申明：通过篡改本活动源代码获取的成绩一律作无效处理，并保留法律追究的权利。 */
var WEB_URL = 'http://wx.dell-brand.com/game/running/index.html';
$(document).ready(function(){
	(function loaded(){
        // Nokey－阻止页面滚动，保持游戏画面的稳定
        var pages = ["page_1","page_2","page_3","page_4"];
        for(var i = 0, len = pages.length; i < len; i++) {
            var ele = document.getElementById(pages[i]);
            ele.addEventListener("touchstart",function(e){},false);
            ele.addEventListener("touchmove",function(e){
                e.preventDefault(); //阻止滑动事件
            },false);
            ele.addEventListener("touchend",function(e){
                e = e || window.event;
                if(e.target.getAttribute("id")!=="msg"){
                    //判断时候是否为点击元素
                    e.preventDefault();
                }else{
                    //log("end false");
                }
            },false);
        }
    })();
    // Nokey－获取基本的元素到变量
    var address=window.location.href;
    var height=$(window).height(),
        body=$('body'),
        page_one=$('.page-one'),
        page_two=$('.page-two'),
        page_three=$('.page-three'),
        page_four=$('.page-four'),
        page_five=$('.page-five'),
        page_six=$('.page-six'),
        page_seven=$('.page-seven'),
        ua=navigator.userAgent;
    // Nokey－???
    var data=[
        {"ls":"25%","le":"50%","money":"50.png","num":50},
            {"ls":"90%","le":"60%","money":"50.png","num":50},
            {"ls":"90%","le":"60%","money":"50.png","num":50},
            {"ls":"90%","le":"60%","money":"50.png","num":50},
            {"ls":"25%","le":"50%","money":"50.png","num":50},
            {"ls":"90%","le":"60%","money":"50.png","num":50},
            {"ls":"90%","le":"60%","money":"50.png","num":50},
            {"ls":"90%","le":"60%","money":"50.png","num":50},
            {"ls":"-45%","le":"40%","money":"20.png","num":20},
            {"ls":"25%","le":"50%","money":"20.png","num":20},
            {"ls":"90%","le":"60%","money":"20.png","num":20},
            {"ls":"-45%","le":"40%","money":"20.png","num":20},
            {"ls":"25%","le":"50%","money":"20.png","num":20},
            {"ls":"90%","le":"60%","money":"20.png","num":20},
            {"ls":"-45%","le":"40%","money":"20.png","num":20},
            {"ls":"25%","le":"50%","money":"20.png","num":20},
            {"ls":"90%","le":"60%","money":"20.png","num":20},
            {"ls":"25%","le":"50%","money":"20.png","num":20},
            {"ls":"25%","le":"50%","money":"10.png","num":10},
            {"ls":"-45%","le":"40%","money":"10.png","num":10},
            {"ls":"90%","le":"60%","money":"10.png","num":10},
            {"ls":"25%","le":"50%","money":"10.png","num":10},
            {"ls":"-45%","le":"40%","money":"10.png","num":10},
            {"ls":"90%","le":"60%","money":"10.png","num":10},
            {"ls":"25%","le":"50%","money":"10.png","num":10},
            {"ls":"-45%","le":"40%","money":"10.png","num":10},
            {"ls":"90%","le":"60%","money":"10.png","num":10},
            {"ls":"90%","le":"60%","money":"5.png","num":5},
            {"ls":"-45%","le":"40%","money":"5.png","num":5}
        ];
    var max_money=0,max_time=0;
    var path='http://wx.dell-brand.com/game/running/index.php?r=',
        path2='http://wx.dell-brand.com/game/running/images/';
    var user;
	body.height(height);
    // Nokey－载入声音文件
    $('<audio id="music1"><source src="music/money.ogg" type="audio/ogg"><source src="music/money.mp3" type="audio/mpeg"><source src="music/money.wav" type="audio/wav"></audio><audio id="music2"><source src="music/money.ogg" type="audio/ogg"><source src="music/money.mp3" type="audio/mpeg"><source src="music/money.wav" type="audio/wav"></audio><audio id="music3"><source src="music/notify.ogg" type="audio/ogg"><source src="music/notify.mp3" type="audio/mpeg"><source src="music/notify.wav" type="audio/wav"></audio><audio id="music4"><source src="music/notify.ogg" type="audio/ogg"><source src="music/notify.mp3" type="audio/mpeg"><source src="music/notify.wav" type="audio/wav"></audio><audio id="music5"><source src="music/notify.ogg" type="audio/ogg"><source src="music/notify.mp3" type="audio/mpeg"><source src="music/notify.wav" type="audio/wav"></audio>').appendTo('body');
    function mess(arr){
        var _floor = Math.floor, _random = Math.random,
            len = arr.length, i, j, arri,
            n = _floor(len/2)+1;
        while( n-- ){
            i = _floor(_random()*len);
            j = _floor(_random()*len);
            if( i!==j ){
                arri = arr[i];
                arr[i] = arr[j];
                arr[j] = arri;
            }
        }
        return arr;
    }
    /*page-one loading...*/
    var loading=$('.page-one .loading').find('span'),
        t=0,
        timer1=null;
    timer1=setInterval(function(){
        var text=loading.text();
        text=text+'.';
        loading.text(text);
        t=t+30;
        if(t==120){
            loading.text('loading');
            t=0;
        }
    },500);
	setTimeout(function(){
		Move();
	},1000);
    /*入场动画*/
    function Move(){
        page_two.show().siblings().hide();
        var one=$('.page-two .one');
        var one_img=one.find('div');
        var two=$('.page-two .two');
        var i=0;
        one.animate({"top":"0"},400,function(){
            two.animate({"bottom":"25px"},300,function(){
                setTimeout(function(){
                    one_img.show();
                    one_img.animate({"width":"150%","left":"-20%"},200).animate({"width":"100%","left":"0"},200,function(){
                        setTimeout(function(){
                            one.animate({"top":"-300%"},400,function(){
                                two.animate({"bottom":"-300%"},300,function(){
                                    page_three.show().animate({"opacity":"1"},400).siblings().hide();
                                    $('.page-three .man .nani').animate({"height":"55%"},100).animate({"height":"25%"},100,function(){
                                         $('.page-three .start-rob').show().animate({"background-size":"100%","bottom":"15%"},200,function(){
                                            $('.page-three .notic').show().animate({"background-size":"100%","bottom":"7%"},200,function(){
                                                $('.page-three .charts').show().animate({"background-size":"100%","bottom":"7%"},200);
                                            });
                                         });
                                    });
                                });
                            });
                        },1500);
                    });
                },400); 
            });
        });
    }

    /*限制td中的字数*/
    var td=$('.page-five table td');
    td.each(function(){
        var text=$(this).text();
        if(text.length>=5){
            text=text.slice(0,5);
            $(this).text(text+'...');
        }
    });
	
    
    /*
     *  前4页 阻止页面滑动
     *  
     */
    var stopmove=false;
    document.getElementById("page_1").addEventListener('touchmove', function (e) { 
        stopmove=true;
    },false);
    document.getElementById("page_2").addEventListener('touchmove', function (e) { 
        stopmove=true;
    },false);
    document.getElementById("page_3").addEventListener('touchmove', function (e) { 
        stopmove=true;
    },false);
    document.getElementById("page_4").addEventListener('touchmove', function (e) { 
        stopmove=true;
    },false);
    document.getElementById("flow").addEventListener('touchmove', function (e) { 
        stopmove=true;
    },false);
    document.addEventListener('touchmove', function (e) { 
        if(stopmove){
            e.preventDefault(); 
            stopmove=false;
        }
    },false);
    
    /*左右移动*/
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(ua);
    var btn_left=$('.page-four a.left'),
        btn_right=$('.page-four a.right'),
        person=$('.page-four .person'),
        l=32;
	var rob=$('.page-three .start-rob');
    function moveToLeft(){
        btn_right.removeAttr("disabled");
        l=l-32;
        if(l<=0){
            $(this).attr("disabled","disabled");
            l=0;
        }
        person.stop(true,false).animate({"left":l+'%'},0);
    }
    function moveToRight(){
        btn_left.removeAttr("disabled");
        l=l+32;
        if(l>=64){
            $(this).attr("disabled","disabled");
            l=64;
        }
        person.stop(true,false).animate({"left":l+"%"},0);
    }
    if(isMobile){
		/*活动规则*/
		$('.page-three .notic').on('touchend',function(){
			$('.back').attr("data-back","page-three");
			page_seven.show().siblings().hide();
		});
		$('.page-six .notic').on('touchend',function(){
			$('.back').attr("data-back","page-six");
			page_seven.show().siblings().hide();
		});
		/*我要兑换*/
		$('.page-three .charts').on('touchend',function(){
			$('.back').attr("data-back","page-three");
			$('.page-five').show().siblings().hide();
		});
		$('.page-six .charts').on('touchend',function(){
			$('.back').attr("data-back","page-six");
			$('.page-five').show().siblings().hide();
		});
		/*再来一次*/
		$('.page-six .again').on('touchend',function(){
			Init();
			countDown();
		});

		/*回家*/
		$('.home').on('touchend',function(){
			page_three.show().siblings().hide();
			Init();
		});
		/*返回*/
		$('.back').on('touchend',function(){
			var parent=$(this).attr("data-back");
			switch(parent){
				case 'page-three':{
					page_three.show().siblings().hide();
					break;
				}
				case 'page-six':{
					page_six.show().siblings().hide();
					break;
				}
			}
		});
		/*开抢*/
		rob.on('touchend',function(){
			countDown();
		});
    }else{
		/*活动规则*/
		$('.page-three .notic').click(function(){
			$('.back').attr("data-back","page-three");
			page_seven.show().siblings().hide();
		});
		$('.page-six .notic').click(function(){
			$('.back').attr("data-back","page-six");
			page_seven.show().siblings().hide();
		});
		/*我要兑换*/
		$('.page-three .charts').click(function(){
			$('.back').attr("data-back","page-three");
			$('.page-five').show().siblings().hide();
		});
		$('.page-six .charts').click(function(){
			$('.back').attr("data-back","page-six");
			$('.page-five').show().siblings().hide();
		});
		/*再来一次*/
		$('.page-six .again').click(function(){
			Init();
			countDown();
		});

		/*回家*/
		$('.home').click(function(){
			page_three.show().siblings().hide();
			Init();
		});
		/*返回*/
		$('.back').click(function(){
			var parent=$(this).attr("data-back");
			switch(parent){
				case 'page-three':{
					page_three.show().siblings().hide();
					break;
				}
				case 'page-six':{
					page_six.show().siblings().hide();
					break;
				}
			}
		});
		/*开抢*/
		rob.click(function(){
			countDown();
		});
    }
	$('.flow').css({"left":"50%","margin-left":-($('.flow').width()/2)+'px'});
    // Nokey- 倒计时计数，游戏准备开始
    function countDown(){
        page_four.show().siblings().hide();
        $('.shadow').show();
        /*倒计时*/
        var bg=$('.page-four .time'),
            src=['num_2.png','num_1.png','go.png'],
            i=0;
        var timer2=null;
        shake(bg);
        timer2=setInterval(function(){
            if(i==2){
                bg.css({'background':'url(images/'+src[i]+') no-repeat center center','background-size':'70% auto'});
                shake(bg);
            }else if(i==3){
                bg.hide();
                person.show().animate({"top":"23%"},200,function(){
					clearInterval(timer2);
					startMove(); 
				});
            }else{
                bg.css({'background':'url(images/'+src[i]+') no-repeat 65% center','background-size':'80% auto'});
                shake(bg);
            }
            i++;
        },1000);
    }
    function startMove(){
        var timer3=null,
            timer4=null,
            timer5=null,
            timer7=null,
            check1=null,
            check2=null,
            check3=null,
            check4=null,
            check5=null,
            money1=null,
            money2=null,
            spider=$('.page-four .spider'),
            snick=$('.page-four .snick');
        $('body').bind('touchmove', function (event) {
            event.preventDefault();
        });
		if(isMobile){
			btn_left.on('touchstart',moveToLeft);
			btn_right.on('touchstart',moveToRight);
		}else{
			btn_left.on('click',moveToLeft);
			btn_right.on('click',moveToRight);
		}
		var mess_arr = mess(data),
        mess1 = mess_arr.slice(0,14),
        mess2 = mess_arr.slice(14);
        /*小虫子出现*/
        var map=[{'ls':'-10%','le':'35%'},
                 {'ls':'50%','le':'50%'}];
        spider.animate({"top":"-10%","left":"35%","width":"5%"},2000);
        snick.animate({"top":"-10%","right":"35%","height":"5%"},1000);
        // Nokey-蜘蛛出现
        timer3=setInterval(function(){
            var random=getRandom(0,1);
            spider.stop(true,false).css({"width":"20%","top":"100%","left":map[random].ls}).animate({"top":"-10%","left":map[random].le,"width":"5%"},2000,function(){
                clearInterval(check3);
            });
            // Nokey-每隔30毫秒检测碰撞。。。（这样真的好吗？）
            check3=setInterval(function(){
                var flag=checkBom(spider);
                if(flag){
                    clearInterval(check3);
                    var num=-5;
                    // Nokey-播放碰撞时的音乐
                    $('#music3')[0].play();
                    show(spider,num);
                }
            },30);
        },6000);
        timer4=setInterval(function(){
            snick.stop(true,false).css({"height":"10%","top":"100%","right":"-10%"}).animate({"top":"-10%","right":"35%","height":"5%"},2000,function(){
                clearInterval(check4);
            });
            check4=setInterval(function(){
                var flag=checkBom(snick);
                if(flag){
                    clearInterval(check4);
                    var num=-5;
                    $('#music4')[0].play();
                    show(snick,num);
                }
            },30);
        },10000);
        /*地面*/
        $('.shadow').animate({"top":"-9000%"},30000);
        /*钱~~~*/
        money1=setInterval(function(){
            clearInterval(check1);
            var item = mess1.pop(),
                money=$('.page-four .money1');
            if(item != undefined){         
                money.stop(true,false).css({"display":"block","top":"110%","left":item.ls,"height":"30%","width":"60%","background":"url(images/"+item.money+") no-repeat center center","background-size":"auto 100%"}).animate({"top":"-10%","left":item.le,"height":"0","width":"0"},2000);
                check1=setInterval(function(){
                    var flag=checkBom(money);
                    if(flag){
                        var num=item.num;
                        $('#music1')[0].play();
                        show(money,num);
                    }
                },20);
            }
        },2000);
        setTimeout(function(){
            money2=setInterval(function(){
                clearInterval(check2);
                var item = mess2.pop(),
                    money=$('.page-four .money2');
                if(item != undefined){
                    money.stop(true,false).css({"display":"block","top":"110%","left":item.ls,"height":"30%","width":"60%","background":"url(images/"+item.money+") no-repeat center center","background-size":"auto 100%"}).animate({"top":"-10%","left":item.le,"height":"0","width":"0"},2000);
                    check2=setInterval(function(){
                        var flag=checkBom(money);
                        if(flag){
                            var num=item.num;
                            $('#music2')[0].play();
                            show(money,num);
                        }
                    },20);
                }
            },2000);
        },500); 
        /*计时*/
        var time=30,
            last_time=$('.page-four .title h5 .num2');
        timer7=setInterval(function(){
            if(time<=1){
                clearInterval(check1);
                clearInterval(check2);
                clearInterval(check3);
                clearInterval(check4);
                clearInterval(timer3);
                clearInterval(timer4);
                clearInterval(money1);
                clearInterval(money2);
                clearInterval(timer7);
                endMove(); 
            }
            time--;
            last_time.text(time)
        },1000);
    }
    function endMove(){
        $('*').stop(true,false);
        body.css({"overflow":"auto"});
        $('body').unbind('touchmove');
        btn_left.hide().unbind('touchstart').unbind('click');
        btn_right.hide().unbind('touchstart').unbind('click');
        $('.page-four .end').css({"z-index":"100000"}).animate({"opacity":"1","height":"50%"},100,function(){
            person.css({"background":"url('images/end_person.png') no-repeat center center","background-size":"100% auto"});
            $('.page-four .end .bai').animate({"opacity":"1","height":"50%"},100,function(){
                $('.page-four .end .egg').animate({"opacity":"1","height":"60%"},100,function(){
                    var score=parseInt($('.page-four .title h5 .num1').text());
                        score=score>=700 ? 700 : score;
                    setTimeout(function(){
                        var replace=$('.page-six .replace'),
							beplaced=$('.page-six .beplaced');
							code=randomString(4);
                        $('.page-six .board .num').text(score);
						$('title').text('我抢到了'+score+'元的购机优惠券，你要吗？');
                        $('.page-six h4 span').text(Math.floor(score*100/700)+'%');
                        $('.page-six em').text(score);
						$('.page-six .mess-bg').text('￥'+score+'+神秘红包');
                        beplaced.find('.code').text('BK1'+code);
                        page_six.show().siblings().hide();
                        /*分享*/
                        $('.call2').click(function(){
                            var _link = WEB_URL,
                                title = '戴尔优惠券我来抢',
                                img=path2+'icon-300x300.png',
                                content = '戴尔在新年准备了大量红包任你抢，抢到多少就折多少，就看你的速度啦！';
                            if(ua.indexOf("MicroMessenger")>=0){
                                $('.share').show().click(function(){
                                    $(this).hide();
                                });
                            }else{
                                window.open('http://v.t.sina.com.cn/share/share.php?appkey=&url='+encodeURIComponent(_link)+'&pic='+encodeURIComponent(img)+'&title='+encodeURIComponent(content)+'','_blank','scrollbars=no,width=600,height=450,left=75,top=20,status=no,resizable=yes');
                            }
                        });
                    },2000); 
                });
            });
        });
    }
    /*获取随机数*/
    function getRandom(min, max){
        var r = Math.random() * (max - min);
        var re = Math.round(r + min);
        re = Math.max(Math.min(re, max), min)
        return re;
    }
    /*检测碰撞*/
    function checkBom(ele){
        if(ele){
            man_left=person.offset().left,
            man_top=person.offset().top,
            ele_left=ele.offset().left,
            ele_top=ele.offset().top;
            return ele_left>=man_left &&
                   ele_left+ele.width()<man_left+person.width() &&
                   ele_top>=man_top &&
                   ele_top<man_top+person.height();
        }
    }
    /*加钱*/
    function show(ele,num){
        var l=person.offset().left+20;
        var num_n=num;
        if(num>0){
            ele.hide();
            num_n='+'+num;
            $('.page-four .show').css({"color":"red"});
        }else{
            $('.page-four .show').css({"color":"green"});
        }
        $('.page-four .show').text(num_n).css({"display":"block","opacity":"1","left":l,"top":"20%"}).stop(true,false).animate({"top":"0%","opacity":"0.5"},700,function(){
            $('.page-four .show').hide();
        });
        $('.page-four .title .num1').text(parseInt($('.page-four .title .num1').text())+num);
    }
    /*抖动*/
    function shake(ele){
        for(var i=0;i<5;i++){
            ele.animate({"left":"8px"},30).animate({"left":"0"},30);
        }
    }
    /*初始化*/
    function Init(){
        $('body').unbind('touchmove');
        $('.page-four .show').hide();
        btn_left.show();
        btn_right.show();
        $('<audio id="music1"><source src="music/money.ogg" type="audio/ogg"><source src="music/money.mp3" type="audio/mpeg"><source src="music/money.wav" type="audio/wav"></audio><audio id="music2"><source src="music/money.ogg" type="audio/ogg"><source src="music/money.mp3" type="audio/mpeg"><source src="music/money.wav" type="audio/wav"></audio><audio id="music3"><source src="music/notify.ogg" type="audio/ogg"><source src="music/notify.mp3" type="audio/mpeg"><source src="music/notify.wav" type="audio/wav"></audio><audio id="music4"><source src="music/notify.ogg" type="audio/ogg"><source src="music/notify.mp3" type="audio/mpeg"><source src="music/notify.wav" type="audio/wav"></audio><audio id="music5"><source src="music/notify.ogg" type="audio/ogg"><source src="music/notify.mp3" type="audio/mpeg"><source src="music/notify.wav" type="audio/wav"></audio>').appendTo('body');
        $('.page-four .title .num1').text(0);
        $('.page-four .title h5 .num2').text(30);
        person.css({"background":"url('images/runman_new.gif') no-repeat center center","background-size":"auto 100%","top":"-50%","left":"32%"});
        $('.page-four .time').css({"display":"block","width":"100%","height":"40%","background":"url('images/num_3.png') no-repeat 65% center","background-size":"80% auto"});
        $('.page-four .end').css({"height":"200%","opacity":"0","z-index":"-1"});
        $('.page-four .end .bai').css({"opacity":"0","height":"650%"});
        $('.page-four .end .egg').css({"opacity":"0","height":"660%"});
    }
	function randomString(len) {
		len = len || 32;
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
		var maxPos = $chars.length;
		var pwd = '';
		for (i = 0; i < len; i++) {
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	}
});
