import ZarClient from "../src"
import { checkNumber } from "../src/utils/validateHelper"
import * as crypto from "../src/crypto"
import Transaction from "../src/tx"
import { voteOption } from "../src/gov/"

/* make sure the address from the mnemonic has balances, or the case will failed */
const mnemonic = "antenna reject civil thrive novel boy health chronic sport vote maximum message false walnut share ability bag ladder volume ring slam daring similar day"

const keystores = {
  // keystore with sha3 mac
  new: { "version": 1, "id": "73a811d0-5e31-4a0e-9b3a-a2a457ccbd7b", "crypto": { "ciphertext": "3b", "cipherparams": { "iv": "56d59d999578a0364c59934128dd215d" }, "cipher": "aes-256-ctr", "kdf": "pbkdf2", "kdfparams": { "dklen": 32, "salt": "781849b3477252928cfbe5d62180a755dce1e5b2569b02f6f14e7f46a0740687", "c": 262144, "prf": "hmac-sha256" }, "mac": "6a967b9dad5062eac3dbc9db4e30a8f2efa60f60403aa9ea0345e50cdfb5e9d86343f5808b7e2f51b062f7c7f24189723acd4a94568e6a72bb63e6345e988c0f" } },
  // keystore with sha256 mac
  legacy: { "version": 1, "id": "dfb09873-f16f-48c6-a6b8-bb5a705c47a7", "address": "bnc1dxj068zgk007fchefj9n8tq06pcuce5ypqm5zk", "crypto": { "ciphertext": "33b7439a8d64d73357dc91f88a6b3a45e7303717664d17daf8e8dc1cc708fa4b", "cipherparams": { "iv": "88c726d70cd0437bfdb2312dc60103fc" }, "cipher": "aes-256-ctr", "kdf": "pbkdf2", "kdfparams": { "dklen": 32, "salt": "ad10ef544417d4a25914dec3d908882686dd9d793b5c484b76fd5aa575cf54b9", "c": 262144, "prf": "hmac-sha256" }, "mac": "f7cc301d18c97c71741492b8029544952ad5567a733971deb49fd3eb03ee696e" } },
  // keystore with bad mac
  badMac: { "version": 1, "id": "dfb09873-f16f-48c6-a6b8-bb5a705c47a7", "address": "bnc1dxj068zgk007fchefj9n8tq06pcuce5ypqm5zk", "crypto": { "ciphertext": "33b7439a8d64d73357dc91f88a6b3a45e7303717664d17daf8e8dc1cc708fa4b", "cipherparams": { "iv": "88c726d70cd0437bfdb2312dc60103fc" }, "cipher": "aes-256-ctr", "kdf": "pbkdf2", "kdfparams": { "dklen": 32, "salt": "ad10ef544417d4a25914dec3d908882686dd9d793b5c484b76fd5aa575cf54b9", "c": 262144, "prf": "hmac-sha256" }, "mac": "x7cc301d18c97c71741492b8029544952ad5567a733971deb49fd3eb03ee696e" } },
}

const targetAddress = "zar1alh4yqa0sustmm6u64ygxx6awna90y636w73a7"

const getClient = async (useAwaitSetPrivateKey = true, doNotSetPrivateKey = false) => {
  const client = new ZarClient("http://localhost:1317")
  await client.initChain()
  const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
  if (!doNotSetPrivateKey) {
    if (useAwaitSetPrivateKey) {
      await client.setPrivateKey(privateKey)
    } else {
      client.setPrivateKey(privateKey) // test without `await`
    }
  }
  // use default delegates (signing, broadcast)
  client.useDefaultSigningDelegate()
  client.useDefaultBroadcastDelegate()
  return client
}

const wait = ms => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve()
    }, ms)
  })
}
// describe("checkNumber", async () => {
it("ensures that the number is positive", async () => {
  expect(() => checkNumber(-100, "-100")).toThrowError("-100 should be a positive number")
})

it("ensures that the number is less than 2^63", async () => {
  expect(() => checkNumber(Math.pow(2, 63), "2^63")).toThrowError("2^63 should be less than 2^63")
  expect(() => checkNumber(Math.pow(2, 63) + 1, "2^63")).toThrowError("2^63 should be less than 2^63")
})
// })

