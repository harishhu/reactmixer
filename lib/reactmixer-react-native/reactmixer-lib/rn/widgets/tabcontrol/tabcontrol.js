import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

const {
  ZAComponent,
} = global.reactmixer;

class TabHeader extends Component{
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    }

    this.isfitheader = this.props.tabHeaderType == 'fit' ? true: false;

    if(this.props.titlewidth == undefined){
      this.isfitheader = true;
    }
  }

  getHeaderTextStyle(index){
    let issel = this.props.isSelectItem(index);
      if(!this.props.defultTextColor){
          defultTextColor = '#000000';
      }else {
          defultTextColor = this.props.defultTextColor;
      }
      if(!this.props.selectTextColor){
          selectTextColor = '#666666';
      }else {
          selectTextColor = this.props.selectTextColor;
      }
    return {
      color: issel ? selectTextColor : defultTextColor,
      fontSize: ZAComponent.getHeight(15),
      // lineHeight: this.props.titleheight - 2
    }
  }

  onTabHeaderClick(index){
    this.props.onTabHeaderClick(index);

    this.setState(
      {
        count: ++this.state.count
      }
    )
  }

  render(){
    this.titleTextRender = (issel, item,index)=>{
      return (
                <View style={
                  {
                    flex: 1,
                    justifyContent:'center',
                    alignItems:'center'
                  }
                }>
                  <Text style={this.getHeaderTextStyle(index)}>
                    {item.title}
                  </Text>
                </View>
      )
    }

    this.titleIndicatorRender = (issel, item,index)=>{
      return (
        <View style={
          {
            width: '100%',
            height: 2,
            backgroundColor: issel ? '#5da6fa' : 'white'
          }
        }>
        </View>
      )
    }

    if(this.isfitheader){
      return (
        <View style={
          {
            height: this.props.titleheight,
            width: '100%',
            backgroundColor: 'white',
            flexDirection:'row',
            alignItems:'center',
          }
        }>
        {
          this.props.tabtitles.map((item,index)=> {
            let issel = this.props.isSelectItem(index);

            if(this.props.headerItemRender){
              return (
               <TouchableWithoutFeedback key={index} onPress={this.onTabHeaderClick.bind(this, index)}>
                <View style={{
                 flex: 1,
                 justifyContent:'flex-end'
               }}>
                 {this.props.headerItemRender(item, index, issel)}
                 </View>
                 </TouchableWithoutFeedback>
              )
            }else{
              return(
                <TouchableWithoutFeedback key={index} onPress={this.onTabHeaderClick.bind(this, index)}>
                  <View style={{
                    flex: 1,
                    justifyContent:'flex-end'
                  }}>
                  {this.props.istopstyle ? this.titleTextRender(issel, item,index) : this.titleIndicatorRender(issel, item,index)}
                  {this.props.istopstyle ? this.titleIndicatorRender(issel, item,index) : this.titleTextRender(issel, item,index)}
                  </View>
                </TouchableWithoutFeedback>
              ) 
            }
            })
        }
        </View>
      )
    }

    return (
      <View style={
        {
          height: this.props.titleheight,
          width: '100%',
          backgroundColor: 'white'
        }
      }>
       <ScrollView
          style={
            {
              height: '100%',
              width: '100%',
            }
          }
          horizontal={true}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}>
          {
               this.props.tabtitles.map((item,index)=> {
               let issel = this.props.isSelectItem(index);
               if(this.props.headerItemRender){
                 return (
                  <TouchableWithoutFeedback key={index} onPress={this.onTabHeaderClick.bind(this, index)}>
                   <View style={{
                    height:'100%',
                    width: this.props.titlewidth
                  }}>
                    {this.props.headerItemRender(item, index, issel)}
                    </View>
                    </TouchableWithoutFeedback>
                 )
               }
               
               return(
               <TouchableWithoutFeedback key={index} onPress={this.onTabHeaderClick.bind(this, index)}>
                <View style={{
                  height:'100%',
                  width: this.props.titlewidth,
                  flex: 1,
                  justifyContent:'flex-end',
                }}>
                {this.props.istopstyle ? this.titleTextRender(issel, item, index) : this.titleIndicatorRender(issel, item, index)}
                {this.props.istopstyle ? this.titleIndicatorRender(issel, item, index) : this.titleTextRender(issel, item, index)}
                </View>
              </TouchableWithoutFeedback>
            )
          })
      }
        </ScrollView>
        </View>
    )
  }
}

