import React from 'react';
import Card from '@material-ui/core/Card';
import red from '@material-ui/core/colors/red';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

const styles = (theme) => ({
	card: {
		width: 450
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

const OrderTile = (props) => {
	const { classes } = props;
	let { total, order_date, products, order_tracking_number, payment_date } = props.order;

	return (
		<div className="order-tile">
			<Card className={classes.card}>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>
								<b>Order On:</b>{' '}
							</TableCell>
							<TableCell>
								{moment.unix(order_date / 1000).format('MMM-DD-YYYY')}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<b>Paid On: </b>{' '}
							</TableCell>
							<TableCell>
								{moment.unix(payment_date / 1000).format('MMM-DD-YYYY')}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<b>Total:</b>{' '}
							</TableCell>
							<TableCell>{total}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<b>Order Tracking Number:</b>{' '}
							</TableCell>
							<TableCell>{order_tracking_number}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<b>Items Ordered:</b>{' '}
							</TableCell>
							<td>
								{products.map((product, i) => (
									<div key={i} className="order-tile-products">
										<p>Name: {product.name}</p>
										<p>Retail Price: ${product.retail_price}</p>
										<img
											alt={product.name}
											src={product.img}
											className="order-tile-product-img"
										/>
									</div>
								))}
							</td>
						</TableRow>
					</TableBody>
				</Table>
			</Card>
		</div>
	);
};

export default withStyles(styles)(OrderTile);
