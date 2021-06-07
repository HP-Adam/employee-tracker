const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db/connection");

const initializeApp = () => {
  console.log("Hello. Welcome to Employee Manager.", "\n");
  mainMenu();
};

const mainMenu = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "initialPrompt",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then(({ initialPrompt }) => {
      switch (initialPrompt) {
        case "View all departments":
          return viewDept();
        case "View all roles":
          return viewRoles();
        case "View all employees":
          return viewEmployees();
        case "Add a department":
          return addDept();
        case "Add a role":
          return addRole();
        case "Add an employee":
          return addEmployee();
        case "Update an employee role":
          return updateEmployee();
        case "Exit":
          console.log("Thank you. Goodbye.");
          return process.exit(1);
      }
    });
};

const viewDept = () => {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, row) => {
    console.table(row, "\n");
    mainMenu();
  });
};

const viewRoles = () => {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, row) => {
    console.table(row, "\n");
    mainMenu();
  });
};

const viewEmployees = () => {
  const sql = `
    SELECT employee.id, employee.first_name, employee.last_name, CONCAT_WS(' ', manager.first_name, manager.last_name) AS manager, role.title AS title, role.salary AS salary, department.name AS department
    FROM employee 
    LEFT JOIN employee manager on manager.id = employee.manager_id LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON role.department_id = department.id; 
  `;
  db.query(sql, (err, row) => {
    console.table(row, "\n");
    mainMenu();
  });
};

const addDept = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the new department name. (Required. Max 30 characters)",
        name: "newDeptName",
        validate: (input) => {
          if (input && input.length <= 30) {
            return true;
          } else {
            console.log(
              "Please enter a valid new department name. Max 30 characters."
            );
            return false;
          }
        },
      },
    ])
    .then(({ newDeptName }) => {
      const sql = `INSERT INTO department (name) VALUES (?)`;
      const param = newDeptName;

      db.query(sql, param, (err, result) => {
        console.log(`${newDeptName} department added to database.`, "\n");
        mainMenu();
      });
    });
};

const addRole = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the new role title. (Required. Max 30 characters)",
        name: "newRoleName",
        validate: (input) => {
          if (input && input.length <= 30) {
            return true;
          } else {
            console.log("Please enter a valid role title. Max 30 characters.");
            return false;
          }
        },
      },
      {
        type: "input",
        message:
          "Enter the new role salary. (Required. Numbers only. Max 6-figure salaray, e.g. 123456.78)",
        name: "newRoleSal",
        validate: (input) => {
          if (
            input &&
            input.length <= 9 &&
            typeof parseFloat(input) === "number"
          ) {
            return true;
          } else {
            console.log(
              "Please enter a valid role salary. Numbers only. Max 6-figure salaray, e.g. 123456.78"
            );
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Enter the new role department id. (Required)",
        name: "newRoleDeptId",
        validate: (input) => {
          if (input && typeof parseInt(input) === "number") {
            return true;
          } else {
            console.log(
              "Please enter a valid new department name. Max 30 characters."
            );
            return false;
          }
        },
      },
    ])
    .then((newRoleInputs) => {
      const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
      const param = [
        newRoleInputs.newRoleName,
        parseFloat(newRoleInputs.newRoleSal),
        parseInt(newRoleInputs.newRoleDeptId),
      ];

      db.query(sql, param, (err, result) => {
        console.log(
          `${newRoleInputs.newRoleName} role added to database.`,
          "\n"
        );
        mainMenu();
      });
    });
};

const addEmployee = () => {
  return inquirer
    .prompt([
      {
        type: "input",
        message:
          "Enter the new employee's first name. (Required. Max 30 characters)",
        name: "newEmpFName",
        validate: (input) => {
          if (input && input.length <= 30) {
            return true;
          } else {
            console.log("Please enter a valid name. Max 30 characters.");
            return false;
          }
        },
      },
      {
        type: "input",
        message:
          "Enter the new employee's last name. (Required. Max 30 characters)",
        name: "newEmpLName",
        validate: (input) => {
          if (input && input.length <= 30) {
            return true;
          } else {
            console.log("Please enter a valid name. Max 30 characters.");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Enter the new employee's role id. (Required)",
        name: "newEmpRoleId",
        validate: (input) => {
          if (typeof Number(input) === "number") {
            return true;
          } else {
            console.log("Please enter a valid role id. Numbers only.");
            return false;
          }
        },
      },
      {
        type: "input",
        message: "Enter the new employee's manager id. (Leave blank if none.)",
        name: "newEmpManId",
      },
    ])
    .then((newEmpInputs) => {
      let empId = null;
      if (newEmpInputs.newEmpManId !== "") {
        empId = Number(newEmpInputs.newEmpRoleId);
      }

      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
      const param = [
        newEmpInputs.newEmpFName,
        newEmpInputs.newEmpLName,
        Number(newEmpInputs.newEmpRoleId),
        empId,
      ];

      db.query(sql, param, (err, result) => {
        console.log(
          `${newEmpInputs.newEmpFName} ${newEmpInputs.newEmpLName} added to database.`,
          "\n"
        );
        mainMenu();
      });
    });
};

initializeApp();
