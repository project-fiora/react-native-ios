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
import QRCode from 'react-native-qrcode';
import PrivateAddr from "../common/private/address";

export default class MyWallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            walletList: [],
            email: 'boseokjung@gmail.com',
            qrcode: '',
            load: false,
            onClickBox: false,
            currentWallet: 0,
            balance: '',
        };
    }

    componentDidMount() {
        this.getMyWallet();
    }

    goTo(part) {
        Actions.main({goTo: part});
    }

    async getMyWallet() {
        const tokens = await AsyncStorage.getItem('Token');
        const token = JSON.parse(tokens).token;
        fetch(PrivateAddr.getAddr() + "wallet/list", {
            method: 'GET', headers: {
                "Authorization": token,
                "Accept": "*/*",
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message == "SUCCESS") {
                    this.setState({walletList: responseJson.list});
                    AsyncStorage.setItem('WalletList', JSON.stringify(responseJson.list));
                } else {
                    alert("지갑정보를 가져올 수 없습니다");
                    return false;
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .done(() => {
                this.callGetBalance();
            });
    }

    async callGetBalance() {
        var type = this.state.walletList[this.state.currentWallet].wallet_type;
        var current = this.state.walletList[this.state.currentWallet].wallet_add;
        if (type == 'BTC') {
            fetch("https://chain.api.btc.com/v3/address/" + current)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.data != null) {
                        this.setState({balance: responseJson.data.balance, load: true});
                    } else {
                        this.setState({balance: '지갑주소 or 잔액조회 api 오류', load: true});
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else if (type == 'ETH') {
            fetch("https://api.etherscan.io/api?module=account&action=balance&address=" + current)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({balance: responseJson.result, load: true});
                    alert('잔액이 이상하면 지갑 주소를 확인해보세요!');
                })
                .catch((error) => {
                    console.error(error);
                });
        } else if (type == 'ETC') {
            fetch("https://etcchain.com/api/v1/getAddressBalance?address=" + current)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.balance != null || responseJson.balance != undefined) {
                        this.setState({balance: responseJson.balance, load: true});
                    } else {
                        this.setState({balance: '지갑주소 or 잔액조회 api 오류', load: true});
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        } else if (type == 'XRP') {
            fetch("https://data.ripple.com/v2/accounts/" + current + "/balances")
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson != null) {
                        if (responseJson.result == 'success')
                            this.setState({balance: responseJson.balances[0].value, load: true});
                        else
                            this.setState({balance: '지갑주소 오류', load: true});
                    } else {
                        this.setState({balance: '잔액조회 api 오류', load: true});
                    }

                })
                .catch((error) => {
                    console.error(error);
                });

        } else if (type == 'LTC') {

            /////////////수정해야함////////////////////////////
            // this.getBalance("http://ltc.blockr.io/api/v1/address/balance/" + current);
            /////////////수정해야함////////////////////////////


        } else if (type == 'DASH') {
            fetch("https://api.blockcypher.com/v1/dash/main/addrs/" + current + "/balance")
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.balance!=null) {
                        this.setState({balance: responseJson.balance, load: true});
                    } else {
                        this.setState({balance: '지갑주소 or 잔액조회 api 오류', load: true});
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    showWallet(i) {
        this.setState({currentWallet: i, onClickBox: !this.state.onClickBox},()=>{this.callGetBalance()});
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
                    </View>
                    }
                    {(this.state.load == true && this.state.walletList.length == 0) &&
                    <View>
                        <Text style={styles.titleText}>
                            아직 지갑이 한개도 없어요!{'\n'}
                            오른쪽 상단의 지갑 관리 버튼을 통해서{'\n'}
                            지갑을 추가하세요!
                        </Text>
                    </View>
                    }
                    {(this.state.load == true && this.state.walletList.length != 0) &&
                    <View>
                        <Text style={styles.titleText}>아래 버튼을 눌러서 지갑을 선택하세요!</Text>
                        <TouchableOpacity
                            underlayColor={'#AAAAAA'}
                            onPress={() => this.setState({onClickBox: !this.state.onClickBox})}
                        >
                            <View style={styles.selectBoxWrapper}>
                                <View style={styles.selectBoxRow}>
                                    <Text style={styles.selectBoxText}>
                                        {this.state.walletList[this.state.currentWallet].wallet_name}
                                    </Text>
                                    <View style={styles.selectBoxIconWrapper}>
                                        <Text style={styles.selectIcon}>
                                            ▼
                                        </Text>
                                    </View>
                                </View>
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
                                                    <View style={styles.selectBoxRow}>
                                                        <Text style={styles.selectBoxText}>
                                                            {wallet.wallet_name}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                })
                            }
                        })()}
                        {this.state.walletList.length != 0 &&
                        <View>
                            <Text style={styles.contentText}>
                                지갑번호 : {this.state.walletList[this.state.currentWallet].wallet_Id}{'\n'}
                                지갑이름 : {this.state.walletList[this.state.currentWallet].wallet_name}{'\n'}
                                유형 : {this.state.walletList[this.state.currentWallet].wallet_type}{'\n'}
                                지갑주소 : {this.state.walletList[this.state.currentWallet].wallet_add}{'\n'}
                                잔액 : {this.state.balance}{'\n'}
                                QR 코드 ▼
                            </Text>
                            <QRCode
                                value={this.state.qrcode}
                                size={220}
                                bgColor='black'
                                fgColor='white'/>
                        </View>
                        }

                    </View>
                    }
                </View>
            </ScrollView>
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
        marginBottom: 5,
    },
    loadingIcon: {
        width: 30,
        height: 30,
        marginTop: 30,
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
        width: 220,
        height: 35,
        opacity: 0.4,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 17,
        paddingRight: 15,
    },
    selectBoxRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selectBoxText: {
        alignSelf: 'flex-start',
        color: '#FFFFFF',
        fontSize: 17,
    },
    selectBoxIconWrapper: {
        alignItems: 'flex-end',
    },
    selectIcon: {
        color: '#FFFFFF',
        fontSize: 17,
        opacity: 0.9,
    },
    qrCode: {
        marginTop: 5,
        width: 100,
        height: 100,
    },

});
