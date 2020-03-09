var models = require("../models")


async function getAllPersons(req, res) {
    models.Person.findAll().then(data => {
        res.send(data);
        res.end();
    })
}

async function addPerson(req, res) {
    models.Person.create(req.body);
    res.end(req.body.toString());
}
module.exports = {
    getAllPersons,
    addPerson
}