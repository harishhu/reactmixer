package io.zhongan.tech.rnbaselib.utils;

import android.content.Context;
import android.graphics.Bitmap;
import android.net.Uri;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.binaryresource.BinaryResource;
import com.facebook.binaryresource.FileBinaryResource;
import com.facebook.cache.common.CacheKey;
import com.facebook.common.executors.UiThreadImmediateExecutorService;
import com.facebook.common.memory.PooledByteBuffer;
import com.facebook.common.memory.PooledByteBufferInputStream;
import com.facebook.common.references.CloseableReference;
import com.facebook.datasource.BaseDataSubscriber;
import com.facebook.datasource.DataSource;
import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.drawee.backends.pipeline.PipelineDraweeController;
import com.facebook.drawee.controller.BaseControllerListener;
import com.facebook.drawee.view.SimpleDraweeView;
import com.facebook.imagepipeline.cache.DefaultCacheKeyFactory;
import com.facebook.imagepipeline.common.ResizeOptions;
import com.facebook.imagepipeline.core.ImagePipeline;
import com.facebook.imagepipeline.core.ImagePipelineFactory;
import com.facebook.imagepipeline.datasource.BaseBitmapDataSubscriber;
import com.facebook.imagepipeline.image.CloseableImage;
import com.facebook.imagepipeline.request.BasePostprocessor;
import com.facebook.imagepipeline.request.ImageRequest;
import com.facebook.imagepipeline.request.ImageRequestBuilder;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.concurrent.Executors;

import io.zhongan.tech.rnbaselib.core.AppEnv;

/**
 * Created by fanjianfeng on 2016/9/13.
 */
public class FrescoUtil {
    public static void displayUrl(SimpleDraweeView draweeView, String url) {
        displayUrl(draweeView, url, null);
    }

    public static void displayUrl(SimpleDraweeView draweeView, String url, BaseControllerListener listener) {
        load(Uri.parse(url), draweeView, null, draweeView.getMeasuredWidth(), draweeView.getMeasuredHeight(), listener);
    }

    public static void load(Uri uri, SimpleDraweeView draweeView, BasePostprocessor processor, int width, int height,
                            BaseControllerListener listener) {
        ResizeOptions resizeOptions = null;
        if (width > 0 && height > 0) {
            resizeOptions = new ResizeOptions(width, height);
        }
        ImageRequest request =
                ImageRequestBuilder.newBuilderWithSource(uri)
                        .setPostprocessor(processor)
                        .setResizeOptions(resizeOptions)
                        //缩放,在解码前修改内存中的图片大小, 配合Downsampling可以处理所有图片,否则只能处理jpg,
                        // 开启Downsampling:在初始化时设置.setDownsampleEnabled(true)
                        .setProgressiveRenderingEnabled(true)//支持图片渐进式加载
                        .setAutoRotateEnabled(true) //如果图片是侧着,可以自动旋转
                        .build();

        PipelineDraweeController controller =
                (PipelineDraweeController) Fresco.newDraweeControllerBuilder()
                        .setImageRequest(request)
                        .setControllerListener(listener)
                        .setOldController(draweeView.getController())
                        .setAutoPlayAnimations(true) //自动播放gif动画
                        .build();

        draweeView.setController(controller);
    }

    /**
     * 根据URL获取Bitmap，本地没有从网络下载，监听会在UI线程执行
     *
     * @param url
     * @param context
     * @param listener
     */
    public static void getBitmapByUrl(final String url, final Context context, final GetBitmapListener listener) {
        getBitmapWithProcessorByUrl(url, context, 0, 0, null, listener);
    }

    /**
     * 根据URL获取Bitmap，本地没有从网络下载，监听会在UI线程执行
     *
     * @param url
     * @param context
     * @param width
     * @param height
     * @param listener
     */
    public static void getBitmapByUrl(final String url, final Context context, final int width, final int height, final GetBitmapListener listener) {
        getBitmapWithProcessorByUrl(url, context, width, width, null, listener);
    }

    /**
     * 根据URL获取Bitmap，本地没有从网络下载，可以通过BasePostprocessor对图片预处理，监听会在UI线程执行
     *
     * @param url
     * @param context
     * @param width
     * @param height
     * @param processor
     * @param listener
     */
    public static void getBitmapWithProcessorByUrl(final String url, final Context context, final int width, final int height, BasePostprocessor processor, final GetBitmapListener listener) {
        ResizeOptions resizeOptions = null;
        if (width != 0 && height != 0) {
            resizeOptions = new ResizeOptions(width, height);
        }
        ImageRequest imageRequest = ImageRequestBuilder.newBuilderWithSource(Uri.parse(url))
                .setProgressiveRenderingEnabled(false) //我们是拿bitmap对象,不是显示,所以这里不需要渐进渲染
                .setPostprocessor(processor)
                .setResizeOptions(resizeOptions)
                .build();
        ImagePipeline imagePipeline = Fresco.getImagePipeline();
        final DataSource<CloseableReference<CloseableImage>> dataSource = imagePipeline.fetchDecodedImage(imageRequest, context);
        dataSource.subscribe(new BaseBitmapDataSubscriber() {
            @Override
            protected void onNewResultImpl(Bitmap bitmap) {
                listener.onSuccess(bitmap);
            }

            @Override
            protected void onFailureImpl(DataSource<CloseableReference<CloseableImage>> dataSource) {
                listener.onFail();
            }
        }, UiThreadImmediateExecutorService.getInstance());
    }


