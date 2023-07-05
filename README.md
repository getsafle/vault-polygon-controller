# polygon-controller<code><a href="https://www.docker.com/" target="_blank"><img height="50" src="https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912"></a></code>

<img alt="Static Badge" src="https://img.shields.io/badge/version-v1.2.6-blue">  <img alt="Static Badge" src="https://img.shields.io/badge/nvm-v6.0.6-red">  <img alt="Static Badge" src="https://img.shields.io/badge/License-MIT-green">   [![Discussions][discussions-badge]][discussions-link]
 <img alt="Static Badge" src="https://img.shields.io/badge/polygon_controller-documentation-purple">   

A Module written in javascript for managing various keyrings of Polygon accounts, encrypting them, and using them.

- [Installation](#installation)
- [Initialize the Polygon Controller class](#initialize-the-polygon-controller-class)
- [Methods](#methods)
  - [Generate Keyring with 1 account and encrypt](#generate-keyring-with-1-account-and-encrypt)
  - [Restore a keyring with the first account using a mnemonic](#restore-a-keyring-with-the-first-account-using-a-mnemonic)
  - [Add a new account to the keyring object](#add-a-new-account-to-the-keyring-object)
  - [Export the private key of an address present in the keyring](#export-the-private-key-of-an-address-present-in-the-keyring)
  - [Sign a transaction](#sign-a-transaction)
  - [Sign a message](#sign-a-message)
  - [Get balance](#get-balance)


## Installation

`npm install --save @getsafle/vault-polygon-controller`

## Initialize the Polygon Controller class

```
const { KeyringController, getBalance } = require('@getsafle/vault-polygon-controller');

const polygonController = new KeyringController({
  encryptor: {
    // An optional object for defining encryption schemes:
    // Defaults to Browser-native SubtleCrypto.
    encrypt(password, object) {
      return new Promise('encrypted!');
    },
    decrypt(password, encryptedString) {
      return new Promise({ foo: 'bar' });
    },
  },
});
```

## Methods

### Generate Keyring with 1 account and encrypt

```
const keyringState = await polygonController.createNewVaultAndKeychain(password);
```

### Restore a keyring with the first account using a mnemonic

```
const keyringState = await polygonController.createNewVaultAndRestore(password, mnemonic);
```

### Add a new account to the keyring object

```
const keyringState = await polygonController.addNewAccount(keyringObject);
```

### Export the private key of an address present in the keyring

```
const privateKey = await polygonController.exportAccount(address);
```

### Sign a transaction

```
const signedTx = await polygonController.signTransaction(polygonTx, _fromAddress);
```

### Sign a message

```
const signedMsg = await polygonController.signMessage(msgParams);
```

### Sign a message

```
const signedObj = await polygonController.sign(msgParams, pvtKey, web3Obj);
```

### Sign Typed Data (EIP-712)

```
const signedData = await polygonController.signTypedMessage(msgParams);
```

### Get balance

```
const balance = await getBalance(address, web3);
```
[discussions-badge]: https://img.shields.io/badge/Code_Quality-passing-rgba
[discussions-link]: https://github.com/getsafle/vault-polygon-controller/actions
