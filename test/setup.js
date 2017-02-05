import register from 'ignore-styles';
register(['.sass', '.scss']);

global.document = require('jsdom').jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;
