import React, { Component } from 'react';
import { WebView, View, StyleSheet,Platform } from 'react-native';
import renderChart from './renderChart';
import echarts from './echarts.min';

export default class App extends Component {
  componentWillReceiveProps(nextProps) {
    if(nextProps.option !== this.props.option) {
      this.refs.chart.reload();
    }
  }

  render() {
      var htmlSource = Platform.OS == 'ios' ? require('./tpl.html') : {'uri':'file:///android_asset/tpl.html'}
      var isEnabled = Platform.OS == 'ios' ? false : true;
    return (
      <View style={{flex: 1, height: this.props.height || 400,}}>
        <WebView
          ref="chart"
          ref={(e)=>this.webView=e}
          scrollEnabled = {false}
          injectedJavaScript = {renderChart(this.props)}
          style={{
            height: this.props.height || 400,
            backgroundColor: this.props.backgroundColor || 'transparent'
          }}
          scalesPageToFit={isEnabled}
          source={htmlSource}
          onMessage={event => this.props.onPress ? this.props.onPress(JSON.parse(event.nativeEvent.data)) : null}
        />
      </View>
    );
  }
}
