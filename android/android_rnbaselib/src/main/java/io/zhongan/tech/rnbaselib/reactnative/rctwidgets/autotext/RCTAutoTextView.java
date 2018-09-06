package io.zhongan.tech.rnbaselib.reactnative.rctwidgets.autotext;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Camera;
import android.graphics.Color;
import android.graphics.Matrix;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.util.AttributeSet;
import android.view.Gravity;
import android.view.View;
import android.view.animation.AccelerateInterpolator;
import android.view.animation.Animation;
import android.view.animation.Transformation;
import android.widget.TextSwitcher;
import android.widget.TextView;
import android.widget.ViewSwitcher.ViewFactory;
import java.util.ArrayList;
import io.zhongan.tech.rnbaselib.R;
import io.zhongan.tech.rnbaselib.utils.RNLog;

import static android.text.TextUtils.TruncateAt.END;

public class RCTAutoTextView extends TextSwitcher implements ViewFactory {
    private float mHeight;
    private Context mContext;

    private int textColor;

    //mInUp, mOutUp分别构成向下翻页的进出动画
    private Rotate3dAnimation mInUp;
    private Rotate3dAnimation mOutUp;

    //mInDown, mOutDown分别构成向下翻页的进出动画
    private Rotate3dAnimation mInDown;
    private Rotate3dAnimation mOutDown;

    private ArrayList<TextView> tvViews = new ArrayList<TextView>();

    public RCTAutoTextView(Context context) {
        this(context, null);
    }

    public RCTAutoTextView(Context context, AttributeSet attrs) {
        super(context, attrs);
        RNLog.d("RCTAutoTextView = constructor");

        TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.auto3d);
        mHeight = a.getDimension(R.styleable.auto3d_textSize, 12);
        a.recycle();
        mContext = context;

        textColor = Color.parseColor("#000000");

        initAutoText();
    }

    public void setTextSize(float size){
        mHeight = size;

        for (TextView tv : tvViews){
            tv.setTextSize(mHeight);
        }
    }

    public void setTextColor(String color){
        textColor = Color.parseColor(color);

        for (TextView tv : tvViews){
            tv.setTextColor(textColor);
        }
    }

    public void setAutoIntervalTime(float interval){
        intervaltime = (int) interval;
    }

    public void initAutoText() {
        RNLog.d("init auto text = " + mInUp);
        if (mInUp != null){
            return;
        }

        setFactory(this);

        mInUp = createAnim(0, 0, true, true);
        mOutUp = createAnim(0, 0, false, true);
        mInDown = createAnim(0, 0, true, false);
        mOutDown = createAnim(0, 0, false, false);
        //TextSwitcher主要用于文件切换，比如 从文字A 切换到 文字 B，
        //setInAnimation()后，A将执行inAnimation，
        //setOutAnimation)后，B将执行OutAnimation
        setInAnimation(mInUp);
        setOutAnimation(mOutUp);
    }

    private Rotate3dAnimation createAnim(float start, float end, boolean turnIn, boolean turnUp) {
        final Rotate3dAnimation rotation = new Rotate3dAnimation(start, end, turnIn, turnUp);
        rotation.setDuration(500);
        rotation.setFillAfter(false);
        rotation.setInterpolator(new AccelerateInterpolator());
        return rotation;
    }

    //这里返回的TextView，就是我们看到的View
    @Override
    public View makeView() {
        TextView t = new TextView(mContext);
        t.setGravity(Gravity.CENTER_VERTICAL);
        t.setTextSize(mHeight);
        t.setEllipsize(END);
        t.setLineSpacing(14,1);
        t.setMaxLines(2);
        t.setTextColor(textColor);
        tvViews.add(t);
        return t;
    }

    //定义动作，向下滚动翻页
    public void previous() {
        if (getInAnimation() != mInDown) {
            setInAnimation(mInDown);
        }
        if (getOutAnimation() != mOutDown) {
            setOutAnimation(mOutDown);
        }
    }

    //定义动作，向上滚动翻页
    public void next() {
        if (getInAnimation() != mInUp) {
            setInAnimation(mInUp);
        }
        if (getOutAnimation() != mOutUp) {
            setOutAnimation(mOutUp);
        }
    }

    class Rotate3dAnimation extends Animation {
        private final float mFromDegrees;
        private final float mToDegrees;
        private final boolean mTurnIn;
        private final boolean mTurnUp;
        private float mCenterX;
        private float mCenterY;
        private Camera mCamera;

        public Rotate3dAnimation(float fromDegrees, float toDegrees, boolean turnIn, boolean turnUp) {
            mFromDegrees = fromDegrees;
            mToDegrees = toDegrees;
            mTurnIn = turnIn;
            mTurnUp = turnUp;
        }

        @Override
        public void initialize(int width, int height, int parentWidth, int parentHeight) {
            super.initialize(width, height, parentWidth, parentHeight);
            mCamera = new Camera();
            mCenterY = getHeight();
            mCenterX = getWidth();
        }

        @Override
        protected void applyTransformation(float interpolatedTime, Transformation t) {
            final float fromDegrees = mFromDegrees;
            float degrees = fromDegrees + ((mToDegrees - fromDegrees) * interpolatedTime);

            final float centerX = mCenterX;
            final float centerY = mCenterY;
            final Camera camera = mCamera;
            final int derection = mTurnUp ? 1 : -1;

            final Matrix matrix = t.getMatrix();

            camera.save();
            if (mTurnIn) {
                camera.translate(0.0f, derection * mCenterY * (interpolatedTime - 1.0f), 0.0f);
            } else {
                camera.translate(0.0f, derection * mCenterY * (interpolatedTime), 0.0f);
            }
            camera.rotateX(degrees);
            camera.getMatrix(matrix);
            camera.restore();

            matrix.preTranslate(-centerX, -centerY);
            matrix.postTranslate(centerX, centerY);
        }
    }

    private static final int SWITCH_DELAY = 5000;
    private static final int MSG_UPDATE_VIEW = 100;
    private ArrayList<String> textList;
    private int intervaltime = SWITCH_DELAY;

    public void setTextList(ArrayList<String> l){
        textList = l;
        setText(textList.get(0));

        Message msg = mHandler.obtainMessage(MSG_UPDATE_VIEW);
        msg.arg1 = 0;
        mHandler.sendMessageDelayed(msg, intervaltime);
    }

    private Handler mHandler = new Handler(Looper.getMainLooper()){
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);

            if (msg.what == MSG_UPDATE_VIEW){
                int nextindex = (msg.arg1 + 1) % textList.size();

                String nextstr = textList.get(nextindex);
                setText(nextstr);

                Message m = mHandler.obtainMessage(MSG_UPDATE_VIEW);
                m.arg1 = nextindex;
                mHandler.sendMessageDelayed(m, intervaltime);
            }
        }
    };
}