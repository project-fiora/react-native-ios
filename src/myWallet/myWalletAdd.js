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

export default class MyWalletAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email:'boseokjung@gmail.com',
            name:'',
            addr:'',
            site:'none',
        };
    }

    addWallet(){
        if(this.state.site=="none"){
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
                let wallets = realm.objects('Wallet').filtered('owner="'+this.state.email+'"');
                var size = wallets.length;
                realm.write(() => {
                    realm.create('Wallet',
                        {
                            id: size+1,
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

    render(){
        return (
        <View>
            <ScrollView contentContainerStyle={styles.frame}>
                <Text style={styles.explain}>여기서 지갑을 추가해보세요!</Text>
                <Select
                    onSelect={(site) => this.setState({site: site})}
                    selectStyle={styles.selectSite}
                    selectTextStyle={styles.selectText}
                    listStyle={styles.selectList}
                    listHeight={200}
                >
                    <Option
                        value='none'
                        optionStyle={styles.selectOption}
                        optionTextStyle={styles.selectOptionText}
                    >
                        사이트를 선택하세요!
                    </Option>
                    <Option
                        value='coinone.co.kr'
                        optionStyle={styles.selectOption}
                        optionTextStyle={styles.selectOptionText}
                    >
                        coinone.co.kr
                    </Option>
                    <Option
                        value='bithumb.com'
                        optionStyle={styles.selectOption}
                        optionTextStyle={styles.selectOptionText}
                    >
                        bithumb.com‎
                    </Option>
                    <Option
                        value='korbit.co.kr'
                        optionStyle={styles.selectOption}
                        optionTextStyle={styles.selectOptionText}
                        last
                    >
                        korbit.co.kr
                    </Option>
                </Select>
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
                    maxLength={10}
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
