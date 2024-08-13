import createFloat32Array from '../helpers/createFloat32Array';

/**
 * Sums all given floats.
 *
 * @param integerArray
 * @returns {*}
 */
export default (integerArray) => {
  const arrayObject = createFloat32Array(integerArray);
  const result = WasmModule._arrayFloatSum(arrayObject.getPointer(), arrayObject.getArray().length);
  arrayObject.freeMemory();

  return result;
};
