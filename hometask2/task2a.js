/**
 * Implement an express server that runs on 3000 port and configure the below:
 * 1.	Enable the server to parse incoming requests with JSON payloads
 * 2.	Enable the server to serve static files (use built-in middleware)
 * 3.	Enable the server to parse incoming requests with URL encoded
 * 4.	Change the server settings to accept maximum request body size to 10 MB (this applies for JSON and URL encoded)
 * 5.	Enable router config on express
 */

var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var bookRoutes = require("../routes/books");

var port = process.env.PORT || 3000;

app.use(express.limit('10mb'));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/books", bookRoutes);

app.listen(port, () => {
    console.log("server listening at port ", port);
})
