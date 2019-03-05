import React from 'react';
import CartItem from './CartItem';

function ProductGrid({ products, user_id, cart_id }) {
	return (
		<div className="flex-container">
			{products.map((product, i) => (
				<CartItem
					product={product}
					user_id={user_id}
					cart_id={cart_id}
					key={`${product.id}${product.name}`}
				/>
			))}
		</div>
	);
}

export default ProductGrid;
