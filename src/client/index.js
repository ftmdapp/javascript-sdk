/**
 * @module client
 */
import * as crypto from "../crypto"
import Transaction from "../tx"
import HttpRequest from "../utils/request"
import { checkNumber } from "../utils/validateHelper"
import TokenManagement from "../token/"
import Gov from "../gov/"
import Big from "big.js"

const BASENUMBER = Math.pow(10, 8)

export const api = {
  broadcast: "/txs",
  nodeInfo: "/node_info",
  getAccount: "/auth/accounts",
}

const NETWORK_PREFIX_MAPPING = {
  "testnet": "tzar",
  "mainnet": "zar"
}

/**
 * The default signing delegate which uses the local private key.
 * @param  {Transaction} tx      the transaction
 * @param  {Object}      signMsg the canonical sign bytes for the msg
 * @return {Transaction}
 */
export const DefaultSigningDelegate = async function (tx, signMsg) {
  return tx.sign(this.privateKey, signMsg)
}

/**
 * The default broadcast delegate which immediately broadcasts a transaction.
 * @param {Transaction} signedTx the signed transaction
 */
export const DefaultBroadcastDelegate = async function (signedTx) {
  return this.sendTransaction(signedTx)
}

/**
 * The Ledger signing delegate.
 * @param  {LedgerApp}  ledgerApp
 * @param  {preSignCb}  function
 * @param  {postSignCb} function
 * @param  {errCb} function
 * @return {function}
 */
export const LedgerSigningDelegate = (ledgerApp, preSignCb, postSignCb, errCb, hdPath) => async function (
  tx, signMsg
) {
  const signBytes = tx.getSignBytes(signMsg)
  preSignCb && preSignCb(signBytes)
  let pubKeyResp, sigResp
  try {
    pubKeyResp = await ledgerApp.getPublicKey(hdPath)
    sigResp = await ledgerApp.sign(signBytes, hdPath)
    postSignCb && postSignCb(pubKeyResp, sigResp)
  } catch (err) {
    console.warn("LedgerSigningDelegate error", err)
    errCb && errCb(err)
  }
  if (sigResp && sigResp.signature) {
    const pubKey = crypto.getPublicKey(pubKeyResp.pk.toString("hex"))
    return tx.addSignature(pubKey, sigResp.signature)
  }
  return tx
}

/**
 * validate the input number.
 * @param {Array} outputs
 */
const checkOutputs = (outputs) => {
  outputs.forEach(transfer => {
    const coins = transfer.coins || []
    coins.forEach(coin => {
      checkNumber(coin.amount)
      if (!coin.denom) {
        throw new Error("invalid denmon")
      }
    })
  })
}

/**
 * sum corresponding input coin
 * @param {Array} inputs
 * @param {Array} coins
 */
const calInputCoins = (inputs, coins) => {
  coins.forEach((coin) => {
    const existCoin = inputs[0].coins.find(c => c.denom === coin.denom)
    if (existCoin) {
      const existAmount = new Big(existCoin.amount)
      existCoin.amount = Number(existAmount.plus(coin.amount).toString())
    } else {
      inputs[0].coins.push({ ...coin })
    }
  })
}

/**
 * The Zar Chain client.
 */
export class ZarClient {
  /**
   * @param {String} server Zar Chain public url
   * @param {Boolean} useAsyncBroadcast use async broadcast mode, faster but less guarantees (default off)
   * @param {Number} source where does this transaction come from (default 0)
   */
  constructor(server, useAsyncBroadcast = false, source = 0) {
    if (!server) {
      throw new Error("Zar chain server should not be null")
    }
    this._httpClient = new HttpRequest(server)
    this._signingDelegate = DefaultSigningDelegate
    this._broadcastDelegate = DefaultBroadcastDelegate
    this._useAsyncBroadcast = useAsyncBroadcast
    this._source = source
    this.tokens = new TokenManagement(this)
    this.gov = new Gov(this)
  }

  /**
   * Initialize the client with the chain's ID. Asynchronous.
   * @return {Promise}
   */
  async initChain() {
    if (!this.chainId) {
      const data = await this._httpClient.request("get", api.nodeInfo)
      this.chainId = data.result.node_info && data.result.node_info.network
    }
    return this
  }

  /**
   * Sets the client network (testnet or mainnet).
   * @param {String} network Indicate testnet or mainnet
   */
  chooseNetwork(network) {
    this.addressPrefix = NETWORK_PREFIX_MAPPING[network] || "tzar"
    this.network = NETWORK_PREFIX_MAPPING[network] ? network : "testnet"
  }

