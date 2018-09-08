package hu.react.mixer.rnbaselib.net;

import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.X509TrustManager;

import hu.react.mixer.rnbaselib.utils.RNLog;

import hu.react.mixer.rnbaselib.utils.RNLog;

/**
 * Created by za-wanghe on 2017/7/5.
 */

public class ZATrustManager implements X509TrustManager {

    private static final String TAG = "ZATrustManager";

    private static ZATrustManager trustManager;

    public static ZATrustManager getInstance() {
        if (trustManager == null) {
            trustManager = new ZATrustManager();
        }
        return trustManager;
    }

    private ZATrustManager() {}

    @Override
    public void checkClientTrusted(X509Certificate[] chain, String authType) throws CertificateException {
        RNLog.i(TAG, "checkClientTrusted");
    }

    @Override
    public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
        RNLog.i(TAG, "checkServerTrusted");
    }

    @Override
    public X509Certificate[] getAcceptedIssuers() {
        RNLog.i(TAG, "X509Certificate");
        return new X509Certificate[0];
    }
}
