/**
 * Created by kusob on 2017. 7. 15..
 */

import React, {Component} from 'react';

class Common extends Component{
    static clone(obj) {
        if (obj === null || typeof(obj) !== 'object')
            return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = clone(obj[attr]);
            }
        }
        return copy;
    }

    static generateWalletId(){
        var id = parseInt(new Date().getTime());
        console.log(id);
        return id;
    }
}

export default Common;