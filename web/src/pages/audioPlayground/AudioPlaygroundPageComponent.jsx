import React, { useState } from 'react';
import {
  Alert,
  Button,
  FormLayout,
  FormLayoutCustomField,
  Grid,
  Paper,
  SelectField,
  TextField,
} from '@react-ui-org/react-ui';
import { LoadingIcon } from '../../components/LoadingIcon';
import isFileExtensionSupported from './helpers/isFileExtensionSupported';
import { AudioFileInfo } from './components/AudioFileInfo';
import onFileChanged from './helpers/onFileChanged';
import onFileDownload from './helpers/onFileDownload';
import onFileProcess from './helpers/onFileProcess';
import {
  BIT_DEPTHS_OPTIONS, CHANNELS_OPTIONS, SAMPLE_RATES_OPTIONS,
} from './constants';
import styles from './styles.scss';

const AudioPlaygroundPageComponent = () => {
  const [fileContent, setFileContent] = useState(null);
  const [fileContentBase64, setFileContentBase64] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileExtension, setFileExtension] = useState(null);
  const [isInfoProcessRunning, setInfoProcessRunning] = useState(false);
  const [isProcessRunning, setProcessRunning] = useState(null);
  const [infoCommandOutput, setInfoCommandOutput] = useState(null);
  const [generateCommandOutput, setGenerateCommandOutput] = useState(null);
  const [formData, setFormData] = useState({
    bitDepth: 16,
    frequency: 200,
    numChannels: 1,
    numSamplesPerChannel: 500000,
    sampleRate: 44100,
  });

  return (
    <div className={styles.root}>
      <h1 className="typography-size-5">
        WebAssembly Audio Playground
      </h1>
      {infoCommandOutput?.isFailed && (
        <div className="mb-5">
          <Alert color="danger">
            <strong>Error: </strong>
            We were unable to process file.
          </Alert>
        </div>
      )}
      {generateCommandOutput?.isFailed && (
        <div className="mb-5">
          <Alert color="danger">
            <strong>Error: </strong>
            We were unable to generate audio file with tone of defined parametrs.
          </Alert>
        </div>
      )}
      {fileExtension != null && !isFileExtensionSupported(fileExtension) && (
        <div className="mb-5">
          <Alert color="danger">
            <strong>Error: </strong>
            Unsupported file. Only WAV files are supported.
          </Alert>
        </div>
      )}
      <Grid
        columns={{
          lg: '1fr 1fr',
          xs: '1fr',
        }}
      >
        <Paper>
          <h1 className="typography-size-3">
            Audio Player (WAV)
            <span className="ml-2">
              {isInfoProcessRunning && <LoadingIcon />}
            </span>
          </h1>
          <AudioFileInfo
            fileContentBase64={fileContentBase64}
            fileInfo={infoCommandOutput?.inputFileInfo}
          />
          <form className="mt-5">
            <FormLayout autoWidth>
              <FormLayoutCustomField>
                <input
                  onChange={onFileChanged(
                    setFileName,
                    setFileExtension,
                    setFileContent,
                    setFileContentBase64,
                    setInfoProcessRunning,
                    setInfoCommandOutput,
                  )}
                  type="file"
                />
              </FormLayoutCustomField>
            </FormLayout>
          </form>
        </Paper>
        <Paper>
          <h1 className="typography-size-3">
            Tone Generator (WAV)
          </h1>
          <AudioFileInfo
            fileContentBase64={generateCommandOutput?.outputFileContentBase64}
            fileInfo={generateCommandOutput?.outputFileInfo}
          />
          <form className="mt-5">
            <FormLayout>
              <SelectField
                fullWidth
                label="Channels"
                onChange={(e) => setFormData({
                  ...formData,
                  numChannels: parseInt(e.target.value, 10),
                })}
                options={CHANNELS_OPTIONS}
                value={formData.numChannels || ''}
              />
              <SelectField
                fullWidth
                label="Bit depth"
                onChange={(e) => setFormData({
                  ...formData,
                  bitDepth: parseInt(e.target.value, 10),
                })}
                options={BIT_DEPTHS_OPTIONS}
                value={formData.bitDepth || ''}
              />
              <SelectField
                fullWidth
                label="Sample rate"
                onChange={(e) => setFormData({
                  ...formData,
                  sampleRate: parseInt(e.target.value, 10),
                })}
                options={SAMPLE_RATES_OPTIONS}
                value={formData.sampleRate || ''}
              />
              <TextField
                fullWidth
                label="Samples per channel"
                onChange={(e) => setFormData({
                  ...formData,
                  numSamplesPerChannel: parseInt(e.target.value, 10),
                })}
                type="number"
                value={formData.numSamplesPerChannel || ''}
              />
              <TextField
                fullWidth
                label="Frequency"
                onChange={(e) => setFormData({
                  ...formData,
                  frequency: parseInt(e.target.value, 10),
                })}
                type="number"
                value={formData.frequency || ''}
              />
              <Button
                feedbackIcon={isProcessRunning && <LoadingIcon />}
                label="Generate audio file"
                onClick={onFileProcess(
                  fileContent,
                  fileExtension,
                  fileName,
                  formData,
                  setGenerateCommandOutput,
                  setProcessRunning,
                )}
              />
              <Button
                disabled={generateCommandOutput?.outputFileContentBase64 == null}
                label="Download audio file"
                onClick={onFileDownload('output.wav', generateCommandOutput?.outputFileContentBase64)}
              />
            </FormLayout>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default AudioPlaygroundPageComponent;
