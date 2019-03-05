import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { CircularProgress } from '@material-ui/core';
import id from '../util';
import UserOrdersGrid from './UserOrdersGrid';
import ErrorHandlingComponent from './ErrorHandlingComponent';

const GET_USER_ORDERS_QUERY = gql`
query {
  	getOrdersByUserId(id:${id}) {
		id
	    total
	    order_date
	    products {
		    id
		    name
		 	img
		    retail_price
	    }
	    paid
	    payment_date
	    order_tracking_number
	 }
}
`;

const OrdersPage = () => {
	return (
		<Paper>
			<Query query={GET_USER_ORDERS_QUERY} fetchPolicy={'cache-first'}>
				{({ loading, error, data }) => {
					if (loading) return <CircularProgress />;
					if (error) return <ErrorHandlingComponent message={error.message} />;
					console.log('GET_USER_ORDERS_QUERY was Made!!');
					return (
						<React.Fragment>
							<Typography variant="h4" component="h4">
								My Orders
							</Typography>
							<UserOrdersGrid orders={data.getOrdersByUserId} />
						</React.Fragment>
					);
				}}
			</Query>
		</Paper>
	);
};

export default OrdersPage;
