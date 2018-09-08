package hu.react.mixer.rnbaselib.reactnative.rctwidgets.datapicker;

import android.support.annotation.NonNull;
import android.view.View;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Date;

import hu.react.mixer.rnbaselib.R;

/**
 * Created by za-liudanfeng on 2018/3/2.
 */

public class RCTDatePickerViewManager extends SimpleViewManager<RCTDatePickerView> {
    ThemedReactContext reactContext;

    @Override
    public String getName() {
        return "ZAKJRCTDatePicker";
    }

    @Override
    protected RCTDatePickerView createViewInstance(ThemedReactContext reactContext) {
        this.reactContext = reactContext;

        return (RCTDatePickerView) reactContext.getCurrentActivity().getLayoutInflater().inflate(R.layout.rn_rct_datepicker_layout, null);
    }

    @ReactProp(name = "currentDate")
    public void setCurrentDate(RCTDatePickerView view, @NonNull String currentDate) {
        long date_ =Long.valueOf(currentDate).longValue();
        Date date = new Date(date_);
        view.setCurrentDate(date,new RCTDatePickerView.DateChooseInterface(){
            @Override
            public void getDateTime(View v, String time) {
                RCTDatePickerViewManager.this.onReceiveNativeEvent(v.getId(), time);
            }
        });
    }
    @ReactProp(name = "mode")
    public void setMode(RCTDatePickerView view, @NonNull String mode) {
        view.setMode(mode);
    }

    public void onReceiveNativeEvent(int viewid, String date) {
        WritableMap event = Arguments.createMap();
        if(!date.equals(""))
            event.putString("date", date );
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                viewid,
                "topChange",
                event);
    }
}
