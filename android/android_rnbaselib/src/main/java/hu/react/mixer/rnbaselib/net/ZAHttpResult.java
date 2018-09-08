package hu.react.mixer.rnbaselib.net;


import hu.react.mixer.rnbaselib.utils.Utils;

import hu.react.mixer.rnbaselib.utils.Utils;

/**
 * @author harish.hu 2015/05/04
 * 
 * 包含http请求返回后的相关数据
 * 注意：改类会在jni中调用，所以不能修改其路径和类名,包括混淆
 */
public class ZAHttpResult {
	/**
	 * http访问的http result code
	 */
	private int httpResultCode = HttpStatus.SC_BAD_REQUEST;
	/**
	 * http result code对应的提示消息
	 */
	private String httpResultMsg = "";

	/**
	 * http请求返回数据
	 */
	private Object obj;
	
	public ZAHttpResult(){
	}

	public int getHttpResultCode() {
		return httpResultCode;
	}
	
	public void setHttpResultCode(int resultCode) {
		this.httpResultCode = resultCode;
	}

	private void initDefaultResultMsg(){
		if (httpResultCode == HttpStatus.SC_NOT_FOUND){
			httpResultMsg = "HTTP访问路径不存在";
		}else{
			httpResultMsg = "服务器访问失败";
		}
	}
	
	public String getHttpResultMsg() {
		if (Utils.isEmpty(httpResultMsg)){
			initDefaultResultMsg();
		}

		return httpResultMsg;
	}
	
	public void setHttpResultMsg(String resultMsg) {
		this.httpResultMsg = resultMsg;
	}

	public Object getObj() {
		return obj;
	}
	
	public void setObj(Object obj) {
		this.obj = obj;
	}
}
