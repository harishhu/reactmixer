// 'use strict';
//debug absolute path: ../../zatech-react-native/zatech-lib
//release absolute path: zatech-lib

const ZATechReactExports = {
  // appbase
  get AppModule() { return require('./zatech-lib/common/appbase/appmodule'); },
  get AppModuleManager() { return require('./zatech-lib/common/appbase/appmodulemanager'); },
  get ZAComponent() { return require('./zatech-lib/common/appbase/zacomponent'); },
  get AppConfig() { return require('./zatech-lib/common/appbase/appconfig'); },
  get Base64() { return require('./zatech-lib/common/appbase/base64'); },
  get NativeInterface() { return require('./zatech-lib/common/appbase/nativeinterface'); },
  get UIBase() { return require('./zatech-lib/common/appbase/uibase'); },
  get Utils() { return require('./zatech-lib/common/appbase/utils'); },
  get ZADataControl() { return require('./zatech-lib/common/appbase/zadatacontrol'); },
  get ZAString() { return require('./zatech-lib/common/appbase/zastring'); },
  get DateUtils() { return require('./zatech-lib/common/appbase/dateutils'); },
  get LocalStorage() { return require('./zatech-lib/common/appbase/local_storage'); },
  get ZAKJSource() { return require('./zatech-lib/common/appbase/zakjsource'); },

  //network
  get HttpResultCodes() { return require('./zatech-lib/common/network/httpresultcodes'); },
  get RequestItemBase() { return require('./zatech-lib/common/network/requestitembase'); },
  get HttpRequestExecutor() { return require('./zatech-lib/common/network/httprequestexecutor'); },

  //widgets
  get RootSiblings() { return require('./zatech-lib/rn/widgets/rootsiblings'); },
  get TabControl() { return require('./zatech-lib/rn/widgets/tabcontrol/tabcontrol'); },
  get Toast() { return require('./zatech-lib/rn/widgets/toast'); },
  get AlertDialog() { return require('./zatech-lib/rn/widgets/alertdialog'); },
  get Dialog() { return require('./zatech-lib/rn/widgets/dialog'); },
  get GenderRadio() { return require('./zatech-lib/rn/widgets/genderradio'); },
  get GridLayout() { return require('./zatech-lib/rn/widgets/gridview'); },
  get GridView() { return require('./zatech-lib/rn/widgets/gridview'); },
  get IconText() { return require('./zatech-lib/rn/widgets/icontext'); },
  get Echarts() { return require('./zatech-lib/rn/widgets/native-echarts/src/index').default; },

  get ImageButton() { return require('./zatech-lib/rn/widgets/imagebutton'); },
  get DeviceHelper() { return require('./zatech-lib/rn/widgets/iphonexhelper'); },
  get LabelTextInput() { return require('./zatech-lib/rn/widgets/labeltextinput'); },
  get ZANavigator() { return require('./zatech-lib/rn/widgets/navigator/zanavigator'); },
  get NormalButton() { return require('./zatech-lib/rn/widgets/flexbutton'); },
  get FlexButton() { return require('./zatech-lib/rn/widgets/flexbutton'); },
  get PureList() { return require('./zatech-lib/rn/widgets/purelist'); },
  get SADatePickerWidget() { return require('./zatech-lib/rn/widgets/sadatepicker'); },
  get SAPickerWidget() { return require('./zatech-lib/rn/widgets/sapickerwidget'); },
  get SinglePickerDialog() { return require('./zatech-lib/rn/widgets/sapickerwidget'); },
  get MultiPickerDialog() { return require('./zatech-lib/rn/widgets/multipicker'); },
  get PickerView() { return require('./zatech-lib/rn/widgets/pickerview'); },

  get ScrollList() { return require('./zatech-lib/rn/widgets/scrolllist'); },
  get Spinner() { return require('./zatech-lib/rn/widgets/spinner'); },
  get TableView() { return require('./zatech-lib/rn/widgets/tableview'); },
  get BannerView() { return require('./zatech-lib/rn/widgets/bannerview'); },
  get AutoTextView() { return require('./zatech-lib/rn/widgets/autotextview'); },
};

module.exports = ZATechReactExports;
