import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import Card from '@material-ui/core/Card';
import red from '@material-ui/core/colors/red';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const styles = (theme) => ({
	card: {
		width: 250
	},
	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
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

const CartItem = ({ classes, product, user_id, cart_id, refetch }) => {
	const { id, name, retail_price, img } = product;
	const REMOVE_ITEM_FROM_USER_CART = gql`
		mutation {
		  RemoveItemFromCart(input: {user_id: ${user_id}, cart_id: ${cart_id}, product_id: ${id} })
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
								<b>Price:</b> ${retail_price}
							</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell>
								{/* For a mutation you just need to pass in the necessary variables, and the gql query */}
								{/* The Mutation render prop function that you are passing in has an function as an argument that will
								call the actual mutation*/}
								<Mutation
									mutation={REMOVE_ITEM_FROM_USER_CART}
									variables={{ product_id: id, user_id, id }}
								>
									{(postMutation) => (
										<IconButton
											aria-label="Delete"
											color="secondary"
											onClick={() => {
												postMutation();
												refetch();
											}}
										>
											<DeleteIcon />
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
};

export default withStyles(styles)(CartItem);
