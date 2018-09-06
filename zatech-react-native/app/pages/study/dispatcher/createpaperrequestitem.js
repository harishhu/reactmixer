import RequestItemBase from './../../../ajax/requestitems';

 export default class CreatePaperRequestItem extends RequestItemBase{
  path_url = '/exam/createPaper';

  constructor(name){
    super();

    var rawData = {
      paperName: name
    };

    this.setSendData(rawData);
  }

  hostUrl(){
    return super.hostUrl() + this.path_url;
  }
}
