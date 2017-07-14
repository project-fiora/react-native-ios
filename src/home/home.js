/**
 * Created by kusob on 2017. 6. 26..
 */
import React, {Component} from 'react';
import {
    Image, ScrollView, StyleSheet,
    Text, AsyncStorage
} from 'react-native';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing:false,
            dollar: 2000,
            email:'boseokjung@gmail.com',
        };
    }

    async clearStorage(){
        // AsyncStorage.removeItem('PepperoniAppTemplateAppState:Latest'); //AsyncStorage clear
        AsyncStorage.clear();
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.homeWrapper}>
                <Text style={styles.txt}>
                    보유중인 자산 :
                    <Image source={require('../common/img/dollar.png')} style={styles.dollarIcon}/>
                    {this.state.dollar}{'\n'}
                </Text>
                <Text style={styles.warningText}>
                    ** 이 앱을 사용하는 도중에 발생하는
                </Text>
                <Text style={styles.warningText2}>
                    모든 책임은 사용자 본인에게 있습니다 **
                </Text>
                <Text onPress={this.clearStorage}>앱 asyncStorage 초기화</Text>
            </ScrollView>
        );
    }
}

const IconSize = 25;
const styles = StyleSheet.create({
    homeWrapper:{
        padding:40,
    },
    txt:{
        color:'#FFFFFF',
        opacity:0.8,
        padding:1,
        fontSize:17,
        // borderWidth:1,
        marginTop:-10,
    },
    dollarIcon:{
        width:IconSize,
        height:IconSize,
        marginTop:8,
        marginLeft:5,
        marginRight:9,
        opacity:0.7,
    },
    warningText:{
        color:'#FFFFFF',
        opacity:0.8,
        fontSize:15,
    },
    warningText2:{
        color:'#FFFFFF',
        opacity:0.8,
        fontSize:15,
    },
});