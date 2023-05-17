### 1.0.0 (2021-12-1)

##### Polygon Keyring Implementation

- Implemented Keyring functionality to enable account generation, export keys and signing methods

### 1.0.1 (2022-01-21)

##### Implement import wallet functionality

- Added importWallet() to import account using privateKey.

### 1.1.0 (2022-02-16)

##### Implement get balance functionality

- Added getBalance() to fetch the balance in native currency.

### 1.2.0 (2022-03-05)

##### Implement sign functionality

- Added sign() to sign a message or transaction and get signature along with v,r,s.

### 1.2.1 (2022-04-13)

##### Updated getFees()

- Updated getFees() function to calculate the transaction fees using `maxFeePerGas` since polygon supports type 2 transactions.

### 1.2.2 (2022-05-27)

##### update signTransaction()

- Updated signTransaction() function to support EIP-1559 transactions.

### 1.2.3 (2022-05-27)

##### Updated signTransaction()

- Removed unused code in signTransaction() and refactored the function.

### 1.2.4 (2023-05-17)

- Update importWallet method