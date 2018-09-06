package io.zhongan.tech.rnbaselib.reactnative.rctwidgets.datapicker;

import android.content.Context;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;

import io.zhongan.tech.rnbaselib.R;
import io.zhongan.tech.rnbaselib.ui.calendar.widget.adapters.AbstractWheelTextAdapter;

/**
 * Created by za-liudanfeng on 2018/3/2.
 */
public class CalendarTextAdapter extends AbstractWheelTextAdapter {
        ArrayList<String> list;

        protected CalendarTextAdapter(Context context, ArrayList<String> list, int currentItem, int maxsize, int minsize) {
            super(context, R.layout.rn_rct_item_birth_year, R.id.tempValue, currentItem, maxsize, minsize);
            this.list = list;
        }

        @Override
        public View getItem(int index, View cachedView, ViewGroup parent) {
            View view = super.getItem(index, cachedView, parent);
            return view;
        }

        @Override
        public int getItemsCount() {
            return list.size();
        }

        @Override
        protected CharSequence getItemText(int index) {
            String str = list.get(index) + "";
            return str;
        }
    }
