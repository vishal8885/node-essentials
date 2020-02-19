const express = require('express');
const router = express.Router();
const bookService = require('./../services/bookService');

const booksService = require('./../services/bookService');

router.get('/', (request, response) => {
    bookService.readBooks(request, response);
});

router.get("/:id", (request, response) => {
    bookService.readBookById(request, response);
});

/* router.post('/', (request, response) => {
    console.log('request Reached to POST');
    response.end();
}); */

module.exports = router;