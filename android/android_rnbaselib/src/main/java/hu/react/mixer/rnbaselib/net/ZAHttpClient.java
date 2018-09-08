package hu.react.mixer.rnbaselib.net;

import com.squareup.okhttp.OkHttpClient;

import java.util.concurrent.TimeUnit;

/**
 * Created by harishhu on 2015/12/4.
 */
public class ZAHttpClient {
    /**
     * 最大连接数
     */
    public final static int MAX_TOTAL_CONNECTIONS = 400;
    /**
     * 获取连接的最大等待时间
     */
    public final static int WAIT_TIMEOUT = 30000;
    /**
     * 每个路由最大连接数
     */
    public final static int MAX_ROUTE_CONNECTIONS = 200;

    /**
     * 连接超时时间
     */
    public final static int CONNECT_TIMEOUT = 30000;
    /**
     * 读取超时时间
     */
    public final static int READ_TIMEOUT = 30000;

    boolean bCreateNew = true;
    public synchronized void notifyCreateNewHttpClient(){
        bCreateNew = true;
    }

    private OkHttpClient okHttpClient = null;

    public static final ZAHttpClient instance = new ZAHttpClient();
    private ZAHttpClient(){

    }
    /**
     * OkHttpClient
     * @return OkHttpClient
     */
    public synchronized OkHttpClient getOkHttpClient() {
        if (okHttpClient == null){
            okHttpClient = new OkHttpClient();
            okHttpClient.setSslSocketFactory(ZASSLSocketFactory.getInstance());
            okHttpClient.setConnectTimeout(CONNECT_TIMEOUT, TimeUnit.MILLISECONDS);
            okHttpClient.setReadTimeout(READ_TIMEOUT,TimeUnit.MILLISECONDS);

        }

        return okHttpClient;
    }

//    private static class SSLSocketFactoryEx extends SSLSocketFactory {
//        SSLContext sslContext = SSLContext.getInstance("TLS");
//
//        public SSLSocketFactoryEx(KeyStore truststore)
//                throws NoSuchAlgorithmException, KeyManagementException,
//                KeyStoreException, UnrecoverableKeyException {
//            super(truststore);
//
//            TrustManager tm = new X509TrustManager() {
//
//                public java.security.cert.X509Certificate[] getAcceptedIssuers() {
//                    return null;
//                }
//
//                @Override
//                public void checkClientTrusted(
//                        java.security.cert.X509Certificate[] chain, String authType)
//                        throws java.security.cert.CertificateException {
//                }
//
//                @Override
//                public void checkServerTrusted(
//                        java.security.cert.X509Certificate[] chain, String authType)
//                        throws java.security.cert.CertificateException {
//                }
//            };
//
//            sslContext.init(null, new TrustManager[] { tm }, null);
//        }
//
//        @Override
//        public Socket createSocket(Socket socket, String host, int port,
//                                   boolean autoClose) throws IOException, UnknownHostException {
//            return sslContext.getSocketFactory().createSocket(socket, host, port,
//                    autoClose);
//        }
//
//        @Override
//        public Socket createSocket() throws IOException {
//            return sslContext.getSocketFactory().createSocket();
//        }
//    }

//    private static HttpClient getNewHttpClient() {
//        try {
//            KeyStore trustStore = KeyStore.getInstance(KeyStore
//                    .getDefaultType());
//            trustStore.load(null, null);
//
//            SSLSocketFactory sf = new SSLSocketFactoryEx(trustStore);
//            sf.setHostnameVerifier(SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
//
//            HttpParams httpParams = new BasicHttpParams();
//
//            // 设置一些基本参数
//            HttpProtocolParams.setVersion(httpParams, HttpVersion.HTTP_1_1);
//            HttpProtocolParams.setContentCharset(httpParams, HTTP.UTF_8);
//            HttpProtocolParams.setUseExpectContinue(httpParams, false);
//            HttpProtocolParams
//                    .setUserAgent(
//                            httpParams,
//                            "Mozilla/5.0(Linux;U;Android 4.4.2;en-us;Nexus One Build.FRG83) "
//                                    + "AppleWebKit/553.1(KHTML,like Gecko) Version/4.0 Mobile Safari/533.1");
//
//            // 设置最大连接数
//            ConnManagerParams.setMaxTotalConnections(httpParams,
//                    MAX_TOTAL_CONNECTIONS);
//            // 设置获取连接的最大等待时间
//            ConnManagerParams.setTimeout(httpParams, WAIT_TIMEOUT);
//            // 设置每个路由最大连接数
//            ConnManagerParams.setMaxConnectionsPerRoute(httpParams,
//                    new ConnPerRouteBean(MAX_ROUTE_CONNECTIONS));
//
//            // 设置连接超时时间
//            HttpConnectionParams.setConnectionTimeout(httpParams,
//                    CONNECT_TIMEOUT);
//            // 设置读取超时时间
//            HttpConnectionParams.setSoTimeout(httpParams, READ_TIMEOUT);
//
//            SchemeRegistry registry = new SchemeRegistry();
//            registry.register(new Scheme("http", PlainSocketFactory
//                    .getSocketFactory(), 80));
//            registry.register(new Scheme("https", sf, 443));
//
//            ClientConnectionManager ccm = new ThreadSafeClientConnManager(
//                    httpParams, registry);
//
//            return new DefaultHttpClient(ccm, httpParams);
//        } catch (Exception e) {
//            return new DefaultHttpClient();
//        }
//    }
}
