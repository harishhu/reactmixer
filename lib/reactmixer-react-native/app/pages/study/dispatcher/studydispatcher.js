import CreatePaperRequestItem from './createpaperrequestitem.js'
import ExamDefine from './../examdefine';
import ExamDataSource from './../datasource/examdatasource.js';
import GetExamInfoRequestItem from './getexaminforequestitem.js';
import GetErrorTopicSetRequestItem from './geterrortopicsetrequestitem.js';
import ExerciseTopicSetRequestItem from './exercisetopicsetrequestitem.js';
import ErrorTopicMgrRequestItem from './errortopicmanagerrequestitem';
import SubmitPaperRequestItem from './submitpaperrequestitem';
import ClearExerciseRecordRequestItem from './clearexerciserecordrequestitem';

class StudyDispatcher{
  constructor(){
  }

  createExamPaper(type, papername, callback){
    //alert(papername);
    var createpaper = new CreatePaperRequestItem(papername);
    createpaper.setRequestCallback(function(resData, success){
      if(success){
        let topic = StudyDispatcher.composeTopicSet(resData.value);
        let examDataSource = new ExamDataSource(topic, type);

        // if(type == ExamDefine.TYPE_EXAM){
        //   examDataSource.examTime = 90 * 60 * 1000;
        //   examDataSource.totalGrade = resData.value.totalGrade;
        //   //examDataSource.title = '横琴人寿转正考试';
        // }else if(type == ExamDefine.TYPE_SIMULATOR){
        //   examDataSource.examTime = 90 * 60 * 1000; //一个半小时
        //   //examDataSource.title = '横琴人寿模拟考试';
        // }

        examDataSource.answerTime = parseInt(resData.value.answerTime) * 60 * 1000;
        examDataSource.passStandard = resData.value.passStandard;
        examDataSource.totalGrade = resData.value.totalGrade;

        resData.value = examDataSource;
      }
      callback(resData, success);
    });

    createpaper.run();
  }

  submitExamPaper(datasource, callback){
    // let res = {};
    // res.right = datasource.checkRightAnswer();
    // res.total = datasource.getExamDataInfo().total;
    // res.percent = parseInt((res.right / res.total) * 100);
    //
    // if(callback){
    //   callback(res);
    // }

    let answerlist = [];
    let datalist = datasource.getDataList();

    for(let index in datalist){
      let item = {};

      item.detailId = datalist[index].detailId;
      item.answer = datalist[index].studentAnswer;

      if(datalist[index].rawtype && datalist[index].rawtype == ExamDefine.SUBJECT_TYPE_TRUEFALSE){
        if(item.answer && item.answer.length > 0){
          item.answer = item.answer == 'A' ? 'Y' : 'N';
          answerlist.push(item);
        }

        continue;
      }

      if(item.answer && item.answer.length > 0){
        answerlist.push(item);
      }
    }

    if(answerlist.length == 0){
      let item = {};

      item.detailId = datalist[0].detailId;
      item.answer = "ABCD";
      answerlist.push(item);
    }

    let requestitem = new SubmitPaperRequestItem(answerlist);
    requestitem.setRequestCallback(callback);
    requestitem.run();
  }

  getExamInfo(callback){
    var getinfo = new GetExamInfoRequestItem();
    getinfo.setRequestCallback(callback);
    getinfo.run();
  }

  getErrorTopicSet(callback){
    var geterrortopic = new GetErrorTopicSetRequestItem();

    geterrortopic.setRequestCallback(function(resData, success){
      if(success){
        let topicset = StudyDispatcher.composeTopicSet(resData.value.errorCollection);
        //alert(topic.length);
        resData.value.errorCollection = topicset;
      }

      callback(resData, success);
    });

    geterrortopic.run();
  }

  removeErrorTopic(detailid, callback, subitem){
    let item = new ErrorTopicMgrRequestItem();
    //alert('studentAnswer = ' + topicdata.studentAnswer + " answer = " + topicdata.answer);
    item.setRequestCallback(callback);
    item.setDeleteID(detailid, subitem);
    item.run();
  }

  getExerciseTopicSet(callback){
    var exercise = new ExerciseTopicSetRequestItem();
    exercise.setRequestCallback(function(resData, success){

      if(success){
        let topic = StudyDispatcher.composeTopicSet(resData.value);
        //alert(topic.length);
        resData.value = new ExamDataSource(topic, ExamDefine.TYPE_EXERCISE);
      }

      callback(resData, success);
    });

    exercise.run();
  }

  checkErrorTopic(topicdata, callback, forceAsError){
    let item = new ErrorTopicMgrRequestItem();
    //alert('studentAnswer = ' + topicdata.studentAnswer + " answer = " + topicdata.answer);
    item.setRequestCallback(callback);
    item.setTopicData(topicdata, forceAsError);
    item.run();
  }

  clearExerciseRecord(callback){
    let item = new ClearExerciseRecordRequestItem(true);
    item.setRequestCallback(callback);
    item.run();
  }

  clearErrorTopicSetRecord(callback){
    let item = new ClearExerciseRecordRequestItem(false);
    //alert('studentAnswer = ' + topicdata.studentAnswer + " answer = " + topicdata.answer);
    item.setRequestCallback(callback);
    item.run();
  }

  static composeTopicSet(rawset){
    console.log('compose topic set');
    let tmpdata = [];
    let raw1 = rawset[ExamDefine.SUBJECT_TYPE_SINGLE + ""];
    let raw2 = rawset[ExamDefine.SUBJECT_TYPE_MULTI + ""];
    let raw3 = rawset[ExamDefine.SUBJECT_TYPE_TRUEFALSE + ""];

    if(raw1){
       tmpdata = tmpdata.concat(raw1);
    }

    if(raw2){
       tmpdata = tmpdata.concat(raw2);
    }

    if(raw3){
      for(let index in raw3){
        let item = raw3[index];
        item.content = "A正确;B错误";
        item.rawtype = ExamDefine.SUBJECT_TYPE_TRUEFALSE;
        item.type = ExamDefine.SUBJECT_TYPE_SINGLE;

        item.answer = item.answer == 'Y' ? 'A' : 'B';
      }

       tmpdata = tmpdata.concat(raw3);
    }

    return tmpdata;
  }
}

export default new StudyDispatcher();
