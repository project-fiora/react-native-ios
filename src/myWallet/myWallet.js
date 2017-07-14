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

export default class MyWallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            walletList: [],
            site: '',
            email: 'boseokjung@gmail.com',
            load: false,
            empty: false,
            onClickBox: false,
            currentWallet: 0,
        };
    }

    goTo(part) {
        Actions.main({goTo: part});
    }

    componentDidMount() {
        this.getFromStorage(); //getWalletList
    }

    async getFromStorage() {
        try {
            const value = await AsyncStorage.getItem(this.state.email+"_walletList");
            if (value !== null) {
                // We have data!!
                this.setState({walletList: JSON.parse(value), load:true});
            } else {
                this.setState({load:true, empty:true});
            }
        } catch (error) {
            // Error retrieving data
            alert(error);
        }
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
                    {(this.state.load == true && this.state.empty == true) &&
                    <View>
                        <Text style={styles.titleText}>
                            아직 지갑이 한개도 없어요!{'\n'}
                            오른쪽 상단의 지갑 관리 버튼을 통해서{'\n'}
                            지갑을 추가하세요!
                        </Text>
                    </View>
                    }
                    {(this.state.load == true && this.state.empty == false) &&
                    <View>
                        <Text style={styles.selectIcon}>▼</Text>
                        <Text style={styles.titleText}>아래 버튼을 눌러서 지갑을 선택하세요!</Text>
                        <TouchableOpacity
                            underlayColor={'#AAAAAA'}
                            onPress={() => this.setState({onClickBox: !this.state.onClickBox})}
                        >
                            <View style={styles.selectBoxWrapper}>
                                <Text style={styles.selectBox}>
                                    {this.state.walletList[this.state.currentWallet].name}
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
                                                        {wallet.name}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                })
                            }
                        })()}

                        <Text style={styles.contentText}>
                            지갑이름 : {this.state.walletList[this.state.currentWallet].name}{'\n'}
                            사이트 : {this.state.walletList[this.state.currentWallet].site}{'\n'}
                            지갑주소 : {this.state.walletList[this.state.currentWallet].addr}{'\n'}
                            보유 BTC : {this.state.walletList[this.state.currentWallet].btc}{'\n'}
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
