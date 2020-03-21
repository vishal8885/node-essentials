var models = require("../models")
var { Op  } = require("sequelize");

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
    models.Person.create(req.body).then((data) => {
        res.status(201);
        res.send(newPerson);
        res.end();
    })
    .catch(({errors}) => {
        res.send(errors);
        res.end();
    });
}

async function getBestSkilled (req, res) {
    models.Person.findAll({
        where: {
            skills: {
                [Op.in]: req.body.Skills
            }
        }
    }).then(data => {
        res.send(data);
        res.end();
    });
}

module.exports = {
    getAllPersons,
    addPerson,
    getPersonByID,
    getBestSkilled
}