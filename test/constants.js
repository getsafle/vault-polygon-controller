module.exports = {
    HD_WALLET_12_MNEMONIC_TEST_OTHER: 'orange lecture tiger surround narrow much novel arrange sample balance weapon bacon',
    HD_WALLET_12_MNEMONIC: 'affair entry detect broom axis crawl found valve bamboo taste broken hundred',
    HD_WALLET_24_MNEMONIC: 'begin pyramid grit rigid mountain stamp legal item result peace wealth supply satoshi elegant roof identify furnace march west chicken pen gorilla spot excuse',

    TESTING_MESSAGE_1: "ThisMessageOneIsForTesting",
    TESTING_MESSAGE_2: "This_message_two_is_for_testing",
    TESTING_MESSAGE_3: "This message three is for testing",

    EXTERNAL_ACCOUNT_PRIVATE_KEY: "bcb7a8680126610ca94440b020280f9ef82194a4dc2760653073b5f5b150c9c3",
    EXTERNAL_ACCOUNT_ADDRESS: "0x9E1447ea3F6abA7a5D344B360B95Fd9BAE049448",
    EXTERNAL_ACCOUNT_WRONG_PRIVATE_KEY_1: "random_private_key",
    EXTERNAL_ACCOUNT_WRONG_PRIVATE_KEY_2: "0xbcb7a8680126610ca94440b020280f9ef829ad26637bfb5cc",
    EXTERNAL_ACCOUNT_WRONG_PRIVATE_KEY_3: "QUWL7cmUp9Cj9DF3gLFqqSipopXyzuF4QXmDNV3ZTZ28GB6Ug98Z",

    TRANSACTION_TYPE: {
        NATIVE_TRANSFER: "NATIVE_TRANSFER",
        CONTRACT_TRANSACTION: "CONTRACT_TRANSACTION",
    },
    TRANSFER_POLYGON: {
        POLYGON_RECEIVER: '0xd27189917dd3E4B0e9eB731eCEe358254520FA01', // generated from HD_WALLET_12_MNEMONIC_TEST_OTHER
        POLYGON_AMOUNT: 13
    },
    TOKEN_CONTRACT: '0xb975b3De428Fc3460152d37B515fB3D30A6a5219',
    CONTRACT_TXN: {
        POLYGON_CONTRACT: '0x2F639eEEE51Df9B9e4B7cf2aAC6ACaeb91108aA6', // contract address
        POLYGON_AMOUNT_TO_CONTRACT: 0
    },
    POLYGON_NETWORK: {
        MAINNET: {
            NETWORK: "MAINNET",
            CHAIN_ID: 137,
            URL: 'https://matic-mainnet.chainstacklabs.com'
        },
        TESTNET: {
            NETWORK: "TESTNET",
            CHAIN_ID: 80001,
            URL: 'https://matic-mumbai.chainstacklabs.com'
        }
    }
}