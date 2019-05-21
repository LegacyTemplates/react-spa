import 'bootstrap/dist/css/bootstrap.css';
import './app.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StateProvider } from './shared';

import { App } from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <StateProvider><App /></StateProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
