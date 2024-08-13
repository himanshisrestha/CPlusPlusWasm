import { executeWorker } from '../../../services/workerService/executeWorker';
import CImgWorker from '../../../workers/executeCimg.worker';
import getBase64FromUInt8Array from './getBase64FromUInt8Array';
import isFileExtensionSupported from './isFileExtensionSupported';

export default (
  setFileName,
  setFileExtension,
  setFileContent,
  setFileContentBase64,
  setProcessRunning,
  setOutput,
) => (e) => {
  const reader = new FileReader();

  reader.onload = async (ie) => {
    const fileContent = new Uint8Array(ie.target.result);

    const { name: fileName } = e.target.files[0];
    const fileNameParts = fileName.split('.');
    const fileExtension = fileNameParts[fileNameParts.length - 1];

    setFileExtension(fileExtension);

    if (isFileExtensionSupported(fileExtension)) {
      setProcessRunning(true);

      setFileName(fileName);
      setFileContent(fileContent);

      if (fileContent != null) {
        setFileContentBase64(getBase64FromUInt8Array(fileExtension, fileContent));
      }

      setOutput(await executeWorker(CImgWorker, {
        command: 'info',
        fileContent,
        fileExtension,
        fileName,
      }));

      setProcessRunning(false);
    }
  };

  reader.readAsArrayBuffer(e.target.files[0]);
};
