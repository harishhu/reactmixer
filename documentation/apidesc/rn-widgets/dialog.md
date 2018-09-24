#基础对话框 - Dialog
所谓基础对话框，就是可以通过Dialog自定义弹出窗口：
```javascript
import {
    Dialog
} = global.reactmixer;

let dialog = new Dialog();
dialog.setContentRender(function(){
    return (
    <View>
        <Button title='close' onPress={
        function(){
            dialog.hide();
        }
        }>
        </Button>
    </View>
    )
})

dialog.show();
```