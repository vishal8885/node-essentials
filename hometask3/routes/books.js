const express = require("express");
const router = express.Router();
const bookService = require("../services/bookService");
const bookSchema = require("./../../models/books");

router.get("/", (request, response) => {
  bookService.readBooks(request, response);
});

router.get("/:id", (request, response) => {
  bookService.readBookById(request, response);
});

router.post("/", bookSchemaValidator, (req, res) => {
  bookService.addBook(req, res);
});

router.patch("/:ISBN", (req, res) => {
  bookService.updateBookByID(req, res);
});

router.patch("/", (req, res) => {
    bookService.updateToJohn(req, res);
});

router.delete("/:ISBN", (req, res) => {
  bookService.deleteBookByISBN(req, res);
});

router.get("/pincode/:pin", (req, res) => {
  bookService.getAuthorsByPincode(req, res);
});

router.get("/authors", (req, res) => {
  bookService.getBooksAndAuthors(req, res);
});

function bookSchemaValidator(req, res, next) {
  const requestObject = req.body;
  const { error } = bookSchema.validate(requestObject);
  if (error) {
    res.status(400).json(error.details);
    res.end();
  } else {
    next();
  }
}
module.exports = router;
