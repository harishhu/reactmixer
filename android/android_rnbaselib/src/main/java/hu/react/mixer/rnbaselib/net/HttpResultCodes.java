package hu.react.mixer.rnbaselib.net;

/**
 * Created by harishhu on 2017/4/13.
 */

public class HttpResultCodes {
    /**
     * http连接失败
     * */
    public static final int RESULT_CONNECT_FAILED = -99;
    /**
     * 成功
     */
    public static final int RESULT_OK = 0;

    /**
     * 服务器内部错误
     */
    public static final int RESULT_UNKOWN_ERROR = -1;

    /**
     * 1 Token失效
     */
    public static final int RESULT_INVALID_TOKEN = 1;

    /**
     * 10001 未登录
     */
    public static final int RESULT_NOT_LOGIN = 10001;

    /**
     * 2	手机验证码发送失败
     */
    public static final int RESULT_SEND_PHONECAPTCHA_FAILED = 2;

    /**
     * 8	您没有权限访问该模块,请先登录
     */
    public static final int RESULT_ACCESS_FAILED = 8;

    /**
     * 10	服务器繁忙，请稍后再试
     */
    public static final int RESULT_SERVICE_BUSY = 10;

    /**
     * 50	请输入登录账户信息"
     */
    public static final int RESULT_NO_ACCOUNT_INOUT = 50;

    /**
     * 51	请输入登录密码
     */
    public static final int RESULT_NO_PASSWORD_INOUT = 51;

    /**
     * 52	账号不存在
     */
    public static final int RESULT_ACCOUNT_NOTFOUND = 52;

    /**
     * 53	该手机号已注册
     */
    public static final int RESULT_ACCOUNT_EXIST = 53;

    /**
     * 54	由于您之前的异常操作，您的账户已经被锁定
     */
    public static final int RESULT_ACCOUNT_LOCKED = 54;

    /**
     * 55	登录密码错误
     */
    public static final int RESULT_ACCOUNT_PASSWORD_MISMATCH = 55;

    /**
     * 56	密码输错次数过多，账号被锁定24小时
     */
    public static final int RESULT_LOCKED_BYWRONGPASSWORD = 56;

    /**
     * 103	请输入您收到的短信验证码
     */
    public static final int RESULT_PHONE_VERIFYCODE_NOTFOUND = 103;

    /**
     * 104	短信验证码必须为6位数字
     */
    public static final int RESULT_PHONE_VERIFYCODE_LENGTH_ERROR = 104;

    /**
     * 105	短信验证码已失效
     */
    public static final int RESULT_PHONE_VERIFYCODE_INVALID = 105;

    /**
     * 106	短信验证码错误
     */
    public static final int RESULT_PHONE_VERIFYCODE_ERROR = 106;

    /**
     * 10007	登陆失败三次
     */
    public static final int RESULT_LOGIN_MORETHAN_THREE = 10007;

    /**
     * 109	首日登录需要修改密码
     */
    public static final int RESULT_LOGIN_FIRST = 109;

    /**
     * 1000001	代理人Id为空
     */
    public static final int AGENTID_IS_NULL = 1000001;

    /**
     * 1000002	已经有相同五证信息的客户
     */
    public static final int FIELDS_FIVE_REPEAT = 1000002;

    /**
     * 1000003	已有相同姓名性别出生日期的客户
     */
    public static final int FIELDS_THREE_REPEAT = 1000003;

    /**
     * 1000004	已有相同姓名与手机号的客户
     */
    public static final int NAME_AND_MOBILE_REPEAT = 1000004;

    /**
     * 1000006	更新客户记录失败
     */
    public static final int CUSTOMER_UPDATE_FAIL = 1000006;

    /**
     * 账号在其他设备登录
     */
    public static final int RESULT_MULTITERMINAL_LOGIN = 112;

    /**
     * 客户列表为空时，查询客户列表会返回此code
     */
    public static final int RESULT_QUERYCUSTOMER_EMPTY = 10006;

}
