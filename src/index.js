import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import './index.css';
import App from './App';

//To connect Apollo Client to React, you will need to use the ApolloProvider component exported from react-apollo.
// The ApolloProvider is similar to React’s context provider.
//It wraps your React app and places the client on the context so you can access it from anywhere in your component tree.

const client = new ApolloClient({
	uri: 'http://localhost:4000/api',
	connectToDevTools: true
});

//
ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
