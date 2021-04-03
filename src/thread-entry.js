const {parentPort, workerData} = require("worker_threads");

console.log("Hello world");

parentPort.postMessage(`ThreadId: ${workerData.workerId}`)

parentPort.close();
