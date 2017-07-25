/**
 * Created by kusob on 2017. 7. 24..
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View, AsyncStorage, TouchableOpacity, ScrollView, Image, TextInput, TouchableHighlight
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import PrivateAddr from "../../common/private/address";

export default class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: {},
            comment: '',
            load: false,
        };
    }

    async componentDidMount() {
        await this.getPost();
    }

    async getPost() {
        // GET /api/post/postinfo
        await AsyncStorage.getItem('Token', (err, result) => {
            if (err != null) {
                alert(err);
                return false;
            }
            const token = JSON.parse(result).token;
            this.setState({token:token});
            fetch(PrivateAddr.getAddr() + "post/postinfo?post_id=" + this.props.post_id, {
                method: 'GET', headers: {
                    "Authorization": token,
                    "Accept": "*/*",
                }
            }).then((response) => response.json()).then((responseJson) => {
                if (responseJson.message == "SUCCESS") {
                    // var myCommentList = responseJson.comment_list.filter((item) => {
                    //     return item.posibleEdditAndDelete === true;
                    // });
                    // console.log(myCommentList);
                    this.setState({
                        post: responseJson,
                        // myCommentList: myCommentList,
                        load: true,
                    });
                } else {
                    alert("게시물 정보를 가져올 수 없습니다");
                    return false;
                }
            }).catch((error) => {
                console.error(error);
            }).done();
        });
    }

    editPost() {
        Actions.main({
            goTo: 'postEdit',
            post_id: this.props.post_id,
            title: this.state.post.title,
            contents: this.state.post.contents,
            edit: true,
        });
    }

    editCommentBtn(i) { //state에 어떤 댓글의 수정버튼을 눌렀는지 저장-그리고 contents의 개행문자들을 개행으로 바꿔서 보여준다
        var stateCopy = Object.assign({}, this.state);
        stateCopy.post.comment_list = stateCopy['post'].comment_list.slice();
        stateCopy.post.comment_list[i].contents = stateCopy.post.comment_list[i].contents.replace(/\\n/g, "\n");
        stateCopy.post.comment_list[i].editStatus = true;
        this.setState(stateCopy);
    }

    editCommentText(contents, i){ //textInput 의 텍스트가 바뀔때마다 comment_list객체 내부를 수정
        var stateCopy = Object.assign({}, this.state);
        stateCopy.post.comment_list = stateCopy['post'].comment_list.slice();
        stateCopy.post.comment_list[i].contents = contents;
        this.setState(stateCopy);
    }

    editComment(comment_id, contents) {
        // PUT /api/comments/commentedit
        try {
            console.log(this.state.token);
            fetch(PrivateAddr.getAddr() + 'comments/commentedit', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.state.token
                },
                body: JSON.stringify({
                    post_id: this.props.post_id,
                    comment_id:comment_id,
                    contents: contents.replace(/\n/g, "\\n"),
                })
            }).then((response) => {
                return response.json()
            }).then((responseJson) => {
                console.log(responseJson);
                if (responseJson.message == "SUCCESS") {
                    this.getPost();
                } else {
                    alert('오류가 발생했습니다.\n다시 시도해주세요!');
                }
            }).catch((error) => {
                alert('Network Connection Failed');
                console.error(error);
            }).done();
        } catch (err) {
            alert('수정실패 ' + err);
            return false;
        } finally {
            this.setState({enable: null});
        }
    }

    deleteComment(post_id, comment_id) {

    }

    addComment() {

    }

    render() {
        if (this.state.load == true) {
            return (
                <View style={styles.frame}>
                    <ScrollView>
                        <View>
                            <Text style={styles.title}>{this.state.post.title}</Text>
                            <Text style={styles.date}>{this.state.post.written_date}</Text>
                            <Text style={styles.name}>{this.state.post.writter_name}</Text>
                            <View style={styles.contentsWrapper}>
                                {this.state.post.contents.split("\\n").map((content, i) => {
                                    return (
                                        <Text key={i} style={styles.content}>{content}</Text>
                                    );
                                })}
                            </View>
                        </View>
                        <Text style={styles.commentLength}>댓글 {this.state.post.comment_list.length}개</Text>
                        {this.state.post.comment_list.map((comment, i) => {
                            if (comment.posibleEdditAndDelete) { //자신이 쓴 댓글은 수정/삭제 버튼이있다
                                return (
                                    <View key={i} style={styles.commentView}>
                                        <View style={styles.commentRow}>
                                            <Text style={styles.commentWriter}>{comment.writter_name}</Text>
                                            <Text style={styles.commentDate}>{comment.written_date}</Text>
                                        </View>
                                        <View style={styles.commentContentRow}>

                                            {this.state.post.comment_list[i].editStatus &&
                                            <TextInput
                                                style={styles.inputEditComment}
                                                multiline={true}
                                                numberOfLines={5}
                                                value={this.state.post.comment_list[i].contents}
                                                onChangeText={(comment_edit) => {this.editCommentText(comment_edit, i)}}
                                                placeholderTextColor="#FFFFFF"
                                                autoCapitalize='none'
                                                autoCorrect={false}
                                                maxLength={1000}
                                            />
                                            }
                                            {this.state.post.comment_list[i].editStatus != true &&
                                            <View>
                                                {comment.contents.split("\\n").map((content, i) => {
                                                    return (
                                                        <Text key={i} style={styles.commentContents}>{content}</Text>
                                                    )
                                                })}
                                            </View>
                                            }
                                            <View style={styles.commentRow}>
                                                {this.state.post.comment_list[i].editStatus &&
                                                <TouchableOpacity
                                                    onPress={() => this.editComment(comment.comment_id, this.state.post.comment_list[i].contents)}
                                                >
                                                    <Text style={styles.commentEditBtnText}>저장</Text>
                                                </TouchableOpacity>
                                                }
                                                {this.state.post.comment_list[i].editStatus != true &&
                                                <TouchableOpacity
                                                    onPress={() => this.editCommentBtn(i)}
                                                >
                                                    <Text style={styles.commentEditBtnText}>수정</Text>
                                                </TouchableOpacity>
                                                }

                                                <Text style={styles.commentEditBtnTextBetween}> | </Text>
                                                <TouchableOpacity
                                                    onPress={() => this.deleteComment(this.props.post_id, comment.comment_id)}
                                                >
                                                    <Text style={styles.commentEditBtnText}>삭제</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }
                            return (
                                <View key={i} style={styles.commentView}>
                                    <View style={styles.commentRow}>
                                        <Text style={styles.commentWriter}>{comment.writter_name}</Text>
                                        <Text style={styles.commentDate}>{comment.written_date}</Text>
                                    </View>
                                    <View style={styles.commentRow}>
                                        <Text style={styles.commentContents}>{comment.contents}</Text>
                                    </View>
                                </View>
                            )
                        })}
                        <View style={styles.commentAddRow}>
                            <TextInput
                                style={styles.inputComment}
                                multiline={true}
                                numberOfLines={3}
                                value={this.state.comment}
                                onChangeText={(comment) => this.setState({comment: comment})}
                                placeholder={'댓글 내용'}
                                placeholderTextColor="#FFFFFF"
                                autoCapitalize='none'
                                autoCorrect={false}
                                maxLength={1000}
                            />
                            <TouchableHighlight
                                style={styles.commentBtn}
                                underlayColor={'#000000'}
                                onPress={() => this.addComment()}
                            >
                                <Text style={styles.commentBtnText}>등록</Text>
                            </TouchableHighlight>
                        </View>
                    </ScrollView>
                    {/*/////////////////자신이 쓴 게시물일 경우///////////////*/}
                    {this.state.post.possibleEdditAndDelete &&
                    <TouchableOpacity
                        style={styles.editBtn}
                        onPress={() => this.editPost(this.props.post_id)}
                    >
                        <Text style={styles.editBtnText}>수정</Text>
                    </TouchableOpacity>
                    }
                </View>
            );
        } else {
            return (
                <View style={styles.loadingIconWrapper}>
                    <Image source={require('../../common/img/loading.gif')} style={styles.loadingIcon}/>
                </View>
            );
        }
    }
}

