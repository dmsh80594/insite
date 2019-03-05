$(document).ready(function(){
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

