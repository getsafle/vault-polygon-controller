var assert = require('assert');
const Web3 = require('web3')
const bridgeContract = require('./contract-json/BridgePolygon.json');
const CryptoJS = require('crypto-js');
const { KeyringController: PolygonKeyring, getBalance } = require('../src/index')
const {
    HD_WALLET_12_MNEMONIC,
    HD_WALLET_12_MNEMONIC_TEST_OTHER,
    TESTING_MESSAGE_1,
    TESTING_MESSAGE_2,
    TESTING_MESSAGE_3,
    EXTERNAL_ACCOUNT_PRIVATE_KEY,
    EXTERNAL_ACCOUNT_ADDRESS,
    EXTERNAL_ACCOUNT_WRONG_PRIVATE_KEY_1,
    EXTERNAL_ACCOUNT_WRONG_PRIVATE_KEY_2,
    EXTERNAL_ACCOUNT_WRONG_PRIVATE_KEY_3,
    POLYGON_NETWORK: {
        TESTNET,
        MAINNET
    },
    TRANSFER_POLYGON: {
        POLYGON_AMOUNT,
        POLYGON_RECEIVER
    },
    CONTRACT_TXN: {
        POLYGON_CONTRACT,
        POLYGON_AMOUNT_TO_CONTRACT
    },
} = require('./constants');

const CONTRACT_MINT_PARAM = {
    from: POLYGON_CONTRACT,
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
    const polygonKeyring = new PolygonKeyring(opts)

    it("Create new vault and keychain", async () => {
        const res = await polygonKeyring.createNewVaultAndKeychain(PASSWORD)
        console.log("res ", res)
    })

    it("Create new vault and restore", async () => {
        const res = await polygonKeyring.createNewVaultAndRestore(PASSWORD, HD_WALLET_12_MNEMONIC)
        assert(polygonKeyring.keyrings[0].mnemonic === HD_WALLET_12_MNEMONIC, "Wrong mnemonic")
    })

    it("Export account (privateKey)", async () => {
        const res = await polygonKeyring.getAccounts()
        let account = res[0]
        const accRes = await polygonKeyring.exportAccount(account)
        console.log("accRes ", accRes, Buffer.from(accRes, 'hex'))
    })

    it("Get accounts", async () => {
        const acc = await polygonKeyring.getAccounts()
        console.log("acc ", acc)
    })

    it("Get fees", async () => {
        const accounts = await polygonKeyring.getAccounts()
        const web3 = new Web3(TESTNET.URL);

        const bridgePolygon = new web3.eth.Contract(
            bridgeContract.abi,
            bridgeContract.networks[`${TESTNET.CHAIN_ID}`].address
        );

        const txData = bridgePolygon.methods.mint(CONTRACT_MINT_PARAM.from, accounts[0].toLowerCase(), CONTRACT_MINT_PARAM.amount, CONTRACT_MINT_PARAM.nonce, CONTRACT_MINT_PARAM.signature);
        const data = txData.encodeABI();

        const tx = {
            from: accounts[0],
            to: POLYGON_CONTRACT,
            value: POLYGON_AMOUNT_TO_CONTRACT,
            data
        }

        const fees = await polygonKeyring.getFees(tx, web3)
        console.log("fees ", fees)

        const privateKey = await polygonKeyring.exportAccount(accounts[0])
        const tx2 = await polygonKeyring.sign(tx, privateKey, web3)
        console.log("tx2 ", tx2)
        const tx3 = await polygonKeyring.sign(TESTING_MESSAGE_1, privateKey, web3)
        console.log("tx3 ", tx3)


    })

    it("Get fees with manual gasLimit", async () => {
        const web3 = new Web3(TESTNET.URL);
        const tx = {
            gasLimit: 2100
        }
        const fees = await polygonKeyring.getFees(tx, web3)
        console.log(" with manual gasLimit ", fees)

    })

    it("Should import correct account ", async () => {
        const address = await polygonKeyring.importWallet(EXTERNAL_ACCOUNT_PRIVATE_KEY)
        assert(address.toLowerCase() === EXTERNAL_ACCOUNT_ADDRESS.toLowerCase(), "Wrong address")
        assert(polygonKeyring.importedWallets.length === 1, "Should have 1 imported wallet")
    })

    it("Get address balance", async () => {
        const accounts = await polygonKeyring.getAccounts()
        const web3 = new Web3(TESTNET.URL);
        const balance = await getBalance(accounts[0], web3)
        console.log(" get balance ", balance, accounts)
    })

})