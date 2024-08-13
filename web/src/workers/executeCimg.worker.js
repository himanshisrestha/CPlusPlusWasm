import { getWasmModuleConfiguration } from '../services/wasmService/getWasmModuleConfiguration';
import CImg from '../wasm/classes/CImg';
import createWasmModule from '../wasm/module/wasm';

/**
 * This worker accepts file and based on received commands, it perform operations with CImg library.
 * Result is posted back to the worker executor.
 */
addEventListener('message', async ({ data }) => {
  const {
    command,
    commandParameters,
    fileContent,
    fileExtension,
    fileName,
  } = data;

  // Create WasmModule and make it accessible globally
  self.WasmModule = await createWasmModule(getWasmModuleConfiguration());

  let cImg = null;

  let isFailed = false;
  let errorMessage = null;
  try {
    // Create file in WASM file system with specified content
    WasmModule.FS.writeFile(fileName, fileContent);

    // Create instance of CImg
    cImg = CImg(fileName);
  } catch (e) {
    // Stop processing if failed
    isFailed = true;
    errorMessage = e;
  } finally {
    // Remove file from WASM file system
    try {
      WasmModule.FS.unlink(fileName);
    } catch (e) {} // eslint-disable-line  no-empty
  }

  if (isFailed) {
    postMessage({
      errorMessage,
      isFailed: true,
    });
    return;
  }

  const outputFileName = `output.${fileExtension}`;
  let output = {};
  try {
    if (command === 'info') {
      output = {
        inputFileInfo: {
          depth: cImg.depth(),
          height: cImg.height(),
          size: cImg.size(),
          width: cImg.width(),
        },
      };
    } else if (command === 'process') {
      const inputFileInfo = {
        depth: cImg.depth(),
        height: cImg.height(),
        size: cImg.size(),
        width: cImg.width(),
      };

      // Perform image modifications
      if (commandParameters.resize != null) {
        cImg.resize(cImg.width() * commandParameters.resize, cImg.height() * commandParameters.resize);
      }
      if (commandParameters.rotate != null) {
        cImg.rotate(commandParameters.rotate);
      }
      if (commandParameters.mirror != null) {
        cImg.mirror(commandParameters.mirror.charCodeAt(0));
      }

      // Save image
      cImg.save(outputFileName);

      output = {
        inputFileInfo,
        outputFileContent: WasmModule.FS.readFile(outputFileName),
        outputFileInfo: {
          depth: cImg.depth(),
          height: cImg.height(),
          size: cImg.size(),
          width: cImg.width(),
        },
      };
    } else {
      isFailed = true;
      errorMessage = 'Unknown command passed to executeCimg.worker.js';
    }
  } catch (e) {
    // Stop processing if failed
    isFailed = true;
    errorMessage = e;
    output = {};
  } finally {
    if (command === 'process') {
      // Remove output file from WASM file system
      try {
        WasmModule.FS.unlink(outputFileName);
      } catch (e) {} // eslint-disable-line  no-empty
    }
  }

  // Clear data
  cImg.delete();

  postMessage({
    errorMessage,
    isFailed,
    ...output,
  });
});
