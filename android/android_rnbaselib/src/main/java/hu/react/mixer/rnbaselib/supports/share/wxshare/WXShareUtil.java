package hu.react.mixer.rnbaselib.supports.share.wxshare;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Rect;
import android.widget.Toast;

import com.tencent.mm.opensdk.modelmsg.SendMessageToWX;
import com.tencent.mm.opensdk.modelmsg.WXImageObject;
import com.tencent.mm.opensdk.modelmsg.WXMediaMessage;
import com.tencent.mm.opensdk.modelmsg.WXMiniProgramObject;
import com.tencent.mm.opensdk.modelmsg.WXMusicObject;
import com.tencent.mm.opensdk.modelmsg.WXTextObject;
import com.tencent.mm.opensdk.modelmsg.WXVideoObject;
import com.tencent.mm.opensdk.modelmsg.WXWebpageObject;
import com.tencent.mm.opensdk.openapi.IWXAPI;
import com.tencent.mm.opensdk.openapi.WXAPIFactory;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;

/**
 *  Created by za-liudanfeng on 2018/5/14.
 */

public class WXShareUtil {

    public static final int SHARE_TYPE_MOMENTS = SendMessageToWX.Req.WXSceneTimeline;
    public static final int SHARE_TYPE_SESSION = SendMessageToWX.Req.WXSceneSession;
    /**
     * appId
     */
    private String APP_ID = "";

    private static final int TIMELINE_SUPPORTED_VERSION = 0x21020001;

    //IWXAPI是第三方app和微信通信的openapi接口
    private IWXAPI api;
    private Context context;
    /**
     * 分享缩略图大小
     */
    protected static final int THUMB_SIZE = 100;

    public static WXShareUtil wxShareUtil;

    public static String currentShareType = "";

    public static WXShareUtil getInstance(Context context,String app_id) {
        if (wxShareUtil == null) {
            wxShareUtil = new WXShareUtil();
        }
        if (wxShareUtil.api != null) {
            wxShareUtil.api.unregisterApp();
        }
        wxShareUtil.context = context;
        wxShareUtil.APP_ID = app_id;
        wxShareUtil.regToWx();
        return wxShareUtil;
    }

    //注册应用id到微信
    private void regToWx() {
        //通过WXAPIFactory工厂，获取IWXAPI的实例
        api = WXAPIFactory.createWXAPI(context, APP_ID, true);
        //将应用的appId注册到微信
        api.registerApp(APP_ID);
    }
    /**
     * 分享文字到朋友圈或者好友
     *
     * @param text  文本内容
     * @param scene 分享方式：好友还是朋友圈
     */
    public boolean shareText(String text, int scene) {
        //初始化一个WXTextObject对象，填写分享的文本对象
        WXTextObject textObj = new WXTextObject();
        textObj.text = text;
        return share(textObj, text, scene);
    }

    /**
     * 分享图片到朋友圈或者好友
     *
     * @param bmp   图片的Bitmap对象
     * @param scene 分享方式：好友还是朋友圈
     */
    public boolean sharePic(Bitmap bmp, int scene) {
        //初始化一个WXImageObject对象
        WXImageObject imageObj = new WXImageObject(bmp);
        //设置缩略图
        Bitmap thumb = Bitmap.createScaledBitmap(bmp, 60, 60, true);
        bmp.recycle();
        return share(imageObj, thumb, scene);
    }

    /**
     * 分享网页到朋友圈或者好友，视频和音乐的分享和网页
     *
     * @param url         网页的url
     * @param title       显示分享网页的标题
     * @param description 对网页的描述
     * @param scene       分享方式：好友还是朋友圈
     */
    public boolean shareUrl(String url, String title, Bitmap thumb, String description, int scene) {
        //初始化WXWebpageObject对象，填写url
        WXWebpageObject webPage = new WXWebpageObject();
        webPage.webpageUrl = url;
        return share(webPage, title, thumb, description, scene);
    }

    //分享小程序，目前只支持分享到微信对话
    public boolean shareMiniProject(String url,String userName,String path, String title, Bitmap thumb, String description, int scene){
        WXMiniProgramObject miniProgramObj = new WXMiniProgramObject();
        miniProgramObj.webpageUrl = url; // 兼容低版本的网页链接
        miniProgramObj.miniprogramType = WXMiniProgramObject.MINIPTOGRAM_TYPE_RELEASE;// 正式版:0，测试版:1，体验版:2
        miniProgramObj.userName = userName;     // 小程序原始id
        miniProgramObj.path = path;            //小程序页面路径
        return share(miniProgramObj,title,thumb,description,scene);
    }
    //分享音乐
    public boolean shareMusic(String url, String title, Bitmap thumb, String description, int scene){
        WXMusicObject musicObject = new WXMusicObject();
        musicObject.musicUrl = url;
        return share(musicObject,title,thumb,description,scene);
    }
    //分享视频
    public boolean shareVideo(String url, String title, Bitmap thumb, String description, int scene){
        WXVideoObject videoObject = new WXVideoObject();
        videoObject.videoUrl = url;
        return share(videoObject,title,thumb,description,scene);
    }

