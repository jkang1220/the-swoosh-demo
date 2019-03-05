import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import id from '../util';
import CartGrid from './CartGrid';
import ErrorHandlingComponent from './ErrorHandlingComponent';

const styles = (theme) => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2
	}
});

const GET_PRODUCTS_IN_USER_CART_QUERY = gql`
query {
  	getCartByUserId(id: ${id}) {
	  	id
    	products {
      		id
	 		name
		  	img
	      	retail_price
	      	product_sku
		}
    	user {
	      	id
    	}
	}
}
`;

function CartPage(props) {
	const { classes } = props;

	return (
		<div>
			<Paper className={classes.root} elevation={1}>
				<Query query={GET_PRODUCTS_IN_USER_CART_QUERY}>
					{({ loading, error, data, refetch }) => {
						if (loading) return <CircularProgress />;
						if (error) return <ErrorHandlingComponent message={error.message} />;
						console.log('GET_PRODUCTS_IN_USER_CART_QUERY was made!');
						return (
							<React.Fragment>
								<Typography variant="h4" component="h4">
									Total: ${data.getCartByUserId.products.reduce(
										(total, product) => {
											return (total += product.retail_price);
										},
										0
									)}
								</Typography>
								<CartGrid
									products={data.getCartByUserId.products}
									user_id={id}
									cart_id={data.getCartByUserId.id}
									refetch={refetch}
								/>
							</React.Fragment>
						);
					}}
				</Query>
			</Paper>
		</div>
	);
}

export default withStyles(styles)(CartPage);
