/**
 * Created by kusob on 2017. 7. 7..
 */

import React, {Component} from 'react';
import {
    StyleSheet, Alert,
    Text, TextInput, TouchableHighlight, View,
} from 'react-native';
import {Select, Option} from 'react-native-select-list';
import {Actions} from 'react-native-router-flux';
import realm from '../common/realm';
import Common from "../common/common";

export default class MyWalletEditDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id:this.props.id,
            name: '',
            addr:'',
            site:'',
            email: 'boseokjung@gmail.com',
            passwd: '',
            myWallet:[{name:'',site:'',addr:''}],
        };
    }

    componentDidMount(){
        this.getMyWallet();
    }

    getMyWallet(){
        let myWallet = realm.objects('Wallet').filtered('owner=="'+this.state.email+'" AND id=='+parseInt(this.state.id));
        this.setState({myWallet:myWallet, load:true});
    }

    removeWallet(){
        Alert.alert(
            '경고!',
            '지갑이 삭제됩니다.\n정말 지우실건가요!?',
            [
                {text: 'Cancel', onPress: () => {return false}, style: 'cancel'},
                {text: 'OK', onPress: () => {
                    realm.write(() => {
                        try{
                            let myWallet = realm.objects('Wallet').filtered('owner=="'+this.state.email+'" AND id=='+parseInt(this.state.id));
                            realm.delete(myWallet);
                            alert('삭제 성공!');
                            Actions.main({goTo:'myWallet'});
                        } catch(err){
                            alert('삭제실패 '+err);
                            return false;
                        }
                    });
                }},
            ],
            { cancelable: false }
        )
    }

    editWallet(){
        if(this.state.myWallet[0].name==""){
            alert('지갑 이름을 입력하세요!');
            return false;
        } else if(this.state.myWallet[0].addr){
            alert('지갑 주소를 입력하세요!');
            return false;
        } else {
            realm.write(() => {
                try{
                    let myWallet = realm.objects('Wallet').filtered('owner=="'+this.state.email+'" AND id=='+parseInt(this.state.id));
                    realm.delete(myWallet);
                    realm.create('Wallet', {
                        id: this.state.myWallet[0].id,
                        owner: this.state.myWallet[0].owner,
                        name: this.state.myWallet[0].name,
                        site: this.state.myWallet[0].site,
                        addr: this.state.myWallet[0].addr,
                    }, true);
                    alert('수정 성공!');
                    Actions.main({goTo:'myWallet'});
                } catch(err){
                    alert('수정실패 '+err);
                    return false;
                }
            });
        }
    }


    render() {
        return (
            <View style={styles.frame}>
                <Text style={styles.explain}>여기에서 지갑 정보를 수정해보세요!</Text>
                <TextInput
                    style={styles.inputWalletName}
                    value={this.state.myWallet[0].name}
                    onChangeText={(name) => {
                        var stateCopy = Object.assign({}, this.state);
                        stateCopy.myWallet = stateCopy.myWallet.slice();
                        stateCopy.myWallet[0] = Object.assign({}, stateCopy.myWallet[0]);
                        stateCopy.myWallet[0].name = name;
                        this.setState(stateCopy);
                    }}
                    placeholder={'지갑 이름'}
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize = 'none'
                    maxLength={10}
                    multiline={false}
                />
                <Text style={styles.selectSiteText}>사이트를 선택하세요!</Text>
                <Select
                    onSelect={(site) => {
                        var stateCopy = Object.assign({}, this.state);
                        stateCopy.myWallet = stateCopy.myWallet.slice();
                        stateCopy.myWallet[0] = Object.assign({}, stateCopy.myWallet[0]);
                        stateCopy.myWallet[0].site = site;
                        this.setState(stateCopy);
                    }}
                    selectStyle={styles.selectSite}
                    selectTextStyle={styles.selectText}
                    listStyle={styles.selectList}
                    listHeight={200}
                >
                    <Option
                        value={this.state.myWallet[0].site}
                        optionStyle={styles.selectOption}
                        optionTextStyle={styles.selectOptionText}
                    >
                        변경없음
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
                    style={styles.inputWalletAddr}
                    value={this.state.myWallet[0].addr}
                    onChangeText={(addr) => {
                        var stateCopy = Object.assign({}, this.state);
                        stateCopy.myWallet = stateCopy.myWallet.slice();
                        stateCopy.myWallet[0] = Object.assign({}, stateCopy.myWallet[0]);
                        stateCopy.myWallet[0].addr = addr;
                        this.setState(stateCopy);
                    }}
                    placeholder={'지갑 주소'}
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize = 'none'
                    maxLength={200}
                    multiline={false}
                />

                <TouchableHighlight
                    style={styles.removeBtn}
                    underlayColor={'#000000'}
                    onPress={() => this.removeWallet()}
                >
                    <Text style={styles.rightBtnText}>지갑 삭제</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.rightBtn}
                    underlayColor={'#000000'}
                    onPress={() => this.editWallet()}
                >
                    <Text style={styles.rightBtnText}>저장</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

// return(
//     <TextInput
//         style={{borderWidth:1, borderColor:'#000000',height:80,marginBottom:20,}}
//         value={this.state.walletList[i].name}
//         onChangeText={(name) => {
//             var stateCopy = Object.assign({}, this.state);
//             stateCopy.walletList = stateCopy.walletList.slice();
//             stateCopy.walletList[i] = Object.assign({}, stateCopy.walletList[i]);
//             stateCopy.walletList[i].name = name;
//             this.setState(stateCopy);
//             }
//         }
//         key={i}
//     />
// );

const styles = StyleSheet.create({
    frame:{
        alignItems: 'center',
        paddingBottom:85,
    },
    explain:{
        color:'#FFFFFF',
        opacity:0.8,
        fontSize:15,
        margin:15,
    },
    inputWalletName:{
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
    selectSiteText:{
        color:'#FFFFFF',
        fontSize:14,
        opacity:0.8,
        margin:5,
    },
    selectSite:{
        marginBottom:5,
        width:220,
        height:50,
        alignSelf: 'center',
        backgroundColor:'#000000',
        opacity:0.4,
        borderRadius:15,
        paddingLeft:15,
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
    removeBtn:{
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