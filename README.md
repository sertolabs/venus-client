# Identity Extension Wallet

_This project is in alpha and will change. We are working to adopt interop standards accross these APIs._

## Development

Run in dev mode on localhost. (Native Extension apis won't work)

```
yarn && yarn start
```

Build project

```
yarn build
```

Turn on development mode in your chrome extensions settings. Choose to load upacked and select the build directory.

## Extension API

When activated the extention will inject a ascript onto the users webpage under the global variable `idWallet`. This exposes a few methods which can be used to communicate with the extension.

# Methods

### `authenticate`

For Trust Agency custodial DIDs you can authenticate by passing in the session token and tenantId

```js
const auth = await idWallet.authenticate('<TOKEN>', '<TENANT_ID>'})
```

### `connect`

```js
const identity = await idWallet.connect()
```

### `request`

Pass the SDR JWT as the only argument

```js
const response = idWallet.request('<SDR_JWT>')
```

### `save`

Pass the W3C verifiableCredential object and an optional flag to automatically accept a credentials without giving the user an option.

```js
const response = idWallet.save('<W3C_VC>', (autosave = false))
```
