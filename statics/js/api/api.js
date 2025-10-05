export function fetchData(url, method = 'GET', body = null) {
  const BASEURL = "https://mandegarhs.ir/verta/api/";
  return fetch(BASEURL + url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : null
  }).then(response => response.json())
}