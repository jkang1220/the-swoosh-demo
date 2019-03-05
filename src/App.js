import React, { Component } from 'react';
import './App.css';
import TopNavBar from './components/TopNavBar';
import Typography from '@material-ui/core/Typography';

class App extends Component {
	state = {};
	render() {
		return (
			<div className="App">
				<Typography variant="h2" component="h2" paragraph={true}>
					The Swoosh Store
        		</Typography>
				<TopNavBar />
			</div>
		);
	}
}

export default App;
