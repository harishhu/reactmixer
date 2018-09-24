#多列选项对话框 - MultiPickerDialog
可以通过传入数组列表来实现多列选择对话框
函数介绍：

函数 | 描述
:-|:-
static showMultiPicker(items, datachangecallback, pickcallback)|静态函数，用于显示多列选项对话框<br/>items:多列数据数组<br/>datachangecallback:每一列数据变化时的回调<br/>pickcallback:用户点击确定时回调，返回最终选择数据
static hideMultiPicker()|静态函数，隐藏对话框
updateColumnItems(column, items)|更新指定列的数据


下面是显示三列选项对话框的参考代码：
```javascript
import {
    MultiPickerDialog
} = global.reactmixer;

 let items = [[
          '111',
          '222',
          '333',
          '444',
          '555',
          '666'
        ],
        [],
        []
      ]
      
//显示对话框
MultiPickerDialog.showMultiPicker(
    items,
    (multipicker, column, index)=>{
       if(column == 0){
          multipicker.updateColumnItems(1, ['t1', 't2', 't3']);
        }else if(column == 1){
            multipicker.updateColumnItems(2, ['m1', 'm2', 'm3', 'm4']);
        }
    },
    (indexarray, items)=>{
        let s = '';
        for(let i = 0; i < indexarray.length; i++){
            s += 'column ' + i + ': select index = ' + indexarray[i] + ';'
        }

        alert(s);
    });

//隐藏对话框
MultiPickerDialog.hideMultiPicker();
```

