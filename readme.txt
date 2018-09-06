先安装npm和node，具体网上搜，资料很多

接着cd到工程根目录，执行
npm install
下载工程所依赖的node模块

接着执行
react-native run-android --variant=devDebug 开始编译并启动应用
react-native run-ios  开始编译并启动应用

启动服务：
npm start

编译h5:
npm run start_h5
编译成功后，在浏览器打开http://localhost:8080/login

常见问题：
ios：
出错：xcrun: error: unable to find utility "instruments", not a developer tool or in PATH
解决方法：在 终端执行如下命令 sudo xcode-select -s /Applications/Xcode.app/Contents/Developer/

错误：“RCTBundleURLProvider.h” file not found - AppDelegate.m
解决方法: 执行react-native upgrade，然后重新打开xcode即可解决
