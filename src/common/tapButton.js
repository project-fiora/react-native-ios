/**
 * Created by kusob on 2017. 6. 26..
 */
import React, {Component} from "react";
import {Image, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux';

export default class TabButton extends Component {
    render() {
        return (
            <View style={styles.taps}>
                <Tap img={images.home} text="홈" goTo="home"/>
                <Tap img={images.price} text="시세" goTo="price"/>
                <Tap img={images.wallet} text="내지갑" goTo="myWallet"/>
                <Tap img={images.exchange} text="자동거래" goTo="exchange"/>
                <Tap img={images.more} text="더보기" goTo="more"/>
            </View>
        )
    }
}

class Tap extends Component {
    goTo(part) {
        Actions.main({goTo:part});
    }

    render() {
        return (
            <View style={styles.tab}>
                <TouchableOpacity
                    underlayColor={'#AAAAAA'}
                    onPress={() => this.goTo(this.props.goTo)}
                >
                    <View style={styles.btn}>
                        <Image
                            source={this.props.img}
                            style={styles.boxSize}
                        />
                        <Text style={styles.boxText}>{this.props.text}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const images = {
    home: require('./img/home.png'),
    wallet: require('./img/wallet2.png'),
    exchange: require('./img/exchange2.png'),
    price: require('./img/price.png'),
    more: require('./img/more.png'),
};

var styles = StyleSheet.create({
    taps: {
        height: 80,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 0.5,
        borderColor: '#FFFFFF',
        opacity:0.6
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        alignItems: 'center',
    },
    boxSize: {
        marginTop: -14,
        height: 60, width: 60,
    },
    boxText: {
        marginTop: -6,
        color:'#FFFFFF',
        fontSize:12
    }
});