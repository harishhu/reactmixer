package io.zhongan.tech.rnbaselib.core;


public class RNConstants {
	/** sp文件的key值 */
	public static final String TIME_KEY="time_key";
	//分享的图片地址
	public static final String IMAGE_URL = "http://f1.sharesdk.cn/imgs/2014/02/26/owWpLZo_638x960.jpg";

	public static final long MINUTE = 60 * 1000;
	public static final long HOUR = 60 * MINUTE;
	public static final long DAY = 24 * HOUR;

	public static final int PHONENUMER_LENGTH = 11;

	/**消息推送开关的定义*/
	public static final String PUSHMESSAGE_SWITCH = "pushmessage_switch";

	/**
	 * 当前app版本号
	 * */
	public static final String KEY_APP_VERSION = "app_version";
	/**
	 * 要分享的数据
	 * */
	public static final String KEY_SHARE_DATA = "local_share_data";

	/**
	 * webview的默认action
	 * */
	public static final String ACTION_PRODUCT_DEFAULT_URL = "com.zhongan.information.webview.product.defaulturl";

	public static final String ACTION_REACTNATIVE_BASEENTRY = "com.zatech.saadtw.reactnative.baseentry";

	public static String RN_DEFAULT_MODULE = "";
	public static Object RN_PARAMS = null;
	public static final String RN_MODULE_NAME = "rn_module_name";
	public static final String RN_MODULE_BALANCE = "saadtw_account_balance";
	public static final String RN_MODULE_PRODUCT_DETAIL = "saadtw_prodoct_detail";
	public static final String RN_MODULE_CARD = "saadtw_card";
	public static final String RN_MODULE_MYPERFORN = "saadtw_myPerform";
	public static final String RN_MODULE_TEAMPERFORM = "saadtw_teamPerform";

	public static final String RN_APPLET_NAME = "appletname";
	public static final String RN_APPLET_PAGEROUTER = "appletpagerouter";
}