// describe("ZarClient test", async () => {

beforeEach(() => {
  jest.setTimeout(50000)
})

it("transfer tokens", async () => {
  const client = await getClient(false)
  const addr = crypto.getAddressFromPrivateKey(client.privateKey)
  const res = await client.transfer(addr, targetAddress, 1, "coin174876e800", "hello world")
  expect(res.status).toBe(200)
})

/*it("issue token", async () => {
  const client = await getClient(true)
  console.log(client)
  const addr = "zar1alh4yqa0sustmm6u64ygxx6awna90y636w73a7"
  const symbol = "MINT"
  const tokenName = "test issue token"
  const totalSupply = 21000000

  const res = await client.tokens.issue(addr, tokenName, symbol, totalSupply, false)
  console.log(res)
  expect(res.status).toBe(200)
})*/

/*it("mint token", async () => {
  const client = await getClient(true)
  const from = "zar1alh4yqa0sustmm6u64ygxx6awna90y636w73a7"
  const to = "zar1fmxprwjafu8uk234zd7utynl8q8a8kwf62v5wp"
  const symbol = "coin174876e800"
  const amount = 10000000
  const res = await client.mint(from, symbol, amount, to)
  console.log(res)
  expect(res.status).toBe(200)
})*/

/*it("burn token", async () => {
  const client = await getClient(true)
  const addr = "zar1alh4yqa0sustmm6u64ygxx6awna90y636w73a7"
  const symbol = "coin174876e800"
  const amount = 10000
  const res = await client.burn(addr, symbol, amount)
  console.log(res)
  expect(res.status).toBe(200)
})*/

/*it("create account", async () => {
  const client = await getClient(false)
  const res = client.createAccount()
  expect(res.address).toBeTruthy()
  expect(res.privateKey).toBeTruthy()
})

it("create account with keystore", async () => {
  const client = await getClient(false, true)
  const res = client.createAccountWithKeystore("12345678")
  expect(res.address).toBeTruthy()
  expect(res.privateKey).toBeTruthy()
  expect(res.keystore).toBeTruthy()
})

it("create account with mnemonic", async () => {
  const client = await getClient(false)
  const res = client.createAccountWithMneomnic()
  expect(res.address).toBeTruthy()
  expect(res.privateKey).toBeTruthy()
  expect(res.mnemonic).toBeTruthy()
})

it("recover account from legacy (sha256) keystore", async () => {
  const client = await getClient(false, true)
  const res = client.recoverAccountFromKeystore(keystores.legacy, "12345qwert!S")
  expect(res.address).toBeTruthy()
  expect(res.privateKey).toBeTruthy()
})

it("recover account from bad mac keystore", async () => {
  const client = await getClient(false, true)
  expect(() => {
    client.recoverAccountFromKeystore(keystores.badMac, "12345qwert!S")
  }).toThrowError()
})

it("recover account from mneomnic", async () => {
  jest.setTimeout(50000)
  const client = await getClient(false)
  const res = client.recoverAccountFromMneomnic(mnemonic)
  await (1500)
  expect(res.address).toBeTruthy()
  expect(res.privateKey).toBeTruthy()
  console.log(res)
})

it("recover account from privatekey", async () => {
  jest.setTimeout(50000)
  const client = await getClient(false)
  const pk = crypto.generatePrivateKey()
  const res = client.recoverAccountFromPrivateKey(pk)
  await (1500)
  expect(res.address).toBeTruthy()
  expect(res.privateKey).toBeTruthy()
})

it("get balance", async () => {
  const client = await getClient(false)
  const res = await client.getBalance(targetAddress)
  expect(res.length).toBeGreaterThanOrEqual(0)
})*/

/*it("transfer tokens", async () => {
  const client = await getClient(false)
  const addr = crypto.getAddressFromPrivateKey(client.privateKey)
  const account = await client._httpClient.request("get", `/bank/balances/${addr}`)
  const sequence = account.result && account.result.sequence

  const res = await client.transfer(addr, targetAddress, 0.00000001, "ftm", "hello world", sequence)
  console.log(res)
  expect(res.status).toBe(200)
})*/

