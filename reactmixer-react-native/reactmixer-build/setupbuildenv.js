#!/usr/bin/env node
const fileutils = require('./fileutils');
const buildtt = require('./buildhelper');

console.log('project path = ' + process.cwd());

const prjpath = process.cwd();
const nodepath = prjpath + '/node_modules'
const reactmixerbuildpath = nodepath + '/reactmixer-react-native/reactmixer-build'

fileutils.mkdirsSync(prjpath + '/build/android/reactnative');
fileutils.mkdirsSync(prjpath + '/build/ios/reactnative');
fileutils.mkdirsSync(prjpath + '/build/rn-applets');

fileutils.copyfile(reactmixerbuildpath + "/nodedepfiles/buildBundle.js", nodepath + '/react-native/local-cli/bundle', 'buildBundle.js');
fileutils.copyfile(reactmixerbuildpath + "/nodedepfiles/createModuleIdFactory.js", nodepath + '/metro/src/lib', 'createModuleIdFactory.js');
fileutils.copyfile(reactmixerbuildpath + "/nodedepfiles/Serializers.js", nodepath + '/metro/src/deltabundler/serializers', 'Serializers.js');
