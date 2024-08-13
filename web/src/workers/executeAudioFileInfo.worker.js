import { getWasmModuleConfiguration } from '../services/wasmService/getWasmModuleConfiguration';
import AudioFile from '../wasm/classes/AudioFile';
import createWasmModule from '../wasm/module/wasm';

/**
 * This worker accepts file and retrieves info about WAV using AudioFile library.
 * Result is posted back to the worker executor.
 */
addEventListener('message', async ({ data }) => {
  const {
    fileContent,
    fileName,
  } = data;

  // Create WasmModule and make it accessible globally
  self.WasmModule = await createWasmModule(getWasmModuleConfiguration());

  let audioFile = null;

  let output = {};
  let isFailed = false;
  let errorMessage = null;
  try {
    // Create file in WASM file system with specified content
    WasmModule.FS.writeFile(fileName, fileContent);

    // Create instance of AudioFile
    audioFile = AudioFile(fileName);

    // Get audio file info
    output = {
      inputFileInfo: {
        bitDepth: audioFile.getBitDepth(),
        isMono: audioFile.isMono(),
        isStereo: audioFile.isStereo(),
        lengthInSeconds: audioFile.getLengthInSeconds(),
        numChannels: audioFile.getNumChannels(),
        numSamplesPerChannel: audioFile.getNumSamplesPerChannel(),
        sampleRate: audioFile.getSampleRate(),
      },
    };
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

  // Clear data
  audioFile.delete();

  postMessage({
    errorMessage,
    isFailed,
    ...output,
  });
});
