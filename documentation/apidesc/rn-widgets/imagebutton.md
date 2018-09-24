#图片按钮 - ImageButton
可以快速的实现一个图片按钮
```javascript
import {
    ImageButton
} = global.reactmixer;

<ImageButton style={styles.loginbutton}
    image={require('./res/pic_login_but.png')}
    text={this.zastrings.image_button}
    textColor='blue'
    textFontSize={16}
    onClick={this.clickLogin.bind(this)}
/>

const styles = StyleSheet.create({
  loginbutton:{
    width: '80%',
    height: 75,
  }
});
```
如果想要对按钮做更多的配置，可以使用FlexButton