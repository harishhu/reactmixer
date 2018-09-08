package hu.react.mixer.rnbaselib.net;

import android.os.SystemClock;
import android.text.TextUtils;

import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.MultipartBuilder;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;
import com.squareup.okhttp.ResponseBody;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;

import java.io.File;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import hu.react.mixer.rnbaselib.utils.FileUtils;
import hu.react.mixer.rnbaselib.utils.GsonUtil;
import hu.react.mixer.rnbaselib.utils.PackageUtil;
import hu.react.mixer.rnbaselib.utils.RNLog;
import hu.react.mixer.rnbaselib.utils.Utils;

import hu.react.mixer.rnbaselib.utils.FileUtils;
import hu.react.mixer.rnbaselib.utils.GsonUtil;
import hu.react.mixer.rnbaselib.utils.PackageUtil;
import hu.react.mixer.rnbaselib.utils.RNLog;
import hu.react.mixer.rnbaselib.utils.Utils;

/**
 * add by harish.hu 2015/05/04
 * 
 * 该类提供http相关操作方法
 */
public class ZAHttpUtil {
	private static final String TAG="zahttp";
	/**
	 * ContentCharset
	 */
	private static final String CHARSET = "UTF-8";

	/**
	 * 连接超时时间
	 */
	public final static int CONNECT_TIMEOUT = 30000;
	
	private static final int HTTP_REQUEST_TYPE_GET = 0;
	private static final int HTTP_REQUEST_TYPE_POST = 1;

	public static String ACCESSKEY;
	
