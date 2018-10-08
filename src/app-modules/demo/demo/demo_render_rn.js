import React from 'react';

const {
    StyleSheet,
    Text,
    View,
    Button,
    ZAComponent,
    Dimensions,
    TabControl,
    PureList,
    TableView,
    GridView,
    SinglePickerDialog,
    MultiPickerDialog,
    AlertDialog,
    Dialog,
    SADatePickerWidget,
    UIBase
} = global.reactmixer;

var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

//console.log('tabcontrol = ' + TabControl);

export default class HomeRender extends ZAComponent{
  constructor(props){
    super(props);

    this.state = {
      tabdirection:'top'
    }

    this.tabitems = [
      {
        title: '列表',
        body: this.renderListTab
      },
      {
        title: '表格',
        body: this.renderTabTable
      },
      {
        title: '控件',
        body: this.renderTabControls.bind(this)
      },
      {
        title: '网格',
        body: this.renderGridLayout
      }
    ]
    
    this.initNaviItems();
  }

  initNaviItems(){
    setTimeout(()=>{
      this.navigator.setTitle('  ReactMixer');
    }, 500);
    
    let item1 = {};
    item1.name = '切换Tab';
    // item1.interval = 20;
    item1.callback = ()=>{
      if(this.state.tabdirection == 'top'){
        this.setState(
          {
            tabdirection: 'bottom'
          }
        )
      }else{
        this.setState(
          {
            tabdirection: 'top'
          }
        )
      }
    }

    let item2 = {};
    item2.name = '返回数据';
    // item2.interval = 20;
    item2.callback = ()=>{
      this.navigator.setBackResultData('result data from test home page');      
    }

    this.navigator.setRightNaviItems([item1, item2]);
  }
  
