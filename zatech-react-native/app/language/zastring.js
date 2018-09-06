import lan_chs from './zastring_chs';
import lan_eng from './zastring_eng';

String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
             }
          }
       }
   }
   return result;
}

class ZAString{
  constructor(){
  }

  setLangType(type){
    if(type == 'chs'){
      this.strings = lan_chs;
    }else if(type == 'eng'){
      this.strings = lan_eng;
    }
  }
}

export default new ZAString();
