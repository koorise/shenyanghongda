(function(a){a.fn.extend({banner_thaw:function(b){b=a.extend({thumbObj:null,botPrev:null,botNext:null,thumbNowClass:"hover",thumbOverEvent:true,slideTime:1000,autoChange:true,clickFalse:true,overStop:true,changeTime:5000,delayTime:300},b||{});var h=a(this);var k;var m=h.size();var e=0;var g;var c;var f;function d(){if(e!=g){if(b.thumbObj!=null){a(b.thumbObj).removeClass(b.thumbNowClass).eq(g).addClass(b.thumbNowClass)}if(b.slideTime<=0){h.eq(e).hide();h.eq(g).show()}else{h.eq(e).fadeOut(b.slideTime);h.eq(g).fadeIn(b.slideTime)}e=g;if(b.autoChange==true){clearInterval(c);c=setInterval(l,b.changeTime)}}}function l(){g=(e+1)%m;d()}h.hide().eq(0).show();if(b.thumbObj!=null){k=a(b.thumbObj);k.removeClass(b.thumbNowClass).eq(0).addClass(b.thumbNowClass);k.click(function(){g=k.index(a(this));d();if(b.clickFalse==true){return false}});if(b.thumbOverEvent==true){k.mouseenter(function(){g=k.index(a(this));f=setTimeout(d,b.delayTime)});k.mouseleave(function(){clearTimeout(f)})}}if(b.botNext!=null){a(b.botNext).click(function(){if(h.queue().length<1){l()}return false})}if(b.botPrev!=null){a(b.botPrev).click(function(){if(h.queue().length<1){g=(e+m-1)%m;d()}return false})}if(b.autoChange==true){c=setInterval(l,b.changeTime);if(b.overStop==true){h.mouseenter(function(){clearInterval(c)});h.mouseleave(function(){c=setInterval(l,b.changeTime)})}}}})})(jQuery);var zoomOverlayVeto=false;var zoomOverlayOn=false;var posx=0;var posy=0;var myWidth=0,myHeight=0;showZoom=function(h){if(!h){var h=window.event}if(h.pageX||h.pageY){posx=h.pageX;posy=h.pageY}else{if(h.clientX||h.clientY){posx=h.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;posy=h.clientY+document.body.scrollTop+document.documentElement.scrollTop}}var l=$("#picture").offset();var k=$("#picture").width();var g=$("#picture").height();if(!zoomOverlayVeto&&(posx>l.left&&posx<(l.left+k)&&posy>l.top&&posy<(l.top+g))){$("#zoom_image_box").css("left","310px");$("#zoom_image_box").css("top","00px");var f=(posx-l.left);var b=(posy-l.top);var d=(f/k)*100;var c=(b/g)*100;var a=d+"% "+c+"%";$("#zoom_image").css("background-position",a);$("#zoom_image_box").show();zoomOverlayOn=true}else{$("#zoom_image_box").hide();zoomOverlayOn=false}};

/*
 *	Mark Slider - jQuery plugin
 *	Version : 1.3
 *	Author : Mark Qin
 *	Date : 2011-09-28
 *	Reference : Easy Slider 1.7
 *
 *	jQuery 1.4.2+
 */
 
/*
 *	markup example for:
 *
 *	$("#JS_promo").markSlider();
 *	
 *	<div class="promo">
 * 		<div id="JS_promo" class="promo_content">
 *			<ul class="promo_list">
 *				<li class="promo_item">...</li>
 *				<li class="promo_item">...</li>
 *				<li class="promo_item">...</li>
 *				<li class="promo_item">...</li>
 *				<li class="promo_item">...</li>
 *			</ul>
 *		</div>
 *	</div>
 *
 */
 
 
 	

