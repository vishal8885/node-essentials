const express = require("express");
const router = express.Router();
const authorService = require("../services/authorService");
const authorSchema = require("../models/author");

router.post("/", (req, res) => {
    authorService.addAuthor(req, res);
});

module.exports = router;