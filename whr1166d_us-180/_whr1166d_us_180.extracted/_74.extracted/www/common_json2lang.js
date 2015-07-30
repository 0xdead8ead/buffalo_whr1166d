jQuery.noConflict();
///////////////////////////////////////////////////////////////////////////////
var J2L = (function($) {
var reload_ajax_cnt = 0;
var deferredObjects = [];
var debug_flag = 0;
var proto = location.protocol;
var iAjaxTimeOut = (proto === 'http:') ? 5000 : 10000;
var apply_list = ['class', 'data-value',
  'data-alt', 'data-title', 'data-text', 'data-width', 'data-height'];
if ('placeholder' in document.createElement('input')) {
  apply_list.push('data-placeholder');
}
if (!('console' in window)) { // for debug console
  window.console = {};
  window.console.log = function(str) {
    return str;
  };
}
var strWidth = function(str, elm) {
  var style = elm ?
      (elm.currentStyle || document.defaultView.getComputedStyle(elm, '')) :
      false;
  var e = $('<span>',
            {css: {
                visibility: 'hidden',
                position: 'absolute',
                whiteSpace: 'nowrap',
                fontSize: style ? style.fontSize : '12px'
              }
            }
           );
  $('body').append(e);
  var width = e.text(str).get(0).offsetWidth;
  e.empty().remove();
  return width;
};

///////////////////////////////////////////////////////////////////////////////
var global = {
  load_json: [],
  global_dic: {},
  current_lang: '',
  delayDispAjaxCnt: 1,
  flush: function() {
    global.reload_dic();
  },
  show_json: function(data, label_prefix) {
    convert_json_option_compat(data, label_prefix);
    for (var i = 0; i < apply_list.length; i++) {
      convert_json2elem(data, label_prefix, apply_list[i]);
    }
  },
  reload_dic: function() {
    var prev_array = (reload_ajax_cnt == 0) ? [] : global.load_json.slice(0);
    $('[data-file]').each(function() {
      var f = $(this).attr('data-file');
      if ($.inArray(f, global.load_json) == -1) {
        global.load_json.push(f);
      }
    });
    $('option').each(function() {
      if ($(this).text().match(/#file#/)) {
        var f = $(this).text().replace(/\n/g, '').
        replace(/.*#file#([^#]+?)#.*/g, '$1');
        if ($.inArray(f, global.load_json) == -1) {
          global.load_json.push(f);
        }
      }
    });

    $.unique(prev_array);
    $.unique(global.load_json);
    if ((reload_ajax_cnt == 0) ||
            array_compare(prev_array, global.load_json) == false) {
      var target = $.grep(global.load_json, function(n, i) {
        if ($.inArray(n, prev_array) == -1) {
          return true;
        }
        else {
          return false;
        }
      });
      $.when.apply(null, get_json_data_array(target)).always(function() {
        global.show_json(global.global_dic, 'label_,common_dic_');
        reload_ajax_cnt++;
        if (reload_ajax_cnt >= global.delayDispAjaxCnt) {
          $('body').css('visibility', 'visible');
          $('span.dic_json_pop').hide();
          $('body').trigger('flushed.J2L');
        }
        //console.log(target);
        $('[data-fn]').each(function() {
            var fn = $(this).attr('data-fn');
            if (fn != undefined) {
                //console.log('handler exec!');
                eval(fn);
            }
        });
        //console.log('FLUSHED.J2L', location.href, reload_ajax_cnt);
      });
      //console.log(reload_ajax_cnt);
    }
    else {
      global.show_json(global.global_dic, 'label_,common_dic_');
    }
    //console.log('reloaded', location.href);
  },
  show_errmsg_json: function(lang, pErrCode, pWarnCode) {
    var target = [];
    target.push('errmsg');
    target.push('dic');
    //console.log('show_errmsg_json: ' + target);
    $.when.apply(null, get_json_data_array(target)).always(function() {
      var key_err = 'errmsg_' + pErrCode;
      var key_warn = 'errmsg_' + pWarnCode;
      var pSettingErrorMess = '';

      if (pErrCode == 'ERROR_READ_FILE') {
        pSettingErrorMess = '';
      }
      else {
        pSettingErrorMess = global.global_dic['common_dic_error_ttl'] + ':';
      }
      if (pErrCode != 'ERROR_NONE') {
        if (pWarnCode == 'ERROR_NONE') {
          $('div[data-errmsg=errmsg]').html('<div class=C_ERR><hr><p>' +
            pSettingErrorMess + global.global_dic[key_err] + '</p><hr></div>');
        }
        else {
          $('div[data-errmsg=errmsg]').html('<div class=C_ERR><hr><p>' +
           pSettingErrorMess + global.global_dic[key_warn] + '<br>' +
           global.global_dic['common_dic_error_ttl_cnt'] +
           global.global_dic[key_err] + '</p><hr></div>');
        }
      }
      $('[data-fn]').each(function() {
          var fn = $(this).attr('data-fn');
          if (fn != undefined) {
              //console.log('handler exec!');
              eval(fn);
          }
      });
      $('body').trigger('flushed.J2L');
    });
  },
  debug_mode: function(n) {
    debug_flag = n;
  }
};

///////////////////////////////////////////////////////////////////////////////
function make_json_url(lang, symbol) {
  var prefix = '../js/json/' + lang + '/';
  var suffix = '.json';
  var url = '/cgi-bin/cgi?req=fnc&fnc=%24{include_html_utf8(\'' +
            prefix + symbol + suffix + '\', %24{RT_charset})}';
  return url;
}

function array_compare(a1, a2) {
  if (a1.length != a2.length) {
    return false;
  }
  else {
    for (var i = 0; i < a1.length; i++) {
      if ($.inArray(a1[i], a2) == -1) {
        return false;
      }
    }
    return true;
  }
}

function sep_selector_attr(attr, label_prefix) {
  var ary = label_prefix.split(',');
  var i;
  var Ret = '';
  var delim = '';
  for (i = 0; i < ary.length; i++) {
    Ret += (delim + '[' + attr + '^=' + ary[i] + ']');
    delim = ',';
  }
  return Ret;
}

function sep_selector_opt(label_prefix) {
  var ary = label_prefix.split(',');
  var i;
  var Ret = '';
  var delim = '';
  for (i = 0; i < ary.length; i++) {
    Ret += (delim + '#pre#' + ary[i] + '.*#file#.*?#suf#');
    delim = '|';
  }
  return Ret;
}

///////////////////////////////////////////////////////////////////////////////
function store_json(json_data) {
  for (var key in json_data) {
    global.global_dic[key] = json_data[key];
  }
}

function convert_json2elem(json_data, label_prefix, attr) {
  $(sep_selector_attr(attr, label_prefix)).each(function() {
    var key = $(this).attr(attr);
    var val = json_data[key];
    if (val != undefined) {
      if ($(this).is('span')) {
        if (debug_flag != 0) {
          var dic_html = $(this).attr('data-file');
          var reg_pat = '^label_';
          var dic_tag = '';
          if (!key.match(RegExp(reg_pat))) {
            reg_pat = '^common_dic_(.+)';
            dic_html = 'common_dic';
          }
          else {
            reg_pat = '^label_(.*)_' + dic_html + '$';
            dic_html += '.html';
          }
          dic_tag = key.replace(RegExp(reg_pat), '$1');
          $(this).wrapAll('<span class="dic_json_label_wrap"></span>');
          $(this).after('<span class="dic_json_pop">tag: ' +
                        dic_tag + '<br />html: ' + dic_html + '</span>');
        }
        $(this).replaceWith(val);
      }
      else if ($(this).is('option') || $(this).is('title')) {
        $(this).text(val);
        if (debug_flag != 0) {
        }
      }
      else {
        var target = attr.replace(/data-(.*)/, '$1');
        var decode_text = $('<div />').html(val).text();
        $(this).attr(target, decode_text);
        if (debug_flag != 0) {
          var dic_html = $(this).attr('data-file');
          var reg_pat = '^label_';
          var dic_tag = '';
          if (!key.match(RegExp(reg_pat))) {
            reg_pat = '^common_dic_(.+)';
            dic_html = 'common_dic';
          }
          else {
            reg_pat = '^label_(.*)_' + dic_html + '$';
            dic_html += '.html';
          }
          dic_tag = key.replace(RegExp(reg_pat), '$1');
          $(this).after('<span class="dic_json_pop">tag: ' +
                        dic_tag + '<br />html: ' + dic_html + '</span>');
          $(this).addClass('dic_json_pop_input');
        }
      }
    }
  });
}

function convert_json_option_compat(json_data, label_prefix) {
  var isFitSelect = (!document.body.addEventListener);
  $('select').each(function() {
    var w = 0;
    $('option', $(this)).each(function() {
      var pat = sep_selector_opt(label_prefix);
      while ($(this).text().match(pat)) {
        var x = $(this).text().replace(/\n/g, '');
        var key = x.replace(/.*?#pre#(.*?)#file#.*?#suf#.*/g, '$1');
        var val = json_data[key];
        var prefix = x.replace(/(.*?)#pre#.*/, '$1');
        var suffix = x.replace(/.*?#file#.*?#suf#(.*)/, '$1');
        if (val != undefined) {
          var decode_text = $('<div />').html(val).text();
          $(this).text(prefix + decode_text + suffix);
        }
        else {
          break;
        }
      }
      if (isFitSelect) {
        w = Math.max(w, strWidth($(this).text(), $(this).get(0)));
      }
    });
    if (isFitSelect && (w > 30)) {
      $(this).width((w + 30));
      //console.log('max-option-width...!', w, $(this).attr('name'));
    }
  });
}

///////////////////////////////////////////////////////////////////////////////
function done_json() {
}

///////////////////////////////////////////////////////////////////////////////
function get_json_data(get_json_url, bCache) {
  return $.ajax({
    scriptCharset: 'utf-8',
    url: get_json_url,
    dataType: 'json',
    cache: bCache,
    timeout: iAjaxTimeOut,
    success: function(data, status, xhr) { store_json(data); },
    error: function(data, status, xhr) {
        console.log('!!!!! load fail(' + status + '): ' + get_json_url);
    },
    complete: done_json()
  });
}

function get_json_data_array(load_list) {
  deferredObjects = [];
  for (var i = 0; i < load_list.length; i++) {
    var get_json_url = make_json_url(
      (typeof global.current_lang == 'undefined') ?
      '' : global.current_lang, load_list[i]);
//    var get_json_url = './' + load_list[i] + '.json';
    deferredObjects.push(get_json_data(get_json_url, false));
  }
  return deferredObjects;
}

$(document).ready(function() {
//  if (typeof console != 'undefined') {
//    console.log(iAjaxTimeOut);
//  }
  $('body').css('visibility', 'hidden');
  $('body').bind('ajaxSend', function(c, xhr) {
    $(window).bind('beforeunload', function() {
      xhr.abort();
    });
  });
  global.flush();
  if (debug_flag != 0) {
    $('span.dic_json_label_wrap').live('click', function() {
      $('span.dic_json_pop', this).show();
    });
    $('input').live('mouseover', function() {
      $('+span.dic_json_pop:not(:animated)', this).show();
    });
    $('span.dic_json_pop').live('dblclick', function() {
      $(this).hide();
    });
  }
});

return global;
})(jQuery);
