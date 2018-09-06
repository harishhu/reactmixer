package io.zhongan.tech.rnbaselib.reactnative.commands;

import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.util.List;

import io.zhongan.tech.rnbaselib.core.RNAppConfig;
import io.zhongan.tech.rnbaselib.core.RequestBaseItem;
import io.zhongan.tech.rnbaselib.core.ZAReactNative;
import io.zhongan.tech.rnbaselib.core.ZAReactNativeCommands;
import io.zhongan.tech.rnbaselib.jsonbean.AppletPackageInfo;
import io.zhongan.tech.rnbaselib.net.ZAHttpResult;
import io.zhongan.tech.rnbaselib.reactnative.activity.ZAKJReactActivityBase;
import io.zhongan.tech.rnbaselib.reactnative.core.LocalStorage;
import io.zhongan.tech.rnbaselib.reactnative.core.RNAppletManager;
import io.zhongan.tech.rnbaselib.utils.GsonUtil;
import io.zhongan.tech.rnbaselib.utils.RNLog;
import io.zhongan.tech.rnbaselib.utils.Utils;

public class RNCmdHandler {
    public static final RNCmdHandler instance = new RNCmdHandler();
    private String rnGobackCallbackID;
    private ZAReactNative zaReactNative = ZAReactNative.instance;

    private RNCmdHandler(){
    }

    public void notifyBackResult2RN(){
        if (rnGobackCallbackID != null) {
            invokeJSCallback(rnGobackCallbackID, null);
            rnGobackCallbackID = null;
        }
    }

    public void invokeJSCallback(String eventid, String params) {
        zaReactNative.invokeEventCallback(eventid, params);
    }

    public boolean handleEventFromJS(ReactApplicationContext rnContext, ZAKJReactActivityBase activity, String eventID, String cmdData) {
        if (Utils.isEmpty(cmdData)) {
            return true;
        }

        String cmdid = "";
        String cmdParams = "";

        try {
            JSONObject jsonObject = new JSONObject(cmdData);

            cmdid = jsonObject.getString("id");
            cmdParams = jsonObject.getString("params");
        } catch (JSONException e) {
            e.printStackTrace();
        }

        if (Utils.isEmpty(cmdid)) {
            return true;
        }

        ZAReactNative.IZAReactNativeEventListener listener = ZAReactNative.instance.getReactNativeEventListener();
        if (listener != null && listener.handleEventFromJS(eventID, cmdid, cmdParams)){
            return true;
        }

        if (cmdid.equals(ZAReactNativeCommands.FINISH_CURRENT)) {
            RNLog.d("rn", "finish current");
            if (activity != null){
                activity.finish();
            }
            return true;
        } else if (cmdid.equals(ZAReactNativeCommands.GOBACK_TRIGGER)) {
            rnGobackCallbackID = eventID;
            return true;
        } else if (cmdid.equals(ZAReactNativeCommands.LOCAL_STORAGE)) {
            LocalStorage.instance.handleLocalStorage(eventID, cmdParams);
            return true;
        } else if (cmdid.equals(ZAReactNativeCommands.REQUEST_APPCONFIG)) {
            RNAppConfig appconfig = ZAReactNative.instance.getRNAppConfig();
            invokeJSCallback(eventID, GsonUtil.gson.toJson(appconfig.getAllConfig()));
            return true;
        }else if (cmdid.equals(ZAReactNativeCommands.HTTP_REQUEST)) {
            try {
                cmdParams = cmdParams.replaceAll("\\\\" + "\"", "\"");

                JSONObject jsonObject = new JSONObject(cmdParams);

                String url = jsonObject.optString("url");
                String body = jsonObject.optString("body");
                String headers = jsonObject.optString("headers");

                RNLog.d("RN", "url = " + url);
                RNLog.d("RN", "body = " + body);
                RNRequestItem item = new RNRequestItem();
                item.requestUrl = url;
                item.paramsJson = body;
                item.headers = headers;
                item.setAttachData(eventID);

                item.setRequestCallback(new RequestBaseItem.requestItemCallback() {
                    @Override
                    public void requestItemCallback(long requestID, RequestBaseItem item, ZAHttpResult httpResult) {
                        String body = item.getRawHttpResponseData();
//                        if (httpResult.getHttpResultCode() == HttpResultCodes.RESULT_OK) {
//                            body = item.getRawHttpResponseData();
//                        }
                        invokeJSCallback((String) item.getAttachData(), body);
                    }
                });

                item.run();
            } catch (JSONException e) {
                e.printStackTrace();
            }

            return true;
        }else if (cmdid.equals(ZAReactNativeCommands.SEND_EMAIL)) {
            Uri uri = Uri.parse("mailto:");
            Intent data = new Intent(Intent.ACTION_SENDTO, uri);
//        data.setData(Uri.parse("mailto:455245521@qq.com"));
            try {
                JSONObject jsonObject = new JSONObject(cmdParams);
                String title = jsonObject.optString("title");
                String body = jsonObject.optString("body");

                data.putExtra(Intent.EXTRA_SUBJECT, title);
                data.putExtra(Intent.EXTRA_TEXT, body);

                if (activity != null){
                    activity.startActivity(data);
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }

            return true;
        }else if (cmdid.equals(ZAReactNativeCommands.REQUEST_APPMODULE_CODE)) {
            RNLog.d("rn", "module path = REQUEST_APPMODULE_CODE");

            try {
                JSONObject jsonObject = new JSONObject(cmdParams);
                String modulename = jsonObject.optString("modulename");

                List<AppletPackageInfo> aplist = ZAReactNative.instance.getAppletManager().getAppletList();
                AppletPackageInfo target = null;

                for (AppletPackageInfo info : aplist){
                    if (info.name.equals(modulename)){
                        target = info;
                        break;
                    }
                }

                String code = "";
                if (target != null){
                    String path = target.path + File.separator + "applet.jsbundle";
                    code = Utils.getFileContent(path);
                }

                RNLog.d("rn", "module path = " + modulename + " code = " + code);

                invokeJSCallback(eventID, code);
            } catch (JSONException e) {
                e.printStackTrace();
            }

            return true;
        }else if (cmdid.equals(ZAReactNativeCommands.REQUEST_APPLETS_INFO)) {
            RNLog.d("rn", "module path = REQUEST_APPLETS_INFO");

            RNAppletManager am = ZAReactNative.instance.getAppletManager();
            List<AppletPackageInfo> list = am.getAppletList();

            String code = GsonUtil.gson.toJson(list);
            invokeJSCallback(eventID, code);

            return true;
        }

        return false;
    }

}
