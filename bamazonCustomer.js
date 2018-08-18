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
    console.log("Welcome to BAmazon! Take a look at our products for sale below!");
   
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
            console.log("Your order has been placed!");
            console.log(answer);
            var product = answer.product;
            var quantity = answer.quantity;
            
            var queryProducts = "SELECT * FROM products WHERE ?";
            connection.query(queryProducts, {item_id: product}, function(err, res) {
                if (err) throw err;
                 else {
                    var productInfo = res[0];
                    if (quantity <= productInfo.stock_quantity) {
                        console.log("The product you want is in stock!")
                    }

                }
            })
        })
    
};

function checkProduct() {
    var query = connection.query("SELECT")
}
