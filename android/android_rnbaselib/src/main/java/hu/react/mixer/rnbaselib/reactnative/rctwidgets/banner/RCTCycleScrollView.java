package hu.react.mixer.rnbaselib.reactnative.rctwidgets.banner;

import android.content.Context;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.support.annotation.Nullable;
import android.support.v4.view.ViewPager;
import android.util.AttributeSet;
import android.widget.RelativeLayout;

import com.facebook.react.views.imagehelper.ZAKJResourceHelper;

import java.util.List;

import hu.react.mixer.rnbaselib.R;
import hu.react.mixer.rnbaselib.utils.RNLog;
import hu.react.mixer.rnbaselib.utils.Utils;

import hu.react.mixer.rnbaselib.utils.RNLog;
import hu.react.mixer.rnbaselib.utils.Utils;

/**
 * Created by hufuyi on 2018/1/17.
 */
public class RCTCycleScrollView extends RelativeLayout{
    private ViewPager.OnPageChangeListener pageChangeListener = new ViewPager.OnPageChangeListener() {
        @Override
        public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
//            RNLog.d("onPageScrolled = " + position);
            if (currentItem != position){
                receiveScrollEvent = true;
                currentItem = position;
            }

            if (currentItem == 0){
                mEventHandler.sendEmptyMessageDelayed(REFRESH_MSG, PAGE_SWITCH_TIME);
            }
        }

        @Override
        public void onPageSelected(int position) {
        }

        @Override
        public void onPageScrollStateChanged(int state) {
        }
    };

    public interface pageOnClickListener{
        void onPageClick(int position);
    }

    private static final int REFRESH_MSG = 99;
    private static final int REFRESH_MONITOR_MSG = 100;

    private static final int PAGE_SWITCH_TIME = 3000;

    private BannerViewPager viewPager;
    private CirclePageIndicator indicator;
    private BannerViewPagerAdapter viewPagerAdapter;

    int currentItem = 0;
    int banner_list_size = 0;
    int desireIndex = 0;

    boolean receiveScrollEvent = true;

    private Handler mEventHandler = new Handler(Looper.getMainLooper()) {
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);

            if (msg.what == REFRESH_MSG){
//                RNLog.d("current refreshing item is " + currentItem + " receiveScrollEvent = " + receiveScrollEvent);
                if (!receiveScrollEvent){
                    currentItem = (currentItem + 1) % banner_list_size;
                }

                receiveScrollEvent = false;

                int index = (currentItem + 1) % banner_list_size;
                desireIndex = refreshBanner(index);

                removeMessages(REFRESH_MSG);
                sendEmptyMessageDelayed(REFRESH_MSG, PAGE_SWITCH_TIME);
            }
        }
    };

    public RCTCycleScrollView(Context context) {
        super(context);
    }

    public RCTCycleScrollView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public RCTCycleScrollView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public void setListItems(List<String> items, final pageOnClickListener pageOnClickListener){
        if (viewPager == null){
            viewPager = findViewById(R.id.viewpager);
            indicator = findViewById(R.id.indicator);

            viewPager.addOnPageChangeListener(pageChangeListener);
        }

        banner_list_size = items.size();

        viewPagerAdapter = new BannerViewPagerAdapter(getContext(), items);
        viewPagerAdapter.setOnPageClickListener(new pageOnClickListener() {
            @Override
            public void onPageClick(int position) {
                if (pageOnClickListener != null){
                    pageOnClickListener.onPageClick(position);
                }
            }
        });

        viewPager.setOffscreenPageLimit(items.size());
        viewPager.setAdapter(viewPagerAdapter);

        indicator.setViewPager(viewPager);
        viewPager.postInvalidate();

        currentItem = -1;
    }

    public int refreshBanner(int index){
        //设置当前页面
        int size = banner_list_size - 1;
        int dindex = 0;
        if (index < 1 || index > size){
            viewPager.setCurrentItem(0, true);
            dindex = 0;
        }
        else{
            viewPager.setCurrentItem(index);
            dindex = index;
        }

        return dindex;
    }

    public void setPlaceHolderImage(String url){
        if (Utils.isEmpty(url)){
            return;
        }

        if (!url.startsWith("http")){
            Uri uri = ZAKJResourceHelper.instance.computeLocalUri(url, getContext());

            if (uri != null){
                RNLog.d("placeholder image url = " + uri.toString());
                viewPagerAdapter.setPlaceHolderImage(uri.toString());
            }
        }
    }
}
