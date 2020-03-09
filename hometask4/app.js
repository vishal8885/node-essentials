var { Sequelize, DataTypes } = require("sequelize");
var express = require("express");
const app = express();

const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.raw({limit: '10mb'}))

const sequelize = new Sequelize('booksdb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

const person = sequelize.define('person', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: DataTypes.STRING,
        defaultValue: Sequelize.UUIDV4
    },
    skills: {
        type: DataTypes.ARRAY
    }
});

(async function () {
    try {
        await sequelize.authenticate();
        app.listen(port, () => {
            console.log('server listening on port ', port);
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();