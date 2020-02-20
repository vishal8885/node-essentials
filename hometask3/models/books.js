const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    bookName: {
      type: String,
      required: true
    },
    ISBN: {
      type: String,
      required: true
    },
    publisherName: {
      type: String,
      required: true
    },
    authorName: {
      type: String,
      required: true
    },
    authorId: {
      type: Number,
      required: true
    },
    price: {
        type: String,
        required: true,
        min: 0,
        max: 10000
      },
      publishedYear: {
        type: String,
        required: true
      },
      reviewers: {
        type: Array,
        required: true
      },
      numberOfPages: {
        type: Number,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      rating: {
        type: Number
      },

  });

bookSchema.index({ publisherName: 1, authorName: 1, price: 1 });

const books = mongoose.model('bookModel', bookSchema, 'books');

module.exports = books;