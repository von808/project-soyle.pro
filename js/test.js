jQuery(document).ready(function () {

  $('.ptest_current_step_1').show("slide", { direction: "right" }, 500);
  $('.ptest_skip').css('display', 'flex');
  if ($('.ptest_current_step_1').attr('ptest_num') == '1') {
    $('.ptest_next').css('display', 'flex');
    $('.ptest_check').css('display', 'none').attr('disabled', true);
  } else {
    $('.ptest_next').css('display', 'none');
    $('.ptest_check').css('display', 'flex').attr('disabled', true);
  }

  $('.ptest_next,.ptest_skip,.ptest_check').off('click');
  $('.ptest_step_4').off('click');

  $('#problem').off('click');
  $('.theory_link').show();

  let ptestStepResultListItem = $('.ptest_step_result_list_item');

  function addResultItem(right, task, answer, rightAnswer) {
    const item = ptestStepResultListItem.clone();
    item.find('.ptest_step_result_list_item_inner_span').html(task);
    item.find('.ptest_step_result_list_item_inner_hint .answer span').html(answer);
    item.find('.ptest_step_result_list_item_inner_hint .right_answer span').html(rightAnswer);
    if (right === true) {
      item.find('.result_img_err').hide();
    } else {
      item.find('.result_img_ok').hide();
    }
    $('.ptest_step_result_list').append(item);
    item.show();
  }

  let currentStep = 1;
  let rightCount = 0;
  let skipClick = false;

  $('.ptest_next,.ptest_skip').on('click', function (e) {
    if (skipClick === true) {
      return false;
    }
    play('/sounds/click.mp3', '');
    skipClick = true;
    if ($('body .ptest').hasClass('ptest_step_last')) {
      document.location.href = $('body .ptest').attr('index-url');
      setTimeout(function () {
        skipClick = false;
      }, 1000);
      return false;
    }

    const testKind = $(this).parent().parent().parent().parent()[0].className.substr(12);
    const prevStep = currentStep;
    currentStep++;

    const prevTest = $(this).parent().parent().parent().parent().find('.ptest_current_step_' + prevStep);
    const currentTest = $(this).parent().parent().parent().parent().find('.ptest_current_step_' + currentStep);

    if ($('.ptest_false').is(':visible') === false) {
      $.get('/ru/lesson/finish-task/' + prevTest.attr('st'));
    }

    const count = $('.ptest_psteps.ptest_in').children().length - 1;
    $(this).parent().parent().parent().parent().find('.ptest_progress span span').css('width', ((currentStep / count) * 100) + '%');

    if (currentStep >= count) {
      if ($('.ptest_psteps.ptest_in').attr('test') === '1') {
        document.location.href = $('.ptest_psteps.ptest_in').attr('end-url') + '/' + rightCount;
        setTimeout(function () {
          skipClick = false;
        }, 1000);
        return false;
      }

      $('.theory_link').css({ 'cssText': 'display: none!important' });

      prevTest.hide("slide", { direction: "left" }, 500);
      $(this).parent().parent().parent().parent().removeClass('ptest_' + prevTest.attr('ptest_num'));
      $('.ptest_psteps .ptest_step_last').show("slide", { direction: "right" }, 500);
      $(this).parent().parent().parent().parent().addClass('ptest_step_last');
      $(this).parent().parent().parent().parent().find('.ptest_progress span span').css('width', '100%');
      $('.ptest_bottom_left > div,.ptest_bottom_center > a,.ptest_bottom_right > div').hide();
      $('.ptest_next').css('display', 'flex');
      $('.ptest_obzor').css('display', 'flex');
      $('.ptest_top').css('height', '0');
      $('.ptest_step_last .ptest_last_txt span .result').html('+' + rightCount);

      let level = 'A1, A2';
      if (rightCount <= 8) {
        level = 'A1, A2';
      } else if (rightCount <= 16) {
        level = 'B1, B2';
      } else if (rightCount > 16) {
        level = 'C1, C2';
      }

      if ($('.ptest_psteps.ptest_in').attr('test') === '1') {
        $('.ptest_step_last .ptest_last_title.target').hide();
        $('.ptest_step_last .ptest_last_title.lesson').hide();
        $('.ptest_step_last .ptest_last_title.test').show().html('Ваш уровень ' + level);
        $('.ptest_step_last .ptest_last_txt.lesson').hide();
        $('.ptest_step_last .ptest_last_txt.test').show();
      } else {
        $('.ptest_step_last .ptest_last_title.target').show();
        $('.ptest_step_last .ptest_last_title.lesson').hide();
        $('.ptest_step_last .ptest_last_title.test').hide();
        $('.ptest_step_last .ptest_last_txt.lesson').show();
        $('.ptest_step_last .ptest_last_txt.test').hide();
      }
      setTimeout(function () {
        skipClick = false;
      }, 1000);
      return false;
    }

    $('.ptest_step_6 .ptest_drag_word_check').html('');

    prevTest.hide("slide", { direction: "left" }, 500);
    currentTest.show("slide", { direction: "right" }, 500);

    $(this).parent().parent().parent().parent().removeClass('ptest_' + prevTest.attr('ptest_num'));
    $(this).parent().parent().parent().parent().addClass('ptest_' + currentTest.attr('ptest_num'));

    switch (testKind) {
      case '1':
        rightCount++;
        break;
      case '8':
        rightCount++;
        break;
    }

    $('.ptest_bottom_left > div,.ptest_bottom_center > a,.ptest_bottom_right > div').hide();

    if (currentTest.hasClass('ptest_kind_1')) {
      $('.ptest_next').css('display', 'flex');
      $('.ptest_check').hide();
      $('.ptest_skip').hide();
    } if (currentTest.hasClass('ptest_kind_8')) {
      $('.ptest_next').css('display', 'flex');
      $('.ptest_check').hide();
      $('.ptest_skip').css('display', 'flex');
    } else {
      $('.ptest_check').css('display', 'flex').attr('disabled', true);
      $('.ptest_next').css('display', 'none');
      $('.ptest_skip').css('display', 'flex');
    }

    setTimeout(function () {
      skipClick = false;
    }, 1000);
    return false;
  })

  $('.ptest_check').on('click', function () {
    play('/sounds/click.mp3', '');
    const testKind = $(this).parent().parent().parent().parent()[0].className.substr(12);
    switch (testKind) {
      case '2':
        if ($('.ptest_current_step_' + currentStep + ' .ptest_row .ptest_row_item.active').hasClass('true')) {
          $('.ptest_current_step_' + currentStep + ' .ptest_row .ptest_row_item.active').removeClass('right').removeClass('error')
          $('.ptest_current_step_' + currentStep + ' .ptest_row .ptest_row_item.active').addClass('right')
          $('.ptest_skip').hide();
          $('.ptest_false').hide();
          $('.ptest_true').show();
          $('.ptest_bottom_center a').show()
          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex');
          rightCount++;
          play('/sounds/right.mp3', '');
          addResultItem(true, $('.ptest_current_step_' + currentStep + ' .ptest_title').html(), $('.ptest_current_step_' + currentStep + ' .ptest_row .ptest_row_item.active p').html(), $('.ptest_current_step_' + currentStep + ' .ptest_row .ptest_row_item.active p').html());
        }
        if ($('.ptest_current_step_' + currentStep + ' .ptest_row .ptest_row_item.active').hasClass('false')) {
          $('.ptest_current_step_' + currentStep + ' .ptest_row .ptest_row_item.active').removeClass('right').removeClass('error')
          $('.ptest_current_step_' + currentStep + ' .ptest_row .ptest_row_item.active').addClass('error')

          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')

          $('.ptest_skip').hide();
          $('.ptest_true').hide();
          $('.ptest_false span span').html($('.ptest_current_step_' + currentStep + ' .ptest_row .ptest_row_item.true p').html());
          $('.ptest_false').show();
          $('.ptest_bottom_center a').show();
          play('/sounds/wrong.mp3', '');
          addResultItem(false, $('.ptest_current_step_' + currentStep + ' .ptest_title').html(), $('.ptest_current_step_' + currentStep + ' .ptest_row .ptest_row_item.active p').html(), $('.ptest_current_step_' + currentStep + ' .ptest_row .ptest_row_item.true p').html());
        }
        break;
      case '3':
        if ($('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check span').hasClass('true')) {
          $('.ptest_current_step_' + currentStep + ' .ptest_drag_word .ptest_drag_word_check span').removeClass('right').removeClass('error')
          $('.ptest_current_step_' + currentStep + ' .ptest_drag_word .ptest_drag_word_check span').addClass('right')
          $('.ptest_skip').hide();
          $('.ptest_false').hide();
          $('.ptest_true').show();
          $('.ptest_bottom_center a').show()
          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')
          rightCount++;
          play('/sounds/right.mp3', '');
          addResultItem(true, $('.ptest_current_step_' + currentStep + ' .ptest_title').html() + ' ' + $('.ptest_current_step_' + currentStep + ' .ptest_drag_word .ptest_drag_word_title').text(), $('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check span').html(), $('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check span').html());
        }
        if ($('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check span').hasClass('false')) {
          $('.ptest_current_step_' + currentStep + ' .ptest_drag_word .ptest_drag_word_check span').removeClass('right').removeClass('error')
          $('.ptest_current_step_' + currentStep + ' .ptest_drag_word .ptest_drag_word_check span').addClass('error')

          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')

          $('.ptest_skip').hide();
          $('.ptest_true').hide();
          $('.ptest_false span span').html($('.ptest_current_step_' + currentStep + ' .ptest_drag_word_item span.true').html());
          $('.ptest_false').show();
          $('.ptest_bottom_center a').show();
          play('/sounds/wrong.mp3', '');
          addResultItem(false, $('.ptest_current_step_' + currentStep + ' .ptest_title').html() + ' ' + $('.ptest_current_step_' + currentStep + ' .ptest_drag_word .ptest_drag_word_title').text(), $('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check span').html(), $('.ptest_current_step_' + currentStep + ' .ptest_drag_word_item span.true').html());
        }
        break;
      case '4':
        let check = true;
        let answer = '';
        $('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check span').each((index, element) => {
          if (check === true) {
            answer += element.innerHTML + ' ';
            const order = parseInt(element.getAttribute("order"));
            if (order == 0 || order != index + 1) {
              check = false;
            }
          }
        })
        if (answer.trim() !== $('.ptest_current_step_' + currentStep + ' .ptest_drag_word_list').attr('right').trim()) {
          check = false;
        }
        if (check === true) {
          $('.ptest_current_step_' + currentStep + ' .ptest_drag_word .ptest_drag_word_check span').removeClass('right').removeClass('error')
          $('.ptest_current_step_' + currentStep + ' .ptest_drag_word .ptest_drag_word_check span').addClass('right')
          $('.ptest_skip').hide();
          $('.ptest_false').hide();
          $('.ptest_true').show();
          $('.ptest_bottom_center a').show()
          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')
          rightCount++;
          play('/sounds/right.mp3', '');
          addResultItem(true, $('.ptest_current_step_' + currentStep + ' .ptest_title').html() + ' ' + $('.ptest_current_step_' + currentStep + ' .ptest_drag_word .ptest_drag_word_title .pdwti_bg').text(), answer, $('.ptest_current_step_' + currentStep + ' .ptest_drag_word_list').attr('right'));
        }
        if (check === false) {
          $('.ptest_current_step_' + currentStep + ' .ptest_drag_word .ptest_drag_word_check span').removeClass('right').removeClass('error')
          $('.ptest_current_step_' + currentStep + ' .ptest_drag_word .ptest_drag_word_check span').addClass('error')

          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')

          $('.ptest_skip').hide();
          $('.ptest_true').hide();
          $('.ptest_false span span').html($('.ptest_current_step_' + currentStep + ' .ptest_drag_word_list').attr('right'));
          $('.ptest_false').show();
          $('.ptest_bottom_center a').show();
          play('/sounds/wrong.mp3', '');
          addResultItem(false, $('.ptest_current_step_' + currentStep + ' .ptest_title').html() + ' ' + $('.ptest_current_step_' + currentStep + ' .ptest_drag_word .ptest_drag_word_title .pdwti_bg').text(), answer, $('.ptest_current_step_' + currentStep + ' .ptest_drag_word_list').attr('right'));
        }
        break;
      case '6':
        if ($('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check span').hasClass('true')) {
          $('.ptest_current_step_' + currentStep + ' .ptest_drag_word .ptest_drag_word_check span').removeClass('right').removeClass('error')
          $('.ptest_current_step_' + currentStep + ' .ptest_drag_word .ptest_drag_word_check span').addClass('right')
          $('.ptest_skip').hide();
          $('.ptest_false').hide();
          $('.ptest_true').show();
          $('.ptest_bottom_center a').show()
          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')
          rightCount++;
          play('/sounds/right.mp3', '');
          addResultItem(true, $('.ptest_current_step_' + currentStep + ' .ptest_title').html(), $('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check span').html(), $('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check span').html());
        }
        if ($('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check span').hasClass('false')) {
          $('.ptest_current_step_' + currentStep + ' .ptest_drag_word .ptest_drag_word_check span').removeClass('right').removeClass('error')
          $('.ptest_current_step_' + currentStep + ' .ptest_drag_word .ptest_drag_word_check span').addClass('error')

          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')

          $('.ptest_skip').hide();
          $('.ptest_true').hide();
          $('.ptest_false span span').html($('.ptest_current_step_' + currentStep + ' .ptest_drag_word_item span.true').html());
          $('.ptest_false').show();
          $('.ptest_bottom_center a').show();
          play('/sounds/wrong.mp3', '');
          addResultItem(false, $('.ptest_current_step_' + currentStep + ' .ptest_title').html(), $('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check span').html(), $('.ptest_current_step_' + currentStep + ' .ptest_drag_word_item span.true').html());
        }
        break;
      case '7':
        if ($('.ptest_current_step_' + currentStep + ' .ptest_list_item.active').hasClass('true')) {
          $('.ptest_current_step_' + currentStep + ' .ptest_list_item.active').removeClass('right').removeClass('error')
          $('.ptest_current_step_' + currentStep + ' .ptest_list_item.active').addClass('right')
          $('.ptest_skip').hide();
          $('.ptest_false').hide();
          $('.ptest_true').show();
          $('.ptest_bottom_center a').show()
          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')
          rightCount++;
          play('/sounds/right.mp3', '');
          addResultItem(true, $('.ptest_current_step_' + currentStep + ' .ptest_title').html(), $('.ptest_current_step_' + currentStep + ' .ptest_list_item.active').html(), $('.ptest_current_step_' + currentStep + ' .ptest_list_item.true').html());
        }
        if ($('.ptest_current_step_' + currentStep + ' .ptest_list_item.active').hasClass('false')) {
          $('.ptest_current_step_' + currentStep + ' .ptest_list_item.active').removeClass('right').removeClass('error')
          $('.ptest_current_step_' + currentStep + ' .ptest_list_item.active').addClass('error')

          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')

          $('.ptest_skip').hide();
          $('.ptest_true').hide();
          $('.ptest_false span span').html($('.ptest_current_step_' + currentStep + ' .ptest_list_item.true').html());
          $('.ptest_false').show();
          $('.ptest_bottom_center a').show();
          play('/sounds/wrong.mp3', '');
          addResultItem(false, $('.ptest_current_step_' + currentStep + ' .ptest_title').html(), $('.ptest_current_step_' + currentStep + ' .ptest_list_item.active').html(), $('.ptest_current_step_' + currentStep + ' .ptest_list_item.true').html());
        }
        break;
      case '8':
        $('.ptest_next').css('display', 'flex');
        $('.ptest_check').hide();
        $('.ptest_skip').css('display', 'flex');
        break;
      case '9':
        let textarea = $('.ptest_current_step_' + currentStep + ' .ptest_step_var1 textarea');
        if (textarea.length === 0) {
          textarea = $('.ptest_current_step_' + currentStep + ' .ptest_step_var3 textarea');
        }
        if (filterText(textarea.val()).toLowerCase() === filterText(textarea.attr('right')).toLowerCase()) {
          $('.ptest_skip').hide();
          $('.ptest_false').hide();
          $('.ptest_true').show();
          $('.ptest_bottom_center a').show()
          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')
          rightCount++;
          play('/sounds/right.mp3', '');
          addResultItem(true, $('.ptest_current_step_' + currentStep + ' .ptest_title').html(), $('.ptest_current_step_' + currentStep + ' .ptest_list_item.active').html(), $('.ptest_current_step_' + currentStep + ' .ptest_list_item.true').html());
        }
        if (filterText(textarea.val()).toLowerCase() !== filterText(textarea.attr('right')).toLowerCase()) {
          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')

          $('.ptest_skip').hide();
          $('.ptest_true').hide();
          $('.ptest_false span span').html(textarea.attr('right'));
          $('.ptest_false').show();
          $('.ptest_bottom_center a').show();
          play('/sounds/wrong.mp3', '');
          addResultItem(false, $('.ptest_current_step_' + currentStep + ' .ptest_title').html(), $('.ptest_current_step_' + currentStep + ' .ptest_list_item.active').html(), $('.ptest_current_step_' + currentStep + ' .ptest_list_item.true').html());
        }
        break;
      case '10':
        let input = $('.ptest_current_step_' + currentStep + ' .ptest_step_var2_block_word input');
        if (filterText(input.val()).toLowerCase() === filterText(input.attr('right')).toLowerCase()) {
          $('.ptest_skip').hide();
          $('.ptest_false').hide();
          $('.ptest_true').show();
          $('.ptest_bottom_center a').show()
          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')
          rightCount++;
          play('/sounds/right.mp3', '');
          addResultItem(true, $('.ptest_current_step_' + currentStep + ' .ptest_title').html(), $('.ptest_current_step_' + currentStep + ' .ptest_list_item.active').html(), $('.ptest_current_step_' + currentStep + ' .ptest_list_item.true').html());
        }
        if (filterText(input.val()).toLowerCase() !== filterText(input.attr('right')).toLowerCase()) {
          $('.ptest_check').hide()
          $('.ptest_next').css('display', 'flex')

          $('.ptest_skip').hide();
          $('.ptest_true').hide();
          $('.ptest_false span span').html(input.attr('right'));
          $('.ptest_false').show();
          $('.ptest_bottom_center a').show();
          play('/sounds/wrong.mp3', '');
          addResultItem(false, $('.ptest_current_step_' + currentStep + ' .ptest_title').html(), $('.ptest_current_step_' + currentStep + ' .ptest_list_item.active').html(), $('.ptest_current_step_' + currentStep + ' .ptest_list_item.true').html());
        }
        break;
    }
    return false;
  })

  function filterText(s) {
    return s.replaceAll(/[.,%;:!?]/g, "")
  }

  function checkTrueFalseResultVisible() {
    return $('.ptest_true').is(':visible') | $('.ptest_false').is(':visible');
  }

  // Kind == 3
  $('.ptest_kind_3 .ptest_drag_word .ptest_drag_word_check').on('click', 'span', function () {
    play('/sounds/click.mp3', '');
    if (checkTrueFalseResultVisible()) return false;
    $(this).parent().parent().parent().find('*[class*="pdwi_d4"]:empty').html($(this).clone())
    $(this).remove()

    if ($('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check').html() == '') {
      $('.ptest_check').attr('disabled', true)
    } else {
      $('.ptest_check').removeAttr('disabled')
    }
  })
  $('.ptest_kind_3 .ptest_drag_word_list .ptest_drag_word_item').on('click', '*[class*="pdwi_s4"]', function () {
    play('/sounds/click.mp3', '');
    if (checkTrueFalseResultVisible()) return false;
    if ($('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check').html() == '') {
      $('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check').html($(this).clone())
      $(this).remove()
    }
    if ($('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check').html() == '') {
      $('.ptest_check').attr('disabled', true)
    } else {
      $('.ptest_check').removeAttr('disabled')
    }
  })

  // Kind == 7
  $('.ptest_kind_7 .ptest_drag_word .ptest_drag_word_check').on('click', 'span', function () {
    play('/sounds/click.mp3', '');
    if (checkTrueFalseResultVisible()) return false;
    const num = parseInt(this.className.substr(22, 2));
    $(this).parent().parent().parent().find('*[class*="pdwi_d5' + num + '"]:empty').html($(this).clone())
    $(this).remove()

    if ($('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check').html() == '') {
      $('.ptest_check').attr('disabled', true)
    } else {
      $('.ptest_check').removeAttr('disabled')
    }
  })
  $('.ptest_kind_7 .ptest_drag_word_list .ptest_drag_word_item').on('click', '*[class*="pdwi_s5"]', function () {
    play('/sounds/click.mp3', '');
    if (checkTrueFalseResultVisible()) return false;
    //if($('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check').html() == ''){
    $('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check').append($(this).clone())
    $(this).remove()
    //}
    if ($('.ptest_current_step_' + currentStep + ' .ptest_drag_word_check').html() == '') {
      $('.ptest_check').attr('disabled', true)
    } else {
      $('.ptest_check').removeAttr('disabled')
    }
  })

  // Kind 6
  $('.ptest_step_8 .ptest_row_item_text').off('click');
  let testKind6Elem1 = null;
  let testKind6Elem2 = null;
  let testKind6Lock = false;
  $('.ptest_kind_6 .ptest_row_item_text.active').on('click', function () {
    play('/sounds/click.mp3', '');
    if (testKind6Lock === true) {
      return false;
    }
    if (testKind6Elem1 === null) {
      testKind6Elem1 = $(this);
    } else {
      testKind6Elem2 = $(this);
      testKind6Lock = true;
    }
    $(this).toggleClass('select');

    if (testKind6Lock === true) {
      setTimeout(function () {
        testKind6Elem1.removeClass('select');
        testKind6Elem2.removeClass('select');

        if (testKind6Elem1.attr('variant') == testKind6Elem2.attr('variant')) {
          testKind6Elem1.addClass('right');
          testKind6Elem2.addClass('right');
        } else {
          testKind6Elem1.addClass('error');
          testKind6Elem2.addClass('error');
        }
        setTimeout(function () {
          if (testKind6Elem1.attr('variant') == testKind6Elem2.attr('variant')) {
            testKind6Elem1.removeClass('right').removeClass('active');
            testKind6Elem2.removeClass('right').removeClass('active');
          } else {
            testKind6Elem1.removeClass('error');
            testKind6Elem2.removeClass('error');
          }
          testKind6Lock = false;
          testKind6Elem1 = null;
          testKind6Elem2 = null;

          if ($('.ptest_current_step_' + currentStep + ' .ptest_row_item_text.active').length <= 0) {
            $('.ptest_check').hide();
            $('.ptest_next').css('display', 'flex');
          }
        }, 600);
      }, 300);
    }
  });

  $('#problem label input[type="checkbox"]').on('click', function () {
    play('/sounds/click.mp3', '');
    $('#problem label input[type="checkbox"]').prop('checked', false);
    this.checked = true;
  })

  let sendError = false;
  $('#problem input[type="submit"]').on('click', function () {
    if (sendError === true) return false;
    play('/sounds/click.mp3', '');
    sendError = true;
    const id = $('#problem label input[type="checkbox"]:checked').val();
    if (id !== undefined) {
      $.get($(this).attr('url') + '/' + $('.ptest_current_step_' + currentStep).attr('st') + '/' + $('#problem label input[type="checkbox"]:checked').val(), function () {
        sendError = false;
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
    }
  })

  $('.ptest_step_sound').on('click', function () {
    $(this).find('audio')[0].play();
    return false;
  })

  $('.ptest_step_text').on('click', function () {
    const audio = $(this).find('audio');
    if (audio.length === 0) return false;
    audio[0].play();
    return false;
  })

  $('.ptest_step_tort').on('click', function () {
    const audio = $(this).find('audio')[0];
    audio.playbackRate = 0.5;
    audio.play();
    return false;
  })

  $('.ptest_step_var1 textarea').on('input', function () {
    if ($(this).val() === '') {
      $('.ptest_check').attr('disabled', true);
    } else {
      $('.ptest_check').removeAttr('disabled');
    }
  })

  $('.ptest_step_var2_block_word input').on('input', function () {
    if ($(this).val() === '') {
      $('.ptest_check').attr('disabled', true);
    } else {
      $('.ptest_check').removeAttr('disabled');
    }
  })

  $('.ptest_top a').on('click', function () {
    if ($(".ptest").hasClass('ptest_step_result')) {
      $(".ptest").addClass('ptest_step_last')
      $(".ptest").removeClass('ptest_step_result')
      $(".ptest_progress").show()
      $(".ptest_bottom").show()
      $(".ptest_step_last").fadeIn()
      $(".ptest_step_result").fadeOut()
      return false;
    }
  })

})

function play(url, url_ogg, callback = null) {
  $("#html5audio .audio_mp3").attr('src', url);
  $("#html5audio .audio_ogg").attr('src', url_ogg);
  $("#html5audio embed").attr('src', url);
  if (callback !== null) {
    $("body").find("#html5audio")[0].onended = function () {
      callback();
      callback = null;
    }
  } else {
    $("body").find("#html5audio")[0].onended = null;
  }
  $("body").find("#html5audio")[0].load();
  $("body").find("#html5audio")[0].play();
  return true;
}

function stopPlay() {
  $("body").find("#html5audio")[0].pause();
  return true;
}

// NEW
$('.ptest_step_bank').on('click', function () {

  if ($(".ptest_step_bank").parent().hasClass('active')) {
    $('.ptest_psteps').css("overflow", "hidden");
    $('.ptest_step_bank').parent().removeClass('active');
    return false;
  } else {
    $('.ptest_step_bank').parent().addClass('active');
    $('.ptest_psteps').css("overflow", "visible");
    return false;
  }
})