USE employee_trackerDB

INSERT INTO department (name)
VALUES
    ("Management"),
    ("legal")

INSERT INTO role (title, salary, department_id)
VALUES  
    ("manager", 70000, 1),
    ("employee", 40000, 2)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("The", "Doctor", 1, NULL),
    ("Rose", "Tyler", 2, 3)