package io.zhongan.tech.rnbaselib.utils;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.telephony.TelephonyManager;
import android.util.Base64;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

/**
 * Created by harishhu on 2015/8/19.
 */
public class PackageUtil {
    public static class DataEncrypt{
        public String data = "";
    }

    //will be placed later. harish.hu 2017/03/27
    public static byte[] httpDataEncrypt(byte[] data){
        return null;
    }
    public static byte[] httpDataDecrypt(byte[] data){
        return null;
    }

    /**
     * */
    public static String getAPPSignatureData(Context context) {
        if (context == null){
            return "";
        }

        String backString = "";
        try {
            PackageInfo mPackageInfo = context.getPackageManager()
                    .getPackageInfo(context.getPackageName(), 64);

            byte[] arrayOfByte = mPackageInfo.signatures[0].toByteArray();
            backString = digest(arrayOfByte).toUpperCase();
            RNLog.d("app sign data = " + backString);
        } catch (PackageManager.NameNotFoundException e1) {
            e1.printStackTrace();
        }
        return backString;
    }

    private static String getAPPSignatureData1(Context context) {
        if (context == null){
            return "";
        }

        String backString = "";
        try {
            PackageInfo mPackageInfo = context.getPackageManager()
                    .getPackageInfo(context.getPackageName(), 64);

            byte[] arrayOfByte = mPackageInfo.signatures[0].toByteArray();

            MessageDigest mdTemp = MessageDigest.getInstance("md5");
            mdTemp.update(arrayOfByte);

            byte[] result = mdTemp.digest();

            String strBase64 = new String(Base64.encode(result, Base64.NO_PADDING), "ascii");

//            StringBuilder sb = new StringBuilder();
//            for(int i = 0; i < result.length; i ++){
//                sb.append(arrayOfByte[i]);
//            }

            backString = strBase64.trim();

            RNLog.d("harish", "app sign data = " + backString);
        } catch (PackageManager.NameNotFoundException e1) {
            e1.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return backString;
    }

    private static final char hexDigits[] = { '0', '1', '2', '3', '4', '5',
            '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };

    private static final String digest(String message) {
        try {
            byte[] strTemp = message.getBytes();
            MessageDigest mdTemp = MessageDigest.getInstance("MD5");
            mdTemp.update(strTemp);
            byte[] md = mdTemp.digest();
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            return null;
        }
    }

    public static final String digest(byte[] strTemp) {
        try {
            // byte[] strTemp = message.getBytes();
            MessageDigest mdTemp = MessageDigest.getInstance("MD5");
            mdTemp.update(strTemp);
            byte[] md = mdTemp.digest();
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            return null;
        }
    }

    public static String getAppVersion(Context c){
        String version = Utils.getAppVersion(c);
        //ZALog.d("zahttp", "getAppVersion = " + version);

        String[] array = version.split("\\.");

        if (array.length < 3){
            return version;
        }

        StringBuilder versionBuilder = new StringBuilder();
        versionBuilder.append(array[0]);
        versionBuilder.append(".");
        versionBuilder.append(array[1]);
        versionBuilder.append(".");
        versionBuilder.append(array[2]);

        String str = versionBuilder.toString();

        if (Utils.isEmpty(str)){
            return "";
        }

        return str;
    }

    public static String getOsVersion(){
        String str = android.os.Build.VERSION.RELEASE;
        if (Utils.isEmpty(str)){
            return "";
        }
        return str;
    }

    public static String getDeviceName(){
        String str = Utils.getDeviceName();
        if (Utils.isEmpty(str)){
            return "";
        }
        return str;
    }

    public static String getDeviceID(Context c){
        String str = getIMEI(c);
        if (Utils.isEmpty(str)){
            return "";
        }

        return str;
    }

    /**
     * 获取IMEI
     *
     * @return
     */
    private static String getIMEI(Context context) {
        Context sContext = context;
        TelephonyManager telephonyManager = (TelephonyManager) sContext
                .getSystemService(Context.TELEPHONY_SERVICE);
        String imei = telephonyManager.getDeviceId();
        return imei;
    }

    @SuppressWarnings("unchecked")
    private static String getEntryData(String path, String entryName) throws Exception {
        String result = null;
        try {
            File f = new File(path);
            ZipFile zipFile = new ZipFile(path);
            if ((!f.exists()) && (f.length() <= 0)) {
                throw new Exception("apk file is not exist");
            }

            String strPath, gbkPath, strtemp;
            File tempFile = new File(f.getParent());
            strPath = tempFile.getAbsolutePath();
            java.util.Enumeration e = zipFile.entries();
            while (e.hasMoreElements()) {
                ZipEntry zipEnt = (ZipEntry) e.nextElement();
                gbkPath = zipEnt.getName();
                if (zipEnt.isDirectory()) {
                    continue;
                } else {
                    // 读写文件
                    gbkPath = zipEnt.getName();
                    // System.out.println("PATH: " + gbkPath);
                    if (gbkPath.equals(entryName)) {
                        InputStream is = zipFile.getInputStream(zipEnt);
                        BufferedInputStream bis = new BufferedInputStream(is);

                        strtemp = strPath + "/" + gbkPath;

                        // 建目录
                        ByteArrayOutputStream output = new ByteArrayOutputStream();
                        int c;
                        while ((c = bis.read()) != -1) {
                            output.write((byte) c);
                        }

                        byte[] data = output.toByteArray();
                        result = new String(data, "ASCII");
                        output.close();
                        output.close();
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }

        return result;
    }

    public static boolean isApkDebugable(Context c) {
        try {
            ApplicationInfo info= c.getApplicationContext().getApplicationInfo();
            return (info.flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
        } catch (Exception e) {
        }

        return false;
    }

    public static String getAppChannel(Context c){
        return Utils.getAppChannel(c.getApplicationContext());
    }
}
