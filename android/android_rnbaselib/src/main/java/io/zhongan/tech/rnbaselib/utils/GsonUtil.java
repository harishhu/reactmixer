package io.zhongan.tech.rnbaselib.utils;

import com.google.gson.Gson;

import java.lang.reflect.Type;
import java.util.List;

public class GsonUtil {
	public static final Gson gson = new Gson();
	
	/**
	 * @param str
	 * <br/>json raw data
	 * @param type 
	 * <br/>the class type which transfer to.
	 * <pre class="prettyprint">
	 * sample:
	 * Type type = new TypeToken<List<Product>>(){}.getType();
	 * </pre>
	 */
	public static <T> List<T> getListFromJSON(String str, Type type) {
		List<T> list = gson.fromJson(str, type);
		return list;
	}
}
