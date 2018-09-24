import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

let {
  PureList
} = global.reactmixer;

class TableView extends Component {
  constructor(props) {
    super(props);

    this.tableHeaderDesc = this.props.headerDesc;
    this.tableData = this.props.data;

    if(this.props.headerArray){
      this.initByDataArray();
    }else{
      this.initByObject();
    }
  }

  initByObject(){
    this.datasource = [];
    this.headerArray = [];

    for(key in this.tableHeaderDesc){
      this.headerArray.push(key);
    }

    if(this.tableData){
      for(let index = 0; index < this.tableData.length; index++){
        this.datasource.push(this.tableData[index]);
      }
    }
  }

  initByDataArray(){
    this.datasource = [];
    this.headerArray = [];

    this.tableHeaderDesc = {};

    for(let index in this.props.headerArray){
      let item = {};

      item.name = this.props.headerArray[index];
      item.width = this.props.headerItemWidthArray[index];

      this.tableHeaderDesc['item' + index] = item;
    }

    for(let index = 0; index < this.tableData.length; index++){
      let itemarray = this.tableData[index];
      let item = {};

      for(let index1 = 0; index1 < itemarray.length; index1++){
        item['item' + index1] = itemarray[index1];
      }

      this.datasource.push(item);
    }

    for(key in this.tableHeaderDesc){
      this.headerArray.push(key);
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.forceUpdate == true){
      if(nextProps.data){
        this.initDataSourceByProps(nextProps);
      }

      this.superList.updateListItem(-1);
    }
  }

  initDataSourceByProps(nextProps){
    this.tableData = nextProps.data;
    this.datasource.splice(0, this.datasource.length);

    if(this.props.headerArray){
      for(let index = 0; index < this.tableData.length; index++){
        let itemarray = this.tableData[index];
        let item = {};

        for(let index1 = 0; index1 < itemarray.length; index1++){
          item['item' + index1] = itemarray[index1];
        }

        this.datasource.push(item);
      }
    }else{
      for(let index = 0; index < this.tableData.length; index++){
        this.datasource.push(this.tableData[index]);
      }
    }
  }

  componentDidMount() {
  }

  headerRender(){
    if(this.props.hideTableHeader){
      return undefined;
    }

    let {
      headerHeight,
      headerBackgroundColor,
      headerColor,
      headerSeparatorColor,
      headerSeparatorWidth,
      headerSeparatorHeight,
      headerFontSize
    } = this.props.customStyle;

    return (
      <View style={
        {
          width: '100%',
          height: headerHeight ? headerHeight : 44,
          backgroundColor: headerBackgroundColor,
          flexDirection:'row'
        }
      }>

      {
        this.headerArray.map((item, index)=>{
          let showsep = index < this.headerArray.length - 1;
          return (
            <View style={
              {
                width: this.tableHeaderDesc[item].width,
                height: '100%',
                justifyContent: 'center',
                alignItems:'center'
              }
            } key={index}>
            <Text style={
              {
                color: headerColor,
                fontSize: headerFontSize
              }
            }>
            {this.tableHeaderDesc[item].name}
            </Text>

            <View style={
              {
                display: showsep ? 'flex':'none',
                position:'absolute',
                width: headerSeparatorWidth,
                height: '100%',
                backgroundColor: '#ff000000',
                right: 0,
                top: 0,
                bottom: 0,
                flexDirection:'row',
                alignItems: 'center'
              }
            }>
            <View style={
              {
                width: '100%',
                height: headerSeparatorHeight,
                backgroundColor: headerSeparatorColor
              }
            }>
            </View>
            </View>
        </View>
      )
    })
       }
    </View>
  )
}

renderTableItemRowColumn(row, column, item){
  if(this.props.renderTableItem){
    return this.props.renderTableItem(row, column, item);
  }else{
    return (
      <View style={
        {
          width: '100%',
          justifyContent:'center',
          alignItems: 'center'
        }
      }>
        <Text>
          {item}
        </Text>
      </View>
    )
  }
}

renderTableItem = (tableitem)=>{
  let {
    tableSeparatorLineWidth,
    tableSeparatorLineColor
  } = this.props.customStyle;

  return (
    <View style={
      {
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        marginLeft: 0,
        borderColor: tableSeparatorLineColor,
        borderWidth: tableSeparatorLineWidth,
        borderTopWidth: tableitem.index > 0 ? 0 : tableSeparatorLineWidth
      }
    }>

    {
      this.headerArray.map((item, index)=>{
        return (
          <View style={
            {
              width: this.tableHeaderDesc[item].width,
              borderWidth: 0,
              borderColor: tableSeparatorLineColor,
              borderLeftWidth: index > 0 ? tableSeparatorLineWidth : 0
            }
          } key={index}>
          {
            this.renderTableItemRowColumn(tableitem.index, index, tableitem[item])
          }
          </View>
    )
  })
     }
  </View>
)
}

updateTableItem = ()=>{
  this.initDataSourceByProps(this.props);
  this.superList.updateListItem(-1);
}

render() {
  return (
    <PureList enableItemDelete={this.props.enableItemDelete} onItemSelected={this.props.onItemSelected} onItemDeleted={this.props.onItemDeleted} ref={(e)=>this.superList=e}  data={this.datasource} style={styles.container} ListHeaderComponent={this.headerRender()}
      renderItem={this.renderTableItem}>
    </PureList>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

module.exports = TableView;
