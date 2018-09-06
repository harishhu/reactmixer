import RequestItemBase from './../../../ajax/requestitems';

 export default class ErrorTopicMgrRequestItem extends RequestItemBase{
  path_url = '/exam/randomOrErrorRecord';

  constructor(){
    super();

    this.rawData = {
    };

    //this.setSendData(rawData);
  }

  setDeleteID(detailid, subitem){
    this.rawData.detailId = detailid;
    this.rawData.isRight = 'Y';
    this.rawData.id = subitem.id;
    this.setSendData(this.rawData);
    //alert('isright = ' + this.rawData.isRight + ' detailID = ' + subitem.detailId + " id = " + subitem.id);
  }

  setTopicData(data, forceAsError){
    this.rawData.detailId = data.detailId;

    if(data.isrightanswer){
      this.rawData.isRight = 'Y';
    }else{
      this.rawData.isRight = 'N';
    }

    if(forceAsError){
      this.rawData.isRight = 'N';
    }

    this.rawData.studentAnswer = data.studentAnswer;
    this.setSendData(this.rawData);
  }

  hostUrl(){
    return super.hostUrl() + this.path_url;
  }
}
