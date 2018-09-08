package hu.react.mixer.rnbaselib.reactnative.core;

import android.app.Application;
import android.os.Handler;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.annotation.Nullable;

import hu.react.mixer.rnbaselib.core.ZAReactNative;
import hu.react.mixer.rnbaselib.reactnative.rctwidgets.autotext.RCTAutoTextViewManager;
import hu.react.mixer.rnbaselib.reactnative.rctwidgets.banner.RCTCycleScrollViewManager;
import hu.react.mixer.rnbaselib.reactnative.rctwidgets.datapicker.RCTDatePickerViewManager;
import hu.react.mixer.rnbaselib.reactnative.rctwidgets.picker.RCTPickerViewManager;
import hu.react.mixer.rnbaselib.utils.RNLog;

import hu.react.mixer.rnbaselib.core.ZAReactNative;
import hu.react.mixer.rnbaselib.reactnative.rctwidgets.autotext.RCTAutoTextViewManager;
import hu.react.mixer.rnbaselib.reactnative.rctwidgets.banner.RCTCycleScrollViewManager;
import hu.react.mixer.rnbaselib.reactnative.rctwidgets.datapicker.RCTDatePickerViewManager;
import hu.react.mixer.rnbaselib.reactnative.rctwidgets.picker.RCTPickerViewManager;
import hu.react.mixer.rnbaselib.utils.RNLog;

/**
 * Created by harishhu on 2018/4/27.
 */
public class ZAReactNativeApplication extends Application implements ReactApplication {
    private Handler mHandler = new Handler();

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return ZAReactNative.instance.getDebugMode();
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new MyReactPackage(),
                    new ReactPackage() {
                        @Override
                        public List<ViewManager> createViewManagers(
                                ReactApplicationContext reactContext) {
                            return Arrays.<ViewManager>asList(
                                    new RCTDatePickerViewManager(),
                                    new RCTPickerViewManager(),
                                    new RCTCycleScrollViewManager(),
                                    new RCTAutoTextViewManager()
                                    );
                        }

                        @Override
                        public List<NativeModule> createNativeModules(
                                ReactApplicationContext reactContext) {
                            return Collections.emptyList();
                        }
                    }
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

//        @Nullable
//        @Override
//        protected String getBundleAssetName() {
//            if (!ZAReactNative.instance.getDebugMode()){
//                return "reactnative/react.jsbundle";
//            }
//
//            return "";
//        }

        @Nullable
        @Override
        protected String getJSBundleFile() {
            RNLog.d("rn", "get js bundle file");
            RNAppletManager appletManager = ZAReactNative.instance.getAppletManager();
            return appletManager.getRNRootDir() + "react.jsbundle";
        }
    };

    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    public void onCreate() {
        super.onCreate();

        ZAReactNative.instance.setApplicationContext(getApplicationContext());

        if (!ZAReactNative.instance.getDebugMode()) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    RNAppletManager appletManager = ZAReactNative.instance.getAppletManager();
                    appletManager.installPrebuiltApplets();

                    mHandler.post(new Runnable() {
                        @Override
                        public void run() {
                          //  getReactNativeHost().getReactInstanceManager().createReactContextInBackground();
                        }
                    });
                }
            }).start();
        }

        SoLoader.init(getApplicationContext(), /* native exopackage */ false);
    }
}
