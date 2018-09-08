package hu.react.mixer.rnbaselib.net;

import java.io.IOException;
import java.net.InetAddress;
import java.net.Socket;
import java.net.UnknownHostException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;

/**
 * Created by za-wanghe on 2017/7/5.
 */

public class ZASSLSocketFactory extends SSLSocketFactory {

    private SSLContext sslContext;
    private SSLSocketFactory factory;

    private static ZASSLSocketFactory instance;

    public static ZASSLSocketFactory getInstance() {
        if (instance == null) {
            instance = new ZASSLSocketFactory();
        }
        return instance;
    }

    private ZASSLSocketFactory() {
        try {
            sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, new TrustManager[]{ZATrustManager.getInstance()}, null);
            factory = sslContext.getSocketFactory();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (KeyManagementException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String[] getDefaultCipherSuites() {
        if (factory != null) {
            return factory.getDefaultCipherSuites();
        }
        return new String[0];
    }

    @Override
    public String[] getSupportedCipherSuites() {
        if (factory != null) {
            factory.getSupportedCipherSuites();
        }
        return new String[0];
    }

    @Override
    public Socket createSocket(Socket s, String host, int port, boolean autoClose) throws IOException {
        if (factory != null) {
            return factory.createSocket(s, host, port, autoClose);
        }
        return null;
    }

    @Override
    public Socket createSocket(String host, int port) throws IOException, UnknownHostException {
        if (factory != null) {
            return factory.createSocket(host, port);
        }
        return null;
    }

    @Override
    public Socket createSocket(String host, int port, InetAddress localHost, int localPort) throws IOException, UnknownHostException {
        if (factory != null) {
            return createSocket(host, port, localHost, localPort);
        }
        return null;
    }

    @Override
    public Socket createSocket(InetAddress host, int port) throws IOException {
        if (factory != null) {
            return factory.createSocket(host, port);
        }
        return null;
    }

    @Override
    public Socket createSocket(InetAddress address, int port, InetAddress localAddress, int localPort) throws IOException {
        if (factory != null) {
            return factory.createSocket(address, port, localAddress, localPort);
        }
        return null;
    }
}
