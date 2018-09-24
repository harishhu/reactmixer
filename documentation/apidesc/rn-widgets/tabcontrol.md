#Tab控件 - TabControl
##功能介绍
TabControl目前支持的功能有：
 * 设置tab header是位置(top or bottom)
 * 设置tab header item的高度和宽度
 * 设置tab header item项太多时，是否要左右滚动，如果需要，header item的宽度必须设置，如果不需要的话，控件会自动设置header item的宽度(均分，宽度设置无效)
 * 设置header item render(不适用默认)
 * 设置tab content render
 * 设置tabcontrol的高度是固定的，还是跟随各个tab content的高度(包裹，切换tab时tabcontrol高度会动态调整)

对应的设置属性介绍:
 

 属性 | 描述
:-|:-
tabtitles|设置数据源
onSelectIndex|设置tab item选中回调,参数 index
tabposition|设置tab header位置，<br/>top：顶部，bottom：底部
tabHeaderType|默认：fit，设置tab header的类型，是滚动还是固定的<br/>fit:宽度固定，scroll：自动滚动
tabContentType|默认：fit，设置tabcontrol的高度是固定的，还是跟随content<br/>fit:固定，auto：跟随content动态调整
titleheight|设置tab header的高度
titlewidth|设置tab header的宽度，只在tabHeaderType=‘scroll’时有效
headerItemRender|设置header item render，不使用默认，参数(item, index, issel)

##默认TabControl
```javascript
import {
    TabControl
} = global.reactmixer;
    //tab数据项配置， title为标题，body为render component
     this.tabitems = [
      {
        title: '列表',
        body:this.renderListTab
      },
      {
        title: '表格',
        body:this.renderTabTable
      },
      {
        title: '控件',
        body: this.renderTabControls.bind(this)
      },
      {
        title: '网格',
        body:this.renderGridLayout
      },
    ]

<TabControl 
    //定义tab header 位置，top为顶部，bottom为底部
    tabposition={this.state.tabdirection} 
    //设置tab数据源
    tabtitles={this.tabitems}
    //tab选中回调
    onSelectIndex={function(index){
        alert('tab sel index = ' + index);
    }}>
    {
        this.tabitems.map((item, index)=> {
         return item.body(index);
        })
    }
</TabControl>
```

##设置header item滚动，header item的宽度
设置tabHeaderType=‘scroll’,并设置header item的宽度，记住，设置为滚动时宽度必须配置，这样当header item的总宽度超过屏幕时，就可以对header item进行左右滑动
```javascript
<TabControl 
    //设置header item可以滚动
    tabHeaderType=‘scroll’
    //header item的宽度
    titlewidth={94}
    //定义tab header 位置，top为顶部，bottom为底部
    tabposition={this.state.tabdirection} 
    //设置tab数据源
    tabtitles={this.tabitems}
    //tab选中回调
    onSelectIndex={function(index){
        alert('tab sel index = ' + index);
    }}>
    {
        this.tabitems.map((item, index)=> {
         return item.body(index);
        })
    }
</TabControl>
```
##设置header item渲染函数
如果觉得默认的header样式不符合要求，可以自定义：
```javascript
this.headerItemRender = (item, index, issel)=>{
    return (
        <View/>
    )
}
<TabControl 
    headerItemRender={this.headerItemRender}
    //设置header item可以滚动
    tabHeaderType=‘scroll’
    //header item的宽度
    titlewidth={94}
    //定义tab header 位置，top为顶部，bottom为底部
    tabposition={this.state.tabdirection} 
    //设置tab数据源
    tabtitles={this.tabitems}
    //tab选中回调
    onSelectIndex={function(index){
        alert('tab sel index = ' + index);
    }}>
    {
        this.tabitems.map((item, index)=> {
         return item.body(index);
        })
    }
</TabControl>
```
##设置TabControl的高度跟随Tab content
如果各个tab content的高度的不一致，而我们希望tab control的高度不要固定，能够跟随各个tab content的高度做动态调整，这时候就可以通过设置属性
```javascript
tabContentType=‘auto’
```
来实现，有一点要注意，当设置为auto后，TabControl的style中设置的height是无效的，高度只会由Tab Content的高度决定

