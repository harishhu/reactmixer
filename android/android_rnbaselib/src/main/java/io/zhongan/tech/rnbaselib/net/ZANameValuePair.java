package io.zhongan.tech.rnbaselib.net;

/**
 * Created by wangsheng on 2015/8/31.
 */
public class ZANameValuePair {
    //name value pair对应的数据类型，默认为string
    public static final int TYPE_STRING = 1;
    public static final int TYPE_JSON_TOKER = 2;
    public static final int TYPE_JSON_OBJECT = 3;
    public static final int TYPE_FILE = 4;

    public static final String FILE_TYPE_AUDIO = "audio";
    public static final String FILE_TYPE_VIDEO = "video";

    private String name;
    private String value;

    private int type;

    public ZANameValuePair(String name,String val){
        init(name, val, TYPE_STRING);
    }

    public ZANameValuePair(String name,String val, int type){
        init(name, val, type);
    }

    private void init(String name,String val, int type){
        this.name = name;
        this.value = val;
        this.type = type;
    }

    public String getName(){
        return name;
    }

    public String getValue(){
        return value;
    }

    public int getType(){
        return type;
    }
}
