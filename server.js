//Dependencies
const connection = require("./db.js");
const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql");

//Inquirer prompt and promise
const askQ = function () {
    inquirer
        .prompt({
            type: "list",
            name: "startQ",
            message: "What would you like to do?",
            choices: [
                "view all employees",
                "view all roles",
                "view all departments",
                "add employee",
                "add department",
                "add role",
                "update employee role",
                "remove employee"
            ]
        })
        .then(function (answer) {
            console.log(answer);
            //start of switch statment for user choice
            switch (answer.startQ) {
                case "view all employees":
                    viewAllEmployees();
                    break;

                case "view all roles":
                    viewAllRoles();
                    break;

                case "view all departments":
                    viewAllDepartments();
                    break;

                case "add employee":
                    addEmployee();
                    break;

                case "update employee role":
                    updateEmpRole();
                    break;

                case "add department":
                    addDepartment();
                    break;

                case "add role":
                    addRole();
                    break;
            }
        });
};
askQ();

//allows user to view all departments currently in database
function viewAllDepartments() {
    connection.query("SELECT * FROM department", function (err, answer) {
        console.log("\n Departments Retrieved from Database \n");
        console.table(answer);
    });
    askQ;
}

//allows user to view all employee roles currently in database
function viewAllRoles() {
    connection.query("SELECT * FROM position", function (err, answer) {
        console.log("\n Roles Retrieved from Database \n");
        console.table(answer);
    });
    askQ();
}

//allows user to view all employees currently in database
function viewAllEmployees() {
    console.log("Retrieving Employees from Database");
    var fancyQuery =
        "SELECT employee.id, employee.first_name, employee.last_name, position.title, department.name AS department, title.salary FROM employee LEFT JOIN position ON employee.position_id = position.id LEFT JOIN department on position.department_id = department.id";
    connection.query("SELECT * FROM position", function (err, answer) {
        console.log("\n Roles Retrieved from Database \n");
        console.table(answer);
    });
    askQ();
}

//allows user to add a new employee to database
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter employee first name",
                name: "firstName"
            },
            {
                type: "input",
                message: "Enter employee last name",
                name: "lastName"
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    position_id: null,
                    manager_id: null,
                },
                function (err, answer) {
                    if (err) {
                        throw err;
                    }
                    console.table(answer);
                }
            );
            askQ();
        });
}

//grabs all employees (id, first name, last name) then allows user to select employee to update role
function updateEmpRole() {
    let allEmp = [];
    connection.query("SELECT * FROM employee", function (err, answer) {
        console.log(answer);
        for (let i = 0; i < answer.length; i++) {
            let employeeString = answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
            allEmp.push(employeeString);
        }
        console.log(allEmp);

        inquirer
            .prompt([
                {
                    type: "list",
                    name: "updateEmpRole",
                    message: "Select employee to update role",
                    choices: allEmp
                },
                {
                    type: "list",
                    message: "Select new role",
                    choices: ["manager, employee"],
                    name: "newRole"
                }
            ])
            .then(function (answer) {
                console.log("about to update", answer);
                const idToUpdate = {};
                idToUpdate.employeeId = parseInt(answer.updateEmpRole.split(" ")[0]);
                if (answer.newrole === "manager") {
                    idToUpdate.position_id = 1;
                } else if (answer.newrole === "employee") {
                    idToUpdate.position_id = 2;
                }
                connection.query(
                    "UPDATE employee SET position_id = ? WHERE id = ?",
                    [idToUpdate.position_id, idToUpdate.employeeId],
                    function (err, data) {
                        askQ();
                    }
                );
            });
    });
}

//allows user to add a new department to database
function addDepartment() {
    inquirer
        .prompt({
            type: "input",
            message: "enter department name",
            name: "dept"
        })
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.dept
                },
                function (err, answer) {
                    if (err) {
                        throw err;
                    }
                }
            ),
                console.table(answer);
            askQ();
        });
}

//allows user to add a new role/title to database
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter employee title",
                name: "addTitle"
            },
            {
                type: "input",
                message: "Enter employee salary",
                name: "addSalary"
            },
            {
                type: "input",
                message: "Enter employee department id",
                name: "addDepId"
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO position SET ?",
                {
                    title: answer.addTitle,
                    salary: answer.addSalary,
                    department_id: answer.addDepId
                },
                function (err, answer) {
                    if (err) {
                        throw err;
                    }
                    console.table(answer);
                }
            );
            askQ();
        });
}