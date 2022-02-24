# Employee-Management-System

System to view and manage the departments, roles, and employees in the company
SO THAT  can organize and plan the business

# Table of Contents
    Tasks
    Installation
    Usage
    Credits
    License


    ## Tasks
        # GIVEN a command-line application that accepts user input
        WHEN I start the application
        THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
        WHEN I choose to view all departments
        THEN I am presented with a formatted table showing department names and department ids
        WHEN I choose to view all roles
        THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
        WHEN I choose to view all employees
        THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        WHEN I choose to add a department
        THEN I am prompted to enter the name of the department and that department is added to the database
        WHEN I choose to add a role
        THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
        WHEN I choose to add an employee
        THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
        WHEN I choose to update an employee role
        THEN I am prompted to select an employee to update and their new role and this information is updated in the database

     ## Installation

        git clone https://github.com/mazamim/Employee-Management-System.git then run npm install for dependency installation

     ## Usage
            ![1](https://user-images.githubusercontent.com/53158763/155464581-dd410040-5944-47a9-b22f-d1c3460c45d9.jpg)

![2](https://user-images.githubusercontent.com/53158763/155464586-1bc01ab7-ec08-4176-8ed6-19b86910a526.jpg)

     ## Credits

        🏆 inquirer https://www.npmjs.com/package/inquirer
        🏆 mysql2 https://www.npmjs.com/package/mysql2
        
     ## License
     
      [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
