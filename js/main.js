jQuery(document).ready(function () {
  $('.h_lang select').change(function () {
    let option = $('.h_lang select option:selected');
    document.location.href = option.attr('url');
  })

  function showPopup(target) {
    $('.overlay').fadeIn(200, function () {
      $('.popup.' + target).fadeIn(200)
      var top = document.documentElement.clientHeight / 2 - $('.popup.' + target).height() / 2 - 30
      var left = $('body').width() / 2 - $('.popup.' + target).width() / 2
      left = left - 20
      $('.popup.' + target).css('top', top).css('left', left)
    })
    return false
  }

  let formSended = false;
  $('#registr input[type="submit"]').click(function () {
    if (formSended === true) return false;
    formSended = true;
    let form = $('#registr');
    $.post(form.attr('url'), {
      'age': form.find('input[name="age"]').val(),
      'name': form.find('input[name="name"]').val(),
      'email': form.find('input[name="email"]').val(),
      'password': form.find('input[name="password"]').val(),
      '_token': form.find('input[name="_token"]').val(),
    }, function (data) {
      if (data.errors !== undefined) {
        if (data.errors.age !== undefined) {
          form.find('.age-error').html(data.errors.age);
          form.find('.age-error').show();
        } else {
          form.find('.age-error').hide();
        }
        if (data.errors.name !== undefined) {
          form.find('.name-error').html(data.errors.name);
          form.find('.name-error').show();
        } else {
          form.find('.name-error').hide()
        }
        if (data.errors.email !== undefined) {
          form.find('.email-error').html(data.errors.email);
          form.find('.email-error').show();
        } else {
          form.find('.email-error').hide();
        }
        if (data.errors.password !== undefined) {
          form.find('.password-error').html(data.errors.password);
          form.find('.password-error').show();
        } else {
          form.find('.password-error').hide();
        }
      } else {
        const popup = $('.popup-uroven');
        if (popup.attr('test-url') !== undefined) {
          document.location.href = popup.attr('test-url');
        } else {
          document.location.href = data.url;
        }
      }
      formSended = false;
    }, 'json');
  })

  $('#login input[type="submit"]').click(function () {
    if (formSended === true) return false;
    formSended = true;
    let form = $('#login');
    $.post(form.attr('url'), {
      'email': form.find('input[name="email"]').val(),
      'password': form.find('input[name="password"]').val(),
      '_token': form.find('input[name="_token"]').val(),
    }, function (data) {
      if (data.errors !== undefined) {
        if (data.errors.email !== undefined) {
          form.find('.email-error').html(data.errors.email);
          form.find('.email-error').show();
        } else {
          form.find('.email-error').hide();
        }
        if (data.errors.password !== undefined) {
          form.find('.password-error').html(data.errors.password);
          form.find('.password-error').show();
        } else {
          form.find('.password-error').hide();
        }
      } else {
        const popup = $('.popup-uroven');
        if (popup.attr('test-url') !== undefined) {
          document.location.href = popup.attr('test-url');
        } else {
          document.location.href = data.url;
        }
      }
      formSended = false;
    }, 'json');
  })

  $('.side_prof_save').click(function () {
    if (formSended === true) return false;
    formSended = true;
    let form = $('.cabinet_content');

    const fd = new FormData();
    fd.append('email', form.find('input[name="email"]').val());
    fd.append('password', form.find('input[name="password"]').val());
    fd.append('name', form.find('input[name="name"]').val());
    fd.append('sounds', form.find('input[name="sounds"]').is(':checked'));
    fd.append('animations', form.find('input[name="animations"]').is(':checked'));
    fd.append('_token', form.find('input[name="_token"]').val());
    const avatar = form.find('input[name="avatar"]')[0].files;
    if (avatar.length > 0) {
      fd.append('avatar', avatar[0]);
    }

    $.ajax({
      url: form.attr('url'),
      data: fd,
      type: 'post',
      dataType: 'json',
      //contentType: 'multipart/form-data',
      processData: false,
      contentType: false,
      cache: false,
      success: function (data) {
        if (data.errors !== undefined) {
          if (data.errors.avatar !== undefined) {
            form.find('.avatar-error').html(data.errors.avatar);
            form.find('.avatar-error').show();
          } else {
            form.find('.avatar-error').hide();
          }
          if (data.errors.name !== undefined) {
            form.find('.name-error').html(data.errors.name);
            form.find('.name-error').show();
          } else {
            form.find('.name-error').hide();
          }
          if (data.errors.email !== undefined) {
            form.find('.email-error').html(data.errors.email);
            form.find('.email-error').show();
          } else {
            form.find('.email-error').hide();
          }
          if (data.errors.password !== undefined) {
            form.find('.password-error').html(data.errors.password);
            form.find('.password-error').show();
          } else {
            form.find('.password-error').hide();
          }
        } else {
          showPopup('popup-save')
          setTimeout(function () {
            document.location.href = data.url;
          }, 5000);
        }
        formSended = false;
      }
    });
    return false;
  })

  $('.sp_btn.side_prof_del').click(function () {
    showPopup('popup-delete');
    return false;
  })

  $('.popup-delete .popup_buttons_delete').click(function () {
    document.location.href = $('.sp_btn.side_prof_del').attr('url');
  })

  $('#forgot input[type="submit"]').click(function () {
    if (formSended === true) return false;
    formSended = true;
    let form = $('#forgot');
    $.post(form.attr('url'), {
      'email': form.find('input[name="email"]').val(),
      '_token': form.find('input[name="_token"]').val(),
    }, function (data) {
      if (data.errors !== undefined) {
        if (data.errors.email !== undefined) {
          form.find('.email-error').html(data.errors.email);
          form.find('.email-error').show();
        } else {
          form.find('.email-error').hide();
        }
      } else {
        $('#success').addClass('active');
        $('#forgot').removeClass('active');
      }
      formSended = false;
    }, 'json');
  })

  $('#passinput input[type="submit"]').click(function () {
    if (formSended === true) return false;
    formSended = true;
    let form = $('#passinput');
    $.post(form.attr('url'), {
      'id': form.find('input[name="id"]').val(),
      'token': form.find('input[name="token"]').val(),
      'password': form.find('input[name="password"]').val(),
      'password-repeat': form.find('input[name="password-repeat"]').val(),
      '_token': form.find('input[name="_token"]').val(),
    }, function (data) {
      if (data.errors !== undefined) {
        if (data.errors.password !== undefined) {
          form.find('.password-error').html(data.errors.password);
          form.find('.password-error').show();
        } else {
          form.find('.password-error').hide();
        }
        if (data.errors.password_repeat !== undefined) {
          form.find('.password-repeat-error').html(data.errors.password_repeat);
          form.find('.password-repeat-error').show();
        } else {
          form.find('.password-repeat-error').hide();
        }
      } else {
        document.location.href = data.url;
      }
      formSended = false;
    }, 'json');
  })

  if ($.cookie('currentStep')) {
    const e = $('.cab_home_step[step-id=' + $.cookie('currentStep') + ']');
    if (e.length > 0) {
      $('html, body').scrollTop(e.offset().top - 300)
    }
  }


})
