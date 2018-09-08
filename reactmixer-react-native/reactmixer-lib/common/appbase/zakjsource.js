import {
    resolveAssetSource
} from 'react-native';

class ZAKJSource {
    setResDirInfo(dirinfo){
        this.resdirinfo = dirinfo;
        //alert(this.resdirinfo);
    }

    source(source){
      //  let ss = resolveAssetSource(source);
        let ss = {
          __packager_asset : true,
          width: 1125,
          height: 690,
          'uri': "asset:///reactnative/res/drawable-mdpi/modules_demos_login_res_pic_login_bg.png",
          scale: 1
        }
        //alert(ss.uri)
        return ss;
    }
};

module.exports = new ZAKJSource();