  renderGridLayout = (index)=>{
    let datasource = [];
    for(let i = 0; i < 13; i++){
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
        <Button style={
          {
            width: '100%',
            height: 50
          }
        } onClick={()=>{
          datasource.splice(0, datasource.length);
          for(let i = 0; i < 5; i++){
            datasource.push('new item ' + i);
          }

          this.refs.gridview.updateGridView();
      }} title='update grid view'/>
        <GridView
        ref='gridview'
        style={
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

  renderTabTable = (index)=>{
    this.headerArray = ['保障计划', '投保对象','每期保费'];
    this.headerItemWidthArray = ['40%', '30%', '30%'];
    
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
      ],
      [
        '南山人寿抚爱小额终身寿险22',
        'harish22',
        '6622.00'
      ],
      [
        '南山人寿抚爱小额终身寿险33',
        'harish',
        '599.00'
      ],
      [
        '南山人寿抚爱小额终身寿险44',
        'harish11',
        '66.00'
      ],
      [
        '南山人寿抚爱小额终身寿险55',
        'harish22',
        '6622.00'
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
            headerBackgroundColor: 'white',
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
        ref='purelist' data={ll} onItemSelected={
        (index, item, purelist)=>{
          //alert('u click a item with index = ' + index);
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
                width: '100%',
                height: 50,
                justifyContent : 'center',
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

renderTabControls(index){
  let parent = this;

  return (
    <View key={index}>
      {/* <Button style={
        {
          width:'100%',
          height: 50,
          backgroundColor:'white'
        }
      } onClick={()=>{
        let items = [
          '111',
          '222',
          '333',
          '444',
          '555',
          '666'
        ]

        SinglePickerDialog.showPicker(items, 3, (index, itemlist)=>{
          this.showToast('the item u selected is = ' + itemlist[index])
        });
      }} title='picker'/>
      <Button style={
        {
          width:'100%',
          height: 50,
          backgroundColor:'white'
        }
      } onClick={()=>{
        let items = [[
          '111',
          '222',
          '333',
          '444',
          '555',
          '666'
        ],
        [],
        []
      ]

        MultiPickerDialog.showMultiPicker(items,
        (multipicker, column, index)=>{
          if(column == 0){
            multipicker.updateColumnItems(1, ['t1', 't2', 't3']);
          }else if(column == 1){
            multipicker.updateColumnItems(2, ['m1', 'm2', 'm3', 'm4']);
          }
        },
        (indexarray, items)=>{
          let s = '';
          for(let i = 0; i < indexarray.length; i++){
            s += 'column ' + i + ': select index = ' + indexarray[i] + ';'
          }

          alert(s);
        });
      }} title='multi picker'/> */}
      <Button style={
        {
          width:'100%',
          height: 50,
          backgroundColor:'white'
        }
      } onClick={()=>{
        UIBase.showToast('this is a test toast message');
      }} title='toast'/>
      <Button style={
        {
          width:'100%',
          height: 50,
          backgroundColor:'white'
        }
      } onClick={()=>{
        UIBase.showProgress(true);
        setTimeout(function(){
          UIBase.showProgress(false);
        }, 3000);
      }} title='spinner'/>
      <Button style={
        {
          width:'100%',
          height: 50,
          backgroundColor:'white'
        }
      } onClick={()=>{
        let dialog = new AlertDialog();
        dialog.setTitle('test');
        dialog.setContent('test content')
        dialog.setLeftButton('left', function(){
          dialog.hide();
        })
        dialog.setRightButton('right', function(){
          dialog.hide();
        })
        dialog.show(this);
      }} title='alert dialog'/>
      <Button style={
        {
          width:'100%',
          height: 50,
          backgroundColor:'white'
        }
      } onClick={()=>{
        let dialog = new Dialog();
        dialog.setContentRender(function(){
          return (
            <View>
              <Button style={
        {
          width: 100,
          height: 50,
          backgroundColor:'white'
        }
      } title='close' onClick={
                function(){
                  dialog.hide();
                }
              }>
      
            </Button>
          </View>
        )
      })
      dialog.show(this);
      }} title='common dialog'/>
     {/* <Button style={
        {
          width:'100%',
          height: 50,
          backgroundColor:'white'
        }
      } onClick={()=>{
       let current = new Date().getTime().toString();
        SADatePickerWidget.show('date', current, (selectdate)=>{
          this.showToast('selete date = ' + selectdate);
        });
      }} title='date picker'/> */}
  </View>
)
}
    renderItem() {
        // 数组
        var itemAry = [];
        // 颜色数组
        var colorAry = ['gray', 'green', 'blue', 'yellow', 'black', 'orange'];
        // 遍历
        for (var i = 0; i<colorAry.length; i++) {
            itemAry.push(
                <View key={i} style={[styles.itemStyle, {backgroundColor: colorAry[i]}]}></View>
            );
        }
        return itemAry;
    }

componentDidMount(){
  this.showToast('launch data = ' + this.launchData);

  // setTimeout(()=>{
  //   let dialog = new Dialog();
  //   dialog.setContentRender(function(){
  //     return (
  //       <View>
  //         <Button style={
  //   {
  //     width: 100,
  //     height: 50,
  //     backgroundColor:'white'
  //   }
  // } title='close' onClick={
  //           function(){
  //             dialog.hide();
  //           }
  //         }>

  //       </Button>
  //     </View>
  //   )
  // })
  // dialog.show(this);
  // }, 3000)

  this.test = 'hufuyi';
}

render() {
 // console.log('tabcontrol = ' + TabControl);
  return (
    <View style={styles.container}>
      <TabControl 
      tabposition={this.state.tabdirection} 
      tabtitles={this.tabitems}
      onSelectIndex={function(index){
        //alert('tab sel index = ' + index);
      }}>
        {
          this.tabitems.map((item, index)=> {
            return item.body(index);
          })
        }
      </TabControl>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  scrollView: {
        backgroundColor: 'red',
        position:'absolute',
        marginTop:100,
  },
  itemStyle: {
        // 尺寸
        width:ScreenWidth,
        height:130
  },
});
