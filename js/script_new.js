$(".cabinet_exam .cpai_open").click(function(){
    var lesson = $(this).attr("lesson")

    if($(this).hasClass("open_l")){
        $(this).removeClass('open_l')
        $("." + lesson).css({"display":"none"})
    }else{
        $(this).addClass('open_l')
        if($(window).width() > 576){
            $("." + lesson).css({"display":"flex"})
        }else{
            $("." + lesson).css({"display":"block"})
        }
    }
})
/*----------------------------------------------------------------*/
$('.msb_login,.modal_login').on('click',function() {
    $('#login,.modal_bg').addClass('active')
    $('#registr,#forgot').removeClass('active')
})

$('.modal_registr,.way_item_reg').on('click',function() {
    $('#login').removeClass('active')
    $('.modal_bg,#registr').addClass('active')
})
$('.modal_forgot a, .modal_forgot').on('click',function() {
    $('#forgot').addClass('active')
    $('#login').removeClass('active')
})
$('.modal_passinput').on('click',function() {
    $('#passinput').addClass('active')
    $('#login').removeClass('active')
})
$('.modal_success').on('click',function() {
    $('#success').addClass('active')
    $('#login').removeClass('active')
})
$('.modal_close').on('click',function() {
    $('.modal_form,.modal_bg').removeClass('active')
})
/*----------------------------------------------------------------*/
$('[popup-target]').click(function(e) {
    var el = $(this)
    var target = el.attr('popup-target')

    $('.overlay').fadeIn(200, function(){
        $('.popup.'+target).fadeIn(200)
        var top = document.documentElement.clientHeight / 2 - $('.popup.'+target).height() / 2 - 30
        var left = $('body').width() / 2 - $('.popup.'+target).width() / 2
        left = left - 20
        $('.popup.'+target).css('top', top).css('left', left)
    })


    return false
});

$('.overlay, .close').click(function(e) {
    var popup = $('.popup:visible')
    popup.fadeOut(200, function(){
        $('.overlay').fadeOut(200)
    })
    return false
})

function keyExit(e){
    if(e.keyCode == 27){

        var popup = $('.popup:visible')
        popup.fadeOut(200, function(){
            $('.overlay').fadeOut(200)
        })
    }
}

addEventListener("keydown", keyExit)

$("#popupinput, #popupinput2, #popupinput3, .popup_buttons_cancel").click(function(){
    var popup = $('.popup:visible')
    popup.fadeOut(200, function(){
        $('.overlay').fadeOut(200)
    })
})

$(".hint-btn-fix").click(function(){
    if($(this).hasClass('active')){
        $(this).removeClass('active')

        $(".hint-btn-fix span").text("Показать подсказки")
        $(".hint-overlay").hide()
        $(".hint-tt-frame").hide()

        $("*").removeClass("hint-target")
    }else{
        $(this).addClass('active')

        $(".hint-btn-fix span").text("Скрыть подсказки")
        $(".hint-overlay").show()
        $(".hint-tt-frame1").show()

        $(".cab_home_title_text").addClass("hint-target")
    }
})

$(".hint-tt-frame1 a").click(function(){
    $(".cab_home_title_text").removeClass("hint-target")
    $(".hint-tt-frame1").hide()

    $(".cab_home_title_cat_frame2").addClass("hint-target")
    $(".hint-tt-frame2").show()
})

$(".hint-tt-frame2 a").click(function(){
    $(".cab_home_title_cat_frame2").removeClass("hint-target")
    $(".hint-tt-frame2").hide()

    $(".cab_home_title_cat_frame3").addClass("hint-target")
    $(".hint-tt-frame3").show()
})

$(".hint-tt-frame3 a").click(function(){
    $(".cab_home_title_cat_frame3").removeClass("hint-target")
    $(".hint-tt-frame3").hide()

    $(".side_progress").addClass("hint-target")
    $(".hint-tt-frame4").show()
})

$(".hint-tt-frame4 a").click(function(){
    $(".side_progress").removeClass("hint-target")
    $(".hint-tt-frame4").hide()

    $(".cabh_time").addClass("hint-target")
    $(".hint-tt-frame5").show()
})

$(".hint-tt-frame5 a").click(function(){
    $(".cabh_time").removeClass("hint-target")
    $(".hint-tt-frame5").hide()

    $(".cabh_mon").addClass("hint-target")
    $(".hint-tt-frame6").show()
})

$(".hint-tt-frame6 a").click(function(){
    $(".cabh_mon").removeClass("hint-target")
    $(".hint-tt-frame6").hide()

    $(".cabh_left_magazin").addClass("hint-target")
    $(".hint-tt-frame7").show()
})

$(".hint-tt-frame7 a").click(function(){
    $(".cabh_left_magazin").removeClass("hint-target")
    $(".hint-tt-frame7").hide()

    $(".cabh_prof").addClass("hint-target")
    $(".hint-tt-frame8").show()
})

$(".hint-tt-frame8 a").click(function(){
    $(".cabh_prof").removeClass("hint-target")
    $(".hint-tt-frame8").hide()

    $(".step_okey").addClass("hint-target")
    $(".hint-tt-frame9").show()
})

$(".hint-tt-frame9 a").click(function(){
    $(".step_okey").removeClass("hint-target")
    $(".hint-tt-frame9").hide()

    $(".cab_home_title_text").addClass("hint-target")
    $(".hint-tt-frame1").show()
})