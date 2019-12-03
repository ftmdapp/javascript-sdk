/**
 * @module Oracle
 */
import Big from 'big.js'
import { txType } from '../tx/'
import * as crypto from '../crypto/'
import { api } from '../client/'
import { validateSymbol } from '../utils/validateHelper'
const MAXTOTALSUPPLY = 9000000000000000000

class Oracle {
  /**
   * Post price for a tracked denom via a allowed oracle
   * @param {String} - from
   * @param {String} - assetCode
   * @param {String} - price
   * @param {String} - expiry
   */
  postPrice(from, assetCode, price, expiry) {
    if (!from) {
      throw new Error("from cannot be empty")
    }
    if (!assetCode) {
      throw new Error("asset code cannot be empty")
    }
    if (!price) {
      throw new Error("price cannot be empty")
    }
    if (!expiry) {
      throw new Error("expiry cannot be empty")
    }

    const value = {
      from: from,
      asset_code: assetCode,
      price: price,
      expiry: expiry,
    }

    const msg = {
      type: txType.MsgPostPrice,
      value: value
    }

    return msg
  }

  /**
   * Add oracle for a tracked denom
   * @param {String} - nominee
   * @param {String} - oracle
   * @param {String} - denom
   */
  addOracle(nominee, oracle, denom) {
    if (!nominee) {
      throw new Error("nominee cannot be empty")
    }
    if (!oracle) {
      throw new Error("oracle cannot be empty")
    }
    if (!denom) {
      throw new Error("denom cannot be empty")
    }

    const value = {
      nominee: nominee,
      oracle: oracle,
      denom: denom
    }

    const msg = {
      type: txType.MsgAddOracle,
      value: value
    }

    return msg
  }

  /**
   * Set oracle for a tracked denom
   * @param {String} - nominee
   * @param {String} - oracles
   * @param {String} - denom
   */
  setOracles(nominee, oracles, denom) {
    if (!nominee) {
      throw new Error("nominee cannot be empty")
    }
    if (!oracles) {
      throw new Error("oracles cannot be empty")
    }
    if (!denom) {
      throw new Error("denom cannot be empty")
    }

    const value = {
      nominee: nominee,
      oracles: oracles,
      denom: denom
    }

    const msg = {
      type: txType.MsgSetOracles,
      value: value
    }

    return msg
  }

  /**
   * Set asset to track on price feeds
   * @param {String} - nominee
   * @param {String} - denom
   * @param {String} - asset
   */
  setAsset(nominee, denom, assetCode, baseAsset, quoteAsset, oracles, active) {
    if (!nominee) {
      throw new Error("nominee cannot be empty")
    }
    if (!denom) {
      throw new Error("oracle cannot be empty")
    }

    const value = {
      nominee: nominee,
      denom: denom,
      asset: {
        asset_code: assetCode,
        base_asset: baseAsset,
        quote_asset: quoteAsset,
        oracles: oracles,
        active: active
      }
    }

    const msg = {
      type: txType.MsgSetAsset,
      value: value
    }

    return msg
  }

  /**
   * Add asset to track on price feeds
   * @param {String} - nominee
   * @param {String} - denom
   * @param {String} - asset
   */
  addAsset(nominee, denom, assetCode, baseAsset, quoteAsset, oracles, active) {
    if (!nominee) {
      throw new Error("nominee cannot be empty")
    }
    if (!denom) {
      throw new Error("oracle cannot be empty")
    }

    const value = {
      nominee: nominee,
      denom: denom,
      asset: {
        asset_code: assetCode,
        base_asset: baseAsset,
        quote_asset: quoteAsset,
        oracles: oracles,
        active: active
      }
    }

    const msg = {
      type: txType.MsgAddAsset,
      value: value
    }

    return msg
  }
}

export default Oracle
