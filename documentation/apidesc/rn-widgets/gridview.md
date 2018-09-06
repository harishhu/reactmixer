#网格控件 - GridView
函数介绍：

函数 | 描述
:-|:-
updateGridView()|在修改数据源后，强制刷新gridview

属性介绍：

属性 | 描述
:-|:-
gridItemHeight|设置grid item的高度
columnCount|设置gridview的列数
data|设置数据源
renderItem|设置grid item render
onItemClick|设置grid item 点击回调

参考代码：
```javascript
renderGridLayout = (index)=>{
    let datasource = [];
    for(let i = 0; i < 20; i++){
      datasource.push('item ' + i);
    }

    let renderitem = function(row, column, item){
      return (
        <Text>{"data:" + item}</Text>        
      )
    }

    return (
      <View key={index} style={
        {
          width:'100%',
          height: 300
        }
      }>
        <GridView style={
        {
          width:'100%',
          height:'100%'
        }
      }
       gridItemHeight={80}
       columnCount={4} 
       data={datasource} 
       renderItem={renderitem}
       onItemClick={
         (row, column, item) =>{
           alert('clicked item : ' + item);
         }
       }
       >
        </GridView>
      </View>
    )
  }
```