	public static boolean connectUrl(String url, int timeout) {
		boolean ret = false;
		HttpURLConnection httpUrl = null;
		long beginTime=SystemClock.uptimeMillis();
		long endTime = beginTime;
		
		while ((endTime - beginTime) < timeout){
			try {
				httpUrl = (HttpURLConnection) new URL(url).openConnection();
				httpUrl.setConnectTimeout(timeout/3);
				httpUrl.connect();
				ret = true;
				break;
			} catch (Throwable e) {
				e.printStackTrace();
			} finally {
				if (null != httpUrl) {
					httpUrl.disconnect();
				}
				httpUrl = null;
			}
			
			try {
				Thread.sleep(50);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			endTime = SystemClock.uptimeMillis();
		}
		return ret;
	}
	
	/**
	 *  http get请求，会对 平台的请求和返回数据做相关处理
	 * <pre class="prettyprint">
	 * sample code:
	 * zaHttpResult hr = zaHttpUtil.zaHttpGet("", null, 30000);
	 * </pre>
	 * */
	public static ZAHttpResult zaHttpGet(String url, List<ZANameValuePair> params, List<ZANameValuePair> headers, int timeout) {
		String param = buildGetParam(params);
		String getUrl=url;
		if (null != param && params.size() > 0) {
			getUrl = url + "?" + param;
		}
		return httpRequest(HTTP_REQUEST_TYPE_GET, getUrl, null, headers, timeout, false);
	}
	
	/**
	 *  http post请求，会对 平台的请求和返回数据做相关处理
	 * */
	public static ZAHttpResult zaHttpPost(String url, List<ZANameValuePair> params, List<ZANameValuePair> headers, int timeout, boolean encryptData){
		return httpRequest(HTTP_REQUEST_TYPE_POST, url, params, headers, timeout, encryptData);
	}

	public static ZAHttpResult zaHttpPost(String url, List<ZANameValuePair> params, List<ZANameValuePair> headers, int timeout){
		return httpRequest(HTTP_REQUEST_TYPE_POST, url, params, headers, timeout, false);
	}
	
	private static ZAHttpResult httpRequest(int reqType, String url, List<ZANameValuePair> params, List<ZANameValuePair> headers, int timeout, boolean encryptData) {
		//RNLog.d("httpRequest start, dataencrypt = " + encryptData);
		ZAHttpResult result = new ZAHttpResult();
		int tryTime=1;

		Response okresponse = null;
		int statusCode = 0;

		if (!Utils.isEmpty(ACCESSKEY)){
			headers.add(new ZANameValuePair("accessKey", ACCESSKEY));
		}

		try {
			while (tryTime-- > 0){
				RNLog.d(TAG, "http -- try to request url(" + ((HTTP_REQUEST_TYPE_GET == reqType) ? "get" : "post") + ") : " + url);
				if (HTTP_REQUEST_TYPE_GET == reqType) {
					okresponse = httpGet(url, headers, timeout);
					if (null != okresponse) {
						statusCode = okresponse.code();
						//statusMsg = response.getStatusLine().getReasonPhrase();
						RNLog.d(TAG, url + "; response status code = " + statusCode);
						result.setHttpResultCode(statusCode);

						if (okresponse.isSuccessful()) {
							try {
								ResponseBody body = okresponse.body();
								String strResult = body.string();

								RNLog.d(TAG, url + "; response entity data = " + strResult);

								if (strResult != null) {
									result.setObj(strResult);
								}

								body.close();
							} catch (IOException e1) {
								e1.printStackTrace();
							}
						}
						break;
					}
				} else {
					okresponse = okhttpPost(url, params, headers, timeout, encryptData);
					statusCode = okresponse.code();

					result.setHttpResultCode(statusCode);
					RNLog.d(TAG, "http result code = " + statusCode);

					if (okresponse != null && okresponse.isSuccessful()) {
						ResponseBody body = okresponse.body();
						String res = body.string();

						if (encryptData){
							PackageUtil.DataEncrypt rawData = GsonUtil.gson.fromJson(res, PackageUtil.DataEncrypt.class);
							RNLog.d(TAG, "response encrypt data = " + res);
							if (!Utils.isEmpty(rawData.data)){
								byte[] tempRes = PackageUtil.httpDataDecrypt(rawData.data.getBytes());
								res = new String(tempRes);
							}
						}

						RNLog.d(TAG, url + "; response entity data = " + res);

						result.setObj(res);
						body.close();
						break;
					}
				}
			}
		}catch (Throwable e) {
			//RNLog.d(TAG, e.toString());
			e.printStackTrace();

			if (e instanceof UnknownHostException || e instanceof SocketTimeoutException){
				result.setHttpResultCode(HttpResultCodes.RESULT_CONNECT_FAILED);
			}
		}

		RNLog.d(TAG, "httpRequest end " + result.getHttpResultCode());

		return result;
	}
	/*
	* ok http
	* */
	public static Response okhttpPost(String url, List<ZANameValuePair> params,
									  List<ZANameValuePair> headers, int timeout, boolean encryptData) throws JSONException,
			 IOException {
		RNLog.d(TAG, "http post default timeout value = " + timeout);
		OkHttpClient okHttpClient = ZAHttpClient.instance.getOkHttpClient();
		Request.Builder reqBuilder = new Request.Builder();
		reqBuilder.url(url);
		//Response res = okHttpClient.newCall(req).execute();

		if (headers != null) {
            StringBuilder sb = new StringBuilder();

            for (ZANameValuePair h : headers) {
				reqBuilder.header(h.getName(),h.getValue());

                sb.append(h.getName() + "=");
                sb.append(h.getValue() + ";");
			}

			RNLog.d(TAG, "http header: " + sb.toString());
		}

		List<ZANameValuePair> multiPartList = new ArrayList<ZANameValuePair>();

		JSONObject jsonObject = new JSONObject();
		boolean isMulitPart = false;

		for (ZANameValuePair p : params) {
			String key = p.getName();
			//if (key.equalsIgnoreCase("stepInfos")) {
			if (p.getType() == ZANameValuePair.TYPE_JSON_TOKER) {
				JSONTokener jsonTokener = new JSONTokener(p.getValue());
				Object val = jsonTokener.nextValue();
				jsonObject.put(key, val);
				//} //else if (key.equalsIgnoreCase("orderInfo")) {
			}else if (p.getType() == ZANameValuePair.TYPE_JSON_OBJECT){
				//RNLog.d("harish2", "toker value = " + p.getValue());
				JSONTokener jsonTokener = new JSONTokener(p.getValue());
				Object val = jsonTokener.nextValue();
				//jsonObject.put(key, val);
				if (val instanceof  JSONObject){
					jsonObject = (JSONObject)val;
				}
			}else if (p.getType() == ZANameValuePair.TYPE_FILE){
			//else if (key.equalsIgnoreCase("file")) {
				isMulitPart = true;
				multiPartList.add(p);
			} else {
				//default as string.
				jsonObject.put(key, p.getValue());
			}

			RNLog.d(TAG, "post key = " + p.getName());
			RNLog.d(TAG, "post value = " + p.getValue());
		}

		String jsString = jsonObject.toString();
		RNLog.d(TAG, "post entity data = " + jsString);
		if (isMulitPart){
			MultipartBuilder mb = new MultipartBuilder();
			mb = mb.type(MultipartBuilder.FORM);

			for (ZANameValuePair pair : multiPartList){
				File file = new File(pair.getValue());
				String ext = FileUtils.getExtension(file);
				String mimeType = FileUtils.getMimeType(file);
				RNLog.d(TAG, "ext:" + ext + "\tmime-type:" + mimeType);
				if (TextUtils.isEmpty(mimeType)) {
					mimeType = "image/" + ext;
				}
			    mb.addFormDataPart(pair.getName(), UUID.randomUUID()+"."+ext, RequestBody.create(MediaType.parse(mimeType), file));
			}

			reqBuilder.post(mb.build());
		}else{
			if (encryptData && !Utils.isEmpty(jsString)){
				PackageUtil.DataEncrypt tempRawData = new PackageUtil.DataEncrypt();
				tempRawData.data = new String(PackageUtil.httpDataEncrypt(jsString.getBytes()));

				jsString = GsonUtil.gson.toJson(tempRawData);
			}

			RNLog.d(TAG, "post entity data = " + encryptData + " " + jsString);
			reqBuilder.post(RequestBody.create(null,jsString));
		}

		okHttpClient.setConnectTimeout(timeout, TimeUnit.MILLISECONDS);
		okHttpClient.setReadTimeout(timeout, TimeUnit.MILLISECONDS);
		Response response = okHttpClient.newCall(reqBuilder.build()).execute();

		return response;
	}

	/*private void uploadFile()
	{
		String end = "/r/n";
		String Hyphens = "--";
		String boundary = "*****";
		try
		{
			URL url = new URL(actionUrl);
			HttpURLConnection con = (HttpURLConnection) url.openConnection();
      *//* 允许Input、Output，不使用Cache *//*
			con.setDoInput(true);
			con.setDoOutput(true);
			con.setUseCaches(false);
      *//* 设定传送的method=POST *//*
			con.setRequestMethod("POST");
      *//* setRequestProperty *//*
			con.setRequestProperty("Connection", "Keep-Alive");
			con.setRequestProperty("Charset", "UTF-8");
			con.setRequestProperty("Content-Type",
					"multipart/form-data;boundary=" + boundary);
      *//* 设定DataOutputStream *//*
			DataOutputStream ds = new DataOutputStream(con.getOutputStream());
			ds.writeBytes(Hyphens + boundary + end);
			ds.writeBytes("Content-Disposition: form-data; "
					+ "name=/"file1/";filename=/"" + newName + "/"" + end);
			ds.writeBytes(end);
      *//* 取得文件的FileInputStream *//*
			FileInputStream fStream = new FileInputStream(uploadFile);
      *//* 设定每次写入1024bytes *//*
			int bufferSize = 1024;
			byte[] buffer = new byte[bufferSize];
			int length = -1;
      *//* 从文件读取数据到缓冲区 *//*
			while ((length = fStream.read(buffer)) != -1)
			{
        *//* 将数据写入DataOutputStream中 *//*
				ds.write(buffer, 0, length);
			}
			ds.writeBytes(end);
			ds.writeBytes(Hyphens + boundary + Hyphens + end);
			fStream.close();
			ds.flush();
      *//* 取得Response内容 *//*
			InputStream is = con.getInputStream();
			int ch;
			StringBuffer b = new StringBuffer();
			while ((ch = is.read()) != -1)
			{
				b.append((char) ch);
			}
			System.out.println("上传成功");
			Toast.makeText(MainActivity.this, "上传成功", Toast.LENGTH_LONG)
					.show();
			ds.close();
		} catch (Exception e)
		{
			System.out.println("上传失败" + e.getMessage());
			Toast.makeText(MainActivity.this, "上传失败" + e.getMessage(),
					Toast.LENGTH_LONG).show();
		}
}*/
	/**
	 * 纯http get请求
	 * 
	 * */
	private static Response httpGet(String url, List<ZANameValuePair> headers, int timeout) {
		OkHttpClient client = ZAHttpClient.instance.getOkHttpClient();

		Request.Builder requestBuilder = new Request.Builder();
		requestBuilder.url(url);

		if (headers != null) {
			for (ZANameValuePair h : headers) {
				requestBuilder.header(h.getName(),h.getValue());
			}
		}

		client.setConnectTimeout(timeout, TimeUnit.MILLISECONDS);

		Response response = null;

		try {
			response = client.newCall(requestBuilder.build()).execute();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return response;
	}
	
	private static String buildGetParam(List<ZANameValuePair> params) {
		StringBuffer sb = new StringBuffer();
		try {
			if (null != params) {
				for (ZANameValuePair item : params) {
					if (sb.length() > 0) {
						sb.append("&");
					}
					sb.append(item.getName())
					  .append("=")
					  .append(null == item.getValue() ? "" : URLEncoder
								.encode(item.getValue(),
										CHARSET));
					   
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return sb.toString();
	}

}
