var models = require("../models")


async function getAllPersons(req, res) {
    models.Person.findAll().then(data => {
        res.send(data);
        res.end();
    })
}

async function getPersonByID(req, res) {
    models.Person.findOne({id: req.params.id}).then(data => {
        res.send(data);
        res.end();
    })
}

async function addPerson(req, res) {
    const newPerson  = req.body;
    if (!newPerson.skills || newPerson.skills.length === 0) {
        res.status(422);
        res.send({error: "skills required"});
    } else {
        models.Person.create(req.body);
        res.send(newPerson);
    }
    res.end();
}

module.exports = {
    getAllPersons,
    addPerson,
    getPersonByID
}