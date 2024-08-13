import createInt32Array from '../helpers/createInt32Array';

/**
 * Sums all given integers.
 *
 * @param integerArray
 * @returns {*}
 */
export default (integerArray) => {
  const arrayObject = createInt32Array(integerArray);
  const result = WasmModule._arrayIntSum(arrayObject.getPointer(), arrayObject.getArray().length);
  arrayObject.freeMemory();

  return result;
};
