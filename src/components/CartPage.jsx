import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import gql from 'graphql-tag';
import { Query } from 'react-apollo'
import CartGrid from './CartGrid';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorHandlingComponent from './ErrorHandlingComponent';
import id from '../util';

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
});

const GET_PRODUCTS_IN_USER_CART_QUERY = gql`
query {
  getCartByUserId(id: ${id}) {
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
				<Query
					query={GET_PRODUCTS_IN_USER_CART_QUERY}
					fetchPolicy={'cache-first'}
				>
					{({ loading, error, data }) => {
						if (loading) return <CircularProgress />;
						if (error) return <ErrorHandlingComponent message={error.message} />;
						return (
							<React.Fragment>
								<CartGrid products={data.getCartByUserId.products} />
							</React.Fragment>
						)
					}}
				</Query >
			</Paper>
		</div>
	);
}

export default withStyles(styles)(CartPage);