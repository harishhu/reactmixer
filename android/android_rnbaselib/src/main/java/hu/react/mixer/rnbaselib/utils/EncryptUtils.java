package hu.react.mixer.rnbaselib.utils;


import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class EncryptUtils {
	private static byte[] iv = { 1, 2, 3, 4, 5, 6, 7, 8 };

	public static byte[] encryptDES(byte[] encryptString, String encryptKey)
			throws Exception {
		// IvParameterSpec zeroIv = new IvParameterSpec(new byte[8]);
		//RNLog.d("encryptDES = " + encryptString + " encryptKey = " + encryptKey);
		//RNLog.d("encryptDES thread id = " + Thread.currentThread().getId());
		IvParameterSpec zeroIv = new IvParameterSpec(iv);
		SecretKeySpec key = new SecretKeySpec(encryptKey.getBytes(), "DES");
		Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
		cipher.init(Cipher.ENCRYPT_MODE, key, zeroIv);
		byte[] encryptedData = cipher.doFinal(encryptString);

		//return encryptedData;
		return Base64.encode(encryptedData).getBytes();
	}

	public static byte[] decryptDES(byte[] decryptString, String decryptKey)
			throws Exception {
		//RNLog.d("harish3", "decryptDES = " + new String(decryptString) + " encryptKey = " + decryptKey);
		byte[] byteMi = Base64.decode(decryptString);
		IvParameterSpec zeroIv = new IvParameterSpec(iv);
		// IvParameterSpec zeroIv = new IvParameterSpec(new byte[8]);
		SecretKeySpec key = new SecretKeySpec(decryptKey.getBytes(), "DES");
		Cipher cipher = Cipher.getInstance("DES/CBC/PKCS5Padding");
		cipher.init(Cipher.DECRYPT_MODE, key, zeroIv);
		byte decryptedData[] = cipher.doFinal(byteMi);
		return decryptedData;
	}

	private static byte[] getRawKey(byte[] seed) throws Exception {
		// TODO Auto-generated method stub
		KeyGenerator kgen = KeyGenerator.getInstance("AES");
		SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
		sr.setSeed(seed);
		kgen.init(128, sr);
		SecretKey sKey = kgen.generateKey();
		byte[] raw = sKey.getEncoded();

		return raw;
	}

	public static byte[] encryptAES(byte[] raw, byte[] key, byte[] aesiv) throws Exception {
		SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");
//        Cipher cipher = Cipher.getInstance("AES");
		//byte[] rawKey = getRawKey(key);
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		cipher.init(Cipher.ENCRYPT_MODE, skeySpec, new IvParameterSpec(aesiv));
		byte[] encrypted = cipher.doFinal(raw);
		byte[] base64 = Base64.encode(encrypted).getBytes();

		//RNLog.d("harish11", "asestart base64 " + new String(base64));
		return base64;
	}

	public static byte[] decryptAES(byte[] raw, byte[] key, byte[] aesiv)
			throws Exception {
		//RNLog.d("harish11", "asestart decrypt " + new String(raw));
		byte[] byteMi = Base64.decode(raw);
		SecretKeySpec skeySpec = new SecretKeySpec(key, "AES");
//        Cipher cipher = Cipher.getInstance("AES");
		Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
		cipher.init(Cipher.DECRYPT_MODE, skeySpec, new IvParameterSpec(aesiv));
		byte[] decrypted = cipher.doFinal(byteMi);
		//RNLog.d("harish11", "aesstart aes result = " + new String(decrypted));
		return decrypted;
	}

	/**
	 * 加密日志
	 * @param data
	 * @return
     */
	public static native byte[] encryptLog(byte[] data);

	//public static native byte[] decryptLog(byte[] data, byte[] key);
}