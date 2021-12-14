var assert = require('assert');
const Web3 = require('web3')
const bridgeContract = require('./contract-json/BridgeBsc.json');
const CryptoJS = require('crypto-js');
const BSCKeyring = require('../src/index')
const {
    HD_WALLET_12_MNEMONIC,
    HD_WALLET_12_MNEMONIC_TEST_OTHER,
    TESTING_MESSAGE_1,
    TESTING_MESSAGE_2,
    TESTING_MESSAGE_3,
    BSC_NETWORK: {
        TESTNET,
        MAINNET
    },
    TRANSFER_BSC: {
        BSC_AMOUNT,
        BSC_RECEIVER
    },
    CONTRACT_TXN: {
        BSC_CONTRACT,
        BSC_AMOUNT_TO_CONTRACT
    },
} = require('./constants');

const CONTRACT_MINT_PARAM = {
    from: BSC_CONTRACT,
    to: '', // this will be the current account 
    amount: 1,
    nonce: 0,
    signature: [72, 0, 101, 0, 108, 0, 108, 0, 111, 0, 220, 122]
}

const opts = {
    encryptor: {
        encrypt(pass, object) {
            const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(object), pass).toString();

            return ciphertext;
        },
        decrypt(pass, encryptedString) {
            const bytes = CryptoJS.AES.decrypt(encryptedString, pass);
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            return decryptedData;
        },
    },
}

const opts_empty = {}

const PASSWORD = "random_password"

/**
 * Transaction object type
 * {    from: from address,
        to: to address,
        value: amount (in wei),
        data: hex string}
 */

describe('Initialize wallet ', () => {
    const bscKeyring = new BSCKeyring(opts)

    it("Create new vault and keychain", async () => {
        const res = await bscKeyring.createNewVaultAndKeychain(PASSWORD)
        console.log("res ", res)
    })

    it("Create new vault and restore", async () => {
        const res = await bscKeyring.createNewVaultAndRestore(PASSWORD, HD_WALLET_12_MNEMONIC)
        assert(bscKeyring.keyrings[0].mnemonic === HD_WALLET_12_MNEMONIC, "Wrong mnemonic")
    })

    it("Export account (privateKey)", async () => {
        const res = await bscKeyring.getAccounts()
        let account = res[0]
        const accRes = await bscKeyring.exportAccount(account)
        console.log("accRes ", accRes, Buffer.from(accRes, 'hex'))
    })

    it("Get accounts", async () => {
        const acc = await bscKeyring.getAccounts()
        console.log("acc ", acc)
    })

    it("Sign transaction - transfer BSC", async () => {
        const accounts = await bscKeyring.getAccounts()
        const web3 = new Web3(TESTNET.URL);

        console.log("accounts[0] ", accounts[0])

        const tx = {
            from: accounts[0],
            to: BSC_RECEIVER,
            value: BSC_AMOUNT
        }

        const signedTxn = await bscKeyring.signTransaction(tx, web3)
        console.log("signedTxn ", signedTxn)

        // const sentTxn = await bscKeyring.sendTransaction(signedTxn, web3)
        // console.log("sentTxn ", sentTxn)
    })

    it("Sign Transaction - mint token in a demo token contract", async () => {

        const accounts = await bscKeyring.getAccounts()
        const web3 = new Web3(TESTNET.URL);

        const bridgeBsc = new web3.eth.Contract(
            bridgeContract.abi,
            bridgeContract.networks[`${TESTNET.CHAIN_ID}`].address
        );

        const txData = bridgeBsc.methods.mint(CONTRACT_MINT_PARAM.from, accounts[0].toLowerCase(), CONTRACT_MINT_PARAM.amount, CONTRACT_MINT_PARAM.nonce, CONTRACT_MINT_PARAM.signature);
        const data = txData.encodeABI();

        const tx = {
            from: accounts[0],
            to: BSC_CONTRACT,
            value: BSC_AMOUNT_TO_CONTRACT,
            data
        }

        const signedTxn = await bscKeyring.signTransaction(tx, web3);
        console.log("signedTxn ", signedTxn)

        // const sentTxn = await bscKeyring.sendTransaction(signedTxn, web3)
        // console.log("sentTxn ", sentTxn)
    })

    it("Get fees", async () => {
        const accounts = await bscKeyring.getAccounts()
        const web3 = new Web3(TESTNET.URL);

        const bridgeBsc = new web3.eth.Contract(
            bridgeContract.abi,
            bridgeContract.networks[`${TESTNET.CHAIN_ID}`].address
        );

        const txData = bridgeBsc.methods.mint(CONTRACT_MINT_PARAM.from, accounts[0].toLowerCase(), CONTRACT_MINT_PARAM.amount, CONTRACT_MINT_PARAM.nonce, CONTRACT_MINT_PARAM.signature);
        const data = txData.encodeABI();

        const tx = {
            from: accounts[0],
            to: BSC_CONTRACT,
            value: BSC_AMOUNT_TO_CONTRACT,
            data
        }

        const fees = await bscKeyring.getFees(tx, web3)
        console.log("fees ", fees)

    })

})