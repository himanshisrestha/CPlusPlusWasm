import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Grid,
  Link,
} from '@react-ui-org/react-ui';
import routes from '../../routes';
import styles from './styles.scss';

const IndexPageComponent = () => {
  const history = useHistory();

  return (
    <div className={styles.root}>
      <h1 className="typography-size-5">
        WebAssembly Example Applications
      </h1>
      <Grid
        columns={{
          lg: '1fr 1fr',
          xs: '1fr',
        }}
      >
        <Card>
          <CardBody>
            <h2 className="typography-size-3">Image Editor</h2>
            <p>
              Image Editor is based on C++ library CImg. CImg library supports huge amount of operations,
              therefore WebAssembly part of C++ is implemented as facade and exports only necessary functions
              used by Image Editor.
            </p>
          </CardBody>
          <CardFooter>
            <Button
              label="Open Image Editor"
              onClick={() => history.push(routes.image_editor)}
              priority="outline"
            />
          </CardFooter>
        </Card>
        <Card>
          <CardBody>
            <h2 className="typography-size-3">Audio Playground</h2>
            <p>
              Audio Playground is based on C++ library AudioFile and allows you to get information about uploaded
              file and play it. It also contains Tone Generator. To test it, download
              {' '}
              <Link
                download
                href="/generated/wav-example-file.wav"
              >
                example WAV audio file
              </Link>
              .
            </p>
          </CardBody>
          <CardFooter>
            <Button
              label="Open Audio Editor"
              onClick={() => history.push(routes.audio_playground)}
              priority="outline"
            />
          </CardFooter>
        </Card>
        <Card>
          <CardBody>
            <h2 className="typography-size-3">ASCII Word Counter</h2>
            <p>
              ASCII Word counter is based on lightweight C++ library of the same name. It calls C++ class functions
              through WebAssembly directly without any facade or wrapping code. Only ASCII characters are supported.
              To test ASCII Word Counter, download
              {' '}
              <Link
                download
                href="/generated/word-counter-example-file.txt"
              >
                example text file
              </Link>
              .
            </p>
          </CardBody>
          <CardFooter>
            <Button
              label="Open Word Counter"
              onClick={() => history.push(routes.word_counter)}
              priority="outline"
            />
          </CardFooter>
        </Card>
      </Grid>
    </div>
  );
};

export default IndexPageComponent;
