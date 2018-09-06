export default class MyNavigator{
  constructor(){

  }

  initHandleNativeBack(){
  }

  getPageAtStack(){
  }

  popUpPageStack(){
  }

  goBack(){
  }

  setTitle(value){
  }

  navigate(pagename){
    if(this.history){
      this.history.push(pagename);
    }
  }

  setLeftNaviItem(icon, name, callback){
  }
}
