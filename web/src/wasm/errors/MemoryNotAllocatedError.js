class MemoryNotAllocatedError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MemoryNotAllocatedError);
    }
  }
}

export default MemoryNotAllocatedError;
