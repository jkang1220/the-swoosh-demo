import React from 'react'
import Typography from '@material-ui/core/Typography';
import UserOrdersGrid from './UserOrdersGrid';
import gql from 'graphql-tag';
import { Query } from 'react-apollo'
import { CircularProgress } from '@material-ui/core';
import ErrorHandlingComponent from './ErrorHandlingComponent';
import id from '../util';

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
		<Query
			query={GET_USER_ORDERS_QUERY}
			fetchPolicy={'cache-first'}
		>
			{({ loading, error, data }) => {
				if (loading) return <CircularProgress />;
				if (error) return <ErrorHandlingComponent message={error.message} />;
				return (
					<React.Fragment>
						<Typography variant="h4" component="h4">
							My Orders
						</Typography >
						<UserOrdersGrid orders={data.getOrdersByUserId} />
					</React.Fragment>
				)
			}}
		</Query >
	)
}

export default OrdersPage;