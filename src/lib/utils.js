export function createQuery(array, param) {
  return `?q=
    ${array.map(e => `${param}%3A${e}+OR+`).join('').slice(0, -4)}
    &per_page=100`;
}

export function handleErrors(response) {
  // 4xx系, 5xx系エラーのときには response.ok = false になる
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}
