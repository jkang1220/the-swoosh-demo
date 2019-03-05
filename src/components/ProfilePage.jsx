import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import id from '../util';
import ProfileTable from './ProfileTable';
import ErrorHandlingComponent from './ErrorHandlingComponent';

const styles = (theme) => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2
	}
});

const GET_USER_PROFILE_QUERY = gql`
query {
  	getUserByUserId(id:${id}) {
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
				<Query query={GET_USER_PROFILE_QUERY} fetchPolicy={'cache-first'}>
					{({ loading, error, data }) => {
						if (loading) return <CircularProgress />;
						if (error) return <ErrorHandlingComponent message={error.message} />;
						const { image } = data.getUserByUserId;
						return (
							<React.Fragment>
								<Typography variant="h4" component="h4">
									My Profile
								</Typography>
								<img
									alt={`${data.first_name} ${data.last_name}`}
									className="profile-avatar"
									src={image}
								/>
								<ProfileTable userData={data.getUserByUserId} />
							</React.Fragment>
						);
					}}
				</Query>
			</Paper>
		</div>
	);
}

export default withStyles(styles)(ProfilePage);
