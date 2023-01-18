/* Replace with your SQL commands */

-- run command --> db-migrate up, to intiaite the tables

/*
* password is 200 char --> we need to hash it !
*/
create table users (
    id SERIAL PRIMARY KEY,
     firstname varchar(50) NOT NULL,
      lastname varchar(50) NOT NULL,
       password varchar(200) NOT NULL, 
       email varchar(50) NOT NULL
       );


