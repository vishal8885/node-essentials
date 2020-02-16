/**
 * Modify your server implementation to do below 2 changes:
 * 1.	Update a book author to “Adam Freeman” whose ISBN number is 9781484249789 (use appropriate HTTP verb)
 * 2.	/books/:ISBN – this should delete the book from books.json
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