import React from 'react';

console.log('glocal.reactmixer = ' + global.reactmixer);

let {
  ZAComponent,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image
} = global.reactmixer;

class Test extends ZAComponent{
  constructor(props){
    super(props);

    this.state = {
      text:'11'
    }
  }

  componentDidMount(){
  }

  componentWillUnmount(){
  }

  render(){
      return (
        <View>
        <View
        style={{
          flexDirection: "row",
          height: 100,
          padding: 20,
          backgroundColor:'green'
        }}
        >
        <View style={{ backgroundColor: "blue", flex: 0.3 }} />
        <View style={{ backgroundColor: "red", flex: 0.5 }} />
        <Text style={
          style.text
        } onPress={function(){
          alert('111')
        }}>{this.state.text}</Text>
        </View>
        <TextInput
        style={{height: 40, borderColor: 'blue', borderWidth: 1, marginTop:10}}
        onChangeText={(text) => this.setState({text})}
        value={'hufuyi'}
        />
        <Image
          style={{width: 66, height: 58, resizeMode:'stretch'}}
          source={require('./login/res/pic_login_bg.png')}
        />
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        />
        <Image
          style={{width: 66, height: 58}}
          source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='}}
        />
        </View>
      )
  }
}

const style = StyleSheet.create({
  text:{
    fontSize: 20,
    color:'white'
  }
})

export default Test;
