package hu.reactmixer.reactnativebuildhost;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.EditText;

import com.tbruyelle.rxpermissions.RxPermissions;

import hu.react.mixer.rnbaselib.core.ZAReactNative;
import hu.react.mixer.rnbaselib.utils.Utils;
import rx.functions.Action1;

public class MainActivity extends Activity {
    static final String KEY_RNSERVER = "rnserver";
    static final String KEY_RNMODULE = "rnmodule";

    private EditText rnserverEdit;
    private EditText moduleNameEdit;

    private String defaultserver;
    private String defaultmodulename;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        rnserverEdit = findViewById(R.id.rnserver_edit);
        moduleNameEdit = findViewById(R.id.module_edit);

        defaultserver = getConfigData(KEY_RNSERVER);
        defaultmodulename = getConfigData(KEY_RNMODULE);

        if (defaultserver.length() > 0){
            rnserverEdit.setText(defaultserver);
        }

        if (defaultmodulename.length() > 0){
            moduleNameEdit.setText(defaultmodulename);
        }

        rnserverEdit.addTextChangedListener(new TextWatcher() {
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
            }

            @Override
            public void beforeTextChanged(CharSequence s, int start, int count,
                                          int after) {
            }

            @Override
            public void afterTextChanged(Editable s) {
                Log.i("rn", "输入rn server = " + s.toString());
                defaultserver = s.toString();
                saveConfigData(KEY_RNSERVER, defaultserver);
            }
        });

        moduleNameEdit.addTextChangedListener(new TextWatcher() {
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
            }

            @Override
            public void beforeTextChanged(CharSequence s, int start, int count,
                                          int after) {
            }

            @Override
            public void afterTextChanged(Editable s) {
                Log.i("rn", "输入 entry module = " + s.toString());
                defaultmodulename = s.toString();
                saveConfigData(KEY_RNMODULE, defaultmodulename);
            }
        });

        findViewById(R.id.open).setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View view) {
                updateRNServerConfig(defaultserver);

                String module = defaultmodulename;
                if (Utils.isEmpty(module)){
                    module = "index";
                }

                ZAReactNative.instance.startRNActivity(MainActivity.this, "io.saadtw.appmain", "default");
//                finish();
            }
        });

        requirePermissions();
    }

    private void requirePermissions(){
        RxPermissions rxPermissions = new RxPermissions(this);

        // checkNeedGrantPermissionSelf();
        rxPermissions.request(Manifest.permission.READ_PHONE_STATE,
                Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.WRITE_EXTERNAL_STORAGE,
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.CAMERA).subscribe(new Action1<Boolean>() {
            @Override
            public void call(Boolean granted) {
                if (!granted) { // 在android 6.0之前会默认返回true
                    finish();
                }else{
                    ZAReactNativeHandler reactNativeHandler = new ZAReactNativeHandler(getApplicationContext());
                }
            }
        });
    }

    private void saveConfigData(String key, String value){
        SharedPreferences sp = getSharedPreferences("data", Context.MODE_PRIVATE);

        SharedPreferences.Editor ed = sp.edit();
        ed.putString(key, value);

        ed.commit();
    }

    private String getConfigData(String key){
        SharedPreferences sp = getSharedPreferences("data", Context.MODE_PRIVATE);
        return sp.getString(key, "");
    }

    private void updateRNServerConfig(String value){
        ZAReactNative.instance.setRNServer(value + ":8081");
    }
}
