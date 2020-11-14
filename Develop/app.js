// Requirements for App
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Employee Info is added here
const employees = []

// Questions used to Identify Employee
const questions =[
{
    type: "input",
    message: "What is the employee's name?",
    name: "name"
}, 
{
    type: "input",
    message: "What is the employee's email?",
    name: "email"
}, 
{
    type: "input",
    name: "id",
    message: "What is the employee's id number?"
},
{
    type: "list",
    message: "What type of employee is this?",
    name: "designation",
    choices: ["Manager", "Engineer", "Intern "]
}]

// Function prompts user to add another employee. If no new employee added, renders and prints HTML file
const addEmployee = () => {
    inquirer.prompt({
        type: "confirm",
        message: "Would you like to add another employee?",
        name: "continue"
    }).then(resp => {
        if (resp.continue){
            askUser()
        } else {
          let html = render(employees)
          fs.writeFileSync(outputPath, html)
        }
    })
}

// Function prompts User to add info about employees
const askUser = () => {
    inquirer
    .prompt(questions)
    .then(response => {
        // Differnciates between roles and push information to employees array
        if (response.designation === "Manager"){
            inquirer.prompt({
                type: "input",
                message: "What is their office number?",
                name: "office"
            }).then(res => {
                var manager = new Manager(response.name,response.id, response.email, res.office)
                employees.push(manager)
                addEmployee()
            })
        } else if (response.designation === "Engineer"){
            inquirer.prompt({
                type: "input",
                message: "What is their github?",
                name: "github"
            }).then(res => {
                var engineer = new Engineer(response.name,response.id, response.email, res.github)
                employees.push(engineer)
                addEmployee()
            })
        } else {
            inquirer.prompt({
                type: "input",
                message: "What school do they attend?",
                name: "school"
            }).then(res => {
                var intern = new Intern(response.name,response.id, response.email, res.school)
                employees.push(intern)
                addEmployee()
            })
        }
        
        })
    }
    
// Initializes Program
askUser()
