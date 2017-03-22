# redux-promise-queue-middleware
A simple redux middleware to chain async actions using promises
## Install
```
npm install --save redux-promise-queue-middleware
```
## Usage
Import the middleware, initialize and add it to Redux store using applyMiddleware function:
```js
import {createStore, applyMiddleware} from 'redux'
import promiseQueueMiddleware from 'redux-promise-queue-middleware'

let createStoreAndApplyMiddleware = applyMiddleware(
    //others middleware...
    promiseQueueMiddleware(),
    //others middleware...
)(createStore);
```
The queue middleware will sequence all the actions that specify the "queue" parameter in the action object:
```js
function actionToEnqueue(){
    return {
        type: 'ACTION-TYPE'
        queue:{
            name: 'QUEUE-NAME'
            promise: new Promise((resolve)=>{ 
                        console.log('async action begin');
                        setTimeout(()=>{
                            console.log('async action resolved');
                            resolve()
                        },2000);
                   }
            //other options
        }
    }
}
```
### Usage with promise middleware 
If you already use a middleware for managing promises you can add the `promiseQueueMiddleware` before it to manage queues without affecting it's behavior:
```js
import {createStore, applyMiddleware} from 'redux'
import promiseQueueMiddleware from 'redux-promise-queue-middleware'
//import promiseMiddleware from 'promise-middleware-lib'

let createStoreAndApplyMiddleware = applyMiddleware(
    //promiseMiddleware goes here
    promiseQueueMiddleware(),
    //others middleware...
)(createStore);
```
In this case you can avoid to fill the `promise` option and let your promise middleware to handle and return the promise to schedule.

### Options
Name|Type|Default|Description
----|----|-------|------------
name|string|`undefined`|name of the queue. Note: in order to work a queue name must be specified 
promise|func|`undefined`|promise used to wait for async operation (optional)
onActionDequeue|func|`undefined`|operations to perform after action dequeue and before it's execution
clearQueueOnReject|bool|`false`| if an action of the queue is rejected the following actions in the queue won't be executed 