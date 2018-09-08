//
//  ZAKJHttpResultCodes.h
//  saadtw
//
//  Created by harishhu on 2017/12/28.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#ifndef ZAKJHttpResultCodes_h
#define ZAKJHttpResultCodes_h

/**
 * 成功
 */
#define RESULT_OK  0

/**
 * 服务器内部错误
 */
#define RESULT_UNKOWN_ERROR  -1

/**
 * 1 Token失效
 */
#define RESULT_INVALID_TOKEN  1


///**
// * 1 Token失效
// */
//#define RESULT_INVALID_TOKEN  10001

/**
 * 2  手机验证码发送失败
 */
#define RESULT_SEND_PHONECAPTCHA_FAILED  2

/**
 * 8  您没有权限访问该模块,请先登录
 */
#define RESULT_ACCESS_FAILED  8

/**
 * 10  服务器繁忙，请稍后再试
 */
#define RESULT_SERVICE_BUSY  10

/**
 * 50  请输入登录账户信息"
 */
#define RESULT_NO_ACCOUNT_INOUT  50

/**
 * 51  请输入登录密码
 */
#define RESULT_NO_PASSWORD_INOUT  51

/**
 * 52  账号不存在
 */
#define RESULT_ACCOUNT_NOTFOUND  52

/**
 * 53  该手机号已注册
 */
#define RESULT_ACCOUNT_EXIST  53

/**
 * 54  由于您之前的异常操作，您的账户已经被锁定
 */
#define RESULT_ACCOUNT_LOCKED  54

/**
 * 55  登录密码错误
 */
#define RESULT_ACCOUNT_PASSWORD_MISMATCH  55

/**
 * 56  密码输错次数过多，账号被锁定24小时
 */
#define RESULT_LOCKED_BYWRONGPASSWORD  56

/**
 * 103  请输入您收到的短信验证码
 */
#define RESULT_PHONE_VERIFYCODE_NOTFOUND  103

/**
 * 104  短信验证码必须为6位数字
 */
#define RESULT_PHONE_VERIFYCODE_LENGTH_ERROR  104

/**
 * 105  短信验证码已失效
 */
#define RESULT_PHONE_VERIFYCODE_INVALID  105

/**
 * 106  短信验证码错误
 */
#define RESULT_PHONE_VERIFYCODE_ERROR  106

/**
 * 10007 登陆失败三次
 */
#define RESULT_LOGIN_FAILED_MORETIME 10007

/**
 * 109  标志第一次登陆，需要修改密码
 */
#define RESULT_FIRST_LOGIN  109

/**
 * 112  多个设备登录
 */
#define RESULT_MORE_LOGIN  112

/**
 * 10005  图片验证码输入不正确
 */
#define RESULT_LOGIN_FAILED_IMGCODE  10005

/**
 * 1000001 代理人Id为空
 */
#define AGENTID_IS_NULL  1000001

/**
 * 1000002 已经有相同五证信息的客户
 */
#define FIELDS_FIVE_REPEAT  1000002
#define FIELDS_FIVE_REPEATMSG  @"已经有相同五证信息的客户"

/**
 * 1000003 已有相同姓名性别出生日期的客户
 */
#define FIELDS_THREE_REPEAT  1000003
#define FIELDS_THREE_REPEATMSG @"已有相同姓名性别出生日期的客户"

/**
 * 1000004 已有相同姓名与手机号的客户
 */
#define NAME_AND_MOBILE_REPEAT  1000004
#define NAME_AND_MOBILE_REPEATMSG  @"已有相同姓名与手机号的客户"

/**
 * 1000006 更新客户记录失败
 */
#define CUSTOMER_UPDATE_FAIL  1000006
#define CUSTOMER_UPDATE_FAILMSG  @"更新客户记录失败"

/**
 * 40001 暂无排行数据
 */
#define RANKING_NO_RANKING_CODE 40001
#define RANKING_NO_RANKING_MSG @"暂无排行数据"


#endif /* ZAKJHttpResultCodes_h */
