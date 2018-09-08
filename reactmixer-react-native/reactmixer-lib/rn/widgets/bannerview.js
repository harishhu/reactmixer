import React, { Component } from 'react';
import { requireNativeComponent } from 'react-native';
// import RootSiblings from './rootsiblings'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
var SACycleScroll = requireNativeComponent('ZAKJRCTCycleScroll', BannerView);

/**
 *   autoScrollTimeInterval:自动滚动间隔时间(默认2s)
 *   pageControlBottomOffset:白点距底部距离(默认5px)
 *   placeholderImage:默认图片
 *   imageURLStringsGroup:图片链接数组
 *   didSelectIndex:选择回调
 */
class BannerView extends Component {
  constructor(props){
    super(props);

    if (this.props.placeholderImage){
        this.placeholderImage = resolveAssetSource(this.props.placeholderImage);
    }
  }

  onChange=(event)=>{
    if (event.nativeEvent['index'] != undefined){
      this.index = event.nativeEvent['index'];
      if(this.props.didSelectIndex) {
        this.props.didSelectIndex(this.index);
      }
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <SACycleScroll autoScrollTimeInterval={this.props.autoScrollTimeInterval ?
              this.props.autoScrollTimeInterval : 2}
                             pageControlBottomOffset={this.props.pageControlBottomOffset ?
                                 this.props.pageControlBottomOffset : 5}
                             placeholderImage = {this.placeholderImage}
                             imageURLStringsGroup = {this.props.imageURLStringsGroup}
                             style={{backgroundColor:'rgba(102, 102, 102)', width:'100%', height:210}}
                             onChange={this.onChange}/>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

module.exports = BannerView;
