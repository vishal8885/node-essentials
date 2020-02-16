/**
 * We are trying to build APIs for a bookstore. Each book should have valid properties as mentioned below
 *  -	Use fs module wherever necessary
 *  
 * 	Book name - string
 * 	ISBN – 	International Standard Book Number - string
 * 	Publisher Name - string
 * 	Author Name - string
 * 	Author ID - number
 * 	Price - number
 * 	Published year - number
 * 	Reviewers – Array
 * 	Number of pages: number
 * 	Country: string
 * 
 * Create a JSON file with 10 books and call it as books.json

 * Implement the below endpoints – all must have proper HTTP error codes, exception handling

 * /books – this is a GET call to retrieve all books information
 * /books/:id – this should retrieve a single book info from the book database (id should refer ISBN in schema)
 * /books?year=2019 – this should retrieve all books published in 2019
 * /books?pricestart=<number>&priceend=<number> - this should retrieve all books between the specified price 
 */


var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var bookRoutes = require("../routes/books");

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/books", bookRoutes);

app.listen(port, () => {
    console.log("server listening at port ", port);
});
