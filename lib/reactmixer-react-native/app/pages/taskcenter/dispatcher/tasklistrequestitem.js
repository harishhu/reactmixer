import RequestItemBase from './../../../ajax/requestitems';

class QueryTaskListRequestItem extends RequestItemBase{
  path_url = '/mission/query';

  constructor(cCode, mCode){
    super();

    this.rawData = {
      categoryCode: cCode,
    };

    if(mCode && mCode.trim() != ""){
      this.rawData.missionCode = mCode;
    }

    this.setSendData(this.rawData);
  }

  hostUrl(){
    return super.hostUrl() + this.path_url + '?' + "categoryCode=" + this.rawData.categoryCode;
  }
}

module.exports = QueryTaskListRequestItem;
