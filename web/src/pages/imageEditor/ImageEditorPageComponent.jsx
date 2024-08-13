import React, { useState } from 'react';
import {
  Alert,
  Button,
  FormLayout,
  FormLayoutCustomField,
  Grid,
  SelectField,
} from '@react-ui-org/react-ui';
import { LoadingIcon } from '../../components/LoadingIcon';
import { Preview } from './components/Preview';
import isFileExtensionSupported from './helpers/isFileExtensionSupported';
import onFileChanged from './helpers/onFileChanged';
import onFileDownload from './helpers/onFileDownload';
import onFileProcess from './helpers/onFileProcess';
import {
  MIRROR_OPTIONS,
  RESIZE_OPTIONS,
  ROTATE_OPTIONS,
} from './constants';
import styles from './styles.scss';

const ImageEditorPageComponent = () => {
  const [fileContent, setFileContent] = useState(null);
  const [fileContentBase64, setFileContentBase64] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileExtension, setFileExtension] = useState(null);
  const [isProcessRunning, setProcessRunning] = useState(null);
  const [output, setOutput] = useState(null);
  const [formData, setFormData] = useState({
    mirror: null,
    rotate: null,
  });

  return (
    <div className={styles.root}>
      <h1 className="typography-size-5">
        WebAssembly Image Editor
      </h1>
      {output?.isFailed && (
        <div className="mb-5">
          <Alert color="danger">
            <strong>Error: </strong>
            We were unable to process file.
          </Alert>
        </div>
      )}
      {fileExtension != null && !isFileExtensionSupported(fileExtension) && (
        <div className="mb-5">
          <Alert color="danger">
            <strong>Error: </strong>
            Unsupported file. Only JPEG and PNG files are supported.
          </Alert>
        </div>
      )}
      <Grid
        columns={{
          md: '1fr 1fr',
          xs: '1fr',
        }}
      >
        <Preview
          fileContentBase64={fileContentBase64}
          fileInfo={output?.inputFileInfo || null}
          noImageText="Select JPG or PNG file to preview."
        />
        <Preview
          fileContentBase64={output?.outputFileContentBase64 || null}
          fileInfo={output?.outputFileInfo || null}
          noImageText="Process JPG or PNG file to preview."
        />
      </Grid>
      <form className="mt-5">
        <FormLayout autoWidth>
          <SelectField
            fullWidth
            label="Resize"
            onChange={(e) => setFormData({
              ...formData,
              resize: parseFloat(e.target.value),
            })}
            options={RESIZE_OPTIONS}
            value={formData.resize || 1}
          />
          <SelectField
            fullWidth
            label="Rotate"
            onChange={(e) => setFormData({
              ...formData,
              rotate: parseInt(e.target.value, 10),
            })}
            options={ROTATE_OPTIONS}
            value={formData.rotate || 0}
          />
          <SelectField
            fullWidth
            label="Mirror"
            onChange={(e) => setFormData({
              ...formData,
              mirror: (e.target.value != null && e.target.value !== '') ? e.target.value : null,
            })}
            options={MIRROR_OPTIONS}
            value={formData.mirror || ''}
          />
          <FormLayoutCustomField>
            <input
              onChange={onFileChanged(
                setFileName,
                setFileExtension,
                setFileContent,
                setFileContentBase64,
                setProcessRunning,
                setOutput,
              )}
              type="file"
            />
          </FormLayoutCustomField>
          <Button
            disabled={!isFileExtensionSupported(fileExtension) || fileContent === null}
            feedbackIcon={isProcessRunning && <LoadingIcon />}
            label="Process"
            onClick={onFileProcess(
              fileContent,
              fileExtension,
              fileName,
              formData,
              setOutput,
              setProcessRunning,
            )}
          />
          <Button
            disabled={!isFileExtensionSupported(fileExtension) || output?.outputFileContentBase64 == null}
            label="Download image"
            onClick={onFileDownload(`output-${fileName}`, output?.outputFileContentBase64)}
          />
        </FormLayout>
      </form>
    </div>
  );
};

export default ImageEditorPageComponent;
