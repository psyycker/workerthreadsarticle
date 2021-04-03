const { Worker } = require("worker_threads");

let canRun = true;

const THREADS_AMOUNT = 4;
(function () {
  // Array of promises
  const promises = [];
  for (let idx = 0; idx < THREADS_AMOUNT; idx += 1) {
    // Add promise in the array of promises
    promises.push(new Promise((resolve) => {
      const worker = new Worker("./src/thread-entry.js", {
        workerData: {
          workerId: idx
        }
      });
      worker.on("exit", () => {
        console.log("Closing ", idx);
        resolve()
      });
      worker.on("message", (value) => {
        console.log(`message received from ${idx}: ${value}`);
      })
    }))
  }
  // Handle the resolution of all promises
  return Promise.all(promises);
})().then(() => {
  canRun = false;
})

function infiniteLoop() {
  setTimeout(() => {
    if (canRun) {
      infiniteLoop();
    }
  }, 1000)
}

infiniteLoop();
