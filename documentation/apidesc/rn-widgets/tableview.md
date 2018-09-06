#表格 - TableView
函数介绍：

函数 | 描述
:-|:-
updateTableItem()|当数据源改变后，调用该函数刷新表格数据

属性介绍：

属性 | 描述
:-|:-
enableItemDelete:boolean|是否开启左滑删除，默认为false
onItemDeleted(index, item):function|指定表格项左滑删除时回调
hideTableHeader:boolean|是否隐藏表格头，默认为false
data:array|设置数据源，数据格式见参考代码
headerArray:array|设置表格头数据数组
headerItemWidthArray:array|设置表格头数组的宽度比例
customStyle|自定义样式，详见参考代码

参考代码：
```javascript
import {
    TableView
  } from 'zatech-react-native';

renderTabTable = (index)=>{
    //表格标题数组
    this.headerArray = ['保障计划', '投保对象','每期保费'];
    //设置标题宽占比为 4:3:3
    this.headerItemWidthArray = ['40%', '30%', '30%'];
    
    //设置表格数据
    this.tableData = [
      [
        '南山人寿抚爱小额终身寿险',
        'harish',
        '599.00'
      ],
      [
        '南山人寿抚爱小额终身寿险11',
        'harish11',
        '66.00'
      ]
    ]

    this.renderTableItem = (row, column, item)=>{
      return (
        <View style={
          {
            width: '100%',
            height: 60,
            justifyContent:'center',
            alignItems: 'center'
          }
        }>
          <Text style={
            {
              color: '#00000099',
              fontSize: 13
            }
          }>
            {item}
          </Text>
        </View>
      )
    }

    return (
      <View style={
        {
          width:'90%',
          height: '100%',
          marginLeft:'5%'
        }
      } key={index}>
        <TableView
          enableItemDelete={true}
          onItemDeleted={function(index, item){
            //alert('u removed item : ' + index);
            return true;
          }}
          hideTableHeader={false}
          data={this.tableData}
          headerArray={this.headerArray}
          headerItemWidthArray={this.headerItemWidthArray}
          customStyle={{
            headerHeight: 45,
            haderBackgroundColor: 'white',
            headerColor:'#333333',
            headerFontSize: 14,
            headerSeparatorWidth: 0.5,
            headerSeparatorColor: '#e1e1e1',
            headerSeparatorHeight: 14.5,

            tableSeparatorLineColor: '#e1e1e1',
            tableSeparatorLineWidth: 1
          }}
          renderTableItem={this.renderTableItem}
          >
        </TableView>
      </View>
    );
  }
```