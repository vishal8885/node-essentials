var express = require('express'),
    router = express.Router();
var fs = require("fs");
var bookSchema = require('../models/books');

router.get("/", (req, res) => {
    var booksData = JSON.parse(fs.readFileSync("books.json", 'utf8'));
    if (Object.keys(req.query).length) {
        const yearToFind = req.query.year;
        const startingPrice = +req.query.pricestart;
        const endingPrice = +req.query.priceend;
        if (yearToFind) {
            booksData = booksData.filter(({publishedYear}) => yearToFind === publishedYear);
        } else if (startingPrice && endingPrice) {
            booksData = booksData.filter((book) => {
                const bookPrice = +book.price;
                return (bookPrice >= startingPrice && bookPrice <= endingPrice);
            });
        }
    }
    res.json(booksData);
    res.end();
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const booksData = JSON.parse(fs.readFileSync("books.json", 'utf8'));
    const book = booksData.find(({ISBN}) => id === ISBN);
    if (book) {
        res.json(book);
    } else {
        res.status(404);
        res.json({message: "No data found"});
    }
    res.end();
});

router.post("/", bookSchemaValidator, (req, res) => {
    const requestObject = req.body;
    const booksData = JSON.parse(fs.readFileSync("books.json", 'utf8'));
    booksData.push(requestObject);
    fs.writeFile("books.json", JSON.stringify(booksData), (err) => {
        if (err) {
            res.status(400);
            res.json(err);
        } else {
            res.json(requestObject);
        }
        res.end();
    });
});

router.patch("/:ISBN" ,(req, res) => {
    const id = req.params.ISBN;
    const booksData = JSON.parse(fs.readFileSync("books.json", 'utf8'));
    const book = booksData.find(({ISBN}) => id === ISBN);
    book.authorName = "Adam Freeman";
    fs.writeFile("books.json", JSON.stringify(booksData), (err) => {
        if (err) {
            res.status(400);
            res.json(err);
        } else {
            res.json(book);
        }
        res.end();
    });
});

function bookSchemaValidator(req, res, next) {
    const requestObject = req.body;
    const { error } = bookSchema.validate(requestObject);
    if (error) {
        res.status(400)
            .json(error.details);
            res.end();
    } else {
        next();
    }
}

module.exports = router;