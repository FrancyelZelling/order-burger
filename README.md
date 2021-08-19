# Order Burger API

Simple API created for ordering burgers.

## Tools
- Typescript
- Express
- SQLite
- bcrypt.js

## Routes

- `/users`
  - GET `/:id` get single user
  - POST `/register` create a new user
  - POST `/login` authenticate user

- `/product`
  - GET `/` get all products
  - GET `/:id` get single product
  - POST `/` create new product
  - PUT `/` update product
  - DELETE `/` delete product

- `/order`
  - GET `/` get all orders
  - GET `/:id` get single order
  - POST `/` create new order
  - PUT `/` update order
  - DELETE `/:id` delete order

- `/category`
  - GET `/` get all category
  - POST `/` create new category
  - PUT `/` update category
  - DELETE `/:id` delete category

---
Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command


