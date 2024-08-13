import { getWasmModuleConfiguration } from '../services/wasmService/getWasmModuleConfiguration';
import AudioFile from '../wasm/classes/AudioFile';
import createWasmModule from '../wasm/module/wasm';

/**
 * This worker accepts file and generates WAV using AudioFile library.
 * Result is posted back to the worker executor.
 */
addEventListener('message', async ({ data }) => {
  const {
    parameters,
  } = data;

  // Create WasmModule and make it accessible globally
  self.WasmModule = await createWasmModule(getWasmModuleConfiguration());

  let audioFile = null;

  let isFailed = false;
  let errorMessage = null;
  try {
    // Create instance of AudioFile
    audioFile = AudioFile();
  } catch (e) {
    // Stop processing if failed
    isFailed = true;
    errorMessage = e;
  }

  if (isFailed) {
    postMessage({
      errorMessage,
      isFailed: true,
    });
    return;
  }

  const outputFileName = 'output.wav';
  let output = {};
  try {
    const {
      bitDepth,
      frequency,
      numChannels,
      numSamplesPerChannel,
      sampleRate,
    } = parameters;

    const buffer = new WasmModule.VectorVectorFloat();
    const buffers = [];

    // Initialize buffer for each channel
    for (let channel = 0; channel < numChannels; channel += 1) {
      const subBuffer = new WasmModule.VectorFloat();
      subBuffer.resize(numSamplesPerChannel, 0);

      buffers.push(subBuffer);
    }

    // Generate tone
    for (let i = 0.0; i < numSamplesPerChannel; i += 1) {
      const sample = Math.sin(2.0 * Math.PI * (i / sampleRate) * frequency);

      for (let channel = 0; channel < numChannels; channel += 1) {
        buffers[channel].set(i, sample * 0.5);
      }
    }

    // Copy all buffers into wrapper object
    for (let channel = 0; channel < numChannels; channel += 1) {
      buffer.push_back(buffers[channel]);
    }

    // Set audio file parameters
    audioFile.setNumChannels(numChannels);
    audioFile.setNumSamplesPerChannel(numSamplesPerChannel);
    audioFile.setBitDepth(bitDepth);
    audioFile.setSampleRate(sampleRate);
    audioFile.setAudioBuffer(buffer);

    // Save audio file
    audioFile.save(outputFileName, WasmModule.AudioFileFormat.Wave);

    output = {
      outputFileContent: WasmModule.FS.readFile(outputFileName),
      outputFileInfo: {
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
    // Remove output file from WASM file system
    try {
      WasmModule.FS.unlink(outputFileName);
    } catch (e) {} // eslint-disable-line  no-empty
  }

  // Clear data
  audioFile.delete();

  postMessage({
    errorMessage,
    isFailed,
    ...output,
  });
});
