const Employee = require("./lib/Employee")
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = []

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

const addEmployee = () => {
    inquirer.prompt({
        type: "confirm",
        message: "Would you like to add another employee?",
        name: "continue"
    }).then(resp => {
        if (resp.continue){
            askUser()
        } 
    })
}

const askUser = () => {

    inquirer
    .prompt(questions)
    .then(response => {
        if (response.designation === "Manager"){
            inquirer.prompt({
                type: "input",
                message: "What is their office number?",
                name: "office"
            }).then(res => {
                // new Manager(response.name,response.email, response.id, res.office)
                console.log(response.name, response.email, response.id, res.office)
                addEmployee()
            })
        } else if (response.designation === "Engineer"){
            inquirer.prompt({
                type: "input",
                message: "What is their github?",
                name: "github"
            }).then(res => {
                // new Engineer(response.name,response.email, response.id, res.github)
                console.log(response.name, response.email, response.id, res.github)
                addEmployee()
            })
        } else {
            inquirer.prompt({
                type: "input",
                message: "What school do they attend?",
                name: "school"
            }).then(res => {
                // new Intern(response.name,response.email, response.id, res.school)
                console.log(response.name, response.email, response.id, res.school)
                addEmployee()
            })
        }
        
        })
    }

    askUser()
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
