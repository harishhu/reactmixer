package hu.react.mixer.rnbaselib.supports.share.wxshare;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by harishhu on 2016/1/8.
 */
public class LocalShareData implements Parcelable{
    public static final int SHARE_SUCCESS = 1;
    public static final int SHARE_FAILED = 0;
    public static int TYPE_TEXT=0;
    public static int TYPE_IMAGE=1;
    public static int TYPE_VIDEO=2;
    public static int TYPE_MUSIC=3;
    public static int TYPE_URL=4;
    public static int TYPE_MINI=6;

    public int[] typeSet;
    public String url;//网页路径
    public String imageUrl;//图片路径
    public String title;//分享的标题
    public String desc;//分享的简述
    public String callback;//分享回调
    public String userName;//小程序原始id
    public String shareType = "";//分享的方式
    public String webPageUrl;
    public String path;//分享小程序的路径
    public int type;//分享的种类（如：image）

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i) {
        if (typeSet != null){
            parcel.writeInt(typeSet.length);

            for (int type : typeSet){
                parcel.writeInt(type);
            }
        }else{
            parcel.writeInt(0);
        }

        parcel.writeString(url);
        parcel.writeString(imageUrl);
        parcel.writeString(title);
        parcel.writeString(desc);
        parcel.writeString(webPageUrl);
        parcel.writeString(path);
        parcel.writeString(callback);
        parcel.writeString(userName);
        parcel.writeInt(type);
    }

    public static final Creator<LocalShareData> CREATOR = new Creator<LocalShareData>()
    {
        @Override
        public LocalShareData[] newArray(int size)
        {
            return new LocalShareData[size];
        }

        @Override
        public LocalShareData createFromParcel(Parcel in)
        {
            return new LocalShareData(in);
        }
    };

    public LocalShareData(Parcel in)
    {
        int size = in.readInt();
        typeSet = new int[size];
        for (int index = 0; index < size; index++){
            int value = in.readInt();
            typeSet[index] = value;
        }

        url = in.readString();
        imageUrl = in.readString();
        title = in.readString();
        desc = in.readString();
        webPageUrl = in.readString();
        path = in.readString();
        callback = in.readString();
        userName = in.readString();
        type = in.readInt();
    }

    public LocalShareData()
    {
        typeSet = new int[0];
        url = "";
        imageUrl = "";
        title = "";
        desc = "";
        callback = "";
        webPageUrl = "";
        path = "";
        userName = "";
        type = 0;
    }
}
