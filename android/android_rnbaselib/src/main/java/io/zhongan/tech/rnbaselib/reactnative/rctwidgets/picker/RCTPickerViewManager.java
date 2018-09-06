package io.zhongan.tech.rnbaselib.reactnative.rctwidgets.picker;

import android.support.annotation.NonNull;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;


import java.util.ArrayList;

import io.zhongan.tech.rnbaselib.R;
import io.zhongan.tech.rnbaselib.ui.WheelView;
import io.zhongan.tech.rnbaselib.utils.RNLog;

/**
 * Created by hufuyi on 2018/1/17.
 */

public class RCTPickerViewManager extends SimpleViewManager<RCTPickerView> {
    ThemedReactContext reactContext;

    @Override
    public String getName() {
        return "ZAKJRCTPicker";
    }

    @Override
    protected RCTPickerView createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;

        return (RCTPickerView) reactContext.getCurrentActivity().getLayoutInflater().inflate(R.layout.rn_rct_picker_layout, null);
    }

    @ReactProp(name = "defaultIndex")
    public void setDefaultIndex(RCTPickerView view, int defaultindex) {
        view.setDefaultItem(defaultindex);
    }

    @ReactProp(name = "items")
    public void setPickerItems(RCTPickerView view, @NonNull ReadableArray items) {
        RNLog.d("set picker items = " + items.size());

        ArrayList<String> list = new ArrayList<String>();

        for (int index = 0; index < items.size(); index++){
            list.add(items.getString(index));
        }

        view.setListItems(list, new RCTPickerView.OnRCTPickerViewListener(){
            @Override
            public void onSelected(View v, int selectedIndex, String item) {
                RCTPickerViewManager.this.onReceiveNativeEvent(v.getId(), selectedIndex);
            }
        });
    }

    public void onReceiveNativeEvent(int viewid, int index) {
        WritableMap event = Arguments.createMap();
        event.putString("index", "" + (index - 1));
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                viewid,
                "topChange",
                event);
    }
}
