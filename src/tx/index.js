import * as crypto from "../crypto/"
import * as encoder from "../encoder/"
import { UVarInt } from "../encoder/varint"

export const txType = {
  MsgPlaceBid: "auction/MsgPlaceBid",
  MsgCreateOrModifyCSDT: "csdt/MsgCreateOrModifyCSDT",
  MsgDepositCollateral: "csdt/MsgDepositCollateral",
  MsgWithdrawCollateral: "csdt/MsgWithdrawCollateral",
  MsgSettleDebt: "csdt/MsgSettleDebt",
  MsgWithdrawDebt: "csdt/MsgWithdrawDebt",
  MsgTransferCSDT: "csdt/MsgTransferCSDT",
  MsgIssue: "issue/MsgIssue",
  MsgIssueTransferOwnership: "issue/MsgIssueTransferOwnership",
  MsgIssueDescription: "issue/MsgIssueDescription",
  MsgIssueMint: "issue/MsgIssueMint",
  MsgIssueBurnOwner: "issue/MsgIssueBurnOwner",
  MsgIssueBurnHolder: "issue/MsgIssueBurnHolder",
  MsgIssueBurnFrom: "issue/MsgIssueBurnFrom",
  MsgIssueDisableFeature: "issue/MsgIssueDisableFeature",
  MsgIssueApprove: "issue/MsgIssueApprove",
  MsgIssueSendFrom: "issue/MsgIssueSendFrom",
  MsgIssueIncreaseApproval: "issue/MsgIssueIncreaseApproval",
  MsgIssueDecreaseApproval: "issue/MsgIssueDecreaseApproval",
  MsgIssueFreeze: "issue/MsgIssueFreeze",
  MsgIssueUnFreeze: "issue/MsgIssueUnFreeze",
  MsgIncreaseCredit: "issuer/MsgIncreaseCredit",
  MsgDecreaseCredit: "issuer/MsgDecreaseCredit",
  MsgRevokeLiquidityProvider: "issuer/MsgRevokeLiquidityProvider",
  MsgSetInterest: "issuer/MsgSetInterest",
  MsgSeizeAndStartCollateralAuction: "liquidator/MsgSeizeAndStartCollateralAuction",
  MsgStartDebtAuction: "liquidator/MsgStartDebtAuction",
  MsgMintTokens: "liquidityprovider/MsgMintTokens",
  MsgBurnTokens: "liquidityprovider/MsgBurnTokens",
  MsgTransferNFT: "cosmos-sdk/MsgTransferNFT",
  MsgEditNFTMetadata: "cosmos-sdk/MsgEditNFTMetadata",
  MsgMintNFT: "cosmos-sdk/MsgMintNFT",
  MsgBurnNFT: "cosmos-sdk/MsgBurnNFT",
  MsgPost: "order/Post",
  StdTx: "cosmos-sdk/StdTx",
  MsgSend: "cosmos-sdk/MsgSend",
  MsgMultiSend: "cosmos-sdk/MsgMultiSend",
  MsgVerifyInvariant: "cosmos-sdk/MsgVerifyInvariant",
  MsgWithdrawDelegatorReward: "cosmos-sdk/MsgWithdrawDelegationReward",
  MsgWithdrawValidatorCommission: "cosmos-sdk/MsgWithdrawValidatorCommission",
  MsgSetWithdrawAddress: "cosmos-sdk/MsgModifyWithdrawAddress",
  CommunityPoolSpendProposal: "cosmos-sdk/CommunityPoolSpendProposal",
  MsgSubmitEvidence: "cosmos-sdk/MsgSubmitEvidence",
  MsgSubmitProposal: "cosmos-sdk/MsgSubmitProposal",
  MsgDeposit: "cosmos-sdk/MsgDeposit",
  MsgVote: "cosmos-sdk/MsgVote",
  TextProposal: "cosmos-sdk/TextProposal",
  SoftwareUpgradeProposal: "cosmos-sdk/SoftwareUpgradeProposal",
  ParameterChangeProposal: "cosmos-sdk/ParameterChangeProposal",
  MsgUnjail: "cosmos-sdk/MsgUnjail",
  MsgCreateValidator: "cosmos-sdk/MsgCreateValidator",
  MsgEditValidator: "cosmos-sdk/MsgEditValidator",
  MsgDelegate: "cosmos-sdk/MsgDelegate",
  MsgUndelegate: "cosmos-sdk/MsgUndelegate",
  MsgBeginRedelegate: "cosmos-sdk/MsgBeginRedelegate",
  MsgRecord: "record/MsgRecord",
  MsgIssueToken: "denominations/MsgIssueToken",
  MsgMintCoins: "denominations/MsgMintCoins",
  MsgBurnCoins: "denominations/MsgBurnCoins",
  MsgFreezeCoins: "denominations/MsgFreezeCoins",
  MsgUnfreezeCoins: "denominations/MsgUnfreezeCoins",
  MsgPostPrice: "oracle/MsgPostPrice",
  MsgAddOracle: "oracle/MsgAddOracle",
  MsgSetOracles: "oracle/MsgSetOracles",
  MsgAddAsset: "oracle/MsgAddAsset",
  MsgSetAsset: "oracle/MsgSetAsset",
}

