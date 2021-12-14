module.exports = {
    HD_WALLET_12_MNEMONIC_TEST_OTHER: 'orange lecture tiger surround narrow much novel arrange sample balance weapon bacon',
    HD_WALLET_12_MNEMONIC: 'affair entry detect broom axis crawl found valve bamboo taste broken hundred',
    HD_WALLET_24_MNEMONIC: 'begin pyramid grit rigid mountain stamp legal item result peace wealth supply satoshi elegant roof identify furnace march west chicken pen gorilla spot excuse',

    TESTING_MESSAGE_1: "ThisMessageOneIsForTesting",
    TESTING_MESSAGE_2: "This_message_two_is_for_testing",
    TESTING_MESSAGE_3: "This message three is for testing",

    TRANSACTION_TYPE: {
        NATIVE_TRANSFER: "NATIVE_TRANSFER",
        CONTRACT_TRANSACTION: "CONTRACT_TRANSACTION",
    },
    TRANSFER_BSC: {
        BSC_RECEIVER: '0xd27189917dd3E4B0e9eB731eCEe358254520FA01', // generated from HD_WALLET_12_MNEMONIC_TEST_OTHER
        BSC_AMOUNT: 13
    },
    TOKEN_CONTRACT: '0x2c7ac5a8d7e0b8406f9F47004E8092e5B0755326',
    CONTRACT_TXN: {
        BSC_CONTRACT: '0x0028E1248B2aA90843af835eb52d1a6bB73Cc037', // contract address
        BSC_AMOUNT_TO_CONTRACT: 0
    },
    BSC_NETWORK: {
        MAINNET: {
            NETWORK: "MAINNET",
            CHAIN_ID: 137,
            URL: 'https://rpc-mainnet.matic.network'
        },
        TESTNET: {
            NETWORK: "TESTNET",
            CHAIN_ID: 80001,
            URL: 'https://rpc-mumbai.maticvigil.com'
        }
    }
}