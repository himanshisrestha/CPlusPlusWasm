/**
 * It creates promise-based wrapper around Worker that accepts the function representing Worker and parameters with
 * which is Worker executed. Worker is executed immediately after this function is called and terminated when
 * result is returned.
 *
 * @param Worker
 * @param workerArguments
 * @returns {Promise<unknown>}
 */
export const executeWorker = (Worker, workerArguments) => new Promise((resolve, reject) => {
  const worker = new Worker();

  worker.addEventListener('message', ({ data }) => {
    resolve(data);
    worker.terminate();
  });

  worker.addEventListener('error', () => {
    reject();
    worker.terminate();
  });
  worker.addEventListener('messageerror', () => {
    reject();
    worker.terminate();
  });

  worker.postMessage(workerArguments);

  return worker;
});
