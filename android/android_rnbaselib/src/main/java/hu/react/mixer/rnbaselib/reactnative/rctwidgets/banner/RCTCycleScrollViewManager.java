package hu.react.mixer.rnbaselib.reactnative.rctwidgets.banner;

import android.support.annotation.NonNull;
import android.support.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import java.util.ArrayList;
import java.util.List;

import hu.react.mixer.rnbaselib.R;
import hu.react.mixer.rnbaselib.reactnative.rctwidgets.RCTBaseFrameLayout;
import hu.react.mixer.rnbaselib.utils.RNLog;

import hu.react.mixer.rnbaselib.reactnative.rctwidgets.RCTBaseFrameLayout;
import hu.react.mixer.rnbaselib.utils.RNLog;

/**
 * Created by hufuyi on 2018/1/17.
 */
public class RCTCycleScrollViewManager extends SimpleViewManager<RCTBaseFrameLayout> {
    ThemedReactContext reactContext;
    int flagid;

    private boolean isPlaceholderInvoked = false;
    private boolean isImageSourceInvoked = false;

    private List<String> listitems = new ArrayList<String>();
    private String plageHolderUrl = "";

    @Override
    public String getName() {
        return "ZAKJRCTCycleScroll";
    }

    @Override
    protected RCTBaseFrameLayout createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;

        RCTBaseFrameLayout view = (RCTBaseFrameLayout) reactContext.getCurrentActivity().getLayoutInflater().inflate(R.layout.rn_rct_cyclescroll_layout, null);
        return view;
    }

    @ReactProp(name = "autoScrollTimeInterval")
    public void setAutoScrollTimeInterval(RCTBaseFrameLayout view, float autoScrollTimeInterval) {
    }

    @ReactProp(name = "pageControlBottomOffset")
    public void setPageControlBottomOffset(RCTBaseFrameLayout view, float pageControlBottomOffset) {
    }

    @ReactProp(name = "placeholderImage")
    public void setPlaceholderImage(RCTBaseFrameLayout view, @Nullable ReadableMap placeholderImage) {
        RNLog.d("set setPlaceholderImage = " + placeholderImage);
        try{
            if (placeholderImage == null){
                return;
            }

            plageHolderUrl = placeholderImage.getString("uri");;
            RNLog.d("place holder image uri = " + plageHolderUrl);
        }finally {
            isPlaceholderInvoked = true;

            if (isImageSourceInvoked){
                setListItems((RCTCycleScrollView) view.findViewById(R.id.rct_cyclescrollview));
            }
        }
    }

    @ReactProp(name = "imageURLStringsGroup")
    public void setImageURLStringsGroup(RCTBaseFrameLayout view, @NonNull ReadableArray imageURLStringsGroup) {
        RNLog.d("set setImageURLStringsGroup items = " + imageURLStringsGroup.size());

        flagid = view.getId();
        ArrayList<String> list = new ArrayList<String>();

        for (int index = 0; index < imageURLStringsGroup.size(); index++){
            RNLog.d("set setImageURLStringsGroup items = " + imageURLStringsGroup.getString(index));

            list.add(imageURLStringsGroup.getString(index));
        }

        listitems = list;

        isImageSourceInvoked = true;
        if (isPlaceholderInvoked) {
            setListItems((RCTCycleScrollView) view.findViewById(R.id.rct_cyclescrollview));
        }
    }

    private void setListItems(RCTCycleScrollView view){
        view.setListItems(listitems, new RCTCycleScrollView.pageOnClickListener() {
            @Override
            public void onPageClick(int position) {
                onReceiveNativeEvent(position);
            }
        });
        view.setPlaceHolderImage(plageHolderUrl);
    }

    public void onReceiveNativeEvent(int index) {
        WritableMap event = Arguments.createMap();
        event.putString("index", "" + index);
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                flagid,
                "topChange",
                event);
    }
}
