$(document).ready(function(){
    new WOW().init();
	$('[script-role="scroll-menu"]').on('click', function(event) {
        event.preventDefault();
        id = $(this).attr('href');
        $("html, body").animate({
          scrollTop: $(id).offset().top + (-100)
        }, 500);
    });


    $('.menu-btn').on('click', function(){
        if ($(this).hasClass('active')) {
            $('.nav').hide();
        } else {
            // $('.nav-box').css('display','block');
            $('.nav').fadeIn(300);
            $('.nav > a').on('click', function() {
                if ($('.menu-btn').hasClass('active')){
                    $('.menu-btn').removeClass('active');
                }
                // $('.nav-box').hide();
                $('.nav').fadeOut(100);
            })
        };
       $(this).toggleClass('active');
    });

    replace_text();

    $('[script-role="change-lang"]').click(function(e) {
    	e.preventDefault();
    	let lang = $(this).attr('lang');
    	change_lang(lang);
        $('[script-role="change-lang"]').removeClass('active');
        $(this).addClass('active');
    })
    $('.main_logo').click(function(e) {
        e.preventDefault();
        $('body').css("background-color", "#161616")
        $('footer').css("background-color", "#161616")
        $('.language-box').children().css("color", "#fff")
        $('.nav').children().css("color", "#fff")
        $('.logo').attr("src", "assets/img/insite.png")
        $('.third_show').attr("src", "assets/img/4.png")
        $('.border').css("background-color", "rgba(255, 255, 255, 0.04)")
        $('.main_text_block > h1').css("color", "#fff")
        $('.dev').css("background-color", "#EEFF30")
        $('.shop').css("background-color", "#EEFF30")
        $('.about').css("background-image", "url(../assets/img/bg_b.png)")
        $('.about > h2').css("color", "#fff")
        $('.about_text_block > p').css("color", "rgba(255, 255, 255, 0.48)")
        $('.border_about').css("background-color", "rgba(255, 255, 255, 0.04)")
        $('.desc_item > h3').css("color", "#fff")
        $('.desc_item > p').css("color", "rgba(255, 255, 255, 0.48)")
        $('.projects > h2').css("color", "#fff")
        $('.projects_title_box > p').css("color", "rgba(255, 255, 255, 0.48)")
        $('.link').css("border-bottom", "2px solid rgba(255, 255, 255, 0.04)")
        $('.link > a').css("color", "#fff")
        $('.projects_item_box_first').css("background-image", "url(../assets/img/11.png)")
        $('.projects_item_box_sec').css("background-image", "url(../assets/img/22.png)")
        $('.projects_item_box_third').css("background-image", "url(../assets/img/33.png)")
        $('.projects_item_box_forth').css("background-image", "url(../assets/img/44.png)")
        $('.projects_item_box_fifth').css("background-image", "url(../assets/img/55.png)")
        $('.contacts > h2').css("color", "#fff")
        $('.soc_box_item > a').css("color", "rgba(255, 255, 255, 0.48)")
    })
    $('.link').click(function(e) {
        e.preventDefault();
        $('.absolute_photo').css("display", "block")
        var items = $('.absolute_photo img');
        items.css('opacity', 0);
        for (var i = 0; i < items.length; i++) {
          $(items[i]).delay(i * 500).animate({ opacity: 1 }, 500);
        }
    })
});

var change_lang = function(lang) {
	$('html').attr('lang', lang);
	replace_text();
}

var replace_text = function() {
	var lang = $('html').attr('lang');
	$(".replace-text").each(function() {
		let key = $(this).attr('text');
		$(this).html(localize[lang][key]);
	})
}

