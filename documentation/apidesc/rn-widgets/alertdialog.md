#AlertDialog
参考代码：
```javascript
import {
    AlertDialog
} from 'reactmixer-react-native';

let dialog = new AlertDialog();
//设置标题
dialog.setTitle('test');
//设置内容
dialog.setContent('test content');
 //设置left btton
dialog.setLeftButton('left', function(){
     dialog.hide();
})
//设置right btton
dialog.setRightButton('right', function(){
     dialog.hide();
})
dialog.show();
```
也可以选择设置render来实现自定义的内容展示：
```javascript
dialog.setContentRender(function(){
    return (
        <View>
        </View>
    )
})
```