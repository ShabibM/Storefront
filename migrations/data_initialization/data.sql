-- Samples --

## USERS
insert into users (firstname, lastname, password, email)
    values('shabib', 'D', '123', '123@gmail.com');

insert into users (firstname, lastname, password, email)
    values('moha1', 'A', 'xxx', '1234@gmail.com');

##PRODUCTS
insert into products (price, name, category) 
    values(100, 'Xbox', 'Games-Platform');


## ORDERS
insert into orders (user_id, status) 
    values(2, 'shipped');

