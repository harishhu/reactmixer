package io.zhongan.tech.rnbaselib.reactnative.commands;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import io.zhongan.tech.rnbaselib.core.RequestBaseItem;
import io.zhongan.tech.rnbaselib.net.ZANameValuePair;
import io.zhongan.tech.rnbaselib.utils.Utils;

/**
 * Created by hufuyi on 2018/1/25.
 */

public class RNRequestItem extends RequestBaseItem {
    public String requestUrl = "";
    public String paramsJson = "";
    public String headers = "";

    @Override
    protected String buildTargetUrl(String host) {
        return requestUrl;
    }

    @Override
    protected void buildParams(List<ZANameValuePair> params) {
        super.buildParams(params);

        if (!Utils.isEmpty(paramsJson)){
//            try {
//                JSONObject jsonObject = new JSONObject(paramsJson);
//                Iterator iterator = jsonObject.keys();
//                while(iterator.hasNext()){
//                    String key = (String) iterator.next();
//                    String value = jsonObject.getString(key);
//
//                    params.add(new ZANameValuePair(key, value));
//                }
//            } catch (JSONException e) {
//                e.printStackTrace();
//            }
            params.add(new ZANameValuePair("", paramsJson, ZANameValuePair.TYPE_JSON_OBJECT));
        }
    }

    @Override
    protected void buildHeaders(List<ZANameValuePair> h) {
        super.buildHeaders(h);

        if (!Utils.isEmpty(headers)){
            try {
                JSONObject jsonObject = new JSONObject(headers);

                Iterator<String> it = jsonObject.keys();
                while(it.hasNext()){
                    String key = it.next();
                    String value = jsonObject.getString(key);

                    if (!Utils.isEmpty(value)){
                        h.add(new ZANameValuePair(key, value));
                    }
                }
            } catch (JSONException e) {
                e.printStackTrace();
            }

        }
    }
}
