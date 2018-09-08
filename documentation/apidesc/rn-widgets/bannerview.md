#首页Banner - BannerView
首页左右滚动轮播图控件
参考代码：
```javascript
import {
    BannerView
} from 'reactmixer-react-native';

imageURLStringsGroup = ["http://img05.tooopen.com/images/20150114/sy_79162752233.jpg",
    "http://test.gfis.cn/api/file/get?url=1514444558748.jpg","http://img05.tooopen.com/images/20150114/sy_79162752233.jpg",
  "http://pic35.nipic.com/20131105/6704106_015313024000_2.jpg"];

<BannerView 
//设置轮播时间间隔，默认为3秒
autoScrollTimeInterval={3}
//设置轮播默认图
placeholderImage={placeholderImage}
//设置轮播图url数组
imageURLStringsGroup={this.imageURLStringsGroup}
//设置轮播项点击回调
didSelectIndex={this.banneritemclicked}/>
```
