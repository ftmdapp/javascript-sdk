## Modules

<dl>
<dt><a href="#module_client">client</a></dt>
<dd></dd>
<dt><a href="#module_crypto">crypto</a></dt>
<dd></dd>
<dt><a href="#amino.module_decode">decode</a></dt>
<dd></dd>
<dt><a href="#amino.module_encode">encode</a></dt>
<dd></dd>
<dt><a href="#module_gov">gov</a></dt>
<dd></dd>
<dt><a href="#module_ledger">ledger</a></dt>
<dd></dd>
<dt><a href="#module_rpc">rpc</a></dt>
<dd></dd>
<dt><a href="#module_Token">Token</a></dt>
<dd></dd>
<dt><a href="#module_utils">utils</a></dt>
<dd></dd>
</dl>

## Classes

<dl>
<dt><a href="#Transaction">Transaction</a></dt>
<dd><p>Creates a new transaction object.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#checkNumber">checkNumber</a></dt>
<dd><p>validate the input number.</p>
</dd>
<dt><a href="#checkCoins">checkCoins</a></dt>
<dd><p>basic validation of coins</p>
</dd>
</dl>

<a name="module_client"></a>

## client

* [client](#module_client)
    * _static_
        * [.ZarClient](#module_client.ZarClient)
            * [new exports.ZarClient(server, useAsyncBroadcast, source)](#new_module_client.ZarClient_new)
            * [.initChain()](#module_client.ZarClient+initChain) ⇒ <code>Promise</code>
            * [.chooseNetwork(network)](#module_client.ZarClient+chooseNetwork)
            * [.setPrivateKey()](#module_client.ZarClient+setPrivateKey) ⇒ <code>Promise</code>
            * [.useAsyncBroadcast(useAsyncBroadcast)](#module_client.ZarClient+useAsyncBroadcast) ⇒ <code>ZarClient</code>
            * [.setSigningDelegate(delegate)](#module_client.ZarClient+setSigningDelegate) ⇒ <code>ZarClient</code>
            * [.setBroadcastDelegate(delegate)](#module_client.ZarClient+setBroadcastDelegate) ⇒ <code>ZarClient</code>
            * [.useDefaultSigningDelegate()](#module_client.ZarClient+useDefaultSigningDelegate) ⇒ <code>ZarClient</code>
            * [.useDefaultBroadcastDelegate()](#module_client.ZarClient+useDefaultBroadcastDelegate) ⇒ <code>ZarClient</code>
            * [.useLedgerSigningDelegate(ledgerApp, preSignCb, postSignCb, errCb)](#module_client.ZarClient+useLedgerSigningDelegate) ⇒ <code>ZarClient</code>
            * [.transfer(fromAddress, toAddress, amount, asset, memo, sequence)](#module_client.ZarClient+transfer) ⇒ <code>Promise</code>
            * [.multiSend(fromAddress, outputs, memo, sequence)](#module_client.ZarClient+multiSend) ⇒ <code>Promise</code>
            * [._prepareTransaction(msg, stdSignMsg, address, sequence, memo)](#module_client.ZarClient+_prepareTransaction) ⇒ [<code>Transaction</code>](#Transaction)
            * [.sendTransaction(tx, sync)](#module_client.ZarClient+sendTransaction) ⇒ <code>Promise</code>
            * [.sendRawTransaction(signedBz, sync)](#module_client.ZarClient+sendRawTransaction) ⇒ <code>Promise</code>
            * [._sendTransaction(msg, stdSignMsg, address, sequence, memo, sync)](#module_client.ZarClient+_sendTransaction) ⇒ <code>Promise</code>
            * [.getAccount(address)](#module_client.ZarClient+getAccount) ⇒ <code>Promise</code>
            * [.getBalance(address)](#module_client.ZarClient+getBalance) ⇒ <code>Promise</code>
            * [.createAccount()](#module_client.ZarClient+createAccount) ⇒ <code>object</code>
            * [.createAccountWithKeystore(password)](#module_client.ZarClient+createAccountWithKeystore)
            * [.createAccountWithMneomnic()](#module_client.ZarClient+createAccountWithMneomnic) ⇒ <code>object</code>
            * [.recoverAccountFromKeystore(keystore, keystore)](#module_client.ZarClient+recoverAccountFromKeystore)
            * [.recoverAccountFromMnemonic(mneomnic)](#module_client.ZarClient+recoverAccountFromMnemonic)
            * [.recoverAccountFromPrivateKey(privateKey)](#module_client.ZarClient+recoverAccountFromPrivateKey)
            * [.checkAddress(address, prefix)](#module_client.ZarClient+checkAddress) ⇒ <code>Boolean</code>
            * [.getClientKeyAddress()](#module_client.ZarClient+getClientKeyAddress) ⇒ <code>String</code>
        * [.DefaultSigningDelegate](#module_client.DefaultSigningDelegate) ⇒ [<code>Transaction</code>](#Transaction)
        * [.DefaultBroadcastDelegate](#module_client.DefaultBroadcastDelegate)
        * [.LedgerSigningDelegate](#module_client.LedgerSigningDelegate) ⇒ <code>function</code>
    * _inner_
        * [~checkOutputs(outputs)](#module_client..checkOutputs)
        * [~calInputCoins(inputs, coins)](#module_client..calInputCoins)

<a name="module_client.ZarClient"></a>

### client.ZarClient
The Zar Network Chain client.

**Kind**: static class of [<code>client</code>](#module_client)  

* [.ZarClient](#module_client.ZarClient)
    * [new exports.ZarClient(server, useAsyncBroadcast, source)](#new_module_client.ZarClient_new)
    * [.initChain()](#module_client.ZarClient+initChain) ⇒ <code>Promise</code>
    * [.chooseNetwork(network)](#module_client.ZarClient+chooseNetwork)
    * [.setPrivateKey()](#module_client.ZarClient+setPrivateKey) ⇒ <code>Promise</code>
    * [.useAsyncBroadcast(useAsyncBroadcast)](#module_client.ZarClient+useAsyncBroadcast) ⇒ <code>ZarClient</code>
    * [.setSigningDelegate(delegate)](#module_client.ZarClient+setSigningDelegate) ⇒ <code>ZarClient</code>
    * [.setBroadcastDelegate(delegate)](#module_client.ZarClient+setBroadcastDelegate) ⇒ <code>ZarClient</code>
    * [.useDefaultSigningDelegate()](#module_client.ZarClient+useDefaultSigningDelegate) ⇒ <code>ZarClient</code>
    * [.useDefaultBroadcastDelegate()](#module_client.ZarClient+useDefaultBroadcastDelegate) ⇒ <code>ZarClient</code>
    * [.useLedgerSigningDelegate(ledgerApp, preSignCb, postSignCb, errCb)](#module_client.ZarClient+useLedgerSigningDelegate) ⇒ <code>ZarClient</code>
    * [.transfer(fromAddress, toAddress, amount, asset, memo, sequence)](#module_client.ZarClient+transfer) ⇒ <code>Promise</code>
    * [.multiSend(fromAddress, outputs, memo, sequence)](#module_client.ZarClient+multiSend) ⇒ <code>Promise</code>
    * [._prepareTransaction(msg, stdSignMsg, address, sequence, memo)](#module_client.ZarClient+_prepareTransaction) ⇒ [<code>Transaction</code>](#Transaction)
    * [.sendTransaction(tx, sync)](#module_client.ZarClient+sendTransaction) ⇒ <code>Promise</code>
    * [.sendRawTransaction(signedBz, sync)](#module_client.ZarClient+sendRawTransaction) ⇒ <code>Promise</code>
    * [._sendTransaction(msg, stdSignMsg, address, sequence, memo, sync)](#module_client.ZarClient+_sendTransaction) ⇒ <code>Promise</code>
    * [.getAccount(address)](#module_client.ZarClient+getAccount) ⇒ <code>Promise</code>
    * [.getBalance(address)](#module_client.ZarClient+getBalance) ⇒ <code>Promise</code>
    * [.createAccount()](#module_client.ZarClient+createAccount) ⇒ <code>object</code>
    * [.createAccountWithKeystore(password)](#module_client.ZarClient+createAccountWithKeystore)
    * [.createAccountWithMneomnic()](#module_client.ZarClient+createAccountWithMneomnic) ⇒ <code>object</code>
    * [.recoverAccountFromKeystore(keystore, keystore)](#module_client.ZarClient+recoverAccountFromKeystore)
    * [.recoverAccountFromMnemonic(mneomnic)](#module_client.ZarClient+recoverAccountFromMnemonic)
    * [.recoverAccountFromPrivateKey(privateKey)](#module_client.ZarClient+recoverAccountFromPrivateKey)
    * [.checkAddress(address, prefix)](#module_client.ZarClient+checkAddress) ⇒ <code>Boolean</code>
    * [.getClientKeyAddress()](#module_client.ZarClient+getClientKeyAddress) ⇒ <code>String</code>

<a name="new_module_client.ZarClient_new"></a>

#### new exports.ZarClient(server, useAsyncBroadcast, source)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| server | <code>String</code> |  | Zar Network Chain public url |
| useAsyncBroadcast | <code>Boolean</code> | <code>false</code> | use async broadcast mode, faster but less guarantees (default off) |
| source | <code>Number</code> | <code>0</code> | where does this transaction come from (default 0) |

<a name="module_client.ZarClient+initChain"></a>

#### ZarClient.initChain() ⇒ <code>Promise</code>
Initialize the client with the chain's ID. Asynchronous.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
<a name="module_client.ZarClient+chooseNetwork"></a>

#### ZarClient.chooseNetwork(network)
Sets the client network (testnet or mainnet).

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  

| Param | Type | Description |
| --- | --- | --- |
| network | <code>String</code> | Indicate testnet or mainnet |

<a name="module_client.ZarClient+setPrivateKey"></a>

#### ZarClient.setPrivateKey() ⇒ <code>Promise</code>
Sets the client's private key for calls made by this client. Asynchronous.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
<a name="module_client.ZarClient+useAsyncBroadcast"></a>

#### ZarClient.useAsyncBroadcast(useAsyncBroadcast) ⇒ <code>ZarClient</code>
Use async broadcast mode. Broadcasts faster with less guarantees (default off)

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
**Returns**: <code>ZarClient</code> - this instance (for chaining)  

| Param | Type | Default |
| --- | --- | --- |
| useAsyncBroadcast | <code>Boolean</code> | <code>true</code> |

<a name="module_client.ZarClient+setSigningDelegate"></a>

#### ZarClient.setSigningDelegate(delegate) ⇒ <code>ZarClient</code>
Sets the signing delegate (for wallet integrations).

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
**Returns**: <code>ZarClient</code> - this instance (for chaining)  

| Param | Type |
| --- | --- |
| delegate | <code>function</code> |

<a name="module_client.ZarClient+setBroadcastDelegate"></a>

#### ZarClient.setBroadcastDelegate(delegate) ⇒ <code>ZarClient</code>
Sets the broadcast delegate (for wallet integrations).

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
**Returns**: <code>ZarClient</code> - this instance (for chaining)  

| Param | Type |
| --- | --- |
| delegate | <code>function</code> |

<a name="module_client.ZarClient+useDefaultSigningDelegate"></a>

#### ZarClient.useDefaultSigningDelegate() ⇒ <code>ZarClient</code>
Applies the default signing delegate.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
**Returns**: <code>ZarClient</code> - this instance (for chaining)  
<a name="module_client.ZarClient+useDefaultBroadcastDelegate"></a>

#### ZarClient.useDefaultBroadcastDelegate() ⇒ <code>ZarClient</code>
Applies the default broadcast delegate.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
**Returns**: <code>ZarClient</code> - this instance (for chaining)  
<a name="module_client.ZarClient+useLedgerSigningDelegate"></a>

#### ZarClient.useLedgerSigningDelegate(ledgerApp, preSignCb, postSignCb, errCb) ⇒ <code>ZarClient</code>
Applies the Ledger signing delegate.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
**Returns**: <code>ZarClient</code> - this instance (for chaining)  

| Param | Type |
| --- | --- |
| ledgerApp | <code>function</code> |
| preSignCb | <code>function</code> |
| postSignCb | <code>function</code> |
| errCb | <code>function</code> |

<a name="module_client.ZarClient+transfer"></a>

#### ZarClient.transfer(fromAddress, toAddress, amount, asset, memo, sequence) ⇒ <code>Promise</code>
Transfer tokens from one address to another.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
**Returns**: <code>Promise</code> - resolves with response (success or fail)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fromAddress | <code>String</code> |  |  |
| toAddress | <code>String</code> |  |  |
| amount | <code>Number</code> |  |  |
| asset | <code>String</code> |  |  |
| memo | <code>String</code> |  | optional memo |
| sequence | <code>Number</code> | <code></code> | optional sequence |

<a name="module_client.ZarClient+multiSend"></a>

#### ZarClient.multiSend(fromAddress, outputs, memo, sequence) ⇒ <code>Promise</code>
Create and sign a multi send tx

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
**Returns**: <code>Promise</code> - resolves with response (success or fail)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fromAddress | <code>String</code> |  |  |
| outputs | <code>Array</code> |  |  |
| memo | <code>String</code> |  | optional memo |
| sequence | <code>Number</code> | <code></code> | optional sequence |

<a name="module_client.ZarClient+_prepareTransaction"></a>

#### ZarClient.\_prepareTransaction(msg, stdSignMsg, address, sequence, memo) ⇒ [<code>Transaction</code>](#Transaction)
Prepare a serialized raw transaction for sending to the blockchain.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
**Returns**: [<code>Transaction</code>](#Transaction) - signed transaction  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| msg | <code>Object</code> |  | the msg object |
| stdSignMsg | <code>Object</code> |  | the sign doc object used to generate a signature |
| address | <code>String</code> |  |  |
| sequence | <code>Number</code> | <code></code> | optional sequence |
| memo | <code>String</code> |  | optional memo |

<a name="module_client.ZarClient+sendTransaction"></a>

#### ZarClient.sendTransaction(tx, sync) ⇒ <code>Promise</code>
Broadcast a transaction to the blockchain.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
**Returns**: <code>Promise</code> - resolves with response (success or fail)  

| Param | Type | Description |
| --- | --- | --- |
| tx | <code>signedTx</code> | signed Transaction object |
| sync | <code>Boolean</code> | use synchronous mode, optional |

<a name="module_client.ZarClient+sendRawTransaction"></a>

#### ZarClient.sendRawTransaction(signedBz, sync) ⇒ <code>Promise</code>
Broadcast a raw transaction to the blockchain.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
**Returns**: <code>Promise</code> - resolves with response (success or fail)  

| Param | Type | Description |
| --- | --- | --- |
| signedBz | <code>String</code> | signed and serialized raw transaction |
| sync | <code>Boolean</code> | use synchronous mode, optional |

<a name="module_client.ZarClient+_sendTransaction"></a>

#### ZarClient.\_sendTransaction(msg, stdSignMsg, address, sequence, memo, sync) ⇒ <code>Promise</code>
Broadcast a raw transaction to the blockchain.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
**Returns**: <code>Promise</code> - resolves with response (success or fail)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| msg | <code>Object</code> |  | the msg object |
| stdSignMsg | <code>Object</code> |  | the sign doc object used to generate a signature |
| address | <code>String</code> |  |  |
| sequence | <code>Number</code> | <code></code> | optional sequence |
| memo | <code>String</code> |  | optional memo |
| sync | <code>Boolean</code> |  | use synchronous mode, optional |

<a name="module_client.ZarClient+getAccount"></a>

#### ZarClient.getAccount(address) ⇒ <code>Promise</code>
get account

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
**Returns**: <code>Promise</code> - resolves with http response  

| Param | Type |
| --- | --- |
| address | <code>String</code> |

<a name="module_client.ZarClient+getBalance"></a>

#### ZarClient.getBalance(address) ⇒ <code>Promise</code>
get balances

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
**Returns**: <code>Promise</code> - resolves with http response  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>String</code> | optional address |

<a name="module_client.ZarClient+createAccount"></a>

#### ZarClient.createAccount() ⇒ <code>object</code>
Creates a private key and returns it and its address.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
**Returns**: <code>object</code> - the private key and address in an object.
{
 address,
 privateKey
}  
<a name="module_client.ZarClient+createAccountWithKeystore"></a>

#### ZarClient.createAccountWithKeystore(password)
Creates an account keystore object, and returns the private key and address.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  

| Param | Type | Description |
| --- | --- | --- |
| password | <code>String</code> | {  privateKey,  address,  keystore } |

<a name="module_client.ZarClient+createAccountWithMneomnic"></a>

#### ZarClient.createAccountWithMneomnic() ⇒ <code>object</code>
Creates an account from mnemonic seed phrase.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
**Returns**: <code>object</code> - {
 privateKey,
 address,
 mnemonic
}  
<a name="module_client.ZarClient+recoverAccountFromKeystore"></a>

#### ZarClient.recoverAccountFromKeystore(keystore, keystore)
Recovers an account from a keystore object.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  

| Param | Type | Description |
| --- | --- | --- |
| keystore | <code>object</code> | object. |
| keystore | <code>string</code> | password. { privateKey, address } |

<a name="module_client.ZarClient+recoverAccountFromMnemonic"></a>

#### ZarClient.recoverAccountFromMnemonic(mneomnic)
Recovers an account from a mnemonic seed phrase.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  

| Param | Type | Description |
| --- | --- | --- |
| mneomnic | <code>string</code> | { privateKey, address } |

<a name="module_client.ZarClient+recoverAccountFromPrivateKey"></a>

#### ZarClient.recoverAccountFromPrivateKey(privateKey)
Recovers an account using private key.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>String</code> | { privateKey, address } |

<a name="module_client.ZarClient+checkAddress"></a>

#### ZarClient.checkAddress(address, prefix) ⇒ <code>Boolean</code>
Validates an address.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  

| Param | Type |
| --- | --- |
| address | <code>String</code> |
| prefix | <code>String</code> |

<a name="module_client.ZarClient+getClientKeyAddress"></a>

#### ZarClient.getClientKeyAddress() ⇒ <code>String</code>
Returns the address for the current account if setPrivateKey has been called on this client.

**Kind**: instance method of [<code>ZarClient</code>](#module_client.ZarClient)  
<a name="module_client.DefaultSigningDelegate"></a>

### client.DefaultSigningDelegate ⇒ [<code>Transaction</code>](#Transaction)
The default signing delegate which uses the local private key.

**Kind**: static constant of [<code>client</code>](#module_client)  

| Param | Type | Description |
| --- | --- | --- |
| tx | [<code>Transaction</code>](#Transaction) | the transaction |
| signMsg | <code>Object</code> | the canonical sign bytes for the msg |

<a name="module_client.DefaultBroadcastDelegate"></a>

### client.DefaultBroadcastDelegate
The default broadcast delegate which immediately broadcasts a transaction.

**Kind**: static constant of [<code>client</code>](#module_client)  

| Param | Type | Description |
| --- | --- | --- |
| signedTx | [<code>Transaction</code>](#Transaction) | the signed transaction |

<a name="module_client.LedgerSigningDelegate"></a>

### client.LedgerSigningDelegate ⇒ <code>function</code>
The Ledger signing delegate.

**Kind**: static constant of [<code>client</code>](#module_client)  

| Param | Type |
| --- | --- |
| ledgerApp | <code>LedgerApp</code> |
| function | <code>preSignCb</code> |
| function | <code>postSignCb</code> |
| function | <code>errCb</code> |

<a name="module_client..checkOutputs"></a>

### client~checkOutputs(outputs)
validate the input number.

**Kind**: inner method of [<code>client</code>](#module_client)  

| Param | Type |
| --- | --- |
| outputs | <code>Array</code> |

<a name="module_client..calInputCoins"></a>

### client~calInputCoins(inputs, coins)
sum corresponding input coin

**Kind**: inner method of [<code>client</code>](#module_client)  

| Param | Type |
| --- | --- |
| inputs | <code>Array</code> |
| coins | <code>Array</code> |

<a name="module_crypto"></a>

## crypto

* [crypto](#module_crypto)
    * [.decodeAddress](#module_crypto.decodeAddress)
    * [.checkAddress](#module_crypto.checkAddress) ⇒ <code>boolean</code>
    * [.encodeAddress](#module_crypto.encodeAddress)
    * [.generatePrivateKey](#module_crypto.generatePrivateKey) ⇒ <code>string</code>
    * [.generateRandomArray](#module_crypto.generateRandomArray) ⇒ <code>ArrayBuffer</code>
    * [.getPublicKey](#module_crypto.getPublicKey) ⇒ <code>Elliptic.PublicKey</code>
    * [.getPublicKeyFromPrivateKey](#module_crypto.getPublicKeyFromPrivateKey) ⇒ <code>string</code>
    * [.generatePubKey](#module_crypto.generatePubKey) ⇒ <code>Elliptic.PublicKey</code>
    * [.getAddressFromPublicKey](#module_crypto.getAddressFromPublicKey)
    * [.getAddressFromPrivateKey](#module_crypto.getAddressFromPrivateKey)
    * [.generateSignature](#module_crypto.generateSignature) ⇒ <code>Buffer</code>
    * [.verifySignature](#module_crypto.verifySignature) ⇒ <code>Buffer</code>
    * [.generateKeyStore](#module_crypto.generateKeyStore) ⇒ <code>object</code>
    * [.getPrivateKeyFromKeyStore](#module_crypto.getPrivateKeyFromKeyStore)
    * [.generateMnemonic](#module_crypto.generateMnemonic)
    * [.validateMnemonic](#module_crypto.validateMnemonic) ⇒ <code>bool</code>
    * [.getPrivateKeyFromMnemonic](#module_crypto.getPrivateKeyFromMnemonic) ⇒ <code>string</code>

<a name="module_crypto.decodeAddress"></a>

### crypto.decodeAddress
Decodes an address in bech32 format.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | the bech32 address to decode |

<a name="module_crypto.checkAddress"></a>

### crypto.checkAddress ⇒ <code>boolean</code>
Checks whether an address is valid.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | the bech32 address to decode |
| hrp | <code>string</code> | the prefix to check for the bech32 address |

<a name="module_crypto.encodeAddress"></a>

### crypto.encodeAddress
Encodes an address from input data bytes.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | the public key to encode |
| prefix | <code>\*</code> | the address prefix |
| type | <code>\*</code> | the output type (default: hex) |

<a name="module_crypto.generatePrivateKey"></a>

### crypto.generatePrivateKey ⇒ <code>string</code>
Generates 32 bytes of random entropy

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>string</code> - entropy bytes hexstring  

| Param | Type | Description |
| --- | --- | --- |
| len | <code>number</code> | output length (default: 32 bytes) |

<a name="module_crypto.generateRandomArray"></a>

### crypto.generateRandomArray ⇒ <code>ArrayBuffer</code>
Generates an arrayBuffer filled with random bits.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  

| Param | Type | Description |
| --- | --- | --- |
| length | <code>number</code> | Length of buffer. |

<a name="module_crypto.getPublicKey"></a>

### crypto.getPublicKey ⇒ <code>Elliptic.PublicKey</code>
**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>Elliptic.PublicKey</code> - public key hexstring  

| Param | Type | Description |
| --- | --- | --- |
| publicKey | <code>string</code> | Encoded public key |

<a name="module_crypto.getPublicKeyFromPrivateKey"></a>

### crypto.getPublicKeyFromPrivateKey ⇒ <code>string</code>
Calculates the public key from a given private key.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>string</code> - public key hexstring  

| Param | Type | Description |
| --- | --- | --- |
| privateKeyHex | <code>string</code> | the private key hexstring |

<a name="module_crypto.generatePubKey"></a>

### crypto.generatePubKey ⇒ <code>Elliptic.PublicKey</code>
PubKey performs the point-scalar multiplication from the privKey on the
generator point to get the pubkey.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>Elliptic.PublicKey</code> - PubKey  

| Param | Type |
| --- | --- |
| privateKey | <code>Buffer</code> |

<a name="module_crypto.getAddressFromPublicKey"></a>

### crypto.getAddressFromPublicKey
Gets an address from a public key hex.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  

| Param | Type | Description |
| --- | --- | --- |
| publicKeyHex | <code>string</code> | the public key hexstring |
| prefix | <code>string</code> | the address prefix |

<a name="module_crypto.getAddressFromPrivateKey"></a>

### crypto.getAddressFromPrivateKey
Gets an address from a private key.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  

| Param | Type | Description |
| --- | --- | --- |
| privateKeyHex | <code>string</code> | the private key hexstring |

<a name="module_crypto.generateSignature"></a>

### crypto.generateSignature ⇒ <code>Buffer</code>
Generates a signature (64 byte <r,s>) for a transaction based on given private key.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>Buffer</code> - Signature. Does not include tx.  

| Param | Type | Description |
| --- | --- | --- |
| signBytesHex | <code>string</code> | Unsigned transaction sign bytes hexstring. |
| privateKey | <code>string</code> \| <code>Buffer</code> | The private key. |

<a name="module_crypto.verifySignature"></a>

### crypto.verifySignature ⇒ <code>Buffer</code>
Verifies a signature (64 byte <r,s>) given the sign bytes and public key.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>Buffer</code> - Signature. Does not include tx.  

| Param | Type | Description |
| --- | --- | --- |
| sigHex | <code>string</code> | The signature hexstring. |
| signBytesHex | <code>string</code> | Unsigned transaction sign bytes hexstring. |
| publicKeyHex | <code>string</code> | The public key. |

<a name="module_crypto.generateKeyStore"></a>

### crypto.generateKeyStore ⇒ <code>object</code>
Generates a keystore object (web3 secret storage format) given a private key to store and a password.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>object</code> - the keystore object.  

| Param | Type | Description |
| --- | --- | --- |
| privateKeyHex | <code>string</code> | the private key hexstring. |
| password | <code>string</code> | the password. |

<a name="module_crypto.getPrivateKeyFromKeyStore"></a>

### crypto.getPrivateKeyFromKeyStore
Gets a private key from a keystore given its password.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  

| Param | Type | Description |
| --- | --- | --- |
| keystore | <code>string</code> | the keystore in json format |
| password | <code>string</code> | the password. |

<a name="module_crypto.generateMnemonic"></a>

### crypto.generateMnemonic
Generates mnemonic phrase words using random entropy.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
<a name="module_crypto.validateMnemonic"></a>

### crypto.validateMnemonic ⇒ <code>bool</code>
Validates mnemonic phrase words.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>bool</code> - validation result  

| Param | Type | Description |
| --- | --- | --- |
| mnemonic | <code>string</code> | the mnemonic phrase words |

<a name="module_crypto.getPrivateKeyFromMnemonic"></a>

### crypto.getPrivateKeyFromMnemonic ⇒ <code>string</code>
Get a private key from mnemonic words.

**Kind**: static constant of [<code>crypto</code>](#module_crypto)  
**Returns**: <code>string</code> - hexstring  

| Param | Type | Description |
| --- | --- | --- |
| mnemonic | <code>string</code> | the mnemonic phrase words |
| derive | <code>Boolean</code> | derive a private key using the default HD path (default: true) |
| index | <code>number</code> | the bip44 address index (default: 0) |
| password | <code>string</code> | according to bip39 |

<a name="amino.module_decode"></a>

## decode

* [decode](#amino.module_decode)
    * [.unMarshalBinaryLengthPrefixed](#amino.module_decode.unMarshalBinaryLengthPrefixed) ⇒ <code>Object</code>
    * [.unMarshalBinaryBare](#amino.module_decode.unMarshalBinaryBare) ⇒ <code>Object</code>

<a name="amino.module_decode.unMarshalBinaryLengthPrefixed"></a>

### decode.unMarshalBinaryLengthPrefixed ⇒ <code>Object</code>
js amino UnmarshalBinaryLengthPrefixed

**Kind**: static constant of [<code>decode</code>](#amino.module_decode)  

| Param | Type |
| --- | --- |
| bytes | <code>Buffer</code> |
| type | <code>Object</code> |

<a name="amino.module_decode.unMarshalBinaryBare"></a>

### decode.unMarshalBinaryBare ⇒ <code>Object</code>
js amino UnmarshalBinaryBare

**Kind**: static constant of [<code>decode</code>](#amino.module_decode)  

| Param | Type |
| --- | --- |
| bytes | <code>Buffer</code> |
| type | <code>Object</code> |

<a name="amino.module_encode"></a>

## encode

* [encode](#amino.module_encode)
    * [.encodeNumber](#amino.module_encode.encodeNumber)
    * [.encodeBool](#amino.module_encode.encodeBool)
    * [.encodeString](#amino.module_encode.encodeString)
    * [.encodeTime](#amino.module_encode.encodeTime)
    * [.convertObjectToSignBytes](#amino.module_encode.convertObjectToSignBytes) ⇒ <code>Buffer</code>
    * [.marshalBinary](#amino.module_encode.marshalBinary)
    * [.marshalBinaryBare](#amino.module_encode.marshalBinaryBare)
    * [.encodeBinary](#amino.module_encode.encodeBinary) ⇒ <code>Buffer</code>
    * [.encodeBinaryByteArray](#amino.module_encode.encodeBinaryByteArray) ⇒ <code>Buffer</code>
    * [.encodeObjectBinary](#amino.module_encode.encodeObjectBinary) ⇒ <code>Buffer</code>
    * [.encodeArrayBinary](#amino.module_encode.encodeArrayBinary) ⇒ <code>Buffer</code>

<a name="amino.module_encode.encodeNumber"></a>

### encode.encodeNumber
encode number

**Kind**: static constant of [<code>encode</code>](#amino.module_encode)  

| Param |
| --- |
| num |

<a name="amino.module_encode.encodeBool"></a>

### encode.encodeBool
encode bool

**Kind**: static constant of [<code>encode</code>](#amino.module_encode)  

| Param |
| --- |
| b |

<a name="amino.module_encode.encodeString"></a>

### encode.encodeString
encode string

**Kind**: static constant of [<code>encode</code>](#amino.module_encode)  

| Param |
| --- |
| str |

<a name="amino.module_encode.encodeTime"></a>

### encode.encodeTime
encode time

**Kind**: static constant of [<code>encode</code>](#amino.module_encode)  

| Param |
| --- |
| value |

<a name="amino.module_encode.convertObjectToSignBytes"></a>

### encode.convertObjectToSignBytes ⇒ <code>Buffer</code>
**Kind**: static constant of [<code>encode</code>](#amino.module_encode)  
**Returns**: <code>Buffer</code> - bytes  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | - |

<a name="amino.module_encode.marshalBinary"></a>

### encode.marshalBinary
js amino MarshalBinary

**Kind**: static constant of [<code>encode</code>](#amino.module_encode)  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> |

<a name="amino.module_encode.marshalBinaryBare"></a>

### encode.marshalBinaryBare
js amino MarshalBinaryBare

**Kind**: static constant of [<code>encode</code>](#amino.module_encode)  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> |

<a name="amino.module_encode.encodeBinary"></a>

### encode.encodeBinary ⇒ <code>Buffer</code>
This is the main entrypoint for encoding all types in binary form.

**Kind**: static constant of [<code>encode</code>](#amino.module_encode)  
**Returns**: <code>Buffer</code> - binary of object.  

| Param | Type | Description |
| --- | --- | --- |
| js | <code>\*</code> | data type (not null, not undefined) |
| field | <code>Number</code> | index of object |
| isByteLenPrefix | <code>Boolean</code> |  |

<a name="amino.module_encode.encodeBinaryByteArray"></a>

### encode.encodeBinaryByteArray ⇒ <code>Buffer</code>
prefixed with bytes length

**Kind**: static constant of [<code>encode</code>](#amino.module_encode)  
**Returns**: <code>Buffer</code> - with bytes length prefixed  

| Param | Type |
| --- | --- |
| bytes | <code>Buffer</code> |

<a name="amino.module_encode.encodeObjectBinary"></a>

### encode.encodeObjectBinary ⇒ <code>Buffer</code>
**Kind**: static constant of [<code>encode</code>](#amino.module_encode)  
**Returns**: <code>Buffer</code> - with bytes length prefixed  

| Param | Type |
| --- | --- |
| obj | <code>Object</code> |

<a name="amino.module_encode.encodeArrayBinary"></a>

### encode.encodeArrayBinary ⇒ <code>Buffer</code>
**Kind**: static constant of [<code>encode</code>](#amino.module_encode)  
**Returns**: <code>Buffer</code> - bytes of array  

| Param | Type | Description |
| --- | --- | --- |
| fieldNum | <code>Number</code> | object field index |
| arr | <code>Array</code> |  |
| isByteLenPrefix | <code>Boolean</code> |  |

## ledger

* [ledger](#module_ledger)
    * [~LedgerApp](#module_ledger.LedgerApp)
        * [new LedgerApp(transport, interactiveTimeout, nonInteractiveTimeout)](#new_module_ledger.LedgerApp_new)
        * [.getVersion()](#module_ledger.LedgerApp+getVersion)
        * [.publicKeySecp256k1(hdPath)](#module_ledger.LedgerApp+publicKeySecp256k1)
        * [.signSecp256k1(signBytes, hdPath)](#module_ledger.LedgerApp+signSecp256k1)
        * [.showAddress(hrp, hdPath)](#module_ledger.LedgerApp+showAddress)
        * [.getPublicKey(hdPath)](#module_ledger.LedgerApp+getPublicKey)
        * [.sign(signBytes, hdPath)](#module_ledger.LedgerApp+sign)

<a name="module_ledger.LedgerApp"></a>

### ledger~LedgerApp
Ledger app interface.

**Kind**: inner class of [<code>ledger</code>](#module_ledger)  

* [~LedgerApp](#module_ledger.LedgerApp)
    * [new LedgerApp(transport, interactiveTimeout, nonInteractiveTimeout)](#new_module_ledger.LedgerApp_new)
    * [.getVersion()](#module_ledger.LedgerApp+getVersion)
    * [.publicKeySecp256k1(hdPath)](#module_ledger.LedgerApp+publicKeySecp256k1)
    * [.signSecp256k1(signBytes, hdPath)](#module_ledger.LedgerApp+signSecp256k1)
    * [.showAddress(hrp, hdPath)](#module_ledger.LedgerApp+showAddress)
    * [.getPublicKey(hdPath)](#module_ledger.LedgerApp+getPublicKey)
    * [.sign(signBytes, hdPath)](#module_ledger.LedgerApp+sign)

<a name="new_module_ledger.LedgerApp_new"></a>

#### new LedgerApp(transport, interactiveTimeout, nonInteractiveTimeout)
Constructs a new LedgerApp.


| Param | Type | Description |
| --- | --- | --- |
| transport | <code>Transport</code> | Ledger Transport, a subclass of ledgerjs Transport. |
| interactiveTimeout | <code>Number</code> | The interactive (user input) timeout in ms. Default 45s. |
| nonInteractiveTimeout | <code>Number</code> | The non-interactive timeout in ms. Default 3s. |

<a name="module_ledger.LedgerApp+getVersion"></a>

#### ledgerApp.getVersion()
Gets the version of the Ledger app that is currently open on the device.

**Kind**: instance method of [<code>LedgerApp</code>](#module_ledger.LedgerApp)  
**Throws**:

- Will throw Error if a transport error occurs, or if the firmware app is not open.

<a name="module_ledger.LedgerApp+publicKeySecp256k1"></a>

#### ledgerApp.publicKeySecp256k1(hdPath)
Gets the public key from the Ledger app that is currently open on the device.

**Kind**: instance method of [<code>LedgerApp</code>](#module_ledger.LedgerApp)  
**Throws**:

- Will throw Error if a transport error occurs, or if the firmware app is not open.


| Param | Type | Description |
| --- | --- | --- |
| hdPath | <code>array</code> | The HD path to use to get the public key. Default is [44, 714, 0, 0, 0] |

<a name="module_ledger.LedgerApp+signSecp256k1"></a>

#### ledgerApp.signSecp256k1(signBytes, hdPath)
Sends a transaction sign doc to the Ledger app to be signed.

**Kind**: instance method of [<code>LedgerApp</code>](#module_ledger.LedgerApp)  
**Throws**:

- Will throw Error if a transport error occurs, or if the firmware app is not open.


| Param | Type | Description |
| --- | --- | --- |
| signBytes | <code>Buffer</code> | The TX sign doc bytes to sign |
| hdPath | <code>array</code> | The HD path to use to get the public key. Default is [44, 714, 0, 0, 0] |

<a name="module_ledger.LedgerApp+showAddress"></a>

#### ledgerApp.showAddress(hrp, hdPath)
Shows the user's address for the given HD path on the device display.

**Kind**: instance method of [<code>LedgerApp</code>](#module_ledger.LedgerApp)  
**Throws**:

- Will throw Error if a transport error occurs, or if the firmware app is not open.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| hrp | <code>string</code> | <code>&quot;bnb&quot;</code> | The bech32 human-readable prefix |
| hdPath | <code>array</code> |  | The HD path to use to get the public key. Default is [44, 714, 0, 0, 0] |

<a name="module_ledger.LedgerApp+getPublicKey"></a>

#### ledgerApp.getPublicKey(hdPath)
Gets the public key from the Ledger app that is currently open on the device.

**Kind**: instance method of [<code>LedgerApp</code>](#module_ledger.LedgerApp)  
**Throws**:

- Will throw Error if a transport error occurs, or if the firmware app is not open.


| Param | Type | Description |
| --- | --- | --- |
| hdPath | <code>array</code> | The HD path to use to get the public key. Default is [44, 714, 0, 0, 0] |

<a name="module_ledger.LedgerApp+sign"></a>

#### ledgerApp.sign(signBytes, hdPath)
Sends a transaction sign doc to the Ledger app to be signed.

**Kind**: instance method of [<code>LedgerApp</code>](#module_ledger.LedgerApp)  
**Throws**:

- Will throw Error if a transport error occurs, or if the firmware app is not open.


| Param | Type | Description |
| --- | --- | --- |
| signBytes | <code>Buffer</code> | The TX sign doc bytes to sign |
| hdPath | <code>array</code> | The HD path to use to get the public key. Default is [44, 714, 0, 0, 0] |

<a name="module_rpc"></a>

## rpc

* [rpc](#module_rpc)
    * [~Client](#module_rpc..Client)
        * [new Client(uriString, netWork)](#new_module_rpc..Client_new)
        * [.getTokenInfo(symbol)](#module_rpc..Client+getTokenInfo) ⇒ <code>Object</code>
        * [.listAllTokens(offset, limit)](#module_rpc..Client+listAllTokens) ⇒ <code>Array</code>
        * [.getAccount(address)](#module_rpc..Client+getAccount) ⇒ <code>Object</code>
        * [.getBalances(balances)](#module_rpc..Client+getBalances)
        * [.getBalance(address, symbol)](#module_rpc..Client+getBalance) ⇒ <code>Object</code>

<a name="module_rpc..Client"></a>

### rpc~Client
The Zar Network Chain Node rpc client

**Kind**: inner class of [<code>rpc</code>](#module_rpc)  

* [~Client](#module_rpc..Client)
    * [new Client(uriString, netWork)](#new_module_rpc..Client_new)
    * [.getTokenInfo(symbol)](#module_rpc..Client+getTokenInfo) ⇒ <code>Object</code>
    * [.listAllTokens(offset, limit)](#module_rpc..Client+listAllTokens) ⇒ <code>Array</code>
    * [.getAccount(address)](#module_rpc..Client+getAccount) ⇒ <code>Object</code>
    * [.getBalances(balances)](#module_rpc..Client+getBalances)
    * [.getBalance(address, symbol)](#module_rpc..Client+getBalance) ⇒ <code>Object</code>

<a name="new_module_rpc..Client_new"></a>

#### new Client(uriString, netWork)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| uriString | <code>String</code> | <code>localhost:27146</code> | dataseed address |
| netWork | <code>String</code> |  | Zar Network Chain network |

<a name="module_rpc..Client+getTokenInfo"></a>

#### client.getTokenInfo(symbol) ⇒ <code>Object</code>
**Kind**: instance method of [<code>Client</code>](#module_rpc..Client)  
**Returns**: <code>Object</code> - token detail info  

| Param | Type | Description |
| --- | --- | --- |
| symbol | <code>String</code> | required |

<a name="module_rpc..Client+listAllTokens"></a>

#### client.listAllTokens(offset, limit) ⇒ <code>Array</code>
get tokens by offset and limit

**Kind**: instance method of [<code>Client</code>](#module_rpc..Client)  
**Returns**: <code>Array</code> - token list  

| Param | Type |
| --- | --- |
| offset | <code>Number</code> |
| limit | <code>Number</code> |

<a name="module_rpc..Client+getAccount"></a>

#### client.getAccount(address) ⇒ <code>Object</code>
**Kind**: instance method of [<code>Client</code>](#module_rpc..Client)  
**Returns**: <code>Object</code> - Account info  

| Param | Type |
| --- | --- |
| address | <code>String</code> |

<a name="module_rpc..Client+getBalances"></a>

#### client.getBalances(balances)
**Kind**: instance method of [<code>Client</code>](#module_rpc..Client)  

| Param | Type |
| --- | --- |
| balances | <code>Array</code> |

<a name="module_rpc..Client+getBalance"></a>

#### client.getBalance(address, symbol) ⇒ <code>Object</code>
get balance by symbol and address

**Kind**: instance method of [<code>Client</code>](#module_rpc..Client)  

| Param | Type |
| --- | --- |
| address | <code>String</code> |
| symbol | <code>String</code> |

<a name="module_Token"></a>

## Token

* [Token](#module_Token)
    * [~TokenManagement](#module_Token..TokenManagement)
        * [new TokenManagement(ZarClient)](#new_module_Token..TokenManagement_new)
        * [.issue(senderAddress, tokenName, symbol, totalSupply, mintable)](#module_Token..TokenManagement+issue) ⇒ <code>Promise</code>
        * [.freeze(fromAddress, symbol, amount)](#module_Token..TokenManagement+freeze) ⇒ <code>Promise</code>
        * [.unfreeze(fromAddress, symbol, amount)](#module_Token..TokenManagement+unfreeze) ⇒ <code>Promise</code>
        * [.burn(fromAddress, symbol, amount)](#module_Token..TokenManagement+burn) ⇒ <code>Promise</code>
        * [.mint(fromAddress, symbol, amount)](#module_Token..TokenManagement+mint) ⇒ <code>Promise</code>

<a name="module_Token..TokenManagement"></a>

### Token~TokenManagement
**Kind**: inner class of [<code>Token</code>](#module_Token)  

* [~TokenManagement](#module_Token..TokenManagement)
    * [new TokenManagement(ZarClient)](#new_module_Token..TokenManagement_new)
    * [.issue(senderAddress, tokenName, symbol, totalSupply, mintable)](#module_Token..TokenManagement+issue) ⇒ <code>Promise</code>
    * [.freeze(fromAddress, symbol, amount)](#module_Token..TokenManagement+freeze) ⇒ <code>Promise</code>
    * [.unfreeze(fromAddress, symbol, amount)](#module_Token..TokenManagement+unfreeze) ⇒ <code>Promise</code>
    * [.burn(fromAddress, symbol, amount)](#module_Token..TokenManagement+burn) ⇒ <code>Promise</code>
    * [.mint(fromAddress, symbol, amount)](#module_Token..TokenManagement+mint) ⇒ <code>Promise</code>

<a name="new_module_Token..TokenManagement_new"></a>

#### new TokenManagement(ZarClient)

| Param | Type |
| --- | --- |
| ZarClient | <code>Object</code> |

<a name="module_Token..TokenManagement+issue"></a>

#### tokenManagement.issue(senderAddress, tokenName, symbol, totalSupply, mintable) ⇒ <code>Promise</code>
create a new asset on Zar Network Chain

**Kind**: instance method of [<code>TokenManagement</code>](#module_Token..TokenManagement)  
**Returns**: <code>Promise</code> - resolves with response (success or fail)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| senderAddress | <code>String</code> |  | senderAddress |
| tokenName | <code>String</code> |  | tokenName |
| symbol | <code>String</code> |  | symbol |
| totalSupply | <code>Number</code> | <code>0</code> | totalSupply |
| mintable | <code>Boolean</code> | <code>false</code> | mintable |

<a name="module_Token..TokenManagement+freeze"></a>

#### tokenManagement.freeze(fromAddress, symbol, amount) ⇒ <code>Promise</code>
freeze some amount of token

**Kind**: instance method of [<code>TokenManagement</code>](#module_Token..TokenManagement)  
**Returns**: <code>Promise</code> - resolves with response (success or fail)  

| Param | Type |
| --- | --- |
| fromAddress | <code>String</code> |
| symbol | <code>String</code> |
| amount | <code>String</code> |

<a name="module_Token..TokenManagement+unfreeze"></a>

#### tokenManagement.unfreeze(fromAddress, symbol, amount) ⇒ <code>Promise</code>
unfreeze some amount of token

**Kind**: instance method of [<code>TokenManagement</code>](#module_Token..TokenManagement)  
**Returns**: <code>Promise</code> - resolves with response (success or fail)  

| Param | Type |
| --- | --- |
| fromAddress | <code>String</code> |
| symbol | <code>String</code> |
| amount | <code>String</code> |

<a name="module_Token..TokenManagement+burn"></a>

#### tokenManagement.burn(fromAddress, symbol, amount) ⇒ <code>Promise</code>
burn some amount of token

**Kind**: instance method of [<code>TokenManagement</code>](#module_Token..TokenManagement)  
**Returns**: <code>Promise</code> - resolves with response (success or fail)  

| Param | Type |
| --- | --- |
| fromAddress | <code>String</code> |
| symbol | <code>String</code> |
| amount | <code>Number</code> |

<a name="module_Token..TokenManagement+mint"></a>

#### tokenManagement.mint(fromAddress, symbol, amount) ⇒ <code>Promise</code>
mint tokens for an existing token

**Kind**: instance method of [<code>TokenManagement</code>](#module_Token..TokenManagement)  
**Returns**: <code>Promise</code> - resolves with response (success or fail)  

| Param | Type |
| --- | --- |
| fromAddress | <code>String</code> |
| symbol | <code>String</code> |
| amount | <code>Number</code> |

<a name="module_utils"></a>

## utils

* [utils](#module_utils)
    * [.ab2str](#module_utils.ab2str) ⇒ <code>string</code>
    * [.str2ab](#module_utils.str2ab) ⇒ <code>arrayBuffer</code>
    * [.hexstring2ab](#module_utils.hexstring2ab) ⇒ <code>Array.&lt;number&gt;</code>
    * [.ab2hexstring](#module_utils.ab2hexstring) ⇒ <code>string</code>
    * [.str2hexstring](#module_utils.str2hexstring) ⇒ <code>string</code>
    * [.hexstring2str](#module_utils.hexstring2str) ⇒ <code>string</code>
    * [.int2hex](#module_utils.int2hex) ⇒ <code>string</code>
    * [.num2hexstring](#module_utils.num2hexstring) ⇒ <code>string</code>
    * [.num2VarInt](#module_utils.num2VarInt) ⇒ <code>string</code>
    * [.hexXor](#module_utils.hexXor) ⇒ <code>string</code>
    * [.reverseArray](#module_utils.reverseArray) ⇒ <code>Uint8Array</code>
    * [.reverseHex](#module_utils.reverseHex) ⇒ <code>string</code>
    * [.isHex](#module_utils.isHex) ⇒ <code>boolean</code>
    * [.ensureHex](#module_utils.ensureHex)
    * [.sha256ripemd160](#module_utils.sha256ripemd160) ⇒ <code>string</code>
    * [.sha256](#module_utils.sha256) ⇒ <code>string</code>
    * [.sha3](#module_utils.sha3) ⇒ <code>string</code>

<a name="module_utils.ab2str"></a>

### utils.ab2str ⇒ <code>string</code>
**Kind**: static constant of [<code>utils</code>](#module_utils)  
**Returns**: <code>string</code> - ASCII string  

| Param | Type |
| --- | --- |
| buf | <code>arrayBuffer</code> |

<a name="module_utils.str2ab"></a>

### utils.str2ab ⇒ <code>arrayBuffer</code>
**Kind**: static constant of [<code>utils</code>](#module_utils)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | ASCII string |

<a name="module_utils.hexstring2ab"></a>

### utils.hexstring2ab ⇒ <code>Array.&lt;number&gt;</code>
**Kind**: static constant of [<code>utils</code>](#module_utils)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | HEX string |

<a name="module_utils.ab2hexstring"></a>

### utils.ab2hexstring ⇒ <code>string</code>
**Kind**: static constant of [<code>utils</code>](#module_utils)  
**Returns**: <code>string</code> - HEX string  

| Param | Type |
| --- | --- |
| arr | <code>arrayBuffer</code> |

<a name="module_utils.str2hexstring"></a>

### utils.str2hexstring ⇒ <code>string</code>
**Kind**: static constant of [<code>utils</code>](#module_utils)  
**Returns**: <code>string</code> - HEX string  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | ASCII string |

<a name="module_utils.hexstring2str"></a>

### utils.hexstring2str ⇒ <code>string</code>
**Kind**: static constant of [<code>utils</code>](#module_utils)  
**Returns**: <code>string</code> - ASCII string  

| Param | Type | Description |
| --- | --- | --- |
| hexstring | <code>string</code> | HEX string |

<a name="module_utils.int2hex"></a>

### utils.int2hex ⇒ <code>string</code>
convert an integer to big endian hex and add leading zeros

**Kind**: static constant of [<code>utils</code>](#module_utils)  

| Param | Type |
| --- | --- |
| num | <code>Number</code> |

<a name="module_utils.num2hexstring"></a>

### utils.num2hexstring ⇒ <code>string</code>
Converts a number to a big endian hexstring of a suitable size, optionally little endian

**Kind**: static constant of [<code>utils</code>](#module_utils)  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>Number</code> |  |
| size | <code>Number</code> | The required size in bytes, eg 1 for Uint8, 2 for Uint16. Defaults to 1. |
| littleEndian | <code>Boolean</code> | Encode the hex in little endian form |

<a name="module_utils.num2VarInt"></a>

### utils.num2VarInt ⇒ <code>string</code>
Converts a number to a variable length Int. Used for array length header

**Kind**: static constant of [<code>utils</code>](#module_utils)  
**Returns**: <code>string</code> - hexstring of the variable Int.  

| Param | Type | Description |
| --- | --- | --- |
| num | <code>Number</code> | The number |

<a name="module_utils.hexXor"></a>

### utils.hexXor ⇒ <code>string</code>
XORs two hexstrings

**Kind**: static constant of [<code>utils</code>](#module_utils)  
**Returns**: <code>string</code> - XOR output as a HEX string  

| Param | Type | Description |
| --- | --- | --- |
| str1 | <code>string</code> | HEX string |
| str2 | <code>string</code> | HEX string |

<a name="module_utils.reverseArray"></a>

### utils.reverseArray ⇒ <code>Uint8Array</code>
Reverses an array. Accepts arrayBuffer.

**Kind**: static constant of [<code>utils</code>](#module_utils)  

| Param | Type |
| --- | --- |
| arr | <code>Array</code> |

<a name="module_utils.reverseHex"></a>

### utils.reverseHex ⇒ <code>string</code>
Reverses a HEX string, treating 2 chars as a byte.

**Kind**: static constant of [<code>utils</code>](#module_utils)  
**Returns**: <code>string</code> - HEX string reversed in 2s.  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> | HEX string |

**Example**  
```js
reverseHex('abcdef') = 'efcdab'
```
<a name="module_utils.isHex"></a>

### utils.isHex ⇒ <code>boolean</code>
Checks if input is a hexstring. Empty string is considered a hexstring.

**Kind**: static constant of [<code>utils</code>](#module_utils)  

| Param | Type |
| --- | --- |
| str | <code>string</code> |

**Example**  
```js
isHex('0101') = true
isHex('') = true
isHex('0x01') = false
```
<a name="module_utils.ensureHex"></a>

### utils.ensureHex
Throws an error if input is not hexstring.

**Kind**: static constant of [<code>utils</code>](#module_utils)  

| Param | Type |
| --- | --- |
| str | <code>string</code> |

<a name="module_utils.sha256ripemd160"></a>

### utils.sha256ripemd160 ⇒ <code>string</code>
Computes a SHA256 followed by a RIPEMD160.

**Kind**: static constant of [<code>utils</code>](#module_utils)  
**Returns**: <code>string</code> - hash output  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> | message to hash |

<a name="module_utils.sha256"></a>

### utils.sha256 ⇒ <code>string</code>
Computes a single SHA256 digest.

**Kind**: static constant of [<code>utils</code>](#module_utils)  
**Returns**: <code>string</code> - hash output  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> | message to hash |

<a name="module_utils.sha3"></a>

### utils.sha3 ⇒ <code>string</code>
Computes a single SHA3 (Keccak) digest.

**Kind**: static constant of [<code>utils</code>](#module_utils)  
**Returns**: <code>string</code> - hash output  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>string</code> | message to hash |

<a name="Transaction"></a>

## Transaction
Creates a new transaction object.

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| raw | <code>Buffer</code> | The raw vstruct encoded transaction |


* [Transaction](#Transaction)
    * [new Transaction(type)](#new_Transaction_new)
    * [.getSignBytes(concrete)](#Transaction+getSignBytes) ⇒ <code>Buffer</code>
    * [.addSignature(pubKey, signature)](#Transaction+addSignature) ⇒ [<code>Transaction</code>](#Transaction)
    * [.sign(privateKey, concrete)](#Transaction+sign) ⇒ [<code>Transaction</code>](#Transaction)
    * [.serialize(opts)](#Transaction+serialize)
    * [._serializePubKey(unencodedPubKey)](#Transaction+_serializePubKey) ⇒ <code>Buffer</code>

<a name="new_Transaction_new"></a>

### new Transaction(type)

| Param | Type | Description |
| --- | --- | --- |
| data.account_number | <code>Number</code> | account number |
| data.chain_id | <code>String</code> | bnbChain Id |
| data.memo | <code>String</code> | transaction memo |
| type | <code>String</code> | transaction type |
| data.msg | <code>Object</code> | object data of tx type |
| data.sequence | <code>Number</code> | transaction counts |
| data.source | <code>Number</code> | where does this transaction come from |

**Example**  
```js
var rawTx = {
  account_number: 1,
  chain_id: 'bnbchain-1000',
  memo: '',
  msg: {},
  type: 'NewOrderMsg',
  sequence: 29,
  source: 0
};
var tx = new Transaction(rawTx);
```
<a name="Transaction+getSignBytes"></a>

### transaction.getSignBytes(concrete) ⇒ <code>Buffer</code>
generate the sign bytes for a transaction, given a msg

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type | Description |
| --- | --- | --- |
| concrete | <code>Object</code> | msg object |

<a name="Transaction+addSignature"></a>

### transaction.addSignature(pubKey, signature) ⇒ [<code>Transaction</code>](#Transaction)
attaches a signature to the transaction

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type |
| --- | --- |
| pubKey | <code>Elliptic.PublicKey</code> |
| signature | <code>Buffer</code> |

<a name="Transaction+sign"></a>

### transaction.sign(privateKey, concrete) ⇒ [<code>Transaction</code>](#Transaction)
sign transaction with a given private key and msg

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type | Description |
| --- | --- | --- |
| privateKey | <code>string</code> | private key hex string |
| concrete | <code>Object</code> | msg object |

<a name="Transaction+serialize"></a>

### transaction.serialize(opts)
encode signed transaction to hex which is compatible with amino

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type | Description |
| --- | --- | --- |
| opts | <code>object</code> | msg field |

<a name="Transaction+_serializePubKey"></a>

### transaction.\_serializePubKey(unencodedPubKey) ⇒ <code>Buffer</code>
serializes a public key in a 33-byte compressed format.

**Kind**: instance method of [<code>Transaction</code>](#Transaction)  

| Param | Type |
| --- | --- |
| unencodedPubKey | <code>Elliptic.PublicKey</code> |

<a name="checkNumber"></a>

## checkNumber
validate the input number.

**Kind**: global constant  

| Param | Type |
| --- | --- |
| value | <code>Number</code> |

<a name="checkCoins"></a>

## checkCoins
basic validation of coins

**Kind**: global constant  

| Param | Type |
| --- | --- |
| coins | <code>Array</code> |
