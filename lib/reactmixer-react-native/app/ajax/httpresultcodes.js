
function HttpResultCodes(){
    /**
     * http连接失败
     * */
    this.RESULT_CONNECT_FAILED = -99;

    /**
     * 成功
     */
    this.RESULT_OK = 0;

    /**
     * 服务器内部错误
     */
    this.RESULT_UNKOWN_ERROR = -1;

    /**
     * 1 Token失效
     */
    this.RESULT_INVALID_TOKEN = 1;

    /**
     * 2	手机验证码发送失败
     */
    this.RESULT_SEND_PHONECAPTCHA_FAILED = 2;

    /**
     * 8	您没有权限访问该模块,请先登录
     */
    this.RESULT_ACCESS_FAILED = 8;

    /**
     * 10	服务器繁忙，请稍后再试
     */
    this.RESULT_SERVICE_BUSY = 10;

    /**
     * 50	请输入登录账户信息"
     */
    this.RESULT_NO_ACCOUNT_INOUT = 50;

    /**
     * 51	请输入登录密码
     */
    this.RESULT_NO_PASSWORD_INOUT = 51;

    /**
     * 52	账号不存在
     */
    this.RESULT_ACCOUNT_NOTFOUND = 52;

    /**
     * 53	该手机号已注册
     */
    this.RESULT_ACCOUNT_EXIST = 53;

    /**
     * 54	由于您之前的异常操作，您的账户已经被锁定
     */
    this.RESULT_ACCOUNT_LOCKED = 54;

    /**
     * 55	登录密码错误
     */
    this.RESULT_ACCOUNT_PASSWORD_MISMATCH = 55;

    /**
     * 56	密码输错次数过多，账号被锁定24小时
     */
    this.RESULT_LOCKED_BYWRONGPASSWORD = 56;

    /**
     * 103	请输入您收到的短信验证码
     */
    this.RESULT_PHONE_VERIFYCODE_NOTFOUND = 103;

    /**
     * 104	短信验证码必须为6位数字
     */
    this.RESULT_PHONE_VERIFYCODE_LENGTH_ERROR = 104;

    /**
     * 105	短信验证码已失效
     */
    this.RESULT_PHONE_VERIFYCODE_INVALID = 105;

    /**
     * 106	短信验证码错误
     */
    this.RESULT_PHONE_VERIFYCODE_ERROR = 106;

    /**
     * 10007	登陆失败三次
     */
    this.RESULT_LOGIN_MORETHAN_THREE = 10007;

    /**
     * 109	首日登录需要修改密码
     */
    this.RESULT_LOGIN_FIRST = 109;

    /**
     * 1000001	代理人Id为空
     */
    this.AGENTID_IS_NULL = 1000001;

    /**
     * 1000002	已经有相同五证信息的客户
     */
    this.FIELDS_FIVE_REPEAT = 1000002;

    /**
     * 1000003	已有相同姓名性别出生日期的客户
     */
    this.FIELDS_THREE_REPEAT = 1000003;

    /**
     * 1000004	已有相同姓名与手机号的客户
     */
    this.NAME_AND_MOBILE_REPEAT = 1000004;

    /**
     * 1000006	更新客户记录失败
     */
    this.CUSTOMER_UPDATE_FAIL = 1000006;

    /**
     * 账号在其他设备登录
     */
    this.RESULT_MULTITERMINAL_LOGIN = 112;

    /**
     * 客户列表为空时，查询客户列表会返回此code
     */
    this.RESULT_QUERYCUSTOMER_EMPTY = 10006;
}

module.exports = new HttpResultCodes();
