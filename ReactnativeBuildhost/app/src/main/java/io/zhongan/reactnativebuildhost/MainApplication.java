package io.zhongan.reactnativebuildhost;

import android.content.Context;
import android.support.multidex.MultiDex;

import io.zhongan.tech.rnbaselib.core.ZAReactNative;
import io.zhongan.tech.rnbaselib.reactnative.core.ZAReactNativeApplication;

/**
 * Created by harishhu on 2018/4/28.
 */

public class MainApplication extends ZAReactNativeApplication {
    @Override
    public void onCreate() {
        ZAReactNative.instance.setDebugMode(true);

        super.onCreate();

        initDataConfig();
//      AppBaseApplication.initApplication(this);
    }

    private void initDataConfig(){
//      AppConstant.WEIXIN_APP_ID = BuildConfig.WEIXIN_APP_ID;
//      AppConstant.WEIXIN_APP_SECRET = BuildConfig.WEIXIN_APP_SECRET;
//      AppConstant.WECHAT_APPLET_ID = BuildConfig.WECHAT_APPLET_ID;
//      AppConstant.QQ_APP_ID = BuildConfig.QQ_APP_ID;
//
//      AppConstant.BUILDFLAVOR = BuildConfig.FLAVOR;
    }

    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);

        MultiDex.install(this);
    }
}
