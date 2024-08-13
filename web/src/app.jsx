import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Router,
  Switch,
} from 'react-router-dom';
import { RUIProvider } from './components/RUIProvider';
import { AudioPlaygroundPage } from './pages/audioPlayground';
import { IndexPage } from './pages/index';
import { ImageEditorPage } from './pages/imageEditor';
import { WordCounterPage } from './pages/wordCounter';
import routes from './routes';

export default (store, history) => (
  <Provider store={store}>
    <Router history={history}>
      <RUIProvider>
        <Switch>
          <Route
            // eslint-disable-next-line react/no-children-prop
            children={(routerProps) => <IndexPage {...routerProps} />}
            exact
            path={routes.index}
          />
          <Route
            // eslint-disable-next-line react/no-children-prop
            children={(routerProps) => <AudioPlaygroundPage {...routerProps} />}
            exact
            path={routes.audio_playground}
          />
          <Route
            // eslint-disable-next-line react/no-children-prop
            children={(routerProps) => <ImageEditorPage {...routerProps} />}
            exact
            path={routes.image_editor}
          />
          <Route
            // eslint-disable-next-line react/no-children-prop
            children={(routerProps) => <WordCounterPage {...routerProps} />}
            exact
            path={routes.word_counter}
          />
        </Switch>
      </RUIProvider>
    </Router>
  </Provider>
);
