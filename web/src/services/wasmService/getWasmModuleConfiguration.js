/* eslint-disable no-console */
/**
 * It returns WebAssembly module configuration
 *
 * @returns {{ print: function, printErr: function }}
 */
export const getWasmModuleConfiguration = () => ({
  print: (text) => {
    console.log(text);
  },
  printErr: (text) => {
    console.error(text);
  },
});
