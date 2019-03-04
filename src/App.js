import React, { Component } from 'react';
import './App.css';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_DOGS = gql`
	query {
	  getAllUsers {
	    email
	  }
	}
`;

class App extends Component {
	render() {
		return (

			<div className="App">
				HELLO WORLD!
        <Query query={GET_DOGS}>
					{({ loading, error, data }) => {
						if (loading) return 'Loading...';
						if (error) return `Error! ${error.message}`;
						console.log('data', data);
						return (
							<div>dasd</div>
						)
					}}
				</Query>
			</div>
		);
	}
}

export default App;
