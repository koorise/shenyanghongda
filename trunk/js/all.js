
/* ---------- DOM加载完毕 ---------- */
$(document).ready(function(){
	
/* ============================== 公共脚本 ============================== Begin */
	
	/* ---------- 去除虚线(部分元素) ---------- */
	$("#JS_thumbnailSlide li a").bind("focus",function(){
		if(this.blur){
			this.blur();
		};
	});
	
	
	/* 输入框点击去除默认文字 */
	var inputval_h=$(".normal_search input").val();
		$(".normal_search input").focus(function(){
			if($(this).val()==inputval_h){
				$(this).val("");
			}
		})
		.blur(function(){
			if($(this).val()==""){
				$(this).val(inputval_h);
			}
	});
		
	/* 侧边栏email处输入框点击去除默认文字 */
	var inputval_e=$(".email_search input").val();
		$(".email_search input").focus(function(){
			if($(this).val()==inputval_e){
				$(this).val("");
			}
		})
		.blur(function(){
			if($(this).val()==""){
				$(this).val(inputval_e);
			}
	});

		


	/* ---------- 表单验证 form validate ---------- */
	$("#form_validate").validate();			//默认表单验证
	
	
	
	/*------------------index 页面效果--------------------*/
	
	/*主导航点击后效果*/
	$(".nav_item .nav_target").click(function(){
		$(this).addClass("nav_target_current").parents(".nav_item").siblings(".nav_item").find(".nav_target").removeClass("nav_target_current");
	});
	
	/*主导航 二级菜单 hover 后效果*/
	$(".nav_sublist").each(function(index){
	//	switch(index)
//		{
//			case 0:$(this).css("width","450px"); break;
//			case 1:$(this).css("width","648px"); break;
//		}
		
			
		})
	$("#nav .nav_item").each(function(){$(this).hover(function(){
		 $(this).addClass("hover");		
	},function(){
		$(this).removeClass("hover");		
	});})
	
	/*主导航 三级菜单 hover 后效果*/
	$("#nav .nav_subitem").hover(function(){
		 $(this).addClass("nav_subitem_hover");
	},function(){
		$(this).removeClass("nav_subitem_hover");		
	});
	
						
	/* index页面的 hover 效果 */					
	$(".home_product_inner .pro_title").hover(function(){$(this).addClass("pro_title_hover");
						},function(){$(this).removeClass("pro_title_hover")
		});
	

	
	$(".normal_newsletter .btn_submit").hover(function(){$(this).addClass("btn_submit_hover");
							},function(){$(this).removeClass("btn_submit_hover")
		});
						
	/*category 页面 hover 效果*/
	$(".pro_slide .btn_more").hover(function(){$(this).addClass("btn_more_hover");
							},function(){$(this).removeClass("btn_more_hover")
		});
	/*category 页面 pagination 点击后效果*/	
	$(".pagination .numb").click(function(){
		$(this).addClass("numb_current").siblings(".numb").removeClass("numb_current");
	});
	
	
	
	
	
/* ============================== 公共脚本 ============================== End */
	
	/*侧边sidenav栏点击后效果*/	
	/*$(".normal_target").first().toggleClass("normal_target_selected");
	$(".normal_sublist").first().show();*/
	$(".normal_list .normal_item:first").find(".normal_sublist").show().end().find(".normal_target").addClass("normal_target_selected");
	$(".normal_target").hover(function(){
		$(this).addClass("normal_target_hover").parent(".normal_item").siblings(".normal_item").removeClass("normal_target_hover");
	},function(){
		$(this).removeClass("normal_target_hover");
	});
	$(".normal_target").click(function(){
		_this = $(this);
		if(_this.next(".normal_sublist").length > 0){		
			_this.addClass("normal_target_selected").next(".normal_sublist").slideToggle(0)
			.parent(".normal_item").siblings(".normal_item")
			.find(".normal_target").removeClass("normal_target_selected").end()
			.find(".normal_sublist").slideUp(0);
			return false;
		}else{
			_this.removeClass("normal_target_selected")
			.parent(".normal_item").siblings(".normal_item")
			.find(".normal_target_selected").removeClass("normal_target_selected").next(".normal_sublist").slideUp(0);
			
		};
	});
	
	
	$(".about_us_detail .pic li:even").addClass("even");
	
	
/* ============================== 首页 脚本 ============================== Begin */

	$("#banner .bannerImg li").addClass("bigimg");
	$("#banner .bigimg").banner_thaw({
		thumbObj:"#banner .slide_triggers li",
		thumbNowClass:"hover",
		changeTime:8000
	});

	//banner
	$("#subBanner .bannerImg li").addClass("bigimg");
	$("#subBanner .bigimg").banner_thaw({
		thumbObj:"#subBanner .slide_triggers li",
		thumbNowClass:"hover",
		changeTime:8000
	});


	/* ---------- 首页大图轮转 promo ---------- */
	$("#JS_promoContent img").promo({
		thumbObj:"#JS_promoTriggers li",
		thumbNowClass:"current",
		changeTime:5000
	});

	$(".index_cate").find("li:last").addClass("last");
	
	$("#indexProSlide").carousel({
		btnNext: ".index_pro .next",
		btnPrev: ".index_pro .prev",
		scrolls:1,
		auto:false,
		circular: false,
		visible:6
	});
	

	$(".pro_item").hover(function(){
		$(this).toggleClass("pro_item_hover");
	});


	$("#JS_promo").markSlider({
		progressNavHover:true,
		speed:3000,
		pause:4000
	});

	
	
		
/*-----------------------------------------------------------end**/
	
	
	

});
