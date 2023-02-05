DROP DATABASE IF EXISTS company_db;
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
    REFERENCES departments(id)
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
);

INSERT INTO departments (name)
VALUES ("Accounting"),
       ("IT"),
       ("Operations");

INSERT INTO roles (title, salary, department_id)
VALUES ("CFO", 160000, 001),
       ("CIO", 170000, 002),
       ("COO", 160000, 003),
       ("Account Manager", 110000, 001),
       ("IT Manager", 120000, 002),
       ("Operations Manager", 115000, 003),
       ("Accounting Assistant", 64000, 001),
       ("IT Assistant", 70000, 002),
       ("Operations Assistant", 62000, 003);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Albus", "Dumbledore", 001, null),
       ("Minderva", "McGonagall", 002, null),
       ("Severus", "Snape", 003, null),
       ("Harry", "Potter", 004, 001),
       ("Ronald", "Weasley", 005, 002),
       ("Hermione", "Granger", 006, 003),
       ("Fred", "Weasley", 007, 004),
       ("George", "Weasley", 008, 005),
       ("Neville", "Longbottom", 009, 006);