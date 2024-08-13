import { downloadFile } from '../../../services/fileService/downloadFile';

export default (outputFileName, outputFileContentBase64) => () => {
  downloadFile(outputFileName, outputFileContentBase64);
};
