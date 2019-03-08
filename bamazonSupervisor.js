var inquirer = require('inquirer');
var mysql = require('mysql');
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazonDB'
});

function welcomeScreen() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'theme',
                message: 'What would you like to do?',
                choices: [
                    'View Products By Department',
                    'Create New Department',
                    'Exit'
                ]
            }
        ])
        .then(function (response) {

            switch (response.theme) {
                case 'View Products By Department':
                    viewProducts();
                    break;

                case 'Create New Department':
                    createDepartment();
                    break;

                case 'Exit':
                    console.log('Goodbye!!!')
                    connection.end();
                    break;
            }
        });
}

welcomeScreen();

function viewProducts() {

    var allValues = [];


    connection.query('SELECT * from departments', function (err, res) {

        for (var i = 0; i < res.length; i++) {

            allValues.push([res[i].department_id, res[i].department_name, res[i].overhead_costs, res[i].product_sales, res[i].product_sales - res[i].overhead_costs])

            // console.table([{department_id: res[i].department_id, department_name: res[i].department_name, overhead_costs: res[i].overhead_costs, product_sales: res[i].product_sales, total_profits: res[i].product_sales - res[i].overhead_costs}])
        }
        // console.table([{department_id: 1, department_name: 2, overhead_costs: 3, product_sales: 4, total_profits: 5}])
        console.log('-----------------------------------------------------------')
        console.table(['department_id', 'department_name', 'overhead_costs', 'product_sales', 'total_profit'], allValues);
        console.log('-----------------------------------------------------------')
        welcomeScreen();
    })
   
}


function createDepartment() {

    inquirer
        .prompt([
            {
                type: "input",
                message: "What would you like the department name to be?",
                name: "question1"
            },
            {
                type: "input",
                message: "What are the overhead costs for the new department?",
                name: "question2"
            },
            {
                type: "input",
                message: "Put 0 for product sales.",
                name: "question3"
            },
        ])
        .then(function (response) {

            var department = response.question1;
            var overhead = response.question2;
            var productSales = response.question3;


            connection.query('INSERT INTO departments SET ?', {

                department_name: department,
                overhead_costs: overhead,
                product_sales: productSales

            })
            welcomeScreen();
        })
}