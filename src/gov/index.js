/**
 * @module Gov
 */
import Big from 'big.js'
import { txType } from '../tx/'
import * as crypto from '../crypto/'
import { api } from '../client/'
import { validateSymbol } from '../utils/validateHelper'

class Gov {
  /**
   * delegate to a validator
   * @param {String} - proposal_id
   * @param {String} - validator_address
   * @param {String} - voter
   */
  vote(proposal_id, option, voter) {
    if (!proposal_id) {
      throw new Error("proposal_id cannot be empty")
    }

    if (!option) {
      throw new Error("option cannot be empty")
    }

    if (!voter) {
      throw new Error("voter cannot be empty")
    }

    const value = {
      proposal_id: proposal_id,
      voter: voter,
      option: option,
    }

    const msg = {
      type: txType.MsgVote,
      value: value
    }

    return msg
  }
}

export default Gov
