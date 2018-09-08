package hu.reactmixer.reactnativebuildhost;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;

import org.json.JSONException;
import org.json.JSONObject;

import hu.react.mixer.rnbaselib.core.RNAppConfig;
import hu.react.mixer.rnbaselib.core.ZAReactNative;


/**
 * Created by hufuyi on 2018/5/3.
 */

public class ZAReactNativeHandler {
    private static final int RESULT_CUSTOMER_PICK = 104;

    private final String ACTION_CUSTOMER = "pushCustomerCenter";
    private final String ACTION_CALLUP = "callup";
    private final String ACTION_SHAREAPPCONTENT = "shareappcontent";

    private String customer_eventId = "";

    private ZAReactNative zaReactNative;
    private Context applicationContext;

    ZAReactNativeHandler(Context c){
        applicationContext = c.getApplicationContext();

        initReactNative();
        initRNAppConfig();
    }

    private void initRNAppConfig(){
        RNAppConfig appconfig = ZAReactNative.instance.getRNAppConfig();
        appconfig.putConfig("userToken", "rnbrowser-android");
    }

    private void initReactNative() {
        zaReactNative  = ZAReactNative.instance;

        zaReactNative.setApplicationContext(applicationContext);
        zaReactNative.setReactNativeEventListener(new ZAReactNative.IZAReactNativeEventListener() {
            @Override
            public boolean handleEventFromJS(String eventCallbackID, String cmdid, String cmdParams) {
                if (cmdid.equals(ACTION_CUSTOMER)) {
//                    cutomer_eventId = eventCallbackID;
//                    Intent i = new Intent(AppConstant.KEY_CUSTOMER_PICK_ACTION);
//                    i.setPackage(applicationContext.getPackageName());
//                    zaReactNative.getCurrentReactActivity().startActivityForResult(i, RESULT_CUSTOMER_PICK);

                    return true;
                } else if (cmdid.equals(ACTION_CALLUP)) {
                    String moblie = cmdParams;

                    if (null != moblie && !"".equals(moblie)) {
                        Intent intent1 = new Intent(Intent.ACTION_DIAL);
                        intent1.setData(Uri.parse("tel:" + moblie));
                        zaReactNative.getCurrentReactActivity().startActivity(intent1);
                    }

                    return true;
                } else if (cmdid.equals(ACTION_SHAREAPPCONTENT)) {

                    try {
                        JSONObject jsonObject = new JSONObject(cmdParams);
                        String title = jsonObject.optString("title");
                        String body = jsonObject.optString("body");
                        String url = jsonObject.optString("url");
                        String imageurl = jsonObject.optString("imageurl");

//                        LocalShareData data = new LocalShareData();
//                        data.title = title;
//                        data.desc = body;
//                        data.url = url;
//                        data.imageUrl = imageurl;
//                        data.typeSet = null;

//                        ShareDialog shareDialog = new ShareDialog(zaReactNative.getCurrentReactActivity(), data);
//                        shareDialog.show();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                    return true;
                }

                return false;
            }

            @Override
            public boolean onActivityResult(int requestCode, int resultCode, Intent data) {
                if (resultCode != Activity.RESULT_OK)
                    return false;

                switch (requestCode) {
                    case RESULT_CUSTOMER_PICK:{
//                        Customer info = (Customer) data.getSerializableExtra(AppConstant.KEY_PICK_RETURN);
//                        handlePickCustomer(info);
                        return true;
                    }

                }

                return false;
            }
        });
    }

//    private void handlePickCustomer(Customer info) {
//        if (info == null) {
//            return;
//        }
//
//        ZAReactNative zaReactNative = ZAReactNative.instance;
//
//        String json = GsonUtil.gson.toJson(info);
//        zaReactNative.invokeEventCallback(cutomer_eventId, json);
//    }
}
