const express = require('express');
const mongoose = require('mongoose');
const port = 3000;
const app = express();

const booksRouter = require('./routes/books');

app.use(express.json({limit: '10MB'}));
app.use(express.urlencoded({limit: '10MB'}));


app.use('/books', booksRouter);

const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
  };
  
app.use(express.static('public', options));

app.listen(port, (request, response) => {
    console.log(`Server listening on port ${port} !!`)
});