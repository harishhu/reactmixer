import $ from 'jquery';

class utils{
   static getUrlParam(name){
       var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
       var r = window.location.search.substr(1).match(reg);
       if(r!=null)return  unescape(r[2]); return null;
  }

  static dp2px(dpvalue){
    return dpvalue;
  }

  static dp2pxStr(dpvalue){
    return dpvalue + 'px';
  }

  static removeArrayItemByValue(array, val) {
    for(var i = 0; i < array.length; i++) {
      if(array[i] == val) {
        array.splice(i, 1);
        break;
      }
    }
  }

  static getSubImageStr(image){
    return image.substr(15, image.length - 15)
  }

  static Json2Obj(json){
    return JSON.parse(json);
  }

  static Obj2Json(obj){
    return JSON.stringify(obj);
  }

  static scaleItemCss(item, value){
    if(!(item instanceof $)){
      item = $(item);
    }

    item.css("transform",`scale(${value}, ${value})`);
  }

  static transformItemCss(item, value){
    if(!(item instanceof $)){
      item = $(item);
    }

    item.css("transform",`translateX(${value}px)`);
  }

  static rotateItemCss(item, value){
    if(!(item instanceof $)){
      item = $(item);
    }

    item.css("transform",`rotate(${value}deg)`);
  }

  static rotateXItemCss(item, value){
    if(!(item instanceof $)){
      item = $(item);
    }

    item.css("transform",`rotateX(${value}deg)`);
  }

  static rotateYItemCss(item, value){
    if(!(item instanceof $)){
      item = $(item);
    }

    item.css("transform",`rotateY(${value}deg)`);
  }

  static rotateZItemCss(item, value){
    if(!(item instanceof $)){
      item = $(item);
    }

    item.css("transform",`rotateZ(${value}deg)`);
  }
}

module.exports = utils;
