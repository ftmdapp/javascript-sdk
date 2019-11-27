import * as client from "./client"
import * as crypto from "./crypto"
import * as encoder from "./encoder"
import * as decoder from "./decoder"
import * as utils from "./utils"
import rpc from "./rpc/client"
import Ledger from "./ledger"

const { XarClient } = client
const amino = { ...encoder, ...decoder }

module.exports = XarClient
module.exports.crypto = crypto
module.exports.amino = amino
module.exports.utils = utils
module.exports.ledger = Ledger
module.exports.rpc = rpc
