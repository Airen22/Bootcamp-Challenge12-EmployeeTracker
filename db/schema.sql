CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    manager_id INT,
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    ON DELETE SET NULL
)



    ---------------------------- 
-- |     SAMPLE CODE BELOW      |
    ----------------------------

-- DROP DATABASE IF EXISTS books_db;
-- CREATE DATABASE books_db;

-- USE books_db;

-- CREATE TABLE book_prices (
--   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   price INT NOT NULL
-- );

-- CREATE TABLE favorite_books (
--   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--   book_name VARCHAR(30) NOT NULL,
--   in_stock BOOLEAN,
--   book_price INT,
--   FOREIGN KEY (book_price)
--   REFERENCES book_prices(id)
--   ON DELETE SET NULL
-- );