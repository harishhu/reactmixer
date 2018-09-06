import RequestItemBase from './../../../ajax/requestitems';


class TaskCategoryRequestItem extends RequestItemBase{
  path_url = '/mission/category';

  constructor(username, password){
    super();

    var rawData = {
    };

    this.setSendData(rawData);
  }

  hostUrl(){
    return super.hostUrl() + this.path_url;
  }
}

class _TaskActiveDegreeRequestItem extends RequestItemBase{
  path_url = '/mission/active';

  constructor(){
    super();

    var rawData = {
    };

    this.setSendData(rawData);
  }

  hostUrl(){
    return super.hostUrl() + this.path_url;
  }
}

var TaskActiveDegreeRequestItem = _TaskActiveDegreeRequestItem;

export {TaskActiveDegreeRequestItem};
export default TaskCategoryRequestItem;
