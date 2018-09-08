package hu.react.mixer.rnbaselib.utils;

import android.Manifest;
import android.app.Activity;
import android.app.ActivityManager;
import android.app.ActivityManager.MemoryInfo;
import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.res.AssetManager;
import android.graphics.Color;
import android.graphics.Rect;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.StatFs;
import android.support.v7.app.AlertDialog;
import android.text.TextUtils;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.List;
import java.util.TimeZone;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.GZIPInputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import hu.react.mixer.rnbaselib.core.RNConstants;

import hu.react.mixer.rnbaselib.core.RNConstants;

public class Utils {
    public static SimpleDateFormat dateformat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static long hours;

    private static int IDENTITY_CARD_OLD_LEN = 15;
    private static int IDENTITY_CARD_LEN = 18;

    public static boolean isSystemSupportNewStatusBar() {
        return Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT;
        //return false;
    }

    public static boolean needSelfControlPermission(){
        return Build.VERSION.SDK_INT >= Build.VERSION_CODES.M;
    }

    public static boolean isEmpty(CharSequence s) {
        return s == null || s.equals("");
    }

    public static boolean isIdentityCardValid(String card) {
        if (Utils.isEmpty(card) || (card.length() != IDENTITY_CARD_OLD_LEN && card.length() != IDENTITY_CARD_LEN)) {
            return false;
        }

        int charCount = 0;
        for (int i = 0; i < card.length(); i++) {
            char c = card.charAt(i);

            if (!isNumberCharacter(c)) {
                charCount++;
            }

            if (charCount > 1) {
                return false;
            }
        }


        RNLog.d("isIdentityCardValid = " + charCount + " card = " + card);

        if (charCount == 0) {
            return true;
        }

        if (charCount == 1 && card.charAt(card.length() - 1) == 'X') {
            return true;
        }

        return false;
    }

    public static String formatNumber2Comma(long number) {
        String str = number + "";

        StringBuilder sb = new StringBuilder();

        if (str.length() <= 3) {
            return str;
        }

        int start = str.length() % 3;

        sb.append(str.substring(0, start));

        boolean ignoreFirst = false;
        if (start == 0) {
            ignoreFirst = true;
        }

        for (int index = start; index < str.length(); index += 3) {
            if (index == start && ignoreFirst) {
                sb.append(str.substring(index, index + 3));
                continue;
            }

            sb.append(",");
            sb.append(str.substring(index, index + 3));
        }

        return sb.toString();
    }

    /**
     * 验证邮箱输入是否合法
     *
     * @param email
     * @return
     */
    public static boolean isVaildEmail(String email) {
        String emailPattern = "[a-zA-Z0-9][a-zA-Z0-9._-]{2,16}[a-zA-Z0-9]@[a-zA-Z0-9]+.[a-zA-Z0-9]+";
        boolean result = Pattern.matches(emailPattern, email);
        return result;
    }

    public static boolean isNumberCharacter(char c) {
        return c >= '0' && c <= '9';
    }

    // 获取ApiKey
    public static String getMetaValue(Context context, String metaKey) {
        Bundle metaData = null;
        String apiKey = null;
        if (context == null || metaKey == null) {
            return null;
        }
        try {
            ApplicationInfo ai = context.getPackageManager()
                    .getApplicationInfo(context.getPackageName(),
                            PackageManager.GET_META_DATA);
            if (null != ai) {
                metaData = ai.metaData;
            }
            if (null != metaData) {
                apiKey = metaData.getString(metaKey);
            }
        } catch (NameNotFoundException e) {

        }
        return apiKey;
    }

    //获取app渠道名
    public static String channelNameCache = "";

