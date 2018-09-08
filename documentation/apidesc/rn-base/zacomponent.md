#ZAComponent
React Mixer 所有路由页面必须派生自ZAComponent
函数介绍:

函数 | 参数 | 描述
:- | :- | :-
onBackResult|data:返回数据|如果当前页面调用this.navigator.setBackResultData设置数据，则在当前页面销毁后，上一页面的onBackResult会被回调并得到之前设置的数据
showToast|toast|显示toast
showProgress|show|显示和隐藏progress
属性介绍:

属性 | 描述
:- | :-
zastrings|字符串管理对象，用于获取字符串资源
navigator|导航栏对象
launchData|启动参数，如果页面被启动时，指定了启动参数，可通过该对象获取
screenWidth|屏幕宽度
screenHeight|屏幕高度
dcprops|如果页面配置时，配置了对应的DataController，这个对象则保存DataController.initprops2render返回的props对象数据
