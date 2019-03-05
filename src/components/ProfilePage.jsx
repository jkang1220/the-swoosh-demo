import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import gql from 'graphql-tag';
import { Query } from 'react-apollo'
import ProfileTable from './ProfileTable';
import UserOrdersGrid from './UserOrdersGrid';

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
});

const USER_PROFILE_QUERY = gql`
query {
  	getUserByUserId(id:1) {
		id
    	username
    	first_name
    	last_name
    	email
    	address
   		image
	    orders {
	      	id
	      	total
	      	order_date
	      	products {
		        name
		        description
		        retail_price
		        img
	      	}
		    paid
		    payment_date
		    order_tracking_number
    	}
  	}
}
`;

function ProfilePage(props) {
	const { classes } = props;

	return (
		<div>
			<Paper className={classes.root} elevation={1}>
				<Query
					query={USER_PROFILE_QUERY}
					fetchPolicy={'cache-first'}
				>
					{({ loading, error, data }) => {
						if (loading) return <span>Loading...</span>;
						if (error) return `Error! ${error.message}`;
						const { image } = data.getUserByUserId;
						const { orders } = data.getUserByUserId;
						return (
							<React.Fragment>
								<Typography variant="h4" component="h4">
									My Profile
	        					</Typography>
								<img alt={`${data.first_name} ${data.last_name}`} className="profile-avatar" src={image} />
								<ProfileTable userData={data.getUserByUserId} />
							</React.Fragment>
						)
					}}
				</Query>
			</Paper>
		</div>
	);
}

export default withStyles(styles)(ProfilePage);