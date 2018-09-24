const fs = require('fs');
var archiver = require('archiver');
const fileutils = require('./fileutils');
const isWindows = process.platform === 'win32';
const fileseperator = isWindows ? '\\' : '/';

class MakeOutput{
    constructor(applet, outputpath, projectpath){
        this.applet = applet;

        this.outputpath = outputpath + fileseperator + applet.name + fileseperator;
        fileutils.mkdirsSync(this.outputpath);

        this.projectpath = projectpath;
    }

    static make(applet, outputpath, projectpath){
        console.log('start make applet: ' + applet.name);
        let m = new MakeOutput(applet, outputpath, projectpath);
        m.outputJsbundle();
        m.outputResFiles();
        m.makeZip();
    }

    outputJsbundle(){
        fs.writeFileSync(this.outputpath + this.applet.name, this.applet.modulecode.join('\n'));
        fs.writeFileSync(this.outputpath + 'package.json', fs.readFileSync(this.projectpath + this.applet.subpath + fileseperator + 'package.json'));
    }

    copyResFile(resname) {
        let outdir = this.outputpath + '/res/';
        fileutils.mkdirsSync(outdir);

        let patharray = resname.split(fileseperator);
        fs.writeFileSync(outdir + patharray.join('#'), fs.readFileSync(this.projectpath + resname));

        if (resname.indexOf('@') > 0) {
            let r1 = '@3';
            let r2 = '@2';
            if (resname.indexOf('@2') > 0) {
                r1 = '@2';
                r2 = '@3';
            }

            resname = resname.replace(r1, r2);
            let respath = this.projectpath + resname;

            if (fs.existsSync(respath)) {
                patharray = resname.split(fileseperator);
                fs.writeFileSync(outdir + patharray.join('#'), fs.readFileSync(respath));
            }
        }
    }

    outputResFiles() {
        let moduleres = this.applet.moduleres;
        for (let index in moduleres) {
            this.copyResFile(moduleres[index]);
        }
    }

    makeZip() {
        // create a file to stream archive data to.
        var output = fs.createWriteStream(this.outputpath + '/../' + this.applet.name + '@' + this.applet.version + '.zip');
        var archive = archiver('zip', {
            zlib: {
                level: 9
            } // Sets the compression level.
        });

        // listen for all archive data to be written
        // 'close' event is fired only when a file descriptor is involved
        output.on('close',  () => {
            // console.log(archive.pointer() + ' total bytes');            
            setTimeout(()=>{
                this.deleteMakeFiles();
                console.log('applet ' + this.applet.name + ' has been finalized and the output file descriptor has closed.');
            }, 2000);
        });

        // This event is fired when the data source is drained no matter what was the data source.
        // It is not part of this library but rather from the NodeJS Stream API.
        // @see: https://nodejs.org/api/stream.html#stream_event_end
        output.on('end', function () {
            console.log('Data has been drained');
        });

        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        archive.on('warning', function (err) {
            if (err.code === 'ENOENT') {
                // log warning
            } else {
                // throw error
                throw err;
            }
        });

        // good practice to catch this error explicitly
        archive.on('error', function (err) {
            throw err;
        });

        // pipe archive data to the file
        archive.pipe(output);

        // append a file from stream
        var packagefile = this.outputpath + 'package.json';
        archive.append(fs.createReadStream(packagefile), {
            name: 'package.json'
        });

        var jsfile = this.outputpath + this.applet.name;
        archive.append(fs.createReadStream(jsfile), {
            name: "applet.jsbundle"
        });
      
        // append files from a sub-directory and naming it `new-subdir` within the archive
        if (fs.existsSync(this.outputpath + 'res/')) {
            archive.directory(this.outputpath + 'res/', 'res');
        }

        // finalize the archive (ie we are done appending files but streams have to finish yet)
        // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
        archive.finalize();
    }

    deleteMakeFiles(){
        fileutils.removeDir(this.outputpath);
    }
}

module.exports = MakeOutput;