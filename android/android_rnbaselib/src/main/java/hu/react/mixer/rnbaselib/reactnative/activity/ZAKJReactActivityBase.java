package hu.react.mixer.rnbaselib.reactnative.activity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactFragmentActivity;

import hu.react.mixer.rnbaselib.core.ZAReactNative;
import hu.react.mixer.rnbaselib.reactnative.commands.RNCmdHandler;

import hu.react.mixer.rnbaselib.core.ZAReactNative;

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
