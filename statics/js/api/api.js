export function fetchData(url, method = 'GET', body = null) {
  const BASEURL = "https://mandegarhs.ir/verta/api/";
  
  // Don't set Content-Type for FormData - let browser set it with boundary
  const headers = {};
  
  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    body = body ? JSON.stringify(body) : null;
  }
  
  return fetch(BASEURL + url, {
    method: method,
    headers: headers,
    body: body
  }).then(response => response.json())
}