  /**
   * Sets the client's private key for calls made by this client. Asynchronous.
   * @return {Promise}
   */
  async setPrivateKey(privateKey) {
    if (privateKey !== this.privateKey) {
      const address = crypto.getAddressFromPrivateKey(privateKey, this.addressPrefix)
      if (!address) throw new Error("address is false: ${address}. invalid private key?")
      if (address === this.address) return this // safety
      this.privateKey = privateKey
      this.address = address
      // _setPkPromise used in _sendTransaction for non-await calls
      const promise = this._setPkPromise = this._httpClient.request("get", `${api.getAccount}/${address}`)
      const data = await promise
      this.account_number = data.result.account_number
    }
    return this
  }

  /**
   * Use async broadcast mode. Broadcasts faster with less guarantees (default off)
   * @param {Boolean} useAsyncBroadcast
   * @return {ZarClient} this instance (for chaining)
   */
  useAsyncBroadcast(useAsyncBroadcast = true) {
    this._useAsyncBroadcast = useAsyncBroadcast
    return this
  }

  /**
   * Sets the signing delegate (for wallet integrations).
   * @param {function} delegate
   * @return {ZarClient} this instance (for chaining)
   */
  setSigningDelegate(delegate) {
    if (typeof delegate !== "function") throw new Error("signing delegate must be a function")
    this._signingDelegate = delegate
    return this
  }

  /**
   * Sets the broadcast delegate (for wallet integrations).
   * @param {function} delegate
   * @return {ZarClient} this instance (for chaining)
   */
  setBroadcastDelegate(delegate) {
    if (typeof delegate !== "function") throw new Error("broadcast delegate must be a function")
    this._broadcastDelegate = delegate
    return this
  }

  /**
   * Applies the default signing delegate.
   * @return {ZarClient} this instance (for chaining)
   */
  useDefaultSigningDelegate() {
    this._signingDelegate = DefaultSigningDelegate
    return this
  }

  /**
   * Applies the default broadcast delegate.
   * @return {ZarClient} this instance (for chaining)
   */
  useDefaultBroadcastDelegate() {
    this._broadcastDelegate = DefaultBroadcastDelegate
    return this
  }

  /**
   * Applies the Ledger signing delegate.
   * @param {function} ledgerApp
   * @param {function} preSignCb
   * @param {function} postSignCb
   * @param {function} errCb
   * @return {ZarClient} this instance (for chaining)
   */
  useLedgerSigningDelegate(ledgerApp, preSignCb, postSignCb, errCb, hdPath) {
    this._signingDelegate = LedgerSigningDelegate(ledgerApp, preSignCb, postSignCb, errCb, hdPath)
    return this
  }

  /**
   * Transfer tokens from one address to another.
   * @param {String} fromAddress
   * @param {String} toAddress
   * @param {Number} amount
   * @param {String} asset
   * @param {String} memo optional memo
   * @param {Number} sequence optional sequence
   * @return {Promise} resolves with response (success or fail)
   */
  async transfer(fromAddress, toAddress, amount, asset, memo = "", sequence = null) {
    const accCode = crypto.decodeAddress(fromAddress)
    const toAccCode = crypto.decodeAddress(toAddress)

    amount = new Big(amount)
    amount = Number(amount.mul(BASENUMBER).toString())

    checkNumber(amount, "amount")

    const coin = {
      denom: asset,
      amount: amount,
    }

    const msg = {
      inputs: [{
        address: accCode,
        coins: [coin]
      }],
      outputs: [{
        address: toAccCode,
        coins: [coin]
      }],
      msgType: "MsgSend"
    }

    const signMsg = {
      inputs: [{
        address: fromAddress,
        coins: [{
          amount: amount,
          denom: asset
        }]
      }],
      outputs: [{
        address: toAddress,
        coins: [{
          amount: amount,
          denom: asset
        }]
      }]
    }

    const signedTx = await this._prepareTransaction(msg, signMsg, fromAddress, sequence, memo)
    return this._broadcastDelegate(signedTx)
  }

