import React from 'react';
import utils from './../../appbase/utils/utils.js';

import './listview.scss';

class ListView extends React.Component{
  constructor(props){
    super(props);

    this.config = this.props.config;
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

    if(this.props.onItemSelect){
      this.props.onItemSelect(index);
    }
  }

  render() {
    return (
      <ol className='listview'>
        {
          React.Children.map(this.props.children, (element,index)=>{
              let sepheight = this.config.sepreatorHeight;
              if(this.props.children.length - 1 == index){
                //sepheight = 0;
              }
              return (
                <li key={index} className='listitem' onClick={this.onSelect.bind(this, index)}
                    style={
                      {
                        height: element.props.itemHeight,
                        borderStyle: 'none none solid none',
                        borderColor: this.config.sepreatorColor,
                        borderWidth: sepheight + 'px'
                      }
                    }>
                      {element}
                </li>
              )
            })
        }
      </ol>
    );
  }
}

module.exports = ListView;
