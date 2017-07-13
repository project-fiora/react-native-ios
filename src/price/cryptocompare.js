/**
 * Created by kusob on 2017. 7. 13..
 */

import React, {Component} from 'react';
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View, AsyncStorage, Image
} from 'react-native';

import PrivateAddr from '../common/private/address';

export default class Cryptocompare extends Component {
    constructor(props) {
        super(props);

        this.state = {
            load:false,
            refreshing:false,
            infoList: [
                {title:'BTC',krw:'',btc:'',btcKrw:'',usd:'',usdKrw:'',usdKrwPremium:'',percent:''},
                {title:'ETH',krw:'',btc:'',btcKrw:'',usd:'',usdKrw:'',usdKrwPremium:'',percent:''},
            ],
        };
        this.getPriceInfo();
    }

    componentDidMount() {
        this.getFromStorage('cryptocompare');
    }

    async getFromStorage(keyName){
        try {
            const value = await AsyncStorage.getItem(keyName);
            if (value !== null){
                this.setState({infoList:JSON.parse(value).responseJson});
            }
        } catch (error) {
            // Error retrieving data
            alert(error);
        }
    }

    _onRefresh() {
        this.setState({refreshing: true});
        this.getPriceInfo();
    }

    getPriceInfo() {
        fetch(PrivateAddr.getAddr() + "price/cryptocompare")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({infoList: responseJson, refreshing:false, load:true});
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        const tableHead = ['분류', 'KRW', 'USDKRW', 'USD', 'KR - US', 'BTC', '' ];
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                        progressBackgroundColor='#FFFFFF'
                        tintColor='#FFFFFF'
                    />
                }
                contentContainerStyle={styles.priceWrapper}
            >
                {this.state.load == false &&
                <View>
                    <Image
                        source={require('../common/img/loading.gif')}
                        style={styles.loadingIcon}/>
                </View>
                }
                <Text style={styles.explain}>
                    실시간 시세 차이에 주의하세요!{'\n'}
                    아래로 당겨서 데이터를 갱신하세요!
                </Text>
                {this.state.load == true &&
                    <View>

                        <View style={styles.thead}>
                            <View style={styles.th1}>
                                <Text style={styles.htxt}>{tableHead[0]}</Text>
                            </View>
                            <View style={styles.th2}>
                                <Text style={styles.htxt}>{tableHead[1]}</Text>
                            </View>
                            <View style={styles.th3}>
                                <Text style={styles.htxt}>{tableHead[2]}</Text>
                            </View>
                            <View style={styles.th4}>
                                <Text style={styles.htxt}>{tableHead[3]}</Text>
                            </View>
                        </View>
                        {this.state.infoList.map((info, i) => {
                            return (
                                <View key={i} style={styles.tr}>
                                    <View style={styles.td1}>
                                        <Text style={styles.title}>{info.title}</Text>
                                    </View>
                                    <View style={styles.td2}>
                                        <Text style={styles.txt}>{parseFloat(info.krw).toFixed(1)}</Text>
                                    </View>
                                    <View style={styles.td3}>
                                        <Text style={styles.txt}>{parseFloat(info.usdKrw).toFixed(1)}</Text>
                                    </View>
                                    <View style={styles.td4}>
                                        <Text style={styles.txt}>{parseFloat(info.usd).toFixed(2)}</Text>
                                    </View>
                                </View>
                            );
                        })}
                        <View style={styles.betweenTable}/>
                        {/*////////////////////////////////여기까지 첫번째 테이블////////////////////////////////*/}
                        <View style={styles.thead}>
                            <View style={styles.th1}>
                                <Text style={styles.htxt}>{tableHead[0]}</Text>
                            </View>
                            <View style={styles.th5}>
                                <Text style={styles.htxt}>{tableHead[4]}</Text>
                            </View>
                            <View style={styles.th6}>
                                <Text style={styles.htxt}>{tableHead[5]}</Text>
                            </View>
                            {/*<View s*tyle={styles.th7}>*/}
                            {/*<Text style={styles.htxt}>{tableHead[6]}</Text>*/}
                            {/*</View>*/}
                        </View>
                        {this.state.infoList.map((info, i) => {
                            const space = " ";
                            return (
                                <View key={i} style={styles.tr}>
                                    <View style={styles.td1}>
                                        <Text style={styles.title}>{info.title}</Text>
                                    </View>
                                    <View style={styles.td5}>
                                        <Text style={styles.txt}>{parseFloat(info.usdKrwPremium).toFixed(1)}{space}({info.percent}%)</Text>
                                    </View>
                                    <View style={styles.td6}>
                                        <Text style={styles.txt}>{parseFloat(info.btc).toFixed(8)}</Text>
                                    </View>
                                    {/*<View style={styles.td7}>*/}
                                    {/*<Text style={styles.txt}></Text>*/}
                                    {/*</View>*/}
                                </View>
                            );
                        })}
                        <Text style={styles.origin}>
                            데이터 출처 : https://www.cryptocompare.com/
                        </Text>
                    </View>
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    priceWrapper: {
        alignItems:'center',
    },
    loadingIcon: {
        width: 40,
        height: 40,
        marginTop: 40,
    },
    explain: {
        color: '#FFFFFF',
        opacity: 0.8,
        fontSize: 18,
        margin: 15,
        textAlign:'center',
    },
    thead: {
        flexDirection: 'row',
    },
    th1: {
        width: 60,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#FFFFFF',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 1,
        backgroundColor: '#000000',
        opacity: 0.5,
    },
    th2: {
        width: 100,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#FFFFFF',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 1,
        backgroundColor: '#000000',
        opacity: 0.5,
    },
    th3: {
        width: 95,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#FFFFFF',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 1,
        backgroundColor: '#000000',
        opacity: 0.5,
    },
    th4: {
        width: 80,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#FFFFFF',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 1,
        backgroundColor: '#000000',
        opacity: 0.5,
    },
    th5: {
        width: 150,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#FFFFFF',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 1,
        backgroundColor: '#000000',
        opacity: 0.5,
    },
    th6: { //BTC
        width: 125,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#FFFFFF',
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 1,
        backgroundColor: '#000000',
        opacity: 0.5,
    },
    th7: { //비율
        width: 15,
        // borderWidth: 1,
        // borderRadius: 7,
        // borderColor: '#FFFFFF',
        // padding: 2,
        // alignItems: 'center',
        // justifyContent: 'center',
        // margin: 1,
        // backgroundColor: '#000000',
        // opacity: 0.5,
    },
    htxt: {
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontSize: 10,
        opacity: 0.8
    },
    tr: {
        flexDirection: 'row',
    },
    td1: { // 분류
        width: 60,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#FFFFFF',
        opacity: 0.8,
        padding: 2,
        alignItems: 'center',
        margin: 1,
    },
    td2: { //KRW
        width: 100,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#FFFFFF',
        opacity: 0.8,
        padding: 2,
        paddingRight:7,
        alignItems: 'flex-end',
        margin: 1,
    },
    td3: { //USDKRW
        width: 95,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#FFFFFF',
        opacity: 0.8,
        padding: 2,
        paddingRight:7,
        alignItems: 'flex-end',
        margin: 1,
    },
    td4: { //USD
        width: 80,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#FFFFFF',
        opacity: 0.8,
        padding: 2,
        paddingRight:7,
        alignItems: 'flex-end',
        margin: 1,
    },
    td5: {
        width: 150,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#FFFFFF',
        opacity: 0.8,
        padding: 2,
        paddingRight:7,
        alignItems: 'flex-end',
        margin: 1,
    },
    td6: { //비율
        width: 125,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: '#FFFFFF',
        opacity: 0.8,
        padding: 2,
        paddingRight:7,
        alignItems: 'flex-end',
        margin: 1,
    },
    td7: { //비율
        width: 15,
        // borderWidth: 1,
        // borderRadius: 7,
        // borderColor: '#FFFFFF',
        // opacity: 0.8,
        // padding: 2,
        // alignItems: 'center',
        // margin: 1,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        opacity: 0.8
    },
    htxt: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    txt: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    betweenTable: {
        margin: 5,
    },
    origin:{
        marginTop:10,
        marginRight:12,
        textAlign:'right',
        alignSelf:'flex-end',
        color:'#FFFFFF',
        fontSize:13,
    },
});