(function($) {

	$.fn.markSlider = function(o){
	  
		//默认配置属性
		var defaults = {			
			
			speed: 				600,						//滚动速度，默认600ms
			auto:				true,						//自动播放，默认开启
			pause:				5000,						//间隔时间，默认4秒
			continuous:			true,						//循环播放，默认开启
			vertical:			false,						//垂直滚动，默认关闭
			imgPreload:			true,						//是否开启图片预加载，默认开启
			easing:				'slow',						//滚动动画的easing效果，目前有三个选择：''、'slow'、'fast'，留空则动画没有easing效果，slow表示有减速效果，fast表示有加速效果。
															//更多其它效果可以通过引入jquery.easing插件后进行扩展
			//进度导航
			progressNavId: 		'promo_triggers',			//进度导航的ID（包括数字导航、缩略图导航与自定义导航）
			progressNavCurrent:	'current',					//进度导航当前状态的class
			progressNavHover:	false,						//鼠标移动到数字导航上时触发播放动画，而不需要点击。默认关闭
			
			//自定义进度导航
			customProgressNav:	false,						//是否自定义进度导航，默认关闭
			customProTag:		'li',						//自定义导航的标签，默认是'li'
			hasLink:			false,						//自定义导航中是否有需要跳转的<a>标签
			
			//数字导航（自动生成）
			numeric: 			true,						//数字导航，默认开启（缩略图导航与数字导航只能使用一个）
			
			//缩略图导航（自动生成）
			thumbImgNav:		false,						//缩略图导航，默认关闭（缩略图导航与数字导航只能使用一个；只能在单纯的图片轮转情况下使用）
			smallImg:			'_small',					//缩略图相对大图的的图片名称后缀（在使用缩略图导航时可配置）
			imgType:			'.jpg',						//图片的类型（在使用缩略图导航时可配置）
			
			//方向导航
			directionNav:		false,						//方向导航，默认关闭
			prevId: 			'promo_prev',				//上一个按钮的ID
			prevText: 			'Previous',					//上一个按钮的文本
			nextId: 			'promo_next',				//下一个按钮的ID
			nextText: 			'Next',						//下一个按钮的文本
			directionNavFade:	false,						//当播放到最后一个（第一个）内容块时，隐藏Next（Prev）按钮。需要关闭循环播放
			directionNavToggle:	false,						//鼠标移动到内容上时方向导航出现，移开后隐藏。需要开启方向导航，即"directionNav:true"，默认关闭此功能
			
			//暂停
			pauseShow:			false,						//是否显示暂停按钮，默认不显示
			pauseId:			'promo_pause',				//暂停按钮的ID名
			pausePlayClass:		'promo_pause_play',			//当处于暂停状态时，"播放"按钮的class
			pauseStopText:		'pause',					//当处于播放状态时，"暂停"按钮的文本
			pausePlayText:		'play',						//当处于暂停状态时，"播放"按钮的文本
			
			//全屏模式
			fullScreen:			false,						//全屏模式，默认关闭
			haveBigImg:			false,						//在开启全屏模式的情况下，有超大图且需要自适应居中显示（纯图片）
			bigImgWidth:		1600,						//全屏模式下，超大图片的宽度（使图片居中）
			minWidth:			980,						//最小宽度（全屏模式）
			classicRight:		true,						//是否开启进度导航居右下角绝对定位的经典布局（只全屏模式下,相对于最小内容宽度），默认开启
	
			//计数器
			countShow:			false,						//计数器，显示当前内容块是内容块列表中的第几个，如(2/5)，表示当前显示的是第二个内容块，默认关闭
			countShowId:		'promo_count',				//计数器的ID
			countCurrentId:		'promo_count_current',		//计数器中，当前数字的ID
			countTotalId:		'promo_count_total',		//计数器中，总数字的ID
			countSplitId:		'promo_count_split',		//计数器中，分隔符的ID
			countSplitContent:	'/',						//计数器中，分隔符的内容 
			countCurrentBefore:	'',							//计数器中，当前数字的前缀，默认为空
			countCurrentAfter:	'',							//计数器中，当前数字的后缀，默认为空
			countTotalBefore:	'',							//计数器中，总数字的前缀，默认为空
			countTotalAfter:	''							//计数器中，总数字的后缀，默认为空
			
			
	
		}; 
		
		var o = $.extend(defaults, o);
		
		this.each(function() {
			var obj = $(this),
				listObj = obj.children("ul"),
				itemObj = listObj.children("li"),
				s = itemObj.length,
				w = itemObj.width(),
				h = itemObj.height();
			
			var clickable = true;
			obj.width(w); 
			obj.height(h);
			obj.css({"overflow":"hidden","position":"relative"});
			
			var ts = s-1, t = 0;
			
			if(!o.vertical){
				listObj.css('width',s*w);
				itemObj.css('float','left');
			};			
			

			//自动生产进度导航
			if(!o.customProgressNav && s>1 && $("#"+o.progressNavId).length<1){
			
				var html = "";
				html += '<ul id="'+ o.progressNavId +'"></ul>';
				$(obj).after(html);
				
				//数字导航
				if(o.numeric && !o.thumbImgNav){					
					for(var i=0;i<s;i++){						
						$(document.createElement("li"))
							.html('<a href=\"#\">'+ (i+1) +'</a>')
							.appendTo($("#"+ o.progressNavId)); 
					};
				};
				
				//缩略图导航
				if(o.thumbImgNav && !o.numeric){
					var imgArray = $("img", obj);
					var thumbLength = imgArray.length;
					var thumbArray = new Array();
					if(thumbLength == 1){
						thumbArray.push(new Array(imgArray.attr("src").replace(o.imgType,o.smallImg + o.imgType)));
					}else{
						for(var i = 0; i < thumbLength ; i++){
							thumbArray.push(new Array(imgArray.eq(i).attr("src").replace(o.imgType,o.smallImg + o.imgType)));
						};
					};
								
					for(var i=0;i<s;i++){						
						
						$(document.createElement("li"))
							.html('<a rel='+ i +' href=\"#\"><img src="'+ thumbArray[i] +'" alt="" /></a>')
							.appendTo($("#"+ o.progressNavId)); 
						
						if(o.imgPreload){
							$("#"+o.progressNavId + " img").each(function(){
								var imgSelf = $(this);
								var imgSrc = imgSelf.attr("src");
								ImgPreload(imgSelf,imgSrc);
							});
						};
					};
				};	
			};
			
			ProgressNavAct();
			
			//进度导航按钮触发事件
			function ProgressNavAct(){
				/*$("#"+ o.progressNavId).children(o.customProgressNav?o.customProTag:'li').bind(o.progressNavHover?'mouseover':'click',function(){							
					Animat($(this).index(),false,o.progressNavHover?true:false);
				}).click(function(){
					return o.hasLink&&o.customProgressNav?true:false;
				});*/
				
				var proNavItem = $("#"+ o.progressNavId).children(o.customProgressNav?o.customProTag:'li');
				if(o.progressNavHover){
					var hoverTimer;
					proNavItem.hover(function(){
						var _this = $(this);
						hoverTimer = setTimeout(function(){
							Animat(_this.index(),false,true);
						},150);
					},function(){
						clearTimeout(hoverTimer);
					});
				}else{
					proNavItem.click(function(){
						Animat($(this).index(),true,false);
					});
				};
				proNavItem.click(function(){
					return o.hasLink&&o.customProgressNav?true:false;
				});
				
			};
			

			//进度导航当前状态
			function setCurrent(i){
				i = parseInt(i);
				$("#"+ o.progressNavId).children(o.customProgressNav?o.customProTag:'li').eq(i).addClass(o.progressNavCurrent).siblings(o.customProgressNav?o.customProTag:'li').removeClass(o.progressNavCurrent);				
			};
			
			
			
			//方向导航
			if(o.directionNav){
				var html = " ";
				html += ' <span id="'+ o.prevId +'"><a href=\"#\">'+ o.prevText +'</a></span>';				
				html += ' <span id="'+ o.nextId +'"><a href=\"#\">'+ o.nextText +'</a></span>';
				$(obj).after(html);
				
				$("#"+o.nextId).click(function(){		
					Animat("next",true,false);
					return false;
				});
				$("#"+o.prevId).click(function(){
					Animat("prev",true,false);
					return false;
				});
				
				//方向导航Toggle
				if(o.directionNavToggle){
					var prevBtn = $("#"+o.prevId);
					var nextBtn = $("#"+o.nextId);
					prevBtn.hide();
					nextBtn.hide();
					obj.parent().bind('mouseover',function(){
						prevBtn.show();
						nextBtn.show();
					}).bind('mouseout',function(){
						prevBtn.hide();
						nextBtn.hide();
					});
				};
				
			};
			
			
			//暂停按钮
			if(o.pauseShow && o.auto){
				var html = "";
				html += '<span id="'+ o.pauseId +'"><a href="#"><span>'+o.pauseStopText+'</span></a></span>';
				$(obj).after(html);
				
				$("#"+ o.pauseId).toggle(function(){
					clearTimeout(timeout);
					$(this).find("a").addClass(o.pausePlayClass).find("span").html(o.pausePlayText);
					return false;
				},function(){
					Timeout();
					$(this).find("a").removeClass(o.pausePlayClass).find("span").html(o.pauseStopText);
					return false;
				});
				
			};
			
			
			//计数器
			if(o.countShow){
				var html = "";
				html += '<div id="'+ o.countShowId +'"><span id="' + o.countCurrentId + '"></span><span id="' + o.countSplitId + '">' + o.countSplitContent + '</span><span id="' + o.countTotalId + '"></span></div>';
				$(obj).after(html);
			};
			
	
			//全屏模式
			if(o.fullScreen){
				var winW = $(window).width();
				if(winW<o.minWidth){
					winW=o.minWidth;
				};
				w = winW;
				obj.width(w);
				obj.parent().width(w);
				o.vertical ? listObj.css({'width':w}) : listObj.css({'width':s*w});
				itemObj.css({"overflow":"hidden"}).width(w);
				
				if(o.haveBigImg){
					$("img", obj).each(function(){
						var imgSelf = $(this);
						var imgSrc = imgSelf.attr("src");
						ImgPreload(imgSelf,imgSrc,winW,o.bigImgWidth);
					});
				};
				//全屏模式下进度导航常用居右绝对定位（相对于最小内容宽度）
				if((o.thumbImgNav || o.numeric) && o.classicRight){
					$("#" + o.progressNavId).css({"position":"absolute","right":(winW - o.minWidth)/2});
				};
				
				//浏览器缩放
				$(window).resize(function(){
					var winW = $(window).width();
					if(winW<o.minWidth){
						winW=o.minWidth;
					};
					w = winW;
					obj.width(w);
					obj.parent().width(w);
					o.vertical ? listObj.css({'width':w}) : listObj.css({'width':s*w,'margin-left':-t*w});
					itemObj.css({"overflow":"hidden"}).width(w);
					if(o.haveBigImg){
						$("img", obj).each(function(){
							$(this).css({"margin-left":(winW - o.bigImgWidth)/2});
						});
					};
					if((o.thumbImgNav || o.numeric) && o.classicRight){
						$("#" + o.progressNavId).css({"position":"absolute","right":(winW - o.minWidth)/2});
					};
				});
				
			};
			
			
			//图片预加载
			function ImgPreload(imgobj,src,winW,imgW){
				imgobj.hide();
				var img = new Image();				
				$(img).load(function(){
					imgobj.attr("src",src);
					if(imgW){imgobj.css({"margin-left":(winW - imgW)/2});};
					imgobj.fadeIn(200);
				}).attr("src",src);
				return imgobj;
			};
			
			
			//动画效果回调函数
			function adjust(){
				var nowWinW = $(window).width()<o.minWidth ? o.minWidth :$(window).width();
				if(!o.vertical){
					if(t == -1){
						if(o.fullScreen){
							itemObj.last().attr("style","float:left; overflow:hidden; width:"+nowWinW+"px");
						}else{
							itemObj.last().attr("style","float:left;");
						};
						
						listObj.css({"margin-left":ts*itemObj.width()*-1});
						t = ts;
					};
					if(t == s){
						if(o.fullScreen){
							itemObj.first().attr("style","float:left; overflow:hidden; width:"+nowWinW+"px");
						}else{
							itemObj.first().attr("style","float:left;");
						};
						listObj.css({"margin-left":"0"});
						t = 0;
					};
				}else{
					if(t == -1){
						itemObj.last().attr("style"," ");
						listObj.css({"margin-top":ts*itemObj.height()*-1});
						t = ts;
					};
					if(t == s){
						itemObj.first().attr("style"," ");
						listObj.css({"margin-top":"0"});
						t = 0;
					};
				};
				clickable = true;
			};
			
			
			//动画效果
			function Animat(dir,clicked,rapid){
				if (clickable){
					clickable = rapid ? true : false;
					var ot = t;
					switch(dir){
						case "next":
							t = parseInt((ot>=ts) ? (o.continuous ? t+1 : ts) : t+1);			
							break;
						case "prev":
							t = parseInt((t<=0) ? (o.continuous ? t-1 : 0) : t-1);
							break;
						default:
							t = parseInt(dir);
							break; 
					};
					
					
					//设置数字导航当前状态
					t == s ? setCurrent(0) : setCurrent(t);
					
					//动画
					var speed = o.speed;
					if(!o.vertical) {
						
						if(t == -1){
							itemObj.last().css({"position":"relative","left":listObj.width()*-1});
						};
						if(t == s){
							itemObj.first().css({"position":"relative","left":listObj.width()});
						};
						
						p = (t*w*-1);
						listObj.animate(
							{ marginLeft: p }, 
							{ queue:false, duration:speed, complete:adjust, easing:o.easing }
						);
					} else {
						if(t == -1){
							itemObj.last().css({"position":"relative","top":h*s*-1});
						};
						if(t == s){
							itemObj.first().css({"position":"relative","top":h*s});
						};
						p = (t*h*-1);
						listObj.animate(
							{ marginTop: p },
							{ queue:false, duration:speed, complete:adjust, easing:o.easing }
						);
					};
					
					//不循环播放且方向导航渐隐模式，播放到最后一个（第一个）内容块时，隐藏Next（Prev）按钮
					if(!o.continuous && o.directionNavFade){
						t==ts ? $("#"+o.nextId).hide() : $("#"+o.nextId).show();
						t==0 ? $("#"+o.prevId).hide() : $("#"+o.prevId).show();
					};
					
					//自动播放
					if(o.auto && clicked && !$("#"+ o.pauseId).find("a").hasClass(o.pausePlayClass)){
						clearTimeout(timeout);
						Timeout();
					}else{
						if(o.auto && dir=="next" && !$("#"+ o.pauseId).find("a").hasClass(o.pausePlayClass)){
							Timeout();
						};
					};
					
					//计数器
					if(o.countShow){
						var cnt = o.countCurrentBefore + (parseInt(t == -1 ? ts : ( t == s ? 0 : t ))+1) + o.countCurrentAfter;
						$("#"+o.countCurrentId).html(cnt);
					};
								
				};
				
			};
				
			
			//初始化
			setCurrent(0);
			
			var timeout;
			function Timeout(){
				timeout = setTimeout(function(){
					Animat("next",false);
				},o.pause);
			};
			
			if(o.auto && s>1){
				Timeout();
				obj.parent().hover(function(){
					clearTimeout(timeout);
				},function(){
					if(!$("#"+ o.pauseId).find("a").hasClass(o.pausePlayClass)){
						Timeout();
					};
				});
			};

			if(o.countShow){
				$("#"+o.countCurrentId).html(o.countCurrentBefore +"1" + o.countCurrentAfter);
				$("#"+o.countTotalId).html(o.countTotalBefore + s + o.countTotalAfter);
			};
		
			if(!o.continuous && o.directionNavFade){
				$("#"+o.prevId).hide();
			};
			
			if(o.imgPreload){
				$("img", obj).each(function(){
					var imgSelf = $(this);
					var imgSrc = imgSelf.attr("src");
					ImgPreload(imgSelf,imgSrc);
				});
			};
			
		});
	  
	};
	
	
	//easing效果
	jQuery.extend( jQuery.easing,
		{
			slow: function (x, t, b, c, d) {
				return c*((t=t/d-1)*t*t*t*t + 1) + b;
			},
			fast: function (x, t, b, c, d) {
				if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
				return c/2*((t-=2)*t*t*t*t + 2) + b;
			}
		}
	);

})(jQuery);




