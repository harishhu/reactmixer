package io.zhongan.tech.rnbaselib.ui.calendar;

import android.app.Activity;
import android.app.Dialog;
import android.content.Context;
import android.os.Looper;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Calendar;

import io.zhongan.tech.rnbaselib.R;
import io.zhongan.tech.rnbaselib.ui.calendar.widget.OnWheelChangedListener;
import io.zhongan.tech.rnbaselib.ui.calendar.widget.OnWheelScrollListener;
import io.zhongan.tech.rnbaselib.ui.calendar.widget.WheelView;
import io.zhongan.tech.rnbaselib.ui.calendar.widget.adapters.AbstractWheelTextAdapter;


/**
 * 使用说明：1.showLongTerm()是否显示长期选项
 * 2.setTimePickerGone隐藏时间选择
 * 3.接口DateChooseInterface
 *
 * 用于时间日期的选择
 * Created by za_liudanfeng on 2017/12/16.
 */
public class DateChooseWheelViewDialog extends Dialog implements View.OnClickListener {
    //控件
    private WheelView mYearWheelView;
    private WheelView mMonthWheelView;
    private WheelView mDayWheelView;
    private View mYearView;
    private View mMonthView;
    private View mDayView;
    private CalendarTextAdapter mMonthAdapter;
    private CalendarTextAdapter mDayAdapter;
    private CalendarTextAdapter mYearAdapter;
    private Button mSureButton;
    private Dialog mDialog;

    //变量
    private ArrayList<String> arry_month = new ArrayList<String>();
    private ArrayList<String> arry_day = new ArrayList<String>();
    private ArrayList<String> arry_year = new ArrayList<String>();

    private int nowMonthId = 0;
    private int nowDayId = 0;
    private int nowYearId = 0;
    private String mYearStr;
    private String mMonthStr;
    private String mDayStr;
    private int year,month;


    //常量
    private final int MAX_TEXT_SIZE = 18;
    private final int MIN_TEXT_SIZE = 16;

    private Context mContext;
    private DateChooseInterface dateChooseInterface;
    private boolean isStar=true;

    public static int TYPE_PUBLIC = 0;
    public static int TYPE_MIN = 1;
    private int date_type = TYPE_PUBLIC;
    private TextView btn_cancel,btn_comfirm;
    private boolean mBlnTimePickerGone = true;


    public DateChooseWheelViewDialog(Context context, DateChooseInterface dateChooseInterface,int type,Boolean mBlnTimePickerGone) {
        super(context);
        this.mContext = context;
        this.dateChooseInterface = dateChooseInterface;
        this.date_type = type;
        this.mBlnTimePickerGone = mBlnTimePickerGone;
        mDialog = new Dialog(context, R.style.bottomDialog);
        initView();
        initData();
    }


    private void initData() {
        initYear();
        initDate();
        initListener();
    }

    /**
     * 初始化滚动监听事件
     */
    private void initListener() {
        //年份*****************************
        mYearWheelView.addChangingListener(new OnWheelChangedListener() {

            @Override
            public void onChanged(WheelView wheel, int oldValue, int newValue) {
                String currentText = (String) mYearAdapter.getItemText(wheel.getCurrentItem());
                setTextViewStyle(currentText, mYearAdapter);
                mYearStr = arry_year.get(wheel.getCurrentItem()) + "";
            }
        });

        mYearWheelView.addScrollingListener(new OnWheelScrollListener() {

            @Override
            public void onScrollingStarted(WheelView wheel) {

            }

            @Override
            public void onScrollingFinished(WheelView wheel) {
                String currentText = (String) mYearAdapter.getItemText(wheel.getCurrentItem());
                setTextViewStyle(currentText, mYearAdapter);
                currentText = currentText.replace("年","");
                if (date_type==TYPE_MIN){
                    currentText = currentText.replace("民國","");
                    year = Integer.valueOf(currentText);
                    year +=1911;
                }else{
                    year = Integer.valueOf(currentText);
                }
                if (!mBlnTimePickerGone)
                    setDay(month,year);
            }
        });

        //月份********************
        mMonthWheelView.addChangingListener(new OnWheelChangedListener() {

            @Override
            public void onChanged(WheelView wheel, int oldValue, int newValue) {
                String currentText = (String) mMonthAdapter.getItemText(wheel.getCurrentItem());
                setTextViewStyle(currentText, mMonthAdapter);
//                mDateCalendarTextView.setText(" " + arry_date.get(wheel.getCurrentItem()));
                mMonthStr = arry_month.get(wheel.getCurrentItem());
            }
        });

        mMonthWheelView.addScrollingListener(new OnWheelScrollListener() {

            @Override
            public void onScrollingStarted(WheelView wheel) {

            }

            @Override
            public void onScrollingFinished(WheelView wheel) {
                String currentText = (String) mMonthAdapter.getItemText(wheel.getCurrentItem());
                setTextViewStyle(currentText, mMonthAdapter);
                currentText = currentText.replace("月","");
                 month = Integer.valueOf(currentText);
                if (!mBlnTimePickerGone)
                    setDay(month,year);
            }
        });

        //日期***********************************
        mDayWheelView.addChangingListener(new OnWheelChangedListener() {

            @Override
            public void onChanged(WheelView wheel, int oldValue, int newValue) {
                String currentText = (String) mDayAdapter.getItemText(wheel.getCurrentItem());
                setTextViewStyle(currentText, mDayAdapter);
                mDayStr = arry_day.get(wheel.getCurrentItem()) + "";
            }
        });

        mDayWheelView.addScrollingListener(new OnWheelScrollListener() {

            @Override
            public void onScrollingStarted(WheelView wheel) {

            }

            @Override
            public void onScrollingFinished(WheelView wheel) {
                String currentText = (String) mDayAdapter.getItemText(wheel.getCurrentItem());
                setTextViewStyle(currentText, mDayAdapter);
            }
        });

    }

