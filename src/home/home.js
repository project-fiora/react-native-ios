/**
 * Created by kusob on 2017. 6. 26..
 */
import React, {Component} from 'react';
import {
    Image, ScrollView, StyleSheet,
    Text, AsyncStorage, View, TouchableOpacity,
} from 'react-native';
import realm from '../common/realm';
import PrivateAddr from "../common/private/address";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            confirmLoad: false,
            mysideLoad: false,
            dollar: 2000,
            email: 'boseokjung@gmail.com',
            token: {},
            confirmList: [],
            mysideConfirmList: [],
        };
    }

    async componentDidMount() {
        const tokens = await AsyncStorage.getItem('Token');
        const token = JSON.parse(tokens);
        console.log(token.token);
        this.setState({token: token}, () => this.getConfirm(token.token));
        this.getConfirmMyside(token.token);
    }

    getConfirm(token) { //내가 받은 친구 요청 상태 확인
        fetch(PrivateAddr.getAddr() + "friend/confirmcheck", {
            method: 'GET', headers: {
                "Authorization": token,
                "Accept": "*/*",
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message == "SUCCESS") {
                    this.setState({confirmList: responseJson.list, confirmLoad: true});
                } else {
                    alert('데이터 로드에 실패했습니다.');
                }
            })
            .catch((error) => {
                alert('Network Connection Fail : ' + error);
                console.error(error);
            }).done();
    }

    getConfirmMyside(token) { //내가 보낸 친구 요청 상태 확인
        fetch(PrivateAddr.getAddr() + "friend/confirmmyside", {
            method: 'GET', headers: {
                "Authorization": token,
                "Accept": "*/*",
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.message == "SUCCESS") {
                    this.setState({mysideConfirmList: responseJson.list, mysideLoad: true});
                } else {
                    alert('데이터 로드에 실패했습니다.');
                }
            })
            .catch((error) => {
                alert('Network Connection Fail : ' + error);
                console.error(error);
            });
    }

    clearStorage() {
        try {
            AsyncStorage.clear();
            realm.write(() => realm.deleteAll());
        } catch (err) {
            alert("clear : " + err);
        }
    }

    confirmRequest(id) { //오류가발생했습니다 다시시도해주세요! 뜸
        console.log(id);
        var intId = parseInt(id);
        console.log(this.state.token.token);
        try {
            fetch(PrivateAddr.getAddr() + 'friend/agree?Friendid='+intId, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.state.token.token
                },
            }).then((response) => {
                return response.json()
            })
                .then((responseJson) => {
                console.log(responseJson);
                    if (responseJson.message == "SUCCESS") {
                        alert('친구 요청을 수락했습니다');
                    } else {
                        alert('오류가 발생했습니다.\n다시 시도해주세요!');
                    }
                })
                .catch((error) => {
                    alert('Network Connection Failed');
                    console.error(error);
                }).done(()=>this.getConfirm(this.state.token.token)); //refresh를 위해 목록을 다시불러온다
        } catch (err) {
            alert('수정실패 ' + err);
            return false;
        }
    }

    denyRequest(id) {

    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.homeWrapper}>
                <Text style={styles.txt}>
                    보유중인 자산 :
                    <Image source={require('../common/img/dollar.png')} style={styles.dollarIcon}/>
                    {this.state.dollar}{'\n'}
                </Text>
                <Text style={styles.warningText}>
                    ** 이 앱을 사용하는 도중에 발생하는
                </Text>
                <Text style={styles.warningText2}>
                    모든 책임은 사용자 본인에게 있습니다 **
                </Text>
                <Text style={styles.btn} onPress={this.clearStorage}>앱 모든 Storage 삭제</Text>
                <Text>{this.state.token.email}</Text>
                <Text>{this.state.token.password}</Text>
                <Text>{this.state.token.token}</Text>
                <View>
                    {(this.state.confirmLoad == true && this.state.confirmList.length != 0) &&
                    <View>
                        <Text style={styles.btnText}>친구 요청이 왔어요!</Text>
                        {this.state.confirmList.map((list, i) => {
                            return (
                                <View style={styles.rowView} key={i}>
                                    <Text style={styles.btnText}>
                                        {list.nickname}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.confirmBtn}
                                        onPress={() => this.confirmRequest(list.id)}
                                    >
                                        <Text style={styles.btnText}>수락</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.confirmBtn}
                                        onPress={() => this.denyRequest(list.id)}
                                    >
                                        <Text style={styles.btnText}>거절</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                    }
                    {(this.state.mysideLoad == true && this.state.mysideConfirmList.length != 0) &&
                    <View>
                        <Text style={styles.btnText}>요청 대기중인 친구</Text>
                        <View style={styles.rowView}>
                            {this.state.mysideConfirmList.map((list, i) => {
                                return (
                                    <Text style={styles.btnText} key={i}>
                                        {list.nickname}
                                    </Text>
                                );
                            })}
                        </View>
                    </View>
                    }
                </View>
            </ScrollView>
        );
    }
}

const IconSize = 25;
const styles = StyleSheet.create({
    homeWrapper: {
        padding: 40,
    },
    txt: {
        color: '#FFFFFF',
        opacity: 0.8,
        padding: 1,
        fontSize: 17,
        // borderWidth:1,
        marginTop: -10,
    },
    dollarIcon: {
        width: IconSize,
        height: IconSize,
        marginTop: 8,
        marginLeft: 5,
        marginRight: 9,
        opacity: 0.7,
    },
    warningText: {
        color: '#FFFFFF',
        opacity: 0.8,
        fontSize: 15,
    },
    warningText2: {
        color: '#FFFFFF',
        opacity: 0.8,
        fontSize: 15,
    },
    btn: {
        marginTop: 20,
        color: '#FFFFFF',
        opacity: 0.8,
        fontSize: 25,
    },
    rowView: {
        flexDirection: 'row',
    },
    confirmBtn: {
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
    btnText: {
        color: '#FFFFFF',
        fontSize: 15
    },
});