const commentBtnHeight = 90;
var styles = StyleSheet.create({
    frame: {
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 55,
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
    title: {
        fontSize: 18,
        color: '#FFFFFF',
        opacity: 0.8,
        textAlign: 'center',
        marginBottom: 15,
    },
    date: {
        fontSize: 13,
        color: '#FFFFFF',
        opacity: 0.8,
        textAlign: 'right',
        marginBottom: 5,
    },
    name: {
        fontSize: 14,
        color: '#FFFFFF',
        opacity: 0.8,
        textAlign: 'right',
        marginBottom: 15,
    },
    contentsWrapper: {
        marginBottom: 20,
        minHeight: 200,
    },
    content: {
        fontSize: 15,
        color: '#FFFFFF',
        opacity: 0.8,
    },
    commentLength: {
        fontSize: 15,
        color: '#DBCEFF',
        opacity: 0.9,
        paddingLeft: 10,
        marginBottom: 10,
    },
    commentView: { //댓글 뷰
        borderColor: '#FFFFFF',
        borderWidth: 0.5,
        borderRadius: 12,
        padding: 10,
        marginBottom: 5,
    },
    commentRow: { //글쓴이, 날짜 뷰
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    commentContentRow: { //댓글내용 수정 삭제 버튼 뷰
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    commentWriter: {
        fontSize: 16,
        color: '#FFFFFF',
        opacity: 0.9,
    },
    commentDate: {
        fontSize: 13,
        color: '#FFFFFF',
        opacity: 0.7,
    },
    commentContents: {
        fontSize: 15,
        color: '#FFFFFF',
        opacity: 0.8,
    },
    inputEditComment: {
        width: 210,
        height: 60,
        color: '#FFFFFF',
        padding: 10,
        paddingTop: 5,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 7,
        backgroundColor: 'transparent',
        opacity: 0.5,
        fontSize: 13,
    },
    commentEditBtnText: { //수정/삭제
        fontSize: 15,
        color: '#FFFFFF',
        opacity: 0.8,
    },
    commentEditBtnTextBetween: { //수정/삭제 사이의 |
        fontSize: 15,
        color: '#FFFFFF',
        opacity: 0.8,
        marginTop: -3,
    },
    commentAddRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    inputComment: {
        width: 235,
        height: commentBtnHeight,
        fontSize: 15,
        color: '#FFFFFF',
        padding: 15,
        paddingTop: 15,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 12,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        opacity: 0.5,
    },
    commentBtn: {
        width: 70,
        height: commentBtnHeight,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#FFFFFF',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5
    },
    commentBtnText: {
        color: '#FFFFFF',
        fontSize: 15
    },
    editBtn: {
        position: 'absolute',
        top: -45,
        right: 15,
        width: 80,
        height: 30,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#FFFFFF',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.6
    },
    editBtnText: {
        color: '#FFFFFF',
        fontSize: 15
    },
});
