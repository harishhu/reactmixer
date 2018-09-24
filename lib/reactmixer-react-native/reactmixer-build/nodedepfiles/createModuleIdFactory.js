/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 * @path: metro/src/lib/createModuleIdFactory.js
 */

'use strict';
//modified by harish.hu - 2018-07-24
const zakjbuildhelper = require('./../../../../lib/reactmixer-react-native/reactmixer-build/buildhelper.js');
	
function createModuleIdFactory() {
  return zakjbuildhelper.createModuleIdFactory();
 /* console.log("project path = " + process.cwd())
  let pwdpath = process.cwd();
  const fileToIdMap = new Map();
  let nextId = 0;
  return path => {
  	path = path.replace(pwdpath, "");
    let id = fileToIdMap.get(path);
	console.log("createModuleIdFactory = " + path + ", id = " + id);
	if(path.indexOf('\\app-modules') == 0 || path.indexOf('/app-modules') == 0 || path.indexOf('app-modules') == 0){
		if(id == undefined){
		nextId++;
		id = 10000 + nextId;
		//id = nextId++;
		fileToIdMap.set(path, id);
    }
	}else{
	 if (typeof id !== 'number') {
      id = nextId++;
      fileToIdMap.set(path, id);
    }
		}
    
    return id;
  };*/
}

module.exports = createModuleIdFactory;