const inquirer = require('inquirer');
const mysql = require('mysql2');
const { allowedNodeEnvironmentFlags } = require('process');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'Beach m@yor t3ar',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

const utils = require("util");
db.query = utils.promisify(db.query)


const departments = db.query("SELECT * FROM departments")
const roles = db.query('SELECT * FROM roles')
const employees = db.query('SELECT * FROM employees')

function chooseAction () {
inquirer.prompt([
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Quit'],
    }
]).then((res) => {
    switch (res.action) {
        case 'View all departments':
            departments;
            break;
        case 'View all roles':
            roles;
            break;
        case 'View all employees':
            employees;
            break;
        case 'Add a department':
            addDept();
            break;
        case 'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmp();
            break;
        case 'Update an employee role':
            updateEmpRole();
            break;
        default:
            console.log("All set!")


}})
}

async function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: 'What is the new department name?',
        }])
    const newDept = await db.query(`INSERT INTO departments(name) VALUES ${res.newDept}`);
    console.table(depts)
    chooseAction()
}

async function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newRole',
            message: 'What is the new role?',
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the SALARY for this role?',
        },
        {
            type: 'list',
            name: 'roleDept',
            message: 'What DEPARTMENT is this role under?',
            choices: departments
        }])
    const newRole = await db.query(`INSERT INTO roles(title,salary,department_id), VALUES (${res.newRole},${res.roleSalary},${res.roleDept}`);
    console.table(newRole)
    chooseAction()
}

async function addEmp() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newFirst',
            message: 'What is the new employee FIRST name?',
        },
        {
            type: 'input',
            name: 'newLast',
            message: 'What is the new employee LAST name?',
        },
        {
            type: 'list',
            name: 'empRole',
            message: `What the employes' ROLE?`,
            choices: roles
        },
        {
            type: 'list',
            name: 'empMan',
            message: `Who is the employes' MANAGER?`,
            choices: employees
        }
    
    
    ])
    const newEmp = await db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (${res.newFirst}, ${res.newLast},${res.empRole},${res.empMan}`);
    console.table(newEmp)
    chooseAction()
}

async function updateEmp() {
    const updateSql = 'SELECT first_name, last_name, id FROM employee';
    const empRes = await db.query(updateSql);
    const empList = empRes.map(({id, first_name, last_name}) => ({
        value: id,
        name: `${first_name} ${last_name}`,
    }))
    let rolesList = roles.map(({id, title}) => ({
        value: id,
        name: `${title}`,
    }))
    const res = inquirer.prompt([
        {}
    ])

    inquirer.prompt([
        {
            type: 'list',
            name: 'empUpdate',
            message: `Which employee do you want to update?`,
            choices: empList
        },
        {
            type: 'list',
            name: 'updatedRole',
            message: `what is the employee's new role?`,
            choices: rolesList
        }
    ])

    const newEmp = await db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES (${res.newFirst}, ${res.newLast},${res.empRole},${res.empMan}`);
    console.table(newEmp)
    chooseAction()

}