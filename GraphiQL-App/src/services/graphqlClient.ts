import ApolloClient from 'apollo-boost';
import config from '../config/config.json';

export const client = new ApolloClient({
  uri: config.BASE_URL,
});
