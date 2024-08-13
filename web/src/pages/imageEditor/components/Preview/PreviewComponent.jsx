import PropTypes from 'prop-types';
import React from 'react';
import {
  Center,
  Paper,
} from '@react-ui-org/react-ui';
import styles from './styles.scss';

const PreviewComponent = ({
  fileInfo,
  fileContentBase64,
  noImageText,
}) => (
  <Paper>
    <Center>
      <div className={styles.imgWrapper}>
        {fileContentBase64 != null && (
          <img
            className={styles.img}
            alt="Preview"
            src={fileContentBase64}
          />
        )}
        {fileContentBase64 === null && (
          <span>{noImageText}</span>
        )}
      </div>
      {fileInfo != null && (
        <p className="text-center mt-3">
          Width:
          {' '}
          {fileInfo.width}
          {'px; '}
          Height:
          {' '}
          {fileInfo.height}
          px
        </p>
      )}
    </Center>
  </Paper>
);

PreviewComponent.defaultProps = {
  fileContentBase64: null,
  fileInfo: null,
};

PreviewComponent.propTypes = {
  fileContentBase64: PropTypes.string,
  fileInfo: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }),
  noImageText: PropTypes.string.isRequired,
};

export default PreviewComponent;
