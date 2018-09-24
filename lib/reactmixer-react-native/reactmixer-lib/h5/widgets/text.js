import React from 'react';

let {
    ZAComponent
} = global.reactmixer;

class Text extends ZAComponent{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <a style={
                this.composeStyle([{
                    display:'flex'
                }, this.props.style])
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
