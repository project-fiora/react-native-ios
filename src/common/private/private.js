/**
 * Created by kusob on 2017. 7. 5..
 */

import React, {Component} from 'react';

export default class Private extends Component{
    static getLocalAddr(){
        return "http://127.0.0.1:8080/api/";
    }
    static getRealAddr(){
        return "https://";
    }
}

