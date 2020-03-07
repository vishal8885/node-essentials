var { Sequelize } = require("sequelize");
var express = require("express");
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.raw({limit: '10mb'}))

const sequelize = new Sequelize('booksdb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

(async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        express
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();