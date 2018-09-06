#RN和原生数据通讯 - NativeInterface
这个类最主要的功能函数是：
```javascript
/**
 * @params
 * cmdData : 命令数据
 * callback: 执行结果回调
*/
command2Native(cmdData, callback)
```
命令数据格式介绍：
```javascript
let cmd = {
          id: 'a custom command',
          params: {
              //define extra params for this command
          }
      };
```
既然是给原生发送数据，那每一个命令都需要在原生有对应的实现，如果不涉及到原生SDK的维护，这个基本用不到
