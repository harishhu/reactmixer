package hu.react.mixer.rnbaselib.reactnative.core;

import android.content.Context;
import android.content.res.AssetManager;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

import hu.react.mixer.rnbaselib.jsonbean.AppletPackageInfo;
import hu.react.mixer.rnbaselib.utils.GsonUtil;
import hu.react.mixer.rnbaselib.utils.RNLog;
import hu.react.mixer.rnbaselib.utils.Utils;
import hu.react.mixer.rnbaselib.utils.ZipHelper;

import hu.react.mixer.rnbaselib.jsonbean.AppletPackageInfo;
import hu.react.mixer.rnbaselib.utils.GsonUtil;
import hu.react.mixer.rnbaselib.utils.RNLog;
import hu.react.mixer.rnbaselib.utils.Utils;
import hu.react.mixer.rnbaselib.utils.ZipHelper;

public class RNAppletManager {
    private static final String ASSET_PLATFORM_DIR = "reactnative/platform/";
    private static final String ASSET_APPLETS_DIR = "reactnative/applets";
    Context appContext;
    List<AppletPackageInfo> appletList;

    public RNAppletManager(Context context){
        appContext = context;
        checkDirs();
        initAppletData();
    }

    public String getRNRootDir(){
       // return Environment.getExternalStorageDirectory() + "/rn/";
        return appContext.getFilesDir().getAbsolutePath() + File.separator + "rn/";
    }

    public String getRNAppletDir(){
        return getRNRootDir() + "applets/";
    }

    public List<AppletPackageInfo> getAppletList() {
        return appletList;
    }

    private void initAppletData(){
        appletList = new ArrayList<>();

        File f = new File(getRNAppletDir());
        String[] apps = f.list();

        for (String app : apps){
            if (app.equals(".zipdone")){
                continue;
            }

            String path = getRNAppletDir() + app;
            AppletPackageInfo info = parsePackageInfo(path + File.separator + "package.json");
            info.path = path;

            if (info != null){
                RNLog.d("init applet info, name = " + info.name + " path = " + info.path);
                appletList.add(info);
            }
        }
    }

    private void try2MakeDir(String path){
        File f = new File(path);
        if (!f.exists()){
            f.mkdirs();
        }
    }

    private void checkDirs(){
        try2MakeDir(getRNRootDir());
        try2MakeDir(getRNAppletDir());
        try2MakeDir(getRNRootDir() + File.separator + "drawable-mdpi");
        try2MakeDir(getRNRootDir() + File.separator + "drawable-xhdpi");
        try2MakeDir(getRNRootDir() + File.separator + "drawable-xxhdpi");
    }

    public void installPrebuiltApplets(){
        RNLog.d("start install applets");
        unzipFile(getRNRootDir(),ASSET_PLATFORM_DIR + "reactnative.zip");

        String donefilepath = getRNAppletDir() + File.separator + ".zipdone";
        File f = new File(donefilepath);
        if (f.exists()){
            RNLog.d("applets have already been prebuilt");
            initAppletData();
            return;
        }

        AssetManager am = appContext.getAssets();
        try {
            String appletdir = getRNAppletDir();
            String[] filelist = am.list(ASSET_APPLETS_DIR);

            RNLog.d("file list length = " + filelist.length);

            for (String file : filelist){
                installApplets(am.open(ASSET_APPLETS_DIR + File.separator + file));
            }

            if (!f.exists()){
                f.createNewFile();
            }

            initAppletData();
        } catch (IOException e) {
            e.printStackTrace();
        }
        RNLog.d("finish install applets");
    }

    public boolean installApplets(String path){
        try {
            return installApplets(new FileInputStream(new File(path)));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        return false;
    }

    private boolean isImage(String name){
        return name.endsWith(".png") || name.endsWith(".jpg");
    }

    private String getResDirName(String name){
        if (name.contains("@2x")){
            return "drawable-xhdpi";
        }else if (name.contains("@3x")){
            return "drawable-xxhdpi";
        }

        return "drawable-mdpi";
    }

    private String getfinalResFileName(String name){
        if (name.contains("@2x")){
            return name.replace("@2x", "");
        }else if (name.contains("@3x")){
            return name.replace("@3x", "");
        }

        return name;
    }

    private AppletPackageInfo parsePackageInfo(String path){
        return GsonUtil.gson.fromJson(Utils.getFileContent(path), AppletPackageInfo.class);
    }

    public boolean installApplets(InputStream zipstream){
        if (zipstream == null){
            return false;
        }

        Date d = new Date();
        String tmpdir = d.getTime() + "";

        String rootdir = getRNRootDir();
        String installdir = getRNAppletDir() + File.separator + tmpdir + File.separator;

        try2MakeDir(installdir);

        BufferedOutputStream bos = null;
        ZipInputStream zis = null;

        boolean result = false;

        try {
            String filename;
            zis = new ZipInputStream(new BufferedInputStream(zipstream));
            ZipEntry ze;
            byte[] buffer = new byte[2048];
            int count;

            while ((ze = zis.getNextEntry()) != null) {
                if (ze.isDirectory()) {
                    continue;
                }

                String finaldir = installdir;
                filename = ze.getName();

                File f = new File(filename);
                filename = f.getName();
                RNLog.d("install applet, file name = " + f.getName());

                if (isImage(filename)){
                    String resdir = getResDirName(filename);
                    filename = filename.replace("#", "_");
                    filename = getfinalResFileName(filename);
                    finaldir = finaldir + "/../../" + resdir + File.separator;
//                    RNLog.d("final dir = " + new File(finaldir).exists());
                }

                bos = new BufferedOutputStream(new FileOutputStream(finaldir + filename));
                while ((count = zis.read(buffer)) != -1) {
                    bos.write(buffer, 0, count);
                }
                bos.flush();
                bos.close();
            }

            AppletPackageInfo info = parsePackageInfo(installdir + "package.json");
            if (info != null){
                File f = new File(installdir);
                f.renameTo(new File(getRNAppletDir() + File.separator + info.name));
                result = true;
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (zis != null) {
                    zis.closeEntry();
                    zis.close();
                }
                if (bos != null) {
                    bos.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }

    private void unzipFile(String path, String zipfile){
        RNLog.d("unzipfile, path = " + path + " zipfile = " + zipfile);

        File f = new File(path + File.separator + ".zipdone");
        if (f.exists()){
            return;
        }

        InputStream zipstream = Utils.getAssetsFileAsData(zipfile, appContext);
        boolean result = ZipHelper.unZipFile(path, zipstream);
        try {
            zipstream.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        if (result){
            try {
                f.createNewFile();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
