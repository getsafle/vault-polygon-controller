# polygon-controller

## Install

`npm install --save @getsafle/vault-polygon-controller`

## Initialize the Polygon Controller class

```
const controller = require('@getsafle/vault-polygon-controller');

const polygonController = new controller({
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

### Sign Typed Data (EIP-712)

```
const signedData = await polygonController.signTypedMessage (msgParams);
```
