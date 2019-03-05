import React from 'react';
import OrderTile from './OrderTile';


function UserOrdersGrid({ orders }) {
	console.log('propszzzz', orders);

	return (
		<div className='flex-container' >
			{orders.map((order, i) => <OrderTile order={order} key={i} />)}
		</ div>
	);
}

export default (UserOrdersGrid);