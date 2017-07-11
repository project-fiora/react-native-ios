/**
 * Created by kusob on 2017. 7. 1..
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text, TextInput, TouchableHighlight,
    View
} from 'react-native';

export default class Exchange extends Component {
    render() {

        return (
            <View style={styles.frame}>
                <Text style={styles.txt}>자동화 거래소 기능은 다음 버전에서!{'\n'}기대하세요!</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    frame:{
        padding:20,
    },
    txt:{
        color:'#FFFFFF',
        opacity:0.8,
        padding:1,
        fontSize:17,
        // borderWidth:1,
        marginTop:-10,
    },
});

