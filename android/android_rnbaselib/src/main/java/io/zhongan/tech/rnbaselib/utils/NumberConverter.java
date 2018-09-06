package io.zhongan.tech.rnbaselib.utils;

/**
 * Created by harishhu on 2016/3/30.
 * 添加公共的数字转换函数
 */
public class NumberConverter {
    public static float toFloat(String data){
        float f = 0f;
        try{
            f = Float.valueOf(data);
        }catch (Exception e){
            e.printStackTrace();
        }

        return f;
    }

    public static double toDouble(String data){
        double f = 0d;
        try{
            f = Double.parseDouble(data);
        }catch (Exception e){
            e.printStackTrace();
        }

        return f;
    }

    public static int toInteger(String data){
        int f = 0;
        try{
            f = Integer.valueOf(data);
        }catch (Exception e){
            e.printStackTrace();
        }

        return f;
    }

    public static short toShort(String data){
        short f = 0;
        try{
            f = Short.valueOf(data);
        }catch (Exception e){
            e.printStackTrace();
        }

        return f;
    }

    public static Long toLong(String data){
        long f = 0L;
        try{
            f = Long.valueOf(data);
        }catch (Exception e){
            e.printStackTrace();
        }

        return f;
    }
}
