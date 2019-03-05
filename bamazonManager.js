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
        console.log(res)
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

    connection.query('SELECT * from products', function (err, res) {
        
        var newChoices = []

        for (var i = 0; i < res.length; i++) {
           
            newChoices.push({
                name: res[i].product_name,
                value: res[i]   
            })
        }
      
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'question4',
                    message: 'Select a product for which you want to add inventory',
                    choices: newChoices
                },
            ])

            .then(function (response) {
                var productname = response.question4.product_name;
                var stock_quantity = parseInt(response.question4.stock_quantity);
                var id = response.question4.item_id;

                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "How much stock would you like to add to inventory?",
                            name: "question5"
                        },
                    ])
                    .then(function(response) {
                        var response = parseInt(response.question5)
                        stock_quantity = stock_quantity += response;
                        
                        connection.query('UPDATE products SET ? WHERE ?', [
                            {
                                stock_quantity: stock_quantity
                            },
                            {
                                item_id: id
                            }

                        ], function (err, res) {
                            console.log('Your updated inventory for ' + productname + 'is: ' + stock_quantity)
                    })
                    welcomeScreen();
            })
            
        })

})

}



function addNewProduct() {

    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the product name?",
            name: "question1"
        },
        {
            type: "input",
            message: "What is the department name associated with the product?",
            name: "question2"
        },
        {
            type: "input",
            message: "What is the price of the product?",
            name: "question3"
        },
        {
            type: "input",
            message: "How much stock is there?",
            name: "question4"
        },
    ])
    .then(function(response){
        var product = response.question1;
        var department = response.question2;
        var price = response.question3;
        var stock = response.question4;


        connection.query('INSERT INTO products SET ?', {

            product_name: product,
            department_name: department,
            price: price,
            stock_quantity: stock 

        }, function (err, res) {
            if (err) throw err;
        }) 
        welcomeScreen();
    })
}