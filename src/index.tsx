import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import 'bootstrap/dist/css/bootstrap.min.css'

const client_dev = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',
})

const client_prod = new ApolloClient({
  uri: 'https://library28.herokuapp.com/graphql/',
})

const client = process.env.NODE_ENV === 'production' ? client_prod : client_dev;
// const client = client_dev

ReactDOM.render(
  <ApolloProvider client = {client}>
    <React.StrictMode>
     <App />
    </React.StrictMode>
  </ApolloProvider>
  ,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
