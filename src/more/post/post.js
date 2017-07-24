/**
 * Created by kusob on 2017. 7. 24..
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text, TouchableHighlight,
    View, AsyncStorage, TouchableOpacity, ScrollView, Image
} from 'react-native';
import PrivateAddr from "../../common/private/address";

export default class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topList: [],
            postList: [],
            currentPage: 0,
        };
    }

    async componentDidMount() {
        await this.getPostList(0);
    }

    async getPostList(size) {
        // GET /api/post/postlist
        await AsyncStorage.getItem('Token', (err, result) => {
            if (err != null) {
                alert(err);
                return false;
            }
            const token = JSON.parse(result).token;
            fetch(PrivateAddr.getAddr() + "post/postlist?size=" + size, {
                method: 'GET', headers: {
                    "Authorization": token,
                    "Accept": "*/*",
                }
            }).then((response) => response.json()).then((responseJson) => {
                console.log(responseJson);
                if (responseJson.message == "SUCCESS") {
                    var list = responseJson.list;
                    if (list.length == 0) {
                        this.setState({topList: [], postList: [], load: true});
                    } else {
                        this.setState({topsList: responseJson.top, postList: list, load: true});
                    }
                } else {
                    alert("게시판 정보를 가져올 수 없습니다");
                    return false;
                }
            }).catch((error) => {
                console.error(error);
            }).done();
        });
    }

    readPost() {

    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.frame}>
                {!this.state.load &&
                <View style={styles.loadingIconWrapper}>
                    <Image source={require('../../common/img/loading.gif')} style={styles.loadingIcon}/>
                </View>
                }
                {this.state.load &&
                <View>
                    <View style={styles.thead}>
                        <View style={styles.th1}>
                            <Text style={styles.headText}>
                                추천
                            </Text>
                        </View>
                        <View style={styles.th2}>
                            <Text style={styles.headText}>
                                제목
                            </Text>
                        </View>
                        <View style={styles.th3}>
                            <Text style={styles.headText}>
                                작성자
                            </Text>
                        </View>
                    </View>
                    {this.state.topList.map((top, i) => {
                        console.log("asdf");
                        return (
                            <View key={i} style={styles.topTr}>
                                <View style={styles.td1}>
                                    <Text style={styles.bodyText}>
                                        {top.likes_count}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => this.readPost(top.post_id)}
                                    style={styles.td2}>
                                    <Text style={styles.bodyText}>
                                        {top.title}
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.td3}>
                                    <Text style={styles.bodyText}>
                                        {top.nickname}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                    {this.state.postList.map((post, i) => {
                        return (
                            <View key={i} style={styles.postTr}>
                                <View style={styles.td1}>
                                    <Text style={styles.bodyText}>
                                        {post.likes_count}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => this.readPost(post.post_id)}
                                    style={styles.td2}>
                                    <Text style={styles.bodyText}>
                                        {post.title}
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.td3}>
                                    <Text style={styles.bodyText}>
                                        {post.nickname}
                                    </Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
                }
            </ScrollView>
        );
    }
}

var styles = StyleSheet.create({
    frame: {
        padding: 20,
        opacity: 0.8,
    },
    loadingIconWrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingIcon: {
        width: 30,
        height: 30,
    },
    thead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1.5,
        borderColor: '#FFFFFF',
        height: 35,
    },
    headText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    th1: {
        alignItems: 'center',
        width: 40,
    },
    th2: {
        alignItems: 'flex-start',
        width: 170,
        paddingLeft: 5,
    },
    th3: {
        alignItems: 'center',
        width: 100,
    },
    topTr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.6,
        borderColor: '#FFFFFF',
        height: 40,
    },
    topThirdTr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1.2,
        borderColor: '#FFFFFF',
        height: 40,
    },
    postTr: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.6,
        borderColor: '#FFFFFF',
        height: 40,
    },
    bodyText: {
        fontSize: 17,
        color: '#FFFFFF',
    },
    td1: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
    },
    td2: {
        justifyContent: 'center',
        width: 170,
        paddingLeft: 5,
    },
    td3: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    },
});
