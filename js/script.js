jQuery(document).ready(function () {
  /*-------------------- select --------------------*/
  $('.h_lang select').select2({
    minimumResultsForSearch: -1
  });
  $('.cabh_menu select').select2({
    minimumResultsForSearch: -1,
    placeholder: "ЕЩЕ",
  });
  $('.cabh_prof select').select2({
    minimumResultsForSearch: -1,
    placeholder: $('.cabh_prof select').attr('placeholder'),
  });
  $(function () {
    // bind change event to select
    $('.cab_header select').on('change', function () {
      var url = $(this).val(); // get selected value
      if (url) { // require a URL
        window.location = url; // redirect
      }
      return false;
    });
  });
  /*-------------------- modal --------------------*/
  $('.msb_login,.modal_login').on('click', function () {
    $('#login,.modal_bg').addClass('active')
    $('#registr,#forgot,#subscribe').removeClass('active')
  })
  $('.modal_registr,.way_item_reg').on('click', function () {
    $('#login').removeClass('active')
    $('.modal_bg,#registr').addClass('active')
  })
  $('.modal_forgot a').on('click', function () {
    $('#forgot').addClass('active')
    $('#login').removeClass('active')
  })
  $('.modal_pass-new').on('click', function () {
    $('#passinput').addClass('active')
    $('#forgot').removeClass('active')
  })
  $('.modal_subscribe').on('click', function () {
    $('#subscribe').addClass('active')
    $('#login').removeClass('active')
  })
  $('.modal_close').on('click', function () {
    $('.modal_form,.modal_bg').removeClass('active')
  })
  /*-------------------- faq --------------------*/
  $('.faq_title').on('click', function () {
    if ($(this).parent().hasClass('active')) {
      $(this).parent().removeClass('active').find('.faq_text').slideUp()
    } else {
      $('.faq_items').find('.faq_item').removeClass('active').find('.faq_text').slideUp()
      $(this).parent().addClass('active').find('.faq_text').slideDown()
    }
  })
  /*-------------------- graph --------------------*/
  new Chartist.Line('.side_graph', {
    labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    series: [[0, 10, 15, 10, , ,]],
  }, {
    low: 0,
    showArea: true,
    high: 50,
    showPoint: true,
    plugins: [
      Chartist.plugins.ctPointLabels({
        textAnchor: 'middle',
        labelInterpolationFnc: (value) => { if (typeof value === "undefined") return "0"; else return value; }
      })
    ]
  }
  );
  setTimeout(function () {
    $('.ct-series .ct-label').each(function () {
      if ($(this).text().trim() != "0") {
        $(this).prepend('+')
      }
    });
    today = new Date()
    dayIndex = today.getDay()
    if (dayIndex == 1) { $('.ct-series .ct-label:nth-child(4)').addClass('active') }
    if (dayIndex == 2) { $('.ct-series .ct-label:nth-child(6)').addClass('active') }
    if (dayIndex == 3) { $('.ct-series .ct-label:nth-child(8)').addClass('active') }
    if (dayIndex == 4) { $('.ct-series .ct-label:nth-child(10)').addClass('active') }
    if (dayIndex == 5) { $('.ct-series .ct-label:nth-child(12)').addClass('active') }
    if (dayIndex == 6) { $('.ct-series .ct-label:nth-child(14)').addClass('active') }
    if (dayIndex == 7) { $('.ct-series .ct-label:nth-child(16)').addClass('active') }
  }, 100);
  /*-------------------- cabinet_settings --------------------*/
  $('.cab_set_avatar p').on('click', function () {
    $(this).parent().find('input').click()
  })
  $('.cab_set_avatar input').change(function () {
    const file = this.files[0];
    console.log(file);
    if (file) {
      let reader = new FileReader();
      reader.onload = function (event) {
        console.log(event.target.result);
        $('.cab_set_avatar div:first-child').css('background-image', 'url(' + event.target.result + ')');
      }
      reader.readAsDataURL(file);
    }
  });
  /*-------------------- totop --------------------*/
  jQuery(window).scroll(function () { if (jQuery(this).scrollTop() > 0) { jQuery('.to_top a').css('opacity', '1'); } else { jQuery('#to_top').css('opacity', '0'); } });
  jQuery('.to_top a').click(function () { jQuery('body,html').animate({ scrollTop: 0 }, 500); return false; });
  /*-------------------- test --------------------*/
  $('.ptest_sound').on('click', function () {
    $(this).find('audio')[0].play();
  })
  //$('.ptest_step_1').show("slide", { direction: "right" }, 500);
  $('.ptest_next,.ptest_skip').on('click', function () {
    if ($(this).parent().parent().parent().parent().hasClass('ptest_1')) {
      $(this).parent().parent().parent().parent().find('.ptest_step_1').hide("slide", { direction: "left" }, 500);
      $(this).parent().parent().parent().parent().find('.ptest_step_2').show("slide", { direction: "right" }, 500);
      $(this).parent().parent().parent().parent().removeClass('ptest_1')
      $(this).parent().parent().parent().parent().addClass('ptest_2')
      $(this).parent().parent().parent().parent().find('.ptest_progress span span').css('width', '10%');
    } else
      if ($(this).parent().parent().parent().parent().hasClass('ptest_2')) {
        $(this).parent().parent().parent().parent().find('.ptest_step_2').hide("slide", { direction: "left" }, 500);
        $(this).parent().parent().parent().parent().find('.ptest_step_3').show("slide", { direction: "right" }, 500);
        $(this).parent().parent().parent().parent().removeClass('ptest_2')
        $(this).parent().parent().parent().parent().addClass('ptest_3')
        $(this).parent().parent().parent().parent().find('.ptest_progress span span').css('width', '25%');
        $('.ptest_bottom_left > div,.ptest_bottom_center > a,.ptest_bottom_right > div').hide();
        $('.ptest_check').css('display', 'flex').attr('disabled', true)
        $('.ptest_skip').css('display', 'flex')
      } else
        if ($(this).parent().parent().parent().parent().hasClass('ptest_3')) {
          $(this).parent().parent().parent().parent().find('.ptest_step_3').hide("slide", { direction: "left" }, 500);
          $(this).parent().parent().parent().parent().find('.ptest_step_4').show("slide", { direction: "right" }, 500);
          $(this).parent().parent().parent().parent().removeClass('ptest_3')
          $(this).parent().parent().parent().parent().addClass('ptest_4')
          $(this).parent().parent().parent().parent().find('.ptest_progress span span').css('width', '40%');
          $('.ptest_bottom_left > div,.ptest_bottom_center > a,.ptest_bottom_right > div').hide();
          $('.ptest_check').css('display', 'flex').attr('disabled', true)
          $('.ptest_skip').css('display', 'flex')
        } else
          if ($(this).parent().parent().parent().parent().hasClass('ptest_4')) {
            $(this).parent().parent().parent().parent().find('.ptest_step_4').hide("slide", { direction: "left" }, 500);
            $(this).parent().parent().parent().parent().find('.ptest_step_5').show("slide", { direction: "right" }, 500);
            $(this).parent().parent().parent().parent().removeClass('ptest_4')
            $(this).parent().parent().parent().parent().addClass('ptest_5')
            $(this).parent().parent().parent().parent().find('.ptest_progress span span').css('width', '55%');
            $('.ptest_bottom_left > div,.ptest_bottom_center > a,.ptest_bottom_right > div').hide();
            $('.ptest_check').css('display', 'flex').attr('disabled', true)
            $('.ptest_skip').css('display', 'flex')
          } else
            if ($(this).parent().parent().parent().parent().hasClass('ptest_5')) {
              $(this).parent().parent().parent().parent().find('.ptest_step_5').hide("slide", { direction: "left" }, 500);
              $(this).parent().parent().parent().parent().find('.ptest_step_6').show("slide", { direction: "right" }, 500);
              $(this).parent().parent().parent().parent().removeClass('ptest_5')
              $(this).parent().parent().parent().parent().addClass('ptest_6')
              $(this).parent().parent().parent().parent().find('.ptest_progress span span').css('width', '70%');
              $('.ptest_bottom_left > div,.ptest_bottom_center > a,.ptest_bottom_right > div').hide();
              $('.ptest_check').css('display', 'flex').attr('disabled', true)
              $('.ptest_nosound').css('display', 'flex')
            } else
              if ($(this).parent().parent().parent().parent().hasClass('ptest_6')) {
                $(this).parent().parent().parent().parent().find('.ptest_step_6').hide("slide", { direction: "left" }, 500);
                $(this).parent().parent().parent().parent().find('.ptest_step_7').show("slide", { direction: "right" }, 500);
                $(this).parent().parent().parent().parent().removeClass('ptest_6')
                $(this).parent().parent().parent().parent().addClass('ptest_7')
                $(this).parent().parent().parent().parent().find('.ptest_progress span span').css('width', '83%');
                $('.ptest_bottom_left > div,.ptest_bottom_center > a,.ptest_bottom_right > div').hide();
                $('.ptest_check').css('display', 'flex').attr('disabled', true)
                $('.ptest_skip').css('display', 'flex')
              } else
                if ($(this).parent().parent().parent().parent().hasClass('ptest_7')) {
                  $(this).parent().parent().parent().parent().find('.ptest_step_7').hide("slide", { direction: "left" }, 500);
                  $(this).parent().parent().parent().parent().find('.ptest_step_8').show("slide", { direction: "right" }, 500);
                  $(this).parent().parent().parent().parent().removeClass('ptest_7')
                  $(this).parent().parent().parent().parent().addClass('ptest_8')
                  $(this).parent().parent().parent().parent().find('.ptest_progress span span').css('width', '95%');
                  $('.ptest_bottom_left > div,.ptest_bottom_center > a,.ptest_bottom_right > div').hide();
                  $('.ptest_check').css('display', 'flex').attr('disabled', true)
                  $('.ptest_skip').css('display', 'flex')
                } else
                  if ($(this).parent().parent().parent().parent().hasClass('ptest_8')) {
                    $(this).parent().parent().parent().parent().find('.ptest_step_8').hide("slide", { direction: "left" }, 500);
                    $(this).parent().parent().parent().parent().find('.ptest_step_9').show("slide", { direction: "right" }, 500);
                    $(this).parent().parent().parent().parent().removeClass('ptest_8')
                    $(this).parent().parent().parent().parent().addClass('ptest_9')
                    $(this).parent().parent().parent().parent().find('.ptest_progress span span').css('width', '99%');
                    $('.ptest_bottom_left > div,.ptest_bottom_center > a,.ptest_bottom_right > div').hide();
                    $('.ptest_check').css('display', 'flex').attr('disabled', true)
                    $('.ptest_skip').css('display', 'flex')
                  } else
                    if ($(this).parent().parent().parent().parent().hasClass('ptest_9')) {
                      $(this).parent().parent().parent().parent().find('.ptest_step_9').hide("slide", { direction: "left" }, 500);
                      $(this).parent().parent().parent().parent().find('.ptest_step_last').show("slide", { direction: "right" }, 500);
                      $(this).parent().parent().parent().parent().removeClass('ptest_9')
                      $(this).parent().parent().parent().parent().addClass('ptest_step_last')
                      $(this).parent().parent().parent().parent().find('.ptest_progress span span').css('width', '100%');
                      $('.ptest_bottom_left > div,.ptest_bottom_center > a,.ptest_bottom_right > div').hide();
                      $('.ptest_next').css('display', 'flex')
                      $('.ptest_obzor').css('display', 'flex')
                      $('.ptest_top').css('height', '0')
                    }


  })
  /*-------------------- ptest_step_2 --------------------*/
  $('.ptest_step_2 .ptest_row_item').on('click', function () {
    $('.ptest_step_2 .ptest_row_item').removeClass('active')
    $(this).addClass('active');
    $('.ptest_check').removeAttr('disabled')
  })
  $('.ptest_check').on('click', function () {
    if ($(this).parent().parent().parent().parent().hasClass('ptest_2')) {
      if ($('.ptest_row_item.active').hasClass('true')) {
        $('.ptest_step_2 .ptest_row_item').removeClass('right').removeClass('error')
        $('.ptest_row_item.active.true').addClass('right')
        $('.ptest_skip').hide();
        $('.ptest_false').hide();
        $('.ptest_true').show();
        $('.ptest_bottom_center a').show()
        $('.ptest_check').hide()
        $('.ptest_next').css('display', 'flex')
      }
      if ($('.ptest_row_item.active').hasClass('false')) {
        $('.ptest_step_2 .ptest_row_item').removeClass('right').removeClass('error')
        $('.ptest_row_item.active.false').addClass('error')

        $('.ptest_check').hide()
        $('.ptest_next').css('display', 'flex')

        $('.ptest_skip').hide();
        $('.ptest_true').hide();
        $('.ptest_false').show();
        $('.ptest_bottom_center a').show()
      }
    }
  })
  /*-------------------- ptest_step_3 --------------------*/
  $('.ptest_step_3').on('click', function () {
    if ($('.ptest_step_3 .ptest_drag_word_check').html() == '') {
      $('.ptest_check').attr('disabled', true)
    } else {
      $('.ptest_check').removeAttr('disabled')
    }
  })
  $('.ptest_step_3').on('click', '.pdwi_s31', function () {
    if ($('.ptest_step_3 .ptest_drag_word_check').html() == '') {
      $('.ptest_step_3 .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    } else {
      $('.ptest_step_3 .pdwi_d31').html($(this).clone())
      $(this).remove()
    }
  })
  $('.ptest_step_3').on('click', '.pdwi_s32', function () {
    if ($('.ptest_step_3 .ptest_drag_word_check').html() == '') {
      $('.ptest_step_3 .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    } else {
      $('.ptest_step_3 .pdwi_d32').html($(this).clone())
      $(this).remove()
    }
  })
  $('.ptest_step_3').on('click', '.pdwi_s33', function () {
    if ($('.ptest_step_3 .ptest_drag_word_check').html() == '') {
      $('.ptest_step_3 .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    } else {
      $('.ptest_step_3 .pdwi_d33').html($(this).clone())
      $(this).remove()
    }
  })
  $('.ptest_check').on('click', function () {
    if ($(this).parent().parent().parent().parent().hasClass('ptest_3')) {
      if ($('.ptest_step_3 .ptest_drag_word_check .pdwi_s').hasClass('true')) {
        $('.ptest_step_3 .pdwi_s').removeClass('right').removeClass('error')
        $('.ptest_step_3 .pdwi_s.true').addClass('right')

        $('.ptest_skip').hide();
        $('.ptest_false').hide();
        $('.ptest_true').show();
        $('.ptest_bottom_center a').show()
        $('.ptest_check').hide()
        $('.ptest_next').css('display', 'flex')
      }
      if ($('.ptest_drag_word_check .pdwi_s').hasClass('false')) {
        $('.ptest_step_3 .pdwi_s').removeClass('right').removeClass('error')
        $('.ptest_step_3 .pdwi_s.false').addClass('error')

        $('.ptest_check').hide()
        $('.ptest_next').css('display', 'flex')

        $('.ptest_skip').hide();
        $('.ptest_true').hide();
        $('.ptest_false').show();
        $('.ptest_bottom_center a').show()
      }
    }
  })
  /*-------------------- ptest_step_4 --------------------*/
  $('.ptest_step_4').on('click', function () {
    if ($('.ptest_step_4 .ptest_drag_word_check').html() == '') {
      $('.ptest_check').attr('disabled', true)
    } else {
      $('.ptest_check').removeAttr('disabled')
    }
  })
  $('.ptest_step_4').on('click', '.pdwi_s41', function () {
    if ($('.ptest_step_4 .ptest_drag_word_check').html() == '') {
      $('.ptest_step_4 .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    } else {
      $('.ptest_step_4 .pdwi_d41').html($(this).clone())
      $(this).remove()
    }
  })
  $('.ptest_step_4').on('click', '.pdwi_s42', function () {
    if ($('.ptest_step_4 .ptest_drag_word_check').html() == '') {
      $('.ptest_step_4 .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    } else {
      $('.ptest_step_4 .pdwi_d42').html($(this).clone())
      $(this).remove()
    }
  })
  $('.ptest_step_4').on('click', '.pdwi_s43', function () {
    if ($('.ptest_step_4 .ptest_drag_word_check').html() == '') {
      $('.ptest_step_4 .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    } else {
      $('.ptest_step_4 .pdwi_d43').html($(this).clone())
      $(this).remove()
    }
  })
  $('.ptest_check').on('click', function () {
    if ($(this).parent().parent().parent().parent().hasClass('ptest_4')) {
      if ($('.ptest_step_4 .ptest_drag_word_check .pdwi_s').hasClass('true')) {
        $('.ptest_step_4 .pdwi_s').removeClass('right').removeClass('error')
        $('.ptest_step_4 .pdwi_s.true').addClass('right')
        $('.ptest_skip').hide();
        $('.ptest_false').hide();
        $('.ptest_true').show();
        $('.ptest_bottom_center a').show()
        $('.ptest_check').hide()
        $('.ptest_next').css('display', 'flex')
      }
      if ($('.ptest_drag_word_check .pdwi_s').hasClass('false')) {
        $('.ptest_step_4 .pdwi_s').removeClass('right').removeClass('error')
        $('.ptest_step_4 .pdwi_s.false').addClass('error')

        $('.ptest_check').hide()
        $('.ptest_next').css('display', 'flex')

        $('.ptest_skip').hide();
        $('.ptest_true').hide();
        $('.ptest_false').show();
        $('.ptest_bottom_center a').show()
      }
    }
  })
  /*-------------------- ptest_step_5 --------------------*/
  $('.ptest_step_5').on('click', function () {
    if ($('.ptest_step_5 .ptest_drag_word_check').html() == '') {
      $('.ptest_check').attr('disabled', true)
    } else {
      $('.ptest_check').removeAttr('disabled')
    }
  })
  $('.ptest_step_5').on('click', '.pdwi_s51', function () {
    $('.ptest_step_5 .ptest_drag_word_check').append($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_5 .ptest_drag_word_check').on('click', '.pdwi_s51', function () {
    $('.ptest_step_5 .pdwi_d51').html($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_5').on('click', '.pdwi_s52', function () {
    $('.ptest_step_5 .ptest_drag_word_check').append($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_5 .ptest_drag_word_check').on('click', '.pdwi_s52', function () {
    $('.ptest_step_5 .pdwi_d52').html($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_5').on('click', '.pdwi_s53', function () {
    $('.ptest_step_5 .ptest_drag_word_check').append($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_5 .ptest_drag_word_check').on('click', '.pdwi_s53', function () {
    $('.ptest_step_5 .pdwi_d53').html($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_5').on('click', '.pdwi_s54', function () {
    $('.ptest_step_5 .ptest_drag_word_check').append($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_5 .ptest_drag_word_check').on('click', '.pdwi_s54', function () {
    $('.ptest_step_5 .pdwi_d54').html($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_5').on('click', '.pdwi_s55', function () {
    $('.ptest_step_5 .ptest_drag_word_check').append($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_5 .ptest_drag_word_check').on('click', '.pdwi_s55', function () {
    $('.ptest_step_5 .pdwi_d55').html($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_5').on('click', '.pdwi_s56', function () {
    $('.ptest_step_5 .ptest_drag_word_check').append($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_5 .ptest_drag_word_check').on('click', '.pdwi_s56', function () {
    $('.ptest_step_5 .pdwi_d56').html($(this).clone())
    $(this).remove()
  })

  $('.ptest_check').on('click', function () {
    if ($(this).attr("disabled") == 'disabled') { } else {
      if ($(this).parent().parent().parent().parent().hasClass('ptest_5')) {
        $('.ptest_bottom_center a').show()
        if ($('.ptest_drag_word_check .pdwis5_1').index() == 0) {
          $('.ptest_drag_word_check .pdwis5_1').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis5_1').addClass('right')
        } else {
          $('.ptest_drag_word_check .pdwis5_1').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis5_1').addClass('error')
        }
        if ($('.ptest_drag_word_check .pdwis5_2').index() == 1) {
          $('.ptest_drag_word_check .pdwis5_2').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis5_2').addClass('right')
        } else {
          $('.ptest_drag_word_check .pdwis5_2').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis5_2').addClass('error')
        }
        if ($('.ptest_drag_word_check .pdwis5_3').index() == 2) {
          $('.ptest_drag_word_check .pdwis5_3').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis5_3').addClass('right')
        } else {
          $('.ptest_drag_word_check .pdwis5_3').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis5_3').addClass('error')
        }
        if ($('.ptest_drag_word_check .pdwis5_4').index() == 3) {
          $('.ptest_drag_word_check .pdwis5_4').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis5_4').addClass('right')
        } else {
          $('.ptest_drag_word_check .pdwis5_4').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis5_4').addClass('error')
        }
        if ($('.ptest_drag_word_check .pdwis5_5').index() == 4) {
          $('.ptest_drag_word_check .pdwis5_5').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis5_5').addClass('right')
        } else {
          $('.ptest_drag_word_check .pdwis5_5').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis5_5').addClass('error')
        }
        if ($('.ptest_drag_word_check .pdwis5_6').index() == 5) {
          $('.ptest_drag_word_check .pdwis5_6').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis5_6').addClass('right')
        } else {
          $('.ptest_drag_word_check .pdwis5_6').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis5_6').addClass('error')
        }
        if ($('.pdwi_s5').hasClass('error')) {
          $('.ptest_skip').hide();
          $('.ptest_false').show();

          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')

        } else {
          if (($('.ptest_drag_word_check .pdwi_s5').not('.error')) && ($('.ptest_step_5 .ptest_drag_word_check').children().length === 6)) {
            $('.ptest_false').hide();
            $('.ptest_true').show();
            $('.ptest_check').hide()
            $('.ptest_skip').hide();
            $('.ptest_next').css('display', 'flex')
          }
        }
      }
    }
  })
  /*-------------------- ptest_step_6 --------------------*/
  $('.ptest_step_6').on('click', function () {
    play('/sounds/click.mp3', '');
    if ($('.ptest_step_6 .ptest_drag_word_check').html() == '') {
      $('.ptest_check').attr('disabled', true)
    } else {
      $('.ptest_check').removeAttr('disabled')
    }
  })
  $('.ptest_step_6').on('click', '.pdwi_s61', function () {
    play('/sounds/click.mp3', '');
    if ($('.ptest_step_6 .ptest_drag_word_check').html() == '') {
      $('.ptest_step_6 .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    } else {
      $('.ptest_step_6 .pdwi_d61').html($(this).clone())
      $(this).remove()
    }
  })
  $('.ptest_step_6').on('click', '.pdwi_s62', function () {
    play('/sounds/click.mp3', '');
    if ($('.ptest_step_6 .ptest_drag_word_check').html() == '') {
      $('.ptest_step_6 .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    } else {
      $('.ptest_step_6 .pdwi_d62').html($(this).clone())
      $(this).remove()
    }
  })
  $('.ptest_step_6').on('click', '.pdwi_s63', function () {
    play('/sounds/click.mp3', '');
    if ($('.ptest_step_6 .ptest_drag_word_check').html() == '') {
      $('.ptest_step_6 .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    } else {
      $('.ptest_step_6 .pdwi_d63').html($(this).clone())
      $(this).remove()
    }
  })
  $('.ptest_step_6').on('click', '.pdwi_s64', function () {
    play('/sounds/click.mp3', '');
    if ($('.ptest_step_6 .ptest_drag_word_check').html() == '') {
      $('.ptest_step_6 .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    } else {
      $('.ptest_step_6 .pdwi_d64').html($(this).clone())
      $(this).remove()
    }
  })
  $('.ptest_step_6').on('click', '.pdwi_s65', function () {
    play('/sounds/click.mp3', '');
    if ($('.ptest_step_6 .ptest_drag_word_check').html() == '') {
      $('.ptest_step_6 .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    } else {
      $('.ptest_step_6 .pdwi_d65').html($(this).clone())
      $(this).remove()
    }
  })
  $('.ptest_step_6').on('click', '.pdwi_s66', function () {
    play('/sounds/click.mp3', '');
    if ($('.ptest_step_6 .ptest_drag_word_check').html() == '') {
      $('.ptest_step_6 .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    } else {
      $('.ptest_step_6 .pdwi_d66').html($(this).clone())
      $(this).remove()
    }
  })
  $('.ptest_step_6').on('click', '.pdwi_s67', function () {
    play('/sounds/click.mp3', '');
    if ($('.ptest_step_6 .ptest_drag_word_check').html() == '') {
      $('.ptest_step_6 .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    } else {
      $('.ptest_step_6 .pdwi_d67').html($(this).clone())
      $(this).remove()
    }
  })
  $('.ptest_step_6').on('click', '.pdwi_s68', function () {
    play('/sounds/click.mp3', '');
    if ($('.ptest_step_6 .ptest_drag_word_check').html() == '') {
      $('.ptest_step_6 .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    } else {
      $('.ptest_step_6 .pdwi_d68').html($(this).clone())
      $(this).remove()
    }
  })
  $('.ptest_step_6').on('click', '.pdwi_s69', function () {
    play('/sounds/click.mp3', '');
    if ($('.ptest_step_6 .ptest_drag_word_check').html() == '') {
      $('.ptest_step_6 .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    } else {
      $('.ptest_step_6 .pdwi_d69').html($(this).clone())
      $(this).remove()
    }
  })
  $('.ptest_step_6').on('click', '.pdwi_s610', function () {
    play('/sounds/click.mp3', '');
    if ($('.ptest_step_6 .ptest_drag_word_check').html() == '') {
      $('.ptest_step_6 .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    } else {
      $('.ptest_step_6 .pdwi_d610').html($(this).clone())
      $(this).remove()
    }
  })

  $('.ptest_check').on('click', function () {
    if ($(this).parent().parent().parent().parent().hasClass('ptest_6')) {
      if ($('.ptest_step_6 .ptest_drag_word_check .pdwi_s').hasClass('true')) {
        $('.ptest_step_6 .pdwi_s').removeClass('right').removeClass('error')
        $('.ptest_step_6 .pdwi_s.true').addClass('right')

        $('.ptest_skip').hide();
        $('.ptest_false').hide();
        $('.ptest_true').show();
        $('.ptest_bottom_center a').show()
        $('.ptest_check').hide()
        $('.ptest_next').css('display', 'flex')
        $('.ptest_nosound').hide()
      }
      if ($('.ptest_drag_word_check .pdwi_s').hasClass('false')) {
        $('.ptest_step_6 .pdwi_s').removeClass('right').removeClass('error')
        $('.ptest_step_6 .pdwi_s.false').addClass('error')

        $('.ptest_check').hide()
        $('.ptest_next').css('display', 'flex')

        $('.ptest_skip').hide();
        $('.ptest_true').hide();
        $('.ptest_false').show();
        $('.ptest_bottom_center a').show()
        $('.ptest_nosound').hide()

      }
    }
  })
  $('.ptest_nosound').on('click', function () {
    $(this).hide()
    $('.ptest_bosound_sk').css('display', 'flex')
    $('.ptest_drag_word_title_sound .ptest_sound').hide()
    $('.ptest_drag_word_title_sound span').show()
    $('.ptest_check').hide()
    $('.ptest_next').css('display', 'flex')
  })
  /*-------------------- ptest_step_7 --------------------*/
  $('.ptest_step_7 .ptest_list_item').on('click', function () {
    play('/sounds/click.mp3', '');
    $('.ptest_step_7 .ptest_list_item').removeClass('active')
    $(this).addClass('active');
    $('.ptest_check').removeAttr('disabled')
  })
  $('.ptest_check').on('click', function () {
    if ($(this).parent().parent().parent().parent().hasClass('ptest_7')) {
      if ($('.ptest_list_item.active').hasClass('true')) {
        $('.ptest_step_7 .ptest_list_item').removeClass('right').removeClass('error')
        $('.ptest_list_item.active.true').addClass('right')
        $('.ptest_skip').hide();
        $('.ptest_false').hide();
        $('.ptest_true').show();
        $('.ptest_bottom_center a').show()
        $('.ptest_check').hide()
        $('.ptest_next').css('display', 'flex')
      }
      if ($('.ptest_list_item.active').hasClass('false')) {
        $('.ptest_step_7 .ptest_list_item').removeClass('right').removeClass('error')
        $('.ptest_list_item.active.false').addClass('error')

        $('.ptest_check').hide()
        $('.ptest_next').css('display', 'flex')


        $('.ptest_skip').hide();
        $('.ptest_true').hide();
        $('.ptest_false').show();
        $('.ptest_bottom_center a').show()
      }
    }
  })
  /*-------------------- ptest_step_8 --------------------*/
  $('.ptest_step_8 .ptest_row_item_text').on('click', function () {
    $(this).toggleClass('active');
    $('.ptest_check').removeAttr('disabled')
  })
  $('.ptest_check').on('click', function () {
    if ($(this).parent().parent().parent().parent().hasClass('ptest_8')) {
      $(this)[0].click();
      if ($('.ptest_step_8 .ptest_row_item_text.right').length == 2) {

        $('.ptest_skip').hide();
        $('.ptest_false').hide();
        $('.ptest_true').show();
        $('.ptest_bottom_center a').show()
        $('.ptest_check').hide()
        $('.ptest_next').css('display', 'flex')
      } else
        if ($('.ptest_row_item_text').hasClass('active')) {

          $('.ptest_step_8 .ptest_row_item_text').removeClass('right').removeClass('error')
          $('.ptest_row_item_text.active.true').addClass('right')
          $('.ptest_row_item_text.active.false').addClass('error')

          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')


          $('.ptest_skip').hide();
          $('.ptest_true').hide();
          $('.ptest_false').show();
          $('.ptest_bottom_center a').show()
        }
    }
  })
  /*-------------------- ptest_step_9 --------------------*/
  $('.ptest_step_9').on('click', function () {
    if ($('.ptest_step_9 .ptest_drag_word_check').html() == '') {
      $('.ptest_check').attr('disabled', true)
    } else {
      $('.ptest_check').removeAttr('disabled')
    }
  })
  $('.ptest_step_9').on('click', '.pdwi_s91', function () {
    $('.ptest_step_9 .ptest_drag_word_check').append($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_9 .ptest_drag_word_check').on('click', '.pdwi_s91', function () {
    $('.ptest_step_9 .pdwi_d91').html($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_9').on('click', '.pdwi_s92', function () {
    $('.ptest_step_9 .ptest_drag_word_check').append($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_9 .ptest_drag_word_check').on('click', '.pdwi_s92', function () {
    $('.ptest_step_9 .pdwi_d92').html($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_9').on('click', '.pdwi_s93', function () {
    $('.ptest_step_9 .ptest_drag_word_check').append($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_9 .ptest_drag_word_check').on('click', '.pdwi_s93', function () {
    $('.ptest_step_9 .pdwi_d93').html($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_9').on('click', '.pdwi_s94', function () {
    $('.ptest_step_9 .ptest_drag_word_check').append($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_9 .ptest_drag_word_check').on('click', '.pdwi_s94', function () {
    $('.ptest_step_9 .pdwi_d94').html($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_9').on('click', '.pdwi_s95', function () {
    $('.ptest_step_9 .ptest_drag_word_check').append($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_9 .ptest_drag_word_check').on('click', '.pdwi_s95', function () {
    $('.ptest_step_9 .pdwi_d95').html($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_9').on('click', '.pdwi_s96', function () {
    $('.ptest_step_9 .ptest_drag_word_check').append($(this).clone())
    $(this).remove()
  })
  $('.ptest_step_9 .ptest_drag_word_check').on('click', '.pdwi_s96', function () {
    $('.ptest_step_9 .pdwi_d96').html($(this).clone())
    $(this).remove()
  })

  $('.ptest_check').on('click', function () {
    if ($(this).attr("disabled") == 'disabled') { } else {
      if ($(this).parent().parent().parent().parent().hasClass('ptest_9')) {
        $('.ptest_bottom_center a').show()
        if ($('.ptest_drag_word_check .pdwis9_1').index() == 0) {
          $('.ptest_drag_word_check .pdwis9_1').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis9_1').addClass('right')
        } else {
          $('.ptest_drag_word_check .pdwis9_1').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis9_1').addClass('error')
        }
        if ($('.ptest_drag_word_check .pdwis9_2').index() == 1) {
          $('.ptest_drag_word_check .pdwis9_2').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis9_2').addClass('right')
        } else {
          $('.ptest_drag_word_check .pdwis9_2').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis9_2').addClass('error')
        }
        if ($('.ptest_drag_word_check .pdwis9_3').index() == 2) {
          $('.ptest_drag_word_check .pdwis9_3').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis9_3').addClass('right')
        } else {
          $('.ptest_drag_word_check .pdwis9_3').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis9_3').addClass('error')
        }
        if ($('.ptest_drag_word_check .pdwis9_4').index() == 3) {
          $('.ptest_drag_word_check .pdwis9_4').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis9_4').addClass('right')
        } else {
          $('.ptest_drag_word_check .pdwis9_4').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis9_4').addClass('error')
        }
        if ($('.ptest_drag_word_check .pdwis9_5').index() == 4) {
          $('.ptest_drag_word_check .pdwis9_5').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis9_5').addClass('right')
        } else {
          $('.ptest_drag_word_check .pdwis9_5').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis9_5').addClass('error')
        }
        if ($('.ptest_drag_word_check .pdwis9_6').index() == 5) {
          $('.ptest_drag_word_check .pdwis9_6').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis9_6').addClass('right')
        } else {
          $('.ptest_drag_word_check .pdwis9_6').removeClass('error').removeClass('right')
          $('.ptest_drag_word_check .pdwis9_6').addClass('error')
        }
        if ($('.pdwi_s9').hasClass('error')) {
          $('.ptest_skip').hide();
          $('.ptest_false').show();

          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')

        } else {
          if (($('.ptest_drag_word_check .pdwi_s9').not('.error')) && ($('.ptest_step_9 .ptest_drag_word_check').children().length === 6)) {
            $('.ptest_false').hide();
            $('.ptest_true').show();
            $('.ptest_check').hide()
            $('.ptest_skip').hide();
            $('.ptest_next').css('display', 'flex')
          }
        }
      }
    }
  })

  /*-------------------- ptest_step_10 --------------------*/
  $('.ptest_step_10 .ptest_row_item_text').on('click', function () {
    $(this).toggleClass('active');
    $('.ptest_check').removeAttr('disabled')
  })
  $('.ptest_check').on('click', function () {
    if ($(this).parent().parent().parent().parent().hasClass('ptest_10')) {
      $(this)[0].click();
      if ($('.ptest_step_10 .ptest_row_item_text.right').length == 2) {

        $('.ptest_skip').hide();
        $('.ptest_false').hide();
        $('.ptest_true').show();
        $('.ptest_bottom_center a').show()
        $('.ptest_check').hide()
        $('.ptest_next').css('display', 'flex')
      } else
        if ($('.ptest_row_item_text').hasClass('active')) {

          $('.ptest_step_10 .ptest_row_item_text').removeClass('right').removeClass('error')
          $('.ptest_row_item_text.active.true').addClass('right')
          $('.ptest_row_item_text.active.false').addClass('error')

          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')


          $('.ptest_skip').hide();
          $('.ptest_true').hide();
          $('.ptest_false').show();
          $('.ptest_bottom_center a').show()
        }
    }
  })

  /*-------------------- ptest_step_last --------------------*/
  $(".ptest_obzor").click(function () {
    $(".ptest").removeClass('ptest_step_last')
    $(".ptest").addClass('ptest_step_result')
    //$(".ptest_in").css({"width":"1136px"})
    $(".ptest_progress").hide()
    $(".ptest_bottom").hide()
    $(".ptest_step_last").fadeOut()
    $(".ptest_step_result").fadeIn()
  })
  /*------------------------------------------------------*/

  $('#problem').on('click', function () {
    $.fancybox.close();
    $.fancybox.open({
      src: '#ok',
      type: 'inline',
      opts: {
        touch: false,
      },
    });
    setTimeout(function () {
      $.fancybox.close();
    }, 2000);
  })

  $(".modal_field_hint").hover(
    function () {
      $(this).siblings('.modal_field_text').fadeIn(100)
    },
    function () {
      $(this).siblings('.modal_field_text').fadeOut(100)
    }
  )

  $(".pdwti_bg_hint").hover(
    function () {
      $(this).addClass("active")
      //$(this).siblings('.pdwti_bg_text').fadeIn(100)
      $(this).siblings('.pdwti_bg_text').css('display', 'flex').css('left', '50%')
    },
    function () {
      $(this).removeClass("active")
      if ($(this).hasClass('enter') == false) {
        $(this).siblings('.pdwti_bg_text').fadeOut(100)
      }
    },
  )

  $(".pdwti_bg_hint").click(function () {
    if ($(this).hasClass('enter')) {
      $(this).removeClass('enter')
    } else {
      $(this).addClass('enter')
    }
  })

  $(".word_hint").hover(
    function () {
      $(this).addClass("active")
      $(this).children('span').fadeIn(100)
    },
    function () {
      $(this).removeClass("active")
      if ($(this).hasClass('enter') == false) {
        $(this).children('span').fadeOut(100)
      }
    }
  )

  $(".word_hint").click(function () {
    if ($(this).hasClass('enter')) {
      $(this).removeClass('enter')
    } else {
      $(this).addClass('enter')
    }
  })

  $(".ptest_step_result_list").on("click", ".ptest_step_result_list_item .ptest_step_result_list_item_inner", function () {
    if ($(this).hasClass('enter')) {
      $(this).removeClass('enter')
    } else {
      $(this).addClass('enter')
    }
  })

  $(".ptest_step_result_list").on("mouseenter", ".ptest_step_result_list_item .ptest_step_result_list_item_inner", function () {
    $(this).children(".ptest_step_result_list_item_inner_hint").fadeIn(100)
  });
  $(".ptest_step_result_list").on("mouseleave", ".ptest_step_result_list_item .ptest_step_result_list_item_inner", function () {
    if ($(this).hasClass('enter') == false) {
      $(this).children(".ptest_step_result_list_item_inner_hint").fadeOut(100)
    }
  });
})
