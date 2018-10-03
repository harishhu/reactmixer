const {
    ZAString
} = global.reactmixer;

class AppModule{
    constructor(){
    }
    /**
     * return module name of module
    */
    getName(){
    }
    /**
     * return page router of module
    */
    getPageRouter(){
    }
    /**
     * the entry of module, it must be invoked at module is mounted 
    */
    entry(){
    }

    registerLangSource(type, data){
        ZAString.registerAppModuleStr(this.getName(), type, data);
    }
  
    setDefaultLang(type){
      ZAString.setDefaultLang(type);
    }

    setHttpHeadersGenerator(fun){
        this.httpHeadersGenerator = fun;
    }
}

module.exports = AppModule;