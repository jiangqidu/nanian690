function jQuery(vArg) {
  this.elements = [];
  const type = typeof vArg;
  switch (type) {
    case "function":
      window.onload = vArg;
      break;
    case "string":
      const firstLetter = vArg.charAt(0);
      if (/\s|>>/.test(vArg)) {
        this.elements.push(document.querySelector(vArg));
      } else if (firstLetter === "#") {
        this.elements.push(document.getElementById(vArg.substring(1)));
      } else if (firstLetter === ".") {
        this.elements = document.getElementsByClassName(vArg.substring(1));
      } else {
        this.elements = document.getElementsByTagName(vArg);
      }
      break;
    default:
      break;
  }
}
// 点击事件
jQuery.prototype.click = function (fn) {
  for (let index = 0; index < this.elements.length; index++) {
    const element = this.elements[index];
    fn.call(element);
    element.addEventListener("click", fn);
  }
};
// 移入移出
jQuery.prototype.hover = function (fnOver, fnOut) {
  for (let i = 0; i < this.elements.length; i++) {
    this.elements[i].addEventListener("mouseover", fnOver);
    this.elements[i].myAddEvent("mouseout", fnOut);
  }
  return this;
};
// css
jQuery.prototype.css = function (attr, value) {
  if (arguments.length == 2) {
    //设置样式
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].style[attr] = value;
    }
  } else {
    if (typeof attr == "string") {
      return getComputedStyle(this.elements[0], false)[attr];
    } else {
      for (let i = 0; i < this.elements.length; i++) {
        for (k in attr) {
          this.elements[i].style[k] = attr[k];
        }
      }
    }
  }
  return this;
};
// 元素下标
jQuery.prototype.index = function (obj) {
  let i = 0;
  let aBrother = obj.parentNode.children;
  for (i; i < aBrother.length; i++) {
    if (aBrother[i] == obj) {
      return i;
    }
  }
  return i;
};
// 元素个数
jQuery.prototype.length = function () {
  return this.elements.length;
};
// 追加节点
jQuery.prototype.append = function (dom) {
  for (let index = 0; index < this.elements.length; index++) {
    const element = this.elements[index];
    element.appendChild(dom);
  }
};
// 克隆节点
jQuery.prototype.clone = function (dom) {
  let cloneElement = [];
  for (let index = 0; index < this.elements.length; index++) {
    const element = this.elements[index];
    cloneElement.push(element.cloneNode(true));
  }
  return cloneElement;
};
// 动画方法
jQuery.prototype.animate = function (json) {
  for (let i = 0; i < this.elements.length; i++) {
    startMove(this.elements[i], json);
  }
  function startMove(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
      let bStop = true;
      for (const attr in json) {
        let iCur = 0;
        iCur = parseInt(getComputedStyle(obj, false)[attr]);
        let iSpeed = (json[attr] - iCur) / 8;
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
        if (iCur != json[attr]) {
          bStop = false;
        }
        obj.style[attr] = iCur + iSpeed + "px";
      }
      if (bStop) {
        clearInterval(obj.timer);
        if (fn) {
          fn();
        }
      }
    }, 13);
  }
};
function $(v) {
  return new jQuery(v);
}
