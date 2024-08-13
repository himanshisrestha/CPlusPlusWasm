import { render } from 'react-dom';
import { RENDER_APP_ID } from './constants/ui';
import { getWasmModuleConfiguration } from './services/wasmService/getWasmModuleConfiguration';
import createWasmModule from './wasm/module/wasm';
import history from './routerHistory';

// React UI core CSS
import '@react-ui-org/react-ui/src/lib/theme.scss';
import '@react-ui-org/react-ui/src/lib/foundation.scss';

// React UI CSS helpers
import '@react-ui-org/react-ui/src/lib/helpers.scss';

import store from './store';
import app from './app';

// Create WebAssembly module and make it global
self.WasmModule = await createWasmModule(getWasmModuleConfiguration());

render(
  app(store, history),
  document.getElementById(RENDER_APP_ID),
);
