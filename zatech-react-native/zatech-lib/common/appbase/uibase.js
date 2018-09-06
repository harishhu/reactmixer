import Toast from './../../rn/widgets/toast';
import Spinner from './../../rn/widgets/spinner';

class uibase{
  static showToast(text){
    let toast = Toast.show(text, {
        duration: Toast.durations.LONG, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        shadow: true, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
        onShow: () => {
            // toast出现回调（动画开始时）
        },
        onShown: () => {
            // toast出现回调（动画结束时）
        },
        onHide: () => {
            // toast隐藏回调（动画开始时）
        },
        onHidden: () => {
            // toast隐藏回调（动画结束时）
        }
    });

    // 也可以通过调用Toast.hide(toast); 手动隐藏toast实例
    // setTimeout(function () {
    //     Toast.hide(toast);
    // }, 500);
  }

  static showProgress(status){
    if(status){
      Spinner.show();
    }else{
      Spinner.hide();
    }
  }
}

module.exports = uibase;
