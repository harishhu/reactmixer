package hu.react.mixer.rnbaselib.core;

import java.io.Serializable;

/**
 * Created by harishhu on 2017/4/19.
 */

public class DataBaseItem implements Serializable {
    private static final long serialVersionUID = 1L;

    protected int pageIndex = -1;
    protected int pageTotal = -1;

    public int getPageIndex(){
        return pageIndex;
    }

    public int getPageTotal(){
        return pageTotal;
    }

    public void setPageIndex(int index){
        pageIndex = index;
    }

    public void setPageTotal(int total){
        pageTotal = total;
    }
}
