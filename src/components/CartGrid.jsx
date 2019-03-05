import React from 'react';
import CartItem from './CartItem';

function CartGrid({ products, user_id, cart_id, refetch }) {
	return (
		<div className="flex-container">
			{products.map((product, i) => (
				<CartItem
					product={product}
					user_id={user_id}
					cart_id={cart_id}
					refetch={refetch}
					key={`${product.id}${product.name}`}
				/>
			))}
		</div>
	);
}

export default CartGrid;
