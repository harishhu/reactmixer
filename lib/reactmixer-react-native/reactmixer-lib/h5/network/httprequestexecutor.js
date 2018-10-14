import sendrequest from './sendrequest_h5';

class HttpRequestExecutor {
    constructor() {
        this.sendRequest = sendrequest;
        this.defaultHeaderSetter = undefined;
        this.needDelayHttpRequest = false;
    }

    defaultHttpHeadersConstructor(defaultSetter){
        this.defaultHeaderSetter = defaultSetter;
    }

    getDefaultHttpHeaders(){
        if(this.defaultHeaderSetter){
            return this.defaultHeaderSetter();
        }
    }

    executor(requestitem) {
        if (this.sendRequest) {
            if (this.needDelayHttpRequest) {
                setTimeout(() => {
                    this.sendRequest.call(this, requestitem.sendData, requestitem.hostUrl(), requestitem.buildHttpHeader(), requestitem.callback);
                }, 200)
            } else {
                this.sendRequest.call(this, requestitem.sendData, requestitem.hostUrl(), requestitem.buildHttpHeader(), requestitem.callback);
            }
        }
    }
}

module.exports = new HttpRequestExecutor();