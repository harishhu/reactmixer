import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './dialog.scss';

class Dialog{
  constructor(){
    this.isshowing = false;
    this.isdismissed = false;

    this.dialog = null;
    this.contentview = null;
  }

  setContentView(contentview){
    this.contentview = contentview;
  }

  show(){
    if(this.isshowing){
      return;
    }

    //alert('dialog show');
    console.log('dialog show');

    this.isshowing = true;

    let app = $('#app');
    $('.dialog', app).remove();

    this.dialog = $('<div class="dialog"></div>');
    this.contentparent = $('<div class="content"/>');

    if(this.contentview){
      this.contentparent.append(this.contentview);
    }

    this.dialog.append(this.contentparent);
    app.append(this.dialog);
  }

  dismiss(){
    if(this.isdismissed){
      return;
    }

    this.isdismissed = true;
    $('.dialog', '#app').remove();
  }
}

export default Dialog;
