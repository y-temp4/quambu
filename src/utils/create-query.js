export function createQuery(array, param) {
  let query = '?q=';
  array.map((elm) => {
    query += `${param}%3A${elm}+OR+`;
  });
  return query;
}
