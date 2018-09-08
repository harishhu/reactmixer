package hu.react.mixer.rnbaselib.reactnative.rctwidgets.picker;

import android.content.Context;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.view.View;
import android.widget.LinearLayout;

import java.util.ArrayList;

import hu.react.mixer.rnbaselib.R;
import hu.react.mixer.rnbaselib.ui.WheelView;

import hu.react.mixer.rnbaselib.ui.WheelView;

/**
 * Created by hufuyi on 2018/1/17.
 */
public class RCTPickerView extends LinearLayout implements WheelView.OnWheelViewListener {
    @Override
    public void onSelected(int selectedIndex, String item) {
        if (rctPickViewListener != null){
            rctPickViewListener.onSelected(this, selectedIndex, item);
        }
    }

    public interface OnRCTPickerViewListener {
        void onSelected(View view, int selectedIndex, String item);
    }

    private WheelView wheelView;
    private int defaultIndex = 0;
    private RCTPickerView.OnRCTPickerViewListener rctPickViewListener;

    public RCTPickerView(Context context) {
        super(context);
    }
    public RCTPickerView(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }
    public RCTPickerView(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    public void setListItems(ArrayList<String> items, RCTPickerView.OnRCTPickerViewListener lis){
        if (wheelView == null){
            wheelView = (WheelView) this.findViewById(R.id.wheel_view_wv);
            wheelView.setOffset(1);
            wheelView.setOnWheelViewListener(this);
        }

        rctPickViewListener = lis;
        wheelView.setSeletion(defaultIndex);
        wheelView.setItems(items);
    }

    public void setDefaultItem(int index){
        defaultIndex = index;
    }


}
