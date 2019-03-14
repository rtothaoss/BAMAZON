# BAMAZON

*A storefront cli that combines MySQL and node.js to give the user the ability to be a customer, manager, or supervisor.*

Video Example: https://www.dropbox.com/s/92r02gk10m4hzdd/bamazon-RossCarmack.mov?dl=0

### Technologies Used: 
* MySQL 
* node.js
* npm modules
    * inquirer
    * mysql
    * console.table


### Consumer View 
*Used the products and department SQL tables*

Gives the user a list of items available for purchase. 

User inputs an ID of one of the items to pick that specific item.

The user can then put in how many items they want to purchase.

If the user picks too many of an item they will be told there is insufficient inventory.

If that is not the case then the total of the products they purchased will be added to their respective department in the table.

### Manager View
*Used the products SQL table* 

The user will be first prompted with a list of menu options.

**View Products for Sale** will display a list of all the items for sale along with crucial details like how much stock is left.

**View Low Inventory** will display a list of items that have a stock level below 5.

**Add to Inventory** gives the user the ability to add more stock of an item already in the system.

**Add New Product** allows someone to add a completely new product into the system.

### Supervisor Level
*Used the department SQL table*

The user will be first prompted with a list of menu options.

**View Product Sales by Department** displays a table in console with information like department name, overhead costs, product sales, and total profit.

**Create New Department** allowed the user to input a new department into the table. 



