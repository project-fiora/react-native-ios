/**
 * Created by kusob on 2017. 7. 7..
 */

import React, {Component} from 'react';
import {
    Image, ScrollView,
    StyleSheet,
    Text, TextInput, TouchableHighlight, TouchableOpacity,
    View
} from 'react-native';
import {Select, Option} from 'react-native-select-list';
import {Actions} from 'react-native-router-flux';

import PrivateAddr from '../common/private/address';

export default class MyWalletAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            passwd: '',
            email:'boseokjung@gmail.com',
            walletName: '',
            walletSite: '',
            walletAddr: '',
        };
    }

    addWallet() {
        fetch(PrivateAddr.getAddr() + 'wallet/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                walletName: this.state.walletName,
                walletSite: this.state.walletSite,
                walletAddr: this.state.walletAddr
            })
        }).then((response) => {
            return response.json()
        })
            .then((responseJson) => {
                if (responseJson.message == "SUCCESS") {
                    alert('지갑을 추가했습니다!');
                    Actions.main({goTo: 'myWallet'});
                } else {
                    alert('오류가 발생했습니다.\n다시 시도해주세요!');
                }
            })
            .catch((error) => {
                alert('Network Connection Failed');
                console.error(error);
            }).done();
    }

    render() {
        return (
            <View style={styles.frame}>
                <Text style={styles.explain}>여기서 지갑을 추가해보세요!</Text>
                <Select
                    onSelect={(site) => this.setState({walletSite: site})}
                    selectStyle={styles.selectSite}
                    selectTextStyle={styles.selectText}
                    listStyle={styles.selectList}
                    listHeight={200}
                >
                    <Option
                        value=''
                        optionStyle={styles.selectOption}
                        optionTextStyle={styles.selectOptionText}
                    >
                        사이트를 선택하세요!
                    </Option>
                    <Option
                        value='coinone.co.kr'
                        optionStyle={styles.selectOption}
                        optionTextStyle={styles.selectOptionText}
                    >
                        coinone.co.kr
                    </Option>
                    <Option
                        value='bithumb.com'
                        optionStyle={styles.selectOption}
                        optionTextStyle={styles.selectOptionText}
                    >
                        bithumb.com‎
                    </Option>
                    <Option
                        value='korbit.co.kr'
                        optionStyle={styles.selectOption}
                        optionTextStyle={styles.selectOptionText}
                        last
                    >
                        korbit.co.kr
                    </Option>
                </Select>
                <TextInput
                    style={styles.inputId}
                    value={this.state.id}
                    onChangeText={(id) => this.setState({id: id})}
                    placeholder={'아이디'}
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize = 'none'
                    maxLength={40}
                    multiline={false}
                />
                <TextInput
                    style={styles.inputId}
                    value={this.state.passwd}
                    onChangeText={(passwd) => this.setState({passwd: passwd})}
                    placeholder={'비밀번호'}
                    placeholderTextColor="#FFFFFF"
                    secureTextEntry={true}
                    maxLength={20}
                    multiline={false}
                />
                <TextInput
                    style={styles.inputId}
                    value={this.state.walletName}
                    onChangeText={(walletName) => this.setState({walletName: walletName})}
                    placeholder={'지갑 이름'}
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize = 'none'
                    maxLength={10}
                    multiline={false}
                />
                <TextInput
                    style={styles.inputWalletAddr}
                    value={this.state.walletAddr}
                    onChangeText={(addr) => this.setState({walletAddr: addr})}
                    placeholder={'지갑 주소'}
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize = 'none'
                    maxLength={200}
                    multiline={false}
                />
                <TouchableHighlight
                    style={styles.rightBtn}
                    underlayColor={'#000000'}
                    onPress={() => this.addWallet()}
                >
                    <Text style={styles.rightBtnText}>저장</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    frame:{
        alignItems: 'center',
        paddingBottom:85,
    },
    explain:{
        color:'#FFFFFF',
        opacity:0.8,
        fontSize:20,
        margin:15,
    },
    selectSite:{
        marginBottom:5,
        width:220,
        height:50,
        alignSelf: 'center',
        backgroundColor:'#000000',
        opacity:0.4,
        borderRadius:15,
        paddingLeft:17,
    },
    selectText:{
        color:'#FFFFFF',
    },
    selectList:{
        backgroundColor:'#000000',
        opacity:0.6,
        alignSelf: 'center',
        borderRadius:15,
    },
    selectOption:{

    },
    selectOptionText:{
        color:'#FFFFFF',
    },
    inputId:{
        width:220,
        height: 50,
        fontSize: 15,
        color:'#FFFFFF',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: '#000000',
        opacity:0.3,
        marginBottom:5,
        paddingLeft:20,
    },
    inputWalletAddr:{
        width:320,
        height: 45,
        fontSize: 13,
        color:'#FFFFFF',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: '#000000',
        opacity:0.3,
        marginBottom:5,
        paddingLeft:12,
    },
    rightBtn: {
        position:'absolute',
        top:-45,
        right:15,
        width: 80,
        height: 30,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#FFFFFF',
        padding: 5,
        alignItems: 'center',
        justifyContent:'center',
        opacity:0.6
    },
    rightBtnText: {
        color: '#FFFFFF',
        fontSize: 15
    },
});
