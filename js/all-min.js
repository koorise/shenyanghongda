$(document).ready(function(){$("#JS_thumbnailSlide li a").bind("focus",function(){if(this.blur){this.blur()}});var n=$(".normal_search input").val();$(".normal_search input").focus(function(){if($(this).val()==n){$(this).val("")}}).blur(function(){if($(this).val()==""){$(this).val(n)}});var d=$(".email_search input").val();$(".email_search input").focus(function(){if($(this).val()==d){$(this).val("")}}).blur(function(){if($(this).val()==""){$(this).val(d)}});$("span.remind_close").click(function(){$(this).parent("div.remind").hide()});$("a.lightbox").lightBox();$("#form_validate").validate();$(".nav_item .nav_target").click(function(){$(this).addClass("nav_target_current").parents(".nav_item").siblings(".nav_item").find(".nav_target").removeClass("nav_target_current")});$(".nav_sublist").each(function(o){switch(o){case 0:$(this).css("width","450px");break;case 1:$(this).css("width","648px");break}});$("#nav .nav_item").each(function(){$(this).hover(function(){$(this).addClass("hover").children(".nav_sublist").show(500)},function(){$(this).removeClass("hover").children(".nav_sublist").hide(100)})});$("#nav .nav_subitem").hover(function(){$(this).addClass("nav_subitem_hover").children(".nav_extralist").show(500)},function(){$(this).removeClass("nav_subitem_hover").children(".nav_extralist").hide(0)});$(".home_product_inner .pro_title").hover(function(){$(this).addClass("pro_title_hover")},function(){$(this).removeClass("pro_title_hover")});$(".column .btn_more").hover(function(){$(this).addClass("btn_more_hover")},function(){$(this).removeClass("btn_more_hover")});$(".normal_newsletter .btn_submit").hover(function(){$(this).addClass("btn_submit_hover")},function(){$(this).removeClass("btn_submit_hover")});$(".pro_slide .btn_more").hover(function(){$(this).addClass("btn_more_hover")},function(){$(this).removeClass("btn_more_hover")});$(".pagination .numb").click(function(){$(this).addClass("numb_current").siblings(".numb").removeClass("numb_current")});$(".product_btn .btn_make, .btn_make_inquiry").hover(function(){$(this).addClass("btn_make_hover")},function(){$(this).removeClass("btn_make_hover")});$(".product_btn .btn_add").hover(function(){$(this).addClass("btn_add_hover")},function(){$(this).removeClass("btn_add_hover")});$(".product_btn .btn_enter").hover(function(){$(this).addClass("btn_enter_hover")},function(){$(this).removeClass("btn_enter_hover")});$(".inquiry_form_fill .btn_submit").hover(function(){$(this).addClass("btn_submit_hover")},function(){$(this).removeClass("btn_submit_hover")});$(".btn_make_inquiry_all").hover(function(){$(this).addClass("btn_make_inquiry_all_hover")},function(){$(this).removeClass("btn_make_inquiry_all_hover")});$(".pro_sheet .pro_data_table tr").each(function(){$(this).find("td:last").css("border-right","none")});$(".pro_data_table tbody tr:odd td").css("background-color","#f1f1f1");$(".pro_data_table tbody tr:even td").css("background-color","#fff");$(".lens_table tbody tr:odd td").css("background-color","#f6f8f9");$(".lens_pack_table tbody tr:even td, .material_table tbody tr:even td, .random_table tbody tr:even td").css("background-color","#f6f8f9");$(".home_catalog a:last").css("background","none");$(".normal_target").hover(function(){$(this).addClass("normal_target_hover").parent(".normal_item").siblings(".normal_item").removeClass("normal_target_hover")},function(){$(this).removeClass("normal_target_hover")});$(".normal_target").click(function(){_this=$(this);if(_this.next(".normal_sublist").length>0){_this.addClass("normal_target_selected").next(".normal_sublist").slideToggle(0).parent(".normal_item").siblings(".normal_item").find(".normal_target").removeClass("normal_target_selected").end().find(".normal_sublist").slideUp(0);return false}else{_this.removeClass("normal_target_selected").parent(".normal_item").siblings(".normal_item").find(".normal_target_selected").removeClass("normal_target_selected").next(".normal_sublist").slideUp(0)}});$("#JS_promo").carousel({btnNext:"#JS_promoTriggers_next",btnPrev:"#JS_promoTriggers_prev",scrolls:1,auto:true,speed:1000,circular:false,visible:1});var j;$(".filter_select").hover(function(){_this=$(this);j=setTimeout(function(){_this.find(".select_list").show().parents(".filter_item").siblings().find(".select_list").hide()},100)},function(){_this=$(this);clearTimeout(j);_this.find(".select_list").hide()});$("#JS_zoom").zoom({xzoom:360,yzoom:360,offsetTop:0,offset:0,lens:1});$("#JS_thumbnailSlide").carousel({btnNext:"#JS_thumbnailNext",btnPrev:"#JS_thumbnailPrev",scrolls:1,circular:false,visible:4});var f=60;var g=360;$(".thumbnail ul li:first").addClass("hover");var m,i;$(".thumbnail ul li").hover(function(){var o=$(this);clearTimeout(i);m=setTimeout(function(){o.addClass("hover").siblings().removeClass("hover");$("#picture").attr("src",o.find("img").attr("src").replace(f+"x"+f,g+"x"+g));$("#picture").parent("a").attr("href",o.find("img").attr("src").replace("_"+f+"x"+f,""))},150)},function(){var o=$(this);clearTimeout(m)});$(".thumbnail ul li").click(function(){return false});$("#JS_btnSend").click(function(){offsetTop=$("#detail").offset().top;$("html,body").animate({scrollTop:offsetTop},300);$("#JS_sendInquiryTab").click();return false});$(".tips_inquiryadd .btn_close").click(function(){$(this).parent(".tips_inquiryadd").hide()});$(".JS_tabHolder > li").each(function(o){$(".JS_tabHolder > li:first").addClass("tab_item_current");$(".JS_tabContent .JS_tabPanel:first").show();$(this).click(function(){var p=this;$(p).addClass("tab_item_current").siblings().removeClass("tab_item_current");$(p).parents(".tab_holder").siblings(".JS_tabContent").find(".JS_tabPanel").eq(o).show().siblings().hide()})});$("#JS_inquiryInfoTitle").click(function(){$(this).toggleClass("inquiry_info_hide");$(this).parent(".hd").siblings(".bd").slideToggle(100);return false});$("#JS_btnMoreoption").click(function(){$(this).toggleClass("btn_moreoption_hide");if($(this).text()=="More options"){$(this).text("Hide options")}else{$(this).text("More options")}$("#JS_moreoptions").toggleClass("moreoptions");return false});var c=$(".message_length");c.keyup(function(){var o=$(this).val().length;if(o>-1&&o<=1000){var p=parseInt(1000-o)>"0"?parseInt(1000-o):"0";var q='<div class="message_length_tips"><em> '+p+"</em>characters left.</div>";$(".message_tips_wrap").html(q)}else{$(this).val($(this).val().substr(0,1000));$(".message_tips_wrap").html("<div class='message_length_tips'>0 characters left</div>")}});$(".faq_item_content").first().show();$(".faq_name").first().addClass("faq_name_selected");$(".faq_name").click(function(){$(this).toggleClass("faq_name_selected");$(this).parent().toggleClass("faq_item_selected");$(this).next(".faq_item_content").slideToggle(100).parent().siblings().find(".faq_item_content").slideUp(100);$(this).parent().siblings().removeClass("faq_item_selected").find(".faq_name").removeClass("faq_name_selected")});var h=$("#JS_imgshowThumbSlide .list_item");h.first().addClass("hover");if(h.length>0){$("#JS_imgshowThumbSlide").carousel({btnNext:"#JS_imgshowThumbNext",btnPrev:"#JS_imgshowThumbPrev",scrolls:1,vertical:false,circular:false,visible:3})}var e=70;var b=$("#JS_imgshowPic");var l=$("#JS_imgshowPicBox");var k="JS_imgshowPic";var a="JS_imgshowPicBox";b.loadthumb({src:l.find("img").attr("src"),imgId:k,parentId:a});h.click(function(){var o=$(this);o.addClass("hover").siblings().removeClass("hover");b.attr("src",o.find("img").attr("src").replace("_"+e+"x"+e,""));l.find("a").attr("href",o.find("img").attr("src").replace("_"+e+"x"+e,""));b.loadthumb({src:l.find("img").attr("src"),imgId:k,parentId:a});return false});$(".imgshow_thumb .cert_tips:first").show();$("#JS_imgshowThumbSlide li").each(function(o){$(this).click(function(){$(this).addClass("hover").siblings().removeClass("hover");$(this).parents(".imgshow_thumb").find(".cert_tips").eq(o).show().siblings().hide()})})});