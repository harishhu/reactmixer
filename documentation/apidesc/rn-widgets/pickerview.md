#选项视图 - PickerView
数据选择控件
```javascript
import {
    PickerView
} from 'zatech-react-native';

<PickerView 
  items={this.props.items}
  style={{backgroundColor:'#fff', width:'100%', height:160}}
  onChange={function(column, index){
      alert('select index = ' + index);
  }}/>
```