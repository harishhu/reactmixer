import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';

import PropTypes from 'prop-types';
import {ViewStylePropTypes} from 'react-native/Libraries/Components/View/ViewStylePropTypes';

const {
    TableView
} = global.reactmixer;

type Props<ItemT>= {
    renderItem: (info: {
        row: number,
        column:number,
        item: ItemT
    }) => ?React.Element<any>,

    data: ?$ReadOnlyArray<ItemT>,
    columnCount: PropTypes.number,
    style: ViewStylePropTypes,
    gridItemHeight: PropTypes.number,
    columnMargin: PropTypes.number,
    onItemClick: PropTypes.func,
};

class GridView extends Component<Props> {
    static defaultProps = {
        columnCount: 1,
        gridItemHeight: 60
    }

    constructor(props){
        super(props);

        this.data = this.props.data;
        this.headerArray = [];
        this.headerItemWidthArray = [];
        this.tableData = [];

        this.initGridData();
    }

    initGridData(){
       this.headerArray.splice(0, this.headerArray.length);
       this.headerItemWidthArray.splice(0, this.headerItemWidthArray.length);
       this.tableData.splice(0, this.tableData.length);

       let columnCount = this.props.columnCount;
       let percent = 100 / columnCount + "%";
       
       for(let index = 0; index < columnCount; index++){
           this.headerArray.push("" + index);
           this.headerItemWidthArray.push(percent);
       }

       for(let index = 0; index < this.data.length; index += columnCount){
           let gridrow = [];

           for(let subindex = 0; subindex < columnCount; subindex++){
               let realindex = index + subindex;
            //    console.log('index = ' + realindex + ' data = ' + this.data[realindex]);
               gridrow.push(this.data[realindex]);

               if(realindex == this.data.length - 1 || subindex == columnCount - 1){
                   this.tableData.push(gridrow);
                   break;
               }
           }
       }
    }

    updateGridView(){
        this.initGridData();
        this.refs.gridview.updateTableItem();
    }

    render() {
        return this.renderGridLayout();
    }

    gridItemClicked(row, column, item){
        if(this.props.onItemClick){
            this.props.onItemClick(row, column, item);
        }
    }

    renderGridLayout = ()=>{ 
        this.renderTableItem = (row, column, item)=>{
          return (
            <TouchableWithoutFeedback onPress={this.gridItemClicked.bind(this, row, column, item)}>
            <View style={
              {
                width: '100%',
                height: this.props.gridItemHeight,
                justifyContent:'center',
                alignItems: 'center'
              }
            }>
            {item ? this.props.renderItem(row, column, item): undefined}
            </View>
            </TouchableWithoutFeedback>
          )
        }
    
        return (
          <View style={[this.props.style, styles.container]}
          >
            <TableView
              ref='gridview'
              hideTableHeader={true}
              data={this.tableData}
              headerArray={this.headerArray}
              headerItemWidthArray={this.headerItemWidthArray}
              customStyle={{
                tableSeparatorLineWidth: 0
              }}
              renderTableItem={this.renderTableItem}
              >
            </TableView>
          </View>
        );
      }
};

const styles = StyleSheet.create({
});

module.exports = GridView;
