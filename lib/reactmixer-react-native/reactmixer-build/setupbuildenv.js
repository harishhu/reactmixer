#!/usr/bin/env node
var arguments = process.argv.splice(2);

let typekey = arguments[0];
let type = arguments[1];

let buildtype = 'rn';

if(typekey == '-t' && type == 'h5'){
    buildtype = 'h5';
}

console.log('build type = ' + buildtype);

const fileutils = require('./fileutils');
    
console.log('project path = ' + process.cwd());
    
const prjpath = process.cwd();
const nodepath = prjpath + '/node_modules'
const reactmixerpath = prjpath + '/lib/reactmixer-react-native'
const reactmixerbuildpath = reactmixerpath + '/reactmixer-build'

console.log('reactmixerpath root path = ' + reactmixerpath)

// if(buildtype == 'h5'){
//     fileutils.copyfilewithoutcheck(reactmixerpath + '/entry-h5.js', reactmixerpath, 'entry.js');
// }else{
//     fileutils.copyfilewithoutcheck(reactmixerpath + '/entry-rn.js', reactmixerpath, 'entry.js');

fileutils.mkdirsSync(prjpath + '/build/android/reactnative');
fileutils.mkdirsSync(prjpath + '/build/ios/reactnative');
fileutils.mkdirsSync(prjpath + '/build/rn-applets');
    
fileutils.copyfile(reactmixerbuildpath + "/nodedepfiles/buildBundle.js", nodepath + '/react-native/local-cli/bundle', 'buildBundle.js');
fileutils.copyfile(reactmixerbuildpath + "/nodedepfiles/createModuleIdFactory.js", nodepath + '/metro/src/lib', 'createModuleIdFactory.js');
fileutils.copyfile(reactmixerbuildpath + "/nodedepfiles/Serializers.js", nodepath + '/metro/src/deltabundler/serializers', 'Serializers.js');    
// }

