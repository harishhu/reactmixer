package io.zhongan.tech.rnbaselib.reactnative.rctwidgets.banner;

import android.content.Context;
import android.support.v4.view.ViewPager;
import android.util.AttributeSet;
import android.view.MotionEvent;

/**
 * Created by za-liudanfeng on 2017/3/31.
 */

public class BannerViewPager extends ViewPager {
    private String TAG = "viewpagertest";
    public BannerViewPager(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public BannerViewPager(Context context) {
        super(context);
    }

    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        boolean res = super.onTouchEvent(ev);
       // ZALog.d("harish ----" + ev.getAction());
        if(ev.getAction() == MotionEvent.ACTION_DOWN || ev.getAction() == MotionEvent.ACTION_MOVE){
            return true;
        }

        if (ev.getAction() == MotionEvent.ACTION_CANCEL){
            ev.setAction(MotionEvent.ACTION_UP);
            return true;
        }

        return res;
    }
}
