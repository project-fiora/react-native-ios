/**
 * Created by kusob on 2017. 7. 1..
 */

import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, TouchableHighlight,
    View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import PrivateAddr from '../common/private/address';

export default class MyWalletEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            walletList: [],
            email: 'boseokjung@gmail.com',
            load: false,
        };
    }

    componentDidMount() {
        this.getWalletList();
    }

    getWalletList() {
        fetch(PrivateAddr.getAddr() + "wallet/list?email=" + this.state.email)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({walletList: responseJson, load: true});
            })
            .catch((error) => {
                console.error(error);
            });
    }


    goTo(part, id, site) {
        Actions.main({goTo: part, id: id, walletSite: site});
    }

    render() {

        return (
            <ScrollView contentContainerStyle={styles.frame}>
                {this.state.load == false &&
                <Text style={styles.explain}>로딩 중...</Text>
                }
                {this.state.load == true &&
                <View>
                    <Text style={styles.explain}>관리 할 지갑을 선택하세요</Text>
                    {this.state.walletList.map((wallet, i) => {
                        return (
                            <TouchableHighlight
                                style={styles.list}
                                underlayColor={'#000000'}
                                onPress={() => this.goTo('myWalletEditDetail', this.state.walletList[i].walletId, this.state.walletList[i].walletSite)}
                                key={i}
                            >
                                <Text style={styles.listText}>
                                    {wallet.walletName}
                                </Text>
                            </TouchableHighlight>
                        );
                    })}
                </View>
                }
            </ScrollView>
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
    list: {
        width: 250,
        height: 50,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 20,
        alignItems: 'center',
        opacity: 0.5,
        padding: 15,
        justifyContent: 'center',
        marginBottom: 5,
    },
    listText: {
        fontSize: 15,
        textAlign: 'center',
        color: '#FFFFFF',
    },
    walletContainer: { //wrapper
        alignItems: 'center',
        flexDirection: 'column',
    },
    selectOption: {},
    w_inputWrapper: { //입력칸과 아이콘 wrapper
        flexDirection: 'row',
    },
    w_inputTextIcon: {
        width: 15,
        height: 15,
        marginRight: -33,
        marginTop: 17,
        opacity: 0.4,
    },
    w_input: { //입력칸
        width: 240,
        height: 50,
        fontSize: 15,
        color: '#FFFFFF',
        padding: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 40,
        marginRight: -25,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 15,
        backgroundColor: '#000000',
        marginBottom: 5,
        opacity: 0.2,
    },
});
