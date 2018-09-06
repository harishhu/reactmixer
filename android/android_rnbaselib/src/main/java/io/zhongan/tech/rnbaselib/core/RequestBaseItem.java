package io.zhongan.tech.rnbaselib.core;

import android.os.Handler;
import android.os.Looper;
import android.util.Log;
import org.json.JSONException;
import org.json.JSONObject;
import java.util.ArrayList;
import java.util.List;

import io.zhongan.tech.rnbaselib.net.HttpResultCodes;
import io.zhongan.tech.rnbaselib.net.ZAHttpResult;
import io.zhongan.tech.rnbaselib.net.ZAHttpUtil;
import io.zhongan.tech.rnbaselib.net.ZANameValuePair;
import io.zhongan.tech.rnbaselib.utils.GsonUtil;
import io.zhongan.tech.rnbaselib.utils.NumberConverter;
import io.zhongan.tech.rnbaselib.utils.PackageUtil;
import io.zhongan.tech.rnbaselib.utils.Utils;

/**
 * Created by harishhu on 2017/3/27.
 */
public abstract class RequestBaseItem implements Runnable {
    public static final int DEFAULT_PAGE_SIZE = 12;

    public static final String HTTP_KEY_TOKEN = "token";
    public static final String HTTP_KEY_TYPE = "t";

    public static final int DEFAULT_GROUP = -1;

    public interface requestItemCallback {
        void requestItemCallback(long requestID, RequestBaseItem item, ZAHttpResult httpResult);
    }

    private final String HOST_URL = "";

    private static final int DEFAULT_HTTP_TIMEOUT = 10000;

    private static String appVersion;
    private static String rawHttpResponseData;

    private Handler mMainHandler;
    protected requestItemCallback callback;
    protected Object attachData;
    protected ZAHttpResult httpResult;

    protected int responseTotalPage;
    protected int responsePageIndex;

    private int requestPageIndex = -1;
    private int requestPageSize = -1;

    private int httpTimeout = DEFAULT_HTTP_TIMEOUT;

    public void setRequestPageIndex(int pageIndex) {
        requestPageIndex = pageIndex;
    }

    public void setRequestPageSize(int pageSize) {
        requestPageSize = pageSize;
    }

    protected Class reponseDataClass;

    public void setReponseDataClass(Class s) {
        reponseDataClass = s;
    }

    public Class getReponseDataClass() {
        return reponseDataClass;
    }

    private long requestID;
    private long requestGroup = DEFAULT_GROUP;

    public long getRequestID() {
        return requestID;
    }

    public void setRequestID(long id) {
        requestID = id;
    }

    public void setRequestGroup(long group){
        requestGroup = group;
    }

    public long getRequestGroup(){
        return requestGroup;
    }

    protected RequestBaseItem() {
        mMainHandler = new Handler(Looper.getMainLooper());
    }

    @Override
    public final void run() {
        String targetUrl = buildTargetUrl(HOST_URL);

        List<ZANameValuePair> params = new ArrayList<ZANameValuePair>();

        buildParams(params);

        List<ZANameValuePair> headers = new ArrayList<ZANameValuePair>();
        buildHeaders(headers);

        httpResult = sendRequest(targetUrl, params, headers);
        parseHttpResultData(httpResult);

        invokeCallbackAfterRequest();
    }

    /**
     * 设置请求结束后的回调
     */
    public void setRequestCallback(requestItemCallback ca) {
        callback = ca;
    }

    /**
     * 设置附加数据，这个会在请求结束后随着回调返回给调用方
     */
    public void setAttachData(Object data) {
        attachData = data;
    }

    /**
     * 获取附加数据
     *
     * @return
     */
    public Object getAttachData() {
        return attachData;
    }

    /**
     * 发送网络请求
     */
    protected ZAHttpResult sendRequest(String targetUrl, List<ZANameValuePair> params, List<ZANameValuePair> headers) {
        return ZAHttpUtil.zaHttpPost(targetUrl, params, headers, getHttpTimeout());
    }

    /**
     * 生成最终请求url
     */
    protected abstract String buildTargetUrl(String host);

    /**
     * 生成http post表单数据
     */
    protected void buildParams(List<ZANameValuePair> params) {
        if (requestPageIndex >= 0) {
            requestPageSize = requestPageSize > 0 ? requestPageSize : DEFAULT_PAGE_SIZE;

            params.add(new ZANameValuePair("size", requestPageSize + ""));
            params.add(new ZANameValuePair("page", (requestPageIndex + 1) + ""));
        }
    }

    /**
     * 获取http超时时间
     */
    protected int getHttpTimeout() {
        return httpTimeout;
    }

