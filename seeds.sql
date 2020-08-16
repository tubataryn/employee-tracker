USE employee_trackerDB

INSERT INTO department (name)
VALUES
    ("management"),
    ("legal")

INSERT INTO position (title, salary, department_id)
VALUES  
    ("manager", 70000, 1),
    ("employee", 40000, 2)

INSERT INTO employee (first_name, last_name, position_id, manager_id)
VALUES
    ("The", "Doctor", 1, NULL),
    ("Rose", "Tyler", 2, 3)