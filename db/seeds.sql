INSERT INTO department (name)
VALUES ("Maintenance"),
       ("Operations"),
       ("Custodial Services"),
       ("Information Technology");

INSERT INTO role (title, salary, department_id)
VALUES ("mechanic", 60000, 0),
       ("parts clerk", 36000, 0),
       ("shop manager", 80000, 0)
       ("operator", 40000, 1),
       ("operations manager", 65000, 1),
       ("custodian", 36000, 2),
       ("custodial manager", 45000, 2),
       ("developer", 75000, 3),
       ("project manager", 120000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Jones", 2, NULL),
       ("John", "Doe", 0, 0),
       ("Jane", "Doe", 1, 0),
       ("Barney", "Fife", 4, NULL),
       ("Kim", "Kay", 3, 3),
       ("Laura", "Dern", 3, 3),
       ("Brody", "Punk", 6, NULL),
       ("Eric", "Prince", 5, 6),
       ("Anna", "Sapient", 5, 6),
       ("Baggy", "Tools", 8, NULL),
       ("Honda", "Ford", 7, 9);

