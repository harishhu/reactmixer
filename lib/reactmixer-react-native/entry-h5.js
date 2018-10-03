// 'use strict';
//debug absolute path: ../../reactmixer-react-native/reactmixer-lib
//release absolute path: reactmixer-lib

const reactmixerReactExports = {
  //appbase
  get AppModule() { return require('./reactmixer-lib/h5/appbase/appmodule'); },
  get AppModuleManager() { return require('./reactmixer-lib/h5/appbase/appmodulemanager'); },
  get ZAComponent() { return require('./reactmixer-lib/h5/appbase/zacomponent'); },
  // get AppConfig() { return require('./reactmixer-lib/h5/appbase/appconfig'); },
  // get Base64() { return require('./reactmixer-lib/h5/appbase/base64'); },
  // get NativeInterface() { return require('./reactmixer-lib/h5/appbase/nativeinterface'); },
  get UIBase() { return require('./reactmixer-lib/h5/appbase/uibase'); },
  get Utils() { return require('./reactmixer-lib/h5/appbase/utils'); },
  // get ZADataControl() { return require('./reactmixer-lib/h5/appbase/zadatacontrol'); },
  get ZAString() { return require('./reactmixer-lib/h5/appbase/zastring'); },
  // get DateUtils() { return require('./reactmixer-lib/h5/appbase/dateutils'); },
  // get LocalStorage() { return require('./reactmixer-lib/h5/appbase/local_storage'); },
  // get ZAKJSource() { return require('./reactmixer-lib/h5/appbase/zakjsource'); },

  //network
  // get HttpResultCodes() { return require('./reactmixer-lib/h5/network/httpresultcodes'); },
  // get RequestItemBase() { return require('./reactmixer-lib/h5/network/requestitembase'); },
  // get HttpRequestExecutor() { return require('./reactmixer-lib/h5/network/httprequestexecutor'); },

  //widgets
  // get RootSiblings() { return require('./reactmixer-lib/h5/widgets/rootsiblings'); },
  get TabControl() { return require('./reactmixer-lib/h5/widgets/tabcontrol/tabcontrol'); },
  // get Toast() { return require('./reactmixer-lib/h5/widgets/toast'); },
  // get AlertDialog() { return require('./reactmixer-lib/h5/widgets/alertdialog'); },
  // get Dialog() { return require('./reactmixer-lib/h5/widgets/dialog'); },
  // get GenderRadio() { return require('./reactmixer-lib/h5/widgets/genderradio'); },
  // get GridLayout() { return require('./reactmixer-lib/h5/widgets/gridview'); },
  // get GridView() { return require('./reactmixer-lib/h5/widgets/gridview'); },
  // get IconText() { return require('./reactmixer-lib/h5/widgets/icontext'); },
  // get Echarts() { return require('./reactmixer-lib/h5/widgets/native-echarts/src/index').default; },

  get ImageButton() { return require('./reactmixer-lib/h5/widgets/imagebutton'); },
  // get DeviceHelper() { return require('./reactmixer-lib/h5/widgets/iphonexhelper'); },
  // get LabelTextInput() { return require('./reactmixer-lib/h5/widgets/labeltextinput'); },
  get ZANavigator() { return require('./reactmixer-lib/h5/widgets/navigator/zanavigator'); },
  // get NormalButton() { return require('./reactmixer-lib/h5/widgets/flexbutton'); },
  // get FlexButton() { return require('./reactmixer-lib/h5/widgets/flexbutton'); },
  get PureList() { return require('./reactmixer-lib/h5/widgets/purelist/purelist.jsx'); },
  // get SADatePickerWidget() { return require('./reactmixer-lib/h5/widgets/sadatepicker'); },
  // get SAPickerWidget() { return require('./reactmixer-lib/h5/widgets/sapickerwidget'); },
  // get SinglePickerDialog() { return require('./reactmixer-lib/h5/widgets/sapickerwidget'); },
  // get MultiPickerDialog() { return require('./reactmixer-lib/h5/widgets/multipicker'); },
  // get PickerView() { return require('./reactmixer-lib/h5/widgets/pickerview'); },

  // get ScrollList() { return require('./reactmixer-lib/h5/widgets/scrolllist'); },
  // get Spinner() { return require('./reactmixer-lib/h5/widgets/spinner'); },
  get TableView() { return require('./reactmixer-lib/h5/widgets/tableview/tableview'); },
  // get BannerView() { return require('./reactmixer-lib/h5/widgets/bannerview'); },
  // get AutoTextView() { return require('./reactmixer-lib/h5/widgets/autotextview'); },

  //the implementation apis of react native
  get View(){return require('./reactmixer-lib/h5/widgets/view');},
  get Text(){return require('./reactmixer-lib/h5/widgets/text');},
  get StyleSheet(){return require('./reactmixer-lib/h5/widgets/stylesheet');},
  get TextInput(){return require('./reactmixer-lib/h5/widgets/textinput/textinput');},
  get Image(){return require('./reactmixer-lib/h5/widgets/image/image');},
  get Dimensions(){return require('./reactmixer-lib/h5/appbase/dimensions');},
  get Button(){return require('./reactmixer-lib/h5/widgets/imagebutton');}
};

global.reactmixer = reactmixerReactExports;
global.env = 'h5';

module.exports = reactmixerReactExports;
