import React from 'react';

class ZADataControl{
    constructor(props, render){
        this.props = props;
        this.attachedRender = render;
        if(this.attachedRender){
            this.navigator = this.attachedRender.navigator;
        }
    }

    initProps2Render(){
        return {};
    }

    showToast(toast){
        this.attachedRender.showToast(toast);
    }

    showProgress(show){
        this.attachedRender.showProgress(show);
    }
}

module.exports = ZADataControl;
