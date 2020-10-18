const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let anotherEmployee = true;
const yesOrNo = ["Yes", "No"];

const employeeTypes = ["Manager", "Engineer", "Intern"]

let manager;
let engineer;
let intern;
let allEmployees = []


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

async function getEmployee() {
    let input = inquirer.prompt([
        {
            type: "input",
            message: "Employee Name: ",
            name: "name"
        },
        {
            type: "input",
            message: "Employee ID: ",
            name: "id"
        },
        {
            type: "input",
            message: "Employee Email: ",
            name: "email"
        },
        {
            type: "list",
            message: "Employee Role: ",
            name: "role",
            choices: employeeTypes
        }
    ])
    let employee = await input;

    if (employee.role === "Manager") {
        let managerInput = inquirer.prompt([
            {
                type: "input",
                message: "Office Number: ",
                name: "officeNumber"
            }
        ])
        let office = await managerInput;
        employee.officeNumber = office.officeNumber;

        manager = new Manager(employee.name, employee.id, employee.email, employee.officeNumber);

        allEmployees.push(manager);

        employeeTypes.splice(0,1);

    } else if (employee.role === "Engineer") {
        let engineerInput = inquirer.prompt([
            {
                type: "input",
                message: "GitHub Profile: ",
                name: "github"
            }
        ])
        let githubLink = await engineerInput;
        employee.github = githubLink.github;

        engineer = new Engineer(employee.name, employee.id, employee.email, employee.github);

        allEmployees.push(engineer);

    } else if (employee.role === "Intern") {
        let internInput = inquirer.prompt([
            {
                type: "input",
                message: "School: ",
                name: "school"
            }
        ])
        let university = await internInput;
        employee.school = university.school;

        intern = new Intern(employee.name, employee.id, employee.email, employee.school);

        allEmployees.push(intern);

    }

    let another = inquirer.prompt(
        {
            type: "list",
            message: "Would you like to add another employee? ",
            name: "repeat",
            choices: yesOrNo
        }
    )
    let addEmployee = await another;
    if (addEmployee.repeat === "Yes") {
        anotherEmployee = true;
    } else {
        anotherEmployee = false;
    }
}

async function init() { 
    while (anotherEmployee) { // Repeat until user says there are no more employees to add
        await getEmployee();
    }
    writeToFile(render(allEmployees));
}

function writeToFile() {


    // function writeToFile(fileName, data) {
    //     if (!fs.existsSync(dir)) {
    //         fs.mkdirSync(dir);
    //     }
    //     return fs.writeFile(fileName, data, function (err) {
    //         if (err) {
    //             console.log("Your README could not be created. Please try again.")
    //         } else {
    //             console.log("Success!")
    //         }
    //     })
    // }
}

init();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!



// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
