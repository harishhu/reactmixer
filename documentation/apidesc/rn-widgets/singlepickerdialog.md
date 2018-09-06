#单列选项对话框 - SinglePickerDialog
函数介绍：
```javascript
  /**
   * 显示picker dialog
   * 
   * @param
   * items : picker data array
   * defaultindex: default index
   * pickcallback: 选中回调
  */
  static showPicker(items, defaultindex, pickcallback);
  /**
   * 隐藏picker dialog
  */
  static hidePicker(){
```
参考代码：
```javascript
 let items = [
          '111',
          '222',
          '333',
          '444',
          '555',
          '666'
        ]

SinglePickerDialog.showPicker(items, 3, (index, itemlist)=>{
    //回调处理
    this.showToast('the item u selected is = ' + itemlist[index])
});
```