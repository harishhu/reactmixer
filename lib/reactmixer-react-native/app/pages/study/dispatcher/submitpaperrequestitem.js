import RequestItemBase from './../../../ajax/requestitems';

 export default class SubmitPaperRequestItem extends RequestItemBase{
  path_url = '/exam/submitPaper';

  constructor(answerlist){
    super();

    var rawData = {
      answers: answerlist
    };

    this.setSendData(rawData);
  }

  hostUrl(){
    //return 'http://192.168.26.109:9080/' + this.path_url;
    return super.hostUrl() + this.path_url;
  }
}
