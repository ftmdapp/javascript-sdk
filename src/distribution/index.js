/**
 * @module Distribution
 */
import Big from 'big.js'
import { txType } from '../tx/'
import * as crypto from '../crypto/'
import { api } from '../client/'
import { validateSymbol } from '../utils/validateHelper'

class Distribution {
  /**
   * delegate to a validator
   * @param {String} - delegator_address
   * @param {String} - validator_address
   * @param {String} - amount_denom
   * @param {String} - amount_amount
   */
  withdrawDelegatorRewards(delegator_address, validator_address) {
    if (!validator_address) {
      throw new Error("validator address cannot be empty")
    }

    if (!delegator_address) {
      throw new Error("delegator address cannot be empty")
    }

    const value = {
      delegator_address: delegator_address,
      validator_address: validator_address,
    }

    const msg = {
      type: txType.MsgWithdrawDelegatorReward,
      value: value
    }

    return msg
  }
}

export default Distribution
