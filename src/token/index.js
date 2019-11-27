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
  }
}

class TokenManagement {
  static instance

  /**
   * @param {Object} XarClient
   */
  constructor(XarClient) {
    if (!TokenManagement.instance) {
      this._XarClient = XarClient
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
  async issue(senderAddress, tokenName, symbol, totalSupply = 0, mintable = false, decimals = "18", description = "", burnOwnerDisabled = false, burnHolderDisabled = false, burnFromDisabled = false, freezeDisabled = false) {
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

    const value = {
      from_address: senderAddress,
      params: {
        name: tokenName,
        symbol,
        total_supply: totalSupply.toString(),
        decimals: decimals,
        description: description,
        burn_owner_disabled: burnOwnerDisabled,
        burn_holder_disabled: burnHolderDisabled,
        burn_from_disabled: burnFromDisabled,
        minting_finished: mintable,
        freeze_disabled: freezeDisabled
      }
    }

    const issueMsg = {
      type: txType.MsgIssue,
      value: value
    }

    const signedTx = await this._XarClient._prepareTransaction(issueMsg, issueMsg, senderAddress)
    return this._XarClient._broadcastDelegate(signedTx)
  }

  /**
   * freeze some amount of token
   * @param {String} fromAddress
   * @param {String} symbol
   * @returns {Promise}  resolves with response (success or fail)
   */
  async freeze(fromAddress, symbol) {

    validateSymbol(symbol)

    const freezeMsg = {
      from: crypto.decodeAddress(fromAddress),
      symbol,
      msgType: txType.FreezeMsg
    }

    const freezeSignMsg = {
      from: fromAddress,
      symbol
    }

    const signedTx = await this._XarClient._prepareTransaction(freezeMsg, freezeSignMsg, fromAddress)
    return this._XarClient._broadcastDelegate(signedTx)
  }

  /**
   * unfreeze some amount of token
   * @param {String} fromAddress
   * @param {String} symbol
   * @returns {Promise}  resolves with response (success or fail)
   */
  async unfreeze(fromAddress, symbol) {
    validateSymbol(symbol)

    const unfreezeMsg = {
      from: crypto.decodeAddress(fromAddress),
      symbol,
      msgType: txType.UnfreezeMsg
    }

    const unfreezeSignMsg = {
      from: fromAddress,
      symbol
    }

    const signedTx = await this._XarClient._prepareTransaction(unfreezeMsg, unfreezeSignMsg, fromAddress)
    return this._XarClient._broadcastDelegate(signedTx)
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

    validateNonZeroAmount(amount, symbol, fromAddress, this._XarClient._httpClient)

    amount = new Big(amount)

    const value = {
      from_address: fromAddress,
      issue_id: symbol,
      amount: amount.toString(),
    }

    const burnMsg = {
      type: txType.BurnMsg,
      value: value
    }

    const signedTx = await this._XarClient._prepareTransaction(burnMsg, burnMsg, fromAddress)
    return this._XarClient._broadcastDelegate(signedTx)
  }

  /**
   * mint tokens for an existing token
   * @param {String} fromAddress
   * @param {String} symbol
   * @param {Number} amount
   * @returns {Promise}  resolves with response (success or fail)
   */
  async mint(fromAddress, symbol, amount, toAddress = fromAddress) {
    validateSymbol(symbol)

    if (amount <= 0 || amount > MAXTOTALSUPPLY) {
      throw new Error("invalid amount")
    }

    amount = new Big(amount)

    const value = {
      from_address: fromAddress,
      to_address: toAddress,
      issue_id: symbol,
      amount: amount.toString(),
      decimals: "18"
    }

    const mintMsg = {
      type: txType.MintMsg,
      value: value
    }

    const signedTx = await this._XarClient._prepareTransaction(mintMsg, mintMsg, fromAddress)
    return this._XarClient._broadcastDelegate(signedTx)
  }
}

export default TokenManagement
