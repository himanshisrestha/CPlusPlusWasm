import MemoryNotAllocatedError from '../errors/MemoryNotAllocatedError';

/**
 * Creates Int32Array and allocates it on WASM heap.
 *
 * @param integerArray
 * @returns {{getArray: (function(): Int32Array), getPointer: (function(): *), freeMemory: function()}}
 */
export default (integerArray) => {
  // Indicated whether WASM module memory is allocated
  let isWasmMemoryAllocated = true;

  // Create integer array
  const int32Array = new Int32Array(integerArray);

  // Allocate memory within WASM module and retrieve pointer to allocated memory
  const int32ArrayPointer = WasmModule._malloc(int32Array.length * int32Array.BYTES_PER_ELEMENT);
  WasmModule.HEAP32.set(int32Array, int32ArrayPointer / int32Array.BYTES_PER_ELEMENT);

  return {
    freeMemory: () => {
      if (!isWasmMemoryAllocated) {
        throw new MemoryNotAllocatedError();
      }

      WasmModule._free(int32ArrayPointer);
      isWasmMemoryAllocated = false;
    },
    getArray: () => int32Array,
    getPointer: () => {
      if (!isWasmMemoryAllocated) {
        throw new MemoryNotAllocatedError();
      }

      return int32ArrayPointer;
    },
  };
};
