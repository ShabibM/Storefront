/* Replace with your SQL commands */


CREATE TABLE products (
	id	SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
	price	INTEGER NOT NULL,
	category	varchar(50) NOT NULL
);