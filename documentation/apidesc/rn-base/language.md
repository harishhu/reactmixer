#多国语言
```javascript
import {
  ZAString
} from 'reactmixer-react-native';

import language_chs from './language/zastring_chs';
import language_cht from './language/zastring_cht';

ZAString.registerLangSource('chs', language_chs);
ZAString.registerLangSource('cht', language_cht);
ZAString.setDefaultLang('cht');
```
language_chs的实现：
```javascript
let lan_chs = {
    login_button_title: '登录',
    login_number_prompt: '请输入账号',
    login_password_prompt: '请输入密码'
}

export default lan_chs;
```
引用字符：
```javascript
//弹出登录字符
alert(ZAString.strings.login_button_title)
```