    public static String getAppChannel(Context context) {
        if (!isEmpty(channelNameCache)) {
            return channelNameCache;
        }

        InputStream input = null;
        String channel = null;
        final String start_flag = "META-INF/channel";
        ZipFile zipfile = null;
        ApplicationInfo appinfo = context.getApplicationInfo();
        String sourceDir = appinfo.sourceDir;
        ZipEntry entry = null;
        String entryName = null;
        String beforeStr = null;
        try {
            zipfile = new ZipFile(sourceDir);
            Enumeration<?> entries = zipfile.entries();
            while (entries.hasMoreElements()) {
                entry = ((ZipEntry) entries.nextElement());
                entryName = entry.getName();

                if (entryName.contains(start_flag)) {
                    long size = entry.getSize();
                    if (size > 0) {
                        BufferedReader br = new BufferedReader(
                                new InputStreamReader(zipfile.getInputStream(entry)));
                        while ((beforeStr = br.readLine()) != null) {
                            try {
                                channel = new String(EncryptUtils.decryptDES(beforeStr.getBytes(), "PengShou"));
                            } catch (Exception i) {
                                i.printStackTrace();
                            }

                        }
                        br.close();
                    }
                    break;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (zipfile != null) {
                try {
                    zipfile.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        if (channel == null) {
            try {
                input = context.getResources().getAssets().open("channelData");
                byte[] data = new byte[input.available()];
                input.read(data);
                input.close();

                channel = new String(data);
            } catch (Exception e) {
                //e.printStackTrace();
            }
        }

        if (channel != null) {
            channelNameCache = channel.toLowerCase();
        }

        return channel;
    }


    public static String getCurProcessName(Context context) {
        int pid = android.os.Process.myPid();
        ActivityManager mActivityManager = (ActivityManager) context
                .getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningAppProcessInfo appProcess : mActivityManager
                .getRunningAppProcesses()) {
            if (appProcess.pid == pid) {
                return appProcess.processName;
            }
        }
        return null;
    }

    /**
     * 将时间格式转为时间戳
     * return  re_time
     */
    public static String getDateToString(String user_time) {
        String re_time = null;
        Date d;
        try {

            d = dateformat.parse(user_time);
            long l = d.getTime();
            String str = String.valueOf(l);
            re_time = str.substring(0, 10);

        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return re_time;
    }

    /**
     * 将时间戳转为时间格式
     *
     * @param cc_time
     * @return
     */
    public static String getStringToDate(String cc_time) {
        String re_StrTime = null;

        // 例如：cc_time=1291778220
        long lcc_time = Long.valueOf(cc_time);
        re_StrTime = dateformat.format(new Date(lcc_time));
        return re_StrTime;
    }

    public static long getTimeReduce(String previousTime, String currentTime) {
        try {
            Date previousDate = dateformat.parse(previousTime);
            Date currentDate = dateformat.parse(currentTime);
            long diff = currentDate.getTime() - previousDate.getTime();//这样得到的差值是微秒级别
            long days = diff / (1000 * 60 * 60 * 24);
            hours = (diff - days * (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
        } catch (Exception e) {

        }
        return hours;
    }

    /**
     * 判断sdcard是否可用
     *
     * @return
     */
    public static boolean isSDCardAvailable() {
        boolean sdcardAvailable = false;
        if (Environment.getExternalStorageState().equals(
                Environment.MEDIA_MOUNTED)) {
            sdcardAvailable = true;
        }
        return sdcardAvailable;
    }

    /**
     * 软件版本名称
     *
     * @return
     */
    public static String getAppVersion(Context context) {
        try {
            PackageManager manager = context.getPackageManager();
            PackageInfo info = manager.getPackageInfo(context.getPackageName(), 0);
            String sVersion = String.valueOf(info.versionName);
            return sVersion;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "1.0";
    }

    /**
     * 设备型号
     *
     * @return
     */
    public static String getDeviceName() {
        return Build.MODEL;
    }

    /**
     * 系统定制商(品牌)
     *
     * @return
     */
    public static String getBrandName() {
        return Build.BRAND;
    }

    public static String getMacAddress(Context context) {
        try {
            Context sContext = context;
            WifiManager wifi = (WifiManager) sContext
                    .getSystemService(Context.WIFI_SERVICE);
            String macAddress = wifi.getConnectionInfo().getMacAddress();
            macAddress = macAddress.replace(":", "");
            return macAddress;
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 系统版本号
     *
     * @return
     */
    public static String getSdkVersion() {
        return "" + Build.VERSION.SDK_INT;
    }

    /**
     * 软件版本号
     *
     * @return
     */
    public static int getAppVersionCode(Context context) {
        try {
            PackageManager manager = context.getPackageManager();
            PackageInfo info = manager.getPackageInfo(context.getPackageName(), 0);
            return info.versionCode;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    /**
     * 获取ip
     *
     * @return
     */
    public static String getLocalIpAddress() {
        try {
            for (Enumeration<NetworkInterface> en = NetworkInterface
                    .getNetworkInterfaces(); en.hasMoreElements(); ) {
                NetworkInterface intf = en.nextElement();
                for (Enumeration<InetAddress> enumIpAddr = intf
                        .getInetAddresses(); enumIpAddr.hasMoreElements(); ) {
                    InetAddress inetAddress = enumIpAddr.nextElement();
                    if (!inetAddress.isLoopbackAddress()
                            && inetAddress instanceof Inet4Address) {
                        String ip = inetAddress.getHostAddress();
                        // if (!ip.contains("::")) {// ipV6的地址
                        // return ip;
                        // }
                        return ip;
                    }
                }
            }
        } catch (SocketException ex) {
            ex.printStackTrace();
        }

        return null;
    }

    public static void deleteDirectory(String filepath) throws IOException {
        File f = new File(filepath);

        if (f.exists() && f.isDirectory()) {
            if (f.listFiles().length == 0) {
                f.delete();
            } else {
                File delFile[] = f.listFiles();
                int i = f.listFiles().length;
                for (int j = 0; j < i; j++) {
                    if (delFile[j].isDirectory()) {
                        deleteDirectory(delFile[j].getAbsolutePath());
                    }
                    delFile[j].delete();
                }
            }
        }
    }

    public static void deleteFile(File file) {
        try {
            if (file != null && file.exists()) {
                File toFile = new File(file.getAbsolutePath() + ".tmp");
                file.renameTo(toFile);
                toFile.delete();
                toFile = null;
            }
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
    }

    /**
     * 获取状态栏高度
     */
    public static int getStatusBarHeight(Activity activity) {
        int statusBarHeight = 0;

        try {
            Class<?> c = Class.forName("com.android.internal.R$dimen");
            Object obj = c.newInstance();
            Field field = c.getField("status_bar_height");
            int x = Integer.parseInt(field.get(obj).toString());
            statusBarHeight = activity.getResources().getDimensionPixelSize(x);
        } catch (Exception e1) {
            try {
                Rect frame = new Rect();
                activity.getWindow().getDecorView()
                        .getWindowVisibleDisplayFrame(frame);
                statusBarHeight = frame.top;
            } catch (Exception e) {
                // TODO: handle exception
                statusBarHeight = 60;
            }
        }
        return statusBarHeight;
    }

    /**
     * 是否是数字
     */
    public static boolean isNumeric(String str) {
        try {
            if (!TextUtils.isEmpty(str)) {
                Pattern pattern = Pattern.compile("[0-9]*");
                Matcher isNum = pattern.matcher(str);
                if (!isNum.matches()) {
                    return false;
                }
                return true;
            }
        } catch (Exception e) {
        }
        return false;
    }

    /**
     * 获取Wifi的开关是否打开
     *
     * @param context
     * @return
     */
    public static int getWifiState(Context context) {
        try {
            WifiManager wm = (WifiManager) context
                    .getSystemService(Context.WIFI_SERVICE);
            int state = wm.getWifiState();
            return state;
        } catch (Exception e) {
            return WifiManager.WIFI_STATE_DISABLED;
        }
    }

    /**
     * 获取sdcard可用空间大小
     *
     * @return
     */
    public static long getSDCardAvailableSpace() {
        StatFs statFs = new StatFs(Environment.getExternalStorageDirectory()
                .toString());
        // 获取block的SIZE
        long blocSize = statFs.getBlockSize();
        // 己使用的Block的数量
        long availaBlock = statFs.getAvailableBlocks();
        // Formatter.formatFileSize(context, block * blockSize);
        return (availaBlock * blocSize);
    }

    /**
     * 获得SD卡总大小
     *
     * @return
     */
    public static long getSDTotalSize() {
        File path = Environment.getExternalStorageDirectory();
        StatFs stat = new StatFs(path.getPath());
        long blockSize = stat.getBlockSize();
        long totalBlocks = stat.getBlockCount();
        // Formatter.formatFileSize(context, block * blockSize);
        return blockSize * totalBlocks;
    }

    /**
     * 格式化时间
     *
     * @param times
     * @param formatType
     * @return
     */
    public static String formatDate(long times, String formatType) {
        if (formatType == null) {
            throw new NullPointerException("formatType is null!");
        }

        SimpleDateFormat df = new SimpleDateFormat(formatType);
        return df.format(times);
    }

    /**
     * 格式化时间
     *
     * @param times
     * @param formatType
     * @return
     */
    public static long formatDate(String times, String formatType) {
        try {
            if (formatType == null) {
                throw new NullPointerException("formatType is null!");
            }

            SimpleDateFormat df = new SimpleDateFormat(formatType);
            return df.parse(times).getTime();
        } catch (IllegalArgumentException e) {
            // TODO: handle exception
            e.printStackTrace();
        } catch (ParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return 0;
    }

    /**
     * 将dip转成px
     */
    public static int dip2px(Context context, float dip) {
        float scale = context.getResources().getDisplayMetrics().density;
        return (int) (dip * scale + 0.5f);
    }

    /**
     * px转成dip
     */
    public static int px2dip(Context context, float pxValue) {
        float scale = context.getResources().getDisplayMetrics().density;
        return (int) (pxValue / scale + 0.5f);
    }

    /**
     * 将px值转换为sp值，保证文字大小不变
     */
    public static int px2sp(Context context, float pxValue) {
        final float fontScale = context.getResources().getDisplayMetrics().scaledDensity;
        return (int) (pxValue / fontScale + 0.5f);
    }

    /**
     * 将sp值转换为px值，保证文字大小不变
     */
    public static int sp2px(Context context, float spValue) {
        final float fontScale = context.getResources().getDisplayMetrics().scaledDensity;
        return (int) (spValue * fontScale + 0.5f);
    }

    /**
     * 数组转列表
     */
    public static ArrayList<String> arrayToList(String[] strArray) {
        ArrayList<String> strList = new ArrayList<String>();

        if (strArray != null) {
            for (int i = 0; i < strArray.length; i++) {
                strList.add(strArray[i]);
            }
        }
        return strList;
    }

    /**
     * 列表转数组
     *
     * @param strArray
     * @return
     */
    public static ArrayList listToArrayList(List strArray) {
        ArrayList strList = new ArrayList();

        if (strArray != null) {
            for (int i = 0; i < strArray.size(); i++) {
                strList.add(strArray.get(i));
            }
        }
        return strList;
    }

    /**
     * 获取当前是周几
     *
     * @return
     */
    public static String getCurrentWeek() {
        final Calendar c = Calendar.getInstance();
        c.setTimeZone(TimeZone.getTimeZone("GMT+8:00"));
        String mWay = String.valueOf(c.get(Calendar.DAY_OF_WEEK));
        if ("1".equals(mWay)) {
            mWay = "日";
        } else if ("2".equals(mWay)) {
            mWay = "一";
        } else if ("3".equals(mWay)) {
            mWay = "二";
        } else if ("4".equals(mWay)) {
            mWay = "三";
        } else if ("5".equals(mWay)) {
            mWay = "四";
        } else if ("6".equals(mWay)) {
            mWay = "五";
        } else if ("7".equals(mWay)) {
            mWay = "六";
        }
        return "周" + mWay;
    }

    /**
     * 获取当前的日期 MM月dd日
     *
     * @return
     */
    public static String getCurrentDate() {
        SimpleDateFormat f = new SimpleDateFormat("yyyyMMddHHmmss");
        Date curDate = new Date(System.currentTimeMillis());// 获取当前时间
        String str = f.format(curDate);
        return str;
    }

    /**
     * 获取当前的详细时间 yyyyMMddHHmmss
     *
     * @return
     */
    public static String getCurrentTimeDetail() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        Date curDate = new Date(System.currentTimeMillis());// 获取当前时间
        String str = formatter.format(curDate);
        return str;
    }

    /**
     * 获取当前时间与原时间的时间差
     *
     * @param oldTime
     * @return String
     */
    public static String getBeforeTime(long oldTime) {
        long currentTime = System.currentTimeMillis();
        long between = (currentTime - oldTime) / 1000;// 除以1000是为了转换成秒

        long day = between / (24 * 3600);
        long hour = between % (24 * 3600) / 3600;
        long minute = between % 3600 / 60;
        long second = between % 60 / 60;

        StringBuilder builder = new StringBuilder();
        if (day != 0) {
            builder.append(day + "天");
        } else if (hour != 0) {
            builder.append(hour + "小时");
        } else if (minute != 0) {
            builder.append(minute + "分钟");
        } else if (second != 0) {
            builder.append(second + "秒");
        }
        builder.append("前");

        return builder.toString();
    }

    private static SimpleDateFormat formatter = new SimpleDateFormat(
            "yyyy-MM-dd HH:mm:ss");
    private static SimpleDateFormat shortFormatter = new SimpleDateFormat(
            "yyyy-MM-dd");

    /**
     * 格式化日期
     *
     * @param date
     * @return
     */
    public static String dateFormat(String date) {
        if (date == null)
            return null;
        long time = format2Date(date).getTime();
        long current = System.currentTimeMillis();
        long lastTime = current - time;
        if (lastTime > 0) {
            if (lastTime <= 5 * 60 * 1000) {
                return "刚刚";
            } else if (lastTime < 60 * 60 * 1000) {
                return (int) (lastTime / (60 * 1000)) + "分钟前";
            } else if (lastTime < 24 * 60 * 60 * 1000
                    && lastTime >= 60 * 60 * 1000) {
                return (int) (lastTime / (60 * 60 * 1000)) + "小时前";
            } else {
                return formatter.format(new Date(time));
            }
        } else {
            return formatter.format(new Date(time));
        }
    }

    /**
     * 转为日期
     *
     * @param date
     * @return
     */
    public static Date format2Date(String date) {
        if (date.contains("-")) {
            formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        } else if (date.contains("/"))
            formatter = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        try {
            return formatter.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return new Date();
    }

    /**
     * gzip解压 请求网络是从服务器获取的是gzip格式的
     */
    public static byte[] gzipDecompress(InputStream is) {
        byte[] b = null;
        try {
            GZIPInputStream gzip = new GZIPInputStream(is);
            byte[] buf = new byte[1024];
            int num = -1;
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            while ((num = gzip.read(buf, 0, buf.length)) != -1) {
                baos.write(buf, 0, num);
            }
            b = baos.toByteArray();
            baos.flush();
            baos.close();
            gzip.close();
            is.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return b;
    }

    /**
     * 判断当前手机是否有ROOT权限
     *
     * @return
     */
    public static boolean checkRoot() {
        boolean bool = false;

        try {
            if ((!new File("/system/bin/su").exists())
                    && (!new File("/system/xbin/su").exists())) {
                bool = false;
            } else {
                bool = true;
            }
        } catch (Exception e) {

        }
        return bool;
    }

    /**
     * 判断当前手机内存大小
     *
     * @return
     */
    public static long getTotalMemory() {
        String str1 = "/proc/meminfo";// 系统内存信息文件
        String str2;
        String[] arrayOfString;
        long initial_memory = 0;

        try {
            FileReader localFileReader = new FileReader(str1);
            BufferedReader localBufferedReader = new BufferedReader(
                    localFileReader, 8192);
            str2 = localBufferedReader.readLine();// 读取meminfo第一行，系统总内存大小

            arrayOfString = str2.split("\\s+");
            for (String num : arrayOfString) {
            }

            initial_memory = Long.valueOf(arrayOfString[1]) * 1024;// 获得系统总内存，单位是KB，乘以1024转换为Byte
            localBufferedReader.close();

        } catch (IOException e) {
        }
        return initial_memory;// Byte转换为KB或者MB，内存大小规格化
    }

    /**
     * 判断当前手机可用内存大小
     *
     * @return
     */
    public static long getAvailMem(Context c) {
        // 获得MemoryInfo对象
        MemoryInfo memoryInfo = new MemoryInfo();
        ActivityManager mActivityManager = (ActivityManager) c.getSystemService(Context.ACTIVITY_SERVICE);
        // 获得系统可用内存，保存在MemoryInfo对象上
        mActivityManager.getMemoryInfo(memoryInfo);
        long memSize = memoryInfo.availMem;
        return memSize;
    }

    /**
     * 大小TO KB MB GB
     *
     * @param data
     * @return
     */
    public static String dataFormat(double data) {
        double d = data >= 0 ? data : 0 - data;

        String buffer = "";

        NumberFormat df = NumberFormat.getNumberInstance();
        df.setMaximumFractionDigits(1);

        String unitStr = "B";

        if (d < 1000) {
            buffer = d + "";
        } else if (d < 1024000) {
            buffer = df.format(((double) d) * 1f / 1024) + "";
            unitStr = "KB";
        } else if (d < 1048576000) {
            buffer = df.format(((double) d) * 1f / 1048576) + "";
            unitStr = "MB";
        } else {
            buffer = df.format(((double) d) * 1f / 1073741824) + "";
            unitStr = "GB";
        }
        int value;
        if (buffer.length() >= 6) {
            if ((value = buffer.indexOf(".")) > 0) {
                if (value != -1) {
                    buffer = buffer.toString().substring(0, value + 2);
                }
            }
        }

        return buffer + unitStr;
    }

    /**
     * Parse the color string, and return the corresponding color-int. If the
     * string cannot be parsed, throws an IllegalArgumentException exception.
     * Supported formats are: #RRGGBB #AARRGGBB 'red', 'blue', 'green', 'black',
     * 'white', 'gray', 'cyan', 'magenta', 'yellow', 'lightgray', 'darkgray',
     * 'grey', 'lightgrey', 'darkgrey', 'aqua', 'fuschia', 'lime', 'maroon',
     * 'navy', 'olive', 'purple', 'silver', 'teal'
     *
     * @param colorString
     * @return
     */
    public static int parseColor(String colorString) {
        return Color.parseColor(colorString);
    }

    /**
     * 判断一个字符串的字数
     * 一个汉字=两个英文字母，一个中文标点=两个英文标点 注意：该函数的不适用于对单个字符进行计算，因为单个字符四舍五入后都是1
     */
    public static long calculateLength(CharSequence c) {
        double len = 0;
        for (int i = 0; i < c.length(); i++) {
            int tmp = (int) c.charAt(i);
            if (tmp > 0 && tmp < 127) {
                len += 0.5;
            } else {
                len++;
            }
        }
        return Math.round(len);
    }

    /**
     * 从jar中获取指定名称的文本文件
     *
     * @param jarPath
     * @param name
     * @throws IOException
     */
    public static String readFileFromJar(String jarPath, String name) throws IOException {
        JarFile jf = new JarFile(jarPath);
        Enumeration<JarEntry> jfs = jf.entries();
        StringBuffer sb = new StringBuffer();
        while (jfs.hasMoreElements()) {
            JarEntry jfn = jfs.nextElement();
            if (jfn.getName().endsWith(name)) {
                InputStream is = jf.getInputStream(jfn);
                BufferedInputStream bis = new BufferedInputStream(is);
                byte[] buf = new byte[is.available()];
                while (bis.read(buf) != -1) {
                    sb.append(new String(buf).trim());
                }
                bis.close();
                is.close();
                break;
            }
        }
        return sb.toString();
    }

    /**
     * 验证手机格式
     */
    public static boolean isMobileNO(String mobiles) {
        /*
        移动：134、135、136、137、138、139、150、151、157(TD)、158、159、187、188
		联通：130、131、132、152、155、156、185、186
		电信：133、153、180、189、（1349卫通）
		总结起来就是第一位必定为1，第二位必定为3或5或8，其他位置的可以为0-9
		*/
//		String telRegex = "[1][3458]\\d{9}";//"[1]"代表第1位为数字1，"[358]"代表第二位可以为3、5、8中的一个，"\\d{9}"代表后面是可以是0～9的数字，有9位。
//		if (TextUtils.isEmpty(mobiles)){
//			return false;
//		}else {
//			return mobiles.matches(telRegex);
//		}

        if (mobiles.length() != RNConstants.PHONENUMER_LENGTH) {
            return false;
        }

        if (mobiles.charAt(0) != '1') {
            return false;
        }

        return true;
    }

    public static long string2Long(String s) {
        int result = 0;
        if (!isEmpty(s)) {
            try {
                result = Integer.valueOf(s);
            } catch (Exception e) {
                RNLog.d("string2Int Execption" + e.toString());
            }
        }
        return result;
    }

    //example 1分2秒
    public static String formatTimeMS(long sec) {
        String result = "0\"";
        if (sec != 0) {
            result = String.valueOf((int) Math.floor(sec / 60.0)) + "分" + String.valueOf(sec % 60) + "秒";
        }
        return result;
    }

        /*
    * -1 no network
    * 0 3/4G
    * 1 WIFI
    *
    * */

    public static int isWifiConnected(Context context) {
        int result = -1;
        if (context != null) {
            ConnectivityManager mConnectivityManager = (ConnectivityManager) context
                    .getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo info = mConnectivityManager.getActiveNetworkInfo();
            if (null != info) {
                result = info.getType();
            } else {
                result = -1;
            }
        }
        return result;
    }

    public static String formatMoneyData(String oriData, String moneyUnit) {
        String result = oriData;
        try {
            if (isDecimal(oriData)) {
                RNLog.d("formatMoneyData isDecimal");

                DecimalFormat nf = new DecimalFormat(",###.00");
                result = nf.format(oriData) + moneyUnit;
            } else if (isInteger(oriData)) {
                RNLog.d("formatMoneyData isInteger");

                DecimalFormat nf = new DecimalFormat(",###");
                result = nf.format(oriData) + moneyUnit;
            }
        } catch (Exception e) {
            RNLog.d("formatMoneyData Exception" + oriData);

            RNLog.d("formatMoneyData Exception" + e.toString());
        }
        return result;
    }

    //浮点型判断
    public static boolean isDecimal(String str) {
        if (str == null || "".equals(str))
            return false;
        Pattern pattern = Pattern.compile("[0-9]*(\\.+)[0-9]*");
        return pattern.matcher(str).matches();
    }

    //整型判断
    public static boolean isInteger(String str) {
        if (str == null)
            return false;
        Pattern pattern = Pattern.compile("[0-9]+");
        return pattern.matcher(str).matches();
    }


    public static boolean checkPermission(Context context, String permission) {
        boolean result = false;
        if (Build.VERSION.SDK_INT >= 23) {
            try {
                Class<?> clazz = Class.forName("android.content.Context");
                Method method = clazz.getMethod("checkSelfPermission", String.class);
                int rest = (Integer) method.invoke(context, permission);
                if (rest == PackageManager.PERMISSION_GRANTED) {
                    result = true;
                } else {
                    result = false;
                }
            } catch (Exception e) {
                result = false;
            }
        } else {
            PackageManager pm = context.getPackageManager();
            if (pm.checkPermission(permission, context.getPackageName()) == PackageManager.PERMISSION_GRANTED) {
                result = true;
            }
        }
        return result;
    }

    public static String getDeviceInfo(Context context) {
        try {
            org.json.JSONObject json = new org.json.JSONObject();
            android.telephony.TelephonyManager tm = (android.telephony.TelephonyManager) context
                    .getSystemService(Context.TELEPHONY_SERVICE);
            String device_id = null;
            if (checkPermission(context, Manifest.permission.READ_PHONE_STATE)) {
                device_id = tm.getDeviceId();
            }
            String mac = null;
            FileReader fstream = null;
            try {
                fstream = new FileReader("/sys/class/net/wlan0/address");
            } catch (FileNotFoundException e) {
                fstream = new FileReader("/sys/class/net/eth0/address");
            }
            BufferedReader in = null;
            if (fstream != null) {
                try {
                    in = new BufferedReader(fstream, 1024);
                    mac = in.readLine();
                } catch (IOException e) {
                } finally {
                    if (fstream != null) {
                        try {
                            fstream.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    if (in != null) {
                        try {
                            in.close();
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
            json.put("mac", mac);
            if (TextUtils.isEmpty(device_id)) {
                device_id = mac;
            }
            if (TextUtils.isEmpty(device_id)) {
                device_id = android.provider.Settings.Secure.getString(context.getContentResolver(),
                        android.provider.Settings.Secure.ANDROID_ID);
            }
            json.put("device_id", device_id);
            return json.toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String getMD5(String info) {
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            md5.update(info.getBytes("UTF-8"));
            byte[] encryption = md5.digest();

            StringBuffer strBuf = new StringBuffer();
            for (int i = 0; i < encryption.length; i++) {
                if (Integer.toHexString(0xff & encryption[i]).length() == 1) {
                    strBuf.append("0").append(Integer.toHexString(0xff & encryption[i]));
                } else {
                    strBuf.append(Integer.toHexString(0xff & encryption[i]));
                }
            }
            return strBuf.toString();
        } catch (NoSuchAlgorithmException e) {
            return "";
        } catch (UnsupportedEncodingException e) {
            return "";
        }
    }

    /**
     * 查询指定App是否安装
     * @param packageName
     * @return
     */
    public static boolean isApkInstalled(Context context, String packageName) {
        List<PackageInfo> packageInfos = context.getPackageManager().getInstalledPackages(PackageManager.GET_UNINSTALLED_PACKAGES);

        for(PackageInfo info : packageInfos){
            RNLog.d("uninstalled package name = " + info.packageName);
            if (info.packageName.equals(packageName)){
                return true;
            }
        }

        return false;
    }

    public static void showAlertMessage(Activity activity, String msg){
        AlertDialog.Builder alertDialogBuilder=new AlertDialog.Builder(activity);
        alertDialogBuilder.setMessage(msg);
        alertDialogBuilder.create().show();
    }

    public static InputStream getAssetsFileAsData(String fileName, Context context) {
        //将json数据变成字符串
        StringBuilder stringBuilder = new StringBuilder();
        try {
            //获取assets资源管理器
            AssetManager assetManager = context.getAssets();
            //通过管理器打开文件并读取
            return assetManager.open(fileName);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static String getAssetsFileAsText(String fileName, Context context) {
        StringBuilder stringBuilder = new StringBuilder();
        try {
            //获取assets资源管理器
            AssetManager assetManager = context.getAssets();
            //通过管理器打开文件并读取
            BufferedReader bf = new BufferedReader(new InputStreamReader(
                    assetManager.open(fileName)));
            String line;
            while ((line = bf.readLine()) != null) {
                stringBuilder.append(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return stringBuilder.toString();
    }

    public static String getFileContent(String path){
        String encoding = "UTF-8";
        File file = new File(path);
        Long filelength = file.length();
        byte[] filecontent = new byte[filelength.intValue()];
        try {
            FileInputStream in = new FileInputStream(file);
            in.read(filecontent);
            in.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            return new String(filecontent, encoding);
        } catch (UnsupportedEncodingException e) {
            System.err.println("The OS does not support " + encoding);
            e.printStackTrace();
            return null;
        }
    }
}