    /**
     * 从网络下载图片
     * 1、根据提供的图片URL，获取图片数据流
     * 2、将得到的数据流写入指定路径的本地文件
     *
     * @param url URL
     */
    public static void downloadImage(Context context, final String url, final onDownLoadImgListener bitmapListener) {
        if (TextUtils.isEmpty(url)) {
            return;
        }

        Uri uri = Uri.parse(url);
        ImagePipeline imagePipeline = Fresco.getImagePipeline();
        ImageRequestBuilder builder = ImageRequestBuilder.newBuilderWithSource(uri);
        ImageRequest imageRequest = builder.build();

        // 获取未解码的图片数据
        DataSource<CloseableReference<PooledByteBuffer>> dataSource = imagePipeline.fetchEncodedImage(imageRequest, context);
        dataSource.subscribe(new BaseDataSubscriber<CloseableReference<PooledByteBuffer>>() {
            @Override
            public void onNewResultImpl(DataSource<CloseableReference<PooledByteBuffer>> dataSource) {
                if (!dataSource.isFinished() || bitmapListener == null) {
                    return;
                }

                CloseableReference<PooledByteBuffer> imageReference = dataSource.getResult();
                if (imageReference != null) {
                    final CloseableReference<PooledByteBuffer> closeableReference = imageReference.clone();
                    try {
                        PooledByteBuffer pooledByteBuffer = closeableReference.get();
                        InputStream inputStream = new PooledByteBufferInputStream(pooledByteBuffer);
                        String fileName = url.substring(url.lastIndexOf("/"), url.length());
                        String photoPath = AppEnv.instance.getImagesDiskCacheDir();
                        File imgFile = new File(photoPath);
                        if (!imgFile.exists()) {
                            imgFile.mkdir();
                        }
                        File file = new File(photoPath, fileName);
                        OutputStream os = new FileOutputStream(file);
                        int bytesRead = 0;
                        byte[] buffer = new byte[8192];
                        while ((bytesRead = inputStream.read(buffer, 0, 8192)) != -1) {
                            os.write(buffer, 0, bytesRead);
                        }
                        os.close();
                        inputStream.close();
                        bitmapListener.onSuccess(file);
                    } catch (IOException e) {
                        bitmapListener.onFail();
                        e.printStackTrace();
                    } finally {
                        imageReference.close();
                        closeableReference.close();
                    }
                }
            }

            @Override
            public void onFailureImpl(DataSource dataSource) {
                if (bitmapListener != null) {
                    bitmapListener.onFail();
                }

                Throwable throwable = dataSource.getFailureCause();
                if (throwable != null) {
                    Log.e("ImageLoader", "onFailureImpl = " + throwable.toString());
                }
            }
        }, Executors.newSingleThreadExecutor());
    }


    /**
     * 从磁盘缓存获取指定URL的图片文件
     *
     * @param url
     * @param context
     * @return
     */
    public static File getFileFromDiskCache(String url, final Context context) {
        File localFile = null;
        if (!TextUtils.isEmpty(url)) {
            CacheKey cacheKey = DefaultCacheKeyFactory.getInstance().getEncodedCacheKey(ImageRequest.fromUri(url), context);
            if (ImagePipelineFactory.getInstance().getMainFileCache().hasKey(cacheKey)) {
                BinaryResource resource = ImagePipelineFactory.getInstance().getMainFileCache().getResource(cacheKey);
                localFile = ((FileBinaryResource) resource).getFile();
            } else if (ImagePipelineFactory.getInstance().getSmallImageFileCache().hasKey(cacheKey)) {
                BinaryResource resource = ImagePipelineFactory.getInstance().getSmallImageFileCache().getResource(cacheKey);
                localFile = ((FileBinaryResource) resource).getFile();
            }
        }
        return localFile;
    }

    public interface GetBitmapListener {
        void onSuccess(Bitmap bitmap);

        void onFail();
    }

    public interface onDownLoadImgListener {

        void onSuccess(File imgFile);

        void onFail();
    }
}
