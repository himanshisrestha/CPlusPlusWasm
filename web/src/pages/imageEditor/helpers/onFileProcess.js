import { executeWorker } from '../../../services/workerService/executeWorker';
import CImgWorker from '../../../workers/executeCimg.worker';
import getBase64FromUInt8Array from './getBase64FromUInt8Array';

export default (
  fileContent,
  fileExtension,
  fileName,
  formData,
  setOutput,
  setProcessRunning,
) => async () => {
  setProcessRunning(true);

  const output = await executeWorker(CImgWorker, {
    command: 'process',
    commandParameters: formData,
    fileContent,
    fileExtension,
    fileName,
  });

  setOutput({
    ...output,
    outputFileContentBase64: output.outputFileContent != null
      ? getBase64FromUInt8Array(fileExtension, output.outputFileContent)
      : null,
  });

  setProcessRunning(false);
};
