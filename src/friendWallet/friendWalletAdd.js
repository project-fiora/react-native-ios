/**
 * Created by kusob on 2017. 7. 16..
 */

import React, {Component} from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, TextInput, TouchableHighlight,
    View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class FriendWalletAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            friendEmail:'',
            friendName:'',
        };
    }

    requestFriend(){
        if(this.state.friendEmail==""){
            alert("이메일 주소를 입력하세요!");
            return false;
        } else if(this.state.friendName==""){
            alert("이름을 입력하세요!");
            return false;
        } else {
            try{
                //친구신청 post api call
                alert('친구 요청 메시지를 발송했습니다!');
                Actions.main({goTo:'friendWallet'});
            } catch(err){
                alert('add wallet : '+err);
            }
        }
    }

    render(){
        return (
            <View>
                <ScrollView contentContainerStyle={styles.frame}>
                    <Text style={styles.explain}>
                        여기서 친구를 추가해보세요!{'\n'}
                        친구 요청이 수락되면, 친구의 지갑을 볼 수 있습니다!
                    </Text>
                    <TextInput
                        style={styles.inputId}
                        value={this.state.friendEmail}
                        onChangeText={(email) => this.setState({friendEmail: email})}
                        placeholder={'지갑을 요청할 친구의 이메일 주소'}
                        placeholderTextColor="#FFFFFF"
                        autoCapitalize = 'none'
                        maxLength={50}
                        multiline={false}
                    />
                    <TextInput
                        style={styles.inputId}
                        value={this.state.friendName}
                        onChangeText={(name) => this.setState({friendName: name})}
                        placeholder={'친구의 지갑 그룹 이름'}
                        placeholderTextColor="#FFFFFF"
                        autoCapitalize = 'none'
                        maxLength={15}
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
        fontSize:15,
        margin:15,
    },
    inputId:{
        width:240,
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
        paddingLeft:15,
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