class TabItemContent extends Component{
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState){
    return false;
  }

  render(){
    return (
      <View style={
        {
          flex: 1,
          height: '100%',
          width: '100%'
        }
      }>
         {this.props.ele}
      </View>
    )
  }
}

class TabItemWrap extends Component{
  constructor(props) {
    super(props);
    this.state = {
      updatecount: 0
    }
  }

  componentDidMount(){
    this.ismounted = true;
  }

  updateTabStatus(){
    console.log('---- updateTabStatus ---- ');
    if(this.ismounted){
      this.setState(
        {
          updatecount : ++this.state.updatecount
        }
      );
    }
  }

  render(){
    let issel = this.props.isSelectItem(this.props.index);
    let index = this.props.index;
    console.log('harishhu  - index = ' + index + " issel = " + issel);

    return (
      <View style={
        {
          display : issel ? 'flex' : 'none',
          flex: 1,
          height: '100%',
          width: '100%'
        }
      }>
          <TabItemContent ele={this.props.element}/>
      </View>
    )
  }
}

class TabControl extends Component {
  static defaultProps = {
    titleheight : 42,
    tabposition : 'top'
	}

  constructor(props) {
    super(props);

    this.istopstyle = this.props.tabposition == 'top';
    this.selectindex = this.props.defultSelectIndex ? this.props.defultSelectIndex : 0;

    if(this.props.tabContentType == 'auto'){
      this.heightautostyle = {
        flex: 0,
        height: undefined
      }
    }
  }

  componentWillReceiveProps(nextProps){
    this.istopstyle = nextProps.tabposition == 'top';
  }

  componentDidMount() {
  }

  setSelectTabItem(index){
    let previndex = this.selectindex;
    this.selectindex = index;
    this.refs['tabitem' + previndex].updateTabStatus();
    this.refs['tabitem' + index].updateTabStatus();
  }

  onTabHeaderClick = (index)=>{
    console.log('---- onTabHeaderClick ---- ');
    this.setSelectTabItem(index);

    if(this.props.onSelectIndex){
      this.props.onSelectIndex(index,this);
    }
  }

  renderTitle(){
    return (
      <TabHeader {...this.props} onTabHeaderClick={this.onTabHeaderClick} isSelectItem={this.isSelectItem} istopstyle={this.istopstyle}>
      </TabHeader>
    )
  }

  isSelectItem = (index)=>{
    return this.selectindex == index;;
  }

  renderContent(){
    return (
      <View style={
        {
          flex: 1,
          height: '100%',
          width: '100%'
        }
      }>
      {
            React.Children.map(this.props.children, (element,index)=>{
                return (
                  <TabItemWrap ref={'tabitem' + index} key={index} element={element} index={index} isSelectItem={this.isSelectItem}>
                  </TabItemWrap>
                )
              })
        }
      </View>
    )
  }

  render() {
    if(this.istopstyle){
      return (
        <View style={[styles.container, this.props.style, this.heightautostyle]}>
         {this.renderTitle()}
         {this.renderContent()}
        </View>
      );
    }

    return (
      <View style={[styles.container, this.props.style, {justifyContent: 'flex-end'}, this.heightautostyle]}>
       {this.renderContent()}
       {this.renderTitle()}
      </View>
    );
    
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection:"column",
    width:'100%',
    height:'100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
  }
});

module.exports = TabControl;