/**
 * Creates a new transaction object.
 * @example
 * var rawTx = {
 *   account_number: 1,
 *   chain_id: 'bnbchain-1000',
 *   memo: '',
 *   msg: {},
 *   type: 'NewOrderMsg',
 *   sequence: 29,
 *   source: 0
 * };
 * var tx = new Transaction(rawTx);
 * @property {Buffer} raw The raw vstruct encoded transaction
 * @param {Number} data.account_number account number
 * @param {String} data.chain_id bnbChain Id
 * @param {String} data.memo transaction memo
 * @param {String} type transaction type
 * @param {Object} data.msg object data of tx type
 * @param {Number} data.sequence transaction counts
 * @param {Number} data.source where does this transaction come from
 */
class Transaction {
  constructor(data) {
    /*if (!txType[data.type]) {
      throw new TypeError(`does not support transaction type: ${data.type}`)
    }*/

    if (!data.chain_id) {
      throw new Error("chain id should not be null")
    }

    data = data || {}

    this.type = data.type
    this.sequence = data.sequence || 0
    this.account_number = data.account_number || 0
    this.chain_id = data.chain_id
    this.msgs = data.msg ? [data.msg] : []
    this.memo = data.memo
    this.source = data.source || 0 // default value is 0
    this.mode = data.mode || "sync"
  }

  /**
   * generate the sign bytes for a transaction, given a msg
   * @param {Object} concrete msg object
   * @return {Buffer}
   **/
  getSignBytes(msg) {
    if (!msg) {
      throw new Error("msg should be an object")
    }
    const fee = {
      amount: [],
      gas: "200000"
    }

    const signMsg = {
      "account_number": this.account_number.toString(),
      "chain_id": this.chain_id,
      "fee": fee,
      "memo": this.memo,
      "msgs": [msg],
      "sequence": this.sequence.toString(),
    }

    return encoder.convertObjectToSignBytes(signMsg)
  }

  /**
   * attaches a signature to the transaction
   * @param {Elliptic.PublicKey} pubKey
   * @param {Buffer} signature
   * @return {Transaction}
   **/
  addSignature(pubKey, signature) {
    this.signatures = [{
      pub_key: pubKey,
      signature: signature,
    }]
    return this
  }

  /**
   * sign transaction with a given private key and msg
   * @param {string} privateKey private key hex string
   * @param {Object} concrete msg object
   * @return {Transaction}
   **/
  sign(privateKey, msg) {
    if(!privateKey){
      throw new Error("private key should not be null")
    }

    if(!msg){
      throw new Error("signing message should not be null")
    }

    const signBytes = this.getSignBytes(msg)
    const privKeyBuf = Buffer.from(privateKey, "hex")
    const signature = crypto.generateSignature(signBytes.toString("hex"), privKeyBuf)
    this.addSignature(crypto.generatePubKey(privKeyBuf), signature)
    return this
  }

  /**
   * encode signed transaction to hex which is compatible with amino
   * @param {object} opts msg field
   */
  serialize() {
    if (!this.signatures) {
      throw new Error("need signature")
    }

    let msg = this.msgs[0]

    const stdTx = {
      tx: {
        msg: [msg],
        signatures: this.signatures,
        memo: this.memo,
        type: txType.StdTx,
        fee: {
          amount: [],
          gas: "200000"
        }
      },
      mode: this.mode,
    }

    return JSON.stringify(stdTx)
  }

  /**
   * serializes a public key in a 33-byte compressed format.
   * @param {Elliptic.PublicKey} unencodedPubKey
   * @return {Buffer}
   */
  _serializePubKey(unencodedPubKey) {
    let format = 0x2
    if (unencodedPubKey.y && unencodedPubKey.y.isOdd()) {
      format |= 0x1
    }
    let pubBz = Buffer.concat([
      UVarInt.encode(format),
      unencodedPubKey.x.toArrayLike(Buffer, "be", 32)
    ])
    // prefixed with length
    pubBz = encoder.encodeBinaryByteArray(pubBz)
    // add the amino prefix
    pubBz = Buffer.concat([Buffer.from("EB5AE987", "hex"), pubBz])
    return pubBz
  }
}

Transaction.txType = txType

export default Transaction
