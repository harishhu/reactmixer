import RequestItemBase from './../../../ajax/requestitems';

 export default class GetExamInfoRequestItem extends RequestItemBase{
  path_url = '/exam/getInfoForFirstPage';

  constructor(){
    super();

    var rawData = {
    };

    this.setSendData(rawData);
  }

  hostUrl(){
    //return 'http://192.168.26.112:9080/' + this.path_url;
    return super.hostUrl() + this.path_url;
  }
}
