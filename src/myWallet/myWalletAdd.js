/**
 * Created by kusob on 2017. 7. 7..
 */

import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, TextInput, TouchableHighlight, TouchableOpacity,
    View,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import realm from '../common/realm';
import Common from "../common/common";

export default class MyWalletAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onClickBox:false,
            email:'boseokjung@gmail.com',
            name:'',
            addr:'',
            site:'none',
            siteList:[
                { site:'사이트를 선택하세요!', value:'none' },
                { site:'coinone.co.kr', value:'coinone.co.kr' },
                { site:'bithumb.com‎', value:'bithumb.com‎' },
                { site:'korbit.co.kr', value:'korbit.co.kr' },
            ],
            currentSite:0,
        };
    }

    addWallet(){
        if(this.state.currentSite==0){
            alert("지갑 사이트를 선택하세요!");
            return false;
        } else if(this.state.name==""){
            alert("지갑 이름을 입력하세요!");
            return false;
        } else if(this.state.name==""){
            alert("지갑 주소를 입력하세요!");
            return false;
        } else {
            try{
                // let wallets = realm.objects('Wallet')
                //                    .filtered('owner="'+this.state.email+'"');
                // var size = wallets.length;
                realm.write(() => {
                    realm.create('Wallet',
                        {
                            id: Common.generateWalletId(),
                            owner: this.state.email,
                            name: this.state.name,
                            addr: this.state.addr,
                            site:this.state.site
                        }
                    );
                });
                alert('지갑을 추가했습니다!');
                Actions.main({goTo:'myWallet'});
            }catch(err){
                alert('add wallet : '+err);
            }
        }
    }

    setSite(i, value) {
        this.setState({currentSite: i,site:value, onClickBox: !this.state.onClickBox});
    }

    render(){
        return (
        <View>
            <ScrollView contentContainerStyle={styles.frame}>
                <Text style={styles.explain}>여기서 지갑을 추가해보세요!</Text>
                <TouchableOpacity
                    underlayColor={'#AAAAAA'}
                    onPress={() => this.setState({onClickBox: !this.state.onClickBox})}
                >
                    <View style={styles.selectBoxWrapper}>
                        <View style={styles.selectBoxRow}>
                            <Text style={styles.selectBoxText}>
                                {this.state.siteList[this.state.currentSite].site}
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
                        return this.state.siteList.map((site, i) => {
                            // if (this.state.currentSite != i)
                                return (
                                    <TouchableOpacity
                                        underlayColor={'#AAAAAA'}
                                        onPress={() => this.setSite(i,site.value)}
                                        key={i}
                                    >
                                        <View style={styles.selectBoxWrapper}>
                                            <View style={styles.selectBoxRow}>
                                                <Text style={styles.selectBoxText}>
                                                    {site.site}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                        })
                    }
                })()}
                <TextInput
                    style={styles.inputId}
                    value={this.state.id}
                    onChangeText={(id) => this.setState({id: id})}
                    placeholder={'아이디'}
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize = 'none'
                    maxLength={40}
                    multiline={false}
                />
                <TextInput
                    style={styles.inputId}
                    value={this.state.passwd}
                    onChangeText={(passwd) => this.setState({passwd: passwd})}
                    placeholder={'비밀번호'}
                    placeholderTextColor="#FFFFFF"
                    secureTextEntry={true}
                    maxLength={20}
                    multiline={false}
                />
                <TextInput
                    style={styles.inputId}
                    value={this.state.walletName}
                    onChangeText={(walletName) => this.setState({name: walletName})}
                    placeholder={'지갑 이름'}
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize = 'none'
                    maxLength={13}
                    multiline={false}
                />
                <TextInput
                    style={styles.inputWalletAddr}
                    value={this.state.walletAddr}
                    onChangeText={(addr) => this.setState({addr: addr})}
                    placeholder={'지갑 주소'}
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize = 'none'
                    maxLength={200}
                    multiline={false}
                />

            </ScrollView>
            <TouchableHighlight
                style={styles.rightBtn}
                underlayColor={'#000000'}
                onPress={() => this.addWallet()}
            >
                <Text style={styles.rightBtnText}>저장</Text>
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
    selectBoxWrapper: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        width: 220,
        height: 40,
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
        fontSize: 15,
    },
    selectBoxIconWrapper: {
        alignItems: 'flex-end',
    },
    selectIcon: {
        color: '#FFFFFF',
        fontSize: 15,
        opacity: 0.9,
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
        marginTop:10,
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
