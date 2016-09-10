import React from 'react';
import { render } from 'react-dom';
import App from './components/app';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
render(<App />, document.getElementById('root'));
