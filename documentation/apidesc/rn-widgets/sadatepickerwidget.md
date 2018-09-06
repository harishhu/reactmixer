#日期选择控件 - SADatePickerWidget
函数介绍：
```javascript
   /**
    * 显示日期对话框
    * @param
   *   mode enum('date', 'time', 'datetime')
   *   date:年月日
   *   time:时分
   *   datetime:月日时分
   *   yearmonth:年月
   *   year:年
   */
  static show(mode, currentDate, pickcallback);

  /**
   * 隐藏日期对话框
  */
  static hidePicker();
```
参考代码：
```javascript
 let current = new Date().getTime().toString();
 SADatePickerWidget.show('date', current, (selectdate)=>{
    this.showToast('selete date = ' + selectdate);
});
```