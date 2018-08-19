var mysql = require("mysql");
var inquirer = require("inquirer")
var table = require("console.table")

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("\nWelcome to BAmazon! Take a look at our products for sale below!\n");
   
    allProducts();
});

function allProducts() {
    // query the database for all items for sale
    connection.query("SELECT * from products;", function(err, results, fields) {
        if (err) throw err;
        else {
        // console log all products
        console.table(results);
        
      }
      pickProduct();
     
    }
    
)}

function pickProduct() {
    inquirer
        .prompt([
        {
          name: "product",
          type: "input",
          message: "What is the item_id of the product you would like to buy?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to buy?"
        }
        ])
        .then(function(answer) {
            
            
            var product = answer.product;
            var quantity = answer.quantity;
            
            var queryProducts = "SELECT * FROM products WHERE ?";
            var cost 
            connection.query(queryProducts, {item_id: product}, function(err, res) {
                if (err) throw err;
                
                 else {
                    var productInfo = res[0];
                    if (quantity <= productInfo.stock_quantity) {
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                        console.log("We have " + productInfo.stock_quantity + " " + productInfo.product_name + "s in stock for your order!")
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"); 
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                        console.log("Thank you for your order! Please wait while we process your order!");
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"); 
                    };
                    if (cost = quantity * productInfo.price) {
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
                        console.log("The total cost of your order is $" + cost + ".00");
                        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"); 
                    }
            var queryUpdate = "UPDATE products SET ? WHERE ?"
            connection.query(queryUpdate, [{stock_quantity: answer.quantity},{item_id: product}], function(err, res) {
                 if (err) throw err;
                 else  {   
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");  
                    console.log("Inventory has been updated!");
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"); 
                        allProducts();
                      }
                })
                    }

                
            })

        
        })
    
};