/**
* name		:	promo
* version	:	1.0
*/
(function(a){a.fn.extend({promo:function(b){b=a.extend({thumbObj:null,botPrev:null,botNext:null,thumbNowClass:"hover",thumbOverEvent:true,slideTime:1000,autoChange:true,clickFalse:true,overStop:true,changeTime:5000,delayTime:300},b||{});var h=a(this);var i;var k=h.size();var e=0;var g;var c;var f;function d(){if(e!=g){if(b.thumbObj!=null){a(b.thumbObj).removeClass(b.thumbNowClass).eq(g).addClass(b.thumbNowClass)}if(b.slideTime<=0){h.eq(e).hide();h.eq(g).show()}else{h.eq(e).fadeOut(b.slideTime);h.eq(g).fadeIn(b.slideTime)}e=g;if(b.autoChange==true){clearInterval(c);c=setInterval(j,b.changeTime)}}}function j(){g=(e+1)%k;d()}h.hide().eq(0).show();if(b.thumbObj!=null){i=a(b.thumbObj);i.removeClass(b.thumbNowClass).eq(0).addClass(b.thumbNowClass);i.click(function(){g=i.index(a(this));d();if(b.clickFalse==true){return false}});if(b.thumbOverEvent==true){i.mouseenter(function(){g=i.index(a(this));f=setTimeout(d,b.delayTime)});i.mouseleave(function(){clearTimeout(f)})}}if(b.botNext!=null){a(b.botNext).click(function(){if(h.queue().length<1){j()}return false})}if(b.botPrev!=null){a(b.botPrev).click(function(){if(h.queue().length<1){g=(e+k-1)%k;d()}return false})}if(b.autoChange==true){c=setInterval(j,b.changeTime);if(b.overStop==true){h.mouseenter(function(){clearInterval(c)});h.mouseleave(function(){c=setInterval(j,b.changeTime)})}}}})})(jQuery);



/**
* name		:	carousel
* modify	:	删除li和div的overflow:hidden
* version	:	1.0.1-min
* date	    :	2011/03/24
*/