    private boolean share(WXMediaMessage.IMediaObject mediaObject, Bitmap thumb, int scene) {
        return share(mediaObject, null, thumb, null, scene);
    }

    private boolean share(WXMediaMessage.IMediaObject mediaObject, String description, int scene) {
        return share(mediaObject, null, null, description, scene);
    }

    private boolean share(WXMediaMessage.IMediaObject mediaObject, String title, Bitmap thumb, String description, int scene) {
        if (!isWXAppInstalledAndSupported()) {
            Toast.makeText(context, "没有检测到微信", Toast.LENGTH_SHORT).show();
            return false;
        }
        //初始化一个WXMediaMessage对象，填写标题、描述
        WXMediaMessage msg = new WXMediaMessage(mediaObject);

        if (title != null) {
            msg.title = title;
        }
        if (description != null) {
            msg.description = description;
        }
        if (thumb != null) {
            msg.thumbData = processThumbBitmap(thumb);
        }
        //构造一个Req
        SendMessageToWX.Req req = new SendMessageToWX.Req();
        req.transaction = String.valueOf(System.currentTimeMillis());
        req.message = msg;
        req.scene = scene;
        return api.sendReq(req);
    }

	

    private boolean isWXAppInstalledAndSupported() {
        boolean sIsWXAppInstalledAndSupported = api.isWXAppInstalled();
//                && api.isWXAppSupportAPI();

        return sIsWXAppInstalledAndSupported;
    }

    //判断是否支持转发到朋友圈
    //微信4.2以上支持，如果需要检查微信版本支持API的情况， 可调用IWXAPI的getWXAppSupportAPI方法,0x21020001及以上支持发送朋友圈
    public boolean isSupportWX() {
        int wxSdkVersion = api.getWXAppSupportAPI();
        return wxSdkVersion >= TIMELINE_SUPPORTED_VERSION;
    }

    /**
     * 处理分享的缩略图，根据指定大小缩放，转为byte数组返回
     *
     * @param bitmap
     * @return
     */
    protected byte[] processThumbBitmap(final Bitmap bitmap) {
        float ratio = ((float) bitmap.getWidth()) / bitmap.getHeight();
        int width = (int) (THUMB_SIZE * ratio);

        Bitmap thumbBmp = Bitmap.createScaledBitmap(bitmap, width, THUMB_SIZE, true);
        return bmpToByteArray(thumbBmp, true);
    }

    private byte[] bmpToByteArray(final Bitmap bmp, final boolean needRecycle) {
        int i;
        int j;
        if (bmp.getHeight() > bmp.getWidth()) {
            i = bmp.getWidth();
            j = bmp.getWidth();
        } else {
            i = bmp.getHeight();
            j = bmp.getHeight();
        }

        Bitmap localBitmap = Bitmap.createBitmap(i, j, Bitmap.Config.RGB_565);
        Canvas localCanvas = new Canvas(localBitmap);

        while (true) {
            localCanvas.drawBitmap(bmp, new Rect(0, 0, i, j), new Rect(0, 0,i, j), null);
            if (needRecycle)
                bmp.recycle();
            ByteArrayOutputStream localByteArrayOutputStream = new ByteArrayOutputStream();
            localBitmap.compress(Bitmap.CompressFormat.JPEG, 100,
                    localByteArrayOutputStream);
            localBitmap.recycle();
            byte[] arrayOfByte = localByteArrayOutputStream.toByteArray();
            try {
                localByteArrayOutputStream.close();
                return arrayOfByte;
            } catch (Exception e) {
                //F.out(e);
            }
            i = bmp.getHeight();
            j = bmp.getHeight();
        }
    }

    /**
     * 把网络资源图片转化成bitmap
     *
     * @param url 网络资源图片
     * @return Bitmap
     */
    public Bitmap getLocalOrNetBitmap(String url) {
        Bitmap bitmap = null;
        InputStream in = null;
        BufferedOutputStream out = null;
        try {
            in = new BufferedInputStream(new URL(url).openStream(), 1024);
            final ByteArrayOutputStream dataStream = new ByteArrayOutputStream();
            out = new BufferedOutputStream(dataStream, 1024);
            copy(in, out);
            out.flush();
            byte[] data = dataStream.toByteArray();
            bitmap = BitmapFactory.decodeByteArray(data, 0, data.length);
            data = null;
            return bitmap;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private void copy(InputStream in, OutputStream out) throws IOException {
        byte[] b = new byte[1024];
        int read;
        while ((read = in.read(b)) != -1) {
            out.write(b, 0, read);
        }
    }
}
