package hu.react.mixer.rnbaselib.core;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

import com.facebook.react.bridge.Callback;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.util.HashMap;
import java.util.Map;

import hu.react.mixer.rnbaselib.reactnative.core.RNAppletManager;
import hu.react.mixer.rnbaselib.utils.RNLog;
import hu.react.mixer.rnbaselib.utils.Utils;

import hu.react.mixer.rnbaselib.utils.RNLog;

/**
 * Created by harishhu on 2018/4/27.
 */

public class ZAReactNative {
    public interface IZAReactNativeEventListener{
        boolean handleEventFromJS(String eventCallbackID, String cmdID, String cmdParams);
        boolean onActivityResult(int requestCode, int resultCode, Intent data);
    }

    public static final ZAReactNative instance = new ZAReactNative();

    private boolean DEBUG = false;

    private Context applicationContext;
    private IZAReactNativeEventListener eventListener;
    private RNAppConfig appconfig;

    private Map<String, Callback> eventMap = new HashMap<String, Callback>();
    private int eventIndex = 0;

    private RNAppletManager appletManager;

    private Activity currentReactActivity;
    private ZAReactNative(){
        appconfig = new RNAppConfig();
    }

    public void startRNActivity(Context c, String appletname, String pagerouter){
        Intent intent = new Intent(RNConstants.ACTION_REACTNATIVE_BASEENTRY);

        RNAppConfig appconfig = ZAReactNative.instance.getRNAppConfig();
        appconfig.putConfig(RNConstants.RN_APPLET_NAME, appletname);
        appconfig.putConfig(RNConstants.RN_APPLET_PAGEROUTER, pagerouter);

        intent.setPackage(c.getPackageName());
        c.startActivity(intent);
    }

    public void setRNServer(String server){
        if (Utils.isEmpty(server)){
            return;
        }

        SharedPreferences mPreferences = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
        SharedPreferences.Editor ed = mPreferences.edit();
        ed.putString("debug_http_host", server);
        ed.commit();
    }

    public void setDebugMode(boolean debug){
        DEBUG = debug;
    }

    public boolean getDebugMode(){
        return DEBUG;
    }

    public void setApplicationContext(Context c){
        applicationContext = c.getApplicationContext();
        appconfig.setAppContext(applicationContext);

        if (appletManager == null){
            appletManager = new RNAppletManager(applicationContext);
        }
    }

    public Context getApplicationContext(){
        return applicationContext;
    }

    public void setUserToken(String token){
        appconfig.putConfig("userToken", token);
    }

    public String getUserToken(){
        return appconfig.getConfig("userToken");
    }

    public RNAppConfig getRNAppConfig(){
        return appconfig;
    }

    public RNAppletManager getAppletManager(){
        return appletManager;
    }

    public void setCurrentReactActivity(Activity a){
        currentReactActivity = a;
    }

    public Activity getCurrentReactActivity(){
        return currentReactActivity;
    }

    public void setReactNativeEventListener(IZAReactNativeEventListener lis){
        eventListener = lis;
    }

    public IZAReactNativeEventListener getReactNativeEventListener(){
        return eventListener;
    }

    public void invokeEventCallback(String eventid, String params){
        Callback cb = eventMap.get(eventid);

        RNLog.d("invokeEventCallback params = " + params);

        if (Utils.isEmpty(params)) {
            params = "";
        }

        if (params != null && params.length() > 0) {
            if (params.charAt(0) == '"') {
                JSONTokener jsonTokener = new JSONTokener(params);
                Object val = null;
                try {
                    val = jsonTokener.nextValue();

                    //jsonObject.put(key, val);
                    if (val instanceof JSONObject) {
                        JSONObject tmp = (JSONObject) val;

                        params = tmp.toString();
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }

        if (cb != null) {
            eventMap.remove(eventid);
            cb.invoke(params);
        }
    }

    public String registerEventCallback(Callback callback){
        eventIndex++;

        String s = eventIndex + "";
        eventMap.put(s, callback);

        return s;
    }
}
