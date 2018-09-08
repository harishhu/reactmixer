import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import Dialog from './../dialog/dialog';

import './alertdialog.scss';

export default class AlertDialog extends Dialog{
  constructor(){
    super();

    this.contentview = $('<div class="alertdialog"/>');
    this.contentview.append(this.makeSeparator('23px'));

    this.textcontentbox = $('<div class="textcontentbox"/>');

    this.contentview.append(this.textcontentbox);

    this.titleBox = $('<div class="titlebox"/>');
    this.msgBox = $('<div class="msgbox"/>');
  }

  makeSeparator(height){
    let t = '<div style="height:' + height + ';"><div/>';
    return $(t);
  }

  setTitle(title){
    let t = '<a>' + title + '</a>';
    this.titleBox.append($(t));

    this.textcontentbox.append(this.titleBox);
    this.textcontentbox.append(this.makeSeparator('15px'));
  }

  setMessage(msg){
    let t = '<a>' + msg + '</a>';
    this.msgBox.append($(t));

    this.textcontentbox.append(this.msgBox);
    this.textcontentbox.append(this.makeSeparator('20px'));
  }

  setButton1(name, callback){
    let buttgroup = $('<div class="buttongroup"></div>');
    let but = $('<button class="btn">' + name + '</button>');

    but.click(callback);

    buttgroup.append(but);
    this.contentview.append($(buttgroup));
  }

  setButton2(name1, callback1, name2, callback2){
    let buttgroup = $('<div class="buttongroup"></div>');

    let but1 = $('<button class="btn btn1">' + name1 + '</button>');
    but1.click(callback1);
    buttgroup.append(but1);

    let but2 = $('<button class="btn btn2">' + name2 + '</button>');
    but2.click(callback2);

    buttgroup.append(but2);
    this.contentview.append($(buttgroup));
  }
}
