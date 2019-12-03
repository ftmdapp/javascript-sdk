/**
 * @module Denominations
 */
import Big from 'big.js'
import { txType } from '../tx/'
import * as crypto from '../crypto/'
import { api } from '../client/'
import { validateSymbol } from '../utils/validateHelper'
const MAXTOTALSUPPLY = 9000000000000000000

class Denominations {
  /**
   * issue a new native denom
   * @param {String} - sourceAddress
   * @param {String} - owner
   * @param {String} - name
   * @param {String} - symbol
   * @param {String} - originalSymbol
   * @param {String} - totalSupply
   * @param {String} - maxSupply
   * @param {String} - mintable
   */
  issueToken(sourceAddress, owner, name, symbol, originalSymbol, totalSupply, maxSupply, mintable) {
    if (!sourceAddress) {
      throw new Error("sender address cannot be empty")
    }
    if (!owner) {
      throw new Error("owner address cannot be empty")
    }
    if (!name) {
      throw new Error("name cannot be empty")
    }
    if (!symbol) {
      throw new Error("symbol cannot be empty")
    }
    if (!originalSymbol) {
      throw new Error("originalSymbol cannot be empty")
    }
    if (!totalSupply) {
      throw new Error("totalSupply cannot be empty")
    }
    if (!maxSupply) {
      throw new Error("maxSupply cannot be empty")
    }

    const value = {
      source_address: sourceAddress,
      owner: owner,
      name: name,
      symbol: symbol,
      original_symbol: originalSymbol,
      total_supply: totalSupply,
      max_supply: maxSupply,
      mintable: mintable,
    }

    const msg = {
      type: txType.MsgIssueToken,
      value: value
    }

    return msg
  }

  /**
   * mint coins for a denom
   * @param {String} - owner of the token
   * @param {String} - symbol
   * @param {String} - amount
   */
  mintCoins(owner, symbol, amount) {
    if (!owner) {
      throw new Error("owner address cannot be empty")
    }
    if (!symbol) {
      throw new Error("symbol cannot be empty")
    }
    if (!amount) {
      throw new Error("amount cannot be 0")
    }


    const value = {
      owner: owner,
      symbol: symbol,
      amount: amount
    }

    const msg = {
      type: txType.MsgMintCoins,
      value: value
    }

    return msg
  }


  /**
   * burn coins for a denom
   * @param {String} - owner of the token
   * @param {String} - symbol
   * @param {String} - amount
   */
  burnCoins(owner, symbol, amount) {
    if (!owner) {
      throw new Error("owner address cannot be empty")
    }
    if (!symbol) {
      throw new Error("symbol cannot be empty")
    }
    if (!amount) {
      throw new Error("amount cannot be 0")
    }


    const value = {
      owner: owner,
      symbol: symbol,
      amount: amount
    }

    const msg = {
      type: txType.MsgBurnCoins,
      value: value
    }

    return msg
  }

  /**
   * freeze coins for a denom for an account
   * @param {String} - owner of the token
   * @param {String} - symbol
   * @param {String} - amount
   * @param {String} - address to freeze
   */
  freezeCoins(owner, symbol, amount, address) {
    if (!owner) {
      throw new Error("owner address cannot be empty")
    }
    if (!symbol) {
      throw new Error("symbol cannot be empty")
    }
    if (!amount) {
      throw new Error("amount cannot be 0")
    }
    if (!address) {
      throw new Error("target address cannot be empty")
    }


    const value = {
      owner: owner,
      symbol: symbol,
      amount: amount,
      address: address
    }

    const msg = {
      type: txType.MsgFreezeCoins,
      value: value
    }

    return msg
  }

  /**
   * unfreeze coins for a denom for an account
   * @param {String} - owner of the token
   * @param {String} - symbol
   * @param {String} - amount
   * @param {String} - address to freeze
   */
  unfreezeCoins(owner, symbol, amount, address) {
    if (!owner) {
      throw new Error("owner address cannot be empty")
    }
    if (!symbol) {
      throw new Error("symbol cannot be empty")
    }
    if (!amount) {
      throw new Error("amount cannot be 0")
    }
    if (!address) {
      throw new Error("target address cannot be empty")
    }


    const value = {
      owner: owner,
      symbol: symbol,
      amount: amount,
      address: address
    }

    const msg = {
      type: txType.MsgUnfreezeCoins,
      value: value
    }

    return msg
  }
}

export default Denominations
