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
    console.log("connected as id " + connection.threadId);
   
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
        name: "pickProduct",
        type: "input",
        message: "What is the item_id of the product you would like to buy?"
      },
    {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?"
    }])

};
