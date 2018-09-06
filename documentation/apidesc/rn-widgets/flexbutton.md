#灵活按钮 - FlexButton
所谓灵活按钮，是指可以更灵活的配置按钮的样式，包括正常和选中时的按钮样式
```javascript
import {
    FlexButton
} from 'zatech-react-native';

  <FlexButton
    ref='flexbutton'
    //设置按钮样式
    style={styles.flexbutton}
    //设置选中状态的按钮样式
    selectStyle={
        {
        }
    }
    image={require('./res/pic_login_but.png')}
    text={this.zastrings.flex_button}
    //设置文本样式
    textStyle={
    {
        marginLeft:20
    }
    }
    //设置选中状态的文本样式
    textSelectStyle={
        {
        }
    }
    onClick={this.clickLogin.bind(this)}
/>
```
设置和获取按钮状态：
```javascript
//获取按钮状态
let issel = this.refs.flexbutton.isSelected();

//设置按钮
this.refs.flexbutton.setSelected(true or false)
```
