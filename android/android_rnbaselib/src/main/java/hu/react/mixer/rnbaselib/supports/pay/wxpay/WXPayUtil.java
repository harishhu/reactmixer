package hu.react.mixer.rnbaselib.supports.pay.wxpay;

import android.content.Context;

import com.tencent.mm.opensdk.constants.Build;
import com.tencent.mm.opensdk.modelpay.PayReq;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import hu.react.mixer.rnbaselib.jsonbean.WxPayInfo;

/**
 *  Created by za-liudanfeng on 2018/5/14.
 */

public class WXPayUtil {

    /**
     * appId
     */
    public String APP_ID ;
    //IWXAPI是第三方app和微信通信的openapi接口
    private IWXAPI api;
    private Context context;
    public static WXPayUtil wxPayUtil;

    public static WXPayUtil getInstance(Context context,String app_id) {
        if (wxPayUtil == null) {
            wxPayUtil = new WXPayUtil();
        }
        if (wxPayUtil.api != null) {
            wxPayUtil.api.unregisterApp();
        }
        wxPayUtil.context = context;
        wxPayUtil.APP_ID = app_id;
        wxPayUtil.regToWx();
        return wxPayUtil;
    }

    //注册应用id到微信
    private void regToWx() {
        //通过WXAPIFactory工厂，获取IWXAPI的实例
        api = WXAPIFactory.createWXAPI(context, APP_ID, true);
        //将应用的appId注册到微信
        api.registerApp(APP_ID);
    }
	//支付前的加密由服务端完成
    public boolean wxPay(WxPayInfo wxPayInfo) {
		PayReq request = new PayReq();
        request.appId = wxPayInfo.appId;
        request.partnerId = wxPayInfo.partnerId;
        request.prepayId= wxPayInfo.prepayId;
        request.packageValue = wxPayInfo.packageValue;
        request.nonceStr= wxPayInfo.nonceStr;
        request.timeStamp= wxPayInfo.timeStamp;
        request.sign= wxPayInfo.sign;
        boolean isPaySupported = api.getWXAppSupportAPI() >= Build.PAY_SUPPORTED_SDK_INT;
        if(!isPaySupported || !request.checkArgs())
            return false;
        return api.sendReq(request);
    }

}
