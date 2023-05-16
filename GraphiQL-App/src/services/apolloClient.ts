import { ApolloClient, InMemoryCache } from '@apollo/client';
import config from '../config/config.json';

export const client = new ApolloClient({
  uri: config.BASE_URL,
  cache: new InMemoryCache(),
  // headers: {
  //    authorization: localStorage.getItem('token'),
  //    'client-name': 'WidgetX Ecom [web]',
  //    'client-version': '1.0.0'
  // },
});
