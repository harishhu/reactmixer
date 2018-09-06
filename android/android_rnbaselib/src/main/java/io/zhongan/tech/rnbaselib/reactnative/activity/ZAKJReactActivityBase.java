package io.zhongan.tech.rnbaselib.reactnative.activity;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactFragmentActivity;
import com.facebook.react.bridge.Callback;

import org.json.JSONException;
import org.json.JSONObject;

import io.zhongan.tech.rnbaselib.core.RNAppConfig;
import io.zhongan.tech.rnbaselib.core.RequestBaseItem;
import io.zhongan.tech.rnbaselib.core.ZAReactNative;
import io.zhongan.tech.rnbaselib.core.ZAReactNativeCommands;
import io.zhongan.tech.rnbaselib.net.ZAHttpResult;
import io.zhongan.tech.rnbaselib.reactnative.commands.RNCmdHandler;
import io.zhongan.tech.rnbaselib.reactnative.core.LocalStorage;
import io.zhongan.tech.rnbaselib.reactnative.commands.RNRequestItem;
import io.zhongan.tech.rnbaselib.utils.GsonUtil;
import io.zhongan.tech.rnbaselib.utils.RNLog;
import io.zhongan.tech.rnbaselib.utils.Utils;

/**
 * Created by hufuyi on 2018/1/5.
 */

public class ZAKJReactActivityBase extends ReactFragmentActivity {
    private ZAReactNative zaReactNative = ZAReactNative.instance;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        zaReactNative.setCurrentReactActivity(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        zaReactNative.setCurrentReactActivity(null);
    }

    @Override
    public void onBackPressed() {
//      Toast.makeText(getApplicationContext(), "onback pressed", Toast.LENGTH_LONG);
        Log.d("harish", "ZAKJReactActivityBase on back pressed");
        RNCmdHandler.instance.notifyBackResult2RN();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        ZAReactNative.IZAReactNativeEventListener listener = ZAReactNative.instance.getReactNativeEventListener();

        if (listener != null && listener.onActivityResult(requestCode, resultCode, data)){
            return;
        }
    }
}
