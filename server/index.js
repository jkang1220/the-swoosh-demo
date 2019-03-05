const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');
const express = require('express');

const knex = require('knex')({
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'jike',
		timezone: 'UTC',
		typeCast: function (field, next) {
			if (field.type == 'DATETIME') {
				return moment(field.string()).format('YYYY-MM-DD HH:mm:ss');
			}
			return next();
		}
	},
});

// The GraphQL schema
const typeDefs = gql`
  type User {
		id: Int!
		username: String!
		first_name: String
		last_name: String
		email: String
		address: String
		image: String
		cart: Cart
		orders: [Order]
	}

	type Product {
		id: Int!
		name: String!
		description: String
		retail_price: Int
		product_sku: String
		img: String
		stock: Int
	}

	type Order {
		id: Int!
		total: Int
		order_date: String
		user_id: Int!
		user: User!
		products: [Product]!
		paid: Int
		payment_date: String
		order_tracking_number: String
	}

	type Cart {
		id: Int!
		user: User!
		products: [Product]!
	}

	input productInput {
		name: String!
		description: String!
		retail_price: Int!
		product_sku: String!
		img: String!
		stock: Int!
  	}

	input orderInput {
		total: Int!
		order_date: String!
		user_id: Int!
		paid: Int!
		payment_date: String!
		order_tracking_number: String!
	}

	input addCartItem {
		user_id: Int!
		cart_id: Int!
		product_id: Int!
	}

	input removeCartItem {
		user_id: Int!
		cart_id: Int!
		product_id: Int!
	}
	input orderProductInput {
		order_id : Int!
		product_id: Int!
  	}

  type Query {
		getAllUsers: [User]!
		getUserByUserId(id: Int!): User
		getAllOrders: [Order]!
		getOrdersByUserId(id: Int!): [Order]
		getAllProducts: [Product]!
		getProductById(id: Int!): Product
		getAllCarts: [Cart]
		getCartByUserId(id: Int!): Cart
	}

	type Mutation {
		AddProductToCatalog(input: productInput): Product
		createOrder(input: orderInput): Order
		AddProductsToOrder(input: [orderProductInput]): [Product]
		AddItemToCart(input: addCartItem): Product
		RemoveItemFromCart(input: removeCartItem): String!
   }
`;

// A map of functions which return data for the schema.
const resolvers = {
	User: {
		cart: async parent => await knex.select().from('carts').where({ user_id: parent.id }).first(),
		orders: async parent => await knex.select().from('orders').where({ user_id: parent.id }),
	},
	Order: {
		user: async parent => await knex.select().from('users').where({ id: parent.user_id }).first(),
		products: async (parent, args, context, info) => await knex.select('*').from('products').join('order_product', 'products.id', 'order_product.product_id').where('order_product.order_id', '=', parent.id),
	},
	Cart: {
		user: async (parent, args) => await knex.select().from('users').where({ id: parent.user_id }).first(),
		products: async (parent, args) => (await knex.raw(
			`select products.* from (SELECT carts.user_id, cart_product.product_id
				FROM carts INNER JOIN cart_product ON carts.id = cart_product.cart_id WHERE carts.id = ${parent.id}) as wow
				INNER JOIN products ON wow.product_id = products.id`))[0],
	},
	Query: {
		getAllUsers: async parent => await knex.select().from('users'),
		getUserByUserId: async (parent, args) => await knex.select().from('users').where(args).first(),
		getAllOrders: async () => await knex.select().from('orders'),
		getOrdersByUserId: async (parent, args) => {
			return await knex.select().from('orders').where('orders.user_id', '=', args.id)
		},
		getAllProducts: async () => await knex.select().from('products'),
		getProductById: async (parent, args) => await knex('products').where(args).first(),
		getAllCarts: async (parent, args) => await knex('carts'),
		getCartByUserId: async (parent, args) => await knex('carts').where(args).first(),
	},
	Mutation: {
		createOrder: async (parent, args) => {
			await knex('orders')
				.insert({
					total: args.input.total,
					order_date: args.input.order_date,
					user_id: args.input.user_id,
					paid: args.input.paid,
					payment_date: args.input.payment_date,
					order_tracking_number: args.input.order_tracking_number,
				});
			return await knex.select().from('orders').where({ id: createOrder[0] }).first();
		},
		AddProductsToOrder: async (parent, args) => {
			const productIds = args.input.map(row => row.product_id);

			args.input.forEach(async (productToOrderRelationship) => {
				await knex('order_product').insert(
					productToOrderRelationship,
				);
			});

			return await knex('products').whereIn('products.id', [...productIds]);
		},
		AddItemToCart: async (parent, args) => {
			await knex('cart_product')
				.insert({
					cart_id: args.input.cart_id,
					product_id: args.input.product_id,
				});
			return await knex.select().from('products').where({ id: args.input.product_id }).first();
		},
		RemoveItemFromCart: async (parent, args) => {
			await knex('cart_product')
				.where({
					cart_id: args.input.cart_id,
					product_id: args.input.product_id,
				}).del();

			return args.input.product_id;
		},
		AddProductToCatalog: async (parent, args) => {
			const addedProductId = (await knex('products')
				.insert({
					name: args.input.name,
					description: args.input.description,
					retail_price: args.input.retail_price,
					product_sku: args.input.product_sku,
					img: args.input.img,
					stock: args.input.stock,
				}))[0];
			return await knex('products').where({ id: addedProductId }).first();
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const app = express();

server.applyMiddleware({
	app,
	path: '/api',
	cors: true,
});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

let port = 4000;
app.listen(port, () => console.log(`Listening on port ${port}`))
