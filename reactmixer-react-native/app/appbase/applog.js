import appconfig from './appconfig';
import jsinterface from './../pages/jsinterface/jsinterface';

export default class applog{
  static log(data){
    var env = appconfig.getEnvType();
    if(env == appconfig.ENV_PRD){
      return;
    }

    // if(env == appconfig.ENV_UAT ||
    //    env == appconfig.ENV_DEV ||
    //    env == appconfig.ENV_TEST){
    //
    // }
    if(!jsinterface.webapplog(data)){
      console.log(data.toString());
    }
  }
}
