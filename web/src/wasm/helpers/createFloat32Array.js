import MemoryNotAllocatedError from '../errors/MemoryNotAllocatedError';

/**
 * Creates Float32Array and allocates it on WASM heap.
 *
 * @param floatArray
 * @returns {{getArray: (function(): Float32Array), getPointer: (function(): *), freeMemory: function()}}
 */
export default (floatArray) => {
  // Indicated whether WASM module memory is allocated
  let isWasmMemoryAllocated = true;

  // Create integer array
  const float32Array = new Float32Array(floatArray);

  // Allocate memory within WASM module and retrieve pointer to allocated memory
  const float32ArrayPointer = WasmModule._malloc(float32Array.length * float32Array.BYTES_PER_ELEMENT);
  WasmModule.HEAPF32.set(float32Array, float32ArrayPointer / float32Array.BYTES_PER_ELEMENT);

  return {
    freeMemory: () => {
      if (!isWasmMemoryAllocated) {
        throw new MemoryNotAllocatedError();
      }

      WasmModule._free(float32Array);
      isWasmMemoryAllocated = false;
    },
    getArray: () => float32Array,
    getPointer: () => {
      if (!isWasmMemoryAllocated) {
        throw new MemoryNotAllocatedError();
      }

      return float32ArrayPointer;
    },
  };
};
