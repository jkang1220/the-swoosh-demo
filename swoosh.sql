DROP DATABASE IF EXISTS jike;

CREATE DATABASE jike;

USE jike;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(255),
	first_name varchar(255),
	last_name varchar(255),
	email varchar(255),
	address varchar(255),
	image varchar(255),
	PRIMARY KEY (id)
);

CREATE TABLE products
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255),
	description varchar(800),
	retail_price int,
	product_sku varchar(255),
	img varchar(255),
	stock int,
	PRIMARY KEY (id)
);

CREATE TABLE orders
(
	id int NOT NULL AUTO_INCREMENT,
	total int,
	order_date date,
	user_id int,
	paid tinyint(1),
	payment_date date,
	order_tracking_number varchar(255),
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_product
(
	id int NOT NULL AUTO_INCREMENT,
	order_id int,
	product_id int,
	PRIMARY KEY (id),
	FOREIGN KEY (order_id) REFERENCES orders(id),
	FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE carts
(
	id int NOT NULL AUTO_INCREMENT,
	user_id int,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cart_product
(
		id int NOT NULL AUTO_INCREMENT,
		cart_id int,
		product_id int,
		PRIMARY KEY (id),
		FOREIGN KEY (cart_id) REFERENCES carts(id),
		FOREIGN KEY (product_id) REFERENCES products(id)
);


INSERT INTO users (id, username, first_name, last_name, email, address, image) VALUES
	(1, 'jkang1220', 'Jimmy', 'Kang', 'benjohnson4867@gmail.com', '239 10th Ave, New York, New York 10036', 'https://image.flaticon.com/icons/svg/189/189000.svg'),
	(2, 'hungryHippo123', 'Henry', 'Henson', 'HenHen998@gmail.com', '345 Stone Hall Drive, Annandale, VA 22004', 'https://image.flaticon.com/icons/svg/188/188987.svg'),
	(3, 'lilSmith1235', 'Lily', 'Smith', 'lilSmith1235@gmail.com', '642 Donnybrook Ct, Los Angeles, California 90001', 'https://image.flaticon.com/icons/svg/189/189001.svg'),
	(4, 'JMora783', 'Jair', 'Mora', 'JMora783@gmail.com', '239 11th Ave, New York, New York 10036', 'https://image.flaticon.com/icons/svg/188/188989.svg'),
	(5, 'MikRiggs4236', 'Mikayla', 'Riggs', 'MikRiggs4236@gmail.com', '239 17th Ave, New York, New York 10040', 'https://image.flaticon.com/icons/svg/188/188993.svg'),
	(6, 'JBuckley123', 'Jordon', 'Buckley', 'JBuckley123@gmail.com', '190 45th St, New York, New York 10026', 'https://image.flaticon.com/icons/svg/188/188988.svg');


INSERT INTO products (id, name, description, retail_price, product_sku, img, stock) VALUES
	(1, 'LeBron 16 Low x atmos - Safari', '2003 was a banner year in sport and sneaker culture. LeBron James was drafted in ‘03, and in that same year, some of the best colorways and
	collaborations hit shelves and stormed stockrooms, including one of the greatest Air Max 1 designs of all time, the atmos x Air Max 1 ‘Safari’. Japanese sneaker community staple atmos partnered with Nike to release a shoe honoring the OG Air Safari and the OG Air Max 1, and now King James is partnering with atmos to pay tribute to the ’03 grail. The LeBron 16 Low x atmos ‘Safari’ sports the same mini Swoosh found on the toe box of the Air Max 1, as well as a gum outsole, premium materials and color-blocking pulled straight from the original.', 175, 'LEB16ATSAF', 'https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/xarfk0z7kclteq84ypmn/nike-lebron-16-low-atmos-safari-release-date.jpg', 500),
	(2, 'Air Zoom Pegasus 35 Turbo - Gyakusou', 'In collaboration with Tokyo-based run crew Gyakusou, this special-edition Zoom Pegasus 35
	Turbo looks as fast as it feels. The running silhouette delivers a responsive, quick feel underfoot with its ZoomX foam, while Flywire cables integrate with the laces for a dynamic fit.', 200, 'AZP35TGYU', 'https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/ctbike1zrt65el15bcgg/nike-air-zoom-pegasus-35-turbo-gyakusou-gold-dart-release-date.jpg', 500),
	(3, 'Air Max2 Light - Blue Lagoon', 'Originally released in 1994, the Air Max2 Light makes its return as a near-exact replica of the
	iconic running shoe. When it introduced two different pressure systems in one Air-unit on a Nike sneaker, it became a cult-favorite for runners and sneakerheads alike. Staying true to the original, breathable mesh and synthetic leather overlays sit on top of the molded heel design.', 140, 'AM2LBL', 'https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/ujgshplrq5f5gzlpo8sc/mens-air-max2-light-blue-lagoon-release-date.jpg', 500),
	(4, 'Air Jordan IX - Midnight Navy', 'There are moments in MJ’s career that shaped his legacy, and it all started with the
	game-winning shot that brought North Carolina a national title in 1982. Paying tribute to his alma mater and the city of Charlotte, this special-edition Air Jordan IX re-creates the 2002 “Pearl Blue” colorway with hints of navy and university blue on the white leather upper.', 190, 'AJ9MIDNAV', 'https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/fbtlydjbtuy4t8bee9m5/air-jordan-9-retro-unc-midnight-navy-release-date.jpg', 500),
	(5, 'Kyrie 5 - BHM', 'The 2019 Black History Month collection celebrates the rich history and traditions of the continent
	of Africa through Nike Basketball’s signature player silhouettes. The Kyrie 5 “BHM” honors Kenyan culture with a vibrant embossed print on the Flytrap and rose gold swoosh at the heel.', 130, 'KY5BHM', 'https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/mq9iiecbkeo4rs4ufjg9/nike-kyrie-5-bhm-2019-release-date.jpg', 500),
	(6, 'Blazer Mid 77 - Habanero Red', 'Named after Portland’s basketball team when it joined the league, the Blazer became
	an instant classic on and off the court when it debuted in 1972. The iconic silhouette arrives in a white leather upper and red Nike swoosh, while the vintage finish on the midsole provides an old-school look.', 100, 'BLZMIDHAB', 'https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/x1q49nrsbgdenslfdbwa/nike-blazer-mid-77-vintage-habanero-red-white-sail-release-date.jpg', 500),
	(7, 'ISPA React Low - Summit White', 'Improvise. Scavenge. Protect. Adapt. When change comes calling, the iSPA collection
	answers with assertion that any problem can be solved using materials on hand. The iSPA React Low utilizes Nike React cushioning, and the silhouette is designed with a deconstructed water-resistant bootie to keep you covered—regardless of the conditions.', 160, 'REACTISPA', 'https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/y1yfmld1viozwu1ylakm/nike-react-runner-wr-ispa-summit-white-deep-royal-blue-black-release-date.jpg', 500),
	(8, 'Lebron 16 - Equality Home', 'For LeBron, equality means that we all have the power to stand up and speak for something
	no matter who you are. The LeBron 16 Equality Home represents LeBron’s desire to break down barriers, inspire action and bring people together.', 185, 'LEB16EQ', 'https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/uzpz1opv2uxviens12pn/lebron-16-equality-release-date.jpg', 500),
	(9, 'PG 3 All-Star', 'PG knows it’s one thing to brave the elements, but it’s another thing to embrace them. In the game’s
	 biggest moments, PG carries the belief that no matter the environment or intensity, All Conditions means all conditions. Designed to go further and push beyond limits, the PG 3 “All-Star” combines PG’s love for fishing and the outdoors with the performance innovation, vibrant heritage, and design mantra of the Nike ACG line.', 110, 'PG3AS', 'https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/ski6saarm5jnlrid7old/pg3-acg-multi-color-release-date.jpg', 500),
	(10, 'KD 11 - BHM', 'The 2019 Black History Month collection celebrates the rich history and traditions of the continent
	 of Africa through Nike Basketball’s signature player silhouettes. The KD 11 “BHM” is honors the culture of the Sierra Leone. It features a colorful purple hued upper with a traditional-inspired patterned print on the ankle.', 150, 'KD11BHM', 'https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/c2xjqe9fphlbmozdesmf/nike-kd-11-bhm-2019-release-date.jpg', 500),
	(11, 'Air Foamposite One - Midnight Navy', 'On its debut in 1997, the shoe adopted by Anfernee “Penny” Hardaway as his
	signature silhouette was a sensation on the hardwood—but these days its influence extends far beyond basketball. Now, the classic lineage is extended with a new midnight navy colorway, featuring a gum rubber sole.', 230, 'AF1MIDNAV', 'https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/gj2z6fvague7amfbcnpv/air-foamposite-one-midnight-navy-gum-light-brown-release-date.jpg', 500),
	(12, 'Nike Air Max 95 - Carhartt WIP', 'Nike x Carhartt WIP’s footwear collection combines iconic sneaker silhouettes
	with classic workwear materials. This first-ever collaboration brings street-ready ruggedness to timeless Nike icons with a highly considered feel. Established in 1989, Carhartt WIP merge Carhartt’s original ethos of creating well-constructed pieces from durable elements with a sharp perspective on contemporary style; attracting a new audience that appreciates not having to choose between well-designed and well-made. The Nike x Carhartt WIP Air Max 95 is built on the foundations of an icon. Alternating Carhartt WIP black canvas and camo tiger ripstop compliment reflective materials and neon color pops. This edition brings rugged appeal to the first silhouette to feature visible forefoot Nike Air.', 170, 'NAM95CARWIP', 'https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/w5bs2nmtaphmscpbui4a/nike-air-max-95-carhartt-wip-black-sail-total-orange-release-date.jpg', 500),
	(13, 'Air Vapormax Plus - Retuned Air', 'The Air Max Plus became a streetwear hit when it debuted in 1998. In 2017, Nike introduced its latest running innovation: Nike Air VaporMax. 20 years after introducing Tuned Air, heritage design meets the future of Nike Air cushioning to create the Air VaporMax Plus. The signature upper of the Air Max Plus, this time in all white, with an equally-recognized translucent outsole.', 190, 'AVPRA1', 'https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/dlgseca312yxqmpcajf7/nike-air-vapormax-plus-white-pure-platinum-release-date.jpg', 500),
	(14, 'React Element 55 - New Chapter', "The Nike React didn't actually hit the ground running. In its first form—this form—it was designed for casual wear, pure and simple. The React Element 55 is the opaque iteration of the React Element 87, which took comfort to the cutting edge. The sneaker’s super-soft sole has once again been optimized for the urban commute—proving once more that innovation can walk before it runs.", 130, 'RE55NC', "https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/zbgrzdzbnsufdekwwvw4/nike-react-element-55-black-white-release-date.jpg", 500),
	(15, "Why Not Zero.2 - Own The Game", "When Russell Westbrook walks in a room, he’s usually wearing the boldest, brightest gear and isn’t afraid to make a fashion statement. “Own the game” exemplifies his “Why Not?” ethos, and the design blends bright colors with bold patterns to ensure Russell Westbrook stands-out when he wears them on the court during All Star weekend.", 125, 'WNZ2OTH', "https://c.static-nike.com/a/images/t_prod_ss/w_960,c_limit,f_auto/sbsphwizk6cpmvrwb3r0/mens-jordan-why-not-02-all-star-release-date.jpg", 500);


INSERT INTO orders (id, total, order_date, user_id, paid, payment_date, order_tracking_number) VALUES
	(1, 420, '2019-01-30', 1, 1, '2019-01-30', 'C0001234567'),
	(2, 260, '2019-02-01', 1, 1, '2019-02-01', 'C0007654321'),
	(3, 170, '2019-02-02', 1, 1, '2019-02-02', 'C0009876654');


INSERT INTO order_product (id, order_id, product_id) VALUES
	(1, 1, 4),
	(2, 1, 5),
	(3, 1, 6),
	(4, 2, 9),
	(5, 2, 10),
	(6, 3, 12);


INSERT INTO carts (id, user_id) VALUES
	(1, 1),
	(2, 2);

INSERT INTO cart_product (id, cart_id, `product_id`) VALUES
	(1, 1, 11),
	(2, 1, 12),
	(3, 1, 13),
	(4, 2, 6),
	(5, 2, 7),
	(6, 2, 8);