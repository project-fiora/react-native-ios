
import React, {Component} from "react";
import {Text, View} from "react-native";
import QRCode from "react-native-qrcode";

export default class WalletInfo extends Component{
    render(){
        return(
            <View>
                <Text style={styles.contentText}>
                    {/*지갑번호 : {this.props.wallet_Id}{'\n'}*/}
                    지갑이름 : {this.props.wallet_name}{'\n'}
                    지갑유형 : {this.props.type}{'\n'}
                    잔액 : {this.props.balance}{'\n'}
                    지갑주소 ▼ {'\n'}{this.props.wallet_add}{'\n'}
                    QR 코드 ▼
                </Text>
                <QRCode
                    value={this.state.qrcode}
                    size={220}
                    bgColor='black'
                    fgColor='white'/>
            </View>
        );
    }
}