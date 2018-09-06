# 1. 其他
<!-- TOC -->

- [1. 其他](#1-其他)
    - [1.1. 本地存储 - LocalStorage](#11-本地存储---localstorage)
    - [1.2. Base64](#12-base64)
    - [1.3. toast&progress - UIBase](#13-toastprogress---uibase)
    - [1.4. Utils](#14-utils)

<!-- /TOC -->
## 1.1. 本地存储 - LocalStorage
函数 | 描述
:- | :-
put(key: string, value: Object) |存储数据
get(key: string)|获取已存储的数据
remove(key: string)|清除指定数据
clear()|清空本地存储
## 1.2. Base64
函数 | 描述
:- | :-
encode(input) |base64编码
decode(input)|base64解码
## 1.3. toast&progress - UIBase
函数 | 描述
:- | :-
showToast(text:string) |显示toast
showProgress(status:boolean)|是否显示loading框
## 1.4. Utils
函数 | 描述
:- | :-
getUrlParam(url, paramname) |获取url的指定属性值
removeArrayItemByValue(array, val)|将数组内的指定数据删除
Json2Obj(json)|json转obj
Obj2Json(obj)|obj转json
