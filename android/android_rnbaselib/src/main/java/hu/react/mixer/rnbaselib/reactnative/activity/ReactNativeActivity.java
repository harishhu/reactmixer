package hu.react.mixer.rnbaselib.reactnative.activity;

import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.annotation.Nullable;

import hu.react.mixer.rnbaselib.core.RNAppConfig;
import hu.react.mixer.rnbaselib.core.RNConstants;
import hu.react.mixer.rnbaselib.core.ZAReactNative;
import hu.react.mixer.rnbaselib.utils.GsonUtil;
import hu.react.mixer.rnbaselib.utils.Utils;

import hu.react.mixer.rnbaselib.core.RNAppConfig;
import hu.react.mixer.rnbaselib.core.RNConstants;
import hu.react.mixer.rnbaselib.core.ZAReactNative;
import hu.react.mixer.rnbaselib.utils.GsonUtil;
import hu.react.mixer.rnbaselib.utils.Utils;


/**
 * Created by hufuyi on 2018/1/4.
 */

public class ReactNativeActivity extends ZAKJReactActivityBase {
    private static final String TAG = ReactNativeActivity.class.getName();
    private static final String PARAMS = "params_from_native";
    private static final String DEFAULT_MODULE_NAME = "index";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        requestWindowFeature(Window.FEATURE_NO_TITLE);// 隐藏标题
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
                WindowManager.LayoutParams.FLAG_FULLSCREEN);// 设置全屏

        super.onCreate(savedInstanceState);
    }

    private void getParams() {
        Bundle bundle = getIntent().getExtras();
        if (bundle == null) {
            return;
        }
        Set<String> keySet = bundle.keySet();
        Map<String, Object> map = new HashMap<>();
        for (String key : keySet) {
            map.put(key, bundle.get(key));
        }
        String params = GsonUtil.gson.toJson(map);
        Log.i(TAG, "params:" + params);
        send2RN(params);
    }

    /**
     * 发送参数给React Native
     *
     * @param params
     */
    private void send2RN(String params) {
        getReactInstanceManager().getCurrentReactContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(PARAMS, params);
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Nullable
            @Override
            protected Bundle getLaunchOptions() {
                Bundle bundle = new Bundle();
                String params = "";
                if (RNConstants.RN_PARAMS != null) {
                    params = GsonUtil.gson.toJson(RNConstants.RN_PARAMS);
                    bundle.putString("launchData", params);
                }

                RNAppConfig appconfig = ZAReactNative.instance.getRNAppConfig();
                bundle.putString("appConfig", GsonUtil.gson.toJson(appconfig.getAllConfig()));

                Log.i(TAG, "params:" + params);
                return bundle;
            }
        };
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        if (Utils.isEmpty(RNConstants.RN_DEFAULT_MODULE)) {
            return DEFAULT_MODULE_NAME;
        }

        String tmp = RNConstants.RN_DEFAULT_MODULE;
        RNConstants.RN_DEFAULT_MODULE = null;

        return tmp;
    }
}
