const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Tub4Cod3!SQL",
    database: "employee_tracker",
  },
  console.log("Connected to the employee_tracker database.")
);

module.exports = db;

//SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, role.salary AS salary, department.name AS department FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON role.department_id = department.id;
// sql query for gettting all employees with department and role joined
