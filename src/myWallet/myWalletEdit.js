/**
 * Created by kusob on 2017. 7. 1..
 */

import React, {Component} from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text, TouchableHighlight,
    View, AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class MyWalletEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            walletList: [],
            email: 'boseokjung@gmail.com',
            load: false,
            empty: false,
        };
    }

    componentDidMount() {
        this.getFromStorage();
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

    goTo(part, i) {
        Actions.main({goTo: part, i:i});
    }

    render() {

        return (
            <ScrollView contentContainerStyle={styles.frame}>
                {this.state.load == false &&
                <Image
                    source={require('../common/img/loading.gif')}
                    style={styles.loadingIcon}/>
                }
                {(this.state.load == true && this.state.empty == true) &&
                    <View>
                        <Text style={styles.explain}>관리 할 지갑이 없어요!</Text>
                    </View>
                }
                {(this.state.load == true && this.state.empty == false) &&
                <View>
                    <Text style={styles.explain}>관리 할 지갑을 선택하세요</Text>
                    {this.state.walletList.map((wallet, i) => {
                        return (
                            <TouchableHighlight
                                style={styles.list}
                                underlayColor={'#000000'}
                                onPress={() => this.goTo('myWalletEditDetail', i)}
                                key={i}
                            >
                                <Text style={styles.listText}>
                                    {wallet.name}
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
    loadingIcon: {
        width: 40,
        height: 40,
        marginTop: 40,
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
