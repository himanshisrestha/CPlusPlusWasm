import { executeWorker } from '../../../services/workerService/executeWorker';
import AudioFileInfoWorker from '../../../workers/executeAudioFileInfo.worker';
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
        setFileContentBase64(URL.createObjectURL(e.target.files[0]));
      }

      setOutput(await executeWorker(AudioFileInfoWorker, {
        fileContent,
        fileName,
      }));

      setProcessRunning(false);
    }
  };

  reader.readAsArrayBuffer(e.target.files[0]);
};
