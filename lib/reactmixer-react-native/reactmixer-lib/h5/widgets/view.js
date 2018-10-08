import React from 'react';

const {
    ZAComponent
} = global.reactmixer;

class View extends ZAComponent{
    constructor(props){
        super(props);
    }

    onClick = ()=>{
        if(this.props.onClick){
            this.props.onClick();
        }
    }

    render(){
        return (
            <div style={
                this.composeStyle([{
                    display:'flex',
                    flexDirection: "column",
                }, this.props.style])
            } onClick={this.onClick}>
            {
                React.Children.map(this.props.children, (element, index)=>{
                    return element;
                })
            }
            </div>
        )
    }
}

module.exports = View;
