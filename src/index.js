export default function promiseQueueMiddleware() {
    const queues = {};

    return store => next => action => {
        if (typeof action !== 'object' || typeof action['queue'] !== 'object' || typeof action['queue'].id !== 'string')
            return next(action);

        let queueInstance = action['queue'];

        if (!queues[queueInstance.id])
            queues[queueInstance.id] = dequeue(queueInstance, store, next, action);
        else
            queues[queueInstance.id] = queues[queueInstance.id].then((lastResult) => {
                    return dequeue(queueInstance, store, next, action, lastResult);
    });
};
}

function dequeue(queueInstance, store, next, action, lastResult) {
    if (typeof queueInstance.onActionDequeue === 'function')
        queueInstance.onActionDequeue(action, lastResult, store);

    return new Promise((resolve, reject) => {
            let promise = queueInstance.promise ? queueInstance.promise : next(action);

        if (promise instanceof Promise)
            promise.then((lastResult) => {resolve(lastResult);});
        else
            resolve();
    });
}
