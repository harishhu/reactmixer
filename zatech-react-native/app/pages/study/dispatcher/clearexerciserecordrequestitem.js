import RequestItemBase from './../../../ajax/requestitems';

 export default class ClearExerciseRecordRequestItem extends RequestItemBase{
  path_url = '/exam/clearRecord';

  constructor(isclearexercise){
    super();

    var rawData = {
    };

    if(!isclearexercise){
      rawData.isRight = 'N';
    }

    this.setSendData(rawData);
  }

  hostUrl(){
    return super.hostUrl() + this.path_url;
  }
}
