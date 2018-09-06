package io.zhongan.tech.rnbaselib.core;

import android.content.Context;

import java.util.HashMap;
import java.util.Map;

import io.zhongan.tech.rnbaselib.utils.PackageUtil;

public class RNAppConfig {
    private boolean isinited = false;
    private Context appContext;
    private Map<String, String> appConfig = new HashMap<String, String>();

    RNAppConfig(){

    }

    public void setAppContext(Context c){
        appContext = c.getApplicationContext();
    }

    private void initDefault(){
        appConfig.put("osType", "android");
        appConfig.put("appVersion", PackageUtil.getAppVersion(appContext));
        appConfig.put("deviceID", PackageUtil.getDeviceID(appContext));

        float scale = appContext.getResources().getDisplayMetrics().density;
        appConfig.put("statusBarHeight", getStatusBarHeight() / scale + "");
    }

    private int getStatusBarHeight(){
        int result = 0;
        int resourceId = appContext.getResources().getIdentifier("status_bar_height", "dimen", "android");
        if (resourceId > 0) {
            result = appContext.getResources().getDimensionPixelSize(resourceId);
        }

        if (result == 0){
            try {
                Class clazz = Class.forName("com.android.internal.R$dimen");
                Object object = clazz.newInstance();
                int height = Integer.parseInt(clazz.getField("status_bar_height")
                        .get(object).toString());
                result = appContext.getResources().getDimensionPixelSize(height);
            } catch (Exception e) {
                e.printStackTrace();
                result = 0;
            }
        }

        return result;
    }

    public Map<String, String> getAllConfig(){
        if (!isinited){
            isinited = true;
            initDefault();
        }

        return appConfig;
    }

    public void putConfig(String key, String value){
        if (!isinited){
            isinited = true;
            initDefault();
        }

        appConfig.put(key, value);
    }

    public String getConfig(String key){
        if (!isinited){
            isinited = true;
            initDefault();
        }

        return appConfig.get(key);
    }
}
