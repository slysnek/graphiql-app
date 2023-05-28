import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import config from '../config/config.json';

const httpLink = createHttpLink({
  uri: config.BASE_URL,
});

const authLink = setContext((_, { headers }) => {
  const headersQry = localStorage.getItem(config.HEADERS_QRY);
  let localStorageHeaders;
  try {
    localStorageHeaders = JSON.parse(headersQry === '' || headersQry === null ? '{}' : headersQry);
  } catch (e) {
    localStorageHeaders = JSON.parse('{}');
  }
  return {
    headers: {
      ...headers,
      ...localStorageHeaders,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
