import 'whatwg-fetch';

export function fetchUserSubData(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const data = [];
      json.map((datum) => { data.push(datum.url_name) });
      return data;
    }).catch((ex) => { console.log('parsing failed', ex); });
}
