# redux-promise-queue-middleware
A simple redux middleware to chain async actions using promises
## Install
```
npm install --save redux-promise-queue-middleware
```
## Usage
Import the middleware and pass it to applyMiddleware upon Redux store creation
```js
import {createStore, applyMiddleware} from 'redux'
import promiseQueueMiddleware from 'redux-promise-queue-middleware'

let createStoreAndApplyMiddleware = applyMiddleware(
    //others middleware...
    promiseQueueMiddleware(),
    //others middleware...
)(createStore);
```
