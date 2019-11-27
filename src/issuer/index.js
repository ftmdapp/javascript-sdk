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
   * increase the credit of a liquidity provider
   * @param {String} - senderAddress / issuer
   * @param {String} - liquidityProvider
   * @param {String} - creditIncrease
   */
  increaseCredit(senderAddress, liquidityProvider, creditIncrease) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }

    const value = {
      CreditIncrease: creditIncrease,
      LiquidityProvider: liquidityProvider,
      Issuer: senderAddress
    }

    const msg = {
      type: txType.MsgIncreaseCredit,
      value: value
    }

    return msg
  }

  /**
   * decrease the credit of a liquidity provider
   * @param {String} - senderAddress / issuer
   * @param {String} - liquidityProvider
   * @param {String} - creditDecrease
   */
  decreaseCredit(senderAddress, liquidityProvider, creditDecrease) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }

    const value = {
      CreditDecrease: creditDecrease,
      LiquidityProvider: liquidityProvider,
      Issuer: senderAddress
    }

    const msg = {
      type: txType.MsgDecreaseCredit,
      value: value
    }

    return msg
  }

  /**
   * Revoke liquidity provider
   * @param {String} - senderAddress / issuer
   * @param {String} - liquidityProvider
   */
  revokeLiquidityProvider(senderAddress, liquidityProvider) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }

    const value = {
      LiquidityProvider: liquidityProvider,
      Issuer: senderAddress
    }

    const msg = {
      type: txType.MsgRevokeLiquidityProvider,
      value: value
    }

    return msg
  }
}

export default Issuer
