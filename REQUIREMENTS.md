# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index (/products [GET])
- Show (/products:id [GET])
- Create [token required] (/products [POST])
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required] (/users [GET])
- Show [token required] (/users:id [GET])
- Create N[token required] (/users [POST])

#### Orders

- Current Order by user (args: user id)[token required] (/orders:id [GET])
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

CREATE TABLE products (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"price"	NUMERIC,
	"category"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

#### User

- id
- firstName
- lastName
- password

CREATE TABLE users (
	"id"	INTEGER,
	"firstname"	TEXT NOT NULL,
	"lastname"	TEXT,
	"password"	TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

* We need to split into 2 table since it's not in the 
  first normalization form (it has mutlivalued columns)
  product_id & quantity, 

  (1) 
CREATE TABLE "orders" (
	"id"	INTEGER,
	"user_id"	INTEGER,
	"status"	TEXT NOT NULL,
	PRIMARY KEY("id"),
	FOREIGN KEY("user_id") REFERENCES users(id)
);

    (2)

    CREATE TABLE "orders_details" (
	"order_id"	INTEGER,
	"product_id"	INTEGER,
	"quantity"	INTEGER NOT NULL,
	FOREIGN KEY("order_id") REFERENCES orders(id) ,
	FOREIGN KEY("product_id") REFERENCES products(id),
	PRIMARY KEY("order_id","product_id")
);