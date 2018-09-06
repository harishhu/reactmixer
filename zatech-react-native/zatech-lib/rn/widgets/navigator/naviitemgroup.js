import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    NativeModules,
    Image,
    TouchableWithoutFeedback,
    StatusBar,
    ImageBackground
} from 'react-native';

class NaviItem extends Component{
    constructor(props) {
        super(props);
    }

    itemClick = ()=>{
        this.props.itemClick(this.props.item, this.props.index);
    }

    renderItem(item, index){
        if(item.interval == undefined){
            item.interval = 5;
        }

        if(item.render){
            return (
                <TouchableWithoutFeedback onPress={this.itemClick}>
                    <View style={styles.itemLeftStyle}>
                        {item.render(item, index)}
                    </View>
                </TouchableWithoutFeedback>
            )
        }

        if(item.icon){
            if(this.props.isleft){
                return (
                    <TouchableWithoutFeedback onPress={this.itemClick}>
                        <View style={styles.itemLeftStyle}>
                            <View style={{width: item.interval}}></View>
                            <Image resizeMode='contain' style={styles.leftitem} source={item.icon} />
                            {/*<View style={{width: 5}}></View>*/}
                            <Text style={styles.itemText}>{item.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                );
            }else{
                return (
                    <TouchableWithoutFeedback onPress={this.itemClick}>
                        <View style={styles.itemRightStyle}>
                        <Image resizeMode='contain' style={styles.leftitem} source={item.icon} />
                        {/* <View style={{width: 5}}></View> */}
                        <Text style={styles.itemText}>{item.name}</Text>
                        <View style={{width: item.interval}}></View>
                        </View>
                    </TouchableWithoutFeedback>
                );
            }
        }else{
            if(this.props.isleft){
                return (
                    <TouchableWithoutFeedback onPress={this.itemClick}>
                        <View style={styles.itemLeftStyle}>
                            <View style={{width: item.interval}}></View>
                            <Text style={styles.itemText}>{item.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                );
            }else{
                return (
                    <TouchableWithoutFeedback onPress={this.itemClick}>
                        <View style={styles.itemRightStyle}>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <View style={{width: item.interval}}></View>
                        </View>
                    </TouchableWithoutFeedback>
                );
            }
        }
    }

    render(){
       return this.renderItem(this.props.item, this.props.index);
    }
}

class NaviItemGroup extends Component<{}> {
    constructor(props) {
      super(props);

      this.state = {
          image: undefined,//,
          text: "",
          isleft: true,
      }
    }

    setItemData(items, isleft) {
        this.isleft = isleft;
        this.setState(
          {
              items:items
          }
        )
    }

    render() {
        if(this.state.items == undefined || this.state.items.length == 0){
            return (
                <View />
            )
        }else{
            return (
                <View style={this.props.style}>
                {
                     this.state.items.map((item, index)=> {
                         return (
                             <NaviItem item={item} index={index} isleft={this.isleft} key={index} itemClick={this.props.itemClick}/>   
                         );
                    }
                    )
                }
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    itemLeftStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        marginLeft: 0
    },
    itemRightStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
        marginRight: 0
    },
    itemText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        marginLeft: 0
    },
    leftitem: {
    }
});

module.exports = NaviItemGroup;