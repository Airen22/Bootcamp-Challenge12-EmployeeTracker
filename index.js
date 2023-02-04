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
  console.log(`--Welcome to your company's employee tracker!--`),
  chooseAction()
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
            viewDepts();
            break;
        case 'View all roles':
            viewRoles();
            break;
        case 'View all employees':
            viewEmps();
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

async function viewDepts() {
    const departments = await db.query(`SELECT name AS Departments, id as ID FROM departments`)
    console.table(departments);
    chooseAction();
  }
async function viewRoles() {
    const roles = await db.query(`SELECT id AS ID, title AS Title, salary AS Salary FROM roles;`)
    console.table(roles)
    chooseAction();
  }

  async function viewEmps() {
    const employees = await db.query(`SELECT employees.id, employees.first_name AS "First Name", 
    employees.last_name AS "Last Name",
    roles.title AS Title, 
    departments.name AS Department,
    roles.salary AS Salary,
    CONCAT(manager.first_name, " ", manager.last_name) AS "Manager"
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT OUTER JOIN employees AS manager
    ON employees.manager_id = manager.id;`)
    console.table(employees);
    chooseAction();
  }

async function addDept() {
   const res = await inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: 'What is the new department name?',
        }]);
    const newDeptTable = await db.query(`INSERT INTO departments(name) VALUES ("${res.newDept}")`);
    console.log("New department successfully added!")
    viewDepts()
    chooseAction()
}

async function addRole() {
    var callDepts = db.query('SELECT name FROM departments')

    var deptList = callDepts.map(function(departments){
        return { 
          department: departments.name 
        }
      })

   await inquirer.prompt([
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
            choices: deptList
        }])
    const newRole = await db.query(`INSERT INTO roles(title,salary,department_id), VALUES (${res.newRole},${res.roleSalary},${res.roleDept}`);
    console.table(newRole)
    chooseAction()
}

async function addEmp() {
   await inquirer.prompt([
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

async function updateEmpRole() {
    const updateSql = 'SELECT first_name, last_name, id FROM employees';
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