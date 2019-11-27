/**
 * @module Issuer
 */
import Big from 'big.js'
import { txType } from '../tx/'
import * as crypto from '../crypto/'
import { api } from '../client/'
import { validateSymbol } from '../utils/validateHelper'
const MAXTOTALSUPPLY = 9000000000000000000

class Issuer {
  /**
   * create a new issuer for native denoms
   * @param {String} - senderAddress / authority
   * @param {String} - issuer
   * @param {String} - denominations
   */
  createIssuer(senderAddress, issuer, denominations) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }

    const value = {
      Issuer: issuer,
      Denominations: denominations,
      Authority: senderAddress
    }

    const msg = {
      type: txType.MsgCreateIssuer,
      value: value
    }

    return msg
  }

  /**
   * destroy an issuer for native denoms
   * @param {String} - senderAddress / authority
   * @param {String} - issuer
   */
  destroyIssuer(senderAddress, issuer) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }

    const value = {
      Issuer: issuer,
      Authority: senderAddress
    }

    const msg = {
      type: txType.MsgDestroyIssuer,
      value: value
    }

    return msg
  }

  /**
   * create a new oracle for oracle feeds
   * @param {String} - senderAddress / authority
   * @param {String} - oracle address
   */
  createOracle(senderAddress, oracleAddress) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }

    const value = {
      Oracle: oracleAddress,
      Authority: senderAddress
    }

    const msg = {
      type: txType.MsgCreateOracle,
      value: value
    }

    return msg
  }

  /**
   * create a new market for dex
   * @param {String} - senderAddress / authority
   * @param {String} - baseAsset
   * @param {String} - quoteAsset
   */
  createMarket(senderAddress, baseAsset, quoteAsset) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }

    const value = {
      BaseAsset: baseAsset,
      QuoteAsset: quoteAsset,
      Authority: senderAddress
    }

    const msg = {
      type: txType.MsgCreateMarket,
      value: value
    }

    return msg
  }
}

export default Issuer
