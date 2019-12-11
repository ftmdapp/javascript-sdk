/**
 * @module Staking
 */
import Big from 'big.js'
import { txType } from '../tx/'
import * as crypto from '../crypto/'
import { api } from '../client/'
import { validateSymbol } from '../utils/validateHelper'

class Staking {
  /**
   * create a validator
   * @param {String} - description_moniker
   * @param {String} - description_identity
   * @param {String} - description_website
   * @param {String} - description_security_contact
   * @param {String} - description_details
   * @param {String} - commision_rate
   * @param {String} - commission_max_rate
   * @param {String} - commission_max_change_rate
   * @param {String} - min_self_delegation
   * @param {String} - delegator_address
   * @param {String} - validator_address
   * @param {String} - pub_key
   * @param {String} - value_denom
   * @param {String} - value_amount
   */
  createValidator(
    description_moniker,
    description_identity,
    description_website,
    description_security_contact,
    description_details,
    commision_rate,
    commission_max_rate,
    commission_max_change_rate,
    min_self_delegation,
    delegator_address,
    validator_address,
    pub_key,
    value_denom,
    value_amount
  ) {
    if (!validator_address) {
      throw new Error("validator address cannot be empty")
    }

    if (!description_moniker) {
      throw new Error("moniker cannot be empty")
    }

    const value = {
      description: {
        moniker: description_moniker,
        identity: description_identity,
        website: description_website,
        security_contact: description_security_contact,
        details: description_details
      },
      commission: {
        rate: commision_rate,
        max_rate: commission_max_rate,
        max_change_rate: commission_max_change_rate
      },
      min_self_delegation: min_self_delegation,
      delegator_address: delegator_address,
      validator_address: validator_address,
      pubkey: pub_key,
      value: {
        denom: value_denom,
        amount: value_amount
      }
    }

    const msg = {
      type: txType.MsgCreateValidator,
      value: value
    }

    return msg
  }
  /**
   * edit an existing validator
   * @param {String} - description_moniker
   * @param {String} - description_identity
   * @param {String} - description_website
   * @param {String} - description_security_contact
   * @param {String} - description_details
   * @param {String} - validator_address
   * @param {String} - commission_rate
   * @param {String} - min_self_delegation
   */
  editValidator(
    description_moniker,
    description_identity,
    description_website,
    description_security_contact,
    description_details,
    validator_address,
    commission_rate,
    min_self_delegation
  ) {
    if (!validator_address) {
      throw new Error("validator address cannot be empty")
    }

    if (!description_moniker) {
      throw new Error("moniker cannot be empty")
    }

    const value = {
      description: {
        moniker: description_moniker,
        identity: description_identity,
        website: description_website,
        security_contact: description_security_contact,
        details: description_details
      },
      validator_address: validator_address,
      commission_rate: commission_rate,
      min_self_delegation: min_self_delegation
    }

    const msg = {
      type: txType.MsgEditValidator,
      value: value
    }

    return msg
  }
  /**
   * delegate to a validator
   * @param {String} - delegator_address
   * @param {String} - validator_address
   * @param {String} - amount_denom
   * @param {String} - amount_amount
   */
  delegate(delegator_address, validator_address, amount_denom, amount_amount) {
    if (!validator_address) {
      throw new Error("validator address cannot be empty")
    }

    if (!delegator_address) {
      throw new Error("delegator address cannot be empty")
    }

    const value = {
      delegator_address: delegator_address,
      validator_address: validator_address,
      amount: {
        denom: amount_denom,
        amount: amount_amount
      }
    }

    const msg = {
      type: txType.MsgDelegate,
      value: value
    }

    return msg
  }
  /**
   * undelegate from a validator
   * @param {String} - delegator_address
   * @param {String} - validator_address
   * @param {String} - amount_denom
   * @param {String} - amount_amount
   */
  undelegate(delegator_address, validator_address, amount_denom, amount_amount) {
    if (!validator_address) {
      throw new Error("validator address cannot be empty")
    }

    if (!delegator_address) {
      throw new Error("delegator address cannot be empty")
    }

    const value = {
      delegator_address: delegator_address,
      validator_address: validator_address,
      amount: {
        denom: amount_denom,
        amount: amount_amount
      }
    }

    const msg = {
      type: txType.MsgUndelegate,
      value: value
    }

    return msg
  }
  /**
   * undelegate from a validator
   * @param {String} - delegator_address
   * @param {String} - validator_address
   * @param {String} - amount_denom
   * @param {String} - amount_amount
   */
  redelegate(delegator_address, validator_src_address, validator_dst_address, amount_denom, amount_amount) {
    if (!validator_src_address) {
      throw new Error("source validator address cannot be empty")
    }
    if (!validator_dst_address) {
      throw new Error("destination validator address cannot be empty")
    }
    if (!delegator_address) {
      throw new Error("delegator address cannot be empty")
    }

    const value = {
      delegator_address: delegator_address,
      validator_src_address: validator_src_address,
      validator_dst_address: validator_dst_address,
      amount: {
        denom: amount_denom,
        amount: amount_amount
      }
    }

    const msg = {
      type: txType.MsgBeginRedelegate,
      value: value
    }

    return msg
  }
}

export default Staking