(function(d){d.fn.carousel=function(e){e=d.extend({btnPrev:null,btnNext:null,btnGo:null,mouseWheel:false,auto:null,speed:200,easing:null,vertical:false,circular:true,visible:3,start:0,scrolls:1,beforeStart:null,onMouse:true,afterEnd:null},e||{});return this.each(function(){var n=false,l=e.vertical?"top":"left",g=e.vertical?"height":"width";var f=d(this),p=d("ul",f),i=d("li:visible",p),u=i.size(),t=e.visible;var s=0;if(e.circular){p.prepend(i.slice(u-t-1+1).clone()).append(i.slice(0,t).clone());e.start+=t}var r=d("li:visible",p),o=r.size(),w=e.start;f.css("visibility","visible");r.css({"float":e.vertical?"none":"left"});p.css({margin:"0",padding:"0",position:"relative","list-style-type":"none","z-index":"1"});f.css({position:"relative","z-index":"2",left:"0px"});var k=e.vertical?a(r):c(r);var q=k*o;var m=k*t;r.css({width:r.width(),height:r.height()});p.css(g,q+"px").css(l,-(w*k));f.css(g,m+"px");d((w-e.scrolls<0&&e.btnPrev)).addClass("prev_disabled");d((w+e.scrolls>o-t&&e.btnNext)).addClass("next_disabled");d(e.btnPrev).hover(function(){if(!d(e.btnPrev).hasClass("prev_disabled")){d(e.btnPrev).addClass("prev_hover")}},function(){d(e.btnPrev).removeClass("prev_hover")});d(e.btnNext).hover(function(){if(!d(e.btnNext).hasClass("next_disabled")){d(e.btnNext).addClass("next_hover")}},function(){d(e.btnNext).removeClass("next_hover")});if(e.btnPrev){d(e.btnPrev).click(function(){return j(w-e.scrolls)})}if(e.btnNext){d(e.btnNext).click(function(){return j(w+e.scrolls)})}if(e.btnGo){d.each(e.btnGo,function(v,x){d(x).click(function(){return j(e.circular?e.visible+v:v)})})}if(e.mouseWheel&&f.mousewheel){f.mousewheel(function(v,x){return x>0?j(w-e.scrolls):j(w+e.scrolls)})}if(e.auto){s=setInterval(function(){j(w+e.scrolls)},e.auto+e.speed)}if(e.onMouse){p.bind("mouseover",function(){if(e.auto){clearInterval(s)}});p.bind("mouseout",function(){if(e.auto){s=setInterval(function(){j(w+e.scrolls)},e.auto+e.speed)}})}function h(){return r.slice(w).slice(0,t)}function j(v){if(!n){if(e.beforeStart){e.beforeStart.call(this,h())}if(e.circular){if(v<=e.start-t-1){p.css(l,-((o-(t*2))*k)+"px");w=v==e.start-t-1?o-(t*2)-1:o-(t*2)-e.scrolls}else{if(v>=o-t+1){p.css(l,-((t)*k)+"px");w=v==o-t+1?t+1:t+e.scrolls}else{w=v}}}else{if(v<0||v>o-t){return}else{w=v}}n=true;p.animate(l=="left"?{left:-(w*k)}:{top:-(w*k)},e.speed,e.easing,function(){if(e.afterEnd){e.afterEnd.call(this,h())}n=false});if(!e.circular){d(e.btnPrev).removeClass("prev_disabled");d(e.btnNext).removeClass("next_disabled");d((w-e.scrolls<0&&e.btnPrev)).addClass("prev_disabled");d((w+e.scrolls>o-t&&e.btnNext)).addClass("next_disabled")}}return false}})};function b(e,f){return parseInt(d.css(e[0],f))||0}function c(e){return e[0].offsetWidth+b(e,"marginLeft")+b(e,"marginRight")}function a(e){return e[0].offsetHeight+b(e,"marginTop")+b(e,"marginBottom")}})(jQuery);


/**
 * @name 		:	loadthumb
 * @type		:	plugin
 * @explain		:	preload,center,resize
 */
jQuery.fn.loadthumb=function(c){c=$.extend({src:"",imgId:"myImgs",parentId:"CRviewer"},c);var a=this;a.hide();var b=new Image();$(b).load(function(){imgDem={};imgDem.w=b.width;imgDem.h=b.height;imgDem=$.imgResize({w:$("#"+c.parentId).width(),h:$("#"+c.parentId).height()},{w:imgDem.w,h:imgDem.h});var d=$.imgCenter({w:$("#"+c.parentId).width(),h:$("#"+c.parentId).height()},{w:imgDem.w,h:imgDem.h});$("#"+c.imgId).css({width:imgDem.w,height:imgDem.h,marginLeft:d.l,marginTop:d.t});a.attr("src",c.src);a.fadeIn("slow")}).attr("src",c.src);return a};jQuery.imgResize=function(c,b){if(b.w>0&&b.h>0){var a=(c.w/b.w<c.h/b.h)?c.w/b.w:c.h/b.h;if(a<=1){b.w=b.w*a;b.h=b.h*a}else{b.w=b.w;b.h=b.h}}return b};jQuery.imgCenter=function(d,a){var c=(d.w-a.w)*0.5;var b=(d.h-a.h)*0.5;return{l:c,t:b}};

/*img center*/
(function(a){a.fn.imgcenter=function(b){var c={};var b=a.extend(c,b);this.load(function(){var j=a(this);var l=j.parent().width();var g=j.parent().height();var i=j.width();var f=j.height();var d=(l-i)*0.5;var h=(g-f)*0.5;var e=(d<0)?0:d;var k=(h<0)?0:h;j.css({marginLeft:e,marginTop:k})});return}})(jQuery);

/**
* name		:	zoom
* version	:	1.2.3
*/
(function(a){a.fn.zoom=function(b){var c={xzoom:300,yzoom:300,offset:10,offsetTop:0,lens:1};if(b){a.extend(c,b)}var d=a(this);a(this).hover(function(){var f=a(this).offset().left;var e=a(this).offset().top;var m=a(this).children(".picbox").children("img").offset().left;var h=a(this).children(".picbox").children("img").offset().top;var k=a(this).width();var i=a(this).height();var l=a(this).children(".picbox").children("img").get(0).offsetWidth;var j=a(this).children(".picbox").children("img").get(0).offsetHeight;var g=a(this).children(".picbox").attr("href");if((l<k)&&(j<i)){}else{if(a("div.zoomdiv").get().length==0){a(this).after("<div class='zoomdiv'><img class='bigimg' src='"+g+"'/></div>");a(this).append("<div class='handle'>&nbsp;</div>");a("div.zoomdiv").css({top:c.offsetTop,left:k+c.offset});a("div.zoomdiv").width(c.xzoom);a("div.zoomdiv").height(c.yzoom);a("div.zoomdiv").show();a(document.body).mousemove(function(q){mouse=new MouseEvent(q);var r=a(".bigimg").get(0).offsetWidth;var p=a(".bigimg").get(0).offsetHeight;var n="x";var o="y";if(isNaN(o)|isNaN(n)){var o=(r/l);var n=(p/j);a("div.handle").width("100px");a("div.handle").height("100px");if(c.lens){if(o>1||n>1){a("div.handle").css("visibility","visible")}}}xpos=mouse.x-a("div.handle").width()/2-m;ypos=mouse.y-a("div.handle").height()/2-h;if(c.lens){xpos=(mouse.x-a("div.handle").width()/2<m)?0+(m-f-1):((mouse.x+a("div.handle").width()/2>l+m)?(l-a("div.handle").width()+(m-f-3)):xpos+(m-f-3));ypos=(mouse.y-a("div.handle").height()/2<h)?0+(h-e-1):((mouse.y+a("div.handle").height()/2>j+h)?(j-a("div.handle").height()+(h-e-3)):ypos+(h-e-3))}if(c.lens){a("div.handle").css({top:ypos,left:xpos})}scrolly=ypos-(h-e-2);a("div.zoomdiv").get(0).scrollTop=scrolly*n;scrollx=xpos-(m-f-2);a("div.zoomdiv").get(0).scrollLeft=(scrollx)*o})}}},function(){a(document.body).unbind("mousemove");if(c.lens){a("div.handle").remove()}a("div.zoomdiv").remove();a("div.zoomtips").remove()})}})(jQuery);function MouseEvent(a){this.x=a.pageX;this.y=a.pageY};

