//import stuff + require inquirer
const inquirer = require('inquirer');
const connection = require('./db/connection');


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
                "Update A Role",
                "Update An Employee Role",
            ]
        }

    ])
    .then((answer) =>
        switch(answer.choice)
    )
}

// functions: view departments, view employees, view roles
// functions: add department, add role, add employee
// functions: update employee role
// function: end prompt

function viewDepartments() {
    connection.query
}

promptUser();