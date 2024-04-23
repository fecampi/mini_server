export function parseURL(url) {
  const result = {
    query: {},
    params: [],
    path: '',
  };

  // Creating a URL object from the provided URL
  const myURL = new URL(url);

  // Extracting the query parameters from the URL
  result.query = Object.fromEntries(myURL.searchParams.entries());

  // Extracting the route parameters from the URL
  const pathname = myURL.pathname;
  result.params = pathname.split('/').filter((segment) => segment !== '');

  // Extracting the path from the URL
  result.path = myURL.pathname;

  return result;
}

// Example usage of the function
const url1 = 'http://www.example.com/page/123?name=John&age=30&tab=profile';
const result1 = parseURL(url1);
console.log(result1);

const url2 = 'http://www.example.com';
const result2 = parseURL(url2);
console.log(result2);
