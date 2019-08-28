/**
 * @module Token
 */
import Big from 'big.js'
import { txType } from '../tx/'
import * as crypto from '../crypto/'
import { api } from '../client/'
import { validateSymbol } from '../utils/validateHelper'
const MAXTOTALSUPPLY = 9000000000000000000

const validateNonZeroAmount = async (amount, symbol, fromAddress, httpClient, type = "free") => {
  if (amount <= 0 || amount > MAXTOTALSUPPLY) {
    throw new Error("invalid amount")
  }

  try {
    const { result } = await httpClient.request("get", `${api.getAccount}/${fromAddress}`)
    const balance = result.balances.find(b => b.symbol.toUpperCase() === symbol.toUpperCase())
    if (!balance) {
      throw new Error(`the account doesn't have ${symbol}`)
    }

    if (Number(balance[type]) < Number(amount)) {
      throw new Error(`the account doesn't have enougth balance`)
    }

  } catch (err) {
    //if get account failed. still broadcast
    console.log(err)
  }
}

class TokenManagement {
  static instance

  /**
   * @param {Object} ZarClient
   */
  constructor(ZarClient) {
    if (!TokenManagement.instance) {
      this._ZarClient = ZarClient
      TokenManagement.instance = this
    }

    return TokenManagement.instance
  }

  /**
   * create a new asset on Binance Chain
   * @param {String} - senderAddress
   * @param {String} - tokenName
   * @param {String} - symbol
   * @param {Number} - totalSupply
   * @param {Boolean} - mintable
   * @returns {Promise} resolves with response (success or fail)
   */
  async issue(senderAddress, tokenName, symbol, totalSupply = 0, mintable = false) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }

    if (tokenName.length > 32) {
      throw new Error("token name is limited to 32 characters")
    }

    if (!/^[a-zA-z\d]{3,8}$/.test(symbol)) {
      throw new Error("symbol should be alphanumeric and length is limited to 3~8")
    }

    if (totalSupply <= 0 || totalSupply > MAXTOTALSUPPLY) {
      throw new Error("invalid supply amount")
    }

    totalSupply = new Big(totalSupply)
    totalSupply = Number(totalSupply.mul(Math.pow(10, 8)).toString())

    const value = {
      from_address: senderAddress,
      params: {
        name: tokenName,
        symbol,
        total_supply: ""+totalSupply,
        decimals: "18",
        description: "",
        burn_owner_disabled: false,
        burn_holder_disabled: false,
        burn_from_disabled: false,
        minting_finished: false,
        freeze_disabled: false
      }
    }

    const issueMsg = {
      type: txType.MsgIssue,
      value: value
    }

    const signedTx = await this._ZarClient._prepareTransaction(issueMsg, issueMsg, senderAddress)
    console.log(signedTx)
    return this._ZarClient._broadcastDelegate(signedTx)
  }

  /**
   * freeze some amount of token
   * @param {String} fromAddress
   * @param {String} symbol
   * @param {String} amount
   * @returns {Promise}  resolves with response (success or fail)
   */
  async freeze(fromAddress, symbol, amount) {

    validateSymbol(symbol)

    validateNonZeroAmount(amount, symbol, fromAddress, this._ZarClient._httpClient, 'free')

    amount = new Big(amount)
    amount = Number(amount.mul(Math.pow(10, 8)).toString())

    const freezeMsg = {
      from: crypto.decodeAddress(fromAddress),
      symbol,
      amount,
      msgType: txType.FreezeMsg
    }

    const freezeSignMsg = {
      amount: amount,
      from: fromAddress,
      symbol
    }

    const signedTx = await this._ZarClient._prepareTransaction(freezeMsg, freezeSignMsg, fromAddress)
    return this._ZarClient._broadcastDelegate(signedTx)
  }

  /**
   * unfreeze some amount of token
   * @param {String} fromAddress
   * @param {String} symbol
   * @param {String} amount
   * @returns {Promise}  resolves with response (success or fail)
   */
  async unfreeze(fromAddress, symbol, amount) {
    validateSymbol(symbol)

    validateNonZeroAmount(amount, symbol, fromAddress, this._ZarClient._httpClient, 'frozen')

    amount = new Big(amount)
    amount = Number(amount.mul(Math.pow(10, 8)).toString())

    const unfreezeMsg = {
      from: crypto.decodeAddress(fromAddress),
      symbol,
      amount,
      msgType: txType.UnfreezeMsg
    }

    const unfreezeSignMsg = {
      amount: amount,
      from: fromAddress,
      symbol
    }

    const signedTx = await this._ZarClient._prepareTransaction(unfreezeMsg, unfreezeSignMsg, fromAddress)
    return this._ZarClient._broadcastDelegate(signedTx)
  }

  /**
   * burn some amount of token
   * @param {String} fromAddress
   * @param {String} symbol
   * @param {Number} amount
   * @returns {Promise}  resolves with response (success or fail)
   */
  async burn(fromAddress, symbol, amount) {
    validateSymbol(symbol)

    validateNonZeroAmount(amount, symbol, fromAddress, this._ZarClient._httpClient)

    amount = new Big(amount)
    amount = Number(amount.mul(Math.pow(10, 8)).toString())

    const value = {
      from_address: fromAddress,
      issue_id: symbol,
      amount: ""+amount
    }

    const burnMsg = {
      type: txType.BurnMsg,
      value: value
    }

    const signedTx = await this._ZarClient._prepareTransaction(burnMsg, burnMsg, fromAddress)
    return this._ZarClient._broadcastDelegate(signedTx)
  }

  /**
   * mint tokens for an existing token
   * @param {String} fromAddress
   * @param {String} symbol
   * @param {Number} amount
   * @returns {Promise}  resolves with response (success or fail)
   */
  async mint(fromAddress, symbol, amount) {
    validateSymbol(symbol)

    if (amount <= 0 || amount > MAXTOTALSUPPLY) {
      throw new Error("invalid amount")
    }

    amount = new Big(amount)
    amount = Number(amount.mul(Math.pow(10, 8)).toString())

    const value = {
      from_address: fromAddress,
      to_address: fromAddress,
      issue_id: symbol,
      amount: ""+amount,
      decimals: "18"
    }

    const mintMsg = {
      type: txType.MintMsg,
      value: value
    }

    const signedTx = await this._ZarClient._prepareTransaction(mintMsg, mintMsg, fromAddress)
    return this._ZarClient._broadcastDelegate(signedTx)
  }
}

export default TokenManagement
