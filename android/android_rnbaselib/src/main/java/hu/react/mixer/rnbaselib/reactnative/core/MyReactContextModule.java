package hu.react.mixer.rnbaselib.reactnative.core;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import hu.react.mixer.rnbaselib.core.ZAReactNative;
import hu.react.mixer.rnbaselib.reactnative.activity.ZAKJReactActivityBase;
import hu.react.mixer.rnbaselib.reactnative.commands.RNCmdHandler;
import hu.react.mixer.rnbaselib.utils.RNLog;

import hu.react.mixer.rnbaselib.core.ZAReactNative;
import hu.react.mixer.rnbaselib.reactnative.activity.ZAKJReactActivityBase;
import hu.react.mixer.rnbaselib.reactnative.commands.RNCmdHandler;
import hu.react.mixer.rnbaselib.utils.RNLog;

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
