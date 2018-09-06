
export default class WebAppLocalStorage{
  constructor(){
  }

  static putData(key, value){
    window.localStorage.setItem(key, value);
  }

  static getData(key){
    return window.localStorage.getItem(key);
  }

  static clearData(key){
    window.localStorage.removeItem(key);
  }
}
