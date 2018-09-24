import React from 'react';

let {
    ZAComponent
} = global.reactmixer;

import './textinput.scss'

class TextInput extends ZAComponent{
    constructor(props){
        super(props);
    }

    userInputChange = (event)=>{
        if(this.props.onChangeText){
            this.props.onChangeText(event.target.value);
        }
    }

    render(){
        return (
            <input className="textinput" style={
                this.composeStyle([{
                    display:'flex'
                }, this.props.style])
            } type='text' defaultValue={this.props.value} onChange={this.userInputChange}>
            </input>
        )
    }
}

module.exports = TextInput;
