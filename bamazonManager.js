var inquirer = require('inquirer');
var mysql = require('mysql');


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
                    'View Products for Sale',
                    'View Low Inventory',
                    'Add to Inventory',
                    'Add New Product',
                    'Exit'
                ]
            }
        ])
        .then(function (response) {

            switch (response.theme) {
                case 'View Products for Sale':
                    viewProducts();
                    break;

                case 'View Low Inventory':
                    viewInventory();
                    break;

                case 'Add to Inventory':
                    addInventory();
                    break;

                case 'Add New Product':
                    addNewProduct();
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
   
    connection.query('SELECT * from products', function (err, res) {
    
        for (var i = 0; i < res.length; i++) {
    
        console.log('ITEM ID: ' + res[i].item_id + ' NAME: ' + res[i].product_name + '  PRICE: ' + res[i].price + ' QUANTITY: ' + res[i].stock_quantity)    
          
        }
        welcomeScreen();
})
}

function viewInventory() {
   
    connection.query('SELECT * from products WHERE stock_quantity BETWEEN 0 AND 5', function (err, res) {

        for (var j = 0; j < res.length; j++) {
    
        console.log('ITEM ID: ' + res[j].item_id + ' NAME: ' + res[j].product_name + '  PRICE: ' + res[j].price + ' QUANTITY: ' + res[j].stock_quantity)    
          
        }
        welcomeScreen();
})
    

}

function addInventory() {

}

function addNewProduct() {

}