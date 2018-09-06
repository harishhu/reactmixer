#RequestItemBase
所有自定义的http请求必须派生自RequestItemBase：

函数 | 参数 | 描述
:- | :- | :-
hostUrl|无|返回http host url
buildHttpHeader|无|返回http request header
setRequestCallback|callback|设置请求回调函数，回调格式参考自定义http请求章节
setSendData|data|设置发送数据
run|无|执行请求
