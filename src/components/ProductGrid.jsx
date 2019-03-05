import React from 'react';
import ProductTile from './ProductTile';

function ProductGrid({ products, user_id, cart_id }) {
	return (
		<div className="flex-container">
			{products.map((product, i) => (
				<ProductTile
					key={product.id}
					product={product}
					user_id={user_id}
					cart_id={cart_id}
				/>
			))}
		</div>
	);
}

export default ProductGrid;
