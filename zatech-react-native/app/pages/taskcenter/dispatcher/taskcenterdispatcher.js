import TaskCategoryRequestItem, {TaskActiveDegreeRequestItem} from './taskcategoryrequestitems';
import QueryTaskListRequestItem from './tasklistrequestitem'
import appconfig from './../../../appbase/appconfig';

class TaskCenterDispatcher{
  queryTaskCategory(callback){
    console.log('2222');

    var taskcategory = new TaskCategoryRequestItem();
    console.log('3333');

    taskcategory.setRequestCallback(function(resData){
        callback(resData);
    });

    console.log('4444');
    taskcategory.run();
  }

  queryTaskList(categroyCode, missionCode, callback){
    var query = new QueryTaskListRequestItem(categroyCode, missionCode);
    query.setRequestCallback(function(resData){
      try{
        for(var index in resData.value){
          resData.value[index].imageUrl = appconfig.composeImagePath(resData.value[index].imageUrl);
        }
      }catch(err){

      }

      callback(resData);
    });
    query.run();
  }

  queryTaskActiveDegree(callback){
    var taskactive = new TaskActiveDegreeRequestItem();
    taskactive.setRequestCallback(function(resData){
  //     resData.value = {
	// "current": 5500,
	// "detail": [{
	// 		"level": 1,
	// 		"limited": 3000,
	// 		"awards": 100,
	// 		"awardsType": "横琴币",
  //     "finishState":true,
	// 		"drawState": true
	// 	}, {
	// 		"level": 2,
	// 		"limited": 6000,
	// 		"awards": 500,
	// 		"awardsType": "横琴币",
	// 		"finishState":true,
	// 		"drawState": false
	// 	}, {
	// 		"level": 3,
	// 		"limited": 9000,
	// 		"awards": 1000,
	// 		"awardsType": "横琴币",
	// 		"finishState":false,
	// 		"drawState": false
	// 	}, {
	// 		"level": 4,
	// 		"limited": 12000,
	// 		"awards": 2000,
	// 		"awardsType": "横琴币",
	// 		"finishState":false,
	// 		"drawState": false
	// 	}
	// ]};

      callback(resData);
    });

    taskactive.run();
  }
}

module.exports = new TaskCenterDispatcher();
