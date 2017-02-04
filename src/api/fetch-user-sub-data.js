import 'whatwg-fetch';
import { handleErrors } from '../lib/utils';

export function fetchUserSubData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(handleErrors())
      .then((response) => response.json())
      .then((json) => {
        const data = [];
        json.map((datum) => { data.push(datum.url_name); });
        resolve(data);
      })
      .catch((ex) => { console.log('parsing failed', ex); });
  });
}
