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
import realm from '../common/realm';

export default class MyWallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            walletList: [],
            email: 'boseokjung@gmail.com',
            load: false,
            onClickBox: false,
            currentWallet: 0,
            code:'1',
        };
    }

    goTo(part) {
        Actions.main({goTo: part});
    }

    componentDidMount() {
        this.getMyWallet();

    }

    getMyWallet() {
        let wallets = realm.objects('Wallet');
        let myWallets = wallets.filtered('owner="' + this.state.email + '"');
        this.setState({walletList: myWallets, load: true});
    }

    showWallet(i) {
        this.setState({currentWallet: i, onClickBox: !this.state.onClickBox});
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.frame}>
                <View style={styles.content}>
                    <Text onPress={
                        ()=>this.setState({code:AsyncStorage.getItem('qrcode')})
                    }>{this.state.code}</Text>
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
                                        {this.state.walletList[this.state.currentWallet].name}
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
                                                            {wallet.name}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                })
                            }
                        })()}
                        {this.state.walletList.length != 0 &&
                        <Text style={styles.contentText}>
                            지갑번호 : {this.state.walletList[this.state.currentWallet].id}{'\n'}
                            지갑이름 : {this.state.walletList[this.state.currentWallet].name}{'\n'}
                            사이트 : {this.state.walletList[this.state.currentWallet].site}{'\n'}
                            지갑주소 : {this.state.walletList[this.state.currentWallet].addr}{'\n'}
                            보유 BTC : {this.state.walletList[this.state.currentWallet].btc}{'\n'}
                            QR 코드{'\n'}
                            {this.state.walletList[this.state.currentWallet]
                                .qrCode==(null||""||"none") &&
                            <Image source={require('../common/img/no.png')}
                                   style={styles.qrCode}/>
                            }
                            {this.state.walletList[this.state.currentWallet]
                                .qrCode!=(null||""||"none") &&
                            <Image source={require('../common/img/dollar.png')}
                                   style={styles.qrCode}/>
                            }
                        </Text>
                        }

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
        marginTop: 15,
        width: 100,
        height: 100,
    },

});
