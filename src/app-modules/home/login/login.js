import React from 'react';

console.log('global.reactmixer = ' + global.reactmixer);

const {
  ZAComponent,
  View,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  ImageButton
} = global.reactmixer;

var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;

const TOP_IMAGE_RATIO = 0.6133;

class Login extends ZAComponent{
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

  clickLogin(type){
    // this.dataconfig.startLogin(this.phoneNumber, this.phonePassword);
    if(type == '1'){
      this.navigator.navigate('DemoWidgets', 'test launch data', 'demo');
    }
  }

  render(){
      return (
        <View style={style.main}>

        <Image
          style={{width: ScreenWidth, height: ScreenWidth * TOP_IMAGE_RATIO, resizeMode:'stretch'}}
          source={require('./res/pic_login_bg.png')}
        />

        <View
        style={{
          position:'absolute',
          top : '13%',
          bottom: 2,
          left : '3%',
          right : '3%',
          // flexDirection: "row",
          padding: 20,
          backgroundColor:'white',
          // justifyContent:'center',
          alignItems: 'center',
          borderRadius: 10
        }}
        >

         <View style={{height:40}}>
         </View>

        <TextInput
           style={style.edittext}
           placeholder={'请输入账号'}
           defaultValue={''}
           onChangeText={(text) => this.phoneNumber = text}
           underlineColorAndroid='transparent'
        />

         <View style={{height:10}}>
         </View>

         <TextInput
           autoCapitalize="none"
           autoCorrect={false}
           style={style.edittext}
           placeholder={'请输入密码'}
           secureTextEntry={true}
           defaultValue={'11'}
           onChangeText={(text) => this.phonePassword = text}
           underlineColorAndroid='transparent'
         />
         <View style={{height:20}}>
         </View>
         <View style={
           {
             width:'100%', flexDirection: 'row',justifyContent : 'center',
             display:this.props.hideLoginButton ? 'none': 'flex'
           }
         }>
           <ImageButton style={style.loginbutton}
             image={require('./res/pic_login_but.png')}
             text={this.zastrings.login_button_title}
             textColor='blue'
             textFontSize={16}
             onClick={this.clickLogin.bind(this, '1')}
           />
         </View>
        </View>
        </View>
      )
  }
}

const style = StyleSheet.create({
  main:{
    width:'100%',
    height:'100%'
  },
  text:{
    fontSize: 20,
    color:'white'
  },
  edittext : {
    height: 50,
    width: '90%',
    textAlign:'left',
    fontSize: 18,
    color: '#10b2ff',
    paddingLeft: 0,
    backgroundColor:'white',
    // borderBottomWidth:2
  },
  loginbutton:{
    width: '80%',
    height: 75,
  },
  flexbutton:{
    width: '80%',
    height: 75,
    justifyContent:'flex-start'
  }
})

export default Login;
