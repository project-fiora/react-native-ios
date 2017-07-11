/**
 * Created by kusob on 2017. 6. 26..
 */
import React, {Component} from 'react';
import {
    Image, RefreshControl, ScrollView, StyleSheet,
    Text, TextInput, TouchableHighlight,
    View, AsyncStorage
} from 'react-native';

import PrivateAddr from '../common/private/address';


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing:false,
            dollar: 2000,
            home:'',
            email:'boseokjung@gmail.com',
            walletList:[],
        };
    }

    componentDidMount(){
        this.getPriceInfo();
        this.getWalletList();
    }

    async setStorage(keyName, value){
        try {
            await AsyncStorage.setItem(keyName, value);
        } catch (error) {
            // Error saving data
            alert(error);
        }
    }

    // async getFromStorage(keyName){
    //     try {
    //         const value = await AsyncStorage.getItem(keyName);
    //         if (value !== null){
    //             // We have data!!
    //             this.setState({home:value});
    //         }
    //     } catch (error) {
    //         // Error retrieving data
    //         alert(error);
    //     }
    // }

    getPriceInfo() { //시세정보를 미리 가져와서 AsyncStorage에 저장
        fetch(PrivateAddr.getAddr() + "price/info")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setStorage('priceInfo',JSON.stringify({responseJson}));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getWalletList() { //내지갑정보를 미리 가져와서 AsyncStorage에 저장
        fetch(PrivateAddr.getAddr() + "wallet/list?email=" + this.state.email)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setStorage('walletList',JSON.stringify({responseJson}));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // _onRefresh(){
    //     this.setState({refreshing: true});
    //     //fetch Data...and setState refreshing false
    //     setTimeout(()=>this.setState({refreshing:false}),2000);
    // }

    render() {
        return (
            <ScrollView
                // refreshControl={
                //     <RefreshControl
                //         refreshing={this.state.refreshing}
                //         onRefresh={this._onRefresh.bind(this)}
                //         progressBackgroundColor='#FFFFFF'
                //         tintColor='#FFFFFF'
                //     />
                // }
                contentContainerStyle={styles.homeWrapper}
            >
                <Text style={styles.txt}>
                    보유중인 자산 :
                    <Image source={require('../common/img/dollar.png')} style={styles.dollarIcon}/>
                    &nbsp;
                    {this.state.dollar}{'\n'}
                    {this.state.home}
                </Text>
                <Text style={styles.warningText}>
                    ** 이 앱을 사용하는 도중에 발생하는
                </Text>
                <Text style={styles.warningText2}>
                    모든 책임은 사용자 본인에게 있습니다 **
                </Text>
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