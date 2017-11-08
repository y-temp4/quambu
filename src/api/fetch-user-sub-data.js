/* global fetch */
/* eslint-disable no-console */

import 'whatwg-fetch';
import { handleErrors } from '../lib/utils';

export default function fetchUserSubData(url) {
  return new Promise((resolve) => {
    fetch(url)
      .then(handleErrors)
      .then(response => response.json())
      .then((json) => {
        const data = [];
        json.map(datum => data.push(datum.id));
        resolve(data);
      })
      .catch((ex) => { console.log('parsing failed', ex); });
  });
}
