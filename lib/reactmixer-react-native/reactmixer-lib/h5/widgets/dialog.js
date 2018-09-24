import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RootSiblings from './rootsiblings'

import {
  Text,
  View ,
  StyleSheet,
  Dimensions
} from 'react-native';

let {
  ZAComponent
} = global.reactmixer;

let SCREEN_WIDTH = Dimensions.get('window').width;//宽
let SCREEN_HEIGHT = Dimensions.get('window').height;//高

class Dialog{
  setContentRender(renderfun){
    this.contentRender = renderfun;
  }

  show(){
    ZAComponent.navigator.setGoBackCallback(()=>{
      this.hide();
    });

    this.rootSilb = new RootSiblings(
      <DialogImpl
        _dialogCotnentRender={this.contentRender}
      />
    );
  }

  hide(){
    ZAComponent.navigator.setGoBackCallback(undefined);

    if(this.rootSilb){
      this.rootSilb.destroy();
      this.rootSilb = undefined;
    }
  }
}

class DialogImpl extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    _dialogCotnentRender: PropTypes.func.isRequired
  }

  static defaultProps = {
  }

  render() {
    return (
      <View style={styles.bg}>
        <View style={styles.dialog}>
          {
            this.props._dialogCotnentRender()
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    position:'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(52,52,52,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    borderRadius: 8,
  }
});

module.exports = Dialog;
