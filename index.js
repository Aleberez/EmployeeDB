/* eslint-disable no-param-reassign */
// @ts-nocheck

import half from './src/half.js';

export default half;

const EmployeeDB = {
  employees: [],

  addEmployee(name, position, department) {
    this.employees.push({ name, position, department });
  },

  removeEmployee(name) {
    this.employees = this.employees.filter((employee) => employee.name !== name);
  },

  updateEmployee(name, newPosition, newDepartment) {
    this.employees = this.employees.map((employee) => {
      if (employee.name === name) {
        employee.position = newPosition;
        employee.department = newDepartment;
      }
      return employee;
    });
  },

  getAllEmployees() {
    return this.employees;
  },

  capitalizeNames() {
    this.employees = this.employees.map((employee) => {
      const words = employee.name.split(' ');
      const capitalizedWords = [];
      for (let i = 0; i < words.length; i += 1) {
        capitalizedWords.push(words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase());
      }
      employee.name = capitalizedWords.join(' ');
      return employee;
    });
  },

  lowercaseDepartments() {
    this.employees = this.employees.map((employee) => {
      employee.department = employee.department.toLowerCase();
      return employee;
    });
  },

  clone() {
    const clonedDB = { ...this };
    clonedDB.employees = [...this.employees];
    return clonedDB;
  },

  merge(otherDB) {
    const mergedDB = { ...this };
    mergedDB.employees = [...this.employees, ...otherDB.employees];
    return mergedDB;
  },

  getAllDepartments() {
    const departments = new Set();
    for (let i = 0; i < this.employees.length; i += 1) {
      departments.add(this.employees[i].department);
    }
    return departments;
  },

  compareEmployees(employee1, employee2, fields) {
    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i];
      if (employee1[field] !== employee2[field]) {
        return false;
      }
    }
    return true;
  },
};

// Пример использования:
EmployeeDB.addEmployee('alex birch', 'Developer', 'IT');
EmployeeDB.addEmployee('dambledore', 'Manager', 'finance');
EmployeeDB.addEmployee('Maxim Latnikov', 'CEO', 'Board');

console.log(EmployeeDB.getAllEmployees());

EmployeeDB.capitalizeNames();
EmployeeDB.lowercaseDepartments();

console.log(EmployeeDB.getAllEmployees());

const cloneDB = EmployeeDB.clone();
console.log(cloneDB);

const otherDB = {
  employees: [
    { name: 'Jhon Lenon', position: 'Analyst', department: 'finance' },
    { name: 'Elon Musk', position: 'Engineer', department: 'IT' },
  ],
};

const mergedDB = EmployeeDB.merge(otherDB);
console.log(mergedDB);

console.log(EmployeeDB.getAllDepartments());

console.log(EmployeeDB.compareEmployees(
  { name: 'John Snow', position: 'Programmer', department: 'IT' },
  { name: 'John Snow', position: 'Programmer', department: 'IT' },
  ['name', 'department'],
));
