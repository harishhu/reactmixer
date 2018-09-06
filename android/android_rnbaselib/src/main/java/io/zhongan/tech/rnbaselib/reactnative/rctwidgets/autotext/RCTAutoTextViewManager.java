package io.zhongan.tech.rnbaselib.reactnative.rctwidgets.autotext;

import android.os.Handler;
import android.os.Looper;
import android.support.annotation.NonNull;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import java.util.ArrayList;
import io.zhongan.tech.rnbaselib.R;
import io.zhongan.tech.rnbaselib.reactnative.rctwidgets.RCTBaseFrameLayout;
import io.zhongan.tech.rnbaselib.utils.RNLog;
import io.zhongan.tech.rnbaselib.utils.Utils;

public class RCTAutoTextViewManager extends SimpleViewManager<RCTBaseFrameLayout> {
    private static final int TEXTCOLOR_INDEX = 0;
    private static final int TEXTSIZE_INDEX = 1;
    private static final int TEXTDATA_INDEX = 2;

    private Handler mHandler = new Handler(Looper.getMainLooper());

    @Override
    public String getName() {
        return "ZAKJRCTAutoTextView";
    }

    @Override
    protected RCTBaseFrameLayout createViewInstance(ThemedReactContext reactContext) {
        return (RCTBaseFrameLayout) reactContext.getCurrentActivity().getLayoutInflater().inflate(R.layout.rn_rct_autotextview, null);
    }

    @ReactProp(name = "autoScrollTimeInterval")
    public void setAutoScrollTimeInterval(RCTBaseFrameLayout baseview, float autoScrollTimeInterval) {
        RCTAutoTextView view = baseview.findViewById(R.id.rn_rct_autotextview);
        view.setAutoIntervalTime(autoScrollTimeInterval * 1000);
    }

    @ReactProp(name = "textData")
    public void initTextData(final RCTBaseFrameLayout baseview, @NonNull ReadableArray textData) {
        RNLog.d("set text list = " + textData.size());
        RCTAutoTextView view = baseview.findViewById(R.id.rn_rct_autotextview);
        String color = textData.getString(TEXTCOLOR_INDEX);
        if (!Utils.isEmpty(color)){
            view.setTextColor(color);
        }

        float textsize = (float) textData.getDouble(TEXTSIZE_INDEX);
        if (textsize > 0){
            view.setTextSize(textsize);
        }

        ReadableArray list = textData.getArray(TEXTDATA_INDEX);

        final ArrayList<String> textlist = new ArrayList<String>();

        for (int index = 0; index < list.size(); index++){
            textlist.add(list.getString(index));
        }

        view.setTextList(textlist);
    }
}
