; (function () {

  var searchInput = document.getElementsByClassName('J_searchInput')[0],
    wdList = document.getElementsByClassName('J_wdList')[0],
    listTpl = document.getElementById('J_listTpl').innerHTML;
    searchInput.addEventListener('blur', () => {
      wdList.style.display = 'none'
    })
    searchInput.addEventListener('focus', () => {
      wdList.style.display = 'block'
    })
  function init() {
    bindEvent();
  }

  function bindEvent() {
    searchInput.addEventListener('input', typeInput, false);
  }

  function typeInput() {
    var val = _trimSpace(this.value);
    if (val.length > 0) {
      getDates(val, 'setDatas')
    }
  }

  function getDates(val, cb) {
    // var oScript = document.createElement('script');
    // oScript.src = "https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1422,33222,31253,32974,33284,32938,32846,26350,33199,33239,33266&wd=" + val + "&req=2&csor=4&pwd=123&cb=" + cb;
    // document.body.appendChild(oScript);
    // document.body.removeChild(oScript);
    console.log(cb);
    $.ajax({
      url: "https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1422,33222,31253,32974,33284,32938,32846,26350,33199,33239,33266&wd=" + val + "&req=2&csor=4&pwd=123&cb=" + cb,
      type: 'GET',
      dataType: 'JSONP',
      jsonpCallback: 'setDatas',
      success: function (data) {
        renderList(data);
      }
    })
  }

  function renderList(data) {
    var data = data.g,
      len = '',
      list = '';

    try {
      len = data.length;
    } catch (e) {
      len = 0;
    }

    if (len > 0) {
      data.forEach(item => {
        list += listTpl.replace(/{{(.*?)}}/gim, function (node, key) {
          return {
            wd: item.q,
            wdLink: item.q
          }[key]
        })
      })
      wdList.innerHTML = list;
    } else {
      wdList.innerHTML = '';
    }
  }

  window.setDatas = function (data) {
    renderList(data);
  }

  function _trimSpace(str) {
    return str.replace(/\s+/, '')
  }

  init();



})();