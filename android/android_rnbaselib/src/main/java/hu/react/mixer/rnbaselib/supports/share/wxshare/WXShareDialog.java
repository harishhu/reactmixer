package hu.react.mixer.rnbaselib.supports.share.wxshare;

import android.app.Dialog;
import android.content.Context;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;
import android.view.Gravity;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import hu.react.mixer.rnbaselib.R;
import hu.react.mixer.rnbaselib.utils.FrescoUtil;

/**
 * Created by za-liudanfeng on 2018/5/15.
 */

public class WXShareDialog extends Dialog implements View.OnClickListener {
    private static final int THUMB_SIZE = 100;

    private static final int SHARE_RESULT_FAILURE = -1;
    private static final int SHARE_RESULT_CANCEL = -2;

    private final static int TYPE_ALL = 1;
    private final static int TYPE_WX = 2;
    private final static int TYPE_PY = 3;

    Context mContext;
    private LinearLayout shareWX;
    private LinearLayout shareFriend;
    TextView tvCancel;
    private LocalShareData localShareData;
    WXShareUtil wxShare;

    int shareType = -999;

    static final int MSG_START_SHARE = 99;
    Handler mHandler = new Handler(){
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);

            if (msg.what == MSG_START_SHARE){
                Bitmap image = (Bitmap) msg.obj;
                float ratio = ((float) image.getWidth()) / image.getHeight();
                int width = (int) (THUMB_SIZE * ratio);

                Bitmap thumbBmp = Bitmap.createScaledBitmap(image, width, THUMB_SIZE, true);
                share(thumbBmp);
            }
        }
    };

    private void share( Bitmap thumbBmp){
        if (localShareData.type == LocalShareData.TYPE_URL)
            wxShare.shareUrl(localShareData.url, localShareData.title, thumbBmp, localShareData.desc, shareType);
        else if(localShareData.type == LocalShareData.TYPE_TEXT)
            wxShare.shareText(localShareData.desc,shareType);
        else if(localShareData.type == LocalShareData.TYPE_IMAGE)
            wxShare.sharePic(thumbBmp,shareType);
        else if(localShareData.type == LocalShareData.TYPE_MUSIC)
            wxShare.shareMusic(localShareData.url,localShareData.title,thumbBmp,localShareData.desc,shareType);
        else if(localShareData.type == LocalShareData.TYPE_VIDEO)
            wxShare.shareVideo(localShareData.url,localShareData.title,thumbBmp,localShareData.desc,shareType);
        else if(localShareData.type == LocalShareData.TYPE_MINI)
            wxShare.shareMiniProject(localShareData.url,localShareData.userName,localShareData.path,localShareData.title,thumbBmp,localShareData.desc,shareType);
    }

    public WXShareDialog(Context context, LocalShareData localShareData,String app_id) {
        super(context);
        this.mContext = context;
        this.localShareData = localShareData;
        wxShare = WXShareUtil.getInstance(context,app_id);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.rn_dialog_share);
        init();
        initView();
    }
    
    private void init() {
        //获取当前Activity所在的窗体
        Window dialogWindow = this.getWindow();
        //设置Dialog从窗体底部弹出
        dialogWindow.setGravity(Gravity.BOTTOM);
        dialogWindow.setWindowAnimations(R.style.ActionSheetDialogAnimation); // 添加动画
        setCanceledOnTouchOutside(true);// 点击Dialog外部消失
        dialogWindow.setBackgroundDrawableResource(android.R.color.transparent);
    }

    private void initView() {
        shareWX = (LinearLayout) findViewById(R.id.share_WX);
        shareFriend = (LinearLayout) findViewById(R.id.share_friend);
        tvCancel = (TextView) findViewById(R.id.tv_cancel);
        shareWX.setOnClickListener(this);
        shareFriend.setOnClickListener(this);
        tvCancel.setOnClickListener(this);
        if (localShareData.type == LocalShareData.TYPE_MINI)
            showShareType(TYPE_WX);
        if (localShareData.typeSet == null) {
            localShareData.typeSet = new int[]{1};
        }
        for (int type : localShareData.typeSet) {
            showShareType(type);
        }
    }

    private void showShareType(int type) {
        switch (type){
            case TYPE_ALL:
                shareWX.setVisibility(View.VISIBLE);
                shareFriend.setVisibility(View.VISIBLE);
                break;
            case TYPE_WX:
                shareWX.setVisibility(View.VISIBLE);
                break;
            case TYPE_PY:
                shareFriend.setVisibility(View.VISIBLE);
                break;
        }
    }

    @Override
    public void show() {
        super.show();
        /**
         * 设置宽度全屏，要设置在show的后面
         */
        WindowManager.LayoutParams layoutParams = getWindow().getAttributes();
        layoutParams.gravity=Gravity.BOTTOM;
        layoutParams.width= WindowManager.LayoutParams.MATCH_PARENT;
        layoutParams.height= WindowManager.LayoutParams.WRAP_CONTENT;
        getWindow().getDecorView().setPadding(0, 0, 0, 0);
        getWindow().setAttributes(layoutParams);
    }

    @Override
    public void onClick(View view) {
        shareType = -999;

        if(view.getId() == R.id.share_WX)
            shareType = WXShareUtil.SHARE_TYPE_SESSION;
        else  if(view.getId() == R.id.share_friend)
            shareType = WXShareUtil.SHARE_TYPE_MOMENTS;
        else  if(view.getId() == R.id.tv_cancel)
        {
            doShareResult(SHARE_RESULT_CANCEL);
            dismiss();
        }
        if (localShareData == null){
            return;
        }

        WXShareUtil.currentShareType = localShareData.shareType;

        if (shareType != -999){
            FrescoUtil.getBitmapByUrl(localShareData.imageUrl, mContext, new FrescoUtil.GetBitmapListener() {
                @Override
                public void onSuccess(Bitmap bitmap) {
                    Message msg = mHandler.obtainMessage(MSG_START_SHARE);
                    msg.obj = bitmap;
                    msg.sendToTarget();
                    dismiss();
                }

                @Override
                public void onFail() {
                    Toast.makeText(getContext(), "分享图片下载失败", Toast.LENGTH_SHORT).show();
                    WXShareUtil.currentShareType = "";
                    doShareResult(SHARE_RESULT_FAILURE);
                    dismiss();
                }
            });
        }
    }

    @Override
    public void onBackPressed() {
        doShareResult(SHARE_RESULT_CANCEL);
        super.onBackPressed();
    }

    private void doShareResult(int resultCode) {
        String resultMsg = "";
        switch (resultCode) {
            case SHARE_RESULT_CANCEL:
                resultMsg = "分享取消";
                break;
            case SHARE_RESULT_FAILURE:
                resultMsg = "分享失败";
                break;
        }
        Map<String, Object> map = new HashMap<>();
        map.put("resultCode", resultCode);
        map.put("resultMessage", resultMsg);
        JSONObject obj = new JSONObject(map);
        ShareCallbackManager.onShareResult(resultCode, obj.toString());
    }
}
