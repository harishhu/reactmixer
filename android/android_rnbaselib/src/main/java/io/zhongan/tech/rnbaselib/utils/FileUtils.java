package io.zhongan.tech.rnbaselib.utils;

import android.webkit.MimeTypeMap;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * Created by harishhu on 2016/5/17.
 */
public class FileUtils {
    public static void copyFile(String oldPath, String newPath) {
        try {
            int bytesum = 0;
            int byteread = 0;
            File oldfile = new File(oldPath);
            if (oldfile.exists()) {
                InputStream inStream = new FileInputStream(oldPath);
                FileOutputStream fs = new FileOutputStream(newPath);
                byte[] buffer = new byte[1444];
                int length;
                while ( (byteread = inStream.read(buffer)) != -1) {
                    bytesum += byteread;
                    System.out.println(bytesum);
                    fs.write(buffer, 0, byteread);
                }
                inStream.close();
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }
    public static void copy(InputStream inputStream, OutputStream outputStream) {
        try {
            int bytesum = 0;
            int byteread = 0;
            byte[] buffer = new byte[1444];
            int length;
            while ((byteread = inputStream.read(buffer)) != -1) {
                bytesum += byteread;
                outputStream.write(buffer, 0, byteread);
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }

    public static String getExtension(File file) {
        String fileName = file.getName();
        int idx = fileName.lastIndexOf(".");
        String suffix = "";
        if (idx > 0) {
            suffix = fileName.substring(idx + 1);
        }
        return suffix;
    }

    public static String getMimeType(File file) {
        String ext = getExtension(file);
        return MimeTypeMap.getSingleton().getMimeTypeFromExtension(ext);
    }
}
