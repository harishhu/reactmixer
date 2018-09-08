
package hu.react.mixer.rnbaselib.utils;

import android.util.Log;

/**
 * 负责app的日志输出
 * */
public class RNLog {
	static boolean DEBUG = true;
	static final String TAG = "rn";
	
	public static void d(String msg){
		if (DEBUG){
		    Log.e(TAG, msg);
		}
	}
	
	public static void v(String msg){
		if (DEBUG){
		    Log.d(TAG, msg);
		}
	}
	
	public static void e(String msg){
		Log.d(TAG, msg);
	}
	
	public static void i(String msg){
		if (DEBUG){
		    Log.d(TAG, msg);
		}
	}
	
	public static void d(String tag, String msg){
		if (DEBUG){
		    Log.d(tag, msg);
		}
	}
	
	public static void v(String tag, String msg){
		if (DEBUG){
		    Log.d(tag, msg);
		}
	}
	
	public static void e(String tag, String msg){
		Log.d(tag, msg);
	}
	
	public static void i(String tag, String msg){
		if (DEBUG){
		    Log.d(tag, msg);
		}
	}

	public static void enableRNLog(boolean enable){
		DEBUG = enable;
	}
}
