/**
 * Created by kusob on 2017. 6. 26..
 */
import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text, TouchableOpacity,
    View
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import PrivateAddr from '../../common/private/address';

export default class Notice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            noticeList:[],
        };
    }

    componentDidMount() {
        this.getList();
    }

    getList() {
        fetch(PrivateAddr.getAddr()+"notice")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ noticeList: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View>
                <View style={styles.box}>
                    {this.state.noticeList.map((notice, i) => {
                        return (<NoticeBtn title={notice.title}
                                              content={notice.content}
                                              date={notice.date}
                                              key={i}/>);
                        })
                    }
                </View>
            </View>
        );
    }
}

class NoticeBtn extends Component {
    goTo(id, title, content, date) {
        Actions.noticeDetail({id:id, title:title, content:content, date:date});
    }

    render() {
        return (
            <View style={styles.btn}>
                <TouchableOpacity
                    underlayColor={'#AAAAAA'}
                    onPress={() => this.goTo(this.props.id, this.props.title, this.props.content, this.props.date)}
                >
                    <Text style={styles.menuText}>
                        <Image source={this.props.img} style={styles.menuIcon}/>
                        {this.props.title}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    frame: {
        flex: 1,
    },
    box: {
        // borderBottomWidth: 0.5,
        // borderColor: '#A0A0A0',
    },
    btn: {
        borderBottomWidth: 0.5,
        borderColor: '#FFFFFF',
        padding: 20,
    },
    menuIcon: {
        resizeMode:'stretch',
        width: 17,
        height: 17,
        marginTop:4,
        opacity:0.7
    },
    menuText: {
        backgroundColor:'transparent',
        fontSize: 17,
        color:'white',
        opacity:0.9
    }
});
