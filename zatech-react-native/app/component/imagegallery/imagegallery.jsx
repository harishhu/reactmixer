import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import $ from 'jquery';

import DivAutoAdjust from './../divautoadjust/divautoadjust.jsx';

import './imagegallery.scss';

const TRANSFORM_UNIT = 12.5;
const SCALE_UNIT = 0.05;

const SCALE_BASE = 0.8;
const SCALE_MAX = 1.1;

const TOUCH_MOVE_SENSITVITY = 1.2;

class ImageGallery extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      itemDatas : []
    }

    this.transform = this.transform.bind(this);
    this.touchMoveEvent = this.touchMoveEvent.bind(this);
    this.touchStartEvent = this.touchStartEvent.bind(this);
    this.touchEndEvent = this.touchEndEvent.bind(this);

    this.galleryWidth = 0;
    this.galleryItemWidth = 0;
    this.items = [];
    this.gallery;

    this.galleryTransformTo = 0;
    this.prevTouchPointX = -1;

    this.maxPageX = 0;
    this.minPageX = 0;

    this.firstRender = true;
    this.currentSelectIndex = -1;

    this.touchStartX = -1;
    this.touchEndX = -1;
  }

  setGalleryItems(galleryitems){
    let isfirst = this.currentSelectIndex == -1;

    for(var i in galleryitems){
      galleryitems[i].showGray = true;
    }

    this.setState({
      itemDatas: galleryitems
    });

    if(isfirst){
      this.initUIData();
    }
  }

  initUIData(){
    this.gallery = $('.gallery');
    var rawnode = this.gallery[0];

    //alert(rawnode);
    rawnode.addEventListener('touchmove', this.touchMoveEvent, false);
    rawnode.addEventListener('touchstart', this.touchStartEvent, false);
    rawnode.addEventListener('touchend', this.touchEndEvent, false);

    this.galleryWidth = this.gallery.width();

    this.items = $('item');
    this.galleryItemWidth = this.items.width();

    this.maxPageX = this.galleryWidth / 2 - this.galleryItemWidth / 2;
    this.minPageX = this.galleryWidth / 2 - this.galleryItemWidth * this.state.itemDatas.length + this.galleryItemWidth / 2;

    this.maxPageX = parseInt(this.maxPageX);
    this.minPageX = parseInt(this.minPageX);

    this.transformItemX(this.gallery, this.galleryWidth);

    for(var i = 0; i < this.items.length; i++){
      var item = $(this.items[i]);
      this.scaleItemCss(item, SCALE_BASE);

      this.state.itemDatas[i].scale = SCALE_BASE;
    }

    this.galleryTransformTo = this.galleryWidth / 2 - this.galleryItemWidth / 2;
    this.transform(this.gallery, this.galleryWidth, this.galleryTransformTo, ()=>{
      //this.sacleItem2BigSmall(true, 0);
      this.itemSelectCallback(0);
    });
  }

  itemSelectCallback(index){
    if(this.currentSelectIndex == index){
      //ignore
      return;
    }

    this.currentSelectIndex = index;
    this.props.itemSelectCallback(index);
  }

  setDefaultGalleryIndex(index){
    if(index >= this.state.itemDatas.length){
      return;
    }

    this.galleryTransformTo = this.galleryWidth / 2 - this.galleryItemWidth / 2 - (this.galleryItemWidth * index);

    this.transform(this.gallery, this.galleryWidth, this.galleryTransformTo, ()=>{
      //this.sacleItem2BigSmall(true, 0);
      this.itemSelectCallback(index);
    });
  }

  componentDidMount(){
    if(this.firstRender){
      this.firstRender = false;
    }
  }

  touchStartEvent(event){
    if (event.targetTouches.length == 1) {
      event.preventDefault();
      var touch = event.targetTouches[0];
      this.touchStartX = touch.pageX;
      this.touchEndX = -1;
      console.log('touch start x = ' + touch.pageX);
      this.prevTouchPointX = touch.pageX / window.devicePixelRatio;
    }
  }

  touchEndEvent(event){
    console.log('touch end, startX = ' + this.touchStartX + ' endx = ' + this.touchEndX);
    if(this.touchStartX == -1 && this.touchEndX == -1){
      return;
    }

    this.prevTouchPointX == -1;

    let index = -1;

    for(var i in this.state.itemDatas){
      if(!this.state.itemDatas[i].showGray){
        index = i;
        break;
      }
    }

    if (index == -1){
      return;
    }

    if(this.touchStartX > 0 && this.touchEndX == -1){
      this.itemSelectCallback(index);
      return;
    }

    //console.log('sel index = ' + index);
    let from = this.galleryTransformTo;

    let centerX = this.galleryWidth / 2;
    let itemCenterX = this.galleryTransformTo + this.galleryItemWidth * index + this.galleryItemWidth / 2;

    let dis = centerX - itemCenterX;

    this.galleryTransformTo = from + dis;

    console.log('re-adjust position : ' + this.galleryTransformTo);

    this.transform(this.gallery, from, this.galleryTransformTo, ()=>{
      this.itemSelectCallback(index);
    });
  }

  touchMoveEvent(event){
    if (event.targetTouches.length == 1) {
      event.preventDefault();
      var touch = event.targetTouches[0];

      this.touchEndX = touch.pageX;

      var current = touch.pageX / window.devicePixelRatio;
      let interval = current - this.prevTouchPointX;

      if(this.galleryTransformTo >= this.maxPageX && interval > 0){
        this.touchEndX = -1;
        return;
      }

      if (this.galleryTransformTo <= this.minPageX && interval < 0){
        this.touchEndX = -1;
        return;
      }

      console.log('transform to = ' + this.galleryTransformTo);

      //console.log('page x = ' + this.prevTouchPointX + " page y = " + touch.pageX);
      this.prevTouchPointX = current;
      this.galleryTransformTo += interval * TOUCH_MOVE_SENSITVITY;

      if(this.galleryTransformTo > this.maxPageX){
        this.galleryTransformTo = this.maxPageX;
      }else if (this.galleryTransformTo < this.minPageX){
        this.galleryTransformTo = this.minPageX;
      }

      this.transformItemX(this.gallery, this.galleryTransformTo);
      this.updateItemsScale(this.galleryTransformTo);
    }
  }

  updateItemsScale(transformto){
    let centerX = this.galleryWidth / 2;
    let dis = centerX - transformto;

    let index = parseInt(dis / this.galleryItemWidth);
    this.updateItemsScaleByCenterPoint(index);

    let prev = index - 1;
    let next = index + 1;

    this.updateItemsScaleByCenterPoint(prev);
    this.updateItemsScaleByCenterPoint(next);
  }

  updateItemsScaleByCenterPoint(index){
    if(index >= this.state.itemDatas.length || index < 0){
      return;
    }

    let centerX = this.galleryWidth / 2;
    let itemCenterX = this.galleryTransformTo + this.galleryItemWidth * index + this.galleryItemWidth / 2;

    let dis = centerX - itemCenterX;
    dis = Math.abs(dis);

    if(dis > this.galleryItemWidth){
      return;
    }

    let tmp = this.galleryItemWidth - dis;
    let percent = tmp / this.galleryItemWidth;
    let value = percent * (SCALE_MAX - SCALE_BASE);

    let itemData = this.state.itemDatas[index];

    if(percent > 0.5 && itemData.showGray){
      itemData.showGray = false;
      console.log('transfer image ' + index + ' gray = ' + itemData.showGray);
      this.updateItemImage(index, false);
    }else if(percent < 0.5 && !itemData.showGray){
      itemData.showGray = true;
      console.log('transfer image ' + index + ' gray = ' + itemData.showGray);
      this.updateItemImage(index, true);
    }

    this.scaleItemCss(this.items[index], SCALE_BASE + value);
    //console.log(index + ' ' + percent);
  }

  scaleItem(index, value){
    let currentScale = this.state.itemDatas[index].scale;
    if(currentScale <= SCALE_BASE || currentScale >= SCALE_MAX){
      return;
    }

    if(value < SCALE_BASE){
      value = SCALE_BASE;
    }else if(value > SCALE_MAX){
      value = SCALE_MAX;
    }

    this.scaleItemCss(this.items[index], value);
    this.state.itemDatas[index].scale = value;
  }

  scaleFromToResult(tobig, index){
    console.log(tobig + ' ' + index);

    this.updateItemImage(index, false);
    //alert(itemData.toString())
  }

  updateItemImage(index, gray){
    var item = $("img", this.items[index]);
    var itemData = this.state.itemDatas[index];

    var extrainfo = $('.extrainfo', this.items[index]);

    console.log('update item image index = ' + index + ' gray = ' + gray);

    if(gray){
      extrainfo.html('&nbsp;');
      item.attr("src", itemData.imagegray);
    }else{
      extrainfo.html(this.state.itemDatas[index].mydesc + "");
      item.attr("src", itemData.image);
    }

    this.state.itemDatas[index].showGray = gray;
  }

  sacleItem2BigSmall(tobig, index){
    this.scaleFromToResult = this.scaleFromToResult.bind(this, tobig, index);

    if(tobig){
      this.scaleWithFromTo(this.items[index], SCALE_BASE, SCALE_MAX, this.scaleFromToResult);
    }else{

    }
  }

  scaleWithFromTo(item, from, to, finishcb){
    item = $(item);

    var unit = (to - from) > 0 ? SCALE_UNIT : -SCALE_UNIT;

    var timer = setInterval(() =>{
      //console.log(timer);
      from += unit;

      this.scaleItemCss(item, from);

      //console.log(unit + ' ' + from + ' ' + to);

      if((unit > 0 && from > to) || (unit < 0 && from < to)){
        clearInterval(timer);
        this.scaleItemCss(item, to);

        if(finishcb != undefined){
           finishcb();
        }
      }
    }, 50);
  }

  scaleItemCss(item, value){
    if(!(item instanceof $)){
      item = $(item);
    }

    item.css("transform",`scale(${value}, ${value})`);
  }

  transform(item, from, to, finishcb){
    var unit = (to - from) > 0 ? TRANSFORM_UNIT : -TRANSFORM_UNIT;

    console.log('transform from = ' + from + " to = " + to);

    var timer = setInterval(() =>{
      //console.log(timer);
      from += unit;

      this.galleryTransformTo = from;

      let isfinish = false;

      if((unit > 0 && from >= to) || (unit < 0 && from <= to)){
        this.galleryTransformTo = to;
        isfinish = true;
      }

      console.log('transform item interval = ' + this.galleryTransformTo);

      this.transformItemX(item, this.galleryTransformTo);
      this.updateItemsScale(this.galleryTransformTo);

      console.log(unit + ' ' + from + ' ' + to + " isfinish = " + isfinish);

      if(isfinish){
        clearInterval(timer);
        //this.transformItemX(item, this.galleryTransformTo);

        if(finishcb != undefined){
          setTimeout(function(){
            finishcb();
          }, 10);
        }
      }
    }, 15);
  }

  transformItemX(item, value){
    //console.log('transform item X = ' + value);
    //console.trace();
    item.css("transform",`translateX(${value}px)`);
  }

  render(){
    console.log('render image gallery');

    return (
      <DivAutoAdjust divBackground={this.props.divBackground} sizeRatio={this.props.sizeRatio} marginTop={this.props.marginTop}
                     divAdjustFinish={this.props.divAdjustFinish}>
        <div className="gallery">
        {
            this.state.itemDatas.map(function(item, key){
              console.log('gallery item');
                return (
                  <item key={key}>
                    <img src={item['imagegray']}/>
                    <div style={{height:'7px'}}></div>
                    <a className='name'>{item.name}</a>
                    <br/>
                    <a className='extrainfo'>&nbsp;</a>
                  </item>
                );
            })
        }
        </div>
      </DivAutoAdjust>
    );
  }
}

module.exports = ImageGallery;
