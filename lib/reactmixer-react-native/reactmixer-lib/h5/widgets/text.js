import React from 'react';

const {
    ZAComponent
} = global.reactmixer;

class Text extends ZAComponent{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <a style={
                this.props.style
            } onClick={this.props.onPress}>
            {
                React.Children.map(this.props.children, (element,index)=>{
                    console.log('value = ' + element);
                    return element;
                })
            }
            </a>
        )
    }
}

module.exports = Text;
