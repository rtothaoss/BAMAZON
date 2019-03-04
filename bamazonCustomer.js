var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazonDB'
});




connection.query('SELECT * from products', function (err, res) {
    
    for (var i = 0; i < res.length; i++) {

    console.log('item_id: ' + res[i].item_id + ' name: ' + res[i].product_name + ' price: ' + res[i].price)    
      
    }

    
inquirer
    .prompt([
     {
         type: "input",
         message: "What is the ID of the item you would like to buy?",
         name: "question1"
     },
     {
        type: "input",
        message: "How many units would you like to buy?",
        name: "question2"
     }
    ])
.then(function(response) {
    var answer1 = response.question1
    var answer2 = response.question2

        if(answer1 > 0 && answer1 <= 10) {
            connection.query('SELECT stock_quantity from products WHERE item_id = ?',
            
            [answer1],

            function (err, res) {
            var quantity = res[0].stock_quantity
                if(answer2 <= quantity && answer2 > 0) {

                    var updatedQuantity = quantity - answer2;
                    console.log(updatedQuantity)
                    // console.log('hey it works')
                    
                    connection.query('UPDATE products SET ? WHERE ?', [
                        {
                            stock_quantity: updatedQuantity
                        },
                        {
                            item_id: answer1
                        }

                    ], function (err, res) {
                        if (err) throw err;  
                        console.log('This is how many items are left: ' + updatedQuantity) 
                        
                    })
                    connection.end()
                }
                else {
                    console.log('Insufficient Quantity!!!')
                    connection.end();
                }
                
            })
        
            
        } else {
           
        }
    })

});




