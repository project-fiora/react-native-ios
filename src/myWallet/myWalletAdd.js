/**
 * Created by kusob on 2017. 7. 7..
 */

import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View, AsyncStorage
} from 'react-native';

import {Actions} from 'react-native-router-flux';

export default class MyWalletAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: 'boseokjung@gmail.com',
            name: '',
            addr: '',
        };
        this.getWalletInfo();
    }

    async getWalletInfo(){
        try {
            const code = await AsyncStorage.getItem('walletAddQrcodeTmp');
            if (code !== null){
                this.setState({addr:code});
            }
            const name = await AsyncStorage.getItem('walletAddNameTmp');
            if (name !== null){
                this.setState({name:name});
            }
        } catch (error) {
            alert('지갑 정보 가져오기 실패! : '+error);
        }
    }

    async qrScanner() {
        try {
            AsyncStorage.setItem('walletAddNameTmp', this.state.name);
            Actions.scanner();
        } catch (error) {
            alert("지갑 이름 저장 오류 : "+error);
        }

    }

    async addWallet() {
        if (this.state.name == "") {
            alert("지갑 이름을 입력하세요!");
            return false;
        } else if (this.state.addr == "") {
            alert("지갑 주소를 입력하세요!");
            return false;
        } else {
            try {
                //post api call
                AsyncStorage.removeItem('walletAddNameTmp');
                alert('지갑을 추가했습니다!');
                Actions.main({goTo: 'myWallet'});
            } catch (err) {
                alert('지갑추가실패 : ' + err);
            }
        }
    }

    render() {
        return (
            <View>
                <ScrollView contentContainerStyle={styles.frame}>
                    <Text style={styles.explain}>여기서 지갑을 추가해보세요!</Text>
                    <TextInput
                        style={styles.inputId}
                        value={this.state.name}
                        onChangeText={(name) => this.setState({name: name})}
                        placeholder={'지갑 이름'}
                        placeholderTextColor="#FFFFFF"
                        autoCapitalize='none'
                        maxLength={20}
                        multiline={false}
                    />
                    <TextInput
                        style={styles.inputWalletAddr}
                        value={this.state.addr}
                        onChangeText={(addr) => this.setState({addr: addr})}
                        placeholder={'지갑 주소'}
                        placeholderTextColor="#FFFFFF"
                        autoCapitalize='none'
                        maxLength={200}
                        multiline={false}
                    />

                    <Text style={styles.explainQRcode}>QR코드를 스캔해서 편하게 지갑주소를 입력하세요!</Text>
                    <TouchableOpacity
                        style={styles.scannerBtn}
                        underlayColor={'#000000'}
                        onPress={() => this.qrScanner()}
                    >
                        <Text style={styles.rightBtnText}>
                            QR코드 스캐너
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
                <TouchableOpacity
                    style={styles.rightBtn}
                    underlayColor={'#000000'}
                    onPress={() => this.addWallet()}
                >
                    <Text style={styles.rightBtnText}>저장</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    frame: {
        alignItems: 'center',
        paddingBottom: 85,
    },
    explain: {
        color: '#FFFFFF',
        opacity: 0.8,
        fontSize: 20,
        margin: 15,
    },
    inputId: {
        width: 230,
        height: 50,
        fontSize: 15,
        color: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: '#000000',
        opacity: 0.3,
        marginBottom: 10,
        paddingLeft: 15,
    },
    inputWalletAddr: {
        width: 230,
        height: 45,
        fontSize: 13,
        color: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: '#000000',
        opacity: 0.3,
        marginBottom: 10,
        paddingLeft: 15,
    },
    explainQRcode: {
        color: '#FFFFFF',
        opacity: 0.8,
        fontSize: 15,
        margin: 10,
    },
    scannerBtn: {
        width: 150,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#FFFFFF',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.6,
        marginBottom: 10,
    },
    rightBtn: {
        position: 'absolute',
        top: -45,
        right: 15,
        width: 80,
        height: 30,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#FFFFFF',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.6
    },
    rightBtnText: {
        color: '#FFFFFF',
        fontSize: 15
    },
});
