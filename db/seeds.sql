INSERT INTO departments (name)
VALUES ("Accounting"),
       ("IT"),
       ("Operations");

INSERT INTO roles (title, salary, department_id)
VALUES ("CEO", 200000, null),
       ("CFO", 160000, 001),
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
       ("Minderva", "McGonagall", 002, 001),
       ("Severus", "Snape", 003, 001),
       ("Rubius", "Hagrid", 004, 001),
       ("Harry", "Potter", 005, 002),
       ("Ronald", "Weasley", 006, 003),
       ("Hermione", "Granger", 007, 004),
       ("Fred", "Weasley", 008, 005),
       ("George", "Weasley", 009, 006),
       ("Neville", "Longbottom", 010, 007);