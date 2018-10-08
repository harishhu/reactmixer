import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './rootsiblings.scss';

class RootSiblings{
  constructor(parent, ele){
    this.isshowing = false;
    this.isdismissed = false;

    this.dialog = null;
    this.contentview = null;

    this.parent = parent;
    this.ele = ele;

    this.show();
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

    // console.log('ele = ' + this.ele);
    // console.log('parent = ' + this.parent);

    ReactDOM.unstable_renderSubtreeIntoContainer(
      this.parent,
      this.ele,
      this.contentparent[0]
     )
  }

  destroy(){
    if(this.isdismissed){
      return;
    }

    this.isdismissed = true;
    $('.dialog', '#app').remove();
  }
}

export default RootSiblings;
