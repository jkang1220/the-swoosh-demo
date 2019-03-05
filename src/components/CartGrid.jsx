import React from 'react';
import CartItem from './CartItem';


function ProductGrid({ products }) {
	return (
		<div className='flex-container' >
			{products.map((product, i) => <CartItem product={product} key={product.id} />)}
		</ div>
	);
}

export default (ProductGrid);