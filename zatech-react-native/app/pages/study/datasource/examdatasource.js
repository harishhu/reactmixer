import utils from './../../../appbase/utils/utils.js';
import ExamDefine from './../examdefine.js';

export default class ExamDataSource{
  static answer_normal = 1;
  static answer_error = 2;
  static answer_right = 3;
  static answer_done = 4;
  static answer_current = 5;

  constructor(datalist, examType){
    this.rawdata = datalist;
    this.examType = examType;

    this.normallist = [];
    this.errorlist = [];
    this.rightlist = [];

    this.total = this.rawdata.length;
    this.index = 0;

    this.callbacklist = [];
    this.initDataList();
  }

  clearRecords(){
    this.normallist = [];
    this.errorlist = [];
    this.rightlist = [];

    for(let i in this.rawdata){
      let itemdata = this.rawdata[i];
      itemdata.studentAnswer = '';
    }

    this.initDataList();
  }

  initDataList(){
    for(let i in this.rawdata){
      let itemdata = this.rawdata[i];
      itemdata.index = parseInt(i) + 1;
      //console.log(itemdata.index);

      if(!itemdata.contentArray || itemdata.contentArray == ""){
        itemdata.contentArray = [];
        let tmparray = itemdata.content.split(";");

        for(let index in tmparray){
          let itemtmp = tmparray[index];
          //let valuearray = itemtmp.split('.');

          let vv = {};

          // if(valuearray.length == 2){
          //   vv.value = valuearray[0];
          //   vv.content = valuearray[1];
          // }else{
          vv.value = itemtmp.substr(0, 1);
          vv.content = itemtmp.substr(1, itemtmp.length - 1);
          //}

          itemdata.contentArray.push(vv);
        }
      }

      let res = this.checkAnswerState(i);

      if(res == ExamDataSource.answer_normal || res == ExamDataSource.answer_current){
         this.normallist.push(i);
         continue;
      }

      if(res == ExamDataSource.answer_right || res == ExamDataSource.answer_done){
        this.rightlist.push(i);
      }else{
        this.errorlist.push(i);
      }
    }

    //alert('right = ' + this.rightlist.length);
    //alert('error = ' + this.errorlist.length);
    //alert('normal = ' + this.normallist.length);
  }

  checkIsAnswered(index){
    if(!item.studentAnswer || item.studentAnswer == ""){
      return false;
    }

    return true;
  }

  checkAnswerState(index){
    let item = this.rawdata[index];

    if(this.examType == ExamDefine.TYPE_EXAM || this.examType == ExamDefine.TYPE_SIMULATOR){
      if(!item.studentAnswer || item.studentAnswer == ""){
         if(index == this.index){
           return ExamDataSource.answer_current;
         }else{
           return ExamDataSource.answer_normal;
         }
      }else{
        return ExamDataSource.answer_done;
      }
    }

    if(!item.studentAnswer || item.studentAnswer == ""){
      if(index == this.index){
        return ExamDataSource.answer_current;
      }else{
        return ExamDataSource.answer_normal;
      }
    }

    if(item.studentAnswer == item.answer){
      return ExamDataSource.answer_right;
    }

    return ExamDataSource.answer_error;
  }

  isAnswerRight(index){
    return this.checkAnswerState(index) == ExamDataSource.answer_right;
  }

  isAnswerError(index){
    return this.checkAnswerState(index) == ExamDataSource.answer_error;
  }

  isAnswerNormal(index){
    return this.checkAnswerState(index) == ExamDataSource.answer_normal;
  }

  getDataList(){
    return this.rawdata;
  }

  getExamDataInfo(){
    return {
      right: this.rightlist.length,
      error: this.errorlist.length,
      index: this.index,
      total: this.total
    };
  }

  notifyDataChange(listener){
    if(listener){
      if(this.total == 0){
        listener(null, 0, 0, -1, 0);
      }else{
        let item = this.rawdata[this.index];
        listener(item, this.rightlist.length, this.errorlist.length, this.index, this.total);
      }
      return;
    }

    if(this.total == 0){
      for(let index in this.callbacklist){
        this.callbacklist[index](null, 0, 0, -1, 0);
      }
    }else{
      let item = this.rawdata[this.index];
      for(let index in this.callbacklist){
        this.callbacklist[index](item, this.rightlist.length, this.errorlist.length, this.index, this.total);
      }
    }
  }

  setDataChangeListener(listener){
    for(let index in this.callbacklist){
      if(this.callbacklist[index] === listener){
        console.log('A same listener has placed in list yet.')
        return;
      }
    }

    this.callbacklist.push(listener);
    this.notifyDataChange(listener);
  }

  removeDataByIndex(index){
    let islast = false;
    if(index == this.total - 1){
      islast = true;
    }

    utils.removeArrayItemByValue(this.rawdata, this.rawdata[index]);
    this.total = this.rawdata.length;

    if(islast){
      this.index = this.total - 1;
    }

    this.normallist = [];
    this.errorlist = [];
    this.rightlist = [];

    this.initDataList();
    this.notifyDataChange();
  }

  updateExamData(answer, index){
    this.rawdata[index].studentAnswer = answer;

    utils.removeArrayItemByValue(this.errorlist, index);
    utils.removeArrayItemByValue(this.rightlist, index);
    utils.removeArrayItemByValue(this.normallist, index);

    let res = this.checkAnswerState(index);

    if(res == ExamDataSource.answer_normal || res == ExamDataSource.answer_current){
       this.normallist.push(index);
    }else if(res == ExamDataSource.answer_right || res == ExamDataSource.answer_done){
      this.rightlist.push(index);
    }else{
      this.errorlist.push(index);
    }

    this.notifyDataChange();
  }

  gotoItemByIndex(index){
    this.index = index;

    this.notifyDataChange();
  }

  checkRightAnswer(){
    let count = 0;
    for(let index in this.rawdata){
      let item = this.rawdata[index];

      if(item.studentAnswer == item.answer){
        count++;
      }
    }

    return count;
  }
}
