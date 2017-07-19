/**
 * Created by kusob on 2017. 7. 16..
 */

import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, TouchableOpacity,
    View, Image
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import realm from '../common/realm';

export default class FriendWallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            friendWalletList: [],
            site: '',
            friendEmail: 'holein0ne@naver.com',
            load: false,
            onClickBox: false,
            currentWallet: 0,
        };
    }

    goTo(part) {
        Actions.main({goTo: part});
    }

    componentDidMount() {
        this.getMyWallet();
    }

    getMyWallet(){
        let wallets = realm.objects('FriendWallet');
        let friendWallets = wallets.filtered('owner="'+this.state.friendEmail+'"');
        this.setState({friendWalletList:friendWallets, load:true});
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
                    </View>
                    }
                    {(this.state.load == true && this.state.friendWalletList.length==0) &&
                    <View>
                        <Text style={styles.titleText}>
                            아직 친구 지갑이 한개도 없어요!{'\n'}
                            오른쪽 상단의 친구 추가 버튼을 통해서{'\n'}
                            친구 지갑을 요청해보세요!
                        </Text>
                    </View>
                    }
                    {(this.state.load == true && this.state.friendWalletList.length!=0) &&
                    <View>
                        <Text style={styles.titleText}>아래 버튼을 눌러서 친구 지갑을 선택하세요!</Text>
                        <TouchableOpacity
                            underlayColor={'#AAAAAA'}
                            onPress={() => this.setState({onClickBox: !this.state.onClickBox})}
                        >
                            <View style={styles.selectBoxWrapper}>
                                <View style={styles.selectBoxRow}>
                                    <View style={styles.selectBoxTextWrapper}>
                                        <Text style={styles.selectBox}>
                                            {this.state.walletList[this.state.currentWallet].name}
                                        </Text>
                                    </View>
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
                                return this.state.friendWalletList.map((wallet, i) => {
                                    if (this.state.currentWallet != i)
                                        return (
                                            <TouchableOpacity
                                                underlayColor={'#AAAAAA'}
                                                onPress={() => this.showWallet(i)}
                                                key={i}
                                            >
                                                <View style={styles.selectBoxWrapper}>
                                                    <Text style={styles.selectBox}>
                                                        {wallet.name}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                })
                            }
                        })()}
                        {this.state.friendWalletList.length!=0 &&
                        <Text style={styles.contentText}>
                            지갑번호 : {this.state.friendWalletList[this.state.currentWallet].id}{'\n'}
                            지갑이름 : {this.state.friendWalletList[this.state.currentWallet].name}{'\n'}
                            사이트 : {this.state.friendWalletList[this.state.currentWallet].site}{'\n'}
                            지갑주소 : {this.state.friendWalletList[this.state.currentWallet].addr}{'\n'}
                            보유 BTC : {this.state.friendWalletList[this.state.currentWallet].btc}{'\n'}
                            QR 코드{'\n'}
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
    selectBoxTextWrapper: {
        alignSelf:'flex-start',
    },
    selectBox: {
        color: '#FFFFFF',
        fontSize: 17,
    },
    selectBoxIconWrapper:{
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    selectIcon: {
        color: '#FFFFFF',
        fontSize: 17,
        opacity: 0.9,
    },
    qrCode: {
        marginTop:15,
        width: 100,
        height: 100,
    },

});