  /**
   * Create and sign a multi send tx
   * @param {String} fromAddress
   * @param {Array} outputs
   * @example
   * const outputs = [
   * {
   *   "to": "tbnb1p4kpnj5qz5spsaf0d2555h6ctngse0me5q57qe",
   *   "coins": [{
   *     "denom": "BNB",
   *     "amount": 10
   *   },{
    *     "denom": "BTC",
    *     "amount": 10
    *   }]
   * },
   * {
   *   "to": "tbnb1scjj8chhhp7lngdeflltzex22yaf9ep59ls4gk",
   *   "coins": [{
   *     "denom": "BTC",
   *     "amount": 10
   *   },{
    *     "denom": "BNB",
    *     "amount": 10
    *   }]
   * }]
   * @param {String} memo optional memo
   * @param {Number} sequence optional sequence
   * @return {Promise} resolves with response (success or fail)
   */
  async multiSend(fromAddress, outputs, memo = "", sequence = null) {
    if (!fromAddress) {
      throw new Error("fromAddress should not be falsy")
    }

    if (!Array.isArray(outputs)) {
      throw new Error("outputs should be array")
    }

    checkOutputs(outputs)

    //sort denom by alphbet and init amount
    outputs.forEach(item => {
      item.coins = item.coins.sort((a, b) => a.denom.localeCompare(b.denom))
      item.coins.forEach(coin => {
        const amount = new Big(coin.amount)
        coin.amount = Number(amount.mul(BASENUMBER).toString())
      })
    })

    const fromAddrCode = crypto.decodeAddress(fromAddress)
    const inputs = [{ address: fromAddrCode, coins: [] }]
    const transfers = []

    outputs.forEach((item) => {
      const toAddcCode = crypto.decodeAddress(item.to)
      calInputCoins(inputs, item.coins)
      transfers.push({ address: toAddcCode, coins: item.coins })
    })

    const msg = {
      inputs,
      outputs: transfers,
      msgType: "MsgSend"
    }

    const signInputs = [{ address: fromAddress, coins: [] }]
    const signOutputs = []

    outputs.forEach((item, index) => {
      signOutputs.push({ address: item.to, coins: [] })
      item.coins.forEach(c => {
        signOutputs[index].coins.push(c)
      })
      calInputCoins(signInputs, item.coins)
    })

    const signMsg = {
      inputs: signInputs,
      outputs: signOutputs
    }

    const signedTx = await this._prepareTransaction(msg, signMsg, fromAddress, sequence, memo)
    return this._broadcastDelegate(signedTx)
  }

  /**
   * Prepare a serialized raw transaction for sending to the blockchain.
   * @param {Object} msg the msg object
   * @param {Object} stdSignMsg the sign doc object used to generate a signature
   * @param {String} address
   * @param {Number} sequence optional sequence
   * @param {String} memo optional memo
   * @return {Transaction} signed transaction
   */
  async _prepareTransaction(msg, stdSignMsg, address, sequence = null, memo = "") {
    if ((!this.account_number || !sequence) && address) {
      const data = await this._httpClient.request("get", `${api.getAccount}/${address}`)
      sequence = data.result.result.value.sequence
      this.account_number = data.result.result.value.account_number
      // if user has not used `await` in its call to setPrivateKey (old API), we should wait for the promise here
    } else if (this._setPkPromise) {
      await this._setPkPromise
    }

    const options = {
      account_number: parseInt(this.account_number),
      chain_id: this.chainId,
      memo: memo,
      msg,
      sequence: parseInt(sequence),
      source: this._source,
      type: msg.type,
    }

    const tx = new Transaction(options)
    return this._signingDelegate.call(this, tx, stdSignMsg)
  }

  /**
   * Broadcast a transaction to the blockchain.
   * @param {signedTx} tx signed Transaction object
   * @param {Boolean} sync use synchronous mode, optional
   * @return {Promise} resolves with response (success or fail)
   */
  async sendTransaction(signedTx, sync) {
    const signedBz = signedTx.serialize()
    return this.sendRawTransaction(signedBz, sync)
  }

  /**
   * Broadcast a raw transaction to the blockchain.
   * @param {String} signedBz signed and serialized raw transaction
   * @param {Boolean} sync use synchronous mode, optional
   * @return {Promise} resolves with response (success or fail)
   */
  async sendRawTransaction(signedBz, sync = !this._useAsyncBroadcast) {
    const opts = {
      data: signedBz,
      headers: {
        "content-type": "text/plain",
      }
    }
    return this._httpClient.request("post", `${api.broadcast}?sync=${sync}`, null, opts)
  }

