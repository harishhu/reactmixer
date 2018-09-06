var fs=require('fs');
var http = require('https');
var unzip = require("unzip2");

// App variables
var file_url = 'https://uat.zhongan.com/app/zatech/appsdk/zakjlib/zatech-react-native.zip';

class zakjlibs{
  constructor(){
    this.checkNodeModule();
  }

  checkNodeModule(){
    fs.exists("./node_modules/react-native", (exists)=>{
      if(!exists){
        console.log('please install dependency node libraries for this module at first!');
      }else{
        this.checkZAReactNativeDir();
      }
    });
  }

  checkZAReactNativeDir(){
    let filepath = './node_modules/zatech-react-native';
    fs.exists(filepath, (exists) => {
      if(exists){
        console.log('begin to remove existing zatech-react-native files');
        removeDir('./node_modules/zatech-react-native');
        console.log('remove success');
      }

      console.log('start downloading....');
      var req = http.get(file_url, (res) => {
        var imgData = "";
        res.setEncoding("binary");//一定要设置response的编码为binary否则会下载下来的图片打不开
        res.on("data", function (chunk) {
          imgData += chunk;
        });
        res.on("end", function () {
          fs.writeFile(filepath + '.zip', imgData, "binary", function (err) {
            if (err) {
              console.log("download failed");
              return;
            }

            console.log("download success");
            fs.createReadStream(filepath + '.zip').pipe(unzip.Extract({ path: './node_modules' }));
            console.log("zatech-react-native library update finish");
            fs.unlinkSync(filepath + '.zip');
          });
        });
        res.on("error",function (err) {
          console.log("网络请求失败");
        });
      });
    });
  }
}
//functions
/*
* 递归函数实现删除目录及子目录及文件
* 思路：
* 1) 给一个参数：是文件夹
* 2) 定义递归函数 del
* 3) 查看文件夹里面有没有子目录或文件
* fs.readdirSync()
* 4) 判断是否有子目录或子文件夹，如果有：
* 遍历数组，判断是不是文件或目录
* stats=fs.statSync('文件路径')
* stats.isFile()
* 5) 如果是文件，就删除
* fs.unlinkSync()
* 6) 如果是目录，调用自己（递归入口）
* 7) 删除空目录
* fs.rmdirSync()
*
* 注意：不能使用异步方式，因为要递归
*/
function removeDir(p){
  var arr=fs.readdirSync(p);
  for(var i in arr){
    //读取文件信息，以便于判断是否是一个文件或目录
    var stats=fs.statSync(p+'/'+arr[i]);

    if(stats.isFile()){
      //判断为真，是文件则执行删除文件
      fs.unlinkSync(p+'/'+arr[i]);
    }else{
      //判断为假就是文件夹，就调用自己，递归的入口
      removeDir(p+'/'+arr[i]);
    }
  }
  //删除空目录
  fs.rmdirSync(p);
}

var dd = new zakjlibs();
module.exports = dd;
