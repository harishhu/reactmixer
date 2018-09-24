
var ScreenWidth = window.screen.width;
var ScreenHeight = window.screen.height;

const BASE_WIN_WIDTH = 375;
const BASE_WIN_HEIGHT = 667;

class utils{
  static getUrlParam(url, name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = url.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  }

  static removeArrayItemByValue(array, val) {
    for(var i = 0; i < array.length; i++) {
      if(array[i] == val) {
        array.splice(i, 1);
        break;
      }
    }
  }

  static getSubImageStr(image){
    return image.substr(15, image.length - 15)
  }

  static Json2Obj(json){
    return JSON.parse(json);
  }

  static Obj2Json(obj){
    return JSON.stringify(obj);
  }
    //根据公历获取当前日期
    /**
     *   mode enum('date', 'yearmonth', 'year')
     *   date:年月日
     *   yearmonth:年月
     *   year:年
     */
    static getCurrentDateByType(type){
        var d = new Date();
        var nowYear = d.getFullYear();
        var nowMonth = d.getMonth() + 1;
        var nowDay = d.getDate();

        var saYear = nowYear - 1911;
      if (type == 'year'){
        return '民国' + saYear + '年';
      }else if(type == 'yearmonth'){
          return '民国' + saYear + '年' + nowMonth + '月';
      }else if(type == 'date'){
          return '民国' + saYear + '年' + nowMonth + '月' + nowDay + '日';
      }
    }

  //根据民国日期计算年龄
  static convertBirthday2Age(birthday){
    var returnAge;
    var strBirthdayArr=birthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    if (birthYear < 1911){
      birthYear = parseInt(birthYear)  + 1911;
    }

    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if(nowYear == birthYear)
    {
      returnAge = 0;//同年 则为0岁
    }
    else
    {
      var ageDiff = nowYear - birthYear ; //年之差

      if(ageDiff > 0)
      {
        if(nowMonth == birthMonth)
        {
          var dayDiff = nowDay - birthDay;//日之差
          if(dayDiff < 0)
          {
            returnAge = ageDiff - 1;
          }
          else
          {
            returnAge = ageDiff ;
          }
        }
        else
        {
          var monthDiff = nowMonth - birthMonth;//月之差
          if(monthDiff < 0)
          {
            returnAge = ageDiff - 1;
          }
          else
          {
            returnAge = ageDiff;
          }
        }
      }
      else
      {
        returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
      }
    }

    return returnAge;//返回周岁年龄

  }
    /** 根据实际屏幕尺寸转换对应的像素高度 */

    static getHeight(height) {
        if (ScreenHeight < BASE_WIN_HEIGHT) {
            return (ScreenHeight / BASE_WIN_HEIGHT)*height;
        }
        return height;
    }

    /** 根据实际屏幕尺寸转换对应的像素宽度 */
    static getWidth(width) {
        if (ScreenWidth < BASE_WIN_WIDTH) {
            return (ScreenWidth / BASE_WIN_WIDTH)*width;
        }
        return width;
    }

  /** 数字金额校验，数字保留两位小数，比如 100.0000112，执行结果100.00 */
  static checkIsMoney(money) {
    var regu = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    var re = new RegExp(regu);
    if (re.test(money)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   *转换long值为日期字符串
   * @param l long值
   * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss
   * @return 符合要求的日期字符串
   */
  static getFormatDateByLong(longTypeDate, pattern) {

    var dateType = "";
    var date = new Date();
    date.setTime(longTypeDate);
    switch (pattern){
      case 'yyyy-MM-dd hh:mm:ss':
        //yyyy-MM-dd hh:mm:ss格式日期
        dateType = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay(date)+"&nbsp;"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        break
      case 'yyyy年MM月dd日 hh:mm:ss':
        //yyyy年MM月dd日 hh:mm:ss格式日期
        dateType = date.getFullYear()+"年"+date.getMonth()+"月"+date.getDay() + '日' +"&nbsp;"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        break
      case 'yyyy-MM-dd':
        dateType = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDay();//yyyy-MM-dd格式日期
            break
      case 'yyyy年MM月dd日':
        dateType = date.getFullYear()+"年"+date.getMonth()+"月"+date.getDay() + '日';//yyyy年MM月dd日格式日期
        break
      case 'yyyy.MM.dd':
        dateType = date.getFullYear()+"."+date.getMonth()+"."+date.getDay();//yyyy.MM.dd格式日期
        break
      case 'yyyy年MM月':
        dateType = date.getFullYear()+"年"+date.getMonth() + '月';//yyyy年MM月格式日期
        break
      case 'yyyy-MM':
        dateType = date.getFullYear()+"-"+date.getMonth();//yyyy-MM格式日期
        break
      default:
        break
    }
    return dateType;
  }
}

module.exports = utils;
