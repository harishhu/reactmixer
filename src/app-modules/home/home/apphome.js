import React from 'react';

const {
    // BannerView,
    ZAComponent,
    // AutoTextView,
    TabControl,
    AppModuleManager,
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text
} = global.reactmixer;

const placeholderImage = require('./res/首页-banner.png');

class AppHome extends ZAComponent{
   imageURLStringsGroup = ["http://img05.tooopen.com/images/20150114/sy_79162752233.jpg",
    "http://test.gfis.cn/api/file/get?url=1514444558748.jpg","http://img05.tooopen.com/images/20150114/sy_79162752233.jpg",
  "http://pic35.nipic.com/20131105/6704106_015313024000_2.jpg"];

  constructor(props){
    super(props);

    this.screenWidth = Dimensions.get('window').width;
    this.initDemoRender();
  }

  initDemoRender() {
    let targetmodule = 'demo';
    AppModuleManager.installModule(targetmodule, () => {
      let routepage = AppModuleManager.getModuleRoutePage(targetmodule, 'DemoWidgets');
      if (routepage) {
        this.initHomeTabs(routepage.entry.render);
      } else {
        this.initHomeTabs();
      }
    })
  }

  initHomeTabs(DemoRender){
    this.tabitems = [
      {
        title: '首页',
        imgNormal: require('./res/icon-首页.png'),
        imgSelect: require('./res/icon-首页2.png'),
        body:(index)=>{
          return (
            <View key={index}>
               {/* <BannerView placeholderImage={placeholderImage}
                             imageURLStringsGroup={this.imageURLStringsGroup}
                             didSelectIndex={this.banneritemclicked}/>
               <AutoTextView items={this.imageURLStringsGroup}
                textSize={16} textColor="#0000ff" autoScrollTimeInterval={3}
                /> */}
            </View>
          )
        }
      },
      {
        title: '产品',
        imgNormal: require('./res/icon-产品.png'),
        imgSelect: require('./res/icon-产品2.png'),
        body:(index)=>{
          return (
            <View key={index} style={{width: '100%', height:'100%'}}>
            <DemoRender/>
            </View>
          )
        }
      },   
      {
        title: '我的',
        imgNormal: require('./res/icon-我的.png'),
        imgSelect: require('./res/icon-我的2.png'),
        body:(index)=>{
          return (
            <View key={index}>
            <Text>My Test View</Text>
            </View>
          )
        }
      }
    ]

    if(this.cpmounted){
      this.setState({
        tabitems : this.tabitems
      })
    }
  }

  onBackResult(data){
  }

  componentDidMount(){
    this.cpmounted = true;
    if(this.navigator){
      this.initTabNaviData();
    }
  }

  initTabNaviData(){
    this.navidata = {};

    this.navigator.showTitleBar(false);
    this.navigator.showStatusBar(false);
    this.navidata['0'] = this.navigator.getNavigatorBarData();

    this.navigator.showTitleBar(false);
    this.navigator.showStatusBar(true);
    this.navidata['1'] = this.navigator.getNavigatorBarData();

    this.navigator.showTitleBar(true);
    this.navigator.showStatusBar(true);
    this.navigator.setTitle('我的');
    this.navigator.setRightNaviItems(undefined);
    this.navidata['2'] = this.navigator.getNavigatorBarData();

    //set default as index 0
    this.navigator.restoreNavigatorBarData(this.navidata['0']);
    // eval('__d(function (global, _require, module, exports, _dependencyMap) {var laohu = function () {function laohu() {babelHelpers.classCallCheck(this, laohu);}babelHelpers.createClass(laohu, [{key: "test",value: function test() {alert("laohu print");}}]);return laohu;}();module.exports = new laohu();},1000,[],"test.js");require(1000)')
  }

  componentWillUnmount(){
  }

  banneritemclicked(index) {
  }

  renderHomeTabHeader = (item, index, issel)=>{
    let imgsrc = issel ? item.imgSelect : item.imgNormal;
    let fontcolor = issel ? '#32A3ff' : '#bebebe';

    return (
        <View style={
          {
            justifyContent:'center',
            alignItems:'center',
            width:'100%',
            height:'100%'
          }
        }>

        <Image style={
          {
          width:25, height:25
        }} source={imgsrc} resizeMode='cover'>
        </Image>
        <Text style={
          {
            fontSize: 11,
            color: fontcolor
          }
        }>{item.title}</Text>

        </View>
    )
}

onTabClick = (index)=>{
  this.navigator.restoreNavigatorBarData(this.navidata['' + index]);
}

  render() {
    if(this.tabitems == undefined){
      return (
        <View/>
      )
    }

    return (
      <View style={styles.main}>
       <TabControl 
          headerItemRender={this.renderHomeTabHeader}
          tabposition='bottom' 
          tabtitles={this.tabitems}
          titleheight={50}
          onSelectIndex={this.onTabClick}>
        {
          this.tabitems.map((item, index)=> {
            return item.body(index);
          })
        }
      </TabControl>

      <Image style={
          {
          width:'100%', height:6,
          position:'absolute',
          bottom:50,
          left:0,
          right: 0
        }} source={require('./res/tabshadow.png')} resizeMode='stretch'>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main:{
    backgroundColor:'#f6f6f6',
    height: '100%',
    flex: 1,
    justifyContent:'flex-start'    
  },
  autotextview:{
    height: 20,
    width: '100%'
  }
});

export default AppHome;
