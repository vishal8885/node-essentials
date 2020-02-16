/**
 * Implement an endpoint to download an image from static server – try your own image and PDFs in a static folder (Hint: use express.usestatic)
 * /download/img – this should download a image
 * /download/pdf – this should download a PDF
 */

var express = require("express");
var app = express();
var bodyParser = require('body-parser');

var downloadRoutes = require("../routes/downloads");

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/download", downloadRoutes);

app.listen(port, () => {
    console.log("server listening at port ", port);
});