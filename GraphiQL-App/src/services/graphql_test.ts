import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import config from '../config/config.json';

export const graphqlClient = () => {
  console.log('Call ');

  const client = new ApolloClient({
    uri: config.BASE_URL,
  });

  client
    .query({
      query: gql`
        query {
          countries {
            name
          }
        }
      `,
    })
    .then((result) => console.log(result));
};
