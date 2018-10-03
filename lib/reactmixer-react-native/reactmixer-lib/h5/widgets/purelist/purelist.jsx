import React from 'react';

import './purelist.scss';

const {
	ZAComponent
} = global.reactmixer;

class PureList extends ZAComponent{
  constructor(props){
    super(props);

    this.config = this.props.config;
    this.drawcount = 0;
  }

  static defaultProps = {
    config:{
      sepreatorHeight: 1,
      sepreatorColor: '#e1e1e1',
    },
    onItemSelect: undefined
  }

  onSelect(index){
    console.log('selected item:' + index);

    if(this.props.onItemSelected){
      this.props.onItemSelected(index, this.props.data[index], this);
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.redraw){
      this.redraw = false;
      return true;
    }

    return false;
  }

  updateListItem(index){
    this.redraw = true;
    this.setState({
      drawcount: ++this.drawcount
    })
  }

  renderListHeader(){
    return (
      <li className='listitem'>
        {this.props.ListHeaderComponent}
      </li>
    )
  }

  render() {
    let SEPRATOR = undefined;
    if(this.props.ItemSeparatorComponent){
      SEPRATOR = this.props.ItemSeparatorComponent();
    }

    let length = this.props.data.length;

    return (
      <ol className='listview'>
      {this.props.ListHeaderComponent ? this.renderListHeader() : undefined}
        {
          this.props.data.map((item, index)=>{
              let sepheight = this.config.sepreatorHeight;
              if(this.props.data.length - 1 == index){
                //sepheight = 0;
              }
              item.index = index;
              return (
                <li key={index} className='listitem' onClick={this.onSelect.bind(this, index)}
                    style={
                      {
                        // height: element.props.itemHeight,
                        // borderStyle: 'none none solid none',
                        // borderColor: this.config.sepreatorColor,
                        // borderWidth: sepheight + 'px'
                      }
                    }>
                      {this.props.renderItem(item)}
                      {index < length - 1 ? SEPRATOR : undefined}
                </li>
              )
            })
        }
      </ol>
    );
  }
}

module.exports = PureList;
