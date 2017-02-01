import 'whatwg-fetch';

export function fetchUserSubData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const data = [];
        json.map((datum) => { data.push(datum.url_name); });
        resolve(data);
      })
      .catch((ex) => { console.log('parsing failed', ex); });
  });
}
