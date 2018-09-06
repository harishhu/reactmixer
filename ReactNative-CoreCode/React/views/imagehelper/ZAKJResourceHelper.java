package com.facebook.react.views.imagehelper;

import android.content.Context;
import android.net.Uri;
import android.util.Log;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by hufuyi on 2018/5/23.
 */
public class ZAKJResourceHelper {
    public static final ZAKJResourceHelper instance = new ZAKJResourceHelper();

    private String[] DENSITY_ARRAY = {
      "160", "240", "320", "480", "640"
    };

    private String[] DIRNAME_ARRAY = {
            "drawable-mdpi",
            "drawable-hdpi",
            "drawable-xhdpi",
            "drawable-xxhdpi",
            "drawable-xxxhdpi"
    };

    private HashMap<String, List<String>> resfilesMap = null;
    private String density;

    private String getDrawableNameByDensity(String density){
        int find = -1;

        for (int index = 0; index < DENSITY_ARRAY.length; index++){
            String s = DENSITY_ARRAY[index];

            if (s.equals(density)){
                find = index;
            }
        }

        if (find == -1){
            return null;
        }

        return DIRNAME_ARRAY[find];
    }

    private String getDensityValue(int density){
        if (density < 160){
            return "160";
        }else if (density < 240){
            return "240";
        }else if (density < 320){
            return "320";
        }else if (density < 480){
            return "480";
        }else if (density < 640){
            return "640";
        }

        return "480";
    }

    private void initResFilesInfo(Context c){
        String baseDir = "reactnative/res";

        try {
            String dir[] = c.getAssets().list(baseDir);

            int dd = (int)c.getResources().getDisplayMetrics().xdpi;

            density = getDensityValue(dd);
            resfilesMap = new HashMap<String, List<String>>(dir.length);

            for (String s : dir){
                Log.d("zakj-rn", "dir name = " + s);

                List<String> filelist = new ArrayList<String>();

                String dirtemp[] = c.getAssets().list(baseDir + File.separator + s);
                for (String s1 : dirtemp){
                    filelist.add(s1);
                }

                resfilesMap.put(s, filelist);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private ZAKJResourceHelper(){

    }

    private boolean findInTargetDir(String dirname, String filename){
        ArrayList<String> list = (ArrayList<String>) resfilesMap.get(dirname);

        if (list != null){
            for (String s : list){
                if (s.equals(filename)){
                    return true;
                }
            }
        }

        return false;
    }

    private Uri composeUriDirNameWithFileName(String dirname, String filename){
        return Uri.parse("asset:///reactnative/res/" + dirname + File.separator + filename);
    }

    public Uri computeLocalUri(String source, Context c){
        if (resfilesMap == null){
            initResFilesInfo(c);
        }

        String filename = source + ".png";
        String densityDir = getDrawableNameByDensity(density);
        if (findInTargetDir(densityDir, filename)){
            return composeUriDirNameWithFileName(densityDir, filename);
        }

        for (int index = DIRNAME_ARRAY.length - 1; index >= 0; index--){
            String temp = DIRNAME_ARRAY[index];

            if (temp.equals(densityDir)){
                continue;
            }

            if (findInTargetDir(temp, filename)){
                return composeUriDirNameWithFileName(temp, filename);
            }
        }

        return null;
    }
}
