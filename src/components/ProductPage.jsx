import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import id from '../util';
import ProductGrid from './ProductGrid';
import ErrorHandlingComponent from './ErrorHandlingComponent';

const styles = (theme) => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2
	}
});

const GET_ALL_PRODUCTS_QUERY = gql`
query {
	getAllProducts {
    id
    name
    description
    retail_price
    product_sku
    img
    stock
	}
	getUserByUserId(id:${id}) {
		id
	}
	getCartByUserId(id:${id}){
		id
	}
}
`;

function ProductPage(props) {
	const { classes } = props;

	return (
		<div>
			<Paper className={classes.root} elevation={1}>
				<Query query={GET_ALL_PRODUCTS_QUERY} fetchPolicy={'cache-first'}>
					{({ loading, error, data }) => {
						if (loading) return <CircularProgress />;
						if (error) return <ErrorHandlingComponent message={error.message} />;
						console.log('GET_ALL_PRODUCTS_QUERY was Made!!');
						return (
							<React.Fragment>
								<Typography variant="h4" component="h4">
									All Products
								</Typography>
								<ProductGrid
									products={data.getAllProducts}
									user_id={data.getUserByUserId.id}
									cart_id={data.getCartByUserId.id}
								/>
							</React.Fragment>
						);
					}}
				</Query>
			</Paper>
		</div>
	);
}

export default withStyles(styles)(ProductPage);
