/**
 * Created by kusob on 2017. 6. 27..
 */

import React, {Component} from 'react';
import {
    Image, ImageBackground,
    StyleSheet, Text, TouchableHighlight, TouchableOpacity,
    View
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import TabButton from '../common/tapButton';
import Home from '../home/home';
import MyWallet from '../myWallet/myWallet';
import MyWalletEdit from '../myWallet/myWalletEdit';
import MyWalletEditDetail from '../myWallet/myWalletEditDetail';
import MyWalletAdd from '../myWallet/myWalletAdd';

import Exchange from '../exchange/exchange';
import Price from '../price/price';
import Coinmarketcap from "../price/coinmarketcap";
import Cryptocompare from '../price/cryptocompare';

import More from '../more/more';
import Option from '../more/option/option';
import OptionDetail from "../more/option/optionDetail";

import Notice from '../more/notice/notice';
import NoticeDetail from "../more/notice/noticeDetail";

import Version from '../more/version';
import Inquire from '../more/inquire';




export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title:'',
            deep:false,
            back:'',
            enableRightBtn:false,
            rightBtnGoTo:'',
            rightBtnText:'',
            refreshGoTo:'price',
        };
    }

    componentWillMount() {
        var p = this.props.goTo;

        if (p == 'home') {
            this.setState({title: '요약'});
        } else if (p == 'myWallet') {
            this.setState({
                title: '내지갑',
                enableRightBtn: true, rightBtnText: '지갑 관리', rightBtnGoTo: 'myWalletEdit'
            });
        } else if (p == 'myWalletEdit') {
            this.setState({
                title: '지갑 관리', deep: true, back: 'myWallet',
                enableRightBtn: true, rightBtnText: '지갑 추가', rightBtnGoTo: 'myWalletAdd'
            });
        } else if(p=='myWalletEditDetail'){
            this.setState({
                title: '지갑 수정', deep: true, back: 'myWalletEdit',
            });
        } else if(p=='myWalletAdd'){
            this.setState({
                title: '지갑 추가', deep: true, back: 'myWalletEdit',
            });
        } else if(p=='exchange'){
            this.setState({title:'자동 거래'});
        } else if(p=='price'){
            this.setState({
                title:'시세 정보',
                enableRightBtn: true, rightBtnText: '다른 정보', rightBtnGoTo: 'cryptocompare'
            });
        } else if(p=='cryptocompare'){
            this.setState({
                title:'시세 정보', deep: true, back:'price'
            });
        } else if(p=='more'){
            this.setState({title:'더보기'});
        } else if(p=='option'){
            this.setState({title:'옵션', deep:true, back:'more'});
        } else if(p=='optionDetail'){
            this.setState({title:this.props.title, deep:true, back:'option'});
        } else if(p=='notice'){
            this.setState({title:'공지사항', deep:true, back:'more'});
        } else if(p=='noticeDetail'){
            this.setState({title:this.props.title, deep:true, back:'notice'});
        } else if(p=='version'){
            this.setState({title:'버전정보', deep:true, back:'more'});
        } else if(p=='inquire'){
            this.setState({title:'문의하기', deep:true, back:'more'});
        }
    }

    goTo(part) {
        Actions.main({goTo:part});
    }

    render() {
        return (
            <ImageBackground
                imageStyle={styles.backgroundImg}
                source={require('../common/img/background.png')}
                style={styles.container}
            >
                <View style={styles.wrapper}>
                    <View style={styles.summaryTitleWrapper}>
                        <Text style={styles.summaryTitle}>
                            {this.state.title}
                        </Text>
                    </View>
                    <View style={styles.hr}/>
                    {this.props.goTo === 'home' && <Home/>}
                    {this.props.goTo === 'price' && <Coinmarketcap/>}
                        {this.props.goTo === 'cryptocompare' && <Cryptocompare/>}
                    {this.props.goTo === 'myWallet' && <MyWallet/>}
                        {this.props.goTo === 'myWalletEdit' && <MyWalletEdit/>}
                        {this.props.goTo === 'myWalletEditDetail' &&
                            <MyWalletEditDetail id={this.props.id}
                                                walletSite={this.props.walletSite}
                            />
                        }
                        {this.props.goTo === 'myWalletAdd' && <MyWalletAdd/>}

                    {this.props.goTo === 'exchange' && <Exchange/>}

                    {this.props.goTo === 'more' && <More/>}
                        {this.props.goTo === 'option' && <Option/>}
                            {this.props.goTo === 'optionDetail' && <OptionDetail/>}
                        {this.props.goTo === 'notice' && <Notice/>}
                            {this.props.goTo === 'noticeDetail' &&
                                <NoticeDetail id={this.props.id}
                                              content={this.props.content}
                                              date={this.props.date}
                                />
                            }
                        {this.props.goTo === 'version' && <Version/>}
                        {this.props.goTo === 'inquire' && <Inquire/>}
                </View>
                {this.state.enableRightBtn == true &&
                    <TouchableHighlight
                        style={styles.rightBtn}
                        underlayColor={'#000000'}
                        onPress={() => this.goTo(this.state.rightBtnGoTo)}
                    >
                        <Text style={styles.rightBtnText}>{this.state.rightBtnText}</Text>
                    </TouchableHighlight>
                }
                {this.state.deep == true &&
                    <TouchableOpacity
                        style={styles.navBackBtn}
                        underlayColor={'#AAAAAA'}
                        onPress={() => this.goTo(this.state.back)}
                    >
                        <Image source={require('../common/img/navArrow.png')}
                               style={styles.navBackArrow}/>
                    </TouchableOpacity>
                }
                <TabButton/>
            </ImageBackground>
        );
    }
}

const navArrowSize = 40;
const navArrowWrapperSize=navArrowSize+10;
var styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        // width:'100%',
        // height:'100%',
    },
    backgroundImg:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
    },
    wrapper: {
        flex:1,
        backgroundColor:'transparent',
        marginTop:30,
    },
    summaryTitleWrapper:{
        height:53,
        padding:10,
        alignItems:'center',
        alignSelf:"center",
    },
    summaryTitle:{
        color:'#FFFFFF',
        opacity:0.9,
        fontSize:22,
        textAlign:'center',
        alignSelf:'center'
        // paddingLeft:
        // backgroundColor:'#000000',
    },
    hr:{
        borderBottomWidth:0.5,
        borderColor:'#FFFFFF',
        opacity:0.8,
    },
    rightBtn: {
        position:'absolute',
        top:38,
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
    navBackBtn:{
        width:navArrowWrapperSize,
        height:navArrowWrapperSize,
        position: 'absolute',
        top:32,
        left:15,
    },
    navBackArrow:{
        width:navArrowSize,
        height:navArrowSize,
        opacity:0.3,
    },
});
