INSERT INTO department (name)
VALUES
    ("HR"),
    ("Marketing"),
    ("Engineering"),
    ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES
    ("HR Associate", 34153.60, 1),
    ("HR Administrator", 57000.00, 1),
    ("Market Research Analyst", 65810.00, 2),
    ("Marketing Manager", 142170.00, 2),
    ("E-1", 75000, 3),
    ("E-2", 120000, 3),
    ("Lorekeeper", 36129.60, 4),
    ("Corporate Controller", 118461, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 3, 2),
    ("Brad", "Kashtack", 6, null),
    ("Mike", "Chan", 2, 5),
    ("Sarah", "Connor", 8, 5),
    ("Reade", "Anderson", 7, null);