    /**
     * 设置http访问超时时间
     */
    public void setHttpTimeOut(int time){
        httpTimeout = time;
    }

    /**
     * parse the base data from response json, i.e return code and return message
     */
    protected void invokeCallbackAfterRequest() {
        if (callback != null) {
            mMainHandler.post(new Runnable() {
                @Override
                public void run() {
                    callback.requestItemCallback(requestID, RequestBaseItem.this, httpResult);
                }
            });
        }
    }


    /**
     * parse the base data from response json, i.e return code and return message
     */
    protected void parseHttpResultData(ZAHttpResult httpResult) {

        if (httpResult == null) {
            return;
        }

        if (httpResult.getHttpResultCode() == HttpResultCodes.RESULT_CONNECT_FAILED) {
            httpResult.setHttpResultMsg("http访问失败");
            return;
        }

        String raw = (String) httpResult.getObj();
        rawHttpResponseData = raw;

        if (raw == null || !(raw instanceof String)) {
            return;
        }
        Log.e("zzz", raw);
        httpResult.setObj(null);

        try {
            JSONObject json = new JSONObject(raw);
//
//            String resultCodeStr = json.getString("errorCode");
            String resultMsg = json.getString("message");

            int resultCodeInt = HttpResultCodes.RESULT_UNKOWN_ERROR;

            resultCodeInt = json.getInt("code");
//            if (issuccess) {
//                resultCodeInt = HttpResultCodes.RESULT_OK;
//            }
//            if (!Utils.isEmpty(resultCodeStr)) {
//                resultCodeInt = NumberConverter.toInteger(resultCodeStr);
//            }
            if (resultCodeInt == HttpResultCodes.RESULT_NOT_LOGIN || resultCodeInt == HttpResultCodes.RESULT_MULTITERMINAL_LOGIN) {
            }

            httpResult.setHttpResultCode(resultCodeInt);
            httpResult.setHttpResultMsg(resultMsg);

            try {
                String totalP = json.getString("pageTotal");
                String pageI = json.getString("pageNum");

                if (!Utils.isEmpty(totalP)) {
                    responseTotalPage = NumberConverter.toInteger(totalP);
                }

                if (!Utils.isEmpty(pageI)) {
                    responsePageIndex = NumberConverter.toInteger(pageI);
                    responsePageIndex--;
                } else {
                    responsePageIndex = requestPageIndex;
                }

            } catch (JSONException e) {
            }

            String body = json.getString("content");
            httpResult.setObj(body);

            parseHttpResultBody(httpResult);

            Object parseBody = httpResult.getObj();
            if (parseBody != null && parseBody instanceof DataBaseItem) {
                DataBaseItem item = (DataBaseItem) parseBody;
                item.setPageIndex(responsePageIndex);
                item.setPageTotal(responseTotalPage);
            }
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    protected void parseHttpResultBody(ZAHttpResult httpResult) {
        try {
            if (reponseDataClass == null) {
                return;
            }

            Object responseData = null;
            String body = (String) httpResult.getObj();
            if (!Utils.isEmpty(body)) {
                responseData = GsonUtil.gson.fromJson(body, reponseDataClass);
            }

            httpResult.setObj(responseData);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 生成请求http headers
     */
    protected void buildHeaders(List<ZANameValuePair> headers) {
        String userToken = ZAReactNative.instance.getUserToken();

        if (!Utils.isEmpty(userToken)) {
            headers.add(new ZANameValuePair(HTTP_KEY_TOKEN, userToken));
        }

        if (appVersion == null) {
            appVersion = Utils.getAppVersion(ZAReactNative.instance.getApplicationContext());
        }

//        headers.add(new ZANameValuePair(HTTP_KEY_TYPE, "android"));
//        headers.add(new ZANameValuePair("v", appVersion));
//        headers.add(new ZANameValuePair("osVersion", PackageUtil.getOsVersion()));
//        headers.add(new ZANameValuePair("osDevice", PackageUtil.getDeviceName()));
        headers.add(new ZANameValuePair("deviceId", PackageUtil.getDeviceID(ZAReactNative.instance.getApplicationContext())));
//        headers.add(new ZANameValuePair("Accept", "application/json"));
        headers.add(new ZANameValuePair("Content-Type", "application/json;charset=UTF-8"));
    }

    protected void clearValuePairByName(List<ZANameValuePair> list, String name){
        ZANameValuePair pais = null;

        for (ZANameValuePair data : list){
            if (data.getName().equals(name)){
                pais = data;
                break;
            }
        }

        if (pais != null){
            list.remove(pais);
        }
    }

    public String getRawHttpResponseData(){
        return rawHttpResponseData;
    }
}
