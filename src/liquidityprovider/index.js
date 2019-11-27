/**
 * @module LiquidityProvider
 */
import Big from 'big.js'
import { txType } from '../tx/'
import * as crypto from '../crypto/'
import { api } from '../client/'
import { validateSymbol } from '../utils/validateHelper'
const MAXTOTALSUPPLY = 9000000000000000000

class LiquidityProvider {
  /**
   * mint tokens from credit
   * @param {String} - senderAddress / issuer
   * @param {String} - amount
   */
  mintTokens(senderAddress, amount) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }

    const value = {
      Amount: amount,
      LiquidityProvider: senderAddress,
    }

    const msg = {
      type: txType.MsgMintTokens,
      value: value
    }

    return msg
  }

  /**
   * burn tokens to credit
   * @param {String} - senderAddress / issuer
   * @param {String} - amount
   */
  burnTokens(senderAddress, amount) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }

    const value = {
      Amount: amount,
      LiquidityProvider: senderAddress,
    }

    const msg = {
      type: txType.MsgBurnTokens,
      value: value
    }

    return msg
  }
}

export default LiquidityProvider
