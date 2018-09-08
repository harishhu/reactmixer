package hu.react.mixer.rnbaselib.core;

import android.content.Context;
import android.os.Environment;

import java.io.File;
import java.io.IOException;

import hu.react.mixer.rnbaselib.utils.Utils;

/**
 * 包含app运行环境相关的数据
 * 比如默认存储路径，全局context，token保存，运行和编译模式等
 * Created by harishhu on 2015/8/13.
 */
public class AppEnv {
    static final String DATA_CACHE_DIRNAME = "za_data_cache";

    public static final String DIR_ANDROID = "Android";
    private static final String DIR_CACHE = "za-cache";
    private static final String DIR_DATA = "data";

    public static final AppEnv instance = new AppEnv();

    private AppEnv(){

    }

    boolean isDevVersion = false;
    boolean isDebugBuildMode = false;
    Context mContext;

    /**
     * 是否开发版本
     * */
    public boolean isDevVersion(){
        return false;
    }

    public void setDevVersion(boolean isdebug){
        isDevVersion = isdebug;
    }

    /**
     * 编译模式，debug or release
     * */
    public boolean isDebugBuildMode(){
        return isDebugBuildMode;
    }

    public void setDebugBuildMode(boolean isdebug){
        isDebugBuildMode = isdebug;
    }

    public void setContext(Context c){
        if (mContext == null){
            mContext = c.getApplicationContext();
        }
    }

    public Context getApplicationContext(){
        return mContext;
    }

    /**
     * 获取外部存储路径
     * */
    public File getExternalStorageDirectory() {
        return Environment.getExternalStorageDirectory();
    }

    /**
     * 获取外部存储的缓存路径
     * */
    public String getExternalCacheDirectoryPath(){
        File f = getExternalStorageDirectory();

        if (f != null && f.exists()){
            StringBuilder builder = new StringBuilder(f.getPath());
            builder.append(File.separator);
            builder.append(DIR_ANDROID);
            builder.append(File.separator);
            builder.append(DIR_DATA);
            builder.append(File.separator);
            builder.append(mContext.getPackageName());
            builder.append(File.separator);
            builder.append(DIR_CACHE);

            String path = builder.toString();

            f = new File(path);
            if (f.exists()){
                if (!f.isDirectory()){
                    f.delete();

                    f.mkdirs();
                }
            }else{
                f.mkdirs();
            }

            return path;
        }

        return null;
    }

    /**
     * 获取内部存储的缓存路径
     * */
    public String getInternalCacheDirectoryPath(){
        File f = mContext.getDir(DIR_CACHE, Context.MODE_PRIVATE);

        if (!f.exists()){
            f.mkdirs();
        }

        return f.getPath();
    }

    /**
     * 获取可用的缓存路径，如果存在外部存储，则返回外部存储路径，否则返回内部存储路径
     * */
    public String getAvailableCacheDirectoryPath(){
        String path = getExternalCacheDirectoryPath();
        if (path != null){
            return path;
        }

        return getInternalCacheDirectoryPath();
    }

    /**
     * 获取图片缓存目录
     * */
    public String getImagesDiskCacheDir(){
        String diskcache = getAvailableCacheDirectoryPath();
        return diskcache + File.separator + "images";
    }

    /**
     * 获取视频缓存目录
     * */
    public String getVideoDiskCacheDir(){
        String diskcache = getAvailableCacheDirectoryPath();
        diskcache = diskcache + File.separator + "video";
        File file = new File(diskcache);
        if(!file.exists()){
            file.mkdir();
        }
        return diskcache;
    }

    public String getAudioDiskCacheDir() {
        String diskcache = getAvailableCacheDirectoryPath();
        diskcache = diskcache + File.separator + "audio";
        File file = new File(diskcache);
        if(!file.exists()){
            file.mkdir();
        }
        return diskcache;
    }

    /**
     * 获取文档缓存目录
     * @return
     */
    public String getDocDiskCacheDir() {
        String diskcache = getAvailableCacheDirectoryPath();
        diskcache = diskcache + File.separator + "document";
        File file = new File(diskcache);
        if(!file.exists()){
            file.mkdir();
        }
        return diskcache;
    }

    /**
     * 初始化app basemodule jni运行环境
     * */
    public void initAppBaseJniEnv(){
        System.loadLibrary("zajni");
    }

    /**
     * 获取序列化数据缓存目录
     * */
    public String getSerializeDataDiskCacheDir(){
        return getInternalCacheDirectoryPath() + File.separator + DATA_CACHE_DIRNAME;
    }

    /**
     * 清楚缓存数据
     */
    public void clearCacheData() {
        try {
            Utils.deleteDirectory(getImagesDiskCacheDir());
            Utils.deleteDirectory(getVideoDiskCacheDir());
            Utils.deleteDirectory(getSerializeDataDiskCacheDir());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
