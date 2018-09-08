package hu.react.mixer.rnbaselib.utils;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;

import java.io.IOException;
import java.io.InputStream;

/**
 * Created by hufuyi on 2018/5/25.
 */

public class ImageUtil {
    public static Drawable getDrawableByAssetUrl(String url, Context context){
        url = url.replaceAll("asset:///", "");

        RNLog.d("getDrawableByAssetUrl = " + url);

        InputStream open = null;
        try {
            open = context.getAssets().open(url);
            Bitmap bitmap = BitmapFactory.decodeStream(open);

            return new BitmapDrawable(bitmap);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