/*lightbox*/
(function($){$.fn.lightBox=function(settings){settings=jQuery.extend({overlayBgColor:'#000',overlayOpacity:0.8,fixedNavigation:false,imageLoading:'images/lightbox-ico-loading.gif',imageBtnPrev:'images/lightbox-btn-prev.gif',imageBtnNext:'images/lightbox-btn-next.gif',imageBtnClose:'/images/lightbox-btn-close.gif',imageBlank:'images/lightbox-blank.gif',containerBorderSize:10,containerResizeSpeed:400,txtImage:'Image',txtOf:'of',keyToClose:'c',keyToPrev:'p',keyToNext:'n',imageArray:[],activeImage:0},settings);var jQueryMatchedObj=this;function _initialize(){_start(this,jQueryMatchedObj);return false;}
function _start(objClicked,jQueryMatchedObj){$('embed, object, select').css({'visibility':'hidden'});_set_interface();settings.imageArray.length=0;settings.activeImage=0;if(jQueryMatchedObj.length==1){settings.imageArray.push(new Array(objClicked.getAttribute('href'),objClicked.getAttribute('title')));}else{for(var i=0;i<jQueryMatchedObj.length;i++){settings.imageArray.push(new Array(jQueryMatchedObj[i].getAttribute('href'),jQueryMatchedObj[i].getAttribute('title')));}}
while(settings.imageArray[settings.activeImage][0]!=objClicked.getAttribute('href')){settings.activeImage++;}
_set_image_to_view();}
function _set_interface(){$('body').append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><img id="lightbox-image"><div style="" id="lightbox-nav"><a href="#" id="lightbox-nav-btnPrev"></a><a href="#" id="lightbox-nav-btnNext"></a></div><div id="lightbox-loading"><a href="#" id="lightbox-loading-link"><img src="'+settings.imageLoading+'"></a></div></div></div><div id="lightbox-container-image-data-box"><div id="lightbox-container-image-data"><div id="lightbox-image-details"><span id="lightbox-image-details-caption"></span><span id="lightbox-image-details-currentNumber"></span></div><div id="lightbox-secNav"><a href="#" id="lightbox-secNav-btnClose"><img src="'+settings.imageBtnClose+'"></a></div></div></div></div>');var arrPageSizes=___getPageSize();$('#jquery-overlay').css({backgroundColor:settings.overlayBgColor,opacity:settings.overlayOpacity,width:arrPageSizes[0],height:arrPageSizes[1]}).fadeIn();var arrPageScroll=___getPageScroll();$('#jquery-lightbox').css({top:arrPageScroll[1]+(arrPageSizes[3]/10),left:arrPageScroll[0]}).show();$('#jquery-overlay,#jquery-lightbox').click(function(){_finish();});$('#lightbox-loading-link,#lightbox-secNav-btnClose').click(function(){_finish();return false;});$(window).resize(function(){var arrPageSizes=___getPageSize();$('#jquery-overlay').css({width:arrPageSizes[0],height:arrPageSizes[1]});var arrPageScroll=___getPageScroll();$('#jquery-lightbox').css({top:arrPageScroll[1]+(arrPageSizes[3]/10),left:arrPageScroll[0]});});}
function _set_image_to_view(){$('#lightbox-loading').show();if(settings.fixedNavigation){$('#lightbox-image,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();}else{$('#lightbox-image,#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber').hide();}
var objImagePreloader=new Image();objImagePreloader.onload=function(){$('#lightbox-image').attr('src',settings.imageArray[settings.activeImage][0]);_resize_container_image_box(objImagePreloader.width,objImagePreloader.height);objImagePreloader.onload=function(){};};objImagePreloader.src=settings.imageArray[settings.activeImage][0];};function _resize_container_image_box(intImageWidth,intImageHeight){var intCurrentWidth=$('#lightbox-container-image-box').width();var intCurrentHeight=$('#lightbox-container-image-box').height();var intWidth=(intImageWidth+(settings.containerBorderSize*2));var intHeight=(intImageHeight+(settings.containerBorderSize*2));var intDiffW=intCurrentWidth-intWidth;var intDiffH=intCurrentHeight-intHeight;$('#lightbox-container-image-box').animate({width:intWidth,height:intHeight},settings.containerResizeSpeed,function(){_show_image();});if((intDiffW==0)&&(intDiffH==0)){if($.browser.msie){___pause(250);}else{___pause(100);}}
$('#lightbox-container-image-data-box').css({width:intImageWidth});$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({height:intImageHeight+(settings.containerBorderSize*2)});};function _show_image(){$('#lightbox-loading').hide();$('#lightbox-image').fadeIn(function(){_show_image_data();_set_navigation();});_preload_neighbor_images();};function _show_image_data(){$('#lightbox-container-image-data-box').slideDown('fast');$('#lightbox-image-details-caption').hide();if(settings.imageArray[settings.activeImage][1]){$('#lightbox-image-details-caption').html(settings.imageArray[settings.activeImage][1]).show();}
if(settings.imageArray.length>1){$('#lightbox-image-details-currentNumber').html(settings.txtImage+' '+(settings.activeImage+1)+' '+settings.txtOf+' '+settings.imageArray.length).show();}}
function _set_navigation(){$('#lightbox-nav').show();$('#lightbox-nav-btnPrev,#lightbox-nav-btnNext').css({'background':'transparent url('+settings.imageBlank+') no-repeat'});if(settings.activeImage!=0){if(settings.fixedNavigation){$('#lightbox-nav-btnPrev').css({'background':'url('+settings.imageBtnPrev+') left 15% no-repeat'}).unbind().bind('click',function(){settings.activeImage=settings.activeImage-1;_set_image_to_view();return false;});}else{$('#lightbox-nav-btnPrev').unbind().hover(function(){$(this).css({'background':'url('+settings.imageBtnPrev+') left 15% no-repeat'});},function(){$(this).css({'background':'transparent url('+settings.imageBlank+') no-repeat'});}).show().bind('click',function(){settings.activeImage=settings.activeImage-1;_set_image_to_view();return false;});}}
if(settings.activeImage!=(settings.imageArray.length-1)){if(settings.fixedNavigation){$('#lightbox-nav-btnNext').css({'background':'url('+settings.imageBtnNext+') right 15% no-repeat'}).unbind().bind('click',function(){settings.activeImage=settings.activeImage+1;_set_image_to_view();return false;});}else{$('#lightbox-nav-btnNext').unbind().hover(function(){$(this).css({'background':'url('+settings.imageBtnNext+') right 15% no-repeat'});},function(){$(this).css({'background':'transparent url('+settings.imageBlank+') no-repeat'});}).show().bind('click',function(){settings.activeImage=settings.activeImage+1;_set_image_to_view();return false;});}}
_enable_keyboard_navigation();}
function _enable_keyboard_navigation(){$(document).keydown(function(objEvent){_keyboard_action(objEvent);});}
function _disable_keyboard_navigation(){$(document).unbind();}
function _keyboard_action(objEvent){if(objEvent==null){keycode=event.keyCode;escapeKey=27;}else{keycode=objEvent.keyCode;escapeKey=objEvent.DOM_VK_ESCAPE;}
key=String.fromCharCode(keycode).toLowerCase();if((key==settings.keyToClose)||(key=='x')||(keycode==escapeKey)){_finish();}
if((key==settings.keyToPrev)||(keycode==37)){if(settings.activeImage!=0){settings.activeImage=settings.activeImage-1;_set_image_to_view();_disable_keyboard_navigation();}}
if((key==settings.keyToNext)||(keycode==39)){if(settings.activeImage!=(settings.imageArray.length-1)){settings.activeImage=settings.activeImage+1;_set_image_to_view();_disable_keyboard_navigation();}}}
function _preload_neighbor_images(){if((settings.imageArray.length-1)>settings.activeImage){objNext=new Image();objNext.src=settings.imageArray[settings.activeImage+1][0];}
if(settings.activeImage>0){objPrev=new Image();objPrev.src=settings.imageArray[settings.activeImage-1][0];}}

function _finish(){$('#jquery-lightbox').remove();$('#jquery-overlay').fadeOut(function(){$('#jquery-overlay').remove();});$('embed, object, select').css({'visibility':'visible'});}
function ___getPageSize(){var xScroll,yScroll;if(window.innerHeight&&window.scrollMaxY){xScroll=window.innerWidth+window.scrollMaxX;yScroll=window.innerHeight+window.scrollMaxY;}else if(document.body.scrollHeight>document.body.offsetHeight){xScroll=document.body.scrollWidth;yScroll=document.body.scrollHeight;}else{xScroll=document.body.offsetWidth;yScroll=document.body.offsetHeight;}
var windowWidth,windowHeight;if(self.innerHeight){if(document.documentElement.clientWidth){windowWidth=document.documentElement.clientWidth;}else{windowWidth=self.innerWidth;}
windowHeight=self.innerHeight;}else if(document.documentElement&&document.documentElement.clientHeight){windowWidth=document.documentElement.clientWidth;windowHeight=document.documentElement.clientHeight;}else if(document.body){windowWidth=document.body.clientWidth;windowHeight=document.body.clientHeight;}
if(yScroll<windowHeight){pageHeight=windowHeight;}else{pageHeight=yScroll;}
if(xScroll<windowWidth){pageWidth=xScroll;}else{pageWidth=windowWidth;}
arrayPageSize=new Array(pageWidth,pageHeight,windowWidth,windowHeight);return arrayPageSize;};function ___getPageScroll(){var xScroll,yScroll;if(self.pageYOffset){yScroll=self.pageYOffset;xScroll=self.pageXOffset;}else if(document.documentElement&&document.documentElement.scrollTop){yScroll=document.documentElement.scrollTop;xScroll=document.documentElement.scrollLeft;}else if(document.body){yScroll=document.body.scrollTop;xScroll=document.body.scrollLeft;}
arrayPageScroll=new Array(xScroll,yScroll);return arrayPageScroll;};function ___pause(ms){var date=new Date();curDate=null;do{var curDate=new Date();}
while(curDate-date<ms);};return this.unbind('click').click(_initialize);};})(jQuery);



/*validate*/
(function($){$.extend($.fn,{validate:function(options){if(!this.length){options&&options.debug&&window.console&&console.warn("nothing selected, can't validate, returning nothing");return;}var validator=$.data(this[0],'validator');if(validator){return validator;}validator=new $.validator(options,this[0]);$.data(this[0],'validator',validator);if(validator.settings.onsubmit){this.find("input, button").filter(".cancel").click(function(){validator.cancelSubmit=true;});if(validator.settings.submitHandler){this.find("input, button").filter(":submit").click(function(){validator.submitButton=this;});}this.submit(function(event){if(validator.settings.debug)event.preventDefault();function handle(){if(validator.settings.submitHandler){if(validator.submitButton){var hidden=$("<input type='hidden'/>").attr("name",validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);}validator.settings.submitHandler.call(validator,validator.currentForm);if(validator.submitButton){hidden.remove();}return false;}return true;}if(validator.cancelSubmit){validator.cancelSubmit=false;return handle();}if(validator.form()){if(validator.pendingRequest){validator.formSubmitted=true;return false;}return handle();}else{validator.focusInvalid();return false;}});}return validator;},valid:function(){if($(this[0]).is('form')){return this.validate().form();}else{var valid=true;var validator=$(this[0].form).validate();this.each(function(){valid&=validator.element(this);});return valid;}},removeAttrs:function(attributes){var result={},$element=this;$.each(attributes.split(/\s/),function(index,value){result[value]=$element.attr(value);$element.removeAttr(value);});return result;},rules:function(command,argument){var element=this[0];if(command){var settings=$.data(element.form,'validator').settings;var staticRules=settings.rules;var existingRules=$.validator.staticRules(element);switch(command){case"add":$.extend(existingRules,$.validator.normalizeRule(argument));staticRules[element.name]=existingRules;if(argument.messages)settings.messages[element.name]=$.extend(settings.messages[element.name],argument.messages);break;case"remove":if(!argument){delete staticRules[element.name];return existingRules;}var filtered={};$.each(argument.split(/\s/),function(index,method){filtered[method]=existingRules[method];delete existingRules[method];});return filtered;}}var data=$.validator.normalizeRules($.extend({},$.validator.metadataRules(element),$.validator.classRules(element),$.validator.attributeRules(element),$.validator.staticRules(element)),element);if(data.required){var param=data.required;delete data.required;data=$.extend({required:param},data);}return data;}});$.extend($.expr[":"],{blank:function(a){return!$.trim(""+a.value);},filled:function(a){return!!$.trim(""+a.value);},unchecked:function(a){return!a.checked;}});$.validator=function(options,form){this.settings=$.extend(true,{},$.validator.defaults,options);this.currentForm=form;this.init();};$.validator.format=function(source,params){if(arguments.length==1)return function(){var args=$.makeArray(arguments);args.unshift(source);return $.validator.format.apply(this,args);};if(arguments.length>2&&params.constructor!=Array){params=$.makeArray(arguments).slice(1);}if(params.constructor!=Array){params=[params];}$.each(params,function(i,n){source=source.replace(new RegExp("\\{"+i+"\\}","g"),n);});return source;};$.extend($.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:$([]),errorLabelContainer:$([]),onsubmit:true,ignore:[],ignoreTitle:false,onfocusin:function(element){this.lastActive=element;if(this.settings.focusCleanup&&!this.blockFocusCleanup){this.settings.unhighlight&&this.settings.unhighlight.call(this,element,this.settings.errorClass,this.settings.validClass);this.errorsFor(element).hide();}},onfocusout:function(element){if(!this.checkable(element)&&(element.name in this.submitted||!this.optional(element))){this.element(element);}},onkeyup:function(element){if(element.name in this.submitted||element==this.lastElement){this.element(element);}},onclick:function(element){if(element.name in this.submitted)this.element(element);else if(element.parentNode.name in this.submitted)this.element(element.parentNode);},highlight:function(element,errorClass,validClass){$(element).addClass(errorClass).removeClass(validClass);},unhighlight:function(element,errorClass,validClass){$(element).removeClass(errorClass).addClass(validClass);}},setDefaults:function(settings){$.extend($.validator.defaults,settings);},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",accept:"Please enter a value with a valid extension.",maxlength:$.validator.format("Please enter no more than {0} characters."),minlength:$.validator.format("Please enter at least {0} characters."),rangelength:$.validator.format("Please enter a value between {0} and {1} characters long."),range:$.validator.format("Please enter a value between {0} and {1}."),max:$.validator.format("Please enter a value less than or equal to {0}."),min:$.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){this.labelContainer=$(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||$(this.currentForm);this.containers=$(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var groups=(this.groups={});$.each(this.settings.groups,function(key,value){$.each(value.split(/\s/),function(index,name){groups[name]=key;});});var rules=this.settings.rules;$.each(rules,function(key,value){rules[key]=$.validator.normalizeRule(value);});function delegate(event){var validator=$.data(this[0].form,"validator"),eventType="on"+event.type.replace(/^validate/,"");validator.settings[eventType]&&validator.settings[eventType].call(validator,this[0]);}$(this.currentForm).validateDelegate(":text, :password, :file, select, textarea","focusin focusout keyup",delegate).validateDelegate(":radio, :checkbox, select, option","click",delegate);if(this.settings.invalidHandler)$(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);},form:function(){this.checkForm();$.extend(this.submitted,this.errorMap);this.invalid=$.extend({},this.errorMap);if(!this.valid())$(this.currentForm).triggerHandler("invalid-form",[this]);this.showErrors();return this.valid();},checkForm:function(){this.prepareForm();for(var i=0,elements=(this.currentElements=this.elements());elements[i];i++){this.check(elements[i]);}return this.valid();},element:function(element){element=this.clean(element);this.lastElement=element;this.prepareElement(element);this.currentElements=$(element);var result=this.check(element);if(result){delete this.invalid[element.name];}else{this.invalid[element.name]=true;}if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers);}this.showErrors();return result;},showErrors:function(errors){if(errors){$.extend(this.errorMap,errors);this.errorList=[];for(var name in errors){this.errorList.push({message:errors[name],element:this.findByName(name)[0]});}this.successList=$.grep(this.successList,function(element){return!(element.name in errors);});}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors();},resetForm:function(){if($.fn.resetForm)$(this.currentForm).resetForm();this.submitted={};this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass);},numberOfInvalids:function(){return this.objectLength(this.invalid);},objectLength:function(obj){var count=0;for(var i in obj)count++;return count;},hideErrors:function(){this.addWrapper(this.toHide).hide();},valid:function(){return this.size()==0;},size:function(){return this.errorList.length;},focusInvalid:function(){if(this.settings.focusInvalid){try{$(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin");}catch(e){}}},findLastActive:function(){var lastActive=this.lastActive;return lastActive&&$.grep(this.errorList,function(n){return n.element.name==lastActive.name;}).length==1&&lastActive;},elements:function(){var validator=this,rulesCache={};return $([]).add(this.currentForm.elements).filter(":input").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){!this.name&&validator.settings.debug&&window.console&&console.error("%o has no name assigned",this);if(this.name in rulesCache||!validator.objectLength($(this).rules()))return false;rulesCache[this.name]=true;return true;});},clean:function(selector){return $(selector)[0];},errors:function(){return $(this.settings.errorElement+"."+this.settings.errorClass,this.errorContext);},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=$([]);this.toHide=$([]);this.currentElements=$([]);},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers);},prepareElement:function(element){this.reset();this.toHide=this.errorsFor(element);},check:function(element){element=this.clean(element);if(this.checkable(element)){element=this.findByName(element.name)[0];}var rules=$(element).rules();var dependencyMismatch=false;for(method in rules){var rule={method:method,parameters:rules[method]};try{var result=$.validator.methods[method].call(this,element.value.replace(/\r/g,""),element,rule.parameters);if(result=="dependency-mismatch"){dependencyMismatch=true;continue;}dependencyMismatch=false;if(result=="pending"){this.toHide=this.toHide.not(this.errorsFor(element));return;}if(!result){this.formatAndAdd(element,rule);return false;}}catch(e){this.settings.debug&&window.console&&console.log("exception occured when checking element "+element.id
+", check the '"+rule.method+"' method",e);throw e;}}if(dependencyMismatch)return;if(this.objectLength(rules))this.successList.push(element);return true;},customMetaMessage:function(element,method){if(!$.metadata)return;var meta=this.settings.meta?$(element).metadata()[this.settings.meta]:$(element).metadata();return meta&&meta.messages&&meta.messages[method];},customMessage:function(name,method){var m=this.settings.messages[name];return m&&(m.constructor==String?m:m[method]);},findDefined:function(){for(var i=0;i<arguments.length;i++){if(arguments[i]!==undefined)return arguments[i];}return undefined;},defaultMessage:function(element,method){return this.findDefined(this.customMessage(element.name,method),this.customMetaMessage(element,method),!this.settings.ignoreTitle&&element.title||undefined,$.validator.messages[method],"<strong>Warning: No message defined for "+element.name+"</strong>");},formatAndAdd:function(element,rule){var message=this.defaultMessage(element,rule.method),theregex=/\$?\{(\d+)\}/g;if(typeof message=="function"){message=message.call(this,rule.parameters,element);}else if(theregex.test(message)){message=jQuery.format(message.replace(theregex,'{$1}'),rule.parameters);}this.errorList.push({message:message,element:element});this.errorMap[element.name]=message;this.submitted[element.name]=message;},addWrapper:function(toToggle){if(this.settings.wrapper)toToggle=toToggle.add(toToggle.parent(this.settings.wrapper));return toToggle;},defaultShowErrors:function(){for(var i=0;this.errorList[i];i++){var error=this.errorList[i];this.settings.highlight&&this.settings.highlight.call(this,error.element,this.settings.errorClass,this.settings.validClass);this.showLabel(error.element,error.message);}if(this.errorList.length){this.toShow=this.toShow.add(this.containers);}if(this.settings.success){for(var i=0;this.successList[i];i++){this.showLabel(this.successList[i]);}}if(this.settings.unhighlight){for(var i=0,elements=this.validElements();elements[i];i++){this.settings.unhighlight.call(this,elements[i],this.settings.errorClass,this.settings.validClass);}}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show();},validElements:function(){return this.currentElements.not(this.invalidElements());},invalidElements:function(){return $(this.errorList).map(function(){return this.element;});},showLabel:function(element,message){var label=this.errorsFor(element);if(label.length){label.removeClass().addClass(this.settings.errorClass);label.attr("generated")&&label.html(message);}else{label=$("<"+this.settings.errorElement+"/>").attr({"for":this.idOrName(element),generated:true}).addClass(this.settings.errorClass).html(message||"");if(this.settings.wrapper){label=label.hide().show().wrap("<"+this.settings.wrapper+"/>").parent();}if(!this.labelContainer.append(label).length)this.settings.errorPlacement?this.settings.errorPlacement(label,$(element)):label.insertAfter(element);}if(!message&&this.settings.success){label.text("");typeof this.settings.success=="string"?label.addClass(this.settings.success):this.settings.success(label);}this.toShow=this.toShow.add(label);},errorsFor:function(element){var name=this.idOrName(element);return this.errors().filter(function(){return $(this).attr('for')==name;});},idOrName:function(element){return this.groups[element.name]||(this.checkable(element)?element.name:element.id||element.name);},checkable:function(element){return/radio|checkbox/i.test(element.type);},findByName:function(name){var form=this.currentForm;return $(document.getElementsByName(name)).map(function(index,element){return element.form==form&&element.name==name&&element||null;});},getLength:function(value,element){switch(element.nodeName.toLowerCase()){case'select':return $("option:selected",element).length;case'input':if(this.checkable(element))return this.findByName(element.name).filter(':checked').length;}return value.length;},depend:function(param,element){return this.dependTypes[typeof param]?this.dependTypes[typeof param](param,element):true;},dependTypes:{"boolean":function(param,element){return param;},"string":function(param,element){return!!$(param,element.form).length;},"function":function(param,element){return param(element);}},optional:function(element){return!$.validator.methods.required.call(this,$.trim(element.value),element)&&"dependency-mismatch";},startRequest:function(element){if(!this.pending[element.name]){this.pendingRequest++;this.pending[element.name]=true;}},stopRequest:function(element,valid){this.pendingRequest--;if(this.pendingRequest<0)this.pendingRequest=0;delete this.pending[element.name];if(valid&&this.pendingRequest==0&&this.formSubmitted&&this.form()){$(this.currentForm).submit();this.formSubmitted=false;}else if(!valid&&this.pendingRequest==0&&this.formSubmitted){$(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false;}},previousValue:function(element){return $.data(element,"previousValue")||$.data(element,"previousValue",{old:null,valid:true,message:this.defaultMessage(element,"remote")});}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},dateDE:{dateDE:true},number:{number:true},numberDE:{numberDE:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(className,rules){className.constructor==String?this.classRuleSettings[className]=rules:$.extend(this.classRuleSettings,className);},classRules:function(element){var rules={};var classes=$(element).attr('class');classes&&$.each(classes.split(' '),function(){if(this in $.validator.classRuleSettings){$.extend(rules,$.validator.classRuleSettings[this]);}});return rules;},attributeRules:function(element){var rules={};var $element=$(element);for(method in $.validator.methods){var value=$element.attr(method);if(value){rules[method]=value;}}if(rules.maxlength&&/-1|2147483647|524288/.test(rules.maxlength)){delete rules.maxlength;}return rules;},metadataRules:function(element){if(!$.metadata)return{};var meta=$.data(element.form,'validator').settings.meta;return meta?$(element).metadata()[meta]:$(element).metadata();},staticRules:function(element){var rules={};var validator=$.data(element.form,'validator');if(validator.settings.rules){rules=$.validator.normalizeRule(validator.settings.rules[element.name])||{};}return rules;},normalizeRules:function(rules,element){$.each(rules,function(prop,val){if(val===false){delete rules[prop];return;}if(val.param||val.depends){var keepRule=true;switch(typeof val.depends){case"string":keepRule=!!$(val.depends,element.form).length;break;case"function":keepRule=val.depends.call(element,element);break;}if(keepRule){rules[prop]=val.param!==undefined?val.param:true;}else{delete rules[prop];}}});$.each(rules,function(rule,parameter){rules[rule]=$.isFunction(parameter)?parameter(element):parameter;});$.each(['minlength','maxlength','min','max'],function(){if(rules[this]){rules[this]=Number(rules[this]);}});$.each(['rangelength','range'],function(){if(rules[this]){rules[this]=[Number(rules[this][0]),Number(rules[this][1])];}});if($.validator.autoCreateRanges){if(rules.min&&rules.max){rules.range=[rules.min,rules.max];delete rules.min;delete rules.max;}if(rules.minlength&&rules.maxlength){rules.rangelength=[rules.minlength,rules.maxlength];delete rules.minlength;delete rules.maxlength;}}if(rules.messages){delete rules.messages;}return rules;},normalizeRule:function(data){if(typeof data=="string"){var transformed={};$.each(data.split(/\s/),function(){transformed[this]=true;});data=transformed;}return data;},addMethod:function(name,method,message){$.validator.methods[name]=method;$.validator.messages[name]=message!=undefined?message:$.validator.messages[name];if(method.length<3){$.validator.addClassRules(name,$.validator.normalizeRule(name));}},methods:{required:function(value,element,param){if(!this.depend(param,element))return"dependency-mismatch";switch(element.nodeName.toLowerCase()){case'select':var val=$(element).val();return val&&val.length>0;case'input':if(this.checkable(element))return this.getLength(value,element)>0;default:return $.trim(value).length>0;}},remote:function(value,element,param){if(this.optional(element))return"dependency-mismatch";var previous=this.previousValue(element);if(!this.settings.messages[element.name])this.settings.messages[element.name]={};previous.originalMessage=this.settings.messages[element.name].remote;this.settings.messages[element.name].remote=previous.message;param=typeof param=="string"&&{url:param}||param;if(previous.old!==value){previous.old=value;var validator=this;this.startRequest(element);var data={};data[element.name]=value;$.ajax($.extend(true,{url:param,mode:"abort",port:"validate"+element.name,dataType:"json",data:data,success:function(response){validator.settings.messages[element.name].remote=previous.originalMessage;var valid=response===true;if(valid){var submitted=validator.formSubmitted;validator.prepareElement(element);validator.formSubmitted=submitted;validator.successList.push(element);validator.showErrors();}else{var errors={};var message=(previous.message=response||validator.defaultMessage(element,"remote"));errors[element.name]=$.isFunction(message)?message(value):message;validator.showErrors(errors);}previous.valid=valid;validator.stopRequest(element,valid);}},param));return"pending";}else if(this.pending[element.name]){return"pending";}return previous.valid;},minlength:function(value,element,param){return this.optional(element)||this.getLength($.trim(value),element)>=param;},maxlength:function(value,element,param){return this.optional(element)||this.getLength($.trim(value),element)<=param;},rangelength:function(value,element,param){var length=this.getLength($.trim(value),element);return this.optional(element)||(length>=param[0]&&length<=param[1]);},min:function(value,element,param){return this.optional(element)||value>=param;},max:function(value,element,param){return this.optional(element)||value<=param;},range:function(value,element,param){return this.optional(element)||(value>=param[0]&&value<=param[1]);},email:function(value,element){return this.optional(element)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);},url:function(value,element){return this.optional(element)||/^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);},date:function(value,element){return this.optional(element)||!/Invalid|NaN/.test(new Date(value));},dateISO:function(value,element){return this.optional(element)||/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);},number:function(value,element){return this.optional(element)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);},digits:function(value,element){return this.optional(element)||/^\d+$/.test(value);},creditcard:function(value,element){if(this.optional(element))return"dependency-mismatch";if(/[^0-9-]+/.test(value))return false;var nCheck=0,nDigit=0,bEven=false;value=value.replace(/\D/g,"");for(var n=value.length-1;n>=0;n--){var cDigit=value.charAt(n);var nDigit=parseInt(cDigit,10);if(bEven){if((nDigit*=2)>9)nDigit-=9;}nCheck+=nDigit;bEven=!bEven;}return(nCheck%10)==0;},accept:function(value,element,param){param=typeof param=="string"?param.replace(/,/g,'|'):"png|jpe?g|gif";return this.optional(element)||value.match(new RegExp(".("+param+")$","i"));},equalTo:function(value,element,param){var target=$(param).unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){$(element).valid();});return value==target.val();}}});$.format=$.validator.format;})(jQuery);;(function($){var ajax=$.ajax;var pendingRequests={};$.ajax=function(settings){settings=$.extend(settings,$.extend({},$.ajaxSettings,settings));var port=settings.port;if(settings.mode=="abort"){if(pendingRequests[port]){pendingRequests[port].abort();}return(pendingRequests[port]=ajax.apply(this,arguments));}return ajax.apply(this,arguments);};})(jQuery);;(function($){if(!jQuery.event.special.focusin&&!jQuery.event.special.focusout&&document.addEventListener){$.each({focus:'focusin',blur:'focusout'},function(original,fix){$.event.special[fix]={setup:function(){this.addEventListener(original,handler,true);},teardown:function(){this.removeEventListener(original,handler,true);},handler:function(e){arguments[0]=$.event.fix(e);arguments[0].type=fix;return $.event.handle.apply(this,arguments);}};function handler(e){e=$.event.fix(e);e.type=fix;return $.event.handle.call(this,e);}});};$.extend($.fn,{validateDelegate:function(delegate,type,handler){return this.bind(type,function(event){var target=$(event.target);if(target.is(delegate)){return handler.apply(target,arguments);}});}});})(jQuery);


