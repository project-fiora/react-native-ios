/**
 * Created by kusob on 2017. 7. 15..
 */

'use strict';

import Realm from 'realm';

class Wallet extends Realm.Object {}
Wallet.schema = {
    name: 'Wallet',
    properties: {
        id:'int',
        owner:{ type: 'string', indexed: true },
        name: 'string',
        addr:'string',
        site:'string'
    }
};

var key = new Int8Array(64);
export default new Realm({schema: [Wallet, ], encryptionKey: key});