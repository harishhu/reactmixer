import RequestItemBase from './../../../ajax/requestitems';

 export default class ExerciseTopicSetRequestItem extends RequestItemBase{
  path_url = '/exam/getStudyQuestions';

  constructor(){
    super();

    var rawData = {
      paperName: 'studyExam'
    };

    this.setSendData(rawData);
  }

  hostUrl(){
    return super.hostUrl() + this.path_url;
  }
}
