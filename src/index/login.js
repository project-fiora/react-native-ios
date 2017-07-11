/**
 * Created by kusob on 2017. 7. 4..
 */
import React, {Component} from 'react';
import {
    Image,
    Text, TextInput, TouchableHighlight,
    View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import CheckBox from 'react-native-checkbox';
import styles from './index_style';


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 'title',
            email: '',
            passwd: ''
        };
    }

    login() {
        Actions.main({goTo: 'home'});
    }

    render(){
        return(
            <View style={styles.loginContainer}>
                <Image source={require('../common/img/mainIcon.png')} style={styles.mainIcon}/>
                <View style={styles.inputWrapper}>
                    <Image source={require('../common/img/user.png')} style={styles.inputTextIcon}/>

                    <TextInput
                        style={styles.input}
                        value={this.state.email}
                        onChangeText={(email) => this.setState({email: email})}
                        keyboardType='email-address'
                        placeholder={'이메일 주소'}
                        placeholderTextColor="#FFFFFF"
                        autoCapitalize = 'none'
                        maxLength={40}
                        multiline={false}
                        autoFocus={true}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Image source={require('../common/img/passwd.png')} style={styles.inputTextIcon}/>
                    <TextInput
                        style={styles.input}
                        value={this.state.passwd}
                        onChangeText={(pw) => this.setState({passwd: pw})}
                        placeholder={'비밀번호'}
                        placeholderTextColor="#FFFFFF"
                        secureTextEntry={true}
                        maxLength={20}
                        multiline={false}
                    />
                </View>

                <CheckBox
                    containerStyle={{width: 200, marginTop: 5, marginBottom: 40}}
                    label="자동로그인"
                    labelStyle={{opacity: 0.7, color: '#FFFFFF', fontSize: 14,}}
                    checkboxStyle={{opacity: 0.7, width: 14, height: 14}}
                    checkedImage={require('../common/img/check.png')}
                    uncheckedImage={require('../common/img/un.png')}
                    underlayColor="transparent"
                />

                <TouchableHighlight
                    style={styles.button}
                    underlayColor={'#FFFFFF'}
                    onPress={this.login}
                >
                    <Text style={styles.label}>LOGIN</Text>
                </TouchableHighlight>

                <TouchableHighlight
                    style={styles.button}
                    underlayColor={'#FFFFFF'}
                    onPress={this.props.goJoinPage}
                >
                    <Text style={styles.label}>JOIN</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