  /**
   * Broadcast a raw transaction to the blockchain.
   * @param {Object} msg the msg object
   * @param {Object} stdSignMsg the sign doc object used to generate a signature
   * @param {String} address
   * @param {Number} sequence optional sequence
   * @param {String} memo optional memo
   * @param {Boolean} sync use synchronous mode, optional
   * @return {Promise} resolves with response (success or fail)
   */
  async _sendTransaction(msg, stdSignMsg, address, sequence = null, memo = "", sync = !this._useAsyncBroadcast) {
    const signedTx = await this._prepareTransaction(msg, stdSignMsg, address, sequence, memo)
    return this.sendTransaction(signedTx, sync)
  }

  /**
   * get account
   * @param {String} address
   * @return {Promise} resolves with http response
   */
  async getAccount(address = this.address) {
    if (!address) {
      throw new Error("address should not be falsy")
    }
    try {
      const data = await this._httpClient.request("get", `${api.getAccount}/${address}`)
      return data
    } catch (err) {
      console.log(err)
      return null
    }
  }

  /**
   * get balances
   * @param {String} address optional address
   * @return {Promise} resolves with http response
   */
  async getBalance(address = this.address) {
    console.log(address)
    try {
      const data = await this.getAccount(address)
      return data.result.result.value.coins
    } catch (err) {
      return []
    }
  }

  /**
   * Creates a private key and returns it and its address.
   * @return {object} the private key and address in an object.
   * {
   *  address,
   *  privateKey
   * }
   */
  createAccount() {
    const privateKey = crypto.generatePrivateKey()
    return {
      privateKey,
      address: crypto.getAddressFromPrivateKey(privateKey, this.addressPrefix)
    }
  }

  /**
   * Creates an account keystore object, and returns the private key and address.
   * @param {String} password
   *  {
   *  privateKey,
   *  address,
   *  keystore
   * }
   */
  createAccountWithKeystore(password) {
    if (!password) {
      throw new Error("password should not be falsy")
    }
    const privateKey = crypto.generatePrivateKey()
    const address = crypto.getAddressFromPrivateKey(privateKey, this.addressPrefix)
    const keystore = crypto.generateKeyStore(privateKey, password)
    return {
      privateKey,
      address,
      keystore
    }
  }

  /**
   * Creates an account from mnemonic seed phrase.
   * @return {object}
   * {
   *  privateKey,
   *  address,
   *  mnemonic
   * }
   */
  createAccountWithMneomnic() {
    const mnemonic = crypto.generateMnemonic()
    const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    const address = crypto.getAddressFromPrivateKey(privateKey, this.addressPrefix)
    return {
      privateKey,
      address,
      mnemonic
    }
  }

  /**
   * Recovers an account from a keystore object.
   * @param {object} keystore object.
   * @param {string} keystore password.
   * {
   * privateKey,
   * address
   * }
   */
  recoverAccountFromKeystore(keystore, password) {
    const privateKey = crypto.getPrivateKeyFromKeyStore(keystore, password)
    const address = crypto.getAddressFromPrivateKey(privateKey, this.addressPrefix)
    return {
      privateKey,
      address
    }
  }

  /**
   * Recovers an account from a mnemonic seed phrase.
   * @param {string} mneomnic
   * {
   * privateKey,
   * address
   * }
   */
  recoverAccountFromMnemonic(mnemonic) {
    const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
    const address = crypto.getAddressFromPrivateKey(privateKey, this.addressPrefix)
    return {
      privateKey,
      address
    }
  }
  // support an old method name containing a typo
  recoverAccountFromMneomnic(mnemonic) {
    return this.recoverAccountFromMnemonic(mnemonic)
  }

  /**
   * Recovers an account using private key.
   * @param {String} privateKey
   * {
   * privateKey,
   * address
   * }
   */
  recoverAccountFromPrivateKey(privateKey) {
    const address = crypto.getAddressFromPrivateKey(privateKey, this.addressPrefix)
    return {
      privateKey,
      address
    }
  }

  /**
   * Validates an address.
   * @param {String} address
   * @param {String} prefix
   * @return {Boolean}
   */
  checkAddress(address, prefix = this.addressPrefix) {
    return crypto.checkAddress(address, prefix)
  }

  /**
   * Returns the address for the current account if setPrivateKey has been called on this client.
   * @return {String}
   */
  getClientKeyAddress() {
    if (!this.privateKey) throw new Error("no private key is set on this client")
    const address = crypto.getAddressFromPrivateKey(this.privateKey, this.addressPrefix)
    this.address = address
    return address
  }
}
