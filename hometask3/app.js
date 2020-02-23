const express = require('express');
const mongoose = require('mongoose');
const port = 3000;
const app = express();

const mongoDB = 'mongodb://127.0.0.1/booksdb';
mongoose.connect(mongoDB, { useNewUrlParser: true, autoIndex: false, poolSize: 10, keepAlive: true, keepAliveInitialDelay: true});

const db = mongoose.connection;

db.on('connecting', () => {
    console.log('Mongo Connecting !!');
});

db.on('connected', () => {
    console.log('Mongo Connected !!');
});

db.on('disconnecting', () => {
    console.log('Mongo Disconnected !!');
});

db.on('close', () => {
    console.log('Mongo Connection Closed !!');
});

db.on('error', () => {
    console.log('MongoDB connection error !!');
});

const booksRouter = require('./routes/books');
const authorRouter = require('./routes/author');

app.use(express.json({limit: '10MB'}));
app.use(express.urlencoded({limit: '10MB'}));


app.use('/books', booksRouter);
app.use('/authors', authorRouter);

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