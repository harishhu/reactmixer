import React, {Component} from 'react';
import {
    View
} from 'react-native';

class NaviContent extends Component<{}> {
    constructor(props) {
        super(props);

        this.navigator = this.props.navigator;

        this.forceUpdate = false;
        this.state = {show: false};

        this.actionbardata = {};
        this.actionbardata.leftitems = [];
        this.actionbardata.rightitems = [];
    }

    componentDidMount(){
        this.navibargroup = this.navigator.refs.navibargroup;
        this.navibar = this.navibargroup.refs.navibar;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.forceUpdate) {
            this.forceUpdate = false;
            return true;
        }
        return false;
    }

    setRenderBody(body) {
        this.forceUpdate = true;
        this.page = body;

        //alert(this.page.entry);

        this.setState(
            {
                renderBody: this.page ? this.page.render : undefined
            }
        )
    }

    showView(show) {
        this.forceUpdate = true;

        this.setState(
            {
                show: show
            }
        )
    }

    renderViewBind = (ins)=>{
      if(ins){
       //this.page.controller.renderAttached(ins);
      }
    }

    getDefaultLeftNaviItem() {
        let item = {};
        item.name = '返回';
        item.icon = require('./../res/icon_back.png');
        item.callback = (item, index) => {
            this.navigator.goBack();
        };

        return item;
    }

    initDefault(){
        this.initNaviItems();
        this.showTitleBar(true);
        this.showStatusBar(true);
    }

    initNaviItems(){
        let leftitem = this.getDefaultLeftNaviItem();
        this.actionbardata.leftitem = [leftitem];
        this.navibar.setNaviItemData(true, this.actionbardata.leftitem);

        this.actionbardata.rightitem = undefined;
        this.navibar.setNaviItemData(false, this.actionbardata.rightitem);

        this.setBackgroundColor(undefined);
    }

    restoreActionBar(data){
        if(data != undefined){
            this.actionbardata = data;
        }

        // console.log('restoreActionBar title = ' + this.actionbardata.title);

        this.setBackgroundColor(this.actionbardata.bgcolor);
        this.setTitle(this.actionbardata.title);
        this.navibar.setNaviItemData(false, this.actionbardata.rightitem);
        this.navibar.setNaviItemData(true, this.actionbardata.leftitem);
        this.setBackgroundImage(this.actionbardata.bgimage);
        this.showTitleBar(this.actionbardata.showTitleBar == undefined ? true : this.actionbardata.showTitleBar);
        this.showStatusBar(this.actionbardata.showStatusBar == undefined ? true : this.actionbardata.showStatusBar);
    }

    showTitleBar(show) {
        this.navibargroup.showTitleBar(show);
        this.actionbardata.showTitleBar = show;
    }

    showStatusBar(show) {
        this.navibargroup.showStatusBar(show);
        this.actionbardata.showStatusBar = show;
    }

    setTitle(value) {
        // if(this.refs.navi){
        //   this.refs.navi.updateTitle(value);
        //   this.currentRoutPage.title = value;  
        // }
        // console.log('navi content title = ' + value);
        
        this.actionbardata.title = value;
        this.navibar.updateTitle(value);
    }

    setBackgroundColor(bgcolor) {
        this.navibargroup.setBackgroundColor(bgcolor);
        this.actionbardata.bgcolor = bgcolor;
    }

    setBackgroundImage(source) {
        this.navibargroup.setBackgroundImage(source);
        this.actionbardata.bgimage = source;
    }

    setLeftNaviItem(icon, name, callback) {
        if (icon == undefined) {
            icon = require('./../res/icon_back.png');
        }

        let item = {};
        item.name = name;
        item.icon = icon;
        item.callback = callback;

        this.actionbardata.leftitem = [item];
        this.navibar.setNaviItemData(true, this.actionbardata.leftitem);
    }

    setRightNaviItem(icon, name, callback) {
        let item = {};
        item.name = name;
        item.icon = icon;
        item.callback = callback;

        this.actionbardata.rightitem = [item];
        this.navibar.setNaviItemData(false, this.actionbardata.rightitem);
    }

    setLeftNaviItems(items){
        if(items == undefined){
            this.actionbardata.leftitem = [];
        }else{
            this.actionbardata.leftitem = items;
        }

        this.navibar.setNaviItemData(true, this.actionbardata.leftitem);
    }

    setRightNaviItems(items){
        if(items == undefined){
            this.actionbardata.rightitem = [];
        }else{
            this.actionbardata.rightitem = items;
        }

        this.navibar.setNaviItemData(false, this.actionbardata.rightitem);
    }

    render() {
        const RenderView = this.state.renderBody;
        // alert(RenderView);

        if(RenderView){
          return (
            <View style={
              {
                width: '100%',
                height: '100%',
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: this.state.show ? 'flex' : 'none',
              }
            }>

            <RenderView {...this.page.initprops} ref={this.renderViewBind}/>
            {/*{this.state.renderBody ? this.state.renderBody : undefined}*/}

          </View>
        )
      }else{
        return (
          <View style={
            {
              width: '100%',
              height: '100%',
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              display: this.state.show ? 'flex' : 'none',
            }
          }>
        </View>
      )
      }
    }
}

module.exports = NaviContent;
