const mongoose = require('mongoose');
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

module.exports = db;