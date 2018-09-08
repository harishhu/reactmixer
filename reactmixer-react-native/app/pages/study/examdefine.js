
export default class ExamDefine{
  constructor(){
  }

  static ERROR_SUBJECT_CACHE_KEY = 'error_cache_key';

  static TYPE_EXERCISE = 'exercise';
  static TYPE_SIMULATOR = 'simulator';
  static TYPE_ERRORPROGRAMS = 'errorprograms';
  static TYPE_EXAM = 'exam';

  //题目类型
  static SUBJECT_TYPE_SINGLE = 1; //单选
  static SUBJECT_TYPE_MULTI = 2;  //多选
  static SUBJECT_TYPE_TRUEFALSE = 3; //判断题
}
