import RequestItemBase from './../../../ajax/requestitems';

export default class GetErrorTopicSetRequestItem extends RequestItemBase{
  path_url = '/exam/queryErrorRecord';

  constructor(){
    super();

    var rawData = {
      isRight: 'N'
    };

    this.setSendData(rawData);
  }

  hostUrl(){
    //return 'http://192.168.26.112:9080/' + this.path_url;
    return super.hostUrl() + this.path_url;
  }
}
