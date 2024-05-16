//import stuff + require inquirer
const inquirer = require('inquirer');
const { default: ListPrompt } = require('inquirer/lib/prompts/list');
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as ID" + connection.threadId)
    promptUser();
});


// prompt: view all departments, employees, roles,
// add department, add role, add employee, update role
// view role

function promptUser() {
    inquirer.prompt([
        {
            name: "choice",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View All Departments",
                "View All Employees",
                "View All Roles",
                "Add A Department",
                "Add A Role",
                "Add An Employee",
                "Update An Employee Role",
            ]
        }

    ])
    .then(answer => {
        switch (answer.choice) {
            case "View All Departments":
                viewDepartments();
                break;
            case "View All Employees":
                viewEmployees()
                break;
            case "View All Roles":
                viewRoles()
                break;
            case "Add A Department":
                addDepartment()
                break;
            case "Add A Role":
                createRole()
                break;
            case "Add An Employee":
                createEmployee()
                break;            
            case "Update An Employee Role":
                console.log("this case");
                break;
        }
    })
}

// functions: view departments, view employees, view roles
// functions: add department, add role, add employee
// functions: update employee role
// function: end prompt

function viewDepartments() {
    const sql = `SELECT department.id, department.name FROM department`
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
        });
    };

function viewEmployees() {
    const sql = `SELECT employee.first_name, employee.last_name, employee.role_id, employee.manager_id FROM employee`
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
        });
    };


function viewRoles() {
    const sql = `SELECT role.title, role.salary, role.department_id FROM role`
    connection.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
        });
    };

function addDepartment() {
    inquirer.prompt([
        {
            name: "createDept",
            type: "input",
            message: "What is the name of the new department?"
        }
    ]).then(answer => {
        const sql = `INSERT INTO department (name)
        VALUES (?)`;
        connection.query(sql, answer.createDept, (err, result) => {
            if (err) throw err;
            console.log("added new department" + answer.createDept + " to departments");
            viewDepartments()
        })
    })
};

function createRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "addRole",
            message: "What is the new role?"
        },
        {
            type: "input",
            name: "addSalary",
            message: "What is the salary of the new role?"
        }
    ])
    .then(answer => {
        const params = [answer.addRole, answer.addSalary];
        const roleSql = `SELECT name, id FROM department`;

        connection.query(roleSql, (err, data) => {
            if (err) throw err;
            const deptList = data.map(({name, id}) => ({name: name, value: id }));

            inquirer.prompt([
                {
                    type: "list",
                    name: "chooseDept",
                    message: "Which department is the new role part of?",
                    choices: deptList
                }
            ])
            .then(deptChoice => {
                const dept = deptChoice.chooseDept
                params.push(dept);
                console.log(dept)
                const sql = `INSERT INTO role (title, salary, department_id)
                VALUES (?, ?, ?)`;

                connection.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log("Added " + answer.role + " to role list!");
                    viewRoles();
                });
            });
        });
    });
};

function createEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the new employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the new employee's last name?"
        }
    ])
    .then(answer => {
        const params = [answer.firstName, answer.lastName];
        const roleSql = `SELECT role.id, role.title FROM role`;

        connection.query(roleSql, (err, data) => {
            if (err) throw err;
            const rolesList = data.map(({id, title}) => ({name: title, value: id }));

            inquirer.prompt([
                {
                    type: "list",
                    name: "chooseRole",
                    message: "What is the new employee's role?",
                    choices: rolesList
                }
            ])
            .then(roleChoice => {
                const role = roleChoice.chooseRole
                params.push(role);
                console.log(role);


                const managerSql = `SELECT employee.first_name, employee.last_name, employee.id FROM employee`

                connection.query(managerSql, (err, data) => {
                    if (err) throw err;

                    const managers = data.map(({ id, first_name, last_name}) => ({ name: first_name + " "+ last_name, value: id }));

                    console.log(managers);

                    inquirer.prompt([
                        {
                            type: "list",
                            name: "chooseManager",
                            message: "Who is the new employee's manager?",
                            choices: managers
                        }
                    ])
                    .then(managerChoice => {
                        const manager = managerChoice.chooseManager;
                        params.push(manager);

                        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                        VALUES (?, ?, ?, ?)`

                        connection.query(sql, params, (err, result) => {
                            if (err) throw err;
                            console.log("New employee has been added!")
                            viewEmployees();
                        })
                    })
                });
            });
        });
    });
};