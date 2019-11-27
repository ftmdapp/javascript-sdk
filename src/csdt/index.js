/**
 * @module CSDT
 */
import Big from 'big.js'
import { txType } from '../tx/'
import * as crypto from '../crypto/'
import { api } from '../client/'
import { validateSymbol } from '../utils/validateHelper'
const MAXTOTALSUPPLY = 9000000000000000000

class CSDT {
  /**
   * add/remove collateral/stable coin from csdt
   * @param {String} - senderAddress
   * @param {String} - collateralDenom
   * @param {String} - collateralChange
   * @param {String} - debtChange
   */
  createOrModifyCSDT(senderAddress, collateralDenom, collateralChange, debtChange) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }

    const value = {
      Sender: senderAddress,
      CollateralDenom: collateralDenom,
      CollateralChange: collateralChange,
      DebtChange: debtChange,
    }

    const msg = {
      type: txType.MsgCreateOrModifyCSDT,
      value: value
    }

    return msg
  }
}

export default CSDT
