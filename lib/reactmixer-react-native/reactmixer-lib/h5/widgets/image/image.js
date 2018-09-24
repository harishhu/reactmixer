import React from 'react';

let {
    ZAComponent
} = global.reactmixer;

class Image extends ZAComponent{
    constructor(props){
        super(props);

        let s = this.props.source;
        let uri = s.uri;

        if(uri){
            this.source = uri;
        }else{
            this.source = s;
        }
    }

    render(){
        return (
            <img style={
                this.composeStyle([{
                    display:'flex'
                }, this.props.style])
            } className="image" src={this.source}/>
        )
    }
}

module.exports = Image;
