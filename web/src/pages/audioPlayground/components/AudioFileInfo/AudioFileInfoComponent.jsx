import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.scss';

const AudioFileInfoComponent = ({
  fileContentBase64,
  fileInfo,
}) => (
  <>
    <ul>
      <li>
        Length:
        {' '}
        {fileInfo?.lengthInSeconds.toFixed(1) || '-'}
        {fileInfo?.lengthInSeconds && ' s'}
      </li>
      <li>
        Sample rate:
        {' '}
        {fileInfo?.sampleRate || '-'}
        {fileInfo?.sampleRate && ' Hz'}
      </li>
      <li>
        Bit depth:
        {' '}
        {fileInfo?.bitDepth || '-'}
        {fileInfo?.bitDepth && ' bit'}
      </li>
      <li>
        Number of channels:
        {' '}
        {fileInfo?.numChannels || '-'}
      </li>
      <li>
        Number of samples per channel:
        {' '}
        {fileInfo?.numSamplesPerChannel || '-'}
      </li>
      <li>
        Type:
        {' '}
        {fileInfo?.isMono && 'Mono'}
        {fileInfo?.isStereo && 'Stereo'}
        {!fileInfo?.isMono && !fileInfo?.isStereo && '-'}
      </li>
    </ul>
    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
    <audio
      className={styles.audio}
      controls
      src={fileContentBase64 || '#'}
    >
      Your browser does not support the
      {' '}
      <code>audio</code>
      {' '}
      element.
    </audio>
  </>
);

AudioFileInfoComponent.defaultProps = {
  fileContentBase64: null,
  fileInfo: null,
};

AudioFileInfoComponent.propTypes = {
  fileContentBase64: PropTypes.string,
  fileInfo: PropTypes.shape({
    bitDepth: PropTypes.number.isRequired,
    isMono: PropTypes.bool.isRequired,
    isStereo: PropTypes.bool.isRequired,
    lengthInSeconds: PropTypes.number.isRequired,
    numChannels: PropTypes.number.isRequired,
    numSamplesPerChannel: PropTypes.number.isRequired,
    sampleRate: PropTypes.number.isRequired,
  }),
};

export default AudioFileInfoComponent;
