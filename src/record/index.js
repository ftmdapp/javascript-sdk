/**
 * @module Record
 */
import Big from 'big.js'
import { txType } from '../tx/'
import * as crypto from '../crypto/'
import { api } from '../client/'
import { validateSymbol } from '../utils/validateHelper'
const MAXTOTALSUPPLY = 9000000000000000000

class Record {
  /**
   * record proofs on-chain
   * @param {String} - senderAddress / recorder
   * @param {String} - Name
   * @param {String} - Author
   * @param {String} - Hash
   * @param {String} - RecordNo
   * @param {String} - RecordType
   * @param {String} - Description
   */
  record(senderAddress, name, author, hash, recordNo, recordType, description) {
    if (!senderAddress) {
      throw new Error("sender address cannot be empty")
    }

    const value = {
      sender: senderAddress,
      params: {
        name:name,
        author:author,
        hash:hash,
        record_number:recordNo,
        record_type:recordType,
        description:description
      }
    }

    const msg = {
      type: txType.MsgRecord,
      value: value
    }

    return msg
  }
}

export default Record
