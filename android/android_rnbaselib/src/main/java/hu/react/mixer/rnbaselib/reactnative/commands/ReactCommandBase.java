package hu.react.mixer.rnbaselib.reactnative.commands;

import java.io.Serializable;

/**
 * Created by hufuyi on 2018/1/5.
 */

public class ReactCommandBase implements Serializable {
    private static final long serialVersionUID = 1L;
    private String id;
    public String getCmdID(){
        return id;
    }
}
