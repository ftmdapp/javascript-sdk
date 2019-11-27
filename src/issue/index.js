/**
 * @module Issue
 */
import Big from 'big.js'
import { txType } from '../tx/'
import * as crypto from '../crypto/'
import { api } from '../client/'
import { validateSymbol } from '../utils/validateHelper'
const MAXTOTALSUPPLY = 9000000000000000000

class Issue {
  /**
   * create a new asset on Xar Chain
   * @param {String} - senderAddress
   * @param {String} - tokenName
   * @param {String} - symbol
   * @param {Number} - totalSupply
   * @param {Boolean} - mintable
   */
  issue(senderAddress, tokenName, symbol, totalSupply = 0, mintable = false, description = "", burnOwnerDisabled = false, burnHolderDisabled = false, burnFromDisabled = false, freezeDisabled = false) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }

    if (tokenName.length > 32) {
      throw new Error("token name is limited to 32 characters")
    }

    if (!/^[a-zA-z\d]{3,8}$/.test(symbol)) {
      throw new Error("symbol should be alphanumeric and length is limited to 3~8")
    }

    if (totalSupply <= 0 || totalSupply > MAXTOTALSUPPLY) {
      throw new Error("invalid supply amount")
    }

    totalSupply = new Big(totalSupply)

    const value = {
      from_address: senderAddress,
      params: {
        name: tokenName,
        symbol,
        total_supply: totalSupply.toString(),
        description: description,
        burn_owner_disabled: burnOwnerDisabled,
        burn_holder_disabled: burnHolderDisabled,
        burn_from_disabled: burnFromDisabled,
        minting_finished: mintable,
        freeze_disabled: freezeDisabled
      }
    }

    const issueMsg = {
      type: txType.MsgIssue,
      value: value
    }

    return issueMsg
  }

  /**
   * burn some amount of token
   * @param {String} fromAddress
   * @param {String} symbol
   * @param {Number} amount
   */
  burn(fromAddress, symbol, amount) {
    validateSymbol(symbol)

    amount = new Big(amount)

    const value = {
      from_address: fromAddress,
      issue_id: symbol,
      amount: amount.toString(),
    }

    const burnMsg = {
      type: txType.MsgIssueBurnOwner,
      value: value
    }

    return burnMsg
  }

  /**
   * mint tokens for an existing token
   * @param {String} fromAddress
   * @param {String} symbol
   * @param {Number} amount
   */
  mint(fromAddress, symbol, amount, toAddress = fromAddress) {
    validateSymbol(symbol)

    if (amount <= 0 || amount > MAXTOTALSUPPLY) {
      throw new Error("invalid amount")
    }

    amount = new Big(amount)

    const value = {
      from_address: fromAddress,
      to_address: toAddress,
      issue_id: symbol,
      amount: amount.toString(),
    }

    const mintMsg = {
      type: txType.MsgIssueMint,
      value: value
    }

    return mintMsg
  }
}

export default Issue
