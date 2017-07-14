/**
 * Created by kusob on 2017. 6. 26..
 */
import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View, Image, AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import PrivateAddr from '../common/private/address';

export default class MyWallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            walletList: [],
            site: '',
            email: 'boseokjung@gmail.com',
            load: false,
            onClickBox: false,
            currentWallet: 0,
            walletName: '',
            walletSite: '',
            walletAddr: '',
            storage:[],
        };
    }

    goTo(part) {
        Actions.main({goTo: part});
    }

    componentDidMount() {
        // this.getWalletList();
        this.getFromStorage();
    }


    async setStorage(keyName, value) {
        try {
            await AsyncStorage.setItem(keyName, value);
        } catch (error) {
            // Error saving data
            alert(error);
        }
    }

    async getFromStorage() {
        try {
            const value = await AsyncStorage.getItem(this.state.email);
            if (value !== null) {
                // We have data!!
                this.setState({storage: JSON.parse(value)});
            }
        } catch (error) {
            // Error retrieving data
            alert(error);
        }
    }

    getWalletList() {

        //this.props.id에 해당하는 지갑을 꺼내는 api call (수정 후 저장은 main에 goTo 함수에서)
        // fetch(PrivateAddr.getAddr() + "wallet/list?email=" + this.state.email)
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //         this.setState({walletList: responseJson, load: true});
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }

    showWallet(i) {
        this.setState({currentWallet: i, onClickBox: !this.state.onClickBox});
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.frame}>
                <View style={styles.content}>
                    {this.state.load == false &&
                    <View>
                        <Image
                            source={require('../common/img/loading.gif')}
                            style={styles.loadingIcon}/>
                        {this.state.storage.map((l, i) => {
                            return(
                                <Text key={i}>{l.name}</Text>
                            );
                        })}
                    </View>
                    }
                    {this.state.load == true &&
                    <View>
                        <Text style={styles.selectIcon}>▼</Text>
                        <Text style={styles.titleText}>아래 버튼을 눌러서 지갑을 선택하세요!</Text>
                        <TouchableOpacity
                            underlayColor={'#AAAAAA'}
                            onPress={() => this.setState({onClickBox: !this.state.onClickBox})}
                        >
                            <View style={styles.selectBoxWrapper}>
                                <Text style={styles.selectBox}>
                                    {this.state.walletList[this.state.currentWallet].walletName}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {(() => {
                            if (this.state.onClickBox == true) {
                                return this.state.walletList.map((wallet, i) => {
                                    if (this.state.currentWallet != i)
                                        return (
                                            <TouchableOpacity
                                                underlayColor={'#AAAAAA'}
                                                onPress={() => this.showWallet(i)}
                                                key={i}
                                            >
                                                <View style={styles.selectBoxWrapper}>
                                                    <Text style={styles.selectBox}>
                                                        {wallet.walletName}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                })
                            }
                        })()}

                        <Text style={styles.contentText}>
                            지갑이름 : {this.state.walletList[this.state.currentWallet].walletName}{'\n'}
                            사이트 : {this.state.walletList[this.state.currentWallet].walletSite}{'\n'}
                            지갑주소 : {this.state.walletList[this.state.currentWallet].walletAddr}{'\n'}
                            보유 BTC : {this.state.walletList[this.state.currentWallet].walletBTC}{'\n'}
                            QR 코드
                        </Text>
                        <Image source={require('../common/img/ask.png')} style={styles.qrCode}/>
                    </View>
                    }
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    frame: {
        paddingBottom: 85,
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
    },
    content: {
        marginTop: 5,
        alignItems: 'center',
        opacity: 0.8,
    },
    contentText: {
        color: '#FFFFFF',
        fontSize: 17,
        marginTop: 10,
        opacity: 0.8,
        marginBottom: 20,
    },
    loadingIcon: {
        width: 40,
        height: 40,
        marginTop: 40,
    },
    selectIcon: {
        position: 'absolute',
        top: 38,
        right: 38,
        color: '#FFFFFF',
        fontSize: 17,
        opacity: 0.9,
    },
    titleText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 17,
        marginBottom: 10,
        opacity: 0.8,
    },
    selectBoxWrapper: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        width: 200,
        height: 35,
        opacity: 0.4,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 15,
    },
    selectBox: {
        color: '#FFFFFF',
        fontSize: 17,
    },
    qrCode: {
        width: 100,
        height: 100,
    },

});
