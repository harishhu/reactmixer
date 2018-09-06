
class TaskCenterJSInterface{
  defaultProps = {
    native:"ZAJSTaskCenterInterface_native",
    web: "ZAJSTaskCenterInterface_web"
  }

  constructor(){
    // window[this.props.]
    window[this.defaultProps.web] = {};

    this.web = window[this.defaultProps.web];
    this.native = undefined;
  }

  checkNative(){
    if(!this.native){
      this.native = window[this.defaultProps.native];
    }
  }

  gotoTaskEntry(json){
    this.checkNative();

    if(this.native){
      this.native.gotoTaskEntry(json);
    }
  }

  takeTaskAward(json){
    this.checkNative();

    if(this.native){
      this.native.takeTaskAward(json);
    }
  }

  changeMissionAward(json){
    console.log('change mission award = ' + json);
    this.checkNative();

    if(this.native){
      this.native.changeMissionAward(json);
    }
  }
}

var teskcenter = new TaskCenterJSInterface();
export default teskcenter;
