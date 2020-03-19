var express = require("express");
var router = express.Router({mergeParams: true});
var personService = require("../services/personService");

router.get('', (req, res) => {
    personService.getAllPersons(req, res);
});

router.get('/:id', (req, res) => {
    personService.getPersonByID(req, res);
});

router.post('/skills', (req, res) => {
    personService.addPerson(req, res);
});

module.exports = router;