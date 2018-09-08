import sys_chs from './../../language/lang_chs';

String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                let tmp = args[key];

                if(tmp == undefined){
                    tmp = "";
                }

                var reg = new RegExp("({" + key + "})", "g");
                result = result.replace(reg, tmp);
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                let tmp = arguments[i];

                if(tmp == undefined){
                    tmp = "";
                }

                //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题
                var reg = new RegExp("({)" + i + "(})", "g");
                result = result.replace(reg, tmp);
          }
       }
   }
   return result;
}

class ZAString{
  constructor(){
      this.sysLanDefault = {};
      this.defaultLanType = 'chs';
      this.sysLanDefault['chs'] = sys_chs;

      this.appModuleStrMap = new Map();
      this.runningModuleName = undefined;

      this.setDefaultLang(this.defaultLanType);
      this.strings = this.sysLanDefault[this.defaultLanType];
  }

  registerAppModuleStr(modulename, type, strobj){
      if(modulename && modulename != ''){
          let strgroup = this.appModuleStrMap.get(modulename);
          if(strgroup == undefined){
            strgroup = {};
          }

          this.combileStrings(strobj, type);
          strgroup[type] = strobj;

          this.appModuleStrMap.set(modulename, strgroup);
      }
  }

  setRunningModule(modulename){
    let strgroup = this.appModuleStrMap.get(modulename);
    if(strgroup){
        this.runningModuleName = modulename;
        this.strings = strgroup[this.defaultLanType];
    }
  }

  setDefaultLang(type){
      this.defaultLanType = type;
  }

  combileStrings(target, type){
      let syslan = this.sysLanDefault[type]
      if(syslan){
          for(let key in syslan){
              if(target[key]){
                  continue;
              }

              target[key] = syslan[key];
          }
      }
  }
}

module.exports = new ZAString();
