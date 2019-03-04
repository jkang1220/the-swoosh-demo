import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
	uri: "https://the-swoosh-demo.herokuapp.com/api",
	credentials: 'include'
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);
