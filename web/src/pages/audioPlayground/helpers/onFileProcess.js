import { executeWorker } from '../../../services/workerService/executeWorker';
import AudioFileGenerateWorker from '../../../workers/executeAudioFileGenerate.worker';
import getBase64FromUInt8Array from './getBase64FromUInt8Array';

export default (
  fileContent,
  fileExtension,
  fileName,
  parameters,
  setOutput,
  setGenerateProcessRunning,
) => async () => {
  setGenerateProcessRunning(true);

  const output = await executeWorker(AudioFileGenerateWorker, { parameters });

  setOutput({
    ...output,
    outputFileContentBase64: output.outputFileContent != null
      ? getBase64FromUInt8Array('wav', output.outputFileContent)
      : null,
  });

  setGenerateProcessRunning(false);
};
