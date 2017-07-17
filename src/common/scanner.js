/**
 * Created by kusob on 2017. 7. 17..
 */

import React,{ Component } from 'react';
import {AsyncStorage} from "react-native";
import {Actions} from 'react-native-router-flux';
import QRCodeScanner from "react-native-qrcode-scanner";

export default class Scanner extends Component {
    render() {
        return(

                <QRCodeScanner onRead={(obj)=>{
                    alert('스캔 완료!\n지갑 주소를 확인하세요');
                    try {
                        AsyncStorage.setItem('walletAddQrcodeTmp', obj.data.toString());
                    } catch (error) {
                        // Error saving data
                        alert("스캔 후 저장 오류 : "+error);
                    }
                    Actions.main({goTo:'myWalletAdd'});
                }}/>

        );
    }
}