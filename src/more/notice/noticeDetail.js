/**
 * Created by kusob on 2017. 7. 2..
 */

import React, {Component} from 'react';
import {
    Image,
    StyleSheet, Text,
    View
} from 'react-native';

import TabButton from '../../common/tapButton';


export default class NoticeDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Image source={require('../../common/img/background.png')} style={styles.container}>
                <View style={styles.frame}>
                    <Text style={styles.summaryTitle}>
                        {this.props.title}
                    </Text>
                    <View style={styles.dateWrapper}>
                        <Text style={styles.dateTime}>
                            {this.props.date}
                        </Text>
                    </View>
                    <Text style={styles.txt}>
                        { this.props.content.split('\\n').map( (line, i) => {
                            return (<Text key={i}>{line}{'\n'}</Text>)
                        })
                        }
                    </Text>
                </View>
                <TabButton/>
            </Image>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        width:'100%',
        height:'100%',
        resizeMode: 'cover',
        paddingTop:50,
        paddingLeft:25,
        paddingRight:25,
    },
    frame: {
        flex:1,
        paddingTop:70,
        paddingRight:30,
        paddingLeft:30,
        paddingBottom:30,
    },
    summaryTitle:{

    },
    dateWrapper:{

    },
    dateTime:{

    },
    txt:{

    },
});
