/**
 * Created by kusob on 2017. 6. 28..
 */

import React,{ Component } from 'react';
import {StyleSheet} from 'react-native';
import {Scene, Router} from 'react-native-router-flux';

import Title from './src/index/title';
import Main from './src/index/main';
import NoticeDetail from './src/more/notice/noticeDetail';
import OptionDetail from './src/more/option/optionDetail';

export default class Root extends Component {
    render() {
        return(
            <Router duration={0}>
                <Scene key="root" direction="vertical" hideNavBar>
                    <Scene key="title" component={Title} initial={true}/>
                    <Scene key="main" component={Main}/>
                    <Scene key="noticeDetail" component={NoticeDetail}/>
                    <Scene key="optionDetail" component={OptionDetail}/>
                </Scene>
            </Router>
        );
    }
}