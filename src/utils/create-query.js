export function createQuery(array, param) {
  let query = '?q=';
  array.map((elm) => {
    query += `${param}%3A${elm}+OR+`;
  });
  query += '&per_page=100';
  return query;
}
