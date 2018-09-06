import { Dimensions, Platform } from 'react-native';

class DeviceHelper{
  static isIphoneX() {
      const dimen = Dimensions.get('window');
      return (
          Platform.OS === 'ios' &&
          !Platform.isPad &&
          !Platform.isTVOS &&
          (dimen.height === 812 || dimen.width === 812)
      );
  }

static ifIphoneX(iphoneXStyle, regularStyle) {
      if (DeviceHelper.isIphoneX()) {
          return iphoneXStyle;
      }
      return regularStyle;
  }
}


module.exports = DeviceHelper;
