const db = require("./db");
const booksModel = require("../models/books");

async function readBooks(request, response) {
  try {
    let responseFromServer = "";
    if (Object.keys(request.query).length) {
      const yearToFind = request.query.year;
      const startingPrice = request.query.pricestart;
      const endingPrice = request.query.priceend;
      if (yearToFind) {
        responseFromServer = await booksModel.find({ publishedYear: "2011" });
        console.log(">>>responseFromServer is:", responseFromServer);
      } else if (startingPrice && endingPrice) {
        if (startingPrice <= endingPrice) {
          responseFromServer = await booksModel.find({
            price: { $gte: startingPrice, $lte: endingPrice }
          });
        } else {
          responseFromServer = await booksModel.find({
            price: { $lte: startingPrice, $gte: endingPrice }
          });
        }
      }
    } else {
      responseFromServer = await booksModel.find();
    }

    response
      .status(200)
      .send(responseFromServer)
      .end();
  } catch (error) {
    response
      .status(500)
      .send({ error: "Error in Reading Data !!" })
      .end();
  }
}

async function readBookById(request, response) {
  try {
    const responseFromServer = await booksModel.find({
      ISBN: request.params.id
    });
    response
      .status(200)
      .send(responseFromServer)
      .end();
  } catch (error) {
    response
      .status(500)
      .send({ error: "Error in Reading Data !!" })
      .end();
  }
}

async function addBook(req, res) {
  const requestObject = req.body;
  await booksModel.create(requestObject);
  res.send(requestObject);
  res.end();
}

async function updateBookByID(req, res) {
  await booksModel.updateMany({ISBN: req.params.ISBN}, {authorName: "Adam Freeman9" });
  res.end();
}

async function updateToJohn(req, res) {
    const re = await booksModel.find({authorName: "John Papa"})
    .sort({publishedYear: 1})
    .limit(4)
    .skip(2)
    res.send(re);
    res.end();
}
module.exports = { readBooks, 
    readBookById,
    addBook, 
    updateBookByID,
    updateToJohn };
