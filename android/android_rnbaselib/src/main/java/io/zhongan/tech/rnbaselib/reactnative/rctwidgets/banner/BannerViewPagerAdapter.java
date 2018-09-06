package io.zhongan.tech.rnbaselib.reactnative.rctwidgets.banner;

import android.app.Activity;
import android.content.Context;
import android.net.Uri;
import android.support.v4.view.PagerAdapter;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.drawee.generic.GenericDraweeHierarchy;
import com.facebook.drawee.view.SimpleDraweeView;
import java.util.ArrayList;
import java.util.List;
import io.zhongan.tech.rnbaselib.R;
import io.zhongan.tech.rnbaselib.utils.ImageUtil;
import io.zhongan.tech.rnbaselib.utils.Utils;

/**
 * Created by za-liudanfeng on 2017/8/9.
 */

public class BannerViewPagerAdapter extends PagerAdapter {
    private final LayoutInflater inflater;
    List<String> bannerList = new ArrayList<String>();
    private Context context;
    private Activity activity;

    private RCTCycleScrollView.pageOnClickListener listener;
    private List<View> viewlist = new ArrayList<View>();

    private String placeHolderImage = "";

    private class MyClickListener implements View.OnClickListener{
        int position;

        @Override
        public void onClick(View view) {
            if (listener != null){
                listener.onPageClick(position);
            }
        }
    }

    public BannerViewPagerAdapter(Context context, List<String> list) {
        super();

        bannerList = list;

        this.context = context.getApplicationContext();
        inflater = LayoutInflater.from(context);
    }

    @Override
    public int getCount() {
        return bannerList.size();
    }

    @Override
    public boolean isViewFromObject(View view, Object obj) {
        return view == viewlist.get(Integer.parseInt(obj.toString()));
    }

    @Override
    public Object instantiateItem(ViewGroup container, final int position) {
        View view = inflater.inflate(R.layout.rn_rct_fragement_head_item,
                container, false);

        SimpleDraweeView imageView = (SimpleDraweeView) view.findViewById(R.id.image);

        imageView.setImageURI(Uri.parse(bannerList.get(position)));

        if (!Utils.isEmpty(placeHolderImage)){
            GenericDraweeHierarchy hierarchy = imageView.getHierarchy();
            hierarchy.setPlaceholderImage(ImageUtil.getDrawableByAssetUrl(placeHolderImage, container.getContext()));
        }

        //RNLog.d("banner position = " + position + " uri = " + bannerList.get(position) + " view = " + view + " count = " + getCount());

        MyClickListener l = new MyClickListener();
        l.position = position;

        viewlist.add(view);
        view.setOnClickListener(l);
        container.addView(view);
        return position;
    }

    @Override
    public void setPrimaryItem(ViewGroup container, int position, Object object) {
       // RNLog.d("setPrimaryItem item = " + position + " object = " + object);
        super.setPrimaryItem(container, position, object);
    }

    @Override
    public int getItemPosition(Object object) {
     //   RNLog.d("getItemPosition item = " + object);
        return super.getItemPosition(object);
    }

    @Override
    public void destroyItem(ViewGroup container, int position, Object object) {
        //RNLog.d("destroy item = " + position + " object = " + object);
        container.removeView(viewlist.get(position));
    }

    public void setOnPageClickListener(RCTCycleScrollView.pageOnClickListener l){
        listener = l;
    }

    public void setPlaceHolderImage(String url){
        placeHolderImage = url;
    }
}