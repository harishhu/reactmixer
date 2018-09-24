var fs = require('fs');
var path = require("path"); 

function copyfile(from, todir, filename) {
    fs.exists(todir + "/.mpindex", (exists) => {
        if (exists) {
            console.log('the file was already copied, ignore.....');
            return;
        } else {
            fs.writeFileSync(todir + "/" + filename, fs.readFileSync(from));
            fs.writeFileSync(todir + "/.mpindex",'flag');
        }
    });
}

function copyfilewithoutcheck(from, todir, filename) {
    fs.writeFileSync(todir + "/" + filename, fs.readFileSync(from));
}
 
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
}

//functions
/** 递归函数实现删除目录及子目录及文件* 思路：
 * 1) 给一个参数：是文件夹
 * 2) 定义递归函数 del
 * 3) 查看文件夹里面有没有子目录或文件
 *    fs.readdirSync()
 * 4) 判断是否有子目录或子文件夹，如果有：
 * * 遍历数组，判断是不是文件或目录* stats=fs.statSync('文件路径')* stats.isFile()* 
 * 5) 如果是文件，就删除* fs.unlinkSync()* 6) 如果是目录，调用自己（递归入口）*
 * 7) 删除空目录* fs.rmdirSync()** 注意：不能使用异步方式，因为要递归
 * */
function removeDir(p) {
    if (!fs.existsSync(p)) {
        return;
    }

    var arr = fs.readdirSync(p);
    for (var i in arr) {
        //读取文件信息，以便于判断是否是一个文件或目录    
        var stats = fs.statSync(p + '/' + arr[i]);
        if (stats.isFile()) {
            //判断为真，是文件则执行删除文件     
            fs.unlinkSync(p + '/' + arr[i]);
        } else {
            //判断为假就是文件夹，就调用自己，递归的入口     
            removeDir(p + '/' + arr[i]);
        }
    }
    //删除空目录  
    fs.rmdirSync(p);
}

function removeFile(file){
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
    }
}

module.exports = {
    copyfile : copyfile,
    mkdirsSync: mkdirsSync,
    removeDir: removeDir,
    removeFile: removeFile,
    copyfilewithoutcheck: copyfilewithoutcheck
};