import React from 'react';
import Card from '@material-ui/core/Card';
import red from '@material-ui/core/colors/red';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import TableFooter from '@material-ui/core/TableFooter';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import id from '../util';

const styles = (theme) => ({
	card: {
		width: 300
	},
	media: {
		height: 0,
		paddingTop: '56.25%'
	},
	actions: {
		display: 'flex'
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatar: {
		backgroundColor: red[500]
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

class ProductTile extends React.Component {
	render() {
		const { classes, product, user_id, cart_id } = this.props;
		const { id, name, description, retail_price, product_sku, stock, img } = product;

		const ADD_ITEM_TO_USER_CART = gql`
		mutation {
			AddItemToCart(input: {user_id: ${user_id}, cart_id: ${cart_id}, product_id: ${id} }) {
			    id
			    name
			    description
			    retail_price
			    product_sku
			    img
			    stock
			}
		}
	`;
		return (
			<div className="order-tile">
				<Card className={classes.card}>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>
									<b>Product Name:</b> {name}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align="center">
									<img alt={name} className="product-image" src={img} />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<b>Description:</b> {description}{' '}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<b>Price:</b> ${retail_price}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<b>Product SKU:</b> {product_sku}{' '}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<b>Current Stock Count:</b> {stock}{' '}
								</TableCell>
							</TableRow>
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell>
									<Mutation
										mutation={ADD_ITEM_TO_USER_CART}
										variables={{ user_id, cart_id, id }}
										update={(cache, { data: { AddItemToCart } }) => {
											const { getCartByUserId } = cache.readQuery({
												query: GET_PRODUCTS_IN_USER_CART_QUERY
											});
											//SHOW APOLLO DEV TOOLS CACHE
											cache.writeQuery({
												query: GET_PRODUCTS_IN_USER_CART_QUERY,
												data: {
													getCartByUserId: {
														id: 1,
														products: getCartByUserId.products.concat(
															[ AddItemToCart ]
														),
														user: getCartByUserId.user,
														__typename: 'Cart'
													}
												}
											});
										}}
									>
										{(postMutation) => (
											<IconButton
												color="primary"
												aria-label="Add to shopping cart"
												onClick={postMutation}
											>
												<AddShoppingCartIcon />
											</IconButton>
										)}
									</Mutation>
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</Card>
			</div>
		);
	}
}

export default withStyles(styles)(ProductTile);
