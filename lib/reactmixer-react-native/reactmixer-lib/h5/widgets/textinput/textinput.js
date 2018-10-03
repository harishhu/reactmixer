import React from 'react';

const {
    ZAComponent
} = global.reactmixer;

import './textinput.scss'

class TextInput extends ZAComponent{
    constructor(props){
        super(props);

        this.inputtype = 'text';

        if(this.props.secureTextEntry){
            this.inputtype = 'password';
        }
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
            } type={this.inputtype} defaultValue={this.props.defaultValue} placeholder={this.props.placeholder} onChange={this.userInputChange}>
            </input>
        )
    }
}

module.exports = TextInput;
