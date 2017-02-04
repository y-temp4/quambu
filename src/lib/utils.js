export function createQuery(array, param) {
  let query = '?q=';
  array.map((elm) => {
    query += `${param}%3A${elm}+OR+`;
  });
  query += '&per_page=100';
  return query;
}

export function handleErrors(response) {
  // 4xx系, 5xx系エラーのときには response.ok = false になる
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}