    /**
     * 初始化分钟
     */


    /**
     * 初始化年
     */
    private void initYear() {
        Calendar nowCalendar = Calendar.getInstance();
        int nowYear = nowCalendar.get(Calendar.YEAR);
        year = nowYear;
        arry_year.clear();
        for (int i = 0; i <= 209; i++) {
            int year = nowYear -106 + i;
            if (date_type == TYPE_PUBLIC)
                arry_year.add(year+"年");
            else
                arry_year.add("民國"+(year-1911)+"年");
            if (nowYear == year) {
                nowYearId = arry_year.size() - 1;
            }
        }
        mYearAdapter = new CalendarTextAdapter(mContext, arry_year, nowYearId, MAX_TEXT_SIZE, MIN_TEXT_SIZE);
        mYearWheelView.setVisibleItems(5);
        mYearWheelView.setViewAdapter(mYearAdapter);
        mYearWheelView.setCurrentItem(nowYearId);
        mYearStr = arry_year.get(nowYearId);
    }

    private void initView() {
        View view = LayoutInflater.from(mContext).inflate(R.layout.rn_dialog_date_choose, null);
        mDialog.setContentView(view);
        mYearView = view.findViewById(R.id.year_view);
        mMonthView = view.findViewById(R.id.month_view);
        mDayView = view.findViewById(R.id.day_view);
        mYearWheelView = (WheelView) mYearView.findViewById(R.id.item_wv);
        mMonthWheelView = (WheelView) mMonthView.findViewById(R.id.item_wv);
        mDayWheelView = (WheelView) mDayView.findViewById(R.id.item_wv);
        btn_cancel = (TextView) view.findViewById(R.id.btn_cancel);
        btn_comfirm = (TextView) view.findViewById(R.id.btn_comfirm);
        btn_cancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dismissDialog();
            }
        });
        btn_comfirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dateChooseInterface.getDateTime(mYearStr+mMonthStr+mDayStr);
                dismissDialog();
            }
        });
    }

    /**
     * 初始化月份
     */
    private void initDate() {
        Calendar nowCalendar = Calendar.getInstance();
        int nowYear = nowCalendar.get(Calendar.YEAR);
        arry_month.clear();
        setDate(nowYear);
        mMonthAdapter = new CalendarTextAdapter(mContext, arry_month, nowMonthId, MAX_TEXT_SIZE, MIN_TEXT_SIZE);
        mMonthWheelView.setVisibleItems(5);
        mMonthWheelView.setViewAdapter(mMonthAdapter);
        mMonthWheelView.setCurrentItem(nowMonthId);

        mMonthStr = arry_month.get(nowMonthId);
        setTextViewStyle(mMonthStr, mMonthAdapter);
        initDay();

    }

    public void initDay(){
        if(!mBlnTimePickerGone){
            mDayAdapter = new CalendarTextAdapter(mContext, arry_day, nowDayId, MAX_TEXT_SIZE, MIN_TEXT_SIZE);
            mDayWheelView.setVisibleItems(5);
            mDayWheelView.setViewAdapter(mDayAdapter);
            mDayWheelView.setCurrentItem(nowDayId);

            mDayStr = arry_day.get(nowDayId);
            setTextViewStyle(mDayStr, mDayAdapter);
        }
    }




    /**
     * 将改年的所有日期写入数组
     * @param year
     */
    private int nowMonth;
    private int nowDay;
    private void setDate(int year){
        Calendar nowCalendar = Calendar.getInstance();
        nowMonth = nowCalendar.get(Calendar.MONTH)+1;
        month = nowMonth;
        nowDay = nowCalendar.get(Calendar.DAY_OF_MONTH);
        for (int month = 1; month <= 12; month++){
            arry_month.add(month+"月");
            if (nowMonth == month)
                nowMonthId = month-1;
        }
        if (!mBlnTimePickerGone)
            setDay(month,year);
    }

    public void setDay(int month,int year){
        boolean isRun = isRunNian(year);
        arry_day.clear();
        switch (month){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                for (int day = 1; day <= 31; day++){
                    arry_day.add( day + "日");

                    if (month == nowMonth && day == nowDay){
                        nowDayId = arry_day.size() - 1;
                    }
                }
                break;
            case 2:
                if (isRun){
                    for (int day = 1; day <= 29; day++){
                        arry_day.add(day + "日");
                        if (month == nowMonth && day == nowDay){
                            nowDayId = arry_day.size() - 1;
                        }
                    }
                }else {
                    for (int day = 1; day <= 28; day++){
                        arry_day.add(day + "日");
                        if (month == nowMonth && day == nowDay){
                            nowDayId = arry_day.size() - 1;
                        }
                    }
                }
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                for (int day = 1; day <= 30; day++){
                    arry_day.add( day + "日");
                    if (month == nowMonth && day == nowDay){
                        nowDayId = arry_day.size() - 1;
                    }
                }
                break;
        }
    if (!isStar)
    {
        initDay();
    }
    isStar = false;
    }

    /**
     * 判断是否是闰年
     * @param year
     * @return
     */
    private boolean isRunNian(int year){
        if(year % 4 == 0 && year % 100 !=0 || year % 400 == 0){
            return true;
        }else {
            return false;
        }
    }

    /**
     * 设置文字的大小
     * @param curriteItemText
     * @param adapter
     */
    public void setTextViewStyle(String curriteItemText, CalendarTextAdapter adapter) {
        ArrayList<View> arrayList = adapter.getTestViews();
        int size = arrayList.size();
        String currentText;
        for (int i = 0; i < size; i++) {
            TextView textvew = (TextView) arrayList.get(i);
            currentText = textvew.getText().toString();
            if (curriteItemText.equals(currentText)) {
                textvew.setTextSize(MAX_TEXT_SIZE);
                textvew.setTextColor(mContext.getResources().getColor(R.color.text_10));
            } else {
                textvew.setTextSize(MIN_TEXT_SIZE);
                textvew.setTextColor(mContext.getResources().getColor(R.color.text_11));
            }
        }
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
        }
    }

    /**
     * 对话框消失
     */
    private void dismissDialog() {

        if (Looper.myLooper() != Looper.getMainLooper()) {

            return;
        }

        if (null == mDialog || !mDialog.isShowing() || null == mContext
                || ((Activity) mContext).isFinishing()) {

            return;
        }

        mDialog.dismiss();
        this.dismiss();
    }

    /**
     * 显示日期选择dialog
     */
    public void showDateChooseDialog() {

        if (Looper.myLooper() != Looper.getMainLooper()) {

            return;
        }

        if (null == mContext || ((Activity) mContext).isFinishing()) {

            // 界面已被销毁
            return;
        }

        if (null != mDialog) {

            mDialog.show();
            return;
        }

        if (null == mDialog) {

            return;
        }

        mDialog.setCanceledOnTouchOutside(true);
        mDialog.show();
    }

    /**
     * 滚轮的adapter
     */
    private class CalendarTextAdapter extends AbstractWheelTextAdapter {
        ArrayList<String> list;

        protected CalendarTextAdapter(Context context, ArrayList<String> list, int currentItem, int maxsize, int minsize) {
            super(context, R.layout.rn_item_birth_year, R.id.tempValue, currentItem, maxsize, minsize);
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

    /**
     * 回调选中的时间（默认时间格式"yyyy-MM-dd HH:mm:ss"）
     */
    public interface DateChooseInterface{
        void getDateTime(String time);
    }

}
