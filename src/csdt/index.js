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
      sender: senderAddress,
      collateral_denom: collateralDenom,
      collateral_change: collateralChange,
      debt_change: debtChange,
    }

    const msg = {
      type: txType.MsgCreateOrModifyCSDT,
      value: value
    }

    return msg
  }

  /**
   * deposit collateral into csdt
   * @param {String} - senderAddress
   * @param {String} - collateralDenom
   * @param {String} - collateralChange
   */
  depositCollateral(senderAddress, collateralDenom, collateralChange) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }
    if (!collateralDenom) {
      throw new Error("collateral denom cannot be empty")
    }
    if (!collateralChange) {
      throw new Error("collateral change cannot be empty")
    }

    const value = {
      sender: senderAddress,
      collateral_denom: collateralDenom,
      collateral_change: collateralChange,
    }

    const msg = {
      type: txType.MsgDepositCollateral,
      value: value
    }

    return msg
  }

  /**
   * withdraw collateral from csdt
   * @param {String} - senderAddress
   * @param {String} - collateralDenom
   * @param {String} - collateralChange
   */
  withdrawCollateral(senderAddress, collateralDenom, collateralChange) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }
    if (!collateralDenom) {
      throw new Error("collateral denom cannot be empty")
    }
    if (!collateralChange) {
      throw new Error("collateral change cannot be empty")
    }

    const value = {
      sender: senderAddress,
      collateral_denom: collateralDenom,
      collateral_change: collateralChange,
    }

    const msg = {
      type: txType.MsgWithdrawCollateral,
      value: value
    }

    return msg
  }

  /**
   * settle debt with csdt
   * @param {String} - senderAddress
   * @param {String} - collateralDenom
   * @param {String} - debtDenom
   * @param {String} - debtChange
   */
  settleDebt(senderAddress, collateralDenom, debtDenom, debtChange) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }
    if (!collateralDenom) {
      throw new Error("collateral denom cannot be empty")
    }
    if (!debtDenom) {
      throw new Error("debt denom cannot be empty")
    }
    if (!debtChange) {
      throw new Error("debt change cannot be empty")
    }

    const value = {
      sender: senderAddress,
      collateral_denom: collateralDenom,
      debt_denom: debtDenom,
      debt_change: debtChange,
    }

    const msg = {
      type: txType.MsgSettleDebt,
      value: value
    }

    return msg
  }

  /**
   * withdraw debt from csdt
   * @param {String} - senderAddress
   * @param {String} - collateralDenom
   * @param {String} - debtDenom
   * @param {String} - debtChange
   */
  withdrawDebt(senderAddress, collateralDenom, debtDenom, debtChange) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }
    if (!collateralDenom) {
      throw new Error("collateral denom cannot be empty")
    }
    if (!debtDenom) {
      throw new Error("debt denom cannot be empty")
    }
    if (!debtChange) {
      throw new Error("debt change cannot be empty")
    }

    const value = {
      sender: senderAddress,
      collateral_denom: collateralDenom,
      debt_denom: debtDenom,
      debt_change: debtChange,
    }

    const msg = {
      type: txType.MsgWithdrawDebt,
      value: value
    }

    return msg
  }
}

export default CSDT
