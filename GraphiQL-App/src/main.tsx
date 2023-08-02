import React from 'react';
import ReactDOM from 'react-dom/client';
import { WrappedApp } from './app/App';
import { store } from './store/reduxStore';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './services/apolloClient';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <WrappedApp />
    </ApolloProvider>
  </Provider>
);
