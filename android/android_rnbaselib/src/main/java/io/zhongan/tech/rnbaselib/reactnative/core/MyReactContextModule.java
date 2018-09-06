package io.zhongan.tech.rnbaselib.reactnative.core;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import io.zhongan.tech.rnbaselib.core.ZAReactNative;
import io.zhongan.tech.rnbaselib.reactnative.activity.ZAKJReactActivityBase;
import io.zhongan.tech.rnbaselib.reactnative.commands.RNCmdHandler;
import io.zhongan.tech.rnbaselib.utils.RNLog;

/**
 * Created by hufuyi on 2018/1/4.
 */

public class MyReactContextModule extends ReactContextBaseJavaModule {
    public MyReactContextModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "saadNativeInterface";
    }

    @ReactMethod
    public void command2Native(String cmdData, Callback callback) {
        RNLog.d("rn", "command2Native = " + cmdData);
        ZAKJReactActivityBase currentRunningReactActivity = (ZAKJReactActivityBase) getCurrentActivity();

        String eventIndex = ZAReactNative.instance.registerEventCallback(callback);
        RNCmdHandler.instance.handleEventFromJS(getReactApplicationContext(), currentRunningReactActivity, eventIndex, cmdData);
    }
}
