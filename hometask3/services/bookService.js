const db = require('./db');
const booksModel = require('../models/books');

async function readBooks(request, response) {
    try {
        let responseFromServer = '';
        if (Object.keys(request.query).length) {
            const yearToFind = request.query.year;
            const startingPrice = request.query.pricestart;
            const endingPrice = request.query.priceend;
            if (yearToFind) {
                responseFromServer = await booksModel.find({ publishedYear: '2011'});
                console.log('>>>responseFromServer is:', responseFromServer);
            } else if (startingPrice && endingPrice) {
                if(startingPrice <= endingPrice) {
                    responseFromServer = await booksModel.find({ price: {$gte: startingPrice, $lte: endingPrice}});
                } else {
                    responseFromServer = await booksModel.find({ price: {$lte: startingPrice, $gte: endingPrice}});
                }
            }
        } else {
            responseFromServer = await booksModel.find();
        }

        response.status(200).send(responseFromServer).end();
    } catch(error) {
        response.status(500).send({error: 'Error in Reading Data !!'}).end();
    }  
}

async function readBookById(request, response) {
    try {
        const responseFromServer = await booksModel.find({ISBN: request.params.id});
        response.status(200).send(responseFromServer).end();
    } catch(error) {
        response.status(500).send({error: 'Error in Reading Data !!'}).end();
    }
}

module.exports = {readBooks, readBookById};