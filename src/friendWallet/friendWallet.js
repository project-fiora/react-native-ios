/**
 * Created by kusob on 2017. 7. 16..
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

export default class FriendWallet extends Component {
    constructor(props) {
        super(props);

        this.state = {
            friendList: [],
            walletList: [],
            load: false,
            onClickFriendBox: false,
            onClickBox: false,
            enable:'none',
            currentFriend: 0,
            currentWallet: 0,
            token:'',
        };
    }

    componentDidMount() {
        this.getFriendList();
    }

    async getFriendList() {
        const tokens = await AsyncStorage.getItem('Token');
        const token = JSON.parse(tokens).token;
        fetch(PrivateAddr.getAddr() + "friend/myfriend", {
            method: 'GET', headers: {
                "Authorization": token,
                "Accept": "*/*",
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message == "SUCCESS") {
                    this.setState({friendList: responseJson.list, });
                } else {
                    alert("친구정보를 가져올 수 없습니다");
                    return false;
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .done(()=>this.getFriendWallet(this.state.friendList[this.state.currentFriend].id));
    }

    async getFriendWallet(friendId) {
        // GET /api/friend/lookfriedwallet
        const tokens = await AsyncStorage.getItem('Token');
        const token = JSON.parse(tokens).token;
        fetch(PrivateAddr.getAddr() + "friend/lookfriendwallet?friendId="+friendId, {
            method: 'GET', headers: {
                "Authorization": token,
                'Accept': 'application/json',

            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message == "SUCCESS") {
                    this.setState({walletList: responseJson.list, load:true, secondLoad:true, enable:null});
                } else {
                    alert("친구지갑정보를 가져올 수 없습니다");
                    return false;
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .done();
    }

    showFriend(i, friendId) {
        this.setState({
            currentFriend: i,
            friendId: friendId,
            secondLoad:false,
            enable:'none',
            onClickFriendBox: !this.state.onClickFriendBox,
            onClickBox:false,
        });
        this.getFriendWallet(friendId);
    }

    showWallet(i, walletId) {
        this.setState({
            currentWallet: i,
            walletId: walletId,
            onClickBox: !this.state.onClickBox
        });
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.frame}>
                {this.state.load == false &&
                <View style={styles.loadingIconWrapper}>
                    <Image source={require('../common/img/loading.gif')} style={styles.loadingIcon}/>
                </View>
                }
                {(this.state.load == true && this.state.secondLoad==false) &&
                <View style={styles.loadingIconWrapper}>
                    <Image source={require('../common/img/loading.gif')} style={styles.loadingIcon}/>
                </View>
                }
                <View style={styles.content}>
                    {(this.state.load == true && this.state.friendList.length == 0) &&
                    <View>
                        <Text style={styles.titleText}>
                            아직 친구가 한명도 없어요!{'\n'}
                            오른쪽 상단의 친구 관리에서{'\n'}
                            친구를 추가해보세요!
                        </Text>
                    </View>
                    }
                    {/*////////////////친구 리스트 select Box////////////////////*/}
                    {(this.state.load == true && this.state.friendList.length != 0) &&
                    <View pointerEvents={this.state.enable}>
                        <Text style={styles.titleText}>아래 버튼을 눌러서 친구와 친구지갑을 선택하세요!</Text>
                        <TouchableOpacity
                            underlayColor={'#AAAAAA'}
                            onPress={() => this.setState({onClickFriendBox: !this.state.onClickFriendBox})}
                        >
                            <View style={styles.selectBoxWrapper}>
                                <View style={styles.selectBoxRow}>
                                    <View style={styles.selectBoxTextWrapper}>
                                        <Text style={styles.selectBox}>
                                            {this.state.friendList[this.state.currentFriend].nickname}
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
                            if (this.state.onClickFriendBox == true) {
                                return this.state.friendList.map((friend, i) => {
                                    if (this.state.currentFriend != i)
                                        return (
                                            <TouchableOpacity
                                                underlayColor={'#AAAAAA'}
                                                onPress={() => this.showFriend(i, friend.id)}
                                                key={i}
                                            >
                                                <View style={styles.selectBoxWrapper}>
                                                    <Text style={styles.selectBox}>
                                                        {friend.nickname}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                })
                            }
                        })()}
                        <View style={styles.blank}/>
                        {/*////////////////친구 리스트 select Box////////////////////*/}
                        {(this.state.load == true && this.state.secondLoad==true && this.state.walletList.length == 0) &&
                        <View>
                            <Text style={styles.titleText}>친구 지갑이 없어요!</Text>
                        </View>
                        }
                        {(this.state.load == true && this.state.secondLoad==true && this.state.walletList.length != 0) &&
                        <View>
                            <TouchableOpacity
                                underlayColor={'#AAAAAA'}
                                onPress={() => this.setState({onClickBox: !this.state.onClickBox})}
                            >
                                <View style={styles.selectBoxWrapper}>
                                    <View style={styles.selectBoxRow}>
                                        <View style={styles.selectBoxTextWrapper}>
                                            <Text style={styles.selectBox}>
                                                {this.state.walletList[this.state.currentWallet].wallet_name}
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
                                    return this.state.walletList.map((wallet, i) => {
                                        if (this.state.currentWallet != i)
                                            return (
                                                <TouchableOpacity
                                                    underlayColor={'#AAAAAA'}
                                                    onPress={() => this.showWallet(i, wallet.wallet_Id)}
                                                    key={i}
                                                >
                                                    <View style={styles.selectBoxWrapper}>
                                                        <Text style={styles.selectBox}>
                                                            {wallet.wallet_name}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            );
                                    })
                                }
                            })()}
                            {/*{this.state.walletList.length != 0 &&*/}
                            {/*<View>*/}
                                {/*<Text style={styles.contentText}>*/}
                                    {/*/!*지갑번호 : {this.state.walletList[this.state.currentWallet].wallet_Id}{'\n'}*!/*/}
                                    {/*지갑이름 : {this.state.walletList[this.state.currentWallet].wallet_name}{'\n'}*/}
                                    {/*지갑유형 : {this.state.walletList[this.state.currentWallet].wallet_type}{'\n'}*/}
                                    {/*잔액 : {balance}*/}
                                    {/*{Number.isInteger(parseInt(this.state.balance)) == false && this.state.balance}{'\n'}*/}
                                    {/*지갑주소 ▼ {'\n'}{this.state.walletList[this.state.currentWallet].wallet_add}{'\n'}*/}
                                    {/*QR 코드 ▼*/}
                                {/*</Text>*/}
                                {/*<QRCode*/}
                                    {/*value={this.state.qrcode}*/}
                                    {/*size={220}*/}
                                    {/*bgColor='black'*/}
                                    {/*fgColor='white'/>*/}
                            {/*</View>}*/}
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
        marginBottom: 20,
    },
    loadingIconWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingIcon: {
        width: 40,
        height: 40,
    },
    titleText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 17,
        marginBottom: 10,
        opacity: 0.8,
    },
    blank:{
        margin:5,
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
        alignSelf: 'flex-start',
    },
    selectBox: {
        color: '#FFFFFF',
        fontSize: 17,
    },
    selectBoxIconWrapper: {
        alignSelf: 'flex-end',
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
