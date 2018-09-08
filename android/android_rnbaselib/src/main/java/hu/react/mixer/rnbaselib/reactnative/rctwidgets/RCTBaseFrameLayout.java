package hu.react.mixer.rnbaselib.reactnative.rctwidgets;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.widget.FrameLayout;

public class RCTBaseFrameLayout extends FrameLayout {
    private boolean firstLayouted = false;

    public RCTBaseFrameLayout(@NonNull Context context) {
        super(context);
    }

    public RCTBaseFrameLayout(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
    }

    public RCTBaseFrameLayout(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
    }

    @Override
    public void requestLayout() {
        super.requestLayout();

        if (getWidth() > 0 && getHeight() > 0 && firstLayouted){
            measure(MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY), MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY));
            layout(getLeft(), getTop(), getRight(), getBottom());
        }
    }

    @Override
    protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
        super.onLayout(changed, left, top, right, bottom);

        firstLayouted = true;
    }
}
