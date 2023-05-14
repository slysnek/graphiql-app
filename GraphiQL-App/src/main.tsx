import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { WrappedApp } from './app/App';
import { store } from './store/reduxStore';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './services/graphqlClient';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <WrappedApp />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);
