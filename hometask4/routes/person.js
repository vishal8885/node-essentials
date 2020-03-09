var express = require("express");
var router = express.Router();
var personService = require("../services/personService");

router.get('', (req, res) => {
    personService.getAllPersons(req, res);
});

router.post('', (req, res) => {
    personService.addPerson(req, res);
});

module.exports = router;