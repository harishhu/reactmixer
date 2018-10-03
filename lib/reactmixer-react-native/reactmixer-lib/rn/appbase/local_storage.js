import React from 'react';

const { NativeInterface } = global.reactmixer;

const LOCAL_STORAGE_ID = 'local_storage';

/**
 * React Native本地存儲類，Android和IOS分別native實現。
 * Android和IOS在實現相關功能時，需要對域做區分，每個用戶數據各自獨立。
 * 如果沒有登錄，則存儲到默認域中
 * 用法如下：
 * LocalStorage.get('key').then(result => {
 *      todo result
 * });
 */
class LocalStorage {
    /**
     * 存儲
     * @param key
     * @param value
     * @returns {*|Promise}
     */
    put(key: string, value: Object) {
        let cmd = this._createCommand('put', key, value);
        return new Promise((resolve, reject) => {
            NativeInterface.command2Native(cmd, (body) => {
                resolve(body);
            });
        });
    }

    /**
     * 獲取
     * @param key
     * @returns {*|Promise}
     */
    get(key: string) {
        let cmd = this._createCommand('get', key);
        return new Promise((resolve) => {
            NativeInterface.command2Native(cmd, (body) => {
              resolve(body);
            });
        });
    }

    /**
     * 刪除制定數據
     * @param key
     * @returns {*|Promise}
     */
    remove(key: string) {
        let cmd = this._createCommand('remove', key);
        return new Promise((resolve => NativeInterface.command2Native(cmd, body => resolve(body))));
    }

    /**
     * 清空存儲
     */
    clear() {
        return new Promise((resolve => NativeInterface.command2Native(this._createCommand('clear'), body => resolve(body))));
    }

    /**
     * 追加到列表
     * key對應的數據是個list，將item追加到list的末尾
     * @param key
     * @param item
     */
    // append(key: string, item: Object) {
    //     return new Promise((resolve => NativeInterface.command2Native(this._createCommand('append', key, item), body => resolve(body))));
    // }

    /**
     * 獲取所有的key列表
     */
    keySets() {
        return new Promise((resolve => NativeInterface.command2Native(this._createCommand('keySets'), body => resolve(body))));
    }

    _createCommand(type: string, key: string, data: Object){
        let cmd = {
            id: LOCAL_STORAGE_ID,
            params: {
                type: type,
                key: key,
                data: data,
            }
        };
        return cmd;
    }
}

module.exports = new LocalStorage();
