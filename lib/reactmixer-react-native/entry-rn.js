// 'use strict';
//debug absolute path: ../../reactmixer-react-native/reactmixer-lib
//release absolute path: reactmixer-lib
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TextInput
} from 'react-native';

const reactmixerReactExports = {
  // appbase
  get AppModule() { return require('./reactmixer-lib/rn/appbase/appmodule'); },
  get AppModuleManager() { return require('./reactmixer-lib/rn/appbase/appmodulemanager'); },
  get ZAComponent() { return require('./reactmixer-lib/rn/appbase/zacomponent'); },
  get AppConfig() { return require('./reactmixer-lib/rn/appbase/appconfig'); },
  get Base64() { return require('./reactmixer-lib/rn/appbase/base64'); },
  get NativeInterface() { return require('./reactmixer-lib/rn/appbase/nativeinterface'); },
  get UIBase() { return require('./reactmixer-lib/rn/appbase/uibase'); },
  get Utils() { return require('./reactmixer-lib/rn/appbase/utils'); },
  get ZADataControl() { return require('./reactmixer-lib/rn/appbase/zadatacontrol'); },
  get ZAString() { return require('./reactmixer-lib/rn/appbase/zastring'); },
  get DateUtils() { return require('./reactmixer-lib/rn/appbase/dateutils'); },
  get LocalStorage() { return require('./reactmixer-lib/rn/appbase/local_storage'); },
  get ZAKJSource() { return require('./reactmixer-lib/rn/appbase/zakjsource'); },

  //network
  get HttpResultCodes() { return require('./reactmixer-lib/rn/network/httpresultcodes'); },
  get RequestItemBase() { return require('./reactmixer-lib/rn/network/requestitembase'); },
  get HttpRequestExecutor() { return require('./reactmixer-lib/rn/network/httprequestexecutor'); },

  //widgets
  get RootSiblings() { return require('./reactmixer-lib/rn/widgets/rootsiblings'); },
  get TabControl() { return require('./reactmixer-lib/rn/widgets/tabcontrol/tabcontrol'); },
  get Toast() { return require('./reactmixer-lib/rn/widgets/toast'); },
  get AlertDialog() { return require('./reactmixer-lib/rn/widgets/alertdialog'); },
  get Dialog() { return require('./reactmixer-lib/rn/widgets/dialog'); },
  get GenderRadio() { return require('./reactmixer-lib/rn/widgets/genderradio'); },
  get GridLayout() { return require('./reactmixer-lib/rn/widgets/gridview'); },
  get GridView() { return require('./reactmixer-lib/rn/widgets/gridview'); },
  get IconText() { return require('./reactmixer-lib/rn/widgets/icontext'); },
  get Echarts() { return require('./reactmixer-lib/rn/widgets/native-echarts/src/index').default; },

  get ImageButton() { return require('./reactmixer-lib/rn/widgets/imagebutton'); },
  get DeviceHelper() { return require('./reactmixer-lib/rn/widgets/iphonexhelper'); },
  get LabelTextInput() { return require('./reactmixer-lib/rn/widgets/labeltextinput'); },
  get ZANavigator() { return require('./reactmixer-lib/rn/widgets/navigator/zanavigator'); },
  get NormalButton() { return require('./reactmixer-lib/rn/widgets/flexbutton'); },
  get FlexButton() { return require('./reactmixer-lib/rn/widgets/flexbutton'); },
  get PureList() { return require('./reactmixer-lib/rn/widgets/purelist'); },
  get SADatePickerWidget() { return require('./reactmixer-lib/rn/widgets/sadatepicker'); },
  get SAPickerWidget() { return require('./reactmixer-lib/rn/widgets/sapickerwidget'); },
  get SinglePickerDialog() { return require('./reactmixer-lib/rn/widgets/sapickerwidget'); },
  get MultiPickerDialog() { return require('./reactmixer-lib/rn/widgets/multipicker'); },
  get PickerView() { return require('./reactmixer-lib/rn/widgets/pickerview'); },

  get ScrollList() { return require('./reactmixer-lib/rn/widgets/scrolllist'); },
  get Spinner() { return require('./reactmixer-lib/rn/widgets/spinner'); },
  get TableView() { return require('./reactmixer-lib/rn/widgets/tableview'); },
  get BannerView() { return require('./reactmixer-lib/rn/widgets/bannerview'); },
  get AutoTextView() { return require('./reactmixer-lib/rn/widgets/autotextview'); },

  //tranfser for react native raw api
  get View(){ return View},
  get Text(){ return Text},
  get StyleSheet() {return StyleSheet},
  get TextInput() {return TextInput},
  get Image() {return Image}
};

module.exports = reactmixerReactExports;
