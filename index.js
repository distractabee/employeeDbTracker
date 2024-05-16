//import stuff + require inquirer
const inquirer = require('inquirer');
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
                console.log("this case");
                break;
            case "Add A Role":
                console.log("this case");
                break;
            case "Add An Employee":
                console.log("this case");
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

function addDepartment( {
    
})