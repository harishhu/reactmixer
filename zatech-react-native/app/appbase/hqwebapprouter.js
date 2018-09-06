import utils from './utils/utils.js';
import appconfig from './appconfig';
import Base64 from './Base64.js';

class HQWebAppRouter{
  static HQ_PATH_LOGIN = 'login';
  static HQ_PATH_TASKCENTER = 'taskcenter';
  static HQ_PATH_TASKCENTER_DESC = 'taskcenter-desc';

  static HQ_PATH_HQCOIN_DESC = 'hqcoin-desc'; //横琴币描述页面

  //the default index page
  static HQ_PATH_INDEX = 'login';

  static currentPageName = 'hqlife-webapp.html';

  static setConfigPath(configdata){
    this.configpath = configdata;
  }

  static routerComponent(){
    console.log('click component');
    var loc = location.href;
    var routerType = utils.getUrlParam('type');

    var comp = undefined;
    var index = undefined;

    for(var pro in this.configpath){
        let temp = this.configpath[pro];

        console.log("router path " + temp.toString());

        if(!temp.path){
          continue;
        }

        //alert('temp path = ' + temp.path);
        //alert('rout type = ' + routerType);

        if(temp.path == routerType){
          comp = temp;
          break;
        }

        if(temp.path == HQWebAppRouter.HQ_PATH_INDEX){
          index = temp;
        }
    }

    if(comp == undefined){
      comp = index;
    }

    //alert(comp.main);
    return comp.main;
  }

  static getRoutePageAttachData(){
    var data = utils.getUrlParam('data');
    var base = new Base64();
    data = JSON.parse(base.decode(data));
    return data;
  }

   static link2page(page, data, justreturnurl, path){
     var comp = undefined;

     for(var pro in this.configpath){
         let temp = this.configpath[pro];

         if(temp.path == page){
           comp = temp;
         }
     }

     if(!path){
       let indexname = location.href.split('?', -1);
       path = indexname[0];
     }

     //alert(location.href);
     //alert(this.currentPageName);
     let type = page;
     
     if(comp){
       type = comp.path;
     }
    var pagepath = path + '?type=' + type + '&env=' + appconfig.getEnvType() + '&token=' + appconfig.getUserToken();
    if(data){
      var json = JSON.stringify(data);
      var base = new Base64();
      pagepath = pagepath + '&data=' + base.encode(json);
    }

    if(justreturnurl){
      return pagepath;
    }

    location = pagepath;
  }
}

module.exports = HQWebAppRouter;
