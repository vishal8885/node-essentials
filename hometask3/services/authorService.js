const authorModel = require("../models/author");


async function addAuthor(req, res) {
    try{
        const requestObject = req.body;
        await authorModel.create(requestObject);
        res.send(requestObject);
        res.end();
    } catch(err) {
        res.send(err);
        res.end();
    }
}

async function getAuthorsByPincode(req, res) {
    const response = await authorModel.find({"permanentAddress.pincode": +req.params.pin});
    res.send(response);
    res.end();
}

module.exports ={ 
    addAuthor,
    getAuthorsByPincode
}