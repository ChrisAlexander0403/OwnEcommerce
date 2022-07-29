import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';
import App from './App';
import store from './features/store';

let persistor = persistStore(store);

const link = createUploadLink({
  uri: "http://localhost:5000/graphql",
  credentials: 'same-origin'
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ApolloProvider>
);