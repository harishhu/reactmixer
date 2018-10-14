import React from 'react';

const {
    ImageButton,
    ZAComponent,
    Image,
    Utils,
    ZAString,
    View,
    Text,
    Platform,
    StyleSheet,
    TextInput,
    Dimensions
} = global.reactmixer;

import LoginDataControl from './logindatacontrol';

const TOP_IMAGE_RATIO = 0.6133;
class LoginRenderRN extends ZAComponent{
  constructor(props){
    super(props);

    this.screenWidth = Dimensions.get('window').width;
    this.dataconfig = this.dcprops;

    this.phoneNumber = this.dataconfig.phoneNumber;
    this.phonePassword = this.dataconfig.phonePassword;

    this.state = {
      bg : require('./res/pic_login_bg.png')
    }
  }

  onBackResult(data){
    this.showToast('on back result data = ' + data);
    // alert(ZAString.strings.login_button_title);
  }

  componentDidMount(){
    // alert(this.zastrings.login_button_title);
    if(this.navigator){
      this.navigator.setTitle(this.zastrings.login_button_title);
    }
  }

  clickLogin(type){
   // this.dataconfig.startLogin(this.phoneNumber, this.phonePassword);
   if(type == '1'){
     this.navigator.navigate('AppHome', 'test launch data');
   }else{
     this.navigator.navigate('DemoWidgets', 'test launch data', 'demo');
   }
  }

  componentWillUnmount(){
  }

  render() {
    return (
      <View style={styles.login}>
        <Image style={{width: this.screenWidth, height: this.screenWidth * TOP_IMAGE_RATIO}}
         source={this.state.bg}>
        </Image>

        <View style={styles.centerArea}>
          <View style={{height:40}}>
          </View>

          <TextInput
           style={styles.edittext}
           placeholder={this.zastrings.login_number_prompt}
           defaultValue={this.dataconfig.phoneNumber}
           onChangeText={(text) => this.phoneNumber = text}
           underlineColorAndroid='transparent'
         />

         <View style={{height:10}}>
         </View>

         <TextInput
           autoCapitalize="none"
           autoCorrect={false}
           style={styles.edittext}
           placeholder={this.zastrings.login_password_prompt}
           secureTextEntry={true}
           defaultValue={this.dataconfig.phonePassword}
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
           <ImageButton style={styles.loginbutton}
             image={require('./res/pic_login_but.png')}
             title={this.zastrings.image_button}
             titleColor='blue'
             titleFontSize={16}
             onClick={this.clickLogin.bind(this, '1')}
           />
         </View>
         <View style={
           {
             width:'100%', flexDirection: 'row',justifyContent : 'center',
             display:this.props.hideLoginButton ? 'none': 'flex'
           }
         }>
           <ImageButton style={styles.flexbutton}
             image={require('./res/pic_login_but.png')}
             title={this.zastrings.flex_button}
             titleStyle={
               {
                 marginLeft:20
               }
             }
             onClick={this.clickLogin.bind(this, '2')}
           />
         </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login:{
    backgroundColor:'#f6f6f6',
    height: '100%',
    flex: 1
  },
  centerArea:{
    position: 'absolute',
    backgroundColor:'white',
    top : '13%',
    bottom: 2,
    left : '3%',
    right : '3%',
    borderRadius:5
  },
  edittext : {
    height: 50,
    textAlign:'center',
    fontSize: 18,
    color: '#10b2ff',
    padding: 0,
    // borderBottomColor:'gray',
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
});

export default LoginRenderRN;
