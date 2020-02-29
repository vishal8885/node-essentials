const booksModel = require("../models/books");
const authorService = require("./authorService");

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

async function deleteBookByISBN(req, res) {
  await booksModel.deleteOne({ISBN: req.params.ISBN});
  res.end();
}

async function updateToJohn(req, res) {
    await booksModel.find({authorName: "John Papa"})
    .sort({publishedYear: 1})
    .skip(2)
    .limit(2).exec((err, books) => {

      var q = booksModel.updateMany({_id: {$in: books}}, {authorName: "John"});
  
      q.exec(err => {
        res.end();
      });
    });
}

async function getAuthorsByPincode(req, res) {
  authorService.getAuthorsByPincode(req, res);
}

async function getBooksAndAuthors(req, res) {
  console.log('aggregate');
  const result = await booksModel.aggregate([
    {
      $match: { 
        price: { $gte: "100", $lt: "500" },
        publishedYear: { $gte: "2015", $lte: "2020"}
      }
    },
    { $sort: { price: -1 } },
    {
    $lookup: {
        from: "authors",
        localField: "authorId",
        foreignField: "authorId",
        as: "authorDetails"
      }
    },
    { "$unwind": "$authorDetails" },
    {
      $lookup: {
          from: "books",
          localField: "authorDetails.authorId",
          foreignField: "authorId",
          as: "authorDetails.books"
      }
    },
    {
      "$group": {
          _id: "$bookName",
          "bookName": { "$first": "$bookName" },
          "price": { "$first": "$price" },
          "year": { "$first": "$publishedYear"},
          "authorId": { "$first": "$authorId"},
          "authorDetails": { "$first": {
            "authorInformation": "$authorDetails",
            "books": "$authorDetails.books"}
          },
      }
    },
  ]);


  res.send(result);
  res.end();
}

module.exports = { readBooks, 
    readBookById,
    addBook, 
    updateBookByID,
    updateToJohn,
    deleteBookByISBN,
    getAuthorsByPincode,
    getBooksAndAuthors
  };
