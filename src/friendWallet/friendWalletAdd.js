/**
 * Created by kusob on 2017. 7. 16..
 */

/**
 * Created by kusob on 2017. 7. 7..
 */

import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, TextInput, TouchableHighlight,
    View,
} from 'react-native';
import {Select, Option} from 'react-native-select-list';
import {Actions} from 'react-native-router-flux';
import realm from '../common/realm';

export default class FriendWalletAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            friendEmail:'holein0ne@naver.com',
            name:'',
            addr:'',
        };
    }

    requestFriend(){
        if(this.state.name==""){
            alert("친구 지갑 이름을 입력하세요!");
            return false;
        } else if(this.state.name==""){
            alert("친구 지갑 주소를 입력하세요!");
            return false;
        } else { //친구신청 post api call
            try{
                let wallets = realm.objects('FriendWallet')
                                   .filtered('owner="'+this.state.friendEmail+'"');
                var size = wallets.length;
                realm.write(() => {
                    realm.create('FriendWallet',
                        {
                            id: size+1,
                            owner: this.state.friendEmail,
                            name: this.state.name,
                            addr: this.state.addr,
                            site:this.state.site
                        }
                    );
                });
                alert('지갑을 추가했습니다!');
                Actions.main({goTo:'friendWallet'});
            }catch(err){
                alert('add wallet : '+err);
            }
        }
    }

    render(){
        return (
            <View>
                <ScrollView contentContainerStyle={styles.frame}>
                    <Text style={styles.explain}>여기서 친구를 추가해보세요!</Text>
                    <TextInput
                        style={styles.inputId}
                        value={this.state.walletName}
                        onChangeText={(walletName) => this.setState({name: walletName})}
                        placeholder={'친구 지갑 이름'}
                        placeholderTextColor="#FFFFFF"
                        autoCapitalize = 'none'
                        maxLength={10}
                        multiline={false}
                    />
                    <TextInput
                        style={styles.inputWalletAddr}
                        value={this.state.walletAddr}
                        onChangeText={(addr) => this.setState({addr: addr})}
                        placeholder={'친구 지갑 주소'}
                        placeholderTextColor="#FFFFFF"
                        autoCapitalize = 'none'
                        maxLength={200}
                        multiline={false}
                    />

                </ScrollView>
                <TouchableHighlight
                    style={styles.rightBtn}
                    underlayColor={'#000000'}
                    onPress={() => this.requestFriend()}
                >
                    <Text style={styles.rightBtnText}>친구 신청</Text>
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
