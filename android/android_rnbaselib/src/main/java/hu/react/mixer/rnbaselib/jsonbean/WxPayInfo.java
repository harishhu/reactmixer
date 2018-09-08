package hu.react.mixer.rnbaselib.jsonbean;


import java.io.Serializable;

/**
 * Created by za-liudanfeng on 2018/4/13.
 */

public class WxPayInfo implements Serializable {
    public String appId;
    public String partnerId;
    public String prepayId;
    public String packageValue;
    public String nonceStr;
    public String timeStamp;
    public String sign;
}