/*it("works with a custom signing delegate", async () => {
  const client = await getClient(true)
  const addr = crypto.getAddressFromPrivateKey(client.privateKey)
  const account = await client._httpClient.request("get", `/bank/balances/${addr}`)
  const sequence = account.result && account.result.sequence

  client.setSigningDelegate((tx, signMsg) => {
    expect(tx instanceof Transaction).toBeTruthy()
    expect(!tx.signatures.length).toBeTruthy()
    expect(signMsg.inputs.length).toBeTruthy()
    return tx
  })

  try {
    await client.transfer(addr, targetAddress, 0.00000001, "ftm", "hello world", sequence)
  } catch (err) {
    // will throw because a signature was not added by the signing delegate.
  }
})

it("works with a custom broadcast delegate", async () => {
  const client = await getClient(true)
  const addr = crypto.getAddressFromPrivateKey(client.privateKey)
  const account = await client._httpClient.request("get", `/bank/balances/${addr}`)
  const sequence = account.result && account.result.sequence

  client.setBroadcastDelegate(signedTx => {
    expect(signedTx instanceof Transaction).toBeTruthy()
    expect(signedTx.signatures.length).toBeTruthy()
    return "broadcastDelegateResult"
  })

  const res = await client.transfer(addr, targetAddress, 0.00000001, "ftm", "hello world", sequence)
  expect(res).toBe("broadcastDelegateResult")
})

it("get account", async () => {
  const client = await getClient(false)
  const res = await client.getAccount(targetAddress)
  if (res.status === 200) {
    expect(res.status).toBe(200)
  } else {
    expect(res.status).toBe(204)
  }
})

it("get balance no arg", async () => {
  const client = await getClient(false)
  const balances = await client.getBalance()
  expect(balances.length).toBeGreaterThan(0)
})

it("check number when transfer", async () => {
  const client = await getClient(true)
  const addr = crypto.getAddressFromPrivateKey(client.privateKey)

  const account = await client._httpClient.request("get", `/bank/balances/${addr}`)
  const sequence = account.result && account.result.sequence

  try {
    await client.transfer(addr, targetAddress, -1, "ftm", "hello world", sequence)
  } catch (err) {
    expect(err.message).toBe("amount should be a positive number")
  }

  try {
    await client.transfer(addr, targetAddress, Math.pow(2, 63), "ftm", "hello world", sequence)
  } catch (err) {
    expect(err.message).toBe("amount should be less than 2^63")
  }
})

it("issue token", async () => {
  const client = await getClient(true)
  const addr = "zar1vq4k0nsxyvpk36gfcp6r5cpacygk3szt77lcpd"
  const symbol = "MINT"
  const tokenName = "test issue token"
  const totalSupply = 21000000

  const res = await client.tokens.issue(addr, tokenName, symbol, totalSupply, true)
  console.log(res)
  expect(res.status).toBe(200)
})

it("freeze token", async () => {
  const client = await getClient(true)
  const addr = "zar1hgm0p7khfk85zpz5v0j8wnej3a90w70979t4js"
  const symbol = "XZJ-D9A"
  const amount = 10000

  const { status } = await client.tokens.freeze(addr, symbol, amount)
  expect(status).toBe(200)
})

it("unfreeze token", async () => {
  const client = await getClient(true)
  const addr = "zar1hgm0p7khfk85zpz5v0j8wnej3a90w70979t4js"
  const symbol = "XZJ-D9A"
  const amount = 100
  try {
    const { status } = await client.tokens.unfreeze(addr, symbol, amount)
    expect(status).toBe(200)
  } catch (err) {
    expect(err.message).toBe("do not have enough token to unfreeze")
  }
})

it("burn token", async () => {
  const client = await getClient(true)
  const addr = "zar1hgm0p7khfk85zpz5v0j8wnej3a90w70979t4js"
  const symbol = "coin174876e801"
  const amount = 10000
  const res = await client.tokens.burn(addr, symbol, amount)
  console.log(res)
  expect(res.status).toBe(200)
})

it("mint token", async () => {
  const client = await getClient(true)
  const addr = "zar1hgm0p7khfk85zpz5v0j8wnej3a90w70979t4js"
  const symbol = "coin174876e801"
  const amount = 10000000
  const res = await client.tokens.mint(addr, symbol, amount)
  console.log(res)
  expect(res.status).toBe(200)
})*/

// })
