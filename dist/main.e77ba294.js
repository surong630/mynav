// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"d6sW":[function(require,module,exports) {
var $siteList = $('.siteList');
var $last = $('.last'); // 获取到当前的localStorage,然后转换成对象

var x = localStorage.getItem('x');
var xObject = JSON.parse(x); // 动态创建数组，然后通过动态添加和删除。 判断localStorage有没有存在数据,有的话则用,没有就用默认的

var hashMap = xObject || [{
  logo: 'A',
  url: 'https://www.acfun.cn'
}, {
  logo: 'B',
  url: 'https://www.bilibibli.com'
}, {
  logo: 'J',
  url: 'juejin.cn'
}, {
  logo: 'C',
  url: 'https://www.csdn.net'
}, {
  logo: 'T',
  url: 'taobao.com'
}];

var simplifyUrl = function simplifyUrl(url) {
  var newUrl = url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
  return newUrl;
};

var render = function render() {
  // 找到除了最后一个的li然后每个都移除掉
  $siteList.find('li:not(.last)').remove(); // 遍历数组，将每一项插入到新增网站之前

  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n    <a href=\"".concat(node.url, "\" target=\"_blank\">\n      <div class=\"site\">\n        <div class=\"logo\">\n          ").concat(node.logo, "\n        </div>\n        <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n          <div class=\"close\">\n            <svg class=\"icon\">\n              <use xlink:href=\"#icon-close\"></use>\n            </svg>\n          </div>\n      </div>\n    </a>\n  </li>\n    ")).insertBefore($last);
    $li.on('click', '.close', function (e) {
      e.preventDefault();

      if (confirm('确认删除?')) {
        hashMap.splice(index, 1);
        render();
      }
    });
  });
};

render(); // 添加点击事件

$('.addButton').on('click', function () {
  var url = prompt('请问你要添加的网址');

  if (!url) {
    url = prompt('请重新输入网址');
  }

  var name = prompt('请添加网站的名称');

  if (name.length > 4) {
    alert('请输入小于4的字符');
    name = prompt('请添加网站的名称');
  } // 判断http是不是开头 若不是则自动添加


  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  if (!name) {
    name = url[8].toUpperCase();
  } // 将新添加的url加入到hashMap数组中


  hashMap.push({
    logo: name,
    url: url
  }); // 再生成新的样式

  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};

$(document).on('keypress', function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].url[8].toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["d6sW"], null)
//# sourceMappingURL=main.e77ba294.js.map