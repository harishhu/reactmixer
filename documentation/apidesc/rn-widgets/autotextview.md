#滚动新闻控件 - AutoTextView
上下轮播文字新闻控件
参考代码：
```javascript
import {
    AutoTextView
} = global.reactmixer;

textItems = ['test1', 'test2', 'test3'];

<AutoTextView 
//设置滚动数据源
items={this.textItems}
//设置滚动文字大小
textSize={16} 
//设置滚动文字颜色
textColor="#0000ff"
//设置滚动间隔
autoScrollTimeInterval={3}
/>
```