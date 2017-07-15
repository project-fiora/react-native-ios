/**
 * Created by kusob on 2017. 7. 7..
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text, TextInput, TouchableHighlight, View, AsyncStorage
} from 'react-native';
import {Select, Option} from 'react-native-select-list';
import {Actions} from 'react-native-router-flux';

import Common from '../common/common';

export default class MyWalletEditDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            walletList:[],
            walletId:this.props.id,
            walletName: '',
            walletAddr:'',
            walletSite:'',
            email: 'boseokjung@gmail.com',
            passwd: ''
        };
        this.getFromStorage();
    }

    componentDidMount(){

    }

    async getFromStorage() {
        try {
            const value = await AsyncStorage.getItem(this.state.email+"_walletList");
            if (value !== null) {
                // We have data!!
                this.setState({walletList: JSON.parse(value)});
            }
        } catch (error) {
            // Error retrieving data
            alert(error);
        }
    }

    async editWallet(){ //////////////
        try {
            var tmpStorage = this.state.walletList.slice();
            var tmp = Common.clone(this.state.wallet);
            tmp.name = this.state.walletName;
            tmp.site = this.state.walletSite;
            tmp.addr = this.state.walletAddr;
            tmpStorage.push(tmp);
            console.log(tmpStorage);
            await AsyncStorage.setItem(this.state.email+"_walletList", JSON.stringify(tmpStorage));
            alert('지갑을 추가했습니다!');
            Actions.main({goTo: 'myWallet'});
        } catch (error) {
            // Error saving data
            alert("editWallet : "+error);
        }
    }

    async removeWallet(){ //////////
        try {
            var tmpStorage = this.state.walletList.slice(this.props.i-1,1);
            console.log("지우고나서 Storage");
            console.log(tmpStorage); //지워졌는지 확인
            await AsyncStorage.setItem(this.state.email+"_walletList", JSON.stringify(tmpStorage));
            alert('지갑을 삭제했습니다!');
            Actions.main({goTo: 'myWallet'});
        } catch (error) {
            // Error saving data
            alert("removeWallet : "+error);
        }
    }

    render() {
        return (
            <View style={styles.frame}>
                <Text style={styles.explain}>여기에서 지갑 정보를 수정해보세요!</Text>
                <TextInput
                    style={styles.inputWalletName}
                    value={this.state.walletName}
                    onChangeText={(name) => this.setState({walletName: name})}
                    placeholder={'지갑 이름'}
                    placeholderTextColor="#FFFFFF"
                    autoCapitalize = 'none'
                    maxLength={10}
                    multiline={false}
                />
                <Text style={styles.selectSiteText}>사이트를 선택하세요!</Text>
                <Select
                    onSelect={(site) => this.setState({walletSite: site})}
                    selectStyle={styles.selectSite}
                    selectTextStyle={styles.selectText}
                    listStyle={styles.selectList}
                    listHeight={200}
                >
                    <Option
                        value={this.props.walletSite}
                        optionStyle={styles.selectOption}
                        optionTextStyle={styles.selectOptionText}
                    >
                        {this.props.walletSite}(현재사이트)
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
                    value={this.state.walletAddr}
                    onChangeText={(addr) => this.setState({walletAddr: addr})}
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
//             this.setState(stateCopy);}
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