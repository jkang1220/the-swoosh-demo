import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ProfilePage from './ProfilePage';
import StorePage from './StorePage';
import OrdersPage from './OrdersPage';

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

const styles = theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	},
});

class TopNavBar extends React.Component {
	state = {
		value: 0,
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes } = this.props;
		const { value } = this.state;

		return (
			<div className={classes.root}>
				<AppBar position="static">
					<Tabs value={value}
						onChange={this.handleChange}
						variant="fullWidth"
					>
						<Tab label="Profile" />
						<Tab label="My Orders" />
						<Tab label="Buy" />
					</Tabs>
				</AppBar>
				{value === 0 && <TabContainer><ProfilePage /></TabContainer>}
				{value === 1 && <TabContainer><OrdersPage /></TabContainer>}
				{value === 2 && <TabContainer><StorePage /></TabContainer>}
			</div>);
	}
}

export default withStyles(styles)(TopNavBar);