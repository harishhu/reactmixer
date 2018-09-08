package hu.react.mixer.rnbaselib.supports.share.wxshare;

import java.lang.ref.WeakReference;

/**
 * Created by za-wanghe on 2017/9/11.
 */

public class ShareCallbackManager {

    private static WeakReference<ShareCallback> shareCallbackWeakReference;
    private static ShareCallback callback;

    public static void setShareCallBack(ShareCallback shareCallback) {
//        shareCallbackWeakReference = new WeakReference<ShareCallback>(shareCallback);
        callback = shareCallback;
    }

    public static ShareCallback getShareCallback() {
//        if (shareCallbackWeakReference != null) {
//            return shareCallbackWeakReference.get();
//        }
        return callback;
    }

    public static void clearShareCallback() {
        if (shareCallbackWeakReference != null) {
            shareCallbackWeakReference.clear();
        }
        callback = null;
    }

    public static void onShareResult(int code, String message) {
//        if (shareCallbackWeakReference != null && shareCallbackWeakReference.get() != null) {
//            shareCallbackWeakReference.get().onShareResult(code, message);
//            clearShareCallback();
//        }
        if (callback != null) {
            callback.onShareResult(code, message);
        }
        clearShareCallback();
    }

    public interface ShareCallback {
        void onShareResult(int resultCode, String resultMsg);
    }
}
