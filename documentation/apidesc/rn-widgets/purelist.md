#优化列表 - PureList
我们强烈建议所有列表都使用PureList来实现，其特点：
* 列表根据数据源生成后，后续必须使用purelist提供的方法来触发重绘，这样可以最大程度的减少组件重绘，提高效率
* 支持列表项左滑删除

函数介绍：

函数 | 描述
:-|:-
updateListItem(index)|强制刷新列表，index为指定要刷新的列表项，如果全部刷新，传-1

属性介绍：

属性 | 描述
:-|:-
enableItemDelete:boolean|是否开启左滑删除，默认为false
onItemDeleted(index, item):function|指定列表项左滑删除时回调
data:array|数据源
onItemSelected(index, item, purelist):function|列表项选择回调,其中purelist为list组件对象
renderItem(item):function|列表项渲染函数，必须返回对应的渲染组件
ItemSeparatorComponent|设置列表分割线渲染组件
ListHeaderComponent|设置列表头部组件
ListFooterComponent|设置列表尾部组件

参考代码：
```javascript
import {
    PureList
} from 'reactmixer-react-native';

 renderListTab = (index)=>{
    let ll = [];
    for(index = 0; index < 8; index++){
      ll.push({
        title: 'a' + index
      })
    }

    return (
      <View key={index} style={{
        width:'100%',
        height: '100%'
      }}>
      <PureList enableItemDelete={true}
        onItemDeleted={function(index, item){
          alert('u removed item : ' + index);
        }}
        ref='purelist' 
        data={ll} 
        onItemSelected={
        (index, item, purelist)=>{
          //  alert('u click a item with index = ' + index);
          ll.push({
            title: 'a' + ll.length
          })

          ll[0].title = 'count ' + ll.length
          this.refs.purelist.updateListItem(-1);
        }
      }
      renderItem={
        (item)=>(
            <View style={
              {
                width:'100%',
                height: 50,
                justifyContent : 'center'
              }
            }>
            <Text ref='mytext'>
              {'item: ' + item.title}
            </Text>
          </View>
        )
    }
    ItemSeparatorComponent={
      function(){
        return <View style={
          {
            width: '100%',
            height: 1,
            backgroundColor:'#f6f6f6'
          }
        }>
      </View>
    }
  }
  >
  </PureList>
</View>
)
}
```
在代码中，点击列表项后，会修改数据源数据并强制刷新
