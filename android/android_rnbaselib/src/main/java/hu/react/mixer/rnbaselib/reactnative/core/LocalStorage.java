package hu.react.mixer.rnbaselib.reactnative.core;

import android.util.Log;
import org.json.JSONException;
import org.json.JSONObject;
import java.io.File;

import hu.react.mixer.rnbaselib.core.AppEnv;
import hu.react.mixer.rnbaselib.core.ZAReactNative;
import hu.react.mixer.rnbaselib.utils.CacheDataUtils;

import hu.react.mixer.rnbaselib.core.AppEnv;
import hu.react.mixer.rnbaselib.core.ZAReactNative;
import hu.react.mixer.rnbaselib.utils.CacheDataUtils;

/**
 * Created by za-wanghe on 2018/3/22.
 */
public class LocalStorage {
    public static final LocalStorage instance = new LocalStorage();

    private static final String TAG = LocalStorage.class.getSimpleName();
    public static final String LOCAL_STORAGE = "local_storage";

    private static final String LOCAL_STORAGE_PUT = "put";
    private static final String LOCAL_STORAGE_GET = "get";
    private static final String LOCAL_STORAGE_REMOVE = "remove";
    private static final String LOCAL_STORAGE_CLEAR = "clear";
    private static final String LOCAL_STORAGE_KEYSETS = "keySets";

    private static final String LOCAL_STORAGE_GLOBAL = "react_native";

    private String cacheDir;

    LocalStorage(){
        cacheDir = AppEnv.instance.getSerializeDataDiskCacheDir() + File.separator + LOCAL_STORAGE;

        File f = new File(cacheDir);

        if (!f.exists()){
            f.mkdirs();
        }
    }

    public void handleLocalStorage(String eventId, String params){
        Log.i(TAG, "handleLocalStorage:" + params);
        try {
            JSONObject object = new JSONObject(params);
            String type = object.optString("type");
            String data = object.optString("data");
            String key = object.optString("key");
            switch (type) {
                case LOCAL_STORAGE_PUT:
                    handlePut(eventId, key, data);
                    break;
                case LOCAL_STORAGE_GET:
                    handleGet(eventId, key);
                    break;
                case LOCAL_STORAGE_REMOVE:
                    handleRemove(eventId, key);
                    break;
                case LOCAL_STORAGE_CLEAR:
                    handleClear(eventId);
                    break;
                case LOCAL_STORAGE_KEYSETS:
                    handleKeySets(eventId);
                    break;
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private void handlePut(String eventId, String key, String data) {
        CacheDataUtils.writeCacheData(cacheDir, key, data);
    }

    private void handleGet(String eventId, String key) {
        String data = (String) CacheDataUtils.readCacheData(cacheDir, key);
        sendEventCallback(eventId, data);
    }

    private void handleRemove(String eventId, String key) {
    }

    private void handleClear(String eventId) {

    }

    private void handleAppend(String eventId, String key, String item) {

    }

    private void handleKeySets(String eventId) {
    }

    private void sendEventCallback(String eventID, String data){
        ZAReactNative.instance.invokeEventCallback(eventID, data);
    }
}
